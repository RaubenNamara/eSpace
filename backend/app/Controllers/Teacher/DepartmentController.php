<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Teacher Department Controller
 *
 * Lets a teacher who belongs to more than one department (see
 * teacher_department_assignments, and Controller::syncTeacherPrimaryDepartment() on the admin
 * side) switch which one is "active" for their current login session, without changing their
 * admin-set primary department (teachers.department_id).
 */
class DepartmentController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * List the current teacher's department memberships, and which one is active this session.
     * GET /teacher/departments
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->resolveActiveTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT d.id, d.name, d.code, tda.is_primary
             FROM teacher_department_assignments tda
             JOIN departments d ON d.id = tda.department_id
             WHERE tda.teacher_id = :teacher_id AND tda.deleted_at IS NULL
             ORDER BY tda.is_primary DESC, d.name ASC"
        );
        $stmt->execute(['teacher_id' => $teacherId]);
        $departments = $stmt->fetchAll();

        foreach ($departments as &$department) {
            $department['id'] = (int) $department['id'];
            $department['is_primary'] = (bool) $department['is_primary'];
        }
        unset($department);

        $this->success([
            'departments' => $departments,
            'active_department_id' => $this->getActiveDepartmentId(),
        ]);
    }

    /**
     * Switch the active department for the current session.
     * PUT /teacher/departments/active
     * Body: { department_id: number }
     */
    public function setActive(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->resolveActiveTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $data = $this->input();
        if (empty($data['department_id'])) {
            $this->validationError(['department_id' => 'Department is required']);
            return;
        }

        $departmentId = (int) $data['department_id'];

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT 1 FROM teacher_department_assignments
             WHERE teacher_id = :teacher_id AND department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['teacher_id' => $teacherId, 'department_id' => $departmentId]);

        if (!$stmt->fetch()) {
            $this->error('You do not belong to that department', 403);
            return;
        }

        $_SESSION['active_department_id'] = $departmentId;

        $this->success(['active_department_id' => $departmentId], 'Active department switched');
    }
}
