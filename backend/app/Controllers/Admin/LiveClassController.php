<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\BBBService;
use eSpace\App\Services\LiveClassService;

/**
 * Admin Live Class Controller
 *
 * Read-only, school-wide oversight of live classes. Admin can watch a running session (joins as
 * an attendee/observer, never as moderator) but can't create, edit, or end a teacher's class.
 */
class LiveClassController extends Controller
{
    private const SELECT_COLUMNS = "lc.id, lc.subject_id, lc.class_id, lc.department_id, lc.title, lc.description,
                       lc.scheduled_start, lc.scheduled_end, lc.actual_start, lc.actual_end,
                       lc.is_recorded, lc.recording_url, lc.status, lc.created_at,
                       s.name as subject_name, s.code as subject_code,
                       c.name as class_name, c.level as class_level, c.stream_name as class_stream_name,
                       d.name as department_name,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name";

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getAdminId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Get all live classes school-wide
     * GET /admin/live-classes
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $status = $this->query('status', '');
        $departmentId = $this->query('department_id', '');

        $db = $this->getDb();
        $where = ['lc.deleted_at IS NULL'];
        $params = [];

        if (!empty($status)) {
            $where[] = 'lc.status = :status';
            $params['status'] = $status;
        }

        if (!empty($departmentId)) {
            $where[] = 'lc.department_id = :department_id';
            $params['department_id'] = $departmentId;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT " . self::SELECT_COLUMNS . "
                FROM live_classes lc
                LEFT JOIN subjects s ON lc.subject_id = s.id
                LEFT JOIN classes c ON lc.class_id = c.id
                LEFT JOIN departments d ON lc.department_id = d.id
                LEFT JOIN teachers t ON lc.created_by = t.id
                WHERE {$whereClause}
                ORDER BY lc.scheduled_start DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $classes = $stmt->fetchAll();

        $this->success(['classes' => $classes, 'summary' => $this->getSummary()]);
    }

    /**
     * School-wide Live Classes dashboard summary: live now / upcoming today / completed today /
     * students currently online / recorded sessions.
     */
    private function getSummary(): array
    {
        $db = $this->getDb();

        $stmt = $db->query(
            "SELECT
                SUM(status = 'started') AS live_now,
                SUM(status = 'scheduled' AND DATE(scheduled_start) = CURDATE()) AS upcoming_today,
                SUM(status = 'ended' AND DATE(COALESCE(actual_end, scheduled_end)) = CURDATE()) AS completed_today
             FROM live_classes
             WHERE deleted_at IS NULL"
        );
        $counts = $stmt->fetch() ?: [];

        $stmt = $db->query(
            "SELECT COUNT(*) AS c FROM students
             WHERE deleted_at IS NULL AND last_active_at IS NOT NULL AND last_active_at >= (NOW() - INTERVAL 5 MINUTE)"
        );
        $studentsOnline = (int) ($stmt->fetch()['c'] ?? 0);

        $stmt = $db->query(
            "SELECT COUNT(*) AS c
             FROM live_class_recordings r
             JOIN live_classes lc ON lc.id = r.live_class_id
             WHERE lc.deleted_at IS NULL AND r.is_published = 1"
        );
        $recordedSessions = (int) ($stmt->fetch()['c'] ?? 0);

        return [
            'live_now' => (int) ($counts['live_now'] ?? 0),
            'upcoming_today' => (int) ($counts['upcoming_today'] ?? 0),
            'completed_today' => (int) ($counts['completed_today'] ?? 0),
            'students_online' => $studentsOnline,
            'recorded_sessions' => $recordedSessions,
        ];
    }

    /**
     * Whether the configured BigBlueButton server is reachable
     * GET /admin/live-classes/server-status
     */
    public function serverStatus(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $this->success((new BBBService())->checkServerStatus());
    }

