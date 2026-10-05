<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\ClassHealthService;

/**
 * Noticeboard - school notices with read receipts, for every role (the same routes under
 * /student, /teacher, /hod and /admin).
 *
 * Who sees a notice: everyone; students; staff (teachers, HODs, admins); one class stream; or all
 * streams of a class level. Who may post: admins and HODs to any audience, teachers to the classes
 * they teach. Opening a notice marks it read; its author (and admins) see how many of its audience
 * have read it and, for a class, who hasn't.
 *
 * GET    /{role}/notices                 the board, unread first-ish, plus the unread count
 * GET    /{role}/notices/options         what the current user may post to
 * POST   /{role}/notices                 { title, body, audience, class_id?, class_level?, pinned?, expires_on? }
 * POST   /{role}/notices/{id}/read
 * GET    /{role}/notices/{id}/readers    read receipts (author / admin)
 * DELETE /{role}/notices/{id}            author / admin
 */
class NoticeController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    private function role(): string
    {
        $r = (string) ($_SESSION['role'] ?? '');
        return $r === 'super_admin' ? 'admin' : $r;
    }

    private function me(): int
    {
        return (int) ($_SESSION['user_id'] ?? 0);
    }

    private function isStaff(): bool
    {
        return in_array($this->role(), ['teacher', 'hod', 'admin'], true);
    }

    /** A student's class streams (enrolments and their own class) and their level names */
    private function studentClasses($db, int $studentId): array
    {
        $stmt = $db->prepare(
            "SELECT DISTINCT c.id, c.name FROM classes c
             WHERE c.id IN (
                 SELECT class_id FROM student_department_enrollments WHERE student_id = ? AND status = 'active' AND deleted_at IS NULL
                 UNION SELECT class_id FROM students WHERE id = ?
             )"
        );
        $stmt->execute([$studentId, $studentId]);
        $rows = $stmt->fetchAll();
        return [array_map(fn($r) => (int) $r['id'], $rows), array_values(array_unique(array_column($rows, 'name')))];
    }

    /** The classes a teacher may post to */
    private function teacherClasses($db): array
    {
        $teacherId = $this->role() === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : $this->me();
        $ids = $teacherId ? ClassHealthService::teacherClassIds($db, $teacherId) : [];
        if (!$ids) {
            return [];
        }
        $stmt = $db->prepare("SELECT id, name, stream_name FROM classes WHERE id IN (" . self::in($ids) . ") ORDER BY name, stream_name");
        $stmt->execute($ids);
        return $stmt->fetchAll();
    }

    /** SQL (and params) choosing the notices the current user may read */
    private function visibleSql($db): array
    {
        $role = $this->role();
        $base = "n.deleted_at IS NULL AND (n.expires_on IS NULL OR n.expires_on >= CURDATE())";
        if ($role === 'admin') {
            return [$base, []];
        }
        $mine = "(n.author_role = ? AND n.author_id = ?)";
        if ($role === 'student') {
            [$ids, $levels] = $this->studentClasses($db, $this->me());
            $parts = ["n.audience IN ('everyone','students')"];
            $params = [];
            if ($ids) {
                $parts[] = "(n.audience = 'class' AND n.class_id IN (" . self::in($ids) . "))";
                $params = array_merge($params, $ids);
            }
            if ($levels) {
                $parts[] = "(n.audience = 'level' AND n.class_level IN (" . self::in($levels) . "))";
                $params = array_merge($params, $levels);
            }
            return ["$base AND (" . implode(' OR ', $parts) . ")", $params];
        }
        return ["$base AND (n.audience IN ('everyone','staff') OR $mine)", [$role, $this->me()]];
    }

    private function audienceLabel(array $n): string
    {
        switch ($n['audience']) {
            case 'students': return 'All students';
            case 'staff': return 'All staff';
            case 'class': return trim(($n['class_name'] ?? '') . ($n['stream_name'] ? '-' . $n['stream_name'] : '')) ?: 'A class';
            case 'level': return ($n['class_level'] ?? '') . ' (all streams)';
            default: return 'Everyone';
        }
    }

    public function index(): void
    {
        $db = $this->getDb();
        [$where, $params] = $this->visibleSql($db);
        $stmt = $db->prepare(
            "SELECT n.*, c.name AS class_name, c.stream_name,
                    EXISTS (SELECT 1 FROM notice_reads r WHERE r.notice_id = n.id AND r.reader_role = ? AND r.reader_id = ?) AS is_read
             FROM notices n LEFT JOIN classes c ON c.id = n.class_id
             WHERE $where
             ORDER BY n.pinned DESC, n.created_at DESC
             LIMIT 100"
        );
        $stmt->execute(array_merge([$this->role(), $this->me()], $params));
        $role = $this->role();
        $out = array_map(fn($n) => [
            'id' => (int) $n['id'],
            'title' => $n['title'],
            'body' => $n['body'],
            'author_name' => $n['author_name'],
            'author_role' => $n['author_role'],
            'audience' => $n['audience'],
            'audience_label' => $this->audienceLabel($n),
            'pinned' => (bool) $n['pinned'],
            'expires_on' => $n['expires_on'],
            'created_at' => $n['created_at'],
            'is_read' => (bool) $n['is_read'],
            'mine' => $n['author_role'] === $role && (int) $n['author_id'] === $this->me(),
            'can_manage' => $role === 'admin' || ($n['author_role'] === $role && (int) $n['author_id'] === $this->me()),
        ], $stmt->fetchAll());
        $this->success([
            'notices' => $out,
            'unread' => count(array_filter($out, fn($n) => !$n['is_read'] && !$n['mine'])),
            'can_post' => $this->isStaff(),
        ]);
    }

    public function options(): void
    {
        if (!$this->isStaff()) {
            $this->forbidden();
            return;
        }
        $db = $this->getDb();
        $role = $this->role();
        $audiences = $role === 'teacher' ? ['class', 'level'] : ['everyone', 'students', 'staff', 'class', 'level'];
        if ($role === 'teacher') {
            $rows = $this->teacherClasses($db);
        } else {
            $rows = $db->query("SELECT id, name, stream_name FROM classes WHERE deleted_at IS NULL ORDER BY name, stream_name")->fetchAll();
        }
        $classes = array_map(fn($c) => ['id' => (int) $c['id'], 'label' => $c['name'] . ($c['stream_name'] ? '-' . $c['stream_name'] : ''), 'level' => $c['name']], $rows);
        $levels = array_values(array_unique(array_column($classes, 'level')));
        $this->success(['audiences' => $audiences, 'classes' => $classes, 'levels' => $levels]);
    }

    private function authorName($db): string
    {
        $role = $this->role();
        $table = ['teacher' => 'teachers', 'hod' => 'hods'][$role] ?? null;
        if ($table) {
            $stmt = $db->prepare("SELECT CONCAT(first_name, ' ', last_name) FROM `$table` WHERE id = ?");
            $stmt->execute([$this->me()]);
            $name = trim((string) $stmt->fetchColumn());
            if ($name !== '') {
                return $name;
            }
        }
        return $role === 'admin' ? 'School office' : 'Staff';
    }

    public function store(): void
    {
        if (!$this->isStaff()) {
            $this->forbidden();
            return;
        }
        $db = $this->getDb();
        $role = $this->role();
        $clean = fn(string $k, int $max) => mb_substr(trim(strip_tags((string) $this->input($k, ''))), 0, $max);
        $title = $clean('title', 150);
        $body = mb_substr(trim(strip_tags((string) $this->input('body', ''))), 0, 5000);
        $audience = (string) $this->input('audience', 'everyone');
        $classId = (int) $this->input('class_id', 0) ?: null;
        $level = $clean('class_level', 50) ?: null;
        $expires = (string) $this->input('expires_on', '');
        $expires = preg_match('/^\d{4}-\d{2}-\d{2}$/', $expires) ? $expires : null;

        $errors = [];
        if ($title === '') $errors['title'] = 'Give the notice a title';
        if ($body === '') $errors['body'] = 'Write the notice';
        $allowed = $role === 'teacher' ? ['class', 'level'] : ['everyone', 'students', 'staff', 'class', 'level'];
        if (!in_array($audience, $allowed, true)) $errors['audience'] = 'Choose who it is for';
        if ($audience === 'class' && !$classId) $errors['audience'] = 'Choose the class';
        if ($audience === 'level' && !$level) $errors['audience'] = 'Choose the class';
        if ($role === 'teacher' && !$errors) {
            $mine = $this->teacherClasses($db);
            $ok = $audience === 'class' ? in_array($classId, array_map(fn($c) => (int) $c['id'], $mine), true) : in_array($level, array_column($mine, 'name'), true);
            if (!$ok) $errors['audience'] = 'You can post to the classes you teach';
        }
        if ($errors) {
            $this->validationError($errors);
            return;
        }
        $db->prepare(
            "INSERT INTO notices (author_role, author_id, author_name, title, body, audience, class_id, class_level, pinned, expires_on)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )->execute([
            $role, $this->me(), $this->authorName($db), $title, $body, $audience,
            $audience === 'class' ? $classId : null, $audience === 'level' ? $level : null,
            $this->input('pinned', false) && $role !== 'teacher' ? 1 : 0, $expires,
        ]);
        $this->success(['id' => (int) $db->lastInsertId()], 'Notice posted');
    }

    public function read(): void
    {
        $db = $this->getDb();
        $id = (int) $this->routeParam('id');
        [$where, $params] = $this->visibleSql($db);
        $stmt = $db->prepare("SELECT 1 FROM notices n WHERE n.id = ? AND $where");
        $stmt->execute(array_merge([$id], $params));
        if (!$stmt->fetchColumn()) {
            $this->notFound('Notice not found');
            return;
        }
        $db->prepare("INSERT IGNORE INTO notice_reads (notice_id, reader_role, reader_id) VALUES (?, ?, ?)")->execute([$id, $this->role(), $this->me()]);
        $this->success([]);
    }

    private function managed($db): ?array
    {
        $stmt = $db->prepare("SELECT * FROM notices WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([(int) $this->routeParam('id')]);
        $n = $stmt->fetch();
        if (!$n || !($this->role() === 'admin' || ($n['author_role'] === $this->role() && (int) $n['author_id'] === $this->me()))) {
            $this->notFound('Notice not found');
            return null;
        }
        return $n;
    }

    public function readers(): void
    {
        $db = $this->getDb();
        $n = $this->managed($db);
        if (!$n) {
            return;
        }
        $id = (int) $n['id'];
        $count = fn(string $sql, array $p = []) => (function () use ($db, $sql, $p) { $s = $db->prepare($sql); $s->execute($p); return (int) $s->fetchColumn(); })();
        $students = "SELECT COUNT(*) FROM students WHERE deleted_at IS NULL AND is_active = 1";
        $staff = "SELECT (SELECT COUNT(*) FROM teachers WHERE deleted_at IS NULL AND is_active = 1) + (SELECT COUNT(*) FROM hods WHERE deleted_at IS NULL AND is_active = 1)";
        $notRead = [];
        switch ($n['audience']) {
            case 'students':
                $total = $count($students);
                $read = $count("SELECT COUNT(*) FROM notice_reads WHERE notice_id = ? AND reader_role = 'student'", [$id]);
                break;
            case 'staff':
                $total = $count($staff);
                $read = $count("SELECT COUNT(*) FROM notice_reads WHERE notice_id = ? AND reader_role IN ('teacher','hod')", [$id]);
                break;
            case 'class':
            case 'level':
                $classSql = $n['audience'] === 'class' ? "sde.class_id = ?" : "sde.class_id IN (SELECT id FROM classes WHERE name = ?)";
                $param = $n['audience'] === 'class' ? (int) $n['class_id'] : $n['class_level'];
                $stmt = $db->prepare(
                    "SELECT DISTINCT st.id, st.first_name, st.last_name,
                            EXISTS (SELECT 1 FROM notice_reads r WHERE r.notice_id = ? AND r.reader_role = 'student' AND r.reader_id = st.id) AS has_read
                     FROM student_department_enrollments sde INNER JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL AND st.is_active = 1
                     WHERE $classSql AND sde.status = 'active' AND sde.deleted_at IS NULL"
                );
                $stmt->execute([$id, $param]);
                $rows = $stmt->fetchAll();
                $total = count($rows);
                $read = count(array_filter($rows, fn($r) => (int) $r['has_read'] === 1));
                foreach ($rows as $r) {
                    if (!(int) $r['has_read']) {
                        $notRead[] = ['id' => (int) $r['id'], 'name' => trim($r['first_name'] . ' ' . $r['last_name'])];
                    }
                }
                usort($notRead, fn($a, $b) => strcmp($a['name'], $b['name']));
                break;
            default:
                $total = $count($students) + $count($staff);
                $read = $count("SELECT COUNT(*) FROM notice_reads WHERE notice_id = ? AND reader_role IN ('student','teacher','hod')", [$id]);
        }
        $this->success(['read' => $read, 'total' => $total, 'not_read' => array_slice($notRead, 0, 300)]);
    }

    public function destroy(): void
    {
        $db = $this->getDb();
        if ($n = $this->managed($db)) {
            $db->prepare("UPDATE notices SET deleted_at = NOW() WHERE id = ?")->execute([(int) $n['id']]);
            $this->success([], 'Notice removed');
        }
    }
}
