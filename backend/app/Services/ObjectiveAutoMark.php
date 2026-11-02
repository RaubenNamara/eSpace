<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\App\Utils\Grading;

/**
 * An assessment made only of objective questions (multiple choice, true/false) marks itself when
 * the learner hands it in, and the result is theirs at once: each question gets its marks when
 * right (all the right options, and only those, for a "choose several"), the script is marked
 * and returned, and the learner sees their mark straight away. Anything with a written question
 * is left for the teacher as before.
 */
final class ObjectiveAutoMark
{
    public const OBJECTIVE_TYPES = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'];

    /** Is every question of this assessment objective? */
    public static function isObjectiveOnly(\PDO $db, int $assignmentId): bool
    {
        $stmt = $db->prepare('SELECT question_type FROM assignment_questions WHERE assignment_id = ? AND parent_question_id IS NULL AND deleted_at IS NULL');
        $stmt->execute([$assignmentId]);
        $types = $stmt->fetchAll(\PDO::FETCH_COLUMN);
        return $types && !array_diff($types, self::OBJECTIVE_TYPES);
    }

    /**
     * Mark a handed-in submission and release it. Returns the summary (marks, total, percentage,
     * grade), or null when the assessment has a written question (the teacher marks those).
     */
    public static function markAndRelease(\PDO $db, int $submissionId, int $assignmentId): ?array
    {
        if (!self::isObjectiveOnly($db, $assignmentId)) {
            return null;
        }
        $stmt = $db->prepare('SELECT id, question_type, marks FROM assignment_questions WHERE assignment_id = ? AND parent_question_id IS NULL AND deleted_at IS NULL');
        $stmt->execute([$assignmentId]);
        $questions = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $answerStmt = $db->prepare('SELECT answer_text FROM assignment_answers WHERE submission_id = ? AND question_id = ?');
        $optionStmt = $db->prepare('SELECT id, option_text, is_correct FROM assignment_question_options WHERE question_id = ? ORDER BY display_order ASC, id ASC');
        $saveMark = $db->prepare(
            'INSERT INTO question_marks (submission_id, question_id, marks_awarded, marked_at, created_at, updated_at)
             VALUES (?, ?, ?, NOW(), NOW(), NOW())
             ON DUPLICATE KEY UPDATE marks_awarded = VALUES(marks_awarded), marked_at = NOW(), updated_at = NOW()'
        );
        $saveAuto = $db->prepare('UPDATE assignment_answers SET auto_mark = ?, marked_at = NOW() WHERE submission_id = ? AND question_id = ?');

        $awarded = 0.0;
        $available = 0.0;
        foreach ($questions as $q) {
            $marks = (float) $q['marks'];
            $available += $marks;
            $answerStmt->execute([$submissionId, (int) $q['id']]);
            $answer = $answerStmt->fetchColumn();
            $optionStmt->execute([(int) $q['id']]);
            $options = $optionStmt->fetchAll(\PDO::FETCH_ASSOC);

            $right = $answer !== false && $answer !== null && $answer !== '' && self::isRight($q['question_type'], (string) $answer, $options);
            $got = $right ? $marks : 0.0;
            $awarded += $got;
            $saveMark->execute([$submissionId, (int) $q['id'], $got]);
            $saveAuto->execute([$got, $submissionId, (int) $q['id']]);
        }

        // out of the questions' own marks (what could actually be scored)
        $summary = Grading::computeSummary($awarded, $available);
        $db->prepare(
            "UPDATE assignment_submissions
             SET auto_score = ?, total_score = ?, percentage = ?, status = 'returned',
                 marked_at = NOW(), graded_at = NOW(), released_at = NOW(), updated_at = NOW()
             WHERE id = ?"
        )->execute([$summary['marks_awarded'], $summary['marks_awarded'], $summary['percentage'], $submissionId]);

        return $summary;
    }

    private static function isRight(string $type, string $answer, array $options): bool
    {
        $correct = array_map(fn ($o) => (int) $o['id'], array_filter($options, fn ($o) => (int) $o['is_correct'] === 1));
        if ($type === 'multiple_choice_single') {
            return in_array((int) $answer, $correct, true);
        }
        if ($type === 'multiple_choice_multiple') {
            $chosen = json_decode($answer, true);
            if (!is_array($chosen)) {
                return false;
            }
            $chosen = array_values(array_unique(array_map('intval', $chosen)));
            sort($chosen);
            sort($correct);
            return $chosen && $chosen === $correct;
        }
        // true/false: the answer is 'true' or 'false'; the right one is the option marked correct
        // when the options are named True/False, otherwise the first option says whether it is true
        $named = array_filter($options, fn ($o) => in_array(strtolower(trim((string) $o['option_text'])), ['true', 'false'], true));
        if ($named) {
            foreach ($named as $o) {
                if ((int) $o['is_correct'] === 1) {
                    return strtolower(trim((string) $o['option_text'])) === strtolower($answer);
                }
            }
            return false;
        }
        $first = $options[0] ?? null;
        $truth = $first ? ((int) $first['is_correct'] === 1 ? 'true' : 'false') : null;
        return $truth !== null && strtolower($answer) === $truth;
    }
}
