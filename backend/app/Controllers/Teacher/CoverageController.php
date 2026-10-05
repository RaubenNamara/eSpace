<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Curriculum coverage for a teacher's subjects: for every topic this year (one entry per class
 * level, however many streams it's set for) - which learning outcomes have an assessment, whether
 * it has an Activity of Integration, its Elements of Construct and whether they have an End of
 * Chapter, and whether there are eNotes and Item Bank practice for it. Plus the teacher's own
 * assessments that are linked to curriculum topics that have since been deleted (with the closest
 * current topics to re-link them to), and their curriculum-type assessments with no links at all.
 * This is what makes the students' Learning Map fill in.
 */
class CoverageController extends Controller
{
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
    public function departmentIds($db, int $teacherId): array
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

    private function tableExists($db, string $table): bool
    {
        try {
            return (bool) $db->query("SHOW TABLES LIKE " . $db->quote($table))->fetch();
        } catch (\Throwable $e) {
            return false;
        }
    }

    private function columnExists($db, string $table, string $column): bool
    {
        try {
            return (bool) $db->query("SHOW COLUMNS FROM `{$table}` LIKE " . $db->quote($column))->fetch();
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * GET /teacher/coverage?subject_id=
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->teacherId();
        $db = $this->getDb();
        $departments = $teacherId ? $this->departmentIds($db, $teacherId) : [];
        if (!$departments) {
            $this->error('Teacher not found', 403);
            return;
        }

        $stmt = $db->prepare("SELECT id, name, code FROM subjects WHERE department_id IN (" . self::in($departments) . ") AND deleted_at IS NULL ORDER BY name");
        $stmt->execute($departments);
        $subjects = $stmt->fetchAll();
        $subjectIds = array_map(fn($s) => (int) $s['id'], $subjects);
        $subjectId = (int) ($_GET['subject_id'] ?? 0);
        if (!in_array($subjectId, $subjectIds, true)) {
            $subjectId = $subjectIds[0] ?? 0;
        }

        $this->success([
            'subjects' => $subjects,
            'subject_id' => $subjectId ?: null,
            'classes' => $subjectId ? $this->topicsFor($db, $subjectId) : [],
            'broken' => $this->brokenLinks($db, $teacherId, $subjectIds),
            'unlinked' => $this->unlinked($db, $teacherId),
        ]);
    }

    /** This year's topics for a subject, grouped by class level, with what covers each */
    public function topicsFor($db, int $subjectId): array
    {
        $stmt = $db->prepare(
            "SELECT ct.id, ct.topic, ct.theme_branch, ct.term_id, t.name AS term_name, c.name AS class_name, ay.name AS academic_year
             FROM enote_curriculum_topics ct
             INNER JOIN academic_years ay ON ay.id = ct.academic_year_id AND ay.is_current = 1
             LEFT JOIN terms t ON t.id = ct.term_id
             LEFT JOIN classes c ON c.id = ct.class_id
             WHERE ct.deleted_at IS NULL AND ct.subject_id = ?
             ORDER BY c.name, ct.term_id, ct.id"
        );
        $stmt->execute([$subjectId]);
        $rows = $stmt->fetchAll();
        if (!$rows) {
            return [];
        }
        $ids = array_map(fn($r) => (int) $r['id'], $rows);
        $in = self::in($ids);

        // Outcomes, and which have a (published) assessment linked
        $stmt = $db->prepare(
            "SELECT lo.id, lo.curriculum_topic_id, lo.learning_outcome,
                    EXISTS (SELECT 1 FROM assignment_learning_outcomes alo
                            INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
                            WHERE alo.learning_outcome_id = lo.id) AS covered
             FROM enote_learning_outcomes lo WHERE lo.curriculum_topic_id IN ($in)"
        );
        $stmt->execute($ids);
        $outcomes = [];
        foreach ($stmt->fetchAll() as $o) {
            $outcomes[(int) $o['curriculum_topic_id']][] = $o;
        }

        // Activities of Integration (direct links, or set at the end of a linked eNote)
        $aoiSql = "SELECT act.curriculum_topic_id, a.id, a.title FROM assignment_curriculum_topics act
                   INNER JOIN assignments a ON a.id = act.assignment_id AND a.assessment_category = 'AOI' AND a.deleted_at IS NULL
                   WHERE act.curriculum_topic_id IN ($in)";
        $params = $ids;
        if ($this->columnExists($db, 'enote_topics', 'curriculum_topic_id')) {
            $aoiSql .= " UNION SELECT et.curriculum_topic_id, a.id, a.title FROM assignments a
                         INNER JOIN enote_topics et ON et.id = a.enote_topic_id
                         WHERE a.assessment_category = 'AOI' AND a.deleted_at IS NULL AND et.curriculum_topic_id IN ($in)"
                . ($this->columnExists($db, 'assignments', 'enote_page_id') ? " AND a.enote_page_id IS NULL" : '');
            $params = array_merge($params, $ids);
        }
        $stmt = $db->prepare($aoiSql);
        $stmt->execute($params);
        $aois = [];
        foreach ($stmt->fetchAll() as $a) {
            $aois[(int) $a['curriculum_topic_id']][(int) $a['id']] = ['id' => (int) $a['id'], 'title' => $a['title']];
        }

        // Elements of Construct, and whether each has an End of Chapter
        $constructs = [];
        if ($this->tableExists($db, 'constructs')) {
            $stmt = $db->prepare(
                "SELECT ctp.curriculum_topic_id, cn.id, cn.name, cn.assessment_objective,
                        EXISTS (SELECT 1 FROM assignments a WHERE a.construct_id = cn.id AND a.assessment_category = 'EOC' AND a.deleted_at IS NULL)
                        OR EXISTS (SELECT 1 FROM assignment_questions q
                                   INNER JOIN construct_topics c2 ON c2.curriculum_topic_id = q.curriculum_topic_id AND c2.construct_id = cn.id
                                   INNER JOIN assignments a ON a.id = q.assignment_id AND a.assessment_category = 'EOC' AND a.deleted_at IS NULL) AS has_eoc
                 FROM construct_topics ctp
                 INNER JOIN constructs cn ON cn.id = ctp.construct_id AND cn.deleted_at IS NULL
                 WHERE ctp.curriculum_topic_id IN ($in)"
            );
            $stmt->execute($ids);
            foreach ($stmt->fetchAll() as $c) {
                $constructs[(int) $c['curriculum_topic_id']][(int) $c['id']] = [
                    'id' => (int) $c['id'], 'name' => $c['name'], 'assessment_objective' => $c['assessment_objective'], 'has_eoc' => (bool) $c['has_eoc'],
                ];
            }
        }

        // eNotes and Item Bank practice linked to the topic
        $enotes = [];
        if ($this->columnExists($db, 'enote_topics', 'curriculum_topic_id')) {
            $stmt = $db->prepare("SELECT id, title, status, curriculum_topic_id FROM enote_topics WHERE deleted_at IS NULL AND curriculum_topic_id IN ($in)");
            $stmt->execute($ids);
            foreach ($stmt->fetchAll() as $e) {
                $enotes[(int) $e['curriculum_topic_id']][(int) $e['id']] = ['id' => (int) $e['id'], 'title' => $e['title'], 'status' => $e['status']];
            }
        }
        $practice = [];
        if ($this->tableExists($db, 'item_bank_curriculum_topics')) {
            $stmt = $db->prepare(
                "SELECT ibt.curriculum_topic_id, q.id FROM item_bank_curriculum_topics ibt
                 INNER JOIN item_bank_questions q ON q.id = ibt.question_id AND q.deleted_at IS NULL
                 WHERE ibt.curriculum_topic_id IN ($in)"
            );
            $stmt->execute($ids);
            foreach ($stmt->fetchAll() as $p) {
                $practice[(int) $p['curriculum_topic_id']][(int) $p['id']] = true;
            }
        }

        // One entry per topic per class level (a topic is set once per stream)
        $classes = [];
        foreach ($rows as $r) {
            $class = $r['class_name'] ?: 'Class';
            $key = mb_strtolower(trim((string) $r['theme_branch'])) . '|' . mb_strtolower(trim((string) $r['topic'])) . '|' . $r['term_id'];
            $classes[$class] ??= [];
            if (!isset($classes[$class][$key])) {
                $classes[$class][$key] = [
                    'id' => (int) $r['id'],
                    'topic' => $r['topic'],
                    'theme' => $r['theme_branch'],
                    'term_name' => $r['term_name'],
                    // For drafting an AOI for the whole class level (every stream's copy)
                    'ids' => [],
                    'term_id' => $r['term_id'] !== null ? (int) $r['term_id'] : null,
                    'academic_year' => $r['academic_year'],
                    'outcome_texts' => [],
                    'covered_texts' => [],
                    'aoi' => [], 'constructs' => [], 'enotes' => [], 'practice' => [],
                ];
            }
            $g = &$classes[$class][$key];
            $tid = (int) $r['id'];
            $g['ids'][] = $tid;
            foreach ($outcomes[$tid] ?? [] as $o) {
                $text = mb_strtolower(trim((string) $o['learning_outcome']));
                $g['outcome_texts'][$text] = true;
                if ((int) $o['covered']) {
                    $g['covered_texts'][$text] = true;
                }
            }
            $g['aoi'] += $aois[$tid] ?? [];
            $g['constructs'] += $constructs[$tid] ?? [];
            $g['enotes'] += $enotes[$tid] ?? [];
            $g['practice'] += $practice[$tid] ?? [];
            unset($g);
        }

        $out = [];
        foreach ($classes as $class => $groups) {
            $topics = [];
            foreach ($groups as $g) {
                $topics[] = [
                    'id' => $g['id'],
                    'topic' => $g['topic'],
                    'theme' => $g['theme'],
                    'term_name' => $g['term_name'],
                    'ids' => $g['ids'],
                    'term_id' => $g['term_id'],
                    'academic_year' => $g['academic_year'],
                    'outcomes' => count($g['outcome_texts']),
                    'outcomes_covered' => count($g['covered_texts']),
                    'aoi' => array_values($g['aoi']),
                    'constructs' => array_values($g['constructs']),
                    'enotes' => array_values($g['enotes']),
                    'practice' => count($g['practice']),
                ];
            }
            $out[] = ['class_name' => $class, 'topics' => $topics];
        }
        return $out;
    }

    /**
     * The teacher's assessments linked to curriculum topics that have since been deleted, with
     * the closest current topics (same subject and class) to move the links to.
     */
    private function brokenLinks($db, int $teacherId, array $subjectIds): array
    {
        $stmt = $db->prepare(
            "SELECT a.id AS assignment_id, a.title, a.assessment_category, ct.id AS topic_id, ct.topic, ct.subject_id, ct.class_id,
                    c.name AS class_name, s.name AS subject_name
             FROM (
                 SELECT assignment_id, curriculum_topic_id FROM assignment_curriculum_topics
                 UNION SELECT assignment_id, curriculum_topic_id FROM assignment_learning_outcomes
                 UNION SELECT assignment_id, curriculum_topic_id FROM assignment_questions WHERE curriculum_topic_id IS NOT NULL
             ) links
             INNER JOIN enote_curriculum_topics ct ON ct.id = links.curriculum_topic_id AND ct.deleted_at IS NOT NULL
             INNER JOIN assignments a ON a.id = links.assignment_id AND a.deleted_at IS NULL AND a.teacher_id = ?
             LEFT JOIN classes c ON c.id = ct.class_id
             LEFT JOIN subjects s ON s.id = ct.subject_id
             ORDER BY a.id"
        );
        $stmt->execute([$teacherId]);
        $out = [];
        foreach ($stmt->fetchAll() as $b) {
            $out[] = [
                'assignment_id' => (int) $b['assignment_id'],
                'title' => $b['title'],
                'category' => $b['assessment_category'],
                'topic_id' => (int) $b['topic_id'],
                'topic' => $b['topic'],
                'class_name' => $b['class_name'],
                'subject_name' => $b['subject_name'],
                'suggestions' => $this->suggest($db, (int) $b['subject_id'], $b['class_id'] !== null ? (int) $b['class_id'] : null, (string) $b['topic']),
            ];
        }
        return $out;
    }

    /** Current topics most like `$name`, for the same subject and class */
    private function suggest($db, int $subjectId, ?int $classId, string $name): array
    {
        $stmt = $db->prepare(
            "SELECT ct.id, ct.topic, t.name AS term_name
             FROM enote_curriculum_topics ct
             INNER JOIN academic_years ay ON ay.id = ct.academic_year_id AND ay.is_current = 1
             LEFT JOIN terms t ON t.id = ct.term_id
             WHERE ct.deleted_at IS NULL AND ct.subject_id = ? AND (? IS NULL OR ct.class_id = ?)"
        );
        $stmt->execute([$subjectId, $classId, $classId]);
        $target = mb_strtolower(trim($name));
        $scored = [];
        foreach ($stmt->fetchAll() as $t) {
            $candidate = mb_strtolower(trim((string) $t['topic']));
            similar_text($target, $candidate, $percent);
            // A topic that contains the old name (or the other way round) is almost certainly it
            if ($target !== '' && (str_contains($candidate, $target) || str_contains($target, $candidate))) {
                $percent = max($percent, 90);
            }
            $scored[] = ['id' => (int) $t['id'], 'topic' => $t['topic'], 'term_name' => $t['term_name'], 'match' => (int) round($percent)];
        }
        usort($scored, fn($a, $b) => $b['match'] <=> $a['match']);
        return array_slice(array_values(array_filter($scored, fn($s) => $s['match'] >= 35)), 0, 3);
    }

    /** The teacher's published LOA / AOI / EOC assessments not linked to the curriculum at all */
    private function unlinked($db, int $teacherId): array
    {
        $construct = $this->columnExists($db, 'assignments', 'construct_id') ? " AND a.construct_id IS NULL" : '';
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.assessment_category, s.name AS subject_name
             FROM assignments a LEFT JOIN subjects s ON s.id = a.subject_id
             WHERE a.teacher_id = ? AND a.deleted_at IS NULL AND a.status = 'published'
               AND a.assessment_category IN ('LOA', 'AOI', 'EOC')
               AND NOT EXISTS (SELECT 1 FROM assignment_learning_outcomes x WHERE x.assignment_id = a.id)
               AND NOT EXISTS (SELECT 1 FROM assignment_curriculum_topics x WHERE x.assignment_id = a.id)
               AND NOT EXISTS (SELECT 1 FROM assignment_questions x WHERE x.assignment_id = a.id AND x.curriculum_topic_id IS NOT NULL)
               {$construct}
             ORDER BY a.created_at DESC LIMIT 50"
        );
        $stmt->execute([$teacherId]);
        return array_map(fn($r) => ['id' => (int) $r['id'], 'title' => $r['title'], 'category' => $r['assessment_category'], 'subject_name' => $r['subject_name']], $stmt->fetchAll());
    }

