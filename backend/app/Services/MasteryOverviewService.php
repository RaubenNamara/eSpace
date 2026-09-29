<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Curriculum mastery at a glance, per subject, for HOD and admin dashboards - the same three
 * layers as the student's Learning Map (Student\MasteryController):
 *  - learning outcomes, assessed by Learning Outcome Assessments (assignment_learning_outcomes)
 *  - topic competencies, assessed by Activities of Integration (assignment_curriculum_topics, or
 *    the curriculum topic of the eNote an AOI was set at the end of)
 *  - Elements of Construct, assessed by End of Chapter (assignments.construct_id, or EOC questions
 *    tagged with a construct's topics)
 * For each: coverage (how much of this year's curriculum has an assessment linked) and results
 * (of the returned results, the share at Satisfactory or above - 60%, as on the report card).
 * A topic or outcome is counted once per class level (S.1, S.2...), however many streams it's set
 * for.
 */
class MasteryOverviewService
{
    private const ACHIEVED_FROM = 60;

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private static function in(array $values): string
    {
        return implode(',', array_fill(0, count($values), '?'));
    }

    /** @param int[]|null $departmentIds null = every department */
    public function forDepartments(?array $departmentIds): array
    {
        $db = $this->getDb();
        $year = $db->query("SELECT id, name FROM academic_years WHERE is_current = 1 ORDER BY id DESC LIMIT 1")->fetch();
        if (!$year) {
            return ['year' => null, 'subjects' => [], 'totals' => $this->emptyLayers()];
        }
        $yearId = (int) $year['id'];

        $sql = "SELECT s.id, s.name, s.code, d.name AS department_name
                FROM subjects s LEFT JOIN departments d ON d.id = s.department_id
                WHERE s.deleted_at IS NULL";
        $params = [];
        if ($departmentIds !== null) {
            if (!$departmentIds) {
                return ['year' => $year['name'], 'subjects' => [], 'totals' => $this->emptyLayers()];
            }
            $sql .= " AND s.department_id IN (" . self::in($departmentIds) . ")";
            $params = $departmentIds;
        }
        $stmt = $db->prepare($sql . " ORDER BY d.name, s.name");
        $stmt->execute($params);
        $subjects = $stmt->fetchAll();
        $subjectIds = array_map(fn($s) => (int) $s['id'], $subjects);
        if (!$subjectIds) {
            return ['year' => $year['name'], 'subjects' => [], 'totals' => $this->emptyLayers()];
        }

        $layers = [];
        foreach ($subjectIds as $id) {
            $layers[$id] = $this->emptyLayers();
        }
        $sub = self::in($subjectIds);

        // ---- Learning outcomes ----------------------------------------------------------------
        $stmt = $db->prepare(
            "SELECT ct.subject_id,
                    COUNT(DISTINCT CONCAT(c.name, '|', ct.topic, '|', lo.learning_outcome)) AS total,
                    COUNT(DISTINCT CASE WHEN EXISTS (
                        SELECT 1 FROM assignment_learning_outcomes alo
                        INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
                        WHERE alo.learning_outcome_id = lo.id
                    ) THEN CONCAT(c.name, '|', ct.topic, '|', lo.learning_outcome) END) AS covered
             FROM enote_learning_outcomes lo
             INNER JOIN enote_curriculum_topics ct ON ct.id = lo.curriculum_topic_id AND ct.deleted_at IS NULL AND ct.academic_year_id = ?
             LEFT JOIN classes c ON c.id = ct.class_id
             WHERE ct.subject_id IN ($sub)
             GROUP BY ct.subject_id"
        );
        $stmt->execute(array_merge([$yearId], $subjectIds));
        foreach ($stmt->fetchAll() as $r) {
            $layers[(int) $r['subject_id']]['outcomes']['total'] = (int) $r['total'];
            $layers[(int) $r['subject_id']]['outcomes']['covered'] = (int) $r['covered'];
        }
        $stmt = $db->prepare(
            "SELECT ct.subject_id, COUNT(*) AS results, SUM(sb.percentage >= " . self::ACHIEVED_FROM . ") AS achieved
             FROM assignment_learning_outcomes alo
             INNER JOIN enote_learning_outcomes lo ON lo.id = alo.learning_outcome_id
             INNER JOIN enote_curriculum_topics ct ON ct.id = lo.curriculum_topic_id AND ct.deleted_at IS NULL AND ct.academic_year_id = ?
             INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
             INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL
                    AND sb.status = 'returned' AND sb.percentage IS NOT NULL
             WHERE ct.subject_id IN ($sub)
             GROUP BY ct.subject_id"
        );
        $stmt->execute(array_merge([$yearId], $subjectIds));
        foreach ($stmt->fetchAll() as $r) {
            $layers[(int) $r['subject_id']]['outcomes']['results'] = (int) $r['results'];
            $layers[(int) $r['subject_id']]['outcomes']['achieved'] = (int) $r['achieved'];
        }

        // ---- Topic competencies (AOI) ---------------------------------------------------------
        // AOI links: direct curriculum links, plus AOIs set at the end of a linked eNote
        $aoiLinks = "SELECT act.assignment_id, act.curriculum_topic_id FROM assignment_curriculum_topics act";
        if ($this->hasColumn($db, 'enote_topics', 'curriculum_topic_id')) {
            $aoiLinks .= " UNION SELECT a2.id, et.curriculum_topic_id FROM assignments a2
                           INNER JOIN enote_topics et ON et.id = a2.enote_topic_id
                           WHERE a2.assessment_category = 'AOI' AND et.curriculum_topic_id IS NOT NULL"
                . ($this->hasColumn($db, 'assignments', 'enote_page_id') ? " AND a2.enote_page_id IS NULL" : '');
        }
        $stmt = $db->prepare(
            "SELECT ct.subject_id,
                    COUNT(DISTINCT CONCAT(c.name, '|', ct.topic)) AS total,
                    COUNT(DISTINCT CASE WHEN aoi.id IS NOT NULL THEN CONCAT(c.name, '|', ct.topic) END) AS covered
             FROM enote_curriculum_topics ct
             LEFT JOIN classes c ON c.id = ct.class_id
             LEFT JOIN ($aoiLinks) links ON links.curriculum_topic_id = ct.id
             LEFT JOIN assignments aoi ON aoi.id = links.assignment_id AND aoi.assessment_category = 'AOI'
                    AND aoi.deleted_at IS NULL AND aoi.status = 'published'
             WHERE ct.deleted_at IS NULL AND ct.academic_year_id = ? AND ct.subject_id IN ($sub)
             GROUP BY ct.subject_id"
        );
        $stmt->execute(array_merge([$yearId], $subjectIds));
        foreach ($stmt->fetchAll() as $r) {
            $layers[(int) $r['subject_id']]['competencies']['total'] = (int) $r['total'];
            $layers[(int) $r['subject_id']]['competencies']['covered'] = (int) $r['covered'];
        }
        $stmt = $db->prepare(
            "SELECT t.subject_id, COUNT(*) AS results, SUM(sb.percentage >= " . self::ACHIEVED_FROM . ") AS achieved
             FROM (SELECT DISTINCT links.assignment_id, ct.subject_id
                   FROM ($aoiLinks) links
                   INNER JOIN enote_curriculum_topics ct ON ct.id = links.curriculum_topic_id AND ct.deleted_at IS NULL AND ct.academic_year_id = ?
                   WHERE ct.subject_id IN ($sub)) t
             INNER JOIN assignments a ON a.id = t.assignment_id AND a.assessment_category = 'AOI' AND a.deleted_at IS NULL AND a.status = 'published'
             INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL
                    AND sb.status = 'returned' AND sb.percentage IS NOT NULL
             GROUP BY t.subject_id"
        );
        $stmt->execute(array_merge([$yearId], $subjectIds));
        foreach ($stmt->fetchAll() as $r) {
            $layers[(int) $r['subject_id']]['competencies']['results'] = (int) $r['results'];
            $layers[(int) $r['subject_id']]['competencies']['achieved'] = (int) $r['achieved'];
        }

        // ---- Elements of Construct (EOC) -----------------------------------------------------
        if ($this->hasTable($db, 'constructs')) {
            $eocFor = "SELECT a.id AS assignment_id, a.construct_id FROM assignments a
                       WHERE a.assessment_category = 'EOC' AND a.construct_id IS NOT NULL
                         AND a.deleted_at IS NULL AND a.status = 'published'
                       UNION
                       SELECT DISTINCT q.assignment_id, ctp.construct_id FROM assignment_questions q
                       INNER JOIN construct_topics ctp ON ctp.curriculum_topic_id = q.curriculum_topic_id
                       INNER JOIN assignments a ON a.id = q.assignment_id AND a.assessment_category = 'EOC'
                            AND a.deleted_at IS NULL AND a.status = 'published'";
            $stmt = $db->prepare(
                "SELECT cn.subject_id, COUNT(DISTINCT cn.id) AS total, COUNT(DISTINCT e.construct_id) AS covered
                 FROM constructs cn
                 LEFT JOIN ($eocFor) e ON e.construct_id = cn.id
                 WHERE cn.deleted_at IS NULL AND cn.subject_id IN ($sub)
                 GROUP BY cn.subject_id"
            );
            $stmt->execute($subjectIds);
            foreach ($stmt->fetchAll() as $r) {
                $layers[(int) $r['subject_id']]['constructs']['total'] = (int) $r['total'];
                $layers[(int) $r['subject_id']]['constructs']['covered'] = (int) $r['covered'];
            }
            $stmt = $db->prepare(
                "SELECT cn.subject_id, COUNT(*) AS results, SUM(sb.percentage >= " . self::ACHIEVED_FROM . ") AS achieved
                 FROM (SELECT DISTINCT assignment_id, construct_id FROM ($eocFor) x) e
                 INNER JOIN constructs cn ON cn.id = e.construct_id AND cn.deleted_at IS NULL AND cn.subject_id IN ($sub)
                 INNER JOIN assignment_submissions sb ON sb.assignment_id = e.assignment_id AND sb.deleted_at IS NULL
                        AND sb.status = 'returned' AND sb.percentage IS NOT NULL
                 GROUP BY cn.subject_id"
            );
            $stmt->execute($subjectIds);
            foreach ($stmt->fetchAll() as $r) {
                $layers[(int) $r['subject_id']]['constructs']['results'] = (int) $r['results'];
                $layers[(int) $r['subject_id']]['constructs']['achieved'] = (int) $r['achieved'];
            }
        }

        $totals = $this->emptyLayers();
        $out = [];
        foreach ($subjects as $s) {
            $l = $layers[(int) $s['id']];
            if (!$l['outcomes']['total'] && !$l['competencies']['total'] && !$l['constructs']['total']) {
                continue; // nothing in the curriculum for it this year
            }
            foreach ($l as $key => $layer) {
                foreach (['total', 'covered', 'results', 'achieved'] as $f) {
                    $totals[$key][$f] += $layer[$f];
                }
            }
            $out[] = [
                'id' => (int) $s['id'],
                'name' => $s['name'],
                'code' => $s['code'],
                'department_name' => $s['department_name'],
            ] + $this->withRates($l);
        }

        return ['year' => $year['name'], 'subjects' => $out, 'totals' => $this->withRates($totals)];
    }

    private function emptyLayers(): array
    {
        $layer = ['total' => 0, 'covered' => 0, 'results' => 0, 'achieved' => 0];
        return ['outcomes' => $layer, 'competencies' => $layer, 'constructs' => $layer];
    }

    private function withRates(array $layers): array
    {
        foreach ($layers as &$l) {
            $l['coverage'] = $l['total'] > 0 ? (int) round($l['covered'] / $l['total'] * 100) : 0;
            $l['rate'] = $l['results'] > 0 ? (int) round($l['achieved'] / $l['results'] * 100) : null;
        }
        return $layers;
    }

    private function hasTable($db, string $table): bool
    {
        try {
            return (bool) $db->query("SHOW TABLES LIKE " . $db->quote($table))->fetch();
        } catch (\Throwable $e) {
            return false;
        }
    }

    private function hasColumn($db, string $table, string $column): bool
    {
        try {
            return (bool) $db->query("SHOW COLUMNS FROM `{$table}` LIKE " . $db->quote($column))->fetch();
        } catch (\Throwable $e) {
            return false;
        }
    }
}
