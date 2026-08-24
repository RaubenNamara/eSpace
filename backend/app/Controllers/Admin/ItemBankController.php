<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;

/**
 * Admin Item Bank Controller
 *
 * System-wide view over every teacher's item bank PDF uploads, for moderation - identical in
 * shape to Admin\LibraryController, just backed by item_bank_questions instead of library_books.
 * Admin accounts have no row in the teachers table (item_bank_questions.created_by is a NOT
 * NULL FK to teachers), so this never creates resources - only lists, changes status
 * (publish/archive), and soft-deletes across all uploaders.
 */
class ItemBankController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * Get all resources system-wide
     * GET /admin/itembank
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $status = $this->query('status', '');
        $departmentId = $this->query('department_id', '');
        $classId = $this->query('class_id', '');
        $subjectId = $this->query('subject_id', '');
        $search = $this->query('search', '');

        $where = ['q.deleted_at IS NULL'];
        $params = [];

        if (!empty($status)) {
            $where[] = 'q.status = :status';
            $params['status'] = $status;
        }

        if (!empty($departmentId)) {
            $where[] = 'q.department_id = :department_id';
            $params['department_id'] = $departmentId;
        }

        if (!empty($classId)) {
            $where[] = 'q.class_id = :class_id';
            $params['class_id'] = $classId;
        }

        if (!empty($subjectId)) {
            $where[] = 'q.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if (!empty($search)) {
            // Non-emulated PDO prepares can't reuse one named placeholder twice in a query.
            $where[] = '(q.question_text LIKE :search1 OR q.explanation LIKE :search2 OR t.first_name LIKE :search3 OR t.last_name LIKE :search4)';
            $searchTerm = "%{$search}%";
            $params['search1'] = $searchTerm;
            $params['search2'] = $searchTerm;
            $params['search3'] = $searchTerm;
            $params['search4'] = $searchTerm;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT q.id, q.question_text as title, q.explanation as description,
                       q.file_path, q.file_type, q.file_size,
                       q.status, q.published_at, q.created_at, q.updated_at,
                       q.subject_id, q.class_id, q.department_id, q.created_by,
                       s.name as subject_name, s.code as subject_code,
                       c.name as class_name, c.level as class_level, c.stream_name as class_stream_name,
                       d.name as department_name,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM item_bank_questions q
                LEFT JOIN subjects s ON q.subject_id = s.id
                LEFT JOIN classes c ON q.class_id = c.id
                LEFT JOIN departments d ON q.department_id = d.id
                LEFT JOIN teachers t ON q.created_by = t.id
                WHERE {$whereClause}
                ORDER BY q.updated_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $resources = $stmt->fetchAll();

        $countsStmt = $this->db->prepare(
            "SELECT status, COUNT(*) as count FROM item_bank_questions WHERE deleted_at IS NULL GROUP BY status"
        );
        $countsStmt->execute();
        $counts = ['draft' => 0, 'published' => 0, 'archived' => 0];
        foreach ($countsStmt->fetchAll() as $row) {
            $counts[$row['status']] = (int) $row['count'];
        }

        $this->success([
            'resources' => $resources,
            'stats' => [
                'total' => array_sum($counts),
                'draft' => $counts['draft'],
                'published' => $counts['published'],
                'archived' => $counts['archived'],
            ],
        ]);
    }

    /**
     * Change a resource's lifecycle status (publish/archive/revert to draft)
     * PUT /admin/itembank/{id}
     */
    public function update(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');
        $data = $this->input();

        if (empty($data['status']) || !in_array($data['status'], ['draft', 'published', 'archived'], true)) {
            $this->validationError(['status' => 'status must be one of draft, published, archived']);
            return;
        }

        $stmt = $this->db->prepare("SELECT id, status, question_text AS title, department_id, class_id FROM item_bank_questions WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        $resource = $stmt->fetch();

        if (!$resource) {
            $this->notFound('Resource not found');
            return;
        }

        $oldStatus = $resource['status'];
        $newStatus = $data['status'];

        try {
            $sql = $newStatus === 'published' && $oldStatus !== 'published'
                ? "UPDATE item_bank_questions SET status = :status, published_at = NOW(), updated_at = NOW() WHERE id = :id"
                : "UPDATE item_bank_questions SET status = :status, updated_at = NOW() WHERE id = :id";

            $stmt = $this->db->prepare($sql);
            $stmt->execute(['status' => $newStatus, 'id' => $id]);

            if ($oldStatus !== 'published' && $newStatus === 'published' && $resource['department_id'] && $resource['class_id']) {
                (new NotificationService())->notifyDepartmentClass(
                    (int) $resource['department_id'],
                    (int) $resource['class_id'],
                    'new_item_bank_resource',
                    'New item bank resource',
                    "A new item bank resource \"{$resource['title']}\" is now available.",
                    ['resource_id' => $id]
                );
            }

            $this->success([], 'Resource status updated successfully');
        } catch (\PDOException $e) {
            error_log('Failed to update item bank resource status: ' . $e->getMessage());
            $this->error('Failed to update resource status', 500);
        }
    }

    /**
     * Delete a resource (soft delete) - moderation action, works across any uploader
     * DELETE /admin/itembank/{id}
     */
    public function delete(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        $stmt = $this->db->prepare("SELECT id FROM item_bank_questions WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Resource not found');
            return;
        }

        try {
            $stmt = $this->db->prepare("UPDATE item_bank_questions SET deleted_at = NOW() WHERE id = :id");
            $stmt->execute(['id' => $id]);

            $this->success([], 'Resource deleted successfully');
        } catch (\PDOException $e) {
            error_log('Failed to delete item bank resource: ' . $e->getMessage());
            $this->error('Failed to delete resource', 500);
        }
    }

    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
