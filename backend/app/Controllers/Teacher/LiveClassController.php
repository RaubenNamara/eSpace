<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\BBBService;
use eSpace\App\Services\LiveClassService;
use eSpace\App\Services\NotificationService;

/**
 * Teacher Live Class Controller
 *
 * Schedules and runs BigBlueButton video sessions. Classes are scoped to the teacher's
 * department, a subject in that department, and a class in that department - mirroring how
 * eLibrary/Item Bank resources are scoped. A meeting is only actually created on the BBB server
 * when the teacher starts it (start()); scheduling just reserves the row.
 */
class LiveClassController extends Controller
{
    private const SELECT_COLUMNS = "lc.id, lc.subject_id, lc.class_id, lc.department_id, lc.title, lc.description,
                       lc.scheduled_start, lc.scheduled_end, lc.actual_start, lc.actual_end,
                       lc.is_recorded, lc.recording_url, lc.status, lc.created_at, lc.updated_at,
                       s.name as subject_name, s.code as subject_code,
                       c.name as class_name, c.level as class_level, c.stream_name as class_stream_name";

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    private function getTeacherName(): string
    {
        $teacherId = $this->getTeacherId();
        $stmt = $this->getDb()->prepare("SELECT first_name, last_name FROM teachers WHERE id = :id");
        $stmt->execute(['id' => $teacherId]);
        $teacher = $stmt->fetch();
        return $teacher ? trim($teacher['first_name'] . ' ' . $teacher['last_name']) : 'Teacher';
    }

    /**
     * Session-scoped active department (see Controller::getActiveDepartmentId()) - a teacher in
     * more than one department can switch this via PUT /teacher/departments/active without
     * changing their admin-set primary.
     */
    private function getTeacherDepartmentId(): ?int
    {
        return $this->getActiveDepartmentId();
    }

    /**
     * Get all live classes scheduled by the teacher
     * GET /teacher/live-classes
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $status = $this->query('status', '');

        $db = $this->getDb();
        $where = ['lc.created_by = :teacher_id', 'lc.deleted_at IS NULL'];
        $params = ['teacher_id' => $teacherId];

        if (!empty($status)) {
            $where[] = 'lc.status = :status';
            $params['status'] = $status;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT " . self::SELECT_COLUMNS . "
                FROM live_classes lc
                LEFT JOIN subjects s ON lc.subject_id = s.id
                LEFT JOIN classes c ON lc.class_id = c.id
                WHERE {$whereClause}
                ORDER BY lc.scheduled_start DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $classes = $stmt->fetchAll();

        $this->success(['classes' => $classes]);
    }

    /**
     * "Preview as Student" - Live Classes exactly as a student enrolled in the given class would
     * see them (scoped to this teacher's department + that class, no join action - this is an
     * observation-only preview).
     * GET /teacher/live-classes/preview?class_id=
     */
    public function previewIndex(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        if (!$classId) {
            $this->validationError(['class_id' => 'class_id is required']);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT DISTINCT c.id FROM classes c
             INNER JOIN student_department_enrollments se ON c.id = se.class_id
             WHERE c.id = :class_id AND se.department_id = :department_id
               AND se.deleted_at IS NULL AND c.deleted_at IS NULL"
        );
        $stmt->execute(['class_id' => $classId, 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->error('Class not found in your department', 403);
            return;
        }

        $service = new \eSpace\App\Services\StudentModulePreviewService();
        $this->success(['classes' => $service->getLiveClasses($departmentId, $classId)]);
    }

    /**
     * Get a single live class
     * GET /teacher/live-classes/{id}
     */
    public function show($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $sql = "SELECT " . self::SELECT_COLUMNS . "
                FROM live_classes lc
                LEFT JOIN subjects s ON lc.subject_id = s.id
                LEFT JOIN classes c ON lc.class_id = c.id
                WHERE lc.id = :id AND lc.created_by = :teacher_id AND lc.deleted_at IS NULL";

        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found');
            return;
        }

        $this->success($class);
    }

