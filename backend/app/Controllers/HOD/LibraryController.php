<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;

/**
 * HOD Library Controller
 *
 * Moderation view over eLibrary uploads within the HOD's own department only. HODs have no
 * row in the teachers table (library_books.uploaded_by is a NOT NULL FK to teachers), so like
 * Admin\LibraryController this never creates books - only lists, and changes status
 * (draft/published/archived) or soft-deletes, scoped strictly to their department.
 */
class LibraryController extends Controller
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
     * Get all books in the HOD's department
     * GET /hod/library
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

        $where = ['lb.deleted_at IS NULL', 'lb.department_id = :department_id'];
        $params = ['department_id' => $departmentId];

        if (!empty($status)) {
            $where[] = 'lb.status = :status';
            $params['status'] = $status;
        }

        if (!empty($subjectId)) {
            $where[] = 'lb.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if (!empty($search)) {
            $where[] = '(lb.title LIKE :search1 OR lb.description LIKE :search2 OR t.first_name LIKE :search3 OR t.last_name LIKE :search4)';
            $searchTerm = "%{$search}%";
            $params['search1'] = $searchTerm;
            $params['search2'] = $searchTerm;
            $params['search3'] = $searchTerm;
            $params['search4'] = $searchTerm;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT lb.id, lb.title, lb.description, lb.file_path, lb.file_type, lb.file_size,
                       lb.status, lb.published_at, lb.created_at, lb.updated_at,
                       lb.subject_id, lb.class_id, lb.department_id, lb.uploaded_by,
                       s.name as subject_name, s.code as subject_code,
                       c.name as class_name, c.level as class_level, c.stream_name as class_stream_name,
                       d.name as department_name,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN classes c ON lb.class_id = c.id
                LEFT JOIN departments d ON lb.department_id = d.id
                LEFT JOIN teachers t ON lb.uploaded_by = t.id
                WHERE {$whereClause}
                ORDER BY lb.updated_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $books = $stmt->fetchAll();

        $countsStmt = $this->db->prepare(
            "SELECT status, COUNT(*) as count FROM library_books WHERE deleted_at IS NULL AND department_id = :department_id GROUP BY status"
        );
        $countsStmt->execute(['department_id' => $departmentId]);
        $counts = ['draft' => 0, 'published' => 0, 'archived' => 0];
        foreach ($countsStmt->fetchAll() as $row) {
            $counts[$row['status']] = (int) $row['count'];
        }

        $this->success([
            'books' => $books,
            'stats' => [
                'total' => array_sum($counts),
                'draft' => $counts['draft'],
                'published' => $counts['published'],
                'archived' => $counts['archived'],
            ],
        ]);
    }

    /**
     * Change a book's lifecycle status (publish/archive/revert to draft) - department-scoped
     * PUT /hod/library/{id}
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
            "SELECT id, status, title, department_id, class_id FROM library_books
             WHERE id = :id AND department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        $book = $stmt->fetch();

        if (!$book) {
            $this->notFound('Book not found in your department');
            return;
        }

        $oldStatus = $book['status'];
        $newStatus = $data['status'];

        try {
            $sql = $newStatus === 'published' && $oldStatus !== 'published'
                ? "UPDATE library_books SET status = :status, published_at = NOW(), updated_at = NOW() WHERE id = :id"
                : "UPDATE library_books SET status = :status, updated_at = NOW() WHERE id = :id";

            $stmt = $this->db->prepare($sql);
            $stmt->execute(['status' => $newStatus, 'id' => $id]);

            if ($oldStatus !== 'published' && $newStatus === 'published' && $book['department_id'] && $book['class_id']) {
                (new NotificationService())->notifyDepartmentClass(
                    (int) $book['department_id'],
                    (int) $book['class_id'],
                    'new_library_resource',
                    'New eLibrary resource',
                    "A new library resource \"{$book['title']}\" is now available.",
                    ['book_id' => $id]
                );
            }

            $this->success([], 'Book status updated successfully');
        } catch (\PDOException $e) {
            error_log('Failed to update library book status: ' . $e->getMessage());
            $this->error('Failed to update library book status', 500);
        }
    }

    /**
     * Delete a book (soft delete) - department-scoped moderation action
     * DELETE /hod/library/{id}
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
            "SELECT id FROM library_books WHERE id = :id AND department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Book not found in your department');
            return;
        }

        try {
            $stmt = $this->db->prepare("UPDATE library_books SET deleted_at = NOW() WHERE id = :id");
            $stmt->execute(['id' => $id]);

            $this->success([], 'Book deleted successfully');
        } catch (\PDOException $e) {
            error_log('Failed to delete library book: ' . $e->getMessage());
            $this->error('Failed to delete library book', 500);
        }
    }

    /**
     * Sanitize a raw `ids` array from the request body into a deduped list of positive ints.
     */
    private function sanitizeIds($rawIds): array
    {
        if (!is_array($rawIds)) {
            return [];
        }
        $ids = array_map('intval', $rawIds);
        $ids = array_filter($ids, fn($v) => $v > 0);
        return array_values(array_unique($ids));
    }

    /**
     * Re-scope every requested id to this HOD's own department (never trust the client's list
     * wholesale) and return only the ids that actually belong to it and aren't already deleted.
     */
    private function filterDepartmentIds(array $ids, int $departmentId): array
    {
        if (empty($ids)) {
            return [];
        }
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $stmt = $this->db->prepare("SELECT id FROM library_books WHERE id IN ($placeholders) AND department_id = ? AND deleted_at IS NULL");
        $stmt->execute([...$ids, $departmentId]);
        return array_map('intval', array_column($stmt->fetchAll(), 'id'));
    }

    /**
     * Bulk status change across selected books in the HOD's department.
     * POST /hod/library/bulk-status
     */
    public function bulkStatus(): void
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

        $data = $this->input();
        $status = $data['status'] ?? '';
        if (!in_array($status, ['draft', 'published', 'archived'], true)) {
            $this->validationError(['status' => 'status must be draft, published or archived']);
            return;
        }

        $ids = $this->filterDepartmentIds($this->sanitizeIds($data['ids'] ?? []), $departmentId);
        if (empty($ids)) {
            $this->validationError(['ids' => 'No valid resources selected']);
            return;
        }

        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        try {
            $publishedAtClause = $status === 'published' ? ", published_at = NOW()" : "";
            $sql = "UPDATE library_books SET status = ?{$publishedAtClause}, updated_at = NOW() WHERE id IN ($placeholders)";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$status, ...$ids]);

            $this->success(['updated' => count($ids)], count($ids) . ' resource(s) updated');
        } catch (\PDOException $e) {
            error_log('Failed to bulk update library books: ' . $e->getMessage());
            $this->error('Failed to update resources', 500);
        }
    }

    /**
     * Bulk soft delete across selected books in the HOD's department.
     * POST /hod/library/bulk-delete
     */
    public function bulkDelete(): void
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

        $data = $this->input();
        $ids = $this->filterDepartmentIds($this->sanitizeIds($data['ids'] ?? []), $departmentId);
        if (empty($ids)) {
            $this->validationError(['ids' => 'No valid resources selected']);
            return;
        }

        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        try {
            $stmt = $this->db->prepare("UPDATE library_books SET deleted_at = NOW() WHERE id IN ($placeholders)");
            $stmt->execute($ids);

            $this->success(['deleted' => count($ids)], count($ids) . ' resource(s) deleted');
        } catch (\PDOException $e) {
            error_log('Failed to bulk delete library books: ' . $e->getMessage());
            $this->error('Failed to delete resources', 500);
        }
    }

    /**
     * CSV export of selected books (or, with no ids, every book in the HOD's department).
     * POST /hod/library/bulk-export
     */
    public function bulkExport(): void
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

        $data = $this->input();
        $ids = $this->sanitizeIds($data['ids'] ?? []);

        $where = ['lb.department_id = ?', 'lb.deleted_at IS NULL'];
        $params = [$departmentId];

        if (!empty($ids)) {
            $where[] = 'lb.id IN (' . implode(',', array_fill(0, count($ids), '?')) . ')';
            array_push($params, ...$ids);
        }

        $sql = "SELECT lb.title, lb.status, s.name as subject_name, c.name as class_name,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name,
                       lb.file_size, lb.created_at, lb.updated_at
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN classes c ON lb.class_id = c.id
                LEFT JOIN teachers t ON lb.uploaded_by = t.id
                WHERE " . implode(' AND ', $where) . "
                ORDER BY lb.updated_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        foreach ($rows as &$row) {
            $row['teacher'] = trim(($row['teacher_first_name'] ?? '') . ' ' . ($row['teacher_last_name'] ?? ''));
        }

        $this->downloadCsv('library.csv', [
            'Title' => 'title',
            'Status' => 'status',
            'Subject' => 'subject_name',
            'Class' => 'class_name',
            'Teacher' => 'teacher',
            'File Size (bytes)' => 'file_size',
            'Created At' => 'created_at',
            'Updated At' => 'updated_at',
        ], $rows);
    }
}
