<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Utils\GenderGuesser;

/**
 * Admin Student Controller
 * 
 * Handles student management operations for administrators.
 * Uses role-specific architecture where students table has auth fields directly.
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
     * Get all students
     * GET /admin/students
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $search = $this->query('search', '');
        $classId = $this->query('class_id', '');
        $page = (int) $this->query('page', 1);
        $limit = (int) $this->query('limit', 20);

        // Build query - query students table directly
        $where = ['s.deleted_at IS NULL'];
        $params = [];

        if (!empty($search)) {
            // Non-emulated PDO prepares can't reuse one named placeholder twice in a query.
            $where[] = '(s.username LIKE :search1 OR s.email LIKE :search2 OR s.first_name LIKE :search3 OR s.last_name LIKE :search4 OR s.admission_number LIKE :search5)';
            $searchTerm = "%{$search}%";
            $params['search1'] = $searchTerm;
            $params['search2'] = $searchTerm;
            $params['search3'] = $searchTerm;
            $params['search4'] = $searchTerm;
            $params['search5'] = $searchTerm;
        }

        if (!empty($classId)) {
            $where[] = 's.class_id = :class_id';
            $params['class_id'] = $classId;
        }

        $whereClause = implode(' AND ', $where);
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM students s WHERE {$whereClause}";
        $stmt = $this->db->prepare($countSql);
        $stmt->execute($params);
        $total = $stmt->fetch()['total'];

        // Get paginated results
        $offset = ($page - 1) * $limit;
        $sql = "SELECT s.id, s.username, s.email, s.admission_number, s.first_name, s.last_name, s.phone,
                       s.is_active, s.created_at, s.class_id, s.stream_id, s.gender,
                       c.name as class_name, c.level as class_level, c.stream_name
                FROM students s
                LEFT JOIN classes c ON s.class_id = c.id
                WHERE {$whereClause}
                ORDER BY s.created_at DESC
                LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $students = $stmt->fetchAll();

        $genderStmt = $this->db->prepare(
            "SELECT gender, COUNT(*) as count FROM students WHERE deleted_at IS NULL GROUP BY gender"
        );
        $genderStmt->execute();
        $genderCounts = ['male' => 0, 'female' => 0, 'other' => 0];
        foreach ($genderStmt->fetchAll() as $row) {
            $genderCounts[$row['gender']] = (int) $row['count'];
        }

        $this->success([
            'students' => $students,
            'stats' => [
                'total' => array_sum($genderCounts),
                'male' => $genderCounts['male'],
                'female' => $genderCounts['female'],
                'other' => $genderCounts['other'],
            ],
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ]
        ]);
    }

    /**
     * Create a new student
     * POST /admin/students
     */
    public function create(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();

        // Validate required fields
        $errors = $this->validateRequired(['first_name', 'last_name', 'admission_number']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Auto-set username and password to reg_no (admission_number)
        $regNo = $data['admission_number'];
        $data['username'] = $regNo;
        $data['password'] = $regNo;
        $data['email'] = null; // Email is optional now

        // Check if reg_no already exists in students table
        $stmt = $this->db->prepare("SELECT id FROM students WHERE admission_number = ? AND deleted_at IS NULL");
        $stmt->execute([$regNo]);
        if ($stmt->fetch()) {
            $this->error('Registration number already exists', 409);
            return;
        }

        // Hash password
        $hashedPassword = password_hash($regNo, PASSWORD_BCRYPT);

        // Derive gender from first name when the admin didn't pick one explicitly
        if (empty($data['gender'])) {
            $data['gender'] = GenderGuesser::guess($data['first_name']);
        }

        // Create student record
        $studentSql = "INSERT INTO students (username, email, password, role, admission_number, first_name, last_name, gender, class_id, stream_id, is_active, created_at, updated_at) 
                       VALUES (:username, :email, :password, 'student', :admission_number, :first_name, :last_name, :gender, :class_id, :stream_id, 1, NOW(), NOW())";
        
        try {
            $stmt = $this->db->prepare($studentSql);
            $stmt->execute([
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => $hashedPassword,
                'admission_number' => $data['admission_number'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'gender' => $data['gender'],
                'class_id' => $data['class_id'] ?? null,
                'stream_id' => $data['stream_id'] ?? null
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
            'admission_number' => $data['admission_number'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name']
        ], 'Student created successfully');
    }

    /**
     * Get student by ID
     * GET /admin/students/{id}
     */
    public function show(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        $sql = "SELECT s.id, s.username, s.email, s.admission_number, s.first_name, s.last_name, s.phone,
                       s.is_active, s.created_at, s.class_id, s.stream_id, s.gender,
                       c.name as class_name, c.level as class_level, c.stream_name
                FROM students s
                LEFT JOIN classes c ON s.class_id = c.id
                WHERE s.id = :id AND s.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $id]);
        $student = $stmt->fetch();

        if (!$student) {
            $this->notFound('Student not found');
            return;
        }

        $this->success($student);
    }

    /**
     * Update student
     * PUT /admin/students/{id}
     */
    public function update(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');
        $data = $this->input();

        // Check if student exists
        $stmt = $this->db->prepare("SELECT id FROM students WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) {
            $this->notFound('Student not found');
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

        $allowedFields = ['first_name', 'last_name', 'gender', 'is_active', 'class_id', 'stream_id'];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $updates[] = "{$field} = :{$field}";
                $params[$field] = $data[$field];
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
     * Delete student (soft delete)
     * DELETE /admin/students/{id}
     */
    public function delete(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        // Check if student exists
        $stmt = $this->db->prepare("SELECT id FROM students WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) {
            $this->notFound('Student not found');
            return;
        }

        // Soft delete student
        $sql = "UPDATE students SET deleted_at = NOW() WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(['id' => $id]);

        if ($result) {
            $this->success([], 'Student deleted successfully');
        } else {
            $this->error('Failed to delete student', 500);
        }
    }

    /**
     * Regenerate student password
     * POST /admin/students/{id}/regenerate-password
     */
    public function regeneratePassword(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        // Check if student exists
        $stmt = $this->db->prepare("SELECT id, admission_number, username FROM students WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        $student = $stmt->fetch();

        if (!$student) {
            $this->notFound('Student not found');
            return;
        }

        // Generate new password (same as admission_number)
        $newPassword = $student['admission_number'];
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

        // Update password
        $sql = "UPDATE students SET password = ?, updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([$hashedPassword, $id]);

        if ($result) {
            $this->success([
                'username' => $student['username'],
                'new_password' => $newPassword
            ], 'Password regenerated successfully');
        } else {
            $this->error('Failed to regenerate password', 500);
        }
    }

    /**
     * Get enrolled students by department and/or academic year
     * GET /admin/students/enrolled
     */
    public function enrolled(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->query('department_id');
        $academicYearId = $this->query('academic_year_id');
        $classId = $this->query('class_id');

        $whereClause = "se.deleted_at IS NULL AND se.status = 'active'";
        $params = [];

        if ($departmentId) {
            $whereClause .= " AND se.department_id = ?";
            $params[] = $departmentId;
        }

        if ($academicYearId) {
            // Get academic year name from ID
            $stmt = $this->db->prepare("SELECT name FROM academic_years WHERE id = ? AND deleted_at IS NULL");
            $stmt->execute([$academicYearId]);
            $academicYear = $stmt->fetch();
            
            if ($academicYear) {
                $whereClause .= " AND se.academic_year = ?";
                $params[] = $academicYear['name'];
            }
        }

        if ($classId) {
            $whereClause .= " AND se.class_id = ?";
            $params[] = $classId;
        }

        try {
            $sql = "SELECT se.id as enrollment_id, s.id as student_id, s.admission_number, s.first_name, s.last_name,
                           se.department_id, se.academic_year, se.enrolled_at, se.class_id,
                           d.name as department_name, c.name as class_name, c.level, c.stream_name
                    FROM student_department_enrollments se
                    INNER JOIN students s ON se.student_id = s.id
                    LEFT JOIN departments d ON se.department_id = d.id
                    LEFT JOIN classes c ON se.class_id = c.id
                    WHERE {$whereClause}
                    ORDER BY s.last_name, s.first_name";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $students = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($students, 'Enrolled students retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch enrolled students: " . $e->getMessage());
            $this->error('Failed to fetch enrolled students: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Enroll students in a department
     * POST /admin/students/enroll
     */
    public function enroll(): void
    {
        error_log("StudentController::enroll - Starting enrollment process");
        
        if (!$this->isAdmin()) {
            error_log("StudentController::enroll - User is not admin");
            $this->forbidden();
            return;
        }

        $data = $this->input();
        error_log("StudentController::enroll - Input data: " . json_encode($data));

        // Validate required fields
        $errors = $this->validateRequired(['department_id', 'academic_year_id', 'class_id', 'student_ids']);
        if (!empty($errors)) {
            error_log("StudentController::enroll - Validation errors: " . json_encode($errors));
            $this->validationError($errors);
            return;
        }

        // Validate department exists
        $stmt = $this->db->prepare("SELECT id FROM departments WHERE id = ?");
        $stmt->execute([$data['department_id']]);
        if (!$stmt->fetch()) {
            error_log("StudentController::enroll - Department not found: " . $data['department_id']);
            $this->validationError(['department_id' => 'Department not found']);
            return;
        }

        // Validate academic year exists and get name
        $stmt = $this->db->prepare("SELECT name FROM academic_years WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$data['academic_year_id']]);
        $academicYear = $stmt->fetch();
        if (!$academicYear) {
            error_log("StudentController::enroll - Academic year not found: " . $data['academic_year_id']);
            $this->validationError(['academic_year_id' => 'Academic year not found']);
            return;
        }

        // Validate class exists
        $stmt = $this->db->prepare("SELECT id FROM classes WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$data['class_id']]);
        if (!$stmt->fetch()) {
            error_log("StudentController::enroll - Class not found: " . $data['class_id']);
            $this->validationError(['class_id' => 'Class not found']);
            return;
        }

        // Validate student_ids is an array
        if (!is_array($data['student_ids']) || empty($data['student_ids'])) {
            error_log("StudentController::enroll - Invalid student_ids");
            $this->validationError(['student_ids' => 'At least one student must be selected']);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Enroll students in department with academic year and class
        $studentIds = $data['student_ids'];
        $departmentId = $data['department_id'];
        $academicYearName = $academicYear['name'];
        $classId = $data['class_id'];

        error_log("StudentController::enroll - Processing " . count($studentIds) . " students for department $departmentId, year $academicYearName, class $classId");

        try {
            $enrolledCount = 0;
            $duplicateCount = 0;

            foreach ($studentIds as $studentId) {
                // Check if student exists
                $stmt = $this->db->prepare("SELECT id FROM students WHERE id = ? AND deleted_at IS NULL");
                $stmt->execute([$studentId]);
                if (!$stmt->fetch()) {
                    error_log("StudentController::enroll - Student not found: $studentId");
                    continue;
                }

                // Check if already actively enrolled in this department for this academic year
                $stmt = $this->db->prepare("SELECT id FROM student_department_enrollments WHERE student_id = ? AND department_id = ? AND academic_year = ? AND status = 'active' AND deleted_at IS NULL");
                $stmt->execute([$studentId, $departmentId, $academicYearName]);
                if ($stmt->fetch()) {
                    error_log("StudentController::enroll - Student $studentId already enrolled");
                    $duplicateCount++;
                    continue;
                }

                // Insert enrollment with class_id using INSERT IGNORE to handle race conditions
                $sql = "INSERT IGNORE INTO student_department_enrollments (student_id, department_id, academic_year, class_id, start_date, status) VALUES (?, ?, ?, ?, CURDATE(), 'active')";
                $stmt = $this->db->prepare($sql);
                $result = $stmt->execute([$studentId, $departmentId, $academicYearName, $classId]);
                
                if ($result) {
                    $affectedRows = $stmt->rowCount();
                    if ($affectedRows > 0) {
                        error_log("StudentController::enroll - Successfully enrolled student $studentId");
                        $enrolledCount++;
                    } else {
                        error_log("StudentController::enroll - Student $studentId was a duplicate (INSERT IGNORE)");
                        $duplicateCount++;
                    }
                } else {
                    error_log("StudentController::enroll - Failed to enroll student $studentId");
                }
            }

            error_log("StudentController::enroll - Completed: enrolled=$enrolledCount, duplicates=$duplicateCount");

            $message = "Successfully enrolled {$enrolledCount} students in the department for academic year {$academicYearName}";
            if ($duplicateCount > 0) {
                $message .= " ({$duplicateCount} students were already enrolled)";
            }

            $this->success([
                'enrolled_count' => $enrolledCount,
                'duplicate_count' => $duplicateCount
            ], $message);
        } catch (\PDOException $e) {
            error_log("Student enrollment failed: " . $e->getMessage());
            error_log("Stack trace: " . $e->getTraceAsString());
            $this->error('Failed to enroll students: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Enroll students in every compulsory department for their class's level in one go:
     * O Level (S.1-S.4) -> MTC, BIO, CHEM, PHY, HIST, GEOG, ENG.
     * A Level (S.5-S.6) -> GP only.
     * POST /admin/students/enroll-all-departments
     */
    public function enrollAllDepartments(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();

        $errors = $this->validateRequired(['academic_year_id', 'class_id', 'student_ids']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $stmt = $this->db->prepare("SELECT name FROM academic_years WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$data['academic_year_id']]);
        $academicYear = $stmt->fetch();
        if (!$academicYear) {
            $this->validationError(['academic_year_id' => 'Academic year not found']);
            return;
        }

        $stmt = $this->db->prepare("SELECT id, level FROM classes WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$data['class_id']]);
        $class = $stmt->fetch();
        if (!$class) {
            $this->validationError(['class_id' => 'Class not found']);
            return;
        }

        if (!is_array($data['student_ids']) || empty($data['student_ids'])) {
            $this->validationError(['student_ids' => 'At least one student must be selected']);
            return;
        }

        $data = $this->sanitize($data);

        $compulsoryDepartmentNames = $class['level'] === 'A Level'
            ? ['GP']
            : ['MTC', 'BIO', 'CHEM', 'PHY', 'HIST', 'GEOG', 'ENG'];

        $placeholders = implode(',', array_fill(0, count($compulsoryDepartmentNames), '?'));
        $stmt = $this->db->prepare("SELECT id, name FROM departments WHERE name IN ({$placeholders}) AND deleted_at IS NULL");
        $stmt->execute($compulsoryDepartmentNames);
        $departments = $stmt->fetchAll();

        $foundNames = array_column($departments, 'name');
        $missingNames = array_diff($compulsoryDepartmentNames, $foundNames);
        if (!empty($missingNames)) {
            $this->error('Missing compulsory department(s): ' . implode(', ', $missingNames), 500);
            return;
        }

        $studentIds = $data['student_ids'];
        $academicYearName = $academicYear['name'];
        $classId = $data['class_id'];

        try {
            $enrolledCount = 0;
            $duplicateCount = 0;

            foreach ($studentIds as $studentId) {
                $stmt = $this->db->prepare("SELECT id FROM students WHERE id = ? AND deleted_at IS NULL");
                $stmt->execute([$studentId]);
                if (!$stmt->fetch()) {
                    continue;
                }

                foreach ($departments as $department) {
                    $stmt = $this->db->prepare("SELECT id FROM student_department_enrollments WHERE student_id = ? AND department_id = ? AND academic_year = ? AND status = 'active' AND deleted_at IS NULL");
                    $stmt->execute([$studentId, $department['id'], $academicYearName]);
                    if ($stmt->fetch()) {
                        $duplicateCount++;
                        continue;
                    }

                    $sql = "INSERT IGNORE INTO student_department_enrollments (student_id, department_id, academic_year, class_id, start_date, status) VALUES (?, ?, ?, ?, CURDATE(), 'active')";
                    $stmt = $this->db->prepare($sql);
                    $stmt->execute([$studentId, $department['id'], $academicYearName, $classId]);

                    if ($stmt->rowCount() > 0) {
                        $enrolledCount++;
                    } else {
                        $duplicateCount++;
                    }
                }
            }

            $message = "Successfully created {$enrolledCount} enrollments across " . count($departments) . " compulsory department(s)";
            if ($duplicateCount > 0) {
                $message .= " ({$duplicateCount} already existed)";
            }

            $this->success([
                'enrolled_count' => $enrolledCount,
                'duplicate_count' => $duplicateCount,
                'departments' => $foundNames,
            ], $message);
        } catch (\PDOException $e) {
            error_log('Bulk department enrollment failed: ' . $e->getMessage());
            $this->error('Failed to enroll students: ' . $e->getMessage(), 500);
        }
    }

    /**
     * De-enroll students from department
     * POST /admin/students/deenroll
     */
    public function deenroll(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();

        // Validate required fields
        $errors = $this->validateRequired(['student_ids']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Validate student_ids is an array
        if (!is_array($data['student_ids']) || empty($data['student_ids'])) {
            $this->validationError(['student_ids' => 'At least one student must be selected']);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // De-enroll students from department
        $studentIds = $data['student_ids'];
        $departmentId = $data['department_id'] ?? null;
        $academicYearId = $data['academic_year_id'] ?? null;

        try {
            $placeholders = str_repeat('?,', count($studentIds) - 1) . '?';
            $params = $studentIds;

            // Close only the specific department+year enrollment the admin is looking at when
            // given - without this, de-enrolling a student from one department (e.g. via the
            // de-enroll list, which is already scoped to one department+year in the UI) would
            // silently close every other department's enrollment for that student too.
            $whereExtra = '';
            if ($departmentId !== null) {
                $whereExtra .= ' AND department_id = ?';
                $params[] = $departmentId;
            }
            if ($academicYearId !== null) {
                $stmt = $this->db->prepare("SELECT name FROM academic_years WHERE id = ? AND deleted_at IS NULL");
                $stmt->execute([$academicYearId]);
                $academicYear = $stmt->fetch();
                if ($academicYear) {
                    $whereExtra .= ' AND academic_year = ?';
                    $params[] = $academicYear['name'];
                }
            }

            // Capture which (student, department) pairs are about to be closed, for the audit
            // trail - the UPDATE below doesn't tell us which rows it actually touched.
            $selectSql = "SELECT student_id, department_id FROM student_department_enrollments
                          WHERE student_id IN ({$placeholders}) AND status = 'active'{$whereExtra}";
            $selectStmt = $this->db->prepare($selectSql);
            $selectStmt->execute($params);
            $affected = $selectStmt->fetchAll();

            $sql = "UPDATE student_department_enrollments
                    SET status = 'withdrawn', end_date = CURDATE(), updated_at = NOW()
                    WHERE student_id IN ({$placeholders}) AND status = 'active'{$whereExtra}";
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);

            $affectedRows = $stmt->rowCount();

            $performedBy = $this->getCurrentUserId();
            foreach ($affected as $row) {
                $this->logEnrollmentAudit((int) $row['student_id'], 'department_de_enroll', null, (int) $row['department_id'], (int) $performedBy, 'admin', $data['reason'] ?? null);
            }

            $this->success([
                'deenrolled_count' => $affectedRows
            ], "Successfully de-enrolled {$affectedRows} students from their departments");
        } catch (\PDOException $e) {
            error_log("Student de-enrollment failed: " . $e->getMessage());
            $this->error('Failed to de-enroll students: ' . $e->getMessage(), 500);
        }
    }

    /**
     * De-enroll a single enrollment by enrollment ID
     * POST /admin/students/deenroll-single
     */
    public function deenrollSingle(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();

        // Validate required fields
        $errors = $this->validateRequired(['enrollment_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        $enrollmentId = $data['enrollment_id'];

        try {
            $lookupStmt = $this->db->prepare("SELECT student_id, department_id FROM student_department_enrollments WHERE id = ? AND status = 'active'");
            $lookupStmt->execute([$enrollmentId]);
            $enrollment = $lookupStmt->fetch();

            $sql = "UPDATE student_department_enrollments
                    SET status = 'withdrawn', end_date = CURDATE(), updated_at = NOW()
                    WHERE id = ? AND status = 'active'";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$enrollmentId]);

            $affectedRows = $stmt->rowCount();

            if ($affectedRows > 0) {
                if ($enrollment) {
                    $this->logEnrollmentAudit((int) $enrollment['student_id'], 'department_de_enroll', null, (int) $enrollment['department_id'], (int) $this->getCurrentUserId(), 'admin', $data['reason'] ?? null);
                }
                $this->success([], 'Student de-enrolled successfully');
            } else {
                $this->error('Enrollment not found', 404);
            }
        } catch (\PDOException $e) {
            error_log("Student de-enrollment failed: " . $e->getMessage());
            $this->error('Failed to de-enroll student: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get enrollment analytics
     * GET /admin/students/analytics
     */
    public function analytics(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        try {
            // Total enrollments (active only - promoted/withdrawn history shouldn't inflate this)
            $stmt = $this->db->prepare("SELECT COUNT(*) as total FROM student_department_enrollments WHERE deleted_at IS NULL AND status = 'active'");
            $stmt->execute();
            $totalEnrollments = $stmt->fetch()['total'];

            // Enrollments by department
            $stmt = $this->db->prepare("
                SELECT d.name as department, COUNT(se.id) as count
                FROM student_department_enrollments se
                INNER JOIN departments d ON se.department_id = d.id
                WHERE se.deleted_at IS NULL AND se.status = 'active'
                GROUP BY d.id, d.name
                ORDER BY count DESC
            ");
            $stmt->execute();
            $enrollmentsByDepartment = $stmt->fetchAll();

            // Enrollments by academic year
            $stmt = $this->db->prepare("
                SELECT academic_year, COUNT(*) as count
                FROM student_department_enrollments
                WHERE deleted_at IS NULL AND status = 'active'
                GROUP BY academic_year
                ORDER BY academic_year DESC
            ");
            $stmt->execute();
            $enrollmentsByYear = $stmt->fetchAll();

            // Enrollments by class-stream (one bar per actual class-stream, e.g. "S.1 A"/"S.1 B",
            // not collapsed to just the class name - ordered so streams of the same class group
            // together in the chart instead of being scattered by count).
            $stmt = $this->db->prepare("
                SELECT c.name as class_name, c.level, c.stream_name, COUNT(se.id) as count
                FROM student_department_enrollments se
                INNER JOIN classes c ON se.class_id = c.id
                WHERE se.deleted_at IS NULL AND se.status = 'active'
                GROUP BY c.id, c.name, c.level, c.stream_name
                ORDER BY c.name ASC, c.stream_name ASC
            ");
            $stmt->execute();
            $enrollmentsByClass = $stmt->fetchAll();

            // Recent enrollments (last 7 days)
            $stmt = $this->db->prepare("
                SELECT COUNT(*) as count
                FROM student_department_enrollments
                WHERE deleted_at IS NULL AND status = 'active' AND enrolled_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            ");
            $stmt->execute();
            $recentEnrollments = $stmt->fetch()['count'];

            $this->success([
                'total_enrollments' => $totalEnrollments,
                'recent_enrollments' => $recentEnrollments,
                'by_department' => $enrollmentsByDepartment,
                'by_academic_year' => $enrollmentsByYear,
                'by_class' => $enrollmentsByClass
            ], 'Enrollment analytics retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch enrollment analytics: " . $e->getMessage());
            $this->error('Failed to fetch enrollment analytics: ' . $e->getMessage(), 500);
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
