<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\AssignmentPreviewService;

/**
 * HOD Assignment Controller
 *
 * Read-only oversight of assignments authored by teachers in the HOD's department, including a
 * "Preview as Student" view identical to what Teacher\AssignmentController::preview() shows a
 * teacher for their own assignment. HOD can't create/edit/delete/grade.
 */
class AssignmentController extends Controller
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

        $stmt = $this->getDb()->prepare("SELECT department_id FROM hods WHERE id = :hod_id AND deleted_at IS NULL");
        $stmt->execute(['hod_id' => $hodId]);
        $hod = $stmt->fetch();

        return $hod ? (int) $hod['department_id'] : null;
    }

    /**
     * GET /hod/assignments
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $status = $this->query('status', '');

        $db = $this->getDb();
        $where = ['EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)', 'a.deleted_at IS NULL'];
        $params = ['department_id' => $departmentId];

        if (!empty($status)) {
            $where[] = 'a.status = :status';
            $params['status'] = $status;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT a.id, a.title, a.status, a.due_date, a.total_marks, a.category,
                       s.name as subject_name, c.name as class_name,
                       CONCAT(t.first_name, ' ', t.last_name) as teacher_name,
                       (SELECT COUNT(*) FROM assignment_submissions WHERE assignment_id = a.id) as submissions_count
                FROM assignments a
                INNER JOIN teachers t ON a.teacher_id = t.id
                LEFT JOIN subjects s ON a.subject_id = s.id
                LEFT JOIN classes c ON a.class_id = c.id
                WHERE {$whereClause}
                ORDER BY a.updated_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);

        $this->success(['assignments' => $stmt->fetchAll()]);
    }

    /**
     * "Preview as Student" for an assignment authored by a teacher in this department
     * GET /hod/assignments/{id}/preview
     */
    public function preview(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $assignmentId = (int) $this->routeParam('id');
        $db = $this->getDb();

        $stmt = $db->prepare(
            "SELECT a.id FROM assignments a
             INNER JOIN teachers t ON a.teacher_id = t.id
             WHERE a.id = :id AND a.deleted_at IS NULL
               AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)"
        );
        $stmt->execute(['id' => $assignmentId, 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Assignment not found');
            return;
        }

        $service = new AssignmentPreviewService();
        $assignment = $service->getAssignmentMeta($assignmentId);
        $questions = $service->getQuestionsForPreview($assignmentId);

        $this->success($service->buildPreviewPayload($assignment, $questions));
    }
}
