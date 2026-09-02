<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Assignment Preview Service
 *
 * Builds the exact same questions/assignment shape Student\AssignmentController::show() returns
 * (top-level questions with options/sub_questions/question_annotations attached), but with no
 * submission or answer data - used by Teacher/HOD/Admin "Preview as Student" endpoints so the
 * same frontend component that renders the real student-taking experience can render a read-only
 * staff preview unmodified.
 */
class AssignmentPreviewService
{
    private const OBJECTIVE_TYPES = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'];

    public function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Assignment row (with subject/class/teacher names) or null if not found/deleted
     */
    public function getAssignmentMeta(int $assignmentId): ?array
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT a.*, s.name as subject_name, c.name as class_name,
                    CONCAT(t.first_name, ' ', t.last_name) as teacher_name
             FROM assignments a
             INNER JOIN subjects s ON a.subject_id = s.id
             LEFT JOIN classes c ON a.class_id = c.id
             INNER JOIN teachers t ON a.teacher_id = t.id
             WHERE a.id = :id AND a.deleted_at IS NULL"
        );
        $stmt->execute(['id' => $assignmentId]);
        $row = $stmt->fetch();

        return $row ?: null;
    }

    /**
     * Top-level questions for the assignment, each with options (objective types), sub_questions
     * (scenario type), and question_annotations (the teacher's authoring drawing layer, for any
     * non-objective type) attached - mirroring Student\AssignmentController::show() exactly.
     */
    public function getQuestionsForPreview(int $assignmentId): array
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            "SELECT * FROM assignment_questions
             WHERE assignment_id = :assignment_id AND parent_question_id IS NULL AND deleted_at IS NULL
             ORDER BY display_order ASC"
        );
        $stmt->execute(['assignment_id' => $assignmentId]);
        $questions = $stmt->fetchAll();

        foreach ($questions as &$question) {
            if (in_array($question['question_type'], self::OBJECTIVE_TYPES, true)) {
                $stmt = $db->prepare("SELECT * FROM assignment_question_options WHERE question_id = :question_id ORDER BY display_order ASC");
                $stmt->execute(['question_id' => $question['id']]);
                $question['options'] = $stmt->fetchAll();
            }

            if ($question['question_type'] === 'scenario') {
                $stmt = $db->prepare(
                    "SELECT * FROM assignment_questions WHERE parent_question_id = :parent_question_id AND deleted_at IS NULL ORDER BY display_order ASC"
                );
                $stmt->execute(['parent_question_id' => $question['id']]);
                $question['sub_questions'] = $stmt->fetchAll();
            }

            if (!in_array($question['question_type'], self::OBJECTIVE_TYPES, true)) {
                $stmt = $db->prepare("SELECT page_number, annotation_data FROM question_annotations WHERE question_id = :question_id ORDER BY page_number ASC");
                $stmt->execute(['question_id' => $question['id']]);
                $pages = [];
                foreach ($stmt->fetchAll() as $row) {
                    $pages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
                }
                $question['question_annotations'] = $pages;
            }
        }
        unset($question);

        return $questions;
    }

    /**
     * Full payload shaped like Student\AssignmentController::show()'s response, with
     * submission/answer fields nulled out since there's no real attempt.
     */
    public function buildPreviewPayload(array $assignment, array $questions): array
    {
        return [
            'assignment' => $assignment,
            'questions' => $questions,
            'curriculum' => $this->getCurriculumStructure((int) $assignment['id'], $assignment['assessment_category'] ?? null, $assignment['construct_id'] ?? null),
            'submission_id' => null,
            'submission_status' => 'preview',
            'answers' => [],
            'answer_annotations' => [],
        ];
    }

    /**
     * Mirrors Student\AssignmentController::getCurriculumStructure() exactly, so "Preview as
     * Student" shows the identical LOA/AOI/EOC grouping a real student would see. Null for any
     * assignment without an assessment_category (every assignment created before this feature).
     */
    private function getCurriculumStructure(int $assignmentId, ?string $category, $constructId = null): ?array
    {
        if ($category === null) {
            return null;
        }

        $db = $this->getDb();

        if ($category === 'LOA') {
            $stmt = $db->prepare(
                'SELECT ct.id, ct.theme_branch, ct.topic, ct.competence
                 FROM assignment_curriculum_topics act
                 INNER JOIN enote_curriculum_topics ct ON act.curriculum_topic_id = ct.id
                 WHERE act.assignment_id = :id
                 LIMIT 1'
            );
            $stmt->execute(['id' => $assignmentId]);
            $topic = $stmt->fetch();

            $outcomesStmt = $db->prepare(
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

        $stmt = $db->prepare(
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

        // EOC is assessed against the Construct's Assessment Objective as a whole - group by that
        // instead of the raw Theme/Topic text, matching Student\AssignmentController's real view.
        if ($category === 'EOC' && $constructId) {
            $constructStmt = $db->prepare('SELECT assessment_objective, name FROM constructs WHERE id = :id');
            $constructStmt->execute(['id' => (int) $constructId]);
            $construct = $constructStmt->fetch();
            if ($construct) {
                $result['assessment_objective'] = $construct['assessment_objective'];
                $result['construct_name'] = $construct['name'];
            }
        }

        return $result;
    }
}
