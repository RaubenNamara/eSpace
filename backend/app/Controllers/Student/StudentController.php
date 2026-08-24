<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student Controller
 * 
 * Handles student-specific operations.
 */
class StudentController extends Controller
{
    protected \PDO $db;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * Get student profile
     * GET /student/profile
     */
    public function profile(): void
    {
        // Check authentication
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        // Check role (student only)
        if (!$this->hasRole('student')) {
            $this->forbidden();
            return;
        }

        $userId = $this->getCurrentUserId();

        $sql = "SELECT s.id, s.username, s.email, s.admission_number, s.first_name, s.last_name, s.phone,
                       s.is_active, s.created_at, s.class_id, s.stream_id, s.admission_date,
                       s.date_of_birth, s.gender, s.address,
                       c.name as class_name, c.level as class_level
                FROM students s
                LEFT JOIN classes c ON s.class_id = c.id
                WHERE s.id = :id AND s.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $userId]);
        $student = $stmt->fetch();

        if (!$student) {
            $this->notFound('Student profile not found');
            return;
        }

        $this->success($student);
    }

    /**
     * Update student profile
     * PUT /student/profile
     */
    public function updateProfile(): void
    {
        // Check authentication
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        // Check role (student only)
        if (!$this->hasRole('student')) {
            $this->forbidden();
            return;
        }

        $userId = $this->getCurrentUserId();
        $data = $this->input();

        // Sanitize input
        $data = $this->sanitize($data);

        // Build update fields
        $updates = [];
        $params = ['id' => $userId];

        $allowedFields = ['username', 'password', 'first_name', 'last_name', 'gender', 'phone', 'address'];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                if ($field === 'password') {
                    $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
                    $updates[] = "password = :password";
                    $params['password'] = $hashedPassword;
                } else {
                    $updates[] = "{$field} = :{$field}";
                    $params[$field] = $data[$field];
                }
            }
        }

        if (!empty($updates)) {
            $updates[] = "updated_at = NOW()";
            $sql = "UPDATE students SET " . implode(', ', $updates) . " WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
        }

        $this->success([], 'Profile updated successfully');
    }
}
