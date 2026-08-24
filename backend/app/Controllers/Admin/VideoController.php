<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

/**
 * Admin Video Controller
 * 
 * Handles video management operations for administrators.
 */
class VideoController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * Get current user ID from session
     */
    protected function getCurrentUserId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Check if current user is admin
     */
    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }

    /**
     * Get all videos
     * GET /admin/videos
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        try {
            $sql = "SELECT id, title, description, file_path AS url, file_size, duration,
                           created_by, created_at, updated_at
                    FROM videos
                    WHERE deleted_at IS NULL
                    ORDER BY created_at DESC";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            $videos = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($videos, 'Videos retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch videos: " . $e->getMessage());
            $this->error('Failed to fetch videos: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Upload a new video
     * POST /admin/videos
     */
    public function create(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();
        
        // Validate required fields
        $errors = $this->validateRequired(['title']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Handle file upload
        if (!isset($_FILES['video']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
            $this->validationError(['video' => 'Video file is required']);
            return;
        }

        $file = $_FILES['video'];
        $allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        $fileType = $file['type'];
        
        if (!in_array($fileType, $allowedTypes)) {
            $this->validationError(['video' => 'Invalid file type. Only MP4, WebM, and OGG are allowed']);
            return;
        }

        // Create upload directory if it doesn't exist
        $uploadDir = __DIR__ . '/../../../public/uploads/videos/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Generate unique filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid('video_') . '.' . $extension;
        $filepath = $uploadDir . $filename;

        // Move uploaded file
        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            $this->error('Failed to upload video file', 500);
            return;
        }

        // Get file size
        $fileSize = filesize($filepath);

        try {
            $sql = "INSERT INTO videos (title, description, file_path, file_name, file_size, mime_type, created_by) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $this->db->prepare($sql);
            $result = $stmt->execute([
                $data['title'],
                $data['description'] ?? null,
                '/uploads/videos/' . $filename,
                $file['name'],
                $fileSize,
                $fileType,
                $this->getCurrentUserId()
            ]);

            if ($result) {
                $videoId = $this->db->lastInsertId();
                $this->success(['id' => $videoId, 'url' => '/uploads/videos/' . $filename], 'Video uploaded successfully');
            } else {
                $this->error('Failed to save video record', 500);
            }
        } catch (\PDOException $e) {
            error_log("Failed to create video: " . $e->getMessage());
            // Clean up uploaded file if database insert fails
            if (file_exists($filepath)) {
                unlink($filepath);
            }
            $this->error('Failed to upload video: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Delete a video
     * DELETE /admin/videos/{id}
     */
    public function delete(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = $this->routeParam('id');
        
        if (!$id) {
            $this->validationError(['id' => 'Video ID is required']);
            return;
        }

        try {
            // Get video file path before deletion
            $stmt = $this->db->prepare("SELECT file_path FROM videos WHERE id = ? AND deleted_at IS NULL");
            $stmt->execute([$id]);
            $video = $stmt->fetch();

            if (!$video) {
                $this->error('Video not found', 404);
                return;
            }

            // Soft delete video record
            $stmt = $this->db->prepare("UPDATE videos SET deleted_at = NOW() WHERE id = ?");
            $result = $stmt->execute([$id]);

            if ($result) {
                // Delete physical file
                $fullPath = __DIR__ . '/../../../public' . $video['file_path'];
                if (file_exists($fullPath)) {
                    unlink($fullPath);
                }
                $this->success([], 'Video deleted successfully');
            } else {
                $this->error('Failed to delete video', 500);
            }
        } catch (\PDOException $e) {
            error_log("Failed to delete video: " . $e->getMessage());
            $this->error('Failed to delete video: ' . $e->getMessage(), 500);
        }
    }
}
