<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Controllers\Student\ENoteController as StudentENoteController;
use eSpace\App\Services\NotificationService;

/**
 * ICT Lab: hands-on computer activities run step by step (the activities and their steps live in
 * the frontend - see components/ictlab/activities.ts). Here: teachers linking a step to one of
 * their eNotes, students' finished attempts, and each student's best score per activity and level;
 * a class's results for its teacher, and the practicals a teacher sets a class.
 */
class IctLabController extends Controller
{
    private const LEVELS = ['simple', 'intermediate', 'advanced'];

    private function db()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private static function validKey(string $key): bool
    {
        return (bool) preg_match('/^[a-z0-9][a-z0-9_-]{0,59}$/', $key);
    }

    /** The teacher acting: a teacher, or a HOD through the teacher account they teach with. */
    private function teacherId(): ?int
    {
        $role = $this->getCurrentUserRole();
        if ($role === 'teacher') return $this->getCurrentUserId();
        if ($role === 'hod') return isset($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        return null;
    }

    /** A link row as the app shows it: "Read about this" with the topic and page. */
    private static function linkOut(array $r): array
    {
        return [
            'activity_key' => $r['activity_key'],
            'step_key' => $r['step_key'],
            'enote_topic_id' => (int) $r['enote_topic_id'],
            'enote_page_id' => $r['enote_page_id'] !== null ? (int) $r['enote_page_id'] : null,
            'topic_title' => $r['topic_title'],
            'page_number' => $r['page_number'] !== null ? (int) $r['page_number'] : null,
            'page_title' => $r['page_title'] ?? null,
        ];
    }

    private const LINK_SELECT = "SELECT l.activity_key, l.step_key, l.enote_topic_id, l.enote_page_id, et.title AS topic_title, ep.title AS page_title,
               (SELECT COUNT(*) FROM enote_pages p2 WHERE p2.topic_id = et.id AND p2.deleted_at IS NULL AND p2.is_active = 1
                  AND p2.order_number <= ep.order_number) AS page_number
        FROM ict_lab_step_links l
        JOIN enote_topics et ON et.id = l.enote_topic_id AND et.deleted_at IS NULL
        LEFT JOIN enote_pages ep ON ep.id = l.enote_page_id AND ep.deleted_at IS NULL";

    /**
     * GET /student/ict-lab - this student's best scores, and the notes their teachers linked
     * (only from eNotes they can read).
     */
    public function studentIndex(): void
    {
        if ($this->getCurrentUserRole() !== 'student') {
            $this->forbidden();
            return;
        }
        $studentId = (int) $this->getCurrentUserId();
        $db = $this->db();

        $stmt = $db->prepare(
            "SELECT activity_key, level, MAX(score) AS best, COUNT(*) AS attempts, MAX(completed_at) AS last_at,
                    MAX(CASE WHEN activity_key LIKE 'typing-%' AND duration_seconds > 0 THEN ROUND(steps_total * 12 / duration_seconds) END) AS best_wpm
             FROM ict_lab_attempts WHERE student_id = ? GROUP BY activity_key, level"
        );
        $stmt->execute([$studentId]);
        $progress = array_map(fn ($r) => [
            'activity_key' => $r['activity_key'],
            'level' => $r['level'],
            'best' => (int) $r['best'],
            'attempts' => (int) $r['attempts'],
            'last_at' => $r['last_at'],
            'best_wpm' => $r['best_wpm'] === null ? null : (int) $r['best_wpm'],
        ], $stmt->fetchAll());

        $stmt = $db->prepare(self::LINK_SELECT . " WHERE " . StudentENoteController::visibilityClause() . " ORDER BY l.updated_at DESC");
        $stmt->execute(['student_id' => $studentId, 'student_id_te' => $studentId]);
        $links = array_map([self::class, 'linkOut'], $stmt->fetchAll());

        $this->success(['progress' => $progress, 'links' => $links, 'tasks' => $this->studentTasks($studentId)]);
    }

    /**
     * POST /student/ict-lab/attempts  { activity_key, level, steps_total, mistakes, hints_used, duration_seconds }
     * The score: 100, less 5 for each mistake and 3 for each hint used. A typing lesson
     * (activity_key typing-...) sends the characters typed as steps_total and the wrong keys as
     * mistakes; its score is the accuracy, and its speed (words a minute) is worked out from
     * steps_total and duration_seconds.
     */
    public function saveAttempt(): void
    {
        if ($this->getCurrentUserRole() !== 'student') {
            $this->forbidden();
            return;
        }
        $activity = (string) ($this->input('activity_key') ?? '');
        $level = (string) ($this->input('level') ?? '');
        if (!self::validKey($activity) || !in_array($level, self::LEVELS, true)) {
            $this->validationError(['activity_key' => 'Unknown activity or level']);
            return;
        }
        $mistakes = max(0, min(999, (int) $this->input('mistakes', 0)));
        $hints = max(0, min(999, (int) $this->input('hints_used', 0)));
        $steps = max(0, min(999, (int) $this->input('steps_total', 0)));
        $seconds = max(0, min(86400, (int) $this->input('duration_seconds', 0)));
        $score = max(0, 100 - $mistakes * 5 - $hints * 3);
        if (str_starts_with($activity, 'typing-')) {
            // no faster than 200 words a minute - a faster "attempt" is not real typing
            $seconds = max($seconds, (int) ceil($steps * 12 / 200));
            $score = $steps + $mistakes > 0 ? (int) round(100 * $steps / ($steps + $mistakes)) : 0;
        }

        $stmt = $this->db()->prepare(
            "INSERT INTO ict_lab_attempts (student_id, activity_key, level, steps_total, mistakes, hints_used, duration_seconds, score, completed_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())"
        );
        $stmt->execute([(int) $this->getCurrentUserId(), $activity, $level, $steps, $mistakes, $hints, $seconds, $score]);
        $this->success(['score' => $score]);
    }

    /**
     * GET /teacher/ict-lab (and /hod/ict-lab) - the steps this teacher has linked to their eNotes.
     */
    public function teacherIndex(): void
    {
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $stmt = $this->db()->prepare(self::LINK_SELECT . " WHERE l.teacher_id = ? ORDER BY l.activity_key, l.step_key");
        $stmt->execute([$teacherId]);
        $this->success(['links' => array_map([self::class, 'linkOut'], $stmt->fetchAll())]);
    }

    /**
     * PUT /teacher/ict-lab/links  { activity_key, step_key, enote_topic_id, enote_page_id? }
     * Link a step to one of the teacher's own eNotes (replaces their earlier link for that step).
     */
    public function saveLink(): void
    {
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $activity = (string) ($this->input('activity_key') ?? '');
        $step = (string) ($this->input('step_key') ?? '');
        $topicId = (int) $this->input('enote_topic_id', 0);
        $pageId = $this->input('enote_page_id') ? (int) $this->input('enote_page_id') : null;
        if (!self::validKey($activity) || !self::validKey($step) || $topicId <= 0) {
            $this->validationError(['enote_topic_id' => 'Choose one of your eNotes']);
            return;
        }
        $db = $this->db();
        $stmt = $db->prepare("SELECT id FROM enote_topics WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL");
        $stmt->execute([$topicId, $teacherId]);
        if (!$stmt->fetchColumn()) {
            $this->validationError(['enote_topic_id' => 'That eNote is not one of yours']);
            return;
        }
        if ($pageId !== null) {
            $stmt = $db->prepare("SELECT id FROM enote_pages WHERE id = ? AND topic_id = ? AND deleted_at IS NULL");
            $stmt->execute([$pageId, $topicId]);
            if (!$stmt->fetchColumn()) {
                $this->validationError(['enote_page_id' => 'That page is not in this eNote']);
                return;
            }
        }
        $stmt = $db->prepare(
            "INSERT INTO ict_lab_step_links (teacher_id, activity_key, step_key, enote_topic_id, enote_page_id)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE enote_topic_id = VALUES(enote_topic_id), enote_page_id = VALUES(enote_page_id), updated_at = NOW()"
        );
        $stmt->execute([$teacherId, $activity, $step, $topicId, $pageId]);

        $stmt = $db->prepare(self::LINK_SELECT . " WHERE l.teacher_id = ? AND l.activity_key = ? AND l.step_key = ?");
        $stmt->execute([$teacherId, $activity, $step]);
        $row = $stmt->fetch();
        $this->success(['link' => $row ? self::linkOut($row) : null], 'Linked');
    }

    /**
     * DELETE /teacher/ict-lab/links/{activity}/{step}
     */
    public function deleteLink($activity, $step): void
    {
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $stmt = $this->db()->prepare("DELETE FROM ict_lab_step_links WHERE teacher_id = ? AND activity_key = ? AND step_key = ?");
        $stmt->execute([$teacherId, (string) $activity, (string) $step]);
        $this->success([], 'Link removed');
    }

    // ---- Class results and practicals set by the teacher ----

    /**
     * The practicals a teacher can follow up and set - the ICT Lab front page's cards - and how a
     * learner's attempts count for each: one activity key (`key`, by level when `levels`), or a
     * practical in parts (`prefix` + `parts`, done when every part is done).
     */
    private const PRACTICALS = [
        'rules' => ['title' => 'Computer lab rules', 'key' => 'lab-rules'],
        'boot' => ['title' => 'Start-up, BIOS and shut-down', 'prefix' => 'boot-', 'parts' => 5],
        'showroom' => ['title' => 'Parts and devices showroom (Test yourself)', 'key' => 'parts-quiz'],
        'computer-parts' => ['title' => 'Parts of a computer', 'key' => 'computer-parts', 'levels' => true],
        'journey' => ['title' => 'Inside a computer: the journey of one key', 'key' => 'journey'],
        'connect' => ['title' => 'Connecting a computer', 'key' => 'connect', 'levels' => true],
        'assembly' => ['title' => 'Assembling a computer', 'key' => 'assembly', 'levels' => true],
        'cleaning' => ['title' => 'Cleaning a dusty computer', 'key' => 'cleaning', 'levels' => true],
        'troubleshoot' => ['title' => 'Troubleshooting', 'key' => 'troubleshoot', 'levels' => true],
        'hazards' => ['title' => 'Spot the hazard', 'key' => 'hazards'],
        'laptop-repair' => ['title' => 'Laptop repair: "No bootable device"', 'prefix' => 'laptop-', 'parts' => 6],
        'online-safety' => ['title' => 'Is it safe online?', 'prefix' => 'safety-', 'parts' => 3],
    ];

    /**
     * How a learner stands on one practical, from their attempts (activity_key, level, score,
     * completed_at): the best score, and for a practical in parts how many are done. Only attempts
     * at `$level` (for a practical with levels) and from `$since` on count, when given.
     * @return array{best: ?int, parts: int, done: bool, last_at: ?string}
     */
    private static function standing(string $practical, array $attempts, ?string $level = null, ?string $since = null): array
    {
        $p = self::PRACTICALS[$practical];
        $best = null;
        $parts = [];
        $last = null;
        foreach ($attempts as $a) {
            if ($since !== null && $a['completed_at'] < $since) continue;
            if (isset($p['prefix'])) {
                if (!str_starts_with($a['activity_key'], $p['prefix'])) continue;
                $part = $a['activity_key'];
                $parts[$part] = max($parts[$part] ?? 0, (int) $a['score']);
            } else {
                if ($a['activity_key'] !== $p['key']) continue;
                if ($level !== null && !empty($p['levels']) && $a['level'] !== $level) continue;
                $best = max($best ?? 0, (int) $a['score']);
            }
            if ($last === null || $a['completed_at'] > $last) $last = $a['completed_at'];
        }
        if (isset($p['prefix'])) {
            $done = count($parts) >= $p['parts'];
            return ['best' => $done ? (int) round(array_sum($parts) / count($parts)) : null, 'parts' => count($parts), 'done' => $done, 'last_at' => $last];
        }
        return ['best' => $best, 'parts' => $best === null ? 0 : 1, 'done' => $best !== null, 'last_at' => $last];
    }

    /** The department the teacher (or HOD) is following up. */
    private function labDepartmentId(): ?int
    {
        if ($this->getCurrentUserRole() === 'hod') {
            $stmt = $this->db()->prepare("SELECT department_id FROM hods WHERE id = ? AND deleted_at IS NULL");
            $stmt->execute([(int) $this->getCurrentUserId()]);
            $id = (int) ($stmt->fetchColumn() ?: 0);
            return $id ?: null;
        }
        return $this->getActiveDepartmentId();
    }

    /**
     * The class streams a teacher follows up: the ones they teach this term (class_subjects),
     * else every stream with learners in their department - the same list as their Classes page.
     * A HOD sees every stream in the department.
     * @return array<int, array{id: int, name: string, learners: int}>
     */
    private function labClasses(int $departmentId): array
    {
        $db = $this->db();
        $assigned = [];
        $teacherId = $this->getCurrentUserRole() === 'teacher' ? $this->teacherId() : null;
        if ($teacherId) {
            $stmt = $db->prepare(
                "SELECT DISTINCT cs.class_id FROM class_subjects cs
                 JOIN terms t ON t.id = cs.term_id AND t.is_current = 1 AND t.deleted_at IS NULL
                 WHERE cs.teacher_id = ?"
            );
            $stmt->execute([$teacherId]);
            $assigned = array_map('intval', array_column($stmt->fetchAll(), 'class_id'));
        }
        $sql = "SELECT c.id, TRIM(CONCAT(c.name, ' ', COALESCE(c.stream_name, ''))) AS name, COUNT(DISTINCT sde.student_id) AS learners
                FROM classes c
                JOIN student_department_enrollments sde ON sde.class_id = c.id AND sde.department_id = ?
                     AND sde.deleted_at IS NULL AND sde.status = 'active'
                WHERE c.deleted_at IS NULL";
        $params = [$departmentId];
        if ($assigned) {
            $sql .= " AND c.id IN (" . implode(',', array_fill(0, count($assigned), '?')) . ")";
            $params = array_merge($params, $assigned);
        }
        $sql .= " GROUP BY c.id, c.name, c.stream_name ORDER BY c.name, c.stream_name";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return array_map(fn ($r) => ['id' => (int) $r['id'], 'name' => $r['name'], 'learners' => (int) $r['learners']], $stmt->fetchAll());
    }

    /** The learners in a class stream, in a department. */
    private function classLearners(int $classId, int $departmentId): array
    {
        $stmt = $this->db()->prepare(
            "SELECT DISTINCT st.id, st.first_name, st.last_name, st.admission_number
             FROM student_department_enrollments sde
             JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL
             WHERE sde.class_id = ? AND sde.department_id = ? AND sde.deleted_at IS NULL AND sde.status = 'active'
             ORDER BY st.last_name, st.first_name"
        );
        $stmt->execute([$classId, $departmentId]);
        return $stmt->fetchAll();
    }

    /** Every attempt by these learners, by learner. */
    private function attemptsOf(array $studentIds): array
    {
        if (!$studentIds) return [];
        $stmt = $this->db()->prepare(
            "SELECT student_id, activity_key, level, score, completed_at FROM ict_lab_attempts
             WHERE student_id IN (" . implode(',', array_fill(0, count($studentIds), '?')) . ")"
        );
        $stmt->execute(array_values($studentIds));
        $out = [];
        foreach ($stmt->fetchAll() as $r) $out[(int) $r['student_id']][] = $r;
        return $out;
    }

    private static function taskOut(array $t): array
    {
        return [
            'id' => (int) $t['id'],
            'practical' => $t['practical'],
            'title' => self::PRACTICALS[$t['practical']]['title'] ?? $t['practical'],
            'level' => $t['level'],
            'has_levels' => !empty(self::PRACTICALS[$t['practical']]['levels']),
            'due_at' => $t['due_at'],
            'note' => $t['note'],
            'created_at' => $t['created_at'],
        ];
    }

    /**
     * GET /teacher/ict-lab/results?class_id= (and /hod/ict-lab/results)
     * A class's learners and how far each has got with every practical, and the practicals set
     * for the class with who has done them.
     */
    public function results(): void
    {
        $role = $this->getCurrentUserRole();
        if ($role !== 'teacher' && $role !== 'hod') {
            $this->forbidden();
            return;
        }
        $departmentId = $this->labDepartmentId();
        if (!$departmentId) {
            $this->error('You are not in a department yet', 403);
            return;
        }
        $classes = $this->labClasses($departmentId);
        $classId = (int) ($this->query('class_id') ?? 0);
        if (!in_array($classId, array_column($classes, 'id'), true)) $classId = $classes[0]['id'] ?? 0;

        $practicals = [];
        foreach (self::PRACTICALS as $key => $p) {
            $practicals[] = ['key' => $key, 'title' => $p['title'], 'parts' => $p['parts'] ?? 1, 'levels' => !empty($p['levels'])];
        }
        $out = ['classes' => $classes, 'class_id' => $classId ?: null, 'practicals' => $practicals, 'learners' => [], 'tasks' => [], 'can_set' => $this->teacherId() !== null];
        if (!$classId) {
            $this->success($out);
            return;
        }

        $learners = $this->classLearners($classId, $departmentId);
        $attempts = $this->attemptsOf(array_map(fn ($l) => (int) $l['id'], $learners));

        $stmt = $this->db()->prepare(
            "SELECT t.*, TRIM(CONCAT(te.first_name, ' ', te.last_name)) AS teacher_name
             FROM ict_lab_tasks t LEFT JOIN teachers te ON te.id = t.teacher_id
             WHERE t.class_id = ? AND t.department_id = ? AND t.deleted_at IS NULL
             ORDER BY COALESCE(t.due_at, t.created_at) DESC"
        );
        $stmt->execute([$classId, $departmentId]);
        $tasks = $stmt->fetchAll();
        $mine = $this->teacherId();

        foreach ($learners as $l) {
            $sid = (int) $l['id'];
            $results = [];
            foreach (array_keys(self::PRACTICALS) as $key) {
                $s = self::standing($key, $attempts[$sid] ?? []);
                if ($s['parts'] > 0) $results[$key] = $s;
            }
            $out['learners'][] = [
                'id' => $sid,
                'name' => trim($l['first_name'] . ' ' . $l['last_name']),
                'admission_number' => $l['admission_number'],
                'results' => (object) $results,
            ];
        }
        foreach ($tasks as $t) {
            if (!isset(self::PRACTICALS[$t['practical']])) continue;
            $by = [];
            $done = 0;
            foreach ($learners as $l) {
                $s = self::standing($t['practical'], $attempts[(int) $l['id']] ?? [], $t['level'], $t['created_at']);
                $by[(int) $l['id']] = $s;
                if ($s['done']) $done++;
            }
            $out['tasks'][] = self::taskOut($t) + [
                'teacher_name' => $t['teacher_name'],
                'mine' => $mine !== null && (int) $t['teacher_id'] === $mine,
                'done' => $done,
                'total' => count($learners),
                'by_student' => (object) $by,
            ];
        }
        $this->success($out);
    }

    /**
     * POST /teacher/ict-lab/tasks  { practical, level, class_ids[], due_at?, note? }
     * Set a practical for one or more of the teacher's classes; every learner in them is told.
     */
    public function createTask(): void
    {
        $teacherId = $this->teacherId();
        $departmentId = $this->labDepartmentId();
        if (!$teacherId || !$departmentId) {
            $this->forbidden('Only a teacher can set a practical');
            return;
        }
        $practical = (string) ($this->input('practical') ?? '');
        $level = (string) ($this->input('level') ?? 'simple');
        if (!isset(self::PRACTICALS[$practical])) {
            $this->validationError(['practical' => 'Choose a practical']);
            return;
        }
        if (empty(self::PRACTICALS[$practical]['levels'])) $level = 'simple';
        if (!in_array($level, self::LEVELS, true)) {
            $this->validationError(['level' => 'Choose a level']);
            return;
        }
        $mineIds = array_column($this->labClasses($departmentId), 'id');
        $classIds = array_values(array_unique(array_map('intval', (array) ($this->input('class_ids') ?? []))));
        $classIds = array_values(array_filter($classIds, fn ($id) => in_array($id, $mineIds, true)));
        if (!$classIds) {
            $this->validationError(['class_ids' => 'Choose at least one of your classes']);
            return;
        }
        $due = trim((string) ($this->input('due_at') ?? ''));
        $dueAt = null;
        if ($due !== '') {
            $ts = strtotime($due);
            if ($ts === false) {
                $this->validationError(['due_at' => 'That date is not right']);
                return;
            }
            $dueAt = date('Y-m-d H:i:s', $ts);
        }
        $note = mb_substr(trim((string) ($this->input('note') ?? '')), 0, 500) ?: null;

        $db = $this->db();
        $insert = $db->prepare(
            "INSERT INTO ict_lab_tasks (teacher_id, department_id, class_id, practical, level, due_at, note) VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $title = self::PRACTICALS[$practical]['title'];
        $when = $dueAt ? ' by ' . date('D j M', strtotime($dueAt)) : '';
        $levelText = !empty(self::PRACTICALS[$practical]['levels']) ? ' (' . ucfirst($level) . ')' : '';
        $notify = new NotificationService();
        $told = [];
        foreach ($classIds as $cid) {
            $insert->execute([$teacherId, $departmentId, $cid, $practical, $level, $dueAt, $note]);
            $taskId = (int) $db->lastInsertId();
            foreach ($this->classLearners($cid, $departmentId) as $l) {
                $sid = (int) $l['id'];
                if (isset($told[$sid])) continue;
                $told[$sid] = true;
                try {
                    $notify->notify($sid, 'student', 'ict_lab_task', 'New ICT Lab practical', 'Do "' . $title . '"' . $levelText . ' in the ICT Lab' . $when . '.', ['task_id' => $taskId, 'practical' => $practical, 'level' => $level]);
                } catch (\Throwable $e) {
                    error_log('ICT Lab task notification: ' . $e->getMessage());
                }
            }
        }
        $this->success(['learners_told' => count($told)], 'Practical set');
    }

    /**
     * DELETE /teacher/ict-lab/tasks/{id} - the teacher's own only.
     */
    public function deleteTask($id): void
    {
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $stmt = $this->db()->prepare("UPDATE ict_lab_tasks SET deleted_at = NOW() WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL");
        $stmt->execute([(int) $id, $teacherId]);
        if (!$stmt->rowCount()) {
            $this->notFound('Practical not found');
            return;
        }
        $this->success([], 'Practical removed');
    }

    /**
     * The practicals set for a student's classes that are still current (due in the last two
     * weeks or later, or set in the last two months with no date), with where they stand on each.
     */
    private function studentTasks(int $studentId): array
    {
        $stmt = $this->db()->prepare(
            "SELECT t.*, TRIM(CONCAT(te.first_name, ' ', te.last_name)) AS teacher_name
             FROM ict_lab_tasks t
             LEFT JOIN teachers te ON te.id = t.teacher_id
             WHERE t.deleted_at IS NULL
               AND EXISTS (SELECT 1 FROM student_department_enrollments sde
                           WHERE sde.student_id = ? AND sde.class_id = t.class_id AND sde.department_id = t.department_id
                             AND sde.deleted_at IS NULL AND sde.status = 'active')
               AND (t.due_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) OR (t.due_at IS NULL AND t.created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY)))
             ORDER BY t.due_at IS NULL, t.due_at, t.created_at DESC"
        );
        $stmt->execute([$studentId]);
        $rows = $stmt->fetchAll();
        if (!$rows) return [];
        $attempts = $this->attemptsOf([$studentId])[$studentId] ?? [];
        $out = [];
        foreach ($rows as $t) {
            if (!isset(self::PRACTICALS[$t['practical']])) continue;
            $out[] = self::taskOut($t) + ['teacher_name' => $t['teacher_name'], 'standing' => self::standing($t['practical'], $attempts, $t['level'], $t['created_at'])];
        }
        return $out;
    }
}
