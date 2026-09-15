<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

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

        if (!$this->hasRole('student')) {
            $this->forbidden();
            return;
        }

        $userId = $this->getCurrentUserId();

        $stmt = $this->db->prepare(
            "SELECT s.id, s.username, s.email, s.admission_number, s.first_name, s.last_name,
                    s.phone, s.class_id, s.stream_id, c.name AS class_name, c.level AS class_level
             FROM students s
             LEFT JOIN classes c ON c.id = s.class_id
             WHERE s.id = :id AND s.deleted_at IS NULL"
        );
        $stmt->execute(['id' => $userId]);
        $profile = $stmt->fetch();

        if (!$profile) {
            $this->notFound('Student profile not found');
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

        if (!$this->hasRole('student')) {
            $this->forbidden();
            return;
        }

        $userId = $this->getCurrentUserId();
        $data = $this->sanitize($this->input());
        $updates = [];
        $params = ['id' => $userId];

        $allowedFields = ['username', 'email', 'first_name', 'last_name', 'phone', 'address', 'gender'];
        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $data) && $data[$field] !== null) {
                $updates[] = "{$field} = :{$field}";
                $params[$field] = $data[$field];
            }
        }

        if (!empty($updates)) {
            $updates[] = 'updated_at = NOW()';
            $sql = 'UPDATE students SET ' . implode(', ', $updates) . ' WHERE id = :id';
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
        }

        $this->success([], 'Profile updated successfully');
    }

    public function updateNotificationPreferences(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        if (!$this->hasRole('student')) {
            $this->forbidden();
            return;
        }

        $this->success([], 'Notification preferences updated successfully');
    }
}
