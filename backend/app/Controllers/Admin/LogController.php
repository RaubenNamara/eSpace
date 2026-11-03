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

    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
