<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Teacher Note Controller
 * 
 * Handles interactive e-notes management for teachers.
 * Supports rich media content including videos, images, GIFs, YouTube videos, and quotes.
 */
class NoteController extends Controller
{
    /**
     * Get database instance
     */
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Get current user ID from session
     */
    protected function getCurrentUserId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Get current teacher ID
     */
    private function getTeacherId(): ?int
    {
        // Dual-role HODs (assigned from an existing teacher account) carry their linked
        // teachers.id in session - see AuthService::createSession.
        if (($_SESSION['role'] ?? null) === 'hod') {
            return isset($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        }

        $userId = $this->getCurrentUserId();
        if (!$userId) {
            return null;
        }

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM teachers WHERE id = :user_id AND deleted_at IS NULL");
        $stmt->execute(['user_id' => $userId]);
        $teacher = $stmt->fetch();

        return $teacher ? (int) $teacher['id'] : null;
    }

    /**
     * Get all notes for the current teacher
     * GET /teacher/notes
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

        $search = $this->query('search', '');
        $subjectId = $this->query('subject_id', '');
        $isPublished = $this->query('is_published', '');
        $page = (int) $this->query('page', 1);
        $limit = (int) $this->query('limit', 20);

        $db = $this->getDb();
        
        // Build query
        $where = ['n.deleted_at IS NULL', 'n.created_by = :teacher_id'];
        $params = ['teacher_id' => $teacherId];

        if (!empty($search)) {
            $where[] = '(title LIKE :search OR content LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        if (!empty($subjectId)) {
            $where[] = 'subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if ($isPublished !== '') {
            $where[] = 'is_published = :is_published';
            $params['is_published'] = $isPublished;
        }

        $whereClause = implode(' AND ', $where);
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM notes n WHERE {$whereClause}";
        $countStmt = $db->prepare($countSql);
        $countStmt->execute($params);
        $total = (int) $countStmt->fetch()['total'];

        // Get paginated results with subject info
        $offset = ($page - 1) * $limit;
        $sql = "SELECT n.*, s.name as subject_name, s.code as subject_code
                FROM notes n
                LEFT JOIN subjects s ON n.subject_id = s.id
                WHERE {$whereClause}
                ORDER BY n.created_at DESC
                LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $notes = $stmt->fetchAll();

        $this->success([
            'notes' => $notes,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ]
        ]);
    }

    /**
     * Get a single note by ID
     * GET /teacher/notes/{id}
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

        $sql = "SELECT n.*, s.name as subject_name, s.code as subject_code
                FROM notes n
                LEFT JOIN subjects s ON n.subject_id = s.id
                WHERE n.id = :id AND n.created_by = :teacher_id AND n.deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $note = $stmt->fetch();

        if (!$note) {
            $this->notFound('Note not found');
            return;
        }

        $this->success($note);
    }

    /**
     * Create a new note
     * POST /teacher/notes
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

        // Validate required fields
        $errors = $this->validateRequired(['title', 'content', 'subject_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $db = $this->getDb();

        // Session-scoped active department (see Controller::getActiveDepartmentId()) - a
        // teacher in more than one department can switch this via PUT
        // /teacher/departments/active without changing their admin-set primary.
        $departmentId = $this->getActiveDepartmentId();

        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department to create notes', 403);
            return;
        }

        // Sanitize input (but keep HTML content for rich text)
        $sanitizedData = [
            'title' => htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8'),
            'subject_id' => (int) $data['subject_id'],
            'content' => $data['content'], // Keep HTML content
            'topic_id' => !empty($data['topic_id']) ? (int) $data['topic_id'] : null,
            'subtopic_id' => !empty($data['subtopic_id']) ? (int) $data['subtopic_id'] : null,
            'is_published' => !empty($data['is_published']) ? 1 : 0,
            // Auto-assign to teacher's department
            'assigned_to' => 'department',
            'assigned_id' => $departmentId
        ];

        // Verify subject exists and belongs to teacher's department
        $stmt = $db->prepare("SELECT id FROM subjects WHERE id = :subject_id AND department_id = :department_id");
        $stmt->execute(['subject_id' => $sanitizedData['subject_id'], 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->validationError(['subject_id' => 'Subject not found in your department']);
            return;
        }

        // Insert note
        $sql = "INSERT INTO notes (subject_id, topic_id, subtopic_id, title, content, created_by, is_published, assigned_to, assigned_id, created_at, updated_at)
                VALUES (:subject_id, :topic_id, :subtopic_id, :title, :content, :teacher_id, :is_published, :assigned_to, :assigned_id, NOW(), NOW())";
        
        $stmt = $db->prepare($sql);
        $params = array_merge($sanitizedData, ['teacher_id' => $teacherId]);
        
        try {
            $stmt->execute($params);
            $noteId = (int) $db->lastInsertId();

            // If publishing, set published_at
            if ($sanitizedData['is_published']) {
                $updateSql = "UPDATE notes SET published_at = NOW() WHERE id = :id";
                $updateStmt = $db->prepare($updateSql);
                $updateStmt->execute(['id' => $noteId]);
            }

            $this->success([
                'id' => $noteId,
                'title' => $sanitizedData['title'],
                'subject_id' => $sanitizedData['subject_id'],
                'is_published' => $sanitizedData['is_published'],
                'assigned_to' => 'department',
                'assigned_id' => $departmentId
            ], 'Note created successfully and assigned to your department');
        } catch (\PDOException $e) {
            error_log("Failed to create note: " . $e->getMessage());
            $this->error('Failed to create note', 500);
        }
    }

    /**
     * Update a note
     * PUT /teacher/notes/{id}
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
        
        // Check if note exists and belongs to teacher
        $stmt = $db->prepare("SELECT id, is_published FROM notes WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $note = $stmt->fetch();

        if (!$note) {
            $this->notFound('Note not found');
            return;
        }

        // Build update fields
        $updates = [];
        $params = ['id' => $id];

        $allowedFields = ['title', 'content', 'subject_id', 'topic_id', 'subtopic_id', 'is_published', 'assigned_to', 'assigned_id'];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                if ($field === 'title') {
                    $updates[] = "title = :title";
                    $params['title'] = htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8');
                } elseif ($field === 'content') {
                    $updates[] = "content = :content";
                    $params['content'] = $data['content']; // Keep HTML content
                } elseif (in_array($field, ['subject_id', 'topic_id', 'subtopic_id', 'assigned_id'])) {
                    $updates[] = "{$field} = :{$field}";
                    $params[$field] = !empty($data[$field]) ? (int) $data[$field] : null;
                } elseif ($field === 'is_published') {
                    $wasPublished = $note['is_published'];
                    $isNowPublished = $data['is_published'] ? 1 : 0;
                    $updates[] = "is_published = :is_published";
                    $params['is_published'] = $isNowPublished;
                    
                    // Set or clear published_at
                    if (!$wasPublished && $isNowPublished) {
                        $updates[] = "published_at = NOW()";
                    } elseif ($wasPublished && !$isNowPublished) {
                        $updates[] = "published_at = NULL";
                    }
                } else {
                    $updates[] = "{$field} = :{$field}";
                    $params[$field] = $data[$field];
                }
            }
        }

        if (!empty($updates)) {
            $updates[] = "updated_at = NOW()";
            $sql = "UPDATE notes SET " . implode(', ', $updates) . " WHERE id = :id";
            $stmt = $db->prepare($sql);
            
            try {
                $stmt->execute($params);
                $this->success([], 'Note updated successfully');
            } catch (\PDOException $e) {
                error_log("Failed to update note: " . $e->getMessage());
                $this->error('Failed to update note', 500);
            }
        } else {
            $this->validationError([], 'No fields to update');
        }
    }

    /**
     * Delete a note (soft delete)
     * DELETE /teacher/notes/{id}
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
        
        // Check if note exists and belongs to teacher
        $stmt = $db->prepare("SELECT id FROM notes WHERE id = :id AND created_by = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Note not found');
            return;
        }

        // Soft delete note
        $sql = "UPDATE notes SET deleted_at = NOW() WHERE id = :id";
        $stmt = $db->prepare($sql);
        
        try {
            $stmt->execute(['id' => $id]);
            $this->success([], 'Note deleted successfully');
        } catch (\PDOException $e) {
            error_log("Failed to delete note: " . $e->getMessage());
            $this->error('Failed to delete note', 500);
        }
    }

    /**
     * Upload media file for notes
     * POST /teacher/notes/upload
     */
    public function upload(): void
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

        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            $this->error('No file uploaded or upload error', 400);
            return;
        }

