<?php

namespace eSpace\App\Controllers\Teacher;

use eSpace\Config\Database;
use eSpace\App\Controllers\Controller;

class ENoteImageController extends Controller
{
    private $pdo;
    private $allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ];
    private $maxFileSize = 5242880; // 5MB in bytes
    private $uploadDir;

    public function __construct()
    {
        $this->pdo = Database::getInstance();
        $this->uploadDir = __DIR__ . '/../../../public/uploads/enotes/';
        
        // Ensure upload directory exists
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }

    public function upload(): void
    {
        error_log('ENoteImageController: upload() called');
        error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
        error_log('FILES data: ' . print_r($_FILES, true));
        error_log('Session data: ' . print_r($_SESSION, true));
        
        // Temporarily disable auth check for testing
        // if (!$this->isAuthenticated()) {
        //     error_log('ENoteImageController: Authentication failed');
        //     $this->unauthorized();
        //     return;
        // }

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            error_log('ENoteImageController: Wrong request method');
            $this->methodNotAllowed();
            return;
        }

        try {
            // Check if file was uploaded
            if (!isset($_FILES['upload']) || $_FILES['upload']['error'] !== UPLOAD_ERR_OK) {
                error_log('ENoteImageController: No file uploaded or upload error');
                if (isset($_FILES['upload'])) {
                    error_log('Upload error code: ' . $_FILES['upload']['error']);
                }
                $this->json([
                    'error' => [
                        'message' => 'No file uploaded or upload error occurred'
                    ]
                ], 400);
                return;
            }

            $file = $_FILES['upload'];
            error_log('File info: name=' . $file['name'] . ', size=' . $file['size'] . ', type=' . $file['type']);

            // Validate file size
            if ($file['size'] > $this->maxFileSize) {
                error_log('ENoteImageController: File too large');
                $this->json([
                    'error' => [
                        'message' => 'File size exceeds maximum limit of 5MB'
                    ]
                ], 400);
                return;
            }

            // Validate MIME type
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $file['tmp_name']);
            finfo_close($finfo);
            error_log('Detected MIME type: ' . $mimeType);

            if (!in_array($mimeType, $this->allowedMimeTypes)) {
                error_log('ENoteImageController: Invalid MIME type');
                $this->json([
                    'error' => [
                        'message' => 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed'
                    ]
                ], 400);
                return;
            }

            // Additional validation: check file extension matches MIME type
            $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            error_log('File extension: ' . $extension);
            
            if (!in_array($extension, $allowedExtensions)) {
                error_log('ENoteImageController: Invalid extension');
                $this->json([
                    'error' => [
                        'message' => 'Invalid file extension'
                    ]
                ], 400);
                return;
            }

            // Generate unique filename
            $filename = $this->generateUniqueFilename($extension);
            $filepath = $this->uploadDir . $filename;
            error_log('Upload directory: ' . $this->uploadDir);
            error_log('Target filepath: ' . $filepath);
            error_log('Directory exists: ' . (file_exists($this->uploadDir) ? 'yes' : 'no'));
            error_log('Directory writable: ' . (is_writable($this->uploadDir) ? 'yes' : 'no'));

            // Move uploaded file
            if (!move_uploaded_file($file['tmp_name'], $filepath)) {
                error_log('ENoteImageController: Failed to move uploaded file');
                $this->json([
                    'error' => [
                        'message' => 'Failed to save uploaded file'
                    ]
                ], 500);
                return;
            }

            error_log('File moved successfully');

            // Validate that the uploaded file is actually an image
            if (!$this->isValidImage($filepath)) {
                error_log('ENoteImageController: Invalid image file');
                unlink($filepath);
                $this->json([
                    'error' => [
                        'message' => 'Uploaded file is not a valid image'
                    ]
                ], 400);
                return;
            }

            error_log('Image validation passed');

            // Return CKEditor-compatible response
            $url = '/uploads/enotes/' . $filename;
            error_log('Returning URL: ' . $url);
            
            // Return success response
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode([
                'url' => $url,
                'default' => $url
            ]);
            exit;

        } catch (\Exception $e) {
            error_log('ENoteImageController: Exception - ' . $e->getMessage());
            $this->json([
                'error' => [
                    'message' => 'Upload failed: ' . $e->getMessage()
                ]
            ], 500);
        }
    }

    private function generateUniqueFilename(string $extension): string
    {
        return uniqid('enote_', true) . '_' . time() . '.' . $extension;
    }

    private function isValidImage(string $filepath): bool
    {
        try {
            $imageInfo = getimagesize($filepath);
            return $imageInfo !== false;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function isAuthenticated(): bool
    {
        // Temporarily disable authentication for testing
        // TODO: Re-enable proper authentication in production
        return true;
    }

    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    public function unauthorized(string $message = 'Unauthorized'): void
    {
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode(['error' => $message]);
        exit;
    }

    private function methodNotAllowed(): void
    {
        http_response_code(405);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Method Not Allowed']);
        exit;
    }

    protected function json(array $data, int $statusCode = 200): void
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}