    /**
     * Join a live class as an observer (attendee role, not moderator)
     * POST /admin/live-classes/{id}/join
     */
    public function join($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
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
                'fullName' => 'Admin (Observer)',
                'password' => $class['attendee_password'],
                'userID' => 'admin-' . $this->getAdminId(),
            ]);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $this->success(['join_url' => $joinUrl]);
    }

    /**
     * End a currently-live meeting (moderation safety action - admin can step in even though it
     * isn't their class).
     * POST /admin/live-classes/{id}/end
     */
    public function end($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
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
            $bbb->endMeeting($class['meeting_id'], $class['moderator_password']);
        } catch (\RuntimeException $e) {
            error_log('BBB endMeeting warning (admin) for live class ' . $id . ': ' . $e->getMessage());
        }

        $stmt = $db->prepare("UPDATE live_classes SET status = 'ended', actual_end = NOW(), updated_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $id]);

        if ($class['actual_start']) {
            $stmt = $db->prepare("SELECT actual_start, actual_end FROM live_classes WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $ended = $stmt->fetch();
            (new LiveClassService())->closeAttendance($id, $ended['actual_start'], $ended['actual_end']);
        }

        $this->success([], 'Live class ended');
    }

    /**
     * Cancel a class that hasn't started yet.
     * POST /admin/live-classes/{id}/cancel
     */
    public function cancel($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, status FROM live_classes WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found');
            return;
        }

        if ($class['status'] !== 'scheduled') {
            $this->error('Only classes that have not started yet can be cancelled', 400);
            return;
        }

        $stmt = $db->prepare("UPDATE live_classes SET status = 'cancelled', updated_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $this->success([], 'Live class cancelled');
    }

    /**
     * Attendance for any live class, school-wide.
     * GET /admin/live-classes/{id}/attendance
     */
    public function attendance($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id FROM live_classes WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
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
     * Recordings for any live class, school-wide - includes unpublished ones so admin can manage
     * them.
     * GET /admin/live-classes/{id}/recordings
     */
    public function recordings($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found');
            return;
        }

        $service = new LiveClassService();
        $service->syncRecordings($id, $class['meeting_id']);

        $this->success(['recordings' => $service->getStoredRecordings($id, true)]);
    }

    /**
     * Publish or unpublish a recording (hides it from Teacher/Student/HOD without deleting it).
     * PUT /admin/live-classes/recordings/{recordingId}/publish
     */
    public function publishRecording($recordingId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $recordingId = (int) $recordingId;
        $publish = !empty($this->input('publish'));

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id, record_id FROM live_class_recordings WHERE id = :id");
        $stmt->execute(['id' => $recordingId]);
        $recording = $stmt->fetch();

        if (!$recording) {
            $this->notFound('Recording not found');
            return;
        }

        try {
            $bbb = new BBBService();
            $bbb->publishRecording($recording['record_id'], $publish);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $stmt = $db->prepare("UPDATE live_class_recordings SET is_published = :published, updated_at = NOW() WHERE id = :id");
        $stmt->execute(['published' => $publish ? 1 : 0, 'id' => $recordingId]);

        $this->success([], $publish ? 'Recording published' : 'Recording unpublished');
    }

    /**
     * Permanently delete a recording from the BBB server.
     * DELETE /admin/live-classes/recordings/{recordingId}
     */
    public function deleteRecording($recordingId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $recordingId = (int) $recordingId;

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id, record_id FROM live_class_recordings WHERE id = :id");
        $stmt->execute(['id' => $recordingId]);
        $recording = $stmt->fetch();

        if (!$recording) {
            $this->notFound('Recording not found');
            return;
        }

        try {
            $bbb = new BBBService();
            $bbb->deleteRecording($recording['record_id']);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $stmt = $db->prepare("DELETE FROM live_class_recordings WHERE id = :id");
        $stmt->execute(['id' => $recordingId]);

        $this->success([], 'Recording deleted');
    }
}
