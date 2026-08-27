<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student Note Controller
 * 
 * Handles e-notes viewing and progress tracking for students.
 * Shows notes assigned to the student's department.
 */
class NoteController extends Controller
{
    /**
     * Get database instance
     */
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Get current user ID from session
     */
    protected function getCurrentUserId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Get current student ID
     */
    private function getStudentId(): ?int
    {
        $userId = $this->getCurrentUserId();
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
     * Get student's department ID
     */
    private function getStudentDepartmentId(): ?int
    {
        $studentId = $this->getStudentId();
        if (!$studentId) {
            return null;
        }

        $db = $this->getDb();
        $stmt = $db->prepare("
            SELECT department_id
            FROM student_department_enrollments
            WHERE student_id = :student_id AND deleted_at IS NULL AND status = 'active'
            LIMIT 1
        ");
        $stmt->execute(['student_id' => $studentId]);
        $enrollment = $stmt->fetch();

        return $enrollment ? (int) $enrollment['department_id'] : null;
    }

    /**
     * Get all notes available to the student (assigned to their department)
     * GET /student/notes
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

        $departmentId = $this->getStudentDepartmentId();
        if (!$departmentId) {
            $this->success(['notes' => [], 'message' => 'No department enrollment found']);
            return;
        }

        $search = $this->query('search', '');
        $subjectId = $this->query('subject_id', '');
        $page = (int) $this->query('page', 1);
        $limit = (int) $this->query('limit', 20);

        $db = $this->getDb();
        
        // Build query - only show published notes assigned to student's department
        $where = [
            'n.deleted_at IS NULL',
            'n.is_published = 1',
            'n.assigned_to = :assigned_to',
            'n.assigned_id = :department_id',
            'NOT EXISTS (
                SELECT 1 FROM student_teacher_enrollments ste
                WHERE ste.student_id = :student_id_te AND ste.teacher_id = n.created_by
                  AND ste.department_id = :department_id_te AND ste.status = \'withdrawn\'
            )'
        ];
        $params = [
            'assigned_to' => 'department',
            'department_id' => $departmentId,
            'student_id_te' => $studentId,
            'department_id_te' => $departmentId,
        ];

        if (!empty($search)) {
            $where[] = '(title LIKE :search OR content LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        if (!empty($subjectId)) {
            $where[] = 'subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        $whereClause = implode(' AND ', $where);
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM notes n WHERE {$whereClause}";
        $countStmt = $db->prepare($countSql);
        $countStmt->execute($params);
        $total = (int) $countStmt->fetch()['total'];

        // Get paginated results with subject info and student progress
        $offset = ($page - 1) * $limit;
        $sql = "SELECT n.*,
                       s.name as subject_name,
                       s.code as subject_code,
                       t.first_name as teacher_first_name,
                       t.last_name as teacher_last_name,
                       np.percentage_completed,
                       np.last_read_at,
                       np.time_spent_minutes,
                       EXISTS(SELECT 1 FROM notes_bookmarks nb WHERE nb.note_id = n.id AND nb.student_id = :student_id_bookmark) as is_bookmarked
                FROM notes n
                LEFT JOIN subjects s ON n.subject_id = s.id
                LEFT JOIN teachers t ON n.created_by = t.id
                LEFT JOIN notes_progress np ON n.id = np.note_id AND np.student_id = :student_id
                WHERE {$whereClause}
                ORDER BY n.created_at DESC
                LIMIT {$limit} OFFSET {$offset}";

        $stmt = $db->prepare($sql);
        $params['student_id'] = $studentId;
        $params['student_id_bookmark'] = $studentId;
        $stmt->execute($params);
        $notes = $stmt->fetchAll();

        $this->success([
            'notes' => $notes,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ],
            'department_id' => $departmentId
        ]);
    }

    /**
     * Get a single note by ID
     * GET /student/notes/{id}
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

        $departmentId = $this->getStudentDepartmentId();
        if (!$departmentId) {
            $this->error('No department enrollment found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $sql = "SELECT n.*,
                       s.name as subject_name,
                       s.code as subject_code,
                       t.first_name as teacher_first_name,
                       t.last_name as teacher_last_name,
                       np.percentage_completed,
                       np.last_read_at,
                       np.time_spent_minutes,
                       EXISTS(SELECT 1 FROM notes_bookmarks nb WHERE nb.note_id = n.id AND nb.student_id = :student_id_bookmark) as is_bookmarked
                FROM notes n
                LEFT JOIN subjects s ON n.subject_id = s.id
                LEFT JOIN teachers t ON n.created_by = t.id
                LEFT JOIN notes_progress np ON n.id = np.note_id AND np.student_id = :student_id
                WHERE n.id = :id
                  AND n.is_published = 1
                  AND n.assigned_to = :assigned_to
                  AND n.assigned_id = :department_id
                  AND n.deleted_at IS NULL
                  AND NOT EXISTS (
                      SELECT 1 FROM student_teacher_enrollments ste
                      WHERE ste.student_id = :student_id_te AND ste.teacher_id = n.created_by
                        AND ste.department_id = :department_id_te AND ste.status = 'withdrawn'
                  )";

        $stmt = $db->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'student_id' => $studentId,
            'student_id_bookmark' => $studentId,
            'assigned_to' => 'department',
            'department_id' => $departmentId,
            'student_id_te' => $studentId,
            'department_id_te' => $departmentId,
        ]);
        $note = $stmt->fetch();

        if (!$note) {
            $this->notFound('Note not found or not accessible');
            return;
        }

        // Update last_read_at if progress record exists, otherwise create it
        if ($note['last_read_at']) {
            $updateSql = "UPDATE notes_progress SET last_read_at = NOW() WHERE note_id = :note_id AND student_id = :student_id";
            $updateStmt = $db->prepare($updateSql);
            $updateStmt->execute(['note_id' => $id, 'student_id' => $studentId]);
        } else {
            $insertSql = "INSERT INTO notes_progress (note_id, student_id, last_read_at) VALUES (:note_id, :student_id, NOW())";
            $insertStmt = $db->prepare($insertSql);
            $insertStmt->execute(['note_id' => $id, 'student_id' => $studentId]);
        }

        $this->success($note);
    }

    /**
     * Update reading progress for a note
     * POST /student/notes/{id}/progress
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

        $data = $this->input();
        $percentage = (float) ($data['percentage'] ?? 0);
        $timeSpent = (int) ($data['time_spent_minutes'] ?? 0);

        $db = $this->getDb();

        // Check if note exists and is accessible
        $departmentId = $this->getStudentDepartmentId();
        $stmt = $db->prepare("SELECT id FROM notes WHERE id = :id AND is_published = 1 AND assigned_to = :assigned_to AND assigned_id = :department_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'assigned_to' => 'department', 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Note not found or not accessible');
            return;
        }

        // Update or insert progress. Placeholders can't repeat within one statement here -
        // PDO::ATTR_EMULATE_PREPARES is off, so MySQL's native prepare protocol is used and
        // it rejects a named placeholder bound twice (unlike emulated prepares, which allow it).
        $sql = "INSERT INTO notes_progress (note_id, student_id, percentage_completed, time_spent_minutes, last_read_at)
                VALUES (:note_id, :student_id, :percentage, :time_spent, NOW())
                ON DUPLICATE KEY UPDATE
                percentage_completed = :percentage_update,
                time_spent_minutes = time_spent_minutes + :time_spent_update,
                last_read_at = NOW()";

        $stmt = $db->prepare($sql);

        try {
            $stmt->execute([
                'note_id' => $id,
                'student_id' => $studentId,
                'percentage' => $percentage,
                'time_spent' => $timeSpent,
                'percentage_update' => $percentage,
                'time_spent_update' => $timeSpent
            ]);

            $this->success([], 'Progress updated successfully');
        } catch (\PDOException $e) {
            error_log("Failed to update progress: " . $e->getMessage());
            $this->error('Failed to update progress', 500);
        }
    }

    /**
     * Toggle bookmark for a note
     * POST /student/notes/{id}/bookmark
     */
    public function toggleBookmark($id): void
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

        $data = $this->input();
        $noteText = $data['note_text'] ?? null;

        $db = $this->getDb();

        // Check if note exists and is accessible
        $departmentId = $this->getStudentDepartmentId();
        $stmt = $db->prepare("SELECT id FROM notes WHERE id = :id AND is_published = 1 AND assigned_to = :assigned_to AND assigned_id = :department_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'assigned_to' => 'department', 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Note not found or not accessible');
            return;
        }

        // Check if bookmark exists
        $stmt = $db->prepare("SELECT id FROM notes_bookmarks WHERE note_id = :note_id AND student_id = :student_id");
        $stmt->execute(['note_id' => $id, 'student_id' => $studentId]);
        $existing = $stmt->fetch();

        try {
            if ($existing) {
                // Remove bookmark
                $deleteSql = "DELETE FROM notes_bookmarks WHERE note_id = :note_id AND student_id = :student_id";
                $deleteStmt = $db->prepare($deleteSql);
                $deleteStmt->execute(['note_id' => $id, 'student_id' => $studentId]);
                $this->success(['bookmarked' => false], 'Bookmark removed');
            } else {
                // Add bookmark
                $insertSql = "INSERT INTO notes_bookmarks (note_id, student_id, note_text) VALUES (:note_id, :student_id, :note_text)";
                $insertStmt = $db->prepare($insertSql);
                $insertStmt->execute(['note_id' => $id, 'student_id' => $studentId, 'note_text' => $noteText]);
                $this->success(['bookmarked' => true], 'Bookmark added');
            }
        } catch (\PDOException $e) {
            error_log("Failed to toggle bookmark: " . $e->getMessage());
            $this->error('Failed to toggle bookmark', 500);
        }
    }
}
