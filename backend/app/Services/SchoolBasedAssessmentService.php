<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * UNEB school-based (continuous) assessment for one subject and one class level: for every learner
 * enrolled now, every Activity of Integration they were set in that subject in any year - online
 * (assignments tagged AOI) or on paper (physical assessments tagged AOI) - with the score they got,
 * whether it still waits to be marked, whether it was missed, and the evidence kept for it.
 *
 * The continuous-assessment score is the mean of the learner's AOI percentages scaled to the
 * school's "out of" (school_settings.sba_out_of, 20 by default). Project work is reported beside
 * it, unscaled. Both are working figures for the school to check against UNEB's own guidance before
 * submission - the rule and the scale are settings, not fixed here.
 */
class SchoolBasedAssessmentService
{
    private \PDO $db;

    public function __construct(?\PDO $db = null)
    {
        $this->db = $db ?? \eSpace\Config\Database::getInstance();
    }

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    /** @return array{uneb_centre_number: ?string, sba_out_of: float, sba_deadline: ?string, school_name: string} */
    public function settings(): array
    {
        $row = $this->db->query('SELECT * FROM school_settings WHERE id = 1')->fetch(\PDO::FETCH_ASSOC) ?: [];
        return [
            'school_name' => (string) ($row['school_name'] ?? ''),
            'uneb_centre_number' => $row['uneb_centre_number'] ?? null,
            'sba_out_of' => (float) ($row['sba_out_of'] ?? 20) ?: 20.0,
            'sba_deadline' => $row['sba_deadline'] ?? null,
        ];
    }

    /**
     * @param ?int $classId one stream of the level, or null for every stream
     * @return array{subject: array, level: string, settings: array, items: array, learners: array, summary: array}
     */
    public function forSubject(int $subjectId, string $level, ?int $classId = null): array
    {
        $settings = $this->settings();
        $stmt = $this->db->prepare('SELECT id, name, code, department_id FROM subjects WHERE id = ?');
        $stmt->execute([$subjectId]);
        $subject = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$subject) {
            throw new \InvalidArgumentException('Subject not found');
        }
        $departmentId = (int) $subject['department_id'];

