<?php

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Utils\MimeType;
use eSpace\App\Controllers\Controller;

/**
 * Upload a short video to embed inline in an eNote page - a lighter-weight sibling to
 * ENoteImageController, not the full Video Library (Teacher\VideoController): no DB record, no
 * subject/class targeting, just a file saved and a URL handed back to the CKEditor toolbar
 * button that calls this. Duration (max 3 minutes) is checked client-side, before upload even
 * starts, since there's no video-processing library (ffmpeg/getid3) available on this PHP
 * install to check it server-side - file size and type are the only things enforced here.
 */
class ENoteVideoController extends Controller
{
    private $allowedMimeTypes = [
        'video/mp4',
        'video/webm',
        'video/ogg',
        'video/quicktime',
    ];
    private $extensionForMime = [
        'video/mp4' => 'mp4',
        'video/webm' => 'webm',
        'video/ogg' => 'ogv',
        'video/quicktime' => 'mov',
    ];
    private $maxFileSize = 20971520; // 20MB
    private $uploadDir;

    public function __construct()
    {
        $this->uploadDir = __DIR__ . '/../../../public/uploads/enote-videos/';

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

        if (!isset($_FILES['upload']) || $_FILES['upload']['error'] !== UPLOAD_ERR_OK) {
            $this->json(['error' => ['message' => 'No file uploaded or upload error occurred']], 400);
            return;
        }

        $file = $_FILES['upload'];

        if ($file['size'] > $this->maxFileSize) {
            $this->json(['error' => ['message' => 'Video exceeds the maximum size of 20MB']], 400);
            return;
        }

        $mimeType = MimeType::detect($file['tmp_name'], $file['name'] ?? null);

        if (!in_array($mimeType, $this->allowedMimeTypes)) {
            $this->json(['error' => ['message' => 'Invalid file type. Only MP4, WebM, OGG and MOV videos are allowed']], 400);
            return;
        }

        $filename = uniqid('enote_video_', true) . '_' . time() . '.' . $this->extensionForMime[$mimeType];
        $filepath = $this->uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            $this->json(['error' => ['message' => 'Failed to save uploaded video']], 500);
            return;
        }

        // Root-relative path (relative to backend/public/) - same convention as
        // ENoteImageController::upload(); the frontend prefixes it with the /eSpace/ base path.
        $url = '/uploads/enote-videos/' . $filename;

        $this->json(['url' => $url]);
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
