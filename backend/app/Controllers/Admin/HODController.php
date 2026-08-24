<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\User;
use eSpace\Config\Database;

/**
 * Admin HOD Controller
 * 
 * Handles HOD (Head of Department) management operations for administrators.
 */
class HODController extends Controller
{
    private User $userModel;
    protected $db;

    public function __construct()
    {
        parent::__construct();
        $this->userModel = new User();
        $this->db = Database::getInstance();
    }

    /**
     * Get all HODs
     * GET /admin/hods
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $search = $this->query('search', '');
        $departmentId = $this->query('department_id', '');
        $page = (int) $this->query('page', 1);
        $limit = (int) $this->query('limit', 20);

        // Build query
        $where = ['h.deleted_at IS NULL'];
        $params = [];

        if (!empty($search)) {
            $where[] = '(h.username LIKE ? OR h.email LIKE ? OR h.first_name LIKE ? OR h.last_name LIKE ?)';
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
        }

        if (!empty($departmentId)) {
            $where[] = 'h.department_id = ?';
            $params[] = $departmentId;
        }

        $whereClause = implode(' AND ', $where);
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM hods h WHERE {$whereClause}";
        $stmt = $this->db->prepare($countSql);
        $stmt->execute($params);
        $total = $stmt->fetch()['total'];

        // Get paginated results
        $offset = ($page - 1) * $limit;
        $sql = "SELECT h.id, h.username, h.email, h.phone, h.is_active, h.created_at,
                       h.first_name, h.last_name,
                       h.teacher_id, h.department_id, h.appointed_date, h.last_login_at,
                       d.name as department_name, d.code as department_code
                FROM hods h
                LEFT JOIN departments d ON h.department_id = d.id
                WHERE {$whereClause}
                ORDER BY h.created_at DESC
                LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $hods = $stmt->fetchAll();

        $this->success([
            'hods' => $hods,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ]
        ]);
    }

    /**
     * Create a new HOD
     * POST /admin/hods
     */
    public function create(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();

        // Validate required fields
        $errors = $this->validateRequired(['username', 'email', 'password', 'first_name', 'last_name', 'department_id', 'appointed_date']);
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

        // Validate department exists
        $stmt = $this->db->prepare("SELECT id FROM departments WHERE id = ?");
        $stmt->execute([$data['department_id']]);
        if (!$stmt->fetch()) {
            $this->validationError(['department_id' => 'Department not found']);
            return;
        }

        // Check if department already has an HOD
        $stmt = $this->db->prepare("SELECT id FROM hods WHERE department_id = ? AND deleted_at IS NULL");
        $stmt->execute([$data['department_id']]);
        if ($stmt->fetch()) {
            $this->error('Department already has an HOD', 409);
            return;
        }

        // Check if username already exists in hods table
        $stmt = $this->db->prepare("SELECT id FROM hods WHERE username = ? AND deleted_at IS NULL");
        $stmt->execute([$data['username']]);
        if ($stmt->fetch()) {
            $this->error('Username already exists', 409);
            return;
        }

        // Check if email already exists in hods table
        $stmt = $this->db->prepare("SELECT id FROM hods WHERE email = ? AND deleted_at IS NULL");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            $this->error('Email already exists', 409);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        // Create HOD record directly in hods table
        $hodSql = "INSERT INTO hods (username, email, password, first_name, last_name, phone, teacher_id, department_id, appointed_date, is_active, created_at, updated_at)
                   VALUES (:username, :email, :password, :first_name, :last_name, :phone, :teacher_id, :department_id, :appointed_date, 1, NOW(), NOW())";
        
        try {
            $stmt = $this->db->prepare($hodSql);
            $stmt->execute([
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => $hashedPassword,
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'phone' => $data['phone'] ?? null,
                'teacher_id' => !empty($data['teacher_id']) ? $data['teacher_id'] : null,
                'department_id' => $data['department_id'],
                'appointed_date' => $data['appointed_date']
            ]);

            $hodId = (int) $this->db->lastInsertId();

            // Same as assignTeacher(): a teacher linked here for dual-role access becomes a
            // (primary) member of this department too, so their teacher record doesn't stay
            // pointing at a stale department. syncTeacherPrimaryDepartment() updates both
            // teachers.department_id and their teacher_department_assignments membership -
            // it does not remove their other department memberships, if any.
            if (!empty($data['teacher_id'])) {
                $this->syncTeacherPrimaryDepartment((int) $data['teacher_id'], (int) $data['department_id']);
            }
        } catch (\PDOException $e) {
            error_log("HOD creation failed: " . $e->getMessage());
            $this->error('Failed to create HOD: ' . $e->getMessage(), 500);
            return;
        }

        // Return created HOD data (without password)
        $createdHod = [
            'id' => $hodId,
            'username' => $data['username'],
            'email' => $data['email'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'phone' => $data['phone'] ?? null,
            'department_id' => $data['department_id'],
            'appointed_date' => $data['appointed_date'],
            'is_active' => 1
        ];

        $this->success($createdHod, 'HOD created successfully');
    }

    /**
     * Get HOD by ID
     * GET /admin/hods/{id}
     */
    public function show(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        $sql = "SELECT h.id, h.username, h.email, h.phone, h.is_active, h.created_at,
                       h.first_name, h.last_name,
                       h.teacher_id, h.department_id, h.appointed_date, h.last_login_at,
                       d.name as department_name, d.code as department_code
                FROM hods h
                LEFT JOIN departments d ON h.department_id = d.id
                WHERE h.id = :id AND h.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $id]);
        $hod = $stmt->fetch();

