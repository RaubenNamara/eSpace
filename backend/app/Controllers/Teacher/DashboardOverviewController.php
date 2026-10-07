<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\GrowthService;

/**
 * The teacher's day at a glance, for the dashboard, in one request:
 *  - today: work waiting to be marked, live classes today, assessments due this week, open
 *    support groups
 *  - mark_next: the oldest submissions waiting to be marked
 *  - agenda: live classes and assessment deadlines over the next seven days
 *  - classes: each class the teacher teaches (has published assessments or eNotes for this
 *    year) - outcomes achieved, students needing support, the most improved student
 *  - activity: recent submissions, eNotes finished, revisions done, messages
 * Scoped to the teacher's active department (its subjects).
 *
 * GET /teacher/dashboard/overview
 */
class DashboardOverviewController extends Controller
{


    private const MAX_CLASSES = 7;

    /**
     * Run one section of the overview; if its queries fail (a table or column from a migration
     * that hasn't been run yet, say) log why and carry on with an empty section, so the rest of
     * the dashboard still loads instead of the whole request failing.
     */
    private function safe(callable $fn, mixed $default, string $what): mixed
    {
        try {
            return $fn();
        } catch (\Throwable $e) {
            error_log("Teacher dashboard overview ({$what}): " . $e->getMessage());
            return $default;
        }
    }

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = ($_SESSION['role'] ?? null) === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
        $db = \eSpace\Config\Database::getInstance();
        $departmentId = $this->getActiveDepartmentId();

        $stmt = $db->prepare("SELECT first_name, last_name FROM teachers WHERE id = ?");
        $stmt->execute([$teacherId]);
        $teacher = $stmt->fetch() ?: ['first_name' => '', 'last_name' => ''];

        $subjectIds = [];
        if ($departmentId) {
            $stmt = $db->prepare("SELECT id FROM subjects WHERE department_id = ? AND deleted_at IS NULL");
            $stmt->execute([$departmentId]);
            $subjectIds = array_map('intval', array_column($stmt->fetchAll(), 'id'));
        }

        // ---- To mark ------------------------------------------------------------------------
        $waiting = $this->safe(function () use ($db, $teacherId) {
        $stmt = $db->prepare(
            "SELECT sb.id AS submission_id, sb.assignment_id, sb.submitted_at, a.title, a.assessment_category,
                    st.first_name, st.last_name,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_name
             FROM assignment_submissions sb
             INNER JOIN assignments a ON a.id = sb.assignment_id AND a.deleted_at IS NULL AND a.teacher_id = ?
             INNER JOIN students st ON st.id = sb.student_id
             LEFT JOIN classes c ON c.id = a.class_id
             WHERE sb.deleted_at IS NULL AND sb.status IN ('submitted', 'marking')
             ORDER BY sb.submitted_at IS NULL, sb.submitted_at ASC, sb.id ASC"
        );
        $stmt->execute([$teacherId]);
        return $stmt->fetchAll();
        }, [], 'to mark');
        $markNext = array_map(fn($r) => [
            'submission_id' => (int) $r['submission_id'],
            'assignment_id' => (int) $r['assignment_id'],
            'assignment' => $r['title'],
            'category' => $r['assessment_category'],
            'student' => trim($r['first_name'] . ' ' . $r['last_name']),
            'class_name' => $r['class_name'] ?: $r['class_name'],
            'submitted_at' => $r['submitted_at'],
        ], array_slice($waiting, 0, 5));

        // ---- Live classes and deadlines ----------------------------------------------------
        $live = $this->safe(function () use ($db, $teacherId) {
        $stmt = $db->prepare(
            "SELECT lc.id, lc.title, lc.scheduled_start, lc.scheduled_end, lc.status, lc.class_group_name,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_name
             FROM live_classes lc
             LEFT JOIN classes c ON c.id = lc.class_id
             WHERE lc.created_by = ? AND lc.deleted_at IS NULL AND lc.status IN ('scheduled', 'started')
               AND lc.scheduled_start < DATE_ADD(CURDATE(), INTERVAL 8 DAY)
               AND (lc.status = 'started' OR lc.scheduled_end >= NOW() OR lc.scheduled_end IS NULL)
             ORDER BY lc.scheduled_start"
        );
        $stmt->execute([$teacherId]);
        return $stmt->fetchAll();
        }, [], 'live classes');
        $today = date('Y-m-d');
        $liveToday = array_values(array_filter($live, fn($l) => $l['status'] === 'started' || substr((string) $l['scheduled_start'], 0, 10) === $today));

