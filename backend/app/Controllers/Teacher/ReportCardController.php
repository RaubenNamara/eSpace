<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ReportCardService;
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

        $stmt = $this->getDb()->prepare('SELECT id FROM report_cards WHERE student_id = :student_id AND term_id = :term_id');
        $stmt->execute(['student_id' => (int) $studentId, 'term_id' => (int) $termId]);
        $report = $stmt->fetch();

        if (!$report) {
            $this->notFound('No report card generated for this student/term yet');
            return;
        }

        try {
            $this->success((new ReportCardService())->getFullReport((int) $report['id']));
        } catch (RuntimeException $e) {
            $this->error($e->getMessage(), 404);
        }
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
            "SELECT t.id, t.name, ay.name AS academic_year, t.is_current
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
            $this->notFound('Generate this student\'s report card before adding a comment');
            return;
        }

        $stmt = $db->prepare('UPDATE report_cards SET class_teacher_comment = :comment, updated_at = NOW() WHERE id = :id');
        $stmt->execute(['comment' => $comment, 'id' => $report['id']]);

        $this->success(['class_teacher_comment' => $comment], 'Comment updated');
    }
}
