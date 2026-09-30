<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * The class Learning Map: for one class stream - or every stream of a class level together - and
 * a subject, how the class stands on every
 * learning outcome (from Learning Outcome Assessments) and every topic competency (from Activities
 * of Integration) - how many students have achieved it, are developing, need support or haven't
 * been assessed, and who needs support - plus each student's progress. The same levels as the
 * students' own Learning Map (Student\MasteryController): returned results only, achieved from
 * 60% (Satisfactory), developing from 50% (Basic).
 */
class ClassMapController extends Controller
{
    private const ACHIEVED_FROM = 60.0;
    private const DEVELOPING_FROM = 50.0;

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function teacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return isset($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        }
        return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    /** @return int[] */
    private function departmentIds($db, int $teacherId): array
    {
        $stmt = $db->prepare(
            "SELECT department_id FROM teacher_department_assignments WHERE teacher_id = ? AND deleted_at IS NULL
             UNION SELECT department_id FROM teachers WHERE id = ? AND department_id IS NOT NULL"
        );
        $stmt->execute([$teacherId, $teacherId]);
        return array_values(array_unique(array_map('intval', array_column($stmt->fetchAll(), 'department_id'))));
    }

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    /**
     * The subjects in the teacher's department(s), each with its class levels (S.1, S.2...) and their
     * streams that have curriculum topics for it this year.
     * GET /teacher/class-map/options
     */
    public function options(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = $this->getDb();
        $teacherId = $this->teacherId();
        $departments = $teacherId ? $this->departmentIds($db, $teacherId) : [];
        if (!$departments) {
            $this->error('Teacher not found', 403);
            return;
        }
        $stmt = $db->prepare(
            "SELECT DISTINCT s.id AS subject_id, s.name AS subject_name, c.id AS class_id,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_name,
                    c.name AS level, c.stream_name
             FROM enote_curriculum_topics ct
             INNER JOIN academic_years ay ON ay.id = ct.academic_year_id AND ay.is_current = 1
             INNER JOIN subjects s ON s.id = ct.subject_id AND s.deleted_at IS NULL AND s.department_id IN (" . self::in($departments) . ")
             INNER JOIN classes c ON c.id = ct.class_id
             WHERE ct.deleted_at IS NULL
             ORDER BY s.name, c.name, c.stream_name"
        );
        $stmt->execute($departments);
        $subjects = [];
        foreach ($stmt->fetchAll() as $r) {
            $sid = (int) $r['subject_id'];
            $subjects[$sid] ??= ['id' => $sid, 'name' => $r['subject_name'], 'levels' => []];
            $level = (string) $r['level'];
            $subjects[$sid]['levels'][$level] ??= ['name' => $level, 'streams' => []];
            $subjects[$sid]['levels'][$level]['streams'][] = [
                'id' => (int) $r['class_id'],
                'name' => $r['class_name'],
                'stream' => $r['stream_name'] ?: $r['class_name'],
            ];
        }
        foreach ($subjects as &$subject) {
            $subject['levels'] = array_values($subject['levels']);
        }
        unset($subject);
        $this->success(['subjects' => array_values($subjects)]);
    }

