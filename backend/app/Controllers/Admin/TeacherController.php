<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\User;
use eSpace\App\Models\Teacher;
use eSpace\App\Models\AuditLog;

/**
 * Admin Teacher Controller
 * 
 * Handles teacher management operations for administrators.
 */
class TeacherController extends Controller
{
    private User $userModel;
    private Teacher $teacherModel;
    private AuditLog $auditLog;

    public function __construct()
    {
        parent::__construct();
        $this->userModel = new User();
        $this->teacherModel = new Teacher();
        $this->auditLog = new AuditLog();
    }

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
     * Get all teachers
     * GET /admin/teachers
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        // This is a GET endpoint - request data lives in $_GET (this->query()), not
        // $_POST/JSON body (this->input()). Using input() here meant search/department/status
        // filtering and pagination silently did nothing, always falling back to these defaults.
        $search = $this->query('search', '');
        $departmentId = $this->query('department_id', '');
        $isActive = $this->query('is_active', '');
        $page = (int) $this->query('page', 1);
        $limit = (int) $this->query('limit', 20);

        $db = $this->getDb();
        
        // Build query
        $where = ['deleted_at IS NULL'];
        $params = [];

        if (!empty($search)) {
            // Distinct placeholder per OR branch - PDO's native prepares (no
            // ATTR_EMULATE_PREPARES) reject reusing the same named parameter more than once.
            $where[] = '(username LIKE :search1 OR email LIKE :search2 OR first_name LIKE :search3 OR last_name LIKE :search4 OR employee_number LIKE :search5)';
            $like = "%{$search}%";
            $params['search1'] = $like;
            $params['search2'] = $like;
            $params['search3'] = $like;
            $params['search4'] = $like;
            $params['search5'] = $like;
        }

        if (!empty($departmentId)) {
            $where[] = 'department_id = :department_id';
            $params['department_id'] = $departmentId;
        }

        if (!empty($isActive)) {
            $where[] = 'is_active = :is_active';
            $params['is_active'] = $isActive;
        }

        $whereClause = implode(' AND ', $where);
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM teachers WHERE {$whereClause}";
        $countStmt = $db->prepare($countSql);
        $countStmt->execute($params);
        $total = (int) $countStmt->fetch()['total'];

        // Get paginated results
        $offset = ($page - 1) * $limit;
        $sql = "SELECT id, username, email, is_active, created_at, employee_number, first_name, last_name,
                       gender, phone, department_id, qualification, specialization, last_login_at
                FROM teachers
                WHERE {$whereClause}
                ORDER BY created_at DESC
                LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $teachers = $stmt->fetchAll();

        $this->attachDepartmentMemberships($db, $teachers);

        // Get statistics
        $statsSql = "SELECT 
                        COUNT(*) as total,
                        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active,
                        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as suspended,
                        SUM(CASE WHEN department_id IS NULL THEN 1 ELSE 0 END) as unassigned
                     FROM teachers WHERE deleted_at IS NULL";
        $statsStmt = $db->prepare($statsSql);
        $statsStmt->execute();
        $statistics = $statsStmt->fetch();