    /**
     * Move one of the teacher's assessments from a deleted curriculum topic to a current one:
     * its topic links and question tags move over; its learning outcome links move to the new
     * topic's outcomes with the same wording (any without a match are dropped - the teacher picks
     * them again in the assessment).
     * POST /teacher/coverage/relink  { assignment_id, from_topic_id, to_topic_id }
     */
    public function relink(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->teacherId();
        $db = $this->getDb();
        $assignmentId = (int) $this->input('assignment_id', 0);
        $from = (int) $this->input('from_topic_id', 0);
        $to = (int) $this->input('to_topic_id', 0);

        $stmt = $db->prepare("SELECT id FROM assignments WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL");
        $stmt->execute([$assignmentId, $teacherId]);
        if (!$stmt->fetch()) {
            $this->notFound('Assessment not found');
            return;
        }
        $stmt = $db->prepare("SELECT id, subject_id FROM enote_curriculum_topics WHERE id = ?");
        $stmt->execute([$from]);
        $old = $stmt->fetch();
        $stmt = $db->prepare("SELECT id, subject_id FROM enote_curriculum_topics WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$to]);
        $new = $stmt->fetch();
        if (!$old || !$new || (int) $old['subject_id'] !== (int) $new['subject_id']) {
            $this->validationError(['to_topic_id' => 'Choose a current topic in the same subject']);
            return;
        }

        try {
            $db->beginTransaction();
            // Topic links (skip if the assessment is already linked to the new topic)
            $db->prepare(
                "UPDATE assignment_curriculum_topics SET curriculum_topic_id = ?
                 WHERE assignment_id = ? AND curriculum_topic_id = ?
                   AND NOT EXISTS (SELECT 1 FROM (SELECT assignment_id FROM assignment_curriculum_topics WHERE assignment_id = ? AND curriculum_topic_id = ?) x)"
            )->execute([$to, $assignmentId, $from, $assignmentId, $to]);
            $db->prepare("DELETE FROM assignment_curriculum_topics WHERE assignment_id = ? AND curriculum_topic_id = ?")->execute([$assignmentId, $from]);

            // Question tags
            $db->prepare("UPDATE assignment_questions SET curriculum_topic_id = ? WHERE assignment_id = ? AND curriculum_topic_id = ?")
               ->execute([$to, $assignmentId, $from]);

            // Outcome links: to the new topic's outcome with the same wording
            $stmt = $db->prepare(
                "SELECT alo.id, lo.learning_outcome FROM assignment_learning_outcomes alo
                 INNER JOIN enote_learning_outcomes lo ON lo.id = alo.learning_outcome_id
                 WHERE alo.assignment_id = ? AND alo.curriculum_topic_id = ?"
            );
            $stmt->execute([$assignmentId, $from]);
            $moved = 0;
            $dropped = 0;
            $find = $db->prepare("SELECT id FROM enote_learning_outcomes WHERE curriculum_topic_id = ? AND LOWER(TRIM(learning_outcome)) = LOWER(TRIM(?)) LIMIT 1");
            foreach ($stmt->fetchAll() as $link) {
                $find->execute([$to, $link['learning_outcome']]);
                $match = $find->fetchColumn();
                if ($match) {
                    $db->prepare("UPDATE assignment_learning_outcomes SET curriculum_topic_id = ?, learning_outcome_id = ? WHERE id = ?")
                       ->execute([$to, (int) $match, (int) $link['id']]);
                    $moved++;
                } else {
                    $db->prepare("DELETE FROM assignment_learning_outcomes WHERE id = ?")->execute([(int) $link['id']]);
                    $dropped++;
                }
            }
            $db->commit();
        } catch (\Throwable $e) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
            error_log('Coverage relink failed: ' . $e->getMessage());
            $this->error('Could not re-link the assessment', 500);
            return;
        }

        $this->success(
            ['outcomes_moved' => $moved, 'outcomes_to_pick' => $dropped],
            $dropped ? "Re-linked - pick {$dropped} learning outcome(s) again in the assessment" : 'Re-linked to the current topic'
        );
    }
}
