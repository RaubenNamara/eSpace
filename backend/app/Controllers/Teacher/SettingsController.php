<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

class SettingsController extends Controller
{
    private \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        if (!$this->hasRole('teacher')) {
            $this->forbidden();
            return;
        }

        $teacherId = $this->getCurrentUserId();

        $stmt = $this->db->prepare(
            "SELECT t.id, t.username, t.email, t.employee_number, t.first_name, t.last_name,
                    t.phone, t.department_id, d.name AS department_name, t.gender, t.address
             FROM teachers t
             LEFT JOIN departments d ON d.id = t.department_id
             WHERE t.id = :id AND t.deleted_at IS NULL"
        );
        $stmt->execute(['id' => $teacherId]);
        $profile = $stmt->fetch();

        if (!$profile) {
            $this->notFound('Teacher profile not found');
            return;
        }

        $this->success($profile);
    }

    public function updateProfile(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        if (!$this->hasRole('teacher')) {
            $this->forbidden();
            return;
        }

        $teacherId = $this->getCurrentUserId();
        $data = $this->sanitize($this->input());
        $updates = [];
        $params = ['id' => $teacherId];

        $allowedFields = ['username', 'email', 'first_name', 'last_name', 'phone', 'gender', 'address'];
        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $data) && $data[$field] !== null) {
                $updates[] = "{$field} = :{$field}";
                $params[$field] = $data[$field];
            }
        }

        if (!empty($updates)) {
            $updates[] = 'updated_at = NOW()';
            $sql = 'UPDATE teachers SET ' . implode(', ', $updates) . ' WHERE id = :id';
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
        }

        $this->success([], 'Profile updated successfully');
    }
}
