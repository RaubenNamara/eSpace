<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ClassHealthService;

/**
 * "Tusome at your school" - the monthly impact report for the head teacher and the board.
 * One calendar month of learning on Tusome, against the month before: learners and teachers
 * active, notes read, assessments set, handed in, marked and passed, learning outcomes achieved,
 * live classes, then class by class, the teachers who did the most, and week by week.
 * Online learning only - nothing here comes from the school office.
 *
 * GET /admin/impact-report?month=YYYY-MM
 */
class ImpactReportController extends Controller
{
    private const PASS_FROM = 50.0;

    public function index(): void
    {
        if (!$this->isAuthenticated() || !in_array($this->getCurrentUserRole(), ['admin', 'super_admin'], true)) {
            $this->forbidden();
            return;
        }
        $db = \eSpace\Config\Database::getInstance();

        $month = (string) $this->query('month', '');
        if (!preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            $month = date('Y-m');
        }
        $from = $month . '-01 00:00:00';
        $to = date('Y-m-t 23:59:59', strtotime($from));
        $pFrom = date('Y-m-01 00:00:00', strtotime($from . ' -1 month'));
        $pTo = date('Y-m-t 23:59:59', strtotime($pFrom));

        $one = function (string $sql, array $p) use ($db) {
            try {
                $s = $db->prepare($sql);
                $s->execute($p);
                return $s->fetchColumn();
            } catch (\PDOException $e) {
                return 0;
            }
        };
        $all = function (string $sql, array $p) use ($db): array {
            try {
                $s = $db->prepare($sql);
                $s->execute($p);
                return $s->fetchAll(\PDO::FETCH_ASSOC);
            } catch (\PDOException $e) {
                return [];
            }
        };

        $roll = (int) $one(
            "SELECT COUNT(DISTINCT s.id) FROM students s
             INNER JOIN student_department_enrollments sde ON sde.student_id = s.id AND sde.deleted_at IS NULL AND sde.status = 'active'
             WHERE s.deleted_at IS NULL",
            []
        );
        $teachersOnRoll = (int) $one("SELECT COUNT(*) FROM teachers WHERE deleted_at IS NULL AND COALESCE(is_active, 1) = 1", []);

        // Everything that is counted for a month - run for this month and the one before
        $figures = function (string $f, string $t) use ($one): array {
            $w = [$f, $t];
            $returned = $one(
                "SELECT CONCAT(COUNT(*), '|', COALESCE(AVG(percentage), ''), '|', SUM(percentage >= " . self::PASS_FROM . "))
                 FROM assignment_submissions WHERE deleted_at IS NULL AND status = 'returned' AND percentage IS NOT NULL AND released_at BETWEEN ? AND ?",
                $w
            );
            [$marked, $avg, $passed] = array_pad(explode('|', (string) $returned), 3, '');
            return [
                'active_learners' => (int) $one('SELECT COUNT(DISTINCT student_id) FROM student_logins WHERE logged_in_at BETWEEN ? AND ?', $w),
                'sign_ins' => (int) $one('SELECT COUNT(*) FROM student_logins WHERE logged_in_at BETWEEN ? AND ?', $w),
                'active_teachers' => (int) $one("SELECT COUNT(DISTINCT user_id) FROM login_logs WHERE role IN ('teacher', 'hod') AND logged_in_at BETWEEN ? AND ?", $w),
                'topics_published' => (int) $one("SELECT COUNT(*) FROM enote_topics WHERE deleted_at IS NULL AND status = 'published' AND published_at BETWEEN ? AND ?", $w),
                'topics_read' => (int) $one('SELECT COUNT(*) FROM enote_progress WHERE last_read_at BETWEEN ? AND ?', $w),
                'topics_finished' => (int) $one('SELECT COUNT(*) FROM enote_progress WHERE completed_at BETWEEN ? AND ?', $w),
                'readers' => (int) $one('SELECT COUNT(DISTINCT student_id) FROM enote_progress WHERE last_read_at BETWEEN ? AND ?', $w),
                'assessments_set' => (int) $one("SELECT COUNT(*) FROM assignments WHERE deleted_at IS NULL AND status = 'published' AND COALESCE(published_at, created_at) BETWEEN ? AND ?", $w),
                'handed_in' => (int) $one("SELECT COUNT(*) FROM assignment_submissions WHERE deleted_at IS NULL AND status <> 'in_progress' AND submitted_at BETWEEN ? AND ?", $w),
                'marked' => (int) $marked,
                'average' => $avg !== '' ? (int) round((float) $avg) : null,
                'passed' => (int) $passed,
                'live_classes' => (int) $one("SELECT COUNT(*) FROM live_classes WHERE deleted_at IS NULL AND status IN ('started', 'ended') AND COALESCE(actual_start, scheduled_start) BETWEEN ? AND ?", $w),
                'live_attendances' => (int) $one('SELECT COUNT(*) FROM live_class_attendance WHERE COALESCE(join_time, created_at) BETWEEN ? AND ?', $w),
                'revision_days' => (int) $one('SELECT COUNT(*) FROM revision_days WHERE day BETWEEN ? AND ?', [substr($f, 0, 10), substr($t, 0, 10)]),
            ];
        };
        $now = $figures($from, $to);
        $before = $figures($pFrom, $pTo);

        // Learning outcomes: learner x outcome results from work returned this month, achieved at 60%+
        $pairs = $all(
            "SELECT sb.student_id, alo.learning_outcome_id, AVG(sb.percentage) AS pct
             FROM assignment_learning_outcomes alo
             INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL
             INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL AND sb.status = 'returned'
                    AND sb.percentage IS NOT NULL AND sb.released_at BETWEEN ? AND ?
             GROUP BY sb.student_id, alo.learning_outcome_id",
            [$from, $to]
        );
        $achieved = count(array_filter($pairs, fn($r) => (float) $r['pct'] >= ClassHealthService::ACHIEVED_FROM));
        $now['outcome_results'] = count($pairs);
        $now['outcomes_achieved'] = $achieved;

        // Class by class
        $classes = $all(
            "SELECT c.id, c.name, c.stream_name,
                    COUNT(DISTINCT s.id) AS learners,
                    COUNT(DISTINCT sl.student_id) AS active,
                    (SELECT COUNT(*) FROM assignment_submissions sb INNER JOIN students s2 ON s2.id = sb.student_id
                     WHERE s2.class_id = c.id AND sb.deleted_at IS NULL AND sb.status <> 'in_progress' AND sb.submitted_at BETWEEN :f1 AND :t1) AS handed_in,
                    (SELECT AVG(sb.percentage) FROM assignment_submissions sb INNER JOIN students s3 ON s3.id = sb.student_id
                     WHERE s3.class_id = c.id AND sb.deleted_at IS NULL AND sb.status = 'returned' AND sb.percentage IS NOT NULL AND sb.released_at BETWEEN :f2 AND :t2) AS average,
                    (SELECT COUNT(*) FROM enote_progress ep INNER JOIN students s4 ON s4.id = ep.student_id
                     WHERE s4.class_id = c.id AND ep.last_read_at BETWEEN :f3 AND :t3) AS topics_read
             FROM classes c
             INNER JOIN students s ON s.class_id = c.id AND s.deleted_at IS NULL
             LEFT JOIN student_logins sl ON sl.student_id = s.id AND sl.logged_in_at BETWEEN :f4 AND :t4
             WHERE c.deleted_at IS NULL
             GROUP BY c.id, c.name, c.stream_name
             ORDER BY c.name, c.stream_name",
            ['f1' => $from, 't1' => $to, 'f2' => $from, 't2' => $to, 'f3' => $from, 't3' => $to, 'f4' => $from, 't4' => $to]
        );
        $classes = array_map(fn($c) => [
            'label' => $c['name'] . ($c['stream_name'] ? ' ' . $c['stream_name'] : ''),
            'learners' => (int) $c['learners'],
            'active' => (int) $c['active'],
            'handed_in' => (int) $c['handed_in'],
            'average' => $c['average'] !== null ? (int) round((float) $c['average']) : null,
            'topics_read' => (int) $c['topics_read'],
        ], $classes);

        // Teachers: what each did this month on Tusome, the busiest first
        $teachers = $all(
            "SELECT t.id, t.first_name, t.last_name,
                    (SELECT COUNT(*) FROM assignments a WHERE a.teacher_id = t.id AND a.deleted_at IS NULL AND a.status = 'published' AND COALESCE(a.published_at, a.created_at) BETWEEN :f1 AND :t1) AS assessments,
                    (SELECT COUNT(*) FROM enote_topics e WHERE e.teacher_id = t.id AND e.deleted_at IS NULL AND e.status = 'published' AND e.published_at BETWEEN :f2 AND :t2) AS enotes,
                    (SELECT COUNT(*) FROM assignment_submissions sb INNER JOIN assignments a2 ON a2.id = sb.assignment_id
                     WHERE a2.teacher_id = t.id AND sb.deleted_at IS NULL AND sb.status = 'returned' AND sb.released_at BETWEEN :f3 AND :t3) AS marked,
                    (SELECT COUNT(*) FROM live_classes lc WHERE lc.created_by = t.id AND lc.deleted_at IS NULL AND lc.status IN ('started', 'ended') AND COALESCE(lc.actual_start, lc.scheduled_start) BETWEEN :f4 AND :t4) AS live
             FROM teachers t WHERE t.deleted_at IS NULL AND COALESCE(t.is_active, 1) = 1",
            ['f1' => $from, 't1' => $to, 'f2' => $from, 't2' => $to, 'f3' => $from, 't3' => $to, 'f4' => $from, 't4' => $to]
        );
        $teachers = array_map(fn($t) => [
            'name' => ucwords(strtolower(trim($t['first_name'] . ' ' . $t['last_name']))),
            'assessments' => (int) $t['assessments'],
            'enotes' => (int) $t['enotes'],
            'marked' => (int) $t['marked'],
            'live' => (int) $t['live'],
        ], $teachers);
        $busy = array_values(array_filter($teachers, fn($t) => $t['assessments'] + $t['enotes'] + $t['marked'] + $t['live'] > 0));
        usort($busy, fn($a, $b) => ($b['assessments'] + $b['enotes'] + $b['marked'] + $b['live']) <=> ($a['assessments'] + $a['enotes'] + $a['marked'] + $a['live']));

        // Week by week through the month (weeks start on Monday)
        $weeks = [];
        $start = strtotime($from);
        $end = strtotime($to);
        $cursor = $start;
        while ($cursor <= $end) {
            $weekEnd = min($end, strtotime('sunday this week 23:59:59', $cursor));
            $wf = date('Y-m-d H:i:s', $cursor);
            $wt = date('Y-m-d H:i:s', $weekEnd);
            $weeks[] = [
                'from' => substr($wf, 0, 10),
                'to' => substr($wt, 0, 10),
                'active_learners' => (int) $one('SELECT COUNT(DISTINCT student_id) FROM student_logins WHERE logged_in_at BETWEEN ? AND ?', [$wf, $wt]),
                'handed_in' => (int) $one("SELECT COUNT(*) FROM assignment_submissions WHERE deleted_at IS NULL AND status <> 'in_progress' AND submitted_at BETWEEN ? AND ?", [$wf, $wt]),
                'topics_read' => (int) $one('SELECT COUNT(*) FROM enote_progress WHERE last_read_at BETWEEN ? AND ?', [$wf, $wt]),
            ];
            $cursor = $weekEnd + 1;
        }

        // The months that have any sign-in, for the month picker
        $months = array_column($all("SELECT DISTINCT DATE_FORMAT(logged_in_at, '%Y-%m') AS m FROM student_logins ORDER BY m DESC LIMIT 24", []), 'm');
        if (!in_array(date('Y-m'), $months, true)) {
            array_unshift($months, date('Y-m'));
        }

        $school = $db->query('SELECT school_name, logo_path, motto, address FROM school_settings WHERE id = 1')->fetch(\PDO::FETCH_ASSOC) ?: [];

        $this->success([
            'month' => $month,
            'label' => date('F Y', strtotime($from)),
            'previous_label' => date('F Y', strtotime($pFrom)),
            'is_current' => $month === date('Y-m'),
            'months' => $months,
            'school' => $school,
            'roll' => ['learners' => $roll, 'teachers' => $teachersOnRoll],
            'now' => $now,
            'before' => $before,
            'classes' => $classes,
            'teachers' => array_slice($busy, 0, 10),
            'quiet_teachers' => count($teachers) - count($busy),
            'weeks' => $weeks,
            'pass_from' => (int) self::PASS_FROM,
        ]);
    }
}
