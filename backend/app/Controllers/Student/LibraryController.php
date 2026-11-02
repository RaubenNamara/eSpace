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
        $params = ['student_id' => $studentId, 'student_id_te' => $studentId, 'student_id_prog' => $studentId];

        if (!empty($search)) {
            $where[] = '(lb.title LIKE :search1 OR lb.description LIKE :search2)';
            $params['search1'] = "%{$search}%";
            $params['search2'] = "%{$search}%";
        }

        if (!empty($subjectId)) {
            $where[] = 'lb.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT lb.id, lb.title, lb.description, lb.author, lb.cover_image, lb.cover_design, lb.subject_id, lb.class_id, lb.class_group_name, lb.file_path,
                       lb.file_type, lb.file_size, lb.allow_download, lb.total_pages, lb.published_at, lb.created_at,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name,
                       lp.current_page AS progress_page, lp.percentage_completed AS progress_percent,
                       lp.time_spent_minutes AS reading_minutes, lp.created_at AS first_read_at, lp.last_read_at AS progress_last_read_at
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN teachers t ON lb.uploaded_by = t.id
                LEFT JOIN library_progress lp ON lp.book_id = lb.id AND lp.student_id = :student_id_prog
                WHERE {$whereClause}
                ORDER BY lb.published_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $books = $stmt->fetchAll();

        $this->success(['books' => $books, 'subjects' => $this->enrolledSubjects($db, $studentId)]);
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

        $sql = "SELECT lb.id, lb.title, lb.description, lb.author, lb.cover_image, lb.cover_design, lb.subject_id, lb.class_id, lb.class_group_name, lb.file_path,
                       lb.file_type, lb.file_size, lb.allow_download, lb.total_pages, lb.published_at, lb.created_at,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN teachers t ON lb.uploaded_by = t.id
                WHERE lb.id = :id AND {$whereClause}";

        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        $book = $stmt->fetch();

        if (!$book) {
            $this->notFound('Book not found or not accessible');
            return;
        }

        $this->recordRead($db, $id, $studentId);

        $this->success($book);
    }

    /**
     * Marks a book as opened (a row existing means "opened" on the engagement dashboards). How far
     * the student has read, and for how long, comes from the reader through updateProgress().
     */
    private function recordRead($db, int $bookId, int $studentId): void
    {
        $stmt = $db->prepare(
            "INSERT INTO library_progress (book_id, student_id, percentage_completed, last_read_at)
             VALUES (:book_id, :student_id, 0, NOW())
             ON DUPLICATE KEY UPDATE last_read_at = NOW()"
        );
        $stmt->execute(['book_id' => $bookId, 'student_id' => $studentId]);
        // Reading a book counts as a learning day
        \eSpace\App\Services\RewardService::recordLearningDay($studentId);
    }

    /**
     * The reader reports where the student is and how long they've been reading: the page they're
     * on, the book's page count, and the minutes since the last report. The furthest point reached
     * is kept (going back to re-read doesn't lower it); the minutes add up.
     * POST /student/library/{id}/progress   { page?, total_pages?, minutes? }
     */
    public function updateProgress($id): void
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
        $stmt = $db->prepare("SELECT lb.id, lb.total_pages FROM library_books lb WHERE lb.id = :id AND {$this->visibilityClause()}");
        $stmt->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        $book = $stmt->fetch();
        if (!$book) {
            $this->notFound('Book not found or not accessible');
            return;
        }

        $page = max(0, (int) ($this->input('page') ?? 0));
        $total = max(0, (int) ($this->input('total_pages') ?? 0)) ?: (int) $book['total_pages'];
        // a report covers at most a few minutes; anything bigger is a clock gone wrong
        $minutes = min(5, max(0, (int) ($this->input('minutes') ?? 0)));
        $percent = $page > 0 && $total > 0 ? round(min(100, $page / $total * 100), 2) : 0;

        $db->prepare(
            "INSERT INTO library_progress (book_id, student_id, current_page, pages_read, percentage_completed, time_spent_minutes, last_read_at)
             VALUES (:book_id, :student_id, :page, :pages_read, :percent, :minutes, NOW())
             ON DUPLICATE KEY UPDATE
                percentage_completed = IF(:has_page = 1, GREATEST(IF(current_page = 0, 0, percentage_completed), VALUES(percentage_completed)), percentage_completed),
                current_page = IF(:has_page2 = 1, VALUES(current_page), current_page),
                pages_read = GREATEST(pages_read, VALUES(pages_read)),
                time_spent_minutes = time_spent_minutes + VALUES(time_spent_minutes),
                last_read_at = NOW()"
        )->execute([
            'book_id' => $id, 'student_id' => $studentId, 'page' => $page, 'pages_read' => $page,
            'percent' => $percent, 'minutes' => $minutes, 'has_page' => $page > 0 ? 1 : 0, 'has_page2' => $page > 0 ? 1 : 0,
        ]);

        $this->success(['page' => $page, 'percent' => $percent]);
    }

    /**
     * Every subject the student is enrolled in (the subjects of their departments), so the shelf
     * page can show an empty docket for a subject that has no books/topics yet.
     */
    private function enrolledSubjects($db, int $studentId): array
    {
        $stmt = $db->prepare(
            "SELECT DISTINCT s.id, s.name, s.code
             FROM subjects s
             INNER JOIN student_department_enrollments sde ON sde.department_id = s.department_id
             WHERE sde.student_id = :student_id AND sde.deleted_at IS NULL AND sde.status = 'active' AND s.deleted_at IS NULL
             ORDER BY s.name"
        );
        $stmt->execute(['student_id' => $studentId]);
        return $stmt->fetchAll();
    }
}
