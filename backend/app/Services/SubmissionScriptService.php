<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\App\Utils\Grading;

/**
 * Read-only marked scripts for staff oversight (HOD for their department, admin for the
 * school): an assessment's submissions with hand-in/marking stats, and one student's script -
 * the same questions, answers, marks, feedback and annotation layers (the teacher's pen, ticks
 * and comments) the teacher sees while marking. Nothing here writes; there are no marking routes
 * for these roles.
 */
class SubmissionScriptService
{
    /**
     * Every submission of an assessment, and stats against the students who can see it
     * (active enrollment in its class or class level; within $departmentId when given).
     */
    public static function submissions(\PDO $db, int $assignmentId, ?int $departmentId): array
    {
        $stmt = $db->prepare("SELECT a.class_id, a.class_group_name, a.total_marks FROM assignments a WHERE a.id = :id");
        $stmt->execute(['id' => $assignmentId]);
        $assignment = $stmt->fetch();

        $stmt = $db->prepare(
            "SELECT sub.id, sub.student_id, sub.status, sub.total_score, sub.percentage,
                    sub.submitted_at, sub.marked_at, sub.released_at,
                    CONCAT(s.first_name, ' ', s.last_name) as student_name, s.admission_number,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_label
             FROM assignment_submissions sub
             INNER JOIN students s ON sub.student_id = s.id
             LEFT JOIN classes c ON c.id = s.class_id
             WHERE sub.assignment_id = :assignment_id AND sub.deleted_at IS NULL
             ORDER BY sub.submitted_at DESC"
        );
        $stmt->execute(['assignment_id' => $assignmentId]);
        $submissions = $stmt->fetchAll();

        // the roster "handed in" is measured against: active enrollments in its class / class level
        $totalStudents = 0;
        if ($assignment && (!empty($assignment['class_id']) || !empty($assignment['class_group_name']))) {
            $where = ["sde.status = 'active'", 'sde.deleted_at IS NULL'];
            $params = [];
            if (!empty($assignment['class_id'])) {
                $where[] = 'sde.class_id = ?';
                $params[] = (int) $assignment['class_id'];
            } else {
                $where[] = 'sde_c.name = ?';
                $params[] = $assignment['class_group_name'];
            }
            if ($departmentId !== null) {
                $where[] = 'sde.department_id = ?';
                $params[] = $departmentId;
            }
            $stmt = $db->prepare(
                "SELECT COUNT(DISTINCT sde.student_id) FROM student_department_enrollments sde
                 LEFT JOIN classes sde_c ON sde_c.id = sde.class_id WHERE " . implode(' AND ', $where)
            );
            $stmt->execute($params);
            $totalStudents = (int) $stmt->fetchColumn();
        }

        $submittedCount = 0;
        $gradedCount = 0;
        $percentages = [];
        foreach ($submissions as $sub) {
            if (in_array($sub['status'], ['submitted', 'marking', 'graded', 'returned'], true)) {
                $submittedCount++;
            }
            if (in_array($sub['status'], ['graded', 'returned'], true)) {
                $gradedCount++;
            }
            if ($sub['percentage'] !== null) {
                $percentages[] = (float) $sub['percentage'];
            }
        }

        return [
            'submissions' => $submissions,
            'stats' => [
                'total_students' => max($totalStudents, $submittedCount),
                'submitted_count' => $submittedCount,
                'not_submitted_count' => max(0, $totalStudents - $submittedCount),
                'graded_count' => $gradedCount,
                'average_percentage' => $percentages ? round(array_sum($percentages) / count($percentages), 1) : null,
                'highest_percentage' => $percentages ? round(max($percentages), 1) : null,
                'lowest_percentage' => $percentages ? round(min($percentages), 1) : null,
            ],
        ];
    }

