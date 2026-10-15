<?php

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\Config\Database;

/**
 * The student's own activity report: over a period they choose, what they did and what they
 * did not do - assessments given, done, missed and still open (with marks once returned), what
 * they read and watched, the live classes they joined, and the days they were active.
 *
 * GET /student/reports/activity?period=week|month|term|year
 * GET /student/reports/activity?from=YYYY-MM-DD&to=YYYY-MM-DD
 */
class ActivityReportController extends Controller
{
    public function activity(): void
    {
        $this->requireAuth();
        $this->requireRole('student');
        $studentId = (int) $this->getCurrentUserId();
        $db = Database::getInstance();

        [$from, $to, $label] = $this->range($db);
        $fromSql = $from->format('Y-m-d 00:00:00');
        $toSql = $to->format('Y-m-d 23:59:59');

        // ---- assessments: the same eligibility as the Assessments page (Student\AssignmentController::index)
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.due_date, COALESCE(a.published_at, a.created_at) AS set_at, s.name AS subject_name,
                    COALESCE(sub.status, 'new') AS submission_status, sub.percentage
             FROM assignments a
             INNER JOIN subjects s ON a.subject_id = s.id
             LEFT JOIN (
                 SELECT * FROM assignment_submissions WHERE student_id = :sid_sub AND deleted_at IS NULL ORDER BY attempt_number DESC
             ) sub ON a.id = sub.assignment_id
             WHERE a.status = 'published' AND a.deleted_at IS NULL
               AND (a.open_at IS NULL OR a.open_at <= NOW())
               AND COALESCE(a.due_date, a.published_at, a.created_at) BETWEEN :from AND :to
               AND EXISTS (
                   SELECT 1 FROM student_department_enrollments sde
                   LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                   WHERE sde.student_id = :sid_enrol
                     AND (
                       sde.class_id = a.class_id
                       OR (a.class_group_name IS NOT NULL AND sde_c.name = a.class_group_name)
                       OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id AND ac.class_id = sde.class_id)
                     )
                     AND sde.department_id = s.department_id
                     AND sde.deleted_at IS NULL
                     AND sde.status = 'active'
                     AND COALESCE(a.published_at, a.created_at) BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
               )
               AND NOT EXISTS (
                   SELECT 1 FROM student_teacher_enrollments ste
                   WHERE ste.student_id = :sid_te AND ste.teacher_id = a.teacher_id
                     AND ste.department_id = s.department_id AND ste.status = 'withdrawn'
               )
             ORDER BY COALESCE(a.due_date, a.published_at, a.created_at) DESC"
        );
        $stmt->execute(['sid_sub' => $studentId, 'sid_enrol' => $studentId, 'sid_te' => $studentId, 'from' => $fromSql, 'to' => $toSql]);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $now = new \DateTime();
        $seen = [];
        $items = [];
        $bySubject = [];
        $counts = ['given' => 0, 'done' => 0, 'missed' => 0, 'open' => 0];
        $marks = [];
        foreach ($rows as $r) {
            $id = (int) $r['id'];
            if (isset($seen[$id])) continue; // the derived table can yield one row per attempt
            $seen[$id] = true;

            $s = $r['submission_status'];
            $released = $s === 'returned';
            if (in_array($s, ['submitted', 'marking', 'graded', 'returned'], true)) {
                $state = 'done';
            } elseif (!empty($r['due_date']) && $now > new \DateTime($r['due_date'])) {
                $state = 'missed';
            } else {
                $state = 'open';
            }
            $pct = $released && $r['percentage'] !== null ? round((float) $r['percentage'], 1) : null;

            $counts['given']++;
            $counts[$state]++;
            if ($pct !== null) $marks[] = $pct;

            $subj = $r['subject_name'];
            $bySubject[$subj] ??= ['subject' => $subj, 'given' => 0, 'done' => 0, 'missed' => 0, 'open' => 0, 'marks' => []];
            $bySubject[$subj]['given']++;
            $bySubject[$subj][$state]++;
            if ($pct !== null) $bySubject[$subj]['marks'][] = $pct;

            $items[] = [
                'id' => $id,
                'title' => $r['title'],
                'subject' => $subj,
                'due_date' => $r['due_date'],
                'state' => $state,
                'percentage' => $pct,
            ];
        }
        $subjects = array_values(array_map(function ($b) {
            $b['average'] = $b['marks'] ? round(array_sum($b['marks']) / count($b['marks']), 1) : null;
            unset($b['marks']);
            return $b;
        }, $bySubject));
        usort($subjects, fn($a, $b) => $b['given'] <=> $a['given'] ?: strcmp($a['subject'], $b['subject']));

        // ---- reading, watching, joining
        $one = function (string $sql, array $params) use ($db) {
            $q = $db->prepare($sql);
            $q->execute($params);
            return $q->fetch(\PDO::FETCH_ASSOC) ?: [];
        };
        $p = ['sid' => $studentId, 'from' => $fromSql, 'to' => $toSql];
        $pages = $one("SELECT COUNT(*) AS pages, COUNT(DISTINCT topic_id) AS topics, COALESCE(SUM(seconds), 0) AS seconds
                       FROM enote_page_views WHERE student_id = :sid AND last_viewed_at BETWEEN :from AND :to", $p);
        $books = $one("SELECT COUNT(*) AS books FROM library_progress WHERE student_id = :sid AND last_read_at BETWEEN :from AND :to", $p);
        $videos = $one("SELECT COUNT(*) AS watched, SUM(completed_at IS NOT NULL AND completed_at BETWEEN :from2 AND :to2) AS finished
                        FROM video_views WHERE student_id = :sid AND last_watched_at BETWEEN :from AND :to", $p + ['from2' => $fromSql, 'to2' => $toSql]);
        $live = $one("SELECT COUNT(DISTINCT live_class_id) AS joined FROM live_class_attendance WHERE student_id = :sid AND join_time BETWEEN :from AND :to", $p);
        $liveHeld = $one(
            "SELECT COUNT(*) AS held FROM live_classes lc
             WHERE lc.deleted_at IS NULL AND lc.status <> 'cancelled' AND lc.scheduled_start BETWEEN :from AND :to AND lc.scheduled_start <= NOW()
               AND lc.class_id IN (SELECT class_id FROM student_department_enrollments WHERE student_id = :sid AND deleted_at IS NULL AND status = 'active')
               AND (lc.department_id IS NULL OR lc.department_id IN (SELECT department_id FROM student_department_enrollments WHERE student_id = :sid2 AND deleted_at IS NULL AND status = 'active'))",
            $p + ['sid2' => $studentId]
        );

        $q = $db->prepare("SELECT day FROM learning_activity_days WHERE student_id = ? AND day BETWEEN ? AND ? ORDER BY day");
        $q->execute([$studentId, $from->format('Y-m-d'), $to->format('Y-m-d')]);
        $activeDays = array_column($q->fetchAll(\PDO::FETCH_ASSOC), 'day');

        $this->success([
            'range' => ['from' => $from->format('Y-m-d'), 'to' => $to->format('Y-m-d'), 'label' => $label, 'days' => (int) $from->diff($to)->days + 1],
            'assessments' => $counts + ['average' => $marks ? round(array_sum($marks) / count($marks), 1) : null, 'marked' => count($marks)],
            'subjects' => $subjects,
            'items' => $items,
            'reading' => ['pages' => (int) ($pages['pages'] ?? 0), 'topics' => (int) ($pages['topics'] ?? 0), 'minutes' => (int) round(($pages['seconds'] ?? 0) / 60), 'books' => (int) ($books['books'] ?? 0)],
            'videos' => ['watched' => (int) ($videos['watched'] ?? 0), 'finished' => (int) ($videos['finished'] ?? 0)],
            'live' => ['joined' => (int) ($live['joined'] ?? 0), 'held' => (int) ($liveHeld['held'] ?? 0)],
            'active_days' => $activeDays,
        ]);
    }

    /** The period asked for: [from, to, label] */
    private function range($db): array
    {
        $today = new \DateTime('today');
        $f = $_GET['from'] ?? null;
        $t = $_GET['to'] ?? null;
        if ($f && $t && preg_match('/^\d{4}-\d{2}-\d{2}$/', $f) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $t)) {
            $from = new \DateTime($f);
            $to = new \DateTime($t);
            if ($from > $to) [$from, $to] = [$to, $from];
            return [$from, $to, $from->format('j M Y') . ' - ' . $to->format('j M Y')];
        }

        $period = $_GET['period'] ?? 'term';
        if ($period === 'week') return [(clone $today)->modify('-6 days'), $today, 'The last 7 days'];
        if ($period === 'month') return [(clone $today)->modify('-29 days'), $today, 'The last 30 days'];

        // the term today falls in (or the one marked current), and its academic year
        $term = $db->query(
            "SELECT id, name, start_date, end_date, academic_year_id FROM terms
             WHERE deleted_at IS NULL AND CURDATE() BETWEEN start_date AND end_date
             ORDER BY start_date DESC LIMIT 1"
        )->fetch(\PDO::FETCH_ASSOC) ?: $db->query(
            "SELECT id, name, start_date, end_date, academic_year_id FROM terms WHERE deleted_at IS NULL AND is_current = 1 LIMIT 1"
        )->fetch(\PDO::FETCH_ASSOC);
        if (!$term) return [(clone $today)->modify('-89 days'), $today, 'The last 90 days'];

        if ($period === 'year') {
            $q = $db->prepare("SELECT MIN(start_date) AS s, MAX(end_date) AS e FROM terms WHERE academic_year_id = ? AND deleted_at IS NULL");
            $q->execute([$term['academic_year_id']]);
            $y = $q->fetch(\PDO::FETCH_ASSOC);
            $to = min(new \DateTime($y['e']), $today);
            return [new \DateTime($y['s']), $to, 'This school year'];
        }
        $to = min(new \DateTime($term['end_date']), $today);
        return [new \DateTime($term['start_date']), $to, $term['name']];
    }
}
