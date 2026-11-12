<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use RuntimeException;

/**
 * A learner's report card for a term, as it is shown - to the admin, and (when the super admin
 * allows it) to the learner, their teachers and their parent.
 *
 * The card is always there, even before any mark: every subject the learner takes this term
 * (their department enrolments) has a row, marked "not yet assessed" until marks come in.
 *  - A card the school has made (ReportCardService::generateFullReport) is shown as made: "final".
 *  - Otherwise it is "provisional": grades are worked out live from released marks only (work the
 *    teacher has returned, and paper exams set to count), with no AI remarks and nothing saved.
 * On top of the grades it carries the term on Tusome, subject by subject: work set and handed in
 * (and on time), eNote topics read, live classes attended, plus days active and revision.
 */
final class ReportCardView
{
    /** A piece of marked work counts as passed from this percentage */
    public const PASS_FROM = 50.0;

    private static function db()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /** Who besides the admins may see report cards (school_settings, migration 160) */
    public static function visibility(): array
    {
        try {
            $row = self::db()->query(
                'SELECT report_cards_students, report_cards_teachers, report_cards_parents FROM school_settings WHERE id = 1'
            )->fetch();
        } catch (\PDOException $e) {
            $row = null; // migration 160 not run yet: nobody else sees them
        }
        return [
            'students' => (bool) ($row['report_cards_students'] ?? false),
            'teachers' => (bool) ($row['report_cards_teachers'] ?? false),
            'parents' => (bool) ($row['report_cards_parents'] ?? false),
        ];
    }

    public static function allowed(string $who): bool
    {
        return self::visibility()[$who] ?? false;
    }

    /**
     * The terms a learner has been at school for (from their first enrolment up to now), newest
     * first - the ones their card can be opened for.
     */
    public static function termsFor(int $studentId): array
    {
        $db = self::db();
        $stmt = $db->prepare(
            "SELECT MIN(start_date) FROM student_department_enrollments WHERE student_id = ? AND deleted_at IS NULL"
        );
        $stmt->execute([$studentId]);
        $since = $stmt->fetchColumn() ?: null;

        $stmt = $db->prepare(
            "SELECT t.id, t.name, ay.name AS academic_year, t.is_current, t.start_date, t.end_date
             FROM terms t LEFT JOIN academic_years ay ON ay.id = t.academic_year_id
             WHERE t.deleted_at IS NULL AND t.start_date <= CURDATE()
               AND (:since IS NULL OR t.end_date >= :since2
                    OR EXISTS (SELECT 1 FROM report_cards rc WHERE rc.term_id = t.id AND rc.student_id = :sid))
             ORDER BY t.start_date DESC"
        );
        $stmt->execute(['since' => $since, 'since2' => $since, 'sid' => $studentId]);
        return array_map(fn($t) => [
            'id' => (int) $t['id'],
            'name' => $t['name'],
            'academic_year' => $t['academic_year'],
            'is_current' => (bool) $t['is_current'],
        ], $stmt->fetchAll());
    }

