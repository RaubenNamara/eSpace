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
 * Alongside the outcomes, every topic is one competency (its competence statement): the Activity
 * of Integration shows which level of competence the student has reached - the report card's
 * Exceptional (A) / Outstanding (B) / Satisfactory (C) / Basic (D) / Elementary (E) - with the
 * topic's learning outcomes as its building blocks. A competency counts as achieved from
 * Satisfactory up, the same line as an outcome.
 *
 * Above those sit the Elements of Construct (constructs, set by the admin): what learners must
 * achieve across several topics - possibly across themes and classes - for an Assessment
 * Objective. The End of Chapter assessments show the level reached on each: the marks on EOC
 * questions tagged with the construct's topics, or the whole EOC result where the assessment is
 * linked to the construct itself (assignments.construct_id). The topics it groups, with their
 * competencies, are its building blocks.
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
        $this->success($this->compute($studentId));
    }

    /**
     * The whole map for one student - also used by the student's next steps
     * (Student\NextStepsController)
     */
    public function compute(int $studentId): array
    {
        $db = $this->getDb();

        $year = $db->query("SELECT id, name FROM academic_years WHERE is_current = 1 ORDER BY id DESC LIMIT 1")->fetch();
        if (!$year) {
            return ['year' => null, 'current_term_id' => null, 'subjects' => [], 'overall' => $this->emptyTotals(), 'competencies' => $this->emptyCompetencyTotals(), 'constructs' => $this->emptyConstructTotals()];
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
            return ['year' => $year['name'], 'current_term_id' => $currentTermId, 'subjects' => [], 'overall' => $this->emptyTotals(), 'competencies' => $this->emptyCompetencyTotals(), 'constructs' => $this->emptyConstructTotals()];
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
            return ['year' => $year['name'], 'current_term_id' => $currentTermId, 'subjects' => [], 'overall' => $this->emptyTotals(), 'competencies' => $this->emptyCompetencyTotals(), 'constructs' => $this->emptyConstructTotals()];
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
        $practice = $this->loadPractice($db, $topicIds);
        $evidence = $this->loadEvidenceCounts($db, $studentId, $topicIds);

        // Assemble per subject
        $bySubject = [];
        foreach ($subjects as $s) {
            $bySubject[(int) $s['id']] = [
                'id' => (int) $s['id'],
                'name' => $s['name'],
                'code' => $s['code'],
                'topics' => [],
                'totals' => $this->emptyTotals(),
                'competency_totals' => $this->emptyCompetencyTotals(),
                'constructs' => [],
                'construct_totals' => $this->emptyConstructTotals(),
            ];
        }
        $overall = $this->emptyTotals();
        $overallCompetencies = $this->emptyCompetencyTotals();
        $overallConstructs = $this->emptyConstructTotals();
        $mapTopics = [];

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
                $page = array_values(array_filter(array_column($linked, 'page')))[0] ?? null;
                $outcomes[] = ['id' => (int) $o['id'], 'text' => $o['learning_outcome'], 'revise' => $page] + $state;
                $this->count($summary, $state['status']);
            }

            $aoiLinked = array_map(fn($id) => $assessments[$id], array_values(array_filter(
                $topicLinks[$topicId] ?? [],
                fn($id) => isset($assessments[$id]) && $assessments[$id]['category'] === 'AOI'
            )));
            $aoi = $aoiLinked ? $this->stateFrom($aoiLinked) : null;
            // The topic's competency: where its Activity of Integration puts the student, built on
            // the topic's outcomes
            $competency = ($aoi ?? $this->stateFrom([])) + [
                'text' => trim((string) $t['competence']) !== '' ? trim((string) $t['competence']) : null,
                'building_blocks' => ['achieved' => $summary['achieved'], 'outcomes' => $summary['outcomes']],
            ];
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
                'competency' => $competency,
                'eoc' => $eoc,
                'enote' => $enotes[$topicId] ?? null,
                // Item Bank resources the teacher tagged with this topic, to practise on
                'practice' => $practice[$topicId] ?? [],
                // The student's own evidence of the topic's competency (competency_evidence)
                'evidence' => $evidence[$topicId] ?? ['confirmed' => 0, 'pending' => 0, 'returned' => 0],
            ];
            foreach ($summary as $key => $n) {
                $bySubject[$subjectId]['totals'][$key] += $n;
                $overall[$key] += $n;
            }
            $mapTopics[$topicId] = [
                'id' => $topicId,
                'topic' => $t['topic'],
                'grade' => $competency['grade'],
                'status' => $competency['status'],
                'achieved' => $summary['achieved'],
                'outcomes' => $summary['outcomes'],
            ];
            $this->countCompetency($bySubject[$subjectId]['competency_totals'], $competency);
            $this->countCompetency($overallCompetencies, $competency);
        }

        // Elements of Construct for the student's subjects and classes
        foreach ($this->loadConstructs($db, $studentId, $classIds, $subjectIds, $mapTopics) as $construct) {
            $subjectId = $construct['subject_id'];
            if (!isset($bySubject[$subjectId])) {
                continue;
            }
            $bySubject[$subjectId]['constructs'][] = $construct;
            $this->countCompetency($bySubject[$subjectId]['construct_totals'], $construct, 'constructs');
            $this->countCompetency($overallConstructs, $construct, 'constructs');
        }

        $subjectsOut = array_values(array_filter($bySubject, fn($s) => count($s['topics']) > 0 || count($s['constructs']) > 0));
        foreach ($subjectsOut as &$s) {
            $s['totals']['percent'] = $this->percentAchieved($s['totals']);
            $s['competency_totals']['percent'] = $this->percentCompetent($s['competency_totals']);
            $s['construct_totals']['percent'] = $this->percentCompetent($s['construct_totals'], 'constructs');
        }
        unset($s);
        $overall['percent'] = $this->percentAchieved($overall);
        $overallCompetencies['percent'] = $this->percentCompetent($overallCompetencies);
        $overallConstructs['percent'] = $this->percentCompetent($overallConstructs, 'constructs');

        return [
            'year' => $year['name'],
            'current_term_id' => $currentTermId,
            'levels' => [
                'achieved_from' => self::ACHIEVED_FROM,
                'developing_from' => self::DEVELOPING_FROM,
            ],
            'subjects' => $subjectsOut,
            'overall' => $overall,
            'competencies' => $overallCompetencies,
            'constructs' => $overallConstructs,
        ];
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
        // An Activity of Integration set at the end of a topic's eNotes belongs to the curriculum
        // topic those notes are linked to - even when the notes were linked after it was created
        try {
            $stmt = $db->prepare(
                "SELECT a.id AS assignment_id, et.curriculum_topic_id
                 FROM assignments a
                 INNER JOIN enote_topics et ON et.id = a.enote_topic_id
                 WHERE a.assessment_category = 'AOI' AND a.enote_page_id IS NULL AND a.deleted_at IS NULL
                   AND et.curriculum_topic_id IN (" . self::placeholders($topicIds) . ")"
            );
            $stmt->execute($topicIds);
            foreach ($stmt->fetchAll() as $l) {
                $topicId = (int) $l['curriculum_topic_id'];
                if (!in_array((int) $l['assignment_id'], $topicLinks[$topicId] ?? [], true)) {
                    $topicLinks[$topicId][] = (int) $l['assignment_id'];
                }
            }
        } catch (\PDOException $e) {
            // enote_topics.curriculum_topic_id / assignments.enote_page_id not migrated yet
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

        // The eNote page a Learning Outcome Assessment was set on is where its outcome is taught -
        // the page to revise when the outcome needs strengthening
        $pageCols = $this->hasEnotePageLink($db) ? 'a.enote_topic_id, a.enote_page_id,' : 'NULL AS enote_topic_id, NULL AS enote_page_id,';
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.assessment_category, a.due_date, {$pageCols}
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
                'page' => $a['enote_page_id'] && $a['enote_topic_id']
                    ? ['topic_id' => (int) $a['enote_topic_id'], 'page_id' => (int) $a['enote_page_id']]
                    : null,
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

    /**
     * The Elements of Construct that group any curriculum topic of the student's classes, with the
     * level their End of Chapter results show and the topics (building blocks) under them.
     *
     * @param array<int, array> $mapTopics this year's topics on the student's map, by id
     */
    private function loadConstructs($db, int $studentId, array $classIds, array $subjectIds, array $mapTopics): array
    {
        if (!$classIds || !$subjectIds) {
            return [];
        }
        try {
            $stmt = $db->prepare(
                "SELECT DISTINCT c.id, c.name, c.subject_id, c.level, c.assessment_objective, c.description
                 FROM constructs c
                 INNER JOIN construct_topics ctp ON ctp.construct_id = c.id
                 INNER JOIN enote_curriculum_topics ct ON ct.id = ctp.curriculum_topic_id
                 WHERE c.deleted_at IS NULL
                   AND c.subject_id IN (" . self::placeholders($subjectIds) . ")
                   AND ct.class_id IN (" . self::placeholders($classIds) . ")
                 ORDER BY c.assessment_objective, c.name"
            );
            $stmt->execute(array_merge($subjectIds, $classIds));
            $constructs = $stmt->fetchAll();
        } catch (\PDOException $e) {
            return []; // constructs not migrated yet
        }
        if (!$constructs) {
            return [];
        }
        $constructIds = array_map(fn($c) => (int) $c['id'], $constructs);

        // Every topic each construct groups (one row per class-stream and year)
        $stmt = $db->prepare(
            "SELECT ctp.construct_id, ct.id, ct.topic, ct.theme_branch, ct.class_id, cl.name AS class_name
             FROM construct_topics ctp
             INNER JOIN enote_curriculum_topics ct ON ct.id = ctp.curriculum_topic_id AND ct.deleted_at IS NULL
             LEFT JOIN classes cl ON cl.id = ct.class_id
             WHERE ctp.construct_id IN (" . self::placeholders($constructIds) . ")"
        );
        $stmt->execute($constructIds);
        $topicRows = [];
        $allTopicIds = [];
        foreach ($stmt->fetchAll() as $row) {
            $topicRows[(int) $row['construct_id']][] = $row;
            $allTopicIds[] = (int) $row['id'];
        }
        $allTopicIds = array_values(array_unique($allTopicIds));

        // End of Chapter assessments for the student's class: linked to a construct, or asking
        // questions on a construct's topics
        $params = $constructIds;
        $tagged = '';
        if ($allTopicIds) {
            $tagged = " OR EXISTS (SELECT 1 FROM assignment_questions q WHERE q.assignment_id = a.id AND q.curriculum_topic_id IN (" . self::placeholders($allTopicIds) . "))";
            $params = array_merge($params, $allTopicIds);
        }
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.assessment_category, a.construct_id,
                    sub.id AS submission_id, sub.status AS submission_status, sub.percentage
             FROM assignments a
             LEFT JOIN assignment_submissions sub ON sub.id = (
                 SELECT s2.id FROM assignment_submissions s2
                 WHERE s2.assignment_id = a.id AND s2.student_id = ? AND s2.deleted_at IS NULL
                 ORDER BY s2.attempt_number DESC, s2.id DESC LIMIT 1
             )
             WHERE a.assessment_category = 'EOC' AND a.status = 'published' AND a.deleted_at IS NULL
               AND (a.open_at IS NULL OR a.open_at <= NOW())
               AND (a.construct_id IN (" . self::placeholders($constructIds) . "){$tagged})
               AND (a.class_id IN (" . self::placeholders($classIds) . ")
                    OR EXISTS (SELECT 1 FROM assignment_classes ac
                               WHERE ac.assignment_id = a.id AND ac.class_id IN (" . self::placeholders($classIds) . ")))"
        );
        $stmt->execute(array_merge([$studentId], $params, $classIds, $classIds));
        $eocs = [];
        foreach ($stmt->fetchAll() as $a) {
            $status = $a['submission_status'] ?: 'new';
            $state = match (true) {
                $status === 'returned' => 'marked',
                in_array($status, ['submitted', 'marking', 'graded'], true) => 'awaiting',
                $status === 'in_progress' => 'started',
                default => 'available',
            };
            $eocs[(int) $a['id']] = [
                'id' => (int) $a['id'],
                'title' => $a['title'],
                'category' => 'EOC',
                'construct_id' => $a['construct_id'] !== null ? (int) $a['construct_id'] : null,
                'state' => $state,
                'percentage' => $state === 'marked' && $a['percentage'] !== null ? (float) $a['percentage'] : null,
                'submission_id' => $a['submission_id'] !== null ? (int) $a['submission_id'] : null,
            ];
        }

        // Which construct topics each EOC asks about, and the student's marks on those questions
        $asksAbout = [];
        $marks = [];
        if ($eocs && $allTopicIds) {
            $eocIds = array_keys($eocs);
            $stmt = $db->prepare(
                "SELECT DISTINCT assignment_id, curriculum_topic_id FROM assignment_questions
                 WHERE assignment_id IN (" . self::placeholders($eocIds) . ")
                   AND curriculum_topic_id IN (" . self::placeholders($allTopicIds) . ")"
            );
            $stmt->execute(array_merge($eocIds, $allTopicIds));
            foreach ($stmt->fetchAll() as $row) {
                $asksAbout[(int) $row['assignment_id']][] = (int) $row['curriculum_topic_id'];
            }
            $returned = array_values(array_filter(array_map(fn($e) => $e['state'] === 'marked' ? $e['submission_id'] : null, $eocs)));
            if ($returned) {
                $stmt = $db->prepare(
                    "SELECT aq.assignment_id, aq.curriculum_topic_id, SUM(qm.marks_awarded) AS awarded, SUM(aq.marks) AS total
                     FROM question_marks qm
                     INNER JOIN assignment_questions aq ON aq.id = qm.question_id
                     WHERE qm.submission_id IN (" . self::placeholders($returned) . ")
                       AND aq.curriculum_topic_id IN (" . self::placeholders($allTopicIds) . ")
                       AND qm.marks_awarded IS NOT NULL
                     GROUP BY aq.assignment_id, aq.curriculum_topic_id"
                );
                $stmt->execute(array_merge($returned, $allTopicIds));
                foreach ($stmt->fetchAll() as $row) {
                    $marks[(int) $row['assignment_id']][(int) $row['curriculum_topic_id']] = [(float) $row['awarded'], (float) $row['total']];
                }
            }
        }

        $out = [];
        foreach ($constructs as $c) {
            $cid = (int) $c['id'];
            $rows = $topicRows[$cid] ?? [];
            $ownTopicIds = array_map(fn($row) => (int) $row['id'], $rows);

            // Its End of Chapter assessments, and the marks that count towards it
            $linked = [];
            $awarded = 0.0;
            $total = 0.0;
            foreach ($eocs as $eid => $e) {
                $onTopics = array_values(array_intersect($asksAbout[$eid] ?? [], $ownTopicIds));
                if ($e['construct_id'] !== $cid && !$onTopics) {
                    continue;
                }
                $linked[] = $e;
                if ($e['state'] !== 'marked') {
                    continue;
                }
                if ($onTopics) {
                    foreach ($onTopics as $tid) {
                        [$a, $t] = $marks[$eid][$tid] ?? [0.0, 0.0];
                        $awarded += $a;
                        $total += $t;
                    }
                } elseif ($e['percentage'] !== null) {
                    // Linked to the construct without tagged questions: the whole result counts
                    $awarded += $e['percentage'];
                    $total += 100;
                }
            }
            if ($total > 0) {
                $pct = round($awarded / $total * 100, 1);
                $state = [
                    'status' => $pct >= self::ACHIEVED_FROM ? 'achieved' : ($pct >= self::DEVELOPING_FROM ? 'developing' : 'needs_support'),
                    'percentage' => $pct,
                ] + $this->levelFor($pct);
            } else {
                $state = array_intersect_key($this->stateFrom($linked), array_flip(['status', 'percentage', 'level', 'grade']));
            }

            // Building blocks: its topics on this year's map (with their competencies), and the
            // ones taught in another class or year, still to come
            $blocks = [];
            $seenNames = [];
            foreach ($rows as $row) {
                $tid = (int) $row['id'];
                if (isset($mapTopics[$tid]) && !isset($blocks[$tid])) {
                    $blocks[$tid] = $mapTopics[$tid];
                    $seenNames[mb_strtolower(trim($row['topic']))] = true;
                }
            }
            $later = [];
            foreach ($rows as $row) {
                $name = mb_strtolower(trim($row['topic']));
                if (!isset($seenNames[$name]) && !isset($later[$name])) {
                    $later[$name] = ['topic' => $row['topic'], 'class_name' => $row['class_name']];
                }
            }
            $blocks = array_values($blocks);

            $out[] = [
                'id' => $cid,
                'subject_id' => (int) $c['subject_id'],
                'name' => $c['name'],
                'level_name' => $c['level'],
                'assessment_objective' => $c['assessment_objective'],
                'description' => $c['description'],
                'assessments' => array_map(fn($e) => array_diff_key($e, ['construct_id' => 0]), $linked),
                'building_blocks' => [
                    'topics' => $blocks,
                    'competencies_achieved' => count(array_filter($blocks, fn($b) => $b['status'] === 'achieved')),
                    'later' => array_values($later),
                ],
            ] + $state;
        }
        return $out;
    }

    /** How much competency evidence the student has per topic, by status */
    private function loadEvidenceCounts($db, int $studentId, array $topicIds): array
    {
        if (!$topicIds) {
            return [];
        }
        try {
            $stmt = $db->prepare(
                "SELECT curriculum_topic_id, status, COUNT(*) AS n FROM competency_evidence
                 WHERE student_id = ? AND deleted_at IS NULL
                   AND curriculum_topic_id IN (" . self::placeholders($topicIds) . ")
                 GROUP BY curriculum_topic_id, status"
            );
            $stmt->execute(array_merge([$studentId], $topicIds));
        } catch (\PDOException $e) {
            return []; // migration 099 not run yet
        }
        $out = [];
        foreach ($stmt->fetchAll() as $row) {
            $out[(int) $row['curriculum_topic_id']] ??= ['confirmed' => 0, 'pending' => 0, 'returned' => 0];
            $out[(int) $row['curriculum_topic_id']][$row['status']] = (int) $row['n'];
        }
        return $out;
    }

    private function hasEnotePageLink($db): bool
    {
        try {
            return (bool) $db->query("SHOW COLUMNS FROM assignments LIKE 'enote_page_id'")->fetch();
        } catch (\Throwable $e) {
            return false;
        }
    }

    /** Published Item Bank resources tagged with each topic (item_bank_curriculum_topics) */
    private function loadPractice($db, array $topicIds): array
    {
        if (!$topicIds) {
            return [];
        }
        try {
            $stmt = $db->prepare(
                "SELECT ibt.curriculum_topic_id, q.id, q.question_text AS title
                 FROM item_bank_curriculum_topics ibt
                 INNER JOIN item_bank_questions q ON q.id = ibt.question_id
                 WHERE ibt.curriculum_topic_id IN (" . self::placeholders($topicIds) . ")
                   AND q.status = 'published' AND q.deleted_at IS NULL
                   AND (q.published_at IS NULL OR q.published_at <= NOW())
                 ORDER BY q.published_at DESC"
            );
            $stmt->execute($topicIds);
        } catch (\PDOException $e) {
            return []; // migration 098 not run yet
        }
        $out = [];
        foreach ($stmt->fetchAll() as $row) {
            $out[(int) $row['curriculum_topic_id']][] = ['id' => (int) $row['id'], 'title' => $row['title']];
        }
        return $out;
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

    /** Competencies by level (A-E, from the Activity of Integration) and by what's still to come */
    private function emptyCompetencyTotals(): array
    {
        return ['competencies' => 0, 'achieved' => 0, 'A' => 0, 'B' => 0, 'C' => 0, 'D' => 0, 'E' => 0, 'awaiting' => 0, 'available' => 0, 'not_assessed' => 0];
    }

    private function countCompetency(array &$totals, array $competency, string $countKey = 'competencies'): void
    {
        $totals[$countKey]++;
        $grade = $competency['grade'] ?? null;
        if ($grade !== null && isset($totals[$grade])) {
            $totals[$grade]++;
            if ($competency['status'] === 'achieved') {
                $totals['achieved']++;
            }
        } elseif (isset($totals[$competency['status']])) {
            $totals[$competency['status']]++;
        }
    }

    private function percentCompetent(array $totals, string $countKey = 'competencies'): int
    {
        return $totals[$countKey] > 0 ? (int) round($totals['achieved'] / $totals[$countKey] * 100) : 0;
    }

    private function emptyConstructTotals(): array
    {
        return ['constructs' => 0] + array_diff_key($this->emptyCompetencyTotals(), ['competencies' => 0]);
    }

    private function percentAchieved(array $totals): int
    {
        return $totals['outcomes'] > 0 ? (int) round($totals['achieved'] / $totals['outcomes'] * 100) : 0;
    }
}