    /**
     * Schedule a new live class
     * POST /teacher/live-classes
     */
    public function create(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $data = $this->input();

        $errors = $this->validateRequired(['title', 'subject_id', 'class_id', 'scheduled_start', 'scheduled_end']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $start = strtotime($data['scheduled_start']);
        $end = strtotime($data['scheduled_end']);
        if ($start === false || $end === false) {
            $this->validationError(['scheduled_start' => 'Invalid date/time']);
            return;
        }
        if ($end <= $start) {
            $this->validationError(['scheduled_end' => 'End time must be after the start time']);
            return;
        }

        $db = $this->getDb();

        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department to schedule live classes', 403);
            return;
        }

        $stmt = $db->prepare("SELECT id FROM subjects WHERE id = :subject_id AND department_id = :department_id");
        $stmt->execute(['subject_id' => $data['subject_id'], 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->validationError(['subject_id' => 'Subject not found in your department']);
            return;
        }

        $stmt = $db->prepare(
            "SELECT DISTINCT c.id FROM classes c
             INNER JOIN student_department_enrollments se ON c.id = se.class_id
             WHERE c.id = :class_id AND se.department_id = :department_id
               AND se.deleted_at IS NULL AND c.deleted_at IS NULL"
        );
        $stmt->execute(['class_id' => $data['class_id'], 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->validationError(['class_id' => 'Class not found in your department']);
            return;
        }

        $meetingId = 'espace_' . bin2hex(random_bytes(12));
        $moderatorPassword = bin2hex(random_bytes(8));
        $attendeePassword = bin2hex(random_bytes(8));
        $isRecorded = !empty($data['is_recorded']) ? 1 : 0;

        $sql = "INSERT INTO live_classes
                    (subject_id, class_id, department_id, title, description, scheduled_start, scheduled_end,
                     meeting_id, moderator_password, attendee_password, is_recorded, status, created_by,
                     created_at, updated_at)
                VALUES
                    (:subject_id, :class_id, :department_id, :title, :description, :scheduled_start, :scheduled_end,
                     :meeting_id, :moderator_password, :attendee_password, :is_recorded, 'scheduled', :created_by,
                     NOW(), NOW())";

        $stmt = $db->prepare($sql);

        try {
            $stmt->execute([
                'subject_id' => (int) $data['subject_id'],
                'class_id' => (int) $data['class_id'],
                'department_id' => $departmentId,
                'title' => htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8'),
                'description' => !empty($data['description']) ? htmlspecialchars(trim($data['description']), ENT_QUOTES, 'UTF-8') : null,
                'scheduled_start' => date('Y-m-d H:i:s', $start),
                'scheduled_end' => date('Y-m-d H:i:s', $end),
                'meeting_id' => $meetingId,
                'moderator_password' => $moderatorPassword,
                'attendee_password' => $attendeePassword,
                'is_recorded' => $isRecorded,
                'created_by' => $teacherId
            ]);

            $liveClassId = (int) $db->lastInsertId();

            (new NotificationService())->notifyDepartmentClass(
                $departmentId,
                (int) $data['class_id'],
                'new_live_class',
                'New live class scheduled',
                "A live class \"" . htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8') . "\" has been scheduled for " . date('M j, Y g:i A', $start) . ".",
                ['live_class_id' => $liveClassId]
            );

            $this->success(['id' => $liveClassId], 'Live class scheduled successfully');
        } catch (\PDOException $e) {
            error_log('Failed to schedule live class: ' . $e->getMessage());
            $this->error('Failed to schedule live class', 500);
        }
    }

    /**
     * Update a scheduled live class (title/description/subject/class/timing). Can't be edited
     * once it has started.
     * PUT /teacher/live-classes/{id}
     */
    public function update($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $data = $this->input();
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, status FROM live_classes WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found');
            return;
        }

        if ($class['status'] !== 'scheduled') {
            $this->error('Only classes that have not started yet can be edited', 400);
            return;
        }

        $updates = [];
        $params = ['id' => $id];

        if (!empty($data['title'])) {
            $updates[] = 'title = :title';
            $params['title'] = htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8');
        }

        if (array_key_exists('description', $data)) {
            $desc = trim((string) $data['description']);
            $updates[] = 'description = :description';
            $params['description'] = $desc !== '' ? htmlspecialchars($desc, ENT_QUOTES, 'UTF-8') : null;
        }

        if (!empty($data['scheduled_start'])) {
            $start = strtotime($data['scheduled_start']);
            if ($start === false) {
                $this->validationError(['scheduled_start' => 'Invalid date/time']);
                return;
            }
            $updates[] = 'scheduled_start = :scheduled_start';
            $params['scheduled_start'] = date('Y-m-d H:i:s', $start);
        }

        if (!empty($data['scheduled_end'])) {
            $end = strtotime($data['scheduled_end']);
            if ($end === false) {
                $this->validationError(['scheduled_end' => 'Invalid date/time']);
                return;
            }
            $updates[] = 'scheduled_end = :scheduled_end';
            $params['scheduled_end'] = date('Y-m-d H:i:s', $end);
        }

        if (array_key_exists('is_recorded', $data)) {
            $updates[] = 'is_recorded = :is_recorded';
            $params['is_recorded'] = !empty($data['is_recorded']) ? 1 : 0;
        }

        if (empty($updates)) {
            $this->error('No fields to update', 400);
            return;
        }

        $updates[] = 'updated_at = NOW()';
        $sql = "UPDATE live_classes SET " . implode(', ', $updates) . " WHERE id = :id";

        try {
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $this->success([], 'Live class updated successfully');
        } catch (\PDOException $e) {
            error_log('Failed to update live class: ' . $e->getMessage());
            $this->error('Failed to update live class', 500);
        }
    }

    /**
     * Cancel/delete a live class (soft delete). Can't delete a class that's currently live -
     * end it first.
     * DELETE /teacher/live-classes/{id}
     */
    public function delete($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, status FROM live_classes WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found');
            return;
        }

        if ($class['status'] === 'started') {
            $this->error('End the class before deleting it', 400);
            return;
        }

        try {
            $stmt = $db->prepare("UPDATE live_classes SET deleted_at = NOW() WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $this->success([], 'Live class deleted successfully');
        } catch (\PDOException $e) {
            error_log('Failed to delete live class: ' . $e->getMessage());
            $this->error('Failed to delete live class', 500);
        }
    }

    /**
     * Start a scheduled live class - creates the meeting on the BBB server
     * POST /teacher/live-classes/{id}/start
     */
    public function start($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $class = $stmt->fetch();

        if (!$class) {
            $this->notFound('Live class not found');
            return;
        }

        if ($class['status'] !== 'scheduled') {
            $this->error('This class has already started or ended', 400);
            return;
        }

        try {
            $bbb = new BBBService();
            $bbb->createMeeting([
                'meetingID' => $class['meeting_id'],
                'name' => $class['title'],
                'attendeePW' => $class['attendee_password'],
                'moderatorPW' => $class['moderator_password'],
                'record' => $class['is_recorded'] ? 'true' : 'false',
                'welcome' => 'Welcome to ' . $class['title'],
            ]);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $stmt = $db->prepare("UPDATE live_classes SET status = 'started', actual_start = NOW(), updated_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $this->success([], 'Live class started');
    }

    /**
     * End a live class
     * POST /teacher/live-classes/{id}/end
     */
    public function end($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
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
            // The meeting may have already ended on the BBB side (e.g. everyone left) - still
            // record it as ended on our side rather than leaving the teacher stuck.
            error_log('BBB endMeeting warning for live class ' . $id . ': ' . $e->getMessage());
        }

        $stmt = $db->prepare("UPDATE live_classes SET status = 'ended', actual_end = NOW(), updated_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $stmt = $db->prepare("SELECT actual_start, actual_end FROM live_classes WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $ended = $stmt->fetch();
        if ($ended && $ended['actual_start']) {
            (new LiveClassService())->closeAttendance($id, $ended['actual_start'], $ended['actual_end']);
        }

        $this->success([], 'Live class ended');
    }

    /**
     * Get this teacher's join URL (as moderator) for a live class
     * POST /teacher/live-classes/{id}/join
     */
    public function join($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
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
                'fullName' => $this->getTeacherName(),
                'password' => $class['moderator_password'],
                'userID' => 'teacher-' . $teacherId,
            ]);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $this->success(['join_url' => $joinUrl]);
    }

    /**
     * Get recordings for a live class
     * GET /teacher/live-classes/{id}/recordings
     */
    public function recordings($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
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
     * Attendance/participants for a live class - the logged join/leave roster plus, while the
     * class is live, the current headcount straight from BBB.
     * GET /teacher/live-classes/{id}/attendance
     */
    public function attendance($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT * FROM live_classes WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $class = $stmt->fetch();

        if (!$class) {
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
        $attendance = $stmt->fetchAll();

        $liveParticipantCount = null;
        if ($class['status'] === 'started') {
            try {
                $bbb = new BBBService();
                $info = $bbb->getMeetingInfo($class['meeting_id'], $class['moderator_password']);
                $liveParticipantCount = isset($info['participantCount']) ? (int) $info['participantCount'] : null;
            } catch (\RuntimeException $e) {
                error_log('BBB getMeetingInfo warning for live class ' . $id . ': ' . $e->getMessage());
            }
        }

        $this->success([
            'attendance' => $attendance,
            'live_participant_count' => $liveParticipantCount,
        ]);
    }
}
