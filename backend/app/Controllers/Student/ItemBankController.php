<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student Item Bank Controller
 *
 * Read-only access to PDF item bank resources - identical in shape and behavior to
 * Student\LibraryController, just backed by item_bank_questions instead of library_books. A
 * resource is visible once published if the student is enrolled in its department, and (when the
 * resource targets a specific class) the student's class in that department matches.
 */
class ItemBankController extends Controller
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
     * Visibility rule shared by index() and show(): the resource must be published, and the
     * student must have a department enrollment matching the resource's department where, if the
     * resource targets a specific class, that enrollment's class also matches. The enrollment
     * must also have existed by the time the resource was published (no lower bound - content
     * from before a student joined still shows; a closed enrollment stops surfacing anything
     * published after the student left). See 068_extend_student_department_enrollments.sql.
     */
    private function visibilityClause(): string
    {
        return "q.status = 'published' AND q.deleted_at IS NULL AND EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
            WHERE sde.student_id = :student_id
              AND sde.department_id = q.department_id
              AND sde.deleted_at IS NULL
              AND sde.status = 'active'
              AND (
                (q.class_id IS NULL AND q.class_group_name IS NULL)
                OR sde.class_id = q.class_id
                OR (q.class_group_name IS NOT NULL AND sde_c.name = q.class_group_name)
              )
              AND q.published_at <= COALESCE(sde.end_date, NOW())
        ) AND NOT EXISTS (
            SELECT 1 FROM student_teacher_enrollments ste
            WHERE ste.student_id = :student_id_te
              AND ste.teacher_id = q.created_by
              AND ste.department_id = q.department_id
              AND ste.status = 'withdrawn'
        )";
    }

    /**
     * Get all item bank resources visible to the student
     * GET /student/itembank
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
        $params = ['student_id' => $studentId, 'student_id_te' => $studentId];

        if (!empty($search)) {
            $where[] = '(q.question_text LIKE :search OR q.explanation LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        if (!empty($subjectId)) {
            $where[] = 'q.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT q.id, q.subject_id, q.class_id, q.question_text as title, q.explanation as description,
                       q.file_path, q.file_type, q.file_size, q.published_at, q.created_at,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM item_bank_questions q
                LEFT JOIN subjects s ON q.subject_id = s.id
                LEFT JOIN teachers t ON q.created_by = t.id
                WHERE {$whereClause}
                ORDER BY q.published_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $resources = $stmt->fetchAll();

        $this->success(['resources' => $resources]);
    }

    /**
     * Get a single resource
     * GET /student/itembank/{id}
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

        $sql = "SELECT q.id, q.subject_id, q.class_id, q.question_text as title, q.explanation as description,
                       q.file_path, q.file_type, q.file_size, q.published_at, q.created_at,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM item_bank_questions q
                LEFT JOIN subjects s ON q.subject_id = s.id
                LEFT JOIN teachers t ON q.created_by = t.id
                WHERE q.id = :id AND {$whereClause}";

        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        $resource = $stmt->fetch();

        if (!$resource) {
            $this->notFound('Resource not found or not accessible');
            return;
        }

        $this->recordOpen($db, $id, $studentId);

        $this->success($resource);
    }

    /**
     * Marks a resource as opened for engagement analytics (Teacher/HOD/Admin engagement
     * dashboards). item_bank_attempts has no unique key (it's an attempt log, not a progress
     * table), so this is a check-then-insert rather than an upsert - one "opened" row per
     * (question_id, student_id), simple "opened at least once" tracking per the scope decision in
     * the engagement-analytics plan (this item bank is document resources, not interactive
     * questions with a real answer/is_correct to record).
     */
    private function recordOpen($db, int $questionId, int $studentId): void
    {
        $exists = $db->prepare(
            "SELECT 1 FROM item_bank_attempts WHERE question_id = :question_id AND student_id = :student_id LIMIT 1"
        );
        $exists->execute(['question_id' => $questionId, 'student_id' => $studentId]);
        if ($exists->fetch()) {
            return;
        }

        $stmt = $db->prepare(
            "INSERT INTO item_bank_attempts (question_id, student_id, mode, attempted_at)
             VALUES (:question_id, :student_id, 'practice', NOW())"
        );
        $stmt->execute(['question_id' => $questionId, 'student_id' => $studentId]);
    }
}
