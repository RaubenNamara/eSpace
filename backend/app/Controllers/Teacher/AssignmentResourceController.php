<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Utils\FileKinds;

/**
 * Support files on an ICT assessment - starter documents, spreadsheets, databases, zip archives of
 * files to work on - which students download from the assessment (Student\AssignmentController
 * show()). Only for assessments in the ICT department; any document format (FileKinds::SUPPORT),
 * checked by its contents, never a web page, script or program.
 */
class AssignmentResourceController extends Controller
{
    private const MAX_BYTES = 50 * 1024 * 1024;

    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    /** The assessment, when this teacher owns it - else null (the response is already sent) */
    private function ownAssignment(int $id): ?array
    {
        $teacherId = $this->resolveActiveTeacherId();
        $stmt = $this->db()->prepare('SELECT id, subject_id FROM assignments WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL');
        $stmt->execute([$id, (int) $teacherId]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$row) {
            $this->notFound('Assessment not found');
            return null;
        }
        return $row;
    }

    /** GET /teacher/assignments/{id}/resources - the files, and whether this assessment may have them */
    public function index($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->ownAssignment((int) $id)) {
            return;
        }
        $stmt = $this->db()->prepare('SELECT id, file_path, original_name, file_size, created_at FROM assignment_resources WHERE assignment_id = ? ORDER BY id');
        $stmt->execute([(int) $id]);
        $this->success([
            'allowed' => FileKinds::assignmentIsIct($this->db(), (int) $id),
            'formats' => FileKinds::SUPPORT,
            'files' => $stmt->fetchAll(\PDO::FETCH_ASSOC),
        ]);
    }

    /** POST /teacher/assignments/{id}/resources   multipart: file */
    public function store($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->ownAssignment((int) $id)) {
            return;
        }
        if (!FileKinds::assignmentIsIct($this->db(), (int) $id)) {
            $this->error('Support files are for ICT assessments - choose an ICT subject first.', 422);
            return;
        }
        $file = $_FILES['file'] ?? null;
        if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
            $this->error('No file uploaded', 400);
            return;
        }
        if ($file['size'] > self::MAX_BYTES) {
            $this->error('The file is bigger than 50 MB', 400);
            return;
        }
        $name = FileKinds::cleanName((string) $file['name']);
        $ext = FileKinds::check($file['tmp_name'], $name, FileKinds::SUPPORT);
        if (!$ext) {
            $this->error('That kind of file can\'t be attached. Documents (Word, Excel, PowerPoint, Publisher, Access, PDF), pictures, text and zip/rar/7z archives can.', 400);
            return;
        }
        $dir = __DIR__ . '/../../../public/uploads/assignment_resources/';
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        // our own name and extension - never the uploader's
        $stored = 'res_' . (int) $id . '_' . bin2hex(random_bytes(8)) . '_' . time() . '.' . $ext;
        if (!move_uploaded_file($file['tmp_name'], $dir . $stored)) {
            $this->serverError('The file could not be saved');
            return;
        }
        $this->db()->prepare('INSERT INTO assignment_resources (assignment_id, file_path, original_name, file_size) VALUES (?, ?, ?, ?)')
            ->execute([(int) $id, '/uploads/assignment_resources/' . $stored, $name, (int) $file['size']]);
        $this->success([
            'id' => (int) $this->db()->lastInsertId(),
            'file_path' => '/uploads/assignment_resources/' . $stored,
            'original_name' => $name,
            'file_size' => (int) $file['size'],
        ], 'Support file added');
    }

    /** DELETE /teacher/assignments/{id}/resources/{resourceId} */
    public function destroy($id, $resourceId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->ownAssignment((int) $id)) {
            return;
        }
        $stmt = $this->db()->prepare('SELECT file_path FROM assignment_resources WHERE id = ? AND assignment_id = ?');
        $stmt->execute([(int) $resourceId, (int) $id]);
        $path = $stmt->fetchColumn();
        if (!$path) {
            $this->notFound('File not found');
            return;
        }
        $this->db()->prepare('DELETE FROM assignment_resources WHERE id = ?')->execute([(int) $resourceId]);
        // the file stays while a copied assessment still uses it
        $used = $this->db()->prepare('SELECT COUNT(*) FROM assignment_resources WHERE file_path = ?');
        $used->execute([$path]);
        if ((int) $used->fetchColumn() === 0) {
            $full = __DIR__ . '/../../../public' . $path;
            if (is_file($full)) {
                @unlink($full);
            }
        }
        $this->success([], 'Removed');
    }
}
