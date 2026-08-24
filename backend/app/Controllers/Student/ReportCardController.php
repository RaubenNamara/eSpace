<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ReportCardService;
use RuntimeException;

/**
 * Student Report Card Controller
 *
 * Read-only, own-student-id only - students never generate a report card, they only view one
 * once a teacher or admin has generated it.
 */
class ReportCardController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getStudentId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * GET /student/report-cards/terms
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
     * GET /student/report-cards
     * Every term this student has a generated report card for, newest first.
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $stmt = $this->getDb()->prepare(
            "SELECT rc.id, rc.term_id, rc.performance_level, rc.total_points, rc.generated_at,
                    t.name AS term_name, ay.name AS academic_year_name
             FROM report_cards rc
             INNER JOIN terms t ON rc.term_id = t.id
             LEFT JOIN academic_years ay ON t.academic_year_id = ay.id
             WHERE rc.student_id = :student_id
             ORDER BY t.start_date DESC"
        );
        $stmt->execute(['student_id' => $studentId]);

        $this->success(['report_cards' => $stmt->fetchAll()]);
    }

    /**
     * GET /student/report-cards/{termId}
     */
    public function show($termId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $stmt = $this->getDb()->prepare('SELECT id FROM report_cards WHERE student_id = :student_id AND term_id = :term_id');
        $stmt->execute(['student_id' => $studentId, 'term_id' => (int) $termId]);
        $report = $stmt->fetch();

        if (!$report) {
            $this->notFound('No report card generated for this term yet');
            return;
        }

        try {
            $this->success((new ReportCardService())->getFullReport((int) $report['id']));
        } catch (RuntimeException $e) {
            $this->error($e->getMessage(), 404);
        }
    }
}
