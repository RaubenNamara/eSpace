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
        error_log("DepartmentController::update called with id: " . $id);
        
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
        error_log("DepartmentController::destroy called with id: " . $id);
        
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
