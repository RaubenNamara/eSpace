<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;
use eSpace\App\Services\RewardService;
use eSpace\Config\Database;
use eSpace\App\Utils\Grading;
use Exception;
use PDO;

/**
 * Teacher Marking Controller
 *
 * Handles the teacher-marking layer: annotating directly over a student's
 * submitted work, awarding per-question marks, general feedback, and the
 * submission status workflow (submitted -> marking -> graded -> returned).
 */
class MarkingController extends Controller
{
    private function getDb(): PDO
    {
        return Database::getInstance();
    }

    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Verify the teacher owns the assignment this submission belongs to.
     * Returns the submission row (with assignment_id/student_id) on success, else null.
     */
    private function verifySubmissionOwnership(int $submissionId, int $teacherId): ?array
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT sub.* FROM assignment_submissions sub
             INNER JOIN assignments a ON sub.assignment_id = a.id
             WHERE sub.id = :submission_id AND a.teacher_id = :teacher_id AND a.deleted_at IS NULL"
        );
        $stmt->execute(['submission_id' => $submissionId, 'teacher_id' => $teacherId]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /**
     * The questions a colleague was given to mark on someone else's assessment (shared marking,
     * assignment_markers), or null when they were given none.
     */
    private function markerQuestions(int $assignmentId, int $teacherId): ?array
    {
        try {
            $stmt = $this->getDb()->prepare('SELECT question_ids FROM assignment_markers WHERE assignment_id = ? AND teacher_id = ?');
            $stmt->execute([$assignmentId, $teacherId]);
            $raw = $stmt->fetchColumn();
        } catch (\PDOException $e) {
            return null; // the table isn't there yet
        }
        if ($raw === false) {
            return null;
        }
        return array_values(array_map('intval', json_decode((string) $raw, true) ?: []));
    }

    /**
     * A script on an assessment a colleague shared some questions of with this teacher:
     * [submission row, the question ids they mark], or [null, null] when it isn't shared with them.
     * The script must belong to the assessment in the URL.
     */
    private function sharedScript(int $submissionId, int $teacherId): array
    {
        $stmt = $this->getDb()->prepare('SELECT * FROM assignment_submissions WHERE id = ? AND assignment_id = ?');
        $stmt->execute([$submissionId, (int) $this->routeParam('id')]);
        $sub = $stmt->fetch(PDO::FETCH_ASSOC);
        $mine = $sub ? $this->markerQuestions((int) $sub['assignment_id'], $teacherId) : null;
        return $sub && $mine !== null ? [$sub, $mine] : [null, null];
    }

    /**
     * Full combined payload for the marking workspace: question + teacher's question
     * annotations + student's answers + student's answer annotations + existing marking
     * annotations + existing per-question marks.
     * GET /teacher/assignments/{id}/submissions/{submissionId}/marking
     */
    public function getSubmissionForMarking(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $submissionId = (int) $this->routeParam('submissionId');

        $submission = $this->verifySubmissionOwnership($submissionId, $teacherId);
        $onlyQuestions = null;
        if (!$submission) {
            // a colleague sharing the marking sees the script's answers to their questions only
            [$submission, $onlyQuestions] = $this->sharedScript($submissionId, (int) $teacherId);
        }
        if (!$submission) {
            $this->forbidden('You do not have permission to view this submission');
            return;
        }

        try {
            $db = $this->getDb();

            $stmt = $db->prepare(
                "SELECT sub.*, CONCAT(s.first_name, ' ', s.last_name) as student_name, s.admission_number,
                        a.title as assignment_title, a.total_marks, a.pass_mark
                 FROM assignment_submissions sub
                 INNER JOIN students s ON sub.student_id = s.id
                 INNER JOIN assignments a ON sub.assignment_id = a.id
                 WHERE sub.id = :submission_id"
            );
            $stmt->execute(['submission_id' => $submissionId]);
            $submissionDetail = $stmt->fetch();

            $stmt = $db->prepare(
                "SELECT * FROM assignment_questions WHERE assignment_id = :assignment_id AND parent_question_id IS NULL AND deleted_at IS NULL ORDER BY display_order ASC"
            );
            $stmt->execute(['assignment_id' => $submission['assignment_id']]);
            $questions = $stmt->fetchAll();
            if ($onlyQuestions !== null) {
                $questions = array_values(array_filter($questions, static fn ($q) => in_array((int) $q['id'], $onlyQuestions, true)));
            }

            $stmt = $db->prepare("SELECT * FROM assignment_answers WHERE submission_id = :submission_id");
            $stmt->execute(['submission_id' => $submissionId]);
            $answersByQuestion = [];
            foreach ($stmt->fetchAll() as $answer) {
                $answersByQuestion[(int) $answer['question_id']] = $answer;
            }

            $stmt = $db->prepare("SELECT * FROM question_marks WHERE submission_id = :submission_id");
            $stmt->execute(['submission_id' => $submissionId]);
            $marksByQuestion = [];
            foreach ($stmt->fetchAll() as $mark) {
                $marksByQuestion[(int) $mark['question_id']] = $mark;
            }

            foreach ($questions as &$question) {
                $questionId = (int) $question['id'];

                if (in_array($question['question_type'], ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'], true)) {
                    $optStmt = $db->prepare("SELECT * FROM assignment_question_options WHERE question_id = :question_id ORDER BY display_order ASC");
                    $optStmt->execute(['question_id' => $questionId]);
                    $question['options'] = $optStmt->fetchAll();
                }

                if ($question['question_type'] === 'scenario') {
                    $subStmt = $db->prepare("SELECT * FROM assignment_questions WHERE parent_question_id = :parent_id AND deleted_at IS NULL ORDER BY display_order ASC");
                    $subStmt->execute(['parent_id' => $questionId]);
                    $question['sub_questions'] = $subStmt->fetchAll();
                }

                // Every non-objective question offers typed, drawn, and PDF-upload input together
                // (not a single locked mode), so load its drawing/annotation layers regardless of
                // whether the student actually used them.
                if (!in_array($question['question_type'], ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'], true)) {
                    $qaStmt = $db->prepare("SELECT page_number, annotation_data FROM question_annotations WHERE question_id = :question_id ORDER BY page_number ASC");
                    $qaStmt->execute(['question_id' => $questionId]);
                    $questionPages = [];
                    foreach ($qaStmt->fetchAll() as $row) {
                        $questionPages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
                    }
                    $question['question_annotations'] = $questionPages;

                    $saStmt = $db->prepare("SELECT page_number, annotation_data FROM student_answer_annotations WHERE submission_id = :submission_id AND question_id = :question_id ORDER BY page_number ASC");
                    $saStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                    $answerPages = [];
                    foreach ($saStmt->fetchAll() as $row) {
                        $answerPages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
                    }
                    $question['answer_annotations'] = $answerPages;

                    // attachment_id IS NULL scopes this to the primary evidence file only - each
                    // supplementary file below gets its own marking_annotations, keyed separately
                    // by attachment_id, so page 1 of one file never collides with page 1 of another.
                    $maStmt = $db->prepare("SELECT page_number, annotation_data FROM assignment_annotations WHERE submission_id = :submission_id AND question_id = :question_id AND attachment_id IS NULL ORDER BY page_number ASC");
                    $maStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                    $markingPages = [];
                    foreach ($maStmt->fetchAll() as $row) {
                        $markingPages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
                    }
                    $question['marking_annotations'] = $markingPages;

                    // Supplementary "additional files" - each independently annotatable by the
                    // teacher via its own attachment_id-scoped marking_annotations, distinct from
                    // the primary student_attachment_path/marking_annotations above.
                    $afStmt = $db->prepare(
                        "SELECT id, file_path, original_name, file_type FROM assignment_answer_attachments
                         WHERE submission_id = :submission_id AND question_id = :question_id ORDER BY display_order ASC, id ASC"
                    );
                    $afStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                    $question['answer_attachments'] = array_map(function ($row) use ($db, $submissionId, $questionId) {
                        $fileMaStmt = $db->prepare(
                            "SELECT page_number, annotation_data FROM assignment_annotations
                             WHERE submission_id = :submission_id AND question_id = :question_id AND attachment_id = :attachment_id
                             ORDER BY page_number ASC"
                        );
                        $fileMaStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId, 'attachment_id' => $row['id']]);
                        $filePages = [];
                        foreach ($fileMaStmt->fetchAll() as $faRow) {
                            $filePages[(int) $faRow['page_number']] = json_decode($faRow['annotation_data'] ?? '[]', true) ?: [];
                        }

                        return [
                            'id' => (int) $row['id'],
                            'path' => $row['file_path'],
                            'original_name' => $row['original_name'],
                            'file_type' => $row['file_type'],
                            'marking_annotations' => $filePages,
                        ];
                    }, $afStmt->fetchAll());
                }

                $question['answer'] = $answersByQuestion[$questionId] ?? null;
                $question['question_mark'] = $marksByQuestion[$questionId] ?? null;

                // Read-only curriculum context (section 24: informational labels only, never
                // touches marking/grading logic) - additive fields, absent for any question
                // without a linked curriculum_topic_id/learning_outcome_id.
                if (!empty($question['curriculum_topic_id'])) {
                    $topicStmt = $db->prepare('SELECT theme_branch, topic FROM enote_curriculum_topics WHERE id = :id');
                    $topicStmt->execute(['id' => $question['curriculum_topic_id']]);
                    $topicRow = $topicStmt->fetch();
                    $question['curriculum_topic_name'] = $topicRow['topic'] ?? null;
                    $question['curriculum_theme_branch'] = $topicRow['theme_branch'] ?? null;
                }
                if (!empty($question['learning_outcome_id'])) {
                    $loStmt = $db->prepare('SELECT learning_outcome FROM enote_learning_outcomes WHERE id = :id');
                    $loStmt->execute(['id' => $question['learning_outcome_id']]);
                    $loRow = $loStmt->fetch();
                    $question['curriculum_learning_outcome_text'] = $loRow['learning_outcome'] ?? null;
                }
            }

            $this->success([
                'submission' => $submissionDetail,
                'questions' => $questions,
            ]);
        } catch (Exception $e) {
            error_log('getSubmissionForMarking failed: ' . $e->getMessage());
            $this->serverError('Failed to load submission for marking');
        }
    }

    /**
     * Save (upsert) the teacher's marking annotations for one page of a question.
     * PUT /teacher/assignments/{id}/submissions/{submissionId}/marking-annotations
     */
    public function saveMarkingAnnotations(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $submissionId = (int) $this->routeParam('submissionId');

        $data = $this->input();
        $questionId = (int) ($data['question_id'] ?? 0);

        if (!$this->verifySubmissionOwnership($submissionId, $teacherId)) {
            // a colleague sharing the marking writes on their own questions, on an unfinished script
            [$sub, $mine] = $this->sharedScript($submissionId, (int) $teacherId);
            if (!$sub || !in_array($questionId, $mine, true)) {
                $this->forbidden('You do not have permission to mark this submission');
                return;
            }
            if (in_array($sub['status'], ['graded', 'returned'], true)) {
                $this->error('This script has been finished - the teacher who set it can reopen it', 409);
                return;
            }
        }

        $pageNumber = (int) ($data['page_number'] ?? 1);
        $annotationData = is_array($data['annotation_data'] ?? null) ? $data['annotation_data'] : [];
        // Which file these marks belong to - null (the default, and the only value every row
        // saved before migration 085 has) means the single primary evidence file; a real id
        // targets one of the supplementary files in assignment_answer_attachments instead, since
        // page_number alone can't disambiguate between multiple files' own page 1s.
        $attachmentId = !empty($data['attachment_id']) ? (int) $data['attachment_id'] : null;

        try {
            $db = $this->getDb();

            $stmt = $db->prepare(
                "SELECT id FROM assignment_annotations WHERE submission_id = :submission_id AND question_id = :question_id AND page_number = :page_number AND attachment_id <=> :attachment_id"
            );
            $stmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId, 'page_number' => $pageNumber, 'attachment_id' => $attachmentId]);
            $existing = $stmt->fetch();

            if ($existing) {
                $stmt = $db->prepare("UPDATE assignment_annotations SET annotation_data = :data, updated_at = NOW() WHERE id = :id");
                $stmt->execute(['data' => json_encode($annotationData), 'id' => $existing['id']]);
            } else {
                $stmt = $db->prepare(
                    "INSERT INTO assignment_annotations (submission_id, question_id, attachment_id, teacher_id, type, page_number, x, y, annotation_data, created_at, updated_at)
                     VALUES (:submission_id, :question_id, :attachment_id, :teacher_id, 'shape', :page_number, 0, 0, :data, NOW(), NOW())"
                );
                $stmt->execute([
                    'submission_id' => $submissionId,
                    'question_id' => $questionId,
                    'attachment_id' => $attachmentId,
                    'teacher_id' => $teacherId,
                    'page_number' => $pageNumber,
                    'data' => json_encode($annotationData),
                ]);
            }

            // Marking has started - move out of plain "submitted" so the teacher's in-progress
            // work is visible as a distinct status, without touching marks/feedback yet.
            $stmt = $db->prepare("UPDATE assignment_submissions SET status = 'marking', updated_at = NOW() WHERE id = :id AND status = 'submitted'");
            $stmt->execute(['id' => $submissionId]);

            $this->success([], 'Marking annotations saved successfully');
        } catch (Exception $e) {
            error_log('saveMarkingAnnotations failed: ' . $e->getMessage());
            $this->serverError('Failed to save marking annotations');
        }
    }

    /**
     * Save marks + feedback for one question of a submission.
     * PUT /teacher/assignments/{id}/submissions/{submissionId}/marks
     */
    public function saveQuestionMarks(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $submissionId = (int) $this->routeParam('submissionId');
        $data = $this->input();
        $questionId = (int) ($data['question_id'] ?? 0);

        if (!$this->verifySubmissionOwnership($submissionId, $teacherId)) {
            // a colleague sharing the marking: only their questions, only before the script is finished
            [$sub, $mine] = $this->sharedScript($submissionId, (int) $teacherId);
            if (!$sub || !in_array($questionId, $mine, true)) {
                $this->forbidden('You do not have permission to mark this submission');
                return;
            }
            if (in_array($sub['status'], ['graded', 'returned'], true)) {
                $this->error('This script has been finished - the teacher who set it can reopen it', 409);
                return;
            }
        }
        $marksAwarded = isset($data['marks_awarded']) ? (float) $data['marks_awarded'] : null;
        $feedback = $data['feedback'] ?? null;

        try {
            $db = $this->getDb();

            $stmt = $db->prepare("SELECT id FROM question_marks WHERE submission_id = :submission_id AND question_id = :question_id");
            $stmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
            $existing = $stmt->fetch();

            if ($existing) {
                $stmt = $db->prepare(
                    "UPDATE question_marks SET marks_awarded = :marks_awarded, feedback = :feedback, marked_by = :marked_by, marked_at = NOW(), updated_at = NOW() WHERE id = :id"
                );
                $stmt->execute([
                    'marks_awarded' => $marksAwarded,
                    'feedback' => $feedback,
                    'marked_by' => $teacherId,
                    'id' => $existing['id'],
                ]);
            } else {
                $stmt = $db->prepare(
                    "INSERT INTO question_marks (submission_id, question_id, marks_awarded, feedback, marked_by, marked_at, created_at, updated_at)
                     VALUES (:submission_id, :question_id, :marks_awarded, :feedback, :marked_by, NOW(), NOW(), NOW())"
                );
                $stmt->execute([
                    'submission_id' => $submissionId,
                    'question_id' => $questionId,
                    'marks_awarded' => $marksAwarded,
                    'feedback' => $feedback,
                    'marked_by' => $teacherId,
                ]);
            }

            $stmt = $db->prepare("UPDATE assignment_submissions SET status = 'marking', updated_at = NOW() WHERE id = :id AND status = 'submitted'");
            $stmt->execute(['id' => $submissionId]);

            $this->success([], 'Marks saved successfully');
        } catch (Exception $e) {
            error_log('saveQuestionMarks failed: ' . $e->getMessage());
            $this->serverError('Failed to save marks');
        }
    }

    /**
     * Save the general feedback box (draft-safe: does not change submission status).
     * PUT /teacher/assignments/{id}/submissions/{submissionId}/general-feedback
     */
    public function saveGeneralFeedback(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $submissionId = (int) $this->routeParam('submissionId');

        if (!$this->verifySubmissionOwnership($submissionId, $teacherId)) {
            $this->forbidden('You do not have permission to mark this submission');
            return;
        }

        $data = $this->input();
        $feedback = $data['feedback'] ?? '';

        try {
            $db = $this->getDb();
            $stmt = $db->prepare("UPDATE assignment_submissions SET feedback = :feedback, updated_at = NOW() WHERE id = :id");
            $stmt->execute(['feedback' => $feedback, 'id' => $submissionId]);

            $this->success([], 'Feedback saved successfully');
        } catch (Exception $e) {
            error_log('saveGeneralFeedback failed: ' . $e->getMessage());
            $this->serverError('Failed to save feedback');
        }
    }

    /**
     * Finalize marking: sum question_marks against the assignment's total_marks,
     * compute percentage/grade, and move status to 'graded'.
     * POST /teacher/assignments/{id}/submissions/{submissionId}/complete-marking
     */
    public function completeMarking(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $submissionId = (int) $this->routeParam('submissionId');

        $submission = $this->verifySubmissionOwnership($submissionId, $teacherId);
        if (!$submission) {
            $this->forbidden('You do not have permission to mark this submission');
            return;
        }

        try {
            $summary = $this->totalScript($submission, (int) $teacherId);
            $this->success($summary, 'Marking completed successfully');
        } catch (Exception $e) {
            error_log('completeMarking failed: ' . $e->getMessage());
            $this->serverError('Failed to complete marking');
        }
    }

    /**
     * Publish the marked work to the student.
     * POST /teacher/assignments/{id}/submissions/{submissionId}/return
     */
    public function returnToStudent(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $submissionId = (int) $this->routeParam('submissionId');

        $submission = $this->verifySubmissionOwnership($submissionId, $teacherId);
        if (!$submission) {
            $this->forbidden('You do not have permission to mark this submission');
            return;
        }

        if ($submission['status'] !== 'graded') {
            $this->error('Complete marking before returning this submission to the student', 400);
            return;
        }

        try {
            $this->releaseScript($submission);
            $this->success([], 'Submission returned to student');
        } catch (Exception $e) {
            error_log('returnToStudent failed: ' . $e->getMessage());
            $this->serverError('Failed to return submission');
        }
    }

    /** Adds up a script's question marks and finishes it (status 'graded'); returns the summary */
    private function totalScript(array $submission, int $teacherId): array
    {
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT total_marks FROM assignments WHERE id = :assignment_id");
        $stmt->execute(['assignment_id' => $submission['assignment_id']]);
        $totalMarks = (float) ($stmt->fetch()['total_marks'] ?? 0);

        $stmt = $db->prepare("SELECT COALESCE(SUM(marks_awarded), 0) as total FROM question_marks WHERE submission_id = :submission_id");
        $stmt->execute(['submission_id' => $submission['id']]);
        $marksAwarded = (float) $stmt->fetch()['total'];

        $summary = Grading::computeSummary($marksAwarded, $totalMarks);

        $stmt = $db->prepare(
            "UPDATE assignment_submissions
             SET manual_score = :manual_score, total_score = :total_score, percentage = :percentage,
                 marked_by = :marked_by, marked_at = NOW(), status = 'graded', updated_at = NOW()
             WHERE id = :id"
        );
        $stmt->execute([
            'manual_score' => $summary['marks_awarded'],
            'total_score' => $summary['marks_awarded'],
            'percentage' => $summary['percentage'],
            'marked_by' => $teacherId,
            'id' => $submission['id'],
        ]);
        return $summary;
    }

    /** Hands a finished script back to its student, with the notification and badges */
    private function releaseScript(array $submission): void
    {
        $db = $this->getDb();
        $submissionId = (int) $submission['id'];
        $stmt = $db->prepare("UPDATE assignment_submissions SET status = 'returned', released_at = NOW(), updated_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $submissionId]);

        $stmt = $db->prepare('SELECT title, due_date FROM assignments WHERE id = :id');
        $stmt->execute(['id' => $submission['assignment_id']]);
        $assignment = $stmt->fetch();
        $assignmentTitle = $assignment['title'] ?? 'your assignment';

        (new NotificationService())->notify(
            (int) $submission['student_id'],
            'student',
            'assignment_graded',
            'Assignment graded',
            "\"{$assignmentTitle}\" has been graded and is ready to view.",
            ['assignment_id' => (int) $submission['assignment_id'], 'submission_id' => $submissionId]
        );

        // Automatic badges: recalculate whenever a mark actually becomes visible to a
        // student, the same moment the notification above fires from.
        if (!empty($assignment['due_date'])) {
            $stmt = $db->prepare(
                'SELECT id FROM terms WHERE :due_date BETWEEN start_date AND end_date AND deleted_at IS NULL LIMIT 1'
            );
            $stmt->execute(['due_date' => $assignment['due_date']]);
            $term = $stmt->fetch();
            if ($term) {
                (new RewardService())->evaluateAfterMarksChange((int) $submission['student_id'], (int) $term['id']);
            }
        }
    }

    /**
     * Shared (conveyor-belt) marking: the colleagues marking some of this assessment's questions,
     * and the teachers it can be shared with. Only the teacher who set it.
     * GET /teacher/assignments/{id}/markers
     */
    public function markers(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');
        $teacherId = (int) $this->getTeacherId();
        $assignmentId = (int) $this->routeParam('id');
        if (!$this->ownsAssignment($assignmentId, $teacherId)) {
            $this->notFound('Assessment not found');
            return;
        }
        $db = $this->getDb();
        $stmt = $db->prepare(
            'SELECT m.teacher_id, m.question_ids, t.first_name, t.last_name
               FROM assignment_markers m JOIN teachers t ON t.id = m.teacher_id
              WHERE m.assignment_id = ? ORDER BY t.first_name, t.last_name'
        );
        $stmt->execute([$assignmentId]);
        $markers = array_map(static fn ($m) => [
            'teacher_id' => (int) $m['teacher_id'],
            'name' => trim($m['first_name'] . ' ' . $m['last_name']),
            'question_ids' => array_map('intval', json_decode((string) $m['question_ids'], true) ?: []),
        ], $stmt->fetchAll(PDO::FETCH_ASSOC));

        // Colleagues, those in the assessment's department first
        $stmt = $db->prepare(
            'SELECT t.id, t.first_name, t.last_name, (t.department_id = s.department_id) AS same_dept
               FROM teachers t
               JOIN assignments a ON a.id = ?
               LEFT JOIN subjects s ON s.id = a.subject_id
              WHERE t.deleted_at IS NULL AND t.id <> ?
              ORDER BY same_dept DESC, t.first_name, t.last_name'
        );
        $stmt->execute([$assignmentId, $teacherId]);
        $teachers = array_map(static fn ($t) => [
            'id' => (int) $t['id'],
            'name' => trim($t['first_name'] . ' ' . $t['last_name']),
            'same_department' => (bool) $t['same_dept'],
        ], $stmt->fetchAll(PDO::FETCH_ASSOC));

        $this->success(['markers' => $markers, 'teachers' => $teachers]);
    }

    /**
     * Give a colleague questions to mark (replaces what they had); no questions takes them off.
     * PUT /teacher/assignments/{id}/markers   { teacher_id, question_ids: [] }
     */
    public function saveMarker(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');
        $teacherId = (int) $this->getTeacherId();
        $assignmentId = (int) $this->routeParam('id');
        if (!$this->ownsAssignment($assignmentId, $teacherId)) {
            $this->notFound('Assessment not found');
            return;
        }
        $data = $this->input();
        $colleagueId = (int) ($data['teacher_id'] ?? 0);
        $db = $this->getDb();

        $stmt = $db->prepare('SELECT id, first_name, last_name FROM teachers WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([$colleagueId]);
        $colleague = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$colleague || $colleagueId === $teacherId) {
            $this->error('Choose a colleague to share the marking with', 422);
            return;
        }

        // only this assessment's own (top-level) questions
        $stmt = $db->prepare('SELECT id FROM assignment_questions WHERE assignment_id = ? AND parent_question_id IS NULL AND deleted_at IS NULL');
        $stmt->execute([$assignmentId]);
        $valid = array_map('intval', $stmt->fetchAll(PDO::FETCH_COLUMN));
        $ids = array_values(array_unique(array_intersect(array_map('intval', (array) ($data['question_ids'] ?? [])), $valid)));

        $stmt = $db->prepare('SELECT question_ids FROM assignment_markers WHERE assignment_id = ? AND teacher_id = ?');
        $stmt->execute([$assignmentId, $colleagueId]);
        $before = $stmt->fetchColumn();

        if (!$ids) {
            $db->prepare('DELETE FROM assignment_markers WHERE assignment_id = ? AND teacher_id = ?')->execute([$assignmentId, $colleagueId]);
            $this->success([], 'Marking no longer shared with ' . $colleague['first_name']);
            return;
        }
        $db->prepare(
            'INSERT INTO assignment_markers (assignment_id, teacher_id, question_ids, created_by) VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE question_ids = VALUES(question_ids), updated_at = NOW()'
        )->execute([$assignmentId, $colleagueId, json_encode($ids), $teacherId]);

        // Tell the colleague the first time they're given questions on it
        if ($before === false) {
            $stmt = $db->prepare('SELECT a.title, t.first_name, t.last_name FROM assignments a JOIN teachers t ON t.id = a.teacher_id WHERE a.id = ?');
            $stmt->execute([$assignmentId]);
            $a = $stmt->fetch(PDO::FETCH_ASSOC);
            try {
                (new NotificationService())->notify(
                    $colleagueId,
                    'teacher',
                    'shared_marking',
                    'Marking shared with you',
                    trim(($a['first_name'] ?? '') . ' ' . ($a['last_name'] ?? '')) . ' asked you to mark ' . (count($ids) === 1 ? 'a question' : count($ids) . ' questions') . ' of "' . ($a['title'] ?? 'an assessment') . '".',
                    ['assignment_id' => $assignmentId]
                );
            } catch (\Throwable $e) {
                error_log('shared marking notification failed: ' . $e->getMessage());
            }
        }
        $this->success(['question_ids' => $ids], 'Shared with ' . $colleague['first_name']);
    }

    /**
     * Assessments colleagues shared with this teacher to mark, with how far each has got.
     * GET /teacher/shared-marking
     */
    public function sharedWithMe(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');
        $teacherId = (int) $this->getTeacherId();
        $db = $this->getDb();
        try {
            $stmt = $db->prepare(
                'SELECT m.assignment_id, m.question_ids, a.title, t.first_name, t.last_name
                   FROM assignment_markers m
                   JOIN assignments a ON a.id = m.assignment_id AND a.deleted_at IS NULL
                   JOIN teachers t ON t.id = a.teacher_id
                  WHERE m.teacher_id = ?
                  ORDER BY m.updated_at DESC'
            );
            $stmt->execute([$teacherId]);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            $rows = [];
        }

        $items = [];
        foreach ($rows as $r) {
            $aid = (int) $r['assignment_id'];
            $qids = array_map('intval', json_decode((string) $r['question_ids'], true) ?: []);
            // open scripts (handed in, not yet finished) and the marks still owed on my questions
            $stmt = $db->prepare("SELECT id FROM assignment_submissions WHERE assignment_id = ? AND submitted_at IS NOT NULL AND status NOT IN ('graded', 'returned')");
            $stmt->execute([$aid]);
            $open = array_map('intval', $stmt->fetchAll(PDO::FETCH_COLUMN));
            $done = 0;
            if ($open && $qids) {
                $done = (int) $db->query(
                    'SELECT COUNT(*) FROM question_marks WHERE marks_awarded IS NOT NULL AND submission_id IN (' . implode(',', $open) . ') AND question_id IN (' . implode(',', $qids) . ')'
                )->fetchColumn();
            }
            $items[] = [
                'assignment_id' => $aid,
                'title' => $r['title'],
                'owner' => trim($r['first_name'] . ' ' . $r['last_name']),
                'questions' => count($qids),
                'to_mark' => max(0, count($open) * count($qids) - $done),
            ];
        }
        $this->success($items);
    }

    /**
     * Totals every script whose questions are all marked (by whoever marked them) and, when asked,
     * returns them to their students - the end of conveyor-belt marking. Only the teacher who set it.
     * POST /teacher/assignments/{id}/finish-marked   { return: bool }
     */
    public function finishMarked(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');
        $teacherId = (int) $this->getTeacherId();
        $assignmentId = (int) $this->routeParam('id');
        if (!$this->ownsAssignment($assignmentId, $teacherId)) {
            $this->notFound('Assessment not found');
            return;
        }
        $andReturn = !empty($this->input()['return']);
        $db = $this->getDb();
        try {
            $finished = 0;
            $returned = 0;
            foreach ($this->scriptProgress($assignmentId) as $p) {
                if (!$p['complete'] || $p['status'] === 'returned') {
                    continue;
                }
                $stmt = $db->prepare('SELECT * FROM assignment_submissions WHERE id = ?');
                $stmt->execute([$p['submission_id']]);
                $submission = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($p['status'] !== 'graded') {
                    $this->totalScript($submission, $teacherId);
                    $finished++;
                }
                if ($andReturn) {
                    $this->releaseScript($submission);
                    $returned++;
                }
            }
            $this->success(['finished' => $finished, 'returned' => $returned], $andReturn ? "{$returned} returned to students" : "{$finished} totalled");
        } catch (Exception $e) {
            error_log('finishMarked failed: ' . $e->getMessage());
            $this->serverError('Could not finish the marked scripts');
        }
    }

    private function ownsAssignment(int $assignmentId, int $teacherId): bool
    {
        $stmt = $this->getDb()->prepare('SELECT 1 FROM assignments WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL');
        $stmt->execute([$assignmentId, $teacherId]);
        return (bool) $stmt->fetchColumn();
    }

    /**
     * Each handed-in script: its marks so far (added up across everyone marking it), how many of
     * the questions carry a mark, and whether all of them do.
     */
    private function scriptProgress(int $assignmentId): array
    {
        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM assignment_questions WHERE assignment_id = ? AND parent_question_id IS NULL AND deleted_at IS NULL");
        $stmt->execute([$assignmentId]);
        $qids = array_map('intval', $stmt->fetchAll(PDO::FETCH_COLUMN));
        $in = $qids ? implode(',', $qids) : '0';
        $stmt = $db->prepare(
            "SELECT sub.id, sub.status, s.first_name, s.last_name,
                    COALESCE(SUM(qm.marks_awarded), 0) AS total,
                    COUNT(CASE WHEN qm.marks_awarded IS NOT NULL AND qm.question_id IN ({$in}) THEN 1 END) AS marked
               FROM assignment_submissions sub
               JOIN students s ON s.id = sub.student_id
               LEFT JOIN question_marks qm ON qm.submission_id = sub.id
              WHERE sub.assignment_id = ? AND sub.submitted_at IS NOT NULL
              GROUP BY sub.id, sub.status, s.first_name, s.last_name
              ORDER BY s.first_name, s.last_name"
        );
        $stmt->execute([$assignmentId]);
        return array_map(static fn ($r) => [
            'submission_id' => (int) $r['id'],
            'student' => trim($r['first_name'] . ' ' . $r['last_name']),
            'status' => $r['status'],
            'total' => (float) $r['total'],
            'marked' => (int) $r['marked'],
            'complete' => $qids && (int) $r['marked'] >= count($qids),
        ], $stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    /**
     * Reopen a graded/returned submission for re-marking. This does not unlock the
     * student's own answers - only a fresh submit/reopen of the attempt itself would.
     * POST /teacher/assignments/{id}/submissions/{submissionId}/reopen
     */
    public function reopenSubmission(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = $this->getTeacherId();
        $submissionId = (int) $this->routeParam('submissionId');

        if (!$this->verifySubmissionOwnership($submissionId, $teacherId)) {
            $this->forbidden('You do not have permission to reopen this submission');
            return;
        }

        try {
            $db = $this->getDb();
            $stmt = $db->prepare("UPDATE assignment_submissions SET status = 'submitted', released_at = NULL, updated_at = NOW() WHERE id = :id");
            $stmt->execute(['id' => $submissionId]);

            $this->success([], 'Submission reopened for marking');
        } catch (Exception $e) {
            error_log('reopenSubmission failed: ' . $e->getMessage());
            $this->serverError('Failed to reopen submission');
        }
    }

    /**
     * Marking one question across the whole class: every handed-in script's answer to that
     * question side by side, with its mark and comment - so a teacher marks question 1 for
     * everyone, then question 2, instead of one whole script at a time. Saving uses the same
     * per-question marks endpoint as the script-by-script view (saveQuestionMarks).
     * GET /teacher/assignments/{id}/marking-by-question?question_id=
     */
    public function markingByQuestion(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $teacherId = (int) $this->getTeacherId();
        $assignmentId = (int) $this->routeParam('id');
        $db = $this->getDb();

        $stmt = $db->prepare("SELECT id, title, total_marks, teacher_id FROM assignments WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$assignmentId]);
        $assignment = $stmt->fetch(PDO::FETCH_ASSOC);
        $isOwner = $assignment && (int) $assignment['teacher_id'] === $teacherId;
        // a colleague sharing the marking sees only the questions they were given
        $mine = $assignment && !$isOwner ? $this->markerQuestions($assignmentId, $teacherId) : null;
        if (!$assignment || (!$isOwner && $mine === null)) {
            $this->notFound('Assessment not found');
            return;
        }

        // Handed-in scripts only - an answer still being written isn't ready to mark
        $stmt = $db->prepare(
            "SELECT sub.id, sub.status, sub.submitted_at, s.first_name, s.last_name, s.admission_number
               FROM assignment_submissions sub
               JOIN students s ON s.id = sub.student_id
              WHERE sub.assignment_id = ? AND sub.submitted_at IS NOT NULL
              ORDER BY s.first_name, s.last_name"
        );
        $stmt->execute([$assignmentId]);
        $scripts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $scriptIds = array_map(static fn ($r) => (int) $r['id'], $scripts);

        $stmt = $db->prepare(
            "SELECT id, question_type, question_text, marks FROM assignment_questions
              WHERE assignment_id = ? AND parent_question_id IS NULL AND deleted_at IS NULL ORDER BY display_order, id"
        );
        $stmt->execute([$assignmentId]);
        $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $numberOf = [];
        foreach ($questions as $i => $q) {
            $numberOf[(int) $q['id']] = $i + 1;
        }
        if (!$isOwner) {
            $questions = array_values(array_filter($questions, static fn ($q) => in_array((int) $q['id'], $mine, true)));
        }

        // Who marks which question (shared marking) - names on the question strip
        $markerNames = [];
        try {
            $stmt = $db->prepare('SELECT m.question_ids, t.first_name FROM assignment_markers m JOIN teachers t ON t.id = m.teacher_id WHERE m.assignment_id = ?');
            $stmt->execute([$assignmentId]);
            foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $m) {
                foreach (json_decode((string) $m['question_ids'], true) ?: [] as $qid) {
                    $markerNames[(int) $qid][] = $m['first_name'];
                }
            }
        } catch (\PDOException $e) {
            // no shared marking yet
        }

        // How far marking has got on each question
        $marked = [];
        $answered = [];
        if ($scriptIds) {
            $in = implode(',', $scriptIds);
            foreach ($db->query("SELECT question_id, COUNT(*) n FROM question_marks WHERE submission_id IN ({$in}) AND marks_awarded IS NOT NULL GROUP BY question_id")->fetchAll(PDO::FETCH_ASSOC) as $r) {
                $marked[(int) $r['question_id']] = (int) $r['n'];
            }
            foreach ($db->query(
                "SELECT question_id, COUNT(*) n FROM assignment_answers
                  WHERE submission_id IN ({$in})
                    AND (COALESCE(answer_text, '') <> '' OR student_attachment_path IS NOT NULL OR drawing_path IS NOT NULL)
                  GROUP BY question_id"
            )->fetchAll(PDO::FETCH_ASSOC) as $r) {
                $answered[(int) $r['question_id']] = (int) $r['n'];
            }
        }

        $objective = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'];
        $list = [];
        foreach ($questions as $q) {
            $qid = (int) $q['id'];
            $list[] = [
                'id' => $qid,
                'number' => $numberOf[$qid],
                'markers' => $markerNames[$qid] ?? [],
                'type' => $q['question_type'],
                'objective' => in_array($q['question_type'], $objective, true),
                'text' => mb_strimwidth(trim(html_entity_decode(strip_tags((string) $q['question_text']), ENT_QUOTES, 'UTF-8')), 0, 140, '…'),
                'marks' => (float) $q['marks'],
                'marked' => $marked[$qid] ?? 0,
                'answered' => $answered[$qid] ?? 0,
            ];
        }

        $detail = null;
        $questionId = (int) $this->query('question_id', 0) ?: (int) ($list[0]['id'] ?? 0);
        $question = null;
        foreach ($questions as $q) {
            if ((int) $q['id'] === $questionId) {
                $question = $q;
            }
        }

        if ($question) {
            $options = [];
            if (in_array($question['question_type'], $objective, true)) {
                $stmt = $db->prepare("SELECT id, option_text, is_correct FROM assignment_question_options WHERE question_id = ? ORDER BY display_order, id");
                $stmt->execute([$questionId]);
                $options = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            $optionText = [];
            foreach ($options as $o) {
                $optionText[(int) $o['id']] = trim(strip_tags((string) $o['option_text']));
            }

            $answers = [];
            $marks = [];
            $files = [];
            if ($scriptIds) {
                $in = implode(',', $scriptIds);
                $stmt = $db->prepare("SELECT * FROM assignment_answers WHERE question_id = ? AND submission_id IN ({$in})");
                $stmt->execute([$questionId]);
                foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $a) {
                    $answers[(int) $a['submission_id']] = $a;
                }
                $stmt = $db->prepare("SELECT submission_id, marks_awarded, feedback FROM question_marks WHERE question_id = ? AND submission_id IN ({$in})");
                $stmt->execute([$questionId]);
                foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $m) {
                    $marks[(int) $m['submission_id']] = $m;
                }
                // every file handed in for this question, so it can be opened from here (a
                // colleague sharing the marking has no script view to open)
                foreach ($answers as $sid => $a) {
                    if (!empty($a['student_attachment_path'])) {
                        $files[$sid][] = ['path' => $a['student_attachment_path'], 'name' => $a['student_attachment_original_name'] ?? basename((string) $a['student_attachment_path'])];
                    }
                }
                $stmt = $db->prepare("SELECT submission_id, file_path, original_name FROM assignment_answer_attachments WHERE question_id = ? AND submission_id IN ({$in}) ORDER BY display_order, id");
                $stmt->execute([$questionId]);
                foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $f) {
                    $files[(int) $f['submission_id']][] = ['path' => $f['file_path'], 'name' => $f['original_name']];
                }
            }

            $rows = [];
            foreach ($scripts as $s) {
                $sid = (int) $s['id'];
                $a = $answers[$sid] ?? null;
                $text = $a ? trim((string) ($a['answer_text'] ?? '')) : '';
                $chosen = null;
                if ($a && $question['question_type'] === 'true_false') {
                    $chosen = $text !== '' ? ucfirst(strtolower($text)) : null;
                } elseif ($a && $options) {
                    preg_match_all('/\d+/', $text, $ids);
                    $picked = array_values(array_filter(array_map(static fn ($id) => $optionText[(int) $id] ?? null, $ids[0])));
                    $chosen = $picked ? implode(' · ', $picked) : null;
                }
                $m = $marks[$sid] ?? null;
                $rows[] = [
                    'submission_id' => $sid,
                    'student' => trim($s['first_name'] . ' ' . $s['last_name']),
                    'admission_number' => $s['admission_number'],
                    'status' => $s['status'],
                    'answer_text' => $options || $question['question_type'] === 'true_false' ? null : html_entity_decode(strip_tags(str_replace(['</p>', '<br>', '<br/>', '<br />'], "\n", $text)), ENT_QUOTES, 'UTF-8'),
                    'chosen' => $chosen,
                    'has_file' => $a && !empty($a['student_attachment_path']),
                    'has_drawing' => $a && !empty($a['drawing_path']),
                    'files' => $files[$sid] ?? [],
                    'drawing' => $a && !empty($a['drawing_path']) ? $a['drawing_path'] : null,
                    'auto_mark' => $a && $a['auto_mark'] !== null ? (float) $a['auto_mark'] : null,
                    'marks_awarded' => $m && $m['marks_awarded'] !== null ? (float) $m['marks_awarded'] : null,
                    'feedback' => $m['feedback'] ?? null,
                    'locked' => in_array($s['status'], ['graded', 'returned'], true),
                ];
            }

            $correct = array_values(array_map(static fn ($o) => trim(strip_tags((string) $o['option_text'])), array_filter($options, static fn ($o) => (int) $o['is_correct'] === 1)));
            $detail = [
                'id' => $questionId,
                'type' => $question['question_type'],
                'html' => $question['question_text'],
                'marks' => (float) $question['marks'],
                'correct' => $question['question_type'] === 'true_false' ? null : $correct,
                'rows' => $rows,
            ];
        }

        $owner = null;
        if (!$isOwner) {
            $stmt = $db->prepare('SELECT first_name, last_name FROM teachers WHERE id = ?');
            $stmt->execute([(int) $assignment['teacher_id']]);
            $o = $stmt->fetch(PDO::FETCH_ASSOC);
            $owner = $o ? trim($o['first_name'] . ' ' . $o['last_name']) : null;
        }

        $this->success([
            'assignment' => ['id' => (int) $assignment['id'], 'title' => $assignment['title'], 'total_marks' => (float) $assignment['total_marks']],
            'role' => $isOwner ? 'owner' : 'marker',
            'owner' => $owner,
            'questions' => $list,
            'scripts' => count($scripts),
            'question' => $detail,
            // the owner's view of the totals: every script's marks added up so far
            'progress' => $isOwner ? $this->scriptProgress($assignmentId) : null,
        ]);
    }

    /**
     * A spoken note on a script - recorded in the browser, up to two minutes. Replaces any note
     * already there; the student hears it with their returned script.
     * POST /teacher/assignments/{id}/submissions/{submissionId}/voice-feedback  (multipart: audio, seconds)
     */
    public function saveVoiceFeedback(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $submissionId = (int) $this->routeParam('submissionId');
        $submission = $this->verifySubmissionOwnership($submissionId, (int) $this->getTeacherId());
        if (!$submission) {
            $this->forbidden('You do not have permission to mark this submission');
            return;
        }

        $file = $_FILES['audio'] ?? null;
        if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
            $this->error('The recording did not arrive - try again.', 400);
            return;
        }
        if ($file['size'] > 6 * 1024 * 1024) {
            $this->error('That recording is too long - keep voice notes under two minutes.', 400);
            return;
        }
        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']) ?: '';
        $ext = match (true) {
            str_contains($mime, 'webm') => 'webm',
            str_contains($mime, 'ogg') => 'ogg',
            str_contains($mime, 'mp4'), str_contains($mime, 'm4a'), str_contains($mime, 'aac') => 'm4a',
            str_contains($mime, 'mpeg') => 'mp3',
            str_contains($mime, 'wav') => 'wav',
            default => null,
        };
        if ($ext === null) {
            $this->error('That is not an audio recording.', 400);
            return;
        }

        $dir = __DIR__ . '/../../../public/uploads/voice-feedback/';
        if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
            $this->serverError('Could not store the recording');
            return;
        }
        $name = $submissionId . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
        if (!move_uploaded_file($file['tmp_name'], $dir . $name)) {
            $this->serverError('Could not store the recording');
            return;
        }

        $old = $submission['voice_feedback_path'] ?? null;
        $seconds = max(1, min(600, (int) ($this->input()['seconds'] ?? $_POST['seconds'] ?? 0)));
        $path = '/uploads/voice-feedback/' . $name;
        $this->getDb()->prepare("UPDATE assignment_submissions SET voice_feedback_path = ?, voice_feedback_seconds = ?, updated_at = NOW() WHERE id = ?")
            ->execute([$path, $seconds, $submissionId]);
        if ($old && str_starts_with($old, '/uploads/voice-feedback/')) {
            @unlink(__DIR__ . '/../../../public' . $old);
        }

        $this->success(['voice_feedback_path' => $path, 'voice_feedback_seconds' => $seconds], 'Voice note saved');
    }

    /**
     * DELETE /teacher/assignments/{id}/submissions/{submissionId}/voice-feedback
     */
    public function deleteVoiceFeedback(): void
    {
        $this->requireAuth();
        $this->requireRole('teacher');

        $submissionId = (int) $this->routeParam('submissionId');
        $submission = $this->verifySubmissionOwnership($submissionId, (int) $this->getTeacherId());
        if (!$submission) {
            $this->forbidden('You do not have permission to mark this submission');
            return;
        }
        $old = $submission['voice_feedback_path'] ?? null;
        $this->getDb()->prepare("UPDATE assignment_submissions SET voice_feedback_path = NULL, voice_feedback_seconds = NULL, updated_at = NOW() WHERE id = ?")
            ->execute([$submissionId]);
        if ($old && str_starts_with($old, '/uploads/voice-feedback/')) {
            @unlink(__DIR__ . '/../../../public' . $old);
        }
        $this->success([], 'Voice note removed');
    }
}
