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
    // Raised from the old 5MB cap now that oversized images get resized/compressed after upload
    // (see resizeAndCompress()) - a phone photo can easily be 8-15MB at full resolution, and
    // rejecting those outright was itself a source of "image didn't load" reports (a teacher who
    // didn't notice the upload error toast would assume it saved).
    private $maxFileSize = 15728640; // 15MB in bytes
    // GIFs never get resizeAndCompress() (re-encoding would kill the animation), so a GIF is
    // stored exactly as uploaded - the flat 15MB cap that's fine for a JPEG/PNG that still gets
    // compressed down was letting through GIFs that then loaded painfully slowly for students.
    private $maxGifFileSize = 5242880; // 5MB in bytes
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
                        'message' => 'File size exceeds maximum limit of 15MB'
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

            if ($mimeType === 'image/gif' && $file['size'] > $this->maxGifFileSize) {
                $this->json([
                    'error' => [
                        'message' => 'GIF file size exceeds maximum limit of 5MB'
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

            // Downscale/re-encode oversized images so students actually get a page-sized image
            // instead of a multi-megabyte phone photo at full resolution - this was the main
            // cause of slow-loading eNote images. Best-effort: if GD isn't available on this PHP
            // install, or anything about the source image is unexpected, the original upload is
            // still perfectly usable as-is, so failures here are swallowed rather than failing
            // the whole upload over a nice-to-have.
            try {
                $this->resizeAndCompress($filepath, $mimeType);
            } catch (\Throwable $e) {
                error_log('ENoteImageController: resize skipped - ' . $e->getMessage());
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

    // Resizes an oversized image down to a page-appropriate maximum dimension and re-encodes it
    // at a reasonable quality - both animated GIFs (would lose their animation on re-encode, see
    // the move_uploaded_file() comment above) and already-small images are left untouched.
    private function resizeAndCompress(string $filepath, string $mimeType): void
    {
        if (!extension_loaded('gd') || $mimeType === 'image/gif') {
            return;
        }

        $maxDimension = 2000;
        $info = getimagesize($filepath);
        if (!$info) {
            return;
        }
        [$width, $height] = $info;
        if ($width <= $maxDimension && $height <= $maxDimension) {
            return;
        }

        $source = match ($mimeType) {
            'image/jpeg', 'image/jpg' => imagecreatefromjpeg($filepath),
            'image/png' => imagecreatefrompng($filepath),
            'image/webp' => function_exists('imagecreatefromwebp') ? imagecreatefromwebp($filepath) : false,
            default => false,
        };
        if (!$source) {
            return;
        }

        $scale = min($maxDimension / $width, $maxDimension / $height);
        $newWidth = max(1, (int) round($width * $scale));
        $newHeight = max(1, (int) round($height * $scale));

        $resized = imagecreatetruecolor($newWidth, $newHeight);
        if ($mimeType === 'image/png') {
            // Preserve transparency - without this, transparent areas turn solid black.
            imagealphablending($resized, false);
            imagesavealpha($resized, true);
        }
        imagecopyresampled($resized, $source, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        match ($mimeType) {
            'image/jpeg', 'image/jpg' => imagejpeg($resized, $filepath, 90),
            'image/png' => imagepng($resized, $filepath, 6),
            'image/webp' => function_exists('imagewebp') ? imagewebp($resized, $filepath, 90) : null,
            default => null,
        };

        imagedestroy($source);
        imagedestroy($resized);
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