        $file = $_FILES['file'];
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
        $maxSize = 50 * 1024 * 1024; // 50MB

        if (!in_array($file['type'], $allowedTypes)) {
            $this->error('Invalid file type. Allowed types: JPEG, PNG, GIF, WebP, MP4, WebM', 400);
            return;
        }

        if ($file['size'] > $maxSize) {
            $this->error('File size exceeds 50MB limit', 400);
            return;
        }

        // Create upload directory if it doesn't exist
        $uploadDir = __DIR__ . '/../../../uploads/notes/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Generate unique filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid('note_', true) . '.' . $extension;
        $filepath = $uploadDir . $filename;

        if (move_uploaded_file($file['tmp_name'], $filepath)) {
            $url = '/uploads/notes/' . $filename;
            $this->success([
                'url' => $url,
                'filename' => $filename,
                'type' => $file['type'],
                'size' => $file['size']
            ], 'File uploaded successfully');
        } else {
            $this->error('Failed to move uploaded file', 500);
        }
    }

    /**
     * Get subjects for dropdown
     * GET /teacher/notes/subjects
     */
    public function subjects(): void
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

        $db = $this->getDb();

        // Session-scoped active department (see Controller::getActiveDepartmentId())
        $departmentId = $this->getActiveDepartmentId();

        if (!$departmentId) {
            $this->success(['subjects' => []]);
            return;
        }

        // Get subjects in teacher's department
        $stmt = $db->prepare("SELECT id, name, code FROM subjects WHERE department_id = :department_id AND deleted_at IS NULL ORDER BY name");
        $stmt->execute(['department_id' => $departmentId]);
        $subjects = $stmt->fetchAll();

        $this->success(['subjects' => $subjects]);
    }

    /**
     * Get topics for a subject
     * GET /teacher/notes/topics/{subject_id}
     */
    public function topics($subjectId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $subjectId = (int) $subjectId;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, name, code FROM topics WHERE subject_id = :subject_id AND deleted_at IS NULL ORDER BY name");
        $stmt->execute(['subject_id' => $subjectId]);
        $topics = $stmt->fetchAll();

        $this->success(['topics' => $topics]);
    }

    /**
     * Get subtopics for a topic
     * GET /teacher/notes/subtopics/{topic_id}
     */
    public function subtopics($topicId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $topicId = (int) $topicId;
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, name FROM subtopics WHERE topic_id = :topic_id AND deleted_at IS NULL ORDER BY name");
        $stmt->execute(['topic_id' => $topicId]);
        $subtopics = $stmt->fetchAll();

        $this->success(['subtopics' => $subtopics]);
    }
}
