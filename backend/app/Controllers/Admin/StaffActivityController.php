<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\DeviceInfo;

/**
 * Staff activity for the admin dashboard: which teachers and HODs signed in recently, whether
 * they are online now, and what each teacher actually did.
 *
 * Sign-ins come from login_logs (written on every successful login), "online" from
 * last_active_at (kept fresh by the presence ping). There is no general action log (audit_logs
 * is not written to), so a teacher's activity is read from the work itself: assignments set and
 * published, scripts marked, eNotes written and edited, videos, live classes, virtual labs set and
 * graded, live quizzes run and item bank questions added - each with its own timestamp.
 */
class StaffActivityController extends Controller
{
    protected \PDO $db;

    /** a teacher whose last ping is this recent is shown as online */
    private const ONLINE_MINUTES = 5;
    private const MAX_PEOPLE = 60;
    private const MAX_ACTIVITIES = 12;
    private const MAX_STUDENTS = 2000;
    private const DASHBOARD_STUDENTS = 12;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * GET /admin/staff-activity?days=7
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $days = (int) $this->query('days', 7);
        if (!in_array($days, [1, 7, 30], true)) {
            $days = 7;
        }
        $since = (new \DateTimeImmutable('today'))->modify('-' . ($days - 1) . ' days')->format('Y-m-d 00:00:00');

        $teachers = $this->people('teacher', $since);
        $activities = $this->teacherActivities(array_column($teachers, 'id'), $since);
        foreach ($teachers as &$t) {
            $list = $activities[$t['id']] ?? [];
            usort($list, fn ($a, $b) => strcmp($b['at'], $a['at']));
            $t['activity_count'] = array_sum(array_column($list, 'count'));
            $t['activities'] = array_slice($list, 0, self::MAX_ACTIVITIES);
        }
        unset($t);

