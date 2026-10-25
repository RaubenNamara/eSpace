<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\AuditLog;

/**
 * HOD Department Controller
 * 
 * Handles department management operations for Heads of Department.
 * HODs can only manage their assigned department.
 */
class DepartmentController extends Controller
{
    private AuditLog $auditLog;

    public function __construct()
    {
        parent::__construct();
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
     * Get HOD's department ID
     */
    private function getHODDepartmentId(): ?int
    {
        $userId = $this->getCurrentUserId();
        if (!$userId) return null;

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $userId]);
        $hod = $stmt->fetch();
        
        return $hod ? (int) $hod['department_id'] : null;
    }

    /**
     * Check if current user is HOD
     */
    private function isHOD(): bool
    {
        return $this->getCurrentUserRole() === 'hod';
    }

    /**
     * Get department information
     * GET /hod/department/info
     */
    public function getDepartmentInfo(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found', 404);
            return;
        }

        $db = $this->getDb();
        
        $sql = "SELECT id, name, code, description FROM departments WHERE id = :department_id";
        $stmt = $db->prepare($sql);
        $stmt->execute(['department_id' => $departmentId]);
        $department = $stmt->fetch();

        if (!$department) {
            $this->error('Department not found', 404);
            return;
        }

        $this->success($department);
    }

    /**
     * Get department statistics
     * GET /hod/department/stats
     */
    public function getStats(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found', 404);
            return;
        }

        $db = $this->getDb();

        // Get department teachers count (any teacher who belongs to this department, not just
        // those with it as their primary - see teacher_department_assignments)
        $teacherStmt = $db->prepare("SELECT COUNT(*) as count FROM teachers t WHERE t.deleted_at IS NULL AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)");
        $teacherStmt->execute(['department_id' => $departmentId]);
        $teacherCount = $teacherStmt->fetch()['count'];

        // Get department subjects count
        $subjectStmt = $db->prepare("SELECT COUNT(*) as count FROM subjects WHERE department_id = :department_id");
        $subjectStmt->execute(['department_id' => $departmentId]);
        $subjectCount = $subjectStmt->fetch()['count'];

        // Get department students count (active enrollments only)
        $studentStmt = $db->prepare(
            "SELECT COUNT(DISTINCT student_id) as count FROM student_department_enrollments
             WHERE department_id = :department_id AND status = 'active' AND deleted_at IS NULL"
        );
        $studentStmt->execute(['department_id' => $departmentId]);
        $studentCount = $studentStmt->fetch()['count'];

        $this->success([
            'teachers_count' => (int) $teacherCount,
            'subjects_count' => (int) $subjectCount,
            'students_count' => (int) $studentCount
        ]);
    }

    /**
     * Get department teachers
     * GET /hod/department/teachers
     */
    public function getTeachers(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found', 404);
            return;
        }

        $search = $this->input('search', '');
        $page = (int) $this->input('page', 1);
        $limit = (int) $this->input('limit', 20);

        $db = $this->getDb();

        // Build query - any teacher who belongs to this department, not just those with it as
        // their primary (see teacher_department_assignments)
        $where = ['deleted_at IS NULL', 'EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = teachers.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)'];
        $params = ['department_id' => $departmentId];

        if (!empty($search)) {
            $where[] = '(username LIKE :search OR email LIKE :search OR first_name LIKE :search OR last_name LIKE :search OR employee_number LIKE :search)';
            $params['search'] = "%{$search}%";
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
     * Get department subjects
     * GET /hod/department/subjects
     */
    public function getSubjects(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found', 404);
            return;
        }

        $db = $this->getDb();
        
        $sql = "SELECT id, name, code, description, created_at
                FROM subjects
                WHERE department_id = :department_id
                ORDER BY name ASC";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['department_id' => $departmentId]);
        $subjects = $stmt->fetchAll();

        $this->success(['subjects' => $subjects]);
    }
}
