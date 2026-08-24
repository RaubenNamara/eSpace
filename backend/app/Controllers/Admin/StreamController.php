<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\Stream;
use eSpace\App\Models\ClassModel as ClassModel;

/**
 * Stream Controller
 * 
 * Handles stream CRUD operations for admin users.
 */

class StreamController extends Controller
{
    private Stream $streamModel;
    private ClassModel $classModel;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->streamModel = new Stream();
        $this->classModel = new ClassModel();
    }

    /**
     * Get all streams
     * GET /admin/streams
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
            $streams = $this->streamModel->all([], ['created_at' => 'DESC']);
            
            // Get class information for each stream
            foreach ($streams as &$stream) {
                $class = $this->classModel->find($stream['class_id']);
                $stream['class'] = $class;
            }
            
            $this->success($streams, 'Streams retrieved successfully');
        } catch (\Exception $e) {
            error_log("StreamController::index - Error: " . $e->getMessage());
            $this->serverError('Failed to retrieve streams');
        }
    }

    /**
     * Create new stream
     * POST /admin/streams
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
        $errors = $this->validateRequired(['class_id', 'name']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Check if class exists
        $classId = (int) $this->input('class_id');
        $class = $this->classModel->find($classId);

        if (!$class) {
            $this->notFound('Class not found');
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        try {
            $id = $this->streamModel->create($data);

            if ($id) {
                $stream = $this->streamModel->find($id);
                $stream['class'] = $class;
                $this->success($stream, 'Stream created successfully');
            } else {
                $this->error('Failed to create stream', 500);
            }
        } catch (\Exception $e) {
            error_log("StreamController::store - Error: " . $e->getMessage());
            $this->error('Failed to create stream', 500);
        }
    }

    /**
     * Update stream
     * PUT /admin/streams/{id}
     */
    public function update($id): void
    {
        error_log("StreamController::update called with id: " . $id);
        
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

        // Check if stream exists
        $stream = $this->streamModel->find($id);

        if (!$stream) {
            $this->notFound('Stream not found');
            return;
        }

        // Validate required fields
        $errors = $this->validateRequired(['class_id', 'name']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Check if class exists
        $classId = (int) $this->input('class_id');
        $class = $this->classModel->find($classId);

        if (!$class) {
            $this->notFound('Class not found');
            return;
        }

        // Sanitize input
        $data = $this->sanitize($this->input());

        try {
            $success = $this->streamModel->update($id, $data);

            if ($success) {
                $updatedStream = $this->streamModel->find($id);
                $updatedStream['class'] = $class;
                $this->success($updatedStream, 'Stream updated successfully');
            } else {
                $this->error('Failed to update stream', 500);
            }
        } catch (\Exception $e) {
            error_log("StreamController::update - Error: " . $e->getMessage());
            $this->error('Failed to update stream', 500);
        }
    }

    /**
     * Delete stream
     * DELETE /admin/streams/{id}
     */
    public function destroy($id): void
    {
        error_log("StreamController::destroy called with id: " . $id);
        
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

        // Check if stream exists
        $stream = $this->streamModel->find($id);

        if (!$stream) {
            $this->notFound('Stream not found');
            return;
        }

        try {
            $success = $this->streamModel->delete($id);

            if ($success) {
                $this->success([], 'Stream deleted successfully');
            } else {
                $this->error('Failed to delete stream', 500);
            }
        } catch (\Exception $e) {
            error_log("StreamController::destroy - Error: " . $e->getMessage());
            $this->error('Failed to delete stream', 500);
        }
    }
}
