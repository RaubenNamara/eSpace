<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\AssignmentPreviewService;

/**
 * Admin Assignment Controller
 *
 * Read-only, school-wide oversight of every assignment, including a "Preview as Student" view
 * identical to what a teacher sees for their own assignment. Admin can't create/edit/delete/grade.
 */
class AssignmentController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * GET /admin/assignments?status=&department_id=
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $status = $this->query('status', '');
        $departmentId = $this->query('department_id', '');

        $db = $this->getDb();
        $where = ['a.deleted_at IS NULL'];
        // assessments of a deleted teacher are closed (marks kept) - not listed for managing
        if ($this->hasRemovedColumn($db)) {
            $where[] = 'a.removed_at IS NULL';
        }
        $params = [];

        if (!empty($status)) {
            $where[] = 'a.status = :status';
            $params['status'] = $status;
        }

        if (!empty($departmentId)) {
            $where[] = 't.department_id = :department_id';
            $params['department_id'] = $departmentId;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT a.id, a.title, a.status, a.due_date, a.total_marks, a.category,
                       s.name as subject_name, c.name as class_name, c.stream_name as class_stream_name,
                       d.name as department_name,
                       CONCAT(t.first_name, ' ', t.last_name) as teacher_name,
                       (SELECT COUNT(*) FROM assignment_submissions WHERE assignment_id = a.id) as submissions_count
                FROM assignments a
                INNER JOIN teachers t ON a.teacher_id = t.id
                LEFT JOIN subjects s ON a.subject_id = s.id
                LEFT JOIN classes c ON a.class_id = c.id
                LEFT JOIN departments d ON t.department_id = d.id
                WHERE {$whereClause}
                ORDER BY a.updated_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);

        $this->success(['assignments' => $stmt->fetchAll()]);
    }

    private function hasRemovedColumn($db): bool
    {
        try {
            return (bool) $db->query("SHOW COLUMNS FROM assignments LIKE 'removed_at'")->fetch();
        } catch (\PDOException $e) {
            return false;
        }
    }

    /**
     * Delete any assessment school-wide. It disappears for its teacher and students, and its
     * results no longer count on report cards (those read only assessments that aren't deleted).
     * DELETE /admin/assignments/{id}
     */
    public function delete($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare('SELECT id, title FROM assignments WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([(int) $id]);
        $assignment = $stmt->fetch();
        if (!$assignment) {
            $this->notFound('Assessment not found');
            return;
        }

        try {
            $db->prepare('UPDATE assignments SET deleted_at = NOW() WHERE id = ?')->execute([(int) $id]);
        } catch (\PDOException $e) {
            error_log('Admin assessment delete failed: ' . $e->getMessage());
            $this->error('Failed to delete assessment', 500);
            return;
        }
        $this->success([], "\"{$assignment['title']}\" deleted");
    }

    /**
     * "Preview as Student" for any assignment school-wide
     * GET /admin/assignments/{id}/preview
     */
    public function preview(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $assignmentId = (int) $this->routeParam('id');

        $service = new AssignmentPreviewService();
        $assignment = $service->getAssignmentMeta($assignmentId);

        if (!$assignment) {
            $this->notFound('Assignment not found');
            return;
        }

        $questions = $service->getQuestionsForPreview($assignmentId);
        $this->success($service->buildPreviewPayload($assignment, $questions));
    }
}
