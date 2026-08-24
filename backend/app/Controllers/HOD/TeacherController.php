<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\Config\Database;

/**
 * HOD Teacher Controller
 * 
 * Handles teacher management operations for HODs (department-scoped).
 * HODs can only manage teachers in their own department.
 */
class TeacherController extends Controller
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
     * Get all teachers in HOD's department
     * GET /hod/teachers
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

        // Build query - only teachers who belong to HOD's department (any of their
        // departments, not just their primary one - see teacher_department_assignments)
        $where = ['t.deleted_at IS NULL', 'EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)'];
        $params = ['department_id' => $departmentId];

        if (!empty($search)) {
            $where[] = '(t.username LIKE :search1 OR t.email LIKE :search2 OR t.first_name LIKE :search3 OR t.last_name LIKE :search4 OR t.employee_number LIKE :search5)';
            $like = "%{$search}%";
            $params['search1'] = $like;
            $params['search2'] = $like;
            $params['search3'] = $like;
            $params['search4'] = $like;
            $params['search5'] = $like;
        }

        $whereClause = implode(' AND ', $where);
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM teachers t WHERE {$whereClause}";
        $stmt = $this->db->prepare($countSql);
        $stmt->execute($params);
        $total = $stmt->fetch()['total'];

        // Get paginated results
        $offset = ($page - 1) * $limit;
        $sql = "SELECT t.id, t.username, t.email, t.employee_number, t.first_name, t.last_name, t.phone, 
                       t.is_active, t.created_at, t.department_id,
                       d.name as department_name, d.code as department_code
                FROM teachers t
                LEFT JOIN departments d ON t.department_id = d.id
                WHERE {$whereClause}
                ORDER BY t.first_name, t.last_name
                LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $teachers = $stmt->fetchAll();

        $this->success([
            'teachers' => $teachers,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ]
        ]);
    }

    /**
     * Get teacher by ID (only if in HOD's department)
     * GET /hod/teachers/{id}
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

        $sql = "SELECT t.id, t.username, t.email, t.employee_number, t.first_name, t.last_name, t.phone,
                       t.is_active, t.created_at, t.department_id,
                       d.name as department_name, d.code as department_code
                FROM teachers t
                LEFT JOIN departments d ON t.department_id = d.id
                WHERE t.id = :id AND t.deleted_at IS NULL
                  AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)";

        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        $teacher = $stmt->fetch();

        if (!$teacher) {
            $this->notFound('Teacher not found in your department');
            return;
        }

        $this->success($teacher);
    }

    /**
     * Create a new teacher in HOD's department
     * POST /hod/teachers
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

        // Check if username already exists in teachers table
        $stmt = $this->db->prepare("SELECT id FROM teachers WHERE username = ? AND deleted_at IS NULL");
        $stmt->execute([$data['username']]);
        if ($stmt->fetch()) {
            $this->error('Username already exists', 409);
            return;
        }

        // Check if email already exists in teachers table
        $stmt = $this->db->prepare("SELECT id FROM teachers WHERE email = ? AND deleted_at IS NULL");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            $this->error('Email already exists', 409);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Generate employee number if not provided
        if (empty($data['employee_number'])) {
            $stmt = $this->db->prepare("SELECT COUNT(*) as count FROM teachers WHERE department_id = ?");
            $stmt->execute([$departmentId]);
            $count = $stmt->fetch()['count'];
            $data['employee_number'] = 'TS' . str_pad($count + 1, 3, '0', STR_PAD_LEFT);
        }

        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        // Create teacher record
        $teacherSql = "INSERT INTO teachers (username, email, password, role, employee_number, first_name, last_name, gender, phone, department_id, is_active, created_at, updated_at) 
                       VALUES (:username, :email, :password, 'teacher', :employee_number, :first_name, :last_name, :gender, :phone, :department_id, 1, NOW(), NOW())";
        
        try {
            $stmt = $this->db->prepare($teacherSql);
            $stmt->execute([
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => $hashedPassword,
                'employee_number' => $data['employee_number'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'gender' => $data['gender'] ?? null,
                'phone' => $data['phone'] ?? null,
                'department_id' => $departmentId
            ]);

            $teacherId = (int) $this->db->lastInsertId();
        } catch (\PDOException $e) {
            error_log("Teacher creation failed: " . $e->getMessage());
            $this->error('Failed to create teacher: ' . $e->getMessage(), 500);
            return;
        }

        $this->syncTeacherPrimaryDepartment($teacherId, $departmentId);

        $this->success([
            'id' => $teacherId,
            'username' => $data['username'],
            'email' => $data['email'],
            'employee_number' => $data['employee_number'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'department_id' => $departmentId
        ], 'Teacher created successfully');
    }

    /**
     * Update teacher (only if in HOD's department)
     * PUT /hod/teachers/{id}
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

        // Check if teacher belongs to HOD's department (any of their departments)
        $stmt = $this->db->prepare("SELECT id FROM teachers t WHERE t.id = ? AND t.deleted_at IS NULL AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = ? AND tda.deleted_at IS NULL)");
        $stmt->execute([$id, $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Teacher not found in your department');
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
            $sql = "UPDATE teachers SET " . implode(', ', $updates) . " WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
        }

        $this->success([], 'Teacher updated successfully');
    }

    /**
     * Delete teacher (soft delete, only if in HOD's department)
     * DELETE /hod/teachers/{id}
     */
    public function delete(): void
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

        // Check if teacher belongs to HOD's department (any of their departments)
        $stmt = $this->db->prepare("SELECT id FROM teachers t WHERE t.id = ? AND t.deleted_at IS NULL AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = ? AND tda.deleted_at IS NULL)");
        $stmt->execute([$id, $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Teacher not found in your department');
            return;
        }

        // Soft delete teacher
        $sql = "UPDATE teachers SET deleted_at = NOW() WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(['id' => $id]);

        if ($result) {
            $this->success([], 'Teacher deleted successfully');
        } else {
            $this->error('Failed to delete teacher', 500);
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
