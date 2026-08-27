<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;

/**
 * Teacher Item Bank Controller
 *
 * Handles PDF resource management for teachers - identical in shape and behavior to
 * Teacher\LibraryController, just backed by item_bank_questions instead of library_books.
 * Resources are scoped to the teacher's department, a subject in that department, and a class
 * in that department, and are only visible to students once published.
 */
class ItemBankController extends Controller
{
    private const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    private const UPLOAD_SUBDIR = 'itembank';

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
     * Get all resources uploaded by the teacher
     * GET /teacher/itembank
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

        $where = ['q.created_by = :teacher_id', 'q.deleted_at IS NULL'];
        $params = ['teacher_id' => $teacherId];

        if (!empty($status)) {
            $where[] = 'q.status = :status';
            $params['status'] = $status;
        }

        if (!empty($subjectId)) {
            $where[] = 'q.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if (!empty($search)) {
            $where[] = '(q.question_text LIKE :search OR q.explanation LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT q.id, q.subject_id, q.class_id, q.department_id, q.question_text as title,
                       q.explanation as description, q.file_path, q.file_type, q.file_size,
                       q.status, q.published_at, q.created_at, q.updated_at,
                       s.name as subject_name,
                       s.code as subject_code,
                       c.name as class_name,
                       c.level as class_level,
                       c.stream_name as class_stream_name
                FROM item_bank_questions q
                LEFT JOIN subjects s ON q.subject_id = s.id
                LEFT JOIN classes c ON q.class_id = c.id
                WHERE {$whereClause}
                ORDER BY q.updated_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $resources = $stmt->fetchAll();

        $this->success(['resources' => $resources]);
    }

