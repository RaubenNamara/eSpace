<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Controllers\Student\ENoteController as StudentENoteController;

/**
 * ICT Lab: hands-on computer activities run step by step (the activities and their steps live in
 * the frontend - see components/ictlab/activities.ts). Here: teachers linking a step to one of
 * their eNotes, students' finished attempts, and each student's best score per activity and level.
 */
class IctLabController extends Controller
{
    private const LEVELS = ['simple', 'intermediate', 'advanced'];

    private function db()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private static function validKey(string $key): bool
    {
        return (bool) preg_match('/^[a-z0-9][a-z0-9_-]{0,59}$/', $key);
    }

    /** The teacher acting: a teacher, or a HOD through the teacher account they teach with. */
    private function teacherId(): ?int
    {
        $role = $this->getCurrentUserRole();
        if ($role === 'teacher') return $this->getCurrentUserId();
        if ($role === 'hod') return isset($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        return null;
    }

    /** A link row as the app shows it: "Read about this" with the topic and page. */
    private static function linkOut(array $r): array
    {
        return [
            'activity_key' => $r['activity_key'],
            'step_key' => $r['step_key'],
            'enote_topic_id' => (int) $r['enote_topic_id'],
            'enote_page_id' => $r['enote_page_id'] !== null ? (int) $r['enote_page_id'] : null,
            'topic_title' => $r['topic_title'],
            'page_number' => $r['page_number'] !== null ? (int) $r['page_number'] : null,
            'page_title' => $r['page_title'] ?? null,
        ];
    }

    private const LINK_SELECT = "SELECT l.activity_key, l.step_key, l.enote_topic_id, l.enote_page_id, et.title AS topic_title, ep.title AS page_title,
               (SELECT COUNT(*) FROM enote_pages p2 WHERE p2.topic_id = et.id AND p2.deleted_at IS NULL AND p2.is_active = 1
                  AND p2.order_number <= ep.order_number) AS page_number
        FROM ict_lab_step_links l
        JOIN enote_topics et ON et.id = l.enote_topic_id AND et.deleted_at IS NULL
        LEFT JOIN enote_pages ep ON ep.id = l.enote_page_id AND ep.deleted_at IS NULL";

    /**
     * GET /student/ict-lab - this student's best scores, and the notes their teachers linked
     * (only from eNotes they can read).
     */
    public function studentIndex(): void
    {
        if ($this->getCurrentUserRole() !== 'student') {
            $this->forbidden();
            return;
        }
        $studentId = (int) $this->getCurrentUserId();
        $db = $this->db();

        $stmt = $db->prepare(
            "SELECT activity_key, level, MAX(score) AS best, COUNT(*) AS attempts, MAX(completed_at) AS last_at,
                    MAX(CASE WHEN activity_key LIKE 'typing-%' AND duration_seconds > 0 THEN ROUND(steps_total * 12 / duration_seconds) END) AS best_wpm
             FROM ict_lab_attempts WHERE student_id = ? GROUP BY activity_key, level"
        );
        $stmt->execute([$studentId]);
        $progress = array_map(fn ($r) => [
            'activity_key' => $r['activity_key'],
            'level' => $r['level'],
            'best' => (int) $r['best'],
            'attempts' => (int) $r['attempts'],
            'last_at' => $r['last_at'],
            'best_wpm' => $r['best_wpm'] === null ? null : (int) $r['best_wpm'],
        ], $stmt->fetchAll());

        $stmt = $db->prepare(self::LINK_SELECT . " WHERE " . StudentENoteController::visibilityClause() . " ORDER BY l.updated_at DESC");
        $stmt->execute(['student_id' => $studentId, 'student_id_te' => $studentId]);
        $links = array_map([self::class, 'linkOut'], $stmt->fetchAll());

        $this->success(['progress' => $progress, 'links' => $links]);
    }

    /**
     * POST /student/ict-lab/attempts  { activity_key, level, steps_total, mistakes, hints_used, duration_seconds }
     * The score: 100, less 5 for each mistake and 3 for each hint used. A typing lesson
     * (activity_key typing-...) sends the characters typed as steps_total and the wrong keys as
     * mistakes; its score is the accuracy, and its speed (words a minute) is worked out from
     * steps_total and duration_seconds.
     */
    public function saveAttempt(): void
    {
        if ($this->getCurrentUserRole() !== 'student') {
            $this->forbidden();
            return;
        }
        $activity = (string) ($this->input('activity_key') ?? '');
        $level = (string) ($this->input('level') ?? '');
        if (!self::validKey($activity) || !in_array($level, self::LEVELS, true)) {
            $this->validationError(['activity_key' => 'Unknown activity or level']);
            return;
        }
        $mistakes = max(0, min(999, (int) $this->input('mistakes', 0)));
        $hints = max(0, min(999, (int) $this->input('hints_used', 0)));
        $steps = max(0, min(999, (int) $this->input('steps_total', 0)));
        $seconds = max(0, min(86400, (int) $this->input('duration_seconds', 0)));
        $score = max(0, 100 - $mistakes * 5 - $hints * 3);
        if (str_starts_with($activity, 'typing-')) {
            // no faster than 200 words a minute - a faster "attempt" is not real typing
            $seconds = max($seconds, (int) ceil($steps * 12 / 200));
            $score = $steps + $mistakes > 0 ? (int) round(100 * $steps / ($steps + $mistakes)) : 0;
        }

        $stmt = $this->db()->prepare(
            "INSERT INTO ict_lab_attempts (student_id, activity_key, level, steps_total, mistakes, hints_used, duration_seconds, score, completed_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())"
        );
        $stmt->execute([(int) $this->getCurrentUserId(), $activity, $level, $steps, $mistakes, $hints, $seconds, $score]);
        $this->success(['score' => $score]);
    }

    /**
     * GET /teacher/ict-lab (and /hod/ict-lab) - the steps this teacher has linked to their eNotes.
     */
    public function teacherIndex(): void
    {
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $stmt = $this->db()->prepare(self::LINK_SELECT . " WHERE l.teacher_id = ? ORDER BY l.activity_key, l.step_key");
        $stmt->execute([$teacherId]);
        $this->success(['links' => array_map([self::class, 'linkOut'], $stmt->fetchAll())]);
    }

    /**
     * PUT /teacher/ict-lab/links  { activity_key, step_key, enote_topic_id, enote_page_id? }
     * Link a step to one of the teacher's own eNotes (replaces their earlier link for that step).
     */
    public function saveLink(): void
    {
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $activity = (string) ($this->input('activity_key') ?? '');
        $step = (string) ($this->input('step_key') ?? '');
        $topicId = (int) $this->input('enote_topic_id', 0);
        $pageId = $this->input('enote_page_id') ? (int) $this->input('enote_page_id') : null;
        if (!self::validKey($activity) || !self::validKey($step) || $topicId <= 0) {
            $this->validationError(['enote_topic_id' => 'Choose one of your eNotes']);
            return;
        }
        $db = $this->db();
        $stmt = $db->prepare("SELECT id FROM enote_topics WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL");
        $stmt->execute([$topicId, $teacherId]);
        if (!$stmt->fetchColumn()) {
            $this->validationError(['enote_topic_id' => 'That eNote is not one of yours']);
            return;
        }
        if ($pageId !== null) {
            $stmt = $db->prepare("SELECT id FROM enote_pages WHERE id = ? AND topic_id = ? AND deleted_at IS NULL");
            $stmt->execute([$pageId, $topicId]);
            if (!$stmt->fetchColumn()) {
                $this->validationError(['enote_page_id' => 'That page is not in this eNote']);
                return;
            }
        }
        $stmt = $db->prepare(
            "INSERT INTO ict_lab_step_links (teacher_id, activity_key, step_key, enote_topic_id, enote_page_id)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE enote_topic_id = VALUES(enote_topic_id), enote_page_id = VALUES(enote_page_id), updated_at = NOW()"
        );
        $stmt->execute([$teacherId, $activity, $step, $topicId, $pageId]);

        $stmt = $db->prepare(self::LINK_SELECT . " WHERE l.teacher_id = ? AND l.activity_key = ? AND l.step_key = ?");
        $stmt->execute([$teacherId, $activity, $step]);
        $row = $stmt->fetch();
        $this->success(['link' => $row ? self::linkOut($row) : null], 'Linked');
    }

    /**
     * DELETE /teacher/ict-lab/links/{activity}/{step}
     */
    public function deleteLink($activity, $step): void
    {
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $stmt = $this->db()->prepare("DELETE FROM ict_lab_step_links WHERE teacher_id = ? AND activity_key = ? AND step_key = ?");
        $stmt->execute([$teacherId, (string) $activity, (string) $step]);
        $this->success([], 'Link removed');
    }
}
