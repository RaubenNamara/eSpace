<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student Library Controller
 *
 * Read-only access to PDF library resources - a book is visible once published if the student
 * is enrolled in its department, and (when the book targets a specific class) the student's
 * class in that department matches. Mirrors the eNotes visibility rule.
 */
class LibraryController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getStudentId(): ?int
    {
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return null;
        }

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM students WHERE id = :user_id AND deleted_at IS NULL");
        $stmt->execute(['user_id' => $userId]);
        $student = $stmt->fetch();

        return $student ? (int) $student['id'] : null;
    }

    /**
     * Visibility rule shared by index() and show(): the book must be published, and the
     * student must have a department enrollment matching the book's department where, if the
     * book targets a specific class, that enrollment's class also matches. The enrollment must
     * also have existed by the time the book was published (sde.end_date, NULL for a still-
     * active enrollment) - this is what lets a promoted student keep seeing everything already
     * published for their new class (no lower bound: content from before they joined still
     * shows), while a closed enrollment from a class they've since left stops surfacing
     * anything published after they left. See 068_extend_student_department_enrollments.sql.
     */
    private function visibilityClause(): string
    {
        return "lb.status = 'published' AND lb.deleted_at IS NULL AND EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            WHERE sde.student_id = :student_id
              AND sde.department_id = lb.department_id
              AND sde.deleted_at IS NULL
              AND (lb.class_id IS NULL OR sde.class_id = lb.class_id)
              AND lb.published_at <= COALESCE(sde.end_date, NOW())
        )";
    }

    /**
     * Get all library books visible to the student
     * GET /student/library
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

        $search = $this->query('search', '');
        $subjectId = $this->query('subject_id', '');

        $db = $this->getDb();

        $where = [$this->visibilityClause()];
        $params = ['student_id' => $studentId];

        if (!empty($search)) {
            $where[] = '(lb.title LIKE :search OR lb.description LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        if (!empty($subjectId)) {
            $where[] = 'lb.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT lb.id, lb.title, lb.description, lb.subject_id, lb.class_id, lb.file_path,
                       lb.file_type, lb.file_size, lb.total_pages, lb.published_at, lb.created_at,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN teachers t ON lb.uploaded_by = t.id
                WHERE {$whereClause}
                ORDER BY lb.published_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $books = $stmt->fetchAll();

        $this->success(['books' => $books]);
    }

    /**
     * Get a single book
     * GET /student/library/{id}
     */
    public function show($id): void
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

        $id = (int) $id;
        $db = $this->getDb();

        $whereClause = $this->visibilityClause();

        $sql = "SELECT lb.id, lb.title, lb.description, lb.subject_id, lb.class_id, lb.file_path,
                       lb.file_type, lb.file_size, lb.total_pages, lb.published_at, lb.created_at,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN teachers t ON lb.uploaded_by = t.id
                WHERE lb.id = :id AND {$whereClause}";

        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'student_id' => $studentId]);
        $book = $stmt->fetch();

        if (!$book) {
            $this->notFound('Book not found or not accessible');
            return;
        }

        $this->success($book);
    }
}
