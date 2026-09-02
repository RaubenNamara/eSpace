<?php

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\Config\Database;
use eSpace\App\Utils\Grading;

class AssignmentController extends Controller
{
    private $pdo;

    public function __construct()
    {
        parent::__construct();
        $this->pdo = Database::getInstance();
    }

    /**
     * Get student's assignments
     */
    public function index()
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();

        try {
            $sql = "SELECT
                a.id,
                a.title,
                a.instructions,
                a.open_at,
                a.due_date,
                a.total_marks,
                a.pass_mark,
                a.duration_minutes,
                a.allow_late_submission,
                a.attempts_allowed,
                a.status as assignment_status,
                a.assessment_category,
                a.subject_id,
                s.name as subject_name,
                CONCAT(t.first_name, ' ', t.last_name) as teacher_name,
                sub.id as submission_id,
                COALESCE(sub.status, 'new') as submission_status,
                sub.total_score,
                sub.percentage
                FROM assignments a
                INNER JOIN subjects s ON a.subject_id = s.id
                INNER JOIN teachers t ON a.teacher_id = t.id
                LEFT JOIN (
                    SELECT * FROM assignment_submissions
                    WHERE student_id = :student_id_sub
                    ORDER BY attempt_number DESC
                ) sub ON a.id = sub.assignment_id
                WHERE a.status = 'published'
                AND a.deleted_at IS NULL
                AND EXISTS (
                    SELECT 1 FROM student_department_enrollments sde
                    LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                    WHERE sde.student_id = :student_id_enroll
                      AND (
                        sde.class_id = a.class_id
                        OR (a.class_group_name IS NOT NULL AND sde_c.name = a.class_group_name)
                        OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id AND ac.class_id = sde.class_id)
                      )
                      AND sde.department_id = s.department_id
                      AND sde.deleted_at IS NULL
                      AND sde.status = 'active'
                      AND COALESCE(a.published_at, a.created_at) BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
                )
                AND NOT EXISTS (
                    SELECT 1 FROM student_teacher_enrollments ste
                    WHERE ste.student_id = :student_id_te
                      AND ste.teacher_id = a.teacher_id
                      AND ste.department_id = s.department_id
                      AND ste.status = 'withdrawn'
                )
                ORDER BY a.due_date DESC";

            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(['student_id_sub' => $studentId, 'student_id_enroll' => $studentId, 'student_id_te' => $studentId]);
            $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // submission_status carries in_progress/submitted/marking/graded/returned (or 'new' when
            // no submission exists yet); map it onto the status vocabulary the frontend actually
            // renders buttons for. Only 'returned' becomes 'marked' - that's the one state
            // getResult() actually allows (released_at IS NOT NULL), set exactly when the teacher
            // clicks "Return to Student". 'graded' means marking is done but not yet released, so it
            // must NOT show a "View Result" button the student would just bounce off of; 'marking'
            // is likewise still in-progress from the student's point of view. Mark unsubmitted
            // assignments past their deadline as overdue.
            $statusMap = [
                'marking' => 'submitted',
                'graded' => 'submitted',
                'returned' => 'marked',
            ];
            $now = new \DateTime();
            $assignments = array_map(function ($row) use ($now, $statusMap) {
                $status = $statusMap[$row['submission_status']] ?? $row['submission_status'];

                if (in_array($status, ['new', 'in_progress'], true) && !empty($row['due_date'])) {
                    if ($now > new \DateTime($row['due_date'])) {
                        $status = 'overdue';
                    }
                }

                // The score itself must stay hidden until release too (matches getResult()'s
                // released_at gate) - otherwise completeMarking() setting total_score on a still-
                // 'graded' (not yet returned) submission would leak the score here before the
                // teacher ever clicks "Return to Student".
                $released = $status === 'marked';

                $row['status'] = $status;
                $row['submission'] = $row['submission_id'] ? [
                    'id' => (int) $row['submission_id'],
                    'total_score' => ($released && $row['total_score'] !== null) ? (float) $row['total_score'] : null,
                    'percentage' => ($released && $row['percentage'] !== null) ? (float) $row['percentage'] : null,
                ] : null;

                unset($row['submission_id'], $row['submission_status'], $row['total_score'], $row['percentage']);

                return $row;
            }, $rows);

