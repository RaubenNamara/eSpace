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
        $teacherId = $this->resolveActiveTeacherId();

        // Build WHERE conditions - status='active' (not just deleted_at) so a department-level
        // withdrawal (HOD/admin de-enroll) also drops the student here, and the NOT EXISTS
        // clause hides a student this specific teacher has personally de-enrolled (see
        // student_teacher_enrollments) without affecting other teachers in the department.
        $where = [
            'se.deleted_at IS NULL',
            "se.status = 'active'",
            'se.department_id = :department_id',
            'NOT EXISTS (SELECT 1 FROM student_teacher_enrollments ste WHERE ste.student_id = se.student_id AND ste.teacher_id = :teacher_id AND ste.department_id = se.department_id AND ste.status = \'withdrawn\')',
        ];
        $params = ['department_id' => $departmentId, 'teacher_id' => $teacherId];

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
                AND se.deleted_at IS NULL
                AND se.status = 'active'
                AND NOT EXISTS (
                    SELECT 1 FROM student_teacher_enrollments ste
                    WHERE ste.student_id = se.student_id AND ste.teacher_id = :teacher_id
                      AND ste.department_id = se.department_id AND ste.status = 'withdrawn'
                )";

        $stmt = $db->prepare($sql);
        $stmt->execute(['enrollment_id' => $enrollmentId, 'department_id' => $departmentId, 'teacher_id' => $this->resolveActiveTeacherId()]);
        $student = $stmt->fetch();

        if (!$student) {
            $this->notFound('Student enrollment not found in your department');
            return;
        }

        $this->success($student);
    }

    /**
     * De-enroll a student from THIS teacher only (not the department - see
     * student_teacher_enrollments). The student stays fully visible to every other teacher in
     * the department, the HOD, and admin; they just lose access to this teacher's own content
     * (assignments, eNotes, eLibrary, item bank, videos, live classes, virtual lab).
     * DELETE /teacher/students/{id}
     * Body (optional): { reason: string }
     */
    public function delete(): void
    {
        $id = $this->routeParam('id');

        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();

        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $teacherId = $this->resolveActiveTeacherId();
        $enrollmentId = (int) $id;
        $db = $this->getDb();

        // Confirm this student is actually in the teacher's own department roster (and not
        // already de-enrolled from this teacher specifically) before allowing the action.
        $stmt = $db->prepare(
            "SELECT se.student_id FROM student_department_enrollments se
             WHERE se.id = :enrollment_id AND se.department_id = :department_id
               AND se.deleted_at IS NULL AND se.status = 'active'
               AND NOT EXISTS (
                   SELECT 1 FROM student_teacher_enrollments ste
                   WHERE ste.student_id = se.student_id AND ste.teacher_id = :teacher_id
                     AND ste.department_id = se.department_id AND ste.status = 'withdrawn'
               )"
        );
        $stmt->execute(['enrollment_id' => $enrollmentId, 'department_id' => $departmentId, 'teacher_id' => $teacherId]);
        $enrollment = $stmt->fetch();

        if (!$enrollment) {
            $this->notFound('Student enrollment not found in your department');
            return;
        }

        $studentId = (int) $enrollment['student_id'];
        $data = $this->input();
        $reason = !empty($data['reason']) ? (string) $data['reason'] : null;

        $upsert = $db->prepare(
            "INSERT INTO student_teacher_enrollments (student_id, teacher_id, department_id, status, de_enrolled_at, de_enrolled_by, de_enrolled_by_role, reason, created_at, updated_at)
             VALUES (:student_id, :teacher_id, :department_id, 'withdrawn', NOW(), :performed_by, 'teacher', :reason, NOW(), NOW())
             ON DUPLICATE KEY UPDATE status = 'withdrawn', de_enrolled_at = NOW(), de_enrolled_by = :performed_by2, de_enrolled_by_role = 'teacher', reason = :reason2, updated_at = NOW()"
        );
        $result = $upsert->execute([
            'student_id' => $studentId,
            'teacher_id' => $teacherId,
            'department_id' => $departmentId,
            'performed_by' => $teacherId,
            'reason' => $reason,
            'performed_by2' => $teacherId,
            'reason2' => $reason,
        ]);

        if ($result) {
            $this->logEnrollmentAudit($studentId, 'teacher_de_enroll', $teacherId, $departmentId, $teacherId, 'teacher', $reason);
            $this->success([], 'Student de-enrolled successfully from your account');
        } else {
            $this->error('Failed to de-enroll student', 500);
        }
    }

    /**
     * Re-enroll a student who was previously de-enrolled from this teacher specifically.
     * PUT /teacher/students/{id}/re-enroll
     */
    public function reEnroll(): void
    {
        $id = $this->routeParam('id');

        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $teacherId = $this->resolveActiveTeacherId();
        $studentId = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare(
            "UPDATE student_teacher_enrollments SET status = 'active', enrolled_at = NOW(), updated_at = NOW()
             WHERE student_id = :student_id AND teacher_id = :teacher_id AND department_id = :department_id AND status = 'withdrawn'"
        );
        $result = $stmt->execute(['student_id' => $studentId, 'teacher_id' => $teacherId, 'department_id' => $departmentId]);

        if ($result && $stmt->rowCount() > 0) {
            $this->logEnrollmentAudit($studentId, 'teacher_re_enroll', $teacherId, $departmentId, $teacherId, 'teacher', null);
            $this->success([], 'Student re-enrolled successfully');
        } else {
            $this->notFound('No de-enrollment found for this student with you');
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
        $teacherId = $this->resolveActiveTeacherId();

        error_log("Teacher enrolled: Filters - academic_year: " . ($academicYear ?? 'none') . ", class_name: " . ($className ?? 'none') . ", stream_name: " . ($streamName ?? 'none'));

        $whereClause = "se.deleted_at IS NULL AND se.status = 'active' AND se.department_id = :department_id
            AND NOT EXISTS (
                SELECT 1 FROM student_teacher_enrollments ste
                WHERE ste.student_id = se.student_id AND ste.teacher_id = :teacher_id
                  AND ste.department_id = se.department_id AND ste.status = 'withdrawn'
            )";
        $params = ['department_id' => $departmentId, 'teacher_id' => $teacherId];

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
                      AND se.status = 'active'
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
                       AND se.status = 'active'
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
                            AND status = 'active'
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
