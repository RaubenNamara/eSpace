<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\Config\Database;

/**
 * HOD Student Controller
 * 
 * Handles student management operations for HODs (department-scoped).
 * HODs can only manage students in their own department.
 */
class StudentController extends Controller
{
    protected $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = Database::getInstance();
    }

    /**
     * Get HOD's department ID
     */
    private function getHODDepartmentId(): ?int
    {
        $userId = $this->getCurrentUserId();
        if (!$userId || !$this->isHOD()) {
            return null;
        }

        $stmt = $this->db->prepare("SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $userId]);
        $hod = $stmt->fetch();

        return $hod ? (int) $hod['department_id'] : null;
    }

    /**
     * Get all students enrolled in HOD's department. Department membership lives in
     * student_department_enrollments (students has no department_id column of its own -
     * a student can hold several concurrent department enrollments, e.g. every O-Level
     * compulsory subject department), so this joins through the active enrollment row
     * rather than a direct column, matching how every other department-scoped student
     * query in this app works.
     * GET /hod/students
     */
    public function index(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $search = $this->query('search', '');
        $page = (int) $this->query('page', 1);
        $limit = (int) $this->query('limit', 20);

        $where = ['sde.department_id = :department_id', "sde.status = 'active'", 'sde.deleted_at IS NULL', 's.deleted_at IS NULL'];
        $params = ['department_id' => $departmentId];

        if (!empty($search)) {
            $where[] = '(s.username LIKE :search1 OR s.email LIKE :search2 OR s.first_name LIKE :search3 OR s.last_name LIKE :search4 OR s.admission_number LIKE :search5)';
            $like = "%{$search}%";
            $params['search1'] = $like;
            $params['search2'] = $like;
            $params['search3'] = $like;
            $params['search4'] = $like;
            $params['search5'] = $like;
        }

        $whereClause = implode(' AND ', $where);

        // Get total count
        $countSql = "SELECT COUNT(*) as total
                     FROM student_department_enrollments sde
                     INNER JOIN students s ON s.id = sde.student_id
                     WHERE {$whereClause}";
        $stmt = $this->db->prepare($countSql);
        $stmt->execute($params);
        $total = $stmt->fetch()['total'];

        // Get paginated results
        $offset = ($page - 1) * $limit;
        $sql = "SELECT s.id, s.username, s.email, s.admission_number, s.first_name, s.last_name, s.gender, s.phone,
                       s.is_active, s.created_at,
                       c.name as class_name, c.level as class_level, c.stream_name,
                       sde.academic_year
                FROM student_department_enrollments sde
                INNER JOIN students s ON s.id = sde.student_id
                LEFT JOIN classes c ON c.id = sde.class_id
                WHERE {$whereClause}
                ORDER BY s.first_name, s.last_name
                LIMIT {$limit} OFFSET {$offset}";

        $stmt = $this->db->prepare($sql);
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
     * Get student by ID (only if actively enrolled in HOD's department)
     * GET /hod/students/{id}
     */
    public function show(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $id = (int) $this->routeParam('id');

        $sql = "SELECT s.id, s.username, s.email, s.admission_number, s.first_name, s.last_name, s.gender, s.phone,
                       s.is_active, s.created_at,
                       c.name as class_name, c.level as class_level, c.stream_name,
                       sde.academic_year
                FROM student_department_enrollments sde
                INNER JOIN students s ON s.id = sde.student_id
                LEFT JOIN classes c ON c.id = sde.class_id
                WHERE s.id = :id AND sde.department_id = :department_id AND sde.status = 'active'
                  AND sde.deleted_at IS NULL AND s.deleted_at IS NULL
                LIMIT 1";

        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        $student = $stmt->fetch();

        if (!$student) {
            $this->notFound('Student not found in your department');
            return;
        }

        $this->success($student);
    }

    /**
     * Create a new student in HOD's department
     * POST /hod/students
     */
    public function create(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $data = $this->input();

        // Validate required fields
        $errors = $this->validateRequired(['username', 'email', 'password', 'first_name', 'last_name']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Validate email
        if (!$this->validateEmail($data['email'])) {
            $this->validationError(['email' => 'Invalid email format']);
            return;
        }

        // Validate password strength
        if (strlen($data['password']) < 8) {
            $this->validationError(['password' => 'Password must be at least 8 characters']);
            return;
        }

        // Check if username already exists in students table
        $stmt = $this->db->prepare("SELECT id FROM students WHERE username = ? AND deleted_at IS NULL");
        $stmt->execute([$data['username']]);
        if ($stmt->fetch()) {
            $this->error('Username already exists', 409);
            return;
        }

        // Check if email already exists in students table
        $stmt = $this->db->prepare("SELECT id FROM students WHERE email = ? AND deleted_at IS NULL");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            $this->error('Email already exists', 409);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Generate student number if not provided
        if (empty($data['student_number'])) {
            $stmt = $this->db->prepare("SELECT COUNT(*) as count FROM students WHERE department_id = ?");
            $stmt->execute([$departmentId]);
            $count = $stmt->fetch()['count'];
            $data['student_number'] = 'ST' . str_pad($count + 1, 3, '0', STR_PAD_LEFT);
        }

        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        // Create student record
        $studentSql = "INSERT INTO students (username, email, password, role, student_number, first_name, last_name, gender, phone, department_id, is_active, created_at, updated_at) 
                       VALUES (:username, :email, :password, 'student', :student_number, :first_name, :last_name, :gender, :phone, :department_id, 1, NOW(), NOW())";
        
        try {
            $stmt = $this->db->prepare($studentSql);
            $stmt->execute([
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => $hashedPassword,
                'student_number' => $data['student_number'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'gender' => $data['gender'] ?? null,
                'phone' => $data['phone'] ?? null,
                'department_id' => $departmentId
            ]);

            $studentId = (int) $this->db->lastInsertId();
        } catch (\PDOException $e) {
            error_log("Student creation failed: " . $e->getMessage());
            $this->error('Failed to create student: ' . $e->getMessage(), 500);
            return;
        }

        $this->success([
            'id' => $studentId,
            'username' => $data['username'],
            'email' => $data['email'],
            'student_number' => $data['student_number'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'department_id' => $departmentId
        ], 'Student created successfully');
    }

    /**
     * Update student (only if in HOD's department)
     * PUT /hod/students/{id}
     */
    public function update(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $id = (int) $this->routeParam('id');
        $data = $this->input();

        // Check if student exists in HOD's department
        $stmt = $this->db->prepare("SELECT id FROM students WHERE id = ? AND department_id = ? AND deleted_at IS NULL");
        $stmt->execute([$id, $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Student not found in your department');
            return;
        }

        // Validate email if provided
        if (isset($data['email']) && !$this->validateEmail($data['email'])) {
            $this->validationError(['email' => 'Invalid email format']);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Build update fields
        $updates = [];
        $params = ['id' => $id];

        $allowedFields = ['username', 'email', 'password', 'first_name', 'last_name', 'gender', 'phone', 'is_active'];

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

        $this->success([], 'Student updated successfully');
    }

    /**
     * De-enroll students from the HOD's own department - closes their
     * student_department_enrollments row(s) for this department (status='withdrawn'), which
     * hides them from every teacher in the department (see the NOT EXISTS/status='active'
     * checks added to every Student\* content controller), the HOD's own roster, and this
     * department's class/student lists. Their enrollment in any OTHER department, their
     * account, and all historical records (submissions, marks, attendance) are untouched.
     * Admin retains full visibility via student_department_enrollments regardless of status.
     * POST /hod/students/deenroll
     * Body: { student_ids: number[], reason?: string }
     */
    public function deenroll(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $data = $this->input();
        $studentIds = $data['student_ids'] ?? [];

        if (!is_array($studentIds) || empty($studentIds)) {
            $this->validationError(['student_ids' => 'At least one student must be selected']);
            return;
        }

        $studentIds = array_values(array_unique(array_map('intval', $studentIds)));
        $reason = !empty($data['reason']) ? (string) $data['reason'] : null;

        try {
            $placeholders = implode(',', array_fill(0, count($studentIds), '?'));

            $selectStmt = $this->db->prepare(
                "SELECT student_id, department_id FROM student_department_enrollments
                 WHERE student_id IN ({$placeholders}) AND department_id = ? AND status = 'active'"
            );
            $selectStmt->execute([...$studentIds, $departmentId]);
            $affected = $selectStmt->fetchAll();

            $updateStmt = $this->db->prepare(
                "UPDATE student_department_enrollments
                 SET status = 'withdrawn', end_date = CURDATE(), updated_at = NOW()
                 WHERE student_id IN ({$placeholders}) AND department_id = ? AND status = 'active'"
            );
            $updateStmt->execute([...$studentIds, $departmentId]);

            $affectedRows = $updateStmt->rowCount();

            $performedBy = $this->getCurrentUserId();
            foreach ($affected as $row) {
                $this->logEnrollmentAudit((int) $row['student_id'], 'department_de_enroll', null, (int) $row['department_id'], (int) $performedBy, 'hod', $reason);
            }

            $this->success(['deenrolled_count' => $affectedRows], "Successfully de-enrolled {$affectedRows} student(s) from the department");
        } catch (\PDOException $e) {
            error_log("HOD de-enrollment failed: " . $e->getMessage());
            $this->error('Failed to de-enroll students: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Check if current user is HOD
     */
    private function isHOD(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'hod';
    }
}
