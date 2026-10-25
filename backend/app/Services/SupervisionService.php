<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * The admin's follow-up view of teaching across the school, for one term: every department and
 * every teacher in it - what they have set, what is still waiting to be marked (and for how long),
 * how many learners handed their work in, and the learners who didn't.
 *
 * An assessment's learners follow the same rule students see it by (AssignmentAccess): enrolled in
 * its class, stream group or one of its extra classes, in the subject's department, at the time it
 * was published, and not withdrawn from that teacher.
 */
class SupervisionService
{
    // A script waiting longer than this is overdue for marking
    public const MARKING_DAYS = 7;
    // Not signed in for this long counts as gone quiet
    public const QUIET_DAYS = 14;

    private function db()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /** Every term, newest first, and the one to show by default: today's, else the current one. */
    public function terms(): array
    {
        $rows = $this->db()->query(
            "SELECT t.id, t.name, t.start_date, t.end_date, t.is_current, ay.name AS year_name
             FROM terms t LEFT JOIN academic_years ay ON ay.id = t.academic_year_id
             WHERE t.deleted_at IS NULL
             ORDER BY t.start_date DESC"
        )->fetchAll();
        $today = date('Y-m-d');
        $default = null;
        foreach ($rows as $r) {
            if ($r['start_date'] <= $today && $r['end_date'] >= $today) { $default = (int) $r['id']; break; }
        }
        if ($default === null) {
            foreach ($rows as $r) {
                if ((int) $r['is_current'] === 1) { $default = (int) $r['id']; break; }
            }
        }
        if ($default === null && $rows) $default = (int) $rows[0]['id'];

        return [
            'terms' => array_map(fn ($r) => [
                'id' => (int) $r['id'],
                'name' => trim($r['name'] . ($r['year_name'] ? ' · ' . $r['year_name'] : '')),
                'start_date' => $r['start_date'],
                'end_date' => $r['end_date'],
            ], $rows),
            'default' => $default,
        ];
    }

