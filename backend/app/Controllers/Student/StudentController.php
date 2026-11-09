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

        // Only columns the students table has (admission_date, date_of_birth and address don't
        // exist - asking for them failed every request and left Settings blank)
        $sql = "SELECT s.id, s.username, s.email, s.admission_number, s.first_name, s.last_name, s.phone,
                       s.is_active, s.created_at, s.class_id, s.stream_id, s.gender,
                       TRIM(CONCAT(c.name, ' ', COALESCE(c.stream_name, ''))) as class_name, c.level as class_level
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

}
