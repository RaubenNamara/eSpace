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
            LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
            WHERE sde.student_id = :student_id
              AND sde.department_id = v.department_id
              AND sde.deleted_at IS NULL
              AND sde.status = 'active'
              AND (
                (v.class_id IS NULL AND v.class_group_name IS NULL)
                OR sde.class_id = v.class_id
                OR (v.class_group_name IS NOT NULL AND sde_c.name = v.class_group_name)
              )
              AND v.published_at <= COALESCE(sde.end_date, NOW())
        ) AND NOT EXISTS (
            SELECT 1 FROM student_teacher_enrollments ste
            WHERE ste.student_id = :student_id_te
              AND ste.teacher_id = v.teacher_id
              AND ste.department_id = v.department_id
              AND ste.status = 'withdrawn'
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
        $params = ['student_id' => $studentId, 'student_id_te' => $studentId];

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
        $stmt->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        $video = $stmt->fetch();

        if (!$video) {
            $this->notFound('Video not found or not accessible');
            return;
        }

        $this->success($video);
    }

    /**
     * Records watch progress for engagement analytics (Teacher/HOD/Admin engagement dashboards).
     * The player calls this throttled (see Videos.vue), never on every timeupdate tick. Percentage
     * only ever moves forward (GREATEST()) - scrubbing back doesn't undo progress already reached.
     * completed_at is set once, the first time 90% is crossed - see the engagement-analytics plan's
     * "watched" threshold.
     * POST /student/videos/{id}/watch-progress
     */
    public function recordWatchProgress($id): void
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
        $visible = $db->prepare("SELECT v.id, v.duration FROM videos v WHERE v.id = :id AND {$whereClause}");
        $visible->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        $video = $visible->fetch();
        if (!$video) {
            $this->notFound('Video not found or not accessible');
            return;
        }

        $percentage = (float) $this->input('percentage_watched', 0);
        $percentage = max(0.0, min(100.0, $percentage));
        $watchedSeconds = $video['duration'] ? (int) round($percentage / 100 * (int) $video['duration']) : 0;
        $completedNow = $percentage >= 90;

        $stmt = $db->prepare(
            "INSERT INTO video_views (video_id, student_id, percentage_watched, watched_seconds, last_watched_at, completed_at)
             VALUES (:video_id, :student_id, :percentage, :watched_seconds, NOW(), :completed_at)
             ON DUPLICATE KEY UPDATE
                percentage_watched = GREATEST(percentage_watched, VALUES(percentage_watched)),
                watched_seconds = GREATEST(watched_seconds, VALUES(watched_seconds)),
                last_watched_at = NOW(),
                completed_at = COALESCE(completed_at, VALUES(completed_at))"
        );
        $stmt->execute([
            'video_id' => $id,
            'student_id' => $studentId,
            'percentage' => $percentage,
            'watched_seconds' => $watchedSeconds,
            'completed_at' => $completedNow ? date('Y-m-d H:i:s') : null,
        ]);

        $this->success(['recorded' => true]);
    }
}
