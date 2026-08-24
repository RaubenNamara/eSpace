<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use PDOException;
use RuntimeException;

/**
 * Live Class Service
 *
 * Business logic shared by the Teacher/Student/HOD/Admin Live Class controllers, sitting on top
 * of the low-level BBBService API client. Keeps attendance close-out and recording sync in one
 * place instead of duplicated across four controllers.
 */
class LiveClassService
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Close out any still-open attendance rows for a live class that just ended (join_time set,
     * leave_time never set - e.g. the student never manually left). There's no BBB webhook wired
     * up to know exactly when each student's browser tab closed, so "the meeting ended" is used
     * as the leave time for anyone still marked joined - a reasonable approximation without
     * needing webhook infrastructure. A student whose logged duration comes out under a fifth of
     * the actual session length is flagged left_early rather than present, since they were
     * unlikely to have watched the bulk of the session.
     */
    public function closeAttendance(int $liveClassId, string $actualStart, string $actualEnd): void
    {
        $db = $this->getDb();

        $sessionMinutes = max(1, (int) ((strtotime($actualEnd) - strtotime($actualStart)) / 60));
        $leftEarlyThreshold = max(1, (int) ($sessionMinutes / 5));

        $stmt = $db->prepare(
            "UPDATE live_class_attendance
             SET leave_time = :leave_time,
                 duration_minutes = TIMESTAMPDIFF(MINUTE, join_time, :leave_time2),
                 attendance_status = IF(TIMESTAMPDIFF(MINUTE, join_time, :leave_time3) < :threshold, 'left_early', 'present')
             WHERE live_class_id = :live_class_id AND leave_time IS NULL"
        );
        $stmt->execute([
            'leave_time' => $actualEnd,
            'leave_time2' => $actualEnd,
            'leave_time3' => $actualEnd,
            'threshold' => $leftEarlyThreshold,
            'live_class_id' => $liveClassId,
        ]);
    }

    /**
     * Record that one student left the meeting on their own (closed the BBB tab, clicked a
     * "leave" affordance, etc.) while the class is still running - as opposed to closeAttendance(),
     * which closes out everyone still marked joined once the whole class ends. Frees the student
     * to join again (e.g. their connection dropped) since the join endpoint keys "already in the
     * meeting" off leave_time being NULL. A no-op if the student has no open attendance row.
     */
    public function recordStudentLeave(int $liveClassId, int $studentId): void
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            "UPDATE live_class_attendance
             SET leave_time = NOW(),
                 duration_minutes = TIMESTAMPDIFF(MINUTE, join_time, NOW()),
                 attendance_status = IF(TIMESTAMPDIFF(MINUTE, join_time, NOW()) < 5, 'left_early', 'present')
             WHERE live_class_id = :live_class_id AND student_id = :student_id AND leave_time IS NULL"
        );
        $stmt->execute(['live_class_id' => $liveClassId, 'student_id' => $studentId]);
    }

    /**
     * Close out every still-open attendance row for a student, across all their live classes -
     * called on logout as the authoritative safety net for "the student ended their session",
     * since the frontend's popup-close polling only works while they stay on the Live Classes
     * page in the same tab. Doesn't cover a browser closed outright without logging out first;
     * that would need session-heartbeat staleness detection, which isn't wired up here.
     */
    public function closeAllOpenAttendanceForStudent(int $studentId): void
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            "UPDATE live_class_attendance
             SET leave_time = NOW(),
                 duration_minutes = TIMESTAMPDIFF(MINUTE, join_time, NOW()),
                 attendance_status = IF(TIMESTAMPDIFF(MINUTE, join_time, NOW()) < 5, 'left_early', 'present')
             WHERE student_id = :student_id AND leave_time IS NULL"
        );
        $stmt->execute(['student_id' => $studentId]);
    }

    /**
     * Fetch recordings for a live class from BBB and upsert them into live_class_recordings, then
     * return what's stored locally. Recordings are cached rather than fetched live on every page
     * view - a school-wide "recorded sessions" count (Admin dashboard) would otherwise mean one
     * BBB API call per historical class. Sync failures (BBB unreachable, still processing) are
     * swallowed and the locally-cached rows are returned as-is, so a temporary BBB outage doesn't
     * hide recordings that were already synced.
     */
    public function syncRecordings(int $liveClassId, string $meetingId): void
    {
        $bbb = new BBBService();
        if (!$bbb->isConfigured()) {
            return;
        }

        try {
            $recordings = $bbb->getRecordings($meetingId);
        } catch (RuntimeException $e) {
            error_log("BBB getRecordings warning for live class {$liveClassId}: " . $e->getMessage());
            return;
        }

        if (empty($recordings)) {
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "INSERT INTO live_class_recordings (live_class_id, record_id, start_time, end_time, playback_url, created_at, updated_at)
             VALUES (:live_class_id, :record_id, :start_time, :end_time, :playback_url, NOW(), NOW())
             ON DUPLICATE KEY UPDATE
                start_time = VALUES(start_time),
                end_time = VALUES(end_time),
                playback_url = VALUES(playback_url),
                updated_at = NOW()"
        );

        foreach ($recordings as $recording) {
            try {
                $stmt->execute([
                    'live_class_id' => $liveClassId,
                    'record_id' => $recording['recordId'],
                    'start_time' => $this->toDatetime($recording['startTime']),
                    'end_time' => $this->toDatetime($recording['endTime']),
                    'playback_url' => $recording['playbackUrl'],
                ]);
            } catch (PDOException $e) {
                error_log("Failed to sync recording {$recording['recordId']} for live class {$liveClassId}: " . $e->getMessage());
            }
        }
    }

    /**
     * Locally-cached recordings for a live class. $includeUnpublished controls whether
     * admin/teacher-hidden recordings are included (students/HOD should never see unpublished
     * ones; admin/teacher managing them should).
     */
    public function getStoredRecordings(int $liveClassId, bool $includeUnpublished = false): array
    {
        $db = $this->getDb();

        $where = 'live_class_id = :live_class_id';
        if (!$includeUnpublished) {
            $where .= ' AND is_published = 1';
        }

        $stmt = $db->prepare(
            "SELECT id, record_id, start_time, end_time, playback_url, is_published
             FROM live_class_recordings
             WHERE {$where}
             ORDER BY start_time DESC"
        );
        $stmt->execute(['live_class_id' => $liveClassId]);

        return $stmt->fetchAll();
    }

    /**
     * BBB epoch milliseconds (as returned by getRecordings) to a MySQL DATETIME string, or null.
     */
    private function toDatetime(?string $epochMillis): ?string
    {
        if (empty($epochMillis) || !ctype_digit($epochMillis)) {
            return null;
        }

        return date('Y-m-d H:i:s', (int) ((int) $epochMillis / 1000));
    }
}
