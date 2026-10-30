<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\SubmissionScriptService;
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
                       a.class_group_name,
                       -- every stream it is set for: its own class plus any extra ticked streams
                       (SELECT GROUP_CONCAT(DISTINCT x.stream_name ORDER BY x.stream_name SEPARATOR ',') FROM classes x
                         WHERE x.id = a.class_id OR x.id IN (SELECT ac.class_id FROM assignment_classes ac WHERE ac.assignment_id = a.id)) AS target_streams,
                       -- how many streams its class has this year, to tell 'all streams ticked' apart
                       (SELECT COUNT(*) FROM classes y WHERE y.name = COALESCE(a.class_group_name, c.name) AND y.deleted_at IS NULL
                         AND y.academic_year_id = COALESCE(c.academic_year_id, (SELECT ay.id FROM academic_years ay WHERE ay.is_current = 1 LIMIT 1))) AS class_stream_count,
                       d.name as department_name,
                       CONCAT(t.first_name, ' ', t.last_name) as teacher_name,
                       (SELECT COUNT(*) FROM assignment_submissions WHERE assignment_id = a.id AND deleted_at IS NULL AND status IN ('submitted','marking','graded','returned')) as submissions_count
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

    /**
     * An assessment's submissions and stats, for viewing the marked scripts (read-only).
     * GET /admin/assignments/{id}/submissions
     */
    public function submissions($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT a.id, a.title, sub.department_id AS subject_department_id, t.department_id AS teacher_department_id
             FROM assignments a INNER JOIN teachers t ON t.id = a.teacher_id LEFT JOIN subjects sub ON sub.id = a.subject_id
             WHERE a.id = ? AND a.deleted_at IS NULL"
        );
        $stmt->execute([(int) $id]);
        $assignment = $stmt->fetch();
        if (!$assignment) {
            $this->notFound('Assessment not found');
            return;
        }
        $departmentId = $assignment['subject_department_id'] ?? $assignment['teacher_department_id'];
        $this->success(SubmissionScriptService::submissions($db, (int) $id, $departmentId !== null ? (int) $departmentId : null)
            + ['assignment' => ['id' => (int) $assignment['id'], 'title' => $assignment['title']]]);
    }

    /**
     * One student's marked script - questions, answers, marks, feedback and the teacher's
     * marks on the page. Read-only.
     * GET /admin/assignments/{id}/submissions/{submissionId}
     */
    public function submissionDetail($id, $submissionId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $script = SubmissionScriptService::detail($this->getDb(), (int) $id, (int) $submissionId);
        if (!$script) {
            $this->notFound('Submission not found');
            return;
        }
        $this->success($script);
    }
}
