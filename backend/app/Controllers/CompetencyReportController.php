<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\LearningReportService;

/**
 * A learner's one-page "what I can do" report from their Learning Map (LearningReportService):
 * the student's own, or - for a teacher - any student in one of their departments.
 *
 * GET /student/competency-report
 * GET /teacher/students/{id}/competency-report
 */
class CompetencyReportController extends Controller
{
    public function mine(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $report = LearningReportService::build(\eSpace\Config\Database::getInstance(), (int) ($_SESSION['user_id'] ?? 0));
        if (!$report) {
            $this->notFound('Student not found');
            return;
        }
        $this->success($report);
    }

    public function forStudent($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = ($_SESSION['role'] ?? null) === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
        $db = \eSpace\Config\Database::getInstance();
        // The student must be in one of the teacher's departments
        $stmt = $db->prepare(
            "SELECT 1 FROM student_department_enrollments sde
             WHERE sde.student_id = ? AND sde.status = 'active' AND sde.deleted_at IS NULL AND sde.department_id IN (
                SELECT department_id FROM teacher_department_assignments WHERE teacher_id = ? AND deleted_at IS NULL
                UNION SELECT department_id FROM teachers WHERE id = ? AND department_id IS NOT NULL)
             LIMIT 1"
        );
        $stmt->execute([(int) $id, $teacherId, $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Student not found');
            return;
        }
        $report = LearningReportService::build($db, (int) $id);
        if (!$report) {
            $this->notFound('Student not found');
            return;
        }
        $this->success($report);
    }
}
