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
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->methodNotAllowed();
            return;
        }

        try {
            // Check if file was uploaded
            if (!isset($_FILES['upload']) || $_FILES['upload']['error'] !== UPLOAD_ERR_OK) {
                $this->json([
                    'error' => [
                        'message' => 'No file uploaded or upload error occurred'
                    ]
                ], 400);
                return;
            }

            $file = $_FILES['upload'];

            // Validate file size
            if ($file['size'] > $this->maxFileSize) {
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

            if (!in_array($mimeType, $this->allowedMimeTypes)) {
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

            if (!in_array($extension, $allowedExtensions)) {
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

            // Move uploaded file (animated GIFs are copied byte-for-byte, never re-encoded, so
            // their animation is preserved)
            if (!move_uploaded_file($file['tmp_name'], $filepath)) {
                $this->json([
                    'error' => [
                        'message' => 'Failed to save uploaded file'
                    ]
                ], 500);
                return;
            }

            // Validate that the uploaded file is actually an image
            if (!$this->isValidImage($filepath)) {
                unlink($filepath);
                $this->json([
                    'error' => [
                        'message' => 'Uploaded file is not a valid image'
                    ]
                ], 400);
                return;
            }

            // Return CKEditor-compatible response. This is a root-relative path (relative to
            // backend/public/) - the frontend upload adapter is responsible for prefixing it with
            // the app's /eSpace/ base path before handing it to CKEditor, the same way every
            // other uploaded-file reference in this app is resolved (see resolveAssetUrl()).
            $url = '/uploads/enotes/' . $filename;

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
