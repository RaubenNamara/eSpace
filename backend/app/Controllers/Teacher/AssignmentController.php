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
     * Validates the optional assessment_category value. Returns null for "not curriculum-aligned"
     * (every assignment created before this feature, and any teacher who opts out), the
     * upper-cased LOA/AOI/EOC string when valid, or false when the caller passed something else
     * (the route handler turns that into a validation error).
     * @return string|null|false
     */
    private function normalizeAssessmentCategory($rawValue)
    {
        if ($rawValue === null || $rawValue === '') {
            return null;
        }
        $value = strtoupper(trim((string) $rawValue));
        return in_array($value, ['LOA', 'AOI', 'EOC'], true) ? $value : false;
    }

    /**
     * A curriculum topic is only linkable to an assignment if it was authored for that
     * assignment's own subject - prevents a teacher from wiring in another department's
     * curriculum data by editing the request (subject_id itself is already re-validated against
     * the teacher's own department in create()/update(), so this check transitively keeps
     * curriculum linkage within that same boundary).
     */
    private function curriculumTopicMatchesSubject(int $curriculumTopicId, $subjectId): bool
    {
        if (empty($subjectId)) {
            return false;
        }
        $stmt = $this->getDb()->prepare(
            'SELECT id FROM enote_curriculum_topics WHERE id = :id AND subject_id = :subject_id AND deleted_at IS NULL'
        );
        $stmt->execute(['id' => $curriculumTopicId, 'subject_id' => (int) $subjectId]);
        return (bool) $stmt->fetch();
    }

    /**
     * A Construct is only linkable to an assignment if it was authored for that assignment's own
     * subject - same boundary rule as curriculumTopicMatchesSubject().
     */
    private function constructBelongsToSubject(int $constructId, $subjectId): bool
    {
        if (empty($subjectId)) {
            return false;
        }
        $stmt = $this->getDb()->prepare(
            'SELECT id FROM constructs WHERE id = :id AND subject_id = :subject_id AND deleted_at IS NULL'
        );
        $stmt->execute(['id' => $constructId, 'subject_id' => (int) $subjectId]);
        return (bool) $stmt->fetch();
    }

    /**
     * @param int[] $outcomeIds
     */
    private function learningOutcomesBelongToTopic(array $outcomeIds, int $curriculumTopicId): bool
    {
        if (empty($outcomeIds)) {
            return false;
        }
        $placeholders = implode(',', array_fill(0, count($outcomeIds), '?'));
        $stmt = $this->getDb()->prepare(
            "SELECT COUNT(*) AS c FROM enote_learning_outcomes WHERE id IN ({$placeholders}) AND curriculum_topic_id = ?"
        );
        $stmt->execute([...$outcomeIds, $curriculumTopicId]);
        return (int) $stmt->fetch()['c'] === count(array_unique($outcomeIds));
    }

    /**
     * Publish-time curriculum completeness check (never trust the frontend for this - see
     * publish()). Returns a field=>message map, empty when everything required is satisfied.
     * LOA needs >=1 selected Learning Outcome and every top-level question linked to one of them.
     * AOI/EOC need >=1 selected Topic and every selected Topic to have >=1 top-level question.
     */
    private function validateCurriculumCompleteness(int $assignmentId, string $category): array
    {
        $db = $this->getDb();
        $errors = [];

        if ($category === 'LOA') {
            $loCount = $db->prepare('SELECT COUNT(*) AS c FROM assignment_learning_outcomes WHERE assignment_id = :id');
            $loCount->execute(['id' => $assignmentId]);
            if ((int) $loCount->fetch()['c'] === 0) {
                $errors['learning_outcomes'] = 'Select at least one Learning Outcome to assess.';
                return $errors;
            }

            $qCount = $db->prepare(
                'SELECT COUNT(*) AS c FROM assignment_questions
                 WHERE assignment_id = :id AND parent_question_id IS NULL AND deleted_at IS NULL'
            );
            $qCount->execute(['id' => $assignmentId]);
            if ((int) $qCount->fetch()['c'] === 0) {
                $errors['questions'] = 'Add at least one question before publishing.';
                return $errors;
            }

            $unlinked = $db->prepare(
                'SELECT COUNT(*) AS c FROM assignment_questions
                 WHERE assignment_id = :id AND parent_question_id IS NULL AND deleted_at IS NULL
                   AND learning_outcome_id IS NULL'
            );
            $unlinked->execute(['id' => $assignmentId]);
            if ((int) $unlinked->fetch()['c'] > 0) {
                $errors['questions'] = 'Every question must be linked to one of the selected Learning Outcomes.';
            }
        } elseif ($category === 'AOI' || $category === 'EOC') {
            $topics = $db->prepare(
                'SELECT act.curriculum_topic_id, ct.topic AS topic_name,
                        (SELECT COUNT(*) FROM assignment_questions aq
                         WHERE aq.assignment_id = :sub_id AND aq.curriculum_topic_id = act.curriculum_topic_id
                           AND aq.parent_question_id IS NULL AND aq.deleted_at IS NULL) AS question_count
                 FROM assignment_curriculum_topics act
                 INNER JOIN enote_curriculum_topics ct ON act.curriculum_topic_id = ct.id
                 WHERE act.assignment_id = :id'
            );
            $topics->execute(['id' => $assignmentId, 'sub_id' => $assignmentId]);
            $rows = $topics->fetchAll();

            if (empty($rows)) {
                $errors['topics'] = 'Select at least one Topic.';
                return $errors;
            }

            if ($category === 'EOC') {
                // EOC is assessed against the Construct/Assessment Objective as a whole (the
                // builder shows one "Add Question" card, not one per topic) - just needs >=1
                // question across any of the construct's topics, not full per-topic coverage.
                $totalQuestions = array_sum(array_map(fn($row) => (int) $row['question_count'], $rows));
                if ($totalQuestions === 0) {
                    $errors['topics'] = 'Add at least one question before publishing.';
                }
            } else {
                $missing = [];
                foreach ($rows as $row) {
                    if ((int) $row['question_count'] === 0) {
                        $missing[] = $row['topic_name'];
                    }
                }
                if (!empty($missing)) {
                    $errors['topics'] = implode(' ', array_map(
                        fn($name) => "\"{$name}\" requires at least one question before this {$category} assessment can be published.",
                        $missing
                    ));
                }
            }
        }

        return $errors;
    }

    /**
     * Current curriculum linkage for an assignment - lets the builder reconstruct its
     * category/Topic/Learning-Outcome selection state when reopening a draft.
     * GET /teacher/assignments/{id}/curriculum
     */
    public function getCurriculum(): void
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
            $this->forbidden('You do not have permission to view this assignment');
            return;
        }

        $db = $this->getDb();

        $topicsStmt = $db->prepare(
            'SELECT ct.id, ct.theme_branch, ct.topic
             FROM assignment_curriculum_topics act
             INNER JOIN enote_curriculum_topics ct ON act.curriculum_topic_id = ct.id
             WHERE act.assignment_id = :id
             ORDER BY ct.theme_branch ASC, ct.topic ASC'
        );
        $topicsStmt->execute(['id' => $assignmentId]);
        $topics = $topicsStmt->fetchAll();

        $outcomesStmt = $db->prepare(
            'SELECT alo.curriculum_topic_id, alo.learning_outcome_id, lo.learning_outcome, lo.order_number
             FROM assignment_learning_outcomes alo
             INNER JOIN enote_learning_outcomes lo ON alo.learning_outcome_id = lo.id
             WHERE alo.assignment_id = :id
             ORDER BY lo.order_number ASC'
        );
        $outcomesStmt->execute(['id' => $assignmentId]);
        $learningOutcomes = $outcomesStmt->fetchAll();

        $constructStmt = $db->prepare(
            'SELECT a.construct_id, c.name AS construct_name
             FROM assignments a
             LEFT JOIN constructs c ON c.id = a.construct_id
             WHERE a.id = :id'
        );
        $constructStmt->execute(['id' => $assignmentId]);
        $constructRow = $constructStmt->fetch();

        $this->success([
            'topics' => $topics,
            'learning_outcomes' => $learningOutcomes,
            'construct_id' => $constructRow ? ($constructRow['construct_id'] !== null ? (int) $constructRow['construct_id'] : null) : null,
            'construct_name' => $constructRow['construct_name'] ?? null
        ]);
    }

    /**
     * Replaces the assignment's curriculum linkage in one call (delete-then-reinsert, same
     * pattern as ENoteCurriculumController's learning-outcomes replace on edit). For LOA, expects
     * `curriculum_topic_id` (single) + `learning_outcome_ids[]`. For AOI/EOC, expects
     * `topic_ids[]`. Does not touch existing questions' own curriculum_topic_id/learning_outcome_id
     * - the teacher builder is responsible for re-pointing/removing those before unselecting a
     * Topic/Learning Outcome (see section 10 of the spec: never silently orphan question data).
     * PUT /teacher/assignments/{id}/curriculum
     */
    public function updateCurriculum(): void
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

        $assignmentStmt = $db->prepare('SELECT assessment_category, subject_id FROM assignments WHERE id = :id');
        $assignmentStmt->execute(['id' => $assignmentId]);
        $assignmentRow = $assignmentStmt->fetch();
        $category = $assignmentRow['assessment_category'] ?? null;
        $subjectId = $assignmentRow['subject_id'] ?? null;

        if ($category === null) {
            $this->validationError(['assessment_category' => 'Set an assessment category (LOA/AOI/EOC) before linking curriculum']);
            return;
        }

        try {
            Database::beginTransaction();

            $db->prepare('DELETE FROM assignment_learning_outcomes WHERE assignment_id = :id')->execute(['id' => $assignmentId]);
            $db->prepare('DELETE FROM assignment_curriculum_topics WHERE assignment_id = :id')->execute(['id' => $assignmentId]);

            if ($category === 'LOA') {
                $topicId = !empty($data['curriculum_topic_id']) ? (int) $data['curriculum_topic_id'] : null;
                $outcomeIds = is_array($data['learning_outcome_ids'] ?? null) ? array_map('intval', $data['learning_outcome_ids']) : [];

                if ($topicId === null || empty($outcomeIds)) {
                    Database::rollback();
                    $this->validationError(['learning_outcome_ids' => 'Select a Topic and at least one Learning Outcome']);
                    return;
                }

                // Never trust a curriculum_topic_id/learning_outcome_id straight from the client -
                // reject anything that doesn't actually belong to this assignment's own subject
                // (a teacher could otherwise link curriculum data from another department/subject
                // by editing the request).
                if (!$this->curriculumTopicMatchesSubject($topicId, $subjectId)) {
                    Database::rollback();
                    $this->validationError(['curriculum_topic_id' => 'That Topic does not belong to this assignment\'s Subject']);
                    return;
                }
                if (!$this->learningOutcomesBelongToTopic($outcomeIds, $topicId)) {
                    Database::rollback();
                    $this->validationError(['learning_outcome_ids' => 'One or more Learning Outcomes do not belong to the selected Topic']);
                    return;
                }

                $db->prepare(
                    'INSERT INTO assignment_curriculum_topics (assignment_id, curriculum_topic_id, created_at)
                     VALUES (:assignment_id, :topic_id, NOW())'
                )->execute(['assignment_id' => $assignmentId, 'topic_id' => $topicId]);

                $insertOutcome = $db->prepare(
                    'INSERT INTO assignment_learning_outcomes (assignment_id, curriculum_topic_id, learning_outcome_id, created_at)
                     VALUES (:assignment_id, :topic_id, :outcome_id, NOW())'
                );
                foreach ($outcomeIds as $outcomeId) {
                    $insertOutcome->execute([
                        'assignment_id' => $assignmentId,
                        'topic_id' => $topicId,
                        'outcome_id' => $outcomeId
                    ]);
                }
            } else {
                $topicIds = is_array($data['topic_ids'] ?? null) ? array_unique(array_map('intval', $data['topic_ids'])) : [];
                if (empty($topicIds)) {
                    Database::rollback();
                    $this->validationError(['topic_ids' => 'Select at least one Topic']);
                    return;
                }

                foreach ($topicIds as $topicId) {
                    if (!$this->curriculumTopicMatchesSubject($topicId, $subjectId)) {
                        Database::rollback();
                        $this->validationError(['topic_ids' => 'One or more Topics do not belong to this assignment\'s Subject']);
                        return;
                    }
                }

                $insertTopic = $db->prepare(
                    'INSERT INTO assignment_curriculum_topics (assignment_id, curriculum_topic_id, created_at)
                     VALUES (:assignment_id, :topic_id, NOW())'
                );
                foreach ($topicIds as $topicId) {
                    $insertTopic->execute(['assignment_id' => $assignmentId, 'topic_id' => $topicId]);
                }
            }

            // EOC records which admin-defined Construct it was built from - the teacher picks
            // exactly one. LOA/AOI (and an EOC payload sent with no construct_id) clear any stale
            // value, so switching an existing draft's category away from EOC never leaves a
            // dangling reference.
            $constructId = null;
            if ($category === 'EOC' && !empty($data['construct_id'])) {
                $constructId = (int) $data['construct_id'];
                if (!$this->constructBelongsToSubject($constructId, $subjectId)) {
                    Database::rollback();
                    $this->validationError(['construct_id' => 'That Construct does not belong to this assignment\'s Subject']);
                    return;
                }
            }
            $db->prepare('UPDATE assignments SET construct_id = :construct_id WHERE id = :id')
                ->execute(['construct_id' => $constructId, 'id' => $assignmentId]);

            Database::commit();
            $this->success([], 'Curriculum linkage updated successfully');
        } catch (Exception $e) {
            Database::rollback();
            error_log('Failed to update assignment curriculum: ' . $e->getMessage());
            $this->serverError('Failed to update curriculum linkage');
        }
    }

    /**
     * The extra class-streams (beyond the single class_id/class_group_name on `assignments`
     * itself) this assignment is also visible to - lets the builder's checkbox multi-select
     * reconstruct which streams were checked when reopening a draft.
     * GET /teacher/assignments/{id}/classes
     */
    public function getClasses(): void
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
            $this->forbidden('You do not have permission to view this assignment');
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT ac.class_id, CONCAT(c.name, '-', c.stream_name) AS display_name
             FROM assignment_classes ac
             INNER JOIN classes c ON ac.class_id = c.id
             WHERE ac.assignment_id = :id
             ORDER BY c.level ASC, c.name ASC, c.stream_name ASC"
        );
        $stmt->execute(['id' => $assignmentId]);
        $this->success(['classes' => $stmt->fetchAll()]);
    }

    /**
     * Replaces the assignment's full "visible to" class-stream list (delete-then-reinsert, same
     * pattern as updateCurriculum()). This is additive to, not a replacement for, the existing
     * single class_id/class_group_name on `assignments` itself - create()/update() keep setting
     * those to the first checked stream for backward compatibility with any code that only reads
     * the single-value columns; this table is what actually drives visibility to every OTHER
     * checked stream (see Student\AssignmentController's visibility query).
     * PUT /teacher/assignments/{id}/classes
     */
    public function updateClasses(): void
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
        $classIds = is_array($data['class_ids'] ?? null) ? array_unique(array_map('intval', $data['class_ids'])) : [];

        if (empty($classIds)) {
            $this->validationError(['class_ids' => 'Select at least one class-stream']);
            return;
        }

        $departmentId = $this->getActiveDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department', 403);
            return;
        }

        // Never trust class ids straight from the client - each must be a class-stream this
        // teacher's department actually has active students in (same rule create()/update() apply
        // to the single legacy class_id).
        foreach ($classIds as $classId) {
            if (!$this->classBelongsToDepartment($classId, $departmentId)) {
                $this->validationError(['class_ids' => 'One or more selected classes are not in your department']);
                return;
            }
        }

        $db = $this->getDb();
        try {
            Database::beginTransaction();

            $db->prepare('DELETE FROM assignment_classes WHERE assignment_id = :id')->execute(['id' => $assignmentId]);

            $insert = $db->prepare(
                'INSERT INTO assignment_classes (assignment_id, class_id, created_at) VALUES (:assignment_id, :class_id, NOW())'
            );
            foreach ($classIds as $classId) {
                $insert->execute(['assignment_id' => $assignmentId, 'class_id' => $classId]);
            }

            Database::commit();
            $this->success([], 'Visibility updated successfully');
        } catch (Exception $e) {
            Database::rollback();
            error_log('Failed to update assignment classes: ' . $e->getMessage());
            $this->serverError('Failed to update class visibility');
        }
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

        // Subject and class were previously trusted straight from client input with zero
        // verification, unlike every other content module - a teacher could set any subject_id
        // (any department) or class_id (any class) on their own assignment. Both are now
        // re-validated against the teacher's own active department, matching the rule everywhere
        // else: "a teacher cannot target another department."
        $departmentId = $this->getActiveDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department to create assignments', 403);
            return;
        }

        $subjectId = (isset($data['subject_id']) && $data['subject_id'] !== '') ? (int) $data['subject_id'] : null;
        if ($subjectId !== null) {
            $stmt = $db->prepare('SELECT id FROM subjects WHERE id = :subject_id AND department_id = :department_id');
            $stmt->execute(['subject_id' => $subjectId, 'department_id' => $departmentId]);
            if (!$stmt->fetch()) {
                $this->validationError(['subject_id' => 'Subject not found in your department']);
                return;
            }
        }

        $classTarget = $this->resolveClassTarget($data, $departmentId, false);
        if (!$classTarget['ok']) {
            $this->validationError(['class_id' => $classTarget['message']]);
            return;
        }

        $assessmentCategory = $this->normalizeAssessmentCategory($data['assessment_category'] ?? null);
        if ($assessmentCategory === false) {
            $this->validationError(['assessment_category' => 'Must be one of LOA, AOI, or EOC']);
            return;
        }

        try {
            Database::beginTransaction();

            $sql = "INSERT INTO assignments (
                teacher_id, subject_id, class_id, class_group_name, title, description, type,
                total_marks, due_date, instructions, attachments, rubric,
                category, assessment_category, academic_year_id, term_id, open_at, deadline_at, duration_minutes, pass_mark,
                allow_late_submission, attempts_allowed, shuffle_questions, shuffle_options,
                show_marks_immediately, show_answers_after_submission, allow_save_resume, status,
                is_published, academic_year, created_at, updated_at
            ) VALUES (
                :teacher_id, :subject_id, :class_id, :class_group_name, :title, :description, :type,
                :total_marks, :due_date, :instructions, :attachments, :rubric,
                :category, :assessment_category, :academic_year_id, :term_id, :open_at, :deadline_at, :duration_minutes, :pass_mark,
                :allow_late_submission, :attempts_allowed, :shuffle_questions, :shuffle_options,
                :show_marks_immediately, :show_answers_after_submission, :allow_save_resume, :status,
                :is_published, :academic_year, NOW(), NOW()
            )";

            $stmt = $db->prepare($sql);
            $stmt->execute([
                'teacher_id' => $teacherId,
                'subject_id' => $subjectId,
                'class_id' => $classTarget['class_id'],
                'class_group_name' => $classTarget['class_group_name'],
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'type' => $data['type'] ?? 'mixed',
                'total_marks' => $data['total_marks'],
                'due_date' => $data['due_date'],
                'instructions' => $data['instructions'] ?? null,
                'attachments' => $data['attachments'] ?? null,
                'rubric' => $data['rubric'] ?? null,
                'category' => $data['category'] ?? null,
                'assessment_category' => $assessmentCategory,
                'academic_year_id' => !empty($data['academic_year_id']) ? (int) $data['academic_year_id'] : null,
                'term_id' => !empty($data['term_id']) ? (int) $data['term_id'] : null,
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
                'allow_save_resume', 'status', 'is_published', 'subject_id', 'academic_year',
                'academic_year_id', 'term_id'
            ];

            if (array_key_exists('assessment_category', $data)) {
                $assessmentCategory = $this->normalizeAssessmentCategory($data['assessment_category']);
                if ($assessmentCategory === false) {
                    Database::rollback();
                    $this->validationError(['assessment_category' => 'Must be one of LOA, AOI, or EOC']);
                    return;
                }
                $updateFields[] = 'assessment_category = :assessment_category';
                $params['assessment_category'] = $assessmentCategory;
            }

            // subject_id/class_id/class_group_name are re-validated against the teacher's own
            // department before this generic loop even runs - see create()'s comment on why this
            // was previously trusted raw from the client.
            $departmentId = $this->getActiveDepartmentId();
            if (isset($data['subject_id']) && $data['subject_id'] !== '') {
                if (!$departmentId) {
                    $this->error('Teacher must be assigned to a department', 403);
                    Database::rollback();
                    return;
                }
                $stmt = $db->prepare('SELECT id FROM subjects WHERE id = :subject_id AND department_id = :department_id');
                $stmt->execute(['subject_id' => (int) $data['subject_id'], 'department_id' => $departmentId]);
                if (!$stmt->fetch()) {
                    Database::rollback();
                    $this->validationError(['subject_id' => 'Subject not found in your department']);
                    return;
                }
            } elseif (isset($data['subject_id'])) {
                $data['subject_id'] = null;
            }

            if (array_key_exists('class_id', $data) || array_key_exists('class_group_name', $data) || array_key_exists('scope', $data)) {
                if (!$departmentId) {
                    Database::rollback();
                    $this->error('Teacher must be assigned to a department', 403);
                    return;
                }
                $classTarget = $this->resolveClassTarget($data, $departmentId, false);
                if (!$classTarget['ok']) {
                    Database::rollback();
                    $this->validationError(['class_id' => $classTarget['message']]);
                    return;
                }
                $updateFields[] = 'class_id = :class_id';
                $params['class_id'] = $classTarget['class_id'];
                $updateFields[] = 'class_group_name = :class_group_name';
                $params['class_group_name'] = $classTarget['class_group_name'];
            }

            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    // Convert empty strings to null for foreign key fields
                    if (in_array($field, ['subject_id', 'academic_year_id', 'term_id'], true) && $data[$field] === '') {
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

        $categoryStmt = $db->prepare('SELECT assessment_category FROM assignments WHERE id = :id');
        $categoryStmt->execute(['id' => $assignmentId]);
        $assessmentCategory = $categoryStmt->fetch()['assessment_category'] ?? null;

        if ($assessmentCategory !== null) {
            $curriculumErrors = $this->validateCurriculumCompleteness($assignmentId, $assessmentCategory);
            if (!empty($curriculumErrors)) {
                $this->validationError($curriculumErrors, 'This assessment cannot be published yet');
                return;
            }
        }

        try {
            Database::beginTransaction();

            $sql = "UPDATE assignments SET status = 'published', is_published = 1, published_at = NOW(), updated_at = NOW() WHERE id = :assignment_id";
            $stmt = $db->prepare($sql);
            $stmt->execute(['assignment_id' => $assignmentId]);

            Database::commit();

            $stmt = $db->prepare(
                'SELECT a.title, a.class_id, a.class_group_name, s.department_id
                 FROM assignments a LEFT JOIN subjects s ON a.subject_id = s.id
                 WHERE a.id = :id'
            );
            $stmt->execute(['id' => $assignmentId]);
            $assignment = $stmt->fetch();
            if ($assignment && $assignment['department_id'] !== null) {
                // notifyDepartmentClass (not notifyClass) so an "All Streams" assignment notifies
                // every stream of that class level in the department, not zero students.
                (new NotificationService())->notifyDepartmentClass(
                    (int) $assignment['department_id'],
                    $assignment['class_id'] !== null ? (int) $assignment['class_id'] : null,
                    'new_assessment',
                    'New assessment',
                    "A new assessment \"{$assignment['title']}\" has been posted.",
                    ['assignment_id' => $assignmentId],
                    $assignment['class_group_name']
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
                teacher_id, subject_id, class_id, class_group_name, title, description, type,
                total_marks, due_date, instructions, attachments, rubric,
                category, open_at, deadline_at, duration_minutes, pass_mark,
                allow_late_submission, attempts_allowed, shuffle_questions, shuffle_options,
                show_marks_immediately, show_answers_after_submission, allow_save_resume, status,
                is_published, academic_year, created_at, updated_at
            ) VALUES (
                :teacher_id, :subject_id, :class_id, :class_group_name, :title, :description, :type,
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
                'class_group_name' => $original['class_group_name'],
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
            $required = ['question_type', 'marks'];
            // A teacher-uploaded PDF stands in for typing the question out - only require one or
            // the other, not both. The PDF itself is uploaded via a separate call right after this
            // question is created (it needs a real question id first), so at this point all the
            // frontend can send is attachment_type: 'pdf' as a promise that the upload is coming.
            $pdfPending = ($data['attachment_type'] ?? 'none') === 'pdf';
            if (empty($data['question_text']) && empty($data['attachment_path']) && !$pdfPending) {
                $this->validationError(['question_text' => 'Question text or an attached PDF is required']);
                return;
            }
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
                assignment_id, parent_question_id, curriculum_topic_id, learning_outcome_id,
                question_type, question_text, scenario_text,
                marks, display_order, allow_drawing, response_type, attachment_path, attachment_type, created_at, updated_at
            ) VALUES (
                :assignment_id, :parent_question_id, :curriculum_topic_id, :learning_outcome_id,
                :question_type, :question_text, :scenario_text,
                :marks, :display_order, :allow_drawing, :response_type, :attachment_path, :attachment_type, NOW(), NOW()
            )";

            $stmt = $db->prepare($sql);
            $stmt->execute([
                'assignment_id' => $assignmentId,
                'parent_question_id' => $data['parent_question_id'] ?? null,
                'curriculum_topic_id' => !empty($data['curriculum_topic_id']) ? (int) $data['curriculum_topic_id'] : null,
                'learning_outcome_id' => !empty($data['learning_outcome_id']) ? (int) $data['learning_outcome_id'] : null,
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

            $allowedFields = ['question_text', 'scenario_text', 'marks', 'display_order', 'allow_drawing', 'response_type', 'attachment_path', 'attachment_type', 'curriculum_topic_id', 'learning_outcome_id'];
            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    // An empty string clears a previously-set attachment (e.g. the teacher removed
                    // an uploaded question PDF before saving) - store it as NULL/none rather than ''.
                    if ($field === 'attachment_path' && $data[$field] === '') {
                        $updateFields[] = "attachment_path = NULL";
                        continue;
                    }
                    if (in_array($field, ['curriculum_topic_id', 'learning_outcome_id'], true) && $data[$field] === '') {
                        $data[$field] = null;
                    }
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
