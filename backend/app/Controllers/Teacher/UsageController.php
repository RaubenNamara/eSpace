<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Controllers\Admin\StaffActivityController;
use eSpace\App\Services\TeachingUsage;

/**
 * A teacher's own use of Tusome over the last 7 or 30 days, for the chart on their dashboard:
 * each day's sign-ins and the work they did (the same work the admin's staff activity reads -
 * assessments set, scripts marked, eNotes written and edited, videos, live classes, labs, quizzes,
 * questions), with totals and the work by kind.
 *
 * GET /teacher/usage?days=30
 */
class UsageController extends Controller
{
    public function index(): void
    {
        $this->requireAuth();
        $role = $_SESSION['role'] ?? null;
        // a HOD working as their teacher account: the teacher's work, the HOD's sign-ins
        $teacherId = $role === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
        if (!$teacherId) {
            $this->forbidden();
            return;
        }

        $days = (int) $this->query('days', 30);
        if (!in_array($days, [7, 30], true)) {
            $days = 30;
        }
        $start = (new \DateTimeImmutable('today'))->modify('-' . ($days - 1) . ' days');
        $since = $start->format('Y-m-d 00:00:00');

        // one entry per day, oldest first
        $byDay = [];
        for ($i = 0; $i < $days; $i++) {
            $byDay[$start->modify("+{$i} days")->format('Y-m-d')] = ['signins' => 0, 'actions' => 0];
        }

        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare('SELECT DATE(logged_in_at) AS d, COUNT(*) AS n FROM login_logs WHERE user_id = ? AND role = ? AND logged_in_at >= ? GROUP BY d');
        $stmt->execute([(int) ($_SESSION['user_id'] ?? 0), $role === 'hod' ? 'hod' : 'teacher', $since]);
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            if (isset($byDay[$r['d']])) {
                $byDay[$r['d']]['signins'] = (int) $r['n'];
            }
        }

        $kinds = [];
        $activities = (new StaffActivityController())->teacherActivities([$teacherId], $since)[$teacherId] ?? [];
        foreach ($activities as $a) {
            $d = substr((string) $a['at'], 0, 10);
            if (isset($byDay[$d])) {
                $byDay[$d]['actions'] += $a['count'];
            }
            $kinds[$a['type']] = ($kinds[$a['type']] ?? 0) + $a['count'];
        }
        arsort($kinds);

        $series = [];
        foreach ($byDay as $date => $v) {
            $series[] = ['date' => $date] + $v;
        }
        $this->success([
            'days' => $days,
            'series' => $series,
            'totals' => [
                'signins' => array_sum(array_column($series, 'signins')),
                'actions' => array_sum(array_column($series, 'actions')),
                'active_days' => count(array_filter($series, fn ($s) => $s['signins'] || $s['actions'])),
            ],
            'by_kind' => array_map(fn ($k, $n) => ['type' => $k, 'count' => $n], array_keys($kinds), $kinds),
        ]);
    }

    /**
     * The figures for the usage cards on the dashboard: this period and the one before it
     *
     * GET /teacher/usage/summary?days=30
     */
    public function summary(): void
    {
        $this->requireAuth();
        $role = $_SESSION['role'] ?? null;
        $teacherId = $role === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $this->success(TeachingUsage::summary(
            [$teacherId],
            $role === 'hod' ? 'hod' : 'teacher',
            [(int) ($_SESSION['user_id'] ?? 0)],
            (int) $this->query('days', 30)
        ));
    }
}
