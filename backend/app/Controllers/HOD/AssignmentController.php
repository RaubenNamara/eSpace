<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\AssignmentPreviewService;
use eSpace\App\Utils\Grading;

/**
 * HOD Assignment Controller
 *
 * Read-only oversight of assignments authored by teachers in the HOD's department, including a
 * "Preview as Student" view identical to what Teacher\AssignmentController::preview() shows a
 * teacher for their own assignment. HOD can't create/edit/delete/grade.
 */
class AssignmentController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getHodDepartmentId(): ?int
    {
        $hodId = $_SESSION['user_id'] ?? null;
        if (!$hodId) {
            return null;
        }

        $stmt = $this->getDb()->prepare("SELECT department_id FROM hods WHERE id = :hod_id AND deleted_at IS NULL");
        $stmt->execute(['hod_id' => $hodId]);
        $hod = $stmt->fetch();

        return $hod ? (int) $hod['department_id'] : null;
    }

    /**
     * GET /hod/assignments
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $status = $this->query('status', '');

        $db = $this->getDb();
        $where = ['EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)', 'a.deleted_at IS NULL'];
        $params = ['department_id' => $departmentId];

        if (!empty($status)) {
            $where[] = 'a.status = :status';
            $params['status'] = $status;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT a.id, a.title, a.status, a.due_date, a.total_marks, a.category,
                       s.name as subject_name, c.name as class_name,
                       CONCAT(t.first_name, ' ', t.last_name) as teacher_name,
                       (SELECT COUNT(*) FROM assignment_submissions WHERE assignment_id = a.id) as submissions_count
                FROM assignments a
                INNER JOIN teachers t ON a.teacher_id = t.id
                LEFT JOIN subjects s ON a.subject_id = s.id
                LEFT JOIN classes c ON a.class_id = c.id
                WHERE {$whereClause}
                ORDER BY a.updated_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);

        $this->success(['assignments' => $stmt->fetchAll()]);
    }

    /**
     * "Preview as Student" for an assignment authored by a teacher in this department
     * GET /hod/assignments/{id}/preview
     */
    public function preview(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $assignmentId = (int) $this->routeParam('id');

        if (!$this->verifyAssignmentInDepartment($assignmentId, $departmentId)) {
            $this->notFound('Assignment not found');
            return;
        }

        $service = new AssignmentPreviewService();
        $assignment = $service->getAssignmentMeta($assignmentId);
        $questions = $service->getQuestionsForPreview($assignmentId);

        $this->success($service->buildPreviewPayload($assignment, $questions));
    }

    /**
     * Per-student submissions for an assignment, plus department-wide stats for it.
     * GET /hod/assignments/{id}/submissions
     */
    public function submissions(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $assignmentId = (int) $this->routeParam('id');

        if (!$this->verifyAssignmentInDepartment($assignmentId, $departmentId)) {
            $this->notFound('Assignment not found');
            return;
        }

        $db = $this->getDb();

        $stmt = $db->prepare(
            "SELECT a.class_id, a.total_marks FROM assignments a WHERE a.id = :id"
        );
        $stmt->execute(['id' => $assignmentId]);
        $assignment = $stmt->fetch();

        $stmt = $db->prepare(
            "SELECT sub.id, sub.student_id, sub.status, sub.total_score, sub.percentage,
                    sub.submitted_at, sub.marked_at, sub.released_at,
                    CONCAT(s.first_name, ' ', s.last_name) as student_name, s.admission_number
             FROM assignment_submissions sub
             INNER JOIN students s ON sub.student_id = s.id
             WHERE sub.assignment_id = :assignment_id AND sub.deleted_at IS NULL
             ORDER BY sub.submitted_at DESC"
        );
        $stmt->execute(['assignment_id' => $assignmentId]);
        $submissions = $stmt->fetchAll();

        // Students who can currently see this assignment (active enrollment in its class, in
        // this department) - the roster "submitted" is measured against, same active-enrollment
        // rule content-visibility checks use elsewhere (student_department_enrollments.status).
        $totalStudents = 0;
        if (!empty($assignment['class_id'])) {
            $stmt = $db->prepare(
                "SELECT COUNT(DISTINCT sde.student_id) as total
                 FROM student_department_enrollments sde
                 WHERE sde.class_id = :class_id AND sde.department_id = :department_id
                   AND sde.status = 'active' AND sde.deleted_at IS NULL"
            );
            $stmt->execute(['class_id' => $assignment['class_id'], 'department_id' => $departmentId]);
            $totalStudents = (int) $stmt->fetch()['total'];
        }

        $submittedStatuses = ['submitted', 'marking', 'graded', 'returned'];
        $submittedCount = 0;
        $gradedCount = 0;
        $percentages = [];
        foreach ($submissions as $sub) {
            if (in_array($sub['status'], $submittedStatuses, true)) {
                $submittedCount++;
            }
            if (in_array($sub['status'], ['graded', 'returned'], true)) {
                $gradedCount++;
            }
            if ($sub['percentage'] !== null) {
                $percentages[] = (float) $sub['percentage'];
            }
        }

        $stats = [
            'total_students' => $totalStudents,
            'submitted_count' => $submittedCount,
            'not_submitted_count' => max(0, $totalStudents - $submittedCount),
            'graded_count' => $gradedCount,
            'average_percentage' => $percentages ? round(array_sum($percentages) / count($percentages), 1) : null,
            'highest_percentage' => $percentages ? round(max($percentages), 1) : null,
            'lowest_percentage' => $percentages ? round(min($percentages), 1) : null,
        ];

        $this->success(['submissions' => $submissions, 'stats' => $stats]);
    }

    /**
     * Read-only view of one student's submission - the same questions/answers/marks/annotation
     * layers a teacher sees while marking, but with no save/marking routes exposed to HOD.
     * GET /hod/assignments/{id}/submissions/{submissionId}
     */
    public function submissionDetail(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $assignmentId = (int) $this->routeParam('id');
        $submissionId = (int) $this->routeParam('submissionId');

        if (!$this->verifyAssignmentInDepartment($assignmentId, $departmentId)) {
            $this->notFound('Assignment not found');
            return;
        }

        $db = $this->getDb();

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
            $this->notFound('Submission not found');
            return;
        }

        $answersSql = "SELECT ans.*, q.question_text, q.question_type, q.marks as max_marks
                       FROM assignment_answers ans
                       INNER JOIN assignment_questions q ON ans.question_id = q.id
                       WHERE ans.submission_id = :submission_id";
        $stmt = $db->prepare($answersSql);
        $stmt->execute(['submission_id' => $submissionId]);
        $answers = $stmt->fetchAll();

        $questions = $this->loadQuestionsWithLayers($assignmentId, $submissionId);

        $summary = null;
        if ($submission['total_score'] !== null) {
            $summary = Grading::computeSummary(
                (float) $submission['total_score'],
                (float) ($submission['total_marks'] ?? 0)
            );
        }

        $this->success([
            'submission' => $submission,
            'answers' => $answers,
            'questions' => $questions,
            'summary' => $summary
        ]);
    }

    private function verifyAssignmentInDepartment(int $assignmentId, int $departmentId): bool
    {
        $stmt = $this->getDb()->prepare(
            "SELECT a.id FROM assignments a
             INNER JOIN teachers t ON a.teacher_id = t.id
             WHERE a.id = :id AND a.deleted_at IS NULL
               AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)"
        );
        $stmt->execute(['id' => $assignmentId, 'department_id' => $departmentId]);
        return (bool) $stmt->fetch();
    }

    /**
     * Questions with answer/marking annotation layers for one submission - always includes
     * marking data (HOD oversight has no "before release" restriction, unlike the student's own
     * result view). Mirrors Student\AssignmentController::loadQuestionsWithLayers().
     */
    private function loadQuestionsWithLayers(int $assignmentId, int $submissionId): array
    {
        $db = $this->getDb();

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
