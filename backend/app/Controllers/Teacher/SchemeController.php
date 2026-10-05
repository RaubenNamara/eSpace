<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Scheme of work: for a subject and class level, the week the teacher plans to teach each of this
 * year's curriculum topics (the same topics as Coverage) and a tick when it's taught. Each topic
 * shows what already covers it - eNotes, assessed outcomes, an AOI - and where it stands:
 * taught, this week, behind (its week has passed), coming up, or not planned. "Auto-plan" spreads
 * the unplanned topics of each term over that term's remaining weeks.
 *
 * GET  /teacher/scheme?subject_id=&class_level=
 * PUT  /teacher/scheme/{topicId}        { subject_id, class_level, week_start?: 'YYYY-MM-DD'|null, taught?: bool }
 * POST /teacher/scheme/auto-plan        { subject_id, class_level }
 */
class SchemeController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function teacherId(): int
    {
        return ($_SESSION['role'] ?? null) === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
    }

    private static function monday(string $date): string
    {
        $d = new \DateTime($date);
        $d->modify('-' . (((int) $d->format('N')) - 1) . ' days');
        return $d->format('Y-m-d');
    }

    /** Subjects in the teacher's departments, and the chosen subject's topics by class level */
    private function context($db, int $subjectId): array
    {
        $coverage = new CoverageController();
        $departments = $coverage->departmentIds($db, $this->teacherId());
        if (!$departments) {
            return [[], 0, []];
        }
        $stmt = $db->prepare("SELECT id, name, code FROM subjects WHERE department_id IN (" . implode(',', array_fill(0, count($departments), '?')) . ") AND deleted_at IS NULL ORDER BY name");
        $stmt->execute($departments);
        $subjects = $stmt->fetchAll();
        $ids = array_map(fn($s) => (int) $s['id'], $subjects);
        if (!in_array($subjectId, $ids, true)) {
            $subjectId = $ids[0] ?? 0;
        }
        return [$subjects, $subjectId, $subjectId ? $coverage->topicsFor($db, $subjectId) : []];
    }

    public function index(): void
    {
        $db = $this->getDb();
        [$subjects, $subjectId, $levels] = $this->context($db, (int) $this->query('subject_id', 0));
        $levelNames = array_column($levels, 'class_name');
        $level = (string) $this->query('class_level', '');
        if (!in_array($level, $levelNames, true)) {
            $level = $levelNames[0] ?? '';
        }
        $topics = [];
        foreach ($levels as $l) {
            if ($l['class_name'] === $level) {
                $topics = $l['topics'];
            }
        }

        $plan = [];
        if ($topics) {
            $stmt = $db->prepare("SELECT curriculum_topic_id, week_start, taught_at FROM scheme_entries WHERE teacher_id = ? AND subject_id = ? AND class_level = ?");
            $stmt->execute([$this->teacherId(), $subjectId, $level]);
            foreach ($stmt->fetchAll() as $p) {
                $plan[(int) $p['curriculum_topic_id']] = $p;
            }
        }
        $thisWeek = self::monday('today');
        $out = [];
        $summary = ['topics' => count($topics), 'planned' => 0, 'taught' => 0, 'behind' => 0, 'this_week' => 0];
        foreach ($topics as $t) {
            $p = $plan[$t['id']] ?? null;
            $week = $p['week_start'] ?? null;
            $taught = $p['taught_at'] ?? null;
            $status = $taught ? 'taught' : (!$week ? 'unplanned' : ($week === $thisWeek ? 'this_week' : ($week < $thisWeek ? 'behind' : 'upcoming')));
            $summary['planned'] += $week ? 1 : 0;
            $summary['taught'] += $taught ? 1 : 0;
            $summary['behind'] += $status === 'behind' ? 1 : 0;
            $summary['this_week'] += $status === 'this_week' ? 1 : 0;
            $out[] = [
                'id' => $t['id'],
                'topic' => $t['topic'],
                'theme' => $t['theme'],
                'term_id' => $t['term_id'],
                'term_name' => $t['term_name'],
                'week_start' => $week,
                'taught_at' => $taught,
                'status' => $status,
                'evidence' => [
                    'enotes' => count(array_filter($t['enotes'], fn($e) => ($e['status'] ?? '') === 'published')),
                    'outcomes' => $t['outcomes'],
                    'outcomes_covered' => $t['outcomes_covered'],
                    'aoi' => count($t['aoi']),
                ],
            ];
        }

        $terms = $db->query(
            "SELECT t.id, t.name, t.start_date, t.end_date FROM terms t INNER JOIN academic_years ay ON ay.id = t.academic_year_id AND ay.is_current = 1
             WHERE t.deleted_at IS NULL ORDER BY t.start_date"
        )->fetchAll();

        $this->success([
            'subjects' => $subjects,
            'subject_id' => $subjectId ?: null,
            'levels' => $levelNames,
            'class_level' => $level ?: null,
            'this_week' => $thisWeek,
            'terms' => $terms,
            'topics' => $out,
            'summary' => $summary,
        ]);
    }

    /** The topic ids of a subject + class level the teacher may plan */
    private function topicIds($db, int $subjectId, string $level): array
    {
        [, $sid, $levels] = $this->context($db, $subjectId);
        if ($sid !== $subjectId) {
            return [];
        }
        foreach ($levels as $l) {
            if ($l['class_name'] === $level) {
                return $l['topics'];
            }
        }
        return [];
    }

    public function update(): void
    {
        $db = $this->getDb();
        $subjectId = (int) $this->input('subject_id', 0);
        $level = (string) $this->input('class_level', '');
        $topicId = (int) $this->routeParam('topicId');
        $topics = $this->topicIds($db, $subjectId, $level);
        if (!in_array($topicId, array_column($topics, 'id'), true)) {
            $this->notFound('Topic not found');
            return;
        }
        $db->prepare("INSERT IGNORE INTO scheme_entries (teacher_id, subject_id, class_level, curriculum_topic_id) VALUES (?, ?, ?, ?)")
            ->execute([$this->teacherId(), $subjectId, $level, $topicId]);
        $where = "teacher_id = ? AND subject_id = ? AND class_level = ? AND curriculum_topic_id = ?";
        $key = [$this->teacherId(), $subjectId, $level, $topicId];
        if (array_key_exists('week_start', $this->requestData ?? [])) {
            $week = (string) $this->input('week_start', '');
            $week = preg_match('/^\d{4}-\d{2}-\d{2}$/', $week) ? self::monday($week) : null;
            $db->prepare("UPDATE scheme_entries SET week_start = ? WHERE $where")->execute(array_merge([$week], $key));
        }
        if (array_key_exists('taught', $this->requestData ?? [])) {
            $db->prepare("UPDATE scheme_entries SET taught_at = " . ($this->input('taught') ? 'COALESCE(taught_at, NOW())' : 'NULL') . " WHERE $where")->execute($key);
        }
        $this->success([], 'Saved');
    }

    public function autoPlan(): void
    {
        $db = $this->getDb();
        $subjectId = (int) $this->input('subject_id', 0);
        $level = (string) $this->input('class_level', '');
        $topics = $this->topicIds($db, $subjectId, $level);
        if (!$topics) {
            $this->notFound('Nothing to plan');
            return;
        }
        $stmt = $db->prepare("SELECT curriculum_topic_id FROM scheme_entries WHERE teacher_id = ? AND subject_id = ? AND class_level = ? AND (week_start IS NOT NULL OR taught_at IS NOT NULL)");
        $stmt->execute([$this->teacherId(), $subjectId, $level]);
        $done = array_flip(array_map('intval', array_column($stmt->fetchAll(), 'curriculum_topic_id')));
        $terms = [];
        foreach ($db->query("SELECT t.id, t.start_date, t.end_date FROM terms t INNER JOIN academic_years ay ON ay.id = t.academic_year_id AND ay.is_current = 1 WHERE t.deleted_at IS NULL")->fetchAll() as $t) {
            $terms[(int) $t['id']] = $t;
        }

        // Unplanned topics, by term, in curriculum order
        $byTerm = [];
        foreach ($topics as $t) {
            if (!isset($done[$t['id']]) && $t['term_id'] && isset($terms[$t['term_id']])) {
                $byTerm[$t['term_id']][] = $t['id'];
            }
        }
        $thisWeek = self::monday('today');
        $planned = 0;
        $skipped = 0;
        foreach ($byTerm as $termId => $ids) {
            $first = max(self::monday($terms[$termId]['start_date']), $thisWeek);
            $last = self::monday($terms[$termId]['end_date']);
            if ($first > $last) {
                $skipped += count($ids); // the term is over
                continue;
            }
            $weeks = (int) floor((strtotime($last) - strtotime($first)) / (7 * 86400)) + 1;
            foreach ($ids as $i => $topicId) {
                // Spread evenly: topic i of n goes in week floor(i * weeks / n)
                $offset = (int) floor($i * $weeks / count($ids));
                $week = date('Y-m-d', strtotime($first . " +{$offset} week"));
                $db->prepare(
                    "INSERT INTO scheme_entries (teacher_id, subject_id, class_level, curriculum_topic_id, week_start) VALUES (?, ?, ?, ?, ?)
                     ON DUPLICATE KEY UPDATE week_start = VALUES(week_start)"
                )->execute([$this->teacherId(), $subjectId, $level, $topicId, $week]);
                $planned++;
            }
        }
        $this->success(['planned' => $planned, 'skipped' => $skipped], $planned ? "$planned topics planned" : 'Nothing left to plan in the terms ahead');
    }
}
