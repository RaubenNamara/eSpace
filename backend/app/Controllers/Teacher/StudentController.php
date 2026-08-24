<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Teacher Student Controller
 * 
 * Handles student viewing and de-enrollment for teachers within their department.
 */
class StudentController extends Controller
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
     * Get students enrolled in teacher's department
     * GET /teacher/students
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

        // Get filter parameters
        $search = $this->query('search', '');
        $classId = $this->query('class_id', '');
        $streamId = $this->query('stream_id', '');
        $academicYear = $this->query('academic_year', '');
        $page = (int) $this->query('page', 1);
        $limit = (int) $this->query('limit', 20);

        $db = $this->getDb();

        // Build WHERE conditions
        $where = ['se.deleted_at IS NULL', 'se.department_id = :department_id'];
        $params = ['department_id' => $departmentId];

        if (!empty($search)) {
            $where[] = '(s.admission_number LIKE :search OR s.first_name LIKE :search OR s.last_name LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        if (!empty($classId)) {
            $where[] = 'se.class_id = :class_id';
            $params['class_id'] = $classId;
        }

        if (!empty($streamId)) {
            $where[] = 'c.stream_name = :stream_id';
            $params['stream_id'] = $streamId;
        }

        if (!empty($academicYear)) {
            $where[] = 'se.academic_year = :academic_year';
            $params['academic_year'] = $academicYear;
        }

        $whereClause = implode(' AND ', $where);

        // Get total count
        $countSql = "SELECT COUNT(*) as total
                     FROM student_department_enrollments se
                     LEFT JOIN classes c ON se.class_id = c.id
                     WHERE {$whereClause}";
        $countStmt = $db->prepare($countSql);
        $countStmt->execute($params);
        $total = (int) $countStmt->fetch()['total'];

        // Get paginated results
        $offset = ($page - 1) * $limit;
        $sql = "SELECT se.id as enrollment_id,
                       se.student_id,
                       se.department_id,
                       se.academic_year,
                       se.class_id,
                       se.enrolled_at,
                       s.admission_number,
                       s.first_name,
                       s.last_name,
                       s.gender,
                       s.date_of_birth,
                       s.phone,
                       d.name as department_name,
                       d.code as department_code,
                       c.name as class_name,
                       c.level as class_level,
                       c.stream_name
                FROM student_department_enrollments se
                INNER JOIN students s ON se.student_id = s.id
                LEFT JOIN departments d ON se.department_id = d.id
                LEFT JOIN classes c ON se.class_id = c.id
                WHERE {$whereClause}
                ORDER BY se.enrolled_at DESC
                LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $students = $stmt->fetchAll();

        $this->success([
            'students' => $students,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ]
        ]);
    }

    /**
     * Get a specific student's details
     * GET /teacher/students/{id}
     */
    public function show($id): void
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

        $enrollmentId = (int) $id;
        $db = $this->getDb();

        $sql = "SELECT se.id as enrollment_id,
                       se.student_id,
                       se.department_id,
                       se.academic_year,
                       se.class_id,
                       se.enrolled_at,
                       s.admission_number,
                       s.first_name,
                       s.last_name,
                       s.gender,
                       s.date_of_birth,
                       s.address,
                       s.phone,
                       s.admission_date,
                       s.parent_guardian_name,
                       s.parent_guardian_phone,
                       s.parent_guardian_email,
                       d.name as department_name,
                       d.code as department_code,
                       c.name as class_name,
                       c.level as class_level,
                       c.stream_name
                FROM student_department_enrollments se
                INNER JOIN students s ON se.student_id = s.id
                LEFT JOIN departments d ON se.department_id = d.id
                LEFT JOIN classes c ON se.class_id = c.id
                WHERE se.id = :enrollment_id 
                AND se.department_id = :department_id 
                AND se.deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['enrollment_id' => $enrollmentId, 'department_id' => $departmentId]);
        $student = $stmt->fetch();

        if (!$student) {
            $this->notFound('Student enrollment not found in your department');
            return;
        }

        $this->success($student);
    }

    /**
     * De-enroll a student from department
     * DELETE /teacher/students/{id}
     */
    public function delete(): void
    {
        $id = $this->routeParam('id');
        error_log("Teacher delete: Starting de-enroll request");
        error_log("Teacher delete: ID: " . $id);
        error_log("Teacher delete: Session data: " . json_encode($_SESSION));
        
        if (!$this->isAuthenticated()) {
            error_log("Teacher delete: Not authenticated");
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        error_log("Teacher delete: Department ID: " . ($departmentId ?? 'NULL'));
        
        if (!$departmentId) {
            error_log("Teacher delete: No department assigned");
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $enrollmentId = (int) $id;
        error_log("Teacher delete: Enrollment ID: " . $enrollmentId);
        $db = $this->getDb();

        // Check if enrollment exists and belongs to teacher's department
        $stmt = $db->prepare("SELECT id, student_id FROM student_department_enrollments 
                             WHERE id = :enrollment_id 
                             AND department_id = :department_id 
                             AND deleted_at IS NULL");
        $stmt->execute(['enrollment_id' => $enrollmentId, 'department_id' => $departmentId]);
        $enrollment = $stmt->fetch();

        error_log("Teacher delete: Enrollment found: " . ($enrollment ? 'yes' : 'no'));

        if (!$enrollment) {
            error_log("Teacher delete: Enrollment not found in department");
            $this->notFound('Student enrollment not found in your department');
            return;
        }

        // Soft delete the enrollment
        $sql = "UPDATE student_department_enrollments SET deleted_at = NOW() WHERE id = :id";
        error_log("Teacher delete: Executing delete SQL");
        $stmt = $db->prepare($sql);
        $result = $stmt->execute(['id' => $enrollmentId]);

        error_log("Teacher delete: Delete result: " . ($result ? 'success' : 'failed'));

        if ($result) {
            $this->success([], 'Student de-enrolled successfully from department');
        } else {
            $this->error('Failed to de-enroll student', 500);
        }
    }

    /**
     * Get enrolled students in teacher's department
     * GET /teacher/students/enrolled
     */
    public function enrolled(): void
    {
        error_log("Teacher enrolled: Starting request");
        error_log("Teacher enrolled: Session data: " . json_encode($_SESSION));
        
        if (!$this->isAuthenticated()) {
            error_log("Teacher enrolled: Not authenticated");
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        error_log("Teacher enrolled: Department ID: " . ($departmentId ?? 'NULL'));
        
        if (!$departmentId) {
            error_log("Teacher enrolled: No department assigned");
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $academicYear = $this->query('academic_year');
        $className = $this->query('class_name');
        $streamName = $this->query('stream_name');

        error_log("Teacher enrolled: Filters - academic_year: " . ($academicYear ?? 'none') . ", class_name: " . ($className ?? 'none') . ", stream_name: " . ($streamName ?? 'none'));

        $whereClause = "se.deleted_at IS NULL AND se.department_id = :department_id";
        $params = ['department_id' => $departmentId];

        if ($academicYear) {
            $whereClause .= " AND se.academic_year = :academic_year";
            $params['academic_year'] = $academicYear;
        }

        if ($className) {
            $whereClause .= " AND c.name = :class_name";
            $params['class_name'] = $className;
        }

        if ($streamName) {
            $whereClause .= " AND c.stream_name = :stream_name";
            $params['stream_name'] = $streamName;
        }

        try {
            $sql = "SELECT se.id as enrollment_id, s.id as student_id, s.admission_number, s.first_name, s.last_name,
                           se.department_id, se.academic_year, se.enrolled_at, se.class_id,
                           d.name as department_name, c.name as class_name, c.stream_name
                    FROM student_department_enrollments se
                    INNER JOIN students s ON se.student_id = s.id
                    LEFT JOIN departments d ON se.department_id = d.id
                    LEFT JOIN classes c ON se.class_id = c.id
                    WHERE {$whereClause}
                    ORDER BY s.last_name, s.first_name";
            
            error_log("Teacher enrolled: SQL: " . $sql);
            error_log("Teacher enrolled: Params: " . json_encode($params));
            
            $stmt = $this->getDb()->prepare($sql);
            $stmt->execute($params);
            $students = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            error_log("Teacher enrolled: Found " . count($students) . " students");
            $this->success($students, 'Enrolled students retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch enrolled students: " . $e->getMessage());
            $this->error('Failed to fetch enrolled students: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get filter options for students
     * GET /teacher/students/filters
     */
    public function filters(): void
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

        $db = $this->getDb();

        // Get classes in department
        $classesSql = "SELECT DISTINCT c.id, c.name, c.level
                      FROM classes c
                      INNER JOIN student_department_enrollments se ON c.id = se.class_id
                      WHERE se.department_id = :department_id 
                      AND se.deleted_at IS NULL
                      AND c.deleted_at IS NULL
                      ORDER BY c.level, c.name";
        $classesStmt = $db->prepare($classesSql);
        $classesStmt->execute(['department_id' => $departmentId]);
        $classes = $classesStmt->fetchAll();

        // Get streams in department
        $streamsSql = "SELECT DISTINCT c.stream_name as id, c.stream_name as name
                       FROM classes c
                       INNER JOIN student_department_enrollments se ON c.id = se.class_id
                       WHERE se.department_id = :department_id
                       AND se.deleted_at IS NULL
                       AND c.deleted_at IS NULL
                       AND c.stream_name IS NOT NULL AND c.stream_name != ''
                       ORDER BY c.stream_name";
        $streamsStmt = $db->prepare($streamsSql);
        $streamsStmt->execute(['department_id' => $departmentId]);
        $streams = $streamsStmt->fetchAll();

        // Get academic years
        $academicYearsSql = "SELECT DISTINCT academic_year
                            FROM student_department_enrollments
                            WHERE department_id = :department_id
                            AND deleted_at IS NULL
                            ORDER BY academic_year DESC";
        $academicYearsStmt = $db->prepare($academicYearsSql);
        $academicYearsStmt->execute(['department_id' => $departmentId]);
        $academicYears = $academicYearsStmt->fetchAll();

        $this->success([
            'classes' => $classes,
            'streams' => $streams,
            'academic_years' => $academicYears
        ]);
    }
}
