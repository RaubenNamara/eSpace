<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\Department;

/**
 * Department Controller
 * 
 * Handles department CRUD operations for admin users.
 */

class DepartmentController extends Controller
{
    private Department $departmentModel;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->departmentModel = new Department();
    }

    /**
     * Get all departments
     * GET /admin/departments
     */
    public function index(): void
    {
        // Check authentication
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        // Check role (admin or super_admin only)
        if (!$this->hasAnyRole(['admin', 'super_admin'])) {
            $this->forbidden();
            return;
        }

        try {
            $departments = $this->departmentModel->all([], ['created_at' => 'DESC']);

            // Who and what each department has - teachers (primary or by membership), subjects
            // and its head - so the list can show where a department stands at a glance.
            $db = \eSpace\Config\Database::getInstance();
            $counts = $db->query(
                "SELECT d.id,
                        (SELECT COUNT(DISTINCT t.id) FROM teachers t
                          WHERE t.deleted_at IS NULL
                            AND (t.department_id = d.id OR EXISTS (
                                SELECT 1 FROM teacher_department_assignments tda
                                 WHERE tda.teacher_id = t.id AND tda.department_id = d.id AND tda.deleted_at IS NULL))) AS teachers_count,
                        (SELECT COUNT(*) FROM subjects s WHERE s.department_id = d.id AND s.deleted_at IS NULL) AS subjects_count,
                        (SELECT CONCAT(h.first_name, ' ', h.last_name) FROM hods h
                          WHERE h.deleted_at IS NULL AND COALESCE(h.department_id_active, h.department_id) = d.id
                          ORDER BY h.id LIMIT 1) AS hod_name
                   FROM departments d WHERE d.deleted_at IS NULL"
            )->fetchAll(\PDO::FETCH_ASSOC);
            $byId = array_column($counts, null, 'id');
            foreach ($departments as &$department) {
                $row = $byId[$department['id']] ?? null;
                $department['teachers_count'] = (int) ($row['teachers_count'] ?? 0);
                $department['subjects_count'] = (int) ($row['subjects_count'] ?? 0);
                $department['hod_name'] = $row['hod_name'] ?? null;
            }
            unset($department);

            $this->success($departments, 'Departments retrieved successfully');
        } catch (\Exception $e) {
            error_log("DepartmentController::index - Error: " . $e->getMessage());
            $this->serverError('Failed to retrieve departments');
        }
    }

    /**
     * Create new department
     * POST /admin/departments
     */
    public function store(): void
    {
        // Check authentication
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        // Check role (admin or super_admin only)
        if (!$this->hasAnyRole(['admin', 'super_admin'])) {
            $this->forbidden();
            return;
        }

        // Validate required fields
        $errors = $this->validateRequired(['name', 'code']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        try {
            $id = $this->departmentModel->create($data);

            if ($id) {
                $department = $this->departmentModel->find($id);
                $this->success($department, 'Department created successfully');
            } else {
                $this->error('Failed to create department', 500);
            }
        } catch (\Exception $e) {
            error_log("DepartmentController::store - Error: " . $e->getMessage());
            $this->error('Failed to create department', 500);
        }
    }

    /**
     * Update department
     * PUT /admin/departments/{id}
     */
    public function update($id): void
    {
        
        // Convert to integer
        $id = (int) $id;
        
        // Check authentication
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        // Check role (admin or super_admin only)
        if (!$this->hasAnyRole(['admin', 'super_admin'])) {
            $this->forbidden();
            return;
        }

        // Check if department exists
        $department = $this->departmentModel->find($id);

        if (!$department) {
            $this->notFound('Department not found');
            return;
        }

        // Validate required fields
        $errors = $this->validateRequired(['name', 'code']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        try {
            $success = $this->departmentModel->update($id, $data);

            if ($success) {
                $updatedDepartment = $this->departmentModel->find($id);
                $this->success($updatedDepartment, 'Department updated successfully');
            } else {
                $this->error('Failed to update department', 500);
            }
        } catch (\Exception $e) {
            error_log("DepartmentController::update - Error: " . $e->getMessage());
            $this->error('Failed to update department', 500);
        }
    }

    /**
     * Delete department
     * DELETE /admin/departments/{id}
     */
    public function destroy($id): void
    {
        
        // Convert to integer
        $id = (int) $id;
        
        // Check authentication
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        // Check role (admin or super_admin only)
        if (!$this->hasAnyRole(['admin', 'super_admin'])) {
            $this->forbidden();
            return;
        }

        // Check if department exists
        $department = $this->departmentModel->find($id);

        if (!$department) {
            $this->notFound('Department not found');
            return;
        }

        try {
            $success = $this->departmentModel->delete($id);

            if ($success) {
                $this->success([], 'Department deleted successfully');
            } else {
                $this->error('Failed to delete department', 500);
            }
        } catch (\Exception $e) {
            error_log("DepartmentController::destroy - Error: " . $e->getMessage());
            $this->error('Failed to delete department', 500);
        }
    }
}