    /** @throws RuntimeException when the learner or the term doesn't exist */
    public static function build(int $studentId, int $termId): array
    {
        $db = self::db();

        $stmt = $db->prepare('SELECT id, name, start_date, end_date FROM terms WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([$termId]);
        $term = $stmt->fetch();
        if (!$term) {
            throw new RuntimeException('Term not found.');
        }
        $from = $term['start_date'] . ' 00:00:00';
        $to = $term['end_date'] . ' 23:59:59';

        $stmt = $db->prepare('SELECT id FROM report_cards WHERE student_id = ? AND term_id = ?');
        $stmt->execute([$studentId, $termId]);
        $storedId = (int) ($stmt->fetchColumn() ?: 0);

        $service = new ReportCardService();
        $card = $storedId ? $service->getFullReport($storedId) : self::skeleton($studentId, $termId);
        $final = $storedId && count($card['subjects']) > 0;
        $maxWeight = (int) $card['max_weight'];

        if (!$final) {
            self::gradeLive($card, $studentId, $termId, $from, $to, $maxWeight);
        }

        foreach ($card['subjects'] as &$s) {
            $s['assessed'] = true;
        }
        unset($s);

        // every subject the learner takes this term, with or without marks
        $teachers = self::teachersByDepartment($studentId);
        $have = array_flip(array_map(fn($s) => (int) $s['subject_id'], $card['subjects']));
        foreach (self::subjectsTaken($studentId, $term['start_date'], $term['end_date']) as $sub) {
            $dept = (int) $sub['department_id'];
            if (isset($have[(int) $sub['id']])) {
                continue;
            }
            $card['subjects'][] = [
                'subject_id' => (int) $sub['id'],
                'subject_name' => $sub['name'],
                'subject_code' => $sub['code'],
                'avg_weight' => 0.0,
                'grade' => null,
                'descriptor_text' => null,
                'teacher_initials' => $teachers[$dept]['initials'] ?? null,
                'assignments_included_count' => 0,
                'assignments_total_count' => 0,
                'constructs' => [],
                'competencies' => [],
                'assessed' => false,
            ];
        }
        $deptOf = self::departmentsOf(array_map(fn($s) => (int) $s['subject_id'], $card['subjects']));
        foreach ($card['subjects'] as &$s) {
            $t = $teachers[$deptOf[(int) $s['subject_id']] ?? 0] ?? null;
            $s['teacher_name'] = $t['name'] ?? null;
            if (empty($s['teacher_initials']) && $t) {
                $s['teacher_initials'] = $t['initials'];
            }
        }
        unset($s);
        usort($card['subjects'], fn($a, $b) => strcasecmp((string) $a['subject_name'], (string) $b['subject_name']));

        $card['status'] = $final ? 'final' : 'provisional';
        $card['term']['start_date'] = $term['start_date'];
        $card['term']['end_date'] = $term['end_date'];
        $card['activity'] = self::activity($studentId, $termId, $from, $to);
        $card['platform'] = ['name' => 'Tusome', 'tagline' => 'Online learning platform'];

        return $card;
    }

    /** The parts of a card that don't depend on marks - for a learner the school hasn't made one for */
    private static function skeleton(int $studentId, int $termId): array
    {
        $db = self::db();
        $stmt = $db->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.profile_photo,
                    c.name AS class_name, c.stream_name, c.level AS class_level
             FROM students s LEFT JOIN classes c ON c.id = s.class_id
             WHERE s.id = ? AND s.deleted_at IS NULL"
        );
        $stmt->execute([$studentId]);
        $st = $stmt->fetch();
        if (!$st) {
            throw new RuntimeException('Student not found.');
        }

        $stmt = $db->prepare(
            "SELECT t.id, t.name, t.start_date, t.end_date, ay.name AS academic_year
             FROM terms t LEFT JOIN academic_years ay ON ay.id = t.academic_year_id WHERE t.id = ?"
        );
        $stmt->execute([$termId]);
        $term = $stmt->fetch();

        $stmt = $db->prepare(
            'SELECT COUNT(*) FROM student_logins WHERE student_id = ? AND logged_in_at >= ? AND logged_in_at < DATE_ADD(?, INTERVAL 1 DAY)'
        );
        $stmt->execute([$studentId, $term['start_date'], $term['end_date']]);
        $logins = (int) $stmt->fetchColumn();

        $school = $db->query('SELECT * FROM school_settings WHERE id = 1')->fetch() ?: null;
        $maxAwards = $school ? max(1, (int) $school['max_awards_on_report_card']) : 2;
        $service = new ReportCardService();
        $awards = $service->topAwardsForReport((new RewardService())->listAwardsForStudent($studentId, true, $termId), $maxAwards);

        return [
            'id' => 0,
            'student' => [
                'id' => (int) $st['id'],
                'first_name' => $st['first_name'],
                'last_name' => $st['last_name'],
                'admission_number' => $st['admission_number'],
                'profile_photo' => $st['profile_photo'],
            ],
            'term' => ['id' => (int) $term['id'], 'name' => $term['name'], 'academic_year' => $term['academic_year']],
            'class_name' => $st['class_name'],
            'stream_name' => $st['stream_name'],
            'class_level' => $st['class_level'],
            'max_weight' => ReportCardGradingService::maxWeightForClassLevel($st['class_level']),
            'total_points' => 0,
            'overall_avg_weight' => 0.0,
            'performance_level' => null,
            'result_category' => null,
            'class_teacher_comment' => null,
            'head_teacher_comment' => null,
            'generated_at' => null,
            'login_count' => $logins,
            'school' => $school,
            'subjects' => [],
            'awards' => $awards,
            'virtual_lab' => (new VirtualLabService())->listResultsForStudent($studentId, $termId),
        ];
    }

