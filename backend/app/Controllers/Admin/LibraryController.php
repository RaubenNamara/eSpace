<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;

/**
 * Admin Library Controller
 *
 * System-wide view over every teacher's eLibrary uploads, for moderation. Admin accounts have
 * no row in the teachers table (library_books.uploaded_by is a NOT NULL FK to teachers), so
 * unlike Teacher\LibraryController this never creates books - only lists, inspects, changes
 * status (publish/archive), and soft-deletes across all uploaders.
 */
class LibraryController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * Get all books system-wide
     * GET /admin/library
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

        $where = ['lb.deleted_at IS NULL'];
        $params = [];

        if (!empty($status)) {
            $where[] = 'lb.status = :status';
            $params['status'] = $status;
        }

        if (!empty($departmentId)) {
            $where[] = 'lb.department_id = :department_id';
            $params['department_id'] = $departmentId;
        }

        if (!empty($classId)) {
            $where[] = 'lb.class_id = :class_id';
            $params['class_id'] = $classId;
        }

        if (!empty($subjectId)) {
            $where[] = 'lb.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if (!empty($search)) {
            // Non-emulated PDO prepares can't reuse one named placeholder twice in a query.
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
            "SELECT status, COUNT(*) as count FROM library_books WHERE deleted_at IS NULL GROUP BY status"
        );
        $countsStmt->execute();
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
     * Change a book's lifecycle status (publish/archive/revert to draft)
     * PUT /admin/library/{id}
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

        $stmt = $this->db->prepare("SELECT id, status, title, department_id, class_id FROM library_books WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        $book = $stmt->fetch();

        if (!$book) {
            $this->notFound('Book not found');
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
     * Delete a book (soft delete) - moderation action, works across any uploader
     * DELETE /admin/library/{id}
     */
    public function delete(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        $stmt = $this->db->prepare("SELECT id FROM library_books WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Book not found');
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

    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
