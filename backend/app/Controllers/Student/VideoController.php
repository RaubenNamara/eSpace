<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student Video Controller
 *
 * Read-only access to video resources - a video is visible once published if the student is
 * enrolled in its department, and (when the video targets a specific class) the student's
 * class in that department matches. Mirrors the eNotes/Library visibility rule.
 */
class VideoController extends Controller
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
     * Visibility rule shared by index() and show(): the video must be published, and the
     * student must have a department enrollment matching the video's department where, if the
     * video targets a specific class, that enrollment's class also matches.
     */
    private function visibilityClause(): string
    {
        return "v.status = 'published' AND v.deleted_at IS NULL AND EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            WHERE sde.student_id = :student_id
              AND sde.department_id = v.department_id
              AND sde.deleted_at IS NULL
              AND (v.class_id IS NULL OR sde.class_id = v.class_id)
              AND v.published_at <= COALESCE(sde.end_date, NOW())
        )";
    }

    /**
     * Get all videos visible to the student
     * GET /student/videos
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
            $where[] = '(v.title LIKE :search OR v.description LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        if (!empty($subjectId)) {
            $where[] = 'v.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT v.id, v.title, v.description, v.subject_id, v.class_id, v.file_path,
                       v.file_size, v.mime_type, v.duration, v.published_at, v.created_at,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM videos v
                LEFT JOIN subjects s ON v.subject_id = s.id
                LEFT JOIN teachers t ON v.teacher_id = t.id
                WHERE {$whereClause}
                ORDER BY v.published_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $videos = $stmt->fetchAll();

        $this->success(['videos' => $videos]);
    }

    /**
     * Get a single video
     * GET /student/videos/{id}
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

        $sql = "SELECT v.id, v.title, v.description, v.subject_id, v.class_id, v.file_path,
                       v.file_size, v.mime_type, v.duration, v.published_at, v.created_at,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM videos v
                LEFT JOIN subjects s ON v.subject_id = s.id
                LEFT JOIN teachers t ON v.teacher_id = t.id
                WHERE v.id = :id AND {$whereClause}";

        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'student_id' => $studentId]);
        $video = $stmt->fetch();

        if (!$video) {
            $this->notFound('Video not found or not accessible');
            return;
        }

        $this->success($video);
    }
}
