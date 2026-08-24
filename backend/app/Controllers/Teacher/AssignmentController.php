<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
USE eSpace\Config\Database;
use eSpace\App\Services\NotificationService;
use Exception;

/**
 * Teacher Assignment Controller
 * 
 * Handles assignment management for teachers including CRUD operations,
 * question management, and submission grading.
 */
class AssignmentController extends Controller
{
    private const OBJECTIVE_TYPES = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'];

    // Every free-response question a teacher creates starts the student off with this document
    // pre-loaded in "Your Answer Space" (see FreeResponseAnswer.vue's autoCreateBlankCanvas()),
    // instead of a blank page - the teacher can still replace it per-question via the builder.
    private const DEFAULT_ANSWER_DOCUMENT_PATH = '/uploads/defaults/default_answer_sheet.pdf';
    private const DEFAULT_ANSWER_DOCUMENT_TYPE = 'pdf';

    /**
     * Get database instance
     */
    private function getDb()
    {
        return Database::getInstance();
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
     * Verify teacher owns the assignment
     */
    private function verifyAssignmentOwnership(int $assignmentId, int $teacherId): bool
    {
        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM assignments WHERE id = :assignment_id AND teacher_id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['assignment_id' => $assignmentId, 'teacher_id' => $teacherId]);
        return $stmt->fetch() !== false;
    }

