<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\DeviceInfo;

/**
 * Admin System Logs Controller
 *
 * Serves the login history (all roles) shown on the admin System Logs page.
 */
class LogController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * Logins per person per day, the latest day first - one row with how many times they signed
     * in, the first and last time and the last IP, instead of a row for every sign-in.
     * GET /admin/logs?search=&role=&date=YYYY-MM-DD
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $search = $this->query('search', '');
        $role = $this->query('role', '');
        $date = (string) $this->query('date', '');
        $page = max(1, (int) $this->query('page', 1));
        $limit = max(1, min(100, (int) $this->query('limit', 25)));
        $offset = ($page - 1) * $limit;

        $where = [];
        $params = [];

        if (!empty($search)) {
            // Non-emulated PDO prepares (ATTR_EMULATE_PREPARES => false) can't reuse one named
            // placeholder more than once in a query, so each LIKE gets its own bound copy.
            $where[] = '(username LIKE :search1 OR full_name LIKE :search2 OR ip_address LIKE :search3)';
            $searchTerm = "%{$search}%";
            $params['search1'] = $searchTerm;
            $params['search2'] = $searchTerm;
            $params['search3'] = $searchTerm;
        }

        if (!empty($role)) {
            $where[] = 'role = :role';
            $params['role'] = $role;
        }

        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            $where[] = 'logged_in_at >= :day_start AND logged_in_at < :day_end';
            $params['day_start'] = $date . ' 00:00:00';
            $params['day_end'] = date('Y-m-d', strtotime($date . ' +1 day')) . ' 00:00:00';
        }

        $whereClause = empty($where) ? '1=1' : implode(' AND ', $where);

        $countStmt = $this->db->prepare(
            "SELECT COUNT(*) AS total, COALESCE(SUM(n), 0) AS logins FROM (
                SELECT COUNT(*) AS n FROM login_logs WHERE {$whereClause}
                GROUP BY user_id, role, DATE(logged_in_at)
            ) g"
        );
        $countStmt->execute($params);
        $counts = $countStmt->fetch();
        $total = (int) $counts['total'];

        $stmt = $this->db->prepare(
            "SELECT user_id, role, DATE(logged_in_at) AS day,
                    MAX(username) AS username, MAX(full_name) AS full_name,
                    COUNT(*) AS logins, MIN(logged_in_at) AS first_at, MAX(logged_in_at) AS last_at,
                    SUBSTRING_INDEX(GROUP_CONCAT(COALESCE(ip_address, '') ORDER BY logged_in_at DESC SEPARATOR ','), ',', 1) AS last_ip,
                    COUNT(DISTINCT ip_address) AS ips
             FROM login_logs
             WHERE {$whereClause}
             GROUP BY user_id, role, DATE(logged_in_at)
             ORDER BY last_at DESC
             LIMIT {$limit} OFFSET {$offset}"
        );
        $stmt->execute($params);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($rows as &$r) {
            $r['user_id'] = (int) $r['user_id'];
            $r['logins'] = (int) $r['logins'];
            $r['ips'] = (int) $r['ips'];
            $r['last_ip'] = $r['last_ip'] !== '' ? $r['last_ip'] : null;
        }
        unset($r);

        $this->success([
            'days' => $rows,
            'total_logins' => (int) $counts['logins'],
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int) ceil($total / $limit)
            ]
        ]);
    }

    /**
     * Every sign-in of one person on one day, in order - the times, and the device and IP of each.
     * GET /admin/logs/times?user_id=&role=&date=YYYY-MM-DD
     */
    public function times(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $userId = (int) $this->query('user_id', 0);
        $role = (string) $this->query('role', '');
        $date = (string) $this->query('date', '');
        if (!$userId || $role === '' || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            $this->error('user_id, role and date are required', 422);
            return;
        }

        $params = [
            'user_id' => $userId,
            'role' => $role,
            'day_start' => $date . ' 00:00:00',
            'day_end' => date('Y-m-d', strtotime($date . ' +1 day')) . ' 00:00:00',
        ];
        $where = 'WHERE user_id = :user_id AND role = :role AND logged_in_at >= :day_start AND logged_in_at < :day_end ORDER BY logged_in_at ASC';
        try {
            $stmt = $this->db->prepare("SELECT id, logged_in_at, ip_address, user_agent, browser, os, device_type, device_model FROM login_logs {$where}");
            $stmt->execute($params);
        } catch (\PDOException $e) {
            // a database without the device columns yet (migration 139)
            $stmt = $this->db->prepare("SELECT id, logged_in_at, ip_address, user_agent FROM login_logs {$where}");
            $stmt->execute($params);
        }

        $times = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            // older sign-ins only have the User-Agent string - read the device from it
            $dev = !empty($r['browser']) || !empty($r['os'])
                ? ['browser' => $r['browser'], 'os' => $r['os'], 'device_type' => $r['device_type'], 'device_model' => $r['device_model']]
                : DeviceInfo::fromUserAgent((string) ($r['user_agent'] ?? ''));
            $times[] = [
                'id' => (int) $r['id'],
                'logged_in_at' => $r['logged_in_at'],
                'ip_address' => $r['ip_address'],
                'browser' => $dev['browser'] ?? null,
                'os' => $dev['os'] ?? null,
                'device_type' => $dev['device_type'] ?? null,
                'device_model' => $dev['device_model'] ?? null,
            ];
        }

        $this->success(['times' => $times]);
    }

    /**
     * Usage and sign-ins over a day, a week, a month or the current term, for a printed report:
     * who signed in (by role, against the people on roll), sign-ins day by day (hour by hour for a
     * day), what was done - learning and teaching - and the staff who did not sign in at all.
     * GET /admin/logs/report?period=day|week|month|term
     */
    public function report(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }
        $db = $this->db;
        $period = (string) $this->query('period', 'week');
        if (!in_array($period, ['day', 'week', 'month', 'term'], true)) {
            $period = 'week';
        }

        // The window, on the database's clock (sign-ins are written in its time)
        $now = (string) $db->query('SELECT NOW()')->fetchColumn();
        $today = substr($now, 0, 10);
        if ($period === 'day') {
            $from = $today . ' 00:00:00';
            $label = 'Today, ' . date('j F Y', strtotime($today));
        } elseif ($period === 'week') {
            $from = date('Y-m-d 00:00:00', strtotime($today . ' -6 days'));
            $label = 'The last 7 days (' . date('j M', strtotime($from)) . ' - ' . date('j M Y', strtotime($today)) . ')';
        } elseif ($period === 'month') {
            $from = substr($today, 0, 8) . '01 00:00:00';
            $label = date('F Y', strtotime($today));
        } else {
            $term = $db->query("SELECT name, start_date, end_date FROM terms WHERE is_current = 1 AND deleted_at IS NULL ORDER BY start_date DESC LIMIT 1")->fetch(\PDO::FETCH_ASSOC);
            $from = ($term['start_date'] ?? date('Y-m-d', strtotime($today . ' -90 days'))) . ' 00:00:00';
            $label = $term ? $term['name'] . ' (' . date('j M', strtotime($term['start_date'])) . ' - ' . date('j M Y', strtotime($term['end_date'])) . ')' : 'This term';
        }
        $w = ['from' => $from, 'to' => $now];
        // One figure over the window; a table or column this database lacks counts as nothing
        $count = function (string $sql, array $params = []) use ($db): int {
            try {
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
                return (int) $stmt->fetchColumn();
            } catch (\PDOException $e) {
                return 0;
            }
        };
        $in = 'BETWEEN :from AND :to';

        // ---- sign-ins by role, against the people on roll
        $onRoll = [
            'student' => $count('SELECT COUNT(*) FROM students WHERE deleted_at IS NULL AND is_active = 1'),
            'teacher' => $count('SELECT COUNT(*) FROM teachers WHERE deleted_at IS NULL AND is_active = 1'),
            'hod' => $count('SELECT COUNT(*) FROM hods WHERE deleted_at IS NULL AND is_active = 1'),
        ];
        $stmt = $db->prepare("SELECT role, COUNT(*) AS logins, COUNT(DISTINCT user_id) AS people FROM login_logs WHERE logged_in_at $in GROUP BY role");
        $stmt->execute($w);
        $byRole = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $byRole[$r['role']] = ['logins' => (int) $r['logins'], 'people' => (int) $r['people']];
        }
        $roles = [];
        foreach (['student' => 'Students', 'teacher' => 'Teachers', 'hod' => 'Heads of department', 'admin' => 'Administrators', 'super_admin' => 'Super admins'] as $key => $name) {
            $people = $byRole[$key]['people'] ?? 0;
            $roll = $onRoll[$key] ?? null;
            if (!$roll && !$people) {
                continue;
            }
            $roles[] = [
                'role' => $name,
                'people' => $people,
                'on_roll' => $roll,
                'percent' => $roll ? (int) round(100 * $people / $roll) : null,
                'logins' => $byRole[$key]['logins'] ?? 0,
            ];
        }

        // ---- sign-ins over time: hour by hour for a day, otherwise day by day
        $slot = $period === 'day' ? "DATE_FORMAT(logged_in_at, '%H:00')" : 'DATE(logged_in_at)';
        $stmt = $db->prepare("SELECT $slot AS slot, COUNT(*) AS logins, COUNT(DISTINCT role, user_id) AS people FROM login_logs WHERE logged_in_at $in GROUP BY slot ORDER BY slot");
        $stmt->execute($w);
        $series = array_map(fn ($r) => ['slot' => (string) $r['slot'], 'logins' => (int) $r['logins'], 'people' => (int) $r['people']], $stmt->fetchAll(\PDO::FETCH_ASSOC));

        // ---- what was done
        $learning = [
            ['label' => 'Learners active (any learning)', 'value' => $count('SELECT COUNT(DISTINCT student_id) FROM learning_activity_days WHERE day BETWEEN DATE(:from) AND DATE(:to)', $w)],
            ['label' => 'eNote pages read', 'value' => $count("SELECT COUNT(*) FROM enote_page_views WHERE last_viewed_at $in", $w)],
            ['label' => 'eLibrary books opened', 'value' => $count("SELECT COUNT(*) FROM library_progress WHERE last_read_at $in", $w)],
            ['label' => 'Videos watched', 'value' => $count("SELECT COUNT(*) FROM video_views WHERE last_watched_at $in", $w)],
            ['label' => 'Live class attendances', 'value' => $count("SELECT COUNT(*) FROM live_class_attendance WHERE join_time $in", $w)],
            ['label' => 'ICT Lab practicals finished', 'value' => $count("SELECT COUNT(*) FROM ict_lab_attempts WHERE completed_at $in", $w)],
            ['label' => 'Chat messages sent', 'value' => $count("SELECT COUNT(*) FROM chat_messages WHERE created_at $in", $w)],
        ];
        $teaching = [
            ['label' => 'Assessments published', 'value' => $count("SELECT COUNT(*) FROM assignments WHERE deleted_at IS NULL AND published_at $in", $w)],
            ['label' => 'Scripts handed in', 'value' => $count("SELECT COUNT(*) FROM assignment_submissions WHERE deleted_at IS NULL AND submitted_at $in", $w)],
            ['label' => 'Scripts marked', 'value' => $count("SELECT COUNT(*) FROM assignment_submissions WHERE deleted_at IS NULL AND COALESCE(graded_at, marked_at) $in", $w)],
            ['label' => 'Results returned to learners', 'value' => $count("SELECT COUNT(*) FROM assignment_submissions WHERE deleted_at IS NULL AND released_at $in", $w)],
            ['label' => 'Live classes held', 'value' => $count("SELECT COUNT(*) FROM live_classes WHERE deleted_at IS NULL AND COALESCE(actual_start, scheduled_start) $in", $w)],
        ];

        // ---- staff who did not sign in at all during the period (to follow up)
        $quiet = [];
        foreach (['teacher' => ['teachers', 'Teacher'], 'hod' => ['hods', 'Head of department']] as $role => [$table, $roleName]) {
            try {
                $stmt = $db->prepare(
                    "SELECT CONCAT(p.first_name, ' ', p.last_name) AS name,
                            (SELECT MAX(l2.logged_in_at) FROM login_logs l2 WHERE l2.role = :role2 AND l2.user_id = p.id) AS last_seen
                     FROM {$table} p
                     WHERE p.deleted_at IS NULL AND p.is_active = 1
                       AND NOT EXISTS (SELECT 1 FROM login_logs l WHERE l.role = :role AND l.user_id = p.id AND l.logged_in_at BETWEEN :from AND :to)
                     ORDER BY p.first_name, p.last_name"
                );
                $stmt->execute($w + ['role' => $role, 'role2' => $role]);
                foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                    $quiet[] = ['name' => $r['name'], 'role' => $roleName, 'last_seen' => $r['last_seen']];
                }
            } catch (\PDOException $e) {
                // that table isn't on this database
            }
        }

        $busiest = null;
        foreach ($series as $row) {
            if ($busiest === null || $row['logins'] > $busiest['logins']) {
                $busiest = $row;
            }
        }

        $this->success([
            'period' => $period,
            'label' => $label,
            'from' => $from,
            'to' => $now,
            'total_logins' => array_sum(array_column($series, 'logins')),
            'busiest' => $busiest,
            'roles' => $roles,
            'series' => $series,
            'learning' => $learning,
            'teaching' => $teaching,
            'staff_not_signed_in' => $quiet,
        ]);
    }

    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
