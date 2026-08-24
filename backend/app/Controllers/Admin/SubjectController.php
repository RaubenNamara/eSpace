<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\Subject;

/**
 * Subject Controller
 * 
 * Handles subject CRUD operations for admin users.
 */

class SubjectController extends Controller
{
    private Subject $subjectModel;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->subjectModel = new Subject();
    }

    /**
     * Get all subjects
     * GET /admin/subjects
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
            $subjects = $this->subjectModel->all([], ['created_at' => 'DESC']);
            $this->success($subjects, 'Subjects retrieved successfully');
        } catch (\Exception $e) {
            error_log("SubjectController::index - Error: " . $e->getMessage());
            $this->serverError('Failed to retrieve subjects');
        }
    }

    /**
     * Create new subject
     * POST /admin/subjects
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
        $errors = $this->validateRequired(['name']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        // Generate code if not provided
        if (empty($data['code'])) {
            $data['code'] = 'SUB' . strtoupper(substr(md5(uniqid()), 0, 6));
        }

        // Handle department_id - allow null
        if (isset($data['department_id']) && empty($data['department_id'])) {
            unset($data['department_id']);
        }

        try {
            $id = $this->subjectModel->create($data);

            if ($id) {
                $subject = $this->subjectModel->find($id);
                $this->success($subject, 'Subject created successfully');
            } else {
                $this->error('Failed to create subject', 500);
            }
        } catch (\Exception $e) {
            error_log("SubjectController::store - Error: " . $e->getMessage());
            $this->error('Failed to create subject', 500);
        }
    }

    /**
     * Update subject
     * PUT /admin/subjects/{id}
     */
    public function update($id): void
    {
        error_log("SubjectController::update called with id: " . $id);
        
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

        // Check if subject exists
        $subject = $this->subjectModel->find($id);

        if (!$subject) {
            $this->notFound('Subject not found');
            return;
        }

        // Validate required fields
        $errors = $this->validateRequired(['name']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        // Handle department_id - allow null
        if (isset($data['department_id']) && empty($data['department_id'])) {
            $data['department_id'] = null;
        }

        try {
            $success = $this->subjectModel->update($id, $data);

            if ($success) {
                $updatedSubject = $this->subjectModel->find($id);
                $this->success($updatedSubject, 'Subject updated successfully');
            } else {
                $this->error('Failed to update subject', 500);
            }
        } catch (\Exception $e) {
            error_log("SubjectController::update - Error: " . $e->getMessage());
            $this->error('Failed to update subject', 500);
        }
    }

    /**
     * Delete subject
     * DELETE /admin/subjects/{id}
     */
    public function destroy($id): void
    {
        error_log("SubjectController::destroy called with id: " . $id);
        
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

        // Check if subject exists
        $subject = $this->subjectModel->find($id);

        if (!$subject) {
            $this->notFound('Subject not found');
            return;
        }

        try {
            $success = $this->subjectModel->delete($id);

            if ($success) {
                $this->success([], 'Subject deleted successfully');
            } else {
                $this->error('Failed to delete subject', 500);
            }
        } catch (\Exception $e) {
            error_log("SubjectController::destroy - Error: " . $e->getMessage());
            $this->error('Failed to delete subject', 500);
        }
    }
}
