<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\CompetencyReportService;
use eSpace\App\Services\PerformanceReportService;
use eSpace\App\Services\ReportCardService;
use eSpace\App\Services\ReportCardView;
use RuntimeException;

/**
 * Teacher Report Card Controller
 *
 * Two-tier authorization: any teacher with a class_subjects entitlement for a student's
 * (class, subject, term) can generate that one subject's slice; only the class's designated
 * class teacher (classes.class_teacher_id) can generate/finalize the whole report, and only
 * they can edit the class teacher's comment and attendance.
 */
class ReportCardController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    private function getStudentClassId(int $studentId): ?int
    {
        $stmt = $this->getDb()->prepare('SELECT class_id FROM students WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $studentId]);
        $row = $stmt->fetch();
        return $row && $row['class_id'] !== null ? (int) $row['class_id'] : null;
    }

    private function isClassTeacher(int $teacherId, int $classId): bool
    {
        $stmt = $this->getDb()->prepare('SELECT id FROM classes WHERE id = :class_id AND class_teacher_id = :teacher_id AND deleted_at IS NULL');
        $stmt->execute(['class_id' => $classId, 'teacher_id' => $teacherId]);
        return (bool) $stmt->fetch();
    }

    private function hasSubjectEntitlement(int $teacherId, int $classId, int $subjectId, int $termId): bool
    {
        $stmt = $this->getDb()->prepare(
            'SELECT id FROM class_subjects WHERE teacher_id = :teacher_id AND class_id = :class_id AND subject_id = :subject_id AND term_id = :term_id'
        );
        $stmt->execute(['teacher_id' => $teacherId, 'class_id' => $classId, 'subject_id' => $subjectId, 'term_id' => $termId]);
        return (bool) $stmt->fetch();
    }

    /**
     * POST /teacher/report-cards/{studentId}/{termId}/subjects/{subjectId}/generate
     */
    public function generateSubject($studentId, $termId, $subjectId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $studentId = (int) $studentId;
        $termId = (int) $termId;
        $subjectId = (int) $subjectId;

        $classId = $this->getStudentClassId($studentId);
        if (!$classId) {
            $this->notFound('Student not found or has no class assigned');
            return;
        }

        $entitled = $this->hasSubjectEntitlement($teacherId, $classId, $subjectId, $termId) || $this->isClassTeacher($teacherId, $classId);
        if (!$entitled) {
            $this->forbidden('You are not assigned to teach this subject for this class/term');
            return;
        }

        $force = (bool) ($this->input('force') ?? false);

        try {
            $report = (new ReportCardService())->generateSubjectReport($studentId, $termId, $subjectId, $teacherId, 'teacher', $force);
        } catch (RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $this->success($report);
    }

    /**
     * POST /teacher/report-cards/{studentId}/{termId}/generate
     */
    public function generateFull($studentId, $termId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $studentId = (int) $studentId;
        $termId = (int) $termId;

        $classId = $this->getStudentClassId($studentId);
        if (!$classId) {
            $this->notFound('Student not found or has no class assigned');
            return;
        }

        if (!$this->isClassTeacher($teacherId, $classId)) {
            $this->forbidden('Only this class\'s class teacher (or an admin) can generate the full report card');
            return;
        }

        $force = (bool) ($this->input('force') ?? false);

        try {
            $report = (new ReportCardService())->generateFullReport($studentId, $termId, $teacherId, 'teacher', $force);
        } catch (RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $this->success($report);
    }

    /**
     * GET /teacher/report-cards/{studentId}/{termId}
     */
    public function show($studentId, $termId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }
        if (!ReportCardView::allowed('teachers')) {
            $this->forbidden('Report cards are not open to teachers yet');
            return;
        }
        $studentId = (int) $studentId;
        $classId = $this->getStudentClassId($studentId);
        $isClassTeacher = $classId !== null && $this->isClassTeacher((int) $teacherId, $classId);
        if (!$isClassTeacher && !$this->teaches((int) $teacherId, $studentId)) {
            $this->forbidden('You can open the report cards of learners you teach, or of your class');
            return;
        }

        try {
            $this->success(ReportCardView::build($studentId, (int) $termId) + ['can_comment' => $isClassTeacher]);
        } catch (RuntimeException $e) {
            $this->error($e->getMessage(), 404);
        }
    }

    /** Whether the teacher teaches the learner (an active teacher enrolment) */
    private function teaches(int $teacherId, int $studentId): bool
    {
        $stmt = $this->getDb()->prepare("SELECT 1 FROM student_teacher_enrollments WHERE teacher_id = ? AND student_id = ? AND status = 'active' LIMIT 1");
        $stmt->execute([$teacherId, $studentId]);
        return (bool) $stmt->fetchColumn();
    }

    /**
     * GET /teacher/report-cards/access - whether the menu shows Report cards
     */
    public function access(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success(['allowed' => ReportCardView::allowed('teachers')]);
    }

    /**
     * GET /teacher/report-cards/learners?term_id=
     * The learners whose cards this teacher can open: the ones they teach, and the whole of any
     * class they are class teacher of. With the terms, and whether each card is made yet.
     */
    public function learners(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = (int) ($this->getTeacherId() ?? 0);
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }
        if (!ReportCardView::allowed('teachers')) {
            $this->forbidden('Report cards are not open to teachers yet');
            return;
        }
        $db = $this->getDb();
        \eSpace\App\Services\TermService::syncCurrent();
        $terms = $db->query(
            "SELECT t.id, t.name, ay.name AS academic_year, t.is_current
             FROM terms t LEFT JOIN academic_years ay ON ay.id = t.academic_year_id
             WHERE t.deleted_at IS NULL AND t.start_date <= CURDATE() ORDER BY t.start_date DESC"
        )->fetchAll();
        $termId = (int) $this->query('term_id', 0);
        if (!$termId) {
            foreach ($terms as $t) {
                if ((int) $t['is_current']) {
                    $termId = (int) $t['id'];
                }
            }
            $termId = $termId ?: (int) ($terms[0]['id'] ?? 0);
        }

        $stmt = $db->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, c.id AS class_id, c.name AS class_name, c.stream_name,
                    (c.class_teacher_id = :t1) AS my_class,
                    EXISTS (SELECT 1 FROM report_cards rc INNER JOIN report_card_subjects rcs ON rcs.report_card_id = rc.id
                            WHERE rc.student_id = s.id AND rc.term_id = :term) AS made
             FROM students s
             LEFT JOIN classes c ON c.id = s.class_id
             WHERE s.deleted_at IS NULL
               AND (c.class_teacher_id = :t2
                    OR EXISTS (SELECT 1 FROM student_teacher_enrollments ste WHERE ste.student_id = s.id AND ste.teacher_id = :t3 AND ste.status = 'active'))
             ORDER BY c.name, c.stream_name, s.first_name, s.last_name"
        );
        $stmt->execute(['t1' => $teacherId, 't2' => $teacherId, 't3' => $teacherId, 'term' => $termId]);
        $learners = array_map(fn($r) => [
            'id' => (int) $r['id'],
            'name' => trim($r['first_name'] . ' ' . $r['last_name']),
            'admission_number' => $r['admission_number'],
            'class_id' => $r['class_id'] !== null ? (int) $r['class_id'] : null,
            'class_label' => $r['class_name'] ? $r['class_name'] . ($r['stream_name'] ? ' ' . $r['stream_name'] : '') : 'No class',
            'my_class' => (bool) $r['my_class'],
            'made' => (bool) $r['made'],
        ], $stmt->fetchAll());

        $this->success(['terms' => $terms, 'term_id' => $termId, 'learners' => $learners]);
    }

    /**
     * GET /teacher/report-cards/terms
     */
    public function listTerms(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $stmt = $this->getDb()->query(
            "SELECT t.id, t.name, t.academic_year_id, ay.name AS academic_year, t.is_current
             FROM terms t LEFT JOIN academic_years ay ON t.academic_year_id = ay.id
             WHERE t.deleted_at IS NULL ORDER BY t.start_date DESC"
        );

        $this->success(['terms' => $stmt->fetchAll()]);
    }

    /**
     * GET /teacher/report-cards/students?class_id=&term_id=
     * Students in a class the requesting teacher touches (teaches a subject in, or is class
     * teacher of), with whether a report card already exists for the given term.
     */
    public function listStudents(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        $termId = (int) $this->query('term_id', 0);

        if (!$classId || !$termId) {
            $this->validationError(['class_id' => 'class_id and term_id are required']);
            return;
        }

        $db = $this->getDb();

        $isClassTeacher = $this->isClassTeacher($teacherId, $classId);
        $stmt = $db->prepare('SELECT id FROM class_subjects WHERE teacher_id = :teacher_id AND class_id = :class_id AND term_id = :term_id LIMIT 1');
        $stmt->execute(['teacher_id' => $teacherId, 'class_id' => $classId, 'term_id' => $termId]);
        $hasAnySubject = (bool) $stmt->fetch();

        if (!$isClassTeacher && !$hasAnySubject) {
            $this->forbidden('You do not teach this class');
            return;
        }

        $stmt = $db->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number,
                    rc.id AS report_card_id, rc.performance_level, rc.total_points
             FROM students s
             LEFT JOIN report_cards rc ON rc.student_id = s.id AND rc.term_id = :term_id
             WHERE s.class_id = :class_id AND s.deleted_at IS NULL
             ORDER BY s.first_name, s.last_name"
        );
        $stmt->execute(['class_id' => $classId, 'term_id' => $termId]);

        $this->success([
            'is_class_teacher' => $isClassTeacher,
            'students' => $stmt->fetchAll(),
        ]);
    }

    /**
     * GET /teacher/report-cards/my-subjects?class_id=&term_id=
     * Subjects this teacher is entitled to generate for the given class/term (class_subjects
     * entitlement). Used by the UI to offer a subject picker for non-class-teachers.
     */
    public function listMySubjects(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        $termId = (int) $this->query('term_id', 0);

        if (!$classId || !$termId) {
            $this->validationError(['class_id' => 'class_id and term_id are required']);
            return;
        }

        $stmt = $this->getDb()->prepare(
            "SELECT DISTINCT sub.id, sub.name
             FROM class_subjects cs
             INNER JOIN subjects sub ON sub.id = cs.subject_id
             WHERE cs.teacher_id = :teacher_id AND cs.class_id = :class_id AND cs.term_id = :term_id
             ORDER BY sub.name"
        );
        $stmt->execute(['teacher_id' => $teacherId, 'class_id' => $classId, 'term_id' => $termId]);

        $this->success(['subjects' => $stmt->fetchAll()]);
    }

    /**
     * PUT /teacher/report-cards/{studentId}/{termId}/class-teacher-comment
     *
     * Overrides the auto-generated comment (ReportCardService writes one from the student's
     * computed grades on every full-report generation) - kept as a manual touch-up path, not the
     * primary way this field gets filled in.
     */
    public function updateClassTeacherComment($studentId, $termId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $studentId = (int) $studentId;
        $termId = (int) $termId;

        $classId = $this->getStudentClassId($studentId);
        if (!$classId || !$this->isClassTeacher($teacherId, $classId)) {
            $this->forbidden('Only this class\'s class teacher (or an admin) can edit this comment');
            return;
        }

        $comment = trim((string) ($this->input('comment') ?? ''));

        $db = $this->getDb();
        $stmt = $db->prepare('SELECT id FROM report_cards WHERE student_id = :student_id AND term_id = :term_id');
        $stmt->execute(['student_id' => $studentId, 'term_id' => $termId]);
        $report = $stmt->fetch();

        if (!$report) {
            // written before the card is made: kept on an empty card until it is
            $report = ['id' => (new ReportCardService())->ensureReportShell($studentId, $termId, $classId)];
        }

        $stmt = $db->prepare('UPDATE report_cards SET class_teacher_comment = :comment, updated_at = NOW() WHERE id = :id');
        $stmt->execute(['comment' => $comment, 'id' => $report['id']]);

        $this->success(['class_teacher_comment' => $comment], 'Comment updated');
    }

    /**
     * GET /teacher/report-cards/class-summary/subjects?class_id=&term_id=
     * Subjects with LOA/AOI/EOC-tagged assignments for a class/term - sourced from `assignments`
     * directly (see CompetencyReportService::listSubjectsWithCompetencyData()) since
     * `class_subjects`, the table listMySubjects() above reads from, is confirmed empty in this
     * database. Deliberately a separate endpoint rather than changing listMySubjects() itself -
     * that one backs the existing per-subject report generation flow and is left untouched.
     */
    public function classSummarySubjects(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        $termId = (int) $this->query('term_id', 0);

        if (!$classId || !$termId) {
            $this->validationError(['class_id' => 'class_id and term_id are required']);
            return;
        }

        $this->success(['subjects' => (new CompetencyReportService())->listSubjectsWithCompetencyData($classId, $termId)]);
    }

    /**
     * GET /teacher/report-cards/class-summary?class_id=&term_id=&subject_id=
     * Every learner in the class with their LOA/AOI/EOC competency summary for the selected
     * term/subject, in one batched pass (CompetencyReportService::calculateClassSummary()) -
     * never one API call per learner. Entitlement reuses
     * PerformanceReportService::teacherCanAccessClassSubject() (class teacher, class_subjects, or
     * an assignments.teacher_id match), the same fallback already relied on elsewhere since
     * class_subjects itself is empty.
     */
    public function classSummary(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        $termId = (int) $this->query('term_id', 0);
        $subjectId = (int) $this->query('subject_id', 0);

        if (!$classId || !$termId || !$subjectId) {
            $this->validationError(['class_id' => 'class_id, term_id and subject_id are required']);
            return;
        }

        if (!(new PerformanceReportService())->teacherCanAccessClassSubject($teacherId, $classId, $subjectId)) {
            $this->forbidden('You do not teach this subject for this class');
            return;
        }

        $stmt = $this->getDb()->prepare('SELECT level FROM classes WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $classId]);
        $classLevel = $stmt->fetch()['level'] ?? null;

        $summary = (new CompetencyReportService())->calculateClassSummary($classId, $termId, $subjectId, $classLevel);

        $this->success([
            'students' => $summary,
            'max_weight' => \eSpace\App\Services\ReportCardGradingService::maxWeightForClassLevel($classLevel),
        ]);
    }
}