        if (!$hod) {
            $this->notFound('HOD not found');
            return;
        }

        $this->success($hod);
    }

    /**
     * Update HOD
     * PUT /admin/hods/{id}
     */
    public function update(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');
        $data = $this->input();

        // Check if HOD exists
        $stmt = $this->db->prepare("SELECT id FROM hods WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) {
            $this->notFound('HOD not found');
            return;
        }

        // Validate email if provided
        if (isset($data['email']) && !$this->validateEmail($data['email'])) {
            $this->validationError(['email' => 'Invalid email format']);
            return;
        }

        // Validate department if provided
        if (isset($data['department_id'])) {
            $stmt = $this->db->prepare("SELECT id FROM departments WHERE id = ?");
            $stmt->execute([$data['department_id']]);
            if (!$stmt->fetch()) {
                $this->validationError(['department_id' => 'Department not found']);
                return;
            }
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Build update fields
        $updates = [];
        $params = ['id' => $id];

        $allowedFields = ['username', 'email', 'password', 'first_name', 'last_name', 'phone', 'is_active', 'teacher_id', 'department_id', 'appointed_date'];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                if ($field === 'password') {
                    $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
                    $updates[] = "password = :password";
                    $params['password'] = $hashedPassword;
                } elseif ($field === 'teacher_id') {
                    $updates[] = "teacher_id = :teacher_id";
                    $params['teacher_id'] = !empty($data['teacher_id']) ? $data['teacher_id'] : null;
                } else {
                    $updates[] = "{$field} = :{$field}";
                    $params[$field] = $data[$field];
                }
            }
        }

        if (!empty($updates)) {
            $updates[] = "updated_at = NOW()";
            $sql = "UPDATE hods SET " . implode(', ', $updates) . " WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
        }

        $this->success([], 'HOD updated successfully');
    }

    /**
     * Delete HOD (soft delete)
     * DELETE /admin/hods/{id}
     */
    public function delete(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        // Check if HOD exists
        $stmt = $this->db->prepare("SELECT id FROM hods WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) {
            $this->notFound('HOD not found');
            return;
        }

        // Soft delete HOD
        $sql = "UPDATE hods SET deleted_at = NOW() WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(['id' => $id]);

        if ($result) {
            $this->success([], 'HOD deleted successfully');
        } else {
            $this->error('Failed to delete HOD', 500);
        }
    }

    /**
     * Assign teacher as HOD
     * POST /admin/hods/assign-teacher
     */
    public function assignTeacher(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();

        // Validate required fields
        $errors = $this->validateRequired(['teacher_id', 'department_id', 'appointed_date']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Check if teacher exists
        $stmt = $this->db->prepare("SELECT id, username, email, password, phone, first_name, last_name FROM teachers WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$data['teacher_id']]);
        $teacher = $stmt->fetch();

        if (!$teacher) {
            $this->notFound('Teacher not found');
            return;
        }

        // Check if department exists
        $stmt = $this->db->prepare("SELECT id FROM departments WHERE id = ?");
        $stmt->execute([$data['department_id']]);
        if (!$stmt->fetch()) {
            $this->validationError(['department_id' => 'Department not found']);
            return;
        }

        // Check if department already has an HOD
        $stmt = $this->db->prepare("SELECT id FROM hods WHERE department_id = ? AND deleted_at IS NULL");
        $stmt->execute([$data['department_id']]);
        if ($stmt->fetch()) {
            $this->error('Department already has an HOD', 409);
            return;
        }

        // Check if teacher is already an HOD
        $stmt = $this->db->prepare("SELECT id FROM hods WHERE teacher_id = ? AND deleted_at IS NULL");
        $stmt->execute([$data['teacher_id']]);
        if ($stmt->fetch()) {
            $this->error('Teacher is already an HOD', 409);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Create HOD record by copying the teacher's auth info and name
        $hodSql = "INSERT INTO hods (username, email, password, first_name, last_name, phone, teacher_id, department_id, appointed_date, is_active, created_at, updated_at)
                   VALUES (:username, :email, :password, :first_name, :last_name, :phone, :teacher_id, :department_id, :appointed_date, 1, NOW(), NOW())";

        try {
            $stmt = $this->db->prepare($hodSql);
            $stmt->execute([
                'username' => $teacher['username'],
                'email' => $teacher['email'],
                'password' => $teacher['password'],
                'first_name' => $teacher['first_name'],
                'last_name' => $teacher['last_name'],
                'phone' => $teacher['phone'],
                'teacher_id' => $data['teacher_id'],
                'department_id' => $data['department_id'],
                'appointed_date' => $data['appointed_date']
            ]);

            $hodId = (int) $this->db->lastInsertId();

            // A teacher assigned as HOD of a different department becomes a (primary) member of
            // it - their teacher record's own department_id becomes stale otherwise (used by
            // HOD\TeacherController, HOD\DepartmentController and HOD\AnalyticsController to
            // scope "teachers in this department"), which would leave them showing under their
            // old department instead of the one they were just made HOD of. This does not remove
            // their membership in any other department they already belonged to.
            $this->syncTeacherPrimaryDepartment((int) $data['teacher_id'], (int) $data['department_id']);
        } catch (\PDOException $e) {
            error_log("HOD assignment failed: " . $e->getMessage());
            $this->error('Failed to assign teacher as HOD: ' . $e->getMessage(), 500);
            return;
        }

        $this->success([
            'id' => $hodId,
            'teacher_id' => $data['teacher_id'],
            'department_id' => $data['department_id'],
            'appointed_date' => $data['appointed_date'],
            'username' => $teacher['username'],
            'email' => $teacher['email'],
            'first_name' => $teacher['first_name'],
            'last_name' => $teacher['last_name']
        ], 'Teacher assigned as HOD successfully');
    }

    /**
     * Get available teachers (not already HODs)
     * GET /admin/hods/available-teachers
     */
    public function availableTeachers(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $search = $this->query('search', '');
        $departmentId = $this->query('department_id', '');

        // Build query
        $where = ['t.deleted_at IS NULL'];
        $params = [];

        // Exclude teachers who are already HODs
        $where[] = 't.id NOT IN (SELECT teacher_id FROM hods WHERE teacher_id IS NOT NULL AND deleted_at IS NULL)';

        if (!empty($search)) {
            $where[] = '(t.username LIKE :search OR t.email LIKE :search OR t.first_name LIKE :search OR t.last_name LIKE :search OR t.employee_number LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        if (!empty($departmentId)) {
            // Membership-based: a teacher whose primary department is elsewhere but who also
            // belongs to this department is still a valid candidate to head it.
            $where[] = 'EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)';
            $params['department_id'] = $departmentId;
        }

        $whereClause = implode(' AND ', $where);
        
        $sql = "SELECT t.id, t.username, t.email, t.employee_number, t.first_name, t.last_name, t.phone, 
                       t.department_id, d.name as department_name
                FROM teachers t
                LEFT JOIN departments d ON t.department_id = d.id
                WHERE {$whereClause}
                ORDER BY t.first_name, t.last_name
                LIMIT 100";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $teachers = $stmt->fetchAll();

        $this->success(['teachers' => $teachers]);
    }

    /**
     * De-assign HOD (remove HOD role but keep teacher/user record)
     * POST /admin/hods/{id}/deassign
     */
    public function deassign(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        // Check if HOD exists
        $stmt = $this->db->prepare("SELECT id, teacher_id FROM hods WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        $hod = $stmt->fetch();

        if (!$hod) {
            $this->notFound('HOD not found');
            return;
        }

        // Soft delete HOD record
        $sql = "UPDATE hods SET deleted_at = NOW() WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(['id' => $id]);

        if ($result) {
            $this->success([], 'HOD de-assigned successfully');
        } else {
            $this->error('Failed to de-assign HOD', 500);
        }
    }

    /**
     * Check if current user is admin
     */
    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