    /**
     * GET /teacher/class-map?subject_id=&class_id=   one stream
     * GET /teacher/class-map?subject_id=&level=S.1   every stream of the class level together
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = $this->getDb();
        $teacherId = $this->teacherId();
        $departments = $teacherId ? $this->departmentIds($db, $teacherId) : [];
        $classId = (int) ($_GET['class_id'] ?? 0);
        $level = trim((string) ($_GET['level'] ?? ''));
        $subjectId = (int) ($_GET['subject_id'] ?? 0);

        $stmt = $db->prepare("SELECT id, name, department_id FROM subjects WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$subjectId]);
        $subject = $stmt->fetch();
        if (!$subject || !in_array((int) $subject['department_id'], $departments, true)) {
            $this->notFound('Subject not found');
            return;
        }

        // The stream, or every stream of the level that has this subject's curriculum this year
        if ($classId) {
            $classIds = [$classId];
        } else {
            $stmt = $db->prepare(
                "SELECT DISTINCT c.id FROM classes c
                 INNER JOIN enote_curriculum_topics ct ON ct.class_id = c.id AND ct.deleted_at IS NULL AND ct.subject_id = ?
                 INNER JOIN academic_years ay ON ay.id = ct.academic_year_id AND ay.is_current = 1
                 WHERE c.name = ?"
            );
            $stmt->execute([$subjectId, $level]);
            $classIds = array_map('intval', array_column($stmt->fetchAll(), 'id'));
        }
        if (!$classIds) {
            $this->notFound('Class not found');
            return;
        }

        // Students in the stream(s), for this subject's department
        $stmt = $db->prepare(
            "SELECT DISTINCT st.id, st.first_name, st.last_name, st.admission_number,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_name
             FROM student_department_enrollments sde
             INNER JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL
             LEFT JOIN classes c ON c.id = sde.class_id
             WHERE sde.class_id IN (" . self::in($classIds) . ") AND sde.department_id = ? AND sde.status = 'active' AND sde.deleted_at IS NULL
             ORDER BY st.first_name, st.last_name"
        );
        $stmt->execute(array_merge($classIds, [(int) $subject['department_id']]));
        $students = $stmt->fetchAll();
        $studentIds = array_map(fn($s) => (int) $s['id'], $students);
        $names = [];
        foreach ($students as $s) {
            $names[(int) $s['id']] = trim($s['first_name'] . ' ' . $s['last_name']);
        }

        // This year's topics and outcomes for the stream(s)
        $stmt = $db->prepare(
            "SELECT ct.id, ct.topic, ct.theme_branch, ct.competence, ct.term_id, t.name AS term_name
             FROM enote_curriculum_topics ct
             INNER JOIN academic_years ay ON ay.id = ct.academic_year_id AND ay.is_current = 1
             LEFT JOIN terms t ON t.id = ct.term_id
             WHERE ct.deleted_at IS NULL AND ct.class_id IN (" . self::in($classIds) . ") AND ct.subject_id = ?
             ORDER BY ct.term_id, ct.id"
        );
        $stmt->execute(array_merge($classIds, [$subjectId]));
        $topics = $stmt->fetchAll();
        $topicIds = array_map(fn($t) => (int) $t['id'], $topics);

        $outcomes = [];
        $outcomeIds = [];
        if ($topicIds) {
            $stmt = $db->prepare(
                "SELECT id, curriculum_topic_id, learning_outcome FROM enote_learning_outcomes
                 WHERE curriculum_topic_id IN (" . self::in($topicIds) . ") ORDER BY curriculum_topic_id, order_number, id"
            );
            $stmt->execute($topicIds);
            foreach ($stmt->fetchAll() as $o) {
                $outcomes[(int) $o['curriculum_topic_id']][] = $o;
                $outcomeIds[] = (int) $o['id'];
            }
        }

        // Returned results per student: per outcome (LOA) and per topic (AOI)
        $outcomeResults = [];
        $outcomeAssessed = [];
        $topicResults = [];
        $topicAssessed = [];
        if ($studentIds && $outcomeIds) {
            $stmt = $db->prepare(
                "SELECT alo.learning_outcome_id AS item, sb.student_id, AVG(sb.percentage) AS pct
                 FROM assignment_learning_outcomes alo
                 INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
                 INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL
                        AND sb.status = 'returned' AND sb.percentage IS NOT NULL
                        AND sb.student_id IN (" . self::in($studentIds) . ")
                 WHERE alo.learning_outcome_id IN (" . self::in($outcomeIds) . ")
                 GROUP BY alo.learning_outcome_id, sb.student_id"
            );
            $stmt->execute(array_merge($studentIds, $outcomeIds));
            foreach ($stmt->fetchAll() as $r) {
                $outcomeResults[(int) $r['item']][(int) $r['student_id']] = (float) $r['pct'];
            }
            $stmt = $db->prepare(
                "SELECT DISTINCT alo.learning_outcome_id FROM assignment_learning_outcomes alo
                 INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
                 WHERE alo.learning_outcome_id IN (" . self::in($outcomeIds) . ")"
            );
            $stmt->execute($outcomeIds);
            $outcomeAssessed = array_flip(array_map('intval', array_column($stmt->fetchAll(), 'learning_outcome_id')));
        }
        if ($studentIds && $topicIds) {
            $links = "SELECT act.assignment_id, act.curriculum_topic_id FROM assignment_curriculum_topics act
                      WHERE act.curriculum_topic_id IN (" . self::in($topicIds) . ")";
            $linkParams = $topicIds;
            try {
                $db->query("SELECT curriculum_topic_id FROM enote_topics LIMIT 0");
                $links .= " UNION SELECT a2.id, et.curriculum_topic_id FROM assignments a2
                            INNER JOIN enote_topics et ON et.id = a2.enote_topic_id
                            WHERE a2.assessment_category = 'AOI' AND et.curriculum_topic_id IN (" . self::in($topicIds) . ")";
                $linkParams = array_merge($linkParams, $topicIds);
            } catch (\PDOException $e) {
                // eNote curriculum links not migrated yet
            }
            $stmt = $db->prepare(
                "SELECT links.curriculum_topic_id AS item, sb.student_id, AVG(sb.percentage) AS pct
                 FROM ($links) links
                 INNER JOIN assignments a ON a.id = links.assignment_id AND a.assessment_category = 'AOI'
                        AND a.deleted_at IS NULL AND a.status = 'published'
                 INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL
                        AND sb.status = 'returned' AND sb.percentage IS NOT NULL
                        AND sb.student_id IN (" . self::in($studentIds) . ")
                 GROUP BY links.curriculum_topic_id, sb.student_id"
            );
            $stmt->execute(array_merge($linkParams, $studentIds));
            foreach ($stmt->fetchAll() as $r) {
                $topicResults[(int) $r['item']][(int) $r['student_id']] = (float) $r['pct'];
            }
            $stmt = $db->prepare(
                "SELECT DISTINCT links.curriculum_topic_id FROM ($links) links
                 INNER JOIN assignments a ON a.id = links.assignment_id AND a.assessment_category = 'AOI'
                        AND a.deleted_at IS NULL AND a.status = 'published'"
            );
            $stmt->execute($linkParams);
            $topicAssessed = array_flip(array_map('intval', array_column($stmt->fetchAll(), 'curriculum_topic_id')));
        }

        // Summaries
        $perStudent = [];
        foreach ($studentIds as $sid) {
            $perStudent[$sid] = ['achieved' => 0, 'developing' => 0, 'needs_support' => 0, 'results' => 0];
        }
        $summarise = function (array $results, bool $assessed) use ($studentIds, $names): array {
            $counts = ['achieved' => 0, 'developing' => 0, 'needs_support' => 0, 'not_assessed' => 0];
            $support = [];
            foreach ($studentIds as $sid) {
                if (!isset($results[$sid])) {
                    $counts['not_assessed']++;
                    continue;
                }
                $pct = $results[$sid];
                $status = $pct >= self::ACHIEVED_FROM ? 'achieved' : ($pct >= self::DEVELOPING_FROM ? 'developing' : 'needs_support');
                $counts[$status]++;
                if ($status !== 'achieved') {
                    $support[] = ['student_id' => $sid, 'name' => $names[$sid] ?? '', 'percentage' => round($pct, 1), 'status' => $status];
                }
            }
            usort($support, fn($a, $b) => $a['percentage'] <=> $b['percentage']);
            return ['assessed' => $assessed, 'counts' => $counts, 'support' => $support];
        };

        // One entry per topic and per outcome, however many streams it's set for (each stream has
        // its own copy); a student's results come from their own stream's copy
        $groups = [];
        foreach ($topics as $t) {
            $key = mb_strtolower(trim((string) $t['theme_branch'])) . '|' . mb_strtolower(trim((string) $t['topic'])) . '|' . $t['term_id'];
            $groups[$key] ??= ['topic' => $t, 'ids' => [], 'outcomes' => []];
            $groups[$key]['ids'][] = (int) $t['id'];
            foreach ($outcomes[(int) $t['id']] ?? [] as $o) {
                $okey = mb_strtolower(trim((string) $o['learning_outcome']));
                $groups[$key]['outcomes'][$okey] ??= ['text' => $o['learning_outcome'], 'ids' => []];
                $groups[$key]['outcomes'][$okey]['ids'][] = (int) $o['id'];
            }
        }
        $merge = function (array $resultsById, array $ids): array {
            $sum = [];
            $n = [];
            foreach ($ids as $id) {
                foreach ($resultsById[$id] ?? [] as $sid => $pct) {
                    $sum[$sid] = ($sum[$sid] ?? 0) + $pct;
                    $n[$sid] = ($n[$sid] ?? 0) + 1;
                }
            }
            return array_map(fn($sid) => $sum[$sid] / $n[$sid], array_combine(array_keys($sum), array_keys($sum)));
        };

        $topicsOut = [];
        $outcomeGroups = 0;
        foreach ($groups as $g) {
            $t = $g['topic'];
            $outcomesOut = [];
            foreach ($g['outcomes'] as $og) {
                $outcomeGroups++;
                $results = $merge($outcomeResults, $og['ids']);
                foreach ($results as $sid => $pct) {
                    $perStudent[$sid]['results']++;
                    $perStudent[$sid][$pct >= self::ACHIEVED_FROM ? 'achieved' : ($pct >= self::DEVELOPING_FROM ? 'developing' : 'needs_support')]++;
                }
                $assessed = (bool) array_intersect_key($outcomeAssessed, array_flip($og['ids']));
                $outcomesOut[] = ['id' => $og['ids'][0], 'ids' => $og['ids'], 'text' => $og['text']] + $summarise($results, $assessed);
            }
            $topicsOut[] = [
                'id' => $g['ids'][0],
                // Every stream's copy of the topic (and each outcome's), for support groups
                'ids' => $g['ids'],
                'topic' => $t['topic'],
                'theme' => $t['theme_branch'],
                'term_name' => $t['term_name'],
                'competence' => $t['competence'],
                'outcomes' => $outcomesOut,
                'competency' => $summarise($merge($topicResults, $g['ids']), (bool) array_intersect_key($topicAssessed, array_flip($g['ids']))),
            ];
        }

        $studentsOut = [];
        foreach ($students as $s) {
            $sid = (int) $s['id'];
            $studentsOut[] = [
                'id' => $sid,
                'name' => $names[$sid],
                'admission_number' => $s['admission_number'],
                'class_name' => $s['class_name'],
            ] + $perStudent[$sid];
        }

        $this->success([
            'subject' => ['id' => (int) $subject['id'], 'name' => $subject['name']],
            'student_count' => count($studentIds),
            'topics' => $topicsOut,
            'students' => $studentsOut,
            'outcome_count' => $outcomeGroups,
            'streams' => count($classIds),
        ]);
    }
}