        $this->success([
            'teachers' => $teachers,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ],
            'statistics' => $statistics
        ]);
    }

    /**
     * Generate unique employee number starting with TS
     */
    private function generateEmployeeNumber(): string
    {
        $db = $this->getDb();

        // Look at the highest TS-prefixed employee number rather than just the most recent
        // row: a non-conforming employee_number (e.g. a manually seeded "QA-TEST-001" test
        // account) on the latest row would otherwise make substr()/int-cast parsing return 0
        // and regenerate an already-used number.
        $stmt = $db->prepare("SELECT employee_number FROM teachers WHERE employee_number REGEXP '^TS[0-9]+$' ORDER BY CAST(SUBSTRING(employee_number, 3) AS UNSIGNED) DESC LIMIT 1");
        $stmt->execute();
        $lastEmployee = $stmt->fetch();

        $newNumber = 1;
        if ($lastEmployee && $lastEmployee['employee_number']) {
            $newNumber = (int) substr($lastEmployee['employee_number'], 2) + 1;
        }

        $candidate = 'TS' . str_pad((string) $newNumber, 2, '0', STR_PAD_LEFT);

        // Safety net against any remaining collision
        $checkStmt = $db->prepare("SELECT id FROM teachers WHERE employee_number = :employee_number");
        while (true) {
            $checkStmt->execute(['employee_number' => $candidate]);
            if (!$checkStmt->fetch()) {
                break;
            }
            $newNumber++;
            $candidate = 'TS' . str_pad((string) $newNumber, 2, '0', STR_PAD_LEFT);
        }

        return $candidate;
    }

    /**
     * Normalize a date string (from Excel or manual entry) to Y-m-d, or null if invalid
     */
    private function normalizeDate(string $value): ?string
    {
        $value = trim($value);
        if ($value === '') {
            return null;
        }

        foreach (['Y-m-d', 'Y/m/d', 'd/m/Y', 'm/d/Y', 'd-m-Y'] as $format) {
            $dt = \DateTime::createFromFormat($format, $value);
            if ($dt && $dt->format($format) === $value) {
                return $dt->format('Y-m-d');
            }
        }

        $ts = strtotime($value);
        return $ts !== false ? date('Y-m-d', $ts) : null;
    }

    /**
     * Generate a unique username/password base from a first name, avoiding collisions with
     * both existing DB usernames and usernames already reserved earlier in the same import
     * batch. Returns the final username (used as both username and temporary password).
     */
    private function generateUniqueUsername(string $firstName, array &$reservedUsernames): string
    {
        $base = preg_replace('/[^a-z0-9]/', '', strtolower(trim($firstName)));
        if ($base === '') {
            $base = 'teacher';
        }

        $username = $base;
        $suffix = 2;
        while (isset($reservedUsernames[$username])) {
            $username = $base . $suffix;
            $suffix++;
        }

        $reservedUsernames[$username] = true;
        return $username;
    }

    /**
     * Create a new teacher
     * POST /admin/teachers
     */
    public function create(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();

        // Validate required fields
        $userErrors = $this->validateRequired(['username', 'email', 'password']);
        if (!empty($userErrors)) {
            $this->validationError($userErrors);
            return;
        }

        $teacherErrors = $this->validateRequired(['first_name', 'last_name', 'gender']);
        if (!empty($teacherErrors)) {
            $this->validationError($teacherErrors);
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

        // Sanitize input
        $data = $this->sanitize($data);

        // Check if username or email already exists in teachers table
        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM teachers WHERE username = :username OR email = :email");
        $stmt->execute(['username' => $data['username'], 'email' => $data['email']]);
        if ($stmt->fetch()) {
            $this->error('Username or email already exists in teachers table', 409);
            return;
        }

        // Generate employee number automatically
        $employeeNumber = $this->generateEmployeeNumber();

        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        // Insert directly into teachers table. must_change_password = 1 since the admin is the
        // one choosing this password, not the teacher - see MustChangePasswordMiddleware.
        $teacherSql = "INSERT INTO teachers (username, email, password, must_change_password, role, is_active, employee_number, first_name, last_name, gender, phone, department_id, created_at, updated_at)
                       VALUES (:username, :email, :password, 1, 'teacher', 1, :employee_number, :first_name, :last_name, :gender, :phone, :department_id, NOW(), NOW())";
        
        $stmt = $db->prepare($teacherSql);
        $stmt->execute([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $hashedPassword,
            'employee_number' => $employeeNumber,
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'gender' => $data['gender'],
            'phone' => $data['phone'] ?? null,
            'department_id' => !empty($data['department_id']) ? (int)$data['department_id'] : null
        ]);

        $teacherId = (int) $db->lastInsertId();

        if (!empty($data['department_id'])) {
            $this->syncTeacherPrimaryDepartment($teacherId, (int) $data['department_id']);
        }

        $this->success([
            'id' => $teacherId,
            'username' => $data['username'],
            'email' => $data['email'],
            'role' => 'teacher',
            'employee_number' => $employeeNumber,
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name']
        ], 'Teacher created successfully');

        // Log the action
        $this->auditLog->logAction(
            $this->getCurrentUserId(),
            $this->getCurrentUserRole(),
            'teacher_created',
            'teacher',
            $teacherId,
            $teacherId,
            null,
            json_encode(['username' => $data['username'], 'email' => $data['email'], 'employee_number' => $employeeNumber])
        );
    }

    /**
     * Validate (and optionally perform) a bulk teacher import from parsed Excel rows.
     * POST /admin/teachers/import
     *
     * Body: { rows: [{ _row, first_name, last_name, department, email, phone, gender,
     *                   date_of_birth, qualification, specialization, hire_date, address }],
     *         confirm: boolean }
     *
     * When confirm is false, rows are validated only (no writes) so the admin can preview
     * the outcome. When confirm is true, valid rows are inserted inside a transaction and
     * plaintext temporary passwords are returned once for the credentials report - they are
     * never stored, only their bcrypt hash is.
     */
    public function import(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();
        $rows = $data['rows'] ?? [];
        $confirm = !empty($data['confirm']);

        if (!is_array($rows) || empty($rows)) {
            $this->validationError(['rows' => 'No teacher rows provided']);
            return;
        }

        $db = $this->getDb();

        $deptStmt = $db->prepare("SELECT id, name FROM departments WHERE deleted_at IS NULL");
        $deptStmt->execute();
        $departmentsByLowerName = [];
        foreach ($deptStmt->fetchAll() as $dept) {
            $departmentsByLowerName[strtolower(trim($dept['name']))] = $dept;
        }

        $existingStmt = $db->prepare("SELECT username, email FROM teachers WHERE deleted_at IS NULL");
        $existingStmt->execute();
        $reservedUsernames = [];
        $reservedEmails = [];
        foreach ($existingStmt->fetchAll() as $row) {
            if (!empty($row['username'])) {
                $reservedUsernames[strtolower($row['username'])] = true;
            }
            if (!empty($row['email'])) {
                $reservedEmails[strtolower($row['email'])] = true;
            }
        }

        $validGenders = ['male', 'female', 'other'];
        $results = [];
        $credentials = [];
        $successCount = 0;
        $failCount = 0;

        if ($confirm) {
            $db->beginTransaction();
        }

        try {
            foreach ($rows as $index => $row) {
                $rowNumber = isset($row['_row']) ? (int) $row['_row'] : ($index + 2);
                $errors = [];

                $firstName = trim((string) ($row['first_name'] ?? ''));
                $lastName = trim((string) ($row['last_name'] ?? ''));
                $departmentInput = trim((string) ($row['department'] ?? ''));
                $email = trim((string) ($row['email'] ?? ''));
                $phone = trim((string) ($row['phone'] ?? ''));
                $genderInput = trim((string) ($row['gender'] ?? ''));
                $dobInput = trim((string) ($row['date_of_birth'] ?? ''));
                $qualification = trim((string) ($row['qualification'] ?? ''));
                $specialization = trim((string) ($row['specialization'] ?? ''));
                $hireDateInput = trim((string) ($row['hire_date'] ?? ''));
                $address = trim((string) ($row['address'] ?? ''));

                if ($firstName === '') {
                    $errors[] = 'first_name is required';
                }
                if ($lastName === '') {
                    $errors[] = 'last_name is required';
                }

                $departmentId = null;
                $departmentName = null;
                if ($departmentInput === '') {
                    $errors[] = 'department is required';
                } else {
                    $match = $departmentsByLowerName[strtolower($departmentInput)] ?? null;
                    if (!$match) {
                        $errors[] = "Department '{$departmentInput}' was not found.";
                    } else {
                        $departmentId = (int) $match['id'];
                        $departmentName = $match['name'];
                    }
                }

                if ($email !== '') {
                    if (!$this->validateEmail($email)) {
                        $errors[] = "Invalid email '{$email}'";
                    } elseif (isset($reservedEmails[strtolower($email)])) {
                        $errors[] = "Email '{$email}' already exists";
                    }
                }

                $gender = null;
                if ($genderInput !== '') {
                    $genderNormalized = strtolower($genderInput);
                    if (!in_array($genderNormalized, $validGenders, true)) {
                        $errors[] = "Invalid gender '{$genderInput}' (must be male, female or other)";
                    } else {
                        $gender = $genderNormalized;
                    }
                }

                $dob = null;
                if ($dobInput !== '') {
                    $dob = $this->normalizeDate($dobInput);
                    if ($dob === null) {
                        $errors[] = "Invalid date_of_birth '{$dobInput}'";
                    }
                }

                $hireDate = null;
                if ($hireDateInput !== '') {
                    $hireDate = $this->normalizeDate($hireDateInput);
                    if ($hireDate === null) {
                        $errors[] = "Invalid hire_date '{$hireDateInput}'";
                    }
                }

                $rowResult = [
                    'row' => $rowNumber,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'department' => $departmentInput,
                ];

                if (!empty($errors)) {
                    $rowResult['status'] = 'failed';
                    $rowResult['errors'] = $errors;
                    $results[] = $rowResult;
                    $failCount++;
                    continue;
                }

                $username = $this->generateUniqueUsername($firstName, $reservedUsernames);
                $password = $username;

                if ($email !== '') {
                    $reservedEmails[strtolower($email)] = true;
                }

                if (!$confirm) {
                    $rowResult['status'] = 'valid';
                    $rowResult['username'] = $username;
                    $rowResult['temporary_password'] = $password;
                    $results[] = $rowResult;
                    $successCount++;
                    continue;
                }

                $employeeNumber = $this->generateEmployeeNumber();
                $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

                $columns = [
                    'username' => $username,
                    'email' => $email !== '' ? $email : null,
                    'password' => $hashedPassword,
                    // The generated password (their first name) is temporary by design here -
                    // force a change on first login, same as create().
                    'must_change_password' => 1,
                    'role' => 'teacher',
                    'is_active' => 1,
                    'employee_number' => $employeeNumber,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'department_id' => $departmentId,
                    'phone' => $phone !== '' ? $phone : null,
                    'qualification' => $qualification !== '' ? $qualification : null,
                    'specialization' => $specialization !== '' ? $specialization : null,
                    'address' => $address !== '' ? $address : null,
                ];
                if ($gender !== null) {
                    $columns['gender'] = $gender;
                }
                if ($dob !== null) {
                    $columns['date_of_birth'] = $dob;
                }
                if ($hireDate !== null) {
                    $columns['hire_date'] = $hireDate;
                }

                $cols = array_keys($columns);
                $placeholders = array_map(fn($c) => ":{$c}", $cols);
                $sql = "INSERT INTO teachers (" . implode(', ', $cols) . ", created_at, updated_at) VALUES (" . implode(', ', $placeholders) . ", NOW(), NOW())";
                $stmt = $db->prepare($sql);
                $stmt->execute($columns);
                $teacherId = (int) $db->lastInsertId();

                if ($departmentId !== null) {
                    $this->syncTeacherPrimaryDepartment($teacherId, $departmentId);
                }

                $rowResult['status'] = 'success';
                $rowResult['id'] = $teacherId;
                $rowResult['username'] = $username;
                $results[] = $rowResult;
                $successCount++;

                $credentials[] = [
                    'employee_number' => $employeeNumber,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'department' => $departmentName,
                    'username' => $username,
                    'temporary_password' => $password,
                    'email' => $email,
                ];
            }

            if ($confirm) {
                $db->commit();
            }

            // Note: unlike single-teacher create/update/delete below, this endpoint does not
            // call auditLog->logAction() - that call is unreachable dead code everywhere else
            // in this controller (success()/json() calls exit() before it), and audit_logs'
            // real schema (user_id, table_name, record_id...) doesn't match AuditLog's fillable
            // columns (acting_user_id, entity_type...) so calling it here would throw after
            // the import has already committed.
            $this->success([
                'summary' => [
                    'total' => count($rows),
                    'success' => $successCount,
                    'failed' => $failCount,
                ],
                'results' => $results,
                'credentials' => $credentials,
            ], $confirm ? 'Import complete' : 'Preview generated');
        } catch (\Exception $e) {
            if ($confirm && $db->inTransaction()) {
                $db->rollBack();
            }
            $this->error('Import failed: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get teacher by ID
     * GET /admin/teachers/{id}
     */
    public function show($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $sql = "SELECT id, username, email, is_active, created_at, employee_number, first_name, last_name,
                       date_of_birth, gender, address, department_id, qualification, specialization, hire_date, phone
                FROM teachers
                WHERE id = :id AND deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id]);
        $teacher = $stmt->fetch();

        if (!$teacher) {
            $this->notFound('Teacher not found');
            return;
        }

        $teachers = [$teacher];
        $this->attachDepartmentMemberships($db, $teachers);

        $this->success($teachers[0]);
    }

    /**
     * Attach each teacher row's department memberships (as a `departments` array, primary
     * first) in one batch query rather than N+1 queries per row.
     */
    private function attachDepartmentMemberships($db, array &$teachers): void
    {
        if (empty($teachers)) {
            return;
        }

        $teacherIds = array_column($teachers, 'id');
        $placeholders = implode(',', array_fill(0, count($teacherIds), '?'));

        $sql = "SELECT tda.teacher_id, d.id, d.name, d.code, tda.is_primary
                FROM teacher_department_assignments tda
                JOIN departments d ON d.id = tda.department_id
                WHERE tda.teacher_id IN ({$placeholders}) AND tda.deleted_at IS NULL
                ORDER BY tda.is_primary DESC, d.name ASC";
        $stmt = $db->prepare($sql);
        $stmt->execute($teacherIds);

        $byTeacher = [];
        foreach ($stmt->fetchAll() as $row) {
            $byTeacher[$row['teacher_id']][] = [
                'id' => (int) $row['id'],
                'name' => $row['name'],
                'code' => $row['code'],
                'is_primary' => (bool) $row['is_primary'],
            ];
        }

        foreach ($teachers as &$teacher) {
            $teacher['departments'] = $byTeacher[$teacher['id']] ?? [];
        }
        unset($teacher);
    }

    /**
     * Set a teacher's department memberships and primary/active department.
     * PUT /admin/teachers/{id}/departments
     * Body: { department_ids: number[], primary_department_id: number }
     */
    public function assignDepartments($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $data = $this->input();

        $departmentIds = $data['department_ids'] ?? [];
        $primaryDepartmentId = isset($data['primary_department_id']) ? (int) $data['primary_department_id'] : null;

        if (!is_array($departmentIds) || empty($departmentIds)) {
            $this->validationError(['department_ids' => 'At least one department is required']);
            return;
        }

        $departmentIds = array_values(array_unique(array_map('intval', $departmentIds)));

        if ($primaryDepartmentId === null || !in_array($primaryDepartmentId, $departmentIds, true)) {
            $this->validationError(['primary_department_id' => 'Primary department must be one of the selected departments']);
            return;
        }

        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id FROM teachers WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Teacher not found');
            return;
        }

        $placeholders = implode(',', array_fill(0, count($departmentIds), '?'));
        $deptStmt = $db->prepare("SELECT id FROM departments WHERE id IN ({$placeholders}) AND deleted_at IS NULL");
        $deptStmt->execute($departmentIds);
        $foundIds = array_map('intval', array_column($deptStmt->fetchAll(), 'id'));
        $missing = array_diff($departmentIds, $foundIds);
        if (!empty($missing)) {
            $this->validationError(['department_ids' => 'One or more departments were not found: ' . implode(', ', $missing)]);
            return;
        }

        try {
            $db->beginTransaction();

            $deleteStmt = $db->prepare("DELETE FROM teacher_department_assignments WHERE teacher_id = :teacher_id");
            $deleteStmt->execute(['teacher_id' => $id]);

            $insertStmt = $db->prepare("INSERT INTO teacher_department_assignments (teacher_id, department_id, is_primary, created_at, updated_at) VALUES (:teacher_id, :department_id, :is_primary, NOW(), NOW())");
            foreach ($departmentIds as $departmentId) {
                $insertStmt->execute([
                    'teacher_id' => $id,
                    'department_id' => $departmentId,
                    'is_primary' => $departmentId === $primaryDepartmentId ? 1 : 0,
                ]);
            }

            $updateStmt = $db->prepare("UPDATE teachers SET department_id = :department_id, updated_at = NOW() WHERE id = :id");
            $updateStmt->execute(['department_id' => $primaryDepartmentId, 'id' => $id]);

            $db->commit();
        } catch (\Exception $e) {
            $db->rollBack();
            $this->error('Failed to update departments: ' . $e->getMessage(), 500);
            return;
        }

        $teachers = [['id' => $id]];
        $this->attachDepartmentMemberships($db, $teachers);

        $this->success(['departments' => $teachers[0]['departments']], 'Departments updated successfully');
    }

    /**
     * Update teacher
     * PUT /admin/teachers/{id}
     */
    public function update($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $data = $this->input();

        $db = $this->getDb();
        
        // Check if teacher exists
        $stmt = $db->prepare("SELECT id FROM teachers WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Teacher not found');
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

        $allowedFields = ['username', 'email', 'password', 'is_active', 'employee_number', 'first_name', 'last_name', 'date_of_birth', 'gender', 'address', 'department_id', 'qualification', 'specialization', 'hire_date', 'phone'];

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
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
        }

        // Keep the membership table in sync if a caller still updates department_id directly
        // here rather than through PUT /teachers/{id}/departments (e.g. the admin Edit Teacher
        // form no longer does this - it uses the dedicated "Manage Departments" modal instead).
        if (isset($data['department_id']) && $data['department_id'] !== '') {
            $this->syncTeacherPrimaryDepartment($id, (int) $data['department_id']);
        }

        $this->success([], 'Teacher updated successfully');

        // Log the action
        $this->auditLog->logAction(
            $this->getCurrentUserId(),
            $this->getCurrentUserRole(),
            'teacher_updated',
            'teacher',
            $id,
            $id,
            null,
            json_encode($data)
        );
    }

    /**
     * Delete teacher (soft delete)
     * DELETE /admin/teachers/{id}
     */
    public function delete($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;

        $db = $this->getDb();
        
        // Check if teacher exists
        $stmt = $db->prepare("SELECT id FROM teachers WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Teacher not found');
            return;
        }

        // Soft delete teacher
        $sql = "UPDATE teachers SET deleted_at = NOW() WHERE id = :id";
        $stmt = $db->prepare($sql);
        $result = $stmt->execute(['id' => $id]);

        if ($result) {
            $this->success([], 'Teacher deleted successfully');

            // Log the action
            $this->auditLog->logAction(
                $this->getCurrentUserId(),
                $this->getCurrentUserRole(),
                'teacher_deleted',
                'teacher',
                $id,
                $id,
                null,
                null
            );
        } else {
            $this->error('Failed to delete teacher', 500);
        }
    }

    /**
     * Suspend teacher
     * PUT /admin/teachers/{id}/suspend
     */
    public function suspend($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;

        $db = $this->getDb();
        
        // Check if teacher exists
        $stmt = $db->prepare("SELECT id FROM teachers WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Teacher not found');
            return;
        }

        $sql = "UPDATE teachers SET is_active = 0 WHERE id = :id";
        $stmt = $db->prepare($sql);
        $result = $stmt->execute(['id' => $id]);

        if ($result) {
            $this->success([], 'Teacher suspended successfully');

            // Log the action
            $this->auditLog->logAction(
                $this->getCurrentUserId(),
                $this->getCurrentUserRole(),
                'teacher_suspended',
                'teacher',
                $id,
                $id,
                json_encode(['is_active' => 1]),
                json_encode(['is_active' => 0])
            );
        } else {
            $this->error('Failed to suspend teacher', 500);
        }
    }

    /**
     * Restore suspended teacher
     * PUT /admin/teachers/{id}/restore
     */
    public function restore($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;

        $db = $this->getDb();
        
        // Check if teacher exists
        $stmt = $db->prepare("SELECT id FROM teachers WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Teacher not found');
            return;
        }

        $sql = "UPDATE teachers SET is_active = 1 WHERE id = :id";
        $stmt = $db->prepare($sql);
        $result = $stmt->execute(['id' => $id]);

        if ($result) {
            $this->success([], 'Teacher restored successfully');

            // Log the action
            $this->auditLog->logAction(
                $this->getCurrentUserId(),
                $this->getCurrentUserRole(),
                'teacher_restored',
                'teacher',
                $id,
                $id,
                json_encode(['is_active' => 0]),
                json_encode(['is_active' => 1])
            );
        } else {
            $this->error('Failed to restore teacher', 500);
        }
    }

    /**
     * Reset teacher password
     * POST /admin/teachers/{id}/reset-password
     */
    public function resetPassword($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $data = $this->input();

        $db = $this->getDb();
        
        // Check if teacher exists
        $stmt = $db->prepare("SELECT id FROM teachers WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Teacher not found');
            return;
        }

        // Validate new password
        if (!isset($data['password']) || strlen($data['password']) < 8) {
            $this->validationError(['password' => 'Password must be at least 8 characters']);
            return;
        }

        if (!isset($data['password_confirmation']) || $data['password'] !== $data['password_confirmation']) {
            $this->validationError(['password_confirmation' => 'Passwords do not match']);
            return;
        }

        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        // An admin-chosen password is a new temporary one from the teacher's perspective -
        // force them through the change-password screen again on next login.
        $sql = "UPDATE teachers SET password = :password, must_change_password = 1 WHERE id = :id";
        $stmt = $db->prepare($sql);
        $result = $stmt->execute(['password' => $hashedPassword, 'id' => $id]);

        if ($result) {
            $this->success([], 'Password reset successfully');

            // Log the action (without storing the password)
            $this->auditLog->logAction(
                $this->getCurrentUserId(),
                $this->getCurrentUserRole(),
                'teacher_password_reset',
                'teacher',
                $id,
                $id,
                null,
                json_encode(['password_reset' => true])
            );
        } else {
            $this->error('Failed to reset password', 500);
        }
    }

    /**
     * Assign department to teacher
     * PUT /admin/teachers/{id}/department
     */
    public function assignDepartment($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $data = $this->input();

        if (!isset($data['department_id'])) {
            $this->validationError(['department_id' => 'Department ID is required']);
            return;
        }

        $user = $this->userModel->find($id);
        if (!$user || $user['role'] !== 'teacher') {
            $this->notFound('Teacher not found');
            return;
        }

        $db = $this->getDb();
        $sql = "UPDATE teachers SET department_id = :department_id WHERE user_id = :user_id";
        $stmt = $db->prepare($sql);
        $result = $stmt->execute(['department_id' => $data['department_id'], 'user_id' => $id]);

        if ($result) {
            $this->success([], 'Department assigned successfully');

            // Log the action
            $this->auditLog->logAction(
                $this->getCurrentUserId(),
                $this->getCurrentUserRole(),
                'teacher_department_assigned',
                'teacher',
                $id,
                $id,
                json_encode(['department_id' => $user['department_id']]),
                json_encode(['department_id' => $data['department_id']])
            );
        } else {
            $this->error('Failed to assign department', 500);
        }
    }

    /**
     * Assign subjects to teacher
     * PUT /admin/teachers/{id}/subjects
     */
    public function assignSubjects($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $data = $this->input();

        if (!isset($data['subject_ids']) || !is_array($data['subject_ids'])) {
            $this->validationError(['subject_ids' => 'Subject IDs array is required']);
            return;
        }

        $user = $this->userModel->find($id);
        if (!$user || $user['role'] !== 'teacher') {
            $this->notFound('Teacher not found');
            return;
        }

        try {
            $db = $this->getDb();
            $db->beginTransaction();

            // Delete existing subject assignments
            $deleteSql = "DELETE FROM teacher_subject_assignments WHERE teacher_id = :teacher_id";
            $deleteStmt = $db->prepare($deleteSql);
            $deleteStmt->execute(['teacher_id' => $id]);

            // Insert new subject assignments
            if (!empty($data['subject_ids'])) {
                $insertSql = "INSERT INTO teacher_subject_assignments (teacher_id, subject_id, academic_year_id, term_id) VALUES (:teacher_id, :subject_id, :academic_year_id, :term_id)";
                $insertStmt = $db->prepare($insertSql);
                
                foreach ($data['subject_ids'] as $subjectId) {
                    $insertStmt->execute([
                        'teacher_id' => $id,
                        'subject_id' => $subjectId,
                        'academic_year_id' => $data['academic_year_id'] ?? null,
                        'term_id' => $data['term_id'] ?? null
                    ]);
                }
            }

            $db->commit();
            $this->success([], 'Subjects assigned successfully');

            // Log the action
            $this->auditLog->logAction(
                $this->getCurrentUserId(),
                $this->getCurrentUserRole(),
                'teacher_subjects_assigned',
                'teacher',
                $id,
                $id,
                null,
                json_encode(['subject_ids' => $data['subject_ids']])
            );

        } catch (\Exception $e) {
            $db->rollBack();
            $this->error('Failed to assign subjects: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Assign classes to teacher
     * PUT /admin/teachers/{id}/classes
     */
    public function assignClasses($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $data = $this->input();

        if (!isset($data['class_ids']) || !is_array($data['class_ids'])) {
            $this->validationError(['class_ids' => 'Class IDs array is required']);
            return;
        }

        $user = $this->userModel->find($id);
        if (!$user || $user['role'] !== 'teacher') {
            $this->notFound('Teacher not found');
            return;
        }

        try {
            $db = $this->getDb();
            $db->beginTransaction();

            // Delete existing class assignments
            $deleteSql = "DELETE FROM teacher_class_assignments WHERE teacher_id = :teacher_id";
            $deleteStmt = $db->prepare($deleteSql);
            $deleteStmt->execute(['teacher_id' => $id]);

            // Insert new class assignments
            if (!empty($data['class_ids'])) {
                $insertSql = "INSERT INTO teacher_class_assignments (teacher_id, class_id, stream_id, academic_year_id, term_id) VALUES (:teacher_id, :class_id, :stream_id, :academic_year_id, :term_id)";
                $insertStmt = $db->prepare($insertSql);
                
                foreach ($data['class_ids'] as $classId) {
                    $insertStmt->execute([
                        'teacher_id' => $id,
                        'class_id' => $classId,
                        'stream_id' => $data['stream_id'] ?? null,
                        'academic_year_id' => $data['academic_year_id'] ?? null,
                        'term_id' => $data['term_id'] ?? null
                    ]);
                }
            }

            $db->commit();
            $this->success([], 'Classes assigned successfully');

            // Log the action
            $this->auditLog->logAction(
                $this->getCurrentUserId(),
                $this->getCurrentUserRole(),
                'teacher_classes_assigned',
                'teacher',
                $id,
                $id,
                null,
                json_encode(['class_ids' => $data['class_ids']])
            );

        } catch (\Exception $e) {
            $db->rollBack();
            $this->error('Failed to assign classes: ' . $e->getMessage(), 500);
        }
    }

    /**
     * A teacher's department IDs (all memberships from teacher_department_assignments, or
     * their single teachers.department_id if no membership rows exist) - used to check that
     * a subject picked for a teaching assignment actually belongs to that teacher's department.
     */
    private function getTeacherDepartmentIds($db, int $teacherId): array
    {
        $stmt = $db->prepare("SELECT department_id FROM teacher_department_assignments WHERE teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['teacher_id' => $teacherId]);
        $ids = array_map('intval', array_column($stmt->fetchAll(), 'department_id'));

        if (empty($ids)) {
            $stmt = $db->prepare("SELECT department_id FROM teachers WHERE id = :id AND deleted_at IS NULL");
            $stmt->execute(['id' => $teacherId]);
            $row = $stmt->fetch();
            if ($row && $row['department_id'] !== null) {
                $ids[] = (int) $row['department_id'];
            }
        }

        return $ids;
    }

    /**
     * Get a teacher's subject-teaching assignments (which class streams they teach a
     * subject in, per term).
     * GET /admin/teachers/{id}/teaching-assignments
     */
    public function getTeachingAssignments($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id FROM teachers WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Teacher not found');
            return;
        }

        $sql = "SELECT cs.id, cs.class_id, cs.subject_id, cs.term_id, c.name AS class_name,
                       c.stream_name, c.level, s.name AS subject_name, s.code AS subject_code
                FROM class_subjects cs
                JOIN classes c ON c.id = cs.class_id
                JOIN subjects s ON s.id = cs.subject_id
                WHERE cs.teacher_id = :teacher_id
                ORDER BY s.name, c.level, c.name, c.stream_name";
        $stmt = $db->prepare($sql);
        $stmt->execute(['teacher_id' => $id]);

        $this->success(['assignments' => $stmt->fetchAll()]);
    }

    /**
     * Assign a teacher to teach one subject across a set of class streams (checkbox multi-
     * select). The subject must belong to one of the teacher's own departments - a teacher
     * can be assigned to many classes, but never outside their department. Re-running this
     * for the same teacher/subject/term replaces their previous class list for that subject,
     * and also takes over any of the checked classes from a different teacher who was
     * previously assigned that subject there.
     * PUT /admin/teachers/{id}/teaching-assignments
     * Body: { subject_id: number, class_ids: number[], term_id?: number }
     */
    public function assignTeachingAssignments($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $data = $this->input();

        $subjectId = isset($data['subject_id']) ? (int) $data['subject_id'] : 0;
        $classIds = $data['class_ids'] ?? [];

        if ($subjectId <= 0) {
            $this->validationError(['subject_id' => 'Subject is required']);
            return;
        }

        if (!is_array($classIds)) {
            $this->validationError(['class_ids' => 'Class IDs array is required']);
            return;
        }

        $classIds = array_values(array_unique(array_map('intval', $classIds)));

        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, department_id FROM teachers WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        $teacher = $stmt->fetch();
        if (!$teacher) {
            $this->notFound('Teacher not found');
            return;
        }

        $stmt = $db->prepare("SELECT id, department_id FROM subjects WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $subjectId]);
        $subject = $stmt->fetch();
        if (!$subject) {
            $this->validationError(['subject_id' => 'Subject not found']);
            return;
        }

        $teacherDepartmentIds = $this->getTeacherDepartmentIds($db, $id);
        if (empty($teacherDepartmentIds)) {
            $this->validationError(['subject_id' => 'This teacher has no department assigned yet. Assign a department first.']);
            return;
        }

        if ($subject['department_id'] === null || !in_array((int) $subject['department_id'], $teacherDepartmentIds, true)) {
            $this->validationError(['subject_id' => "This subject does not belong to the teacher's department"]);
            return;
        }

        $termId = isset($data['term_id']) && $data['term_id'] !== '' ? (int) $data['term_id'] : null;
        if ($termId === null) {
            $stmt = $db->prepare("SELECT id FROM terms WHERE is_current = 1 AND deleted_at IS NULL ORDER BY id DESC LIMIT 1");
            $stmt->execute();
            $current = $stmt->fetch();
            $termId = $current ? (int) $current['id'] : null;
        }

        if ($termId === null) {
            $this->validationError(['term_id' => 'No current term is set - please specify a term']);
            return;
        }

        if (!empty($classIds)) {
            $placeholders = implode(',', array_fill(0, count($classIds), '?'));
            $stmt = $db->prepare("SELECT id FROM classes WHERE id IN ({$placeholders}) AND deleted_at IS NULL");
            $stmt->execute($classIds);
            $foundIds = array_map('intval', array_column($stmt->fetchAll(), 'id'));
            $missing = array_diff($classIds, $foundIds);
            if (!empty($missing)) {
                $this->validationError(['class_ids' => 'One or more classes were not found: ' . implode(', ', $missing)]);
                return;
            }
        }

        try {
            $db->beginTransaction();

            // Clear this teacher's previous class list for this subject/term (handles boxes
            // that were unchecked), then free up any checked classes from whichever other
            // teacher previously held this subject there, before re-inserting the new set.
            $deleteMineStmt = $db->prepare("DELETE FROM class_subjects WHERE teacher_id = :teacher_id AND subject_id = :subject_id AND term_id = :term_id");
            $deleteMineStmt->execute(['teacher_id' => $id, 'subject_id' => $subjectId, 'term_id' => $termId]);

            if (!empty($classIds)) {
                $placeholders = implode(',', array_fill(0, count($classIds), '?'));
                $deleteOthersStmt = $db->prepare("DELETE FROM class_subjects WHERE subject_id = ? AND term_id = ? AND class_id IN ({$placeholders})");
                $deleteOthersStmt->execute(array_merge([$subjectId, $termId], $classIds));

                $insertStmt = $db->prepare("INSERT INTO class_subjects (class_id, subject_id, teacher_id, term_id, created_at, updated_at) VALUES (:class_id, :subject_id, :teacher_id, :term_id, NOW(), NOW())");
                foreach ($classIds as $classId) {
                    $insertStmt->execute([
                        'class_id' => $classId,
                        'subject_id' => $subjectId,
                        'teacher_id' => $id,
                        'term_id' => $termId,
                    ]);
                }
            }

            $db->commit();
        } catch (\Exception $e) {
            $db->rollBack();
            $this->error('Failed to update teaching assignment: ' . $e->getMessage(), 500);
            return;
        }

        $this->success([
            'subject_id' => $subjectId,
            'term_id' => $termId,
            'class_ids' => $classIds,
        ], 'Teaching assignment updated successfully');

        $this->auditLog->logAction(
            $this->getCurrentUserId(),
            $this->getCurrentUserRole(),
            'teacher_teaching_assignment_updated',
            'teacher',
            $id,
            $id,
            null,
            json_encode(['subject_id' => $subjectId, 'term_id' => $termId, 'class_ids' => $classIds])
        );
    }

    /**
     * De-assign a teacher from a single class-subject-term teaching assignment.
     * DELETE /admin/teachers/{id}/teaching-assignments/{assignmentId}
     */
    public function removeTeachingAssignment($id, $assignmentId): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $assignmentId = (int) $assignmentId;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, class_id, subject_id, term_id FROM class_subjects WHERE id = :id AND teacher_id = :teacher_id");
        $stmt->execute(['id' => $assignmentId, 'teacher_id' => $id]);
        $assignment = $stmt->fetch();

        if (!$assignment) {
            $this->notFound('Teaching assignment not found');
            return;
        }

        $deleteStmt = $db->prepare("DELETE FROM class_subjects WHERE id = :id");
        $deleteStmt->execute(['id' => $assignmentId]);

        $this->success([], 'Teacher de-assigned from this class successfully');

        $this->auditLog->logAction(
            $this->getCurrentUserId(),
            $this->getCurrentUserRole(),
            'teacher_teaching_assignment_removed',
            'teacher',
            $id,
            $id,
            json_encode($assignment),
            null
        );
    }

    /**
     * Sanitize a raw `ids` array from the request body into a deduped list of positive ints.
     */
    private function sanitizeIds($rawIds): array
    {
        if (!is_array($rawIds)) {
            return [];
        }
        $ids = array_map('intval', $rawIds);
        $ids = array_filter($ids, fn($v) => $v > 0);
        return array_values(array_unique($ids));
    }

    /**
     * Bulk suspend/restore across selected teachers.
     * POST /admin/teachers/bulk-status
     * Body: { ids: number[], is_active: boolean }
     */
    public function bulkStatus(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();
        $ids = $this->sanitizeIds($data['ids'] ?? []);
        if (empty($ids)) {
            $this->validationError(['ids' => 'No valid teachers selected']);
            return;
        }
        if (!isset($data['is_active'])) {
            $this->validationError(['is_active' => 'is_active is required']);
            return;
        }
        $isActive = !empty($data['is_active']) ? 1 : 0;

        $db = $this->getDb();
        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        try {
            $stmt = $db->prepare("UPDATE teachers SET is_active = ? WHERE id IN ($placeholders) AND deleted_at IS NULL");
            $stmt->execute([$isActive, ...$ids]);

            foreach ($ids as $teacherId) {
                $this->auditLog->logAction(
                    $this->getCurrentUserId(),
                    $this->getCurrentUserRole(),
                    $isActive ? 'teacher_restored' : 'teacher_suspended',
                    'teacher',
                    $teacherId,
                    $teacherId,
                    json_encode(['is_active' => $isActive ? 0 : 1]),
                    json_encode(['is_active' => $isActive])
                );
            }

            $this->success(['updated' => count($ids)], count($ids) . ' teacher(s) updated');
        } catch (\PDOException $e) {
            error_log('Failed to bulk update teacher status: ' . $e->getMessage());
            $this->error('Failed to update teachers', 500);
        }
    }

    /**
     * Bulk soft delete across selected teachers.
     * POST /admin/teachers/bulk-delete
     */
    public function bulkDelete(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();
        $ids = $this->sanitizeIds($data['ids'] ?? []);
        if (empty($ids)) {
            $this->validationError(['ids' => 'No valid teachers selected']);
            return;
        }

        $db = $this->getDb();
        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        try {
            $stmt = $db->prepare("UPDATE teachers SET deleted_at = NOW() WHERE id IN ($placeholders)");
            $stmt->execute($ids);

            foreach ($ids as $teacherId) {
                $this->auditLog->logAction($this->getCurrentUserId(), $this->getCurrentUserRole(), 'teacher_deleted', 'teacher', $teacherId, $teacherId, null, null);
            }

            $this->success(['deleted' => count($ids)], count($ids) . ' teacher(s) deleted');
        } catch (\PDOException $e) {
            error_log('Failed to bulk delete teachers: ' . $e->getMessage());
            $this->error('Failed to delete teachers', 500);
        }
    }

    /**
     * Bulk-assign a department across selected teachers (sets both the primary
     * teachers.department_id and the teacher_department_assignments membership row).
     * POST /admin/teachers/bulk-assign-department
     * Body: { ids: number[], department_id: number }
     */
    public function bulkAssignDepartment(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();
        $ids = $this->sanitizeIds($data['ids'] ?? []);
        if (empty($ids)) {
            $this->validationError(['ids' => 'No valid teachers selected']);
            return;
        }
        $departmentId = isset($data['department_id']) ? (int) $data['department_id'] : 0;
        if ($departmentId <= 0) {
            $this->validationError(['department_id' => 'department_id is required']);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM departments WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$departmentId]);
        if (!$stmt->fetch()) {
            $this->validationError(['department_id' => 'Department not found']);
            return;
        }

        try {
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            $updateStmt = $db->prepare("UPDATE teachers SET department_id = ?, updated_at = NOW() WHERE id IN ($placeholders) AND deleted_at IS NULL");
            $updateStmt->execute([$departmentId, ...$ids]);

            foreach ($ids as $teacherId) {
                $this->syncTeacherPrimaryDepartment($teacherId, $departmentId);
                $this->auditLog->logAction(
                    $this->getCurrentUserId(),
                    $this->getCurrentUserRole(),
                    'teacher_department_assigned',
                    'teacher',
                    $teacherId,
                    $teacherId,
                    null,
                    json_encode(['department_id' => $departmentId])
                );
            }

            $this->success(['updated' => count($ids)], count($ids) . ' teacher(s) assigned');
        } catch (\PDOException $e) {
            error_log('Failed to bulk assign department: ' . $e->getMessage());
            $this->error('Failed to assign department', 500);
        }
    }

    /**
     * CSV export of selected teachers (or, with no ids, every teacher matching search/department/status).
     * POST /admin/teachers/bulk-export
     */
    public function bulkExport(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();
        $ids = $this->sanitizeIds($data['ids'] ?? []);
        $db = $this->getDb();

        $where = ['t.deleted_at IS NULL'];
        $params = [];

        if (!empty($ids)) {
            $where[] = 't.id IN (' . implode(',', array_fill(0, count($ids), '?')) . ')';
            array_push($params, ...$ids);
        } else {
            $search = trim((string) ($data['search'] ?? ''));
            $departmentId = $data['department_id'] ?? '';
            $isActive = $data['is_active'] ?? '';
            if ($search !== '') {
                $where[] = '(t.username LIKE ? OR t.email LIKE ? OR t.first_name LIKE ? OR t.last_name LIKE ? OR t.employee_number LIKE ?)';
                $like = "%{$search}%";
                array_push($params, $like, $like, $like, $like, $like);
            }
            if (!empty($departmentId)) {
                $where[] = 't.department_id = ?';
                $params[] = $departmentId;
            }
            if ($isActive !== '') {
                $where[] = 't.is_active = ?';
                $params[] = $isActive;
            }
        }

        $sql = "SELECT t.employee_number, t.first_name, t.last_name, t.email, t.phone, t.gender,
                       d.name as department_name, t.is_active, t.created_at
                FROM teachers t
                LEFT JOIN departments d ON t.department_id = d.id
                WHERE " . implode(' AND ', $where) . "
                ORDER BY t.last_name, t.first_name";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        foreach ($rows as &$row) {
            $row['status'] = $row['is_active'] ? 'Active' : 'Suspended';
        }

        $this->downloadCsv('teachers.csv', [
            'Employee No' => 'employee_number',
            'First Name' => 'first_name',
            'Last Name' => 'last_name',
            'Email' => 'email',
            'Phone' => 'phone',
            'Gender' => 'gender',
            'Department' => 'department_name',
            'Status' => 'status',
            'Created At' => 'created_at',
        ], $rows);
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
