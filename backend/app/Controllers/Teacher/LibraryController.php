<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;

/**
 * Teacher Library Controller
 *
 * Handles PDF library resource management for teachers. Books are scoped to the teacher's
 * department, a subject in that department, and a class in that department - mirroring how
 * eNotes topics are scoped - and are only visible to students once published.
 */
class LibraryController extends Controller
{
    private const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    private const UPLOAD_SUBDIR = 'library';

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * create()/replaceFile() receive multipart/form-data (they carry a file), where every field
     * - including a checkbox's value - arrives as a plain string ("true"/"1"/"false"/"0"), unlike
     * update()'s JSON body where it could already be a real boolean. Handles both.
     */
    private function toBool(mixed $value): bool
    {
        if (is_bool($value)) {
            return $value;
        }
        return in_array(strtolower((string) $value), ['1', 'true', 'on', 'yes'], true);
    }

    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Session-scoped active department (see Controller::getActiveDepartmentId()) - a teacher in
     * more than one department can switch this via PUT /teacher/departments/active without
     * changing their admin-set primary.
     */
    private function getTeacherDepartmentId(): ?int
    {
        return $this->getActiveDepartmentId();
    }

    /**
     * Get all books uploaded by the teacher
     * GET /teacher/library
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $status = $this->query('status', '');
        $subjectId = $this->query('subject_id', '');
        $search = $this->query('search', '');

        $db = $this->getDb();

        $where = ['lb.uploaded_by = :teacher_id', 'lb.deleted_at IS NULL'];
        $params = ['teacher_id' => $teacherId];

        if (!empty($status)) {
            $where[] = 'lb.status = :status';
            $params['status'] = $status;
        }

        if (!empty($subjectId)) {
            $where[] = 'lb.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if (!empty($search)) {
            $where[] = '(lb.title LIKE :search OR lb.description LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT lb.*,
                       s.name as subject_name,
                       s.code as subject_code,
                       c.name as class_name,
                       c.level as class_level,
                       c.stream_name as class_stream_name
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN classes c ON lb.class_id = c.id
                WHERE {$whereClause}
                ORDER BY lb.updated_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $books = $stmt->fetchAll();

        $this->success(['books' => $books]);
    }

    /**
     * "Preview as Student" - the eLibrary exactly as a student enrolled in the given class would
     * see it (published books scoped to this teacher's department + that class).
     * GET /teacher/library/preview?class_id=
     */
    public function previewIndex(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        if (!$classId) {
            $this->validationError(['class_id' => 'class_id is required']);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT DISTINCT c.id FROM classes c
             INNER JOIN student_department_enrollments se ON c.id = se.class_id
             WHERE c.id = :class_id AND se.department_id = :department_id
               AND se.deleted_at IS NULL AND c.deleted_at IS NULL"
        );
        $stmt->execute(['class_id' => $classId, 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->error('Class not found in your department', 403);
            return;
        }

        $service = new \eSpace\App\Services\StudentModulePreviewService();
        $this->success(['books' => $service->getLibraryBooks($departmentId, $classId)]);
    }

    /**
     * Get a single book
     * GET /teacher/library/{id}
     */
    public function show($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $sql = "SELECT lb.*,
                       s.name as subject_name,
                       s.code as subject_code,
                       c.name as class_name,
                       c.level as class_level,
                       c.stream_name as class_stream_name
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN classes c ON lb.class_id = c.id
                WHERE lb.id = :id AND lb.uploaded_by = :teacher_id AND lb.deleted_at IS NULL";

        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $book = $stmt->fetch();

        if (!$book) {
            $this->notFound('Book not found');
            return;
        }

        $this->success($book);
    }

    /**
     * Upload a new PDF to the library
     * POST /teacher/library
     */
    public function create(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $data = $this->input();

        $errors = $this->validateRequired(['title', 'subject_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $db = $this->getDb();

        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department to upload library resources', 403);
            return;
        }

        // Verify subject belongs to teacher's department
        $stmt = $db->prepare("SELECT id FROM subjects WHERE id = :subject_id AND department_id = :department_id");
        $stmt->execute(['subject_id' => $data['subject_id'], 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->validationError(['subject_id' => 'Subject not found in your department']);
            return;
        }

        // Verify class/class-level is real and present in the department (individual stream or
        // "All Streams" for a class level)
        $classTarget = $this->resolveClassTarget($data, $departmentId);
        if (!$classTarget['ok']) {
            $this->validationError(['class_id' => $classTarget['message']]);
            return;
        }

        $upload = $this->handleUpload();
        if ($upload === null) {
            return; // handleUpload() already sent the error response
        }

        $status = in_array($data['status'] ?? 'draft', ['draft', 'published', 'archived'], true) ? $data['status'] : 'draft';
        $allowDownload = $this->toBool($data['allow_download'] ?? false) ? 1 : 0;

        $sanitizedData = [
            'title' => htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8'),
            'description' => !empty($data['description']) ? htmlspecialchars(trim($data['description']), ENT_QUOTES, 'UTF-8') : null,
            'subject_id' => (int) $data['subject_id'],
            'class_id' => $classTarget['class_id'],
            'class_group_name' => $classTarget['class_group_name'],
            'department_id' => $departmentId,
            'status' => $status
        ];

        $sql = "INSERT INTO library_books
                    (title, description, subject_id, class_id, class_group_name, department_id, file_path, file_type, file_size,
                     allow_download, uploaded_by, is_approved, status, published_at, created_at, updated_at)
                VALUES
                    (:title, :description, :subject_id, :class_id, :class_group_name, :department_id, :file_path, :file_type, :file_size,
                     :allow_download, :uploaded_by, 1, :status, :published_at, NOW(), NOW())";

        $stmt = $db->prepare($sql);

        try {
            $stmt->execute(array_merge($sanitizedData, [
                'file_path' => $upload['url'],
                'file_type' => $upload['type'],
                'file_size' => $upload['size'],
                'allow_download' => $allowDownload,
                'uploaded_by' => $teacherId,
                'published_at' => $status === 'published' ? date('Y-m-d H:i:s') : null
            ]));

            $bookId = (int) $db->lastInsertId();

            if ($sanitizedData['status'] === 'published') {
                (new NotificationService())->notifyDepartmentClass(
                    $departmentId,
                    $sanitizedData['class_id'],
                    'new_library_resource',
                    'New eLibrary resource',
                    "A new library resource \"{$sanitizedData['title']}\" is now available.",
                    ['book_id' => $bookId],
                    $sanitizedData['class_group_name']
                );
            }

            $this->success([
                'id' => $bookId,
                'title' => $sanitizedData['title'],
                'status' => $sanitizedData['status']
            ], 'Book uploaded successfully');
        } catch (\PDOException $e) {
            @unlink($upload['path']);
            error_log('Failed to save library book: ' . $e->getMessage());
            $this->error('Failed to save library book', 500);
        }
    }

    /**
     * Update book metadata (title/description/subject/class/status/allow_download). Does not
     * touch the file itself - see replaceFile() for swapping the underlying document.
     * PUT /teacher/library/{id}
     */
    public function update($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $data = $this->input();

        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, status, title, department_id, class_id, class_group_name FROM library_books WHERE id = :id AND uploaded_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $book = $stmt->fetch();

        if (!$book) {
            $this->notFound('Book not found');
            return;
        }

        $oldStatus = $book['status'];
        $newStatus = $data['status'] ?? $oldStatus;

        $updates = [];
        $params = ['id' => $id];

        if (!empty($data['title'])) {
            $updates[] = 'title = :title';
            $params['title'] = htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8');
        }

        if (array_key_exists('description', $data)) {
            $desc = trim((string) $data['description']);
            $updates[] = 'description = :description';
            $params['description'] = $desc !== '' ? htmlspecialchars($desc, ENT_QUOTES, 'UTF-8') : null;
        }

        if (!empty($data['subject_id'])) {
            $updates[] = 'subject_id = :subject_id';
            $params['subject_id'] = (int) $data['subject_id'];
        }

        if (array_key_exists('class_id', $data) || array_key_exists('class_group_name', $data) || array_key_exists('scope', $data)) {
            $departmentId = $this->getTeacherDepartmentId();
            if (!$departmentId) {
                $this->error('Teacher must be assigned to a department', 403);
                return;
            }
            $classTarget = $this->resolveClassTarget($data, $departmentId);
            if (!$classTarget['ok']) {
                $this->validationError(['class_id' => $classTarget['message']]);
                return;
            }
            $updates[] = 'class_id = :class_id';
            $params['class_id'] = $classTarget['class_id'];
            $updates[] = 'class_group_name = :class_group_name';
            $params['class_group_name'] = $classTarget['class_group_name'];
        }

        if (!empty($data['status']) && in_array($data['status'], ['draft', 'published', 'archived'], true)) {
            $updates[] = 'status = :status';
            $params['status'] = $data['status'];
        }

        if (array_key_exists('allow_download', $data)) {
            $updates[] = 'allow_download = :allow_download';
            $params['allow_download'] = $this->toBool($data['allow_download']) ? 1 : 0;
        }

        if (empty($updates)) {
            $this->error('No fields to update', 400);
            return;
        }

        $updates[] = 'updated_at = NOW()';
        $sql = "UPDATE library_books SET " . implode(', ', $updates) . " WHERE id = :id";

        try {
            $stmt = $db->prepare($sql);
            $stmt->execute($params);

            if ($oldStatus !== 'published' && $newStatus === 'published') {
                $updateSql = "UPDATE library_books SET published_at = NOW() WHERE id = :id";
                $updateStmt = $db->prepare($updateSql);
                $updateStmt->execute(['id' => $id]);

                $title = !empty($data['title']) ? trim($data['title']) : $book['title'];
                $classId = $params['class_id'] ?? (int) $book['class_id'];
                $classGroupName = $params['class_group_name'] ?? $book['class_group_name'];
                (new NotificationService())->notifyDepartmentClass(
                    (int) $book['department_id'],
                    $classId,
                    'new_library_resource',
                    'New eLibrary resource',
                    "A new library resource \"{$title}\" is now available.",
                    ['book_id' => $id],
                    $classGroupName
                );
            }

            $this->success([], 'Book updated successfully');
        } catch (\PDOException $e) {
            error_log('Failed to update library book: ' . $e->getMessage());
            $this->error('Failed to update library book', 500);
        }
    }

    /**
     * Replace the underlying file (e.g. a corrected PPTX) without touching title/description/
     * subject/class/status/allow_download or losing the book's id/history. Same validation as a
     * fresh upload; the old physical file is deleted only after the new one is confirmed valid
     * and the DB row is updated, so a failed replace never leaves the book without a file.
     * POST /teacher/library/{id}/replace-file
     */
    public function replaceFile($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, file_path FROM library_books WHERE id = :id AND uploaded_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $book = $stmt->fetch();

        if (!$book) {
            $this->notFound('Book not found');
            return;
        }

        $upload = $this->handleUpload();
        if ($upload === null) {
            return; // handleUpload() already sent the error response
        }

        try {
            $updateStmt = $db->prepare(
                "UPDATE library_books SET file_path = :file_path, file_type = :file_type, file_size = :file_size, updated_at = NOW() WHERE id = :id"
            );
            $updateStmt->execute([
                'file_path' => $upload['url'],
                'file_type' => $upload['type'],
                'file_size' => $upload['size'],
                'id' => $id
            ]);

            // Old file's path is root-relative (e.g. '/uploads/library/xyz.pdf') - resolve it back
            // to a real filesystem path the same way handleUpload() builds new ones, then remove
            // it now that the new file is safely referenced by the DB row.
            $oldRelative = ltrim((string) $book['file_path'], '/');
            if (str_starts_with($oldRelative, 'uploads/' . self::UPLOAD_SUBDIR . '/')) {
                $oldPath = __DIR__ . '/../../../public/' . $oldRelative;
                if (is_file($oldPath)) {
                    @unlink($oldPath);
                }
            }

            $this->success([
                'file_path' => $upload['url'],
                'file_type' => $upload['type'],
                'file_size' => $upload['size']
            ], 'File replaced successfully');
        } catch (\PDOException $e) {
            @unlink($upload['path']);
            error_log('Failed to replace library book file: ' . $e->getMessage());
            $this->error('Failed to replace file', 500);
        }
    }

    /**
     * Delete a book (soft delete)
     * DELETE /teacher/library/{id}
     */
    public function delete($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id FROM library_books WHERE id = :id AND uploaded_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Book not found');
            return;
        }

        try {
            $stmt = $db->prepare("UPDATE library_books SET deleted_at = NOW() WHERE id = :id");
            $stmt->execute(['id' => $id]);

            $this->success([], 'Book deleted successfully');
        } catch (\PDOException $e) {
            error_log('Failed to delete library book: ' . $e->getMessage());
            $this->error('Failed to delete library book', 500);
        }
    }

    /**
     * MIME type -> [our short type label, file extension to store]. PPTX (and DOCX/XLSX) are all
     * ZIP containers with identical magic bytes, so MIME/extension alone can't tell a renamed
     * .zip/.docx/.xlsx apart from a real .pptx - verifyFileContent() does the real check by
     * looking inside the archive for a PowerPoint-only entry.
     */
    private const ALLOWED_TYPES = [
        'application/pdf' => ['pdf', 'pdf'],
        'application/vnd.ms-powerpoint' => ['ppt', 'ppt'],
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' => ['pptx', 'pptx'],
    ];

    private const ALLOWED_EXTENSIONS = ['pdf', 'ppt', 'pptx'];

    private const REJECT_MESSAGE = 'Only PDF and PowerPoint (PPT/PPTX) files are allowed.';

    /**
     * Validate and store an uploaded PDF/PPT/PPTX, returning its public URL/type/size, or null
     * (having already sent an error response) if validation fails.
     */
    private function handleUpload(): ?array
    {
        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            $this->error('No file uploaded or upload error occurred', 400);
            return null;
        }

        $file = $_FILES['file'];

        if ($file['size'] > self::MAX_FILE_SIZE) {
            $this->error('File exceeds maximum size of 50MB', 400);
            return null;
        }

        // Extension is only ever used as a friendly early-out (and is never trusted for what
        // actually gets stored/served) - the real gate is the MIME sniff below plus the
        // post-move content check in verifyFileContent().
        $extension = strtolower((string) pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, self::ALLOWED_EXTENSIONS, true)) {
            $this->error(self::REJECT_MESSAGE, 400);
            return null;
        }

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!isset(self::ALLOWED_TYPES[$mimeType])) {
            $this->error(self::REJECT_MESSAGE, 400);
            return null;
        }