            $this->success($assignments, 'Assignments retrieved successfully');
        } catch (\Exception $e) {
            error_log("Failed to fetch assignments: " . $e->getMessage());
            $this->error('Failed to fetch assignments: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get single assignment for student to answer
     */
    public function show()
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $assignmentId = $this->routeParam('id');

        try {
            // Check if student has access to this assignment
            $checkSql = "SELECT a.*, 
                s.name as subject_name,
                CONCAT(t.first_name, ' ', t.last_name) as teacher_name
                FROM assignments a
                INNER JOIN subjects s ON a.subject_id = s.id
                INNER JOIN teachers t ON a.teacher_id = t.id
                WHERE a.id = :assignment_id
                AND a.status = 'published'
                AND a.deleted_at IS NULL
                AND EXISTS (
                    SELECT 1 FROM student_department_enrollments sde
                    LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                    WHERE sde.student_id = :student_id
                      AND (
                        sde.class_id = a.class_id
                        OR (a.class_group_name IS NOT NULL AND sde_c.name = a.class_group_name)
                        OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id AND ac.class_id = sde.class_id)
                      )
                      AND sde.department_id = s.department_id
                      AND sde.deleted_at IS NULL
                      AND sde.status = 'active'
                      AND COALESCE(a.published_at, a.created_at) BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
                )
                AND NOT EXISTS (
                    SELECT 1 FROM student_teacher_enrollments ste
                    WHERE ste.student_id = :student_id_te
                      AND ste.teacher_id = a.teacher_id
                      AND ste.department_id = s.department_id
                      AND ste.status = 'withdrawn'
                )";

            $stmt = $this->pdo->prepare($checkSql);
            $stmt->execute([
                'assignment_id' => $assignmentId,
                'student_id' => $studentId,
                'student_id_te' => $studentId
            ]);
            $assignment = $stmt->fetch();

            if (!$assignment) {
                $this->notFound('Assignment not found or access denied');
                return;
            }

            // Get questions
            $questionsSql = "SELECT * FROM assignment_questions 
                            WHERE assignment_id = :assignment_id 
                            AND parent_question_id IS NULL
                            ORDER BY display_order ASC";
            
            $stmt = $this->pdo->prepare($questionsSql);
            $stmt->execute(['assignment_id' => $assignmentId]);
            $questions = $stmt->fetchAll();

            // Get options for objective questions, and sub-questions for scenario questions
            foreach ($questions as &$question) {
                if (in_array($question['question_type'], ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'])) {
                    $optionsSql = "SELECT * FROM assignment_question_options
                                  WHERE question_id = :question_id
                                  ORDER BY display_order ASC";
                    $stmt = $this->pdo->prepare($optionsSql);
                    $stmt->execute(['question_id' => $question['id']]);
                    $question['options'] = $stmt->fetchAll();
                }

                if ($question['question_type'] === 'scenario') {
                    $subQuestionsSql = "SELECT * FROM assignment_questions
                                        WHERE parent_question_id = :parent_question_id
                                        AND deleted_at IS NULL
                                        ORDER BY display_order ASC";
                    $stmt = $this->pdo->prepare($subQuestionsSql);
                    $stmt->execute(['parent_question_id' => $question['id']]);
                    $question['sub_questions'] = $stmt->fetchAll();
                }

                // Teacher's authoring annotations (read-only layer) - relevant for any non-objective
                // question, since every free-response question now offers a drawing/annotation layer
                // alongside its typed answer, not just questions locked to canvas/pdf_annotation.
                if (!in_array($question['question_type'], ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'], true)) {
                    $qaStmt = $this->pdo->prepare("SELECT page_number, annotation_data FROM question_annotations WHERE question_id = :question_id ORDER BY page_number ASC");
                    $qaStmt->execute(['question_id' => $question['id']]);
                    $questionPages = [];
                    foreach ($qaStmt->fetchAll() as $qaRow) {
                        $questionPages[(int) $qaRow['page_number']] = json_decode($qaRow['annotation_data'] ?? '[]', true) ?: [];
                    }
                    $question['question_annotations'] = $questionPages;
                }
            }

            // Check for existing submission
            $submissionSql = "SELECT * FROM assignment_submissions 
                              WHERE assignment_id = :assignment_id 
                              AND student_id = :student_id
                              ORDER BY attempt_number DESC LIMIT 1";
            
            $stmt = $this->pdo->prepare($submissionSql);
            $stmt->execute([
                'assignment_id' => $assignmentId,
                'student_id' => $studentId
            ]);
            $submission = $stmt->fetch();

            $submissionId = $submission ? $submission['id'] : null;
            $existingAnswers = [];
            $answerAnnotationsByQuestion = [];
            $answerAttachmentsByQuestion = [];

            if ($submission) {
                $answersSql = "SELECT * FROM assignment_answers
                              WHERE submission_id = :submission_id";
                $stmt = $this->pdo->prepare($answersSql);
                $stmt->execute(['submission_id' => $submission['id']]);
                $existingAnswers = $stmt->fetchAll();

                $aaStmt = $this->pdo->prepare("SELECT question_id, page_number, annotation_data FROM student_answer_annotations WHERE submission_id = :submission_id");
                $aaStmt->execute(['submission_id' => $submission['id']]);
                foreach ($aaStmt->fetchAll() as $aaRow) {
                    $qId = (int) $aaRow['question_id'];
                    if (!isset($answerAnnotationsByQuestion[$qId])) {
                        $answerAnnotationsByQuestion[$qId] = [];
                    }
                    $answerAnnotationsByQuestion[$qId][(int) $aaRow['page_number']] = json_decode($aaRow['annotation_data'] ?? '[]', true) ?: [];
                }

                // Supplementary "additional files" gallery (independent of the single primary
                // attachment already included per-row in $existingAnswers above).
                $afStmt = $this->pdo->prepare(
                    "SELECT id, question_id, file_path, original_name, file_type FROM assignment_answer_attachments
                     WHERE submission_id = :submission_id ORDER BY display_order ASC, id ASC"
                );
                $afStmt->execute(['submission_id' => $submission['id']]);
                foreach ($afStmt->fetchAll() as $afRow) {
                    $qId = (int) $afRow['question_id'];
                    if (!isset($answerAttachmentsByQuestion[$qId])) {
                        $answerAttachmentsByQuestion[$qId] = [];
                    }
                    $answerAttachmentsByQuestion[$qId][] = [
                        'id' => (int) $afRow['id'],
                        'path' => $afRow['file_path'],
                        'original_name' => $afRow['original_name'],
                        'file_type' => $afRow['file_type'],
                    ];
                }
            }

            $this->success([
                'assignment' => $assignment,
                'questions' => $questions,
                'curriculum' => $this->getCurriculumStructure((int) $assignmentId, $assignment['assessment_category'], $assignment['construct_id'] ?? null),
                'submission_id' => $submissionId,
                'submission_status' => $submission['status'] ?? null,
                'answers' => $existingAnswers,
                'answer_annotations' => $answerAnnotationsByQuestion,
                'answer_attachments' => $answerAttachmentsByQuestion
            ]);
        } catch (\Exception $e) {
            $this->serverError('Failed to load assignment: ' . $e->getMessage());
        }
    }

    /**
     * Read-only curriculum context for the student's assessment view - null for any assignment
     * without an assessment_category (every assignment created before this feature). For LOA:
     * the single Topic's theme/competence plus the specific Learning Outcomes being assessed. For
     * AOI/EOC: the list of linked Topics (with theme_branch, so EOC can group by Theme -> Topic).
     * Questions already carry their own curriculum_topic_id/learning_outcome_id (see the `questions`
     * array above) - this is purely the human-readable structure to group them by.
     */
    private function getCurriculumStructure(int $assignmentId, ?string $category, $constructId = null): ?array
    {
        if ($category === null) {
            return null;
        }

        if ($category === 'LOA') {
            $stmt = $this->pdo->prepare(
                'SELECT ct.id, ct.theme_branch, ct.topic, ct.competence
                 FROM assignment_curriculum_topics act
                 INNER JOIN enote_curriculum_topics ct ON act.curriculum_topic_id = ct.id
                 WHERE act.assignment_id = :id
                 LIMIT 1'
            );
            $stmt->execute(['id' => $assignmentId]);
            $topic = $stmt->fetch();

            $outcomesStmt = $this->pdo->prepare(
                'SELECT lo.id, lo.learning_outcome, lo.order_number
                 FROM assignment_learning_outcomes alo
                 INNER JOIN enote_learning_outcomes lo ON alo.learning_outcome_id = lo.id
                 WHERE alo.assignment_id = :id
                 ORDER BY lo.order_number ASC'
            );
            $outcomesStmt->execute(['id' => $assignmentId]);

            return [
                'category' => 'LOA',
                'topic' => $topic ?: null,
                'learning_outcomes' => $outcomesStmt->fetchAll()
            ];
        }

        $stmt = $this->pdo->prepare(
            'SELECT ct.id, ct.theme_branch, ct.topic
             FROM assignment_curriculum_topics act
             INNER JOIN enote_curriculum_topics ct ON act.curriculum_topic_id = ct.id
             WHERE act.assignment_id = :id
             ORDER BY ct.theme_branch ASC, ct.topic ASC'
        );
        $stmt->execute(['id' => $assignmentId]);

        $result = [
            'category' => $category,
            'topics' => $stmt->fetchAll()
        ];

        // EOC is assessed against the Construct's Assessment Objective as a whole (the builder
        // adds every question under one "Assessment Objective (AO#)" group) - the student view
        // groups by that instead of the raw Theme/Topic text.
        if ($category === 'EOC' && $constructId) {
            $constructStmt = $this->pdo->prepare('SELECT assessment_objective, name FROM constructs WHERE id = :id');
            $constructStmt->execute(['id' => (int) $constructId]);
            $construct = $constructStmt->fetch();
            if ($construct) {
                $result['assessment_objective'] = $construct['assessment_objective'];
                $result['construct_name'] = $construct['name'];
            }
        }

        return $result;
    }

    /**
     * Submit or update assignment answers
     */
    public function submit()
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $data = $this->input();

        // Two routes share this handler:
        //  POST /assignments/{id}/submit           -> {id} is the assignment id, no submission yet
        //  PUT  /assignments/submissions/{submission_id} -> {submission_id} identifies an existing submission
        $routeSubmissionId = $this->routeParam('submission_id');
        $assignmentId = $this->routeParam('id');

        try {
            $this->pdo->beginTransaction();

            if ($routeSubmissionId) {
                $ownerStmt = $this->pdo->prepare(
                    "SELECT assignment_id, status FROM assignment_submissions WHERE id = :submission_id AND student_id = :student_id"
                );
                $ownerStmt->execute(['submission_id' => $routeSubmissionId, 'student_id' => $studentId]);
                $owned = $ownerStmt->fetch();

                if (!$owned) {
                    $this->pdo->rollBack();
                    $this->notFound('Submission not found');
                    return;
                }

                // Once submitted, the attempt is locked until a teacher reopens it (status back to in_progress).
                if ($owned['status'] !== 'in_progress') {
                    $this->pdo->rollBack();
                    $this->error('This attempt has already been submitted and can no longer be edited', 403);
                    return;
                }

                $assignmentId = $owned['assignment_id'];
            }

            // Validate assignment access
            $checkSql = "SELECT * FROM assignments WHERE id = :assignment_id AND status = 'published'";
            $stmt = $this->pdo->prepare($checkSql);
            $stmt->execute(['assignment_id' => $assignmentId]);
            $assignment = $stmt->fetch();

            if (!$assignment) {
                $this->pdo->rollBack();
                $this->notFound('Assignment not found');
                return;
            }

            // Check deadline
            $now = new \DateTime();
            $dueDate = new \DateTime($assignment['due_date']);
            $isLate = $now > $dueDate;

            if ($isLate && !$assignment['allow_late_submission']) {
                $this->pdo->rollBack();
                $this->error('Late submissions are not allowed for this assignment');
                return;
            }

            // Get or create submission. Look this up authoritatively by (assignment_id,
            // student_id) rather than trusting a client-supplied submission_id: the
            // canvas/PDF answer-annotation autosave can create this row independently
            // (before the client-side page state learns its id), and
            // assignment_submissions.unique_assignment_student means there is only ever
            // one row per student per assignment - so a stale client belief that no
            // submission exists yet must not lead to a duplicate INSERT.
            $status = $data['status'] ?? 'in_progress';

            $existingStmt = $this->pdo->prepare(
                "SELECT id, attempt_number, status FROM assignment_submissions WHERE assignment_id = :assignment_id AND student_id = :student_id"
            );
            $existingStmt->execute(['assignment_id' => $assignmentId, 'student_id' => $studentId]);
            $existingSubmission = $existingStmt->fetch();

            // Guard against resubmitting a locked attempt even via the "create" (POST) route,
            // e.g. if the client's local state is stale and still thinks no submission exists.
            if ($existingSubmission && !$routeSubmissionId && $existingSubmission['status'] !== 'in_progress') {
                $this->pdo->rollBack();
                $this->error('This attempt has already been submitted and can no longer be edited', 403);
                return;
            }

            if ($existingSubmission) {
                $submissionId = $existingSubmission['id'];
                $attemptNumber = (int) $existingSubmission['attempt_number'];

                $updateSql = "UPDATE assignment_submissions
                              SET status = :status, updated_at = NOW()
                              WHERE id = :submission_id AND student_id = :student_id";
                $stmt = $this->pdo->prepare($updateSql);
                $stmt->execute([
                    'status' => $status,
                    'submission_id' => $submissionId,
                    'student_id' => $studentId
                ]);
            } else {
                $attemptNumber = 1;

                $insertSql = "INSERT INTO assignment_submissions
                              (assignment_id, student_id, attempt_number, started_at, status, created_at, updated_at)
                              VALUES (:assignment_id, :student_id, :attempt_number, NOW(), :status, NOW(), NOW())";
                $stmt = $this->pdo->prepare($insertSql);
                $stmt->execute([
                    'assignment_id' => $assignmentId,
                    'student_id' => $studentId,
                    'attempt_number' => $attemptNumber,
                    'status' => $status
                ]);
                $submissionId = $this->pdo->lastInsertId();
            }

            // Save answers. A free-response question offers typed text, a canvas drawing, AND an
            // uploaded PDF/image together (not mutually exclusive alternatives), so saving the
            // typed answer must only touch answer_text - it must NOT clobber answer_mode /
            // student_attachment_path that uploadAnswerAttachment() may have already set for this
            // same row via a separate request. UPSERT per question instead of the previous
            // blanket delete+reinsert, which unconditionally reset answer_mode to 'typed' and
            // dropped student_attachment_path/original_name, silently discarding an already-
            // uploaded PDF/image every time the student typed anything afterward.
            if (isset($data['answers']) && is_array($data['answers']) && count($data['answers']) > 0) {
                $existingStmt = $this->pdo->prepare(
                    "SELECT id FROM assignment_answers WHERE submission_id = :submission_id AND question_id = :question_id"
                );
                $updateStmt = $this->pdo->prepare(
                    "UPDATE assignment_answers SET answer_text = :answer_text, updated_at = NOW() WHERE id = :id"
                );
                $insertStmt = $this->pdo->prepare(
                    "INSERT INTO assignment_answers (submission_id, question_id, answer_text, answer_mode, created_at, updated_at)
                     VALUES (:submission_id, :question_id, :answer_text, 'typed', NOW(), NOW())"
                );

                foreach ($data['answers'] as $answer) {
                    $questionId = (int) $answer['question_id'];
                    $existingStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                    $existingAnswer = $existingStmt->fetch();

                    if ($existingAnswer) {
                        $updateStmt->execute(['answer_text' => $answer['answer_text'], 'id' => $existingAnswer['id']]);
                    } else {
                        $insertStmt->execute([
                            'submission_id' => $submissionId,
                            'question_id' => $questionId,
                            'answer_text' => $answer['answer_text']
                        ]);
                    }
                }
            }

            // If submitting, update submission with submitted_at
            if ($status === 'submitted') {
                $submitSql = "UPDATE assignment_submissions 
                              SET submitted_at = NOW(), updated_at = NOW()
                              WHERE id = :submission_id";
                $stmt = $this->pdo->prepare($submitSql);
                $stmt->execute(['submission_id' => $submissionId]);
            }

            $this->pdo->commit();

            // Classify submission timing relative to the deadline for display (not persisted as
            // a separate column - submitted_at + due_date already fully determine it).
            $submissionTiming = null;
            if ($status === 'submitted') {
                $hoursBeforeDue = ($dueDate->getTimestamp() - $now->getTimestamp()) / 3600;
                if ($isLate) {
                    $submissionTiming = 'late';
                } elseif ($hoursBeforeDue >= 24) {
                    $submissionTiming = 'early';
                } else {
                    $submissionTiming = 'on_time';
                }
            }

            $this->success([
                'id' => $submissionId,
                'status' => $status,
                'attempt_number' => $attemptNumber,
                'submission_timing' => $submissionTiming
            ], 'Assignment saved successfully');
        } catch (\Exception $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            error_log('Assignment submit failed: ' . $e->getMessage());
            $this->serverError('Failed to save assignment: ' . $e->getMessage());
        }
    }

    /**
     * Load each top-level question for an assignment plus its canvas/pdf layers:
     * the teacher's authoring annotations (always read-only), the student's own
     * answer annotations for this submission, and - only when $includeMarking is
     * true (the result has been released) - the teacher's marking annotations
     * and awarded marks/feedback for that question.
     */
    private function loadQuestionsWithLayers(int $assignmentId, int $submissionId, bool $includeMarking): array
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM assignment_questions WHERE assignment_id = :assignment_id AND parent_question_id IS NULL AND deleted_at IS NULL ORDER BY display_order ASC"
        );
        $stmt->execute(['assignment_id' => $assignmentId]);
        $questions = $stmt->fetchAll();

        foreach ($questions as &$question) {
            $questionId = (int) $question['id'];

            if (in_array($question['question_type'], ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'], true)) {
                $optStmt = $this->pdo->prepare("SELECT * FROM assignment_question_options WHERE question_id = :question_id ORDER BY display_order ASC");
                $optStmt->execute(['question_id' => $questionId]);
                $question['options'] = $optStmt->fetchAll();
            }

            if ($question['question_type'] === 'scenario') {
                $subStmt = $this->pdo->prepare("SELECT * FROM assignment_questions WHERE parent_question_id = :parent_id AND deleted_at IS NULL ORDER BY display_order ASC");
                $subStmt->execute(['parent_id' => $questionId]);
                $question['sub_questions'] = $subStmt->fetchAll();
            }

            // Fetch this question's own answer row up front - exposed directly, and every
            // non-objective question also gets a drawing/annotation layer below regardless of
            // whether the student actually used it (every free-response question offers typed,
            // drawn, and PDF-upload input together, not as a locked single mode).
            $ansStmt = $this->pdo->prepare("SELECT * FROM assignment_answers WHERE submission_id = :submission_id AND question_id = :question_id");
            $ansStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
            $questionAnswer = $ansStmt->fetch();
            $question['answer'] = $questionAnswer ?: null;

            if (!in_array($question['question_type'], ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'], true)) {
                $qaStmt = $this->pdo->prepare("SELECT page_number, annotation_data FROM question_annotations WHERE question_id = :question_id ORDER BY page_number ASC");
                $qaStmt->execute(['question_id' => $questionId]);
                $questionPages = [];
                foreach ($qaStmt->fetchAll() as $row) {
                    $questionPages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
                }
                $question['question_annotations'] = $questionPages;

                $saStmt = $this->pdo->prepare("SELECT page_number, annotation_data FROM student_answer_annotations WHERE submission_id = :submission_id AND question_id = :question_id ORDER BY page_number ASC");
                $saStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                $answerPages = [];
                foreach ($saStmt->fetchAll() as $row) {
                    $answerPages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
                }
                $question['answer_annotations'] = $answerPages;

                if ($includeMarking) {
                    // attachment_id IS NULL scopes this to the primary evidence file only - each
                    // supplementary file below gets its own marking_annotations, keyed separately,
                    // matching Teacher\MarkingController::getSubmissionForMarking().
                    $maStmt = $this->pdo->prepare("SELECT page_number, annotation_data FROM assignment_annotations WHERE submission_id = :submission_id AND question_id = :question_id AND attachment_id IS NULL ORDER BY page_number ASC");
                    $maStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                    $markingPages = [];
                    foreach ($maStmt->fetchAll() as $row) {
                        $markingPages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
                    }
                    $question['marking_annotations'] = $markingPages;
                }

                // Supplementary "additional files" - every extra file the student attached,
                // independent of the single primary attachment above, each with any marks the
                // teacher has made on it (view-only here, matching the rest of this page).
                $afStmt = $this->pdo->prepare(
                    "SELECT id, file_path, original_name, file_type FROM assignment_answer_attachments
                     WHERE submission_id = :submission_id AND question_id = :question_id ORDER BY display_order ASC, id ASC"
                );
                $afStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                $question['answer_attachments'] = array_map(function ($row) use ($includeMarking, $submissionId, $questionId) {
                    $file = [
                        'id' => (int) $row['id'],
                        'path' => $row['file_path'],
                        'original_name' => $row['original_name'],
                        'file_type' => $row['file_type'],
                    ];
                    if ($includeMarking) {
                        $fileMaStmt = $this->pdo->prepare(
                            "SELECT page_number, annotation_data FROM assignment_annotations
                             WHERE submission_id = :submission_id AND question_id = :question_id AND attachment_id = :attachment_id
                             ORDER BY page_number ASC"
                        );
                        $fileMaStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId, 'attachment_id' => $row['id']]);
                        $filePages = [];
                        foreach ($fileMaStmt->fetchAll() as $faRow) {
                            $filePages[(int) $faRow['page_number']] = json_decode($faRow['annotation_data'] ?? '[]', true) ?: [];
                        }
                        $file['marking_annotations'] = $filePages;
                    }
                    return $file;
                }, $afStmt->fetchAll());
            }

            if ($includeMarking) {
                $qmStmt = $this->pdo->prepare("SELECT marks_awarded, feedback FROM question_marks WHERE submission_id = :submission_id AND question_id = :question_id");
                $qmStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                $question['question_mark'] = $qmStmt->fetch() ?: null;
            }
        }

        return $questions;
    }

    /**
     * Get student's submission for an assignment
     */
    public function getSubmission()
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $assignmentId = $this->routeParam('assignment_id');
        $submissionId = $this->routeParam('submission_id');

        try {
            $sql = "SELECT sub.*, a.title as assignment_title, a.total_marks
                    FROM assignment_submissions sub
                    INNER JOIN assignments a ON sub.assignment_id = a.id
                    WHERE sub.id = :submission_id
                    AND sub.student_id = :student_id
                    AND sub.assignment_id = :assignment_id";

            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                'submission_id' => $submissionId,
                'student_id' => $studentId,
                'assignment_id' => $assignmentId
            ]);
            $submission = $stmt->fetch();

            if (!$submission) {
                $this->notFound('Submission not found');
                return;
            }

            // Get answers
            $answersSql = "SELECT ans.*, q.question_text, q.question_type, q.marks as max_marks
                           FROM assignment_answers ans
                           INNER JOIN assignment_questions q ON ans.question_id = q.id
                           WHERE ans.submission_id = :submission_id";

            $stmt = $this->pdo->prepare($answersSql);
            $stmt->execute(['submission_id' => $submissionId]);
            $answers = $stmt->fetchAll();

            $questions = $this->loadQuestionsWithLayers((int) $assignmentId, (int) $submissionId, false);

            $this->success([
                'submission' => $submission,
                'answers' => $answers,
                'questions' => $questions
            ]);
        } catch (\Exception $e) {
            $this->serverError('Failed to load submission: ' . $e->getMessage());
        }
    }

    /**
     * Get student's result for an assignment
     */
    public function getResult()
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $assignmentId = $this->routeParam('assignment_id');
        $submissionId = $this->routeParam('submission_id');

        try {
            $sql = "SELECT sub.*, a.title as assignment_title, a.total_marks, a.pass_mark
                    FROM assignment_submissions sub
                    INNER JOIN assignments a ON sub.assignment_id = a.id
                    WHERE sub.id = :submission_id
                    AND sub.student_id = :student_id
                    AND sub.assignment_id = :assignment_id
                    AND sub.released_at IS NOT NULL";

            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                'submission_id' => $submissionId,
                'student_id' => $studentId,
                'assignment_id' => $assignmentId
            ]);
            $submission = $stmt->fetch();

            if (!$submission) {
                $this->notFound('Result not found or not yet released');
                return;
            }

            // Get answers with marks and feedback
            $answersSql = "SELECT ans.*, q.question_text, q.question_type, q.marks as max_marks
                           FROM assignment_answers ans
                           INNER JOIN assignment_questions q ON ans.question_id = q.id
                           WHERE ans.submission_id = :submission_id";

            $stmt = $this->pdo->prepare($answersSql);
            $stmt->execute(['submission_id' => $submissionId]);
            $answers = $stmt->fetchAll();

            $questions = $this->loadQuestionsWithLayers((int) $assignmentId, (int) $submissionId, true);

            $summary = Grading::computeSummary(
                (float) ($submission['total_score'] ?? 0),
                (float) ($submission['total_marks'] ?? 0)
            );

            $this->success([
                'submission' => $submission,
                'answers' => $answers,
                'questions' => $questions,
                'summary' => $summary
            ]);
        } catch (\Exception $e) {
            $this->serverError('Failed to load result: ' . $e->getMessage());
        }
    }

    /**
     * Autosave the student's own drawing/writing layer for one page of a canvas/pdf_annotation question.
     * Creates the in-progress submission on first save, same as submit() does for text answers.
     * POST /student/assignments/questions/{questionId}/answer-annotations
     */
    public function saveAnswerAnnotations(): void
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $questionId = (int) $this->routeParam('questionId');
        $data = $this->input();
        $assignmentId = (int) ($data['assignment_id'] ?? 0);
        $pageNumber = (int) ($data['page_number'] ?? 1);
        $annotationData = is_array($data['annotation_data'] ?? null) ? $data['annotation_data'] : [];

        try {
            $this->pdo->beginTransaction();

            // Verify the assignment is published and the student is enrolled in its class
            $stmt = $this->pdo->prepare(
                "SELECT id FROM assignments a WHERE a.id = :assignment_id AND a.status = 'published'
                 AND EXISTS (
                     SELECT 1 FROM student_department_enrollments sde
                     LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                     WHERE sde.student_id = :student_id
                       AND (
                         sde.class_id = a.class_id
                         OR (a.class_group_name IS NOT NULL AND sde_c.name = a.class_group_name)
                         OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id AND ac.class_id = sde.class_id)
                       )
                       AND sde.department_id = (SELECT department_id FROM subjects WHERE id = a.subject_id)
                       AND sde.deleted_at IS NULL
                       AND sde.status = 'active'
                       AND COALESCE(a.published_at, a.created_at) BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
                 )
                 AND NOT EXISTS (
                     SELECT 1 FROM student_teacher_enrollments ste
                     WHERE ste.student_id = :student_id_te
                       AND ste.teacher_id = a.teacher_id
                       AND ste.department_id = (SELECT department_id FROM subjects WHERE id = a.subject_id)
                       AND ste.status = 'withdrawn'
                 )"
            );
            $stmt->execute(['assignment_id' => $assignmentId, 'student_id' => $studentId, 'student_id_te' => $studentId]);
            if (!$stmt->fetch()) {
                $this->pdo->rollBack();
                $this->notFound('Assignment not found or access denied');
                return;
            }

            // Verify the question actually belongs to this assignment
            $stmt = $this->pdo->prepare("SELECT id, response_type FROM assignment_questions WHERE id = :question_id AND assignment_id = :assignment_id AND deleted_at IS NULL");
            $stmt->execute(['question_id' => $questionId, 'assignment_id' => $assignmentId]);
            $question = $stmt->fetch();
            if (!$question) {
                $this->pdo->rollBack();
                $this->notFound('Question not found');
                return;
            }

            // Get or create the in-progress submission
            $stmt = $this->pdo->prepare(
                "SELECT id, status FROM assignment_submissions WHERE assignment_id = :assignment_id AND student_id = :student_id ORDER BY attempt_number DESC LIMIT 1"
            );
            $stmt->execute(['assignment_id' => $assignmentId, 'student_id' => $studentId]);
            $submission = $stmt->fetch();

            if ($submission && $submission['status'] !== 'in_progress') {
                $this->pdo->rollBack();
                $this->error('This attempt is no longer editable', 403);
                return;
            }

            if ($submission) {
                $submissionId = $submission['id'];
            } else {
                $stmt = $this->pdo->prepare(
                    "SELECT COALESCE(MAX(attempt_number), 0) + 1 as next_attempt FROM assignment_submissions WHERE assignment_id = :assignment_id AND student_id = :student_id"
                );
                $stmt->execute(['assignment_id' => $assignmentId, 'student_id' => $studentId]);
                $attemptNumber = $stmt->fetch()['next_attempt'];

                $stmt = $this->pdo->prepare(
                    "INSERT INTO assignment_submissions (assignment_id, student_id, attempt_number, started_at, status, created_at, updated_at)
                     VALUES (:assignment_id, :student_id, :attempt_number, NOW(), 'in_progress', NOW(), NOW())"
                );
                $stmt->execute(['assignment_id' => $assignmentId, 'student_id' => $studentId, 'attempt_number' => $attemptNumber]);
                $submissionId = $this->pdo->lastInsertId();
            }

            // Upsert this page's annotation layer
            $stmt = $this->pdo->prepare(
                "SELECT id FROM student_answer_annotations WHERE submission_id = :submission_id AND question_id = :question_id AND page_number = :page_number"
            );
            $stmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId, 'page_number' => $pageNumber]);
            $existing = $stmt->fetch();

            if ($existing) {
                $stmt = $this->pdo->prepare("UPDATE student_answer_annotations SET annotation_data = :data, updated_at = NOW() WHERE id = :id");
                $stmt->execute(['data' => json_encode($annotationData), 'id' => $existing['id']]);
            } else {
                $stmt = $this->pdo->prepare(
                    "INSERT INTO student_answer_annotations (submission_id, question_id, student_id, page_number, annotation_data, created_at, updated_at)
                     VALUES (:submission_id, :question_id, :student_id, :page_number, :data, NOW(), NOW())"
                );
                $stmt->execute([
                    'submission_id' => $submissionId,
                    'question_id' => $questionId,
                    'student_id' => $studentId,
                    'page_number' => $pageNumber,
                    'data' => json_encode($annotationData),
                ]);
            }

            // For a student-chosen mode (question isn't teacher-locked to canvas/pdf_annotation),
            // record 'canvas' as the answer_mode so the teacher-marking view knows to render this
            // question via the canvas even if the student never typed anything for it. Only do
            // this when there's no existing pdf_upload attachment for the question - annotating
            // on top of an uploaded PDF should not overwrite that mode back to 'canvas'.
            if (!in_array($question['response_type'] ?? 'text', ['canvas', 'pdf_annotation'], true)) {
                $stmt = $this->pdo->prepare("SELECT id, student_attachment_path FROM assignment_answers WHERE submission_id = :submission_id AND question_id = :question_id");
                $stmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                $existingAnswer = $stmt->fetch();

                if (!$existingAnswer) {
                    $stmt = $this->pdo->prepare(
                        "INSERT INTO assignment_answers (submission_id, question_id, answer_mode, created_at, updated_at)
                         VALUES (:submission_id, :question_id, 'canvas', NOW(), NOW())"
                    );
                    $stmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                } elseif (empty($existingAnswer['student_attachment_path'])) {
                    $stmt = $this->pdo->prepare("UPDATE assignment_answers SET answer_mode = 'canvas', updated_at = NOW() WHERE id = :id");
                    $stmt->execute(['id' => $existingAnswer['id']]);
                }
            }

            $this->pdo->commit();

            $this->success(['submission_id' => (int) $submissionId], 'Annotations saved successfully');
        } catch (\Exception $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            $this->serverError('Failed to save answer annotations: ' . $e->getMessage());
        }
    }

    /**
     * Reload the student's own saved annotations for a question (e.g. after a refresh).
     * GET /student/assignments/questions/{questionId}/answer-annotations/{submissionId}
     */
    public function getAnswerAnnotations(): void
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $questionId = (int) $this->routeParam('questionId');
        $submissionId = (int) $this->routeParam('submissionId');

        try {
            $stmt = $this->pdo->prepare("SELECT id FROM assignment_submissions WHERE id = :submission_id AND student_id = :student_id");
            $stmt->execute(['submission_id' => $submissionId, 'student_id' => $studentId]);
            if (!$stmt->fetch()) {
                $this->forbidden('You do not have access to this submission');
                return;
            }

            $stmt = $this->pdo->prepare(
                "SELECT page_number, annotation_data FROM student_answer_annotations WHERE submission_id = :submission_id AND question_id = :question_id ORDER BY page_number ASC"
            );
            $stmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);

            $pages = [];
            foreach ($stmt->fetchAll() as $row) {
                $pages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
            }

            $this->success(['pages' => $pages]);
        } catch (\Exception $e) {
            $this->serverError('Failed to load answer annotations');
        }
    }

    /**
     * Shared validation, enrollment/submission lookup, and on-disk file save for a student's
     * free-response file upload - used by both the single "primary" upload slot
     * (uploadAnswerAttachment) and the multi-file "additional files" gallery
     * (uploadAnswerAttachmentFile). Must be called inside an already-open transaction; on any
     * failure this sends the error response itself, rolls back, and returns null so callers can
     * just `if (!$ctx) return;`. On success the transaction is left open for the caller to do its
     * own table-specific write (upsert vs insert) before committing.
     */
    private function prepareAnswerFileUpload(int $questionId, int $assignmentId, int $studentId): ?array
    {
        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            $this->error('No file uploaded or upload error occurred', 400);
            return null;
        }

        $file = $_FILES['file'];
        $maxSize = 20 * 1024 * 1024; // 20MB

        if ($file['size'] > $maxSize) {
            $this->error('File exceeds maximum size of 20MB', 400);
            return null;
        }

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        $imageExtensions = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
        $isPdf = $mimeType === 'application/pdf';
        $isImage = isset($imageExtensions[$mimeType]);

        if (!$isPdf && !$isImage) {
            $this->error('Only PDF, JPG, PNG, or WEBP files are allowed', 400);
            return null;
        }

        // Verify the assignment is published and the student is enrolled in its class
        $stmt = $this->pdo->prepare(
            "SELECT id FROM assignments a WHERE a.id = :assignment_id AND a.status = 'published'
             AND EXISTS (
                 SELECT 1 FROM student_department_enrollments sde
                 LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                 WHERE sde.student_id = :student_id
                   AND (
                     sde.class_id = a.class_id
                     OR (a.class_group_name IS NOT NULL AND sde_c.name = a.class_group_name)
                     OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id AND ac.class_id = sde.class_id)
                   )
                   AND sde.department_id = (SELECT department_id FROM subjects WHERE id = a.subject_id)
                   AND sde.deleted_at IS NULL
                   AND sde.status = 'active'
                   AND COALESCE(a.published_at, a.created_at) BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
             )
             AND NOT EXISTS (
                 SELECT 1 FROM student_teacher_enrollments ste
                 WHERE ste.student_id = :student_id_te
                   AND ste.teacher_id = a.teacher_id
                   AND ste.department_id = (SELECT department_id FROM subjects WHERE id = a.subject_id)
                   AND ste.status = 'withdrawn'
             )"
        );
        $stmt->execute(['assignment_id' => $assignmentId, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        if (!$stmt->fetch()) {
            $this->pdo->rollBack();
            $this->notFound('Assignment not found or access denied');
            return null;
        }

        // Verify the question actually belongs to this assignment
        $stmt = $this->pdo->prepare("SELECT id FROM assignment_questions WHERE id = :question_id AND assignment_id = :assignment_id AND deleted_at IS NULL");
        $stmt->execute(['question_id' => $questionId, 'assignment_id' => $assignmentId]);
        if (!$stmt->fetch()) {
            $this->pdo->rollBack();
            $this->notFound('Question not found');
            return null;
        }

        // Get or create the in-progress submission
        $stmt = $this->pdo->prepare(
            "SELECT id, status FROM assignment_submissions WHERE assignment_id = :assignment_id AND student_id = :student_id ORDER BY attempt_number DESC LIMIT 1"
        );
        $stmt->execute(['assignment_id' => $assignmentId, 'student_id' => $studentId]);
        $submission = $stmt->fetch();

        if ($submission && $submission['status'] !== 'in_progress') {
            $this->pdo->rollBack();
            $this->error('This attempt is no longer editable', 403);
            return null;
        }

        if ($submission) {
            $submissionId = $submission['id'];
        } else {
            $stmt = $this->pdo->prepare(
                "SELECT COALESCE(MAX(attempt_number), 0) + 1 as next_attempt FROM assignment_submissions WHERE assignment_id = :assignment_id AND student_id = :student_id"
            );
            $stmt->execute(['assignment_id' => $assignmentId, 'student_id' => $studentId]);
            $attemptNumber = $stmt->fetch()['next_attempt'];

            $stmt = $this->pdo->prepare(
                "INSERT INTO assignment_submissions (assignment_id, student_id, attempt_number, started_at, status, created_at, updated_at)
                 VALUES (:assignment_id, :student_id, :attempt_number, NOW(), 'in_progress', NOW(), NOW())"
            );
            $stmt->execute(['assignment_id' => $assignmentId, 'student_id' => $studentId, 'attempt_number' => $attemptNumber]);
            $submissionId = $this->pdo->lastInsertId();
        }

        $uploadDir = __DIR__ . '/../../../public/uploads/assignment_submissions/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Never trust the original filename; generate a unique one from random bytes.
        $extension = $isPdf ? 'pdf' : $imageExtensions[$mimeType];
        $filename = 'answer_' . $questionId . '_' . $studentId . '_' . bin2hex(random_bytes(8)) . '_' . time() . '.' . $extension;
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            $this->pdo->rollBack();
            $this->serverError('Failed to save uploaded file');
            return null;
        }

        // Re-validate actual file content after the move (MIME sniffing can be spoofed pre-upload).
        if ($isPdf) {
            $isValid = substr((string) file_get_contents($filepath, false, null, 0, 5), 0, 5) === '%PDF-';
        } else {
            $isValid = @getimagesize($filepath) !== false;
        }

        if (!$isValid) {
            unlink($filepath);
            $this->pdo->rollBack();
            $this->error('Uploaded file is not a valid ' . ($isPdf ? 'PDF' : 'image'), 400);
            return null;
        }

        return [
            'submission_id' => (int) $submissionId,
            'url' => '/uploads/assignment_submissions/' . $filename,
            'original_name' => basename((string) $file['name']),
            'is_pdf' => $isPdf,
        ];
    }

    /**
     * Upload the student's own PDF or image as their answer to a free-response question, so
     * they can then write/draw on top of it via saveAnswerAnnotations(). Creates the in-progress
     * submission on first save, same as submit()/saveAnswerAnnotations() do.
     * POST /student/assignments/questions/{questionId}/upload-answer-pdf
     */
    public function uploadAnswerAttachment(): void
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $questionId = (int) $this->routeParam('questionId');
        $assignmentId = (int) $this->input('assignment_id', 0);

        try {
            $this->pdo->beginTransaction();

            $ctx = $this->prepareAnswerFileUpload($questionId, $assignmentId, $studentId);
            if (!$ctx) {
                return;
            }

            $answerMode = $ctx['is_pdf'] ? 'pdf_upload' : 'image_upload';

            $stmt = $this->pdo->prepare("SELECT id, student_attachment_path FROM assignment_answers WHERE submission_id = :submission_id AND question_id = :question_id");
            $stmt->execute(['submission_id' => $ctx['submission_id'], 'question_id' => $questionId]);
            $existingAnswer = $stmt->fetch();

            if ($existingAnswer) {
                $stmt = $this->pdo->prepare(
                    "UPDATE assignment_answers SET answer_mode = :answer_mode, student_attachment_path = :path, student_attachment_original_name = :name, updated_at = NOW() WHERE id = :id"
                );
                $stmt->execute(['answer_mode' => $answerMode, 'path' => $ctx['url'], 'name' => $ctx['original_name'], 'id' => $existingAnswer['id']]);

                // Replacing a previous upload for the same question - remove the old file.
                if (!empty($existingAnswer['student_attachment_path']) && $existingAnswer['student_attachment_path'] !== $ctx['url']) {
                    $oldPath = __DIR__ . '/../../../public' . $existingAnswer['student_attachment_path'];
                    if (is_file($oldPath)) {
                        unlink($oldPath);
                    }
                }
            } else {
                $stmt = $this->pdo->prepare(
                    "INSERT INTO assignment_answers (submission_id, question_id, answer_mode, student_attachment_path, student_attachment_original_name, created_at, updated_at)
                     VALUES (:submission_id, :question_id, :answer_mode, :path, :name, NOW(), NOW())"
                );
                $stmt->execute(['submission_id' => $ctx['submission_id'], 'question_id' => $questionId, 'answer_mode' => $answerMode, 'path' => $ctx['url'], 'name' => $ctx['original_name']]);
            }

            $this->pdo->commit();

            $this->success([
                'submission_id' => $ctx['submission_id'],
                'path' => $ctx['url'],
                'original_name' => $ctx['original_name'],
                'kind' => $ctx['is_pdf'] ? 'pdf' : 'image',
            ], ($ctx['is_pdf'] ? 'PDF' : 'Image') . ' uploaded successfully');
        } catch (\Exception $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            $this->serverError('Failed to upload file: ' . $e->getMessage());
        }
    }

    /**
     * Add one supplementary file to a question's answer, independent of the single "primary"
     * upload slot above (never touches assignment_answers.student_attachment_path) - the student
     * can attach any number of these, e.g. several photos of handwritten work. One file per
     * request; the frontend loops a multi-select FileList, calling this once per file.
     * POST /student/assignments/questions/{questionId}/answer-attachments
     */
    public function uploadAnswerAttachmentFile(): void
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $questionId = (int) $this->routeParam('questionId');
        $assignmentId = (int) $this->input('assignment_id', 0);

        try {
            $this->pdo->beginTransaction();

            $ctx = $this->prepareAnswerFileUpload($questionId, $assignmentId, $studentId);
            if (!$ctx) {
                return;
            }

            $stmt = $this->pdo->prepare(
                "INSERT INTO assignment_answer_attachments (submission_id, question_id, file_path, original_name, file_type, created_at)
                 VALUES (:submission_id, :question_id, :path, :name, :file_type, NOW())"
            );
            $stmt->execute([
                'submission_id' => $ctx['submission_id'],
                'question_id' => $questionId,
                'path' => $ctx['url'],
                'name' => $ctx['original_name'],
                'file_type' => $ctx['is_pdf'] ? 'pdf' : 'image',
            ]);
            $attachmentId = (int) $this->pdo->lastInsertId();

            $this->pdo->commit();

            $this->success([
                'id' => $attachmentId,
                'submission_id' => $ctx['submission_id'],
                'path' => $ctx['url'],
                'original_name' => $ctx['original_name'],
                'kind' => $ctx['is_pdf'] ? 'pdf' : 'image',
            ], 'File uploaded successfully');
        } catch (\Exception $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            $this->serverError('Failed to upload file: ' . $e->getMessage());
        }
    }

    /**
     * List a question's supplementary files for a submission - used to restore state after a
     * page reload (the main assignment-load response also inlines this per-question, this
     * endpoint exists as the direct read counterpart to uploadAnswerAttachmentFile).
     * GET /student/assignments/questions/{questionId}/answer-attachments/{submissionId}
     */
    public function listAnswerAttachments(): void
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $questionId = (int) $this->routeParam('questionId');
        $submissionId = (int) $this->routeParam('submissionId');

        try {
            $stmt = $this->pdo->prepare(
                "SELECT aa.id, aa.file_path, aa.original_name, aa.file_type
                 FROM assignment_answer_attachments aa
                 INNER JOIN assignment_submissions s ON s.id = aa.submission_id
                 WHERE aa.submission_id = :submission_id AND aa.question_id = :question_id AND s.student_id = :student_id
                 ORDER BY aa.display_order ASC, aa.id ASC"
            );
            $stmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId, 'student_id' => $studentId]);

            $this->success(['files' => $stmt->fetchAll()]);
        } catch (\Exception $e) {
            $this->serverError('Failed to load files');
        }
    }

    /**
     * Remove one supplementary file. Verifies the attachment's submission belongs to the current
     * student and is still editable before deleting the DB row and the file on disk.
     * DELETE /student/assignments/questions/{questionId}/answer-attachments/{attachmentId}
     */
    public function deleteAnswerAttachment(): void
    {
        $this->requireAuth();
        $this->requireRole('student');

        $studentId = $this->getCurrentUserId();
        $attachmentId = (int) $this->routeParam('attachmentId');

        try {
            $stmt = $this->pdo->prepare(
                "SELECT aa.id, aa.file_path FROM assignment_answer_attachments aa
                 INNER JOIN assignment_submissions s ON s.id = aa.submission_id
                 WHERE aa.id = :id AND s.student_id = :student_id AND s.status = 'in_progress'"
            );
            $stmt->execute(['id' => $attachmentId, 'student_id' => $studentId]);
            $attachment = $stmt->fetch();

            if (!$attachment) {
                $this->notFound('File not found or this attempt is no longer editable');
                return;
            }

            $stmt = $this->pdo->prepare("DELETE FROM assignment_answer_attachments WHERE id = :id");
            $stmt->execute(['id' => $attachmentId]);

            $filepath = __DIR__ . '/../../../public' . $attachment['file_path'];
            if (is_file($filepath)) {
                unlink($filepath);
            }

            $this->success([], 'File removed');
        } catch (\Exception $e) {
            $this->serverError('Failed to remove file');
        }
    }
}
