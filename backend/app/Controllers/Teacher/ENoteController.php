<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;
use eSpace\App\Utils\HtmlSanitizer;

/**
 * Teacher eNotes Controller
 * 
 * Handles eNotes topic and page management for teachers.
 * Topics are automatically assigned to the teacher's department.
 */
class ENoteController extends Controller
{
    /**
     * Get database instance
     */
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Get current teacher ID from session
     */
    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Decode the stored learning_outcomes JSON column back into a plain array for the API
     * response (single topic row, e.g. from show()/create()).
     */
    private function decodeLearningOutcomes(array $topic): array
    {
        $topic['learning_outcomes'] = !empty($topic['learning_outcomes'])
            ? (json_decode($topic['learning_outcomes'], true) ?: [])
            : [];
        return $topic;
    }

    /**
     * Normalize a learning-outcomes payload (expected as an array of strings, one per
     * ordered list item) into the JSON string stored in enote_topics.learning_outcomes.
     * Blank entries are dropped so removing text from an item removes it from the list.
     */
    private function sanitizeLearningOutcomes($outcomes): ?string
    {
        if (!is_array($outcomes)) {
            return null;
        }

        $cleaned = [];
        foreach ($outcomes as $outcome) {
            $text = trim((string) $outcome);
            if ($text !== '') {
                $cleaned[] = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
            }
        }

        return empty($cleaned) ? null : json_encode(array_values($cleaned));
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
     * Get dashboard statistics
     * GET /teacher/enotes/dashboard
     */
    public function dashboard(): void
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

        // Get statistics
        $stats = [
            'total' => 0,
            'draft' => 0,
            'published' => 0,
            'archived' => 0,
            'recently_updated' => []
        ];

        // Count by status
        $sql = "SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
                    SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
                    SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived
                FROM enote_topics 
                WHERE teacher_id = :teacher_id AND deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['teacher_id' => $teacherId]);
        $result = $stmt->fetch();

        if ($result) {
            $stats['total'] = (int) $result['total'];
            $stats['draft'] = (int) $result['draft'];
            $stats['published'] = (int) $result['published'];
            $stats['archived'] = (int) $result['archived'];
        }

        // Get recently updated topics
        $sql = "SELECT et.id, et.title, et.status, et.updated_at, s.name as subject_name, c.name as class_name
                FROM enote_topics et
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN classes c ON et.class_id = c.id
                WHERE et.teacher_id = :teacher_id AND et.deleted_at IS NULL
                ORDER BY et.updated_at DESC
                LIMIT 5";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['teacher_id' => $teacherId]);
        $stats['recently_updated'] = $stmt->fetchAll();

