<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ReportCardService;
use RuntimeException;

/**
 * HOD Report Card Controller
 *
 * Read-only monitoring, scoped to students enrolled in the HOD's own department - same
 * department-scoping idea as ChatService::listConversationsInScope(), just simpler here since a
 * report card always belongs to exactly one student (department membership resolves it
 * directly via student_department_enrollments, no participant-list join needed).
 */
class ReportCardController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getHodDepartmentId(): ?int
    {
        $hodId = $_SESSION['user_id'] ?? null;
        if (!$hodId) {
            return null;
        }

        $stmt = $this->getDb()->prepare('SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $hodId]);
        $row = $stmt->fetch();

        return $row ? (int) $row['department_id'] : null;
    }

    private function studentInDepartment(int $studentId, int $departmentId): bool
    {
        $stmt = $this->getDb()->prepare(
            'SELECT id FROM student_department_enrollments WHERE student_id = :student_id AND department_id = :department_id AND deleted_at IS NULL LIMIT 1'
        );
        $stmt->execute(['student_id' => $studentId, 'department_id' => $departmentId]);
        return (bool) $stmt->fetch();
    }

    /**
     * GET /hod/report-cards/terms
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
     * GET /hod/report-cards/students?term_id=
     * Every student in the HOD's department, with whether a report card exists for the term.
     */
    public function listStudents(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $termId = (int) $this->query('term_id', 0);
        if (!$termId) {
            $this->validationError(['term_id' => 'term_id is required']);
            return;
        }

        $stmt = $this->getDb()->prepare(
            "SELECT DISTINCT s.id, s.first_name, s.last_name, s.admission_number,
                    rc.id AS report_card_id, rc.performance_level, rc.total_points
             FROM students s
             INNER JOIN student_department_enrollments sde ON sde.student_id = s.id AND sde.department_id = :department_id AND sde.deleted_at IS NULL
             LEFT JOIN report_cards rc ON rc.student_id = s.id AND rc.term_id = :term_id
             WHERE s.deleted_at IS NULL
             ORDER BY s.first_name, s.last_name"
        );
        $stmt->execute(['department_id' => $departmentId, 'term_id' => $termId]);

        $this->success(['students' => $stmt->fetchAll()]);
    }

    /**
     * GET /hod/report-cards/{studentId}/{termId}
     */
    public function show($studentId, $termId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $studentId = (int) $studentId;

        if (!$this->studentInDepartment($studentId, $departmentId)) {
            $this->notFound('Student not found in your department');
            return;
        }

        $stmt = $this->getDb()->prepare('SELECT id FROM report_cards WHERE student_id = :student_id AND term_id = :term_id');
        $stmt->execute(['student_id' => $studentId, 'term_id' => (int) $termId]);
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
}
