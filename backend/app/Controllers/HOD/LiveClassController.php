<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\BBBService;
use eSpace\App\Services\LiveClassService;

/**
 * HOD Live Class Controller
 *
 * Read-only oversight of live classes run by teachers in the HOD's department. HOD can watch a
 * running session (joins as an attendee/observer, never as moderator) but can't create, edit, or
 * end other teachers' classes.
 */
class LiveClassController extends Controller
{
    private const SELECT_COLUMNS = "lc.id, lc.subject_id, lc.class_id, lc.title, lc.description,
                       lc.scheduled_start, lc.scheduled_end, lc.actual_start, lc.actual_end,
                       lc.is_recorded, lc.recording_url, lc.status, lc.created_at,
                       s.name as subject_name, s.code as subject_code,
                       c.name as class_name, c.level as class_level, c.stream_name as class_stream_name,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name";

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getHodId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    private function getHodName(): string
    {
        $stmt = $this->getDb()->prepare(
            "SELECT t.first_name, t.last_name FROM hods h
             LEFT JOIN teachers t ON h.teacher_id = t.id
             WHERE h.id = :id"
        );
        $stmt->execute(['id' => $this->getHodId()]);
        $hod = $stmt->fetch();

        if ($hod && $hod['first_name']) {
            return trim($hod['first_name'] . ' ' . $hod['last_name']);
        }

        return 'Head of Department';
    }

    private function getHodDepartmentId(): ?int
    {
        $hodId = $this->getHodId();
        if (!$hodId) {
            return null;
        }

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT department_id FROM hods WHERE id = :hod_id AND deleted_at IS NULL");
        $stmt->execute(['hod_id' => $hodId]);
        $hod = $stmt->fetch();

        return $hod ? (int) $hod['department_id'] : null;
    }

    /**
     * Get live classes run by teachers in the HOD's department
     * GET /hod/live-classes
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $status = $this->query('status', '');

        $db = $this->getDb();
        $where = ['lc.department_id = :department_id', 'lc.deleted_at IS NULL'];
        $params = ['department_id' => $departmentId];

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

        $this->success(['classes' => $classes, 'summary' => $this->getSummary($departmentId)]);
    }

    /**
     * Department-scoped Live Classes dashboard summary: live now / upcoming today / completed
     * today / students currently online (department roster) / recorded sessions, plus a list of
     * scheduled lessons that are overdue (scheduled_start has passed but the teacher never
     * started them) - the "is a teacher actually conducting their scheduled lessons" signal.
     */
    private function getSummary(int $departmentId): array
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            "SELECT
                SUM(status = 'started') AS live_now,
                SUM(status = 'scheduled' AND DATE(scheduled_start) = CURDATE()) AS upcoming_today,
                SUM(status = 'ended' AND DATE(COALESCE(actual_end, scheduled_end)) = CURDATE()) AS completed_today
             FROM live_classes
             WHERE department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['department_id' => $departmentId]);
        $counts = $stmt->fetch() ?: [];

        $stmt = $db->prepare(
            "SELECT COUNT(DISTINCT sde.student_id) AS c
             FROM student_department_enrollments sde
             JOIN students s ON s.id = sde.student_id
             WHERE sde.department_id = :department_id AND sde.deleted_at IS NULL AND s.deleted_at IS NULL
               AND s.last_active_at IS NOT NULL AND s.last_active_at >= (NOW() - INTERVAL 5 MINUTE)"
        );
        $stmt->execute(['department_id' => $departmentId]);
        $studentsOnline = (int) ($stmt->fetch()['c'] ?? 0);

        $stmt = $db->prepare(
            "SELECT COUNT(*) AS c
             FROM live_class_recordings r
             JOIN live_classes lc ON lc.id = r.live_class_id
             WHERE lc.department_id = :department_id AND lc.deleted_at IS NULL AND r.is_published = 1"
        );
        $stmt->execute(['department_id' => $departmentId]);
        $recordedSessions = (int) ($stmt->fetch()['c'] ?? 0);

        $stmt = $db->prepare(
            "SELECT lc.id, lc.title, lc.scheduled_start, t.first_name AS teacher_first_name, t.last_name AS teacher_last_name
             FROM live_classes lc
             LEFT JOIN teachers t ON lc.created_by = t.id
             WHERE lc.department_id = :department_id AND lc.deleted_at IS NULL
               AND lc.status = 'scheduled' AND lc.scheduled_start < (NOW() - INTERVAL 15 MINUTE)
             ORDER BY lc.scheduled_start ASC
             LIMIT 20"
        );
        $stmt->execute(['department_id' => $departmentId]);
        $overdue = $stmt->fetchAll();

        return [
            'live_now' => (int) ($counts['live_now'] ?? 0),
            'upcoming_today' => (int) ($counts['upcoming_today'] ?? 0),
            'completed_today' => (int) ($counts['completed_today'] ?? 0),
            'students_online' => $studentsOnline,
            'recorded_sessions' => $recordedSessions,
            'overdue_lessons' => $overdue,
        ];
    }

    /**
     * Attendance for a live class run by a teacher in this HOD's department (read-only oversight).
     * GET /hod/live-classes/{id}/attendance
     */
    public function attendance($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id FROM live_classes WHERE id = :id AND department_id = :department_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Live class not found');
            return;
        }

        $stmt = $db->prepare(
            "SELECT a.student_id, a.join_time, a.leave_time, a.duration_minutes, a.attendance_status,
                    s.first_name, s.last_name, s.admission_number
             FROM live_class_attendance a
             JOIN students s ON s.id = a.student_id
             WHERE a.live_class_id = :id
             ORDER BY a.join_time ASC"
        );
        $stmt->execute(['id' => $id]);

        $this->success(['attendance' => $stmt->fetchAll()]);
    }

    /**
     * Recordings for a live class run by a teacher in this HOD's department.
     * GET /hod/live-classes/{id}/recordings
     */
    public function recordings($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND department_id = :department_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found');
            return;
        }

        $service = new LiveClassService();
        $service->syncRecordings($id, $class['meeting_id']);

        $this->success(['recordings' => $service->getStoredRecordings($id, false)]);
    }

    /**
     * Join a live class as an observer (attendee role, not moderator)
     * POST /hod/live-classes/{id}/join
     */
    public function join($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND department_id = :department_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found');
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
                'fullName' => $this->getHodName() . ' (Observer)',
                'password' => $class['attendee_password'],
                'userID' => 'hod-' . $this->getHodId(),
            ]);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $this->success(['join_url' => $joinUrl]);
    }
}