        $this->success($stats);
    }

    /**
     * Get all topics for the teacher
     * GET /teacher/enotes/topics
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
        $page = (int) $this->query('page', 1);
        $limit = (int) $this->query('limit', 20);

        $db = $this->getDb();

        $where = ['et.teacher_id = :teacher_id', 'et.deleted_at IS NULL'];
        $params = ['teacher_id' => $teacherId];

        if (!empty($status)) {
            $where[] = 'et.status = :status';
            $params['status'] = $status;
        }

        if (!empty($subjectId)) {
            $where[] = 'et.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if (!empty($search)) {
            $where[] = '(et.title LIKE :search OR et.description LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        $whereClause = implode(' AND ', $where);

        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM enote_topics et WHERE {$whereClause}";
        $countStmt = $db->prepare($countSql);
        $countStmt->execute($params);
        $total = (int) $countStmt->fetch()['total'];

        // Get paginated results
        $offset = ($page - 1) * $limit;
        $sql = "SELECT et.*,
                       s.name as subject_name,
                       s.code as subject_code,
                       c.name as class_name,
                       c.level as class_level,
                       c.stream_name as class_stream_name
                FROM enote_topics et
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN classes c ON et.class_id = c.id
                WHERE {$whereClause}
                ORDER BY et.updated_at DESC
                LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $topics = array_map([$this, 'decodeLearningOutcomes'], $stmt->fetchAll());

        $this->success([
            'topics' => $topics,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ]
        ]);
    }

    /**
     * "Preview as Student" - eNotes topics exactly as a student enrolled in the given class
     * would see them (published topics scoped to this teacher's department + that class, from
     * any teacher in the department, not just this one).
     * GET /teacher/enotes/preview?class_id=
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
        $this->success(['topics' => $service->getENoteTopics($departmentId, $classId)]);
    }

    /**
     * A single eNote topic (with pages) for "Preview as Student" - published-only, scoped to
     * department/class rather than teacher ownership, so any teacher's published topic in the
     * department can be previewed.
     * GET /teacher/enotes/preview/topics/{id}?class_id=
     */
    public function previewShow($id): void
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

        $service = new \eSpace\App\Services\StudentModulePreviewService();
        $topic = $service->getENoteTopicForPreview((int) $id, $departmentId, $classId);

        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }

        $this->success($topic);
    }

    /**
     * Get a single topic with its pages
     * GET /teacher/enotes/topics/{id}
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

        // Get topic
        $sql = "SELECT et.*, 
                       s.name as subject_name, 
                       s.code as subject_code,
                       c.name as class_name
                FROM enote_topics et
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN classes c ON et.class_id = c.id
                WHERE et.id = :id AND et.teacher_id = :teacher_id AND et.deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $topic = $stmt->fetch();

        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }

        $topic = $this->decodeLearningOutcomes($topic);

        // Get pages ordered by order_number
        $sql = "SELECT * FROM enote_pages
                WHERE topic_id = :topic_id AND deleted_at IS NULL
                ORDER BY order_number ASC";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['topic_id' => $id]);
        $pages = $stmt->fetchAll();

        // Log page content for debugging
        foreach ($pages as $index => $page) {
            error_log("ENoteController: Page {$index} (ID: {$page['id']}) content: " . substr($page['content'], 0, 500));
        }

        $topic['pages'] = $this->attachNarrations($pages);

        $this->success($topic);
    }

    /**
     * Attach cached narrations (one entry per voice that's been generated) to each page, with an
     * is_stale flag when the page's content has changed since that voice's narration was made.
     */
    private function attachNarrations(array $pages): array
    {
        if (empty($pages)) {
            return $pages;
        }

        $db = $this->getDb();
        $pageIds = array_column($pages, 'id');
        $placeholders = implode(',', array_fill(0, count($pageIds), '?'));

        $stmt = $db->prepare(
            "SELECT page_id, voice, audio_path, content_hash, updated_at FROM enote_page_narrations WHERE page_id IN ({$placeholders})"
        );
        $stmt->execute($pageIds);

        $byPage = [];
        foreach ($stmt->fetchAll() as $row) {
            $byPage[(int) $row['page_id']][] = $row;
        }

        foreach ($pages as &$page) {
            $currentHash = hash('sha256', $page['content']);
            $narrations = [];
            foreach ($byPage[(int) $page['id']] ?? [] as $row) {
                $narrations[] = [
                    'voice' => $row['voice'],
                    'audio_path' => $row['audio_path'],
                    'is_stale' => $row['content_hash'] !== $currentHash,
                    'generated_at' => $row['updated_at'],
                ];
            }
            $page['narrations'] = $narrations;
        }
        unset($page);

        return $pages;
    }

    /**
     * Set the AI voice used for this topic's narration (applies to every page in it)
     * PUT /teacher/enotes/topics/{id}/narration-voice
     */
    public function updateNarrationVoice($id): void
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
        $voice = $data['voice'] ?? '';

        if (!in_array($voice, \eSpace\App\Services\ElevenLabsTTSService::VOICES, true)) {
            $this->validationError(['voice' => 'Invalid voice']);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM enote_topics WHERE id = :id AND teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Topic not found');
            return;
        }

        $stmt = $db->prepare("UPDATE enote_topics SET narration_voice = :voice, updated_at = NOW() WHERE id = :id");
        $stmt->execute(['voice' => $voice, 'id' => $id]);

        $this->success(['narration_voice' => $voice], 'Narration voice updated');
    }

    /**
     * Generate (or regenerate) AI narration for a page in the given voice. Cached per
     * (page, voice) - regenerating just refreshes the cached audio and content hash for that
     * voice, it doesn't discard narrations already generated for other voices.
     * POST /teacher/enotes/pages/{pageId}/narration
     */
    public function generatePageNarration($pageId): void
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

        $pageId = (int) $pageId;
        $data = $this->input();
        $voice = $data['voice'] ?? '';

        if (!in_array($voice, \eSpace\App\Services\ElevenLabsTTSService::VOICES, true)) {
            $this->validationError(['voice' => 'Invalid voice']);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT p.id, p.content FROM enote_pages p
             INNER JOIN enote_topics et ON p.topic_id = et.id
             WHERE p.id = :page_id AND et.teacher_id = :teacher_id AND p.deleted_at IS NULL AND et.deleted_at IS NULL"
        );
        $stmt->execute(['page_id' => $pageId, 'teacher_id' => $teacherId]);
        $page = $stmt->fetch();

        if (!$page) {
            $this->notFound('Page not found');
            return;
        }

        $tts = new \eSpace\App\Services\ElevenLabsTTSService();

        try {
            $text = $tts->htmlToSpeechText($page['content']);
            $audio = $tts->synthesize($text, $voice);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 502);
            return;
        }

        $uploadDir = __DIR__ . '/../../../public/uploads/enote-narration/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = "narration_{$pageId}_{$voice}_" . bin2hex(random_bytes(6)) . '.mp3';
        $filepath = $uploadDir . $filename;

        if (file_put_contents($filepath, $audio) === false) {
            $this->serverError('Failed to save narration audio');
            return;
        }

        $contentHash = hash('sha256', $page['content']);
        $audioUrl = '/uploads/enote-narration/' . $filename;

        try {
            // Delete the old audio file for this (page, voice) before overwriting the row, so
            // regenerating doesn't leak orphaned mp3s on disk.
            $stmt = $db->prepare("SELECT audio_path FROM enote_page_narrations WHERE page_id = :page_id AND voice = :voice");
            $stmt->execute(['page_id' => $pageId, 'voice' => $voice]);
            $existing = $stmt->fetch();
            if ($existing) {
                $oldPath = __DIR__ . '/../../../public' . $existing['audio_path'];
                if (is_file($oldPath)) {
                    @unlink($oldPath);
                }
            }

            $stmt = $db->prepare(
                "INSERT INTO enote_page_narrations (page_id, voice, audio_path, content_hash, created_at, updated_at)
                 VALUES (:page_id, :voice, :audio_path, :content_hash, NOW(), NOW())
                 ON DUPLICATE KEY UPDATE audio_path = :audio_path2, content_hash = :content_hash2, updated_at = NOW()"
            );
            $stmt->execute([
                'page_id' => $pageId,
                'voice' => $voice,
                'audio_path' => $audioUrl,
                'content_hash' => $contentHash,
                'audio_path2' => $audioUrl,
                'content_hash2' => $contentHash,
            ]);
        } catch (\PDOException $e) {
            @unlink($filepath);
            error_log('Failed to save narration record: ' . $e->getMessage());
            $this->error('Failed to save narration', 500);
            return;
        }

        $this->success([
            'voice' => $voice,
            'audio_path' => $audioUrl,
            'is_stale' => false,
            'generated_at' => date('Y-m-d H:i:s'),
        ], 'Narration generated');
    }

    /**
     * Create a new topic
     * POST /teacher/enotes/topics
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
        $errors = $this->validateRequired(['title', 'subject_id', 'class_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $db = $this->getDb();

        // Get teacher's department
        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department to create eNotes', 403);
            return;
        }

        // Verify subject belongs to teacher's department
        $stmt = $db->prepare("SELECT id FROM subjects WHERE id = :subject_id AND department_id = :department_id");
        $stmt->execute(['subject_id' => $data['subject_id'], 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->validationError(['subject_id' => 'Subject not found in your department']);
            return;
        }

        // Verify class is one of the department's enrolled classes (same scope the
        // assignments() endpoint offers in the dropdown, streams included)
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

        // Sanitize input
        $sanitizedData = [
            'title' => htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8'),
            'subject_id' => (int) $data['subject_id'],
            'department_id' => $departmentId,
            'class_id' => (int) $data['class_id'],
            'description' => !empty($data['description']) ? htmlspecialchars(trim($data['description']), ENT_QUOTES, 'UTF-8') : null,
            'learning_outcomes' => $this->sanitizeLearningOutcomes($data['learning_outcomes'] ?? null),
            'status' => $data['status'] ?? 'draft'
        ];

        // Insert topic
        $sql = "INSERT INTO enote_topics (teacher_id, class_id, subject_id, department_id, title, description, learning_outcomes, status, created_at, updated_at)
                VALUES (:teacher_id, :class_id, :subject_id, :department_id, :title, :description, :learning_outcomes, :status, NOW(), NOW())";
        
        $stmt = $db->prepare($sql);
        $params = array_merge($sanitizedData, ['teacher_id' => $teacherId]);
        
        try {
            $stmt->execute($params);
            $topicId = (int) $db->lastInsertId();

            // If publishing, set published_at
            if ($sanitizedData['status'] === 'published') {
                $updateSql = "UPDATE enote_topics SET published_at = NOW() WHERE id = :id";
                $updateStmt = $db->prepare($updateSql);
                $updateStmt->execute(['id' => $topicId]);

                (new NotificationService())->notifyDepartmentClass(
                    $sanitizedData['department_id'],
                    $sanitizedData['class_id'],
                    'new_enote',
                    'New eNote',
                    "A new eNote topic \"{$sanitizedData['title']}\" is now available.",
                    ['topic_id' => $topicId]
                );
            }

            $this->success([
                'id' => $topicId,
                'title' => $sanitizedData['title'],
                'status' => $sanitizedData['status']
            ], 'Topic created successfully');
        } catch (\PDOException $e) {
            error_log("Failed to create topic: " . $e->getMessage());
            $this->error('Failed to create topic', 500);
        }
    }

    /**
     * Update a topic
     * PUT /teacher/enotes/topics/{id}
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

        // Verify topic belongs to teacher
        $stmt = $db->prepare("SELECT id, status FROM enote_topics WHERE id = :id AND teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $topic = $stmt->fetch();

        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }

        $oldStatus = $topic['status'];
        $newStatus = $data['status'] ?? $oldStatus;

        // Sanitize input
        $updates = [];
        $params = ['id' => $id];

        if (!empty($data['title'])) {
            $updates[] = 'title = :title';
            $params['title'] = htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8');
        }

        if (!empty($data['description'])) {
            $updates[] = 'description = :description';
            $params['description'] = htmlspecialchars(trim($data['description']), ENT_QUOTES, 'UTF-8');
        }

        if (array_key_exists('learning_outcomes', $data)) {
            $updates[] = 'learning_outcomes = :learning_outcomes';
            $params['learning_outcomes'] = $this->sanitizeLearningOutcomes($data['learning_outcomes']);
        }

        if (!empty($data['class_id'])) {
            $updates[] = 'class_id = :class_id';
            $params['class_id'] = (int) $data['class_id'];
        }

        if (!empty($data['status'])) {
            $updates[] = 'status = :status';
            $params['status'] = $data['status'];
        }

        if (empty($updates)) {
            $this->error('No fields to update', 400);
            return;
        }

        $updates[] = 'updated_at = NOW()';
        $sql = "UPDATE enote_topics SET " . implode(', ', $updates) . " WHERE id = :id";

        try {
            $stmt = $db->prepare($sql);
            $stmt->execute($params);

            // Handle status changes
            if ($oldStatus !== 'published' && $newStatus === 'published') {
                $updateSql = "UPDATE enote_topics SET published_at = NOW() WHERE id = :id";
                $updateStmt = $db->prepare($updateSql);
                $updateStmt->execute(['id' => $id]);
            } elseif ($oldStatus === 'published' && $newStatus === 'archived') {
                $updateSql = "UPDATE enote_topics SET archived_at = NOW() WHERE id = :id";
                $updateStmt = $db->prepare($updateSql);
                $updateStmt->execute(['id' => $id]);
            }

            $this->success([], 'Topic updated successfully');
        } catch (\PDOException $e) {
            error_log("Failed to update topic: " . $e->getMessage());
            $this->error('Failed to update topic', 500);
        }
    }

    /**
     * Delete a topic (soft delete)
     * DELETE /teacher/enotes/topics/{id}
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

        // Verify topic belongs to teacher
        $stmt = $db->prepare("SELECT id FROM enote_topics WHERE id = :id AND teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Topic not found');
            return;
        }

        try {
            $sql = "UPDATE enote_topics SET deleted_at = NOW() WHERE id = :id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['id' => $id]);

            // Also soft delete pages
            $sql = "UPDATE enote_pages SET deleted_at = NOW() WHERE topic_id = :topic_id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['topic_id' => $id]);

            $this->success([], 'Topic deleted successfully');
        } catch (\PDOException $e) {
            error_log("Failed to delete topic: " . $e->getMessage());
            $this->error('Failed to delete topic', 500);
        }
    }

    /**
     * Publish a topic
     * POST /teacher/enotes/topics/{id}/publish
     */
    public function publish($id): void
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

        // Verify topic belongs to teacher
        $stmt = $db->prepare("SELECT id, title, department_id, class_id FROM enote_topics WHERE id = :id AND teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $topic = $stmt->fetch();
        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }

        try {
            $sql = "UPDATE enote_topics SET status = 'published', published_at = NOW(), updated_at = NOW() WHERE id = :id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['id' => $id]);

            (new NotificationService())->notifyDepartmentClass(
                (int) $topic['department_id'],
                $topic['class_id'] !== null ? (int) $topic['class_id'] : null,
                'new_enote',
                'New eNote',
                "A new eNote topic \"{$topic['title']}\" is now available.",
                ['topic_id' => $id]
            );

            $this->success([], 'Topic published successfully');
        } catch (\PDOException $e) {
            error_log("Failed to publish topic: " . $e->getMessage());
            $this->error('Failed to publish topic', 500);
        }
    }

    /**
     * Unpublish a topic
     * POST /teacher/enotes/topics/{id}/unpublish
     */
    public function unpublish($id): void
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

        // Verify topic belongs to teacher
        $stmt = $db->prepare("SELECT id FROM enote_topics WHERE id = :id AND teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Topic not found');
            return;
        }

        try {
            $sql = "UPDATE enote_topics SET status = 'draft', published_at = NULL, updated_at = NOW() WHERE id = :id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['id' => $id]);

            $this->success([], 'Topic unpublished successfully');
        } catch (\PDOException $e) {
            error_log("Failed to unpublish topic: " . $e->getMessage());
            $this->error('Failed to unpublish topic', 500);
        }
    }

    /**
     * Archive a topic
     * POST /teacher/enotes/topics/{id}/archive
     */
    public function archive($id): void
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

        // Verify topic belongs to teacher
        $stmt = $db->prepare("SELECT id FROM enote_topics WHERE id = :id AND teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Topic not found');
            return;
        }

        try {
            $sql = "UPDATE enote_topics SET status = 'archived', archived_at = NOW(), updated_at = NOW() WHERE id = :id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['id' => $id]);

            $this->success([], 'Topic archived successfully');
        } catch (\PDOException $e) {
            error_log("Failed to archive topic: " . $e->getMessage());
            $this->error('Failed to archive topic', 500);
        }
    }

    /**
     * Create a new page
     * POST /teacher/enotes/topics/{topic_id}/pages
     */
    public function createPage($topicId): void
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

        $topicId = (int) $topicId;
        $data = $this->input();

        // Validate required fields (content is optional for new pages)
        $errors = $this->validateRequired(['title']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $db = $this->getDb();

        // Verify topic belongs to teacher
        $stmt = $db->prepare("SELECT id FROM enote_topics WHERE id = :topic_id AND teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['topic_id' => $topicId, 'teacher_id' => $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Topic not found');
            return;
        }

        // Get next order number
        $stmt = $db->prepare("SELECT MAX(order_number) as max_order FROM enote_pages WHERE topic_id = :topic_id AND deleted_at IS NULL");
        $stmt->execute(['topic_id' => $topicId]);
        $result = $stmt->fetch();
        $nextOrder = ($result && $result['max_order']) ? (int) $result['max_order'] + 1 : 1;

        // Sanitize input
        $originalContent = $data['content'] ?? '';
        error_log('ENoteController: Original content before sanitization: ' . substr($originalContent, 0, 500));
        
        $sanitizedData = [
            'title' => htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8'),
            'content' => isset($data['content']) ? HtmlSanitizer::sanitize($data['content']) : '', // Sanitize HTML content
            'order_number' => $nextOrder
        ];
        
        error_log('ENoteController: Sanitized content: ' . substr($sanitizedData['content'], 0, 500));

        // Insert page
        $sql = "INSERT INTO enote_pages (topic_id, order_number, title, content, created_at, updated_at)
                VALUES (:topic_id, :order_number, :title, :content, NOW(), NOW())";
        
        $stmt = $db->prepare($sql);
        $params = array_merge($sanitizedData, ['topic_id' => $topicId]);
        
        try {
            $stmt->execute($params);
            $pageId = (int) $db->lastInsertId();

            // Update topic total pages
            $updateSql = "UPDATE enote_topics SET total_pages = total_pages + 1, updated_at = NOW() WHERE id = :topic_id";
            $updateStmt = $db->prepare($updateSql);
            $updateStmt->execute(['topic_id' => $topicId]);

            $this->success([
                'id' => $pageId,
                'title' => $sanitizedData['title'],
                'order_number' => $sanitizedData['order_number']
            ], 'Page created successfully');
        } catch (\PDOException $e) {
            error_log("Failed to create page: " . $e->getMessage());
            $this->error('Failed to create page', 500);
        }
    }

    /**
     * Update a page
     * PUT /teacher/enotes/pages/{id}
     */
    public function updatePage($id): void
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

        // Verify page belongs to teacher's topic
        $sql = "SELECT ep.id, ep.topic_id 
                FROM enote_pages ep
                INNER JOIN enote_topics et ON ep.topic_id = et.id
                WHERE ep.id = :id AND et.teacher_id = :teacher_id AND ep.deleted_at IS NULL AND et.deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $page = $stmt->fetch();

        if (!$page) {
            $this->notFound('Page not found');
            return;
        }

        $topicId = (int) $page['topic_id'];

        // Sanitize input
        $updates = [];
        $params = ['id' => $id];

        if (!empty($data['title'])) {
            $updates[] = 'title = :title';
            $params['title'] = htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8');
        }

        if (!empty($data['content'])) {
            $updates[] = 'content = :content';
            // Sanitize HTML content to prevent XSS
            $originalContent = $data['content'];
            error_log('ENoteController: Original content before sanitization (update): ' . substr($originalContent, 0, 500));
            $sanitizedContent = HtmlSanitizer::sanitize($data['content']);
            error_log('ENoteController: Sanitized content (update): ' . substr($sanitizedContent, 0, 500));
            $params['content'] = $sanitizedContent;
        }

        if (isset($data['is_active'])) {
            $updates[] = 'is_active = :is_active';
            $params['is_active'] = $data['is_active'] ? 1 : 0;
        }

        if (empty($updates)) {
            $this->error('No fields to update', 400);
            return;
        }

        $updates[] = 'updated_at = NOW()';
        $sql = "UPDATE enote_pages SET " . implode(', ', $updates) . " WHERE id = :id";

        try {
            $stmt = $db->prepare($sql);
            $stmt->execute($params);

            // Update topic updated_at
            $updateSql = "UPDATE enote_topics SET updated_at = NOW() WHERE id = :topic_id";
            $updateStmt = $db->prepare($updateSql);
            $updateStmt->execute(['topic_id' => $topicId]);

            $this->success([], 'Page updated successfully');
        } catch (\PDOException $e) {
            error_log("Failed to update page: " . $e->getMessage());
            $this->error('Failed to update page', 500);
        }
    }

    /**
     * Delete a page (soft delete)
     * DELETE /teacher/enotes/pages/{id}
     */
    public function deletePage($id): void
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

        // Verify page belongs to teacher's topic
        $sql = "SELECT ep.id, ep.topic_id, ep.order_number 
                FROM enote_pages ep
                INNER JOIN enote_topics et ON ep.topic_id = et.id
                WHERE ep.id = :id AND et.teacher_id = :teacher_id AND ep.deleted_at IS NULL AND et.deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $page = $stmt->fetch();

        if (!$page) {
            $this->notFound('Page not found');
            return;
        }

        $topicId = (int) $page['topic_id'];
        $deletedOrder = (int) $page['order_number'];

        try {
            // Soft delete page
            $sql = "UPDATE enote_pages SET deleted_at = NOW() WHERE id = :id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['id' => $id]);

            // Reorder remaining pages
            $sql = "UPDATE enote_pages SET order_number = order_number - 1 
                    WHERE topic_id = :topic_id AND order_number > :deleted_order AND deleted_at IS NULL";
            $stmt = $db->prepare($sql);
            $stmt->execute(['topic_id' => $topicId, 'deleted_order' => $deletedOrder]);

            // Update topic total pages
            $updateSql = "UPDATE enote_topics SET total_pages = total_pages - 1, updated_at = NOW() WHERE id = :topic_id";
            $updateStmt = $db->prepare($updateSql);
            $updateStmt->execute(['topic_id' => $topicId]);

            $this->success([], 'Page deleted successfully');
        } catch (\PDOException $e) {
            error_log("Failed to delete page: " . $e->getMessage());
            $this->error('Failed to delete page', 500);
        }
    }

    /**
     * Duplicate a page
     * POST /teacher/enotes/pages/{id}/duplicate
     */
    public function duplicatePage($id): void
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

        // Verify page belongs to teacher's topic
        $sql = "SELECT ep.*, et.teacher_id 
                FROM enote_pages ep
                INNER JOIN enote_topics et ON ep.topic_id = et.id
                WHERE ep.id = :id AND et.teacher_id = :teacher_id AND ep.deleted_at IS NULL AND et.deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'teacher_id' => $teacherId]);
        $page = $stmt->fetch();

        if (!$page) {
            $this->notFound('Page not found');
            return;
        }

        $topicId = (int) $page['topic_id'];

        // Get next order number
        $stmt = $db->prepare("SELECT MAX(order_number) as max_order FROM enote_pages WHERE topic_id = :topic_id AND deleted_at IS NULL");
        $stmt->execute(['topic_id' => $topicId]);
        $result = $stmt->fetch();
        $nextOrder = ($result && $result['max_order']) ? (int) $result['max_order'] + 1 : 1;

        try {
            // Duplicate page
            $sql = "INSERT INTO enote_pages (topic_id, order_number, title, content, is_active, created_at, updated_at)
                    VALUES (:topic_id, :order_number, :title, :content, :is_active, NOW(), NOW())";
            
            $stmt = $db->prepare($sql);
            $stmt->execute([
                'topic_id' => $topicId,
                'order_number' => $nextOrder,
                'title' => $page['title'] . ' (Copy)',
                'content' => $page['content'],
                'is_active' => $page['is_active']
            ]);

            $newPageId = (int) $db->lastInsertId();

            // Update topic total pages
            $updateSql = "UPDATE enote_topics SET total_pages = total_pages + 1, updated_at = NOW() WHERE id = :topic_id";
            $updateStmt = $db->prepare($updateSql);
            $updateStmt->execute(['topic_id' => $topicId]);

            $this->success([
                'id' => $newPageId,
                'title' => $page['title'] . ' (Copy)',
                'order_number' => $nextOrder
            ], 'Page duplicated successfully');
        } catch (\PDOException $e) {
            error_log("Failed to duplicate page: " . $e->getMessage());
            $this->error('Failed to duplicate page', 500);
        }
    }

    /**
     * Reorder pages
     * POST /teacher/enotes/topics/{topic_id}/reorder
     */
    public function reorderPages($topicId): void
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

        $topicId = (int) $topicId;
        $data = $this->input();

        if (empty($data['page_orders']) || !is_array($data['page_orders'])) {
            $this->validationError(['page_orders' => 'Page orders array is required']);
            return;
        }

        $db = $this->getDb();

        // Verify topic belongs to teacher
        $stmt = $db->prepare("SELECT id FROM enote_topics WHERE id = :topic_id AND teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['topic_id' => $topicId, 'teacher_id' => $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Topic not found');
            return;
        }

        try {
            $db->beginTransaction();

            foreach ($data['page_orders'] as $pageOrder) {
                $pageId = (int) $pageOrder['id'];
                $newOrder = (int) $pageOrder['order_number'];

                $sql = "UPDATE enote_pages SET order_number = :order_number, updated_at = NOW() 
                        WHERE id = :id AND topic_id = :topic_id AND deleted_at IS NULL";
                $stmt = $db->prepare($sql);
                $stmt->execute(['id' => $pageId, 'order_number' => $newOrder, 'topic_id' => $topicId]);
            }

            $db->commit();

            // Update topic updated_at
            $updateSql = "UPDATE enote_topics SET updated_at = NOW() WHERE id = :topic_id";
            $updateStmt = $db->prepare($updateSql);
            $updateStmt->execute(['topic_id' => $topicId]);

            $this->success([], 'Pages reordered successfully');
        } catch (\PDOException $e) {
            $db->rollBack();
            error_log("Failed to reorder pages: " . $e->getMessage());
            $this->error('Failed to reorder pages', 500);
        }
    }

    /**
     * Get assigned classes and subjects for the teacher
     * GET /teacher/enotes/assignments
     */
    public function assignments(): void
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

        // Get teacher's department
        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department', 403);
            return;
        }

        try {
            // Get subjects from teacher's department
            $sql = "SELECT id, name, code FROM subjects WHERE department_id = :department_id AND deleted_at IS NULL ORDER BY name ASC";
            $stmt = $db->prepare($sql);
            $stmt->execute(['department_id' => $departmentId]);
            $subjects = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // Get enrolled classes (like TeacherClasses - using student_department_enrollments)
            $sql = "SELECT DISTINCT c.id, c.name, c.level, c.stream_name
                    FROM classes c
                    INNER JOIN student_department_enrollments se ON c.id = se.class_id
                    WHERE se.department_id = :department_id
                    AND se.deleted_at IS NULL
                    AND c.deleted_at IS NULL
                    GROUP BY c.id, c.name, c.level, c.stream_name
                    ORDER BY c.level, c.name";
            $stmt = $db->prepare($sql);
            $stmt->execute(['department_id' => $departmentId]);
            $classes = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // Debug logging
            error_log("ENote assignments: teacher_id=$teacherId, department_id=$departmentId");
            error_log("ENote assignments: subjects count=" . count($subjects));
            error_log("ENote assignments: classes count=" . count($classes));

            $this->success([
                'subjects' => $subjects,
                'classes' => $classes,
                'department_id' => $departmentId
            ]);
        } catch (\PDOException $e) {
            error_log("ENote assignments error: " . $e->getMessage());
            $this->error('Failed to load assignments: ' . $e->getMessage(), 500);
        }
    }
}
