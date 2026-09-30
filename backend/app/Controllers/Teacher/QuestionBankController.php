<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * The question bank: every question already set in a subject - the teacher's own, and the
 * published ones of colleagues in the same department - found by the learning outcome or topic it
 * was set for (matched by wording, since every stream and year has its own copy of the
 * curriculum), with how it went: how often it has been used, by how many teachers, and the average
 * students scored on it. The Assignment Builder copies a picked question into the assessment.
 *
 * GET /teacher/question-bank?subject_id=&outcome_id=&topic_id=&scope=all|mine&q=&exclude_assignment_id=
 */
class QuestionBankController extends Controller
{
    private const LIMIT = 60;

    private function teacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return isset($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        }
        return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    private static function norm(?string $text): string
    {
        $text = html_entity_decode(strip_tags((string) $text), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        return mb_strtolower(trim(preg_replace('/\s+/u', ' ', $text)));
    }

    public function index(): void
    {
        if (!$this->isAuthenticated() || !($teacherId = $this->teacherId())) {
            $this->unauthorized();
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        $subjectId = (int) ($_GET['subject_id'] ?? 0);
        $scope = ($_GET['scope'] ?? 'all') === 'mine' ? 'mine' : 'all';
        $search = self::norm($_GET['q'] ?? '');
        $exclude = (int) ($_GET['exclude_assignment_id'] ?? 0);

        // The subject, in the teacher's departments
        $stmt = $db->prepare(
            "SELECT s.id FROM subjects s WHERE s.id = ? AND s.deleted_at IS NULL AND s.department_id IN (
                SELECT department_id FROM teacher_department_assignments WHERE teacher_id = ? AND deleted_at IS NULL
                UNION SELECT department_id FROM teachers WHERE id = ? AND department_id IS NOT NULL)"
        );
        $stmt->execute([$subjectId, $teacherId, $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Subject not found');
            return;
        }

        // What it's for: the outcome's (or topic's) wording, so every stream and year's copy matches
        $outcomeText = null;
        $topicText = null;
        if (!empty($_GET['outcome_id'])) {
            $stmt = $db->prepare(
                "SELECT o.learning_outcome, ct.topic FROM enote_learning_outcomes o
                 INNER JOIN enote_curriculum_topics ct ON ct.id = o.curriculum_topic_id WHERE o.id = ?"
            );
            $stmt->execute([(int) $_GET['outcome_id']]);
            if ($row = $stmt->fetch()) {
                $outcomeText = self::norm($row['learning_outcome']);
                $topicText = self::norm($row['topic']);
            }
        } elseif (!empty($_GET['topic_id'])) {
            $stmt = $db->prepare("SELECT topic FROM enote_curriculum_topics WHERE id = ?");
            $stmt->execute([(int) $_GET['topic_id']]);
            if ($row = $stmt->fetch()) {
                $topicText = self::norm($row['topic']);
            }
        }

        $stmt = $db->prepare(
            "SELECT q.id, q.assignment_id, q.question_type, q.question_text, q.scenario_text, q.marks, q.response_type,
                    q.allow_drawing, q.attachment_type, q.attachment_path,
                    ct.topic AS topic_text, lo.learning_outcome AS outcome_text,
                    a.teacher_id, a.assessment_category, a.rubric, COALESCE(a.published_at, a.created_at) AS used_at,
                    t.first_name, t.last_name,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_name
             FROM assignment_questions q
             INNER JOIN assignments a ON a.id = q.assignment_id AND a.deleted_at IS NULL
             LEFT JOIN enote_curriculum_topics ct ON ct.id = q.curriculum_topic_id
             LEFT JOIN enote_learning_outcomes lo ON lo.id = q.learning_outcome_id
             LEFT JOIN teachers t ON t.id = a.teacher_id
             LEFT JOIN classes c ON c.id = a.class_id
             WHERE q.deleted_at IS NULL AND q.parent_question_id IS NULL
               AND a.subject_id = ? AND a.id <> ?
               AND (a.teacher_id = ? OR a.status = 'published')
             ORDER BY used_at DESC, q.id DESC
             LIMIT 2000"
        );
        $stmt->execute([$subjectId, $exclude, $teacherId]);

        // One entry per question, however many assessments it has been used in
        $groups = [];
        foreach ($stmt->fetchAll() as $q) {
            if ($scope === 'mine' && (int) $q['teacher_id'] !== $teacherId) {
                continue;
            }
            if ($outcomeText !== null && self::norm($q['outcome_text']) !== $outcomeText
                && !($q['outcome_text'] === null && self::norm($q['topic_text']) === $topicText)) {
                continue;
            }
            if ($outcomeText === null && $topicText !== null && self::norm($q['topic_text']) !== $topicText) {
                continue;
            }
            $text = self::norm($q['question_text']) . '|' . self::norm($q['scenario_text']);
            if ($search !== '' && !str_contains($text . ' ' . self::norm($q['outcome_text']), $search)) {
                continue;
            }
            $key = $q['question_type'] . '|' . $text . '|' . ($q['attachment_path'] ?? '');
            if (!isset($groups[$key])) {
                $groups[$key] = ['question' => $q, 'ids' => [], 'assignments' => [], 'teachers' => []];
            }
            $groups[$key]['ids'][] = (int) $q['id'];
            $groups[$key]['assignments'][(int) $q['assignment_id']] = true;
            $groups[$key]['teachers'][(int) $q['teacher_id']] = true;
        }
        $total = count($groups);
        $groups = array_slice(array_values($groups), 0, self::LIMIT);
        if (!$groups) {
            $this->success(['questions' => [], 'total' => 0, 'matched_on' => $outcomeText !== null ? 'outcome' : ($topicText !== null ? 'topic' : 'subject')]);
            return;
        }

        // How students did: marks obtained over marks available, on marked work (sub-questions count
        // towards their scenario)
        $allIds = array_merge(...array_map(fn($g) => $g['ids'], $groups));
        $stmt = $db->prepare(
            "SELECT COALESCE(q.parent_question_id, q.id) AS root,
                    SUM(COALESCE(an.manual_mark, an.auto_mark)) AS got, SUM(q.marks) AS possible,
                    COUNT(DISTINCT an.submission_id) AS answers
             FROM assignment_answers an
             INNER JOIN assignment_questions q ON q.id = an.question_id
             INNER JOIN assignment_submissions sb ON sb.id = an.submission_id AND sb.deleted_at IS NULL
                    AND sb.status IN ('graded', 'returned')
             WHERE COALESCE(q.parent_question_id, q.id) IN (" . self::in($allIds) . ")
               AND COALESCE(an.manual_mark, an.auto_mark) IS NOT NULL AND q.marks > 0
             GROUP BY root"
        );
        $stmt->execute($allIds);
        $stats = [];
        foreach ($stmt->fetchAll() as $r) {
            $stats[(int) $r['root']] = $r;
        }

        // Options and sub-questions of the questions shown
        $repIds = array_map(fn($g) => (int) $g['question']['id'], $groups);
        $options = [];
        $stmt = $db->prepare("SELECT question_id, option_text, is_correct FROM assignment_question_options WHERE question_id IN (" . self::in($repIds) . ") ORDER BY display_order, id");
        $stmt->execute($repIds);
        foreach ($stmt->fetchAll() as $o) {
            $options[(int) $o['question_id']][] = ['option_text' => $o['option_text'], 'is_correct' => (bool) $o['is_correct']];
        }
        $subs = [];
        $stmt = $db->prepare("SELECT parent_question_id, question_text, marks FROM assignment_questions WHERE parent_question_id IN (" . self::in($repIds) . ") AND deleted_at IS NULL ORDER BY display_order, id");
        $stmt->execute($repIds);
        foreach ($stmt->fetchAll() as $s) {
            $subs[(int) $s['parent_question_id']][] = ['question_text' => $s['question_text'], 'marks' => (float) $s['marks']];
        }

        $out = [];
        foreach ($groups as $g) {
            $q = $g['question'];
            $id = (int) $q['id'];
            $got = 0.0;
            $possible = 0.0;
            $answers = 0;
            foreach ($g['ids'] as $qid) {
                if (isset($stats[$qid])) {
                    $got += (float) $stats[$qid]['got'];
                    $possible += (float) $stats[$qid]['possible'];
                    $answers += (int) $stats[$qid]['answers'];
                }
            }
            $out[] = [
                'id' => $id,
                'question_type' => $q['question_type'],
                'question_text' => $q['question_text'],
                'scenario_text' => $q['scenario_text'],
                'marks' => (float) $q['marks'],
                'response_type' => $q['response_type'],
                'allow_drawing' => (bool) $q['allow_drawing'],
                'attachment_type' => $q['attachment_type'],
                'attachment_path' => $q['attachment_path'],
                'options' => $options[$id] ?? [],
                'sub_questions' => $subs[$id] ?? [],
                'topic_text' => $q['topic_text'],
                'outcome_text' => $q['outcome_text'],
                'category' => $q['assessment_category'],
                // An AOI's marking guide (from a suggested scenario) travels with its scenario question
                'marking_guide' => $q['question_type'] === 'scenario' && $q['assessment_category'] === 'AOI' ? $q['rubric'] : null,
                'author' => trim(($q['first_name'] ?? '') . ' ' . ($q['last_name'] ?? '')),
                'mine' => (int) $q['teacher_id'] === $teacherId,
                'class_name' => $q['class_name'],
                'last_used' => $q['used_at'],
                'uses' => count($g['assignments']),
                'teachers' => count($g['teachers']),
                'average' => $possible > 0 ? round($got / $possible * 100) : null,
                'answers' => $answers,
            ];
        }
        $this->success([
            'questions' => $out,
            'total' => $total,
            'matched_on' => $outcomeText !== null ? 'outcome' : ($topicText !== null ? 'topic' : 'subject'),
        ]);
    }
}