    public function term(int $termId): ?array
    {
        $stmt = $this->db()->prepare("SELECT id, name, start_date, end_date FROM terms WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$termId]);
        return $stmt->fetch() ?: null;
    }

    /** Learners an assessment `a` (subject `s`) goes to - a correlated count, see the class note. */
    private static function expectedSql(): string
    {
        return "(SELECT COUNT(DISTINCT sde.student_id)
                 FROM student_department_enrollments sde
                 LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                 WHERE (sde.class_id = a.class_id
                        OR (a.class_group_name IS NOT NULL AND sde_c.name = a.class_group_name)
                        OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id AND ac.class_id = sde.class_id))
                   AND sde.department_id = s.department_id
                   AND sde.deleted_at IS NULL AND sde.status = 'active'
                   AND COALESCE(a.published_at, a.created_at) BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
                   AND NOT EXISTS (SELECT 1 FROM student_teacher_enrollments ste
                                   WHERE ste.student_id = sde.student_id AND ste.teacher_id = a.teacher_id
                                     AND ste.department_id = s.department_id AND ste.status = 'withdrawn'))";
    }

    /**
     * "In this term": published within the term's dates. Not the term the assessment is filed
     * under - that is for report cards, and is sometimes left on an earlier term - but when the
     * work was actually set, which is what following a teacher up is about.
     */
    private static function termSql(): string
    {
        return "(COALESCE(a.published_at, a.created_at) >= :t_start
                 AND COALESCE(a.published_at, a.created_at) < DATE_ADD(:t_end, INTERVAL 1 DAY))";
    }

    /**
     * Every published assessment in the term, with its counts.
     * @return array<int, array<string, mixed>>
     */
    public function assessments(array $term, ?int $teacherId = null): array
    {
        $sql = "SELECT a.id, a.title, a.teacher_id, a.assessment_category, s.department_id,
                       s.name AS subject_name, s.code AS subject_code,
                       a.class_group_name, c.name AS class_name, c.stream_name,
                       (SELECT COUNT(*) FROM assignment_classes ac2 WHERE ac2.assignment_id = a.id) AS extra_classes,
                       COALESCE(a.deadline_at, a.due_date) AS deadline, a.published_at,
                       " . self::expectedSql() . " AS expected,
                       COALESCE(x.handed_in, 0) AS handed_in, COALESCE(x.waiting, 0) AS waiting,
                       COALESCE(x.marked, 0) AS marked, COALESCE(x.started, 0) AS started, x.oldest_waiting
                FROM assignments a
                JOIN subjects s ON s.id = a.subject_id
                LEFT JOIN classes c ON c.id = a.class_id
                LEFT JOIN (
                    SELECT assignment_id,
                           COUNT(DISTINCT CASE WHEN status IN ('submitted','marking','graded','returned') THEN student_id END) AS handed_in,
                           COUNT(DISTINCT CASE WHEN status IN ('submitted','marking') THEN student_id END) AS waiting,
                           COUNT(DISTINCT CASE WHEN status IN ('graded','returned') THEN student_id END) AS marked,
                           COUNT(DISTINCT CASE WHEN status = 'in_progress' THEN student_id END) AS started,
                           MIN(CASE WHEN status IN ('submitted','marking') THEN submitted_at END) AS oldest_waiting
                    FROM assignment_submissions WHERE deleted_at IS NULL
                    GROUP BY assignment_id
                ) x ON x.assignment_id = a.id
                WHERE a.deleted_at IS NULL AND a.status = 'published' AND " . self::termSql();
        $params = ['t_start' => $term['start_date'], 't_end' => $term['end_date']];
        if ($teacherId !== null) {
            $sql .= " AND a.teacher_id = :teacher_id";
            $params['teacher_id'] = $teacherId;
        }
        $sql .= " ORDER BY COALESCE(a.deadline_at, a.due_date, a.published_at) DESC";
        $stmt = $this->db()->prepare($sql);
        $stmt->execute($params);

        $now = time();
        $out = [];
        foreach ($stmt->fetchAll() as $r) {
            $expected = (int) $r['expected'];
            $handedIn = (int) $r['handed_in'];
            $deadline = $r['deadline'] ? strtotime((string) $r['deadline']) : null;
            $closed = $deadline !== null && $deadline < $now;
            $oldest = $r['oldest_waiting'] ? strtotime((string) $r['oldest_waiting']) : null;
            $class = $r['class_group_name']
                ? $r['class_group_name'] . ' (all streams)'
                : trim(($r['class_name'] ?? '') . ' ' . ($r['stream_name'] ?? ''));
            if ((int) $r['extra_classes'] > 0) $class .= ' +' . (int) $r['extra_classes'];
            $out[] = [
                'id' => (int) $r['id'],
                'title' => $r['title'],
                'teacher_id' => (int) $r['teacher_id'],
                'department_id' => (int) $r['department_id'],
                'category' => $r['assessment_category'],
                'subject' => $r['subject_name'],
                'class' => $class ?: '-',
                'deadline' => $r['deadline'],
                'closed' => $closed,
                'expected' => $expected,
                'handed_in' => $handedIn,
                // Only a closed assessment's absentees are "missing" - an open one can still come in
                'missing' => $closed ? max(0, $expected - $handedIn) : 0,
                'not_yet' => $closed ? 0 : max(0, $expected - $handedIn),
                'started' => (int) $r['started'],
                'waiting' => (int) $r['waiting'],
                'marked' => (int) $r['marked'],
                'waiting_days' => $oldest ? (int) floor(($now - $oldest) / 86400) : null,
            ];
        }
        return $out;
    }

    /** Scripts handed in but not yet marked, with how long each has waited - per teacher. */
    private function overdueScripts(array $term): array
    {
        $stmt = $this->db()->prepare(
            "SELECT a.teacher_id, COUNT(*) AS n
             FROM assignment_submissions sub
             JOIN assignments a ON a.id = sub.assignment_id
             WHERE sub.deleted_at IS NULL AND sub.status IN ('submitted','marking')
               AND sub.submitted_at < DATE_SUB(NOW(), INTERVAL " . self::MARKING_DAYS . " DAY)
               AND a.deleted_at IS NULL AND a.status = 'published' AND " . self::termSql() . "
             GROUP BY a.teacher_id"
        );
        $stmt->execute(['t_start' => $term['start_date'], 't_end' => $term['end_date']]);
        $out = [];
        foreach ($stmt->fetchAll() as $r) $out[(int) $r['teacher_id']] = (int) $r['n'];
        return $out;
    }

    /** The whole school for a term: departments, and every teacher with their figures and flags. */
    public function overview(array $term): array
    {
        $db = $this->db();
        $departments = $db->query("SELECT id, name, code FROM departments WHERE deleted_at IS NULL ORDER BY name")->fetchAll();

        // Teachers and the departments they belong to
        $teachers = [];
        $rows = $db->query(
            "SELECT t.id, t.first_name, t.last_name, t.is_active, COALESCE(t.last_active_at, t.last_login_at) AS last_seen,
                    GROUP_CONCAT(DISTINCT tda.department_id) AS dept_ids
             FROM teachers t
             LEFT JOIN teacher_department_assignments tda ON tda.teacher_id = t.id AND tda.deleted_at IS NULL
             WHERE t.deleted_at IS NULL
             GROUP BY t.id"
        )->fetchAll();
        foreach ($rows as $r) {
            $teachers[(int) $r['id']] = [
                'id' => (int) $r['id'],
                'name' => trim($r['first_name'] . ' ' . $r['last_name']),
                'active' => (int) $r['is_active'] === 1,
                'last_seen' => $r['last_seen'],
                'department_ids' => $r['dept_ids'] ? array_map('intval', explode(',', (string) $r['dept_ids'])) : [],
                'set' => 0, 'expected' => 0, 'handed_in' => 0, 'missing' => 0, 'closed_expected' => 0, 'closed_handed_in' => 0,
                'waiting' => 0, 'marked' => 0, 'overdue' => 0, 'oldest_days' => null, 'enotes' => 0, 'drafts' => 0,
            ];
        }

        $assessments = $this->assessments($term);
        foreach ($assessments as $a) {
            $tid = $a['teacher_id'];
            if (!isset($teachers[$tid])) continue;
            $t = &$teachers[$tid];
            $t['set']++;
            if (!in_array($a['department_id'], $t['department_ids'], true)) $t['department_ids'][] = $a['department_id'];
            $t['expected'] += $a['expected'];
            $t['handed_in'] += $a['handed_in'];
            $t['missing'] += $a['missing'];
            if ($a['closed']) {
                $t['closed_expected'] += $a['expected'];
                $t['closed_handed_in'] += min($a['handed_in'], $a['expected']);
            }
            $t['waiting'] += $a['waiting'];
            $t['marked'] += $a['marked'];
            if ($a['waiting_days'] !== null) $t['oldest_days'] = max($t['oldest_days'] ?? 0, $a['waiting_days']);
            unset($t);
        }
        foreach ($this->overdueScripts($term) as $tid => $n) {
            if (isset($teachers[$tid])) $teachers[$tid]['overdue'] = $n;
        }

        // eNotes published and assessments still in draft, this term
        $range = ['t_start' => $term['start_date'], 't_end' => $term['end_date']];
        $stmt = $db->prepare(
            "SELECT teacher_id, COUNT(*) AS n FROM enote_topics
             WHERE deleted_at IS NULL AND status = 'published'
               AND published_at >= :t_start AND published_at < DATE_ADD(:t_end, INTERVAL 1 DAY)
             GROUP BY teacher_id"
        );
        $stmt->execute($range);
        foreach ($stmt->fetchAll() as $r) {
            if (isset($teachers[(int) $r['teacher_id']])) $teachers[(int) $r['teacher_id']]['enotes'] = (int) $r['n'];
        }
        $stmt = $db->prepare(
            "SELECT teacher_id, COUNT(*) AS n FROM assignments
             WHERE deleted_at IS NULL AND status = 'draft'
               AND created_at >= :t_start AND created_at < DATE_ADD(:t_end, INTERVAL 1 DAY)
             GROUP BY teacher_id"
        );
        $stmt->execute($range);
        foreach ($stmt->fetchAll() as $r) {
            if (isset($teachers[(int) $r['teacher_id']])) $teachers[(int) $r['teacher_id']]['drafts'] = (int) $r['n'];
        }

        // Flags, and the finished rows
        $termStarted = $term['start_date'] <= date('Y-m-d');
        $quietBefore = time() - self::QUIET_DAYS * 86400;
        $list = [];
        foreach ($teachers as $t) {
            if (!$t['active'] && $t['set'] === 0) continue;
            $handInRate = $t['closed_expected'] > 0 ? (int) round($t['closed_handed_in'] * 100 / $t['closed_expected']) : null;
            $flags = [];
            if ($termStarted && $t['set'] === 0) $flags[] = 'none_set';
            if ($t['overdue'] > 0) $flags[] = 'marking';
            if ($handInRate !== null && $t['closed_expected'] >= 10 && $handInRate < 50) $flags[] = 'low_hand_in';
            if (!$t['last_seen'] || strtotime((string) $t['last_seen']) < $quietBefore) $flags[] = 'quiet';
            $list[] = [
                'id' => $t['id'],
                'name' => $t['name'],
                'department_ids' => $t['department_ids'],
                'last_seen' => $t['last_seen'],
                'set' => $t['set'],
                'drafts' => $t['drafts'],
                'expected' => $t['expected'],
                'handed_in' => $t['handed_in'],
                'missing' => $t['missing'],
                'hand_in_rate' => $handInRate,
                'waiting' => $t['waiting'],
                'overdue' => $t['overdue'],
                'oldest_days' => $t['oldest_days'],
                'marked' => $t['marked'],
                'marked_rate' => ($t['marked'] + $t['waiting']) > 0 ? (int) round($t['marked'] * 100 / ($t['marked'] + $t['waiting'])) : null,
                'enotes' => $t['enotes'],
                'flags' => $flags,
            ];
        }
        usort($list, fn ($a, $b) => [count($b['flags']), $b['overdue'], $a['name']] <=> [count($a['flags']), $a['overdue'], $b['name']]);

        // Department totals: work counted from the assessments themselves (a teacher in two
        // departments would otherwise count twice), people from the teacher rows
        $totals = $this->departmentTotals($assessments);
        $deptOut = [];
        foreach ($departments as $d) {
            $id = (int) $d['id'];
            $mine = array_values(array_filter($list, fn ($t) => in_array($id, $t['department_ids'], true)));
            $w = $totals[$id] ?? ['set' => 0, 'waiting' => 0, 'missing' => 0, 'closed_expected' => 0, 'closed_handed_in' => 0, 'oldest_days' => null];
            $deptOut[] = [
                'id' => $id,
                'name' => $d['name'],
                'code' => $d['code'],
                'teachers' => count($mine),
                'follow_up' => count(array_filter($mine, fn ($t) => $t['flags'] !== [])),
                'none_set' => count(array_filter($mine, fn ($t) => in_array('none_set', $t['flags'], true))),
                'overdue' => array_sum(array_map(fn ($t) => $t['overdue'], $mine)),
                'set' => $w['set'],
                'waiting' => $w['waiting'],
                'missing' => $w['missing'],
                'oldest_days' => $w['oldest_days'],
                'hand_in_rate' => $w['closed_expected'] > 0 ? (int) round($w['closed_handed_in'] * 100 / $w['closed_expected']) : null,
            ];
        }

        return ['departments' => $deptOut, 'teachers' => $list];
    }

    /** Each department's assessments added up. */
    private function departmentTotals(array $assessments): array
    {
        $out = [];
        foreach ($assessments as $a) {
            $d = $a['department_id'];
            $out[$d] ??= ['set' => 0, 'waiting' => 0, 'missing' => 0, 'closed_expected' => 0, 'closed_handed_in' => 0, 'oldest_days' => null];
            $out[$d]['set']++;
            $out[$d]['waiting'] += $a['waiting'];
            $out[$d]['missing'] += $a['missing'];
            if ($a['closed']) {
                $out[$d]['closed_expected'] += $a['expected'];
                $out[$d]['closed_handed_in'] += min($a['handed_in'], $a['expected']);
            }
            if ($a['waiting_days'] !== null) $out[$d]['oldest_days'] = max($out[$d]['oldest_days'] ?? 0, $a['waiting_days']);
        }
        return $out;
    }

    /**
     * Every class stream with learners in a department, and what reached it this term: assessments
     * set for it and eNotes published to it. A class with learners and neither is "not active".
     * Its teacher is the one assigned to teach it (class_subjects) where there is one, else
     * whoever last set it work in that department.
     * @return array<int, array<string, mixed>>
     */
    public function classActivity(array $term): array
    {
        $db = $this->db();
        $range = ['t_start' => $term['start_date'], 't_end' => $term['end_date']];

        // class streams with learners enrolled in a department during the term
        $stmt = $db->prepare(
            "SELECT sde.class_id, sde.department_id, c.name AS class_name, c.stream_name, d.name AS department_name,
                    COUNT(DISTINCT sde.student_id) AS learners
             FROM student_department_enrollments sde
             JOIN classes c ON c.id = sde.class_id AND c.deleted_at IS NULL
             JOIN departments d ON d.id = sde.department_id AND d.deleted_at IS NULL
             WHERE sde.deleted_at IS NULL AND sde.status = 'active'
               AND sde.start_date < DATE_ADD(:t_end, INTERVAL 1 DAY) AND COALESCE(sde.end_date, NOW()) >= :t_start
             GROUP BY sde.class_id, sde.department_id, c.name, c.stream_name, d.name"
        );
        $stmt->execute($range);
        $pairs = [];
        foreach ($stmt->fetchAll() as $r) {
            $pairs[$r['class_id'] . ':' . $r['department_id']] = [
                'class_id' => (int) $r['class_id'],
                'department_id' => (int) $r['department_id'],
                'class' => trim($r['class_name'] . ' ' . ($r['stream_name'] ?? '')),
                'class_name' => $r['class_name'],
                'department' => $r['department_name'],
                'learners' => (int) $r['learners'],
                'assessments' => 0,
                'enotes' => 0,
                'teachers' => [],
            ];
        }
        if (!$pairs) return [];

        // which class streams carry each class name (an "all streams" target reaches all of them)
        $streamsByName = [];
        foreach ($pairs as $p) $streamsByName[$p['class_name']][$p['class_id']] = true;
        $reach = function (?int $classId, ?string $groupName, array $extra) use ($streamsByName): array {
            $ids = $classId ? [$classId => true] : [];
            if ($groupName !== null && $groupName !== '') $ids += $streamsByName[$groupName] ?? [];
            foreach ($extra as $x) $ids[(int) $x] = true;
            return array_keys($ids);
        };

        // assessments set this term
        $stmt = $db->prepare(
            "SELECT a.id, a.class_id, a.class_group_name, s.department_id,
                    (SELECT GROUP_CONCAT(ac.class_id) FROM assignment_classes ac WHERE ac.assignment_id = a.id) AS extra
             FROM assignments a JOIN subjects s ON s.id = a.subject_id
             WHERE a.deleted_at IS NULL AND a.status = 'published' AND " . self::termSql()
        );
        $stmt->execute($range);
        foreach ($stmt->fetchAll() as $a) {
            $extra = $a['extra'] ? explode(',', (string) $a['extra']) : [];
            foreach ($reach($a['class_id'] !== null ? (int) $a['class_id'] : null, $a['class_group_name'], $extra) as $cid) {
                $k = $cid . ':' . (int) $a['department_id'];
                if (isset($pairs[$k])) $pairs[$k]['assessments']++;
            }
        }

        // eNotes published this term
        $stmt = $db->prepare(
            "SELECT class_id, class_group_name, department_id FROM enote_topics
             WHERE deleted_at IS NULL AND status = 'published'
               AND published_at >= :t_start AND published_at < DATE_ADD(:t_end, INTERVAL 1 DAY)"
        );
        $stmt->execute($range);
        foreach ($stmt->fetchAll() as $e) {
            foreach ($reach($e['class_id'] !== null ? (int) $e['class_id'] : null, $e['class_group_name'], []) as $cid) {
                $k = $cid . ':' . (int) $e['department_id'];
                if (isset($pairs[$k])) $pairs[$k]['enotes']++;
            }
        }

        // who teaches it: assigned for the term, else whoever last set it work
        $stmt = $db->prepare(
            "SELECT cs.class_id, s.department_id, TRIM(CONCAT(t.first_name, ' ', t.last_name)) AS name
             FROM class_subjects cs JOIN subjects s ON s.id = cs.subject_id JOIN teachers t ON t.id = cs.teacher_id AND t.deleted_at IS NULL
             WHERE cs.term_id = ?"
        );
        $stmt->execute([(int) $term['id']]);
        foreach ($stmt->fetchAll() as $r) {
            $k = (int) $r['class_id'] . ':' . (int) $r['department_id'];
            if (isset($pairs[$k]) && !in_array($r['name'], $pairs[$k]['teachers'], true)) $pairs[$k]['teachers'][] = $r['name'];
        }
        $rows = $db->query(
            "SELECT a.class_id, s.department_id, TRIM(CONCAT(t.first_name, ' ', t.last_name)) AS name, MAX(COALESCE(a.published_at, a.created_at)) AS last_set
             FROM assignments a JOIN subjects s ON s.id = a.subject_id JOIN teachers t ON t.id = a.teacher_id AND t.deleted_at IS NULL
             WHERE a.deleted_at IS NULL AND a.status = 'published' AND a.class_id IS NOT NULL
             GROUP BY a.class_id, s.department_id, t.id
             ORDER BY last_set DESC"
        )->fetchAll();
        foreach ($rows as $r) {
            $k = (int) $r['class_id'] . ':' . (int) $r['department_id'];
            if (isset($pairs[$k]) && !$pairs[$k]['teachers']) $pairs[$k]['teachers'][] = $r['name'];
        }

        $out = array_values($pairs);
        usort($out, fn ($a, $b) => [$a['department'], $a['class']] <=> [$b['department'], $b['class']]);
        return $out;
    }

    /**
     * The printable follow-up report for a term: who missed the marking deadline, who is still
     * marking, who set nothing, whose learners are not handing in, who has gone quiet, and which
     * classes had nothing set or published. Optionally for one department.
     */
    public function followUpReport(array $term, ?int $departmentId = null): array
    {
        $overview = $this->overview($term);
        $teachers = $overview['teachers'];
        if ($departmentId) {
            $teachers = array_values(array_filter($teachers, fn ($t) => in_array($departmentId, $t['department_ids'], true)));
        }
        $deptNames = [];
        foreach ($overview['departments'] as $d) $deptNames[$d['id']] = $d['name'];
        $withDepts = fn (array $t) => $t + ['departments' => implode(', ', array_map(fn ($id) => $deptNames[$id] ?? '', $t['department_ids']))];

        // the assessments behind each teacher's marking, to name them in the report
        $byTeacher = [];
        foreach ($this->assessments($term) as $a) {
            if ($a['waiting'] > 0) $byTeacher[$a['teacher_id']][] = $a;
        }
        $marking = function (array $t) use ($byTeacher) {
            $list = $byTeacher[$t['id']] ?? [];
            usort($list, fn ($x, $y) => ($y['waiting_days'] ?? 0) <=> ($x['waiting_days'] ?? 0));
            return array_map(fn ($a) => ['title' => $a['title'], 'subject' => $a['subject'], 'class' => $a['class'], 'waiting' => $a['waiting'], 'days' => $a['waiting_days']], $list);
        };

        $late = $still = $noneSet = $lowHandIn = $quiet = [];
        foreach ($teachers as $t) {
            $row = $withDepts($t);
            if ($t['overdue'] > 0) $late[] = $row + ['assessments' => $marking($t)];
            elseif ($t['waiting'] > 0) $still[] = $row + ['assessments' => $marking($t)];
            if (in_array('none_set', $t['flags'], true)) $noneSet[] = $row;
            if (in_array('low_hand_in', $t['flags'], true)) $lowHandIn[] = $row;
            if (in_array('quiet', $t['flags'], true)) $quiet[] = $row;
        }
        usort($late, fn ($a, $b) => [$b['overdue'], $b['oldest_days']] <=> [$a['overdue'], $a['oldest_days']]);
        usort($still, fn ($a, $b) => $b['waiting'] <=> $a['waiting']);

        $classes = array_values(array_filter(
            $this->classActivity($term),
            fn ($c) => $c['assessments'] === 0 && $c['enotes'] === 0 && (!$departmentId || $c['department_id'] === $departmentId)
        ));

        return [
            'late_marking' => $late,
            'still_marking' => $still,
            'none_set' => $noneSet,
            'low_hand_in' => $lowHandIn,
            'quiet' => $quiet,
            'inactive_classes' => $classes,
            'teachers_total' => count($teachers),
        ];
    }

    /** The learners who should have handed an assessment in and haven't - and who started it. */
    public function missingLearners(int $assignmentId): ?array
    {
        $db = $this->db();
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.teacher_id, s.department_id, COALESCE(a.deadline_at, a.due_date) AS deadline
             FROM assignments a JOIN subjects s ON s.id = a.subject_id
             WHERE a.id = ? AND a.deleted_at IS NULL"
        );
        $stmt->execute([$assignmentId]);
        $a = $stmt->fetch();
        if (!$a) return null;

        $stmt = $db->prepare(
            "SELECT DISTINCT st.id, st.first_name, st.last_name, st.admission_number,
                    TRIM(CONCAT(sc.name, ' ', COALESCE(sc.stream_name, ''))) AS class_name,
                    EXISTS (SELECT 1 FROM assignment_submissions p WHERE p.assignment_id = a.id AND p.student_id = st.id
                            AND p.deleted_at IS NULL AND p.status = 'in_progress') AS started
             FROM assignments a
             JOIN subjects s ON s.id = a.subject_id
             JOIN student_department_enrollments sde ON sde.department_id = s.department_id
                  AND sde.deleted_at IS NULL AND sde.status = 'active'
                  AND COALESCE(a.published_at, a.created_at) BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
             LEFT JOIN classes sc ON sc.id = sde.class_id
             JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL
             WHERE a.id = :id
               AND (sde.class_id = a.class_id
                    OR (a.class_group_name IS NOT NULL AND sc.name = a.class_group_name)
                    OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id AND ac.class_id = sde.class_id))
               AND NOT EXISTS (SELECT 1 FROM student_teacher_enrollments ste
                               WHERE ste.student_id = st.id AND ste.teacher_id = a.teacher_id
                                 AND ste.department_id = s.department_id AND ste.status = 'withdrawn')
               AND NOT EXISTS (SELECT 1 FROM assignment_submissions h WHERE h.assignment_id = a.id AND h.student_id = st.id
                               AND h.deleted_at IS NULL AND h.status IN ('submitted','marking','graded','returned'))
             ORDER BY class_name, st.last_name, st.first_name"
        );
        $stmt->execute(['id' => $assignmentId]);
        return [
            'assignment' => ['id' => (int) $a['id'], 'title' => $a['title'], 'deadline' => $a['deadline']],
            'learners' => array_map(fn ($r) => [
                'id' => (int) $r['id'],
                'name' => trim($r['first_name'] . ' ' . $r['last_name']),
                'admission_number' => $r['admission_number'],
                'class' => $r['class_name'],
                'started' => (bool) $r['started'],
            ], $stmt->fetchAll()),
        ];
    }
}
