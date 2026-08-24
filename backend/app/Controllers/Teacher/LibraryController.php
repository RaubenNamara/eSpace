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

        $errors = $this->validateRequired(['title', 'subject_id', 'class_id']);
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

        // Verify class is one of the department's enrolled classes
        $stmt = $db->prepare(
            "SELECT DISTINCT c.id FROM classes c
             INNER JOIN student_department_enrollments se ON c.id = se.class_id
             WHERE c.id = :class_id AND se.department_id = :department_id
               AND se.deleted_at IS NULL AND c.deleted_at IS NULL"
        );
        $stmt->execute(['class_id' => $data['class_id'], 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->validationError(['class_id' => 'Class not found in your department']);
            return;
        }

        $upload = $this->handleUpload();
        if ($upload === null) {
            return; // handleUpload() already sent the error response
        }

        $status = in_array($data['status'] ?? 'draft', ['draft', 'published', 'archived'], true) ? $data['status'] : 'draft';

        $sanitizedData = [
            'title' => htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8'),
            'description' => !empty($data['description']) ? htmlspecialchars(trim($data['description']), ENT_QUOTES, 'UTF-8') : null,
            'subject_id' => (int) $data['subject_id'],
            'class_id' => (int) $data['class_id'],
            'department_id' => $departmentId,
            'status' => $status
        ];

        $sql = "INSERT INTO library_books
                    (title, description, subject_id, class_id, department_id, file_path, file_type, file_size,
                     uploaded_by, is_approved, status, published_at, created_at, updated_at)
                VALUES
                    (:title, :description, :subject_id, :class_id, :department_id, :file_path, :file_type, :file_size,
                     :uploaded_by, 1, :status, :published_at, NOW(), NOW())";

        $stmt = $db->prepare($sql);

        try {
            $stmt->execute(array_merge($sanitizedData, [
                'file_path' => $upload['url'],
                'file_type' => $upload['type'],
                'file_size' => $upload['size'],
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
                    ['book_id' => $bookId]
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
     * Update book metadata (title/description/subject/class/status). The PDF itself is
     * immutable once uploaded - delete and re-upload to replace it.
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

        $stmt = $db->prepare("SELECT id, status, title, department_id, class_id FROM library_books WHERE id = :id AND uploaded_by = :teacher_id AND deleted_at IS NULL");
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

        if (!empty($data['class_id'])) {
            $updates[] = 'class_id = :class_id';
            $params['class_id'] = (int) $data['class_id'];
        }

        if (!empty($data['status']) && in_array($data['status'], ['draft', 'published', 'archived'], true)) {
            $updates[] = 'status = :status';
            $params['status'] = $data['status'];
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
                $classId = !empty($data['class_id']) ? (int) $data['class_id'] : (int) $book['class_id'];
                (new NotificationService())->notifyDepartmentClass(
                    (int) $book['department_id'],
                    $classId,
                    'new_library_resource',
                    'New eLibrary resource',
                    "A new library resource \"{$title}\" is now available.",
                    ['book_id' => $id]
                );
            }

            $this->success([], 'Book updated successfully');
        } catch (\PDOException $e) {
            error_log('Failed to update library book: ' . $e->getMessage());
            $this->error('Failed to update library book', 500);
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
     * Validate and store the uploaded PDF, returning its public URL/type/size, or null (having
     * already sent an error response) if validation fails.
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

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if ($mimeType !== 'application/pdf') {
            $this->error('Invalid file type. Only PDF documents are allowed', 400);
            return null;
        }

        $uploadDir = __DIR__ . '/../../../public/uploads/' . self::UPLOAD_SUBDIR . '/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Never trust the original filename; generate a unique one from random bytes.
        $filename = 'library_' . bin2hex(random_bytes(8)) . '_' . time() . '.pdf';
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            $this->serverError('Failed to save uploaded file');
            return null;
        }

        // Re-validate actual file content after the move (MIME sniffing can be spoofed pre-upload).
        if (substr((string) file_get_contents($filepath, false, null, 0, 5), 0, 5) !== '%PDF-') {
            unlink($filepath);
            $this->error('Uploaded file is not a valid PDF', 400);
            return null;
        }

        return [
            'url' => '/uploads/' . self::UPLOAD_SUBDIR . '/' . $filename,
            'path' => $filepath,
            'type' => 'pdf',
            'size' => (int) $file['size']
        ];
    }
}
