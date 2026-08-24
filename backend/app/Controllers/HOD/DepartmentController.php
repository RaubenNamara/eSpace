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

        // Get pending approvals (library books, notes, item bank questions)
        $pendingLibraryStmt = $db->prepare("SELECT COUNT(*) as count FROM library_books WHERE department_id = :department_id AND is_approved = 0");
        $pendingLibraryStmt->execute(['department_id' => $departmentId]);
        $pendingLibrary = $pendingLibraryStmt->fetch()['count'];

        // notes has no department_id column - it's scoped via subject_id instead
        $pendingNotesStmt = $db->prepare(
            "SELECT COUNT(*) as count FROM notes
             WHERE is_approved = 0 AND subject_id IN (SELECT id FROM subjects WHERE department_id = :department_id)"
        );
        $pendingNotesStmt->execute(['department_id' => $departmentId]);
        $pendingNotes = $pendingNotesStmt->fetch()['count'];

        $pendingItemBankStmt = $db->prepare("SELECT COUNT(*) as count FROM item_bank_questions WHERE department_id = :department_id AND is_approved = 0");
        $pendingItemBankStmt->execute(['department_id' => $departmentId]);
        $pendingItemBank = $pendingItemBankStmt->fetch()['count'];

        $totalPending = $pendingLibrary + $pendingNotes + $pendingItemBank;

        $this->success([
            'teachers_count' => (int) $teacherCount,
            'subjects_count' => (int) $subjectCount,
            'students_count' => (int) $studentCount,
            'pending_approvals' => (int) $totalPending,
            'pending_library' => (int) $pendingLibrary,
            'pending_notes' => (int) $pendingNotes,
            'pending_item_bank' => (int) $pendingItemBank
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

    /**
     * Get pending approvals
     * GET /hod/department/approvals
     */
    public function getApprovals(): void
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
        $type = $this->input('type', 'all');

        $approvals = [];

        if ($type === 'all' || $type === 'library') {
            $librarySql = "SELECT id, title, author, file_type, uploaded_by as created_by, created_at, 'library' as type
                          FROM library_books
                          WHERE department_id = :department_id AND is_approved = 0
                          ORDER BY created_at DESC";
            $stmt = $db->prepare($librarySql);
            $stmt->execute(['department_id' => $departmentId]);
            $approvals = array_merge($approvals, $stmt->fetchAll());
        }

        if ($type === 'all' || $type === 'notes') {
            // notes has no department_id column - it's scoped via subject_id instead
            $notesSql = "SELECT id, title, subject_id, created_by, created_at, 'notes' as type
                        FROM notes
                        WHERE is_approved = 0 AND subject_id IN (SELECT id FROM subjects WHERE department_id = :department_id)
                        ORDER BY created_at DESC";
            $stmt = $db->prepare($notesSql);
            $stmt->execute(['department_id' => $departmentId]);
            $approvals = array_merge($approvals, $stmt->fetchAll());
        }

        if ($type === 'all' || $type === 'item_bank') {
            $itemBankSql = "SELECT id, question_text, question_type, difficulty, subject_id, created_by, created_at, 'item_bank' as type
                           FROM item_bank_questions
                           WHERE department_id = :department_id AND is_approved = 0
                           ORDER BY created_at DESC";
            $stmt = $db->prepare($itemBankSql);
            $stmt->execute(['department_id' => $departmentId]);
            $approvals = array_merge($approvals, $stmt->fetchAll());
        }

        $this->success(['approvals' => $approvals]);
    }

    /**
     * Approve content
     * POST /hod/department/approve
     */
    public function approveContent(): void
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

        $data = $this->input();
        
        if (!isset($data['type']) || !isset($data['id'])) {
            $this->validationError(['type' => 'Type is required', 'id' => 'ID is required']);
            return;
        }

        $db = $this->getDb();
        $hodId = $this->getCurrentUserId();

        try {
            $db->beginTransaction();

            switch ($data['type']) {
                case 'library':
                    $sql = "UPDATE library_books SET is_approved = 1, approved_by = :approved_by, approved_at = NOW() 
                           WHERE id = :id AND department_id = :department_id";
                    break;
                case 'notes':
                    // notes has no department_id column - it's scoped via subject_id instead
                    $sql = "UPDATE notes SET is_approved = 1, approved_by = :approved_by, approved_at = NOW()
                           WHERE id = :id AND subject_id IN (SELECT id FROM subjects WHERE department_id = :department_id)";
                    break;
                case 'item_bank':
                    $sql = "UPDATE item_bank_questions SET is_approved = 1, approved_by = :approved_by, approved_at = NOW() 
                           WHERE id = :id AND department_id = :department_id";
                    break;
                default:
                    $db->rollBack();
                    $this->validationError(['type' => 'Invalid type']);
                    return;
            }

            $stmt = $db->prepare($sql);
            $result = $stmt->execute([
                'id' => $data['id'],
                'department_id' => $departmentId,
                'approved_by' => $hodId
            ]);

            if ($result) {
                $db->commit();
                $this->success([], 'Content approved successfully');

                // Log the action
                $this->auditLog->logAction(
                    $hodId,
                    'hod',
                    'content_approved',
                    $data['type'],
                    $data['id'],
                    $data['id'],
                    json_encode(['is_approved' => 0]),
                    json_encode(['is_approved' => 1])
                );
            } else {
                $db->rollBack();
                $this->error('Failed to approve content', 500);
            }
        } catch (\Exception $e) {
            $db->rollBack();
            $this->error('Failed to approve content: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Reject content
     * POST /hod/department/reject
     */
    public function rejectContent(): void
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

        $data = $this->input();
        
        if (!isset($data['type']) || !isset($data['id'])) {
            $this->validationError(['type' => 'Type is required', 'id' => 'ID is required']);
            return;
        }

        $db = $this->getDb();
        $hodId = $this->getCurrentUserId();

        try {
            $db->beginTransaction();

            switch ($data['type']) {
                case 'library':
                    $sql = "DELETE FROM library_books WHERE id = :id AND department_id = :department_id";
                    break;
                case 'notes':
                    // notes has no department_id column - it's scoped via subject_id instead
                    $sql = "DELETE FROM notes WHERE id = :id AND subject_id IN (SELECT id FROM subjects WHERE department_id = :department_id)";
                    break;
                case 'item_bank':
                    $sql = "DELETE FROM item_bank_questions WHERE id = :id AND department_id = :department_id";
                    break;
                default:
                    $db->rollBack();
                    $this->validationError(['type' => 'Invalid type']);
                    return;
            }

            $stmt = $db->prepare($sql);
            $result = $stmt->execute([
                'id' => $data['id'],
                'department_id' => $departmentId
            ]);

            if ($result) {
                $db->commit();
                $this->success([], 'Content rejected and deleted successfully');

                // Log the action
                $this->auditLog->logAction(
                    $hodId,
                    'hod',
                    'content_rejected',
                    $data['type'],
                    $data['id'],
                    $data['id'],
                    null,
                    json_encode(['deleted' => true])
                );
            } else {
                $db->rollBack();
                $this->error('Failed to reject content', 500);
            }
        } catch (\Exception $e) {
            $db->rollBack();
            $this->error('Failed to reject content: ' . $e->getMessage(), 500);
        }
    }
}