    /** One student's script, or null when it isn't a submission of this assessment. */
    public static function detail(\PDO $db, int $assignmentId, int $submissionId): ?array
    {
        $stmt = $db->prepare(
            "SELECT sub.*, CONCAT(s.first_name, ' ', s.last_name) as student_name, s.admission_number,
                    a.title as assignment_title, a.total_marks, a.pass_mark
             FROM assignment_submissions sub
             INNER JOIN students s ON sub.student_id = s.id
             INNER JOIN assignments a ON sub.assignment_id = a.id
             WHERE sub.id = :submission_id AND sub.assignment_id = :assignment_id AND sub.deleted_at IS NULL"
        );
        $stmt->execute(['submission_id' => $submissionId, 'assignment_id' => $assignmentId]);
        $submission = $stmt->fetch();
        if (!$submission) {
            return null;
        }

        $stmt = $db->prepare(
            "SELECT ans.*, q.question_text, q.question_type, q.marks as max_marks
             FROM assignment_answers ans
             INNER JOIN assignment_questions q ON ans.question_id = q.id
             WHERE ans.submission_id = :submission_id"
        );
        $stmt->execute(['submission_id' => $submissionId]);
        $answers = $stmt->fetchAll();

        $summary = null;
        if ($submission['total_score'] !== null) {
            $summary = Grading::computeSummary((float) $submission['total_score'], (float) ($submission['total_marks'] ?? 0));
        }

        return [
            'submission' => $submission,
            'answers' => $answers,
            'questions' => self::questionsWithLayers($db, $assignmentId, $submissionId),
            'summary' => $summary,
        ];
    }

    public static function questionsWithLayers(\PDO $db, int $assignmentId, int $submissionId): array
    {

        $stmt = $db->prepare(
            "SELECT * FROM assignment_questions WHERE assignment_id = :assignment_id AND parent_question_id IS NULL AND deleted_at IS NULL ORDER BY display_order ASC"
        );
        $stmt->execute(['assignment_id' => $assignmentId]);
        $questions = $stmt->fetchAll();

        $objectiveTypes = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'];

        foreach ($questions as &$question) {
            $questionId = (int) $question['id'];

            if (in_array($question['question_type'], $objectiveTypes, true)) {
                $optStmt = $db->prepare("SELECT * FROM assignment_question_options WHERE question_id = :question_id ORDER BY display_order ASC");
                $optStmt->execute(['question_id' => $questionId]);
                $question['options'] = $optStmt->fetchAll();
            }

            if ($question['question_type'] === 'scenario') {
                $subStmt = $db->prepare("SELECT * FROM assignment_questions WHERE parent_question_id = :parent_id AND deleted_at IS NULL ORDER BY display_order ASC");
                $subStmt->execute(['parent_id' => $questionId]);
                $question['sub_questions'] = $subStmt->fetchAll();
            }

            $ansStmt = $db->prepare("SELECT * FROM assignment_answers WHERE submission_id = :submission_id AND question_id = :question_id");
            $ansStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
            $question['answer'] = $ansStmt->fetch() ?: null;

            if (!in_array($question['question_type'], $objectiveTypes, true)) {
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

                $maStmt = $db->prepare("SELECT page_number, annotation_data FROM assignment_annotations WHERE submission_id = :submission_id AND question_id = :question_id AND attachment_id IS NULL ORDER BY page_number ASC");
                $maStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
                $markingPages = [];
                foreach ($maStmt->fetchAll() as $row) {
                    $markingPages[(int) $row['page_number']] = json_decode($row['annotation_data'] ?? '[]', true) ?: [];
                }
                $question['marking_annotations'] = $markingPages;

                // Supplementary "additional files" - every extra file the student attached,
                // each with any marks the teacher has made on it (view-only here).
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

            $qmStmt = $db->prepare("SELECT marks_awarded, feedback FROM question_marks WHERE submission_id = :submission_id AND question_id = :question_id");
            $qmStmt->execute(['submission_id' => $submissionId, 'question_id' => $questionId]);
            $question['question_mark'] = $qmStmt->fetch() ?: null;
        }

        return $questions;
    }
}
