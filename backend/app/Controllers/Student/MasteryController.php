<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ReportCardGradingService;

/**
 * Student Learning Outcome Mastery Map
 *
 * For each subject the student takes: the curriculum topics set for their class this academic
 * year (the admin curriculum bank, enote_curriculum_topics), each topic's learning outcomes, and
 * where the student stands on every one of them - worked out from their assessments:
 *  - a learning outcome from the Learning Outcome Assessments linked to it
 *    (assignment_learning_outcomes);
 *  - a topic from its Activity of Integration assessments (assignment_curriculum_topics) and its
 *    End of Chapter questions (assignment_questions.curriculum_topic_id).
 * Only work the teacher has returned counts as a result (marked-but-unreleased work shows as
 * "awaiting marking", never with its score - the same rule as the student's Assessments page).
 * Levels use the report card's own bands (ReportCardGradingService::getPerformanceLevel), so the
 * map and the report card always agree. Whether the student has opened the topic's eNotes is
 * included too.
 *
 * GET /student/mastery
 */
class MasteryController extends Controller
{
    /** Percentage from which an outcome counts as achieved (report card "Satisfactory" and up) */
    private const ACHIEVED_FROM = 60.0;
    /** "Basic" - on the way */
    private const DEVELOPING_FROM = 50.0;

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getStudentId(): ?int
    {
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return null;
        }
        $stmt = $this->getDb()->prepare("SELECT id FROM students WHERE id = :user_id AND deleted_at IS NULL");
        $stmt->execute(['user_id' => $userId]);
        $student = $stmt->fetch();
        return $student ? (int) $student['id'] : null;
    }

    private static function placeholders(array $values): string
    {
        return implode(',', array_fill(0, count($values), '?'));
    }

    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $db = $this->getDb();

        $year = $db->query("SELECT id, name FROM academic_years WHERE is_current = 1 ORDER BY id DESC LIMIT 1")->fetch();
        if (!$year) {
            $this->success(['year' => null, 'current_term_id' => null, 'subjects' => [], 'overall' => $this->emptyTotals()]);
            return;
        }
        $yearId = (int) $year['id'];
        $stmt = $db->prepare("SELECT id FROM terms WHERE academic_year_id = ? AND is_current = 1 LIMIT 1");
        $stmt->execute([$yearId]);
        $currentTermId = ($t = $stmt->fetch()) ? (int) $t['id'] : null;

        // The student's classes and departments
        $stmt = $db->prepare(
            "SELECT DISTINCT sde.class_id, sde.department_id, c.name AS class_name
             FROM student_department_enrollments sde
             LEFT JOIN classes c ON c.id = sde.class_id
             WHERE sde.student_id = ? AND sde.deleted_at IS NULL AND sde.status = 'active'"
        );
        $stmt->execute([$studentId]);
        $enrollments = $stmt->fetchAll();
        $classIds = array_values(array_unique(array_filter(array_map(fn($e) => (int) $e['class_id'], $enrollments))));
        $classNames = array_values(array_unique(array_filter(array_map(fn($e) => (string) $e['class_name'], $enrollments))));
        $departmentIds = array_values(array_unique(array_map(fn($e) => (int) $e['department_id'], $enrollments)));
        if (!$classIds || !$departmentIds) {
            $this->success(['year' => $year['name'], 'current_term_id' => $currentTermId, 'subjects' => [], 'overall' => $this->emptyTotals()]);
            return;
        }

        $stmt = $db->prepare(
            "SELECT id, name, code FROM subjects
             WHERE department_id IN (" . self::placeholders($departmentIds) . ") AND deleted_at IS NULL
             ORDER BY name"
        );
        $stmt->execute($departmentIds);
        $subjects = $stmt->fetchAll();
        $subjectIds = array_map(fn($s) => (int) $s['id'], $subjects);
        if (!$subjectIds) {
            $this->success(['year' => $year['name'], 'current_term_id' => $currentTermId, 'subjects' => [], 'overall' => $this->emptyTotals()]);
            return;
        }

        // This year's curriculum topics for the student's class
        $stmt = $db->prepare(
            "SELECT ct.id, ct.subject_id, ct.term_id, t.name AS term_name, ct.theme_branch, ct.topic, ct.competence
             FROM enote_curriculum_topics ct
             LEFT JOIN terms t ON t.id = ct.term_id
             WHERE ct.deleted_at IS NULL AND ct.academic_year_id = ?
               AND ct.class_id IN (" . self::placeholders($classIds) . ")
               AND ct.subject_id IN (" . self::placeholders($subjectIds) . ")
             ORDER BY ct.term_id, ct.id"
        );
        $stmt->execute(array_merge([$yearId], $classIds, $subjectIds));
        $topics = $stmt->fetchAll();
        $topicIds = array_map(fn($t) => (int) $t['id'], $topics);

        $outcomesByTopic = [];
        $outcomeIds = [];
        if ($topicIds) {
            $stmt = $db->prepare(
                "SELECT id, curriculum_topic_id, learning_outcome
                 FROM enote_learning_outcomes
                 WHERE curriculum_topic_id IN (" . self::placeholders($topicIds) . ")
                 ORDER BY curriculum_topic_id, order_number, id"
            );
            $stmt->execute($topicIds);
            foreach ($stmt->fetchAll() as $o) {
                $outcomesByTopic[(int) $o['curriculum_topic_id']][] = $o;
                $outcomeIds[] = (int) $o['id'];
            }
        }

        [$assessments, $outcomeLinks, $topicLinks, $eocByTopic] = $this->loadEvidence($db, $studentId, $classIds, $topicIds, $outcomeIds);
        $enotes = $this->loadEnotes($db, $studentId, $topicIds, $classIds, $classNames);

        // Assemble per subject
        $bySubject = [];
        foreach ($subjects as $s) {
            $bySubject[(int) $s['id']] = [
                'id' => (int) $s['id'],
                'name' => $s['name'],
                'code' => $s['code'],
                'topics' => [],
                'totals' => $this->emptyTotals(),
            ];
        }
        $overall = $this->emptyTotals();

        foreach ($topics as $t) {
            $topicId = (int) $t['id'];
            $outcomes = [];
            $summary = $this->emptyTotals();
            foreach ($outcomesByTopic[$topicId] ?? [] as $o) {
                $linked = array_map(fn($id) => $assessments[$id], array_values(array_filter(
                    $outcomeLinks[(int) $o['id']] ?? [],
                    fn($id) => isset($assessments[$id])
                )));
                $state = $this->stateFrom($linked);
                $outcomes[] = ['id' => (int) $o['id'], 'text' => $o['learning_outcome']] + $state;
                $this->count($summary, $state['status']);
            }

            $aoiLinked = array_map(fn($id) => $assessments[$id], array_values(array_filter(
                $topicLinks[$topicId] ?? [],
                fn($id) => isset($assessments[$id]) && $assessments[$id]['category'] === 'AOI'
            )));
            $aoi = $aoiLinked ? $this->stateFrom($aoiLinked) : null;
            $eocPct = $eocByTopic[$topicId] ?? null;
            $eoc = $eocPct !== null ? $this->levelFor($eocPct) + ['percentage' => $eocPct] : null;

            $subjectId = (int) $t['subject_id'];
            if (!isset($bySubject[$subjectId])) {
                continue;
            }
            $bySubject[$subjectId]['topics'][] = [
                'id' => $topicId,
                'term_id' => $t['term_id'] !== null ? (int) $t['term_id'] : null,
                'term_name' => $t['term_name'],
                'theme' => $t['theme_branch'],
                'topic' => $t['topic'],
                'competence' => $t['competence'],
                'outcomes' => $outcomes,
                'summary' => $summary,
                'aoi' => $aoi,
                'eoc' => $eoc,
                'enote' => $enotes[$topicId] ?? null,
            ];
            foreach ($summary as $key => $n) {
                $bySubject[$subjectId]['totals'][$key] += $n;
                $overall[$key] += $n;
            }
        }

        $subjectsOut = array_values(array_filter($bySubject, fn($s) => count($s['topics']) > 0));
        foreach ($subjectsOut as &$s) {
            $s['totals']['percent'] = $this->percentAchieved($s['totals']);
        }
        unset($s);
        $overall['percent'] = $this->percentAchieved($overall);

        $this->success([
            'year' => $year['name'],
            'current_term_id' => $currentTermId,
            'levels' => [
                'achieved_from' => self::ACHIEVED_FROM,
                'developing_from' => self::DEVELOPING_FROM,
            ],
            'subjects' => $subjectsOut,
            'overall' => $overall,
        ]);
    }

    /**
     * The student's standing on every published, open assessment for their class that's tied to
     * the curriculum, and how each links to outcomes/topics.
     *
     * @return array{0: array<int, array>, 1: array<int, int[]>, 2: array<int, int[]>, 3: array<int, float>}
     */
    private function loadEvidence($db, int $studentId, array $classIds, array $topicIds, array $outcomeIds): array
    {
        $assessments = [];
        $outcomeLinks = [];
        $topicLinks = [];
        $eocByTopic = [];
        if (!$topicIds) {
            return [$assessments, $outcomeLinks, $topicLinks, $eocByTopic];
        }

        if ($outcomeIds) {
            $stmt = $db->prepare(
                "SELECT assignment_id, learning_outcome_id FROM assignment_learning_outcomes
                 WHERE learning_outcome_id IN (" . self::placeholders($outcomeIds) . ")"
            );
            $stmt->execute($outcomeIds);
            foreach ($stmt->fetchAll() as $l) {
                $outcomeLinks[(int) $l['learning_outcome_id']][] = (int) $l['assignment_id'];
            }
        }
        $stmt = $db->prepare(
            "SELECT assignment_id, curriculum_topic_id FROM assignment_curriculum_topics
             WHERE curriculum_topic_id IN (" . self::placeholders($topicIds) . ")"
        );
        $stmt->execute($topicIds);
        foreach ($stmt->fetchAll() as $l) {
            $topicLinks[(int) $l['curriculum_topic_id']][] = (int) $l['assignment_id'];
        }

        $linkedIds = array_values(array_unique(array_merge(
            ...array_values($outcomeLinks ?: [[]]),
            ...array_values($topicLinks ?: [[]])
        )));

        // EOC questions tagged with these topics also count
        $stmt = $db->prepare(
            "SELECT DISTINCT assignment_id FROM assignment_questions
             WHERE curriculum_topic_id IN (" . self::placeholders($topicIds) . ")"
        );
        $stmt->execute($topicIds);
        $eocIds = array_map(fn($r) => (int) $r['assignment_id'], $stmt->fetchAll());
        $allIds = array_values(array_unique(array_merge($linkedIds, $eocIds)));
        if (!$allIds) {
            return [$assessments, $outcomeLinks, $topicLinks, $eocByTopic];
        }

        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.assessment_category, a.due_date,
                    sub.id AS submission_id, sub.status AS submission_status, sub.percentage
             FROM assignments a
             LEFT JOIN assignment_submissions sub ON sub.id = (
                 SELECT s2.id FROM assignment_submissions s2
                 WHERE s2.assignment_id = a.id AND s2.student_id = ? AND s2.deleted_at IS NULL
                 ORDER BY s2.attempt_number DESC, s2.id DESC LIMIT 1
             )
             WHERE a.id IN (" . self::placeholders($allIds) . ")
               AND a.status = 'published' AND a.deleted_at IS NULL
               AND (a.open_at IS NULL OR a.open_at <= NOW())
               AND (a.class_id IN (" . self::placeholders($classIds) . ")
                    OR EXISTS (SELECT 1 FROM assignment_classes ac
                               WHERE ac.assignment_id = a.id AND ac.class_id IN (" . self::placeholders($classIds) . ")))"
        );
        $stmt->execute(array_merge([$studentId], $allIds, $classIds, $classIds));
        $returnedSubmissions = [];
        foreach ($stmt->fetchAll() as $a) {
            $status = $a['submission_status'] ?: 'new';
            $state = match (true) {
                $status === 'returned' => 'marked',
                in_array($status, ['submitted', 'marking', 'graded'], true) => 'awaiting',
                $status === 'in_progress' => 'started',
                default => 'available',
            };
            $assessments[(int) $a['id']] = [
                'id' => (int) $a['id'],
                'title' => $a['title'],
                'category' => $a['assessment_category'],
                'due_date' => $a['due_date'],
                'state' => $state,
                // Scores only once the teacher has returned the work
                'percentage' => $state === 'marked' && $a['percentage'] !== null ? (float) $a['percentage'] : null,
                'submission_id' => $a['submission_id'] !== null ? (int) $a['submission_id'] : null,
            ];
            if ($state === 'marked' && $a['submission_id']) {
                $returnedSubmissions[] = (int) $a['submission_id'];
            }
        }

        // End of Chapter: per-topic marks from the questions tagged with each topic (returned work)
        if ($returnedSubmissions) {
            $stmt = $db->prepare(
                "SELECT aq.curriculum_topic_id AS topic_id, SUM(qm.marks_awarded) AS awarded, SUM(aq.marks) AS total
                 FROM question_marks qm
                 INNER JOIN assignment_questions aq ON aq.id = qm.question_id
                 INNER JOIN assignments a ON a.id = aq.assignment_id
                 WHERE qm.submission_id IN (" . self::placeholders($returnedSubmissions) . ")
                   AND aq.curriculum_topic_id IN (" . self::placeholders($topicIds) . ")
                   AND a.assessment_category = 'EOC' AND qm.marks_awarded IS NOT NULL
                 GROUP BY aq.curriculum_topic_id"
            );
            $stmt->execute(array_merge($returnedSubmissions, $topicIds));
            foreach ($stmt->fetchAll() as $r) {
                if ((float) $r['total'] > 0) {
                    $eocByTopic[(int) $r['topic_id']] = round((float) $r['awarded'] / (float) $r['total'] * 100, 1);
                }
            }
        }

        return [$assessments, $outcomeLinks, $topicLinks, $eocByTopic];
    }

    /** Each topic's published eNotes for the student's class, and whether they've opened them */
    private function loadEnotes($db, int $studentId, array $topicIds, array $classIds, array $classNames): array
    {
        if (!$topicIds) {
            return [];
        }
        $classCond = "(et.class_id IS NULL AND et.class_group_name IS NULL) OR et.class_id IN (" . self::placeholders($classIds) . ")";
        $params = array_merge([$studentId], $topicIds, $classIds);
        if ($classNames) {
            $classCond .= " OR et.class_group_name IN (" . self::placeholders($classNames) . ")";
            $params = array_merge($params, $classNames);
        }
        try {
            $stmt = $db->prepare(
                "SELECT et.id, et.curriculum_topic_id, et.title, et.total_pages,
                        prog.id AS progress_id, prog.pages_completed
                 FROM enote_topics et
                 LEFT JOIN enote_progress prog ON prog.topic_id = et.id AND prog.student_id = ?
                 WHERE et.curriculum_topic_id IN (" . self::placeholders($topicIds) . ")
                   AND et.status = 'published' AND et.deleted_at IS NULL
                   AND ({$classCond})
                 ORDER BY et.published_at DESC"
            );
            $stmt->execute($params);
        } catch (\PDOException $e) {
            return [];
        }
        $out = [];
        foreach ($stmt->fetchAll() as $e) {
            $topicId = (int) $e['curriculum_topic_id'];
            if (isset($out[$topicId])) {
                continue;
            }
            $out[$topicId] = [
                'id' => (int) $e['id'],
                'title' => $e['title'],
                'opened' => $e['progress_id'] !== null,
                'pages_read' => (int) ($e['pages_completed'] ?? 0),
                'total_pages' => (int) ($e['total_pages'] ?? 0),
            ];
        }
        return $out;
    }

    /**
     * Where the student stands from a set of assessments: averaged returned results give the
     * level; otherwise awaiting marking / available to attempt / not assessed.
     */
    private function stateFrom(array $assessments): array
    {
        $marked = array_values(array_filter($assessments, fn($a) => $a['state'] === 'marked' && $a['percentage'] !== null));
        $list = array_map(fn($a) => [
            'id' => $a['id'],
            'title' => $a['title'],
            'category' => $a['category'],
            'state' => $a['state'],
            'percentage' => $a['percentage'],
            'submission_id' => $a['submission_id'],
        ], $assessments);

        if ($marked) {
            $pct = round(array_sum(array_map(fn($a) => $a['percentage'], $marked)) / count($marked), 1);
            $status = $pct >= self::ACHIEVED_FROM ? 'achieved' : ($pct >= self::DEVELOPING_FROM ? 'developing' : 'needs_support');
            return ['status' => $status, 'percentage' => $pct] + $this->levelFor($pct) + ['assessments' => $list];
        }
        $states = array_column($assessments, 'state');
        $status = in_array('awaiting', $states, true) ? 'awaiting'
            : (array_intersect(['available', 'started'], $states) ? 'available' : 'not_assessed');
        return ['status' => $status, 'percentage' => null, 'level' => null, 'grade' => null, 'assessments' => $list];
    }

    private function levelFor(float $percentage): array
    {
        $level = ReportCardGradingService::getPerformanceLevel($percentage);
        return ['level' => $level['descriptor'], 'grade' => $level['status']];
    }

    private function emptyTotals(): array
    {
        return ['outcomes' => 0, 'achieved' => 0, 'developing' => 0, 'needs_support' => 0, 'awaiting' => 0, 'available' => 0, 'not_assessed' => 0];
    }

    private function count(array &$totals, string $status): void
    {
        $totals['outcomes']++;
        if (isset($totals[$status])) {
            $totals[$status]++;
        }
    }

    private function percentAchieved(array $totals): int
    {
        return $totals['outcomes'] > 0 ? (int) round($totals['achieved'] / $totals['outcomes'] * 100) : 0;
    }
}
