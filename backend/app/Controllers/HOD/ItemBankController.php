<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;

/**
 * HOD Item Bank Controller
 *
 * Moderation view over item bank PDF uploads within the HOD's own department only - identical
 * in shape to HOD\LibraryController, just backed by item_bank_questions instead of
 * library_books. HODs have no row in the teachers table (item_bank_questions.created_by is a
 * NOT NULL FK to teachers), so this never creates resources - only lists, changes status
 * (draft/published/archived), and soft-deletes, scoped strictly to their department.
 */
class ItemBankController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    private function isHOD(): bool
    {
        return $this->getCurrentUserRole() === 'hod';
    }

    private function getHODDepartmentId(): ?int
    {
        $userId = $this->getCurrentUserId();
        if (!$userId || !$this->isHOD()) {
            return null;
        }

        $stmt = $this->db->prepare("SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $userId]);
        $hod = $stmt->fetch();

        return $hod ? (int) $hod['department_id'] : null;
    }

    /**
     * Get all item bank resources in the HOD's department
     * GET /hod/itembank
     */
    public function index(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $status = $this->query('status', '');
        $subjectId = $this->query('subject_id', '');
        $search = $this->query('search', '');

        $where = ['q.deleted_at IS NULL', 'q.department_id = :department_id'];
        $params = ['department_id' => $departmentId];

        if (!empty($status)) {
            $where[] = 'q.status = :status';
            $params['status'] = $status;
        }

        if (!empty($subjectId)) {
            $where[] = 'q.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if (!empty($search)) {
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
            "SELECT status, COUNT(*) as count FROM item_bank_questions WHERE deleted_at IS NULL AND department_id = :department_id GROUP BY status"
        );
        $countsStmt->execute(['department_id' => $departmentId]);
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
     * Change a resource's lifecycle status (publish/archive/revert to draft) - department-scoped
     * PUT /hod/itembank/{id}
     */
    public function update(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $id = (int) $this->routeParam('id');
        $data = $this->input();

        if (empty($data['status']) || !in_array($data['status'], ['draft', 'published', 'archived'], true)) {
            $this->validationError(['status' => 'status must be one of draft, published, archived']);
            return;
        }

        $stmt = $this->db->prepare(
            "SELECT id, status, question_text AS title, department_id, class_id FROM item_bank_questions
             WHERE id = :id AND department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        $resource = $stmt->fetch();

        if (!$resource) {
            $this->notFound('Resource not found in your department');
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
     * Delete a resource (soft delete) - department-scoped moderation action
     * DELETE /hod/itembank/{id}
     */
    public function delete(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $id = (int) $this->routeParam('id');

        $stmt = $this->db->prepare(
            "SELECT id FROM item_bank_questions WHERE id = :id AND department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Resource not found in your department');
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
}
