<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\Term;
use eSpace\App\Models\AcademicYear;

/**
 * Term Controller
 * 
 * Handles term CRUD operations for admin users.
 */

class TermController extends Controller
{
    private Term $termModel;
    private AcademicYear $academicYearModel;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->termModel = new Term();
        $this->academicYearModel = new AcademicYear();
    }

    /**
     * Get all terms
     * GET /admin/terms
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
            $terms = $this->termModel->all([], ['created_at' => 'DESC']);
            
            // Get academic year information for each term
            foreach ($terms as &$term) {
                $academicYear = $this->academicYearModel->find($term['academic_year_id']);
                $term['academic_year'] = $academicYear;
            }
            
            $this->success($terms, 'Terms retrieved successfully');
        } catch (\Exception $e) {
            error_log("TermController::index - Error: " . $e->getMessage());
            $this->serverError('Failed to retrieve terms');
        }
    }

    /**
     * Create new term
     * POST /admin/terms
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
        $errors = $this->validateRequired(['academic_year_id', 'name', 'start_date', 'end_date']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Validate term name is either 'Term 1', 'Term 2', or 'Term 3'
        $name = $this->input('name');
        if (!in_array($name, ['Term 1', 'Term 2', 'Term 3'])) {
            $this->validationError(['name' => 'Term name must be either Term 1, Term 2, or Term 3']);
            return;
        }

        // Check if academic year exists
        $academicYearId = (int) $this->input('academic_year_id');
        $academicYear = $this->academicYearModel->find($academicYearId);

        if (!$academicYear) {
            $this->notFound('Academic year not found');
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        // Set is_current to 0 by default
        if (!isset($data['is_current'])) {
            $data['is_current'] = 0;
        }

        // If setting as current, unset current flag from other terms in same academic year
        if ($data['is_current'] == 1) {
            try {
                $this->termModel->getDb()->prepare("UPDATE terms SET is_current = 0 WHERE academic_year_id = ?")
                    ->execute([$academicYearId]);
            } catch (\Exception $e) {
                error_log("Failed to unset current flag: " . $e->getMessage());
            }
        }

        try {
            $id = $this->termModel->create($data);

            if ($id) {
                $term = $this->termModel->find($id);
                $term['academic_year'] = $academicYear;
                $this->success($term, 'Term created successfully');
            } else {
                $this->error('Failed to create term', 500);
            }
        } catch (\Exception $e) {
            error_log("TermController::store - Error: " . $e->getMessage());
            $this->error('Failed to create term', 500);
        }
    }

    /**
     * Update term
     * PUT /admin/terms/{id}
     */
    public function update($id): void
    {
        error_log("TermController::update called with id: " . $id);
        
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

        // Check if term exists
        $term = $this->termModel->find($id);

        if (!$term) {
            $this->notFound('Term not found');
            return;
        }

        // Validate required fields
        $errors = $this->validateRequired(['academic_year_id', 'name', 'start_date', 'end_date']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Validate term name is either 'Term 1', 'Term 2', or 'Term 3'
        $name = $this->input('name');
        if (!in_array($name, ['Term 1', 'Term 2', 'Term 3'])) {
            $this->validationError(['name' => 'Term name must be either Term 1, Term 2, or Term 3']);
            return;
        }

        // Check if academic year exists
        $academicYearId = (int) $this->input('academic_year_id');
        $academicYear = $this->academicYearModel->find($academicYearId);

        if (!$academicYear) {
            $this->notFound('Academic year not found');
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        // If setting as current, unset current flag from other terms in same academic year
        if (isset($data['is_current']) && $data['is_current'] == 1) {
            try {
                $this->termModel->getDb()->prepare("UPDATE terms SET is_current = 0 WHERE academic_year_id = ?")
                    ->execute([$academicYearId]);
            } catch (\Exception $e) {
                error_log("Failed to unset current flag: " . $e->getMessage());
            }
        }

        try {
            $success = $this->termModel->update($id, $data);

            if ($success) {
                $updatedTerm = $this->termModel->find($id);
                $updatedTerm['academic_year'] = $academicYear;
                $this->success($updatedTerm, 'Term updated successfully');
            } else {
                $this->error('Failed to update term', 500);
            }
        } catch (\Exception $e) {
            error_log("TermController::update - Error: " . $e->getMessage());
            $this->error('Failed to update term', 500);
        }
    }

    /**
     * Delete term
     * DELETE /admin/terms/{id}
     */
    public function destroy($id): void
    {
        error_log("TermController::destroy called with id: " . $id);
        
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

        // Check if term exists
        $term = $this->termModel->find($id);

        if (!$term) {
            $this->notFound('Term not found');
            return;
        }

        try {
            $success = $this->termModel->delete($id);

            if ($success) {
                $this->success([], 'Term deleted successfully');
            } else {
                $this->error('Failed to delete term', 500);
            }
        } catch (\Exception $e) {
            error_log("TermController::destroy - Error: " . $e->getMessage());
            $this->error('Failed to delete term', 500);
        }
    }
}