        $due = $this->safe(function () use ($db, $teacherId) {
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.due_date, a.assessment_category,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_name, a.class_group_name,
                    (SELECT COUNT(*) FROM assignment_submissions s WHERE s.assignment_id = a.id AND s.deleted_at IS NULL AND s.status <> 'in_progress') AS submitted
             FROM assignments a
             LEFT JOIN classes c ON c.id = a.class_id
             WHERE a.teacher_id = ? AND a.deleted_at IS NULL AND a.status = 'published'
               AND a.due_date >= NOW() AND a.due_date < DATE_ADD(CURDATE(), INTERVAL 8 DAY)
             ORDER BY a.due_date"
        );
        $stmt->execute([$teacherId]);
        return $stmt->fetchAll();
        }, [], 'due this week');

        $agenda = [];
        foreach ($live as $l) {
            $agenda[] = [
                'kind' => 'live',
                'id' => (int) $l['id'],
                'title' => $l['title'],
                'at' => $l['scheduled_start'],
                'class_name' => $l['class_group_name'] ? $l['class_group_name'] . ' (all streams)' : $l['class_name'],
                'status' => $l['status'],
            ];
        }
        foreach ($due as $a) {
            $agenda[] = [
                'kind' => 'due',
                'id' => (int) $a['id'],
                'title' => $a['title'],
                'at' => $a['due_date'],
                'class_name' => $a['class_group_name'] ? $a['class_group_name'] . ' (all streams)' : $a['class_name'],
                'category' => $a['assessment_category'],
                'submitted' => (int) $a['submitted'],
            ];
        }
        usort($agenda, fn($x, $y) => strcmp((string) $x['at'], (string) $y['at']));

        // ---- Support groups ------------------------------------------------------------------
        $support = ['groups' => 0, 'members' => 0, 'revised' => 0];
        try {
            $stmt = $db->prepare(
                "SELECT COUNT(DISTINCT g.id) AS groups_open, COUNT(m.id) AS members, SUM(m.revised_at IS NOT NULL) AS revised
                 FROM support_groups g LEFT JOIN support_group_members m ON m.group_id = g.id
                 WHERE g.teacher_id = ? AND g.status = 'open'"
            );
            $stmt->execute([$teacherId]);
            $row = $stmt->fetch();
            $support = ['groups' => (int) $row['groups_open'], 'members' => (int) $row['members'], 'revised' => (int) $row['revised']];
        } catch (\PDOException $e) {
            // migration 102 not run yet
        }

        $this->success([
            'teacher' => ['first_name' => $teacher['first_name'], 'last_name' => $teacher['last_name']],
            'today' => [
                'to_mark' => count($waiting),
                'live_today' => count($liveToday),
                'due_week' => count($due),
                'support' => $support,
            ],
            'live_today' => array_map(fn($l) => [
                'id' => (int) $l['id'], 'title' => $l['title'], 'at' => $l['scheduled_start'], 'status' => $l['status'],
                'class_name' => $l['class_group_name'] ? $l['class_group_name'] . ' (all streams)' : $l['class_name'],
            ], $liveToday),
            'mark_next' => $markNext,
            'marking' => $this->safe(fn() => $this->marking($db, $teacherId, $waiting), null, 'marking'),
            'week_topics' => $this->safe(fn() => $this->weekTopics($db, $teacherId), null, 'week topics'),
            'agenda' => array_slice($agenda, 0, 8),
            'classes' => $this->safe(fn() => $this->classHealth($db, $teacherId, $departmentId, $subjectIds), [], 'classes'),
            'activity' => $this->safe(fn() => $this->activity($db, $teacherId), [], 'activity'),
        ]);
    }

    /** Each class stream the teacher teaches this year: outcomes achieved, who needs support, who improved most */
    private function classHealth($db, int $teacherId, ?int $departmentId, array $subjectIds): array
    {
        if (!$departmentId || !$subjectIds) {
            return [];
        }
        // The streams the teacher has set work for - directly, or as "all streams" of a level
        $mine = \eSpace\App\Services\ClassHealthService::teacherClassIds($db, $teacherId);
        if (!$mine) {
            return [];
        }
        $stmt = $db->prepare("SELECT id, name, stream_name FROM classes WHERE id IN (" . self::in($mine) . ") ORDER BY name, stream_name");
        $stmt->execute($mine);
        // A teacher of many streams: the first dozen (each needs a few queries)
        $classes = array_slice($stmt->fetchAll(), 0, 12);
        if (!$classes) {
            return [];
        }

        $termId = GrowthService::currentTermId($db);
        $subjectForGrowth = count($subjectIds) === 1 ? $subjectIds[0] : null;
        $out = [];
        foreach ($classes as $c) {
            $classId = (int) $c['id'];
            $stmt = $db->prepare(
                "SELECT DISTINCT st.id, st.first_name, st.last_name FROM student_department_enrollments sde
                 INNER JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL
                 WHERE sde.class_id = ? AND sde.department_id = ? AND sde.status = 'active' AND sde.deleted_at IS NULL"
            );
            $stmt->execute([$classId, $departmentId]);
            $students = $stmt->fetchAll();
            if (!$students) {
                continue;
            }
            $ids = array_map(fn($s) => (int) $s['id'], $students);
            $names = [];
            foreach ($students as $s) {
                $names[(int) $s['id']] = trim($s['first_name'] . ' ' . $s['last_name']);
            }

            $health = \eSpace\App\Services\ClassHealthService::forStudents($db, $ids, $subjectIds);

            $growth = GrowthService::forStudents($db, $ids, $termId, $subjectForGrowth);
            $top = null;
            foreach ($growth as $sid => $g) {
                if ($g['improvement'] !== null && $g['improvement'] > 0 && ($top === null || $g['improvement'] > $growth[$top]['improvement'])) {
                    $top = $sid;
                }
            }

            $engagement = $this->classEngagement($db, $teacherId, $classId, (string) $c['name'], $ids);

            $out[] = [
                'class_id' => $classId,
                'level' => $c['name'],
                'class_name' => $c['name'] . ($c['stream_name'] ? '-' . $c['stream_name'] : ''),
                'students' => count($ids),
                'assessed_students' => $health['assessed_students'],
                'outcome_results' => $health['outcome_results'],
                'achieved_percent' => $health['achieved_percent'],
                'need_support' => $health['need_support'],
                'hand_in_percent' => $engagement['hand_in_percent'],
                'notes_read_percent' => $engagement['notes_read_percent'],
                'most_improved' => $top !== null ? ['name' => $names[$top] ?? '', 'improvement' => $growth[$top]['improvement']] : null,
                'subject_id' => $subjectIds[0],
            ];
        }
        // Classes with results first, then by name; a handful
        usort($out, fn($a, $b) => ($b['outcome_results'] > 0) <=> ($a['outcome_results'] > 0) ?: strcmp($a['class_name'], $b['class_name']));
        return array_slice($out, 0, self::MAX_CLASSES);
    }

    /**
     * Marking this week: how many scripts were marked since Monday, how many wait (and since when),
     * and the assessments they wait in - each with how many students have handed in out of those
     * it was set for
     */
    private function marking($db, int $teacherId, array $waiting): array
    {
        $monday = date('Y-m-d', strtotime('monday this week'));
        $stmt = $db->prepare(
            "SELECT COUNT(*) FROM assignment_submissions sb
             INNER JOIN assignments a ON a.id = sb.assignment_id AND a.teacher_id = ? AND a.deleted_at IS NULL
             WHERE sb.deleted_at IS NULL AND COALESCE(sb.marked_at, sb.graded_at) >= ?"
        );
        $stmt->execute([$teacherId, $monday]);
        $markedWeek = (int) $stmt->fetchColumn();

        $byAssignment = [];
        foreach ($waiting as $w) {
            $id = (int) $w['assignment_id'];
            $byAssignment[$id] ??= ['assignment_id' => $id, 'title' => $w['title'], 'category' => $w['assessment_category'], 'class_name' => $w['class_name'], 'waiting' => 0, 'oldest_at' => $w['submitted_at']];
            $byAssignment[$id]['waiting']++;
        }
        // Most waiting first, a handful
        usort($byAssignment, fn($a, $b) => $b['waiting'] <=> $a['waiting'] ?: strcmp((string) $a['oldest_at'], (string) $b['oldest_at']));
        $byAssignment = array_slice($byAssignment, 0, 4);

        if ($byAssignment) {
            $ids = array_column($byAssignment, 'assignment_id');
            // Handed in, and the students it was set for (the stream, or every stream of the level)
            $stmt = $db->prepare(
                "SELECT a.id, a.class_group_name, c.name AS level,
                        (SELECT COUNT(DISTINCT s.student_id) FROM assignment_submissions s
                          WHERE s.assignment_id = a.id AND s.deleted_at IS NULL AND s.status <> 'in_progress') AS submitted,
                        (SELECT COUNT(DISTINCT sde.student_id) FROM student_department_enrollments sde
                           INNER JOIN classes ec ON ec.id = sde.class_id
                          WHERE sde.status = 'active' AND sde.deleted_at IS NULL AND sde.department_id = sj.department_id
                            AND (sde.class_id = a.class_id OR (a.class_group_name IS NOT NULL AND ec.name = a.class_group_name))) AS expected
                 FROM assignments a
                 LEFT JOIN classes c ON c.id = a.class_id
                 LEFT JOIN subjects sj ON sj.id = a.subject_id
                 WHERE a.id IN (" . self::in($ids) . ")"
            );
            $stmt->execute($ids);
            $counts = [];
            foreach ($stmt->fetchAll() as $r) {
                $counts[(int) $r['id']] = $r;
            }
            foreach ($byAssignment as &$a) {
                $r = $counts[$a['assignment_id']] ?? null;
                $a['submitted'] = $r ? (int) $r['submitted'] : 0;
                $a['expected'] = $r ? max((int) $r['expected'], (int) $r['submitted']) : 0;
                if ($r && $r['class_group_name']) {
                    $a['class_name'] = $r['class_group_name'];
                }
            }
            unset($a);
        }

        return [
            'marked_week' => $markedWeek,
            'waiting' => count($waiting),
            'oldest_at' => $waiting ? $waiting[0]['submitted_at'] : null,
            'by_assignment' => $byAssignment,
        ];
    }

    /** The scheme-of-work topics planned for this week, and which are taught */
    private function weekTopics($db, int $teacherId): array
    {
        $stmt = $db->prepare(
            "SELECT ct.topic, se.class_level, se.taught_at
             FROM scheme_entries se
             INNER JOIN enote_curriculum_topics ct ON ct.id = se.curriculum_topic_id
             WHERE se.teacher_id = ? AND se.week_start = ?
             ORDER BY se.taught_at IS NULL, se.class_level, ct.topic"
        );
        $stmt->execute([$teacherId, date('Y-m-d', strtotime('monday this week'))]);
        $topics = array_map(fn($r) => ['topic' => $r['topic'], 'class_level' => $r['class_level'], 'taught' => $r['taught_at'] !== null], $stmt->fetchAll());
        return [
            'total' => count($topics),
            'taught' => count(array_filter($topics, fn($t) => $t['taught'])),
            'topics' => array_slice($topics, 0, 5),
        ];
    }

    /**
     * For one stream, over the teacher's work of the last eight weeks: the share of set work its
     * students handed in, and how far through the teacher's eNotes they have read
     *
     * @param int[] $studentIds
     * @return array{hand_in_percent: ?int, notes_read_percent: ?int}
     */
    private function classEngagement($db, int $teacherId, int $classId, string $level, array $studentIds): array
    {
        $out = ['hand_in_percent' => null, 'notes_read_percent' => null];
        $since = date('Y-m-d', strtotime('-8 weeks'));

        $stmt = $db->prepare(
            "SELECT id FROM assignments
             WHERE teacher_id = ? AND deleted_at IS NULL AND status = 'published' AND COALESCE(published_at, created_at) >= ?
               AND (class_id = ? OR class_group_name = ?)"
        );
        $stmt->execute([$teacherId, $since, $classId, $level]);
        $assignmentIds = array_map('intval', array_column($stmt->fetchAll(), 'id'));
        if ($assignmentIds) {
            $stmt = $db->prepare(
                "SELECT COUNT(DISTINCT assignment_id, student_id) FROM assignment_submissions
                 WHERE deleted_at IS NULL AND status <> 'in_progress'
                   AND assignment_id IN (" . self::in($assignmentIds) . ") AND student_id IN (" . self::in($studentIds) . ")"
            );
            $stmt->execute([...$assignmentIds, ...$studentIds]);
            $out['hand_in_percent'] = (int) min(100, round((int) $stmt->fetchColumn() / (count($assignmentIds) * count($studentIds)) * 100));
        }

        $stmt = $db->prepare(
            "SELECT id FROM enote_topics
             WHERE teacher_id = ? AND deleted_at IS NULL AND status = 'published' AND COALESCE(published_at, created_at) >= ?
               AND (class_id = ? OR class_group_name = ?)"
        );
        $stmt->execute([$teacherId, $since, $classId, $level]);
        $topicIds = array_map('intval', array_column($stmt->fetchAll(), 'id'));
        if ($topicIds) {
            $stmt = $db->prepare(
                "SELECT COALESCE(SUM(LEAST(percentage_completed, 100)), 0) FROM enote_progress
                 WHERE topic_id IN (" . self::in($topicIds) . ") AND student_id IN (" . self::in($studentIds) . ")"
            );
            $stmt->execute([...$topicIds, ...$studentIds]);
            $out['notes_read_percent'] = (int) min(100, round((float) $stmt->fetchColumn() / (count($topicIds) * count($studentIds))));
        }
        return $out;
    }

    /** What's happened lately: submissions, eNotes finished, revisions done, messages */
    private function activity($db, int $teacherId): array
    {
        $items = [];
        $stmt = $db->prepare(
            "SELECT sb.submitted_at AS at, st.first_name, st.last_name, a.title, a.id AS assignment_id, sb.id AS submission_id
             FROM assignment_submissions sb
             INNER JOIN assignments a ON a.id = sb.assignment_id AND a.teacher_id = ? AND a.deleted_at IS NULL
             INNER JOIN students st ON st.id = sb.student_id
             WHERE sb.deleted_at IS NULL AND sb.submitted_at IS NOT NULL
             ORDER BY sb.submitted_at DESC LIMIT 6"
        );
        $stmt->execute([$teacherId]);
        foreach ($stmt->fetchAll() as $r) {
            $items[] = ['kind' => 'submission', 'at' => $r['at'], 'who' => trim($r['first_name'] . ' ' . $r['last_name']), 'what' => $r['title'],
                'to' => "/teacher/assignments/{$r['assignment_id']}/submissions?submission={$r['submission_id']}"];
        }
        $stmt = $db->prepare(
            "SELECT p.completed_at AS at, st.first_name, st.last_name, et.title, et.id AS topic_id
             FROM enote_progress p
             INNER JOIN enote_topics et ON et.id = p.topic_id AND et.teacher_id = ? AND et.deleted_at IS NULL
             INNER JOIN students st ON st.id = p.student_id
             WHERE p.completed_at IS NOT NULL
             ORDER BY p.completed_at DESC LIMIT 6"
        );
        $stmt->execute([$teacherId]);
        foreach ($stmt->fetchAll() as $r) {
            $items[] = ['kind' => 'enote', 'at' => $r['at'], 'who' => trim($r['first_name'] . ' ' . $r['last_name']), 'what' => $r['title'], 'to' => '/teacher/enotes'];
        }
        try {
            $stmt = $db->prepare(
                "SELECT m.revised_at AS at, st.first_name, st.last_name, g.item_text
                 FROM support_group_members m
                 INNER JOIN support_groups g ON g.id = m.group_id AND g.teacher_id = ?
                 INNER JOIN students st ON st.id = m.student_id
                 WHERE m.revised_at IS NOT NULL ORDER BY m.revised_at DESC LIMIT 4"
            );
            $stmt->execute([$teacherId]);
            foreach ($stmt->fetchAll() as $r) {
                $items[] = ['kind' => 'revised', 'at' => $r['at'], 'who' => trim($r['first_name'] . ' ' . $r['last_name']), 'what' => $r['item_text'], 'to' => '/teacher/class-map'];
            }
        } catch (\PDOException $e) {
            // migration 102 not run yet
        }
        // Messages sent to the teacher
        $stmt = $db->prepare(
            "SELECT m.created_at AS at, m.message, m.sender_id, m.sender_role,
                    COALESCE(CONCAT(s.first_name, ' ', s.last_name), CONCAT(t.first_name, ' ', t.last_name)) AS who
             FROM chat_messages m
             INNER JOIN chat_participants p ON p.conversation_id = m.conversation_id AND p.user_id = ? AND p.user_role IN ('teacher', 'hod')
             LEFT JOIN students s ON m.sender_role = 'student' AND s.id = m.sender_id
             LEFT JOIN teachers t ON m.sender_role IN ('teacher', 'hod') AND t.id = m.sender_id
             WHERE NOT (m.sender_id = ? AND m.sender_role IN ('teacher', 'hod'))
             ORDER BY m.created_at DESC LIMIT 4"
        );
        $stmt->execute([$teacherId, $teacherId]);
        foreach ($stmt->fetchAll() as $r) {
            $items[] = ['kind' => 'message', 'at' => $r['at'], 'who' => trim((string) $r['who']) ?: 'Someone', 'what' => mb_substr(trim(strip_tags((string) $r['message'])), 0, 80), 'to' => '/teacher/chat'];
        }
        usort($items, fn($a, $b) => strcmp((string) $b['at'], (string) $a['at']));
        // A row of the latest, for the strip at the foot of the dashboard
        return array_slice($items, 0, 10);
    }
}
