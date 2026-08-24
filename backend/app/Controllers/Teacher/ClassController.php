<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Teacher Class Controller
 * 
 * Handles class-related operations for teachers including viewing enrolled students by class.
 */
class ClassController extends Controller
{
    /**
     * Get database instance
     */
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Get current user ID from session
     */
    protected function getCurrentUserId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Get current teacher's active department ID (session-scoped - see
     * Controller::getActiveDepartmentId(); a teacher in more than one department can switch
     * this via PUT /teacher/departments/active without changing their admin-set primary)
     */
    private function getTeacherDepartmentId(): ?int
    {
        return $this->getActiveDepartmentId();
    }

    /**
     * Get list of classes in teacher's department
     * GET /teacher/classes
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $academicYear = $this->query('academic_year');

        try {
            $sql = "SELECT DISTINCT c.id, c.name, c.level, c.stream_name, COUNT(se.id) as student_count
                    FROM classes c
                    INNER JOIN student_department_enrollments se ON c.id = se.class_id
                    WHERE se.department_id = :department_id
                    AND se.deleted_at IS NULL
                    AND c.deleted_at IS NULL";
            
            $params = ['department_id' => $departmentId];

            if ($academicYear) {
                $sql .= " AND se.academic_year = :academic_year";
                $params['academic_year'] = $academicYear;
            }

            $sql .= " GROUP BY c.id, c.name, c.level, c.stream_name ORDER BY c.level, c.name";
            
            $stmt = $this->getDb()->prepare($sql);
            $stmt->execute($params);
            $classes = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($classes, 'Classes retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch classes: " . $e->getMessage());
            $this->error('Failed to fetch classes: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get available academic years in teacher's department
     * GET /teacher/classes/academic-years
     */
    public function academicYears(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        try {
            $sql = "SELECT DISTINCT academic_year
                    FROM student_department_enrollments
                    WHERE department_id = :department_id
                    AND deleted_at IS NULL
                    ORDER BY academic_year DESC";
            
            $stmt = $this->getDb()->prepare($sql);
            $stmt->execute(['department_id' => $departmentId]);
            $years = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($years, 'Academic years retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch academic years: " . $e->getMessage());
            $this->error('Failed to fetch academic years: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get students enrolled in a specific class
     * GET /teacher/classes/{id}/students
     */
    public function students(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $classId = $this->routeParam('id');
        
        if (!$classId) {
            $this->error('Class ID is required', 400);
            return;
        }

        $academicYear = $this->query('academic_year');

        try {
            $sql = "SELECT se.id as enrollment_id, s.id as student_id, s.admission_number, s.first_name, s.last_name, s.gender,
                           se.department_id, se.academic_year, se.class_id,
                           d.name as department_name, c.name as class_name, c.level, c.stream_name
                    FROM student_department_enrollments se
                    INNER JOIN students s ON se.student_id = s.id
                    LEFT JOIN departments d ON se.department_id = d.id
                    LEFT JOIN classes c ON se.class_id = c.id
                    WHERE se.department_id = :department_id
                    AND se.class_id = :class_id
                    AND se.deleted_at IS NULL";
            
            $params = ['department_id' => $departmentId, 'class_id' => $classId];

            if ($academicYear) {
                $sql .= " AND se.academic_year = :academic_year";
                $params['academic_year'] = $academicYear;
            }

            $sql .= " ORDER BY s.last_name, s.first_name";
            
            $stmt = $this->getDb()->prepare($sql);
            $stmt->execute($params);
            $students = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($students, 'Students retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch students: " . $e->getMessage());
            $this->error('Failed to fetch students: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get class details
     * GET /teacher/classes/{id}
     */
    public function show(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $classId = $this->routeParam('id');
        
        if (!$classId) {
            $this->error('Class ID is required', 400);
            return;
        }

        try {
            $sql = "SELECT c.id, c.name, c.level, c.stream_name, c.capacity, c.class_teacher_id,
                           COUNT(se.id) as student_count
                    FROM classes c
                    LEFT JOIN student_department_enrollments se ON c.id = se.class_id AND se.deleted_at IS NULL
                    WHERE c.id = :class_id
                    AND c.deleted_at IS NULL
                    GROUP BY c.id, c.name, c.level, c.stream_name, c.capacity, c.class_teacher_id";
            
            $stmt = $this->getDb()->prepare($sql);
            $stmt->execute(['class_id' => $classId]);
            $class = $stmt->fetch(\PDO::FETCH_ASSOC);

            if (!$class) {
                $this->notFound('Class not found');
                return;
            }

            $this->success($class, 'Class retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch class: " . $e->getMessage());
            $this->error('Failed to fetch class: ' . $e->getMessage(), 500);
        }
    }
}
