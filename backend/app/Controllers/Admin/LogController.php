<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

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
     * List login events, most recent first
     * GET /admin/logs
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $search = $this->query('search', '');
        $role = $this->query('role', '');
        $page = (int) $this->query('page', 1);
        $limit = (int) $this->query('limit', 25);

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

        $whereClause = empty($where) ? '1=1' : implode(' AND ', $where);

        $countStmt = $this->db->prepare("SELECT COUNT(*) as total FROM login_logs WHERE {$whereClause}");
        $countStmt->execute($params);
        $total = (int) $countStmt->fetch()['total'];

        $page = max(1, $page);
        $limit = max(1, min(100, $limit));
        $offset = ($page - 1) * $limit;

        $sql = "SELECT id, user_id, role, username, full_name, ip_address, user_agent, logged_in_at
                FROM login_logs
                WHERE {$whereClause}
                ORDER BY logged_in_at DESC
                LIMIT {$limit} OFFSET {$offset}";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $logs = $stmt->fetchAll();

        $this->success([
            'logs' => $logs,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int) ceil($total / $limit)
            ]
        ]);
    }

    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
