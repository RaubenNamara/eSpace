<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student's own private per-page summary/notes - a small "what I understood from this page" box,
 * one per (student, page). Never exposed to teachers/HOD/admin - these are personal study notes,
 * not an engagement signal or something gradeable.
 */
class PageNoteController extends Controller
{
    private const MAX_LENGTH = 2000;

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

    // Mirrors Student\ENoteController::visibilityClause() - a student can only attach a note to a
    // page they're actually allowed to read.
    private function enoteVisibilityClause(): string
    {
        return "et.status = 'published' AND et.deleted_at IS NULL AND EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
            WHERE sde.student_id = :student_id
              AND sde.department_id = et.department_id
              AND sde.deleted_at IS NULL
              AND sde.status = 'active'
              AND (
                (et.class_id IS NULL AND et.class_group_name IS NULL)
                OR sde.class_id = et.class_id
                OR (et.class_group_name IS NOT NULL AND sde_c.name = et.class_group_name)
              )
              AND et.published_at <= COALESCE(sde.end_date, NOW())
        ) AND NOT EXISTS (
            SELECT 1 FROM student_teacher_enrollments ste
            WHERE ste.student_id = :student_id_te
              AND ste.teacher_id = et.teacher_id
              AND ste.department_id = et.department_id
              AND ste.status = 'withdrawn'
        )";
    }

    // Mirrors Student\LibraryController::visibilityClause().
    private function libraryVisibilityClause(): string
    {
        return "lb.status = 'published' AND lb.deleted_at IS NULL AND EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
            WHERE sde.student_id = :student_id
              AND sde.department_id = lb.department_id
              AND sde.deleted_at IS NULL
              AND sde.status = 'active'
              AND (
                (lb.class_id IS NULL AND lb.class_group_name IS NULL)
                OR sde.class_id = lb.class_id
                OR (lb.class_group_name IS NOT NULL AND sde_c.name = lb.class_group_name)
              )
              AND lb.published_at <= COALESCE(sde.end_date, NOW())
        ) AND NOT EXISTS (
            SELECT 1 FROM student_teacher_enrollments ste
            WHERE ste.student_id = :student_id_te
              AND ste.teacher_id = lb.uploaded_by
              AND ste.department_id = lb.department_id
              AND ste.status = 'withdrawn'
        )";
    }

    /**
     * GET /student/enotes/pages/{pageId}/note
     */
    private const COLORS = ['yellow', 'blue', 'green', 'pink', 'purple', 'orange'];

    /** The requested summary colour if it's one of the palette's, else null (student default). */
    private function inputColor(): ?string
    {
        $color = $this->input('color');
        return is_string($color) && in_array($color, self::COLORS, true) ? $color : null;
    }

    public function getEnoteNote($pageId): void
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

        $pageId = (int) $pageId;
        $db = $this->getDb();
        $whereClause = $this->enoteVisibilityClause();

        $stmt = $db->prepare(
            "SELECT ep.id FROM enote_pages ep
             INNER JOIN enote_topics et ON ep.topic_id = et.id
             WHERE ep.id = :page_id AND ep.is_active = 1 AND ep.deleted_at IS NULL AND {$whereClause}"
        );
        $stmt->execute(['page_id' => $pageId, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Page not found or not accessible');
            return;
        }

        $stmt = $db->prepare(
            "SELECT content, color, updated_at FROM enote_page_notes WHERE page_id = :page_id AND student_id = :student_id"
        );
        $stmt->execute(['page_id' => $pageId, 'student_id' => $studentId]);
        $note = $stmt->fetch();

        $this->success(['content' => $note['content'] ?? '', 'color' => $note['color'] ?? null, 'updated_at' => $note['updated_at'] ?? null]);
    }

    /**
     * PUT /student/enotes/pages/{pageId}/note
     */
    public function saveEnoteNote($pageId): void
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

        $pageId = (int) $pageId;
        $content = trim((string) ($this->input('content') ?? ''));
        if (mb_strlen($content) > self::MAX_LENGTH) {
            $this->error('Note is too long (max ' . self::MAX_LENGTH . ' characters)', 422);
            return;
        }

        $db = $this->getDb();
        $whereClause = $this->enoteVisibilityClause();

        $stmt = $db->prepare(
            "SELECT ep.id FROM enote_pages ep
             INNER JOIN enote_topics et ON ep.topic_id = et.id
             WHERE ep.id = :page_id AND ep.is_active = 1 AND ep.deleted_at IS NULL AND {$whereClause}"
        );
        $stmt->execute(['page_id' => $pageId, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Page not found or not accessible');
            return;
        }

        $color = $this->inputColor();

        if ($content === '' && $color === null) {
            $stmt = $db->prepare("DELETE FROM enote_page_notes WHERE page_id = :page_id AND student_id = :student_id");
            $stmt->execute(['page_id' => $pageId, 'student_id' => $studentId]);
            $this->success([], 'Note cleared');
            return;
        }

        $stmt = $db->prepare(
            "INSERT INTO enote_page_notes (page_id, student_id, content, color)
             VALUES (:page_id, :student_id, :content, :color)
             ON DUPLICATE KEY UPDATE content = :content_update, color = :color_update"
        );
        $stmt->execute([
            'page_id' => $pageId, 'student_id' => $studentId,
            'content' => $content, 'content_update' => $content,
            'color' => $color, 'color_update' => $color,
        ]);

        $this->success([], 'Note saved');
    }

    /**
     * GET /student/library/books/{bookId}/pages/{pageNumber}/note
     */
    public function getLibraryNote($bookId, $pageNumber): void
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

        $bookId = (int) $bookId;
        $pageNumber = (int) $pageNumber;
        $db = $this->getDb();
        $whereClause = $this->libraryVisibilityClause();

        $stmt = $db->prepare("SELECT lb.id FROM library_books lb WHERE lb.id = :id AND {$whereClause}");
        $stmt->execute(['id' => $bookId, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Book not found or not accessible');
            return;
        }

        $stmt = $db->prepare(
            "SELECT content, color, updated_at FROM library_page_notes
             WHERE book_id = :book_id AND page_number = :page_number AND student_id = :student_id"
        );
        $stmt->execute(['book_id' => $bookId, 'page_number' => $pageNumber, 'student_id' => $studentId]);
        $note = $stmt->fetch();

        $this->success(['content' => $note['content'] ?? '', 'color' => $note['color'] ?? null, 'updated_at' => $note['updated_at'] ?? null]);
    }

    /**
     * PUT /student/library/books/{bookId}/pages/{pageNumber}/note
     */
    public function saveLibraryNote($bookId, $pageNumber): void
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

        $bookId = (int) $bookId;
        $pageNumber = (int) $pageNumber;
        $content = trim((string) ($this->input('content') ?? ''));
        if (mb_strlen($content) > self::MAX_LENGTH) {
            $this->error('Note is too long (max ' . self::MAX_LENGTH . ' characters)', 422);
            return;
        }

        $db = $this->getDb();
        $whereClause = $this->libraryVisibilityClause();

        $stmt = $db->prepare("SELECT lb.id FROM library_books lb WHERE lb.id = :id AND {$whereClause}");
        $stmt->execute(['id' => $bookId, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Book not found or not accessible');
            return;
        }

        $color = $this->inputColor();

        if ($content === '' && $color === null) {
            $stmt = $db->prepare(
                "DELETE FROM library_page_notes WHERE book_id = :book_id AND page_number = :page_number AND student_id = :student_id"
            );
            $stmt->execute(['book_id' => $bookId, 'page_number' => $pageNumber, 'student_id' => $studentId]);
            $this->success([], 'Note cleared');
            return;
        }

        $stmt = $db->prepare(
            "INSERT INTO library_page_notes (book_id, page_number, student_id, content, color)
             VALUES (:book_id, :page_number, :student_id, :content, :color)
             ON DUPLICATE KEY UPDATE content = :content_update, color = :color_update"
        );
        $stmt->execute([
            'book_id' => $bookId,
            'page_number' => $pageNumber,
            'student_id' => $studentId,
            'content' => $content,
            'content_update' => $content,
            'color' => $color,
            'color_update' => $color,
        ]);

        $this->success([], 'Note saved');
    }
}
