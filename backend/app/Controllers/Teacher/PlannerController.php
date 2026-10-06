<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * The teacher's week on one screen: scheme-of-work topics planned for the week, live classes,
 * work falling due (and how much of it is waiting to be marked), exams, and a short note per
 * day. Topics are ticked off through the scheme of work's own endpoint (PUT /teacher/scheme/{id}).
 *
 * GET /teacher/planner?week=YYYY-MM-DD   (any day in the week; defaults to this week)
 * PUT /teacher/planner/notes             {day, note}
 */
class PlannerController extends Controller
{
    private function teacherId(): int
    {
        return ($_SESSION['role'] ?? null) === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
    }

    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->teacherId();
        $db = \eSpace\Config\Database::getInstance();
        $tz = new \DateTimeZone('Africa/Kampala');

        $asked = (string) $this->query('week', '');
        $day = preg_match('/^\d{4}-\d{2}-\d{2}$/', $asked) ? new \DateTime($asked, $tz) : new \DateTime('now', $tz);
        $monday = (clone $day)->modify('-' . (((int) $day->format('N')) - 1) . ' days')->setTime(0, 0);
        $sunday = (clone $monday)->modify('+6 days');
        $from = $monday->format('Y-m-d');
        $to = $sunday->format('Y-m-d');

        $days = [];
        for ($i = 0; $i < 7; $i++) {
            $d = (clone $monday)->modify("+{$i} days")->format('Y-m-d');
            $days[$d] = ['date' => $d, 'lessons' => [], 'due' => [], 'exams' => [], 'note' => ''];
        }

        // Scheme-of-work topics planned for this week (they belong to the week, not a day)
        $stmt = $db->prepare(
            "SELECT se.curriculum_topic_id AS topic_id, se.subject_id, se.class_level, se.taught_at,
                    ct.topic, ct.theme_branch, s.name AS subject_name
               FROM scheme_entries se
               JOIN enote_curriculum_topics ct ON ct.id = se.curriculum_topic_id
               JOIN subjects s ON s.id = se.subject_id
              WHERE se.teacher_id = ? AND se.week_start = ?
              ORDER BY s.name, se.class_level, ct.topic"
        );
        $stmt->execute([$teacherId, $from]);
        $topics = array_map(static fn ($r) => [
            'topic_id' => (int) $r['topic_id'],
            'subject_id' => (int) $r['subject_id'],
            'class_level' => $r['class_level'],
            'topic' => $r['topic'],
            'theme' => $r['theme_branch'],
            'subject' => $r['subject_name'],
            'taught' => $r['taught_at'] !== null,
        ], $stmt->fetchAll(\PDO::FETCH_ASSOC));

        // Topics from earlier weeks still not taught - so nothing quietly slips
        $stmt = $db->prepare(
            "SELECT COUNT(*) FROM scheme_entries WHERE teacher_id = ? AND week_start IS NOT NULL AND week_start < ? AND taught_at IS NULL"
        );
        $stmt->execute([$teacherId, $from]);
        $behind = (int) $stmt->fetchColumn();

