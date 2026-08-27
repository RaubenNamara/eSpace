<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\CompetencyReportService;
use eSpace\App\Services\ReportCardGradingService;
use eSpace\App\Services\ReportCardService;
use RuntimeException;

/**
 * Admin Report Card Controller
 *
 * Full access: generate/regenerate any student's report card for any term, view any report,
 * and edit the Head Teacher's Comment.
 */
class ReportCardController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * GET /admin/report-cards/terms
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
     * GET /admin/report-cards/students?term_id=&class_id=
     */
    public function listStudents(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $termId = (int) $this->query('term_id', 0);
        if (!$termId) {
            $this->validationError(['term_id' => 'term_id is required']);
            return;
        }

        $classId = (int) $this->query('class_id', 0);

        $where = ['s.deleted_at IS NULL'];
        $params = ['term_id' => $termId];
        if ($classId) {
            $where[] = 's.class_id = :class_id';
            $params['class_id'] = $classId;
        }

        $stmt = $this->getDb()->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.class_id,
                    rc.id AS report_card_id, rc.performance_level, rc.total_points
             FROM students s
             LEFT JOIN report_cards rc ON rc.student_id = s.id AND rc.term_id = :term_id
             WHERE " . implode(' AND ', $where) . "
             ORDER BY s.first_name, s.last_name"
        );
        $stmt->execute($params);

        $this->success(['students' => $stmt->fetchAll()]);
    }

    /**
     * POST /admin/report-cards/{studentId}/{termId}/generate
     */
    public function generate($studentId, $termId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $adminId = $_SESSION['user_id'] ?? null;
        if (!$adminId) {
            $this->error('Admin not found', 403);
            return;
        }

        $force = (bool) ($this->input('force') ?? false);

        try {
            $report = (new ReportCardService())->generateFullReport((int) $studentId, (int) $termId, (int) $adminId, 'admin', $force);
        } catch (RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $this->success($report);
    }

    /**
     * GET /admin/report-cards/{studentId}/{termId}
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
     * PUT /admin/report-cards/{studentId}/{termId}/head-teacher-comment
     *
     * Overrides the auto-generated comment (ReportCardService writes one from the student's
     * computed grades on every full-report generation) - kept as a manual touch-up path, not the
     * primary way this field gets filled in.
     */
    public function updateHeadTeacherComment($studentId, $termId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $comment = trim((string) ($this->input('comment') ?? ''));

        $db = $this->getDb();
        $stmt = $db->prepare('SELECT id FROM report_cards WHERE student_id = :student_id AND term_id = :term_id');
        $stmt->execute(['student_id' => (int) $studentId, 'term_id' => (int) $termId]);
        $report = $stmt->fetch();

        if (!$report) {
            $this->notFound('No report card generated for this student/term yet');
            return;
        }

        $stmt = $db->prepare('UPDATE report_cards SET head_teacher_comment = :comment, updated_at = NOW() WHERE id = :id');
        $stmt->execute(['comment' => $comment, 'id' => $report['id']]);

        $this->success(['head_teacher_comment' => $comment], 'Comment updated');
    }

    /**
     * GET /admin/reports/students?class_id=&term_id=&search=
     * Every student in a class with a LOA/AOI/EOC availability flag per category - the "Reports"
     * column on the admin student-listing table. academic_year_id isn't filtered on here (term_id
     * already implies a year); it's accepted purely so the frontend's Year->Term cascade reads
     * consistently, matching how every other admin filter bar in this app works.
     */
    public function listCompetencyStudents(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        $termId = (int) $this->query('term_id', 0);
        $search = trim((string) $this->query('search', ''));

        if (!$classId || !$termId) {
            $this->validationError(['class_id' => 'class_id and term_id are required']);
            return;
        }

        $this->success(['students' => (new CompetencyReportService())->listStudentsWithReportAvailability($classId, $termId, $search)]);
    }

    /**
     * GET /admin/reports/students/{studentId}/terms/{termId}
     * The "Student Report Overview" - identifying info plus a summary card per LOA/AOI/EOC
     * category (count, average %, status, descriptor, weight), each flagged available/not so the
     * UI can show "Report not available yet" instead of a fabricated 0%/E.
     */
    public function competencyOverview($studentId, $termId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = (int) $studentId;
        $termId = (int) $termId;

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.class_id,
                    c.name AS class_name, c.stream_name, c.level AS class_level,
                    t.name AS term_name, ay.name AS academic_year_name
             FROM students s
             LEFT JOIN classes c ON s.class_id = c.id
             INNER JOIN terms t ON t.id = :term_id
             LEFT JOIN academic_years ay ON t.academic_year_id = ay.id
             WHERE s.id = :student_id AND s.deleted_at IS NULL"
        );
        $stmt->execute(['student_id' => $studentId, 'term_id' => $termId]);
        $student = $stmt->fetch();

        if (!$student) {
            $this->notFound('Student not found');
            return;
        }
        if (!$student['class_id']) {
            $this->error('This student has no class assigned', 422);
            return;
        }

        $classLevel = $student['class_level'];
        $maxWeight = ReportCardGradingService::maxWeightForClassLevel($classLevel);
        $service = new CompetencyReportService();

        $categories = [];
        foreach (['LOA', 'AOI', 'EOC'] as $category) {
            $avg = $service->calculateStudentCategoryAverage($studentId, $termId, $category);
            if ($avg['count'] === 0 || $avg['percentage'] === null) {
                $categories[$category] = [
                    'available' => false, 'assessment_count' => 0, 'percentage' => null,
                    'status' => null, 'performance_descriptor' => null, 'weight' => null,
                    'total_marks_sum' => 0, 'total_score_sum' => 0,
                ];
                continue;
            }

            $level = ReportCardGradingService::getPerformanceLevel($avg['percentage']);
            $categories[$category] = [
                'available' => true,
                'assessment_count' => $avg['count'],
                'percentage' => $avg['percentage'],
                'status' => $level['status'],
                'performance_descriptor' => $level['descriptor'],
                'weight' => ReportCardGradingService::convertToWeight($avg['percentage'], $classLevel),
                'total_marks_sum' => $avg['total_marks_sum'],
                'total_score_sum' => $avg['total_score_sum'],
            ];
        }

        $this->success([
            'student' => [
                'id' => (int) $student['id'],
                'first_name' => $student['first_name'],
                'last_name' => $student['last_name'],
                'admission_number' => $student['admission_number'],
                'class_name' => $student['class_name'],
                'stream_name' => $student['stream_name'],
            ],
            'term' => ['id' => $termId, 'name' => $student['term_name'], 'academic_year' => $student['academic_year_name']],
            'max_weight' => $maxWeight,
            'categories' => $categories,
        ]);
    }

    /**
     * GET /admin/reports/students/{studentId}/terms/{termId}/categories/{category}
     * One category's full detail report - subject-by-subject (LOA/AOI) or topic-by-topic (EOC)
     * breakdown across every subject the student is assessed in this term, for View/Print/Download.
     */
    public function competencyDetail($studentId, $termId, $category): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = (int) $studentId;
        $termId = (int) $termId;
        $category = strtoupper((string) $category);

        if (!in_array($category, ['LOA', 'AOI', 'EOC'], true)) {
            $this->validationError(['category' => 'category must be LOA, AOI or EOC']);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.class_id,
                    c.name AS class_name, c.stream_name, c.level AS class_level,
                    t.name AS term_name, ay.name AS academic_year_name
             FROM students s
             LEFT JOIN classes c ON s.class_id = c.id
             INNER JOIN terms t ON t.id = :term_id
             LEFT JOIN academic_years ay ON t.academic_year_id = ay.id
             WHERE s.id = :student_id AND s.deleted_at IS NULL"
        );
        $stmt->execute(['student_id' => $studentId, 'term_id' => $termId]);
        $student = $stmt->fetch();

        if (!$student || !$student['class_id']) {
            $this->notFound('Student not found or has no class assigned');
            return;
        }

        $classLevel = $student['class_level'];
        $service = new CompetencyReportService();

        $rows = $category === 'EOC'
            ? $service->calculateStudentEOCBreakdown($studentId, $termId)
            : $service->calculateStudentTopicBreakdown($studentId, $termId, $category);

        // One descriptor sentence per row, name-first, per the reporting spec: LOA/AOI reuse the
        // exact generators the individual report card already uses (Name is able to <LO> at an
        // <level> level. / Name demonstrates <level> competence in <competence).); EOC gets a
        // single-topic sentence (Name demonstrates <level clause> <topic>.) rather than the
        // whole-subject multi-topic synthesis, since here each row already IS one topic.
        $studentName = $student['first_name'];
        foreach ($rows as &$row) {
            if ($category === 'LOA') {
                $row['descriptor_text'] = $service->generateLOADescriptor($studentName, $row['learning_outcomes'] ?: [$row['detail_text']], $row['percentage']);
            } elseif ($category === 'AOI') {
                $row['descriptor_text'] = $service->generateAOIDescriptor($studentName, $row['detail_text'], $row['percentage']);
            } else {
                $row['descriptor_text'] = $service->generateEOCTopicDescriptor($studentName, $row['topic_name'], $row['percentage']);
            }
        }
        unset($row);

        $summary = $service->calculateStudentCategoryAverage($studentId, $termId, $category);
        $overallLevel = $summary['percentage'] !== null ? ReportCardGradingService::getPerformanceLevel($summary['percentage']) : null;

        $school = $db->query('SELECT * FROM school_settings WHERE id = 1')->fetch() ?: null;

        $this->success([
            'student' => [
                'id' => (int) $student['id'],
                'first_name' => $student['first_name'],
                'last_name' => $student['last_name'],
                'admission_number' => $student['admission_number'],
                'class_name' => $student['class_name'],
                'stream_name' => $student['stream_name'],
            ],
            'term' => ['id' => $termId, 'name' => $student['term_name'], 'academic_year' => $student['academic_year_name']],
            'category' => $category,
            'class_level' => $classLevel,
            'max_weight' => ReportCardGradingService::maxWeightForClassLevel($classLevel),
            'available' => $summary['count'] > 0,
            'summary' => [
                'assessment_count' => $summary['count'],
                'percentage' => $summary['percentage'],
                'status' => $overallLevel['status'] ?? null,
                'performance_descriptor' => $overallLevel['descriptor'] ?? null,
                'weight' => $summary['percentage'] !== null ? ReportCardGradingService::convertToWeight($summary['percentage'], $classLevel) : null,
                'total_marks_sum' => $summary['total_marks_sum'],
                'total_score_sum' => $summary['total_score_sum'],
            ],
            'rows' => $rows,
            'school' => $school,
            'generated_at' => date('c'),
        ]);
    }
}