    /**
     * Grades worked out now from released marks only (returned online work due in the term, and
     * paper exams set to count) - the same weights and grade bands as a made card, without the AI
     * remarks. Nothing is saved.
     */
    private static function gradeLive(array &$card, int $studentId, int $termId, string $from, string $to, int $maxWeight): void
    {
        $db = self::db();
        $stmt = $db->prepare(
            "SELECT a.subject_id, a.title, a.total_marks, sb.total_score, sb.percentage
             FROM assignment_submissions sb
             INNER JOIN assignments a ON a.id = sb.assignment_id
             WHERE sb.student_id = ? AND sb.status = 'returned' AND sb.deleted_at IS NULL AND sb.percentage IS NOT NULL
               AND a.status = 'published' AND a.subject_id IS NOT NULL AND a.deleted_at IS NULL
               AND COALESCE(a.due_date, a.published_at, a.created_at) BETWEEN ? AND ?
             ORDER BY a.subject_id, COALESCE(a.due_date, a.published_at)"
        );
        $stmt->execute([$studentId, $from, $to]);
        $items = [];
        foreach ($stmt->fetchAll() as $r) {
            $items[(int) $r['subject_id']][] = ['label' => $r['title'], 'got' => (float) $r['total_score'], 'out_of' => (float) $r['total_marks'], 'pct' => (float) $r['percentage'], 'source' => 'assignment'];
        }

        $stmt = $db->prepare(
            "SELECT pa.subject_id, pa.title, pa.max_score, pas.score
             FROM physical_assessment_scores pas
             INNER JOIN physical_assessments pa ON pa.id = pas.physical_assessment_id
             WHERE pas.student_id = ? AND pa.term_id = ? AND pa.include_on_report = 1 AND pa.deleted_at IS NULL AND pas.score IS NOT NULL
             ORDER BY pa.subject_id, pa.exam_date"
        );
        $stmt->execute([$studentId, $termId]);
        foreach ($stmt->fetchAll() as $r) {
            $max = (float) $r['max_score'];
            $items[(int) $r['subject_id']][] = ['label' => $r['title'], 'got' => (float) $r['score'], 'out_of' => $max, 'pct' => $max > 0 ? round(((float) $r['score'] / $max) * 100, 2) : 0.0, 'source' => 'physical'];
        }
        if (!$items) {
            return;
        }

        $names = [];
        $in = implode(',', array_fill(0, count($items), '?'));
        $stmt = $db->prepare("SELECT id, name, code FROM subjects WHERE id IN ({$in})");
        $stmt->execute(array_keys($items));
        foreach ($stmt->fetchAll() as $r) {
            $names[(int) $r['id']] = $r;
        }

        $subjects = [];
        foreach ($items as $subjectId => $list) {
            $weights = [];
            $constructs = [];
            foreach ($list as $it) {
                $w = ReportCardGradingService::percentageToWeight($it['pct'], $maxWeight);
                $weights[] = $w;
                $constructs[] = ['label' => $it['label'], 'score_obtained' => $it['got'], 'score_total' => $it['out_of'], 'weight' => $w, 'source_type' => $it['source']];
            }
            $avg = ReportCardGradingService::averageWeight($weights);
            $subjects[] = [
                'subject_id' => $subjectId,
                'subject_name' => $names[$subjectId]['name'] ?? 'Subject',
                'subject_code' => $names[$subjectId]['code'] ?? null,
                'avg_weight' => $avg,
                'grade' => ReportCardGradingService::weightToGrade($avg, $maxWeight),
                'descriptor_text' => null,
                'teacher_initials' => null,
                'assignments_included_count' => count($list),
                'assignments_total_count' => count($list),
                'constructs' => $constructs,
                'competencies' => [],
            ];
        }

        $avgs = array_map(fn($s) => (float) $s['avg_weight'], $subjects);
        $overall = round(array_sum($avgs) / count($avgs), 1);
        $card['subjects'] = $subjects;
        $card['overall_avg_weight'] = $overall;
        $card['performance_level'] = ReportCardGradingService::weightToPerformanceLevel($overall, $maxWeight);
        $card['total_points'] = array_sum(array_map(fn($s) => ReportCardGradingService::gradeToPrinciplePoints($s['grade'], $maxWeight), $subjects));
        $card['result_category'] = ReportCardGradingService::resultCategory($overall, $maxWeight);
    }