        // Live classes
        $stmt = $db->prepare(
            "SELECT lc.id, lc.title, lc.scheduled_start, lc.scheduled_end, lc.status, c.name AS class_name, c.stream_name, s.name AS subject_name
               FROM live_classes lc
               LEFT JOIN classes c ON c.id = lc.class_id
               LEFT JOIN subjects s ON s.id = lc.subject_id
              WHERE lc.created_by = ? AND lc.deleted_at IS NULL AND lc.status <> 'cancelled'
                AND DATE(lc.scheduled_start) BETWEEN ? AND ?
              ORDER BY lc.scheduled_start"
        );
        $stmt->execute([$teacherId, $from, $to]);
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $d = substr((string) $r['scheduled_start'], 0, 10);
            if (isset($days[$d])) {
                $days[$d]['lessons'][] = [
                    'id' => (int) $r['id'],
                    'title' => $r['title'],
                    'start' => $r['scheduled_start'],
                    'end' => $r['scheduled_end'],
                    'status' => $r['status'],
                    'class' => trim(($r['class_name'] ?? '') . ' ' . ($r['stream_name'] ?? '')),
                    'subject' => $r['subject_name'],
                ];
            }
        }

        // Work falling due, with how much is waiting to be marked
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.due_date, a.status, c.name AS class_name, c.stream_name,
                    (SELECT COUNT(*) FROM assignment_submissions sub WHERE sub.assignment_id = a.id AND sub.submitted_at IS NOT NULL) AS handed_in,
                    (SELECT COUNT(*) FROM assignment_submissions sub WHERE sub.assignment_id = a.id AND sub.status IN ('submitted', 'marking')) AS to_mark
               FROM assignments a
               LEFT JOIN classes c ON c.id = a.class_id
              WHERE a.teacher_id = ? AND a.deleted_at IS NULL AND a.due_date IS NOT NULL
                AND DATE(a.due_date) BETWEEN ? AND ?
              ORDER BY a.due_date"
        );
        $stmt->execute([$teacherId, $from, $to]);
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $d = substr((string) $r['due_date'], 0, 10);
            if (isset($days[$d])) {
                $days[$d]['due'][] = [
                    'id' => (int) $r['id'],
                    'title' => $r['title'],
                    'due' => $r['due_date'],
                    'status' => $r['status'],
                    'class' => trim(($r['class_name'] ?? '') . ' ' . ($r['stream_name'] ?? '')),
                    'handed_in' => (int) $r['handed_in'],
                    'to_mark' => (int) $r['to_mark'],
                ];
            }
        }

        // Exams touching the week
        $stmt = $db->prepare(
            "SELECT title, class_level, starts_on, ends_on FROM exam_dates
              WHERE deleted_at IS NULL AND DATE(starts_on) <= ? AND DATE(ends_on) >= ? ORDER BY starts_on"
        );
        $stmt->execute([$to, $from]);
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            foreach ($days as $d => $_) {
                if ($d >= substr((string) $r['starts_on'], 0, 10) && $d <= substr((string) $r['ends_on'], 0, 10)) {
                    $days[$d]['exams'][] = ['title' => $r['title'], 'class_level' => $r['class_level']];
                }
            }
        }

        // The teacher's own day notes
        $stmt = $db->prepare("SELECT day, note FROM planner_notes WHERE teacher_id = ? AND day BETWEEN ? AND ?");
        $stmt->execute([$teacherId, $from, $to]);
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            if (isset($days[$r['day']])) {
                $days[$r['day']]['note'] = $r['note'];
            }
        }

        // Scripts waiting to be marked, whatever their due date
        $stmt = $db->prepare(
            "SELECT COUNT(*) FROM assignment_submissions sub JOIN assignments a ON a.id = sub.assignment_id
              WHERE a.teacher_id = ? AND a.deleted_at IS NULL AND sub.status IN ('submitted', 'marking')"
        );
        $stmt->execute([$teacherId]);

        $this->success([
            'week_start' => $from,
            'week_end' => $to,
            'today' => (new \DateTime('now', $tz))->format('Y-m-d'),
            'topics' => $topics,
            'behind' => $behind,
            'to_mark' => (int) $stmt->fetchColumn(),
            'days' => array_values($days),
        ]);
    }

    public function saveNote(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $day = (string) $this->input('day', '');
        $note = trim(mb_substr((string) $this->input('note', ''), 0, 500));
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $day)) {
            $this->validationError(['day' => 'A day is needed']);
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        if ($note === '') {
            $db->prepare("DELETE FROM planner_notes WHERE teacher_id = ? AND day = ?")->execute([$this->teacherId(), $day]);
        } else {
            $db->prepare("INSERT INTO planner_notes (teacher_id, day, note) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE note = VALUES(note)")
                ->execute([$this->teacherId(), $day, $note]);
        }
        $this->success([], 'Saved');
    }
}
