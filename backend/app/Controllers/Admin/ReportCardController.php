<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
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
}
