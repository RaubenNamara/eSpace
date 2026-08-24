<?php

declare(strict_types=1);

namespace eSpace\App\Models;

use eSpace\App\Models\Model;

/**
 * Teacher Model
 * 
 * Handles teacher data operations.
 */
class Teacher extends Model
{
    protected string $table = 'teachers';
    protected string $primaryKey = 'id';
    protected array $fillable = [
        'user_id',
        'employee_number',
        'first_name',
        'middle_name',
        'last_name',
        'gender',
        'phone'
    ];
    protected array $hidden = [];

    /**
     * Find teacher by user ID
     */
    public function findByUserId(int $userId): ?array
    {
        return $this->first(['user_id' => $userId]);
    }

    /**
     * Find teacher by employee number
     */
    public function findByEmployeeNumber(string $employeeNumber): ?array
    {
        return $this->first(['employee_number' => $employeeNumber]);
    }

    /**
     * Get teacher with user information
     */
    public function getWithUser(int $teacherId): ?array
    {
        $sql = "SELECT t.*, u.username, u.email, u.is_active, u.last_login_at, u.created_at
                FROM {$this->table} t
                JOIN users u ON t.user_id = u.id
                WHERE t.id = :id AND t.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $teacherId]);
        $result = $stmt->fetch();

        return $result ?: null;
    }

    /**
     * Get all teachers with user information
     */
    public function getAllWithUsers(int $page = 1, int $limit = 20, array $filters = []): array
    {
        $offset = ($page - 1) * $limit;
        $sql = "SELECT id, username, email, is_active, created_at, employee_number, first_name, last_name,
                       gender, phone, department_id, qualification, specialization
                FROM {$this->table}
                WHERE deleted_at IS NULL";
        
        $params = [];

        if (!empty($filters['search'])) {
            $sql .= " AND (username LIKE :search OR email LIKE :search OR first_name LIKE :search OR last_name LIKE :search OR employee_number LIKE :search)";
            $params['search'] = "%{$filters['search']}%";
        }

        if (!empty($filters['department_id'])) {
            $sql .= " AND department_id = :department_id";
            $params['department_id'] = $filters['department_id'];
        }

        if (!empty($filters['is_active'])) {
            $sql .= " AND is_active = :is_active";
            $params['is_active'] = $filters['is_active'];
        }

        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM {$this->table} WHERE deleted_at IS NULL";
        
        $countParams = [];
        if (!empty($filters['search'])) {
            $countSql .= " AND (username LIKE :search OR email LIKE :search OR first_name LIKE :search OR last_name LIKE :search OR employee_number LIKE :search)";
            $countParams['search'] = "%{$filters['search']}%";
        }
        if (!empty($filters['department_id'])) {
            $countSql .= " AND department_id = :department_id";
            $countParams['department_id'] = $filters['department_id'];
        }
        if (!empty($filters['is_active'])) {
            $countSql .= " AND is_active = :is_active";
            $countParams['is_active'] = $filters['is_active'];
        }

        $countStmt = $this->db->prepare($countSql);
        $countStmt->execute($countParams);
        $total = (int) $countStmt->fetch()['total'];

        // Get paginated results
        $sql .= " ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $data = $stmt->fetchAll();

        return [
            'data' => $data,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ]
        ];
    }

    /**
     * Get teacher statistics
     */
    public function getStatistics(): array
    {
        $sql = "SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active,
                    SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as suspended,
                    SUM(CASE WHEN department_id IS NULL THEN 1 ELSE 0 END) as unassigned
                FROM {$this->table}
                WHERE deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetch();
    }
}