        [$type, $ext] = self::ALLOWED_TYPES[$mimeType];

        $uploadDir = __DIR__ . '/../../../public/uploads/' . self::UPLOAD_SUBDIR . '/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Never trust the original filename; generate a unique one from random bytes.
        $filename = 'library_' . bin2hex(random_bytes(8)) . '_' . time() . '.' . $ext;
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            $this->serverError('Failed to save uploaded file');
            return null;
        }

        // Re-validate actual file content after the move (MIME sniffing can be spoofed pre-upload).
        if (!$this->verifyFileContent($filepath, $type)) {
            unlink($filepath);
            $this->error(self::REJECT_MESSAGE, 400);
            return null;
        }

        return [
            'url' => '/uploads/' . self::UPLOAD_SUBDIR . '/' . $filename,
            'path' => $filepath,
            'type' => $type,
            'size' => (int) $file['size']
        ];
    }

    /**
     * Content-level check that the saved file really is what its MIME type claimed, run after
     * move_uploaded_file() so it's checking the actual bytes on disk. PDF and legacy .ppt each
     * have a distinct file-format signature; .pptx is an Office Open XML package, which is a ZIP
     * file - the ZIP signature alone doesn't distinguish it from a plain .zip or a renamed
     * .docx/.xlsx (same container format), so for pptx this also opens the archive and looks for
     * ppt/presentation.xml, an entry that only exists inside a genuine PowerPoint package.
     */
    private function verifyFileContent(string $filepath, string $type): bool
    {
        if ($type === 'pdf') {
            return substr((string) file_get_contents($filepath, false, null, 0, 5), 0, 5) === '%PDF-';
        }

        if ($type === 'ppt') {
            // Legacy binary PowerPoint files are OLE/CFBF compound documents (same container
            // format .doc/.xls also use) - the MIME sniff above is what actually distinguishes
            // them (libmagic reads into the OLE stream to identify the authoring application);
            // this is just a sanity check that it's a real OLE file at all.
            $header = (string) file_get_contents($filepath, false, null, 0, 8);
            return $header === "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1";
        }

        if ($type === 'pptx') {
            $signature = (string) file_get_contents($filepath, false, null, 0, 4);
            if ($signature !== "PK\x03\x04") {
                return false;
            }

            if (class_exists(\ZipArchive::class)) {
                $zip = new \ZipArchive();
                if ($zip->open($filepath) !== true) {
                    return false;
                }
                $hasPresentation = $zip->locateName('ppt/presentation.xml') !== false;
                $zip->close();
                return $hasPresentation;
            }

            // ZipArchive isn't compiled in on this server - fall back to a raw-byte scan for the
            // same entry name. A ZIP's per-entry filename sits in its (uncompressed) local file
            // header, so "ppt/presentation.xml" appears as literal text in the file regardless of
            // whether the entry's *content* is compressed - not as airtight as parsing the
            // central directory, but still rejects a plain .zip or a renamed .docx/.xlsx, which
            // don't contain that path at all.
            $contents = (string) file_get_contents($filepath);
            return str_contains($contents, 'ppt/presentation.xml');
        }

        return false;
    }
}
