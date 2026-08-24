<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\AcademicYear;
use eSpace\App\Models\Term;

/**
 * Academic Year Controller
 * 
 * Handles academic year CRUD operations for admin users.
 */

class AcademicYearController extends Controller
{
    private AcademicYear $academicYearModel;
    private Term $termModel;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->academicYearModel = new AcademicYear();
        $this->termModel = new Term();
    }

    /**
     * Get all academic years
     * GET /admin/academic-years
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
            $academicYears = $this->academicYearModel->all([], ['created_at' => 'DESC']);
            
            // Get terms for each academic year
            foreach ($academicYears as &$academicYear) {
                $terms = $this->termModel->where(['academic_year_id' => $academicYear['id']]);
                $academicYear['terms'] = $terms;
                $academicYear['term_count'] = count($terms);
            }
            
            $this->success($academicYears, 'Academic years retrieved successfully');
        } catch (\Exception $e) {
            error_log("AcademicYearController::index - Error: " . $e->getMessage());
            $this->serverError('Failed to retrieve academic years');
        }
    }

    /**
     * Create new academic year
     * POST /admin/academic-years
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
        $errors = $this->validateRequired(['name', 'start_date', 'end_date']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        // Set is_current to 0 by default
        if (!isset($data['is_current'])) {
            $data['is_current'] = 0;
        }

        // If setting as current, unset current flag from other years
        if ($data['is_current'] == 1) {
            try {
                $this->academicYearModel->getDb()->exec("UPDATE academic_years SET is_current = 0");
            } catch (\Exception $e) {
                error_log("Failed to unset current flag: " . $e->getMessage());
            }
        }

        try {
            $id = $this->academicYearModel->create($data);

            if ($id) {
                $academicYear = $this->academicYearModel->find($id);
                $academicYear['terms'] = [];
                $academicYear['term_count'] = 0;
                $this->success($academicYear, 'Academic year created successfully');
            } else {
                $this->error('Failed to create academic year', 500);
            }
        } catch (\Exception $e) {
            error_log("AcademicYearController::store - Error: " . $e->getMessage());
            $this->error('Failed to create academic year', 500);
        }
    }

    /**
     * Update academic year
     * PUT /admin/academic-years/{id}
     */
    public function update($id): void
    {
        error_log("AcademicYearController::update called with id: " . $id);
        
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

        // Check if academic year exists
        $academicYear = $this->academicYearModel->find($id);

        if (!$academicYear) {
            $this->notFound('Academic year not found');
            return;
        }

        // Validate required fields
        $errors = $this->validateRequired(['name', 'start_date', 'end_date']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        // If setting as current, unset current flag from other years
        if (isset($data['is_current']) && $data['is_current'] == 1) {
            try {
                $this->academicYearModel->getDb()->exec("UPDATE academic_years SET is_current = 0");
            } catch (\Exception $e) {
                error_log("Failed to unset current flag: " . $e->getMessage());
            }
        }

        try {
            $success = $this->academicYearModel->update($id, $data);

            if ($success) {
                $updatedAcademicYear = $this->academicYearModel->find($id);
                $terms = $this->termModel->where(['academic_year_id' => $id]);
                $updatedAcademicYear['terms'] = $terms;
                $updatedAcademicYear['term_count'] = count($terms);
                $this->success($updatedAcademicYear, 'Academic year updated successfully');
            } else {
                $this->error('Failed to update academic year', 500);
            }
        } catch (\Exception $e) {
            error_log("AcademicYearController::update - Error: " . $e->getMessage());
            $this->error('Failed to update academic year', 500);
        }
    }

    /**
     * Delete academic year
     * DELETE /admin/academic-years/{id}
     */
    public function destroy($id): void
    {
        error_log("AcademicYearController::destroy called with id: " . $id);
        
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

        // Check if academic year exists
        $academicYear = $this->academicYearModel->find($id);

        if (!$academicYear) {
            $this->notFound('Academic year not found');
            return;
        }

        try {
            $success = $this->academicYearModel->delete($id);

            if ($success) {
                $this->success([], 'Academic year deleted successfully');
            } else {
                $this->error('Failed to delete academic year', 500);
            }
        } catch (\Exception $e) {
            error_log("AcademicYearController::destroy - Error: " . $e->getMessage());
            $this->error('Failed to delete academic year', 500);
        }
    }

    /**
     * Get terms for a specific academic year
     * GET /admin/academic-years/{id}/terms
     */
    public function terms($id): void
    {
        error_log("AcademicYearController::terms called with id: " . $id);
        
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

        // Check if academic year exists
        $academicYear = $this->academicYearModel->find($id);

        if (!$academicYear) {
            $this->notFound('Academic year not found');
            return;
        }

        try {
            $terms = $this->termModel->where(['academic_year_id' => $id]);
            $this->success($terms, 'Terms retrieved successfully');
        } catch (\Exception $e) {
            error_log("AcademicYearController::terms - Error: " . $e->getMessage());
            $this->serverError('Failed to retrieve terms');
        }
    }
}