    /** Subjects in the departments the learner was enrolled in at some point in the term */
    private static function subjectsTaken(int $studentId, string $start, string $end): array
    {
        $stmt = self::db()->prepare(
            "SELECT DISTINCT sub.id, sub.name, sub.code, sub.department_id
             FROM student_department_enrollments sde
             INNER JOIN subjects sub ON sub.department_id = sde.department_id AND sub.deleted_at IS NULL
             WHERE sde.student_id = ? AND sde.deleted_at IS NULL AND sde.status <> 'withdrawn'
               AND sde.start_date <= ? AND (sde.end_date IS NULL OR sde.end_date >= ?)"
        );
        $stmt->execute([$studentId, $end, $start]);
        return $stmt->fetchAll();
    }

    /** @return array<int, array{name: string, initials: string}> the learner's teacher, by department */
    private static function teachersByDepartment(int $studentId): array
    {
        $stmt = self::db()->prepare(
            "SELECT ste.department_id, t.first_name, t.last_name
             FROM student_teacher_enrollments ste INNER JOIN teachers t ON t.id = ste.teacher_id AND t.deleted_at IS NULL
             WHERE ste.student_id = ? AND ste.status = 'active'
             ORDER BY ste.enrolled_at DESC"
        );
        $stmt->execute([$studentId]);
        $out = [];
        foreach ($stmt->fetchAll() as $r) {
            $dept = (int) $r['department_id'];
            if (isset($out[$dept])) {
                continue;
            }
            $first = trim((string) $r['first_name']);
            $last = trim((string) $r['last_name']);
            $out[$dept] = [
                'name' => ucwords(strtolower(trim("{$first} {$last}"))),
                'initials' => strtoupper(mb_substr($first, 0, 1) . '.' . mb_substr($last, 0, 1)),
            ];
        }
        return $out;
    }

    /** @return array<int, int> subject id => department id */
    private static function departmentsOf(array $subjectIds): array
    {
        if (!$subjectIds) {
            return [];
        }
        $in = implode(',', array_fill(0, count($subjectIds), '?'));
        $stmt = self::db()->prepare("SELECT id, department_id FROM subjects WHERE id IN ({$in})");
        $stmt->execute(array_values($subjectIds));
        $out = [];
        foreach ($stmt->fetchAll() as $r) {
            $out[(int) $r['id']] = (int) $r['department_id'];
        }
        return $out;
    }