        $this->success([
            'days' => $days,
            'since' => $since,
            'online_minutes' => self::ONLINE_MINUTES,
            'teachers' => $teachers,
            'hods' => $this->withHodActivities($this->people('hod', $since), $since),
            // the dashboard shows the latest few; the full list is its own page (students())
            'students' => $this->people('student', $since, self::DASHBOARD_STUDENTS),
            'students_total' => $this->countSignedIn('student', $since),
        ]);
    }

    /**
     * Every student who signed in during the period (the "Student sign-ins" page)
     * GET /admin/student-sign-ins?days=7
     */
    public function students(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }
        $days = (int) $this->query('days', 7);
        if (!in_array($days, [1, 7, 30], true)) {
            $days = 7;
        }
        $since = (new \DateTimeImmutable('today'))->modify('-' . ($days - 1) . ' days')->format('Y-m-d 00:00:00');
        $this->success([
            'days' => $days,
            'since' => $since,
            'online_minutes' => self::ONLINE_MINUTES,
            'students' => $this->people('student', $since, self::MAX_STUDENTS),
            'students_total' => $this->countSignedIn('student', $since),
        ]);
    }

    /**
     * What one student did on eSpace during the period, newest first: tests submitted, eNote
     * pages read, books read, videos watched, live classes joined, labs done, notes written and so
     * on - read from the work itself, like the teachers' activity (there is no general action log).
     * Rows done since the student's latest sign-in are marked, so "this visit" can be shown.
     * GET /admin/student-activity/{id}?days=7
     */
    public function student(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }
        $id = (int) $this->routeParam('id', 0);
        $days = (int) $this->query('days', 7);
        if (!in_array($days, [1, 7, 30], true)) {
            $days = 7;
        }
        $since = (new \DateTimeImmutable('today'))->modify('-' . ($days - 1) . ' days')->format('Y-m-d 00:00:00');

        $stmt = $this->db->prepare('SELECT id FROM students WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([$id]);
        if (!$stmt->fetchColumn()) {
            $this->error('Student not found', 404);
            return;
        }
        $stmt = $this->db->prepare("SELECT MAX(logged_in_at) FROM login_logs WHERE role = 'student' AND user_id = ?");
        $stmt->execute([$id]);
        $lastLogin = $stmt->fetchColumn() ?: null;

        $list = $this->studentActivities($id, $since)[$id] ?? [];
        usort($list, fn ($a, $b) => strcmp($b['at'], $a['at']));
        $sinceLogin = 0;
        foreach ($list as &$a) {
            $a['this_visit'] = $lastLogin !== null && $a['at'] >= $lastLogin;
            if ($a['this_visit']) {
                $sinceLogin += $a['count'];
            }
        }
        unset($a);

        $byType = [];
        foreach ($list as $a) {
            $byType[$a['group']] = ($byType[$a['group']] ?? 0) + $a['count'];
        }
        arsort($byType);

        $this->success([
            'student_id' => $id,
            'days' => $days,
            'since' => $since,
            'last_login_at' => $lastLogin,
            'activity_count' => array_sum(array_column($list, 'count')),
            'this_visit_count' => $sinceLogin,
            'by_group' => $byType,
            'activities' => array_slice($list, 0, 200),
            'more' => max(0, count($list) - 200),
        ]);
    }

    /**
     * A student's activity since $since, as [student_id => [{type, group, label, title, count, at}]].
     * Reading is grouped per piece and per day ("Read 6 pages · Photosynthesis").
     */
    private function studentActivities(int $studentId, string $since): array
    {
        $sources = [
            "SELECT s.student_id, 'test_submitted', a.title, 1, s.submitted_at
             FROM assignment_submissions s INNER JOIN assignments a ON a.id = s.assignment_id
             WHERE s.deleted_at IS NULL AND s.student_id IN (?) AND s.submitted_at >= ?",
            "SELECT s.student_id, 'test_started', a.title, 1, s.started_at
             FROM assignment_submissions s INNER JOIN assignments a ON a.id = s.assignment_id
             WHERE s.deleted_at IS NULL AND s.submitted_at IS NULL AND s.student_id IN (?) AND s.started_at >= ?",
            "SELECT v.student_id, 'enote_pages_read', t.title, COUNT(*), MAX(v.last_viewed_at)
             FROM enote_page_views v INNER JOIN enote_topics t ON t.id = v.topic_id
             WHERE v.student_id IN (?) AND v.last_viewed_at >= ?
             GROUP BY v.student_id, v.topic_id, t.title, DATE(v.last_viewed_at)",
            "SELECT n.student_id, 'enote_note', t.title, COUNT(*), MAX(n.updated_at)
             FROM enote_page_notes n INNER JOIN enote_pages p ON p.id = n.page_id INNER JOIN enote_topics t ON t.id = p.topic_id
             WHERE n.student_id IN (?) AND n.updated_at >= ?
             GROUP BY n.student_id, t.id, t.title, DATE(n.updated_at)",
            "SELECT h.student_id, 'enote_highlight', t.title, COUNT(*), MAX(h.created_at)
             FROM enote_page_highlights h INNER JOIN enote_pages p ON p.id = h.page_id INNER JOIN enote_topics t ON t.id = p.topic_id
             WHERE h.student_id IN (?) AND h.created_at >= ?
             GROUP BY h.student_id, t.id, t.title, DATE(h.created_at)",
            "SELECT b.student_id, 'enote_bookmark', t.title, COUNT(*), MAX(b.created_at)
             FROM enote_bookmarks b INNER JOIN enote_topics t ON t.id = b.topic_id
             WHERE b.student_id IN (?) AND b.created_at >= ?
             GROUP BY b.student_id, t.id, t.title, DATE(b.created_at)",
            "SELECT q.student_id, 'enote_question', t.title, COUNT(*), MAX(q.created_at)
             FROM enote_questions q INNER JOIN enote_topics t ON t.id = q.topic_id
             WHERE q.deleted_at IS NULL AND q.student_id IN (?) AND q.created_at >= ?
             GROUP BY q.student_id, t.id, t.title, DATE(q.created_at)",
            "SELECT e.student_id, 'enote_explanation', t.title, COUNT(*), MAX(e.updated_at)
             FROM enote_explanations e INNER JOIN enote_topics t ON t.id = e.topic_id
             WHERE e.student_id IN (?) AND e.updated_at >= ?
             GROUP BY e.student_id, t.id, t.title, DATE(e.updated_at)",
            "SELECT lp.student_id, 'book_read', b.title, 1, lp.last_read_at
             FROM library_progress lp INNER JOIN library_books b ON b.id = lp.book_id
             WHERE lp.student_id IN (?) AND lp.last_read_at >= ?",
            "SELECT n.student_id, 'book_note', b.title, COUNT(*), MAX(n.updated_at)
             FROM library_page_notes n INNER JOIN library_books b ON b.id = n.book_id
             WHERE n.student_id IN (?) AND n.updated_at >= ?
             GROUP BY n.student_id, b.id, b.title, DATE(n.updated_at)",
            "SELECT bm.student_id, 'book_bookmark', b.title, COUNT(*), MAX(bm.created_at)
             FROM library_bookmarks bm INNER JOIN library_books b ON b.id = bm.book_id
             WHERE bm.student_id IN (?) AND bm.created_at >= ?
             GROUP BY bm.student_id, b.id, b.title, DATE(bm.created_at)",
            "SELECT np.student_id, 'notes_read', n.title, 1, np.last_read_at
             FROM notes_progress np INNER JOIN notes n ON n.id = np.note_id
             WHERE np.student_id IN (?) AND np.last_read_at >= ?",
            "SELECT vv.student_id, 'video_watched', v.title, 1, vv.last_watched_at
             FROM video_views vv INNER JOIN videos v ON v.id = vv.video_id
             WHERE vv.student_id IN (?) AND vv.last_watched_at >= ?",
            "SELECT la.student_id, 'live_class_joined', lc.title, 1, COALESCE(la.join_time, la.created_at)
             FROM live_class_attendance la INNER JOIN live_classes lc ON lc.id = la.live_class_id
             WHERE la.student_id IN (?) AND COALESCE(la.join_time, la.created_at) >= ?",
            "SELECT p.student_id, 'live_quiz_played', a.title, 1, p.joined_at
             FROM live_quiz_players p INNER JOIN live_quizzes q ON q.id = p.quiz_id LEFT JOIN assignments a ON a.id = q.assignment_id
             WHERE p.student_id IN (?) AND p.joined_at >= ?",
            "SELECT at.student_id, IF(at.submitted_at IS NULL, 'lab_started', 'lab_submitted'), x.title, 1, COALESCE(at.submitted_at, at.started_at, at.created_at)
             FROM virtual_lab_attempts at
             LEFT JOIN virtual_lab_assignments vla ON vla.id = at.assignment_id
             LEFT JOIN virtual_lab_experiments x ON x.id = vla.experiment_id
             WHERE at.student_id IN (?) AND COALESCE(at.submitted_at, at.started_at, at.created_at) >= ?",
            "SELECT student_id, 'ict_practice', REPLACE(activity_key, '-', ' '), 1, completed_at
             FROM ict_lab_attempts WHERE student_id IN (?) AND completed_at >= ?",
            "SELECT student_id, 'item_bank_practice', NULL, COUNT(*), MAX(attempted_at)
             FROM item_bank_attempts WHERE student_id IN (?) AND attempted_at >= ?
             GROUP BY student_id, DATE(attempted_at)",
            "SELECT student_id, 'revision_cards', NULL, COUNT(*), MAX(last_seen_at)
             FROM revision_cards WHERE student_id IN (?) AND last_seen_at >= ?
             GROUP BY student_id, DATE(last_seen_at)",
            "SELECT student_id, 'notes_helper', NULL, COUNT(*), MAX(created_at)
             FROM student_note_questions WHERE student_id IN (?) AND created_at >= ?
             GROUP BY student_id, DATE(created_at)",
            "SELECT sender_id, 'chat_sent', NULL, COUNT(*), MAX(created_at)
             FROM chat_messages WHERE sender_role = 'student' AND sender_id IN (?) AND created_at >= ?
             GROUP BY sender_id, DATE(created_at)",
        ];
        $out = $this->runSources($sources, [$studentId], $since);
        foreach ($out as &$list) {
            foreach ($list as &$a) {
                $a['group'] = self::STUDENT_GROUPS[$a['type']] ?? 'Other';
            }
            unset($a);
        }
        unset($list);
        return $out;
    }

    /** the heading each kind of student activity is counted under */
    private const STUDENT_GROUPS = [
        'test_submitted' => 'Assessments', 'test_started' => 'Assessments',
        'enote_pages_read' => 'eNotes', 'enote_note' => 'eNotes', 'enote_highlight' => 'eNotes',
        'enote_bookmark' => 'eNotes', 'enote_question' => 'eNotes', 'enote_explanation' => 'eNotes', 'notes_read' => 'eNotes',
        'book_read' => 'eLibrary', 'book_note' => 'eLibrary', 'book_bookmark' => 'eLibrary',
        'video_watched' => 'Videos', 'live_class_joined' => 'Live classes', 'live_quiz_played' => 'Live quizzes',
        'lab_started' => 'Labs', 'lab_submitted' => 'Labs', 'ict_practice' => 'Labs',
        'item_bank_practice' => 'Practice', 'revision_cards' => 'Practice', 'notes_helper' => 'Practice',
        'chat_sent' => 'Chat',
    ];

    /** how many different people of a role signed in since $since */
    private function countSignedIn(string $role, string $since): int
    {
        $table = $role === 'student' ? 'students' : ($role === 'hod' ? 'hods' : 'teachers');
        $stmt = $this->db->prepare(
            "SELECT COUNT(DISTINCT l.user_id) FROM login_logs l INNER JOIN {$table} p ON p.id = l.user_id AND p.deleted_at IS NULL
             WHERE l.role = ? AND l.logged_in_at >= ?"
        );
        $stmt->execute([$role, $since]);
        return (int) $stmt->fetchColumn();
    }

    /**
     * Everyone of a role who signed in since $since, most recent first, with their sign-in count,
     * department (staff) or class (students), the device of their latest sign-in and whether they
     * are online now.
     */
    private function people(string $role, string $since, int $limit = self::MAX_PEOPLE): array
    {
        [$table, $groupSelect, $groupJoin, $extra] = match ($role) {
            'hod' => ['hods', 'd.name', 'LEFT JOIN departments d ON d.id = p.department_id', "'' AS admission_number, p.teacher_id AS teacher_id"],
            'student' => ['students', "CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name)))", 'LEFT JOIN classes c ON c.id = p.class_id', 'p.admission_number, NULL AS teacher_id'],
            default => ['teachers', 'd.name', 'LEFT JOIN departments d ON d.id = p.department_id', "'' AS admission_number, NULL AS teacher_id"],
        };
        $signedOut = \eSpace\App\Support\SignOut::column($table, 'p');
        $sql = "SELECT p.id, p.first_name, p.last_name, p.username, p.profile_photo, p.last_active_at, {$signedOut} AS signed_out_at, {$extra},
                       {$groupSelect} AS grp,
                       COUNT(l.id) AS logins,
                       MAX(l.logged_in_at) AS last_login_at,
                       MAX(l.id) AS last_log_id
                FROM {$table} p
                INNER JOIN login_logs l ON l.user_id = p.id AND l.role = ? AND l.logged_in_at >= ?
                {$groupJoin}
                WHERE p.deleted_at IS NULL
                GROUP BY p.id, p.first_name, p.last_name, p.username, p.profile_photo, p.last_active_at, signed_out_at, admission_number, teacher_id, grp
                ORDER BY last_login_at DESC
                LIMIT " . $limit;
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$role, $since]);
        $rows = $stmt->fetchAll();
        $devices = $this->devicesOf(array_map(fn ($r) => (int) $r['last_log_id'], $rows));

        $now = time();
        $out = [];
        foreach ($rows as $r) {
            // signing in is activity too: "last seen" is never earlier than the last sign-in
            // (last_active_at is only refreshed by the presence ping on some pages)
            $seen = max(array_filter([(string) ($r['last_active_at'] ?? ''), (string) $r['last_login_at']]));
            $active = $seen ? strtotime($seen) : null;
            $dev = $devices[(int) $r['last_log_id']] ?? ['browser' => null, 'os' => null, 'device_type' => null, 'device_model' => null, 'ip_address' => null];
            $out[] = [
                'id' => (int) $r['id'],
                'name' => trim($r['first_name'] . ' ' . $r['last_name']) ?: $r['username'],
                'username' => $r['username'],
                'admission_number' => $r['admission_number'] ?: null,
                'teacher_id' => $r['teacher_id'] !== null ? (int) $r['teacher_id'] : null,
                'profile_photo' => $r['profile_photo'],
                // staff: their department; students: their class and stream
                'department' => $r['grp'],
                'logins' => (int) $r['logins'],
                'last_login_at' => $r['last_login_at'],
                'last_active_at' => $seen ?: null,
                // signed out since they were last seen: offline at once
                'online' => $active !== null && ($now - $active) <= self::ONLINE_MINUTES * 60
                    && !(!empty($r['signed_out_at']) && $r['signed_out_at'] >= $seen),
                'browser' => $dev['browser'],
                'os' => $dev['os'],
                'device_type' => $dev['device_type'],
                'device_model' => $dev['device_model'],
                'device' => DeviceInfo::summary($dev['browser'], $dev['os'], $dev['device_model']),
                'ip_address' => $dev['ip_address'],
            ];
        }
        return $out;
    }

    /**
     * The browser, OS and device of these sign-ins: as stored at login (migration 139), or read
     * from the User-Agent of sign-ins recorded before that.
     *
     * @param int[] $logIds
     * @return array<int, array{browser: ?string, os: ?string, device_type: ?string, device_model: ?string, ip_address: ?string}>
     */
    private function devicesOf(array $logIds): array
    {
        $logIds = array_values(array_filter($logIds));
        if (!$logIds) {
            return [];
        }
        $in = implode(',', array_fill(0, count($logIds), '?'));
        try {
            $stmt = $this->db->prepare("SELECT id, user_agent, ip_address, browser, os, device_type, device_model FROM login_logs WHERE id IN ($in)");
            $stmt->execute($logIds);
        } catch (\PDOException $e) {
            // a database without the device columns yet
            $stmt = $this->db->prepare("SELECT id, user_agent, ip_address FROM login_logs WHERE id IN ($in)");
            $stmt->execute($logIds);
        }
        $out = [];
        foreach ($stmt->fetchAll() as $r) {
            $dev = !empty($r['browser']) || !empty($r['os'])
                ? ['browser' => $r['browser'], 'os' => $r['os'], 'device_type' => $r['device_type'], 'device_model' => $r['device_model']]
                : DeviceInfo::fromUserAgent((string) ($r['user_agent'] ?? ''));
            $out[(int) $r['id']] = $dev + ['ip_address' => $r['ip_address']];
        }
        return $out;
    }

    /**
     * What each teacher did since $since, as [teacher_id => [{type, label, title, count, at}]].
     * Repetitive work (marking, page edits, questions) is grouped per day and per piece of work,
     * so one marking session reads "Marked 24 scripts - Topic test" rather than 24 lines. Also read
     * by a teacher's own usage chart (Teacher\UsageController).
     */
    public function teacherActivities(array $teacherIds, string $since): array
    {
        if (!$teacherIds) {
            return [];
        }
        $in = implode(',', array_fill(0, count($teacherIds), '?'));
        // each source: SQL returning teacher_id, type, title, count, at - with ? placeholders for the ids and the date
        $sources = [
            "SELECT a.teacher_id, 'assignment_created' AS type, a.title, 1 AS cnt, a.created_at AS at
             FROM assignments a WHERE a.deleted_at IS NULL AND a.teacher_id IN ($in) AND a.created_at >= ?",
            "SELECT a.teacher_id, 'assignment_published', a.title, 1, a.published_at
             FROM assignments a WHERE a.deleted_at IS NULL AND a.teacher_id IN ($in) AND a.published_at >= ? AND a.published_at > a.created_at + INTERVAL 1 MINUTE",
            "SELECT s.marked_by, 'scripts_marked', a.title, COUNT(*), MAX(s.marked_at)
             FROM assignment_submissions s INNER JOIN assignments a ON a.id = s.assignment_id
             WHERE s.marked_by IN ($in) AND s.marked_at >= ?
             GROUP BY s.marked_by, s.assignment_id, a.title, DATE(s.marked_at)",
            // an eNote and its linked copies in other classes count as one, "for 3 classes"
            "SELECT e.teacher_id, 'enote_created', MIN(e.title), COUNT(*), MAX(e.created_at)
             FROM enote_topics e WHERE e.deleted_at IS NULL AND e.teacher_id IN ($in) AND e.created_at >= ?
             GROUP BY e.teacher_id, COALESCE(e.content_group_id, e.id), DATE(e.created_at)",
            "SELECT e.teacher_id, 'enote_published', MIN(e.title), COUNT(*), MAX(e.published_at)
             FROM enote_topics e WHERE e.deleted_at IS NULL AND e.teacher_id IN ($in) AND e.published_at >= ?
             GROUP BY e.teacher_id, COALESCE(e.content_group_id, e.id), DATE(e.published_at)",
            "SELECT h.teacher_id, 'enote_pages_edited', t.title, COUNT(*), MAX(h.created_at)
             FROM enote_page_history h INNER JOIN enote_topics t ON t.id = h.topic_id
             WHERE h.teacher_id IN ($in) AND h.created_at >= ?
             GROUP BY h.teacher_id, h.topic_id, t.title, DATE(h.created_at)",
            "SELECT v.teacher_id, 'video_added', v.title, 1, v.created_at
             FROM videos v WHERE v.deleted_at IS NULL AND v.teacher_id IN ($in) AND v.created_at >= ?",
            "SELECT lc.created_by, 'live_class_scheduled', lc.title, 1, lc.created_at
             FROM live_classes lc WHERE lc.deleted_at IS NULL AND lc.created_by IN ($in) AND lc.created_at >= ?",
            "SELECT vla.teacher_id, 'virtual_lab_set', x.title, 1, vla.created_at
             FROM virtual_lab_assignments vla LEFT JOIN virtual_lab_experiments x ON x.id = vla.experiment_id
             WHERE vla.deleted_at IS NULL AND vla.teacher_id IN ($in) AND vla.created_at >= ?",
            "SELECT at.graded_by, 'virtual_lab_graded', x.title, COUNT(*), MAX(at.graded_at)
             FROM virtual_lab_attempts at
             LEFT JOIN virtual_lab_assignments vla ON vla.id = at.assignment_id
             LEFT JOIN virtual_lab_experiments x ON x.id = vla.experiment_id
             WHERE at.graded_by IN ($in) AND at.graded_at >= ?
             GROUP BY at.graded_by, x.title, DATE(at.graded_at)",
            "SELECT q.teacher_id, 'live_quiz_run', a.title, 1, q.created_at
             FROM live_quizzes q LEFT JOIN assignments a ON a.id = q.assignment_id
             WHERE q.teacher_id IN ($in) AND q.created_at >= ?",
            "SELECT ib.uploader_id, 'questions_added', NULL, COUNT(*), MAX(ib.created_at)
             FROM item_bank_questions ib
             WHERE ib.deleted_at IS NULL AND ib.uploader_role = 'teacher' AND ib.uploader_id IN ($in) AND ib.created_at >= ?
             GROUP BY ib.uploader_id, DATE(ib.created_at)",
        ];

        return $this->runSources($sources, $teacherIds, $since);
    }

    /**
     * Runs activity sources (SQL returning actor id, type, title, count, at, with ? for the ids and
     * the date) and groups the rows by actor.
     *
     * @param string[] $sources
     * @param int[] $ids
     * @return array<int, array<int, array{type: string, label: string, title: ?string, count: int, at: string}>>
     */
    private function runSources(array $sources, array $ids, string $since): array
    {
        $out = [];
        foreach ($sources as $sql) {
            try {
                $stmt = $this->db->prepare($sql);
                $stmt->execute([...$ids, $since]);
            } catch (\PDOException $e) {
                // one source that does not match this database (an older schema) must not hide the rest
                error_log('Staff activity source failed: ' . $e->getMessage());
                continue;
            }
            foreach ($stmt->fetchAll(\PDO::FETCH_NUM) as [$id, $type, $title, $count, $at]) {
                if (!$at) {
                    continue;
                }
                $out[(int) $id][] = [
                    'type' => $type,
                    'label' => $this->label($type, (int) $count),
                    'title' => $title,
                    'count' => (int) $count,
                    'at' => $at,
                ];
            }
        }
        return $out;
    }

    /**
     * What each HOD did: their HOD work (approvals, enrolments, notices, answers, report cards,
     * awards, attendance, uploads, chat) and, for an HOD who also teaches, their teaching work.
     * HOD pages record the HOD by their HOD id or, where they act through the teacher side, by the
     * teacher id behind it - so both are matched, only on rows marked as done by an HOD (approvals,
     * which carry no role, only on the HOD id). An HOD with nothing recorded "only viewed".
     */
    private function withHodActivities(array $hods, string $since): array
    {
        if (!$hods) {
            return [];
        }
        // actor id -> HOD; an HOD's own id wins over another HOD's teacher id
        $owner = [];
        foreach ($hods as $h) {
            if ($h['teacher_id']) {
                $owner[$h['teacher_id']] ??= $h['id'];
            }
        }
        foreach ($hods as $h) {
            $owner[$h['id']] = $h['id'];
        }
        $actorIds = array_keys($owner);
        $hodIds = array_column($hods, 'id');
        $in = implode(',', array_fill(0, count($actorIds), '?'));
        $inHod = implode(',', array_fill(0, count($hodIds), '?'));

        $roleSources = [
            "SELECT performed_by_id, CONCAT('enrolment_', action), NULL, COUNT(*), MAX(created_at)
             FROM enrollment_audit_log WHERE performed_by_role = 'hod' AND performed_by_id IN ($in) AND created_at >= ?
             GROUP BY performed_by_id, action, DATE(created_at)",
            "SELECT author_id, 'notice_posted', title, 1, created_at
             FROM notices WHERE author_role = 'hod' AND deleted_at IS NULL AND author_id IN ($in) AND created_at >= ?",
            "SELECT author_id, 'questions_answered', NULL, COUNT(*), MAX(created_at)
             FROM enote_answers WHERE author_role = 'hod' AND deleted_at IS NULL AND author_id IN ($in) AND created_at >= ?
             GROUP BY author_id, DATE(created_at)",
            "SELECT sender_id, 'chat_sent', NULL, COUNT(*), MAX(created_at)
             FROM chat_messages WHERE sender_role = 'hod' AND sender_id IN ($in) AND created_at >= ?
             GROUP BY sender_id, DATE(created_at)",
            "SELECT created_by, 'physical_assessment_created', title, 1, created_at
             FROM physical_assessments WHERE created_by_role = 'hod' AND deleted_at IS NULL AND created_by IN ($in) AND created_at >= ?",
            "SELECT generated_by, 'report_cards_generated', NULL, COUNT(*), MAX(generated_at)
             FROM report_cards WHERE generated_by_role = 'hod' AND generated_by IN ($in) AND generated_at >= ?
             GROUP BY generated_by, DATE(generated_at)",
            "SELECT actor_id, 'awards_changed', NULL, COUNT(*), MAX(created_at)
             FROM student_award_audit WHERE actor_role = 'hod' AND actor_id IN ($in) AND created_at >= ?
             GROUP BY actor_id, DATE(created_at)",
            "SELECT updated_by, 'attendance_updated', NULL, COUNT(*), MAX(updated_at)
             FROM student_attendance WHERE updated_by_role = 'hod' AND updated_by IN ($in) AND updated_at >= ?
             GROUP BY updated_by, DATE(updated_at)",
            "SELECT uploader_id, 'video_added', title, 1, created_at
             FROM videos WHERE uploader_role = 'hod' AND deleted_at IS NULL AND uploader_id IN ($in) AND created_at >= ?",
            "SELECT uploader_id, 'questions_added', NULL, COUNT(*), MAX(created_at)
             FROM item_bank_questions WHERE uploader_role = 'hod' AND deleted_at IS NULL AND uploader_id IN ($in) AND created_at >= ?
             GROUP BY uploader_id, DATE(created_at)",
            "SELECT uploader_id, 'book_uploaded', title, 1, created_at
             FROM library_books WHERE uploader_role = 'hod' AND deleted_at IS NULL AND uploader_id IN ($in) AND created_at >= ?",
            "SELECT uploaded_by, 'sba_uploaded', NULL, COUNT(*), MAX(created_at)
             FROM sba_evidence WHERE uploaded_by_role = 'hod' AND deleted_at IS NULL AND uploaded_by IN ($in) AND created_at >= ?
             GROUP BY uploaded_by, DATE(created_at)",
        ];
        // approvals are made on the HOD pages and record the HOD's own id
        $approvalSources = [
            "SELECT approved_by, 'book_approved', title, 1, approved_at
             FROM library_books WHERE deleted_at IS NULL AND approved_by IN ($inHod) AND approved_at >= ?",
            "SELECT approved_by, 'notes_approved', title, 1, approved_at
             FROM notes WHERE deleted_at IS NULL AND approved_by IN ($inHod) AND approved_at >= ?",
            "SELECT approved_by, 'questions_approved', NULL, COUNT(*), MAX(approved_at)
             FROM item_bank_questions WHERE deleted_at IS NULL AND approved_by IN ($inHod) AND approved_at >= ?
             GROUP BY approved_by, DATE(approved_at)",
        ];

        $byHod = [];
        foreach ($this->runSources($roleSources, $actorIds, $since) as $actor => $list) {
            foreach ($list as $a) {
                $byHod[$owner[$actor] ?? $actor][] = $a;
            }
        }
        foreach ($this->runSources($approvalSources, $hodIds, $since) as $hodId => $list) {
            foreach ($list as $a) {
                $byHod[$hodId][] = $a;
            }
        }
        // their teaching, for an HOD who also teaches
        $teacherOf = [];
        foreach ($hods as $h) {
            if ($h['teacher_id']) {
                $teacherOf[$h['teacher_id']] = $h['id'];
            }
        }
        foreach ($this->teacherActivities(array_keys($teacherOf), $since) as $tid => $list) {
            foreach ($list as $a) {
                $byHod[$teacherOf[$tid]][] = $a;
            }
        }

        foreach ($hods as &$h) {
            $list = $byHod[$h['id']] ?? [];
            usort($list, fn ($a, $b) => strcmp($b['at'], $a['at']));
            $h['activity_count'] = array_sum(array_column($list, 'count'));
            $h['activities'] = array_slice($list, 0, self::MAX_ACTIVITIES);
            // signed in but changed nothing that is recorded
            $h['viewed_only'] = $h['activity_count'] === 0;
        }
        unset($h);
        return $hods;
    }

    private function label(string $type, int $n): string
    {
        $s = fn (string $one, string $many) => $n === 1 ? $one : str_replace('{n}', (string) $n, $many);
        return match ($type) {
            'assignment_created' => 'Created an assessment',
            'assignment_published' => 'Published an assessment',
            'scripts_marked' => $s('Marked 1 script', 'Marked {n} scripts'),
            'enote_created' => $s('Created an eNote', 'Created an eNote for {n} classes'),
            'enote_published' => $s('Published an eNote', 'Published an eNote in {n} classes'),
            'enote_pages_edited' => $s('Edited an eNote page', 'Made {n} eNote page edits'),
            'video_added' => 'Added a video',
            'live_class_scheduled' => 'Scheduled a live class',
            'virtual_lab_set' => 'Set a virtual lab',
            'virtual_lab_graded' => $s('Graded 1 virtual lab attempt', 'Graded {n} virtual lab attempts'),
            'live_quiz_run' => 'Ran a live quiz',
            'questions_added' => $s('Added 1 question to the item bank', 'Added {n} questions to the item bank'),
            'enrolment_department_de_enroll' => $s('De-enrolled 1 student from the department', 'De-enrolled {n} students from the department'),
            'enrolment_teacher_de_enroll' => $s('Removed 1 student from a teacher', 'Removed {n} students from a teacher'),
            'enrolment_teacher_re_enroll' => $s('Re-enrolled 1 student with a teacher', 'Re-enrolled {n} students with a teacher'),
            'notice_posted' => 'Posted a notice',
            'questions_answered' => $s('Answered 1 student question', 'Answered {n} student questions'),
            'chat_sent' => $s('Sent 1 chat message', 'Sent {n} chat messages'),
            'physical_assessment_created' => 'Created a practical assessment',
            'report_cards_generated' => $s('Generated 1 report card', 'Generated {n} report cards'),
            'awards_changed' => $s('Changed 1 student award', 'Changed {n} student awards'),
            'attendance_updated' => $s('Updated attendance for 1 student', 'Updated attendance for {n} students'),
            'book_uploaded' => 'Uploaded a library book',
            'sba_uploaded' => $s('Uploaded 1 SBA evidence file', 'Uploaded {n} SBA evidence files'),
            'test_submitted' => 'Submitted an assessment',
            'test_started' => 'Started an assessment',
            'enote_pages_read' => $s('Read 1 eNote page', 'Read {n} eNote pages'),
            'enote_note' => $s('Wrote a note on an eNote page', 'Wrote notes on {n} eNote pages'),
            'enote_highlight' => $s('Highlighted 1 passage', 'Highlighted {n} passages'),
            'enote_bookmark' => $s('Bookmarked an eNote page', 'Bookmarked {n} eNote pages'),
            'enote_question' => $s('Asked a question on an eNote', 'Asked {n} questions on an eNote'),
            'enote_explanation' => $s('Explained a page in their own words', 'Explained {n} pages in their own words'),
            'notes_read' => 'Read notes',
            'book_read' => 'Read a library book',
            'book_note' => $s('Wrote a note in a book', 'Wrote {n} notes in a book'),
            'book_bookmark' => $s('Bookmarked a book page', 'Bookmarked {n} book pages'),
            'video_watched' => 'Watched a video',
            'live_class_joined' => 'Joined a live class',
            'live_quiz_played' => 'Played a live quiz',
            'lab_started' => 'Started a virtual lab',
            'lab_submitted' => 'Submitted a virtual lab',
            'ict_practice' => 'Did an ICT lab practical',
            'item_bank_practice' => $s('Practised 1 item bank question', 'Practised {n} item bank questions'),
            'revision_cards' => $s('Revised 1 card', 'Revised {n} cards'),
            'notes_helper' => $s('Asked the notes helper 1 question', 'Asked the notes helper {n} questions'),
            'book_approved' => 'Approved a library book',
            'notes_approved' => 'Approved notes',
            'questions_approved' => $s('Approved 1 item bank question', 'Approved {n} item bank questions'),
            default => str_starts_with($type, 'enrolment_') ? $s('Changed 1 enrolment', 'Changed {n} enrolments') : $type,
        };
    }

    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
