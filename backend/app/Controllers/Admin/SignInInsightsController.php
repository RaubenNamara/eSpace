<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\DeviceInfo;

/**
 * Sign-in insights for the admin dashboard: how much the school uses eSpace and where.
 * All figures come from login_logs (one row per successful sign-in) set against the accounts
 * that exist, so a department or class is ranked by the share of its people who signed in,
 * not only by raw counts (a big class would otherwise always win).
 *
 * GET /admin/sign-in-insights?days=7
 */
class SignInInsightsController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    public function index(): void
    {
        $role = $this->getCurrentUserRole();
        if ($role !== 'admin' && $role !== 'super_admin') {
            $this->forbidden();
            return;
        }
        $days = (int) $this->query('days', 7);
        if (!in_array($days, [1, 7, 30], true)) {
            $days = 7;
        }
        $since = (new \DateTimeImmutable('today'))->modify('-' . ($days - 1) . ' days')->format('Y-m-d 00:00:00');

        $this->success([
            'days' => $days,
            'since' => $since,
            'totals' => $this->totals($since),
            'timeline' => $this->timeline($since, $days),
            'hours' => $this->hours($since),
            'weekdays' => $days > 1 ? $this->weekdays($since) : [],
            'departments' => $this->departments($since),
            'classes' => $this->classes($since),
            'streams' => $this->streams($since),
            'devices' => $this->devices($since),
        ]);
    }

    /** sign-ins and people per role, against the accounts that exist */
    private function totals(string $since): array
    {
        $stmt = $this->db->prepare("SELECT role, COUNT(*) AS signins, COUNT(DISTINCT user_id) AS people FROM login_logs WHERE logged_in_at >= ? GROUP BY role");
        $stmt->execute([$since]);
        $by = [];
        foreach ($stmt->fetchAll() as $r) {
            $by[$r['role']] = ['signins' => (int) $r['signins'], 'people' => (int) $r['people']];
        }
        $accounts = fn (string $table) => (int) $this->db->query("SELECT COUNT(*) FROM {$table} WHERE deleted_at IS NULL AND is_active = 1")->fetchColumn();
        $out = [];
        foreach (['student' => 'students', 'teacher' => 'teachers', 'hod' => 'hods'] as $role => $table) {
            $out[$role] = ($by[$role] ?? ['signins' => 0, 'people' => 0]) + ['accounts' => $accounts($table)];
        }
        $admin = ($by['admin']['signins'] ?? 0) + ($by['super_admin']['signins'] ?? 0);
        $out['all_signins'] = array_sum(array_column($by, 'signins'));
        $out['admin_signins'] = $admin;
        return $out;
    }

    /** sign-ins per day (per hour for "today"), students and staff apart */
    private function timeline(string $since, int $days): array
    {
        $bucket = $days === 1 ? 'HOUR(logged_in_at)' : 'DATE(logged_in_at)';
        $stmt = $this->db->prepare(
            "SELECT {$bucket} AS b,
                    SUM(role = 'student') AS students,
                    SUM(role IN ('teacher', 'hod')) AS staff
             FROM login_logs WHERE logged_in_at >= ? GROUP BY b ORDER BY b"
        );
        $stmt->execute([$since]);
        $rows = [];
        foreach ($stmt->fetchAll() as $r) {
            $rows[(string) $r['b']] = ['students' => (int) $r['students'], 'staff' => (int) $r['staff']];
        }
        // every bucket, empty ones included, so gaps show as gaps
        $out = [];
        if ($days === 1) {
            $last = (int) date('G');
            for ($h = 0; $h <= $last; $h++) {
                $out[] = ['label' => sprintf('%02d:00', $h), 'key' => (string) $h] + ($rows[(string) $h] ?? ['students' => 0, 'staff' => 0]);
            }
        } else {
            $d = new \DateTimeImmutable(substr($since, 0, 10));
            for ($i = 0; $i < $days; $i++) {
                $k = $d->modify("+{$i} days")->format('Y-m-d');
                $out[] = ['label' => $k, 'key' => $k] + ($rows[$k] ?? ['students' => 0, 'staff' => 0]);
            }
        }
        return $out;
    }

    /** the busiest hours of the day (everyone) */
    private function hours(string $since): array
    {
        $stmt = $this->db->prepare("SELECT HOUR(logged_in_at) AS h, COUNT(*) AS n FROM login_logs WHERE logged_in_at >= ? AND role IN ('student','teacher','hod') GROUP BY h");
        $stmt->execute([$since]);
        $by = array_fill(0, 24, 0);
        foreach ($stmt->fetchAll() as $r) {
            $by[(int) $r['h']] = (int) $r['n'];
        }
        return array_map(fn ($h) => ['hour' => $h, 'signins' => $by[$h]], range(0, 23));
    }

    private function weekdays(string $since): array
    {
        // MySQL DAYOFWEEK: 1 = Sunday
        $stmt = $this->db->prepare("SELECT DAYOFWEEK(logged_in_at) AS d, COUNT(*) AS n FROM login_logs WHERE logged_in_at >= ? AND role IN ('student','teacher','hod') GROUP BY d");
        $stmt->execute([$since]);
        $by = array_fill(1, 7, 0);
        foreach ($stmt->fetchAll() as $r) {
            $by[(int) $r['d']] = (int) $r['n'];
        }
        $names = [2 => 'Mon', 3 => 'Tue', 4 => 'Wed', 5 => 'Thu', 6 => 'Fri', 7 => 'Sat', 1 => 'Sun'];
        $out = [];
        foreach ($names as $d => $name) {
            $out[] = ['day' => $name, 'signins' => $by[$d]];
        }
        return $out;
    }

    /** staff (teachers and HODs) of each department: how many signed in, how often */
    private function departments(string $since): array
    {
        $stmt = $this->db->prepare(
            "SELECT d.id, d.name, d.code,
                    COUNT(DISTINCT staff.role, staff.id) AS staff,
                    COUNT(DISTINCT CASE WHEN l.id IS NOT NULL THEN CONCAT(staff.role, ':', staff.id) END) AS active,
                    COUNT(l.id) AS signins
             FROM departments d
             INNER JOIN (
                 SELECT id, department_id, 'teacher' AS role FROM teachers WHERE deleted_at IS NULL AND is_active = 1
                 UNION ALL
                 SELECT id, department_id, 'hod' AS role FROM hods WHERE deleted_at IS NULL AND is_active = 1
             ) staff ON staff.department_id = d.id
             LEFT JOIN login_logs l ON l.user_id = staff.id AND l.role = staff.role AND l.logged_in_at >= ?
             WHERE d.deleted_at IS NULL
             GROUP BY d.id, d.name, d.code
             ORDER BY signins DESC, d.name"
        );
        $stmt->execute([$since]);
        return array_map(fn ($r) => [
            'name' => $r['name'],
            'code' => $r['code'],
            'staff' => (int) $r['staff'],
            'active' => (int) $r['active'],
            'signins' => (int) $r['signins'],
            'share' => (int) $r['staff'] ? round((int) $r['active'] / (int) $r['staff'] * 100) : 0,
        ], $stmt->fetchAll());
    }

    /** each class level (S.1 ... S.6): the share of its students who signed in */
    private function classes(string $since): array
    {
        $stmt = $this->db->prepare(
            "SELECT c.name,
                    COUNT(DISTINCT s.id) AS students,
                    COUNT(DISTINCT CASE WHEN l.id IS NOT NULL THEN s.id END) AS active,
                    COUNT(l.id) AS signins
             FROM students s
             INNER JOIN classes c ON c.id = s.class_id AND c.deleted_at IS NULL
             LEFT JOIN login_logs l ON l.user_id = s.id AND l.role = 'student' AND l.logged_in_at >= ?
             WHERE s.deleted_at IS NULL AND s.is_active = 1
             GROUP BY c.name"
        );
        $stmt->execute([$since]);
        $rows = array_map(fn ($r) => $this->share($r, 'students'), $stmt->fetchAll());
        usort($rows, fn ($a, $b) => strnatcmp($a['name'], $b['name']));
        return $rows;
    }

    /** each stream: the share of its students who signed in (shown inside its class on the dashboard) */
    private function streams(string $since): array
    {
        $stmt = $this->db->prepare(
            "SELECT CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS name, c.name AS class_name, c.stream_name,
                    COUNT(DISTINCT s.id) AS students,
                    COUNT(DISTINCT CASE WHEN l.id IS NOT NULL THEN s.id END) AS active,
                    COUNT(l.id) AS signins
             FROM students s
             INNER JOIN classes c ON c.id = s.class_id AND c.deleted_at IS NULL
             LEFT JOIN login_logs l ON l.user_id = s.id AND l.role = 'student' AND l.logged_in_at >= ?
             WHERE s.deleted_at IS NULL AND s.is_active = 1
             GROUP BY c.id, c.name, name"
        );
        $stmt->execute([$since]);
        // each stream with its class, so the dashboard can show them inside their class
        $rows = array_map(fn ($r) => $this->share($r, 'students') + ['class' => $r['class_name'], 'stream' => $r['stream_name'] ?: $r['name']], $stmt->fetchAll());
        usort($rows, fn ($a, $b) => [$b['share'], $b['signins']] <=> [$a['share'], $a['signins']]);
        return $rows;
    }

    private function share(array $r, string $key): array
    {
        $n = (int) $r[$key];
        return [
            'name' => $r['name'],
            'students' => $n,
            'active' => (int) $r['active'],
            'signins' => (int) $r['signins'],
            'share' => $n ? round((int) $r['active'] / $n * 100) : 0,
        ];
    }

    /** kind of device, operating system and browser of the period's sign-ins (students and staff) */
    private function devices(string $since): array
    {
        try {
            $stmt = $this->db->prepare("SELECT user_agent, browser, os, device_type FROM login_logs WHERE logged_in_at >= ? AND role IN ('student','teacher','hod') ORDER BY id DESC LIMIT 20000");
            $stmt->execute([$since]);
        } catch (\PDOException $e) {
            $stmt = $this->db->prepare("SELECT user_agent, NULL AS browser, NULL AS os, NULL AS device_type FROM login_logs WHERE logged_in_at >= ? AND role IN ('student','teacher','hod') ORDER BY id DESC LIMIT 20000");
            $stmt->execute([$since]);
        }
        $type = $os = $browser = [];
        foreach ($stmt->fetchAll() as $r) {
            $d = !empty($r['browser']) || !empty($r['os'])
                ? ['browser' => $r['browser'], 'os' => $r['os'], 'device_type' => $r['device_type']]
                : DeviceInfo::fromUserAgent((string) ($r['user_agent'] ?? ''));
            $t = $d['device_type'] ?: 'unknown';
            $type[$t] = ($type[$t] ?? 0) + 1;
            // families, not versions: "Windows 10/11" and "Windows 11" are both Windows
            $o = $d['os'] ? preg_replace('/\s*\(.*\)$|\s+[\d.\/]+.*$/', '', $d['os']) : 'Unknown';
            $os[$o] = ($os[$o] ?? 0) + 1;
            $b = $d['browser'] ? preg_replace('/\s+\d+(\.\d+)*$/', '', $d['browser']) : 'Unknown';
            $browser[$b] = ($browser[$b] ?? 0) + 1;
        }
        $list = function (array $counts, int $top) {
            arsort($counts);
            $rows = [];
            $other = 0;
            $i = 0;
            foreach ($counts as $name => $n) {
                if ($i++ < $top) {
                    $rows[] = ['name' => (string) $name, 'signins' => $n];
                } else {
                    $other += $n;
                }
            }
            if ($other) {
                $rows[] = ['name' => 'Other', 'signins' => $other];
            }
            return $rows;
        };
        return ['types' => $list($type, 4), 'os' => $list($os, 5), 'browsers' => $list($browser, 5)];
    }
}