    /**
     * The term on Tusome: per subject, work set (already due, or handed in) and handed in, on time,
     * eNote topics read and finished, live classes attended; and overall days active, sign-ins,
     * revision days and, where the school records it, days present at school.
     */
    private static function activity(int $studentId, int $termId, string $from, string $to): array
    {
        $db = self::db();
        $bySubject = [];
        $row = function (int $id) use (&$bySubject) {
            $bySubject[$id] ??= ['subject_id' => $id, 'set' => 0, 'handed_in' => 0, 'on_time' => 0, 'returned' => 0, 'average' => null, 'topics_read' => 0, 'topics_finished' => 0, 'reading_minutes' => 0, 'live_attended' => 0,
            'passed' => 0, 'failed' => 0, 'loa' => null, 'aoi' => null, 'eoc' => null, 'notes_topics' => 0, 'notes_percent' => null];
        };

        // Work set for the learner in the term, the same rule as their Assessments page
        $deadline = "COALESCE(a.deadline_at, IF(TIME(a.due_date) = '00:00:00', a.due_date + INTERVAL 1 DAY, a.due_date))";
        $stmt = $db->prepare(
            "SELECT a.subject_id,
                    COUNT(*) AS set_count,
                    SUM(sb.assignment_id IS NOT NULL) AS handed_in,
                    SUM(sb.assignment_id IS NOT NULL AND ({$deadline} IS NULL OR sb.first_at <= {$deadline})) AS on_time,
                    SUM(sb.returned = 1) AS returned,
                    AVG(CASE WHEN sb.returned = 1 THEN sb.pct END) AS average
             FROM assignments a
             INNER JOIN subjects s ON s.id = a.subject_id
             LEFT JOIN (
                 SELECT assignment_id, MIN(submitted_at) AS first_at, MAX(status = 'returned') AS returned,
                        MAX(CASE WHEN status = 'returned' THEN percentage END) AS pct
                 FROM assignment_submissions
                 WHERE student_id = ? AND deleted_at IS NULL AND status <> 'in_progress'
                 GROUP BY assignment_id
             ) sb ON sb.assignment_id = a.id
             WHERE a.deleted_at IS NULL AND a.status = 'published'
               AND COALESCE(a.due_date, a.published_at, a.created_at) BETWEEN ? AND ?
               AND (sb.assignment_id IS NOT NULL OR {$deadline} IS NULL OR {$deadline} <= NOW())
               AND " . AssignmentAccess::clause() . "
             GROUP BY a.subject_id"
        );
        $stmt->execute([$studentId, $from, $to, $studentId, $studentId]);
        foreach ($stmt->fetchAll() as $r) {
            $id = (int) $r['subject_id'];
            $row($id);
            $bySubject[$id]['set'] = (int) $r['set_count'];
            $bySubject[$id]['handed_in'] = (int) $r['handed_in'];
            $bySubject[$id]['on_time'] = (int) $r['on_time'];
            $bySubject[$id]['returned'] = (int) $r['returned'];
            $bySubject[$id]['average'] = $r['average'] !== null ? (int) round((float) $r['average']) : null;
        }

        // eNote topics opened in the term
        $stmt = $db->prepare(
            "SELECT t.subject_id, COUNT(*) AS topics, SUM(ep.completed_at IS NOT NULL) AS finished, COALESCE(SUM(ep.time_spent_minutes), 0) AS minutes
             FROM enote_progress ep INNER JOIN enote_topics t ON t.id = ep.topic_id
             WHERE ep.student_id = ? AND ep.last_read_at BETWEEN ? AND ? AND t.subject_id IS NOT NULL
             GROUP BY t.subject_id"
        );
        $stmt->execute([$studentId, $from, $to]);
        foreach ($stmt->fetchAll() as $r) {
            $id = (int) $r['subject_id'];
            $row($id);
            $bySubject[$id]['topics_read'] = (int) $r['topics'];
            $bySubject[$id]['topics_finished'] = (int) $r['finished'];
            $bySubject[$id]['reading_minutes'] = (int) $r['minutes'];
        }

        // Live classes joined in the term
        $stmt = $db->prepare(
            "SELECT lc.subject_id, COUNT(DISTINCT lc.id) AS attended
             FROM live_class_attendance lca INNER JOIN live_classes lc ON lc.id = lca.live_class_id
             WHERE lca.student_id = ? AND COALESCE(lca.join_time, lca.created_at) BETWEEN ? AND ? AND lc.subject_id IS NOT NULL
             GROUP BY lc.subject_id"
        );
        $stmt->execute([$studentId, $from, $to]);
        foreach ($stmt->fetchAll() as $r) {
            $id = (int) $r['subject_id'];
            $row($id);
            $bySubject[$id]['live_attended'] = (int) $r['attended'];
        }

        // Marked work (released) in the term: passed / failed, and the LOA / AOI / EOC averages
        $stmt = $db->prepare(
            "SELECT a.id, a.subject_id, a.title, a.assessment_category, sb.percentage, sb.total_score, a.total_marks,
                    COALESCE(a.due_date, a.published_at, a.created_at) AS on_date
             FROM assignment_submissions sb
             INNER JOIN assignments a ON a.id = sb.assignment_id AND a.deleted_at IS NULL AND a.status = 'published' AND a.subject_id IS NOT NULL
             WHERE sb.student_id = ? AND sb.deleted_at IS NULL AND sb.status = 'returned' AND sb.percentage IS NOT NULL
               AND COALESCE(a.due_date, a.published_at, a.created_at) BETWEEN ? AND ?
             ORDER BY sb.percentage ASC"
        );
        $stmt->execute([$studentId, $from, $to]);
        $marked = $stmt->fetchAll();
        $cat = [];
        $aoiTasks = [];
        foreach ($marked as $m) {
            $id = (int) $m['subject_id'];
            $row($id);
            $pct = (float) $m['percentage'];
            $bySubject[$id][$pct >= self::PASS_FROM ? 'passed' : 'failed'] = ($bySubject[$id][$pct >= self::PASS_FROM ? 'passed' : 'failed'] ?? 0) + 1;
            if ($m['assessment_category']) {
                $cat[$id][$m['assessment_category']][] = $pct;
            }
            if ($m['assessment_category'] === 'AOI') {
                $aoiTasks[] = ['subject_id' => $id, 'title' => $m['title'], 'percentage' => (int) round($pct)];
            }
        }
        foreach ($bySubject as $id => &$b) {
            $b['passed'] ??= 0;
            $b['failed'] ??= 0;
            foreach (['LOA' => 'loa', 'AOI' => 'aoi', 'EOC' => 'eoc'] as $k => $key) {
                $v = $cat[$id][$k] ?? [];
                $b[$key] = $v ? (int) round(array_sum($v) / count($v)) : null;
            }
        }
        unset($b);

        // Every marked assessment of the term, online and paper, in date order - the full record
        $record = array_map(fn($m) => [
            'subject_id' => (int) $m['subject_id'],
            'title' => $m['title'],
            'kind' => $m['assessment_category'] ?: 'Online',
            'date' => substr((string) $m['on_date'], 0, 10),
            'score' => $m['total_score'] !== null ? (float) $m['total_score'] : null,
            'out_of' => $m['total_marks'] !== null ? (float) $m['total_marks'] : null,
            'percentage' => (int) round((float) $m['percentage']),
        ], $marked);
        $stmt = $db->prepare(
            "SELECT pa.subject_id, pa.title, pa.exam_date, pa.max_score, pas.score
             FROM physical_assessment_scores pas
             INNER JOIN physical_assessments pa ON pa.id = pas.physical_assessment_id AND pa.deleted_at IS NULL
             WHERE pas.student_id = ? AND pa.term_id = ? AND pas.score IS NOT NULL AND pa.subject_id IS NOT NULL"
        );
        $stmt->execute([$studentId, $termId]);
        foreach ($stmt->fetchAll() as $r) {
            $max = (float) $r['max_score'];
            $pct = $max > 0 ? ((float) $r['score'] / $max) * 100 : 0;
            $id = (int) $r['subject_id'];
            $row($id);
            $bySubject[$id][$pct >= self::PASS_FROM ? 'passed' : 'failed']++;
            $record[] = ['subject_id' => $id, 'title' => $r['title'], 'kind' => 'Paper exam', 'date' => (string) $r['exam_date'], 'score' => (float) $r['score'], 'out_of' => $max, 'percentage' => (int) round($pct)];
        }
        usort($record, fn($x, $y) => strcmp($x['date'], $y['date']));

        // Learning outcomes the learner's marked work was set on: the average for each, weakest first
        $stmt = $db->prepare(
            "SELECT a.subject_id, elo.id, elo.learning_outcome, AVG(sb.percentage) AS pct, COUNT(DISTINCT a.id) AS tasks
             FROM assignment_learning_outcomes alo
             INNER JOIN enote_learning_outcomes elo ON elo.id = alo.learning_outcome_id
             INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL AND a.status = 'published' AND a.subject_id IS NOT NULL
             INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.student_id = ? AND sb.deleted_at IS NULL
                    AND sb.status = 'returned' AND sb.percentage IS NOT NULL
             WHERE COALESCE(a.due_date, a.published_at, a.created_at) BETWEEN ? AND ?
             GROUP BY a.subject_id, elo.id, elo.learning_outcome
             ORDER BY pct ASC"
        );
        $stmt->execute([$studentId, $from, $to]);
        $outcomes = array_map(fn($r) => [
            'subject_id' => (int) $r['subject_id'],
            'outcome' => trim(strip_tags((string) $r['learning_outcome'])),
            'percentage' => (int) round((float) $r['pct']),
            'tasks' => (int) $r['tasks'],
            'achieved' => (float) $r['pct'] >= ClassHealthService::ACHIEVED_FROM,
        ], $stmt->fetchAll());

        // How far through the notes: every eNote topic open to the learner by the end of the term,
        // and how much of each they have read (an unopened topic counts as 0%)
        $stmt = $db->prepare(
            "SELECT et.subject_id, COUNT(*) AS topics, COALESCE(SUM(ep.percentage_completed), 0) AS pct_sum,
                    SUM(ep.completed_at IS NOT NULL) AS finished
             FROM enote_topics et
             LEFT JOIN enote_progress ep ON ep.topic_id = et.id AND ep.student_id = :student_id_p
             WHERE et.subject_id IS NOT NULL AND et.published_at <= :term_end AND " . \eSpace\App\Controllers\Student\ENoteController::visibilityClause() . "
             GROUP BY et.subject_id"
        );
        $stmt->execute(['student_id_p' => $studentId, 'term_end' => $to, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        $notesTopics = 0;
        $notesPctSum = 0.0;
        foreach ($stmt->fetchAll() as $r) {
            $id = (int) $r['subject_id'];
            $row($id);
            $bySubject[$id]['notes_topics'] = (int) $r['topics'];
            $bySubject[$id]['notes_percent'] = (int) round(((float) $r['pct_sum']) / max(1, (int) $r['topics']));
            $notesTopics += (int) $r['topics'];
            $notesPctSum += (float) $r['pct_sum'];
        }

        $stmt = $db->prepare('SELECT COUNT(DISTINCT DATE(logged_in_at)) FROM student_logins WHERE student_id = ? AND logged_in_at BETWEEN ? AND ?');
        $stmt->execute([$studentId, $from, $to]);
        $daysActive = (int) $stmt->fetchColumn();

        $stmt = $db->prepare('SELECT COUNT(*) FROM revision_days WHERE student_id = ? AND day BETWEEN ? AND ?');
        $stmt->execute([$studentId, substr($from, 0, 10), substr($to, 0, 10)]);
        $revisionDays = (int) $stmt->fetchColumn();

        $attendance = null;
        try {
            $stmt = $db->prepare('SELECT days_present, days_absent FROM student_attendance WHERE student_id = ? AND term_id = ? LIMIT 1');
            $stmt->execute([$studentId, $termId]);
            if ($a = $stmt->fetch()) {
                $attendance = ['present' => (int) $a['days_present'], 'absent' => (int) $a['days_absent']];
            }
        } catch (\PDOException $e) {
            $attendance = null;
        }

        $sum = fn(string $k) => array_sum(array_column($bySubject, $k));
        return [
            'subjects' => array_values($bySubject),
            'totals' => [
                'set' => $sum('set'),
                'handed_in' => $sum('handed_in'),
                'on_time' => $sum('on_time'),
                'returned' => $sum('returned'),
                'topics_read' => $sum('topics_read'),
                'topics_finished' => $sum('topics_finished'),
                'reading_minutes' => $sum('reading_minutes'),
                'live_attended' => $sum('live_attended'),
                'passed' => $sum('passed'),
                'failed' => $sum('failed'),
                'notes_topics' => $notesTopics,
            ],
            'notes_percent' => $notesTopics ? (int) round($notesPctSum / $notesTopics) : null,
            'pass_from' => (int) self::PASS_FROM,
            'outcomes' => $outcomes,
            'aoi_tasks' => $aoiTasks,
            'record' => $record,
            'days_active' => $daysActive,
            'revision_days' => $revisionDays,
            'attendance' => $attendance,
        ];
    }
}
