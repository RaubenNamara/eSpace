<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\ClassModel as ClassModel;

/**
 * Class Controller
 * 
 * Handles class CRUD operations for admin users.
 */

class ClassController extends Controller
{
    private ClassModel $classModel;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->classModel = new ClassModel();
    }

    /**
     * Get all classes
     * GET /admin/classes
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
            $classes = $this->classModel->all([], ['created_at' => 'DESC']);

            // Each class's size, subjects and class teacher, for the list
            $db = \eSpace\Config\Database::getInstance();
            $rows = $db->query(
                "SELECT c.id,
                        (SELECT COUNT(*) FROM students st WHERE st.class_id = c.id AND st.deleted_at IS NULL) AS students_count,
                        (SELECT COUNT(DISTINCT cs.subject_id) FROM class_subjects cs WHERE cs.class_id = c.id) AS subjects_count,
                        (SELECT CONCAT(t.first_name, ' ', t.last_name) FROM teachers t WHERE t.id = c.class_teacher_id AND t.deleted_at IS NULL) AS class_teacher_name
                   FROM classes c WHERE c.deleted_at IS NULL"
            )->fetchAll(\PDO::FETCH_ASSOC);
            $byId = array_column($rows, null, 'id');
            foreach ($classes as &$class) {
                $r = $byId[$class['id']] ?? [];
                $class['students_count'] = (int) ($r['students_count'] ?? 0);
                $class['subjects_count'] = (int) ($r['subjects_count'] ?? 0);
                $class['class_teacher_name'] = $r['class_teacher_name'] ?? null;
            }
            unset($class);

            $this->success($classes, 'Classes retrieved successfully');
        } catch (\Exception $e) {
            error_log("ClassController::index - Error: " . $e->getMessage());
            $this->serverError('Failed to retrieve classes');
        }
    }

    /**
     * Create new class
     * POST /admin/classes
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
        $errors = $this->validateRequired(['name', 'level', 'academic_year_id', 'stream_name']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Validate level is either 'A Level' or 'O Level'
        $level = $this->input('level');
        if (!in_array($level, ['A Level', 'O Level'])) {
            $this->validationError(['level' => 'Level must be either A Level or O Level']);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        try {
            $id = $this->classModel->create($data);

            if ($id) {
                $class = $this->classModel->find($id);
                $this->success($class, 'Class created successfully');
            } else {
                $this->error('Failed to create class', 500);
            }
        } catch (\Exception $e) {
            error_log("ClassController::store - Error: " . $e->getMessage());
            $this->error('Failed to create class', 500);
        }
    }

    /**
     * Update class
     * PUT /admin/classes/{id}
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

        // Check if class exists
        $class = $this->classModel->find($id);

        if (!$class) {
            $this->notFound('Class not found');
            return;
        }

        // Validate required fields
        $errors = $this->validateRequired(['name', 'level', 'academic_year_id', 'stream_name']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Validate level is either 'A Level' or 'O Level'
        $level = $this->input('level');
        if (!in_array($level, ['A Level', 'O Level'])) {
            $this->validationError(['level' => 'Level must be either A Level or O Level']);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        try {
            $success = $this->classModel->update($id, $data);

            if ($success) {
                $updatedClass = $this->classModel->find($id);
                $this->success($updatedClass, 'Class updated successfully');
            } else {
                $this->error('Failed to update class', 500);
            }
        } catch (\Exception $e) {
            error_log("ClassController::update - Error: " . $e->getMessage());
            $this->error('Failed to update class', 500);
        }
    }

    /**
     * Delete class
     * DELETE /admin/classes/{id}
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

        // Check if class exists
        $class = $this->classModel->find($id);

        if (!$class) {
            $this->notFound('Class not found');
            return;
        }

        try {
            $success = $this->classModel->delete($id);

            if ($success) {
                $this->success([], 'Class deleted successfully');
            } else {
                $this->error('Failed to delete class', 500);
            }
        } catch (\Exception $e) {
            error_log("ClassController::destroy - Error: " . $e->getMessage());
            $this->error('Failed to delete class', 500);
        }
    }
}