    /**
     * Verify teacher owns the assignment a question belongs to.
     * Returns the owning assignment_id, or null if not owned/not found.
     */
    private function verifyQuestionOwnership(int $questionId, int $teacherId): ?int
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT a.id AS assignment_id
             FROM assignment_questions q
             INNER JOIN assignments a ON q.assignment_id = a.id
             WHERE q.id = :question_id AND a.teacher_id = :teacher_id
             AND a.deleted_at IS NULL AND q.deleted_at IS NULL"
        );
        $stmt->execute(['question_id' => $questionId, 'teacher_id' => $teacherId]);
        $row = $stmt->fetch();
        return $row ? (int) $row['assignment_id'] : null;
    }

    /**
     * List all assignments for the current teacher
     * GET /teacher/assignments
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

        $db = $this->getDb();
        
        $sql = "SELECT a.*,
                s.name as subject_name,
                c.name as class_name,
                c.stream_name as stream_name,
                COUNT(DISTINCT q.id) as question_count,
                COUNT(DISTINCT sub.id) as submission_count,
                COUNT(DISTINCT CASE WHEN sub.status = 'submitted' THEN sub.id END) as pending_submission_count
                FROM assignments a
                LEFT JOIN subjects s ON a.subject_id = s.id
                LEFT JOIN classes c ON a.class_id = c.id
                LEFT JOIN assignment_questions q ON a.id = q.assignment_id AND q.deleted_at IS NULL
                LEFT JOIN assignment_submissions sub ON a.id = sub.assignment_id AND sub.deleted_at IS NULL
                WHERE a.teacher_id = :teacher_id AND a.deleted_at IS NULL
                GROUP BY a.id
                ORDER BY a.created_at DESC";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['teacher_id' => $teacherId]);
        $assignments = $stmt->fetchAll();

        $this->success($assignments);
    }

    /**
     * Get a single assignment with questions
     * GET /teacher/assignments/{id}
     */
    public function show(): void
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

        $assignmentId = (int) $this->routeParam('id');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to access this assignment');
            return;
        }

        $db = $this->getDb();
        
        // Get assignment details
        $sql = "SELECT a.*,
                s.name as subject_name,
                c.name as class_name,
                c.stream_name as stream_name
                FROM assignments a
                LEFT JOIN subjects s ON a.subject_id = s.id
                LEFT JOIN classes c ON a.class_id = c.id
                WHERE a.id = :assignment_id AND a.deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['assignment_id' => $assignmentId]);
        $assignment = $stmt->fetch();

        if (!$assignment) {
            $this->notFound('Assignment not found');
            return;
        }

        // Get questions
        $sql = "SELECT q.*
                FROM assignment_questions q
                WHERE q.assignment_id = :assignment_id AND q.deleted_at IS NULL
                ORDER BY q.display_order ASC";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['assignment_id' => $assignmentId]);
        $questions = $stmt->fetchAll();

        // Get options for each question
        foreach ($questions as &$question) {
            $optionSql = "SELECT o.id, o.option_text, o.is_correct, o.display_order
                          FROM assignment_question_options o
                          WHERE o.question_id = :question_id
                          ORDER BY o.display_order ASC";
            $optionStmt = $db->prepare($optionSql);
            $optionStmt->execute(['question_id' => $question['id']]);
            $question['options'] = $optionStmt->fetchAll();
        }

        $assignment['questions'] = $questions;

        $this->success($assignment);
    }

    /**
     * "Preview as Student" - returns the assignment in exactly the shape/gating the student
     * "take assignment" screen expects (no answers/correct-answer flags beyond what the student
     * view itself would show), so the teacher can see precisely what a student sees.
     * GET /teacher/assignments/{id}/preview
     */
    public function preview(): void
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

        $assignmentId = (int) $this->routeParam('id');

        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to access this assignment');
            return;
        }

        $service = new \eSpace\App\Services\AssignmentPreviewService();
        $assignment = $service->getAssignmentMeta($assignmentId);

        if (!$assignment) {
            $this->notFound('Assignment not found');
            return;
        }

        $questions = $service->getQuestionsForPreview($assignmentId);
        $this->success($service->buildPreviewPayload($assignment, $questions));
    }

    /**
     * Create a new assignment
     * POST /teacher/assignments
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

        $required = ['title', 'total_marks', 'due_date'];
        $errors = $this->validateRequired($required, $data);
        
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            // Convert empty strings to null for foreign key fields
            $subjectId = (isset($data['subject_id']) && $data['subject_id'] !== '') ? $data['subject_id'] : null;
            $classId = (isset($data['class_id']) && $data['class_id'] !== '') ? $data['class_id'] : null;

            $sql = "INSERT INTO assignments (
                teacher_id, subject_id, class_id, title, description, type,
                total_marks, due_date, instructions, attachments, rubric,
                category, open_at, deadline_at, duration_minutes, pass_mark,
                allow_late_submission, attempts_allowed, shuffle_questions, shuffle_options,
                show_marks_immediately, show_answers_after_submission, allow_save_resume, status,
                is_published, academic_year, created_at, updated_at
            ) VALUES (
                :teacher_id, :subject_id, :class_id, :title, :description, :type,
                :total_marks, :due_date, :instructions, :attachments, :rubric,
                :category, :open_at, :deadline_at, :duration_minutes, :pass_mark,
                :allow_late_submission, :attempts_allowed, :shuffle_questions, :shuffle_options,
                :show_marks_immediately, :show_answers_after_submission, :allow_save_resume, :status,
                :is_published, :academic_year, NOW(), NOW()
            )";

            $stmt = $db->prepare($sql);
            $stmt->execute([
                'teacher_id' => $teacherId,
                'subject_id' => $subjectId,
                'class_id' => $classId,
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'type' => $data['type'] ?? 'mixed',
                'total_marks' => $data['total_marks'],
                'due_date' => $data['due_date'],
                'instructions' => $data['instructions'] ?? null,
                'attachments' => $data['attachments'] ?? null,
                'rubric' => $data['rubric'] ?? null,
                'category' => $data['category'] ?? null,
                'open_at' => $data['open_at'] ?? null,
                'deadline_at' => $data['deadline_at'] ?? $data['due_date'],
                'duration_minutes' => $data['duration_minutes'] ?? null,
                'pass_mark' => $data['pass_mark'] ?? null,
                'allow_late_submission' => $data['allow_late_submission'] ?? 1,
                'attempts_allowed' => $data['attempts_allowed'] ?? 1,
                'shuffle_questions' => $data['shuffle_questions'] ?? 0,
                'shuffle_options' => $data['shuffle_options'] ?? 0,
                'show_marks_immediately' => $data['show_marks_immediately'] ?? 0,
                'show_answers_after_submission' => $data['show_answers_after_submission'] ?? 0,
                'allow_save_resume' => $data['allow_save_resume'] ?? 1,
                'status' => $data['status'] ?? 'draft',
                'is_published' => $data['is_published'] ?? 0,
                'academic_year' => $data['academic_year'] ?? null
            ]);

            $assignmentId = Database::lastInsertId();

            Database::commit();

            $this->success(['id' => $assignmentId], 'Assignment created successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to create assignment: ' . $e->getMessage());
            error_log('Assignment creation failed: ' . $e->getMessage());
            error_log('Stack trace: ' . $e->getTraceAsString());
        }
    }

    /**
     * Update an existing assignment
     * PUT /teacher/assignments/{id}
     */
    public function update(): void
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

        $assignmentId = (int) $this->routeParam('id');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to edit this assignment');
            return;
        }

        $data = $this->input();

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            $updateFields = [];
            $params = ['assignment_id' => $assignmentId];

            $allowedFields = [
                'title', 'description', 'type', 'total_marks', 'due_date', 'instructions',
                'attachments', 'rubric', 'category', 'open_at', 'deadline_at', 'duration_minutes',
                'pass_mark', 'allow_late_submission', 'attempts_allowed', 'shuffle_questions',
                'shuffle_options', 'show_marks_immediately', 'show_answers_after_submission',
                'allow_save_resume', 'status', 'is_published', 'subject_id', 'class_id', 'academic_year'
            ];

            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    // Convert empty strings to null for foreign key fields
                    if (in_array($field, ['subject_id', 'class_id']) && $data[$field] === '') {
                        $data[$field] = null;
                    }
                    $updateFields[] = "$field = :$field";
                    $params[$field] = $data[$field];
                }
            }

            if (!empty($updateFields)) {
                $updateFields[] = "updated_at = NOW()";
                $sql = "UPDATE assignments SET " . implode(', ', $updateFields) . " WHERE id = :assignment_id AND deleted_at IS NULL";
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
            }

            Database::commit();

            $this->success([],'Assignment updated successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to update assignment');
            error_log('Assignment update failed: ' . $e->getMessage());
        }
    }

    /**
     * Delete an assignment (soft delete)
     * DELETE /teacher/assignments/{id}
     */
    public function delete(): void
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

        $assignmentId = (int) $this->routeParam('id');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to delete this assignment');
            return;
        }

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            $sql = "UPDATE assignments SET deleted_at = NOW() WHERE id = :assignment_id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['assignment_id' => $assignmentId]);

            Database::commit();

            $this->success([],'Assignment deleted successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to delete assignment');
            error_log('Assignment deletion failed: ' . $e->getMessage());
        }
    }

    /**
     * Publish an assignment
     * POST /teacher/assignments/{id}/publish
     */
    public function publish(): void
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

        $assignmentId = (int) $this->routeParam('id');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to publish this assignment');
            return;
        }

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            $sql = "UPDATE assignments SET status = 'published', is_published = 1, published_at = NOW(), updated_at = NOW() WHERE id = :assignment_id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['assignment_id' => $assignmentId]);

            Database::commit();

            $stmt = $db->prepare('SELECT title, class_id FROM assignments WHERE id = :id');
            $stmt->execute(['id' => $assignmentId]);
            $assignment = $stmt->fetch();
            if ($assignment) {
                (new NotificationService())->notifyClass(
                    $assignment['class_id'] !== null ? (int) $assignment['class_id'] : null,
                    'new_assessment',
                    'New assessment',
                    "A new assessment \"{$assignment['title']}\" has been posted.",
                    ['assignment_id' => $assignmentId]
                );
            }

            $this->success([],'Assignment published successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to publish assignment');
            error_log('Assignment publish failed: ' . $e->getMessage());
        }
    }

    /**
     * Duplicate an assignment
     * POST /teacher/assignments/{id}/duplicate
     */
    public function duplicate(): void
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

        $assignmentId = (int) $this->routeParam('id');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to duplicate this assignment');
            return;
        }

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            // Get the original assignment
            $sql = "SELECT * FROM assignments WHERE id = :assignment_id AND deleted_at IS NULL";
            $stmt = $db->prepare($sql);
            $stmt->execute(['assignment_id' => $assignmentId]);
            $original = $stmt->fetch();

            if (!$original) {
                $this->error('Assignment not found', 404);
                return;
            }

            // Create duplicate with modified title and status
            $sql = "INSERT INTO assignments (
                teacher_id, subject_id, class_id, title, description, type,
                total_marks, due_date, instructions, attachments, rubric,
                category, open_at, deadline_at, duration_minutes, pass_mark,
                allow_late_submission, attempts_allowed, shuffle_questions, shuffle_options,
                show_marks_immediately, show_answers_after_submission, allow_save_resume, status,
                is_published, academic_year, created_at, updated_at
            ) VALUES (
                :teacher_id, :subject_id, :class_id, :title, :description, :type,
                :total_marks, :due_date, :instructions, :attachments, :rubric,
                :category, :open_at, :deadline_at, :duration_minutes, :pass_mark,
                :allow_late_submission, :attempts_allowed, :shuffle_questions, :shuffle_options,
                :show_marks_immediately, :show_answers_after_submission, :allow_save_resume, :status,
                :is_published, :academic_year, NOW(), NOW()
            )";

            $stmt = $db->prepare($sql);
            $stmt->execute([
                'teacher_id' => $teacherId,
                'subject_id' => $original['subject_id'],
                'class_id' => $original['class_id'],
                'title' => $original['title'] . ' (Copy)',
                'description' => $original['description'],
                'type' => $original['type'],
                'total_marks' => $original['total_marks'],
                'due_date' => $original['due_date'],
                'instructions' => $original['instructions'],
                'attachments' => $original['attachments'],
                'rubric' => $original['rubric'],
                'category' => $original['category'],
                'open_at' => $original['open_at'],
                'deadline_at' => $original['deadline_at'],
                'duration_minutes' => $original['duration_minutes'],
                'pass_mark' => $original['pass_mark'],
                'allow_late_submission' => $original['allow_late_submission'],
                'attempts_allowed' => $original['attempts_allowed'],
                'shuffle_questions' => $original['shuffle_questions'],
                'shuffle_options' => $original['shuffle_options'],
                'show_marks_immediately' => $original['show_marks_immediately'],
                'show_answers_after_submission' => $original['show_answers_after_submission'],
                'allow_save_resume' => $original['allow_save_resume'],
                'status' => 'draft',
                'is_published' => 0,
                'academic_year' => $original['academic_year']
            ]);

            $newAssignmentId = Database::lastInsertId();

            // Duplicate questions
            $sql = "SELECT * FROM assignment_questions WHERE assignment_id = :assignment_id AND deleted_at IS NULL ORDER BY display_order";
            $stmt = $db->prepare($sql);
            $stmt->execute(['assignment_id' => $assignmentId]);
            $questions = $stmt->fetchAll();

            foreach ($questions as $question) {
                // Carry over the original question's attachment if it had one, otherwise fall
                // back to the default answer document for free-response types (same rule as
                // creating a brand-new question).
                $dupIsObjective = in_array($question['question_type'], self::OBJECTIVE_TYPES, true);
                $dupAttachmentPath = $question['attachment_path'] ?? (!$dupIsObjective ? self::DEFAULT_ANSWER_DOCUMENT_PATH : null);
                $dupAttachmentType = $question['attachment_path'] ? ($question['attachment_type'] ?? self::DEFAULT_ANSWER_DOCUMENT_TYPE) : (!$dupIsObjective ? self::DEFAULT_ANSWER_DOCUMENT_TYPE : 'none');

                $sql = "INSERT INTO assignment_questions (
                    assignment_id, parent_question_id, question_type, question_text, scenario_text,
                    marks, display_order, allow_drawing, attachment_path, attachment_type, created_at, updated_at
                ) VALUES (
                    :assignment_id, :parent_question_id, :question_type, :question_text, :scenario_text,
                    :marks, :display_order, :allow_drawing, :attachment_path, :attachment_type, NOW(), NOW()
                )";

                $stmt = $db->prepare($sql);
                $stmt->execute([
                    'assignment_id' => $newAssignmentId,
                    'parent_question_id' => $question['parent_question_id'],
                    'question_type' => $question['question_type'],
                    'question_text' => $question['question_text'],
                    'scenario_text' => $question['scenario_text'],
                    'marks' => $question['marks'],
                    'display_order' => $question['display_order'],
                    'allow_drawing' => $question['allow_drawing'],
                    'attachment_path' => $dupAttachmentPath,
                    'attachment_type' => $dupAttachmentType
                ]);

                $newQuestionId = Database::lastInsertId();

                // Duplicate options for this question
                $sql = "SELECT * FROM assignment_question_options WHERE question_id = :question_id ORDER BY display_order";
                $stmt = $db->prepare($sql);
                $stmt->execute(['question_id' => $question['id']]);
                $options = $stmt->fetchAll();

                foreach ($options as $option) {
                    $sql = "INSERT INTO assignment_question_options (question_id, option_text, is_correct, display_order, created_at, updated_at)
                            VALUES (:question_id, :option_text, :is_correct, :display_order, NOW(), NOW())";
                    $stmt = $db->prepare($sql);
                    $stmt->execute([
                        'question_id' => $newQuestionId,
                        'option_text' => $option['option_text'],
                        'is_correct' => $option['is_correct'],
                        'display_order' => $option['display_order']
                    ]);
                }
            }

            Database::commit();

            $this->success(['id' => $newAssignmentId], 'Assignment duplicated successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to duplicate assignment: ' . $e->getMessage());
            error_log('Assignment duplication failed: ' . $e->getMessage());
        }
    }

    /**
     * Add a question to an assignment
     * POST /teacher/assignments/{id}/questions
     */
    public function addQuestion(): void
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

        $assignmentId = (int) $this->routeParam('id');

        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to add questions to this assignment');
            return;
        }

        $data = $this->input();

        // For scenario questions, scenario_text is required instead of question_text
        if ($data['question_type'] === 'scenario') {
            $required = ['question_type', 'marks'];
            if (empty($data['scenario_text'])) {
                $this->validationError(['scenario_text' => 'Scenario text is required']);
                return;
            }
        } else {
            $required = ['question_type', 'question_text', 'marks'];
        }
        
        $errors = $this->validateRequired($required, $data);
        
        if (!empty($errors)) {
            error_log('addQuestion validation errors: ' . json_encode($errors));
            $this->validationError($errors);
            return;
        }

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            // Get next display order
            $stmt = $db->prepare("SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM assignment_questions WHERE assignment_id = :assignment_id AND deleted_at IS NULL");
            $stmt->execute(['assignment_id' => $assignmentId]);
            $nextOrder = $stmt->fetch()['next_order'];

            // Every free-response question starts with the default answer document pre-loaded,
            // unless the teacher explicitly set their own attachment for this question.
            $isObjective = in_array($data['question_type'], self::OBJECTIVE_TYPES, true);
            $attachmentPath = $data['attachment_path'] ?? (!$isObjective ? self::DEFAULT_ANSWER_DOCUMENT_PATH : null);
            $attachmentType = $data['attachment_type'] ?? (!$isObjective && $attachmentPath ? self::DEFAULT_ANSWER_DOCUMENT_TYPE : 'none');

            $sql = "INSERT INTO assignment_questions (
                assignment_id, parent_question_id, question_type, question_text, scenario_text,
                marks, display_order, allow_drawing, response_type, attachment_path, attachment_type, created_at, updated_at
            ) VALUES (
                :assignment_id, :parent_question_id, :question_type, :question_text, :scenario_text,
                :marks, :display_order, :allow_drawing, :response_type, :attachment_path, :attachment_type, NOW(), NOW()
            )";

            $stmt = $db->prepare($sql);
            $stmt->execute([
                'assignment_id' => $assignmentId,
                'parent_question_id' => $data['parent_question_id'] ?? null,
                'question_type' => $data['question_type'],
                'question_text' => $data['question_text'] ?? null,
                'scenario_text' => $data['scenario_text'] ?? null,
                'response_type' => $data['response_type'] ?? 'text',
                'marks' => $data['marks'],
                'display_order' => $data['display_order'] ?? $nextOrder,
                'allow_drawing' => $data['allow_drawing'] ?? 0,
                'attachment_path' => $attachmentPath,
                'attachment_type' => $attachmentType
            ]);

            $questionId = Database::lastInsertId();

            // Add options if provided (for objective questions)
            if (isset($data['options']) && is_array($data['options']) && in_array($data['question_type'], ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'])) {
                foreach ($data['options'] as $index => $option) {
                    $sql = "INSERT INTO assignment_question_options (question_id, option_text, is_correct, display_order, created_at, updated_at)
                            VALUES (:question_id, :option_text, :is_correct, :display_order, NOW(), NOW())";
                    $stmt = $db->prepare($sql);
                    $stmt->execute([
                        'question_id' => $questionId,
                        'option_text' => $option['option_text'],
                        'is_correct' => $option['is_correct'] ?? 0,
                        'display_order' => $index
                    ]);
                }
            }

            // Add sub-questions if provided (for scenario questions) - always free-response, so
            // they get the same default answer document as any other free-response question.
            if (isset($data['sub_questions']) && is_array($data['sub_questions']) && $data['question_type'] === 'scenario') {
                foreach ($data['sub_questions'] as $index => $subQuestion) {
                    $sql = "INSERT INTO assignment_questions (
                        assignment_id, parent_question_id, question_type, question_text,
                        marks, display_order, attachment_path, attachment_type, created_at, updated_at
                    ) VALUES (
                        :assignment_id, :parent_question_id, 'short_answer', :question_text,
                        :marks, :display_order, :attachment_path, :attachment_type, NOW(), NOW()
                    )";
                    $stmt = $db->prepare($sql);
                    $stmt->execute([
                        'assignment_id' => $assignmentId,
                        'parent_question_id' => $questionId,
                        'attachment_path' => self::DEFAULT_ANSWER_DOCUMENT_PATH,
                        'attachment_type' => self::DEFAULT_ANSWER_DOCUMENT_TYPE,
                        'question_text' => $subQuestion['question_text'],
                        'marks' => $subQuestion['marks'],
                        'display_order' => $subQuestion['display_order'] ?? $index
                    ]);
                }
            }

            Database::commit();

            $this->success(['id' => $questionId], 'Question added successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to add question');
            error_log('Question addition failed: ' . $e->getMessage());
        }
    }

    /**
     * Update a question
     * PUT /teacher/assignments/{id}/questions/{questionId}
     */
    public function updateQuestion(): void
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

        $assignmentId = (int) $this->routeParam('id');
        $questionId = (int) $this->routeParam('questionId');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to edit this question');
            return;
        }

        $data = $this->input();

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            $updateFields = [];
            $params = ['question_id' => $questionId];

            $allowedFields = ['question_text', 'scenario_text', 'marks', 'display_order', 'allow_drawing', 'response_type'];
            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $updateFields[] = "$field = :$field";
                    $params[$field] = $data[$field];
                }
            }

            if (!empty($updateFields)) {
                $updateFields[] = "updated_at = NOW()";
                $sql = "UPDATE assignment_questions SET " . implode(', ', $updateFields) . " WHERE id = :question_id AND assignment_id = :assignment_id AND deleted_at IS NULL";
                $params['assignment_id'] = $assignmentId;
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
            }

            // Update options if provided
            if (isset($data['options']) && is_array($data['options'])) {
                // Delete existing options
                $stmt = $db->prepare("DELETE FROM assignment_question_options WHERE question_id = :question_id");
                $stmt->execute(['question_id' => $questionId]);

                // Add new options
                foreach ($data['options'] as $index => $option) {
                    $sql = "INSERT INTO assignment_question_options (question_id, option_text, is_correct, display_order, created_at, updated_at)
                            VALUES (:question_id, :option_text, :is_correct, :display_order, NOW(), NOW())";
                    $stmt = $db->prepare($sql);
                    $stmt->execute([
                        'question_id' => $questionId,
                        'option_text' => $option['option_text'],
                        'is_correct' => $option['is_correct'] ?? 0,
                        'display_order' => $index
                    ]);
                }
            }

            // Update sub-questions if provided (for scenario questions)
            if (isset($data['sub_questions']) && is_array($data['sub_questions'])) {
                // Soft-delete existing sub-questions no longer present, then replace
                $stmt = $db->prepare("UPDATE assignment_questions SET deleted_at = NOW() WHERE parent_question_id = :question_id");
                $stmt->execute(['question_id' => $questionId]);

                foreach ($data['sub_questions'] as $index => $subQuestion) {
                    $sql = "INSERT INTO assignment_questions (
                        assignment_id, parent_question_id, question_type, question_text,
                        marks, display_order, attachment_path, attachment_type, created_at, updated_at
                    ) VALUES (
                        :assignment_id, :parent_question_id, 'short_answer', :question_text,
                        :marks, :display_order, :attachment_path, :attachment_type, NOW(), NOW()
                    )";
                    $stmt = $db->prepare($sql);
                    $stmt->execute([
                        'assignment_id' => $assignmentId,
                        'attachment_path' => self::DEFAULT_ANSWER_DOCUMENT_PATH,
                        'attachment_type' => self::DEFAULT_ANSWER_DOCUMENT_TYPE,
                        'parent_question_id' => $questionId,
                        'question_text' => $subQuestion['question_text'],
                        'marks' => $subQuestion['marks'],
                        'display_order' => $subQuestion['display_order'] ?? $index
                    ]);
                }
            }

            Database::commit();

            $this->success([],'Question updated successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to update question');
            error_log('Question update failed: ' . $e->getMessage());
        }
    }

    /**
     * Delete a question (soft delete)
     * DELETE /teacher/assignments/{id}/questions/{questionId}
     */
    public function deleteQuestion(): void
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

        $assignmentId = (int) $this->routeParam('id');
        $questionId = (int) $this->routeParam('questionId');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to delete this question');
            return;
        }

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            $sql = "UPDATE assignment_questions SET deleted_at = NOW() WHERE id = :question_id AND assignment_id = :assignment_id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['question_id' => $questionId, 'assignment_id' => $assignmentId]);

            Database::commit();

            $this->success([],'Question deleted successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to delete question');
            error_log('Question deletion failed: ' . $e->getMessage());
        }
    }

    /**
     * Get submissions for an assignment
     * GET /teacher/assignments/{id}/submissions
     */
    public function submissions(): void
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

        $assignmentId = (int) $this->routeParam('id');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to view submissions for this assignment');
            return;
        }

        $db = $this->getDb();
        
        $sql = "SELECT sub.*,
                CONCAT(s.first_name, ' ', s.last_name) as student_name,
                s.email as student_email
                FROM assignment_submissions sub
                JOIN students s ON sub.student_id = s.id
                WHERE sub.assignment_id = :assignment_id AND sub.deleted_at IS NULL
                ORDER BY sub.submitted_at DESC";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['assignment_id' => $assignmentId]);
        $submissions = $stmt->fetchAll();

        $this->success($submissions);
    }

    /**
     * Get a single submission with answers
     * GET /teacher/assignments/{id}/submissions/{submissionId}
     */
    public function submission(): void
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

        $assignmentId = (int) $this->routeParam('id');
        $submissionId = (int) $this->routeParam('submissionId');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to view this submission');
            return;
        }

        $db = $this->getDb();
        
        // Get submission details
        $sql = "SELECT sub.*,
                CONCAT(s.first_name, ' ', s.last_name) as student_name,
                s.email as student_email,
                a.title as assignment_title
                FROM assignment_submissions sub
                JOIN students s ON sub.student_id = s.id
                JOIN assignments a ON sub.assignment_id = a.id
                WHERE sub.id = :submission_id AND sub.assignment_id = :assignment_id AND sub.deleted_at IS NULL";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['submission_id' => $submissionId, 'assignment_id' => $assignmentId]);
        $submission = $stmt->fetch();

        if (!$submission) {
            $this->notFound('Submission not found');
            return;
        }

        // Get answers
        $sql = "SELECT ans.*, 
                q.question_text, q.question_type, q.marks as question_marks, q.scenario_text
                FROM assignment_answers ans
                JOIN assignment_questions q ON ans.question_id = q.id
                WHERE ans.submission_id = :submission_id
                ORDER BY q.display_order ASC";
        
        $stmt = $db->prepare($sql);
        $stmt->execute(['submission_id' => $submissionId]);
        $answers = $stmt->fetchAll();

        $submission['answers'] = $answers;

        $this->success($submission);
    }

    /**
     * Grade a submission
     * POST /teacher/assignments/{id}/submissions/{submissionId}/grade
     */
    public function grade(): void
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

        $assignmentId = (int) $this->routeParam('id');
        $submissionId = (int) $this->routeParam('submissionId');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to grade this submission');
            return;
        }

        $data = $this->input();

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            // Update submission
            $sql = "UPDATE assignment_submissions 
                    SET manual_score = :manual_score, 
                        total_score = :total_score,
                        percentage = :percentage,
                        marked_by = :marked_by,
                        marked_at = NOW(),
                        status = 'graded',
                        updated_at = NOW()
                    WHERE id = :submission_id";
            
            $stmt = $db->prepare($sql);
            $stmt->execute([
                'manual_score' => $data['manual_score'] ?? null,
                'total_score' => $data['total_score'],
                'percentage' => $data['percentage'],
                'marked_by' => $teacherId,
                'submission_id' => $submissionId
            ]);

            // Update individual answer marks if provided
            if (isset($data['answers']) && is_array($data['answers'])) {
                foreach ($data['answers'] as $answerData) {
                    $sql = "UPDATE assignment_answers 
                            SET manual_mark = :manual_mark,
                                teacher_feedback = :teacher_feedback,
                                marked_at = NOW(),
                                updated_at = NOW()
                            WHERE id = :answer_id AND submission_id = :submission_id";
                    
                    $stmt = $db->prepare($sql);
                    $stmt->execute([
                        'manual_mark' => $answerData['manual_mark'] ?? null,
                        'teacher_feedback' => $answerData['teacher_feedback'] ?? null,
                        'answer_id' => $answerData['id'],
                        'submission_id' => $submissionId
                    ]);
                }
            }

            Database::commit();

            $this->success([],'Submission graded successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to grade submission');
            error_log('Submission grading failed: ' . $e->getMessage());
        }
    }

    /**
     * Add feedback to a submission
     * POST /teacher/assignments/{id}/submissions/{submissionId}/feedback
     */
    public function feedback(): void
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

        $assignmentId = (int) $this->routeParam('id');
        $submissionId = (int) $this->routeParam('submissionId');
        
        if (!$this->verifyAssignmentOwnership($assignmentId, $teacherId)) {
            $this->forbidden('You do not have permission to add feedback to this submission');
            return;
        }

        $data = $this->input();

        $db = $this->getDb();

        try {
            Database::beginTransaction();

            $sql = "UPDATE assignment_submissions 
                    SET feedback = :feedback, updated_at = NOW()
                    WHERE id = :submission_id";
            
            $stmt = $db->prepare($sql);
            $stmt->execute([
                'feedback' => $data['feedback'],
                'submission_id' => $submissionId
            ]);

            Database::commit();

            $this->success([],'Feedback added successfully');

        } catch (Exception $e) {
            Database::rollback();
            $this->serverError('Failed to add feedback');
            error_log('Feedback addition failed: ' . $e->getMessage());
        }
    }

    /**
     * Get subjects (departments) for dropdown
     * GET /teacher/subjects
     */
    public function subjects(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();

        try {
            $db = $this->getDb();
            
            // Get departments (subjects) - subjects are stored in departments table
            $sql = "SELECT id, name, code 
                    FROM departments 
                    WHERE deleted_at IS NULL
                    ORDER BY name ASC";
            
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $subjects = $stmt->fetchAll();

            $this->success($subjects);

        } catch (Exception $e) {
            $this->serverError('Failed to load subjects');
            error_log('Subjects loading failed: ' . $e->getMessage());
        }
    }

    /**
     * Get classes for dropdown
     * GET /teacher/classes
     */
    public function classes(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        try {
            $db = $this->getDb();
            
            // Get all classes from classes table
            $sql = "SELECT id, name, grade_level 
                    FROM classes 
                    WHERE deleted_at IS NULL
                    ORDER BY grade_level ASC, name ASC";
            
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $classes = $stmt->fetchAll();

            $this->success($classes);

        } catch (Exception $e) {
            $this->serverError('Failed to load classes');
            error_log('Classes loading failed: ' . $e->getMessage());
        }
    }

    /**
     * Get streams for a class
     * GET /teacher/streams/{classId}
     */
    public function streams(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $classId = $this->routeParam('classId');

        try {
            $db = $this->getDb();
            
            // Get streams from classes table (streams are stored as a column or related table)
            // Assuming streams are stored in a separate streams table linked to classes
            $sql = "SELECT id, name 
                    FROM streams 
                    WHERE class_id = :class_id
                    AND deleted_at IS NULL
                    ORDER BY name ASC";
            
            $stmt = $db->prepare($sql);
            $stmt->execute(['class_id' => $classId]);
            $streams = $stmt->fetchAll();

            $this->success($streams);

        } catch (Exception $e) {
            $this->serverError('Failed to load streams');
            error_log('Streams loading failed: ' . $e->getMessage());
        }
    }

    /**
     * Upload a source image/PDF attachment for a canvas/pdf_annotation question
     * POST /teacher/assignments/questions/{questionId}/attachment
     */
    public function uploadQuestionAttachment(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $questionId = (int) $this->routeParam('questionId');

        if (!$this->verifyQuestionOwnership($questionId, $teacherId)) {
            $this->forbidden('You do not have permission to modify this question');
            return;
        }

        if (!isset($_FILES['attachment']) || $_FILES['attachment']['error'] !== UPLOAD_ERR_OK) {
            $this->error('No file uploaded or upload error occurred', 400);
            return;
        }

        $file = $_FILES['attachment'];
        $maxSize = 20 * 1024 * 1024; // 20MB

        if ($file['size'] > $maxSize) {
            $this->error('File exceeds maximum size of 20MB', 400);
            return;
        }

        $allowedMime = [
            'image/jpeg' => ['type' => 'image', 'ext' => 'jpg'],
            'image/png' => ['type' => 'image', 'ext' => 'png'],
            'image/gif' => ['type' => 'image', 'ext' => 'gif'],
            'image/webp' => ['type' => 'image', 'ext' => 'webp'],
            'application/pdf' => ['type' => 'pdf', 'ext' => 'pdf'],
        ];

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!isset($allowedMime[$mimeType])) {
            $this->error('Invalid file type. Only JPEG, PNG, GIF, WebP images or PDF documents are allowed', 400);
            return;
        }

        $attachmentType = $allowedMime[$mimeType]['type'];
        $extension = $allowedMime[$mimeType]['ext'];

        $uploadDir = __DIR__ . '/../../../public/uploads/assignments/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Never trust the original filename; generate a unique one from random bytes.
        $filename = 'question_' . $questionId . '_' . bin2hex(random_bytes(8)) . '_' . time() . '.' . $extension;
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            $this->serverError('Failed to save uploaded file');
            return;
        }

        // Re-validate actual file content after the move (MIME sniffing can be spoofed pre-upload).
        if ($attachmentType === 'image' && @getimagesize($filepath) === false) {
            unlink($filepath);
            $this->error('Uploaded file is not a valid image', 400);
            return;
        }

        if ($attachmentType === 'pdf' && substr((string) file_get_contents($filepath, false, null, 0, 5), 0, 5) !== '%PDF-') {
            unlink($filepath);
            $this->error('Uploaded file is not a valid PDF', 400);
            return;
        }

        $url = '/uploads/assignments/' . $filename;

        try {
            $db = $this->getDb();
            $stmt = $db->prepare(
                "UPDATE assignment_questions SET attachment_path = :path, attachment_type = :type, updated_at = NOW() WHERE id = :id"
            );
            $stmt->execute(['path' => $url, 'type' => $attachmentType, 'id' => $questionId]);

            $this->success(['attachment_path' => $url, 'attachment_type' => $attachmentType], 'Attachment uploaded successfully');
        } catch (Exception $e) {
            unlink($filepath);
            $this->serverError('Failed to save attachment reference');
            error_log('Attachment save failed: ' . $e->getMessage());
        }
    }

    /**
     * Get the teacher's authoring annotations for a question, grouped by page
     * GET /teacher/assignments/questions/{questionId}/annotations
     */
    public function getQuestionAnnotations(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $questionId = (int) $this->routeParam('questionId');

        if (!$this->verifyQuestionOwnership($questionId, $teacherId)) {
            $this->forbidden('You do not have permission to view this question');
            return;
        }

        try {
            $db = $this->getDb();
            $stmt = $db->prepare("SELECT page_number, annotation_data FROM question_annotations WHERE question_id = :question_id ORDER BY page_number ASC");
            $stmt->execute(['question_id' => $questionId]);
            $rows = $stmt->fetchAll();

            $pages = [];
            foreach ($rows as $row) {
                $pages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
            }

            $this->success(['pages' => $pages]);
        } catch (Exception $e) {
            $this->serverError('Failed to load question annotations');
            error_log('Question annotations load failed: ' . $e->getMessage());
        }
    }

    /**
     * Save (upsert) the teacher's authoring annotations for one page of a question
     * PUT /teacher/assignments/questions/{questionId}/annotations
     */
    public function saveQuestionAnnotations(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $questionId = (int) $this->routeParam('questionId');

        if (!$this->verifyQuestionOwnership($questionId, $teacherId)) {
            $this->forbidden('You do not have permission to modify this question');
            return;
        }

        $data = $this->input();
        $pageNumber = (int) ($data['page_number'] ?? 1);
        $annotationData = is_array($data['annotation_data'] ?? null) ? $data['annotation_data'] : [];

        try {
            $db = $this->getDb();
            $stmt = $db->prepare("SELECT id FROM question_annotations WHERE question_id = :question_id AND page_number = :page_number");
            $stmt->execute(['question_id' => $questionId, 'page_number' => $pageNumber]);
            $existing = $stmt->fetch();

            if ($existing) {
                $stmt = $db->prepare("UPDATE question_annotations SET annotation_data = :data, updated_at = NOW() WHERE id = :id");
                $stmt->execute(['data' => json_encode($annotationData), 'id' => $existing['id']]);
            } else {
                $stmt = $db->prepare(
                    "INSERT INTO question_annotations (question_id, teacher_id, page_number, annotation_data, created_at, updated_at)
                     VALUES (:question_id, :teacher_id, :page_number, :data, NOW(), NOW())"
                );
                $stmt->execute([
                    'question_id' => $questionId,
                    'teacher_id' => $teacherId,
                    'page_number' => $pageNumber,
                    'data' => json_encode($annotationData),
                ]);
            }

            $this->success([],'Annotations saved successfully');
        } catch (Exception $e) {
            $this->serverError('Failed to save question annotations');
            error_log('Question annotations save failed: ' . $e->getMessage());
        }
    }
}