    /**
     * "Preview as Student" - Item Bank exactly as a student enrolled in the given class would
     * see it (published resources scoped to this teacher's department + that class).
     * GET /teacher/itembank/preview?class_id=
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
        $this->success(['resources' => $service->getItemBankResources($departmentId, $classId)]);
    }

    /**
     * Get a single resource
     * GET /teacher/itembank/{id}
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

        $sql = "SELECT q.id, q.subject_id, q.class_id, q.department_id, q.question_text as title,
                       q.explanation as description, q.file_path, q.file_type, q.file_size,
                       q.status, q.published_at, q.created_at, q.updated_at,
                       s.name as subject_name,
                       s.code as subject_code,
                       c.name as class_name,
                       c.level as class_level,
                       c.stream_name as class_stream_name
                FROM item_bank_questions q
                LEFT JOIN subjects s ON q.subject_id = s.id
                LEFT JOIN classes c ON q.class_id = c.id
                WHERE q.id = :id AND q.created_by = :teacher_id AND q.deleted_at IS NULL";

        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $resource = $stmt->fetch();

        if (!$resource) {
            $this->notFound('Resource not found');
            return;
        }

        $this->success($resource);
    }

    /**
     * Upload a new PDF to the item bank
     * POST /teacher/itembank
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
            $this->error('Teacher must be assigned to a department to upload item bank resources', 403);
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

        $sanitizedData = [
            'title' => htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8'),
            'description' => !empty($data['description']) ? htmlspecialchars(trim($data['description']), ENT_QUOTES, 'UTF-8') : null,
            'subject_id' => (int) $data['subject_id'],
            'class_id' => $classTarget['class_id'],
            'class_group_name' => $classTarget['class_group_name'],
            'department_id' => $departmentId,
            'status' => $status
        ];

        $sql = "INSERT INTO item_bank_questions
                    (subject_id, class_id, class_group_name, department_id, question_text, question_type, difficulty,
                     file_path, file_type, file_size, explanation, correct_answer, created_by,
                     is_approved, status, published_at, created_at, updated_at)
                VALUES
                    (:subject_id, :class_id, :class_group_name, :department_id, :title, 'pdf', 'medium',
                     :file_path, :file_type, :file_size, :description, NULL, :created_by,
                     1, :status, :published_at, NOW(), NOW())";

        $stmt = $db->prepare($sql);

        try {
            $stmt->execute([
                'subject_id' => $sanitizedData['subject_id'],
                'class_id' => $sanitizedData['class_id'],
                'class_group_name' => $sanitizedData['class_group_name'],
                'department_id' => $sanitizedData['department_id'],
                'title' => $sanitizedData['title'],
                'file_path' => $upload['url'],
                'file_type' => $upload['type'],
                'file_size' => $upload['size'],
                'description' => $sanitizedData['description'],
                'created_by' => $teacherId,
                'status' => $sanitizedData['status'],
                'published_at' => $status === 'published' ? date('Y-m-d H:i:s') : null
            ]);

            $resourceId = (int) $db->lastInsertId();

            if ($sanitizedData['status'] === 'published') {
                (new NotificationService())->notifyDepartmentClass(
                    $sanitizedData['department_id'],
                    $sanitizedData['class_id'],
                    'new_item_bank_resource',
                    'New item bank resource',
                    "A new item bank resource \"{$sanitizedData['title']}\" is now available.",
                    ['resource_id' => $resourceId],
                    $sanitizedData['class_group_name']
                );
            }

            $this->success([
                'id' => $resourceId,
                'title' => $sanitizedData['title'],
                'status' => $sanitizedData['status']
            ], 'Resource uploaded successfully');
        } catch (\PDOException $e) {
            @unlink($upload['path']);
            error_log('Failed to save item bank resource: ' . $e->getMessage());
            $this->error('Failed to save resource', 500);
        }
    }

    /**
     * Update resource metadata (title/description/subject/class/status). The PDF itself is
     * immutable once uploaded - delete and re-upload to replace it.
     * PUT /teacher/itembank/{id}
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

        $stmt = $db->prepare("SELECT id, status, question_text AS title, department_id, class_id, class_group_name FROM item_bank_questions WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $resource = $stmt->fetch();

        if (!$resource) {
            $this->notFound('Resource not found');
            return;
        }

        $oldStatus = $resource['status'];
        $newStatus = $data['status'] ?? $oldStatus;

        $updates = [];
        $params = ['id' => $id];

        if (!empty($data['title'])) {
            $updates[] = 'question_text = :title';
            $params['title'] = htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8');
        }

        if (array_key_exists('description', $data)) {
            $desc = trim((string) $data['description']);
            $updates[] = 'explanation = :description';
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

        if (empty($updates)) {
            $this->error('No fields to update', 400);
            return;
        }

        $updates[] = 'updated_at = NOW()';
        $sql = "UPDATE item_bank_questions SET " . implode(', ', $updates) . " WHERE id = :id";

        try {
            $stmt = $db->prepare($sql);
            $stmt->execute($params);

            if ($oldStatus !== 'published' && $newStatus === 'published') {
                $updateSql = "UPDATE item_bank_questions SET published_at = NOW() WHERE id = :id";
                $updateStmt = $db->prepare($updateSql);
                $updateStmt->execute(['id' => $id]);

                $title = !empty($data['title']) ? trim($data['title']) : $resource['title'];
                $classId = $params['class_id'] ?? (int) $resource['class_id'];
                $classGroupName = $params['class_group_name'] ?? $resource['class_group_name'];
                (new NotificationService())->notifyDepartmentClass(
                    (int) $resource['department_id'],
                    $classId,
                    'new_item_bank_resource',
                    'New item bank resource',
                    "A new item bank resource \"{$title}\" is now available.",
                    ['resource_id' => $id],
                    $classGroupName
                );
            }

            $this->success([], 'Resource updated successfully');
        } catch (\PDOException $e) {
            error_log('Failed to update item bank resource: ' . $e->getMessage());
            $this->error('Failed to update resource', 500);
        }
    }

    /**
     * Delete a resource (soft delete)
     * DELETE /teacher/itembank/{id}
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

        $stmt = $db->prepare("SELECT id FROM item_bank_questions WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Resource not found');
            return;
        }

        try {
            $stmt = $db->prepare("UPDATE item_bank_questions SET deleted_at = NOW() WHERE id = :id");
            $stmt->execute(['id' => $id]);

            $this->success([], 'Resource deleted successfully');
        } catch (\PDOException $e) {
            error_log('Failed to delete item bank resource: ' . $e->getMessage());
            $this->error('Failed to delete resource', 500);
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
        $filename = 'itembank_' . bin2hex(random_bytes(8)) . '_' . time() . '.pdf';
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