        // ---- The learners: enrolled now in the department, in a stream of this level ----------
        $sql = "SELECT DISTINCT st.id, st.first_name, st.last_name, st.admission_number, st.lin, st.uneb_index_number, st.gender,
                       c.id AS class_id, c.name AS class_name, c.stream_name
                FROM student_department_enrollments sde
                INNER JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL
                INNER JOIN classes c ON c.id = sde.class_id
                WHERE sde.department_id = ? AND sde.status = 'active' AND sde.deleted_at IS NULL AND c.name = ?";
        $params = [$departmentId, $level];
        if ($classId) {
            $sql .= ' AND c.id = ?';
            $params[] = $classId;
        }
        $stmt = $this->db->prepare($sql . ' ORDER BY c.stream_name, st.last_name, st.first_name');
        $stmt->execute($params);
        $learners = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $learners[(int) $r['id']] ??= $r;
        }
        if (!$learners) {
            return ['subject' => $subject, 'level' => $level, 'settings' => $settings, 'items' => [], 'learners' => [], 'summary' => $this->summarise([], [])];
        }
        $ids = array_keys($learners);

        // Every stream each learner has been enrolled in for this department, any year
        $stmt = $this->db->prepare(
            "SELECT sde.student_id, sde.class_id, c.name, c.academic_year_id
             FROM student_department_enrollments sde INNER JOIN classes c ON c.id = sde.class_id
             WHERE sde.department_id = ? AND sde.deleted_at IS NULL AND sde.student_id IN (" . self::in($ids) . ")"
        );
        $stmt->execute([$departmentId, ...$ids]);
        $history = [];
        $allClassIds = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $history[(int) $r['student_id']][] = ['class_id' => (int) $r['class_id'], 'name' => $r['name'], 'year' => $r['academic_year_id'] !== null ? (int) $r['academic_year_id'] : null];
            $allClassIds[(int) $r['class_id']] = true;
        }

        // ---- The AOIs and projects set in this subject ---------------------------------------
        $items = [];
        $stmt = $this->db->prepare(
            "SELECT a.id, a.title, a.assessment_category, a.class_id, a.class_group_name, a.academic_year_id,
                    COALESCE(a.deadline_at, a.due_date) AS due_at, a.created_at,
                    (SELECT GROUP_CONCAT(ac.class_id) FROM assignment_classes ac WHERE ac.assignment_id = a.id) AS stream_ids
             FROM assignments a
             WHERE a.subject_id = ? AND a.deleted_at IS NULL AND a.status = 'published' AND a.assessment_category = 'AOI'
             ORDER BY COALESCE(a.deadline_at, a.due_date, a.created_at)"
        );
        $stmt->execute([$subjectId]);
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $a) {
            $streams = array_filter(array_map('intval', explode(',', (string) $a['stream_ids'])));
            if ($a['class_id']) {
                $streams[] = (int) $a['class_id'];
            }
            $items['a' . $a['id']] = [
                'key' => 'a' . $a['id'], 'source' => 'online', 'id' => (int) $a['id'], 'kind' => 'AOI', 'title' => $a['title'],
                'date' => $a['due_at'] ?: $a['created_at'], 'streams' => array_values(array_unique($streams)),
                'group' => $a['class_group_name'], 'year' => $a['academic_year_id'] !== null ? (int) $a['academic_year_id'] : null,
                'max_score' => null,
            ];
        }
        $stmt = $this->db->prepare(
            "SELECT pa.id, pa.title, pa.assessment_category, pa.class_id, pa.exam_date, pa.max_score
             FROM physical_assessments pa
             WHERE pa.subject_id = ? AND pa.deleted_at IS NULL AND pa.assessment_category IN ('AOI', 'PROJECT')
             ORDER BY pa.exam_date"
        );
        $stmt->execute([$subjectId]);
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $p) {
            $items['p' . $p['id']] = [
                'key' => 'p' . $p['id'], 'source' => 'paper', 'id' => (int) $p['id'], 'kind' => $p['assessment_category'], 'title' => $p['title'],
                'date' => $p['exam_date'], 'streams' => [(int) $p['class_id']], 'group' => null, 'year' => null,
                'max_score' => (float) $p['max_score'],
            ];
        }

        // ---- Results ---------------------------------------------------------------------------
        $online = array_values(array_filter($items, fn($i) => $i['source'] === 'online'));
        $paper = array_values(array_filter($items, fn($i) => $i['source'] === 'paper'));
        $results = []; // [student][key] => ['state' => marked|waiting, 'percent' => ?float]
        if ($online) {
            $aIds = array_column($online, 'id');
            // The best marked attempt; otherwise "waiting" if handed in
            $stmt = $this->db->prepare(
                "SELECT s.assignment_id, s.student_id, s.status, s.percentage
                 FROM assignment_submissions s
                 WHERE s.deleted_at IS NULL AND s.status <> 'in_progress'
                   AND s.assignment_id IN (" . self::in($aIds) . ") AND s.student_id IN (" . self::in($ids) . ")"
            );
            $stmt->execute([...$aIds, ...$ids]);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                $key = 'a' . $r['assignment_id'];
                $sid = (int) $r['student_id'];
                $marked = in_array($r['status'], ['graded', 'returned'], true) && $r['percentage'] !== null;
                $prev = $results[$sid][$key] ?? null;
                if ($marked) {
                    $pct = (float) $r['percentage'];
                    if (!$prev || $prev['state'] !== 'marked' || $pct > $prev['percent']) {
                        $results[$sid][$key] = ['state' => 'marked', 'percent' => $pct];
                    }
                } elseif (!$prev) {
                    $results[$sid][$key] = ['state' => 'waiting', 'percent' => null];
                }
            }
        }
        if ($paper) {
            $pIds = array_column($paper, 'id');
            $stmt = $this->db->prepare(
                "SELECT physical_assessment_id, student_id, score FROM physical_assessment_scores
                 WHERE score IS NOT NULL AND physical_assessment_id IN (" . self::in($pIds) . ") AND student_id IN (" . self::in($ids) . ")"
            );
            $stmt->execute([...$pIds, ...$ids]);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                $item = $items['p' . $r['physical_assessment_id']];
                $results[(int) $r['student_id']]['p' . $r['physical_assessment_id']] = [
                    'state' => 'marked',
                    'percent' => $item['max_score'] > 0 ? round((float) $r['score'] / $item['max_score'] * 100, 2) : 0.0,
                ];
            }
        }

        // ---- Evidence: kept by staff, and files the learner attached to an online AOI ---------
        $evidence = [];
        $stmt = $this->db->prepare(
            "SELECT id, student_id, assignment_id, physical_assessment_id, file_path, file_kind, original_name, note, created_at
             FROM sba_evidence WHERE deleted_at IS NULL AND subject_id = ? AND student_id IN (" . self::in($ids) . ") ORDER BY created_at"
        );
        $stmt->execute([$subjectId, ...$ids]);
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $e) {
            $key = $e['assignment_id'] ? 'a' . $e['assignment_id'] : ($e['physical_assessment_id'] ? 'p' . $e['physical_assessment_id'] : 'general');
            $evidence[(int) $e['student_id']][$key][] = [
                'id' => (int) $e['id'], 'url' => $e['file_path'], 'kind' => $e['file_kind'], 'name' => $e['original_name'],
                'note' => $e['note'], 'at' => $e['created_at'], 'from' => 'staff',
            ];
        }
        if ($online) {
            $aIds = array_column($online, 'id');
            try {
                $stmt = $this->db->prepare(
                    "SELECT s.assignment_id, s.student_id, f.id, f.file_path, f.file_type, f.original_name, f.created_at
                     FROM assignment_answer_attachments f
                     INNER JOIN assignment_submissions s ON s.id = f.submission_id AND s.deleted_at IS NULL
                     WHERE s.assignment_id IN (" . self::in($aIds) . ") AND s.student_id IN (" . self::in($ids) . ")"
                );
                $stmt->execute([...$aIds, ...$ids]);
                foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $f) {
                    $evidence[(int) $f['student_id']]['a' . $f['assignment_id']][] = [
                        'id' => (int) $f['id'], 'url' => $f['file_path'], 'kind' => $f['file_type'] === 'pdf' ? 'pdf' : 'image',
                        'name' => $f['original_name'], 'note' => null, 'at' => $f['created_at'] ?? null, 'from' => 'learner',
                    ];
                }
            } catch (\PDOException $e) {
                // migration 084 not run
            }
        }

        // ---- Each learner --------------------------------------------------------------------
        $now = date('Y-m-d H:i:s');
        $out = [];
        foreach ($learners as $sid => $l) {
            $mine = $history[$sid] ?? [];
            $rows = [];
            foreach ($items as $key => $item) {
                if (!$this->setFor($item, $mine)) {
                    continue;
                }
                $res = $results[$sid][$key] ?? null;
                $state = $res['state'] ?? (($item['date'] && $item['date'] < $now) ? 'missing' : 'upcoming');
                $rows[] = [
                    'key' => $key, 'kind' => $item['kind'], 'source' => $item['source'], 'id' => $item['id'],
                    'title' => $item['title'], 'date' => $item['date'], 'state' => $state,
                    'percent' => $res['percent'] ?? null,
                    'evidence' => $evidence[$sid][$key] ?? [],
                ];
            }
            $aoiMarked = array_values(array_filter($rows, fn($r) => $r['kind'] === 'AOI' && $r['state'] === 'marked'));
            $projects = array_values(array_filter($rows, fn($r) => $r['kind'] === 'PROJECT' && $r['state'] === 'marked'));
            $average = $aoiMarked ? round(array_sum(array_column($aoiMarked, 'percent')) / count($aoiMarked), 1) : null;
            $missing = count(array_filter($rows, fn($r) => $r['state'] === 'missing'));
            $waiting = count(array_filter($rows, fn($r) => $r['state'] === 'waiting'));
            $evidenceCount = array_sum(array_map(fn($r) => count($r['evidence']), $rows)) + count($evidence[$sid]['general'] ?? []);
            $issues = [];
            if (!$l['lin']) $issues[] = 'no_lin';
            $dueAois = count(array_filter($rows, fn($r) => $r['kind'] === 'AOI' && $r['state'] !== 'upcoming'));
            if (!$dueAois) $issues[] = 'none_due';
            elseif (!$aoiMarked) $issues[] = 'no_scores';
            if ($missing) $issues[] = 'missing';
            if ($waiting) $issues[] = 'waiting';
            $out[] = [
                'id' => $sid,
                'name' => trim($l['first_name'] . ' ' . $l['last_name']),
                'admission_number' => $l['admission_number'],
                'lin' => $l['lin'],
                'uneb_index_number' => $l['uneb_index_number'],
                'gender' => $l['gender'],
                'class_id' => (int) $l['class_id'],
                'stream' => $l['class_name'] . ($l['stream_name'] ? ' ' . $l['stream_name'] : ''),
                // AOIs due so far (one not yet due isn't counted against the learner)
                'aoi_set' => count(array_filter($rows, fn($r) => $r['kind'] === 'AOI' && $r['state'] !== 'upcoming')),
                'aoi_upcoming' => count(array_filter($rows, fn($r) => $r['kind'] === 'AOI' && $r['state'] === 'upcoming')),
                'aoi_marked' => count($aoiMarked),
                'missing' => $missing,
                'waiting' => $waiting,
                'average' => $average,
                'ca_score' => $average !== null ? round($average * $settings['sba_out_of'] / 100, 1) : null,
                'project' => $projects ? round(array_sum(array_column($projects, 'percent')) / count($projects), 1) : null,
                'evidence_count' => $evidenceCount,
                'ready' => !$issues,
                'issues' => $issues,
                'items' => $rows,
                'general_evidence' => $evidence[$sid]['general'] ?? [],
            ];
        }

        return [
            'subject' => ['id' => (int) $subject['id'], 'name' => $subject['name'], 'code' => $subject['code']],
            'level' => $level,
            'settings' => $settings,
            'items' => array_values(array_map(fn($i) => ['key' => $i['key'], 'kind' => $i['kind'], 'source' => $i['source'], 'title' => $i['title'], 'date' => $i['date']], $items)),
            'learners' => $out,
            'summary' => $this->summarise($out, $items),
        ];
    }

    /** Was this AOI set for a class the learner was in? */
    private function setFor(array $item, array $mine): bool
    {
        foreach ($mine as $m) {
            if (in_array($m['class_id'], $item['streams'], true)) {
                return true;
            }
            // "All streams" of a level, in that year when the AOI says which year
            if ($item['group'] && $item['group'] === $m['name'] && ($item['year'] === null || $m['year'] === null || $item['year'] === $m['year'])) {
                return true;
            }
        }
        return false;
    }

    private function summarise(array $learners, array $items): array
    {
        $n = count($learners);
        return [
            'learners' => $n,
            'ready' => count(array_filter($learners, fn($l) => $l['ready'])),
            'no_lin' => count(array_filter($learners, fn($l) => in_array('no_lin', $l['issues'], true))),
            'with_missing' => count(array_filter($learners, fn($l) => $l['missing'] > 0)),
            'missing_total' => array_sum(array_column($learners, 'missing')),
            'waiting_total' => array_sum(array_column($learners, 'waiting')),
            'no_scores' => count(array_filter($learners, fn($l) => in_array('no_scores', $l['issues'], true))),
            'aoi_items' => count(array_filter($items, fn($i) => $i['kind'] === 'AOI')),
            'project_items' => count(array_filter($items, fn($i) => $i['kind'] === 'PROJECT')),
            'with_evidence' => count(array_filter($learners, fn($l) => $l['evidence_count'] > 0)),
        ];
    }
}
