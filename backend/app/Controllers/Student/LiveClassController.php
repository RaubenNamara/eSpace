<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\BBBService;
use eSpace\App\Services\LiveClassService;

/**
 * Student Live Class Controller
 *
 * Lets a student see live classes scheduled for their enrolled department/class and join one
 * (as an attendee) while it's running. Mirrors the eLibrary/Item Bank visibility rule, without a
 * draft/published gate since scheduled/started/ended/cancelled are all meaningful states for a
 * student to see.
 */
class LiveClassController extends Controller
{
    private const SELECT_COLUMNS = "lc.id, lc.subject_id, lc.class_id, lc.class_group_name, lc.title, lc.description,
                       lc.scheduled_start, lc.scheduled_end, lc.actual_start, lc.actual_end,
                       lc.is_recorded, lc.recording_url, lc.status, lc.created_at,
                       s.name as subject_name, s.code as subject_code,
                       c.name as class_name, c.level as class_level, c.stream_name as class_stream_name,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name,
                       EXISTS (
                           SELECT 1 FROM live_class_attendance a
                           WHERE a.live_class_id = lc.id AND a.student_id = :attendance_student_id
                             AND a.join_time IS NOT NULL AND a.leave_time IS NULL
                       ) as already_joined";

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
        $stmt = $db->prepare("SELECT id, first_name, last_name FROM students WHERE id = :user_id AND deleted_at IS NULL");
        $stmt->execute(['user_id' => $userId]);
        $student = $stmt->fetch();

        return $student ? (int) $student['id'] : null;
    }

    private function getStudentName(int $studentId): string
    {
        $stmt = $this->getDb()->prepare("SELECT first_name, last_name FROM students WHERE id = :id");
        $stmt->execute(['id' => $studentId]);
        $student = $stmt->fetch();
        return $student ? trim($student['first_name'] . ' ' . $student['last_name']) : 'Student';
    }

    private function visibilityClause(): string
    {
        // Three ways a live class's class_id/class_group_name can match a student's own
        // enrollment: an exact single-stream match, an "All Streams" class-level match (the
        // student's enrolled class shares lc.class_group_name's name, regardless of which stream),
        // or both columns NULL (a whole-department broadcast - the pre-existing meaning of a NULL
        // class_id, kept as-is for anything not associated with either targeting mode).
        return "lc.deleted_at IS NULL AND EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
            WHERE sde.student_id = :student_id
              AND sde.department_id = lc.department_id
              AND sde.deleted_at IS NULL
              AND sde.status = 'active'
              AND (
                (lc.class_id IS NULL AND lc.class_group_name IS NULL)
                OR sde.class_id = lc.class_id
                OR (lc.class_group_name IS NOT NULL AND sde_c.name = lc.class_group_name)
              )
        ) AND NOT EXISTS (
            SELECT 1 FROM student_teacher_enrollments ste
            WHERE ste.student_id = :student_id_te
              AND ste.teacher_id = lc.created_by
              AND ste.department_id = lc.department_id
              AND ste.status = 'withdrawn'
        )";
    }

    /**
     * Get live classes visible to the student
     * GET /student/live-classes
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

        $status = $this->query('status', '');

        $db = $this->getDb();
        $where = [$this->visibilityClause()];
        $params = ['student_id' => $studentId, 'attendance_student_id' => $studentId, 'student_id_te' => $studentId];

        if (!empty($status)) {
            $where[] = 'lc.status = :status';
            $params['status'] = $status;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT " . self::SELECT_COLUMNS . "
                FROM live_classes lc
                LEFT JOIN subjects s ON lc.subject_id = s.id
                LEFT JOIN classes c ON lc.class_id = c.id
                LEFT JOIN teachers t ON lc.created_by = t.id
                WHERE {$whereClause}
                ORDER BY lc.scheduled_start DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $classes = $stmt->fetchAll();

        $this->success(['classes' => $classes]);
    }

    /**
     * Join a live class as an attendee
     * POST /student/live-classes/{id}/join
     */
    public function join($id): void
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
        $stmt = $db->prepare("SELECT * FROM live_classes lc WHERE lc.id = :id AND {$whereClause}");
        $stmt->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found or not accessible');
            return;
        }

        if ($class['status'] !== 'started') {
            $this->error('This class is not currently live', 400);
            return;
        }

        try {
            $bbb = new BBBService();
            $joinUrl = $bbb->getJoinUrl([
                'meetingID' => $class['meeting_id'],
                'fullName' => $this->getStudentName($studentId),
                'password' => $class['attendee_password'],
                'userID' => 'student-' . $studentId,
            ]);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        try {
            $stmt = $db->prepare(
                "INSERT INTO live_class_attendance (live_class_id, student_id, join_time, created_at)
                 VALUES (:live_class_id, :student_id, NOW(), NOW())
                 ON DUPLICATE KEY UPDATE join_time = NOW(), leave_time = NULL, duration_minutes = NULL, attendance_status = 'present'"
            );
            $stmt->execute(['live_class_id' => $id, 'student_id' => $studentId]);
        } catch (\PDOException $e) {
            // Attendance logging is best-effort - don't block the student from joining over it
            error_log('Failed to log live class attendance: ' . $e->getMessage());
        }

        $this->success(['join_url' => $joinUrl]);
    }

    /**
     * Record that the student left the meeting (their BBB tab closed) - re-opens the Join button
     * for this class since the join endpoint's ON DUPLICATE KEY UPDATE will otherwise leave
     * already_joined stuck true until the whole class ends.
     * POST /student/live-classes/{id}/leave
     */
    public function leave($id): void
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
        $stmt = $db->prepare("SELECT lc.id FROM live_classes lc WHERE lc.id = :id AND {$whereClause}");
        $stmt->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Live class not found or not accessible');
            return;
        }

        (new LiveClassService())->recordStudentLeave($id, $studentId);

        $this->success([], 'Left the live class');
    }

    /**
     * Get recordings for a live class the student had access to
     * GET /student/live-classes/{id}/recordings
     */
    public function recordings($id): void
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
        $stmt = $db->prepare("SELECT * FROM live_classes lc WHERE lc.id = :id AND {$whereClause}");
        $stmt->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found or not accessible');
            return;
        }

        $service = new LiveClassService();
        $service->syncRecordings($id, $class['meeting_id']);

        $this->success(['recordings' => $service->getStoredRecordings($id, false)]);
    }
}
