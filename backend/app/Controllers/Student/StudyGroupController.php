<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ChatService;

/**
 * Study groups: two to five classmates revising together towards a goal ("Photosynthesis before
 * Friday's test"). Each group is a chat group (chat_conversations.type = 'group'), so talking in
 * it, and HODs/admins seeing it in chat monitoring, works like any other chat; study_groups holds
 * the goal, subject and target date.
 *
 * GET    /student/study-groups              my groups and the classmates I can invite
 * POST   /student/study-groups              {goal, subject_id?, target_date?, member_ids[]}
 * PUT    /student/study-groups/{id}         {goal?, target_date?}
 * POST   /student/study-groups/{id}/leave
 */
class StudyGroupController extends Controller
{
    private const MAX_MEMBERS = 5;

    private function studentId(): int
    {
        return (int) ($_SESSION['user_id'] ?? 0);
    }

    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    /** Classmates: anyone sharing a class with this student in any of their departments */
    private function classmates(): array
    {
        $stmt = $this->db()->prepare(
            "SELECT DISTINCT s.id, s.first_name, s.last_name
               FROM student_department_enrollments a
               JOIN student_department_enrollments b ON b.class_id = a.class_id AND b.department_id = a.department_id AND b.deleted_at IS NULL
               JOIN students s ON s.id = b.student_id AND s.deleted_at IS NULL AND s.is_active = 1
              WHERE a.student_id = ? AND a.deleted_at IS NULL AND b.student_id <> ?
              ORDER BY s.first_name, s.last_name"
        );
        $stmt->execute([$this->studentId(), $this->studentId()]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    private function subjects(): array
    {
        $stmt = $this->db()->prepare(
            "SELECT DISTINCT su.id, su.name FROM student_department_enrollments sde
               JOIN subjects su ON su.department_id = sde.department_id AND su.deleted_at IS NULL
              WHERE sde.student_id = ? AND sde.deleted_at IS NULL ORDER BY su.name"
        );
        $stmt->execute([$this->studentId()]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    private function isMember(int $conversationId): bool
    {
        $stmt = $this->db()->prepare(
            "SELECT 1 FROM chat_participants cp JOIN study_groups g ON g.conversation_id = cp.conversation_id
              WHERE cp.conversation_id = ? AND cp.user_id = ? AND cp.user_role = 'student'"
        );
        $stmt->execute([$conversationId, $this->studentId()]);
        return (bool) $stmt->fetchColumn();
    }

    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = $this->db();
        $stmt = $db->prepare(
            "SELECT c.id, c.name, c.updated_at, g.goal, g.target_date, g.created_by, su.name AS subject_name,
                    (SELECT MAX(m.created_at) FROM chat_messages m WHERE m.conversation_id = c.id) AS last_message_at
               FROM chat_conversations c
               JOIN study_groups g ON g.conversation_id = c.id
               JOIN chat_participants cp ON cp.conversation_id = c.id AND cp.user_id = ? AND cp.user_role = 'student'
               LEFT JOIN subjects su ON su.id = g.subject_id
              WHERE c.deleted_at IS NULL AND c.type = 'group'
              ORDER BY COALESCE(g.target_date, '9999-12-31'), c.updated_at DESC"
        );
        $stmt->execute([$this->studentId()]);
        $groups = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $g) {
            $m = $db->prepare(
                "SELECT s.id, s.first_name, s.last_name FROM chat_participants cp JOIN students s ON s.id = cp.user_id
                  WHERE cp.conversation_id = ? AND cp.user_role = 'student' ORDER BY s.first_name"
            );
            $m->execute([(int) $g['id']]);
            $groups[] = [
                'id' => (int) $g['id'],
                'name' => $g['name'],
                'goal' => $g['goal'],
                'subject' => $g['subject_name'],
                'target_date' => $g['target_date'],
                'mine' => (int) $g['created_by'] === $this->studentId(),
                'last_message_at' => $g['last_message_at'],
                'members' => array_map(static fn ($r) => ['id' => (int) $r['id'], 'name' => trim($r['first_name'] . ' ' . $r['last_name'])], $m->fetchAll(\PDO::FETCH_ASSOC)),
            ];
        }

        $this->success([
            'groups' => $groups,
            'classmates' => array_map(static fn ($r) => ['id' => (int) $r['id'], 'name' => trim($r['first_name'] . ' ' . $r['last_name'])], $this->classmates()),
            'subjects' => array_map(static fn ($r) => ['id' => (int) $r['id'], 'name' => $r['name']], $this->subjects()),
            'max_members' => self::MAX_MEMBERS,
        ]);
    }

    public function create(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $me = $this->studentId();
        $goal = trim(mb_substr((string) $this->input('goal', ''), 0, 200));
        $name = trim(mb_substr((string) $this->input('name', ''), 0, 100));
        $date = (string) $this->input('target_date', '');
        $subjectId = (int) $this->input('subject_id', 0) ?: null;
        $wanted = array_values(array_unique(array_map('intval', (array) $this->input('member_ids', []))));

        if ($goal === '') {
            $this->validationError(['goal' => 'Say what the group is revising']);
            return;
        }
        $allowed = array_map(static fn ($r) => (int) $r['id'], $this->classmates());
        $members = array_values(array_intersect($wanted, $allowed));
        if (count($members) < 1) {
            $this->validationError(['member_ids' => 'Invite at least one classmate']);
            return;
        }
        if (count($members) + 1 > self::MAX_MEMBERS) {
            $this->validationError(['member_ids' => 'A study group is at most ' . self::MAX_MEMBERS . ' people']);
            return;
        }
        if ($subjectId !== null && !in_array($subjectId, array_map(static fn ($r) => (int) $r['id'], $this->subjects()), true)) {
            $subjectId = null;
        }
        $date = preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) ? $date : null;

        $db = $this->db();
        $classId = $db->prepare("SELECT class_id FROM students WHERE id = ?");
        $classId->execute([$me]);
        $classId = $classId->fetchColumn() ?: null;
        $dept = $db->prepare("SELECT department_id FROM student_department_enrollments WHERE student_id = ? AND deleted_at IS NULL" . ($subjectId ? " AND department_id = (SELECT department_id FROM subjects WHERE id = ?)" : '') . " LIMIT 1");
        $dept->execute($subjectId ? [$me, $subjectId] : [$me]);
        $deptId = $dept->fetchColumn() ?: null;

        $db->beginTransaction();
        try {
            $db->prepare(
                "INSERT INTO chat_conversations (type, name, created_by, created_by_role, class_id, department_id, created_at, updated_at)
                 VALUES ('group', ?, ?, 'student', ?, ?, NOW(), NOW())"
            )->execute([$name !== '' ? $name : mb_substr($goal, 0, 100), $me, $classId, $deptId]);
            $cid = (int) $db->lastInsertId();
            $db->prepare("INSERT INTO study_groups (conversation_id, goal, subject_id, target_date, class_id, created_by) VALUES (?, ?, ?, ?, ?, ?)")
                ->execute([$cid, $goal, $subjectId, $date, $classId, $me]);
            $add = $db->prepare("INSERT INTO chat_participants (conversation_id, user_id, user_role, joined_at) VALUES (?, ?, 'student', NOW())");
            foreach (array_merge([$me], $members) as $sid) {
                $add->execute([$cid, $sid]);
            }
            $db->commit();
        } catch (\Throwable $e) {
            $db->rollBack();
            error_log('StudyGroup create failed: ' . $e->getMessage());
            $this->serverError('Could not start the group');
            return;
        }

        // Open with the goal, so everyone sees what the group is for
        (new ChatService())->sendMessage($cid, $me, 'student', "Study group: {$goal}" . ($date ? ' - by ' . date('D j M', strtotime($date)) : ''), null, null);

        $this->success(['id' => $cid], 'Study group started');
    }

    public function update(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $id = (int) $this->routeParam('id');
        if (!$this->isMember($id)) {
            $this->notFound('Group not found');
            return;
        }
        $db = $this->db();
        if (array_key_exists('goal', $this->requestData ?? [])) {
            $goal = trim(mb_substr((string) $this->input('goal', ''), 0, 200));
            if ($goal !== '') {
                $db->prepare("UPDATE study_groups SET goal = ? WHERE conversation_id = ?")->execute([$goal, $id]);
            }
        }
        if (array_key_exists('target_date', $this->requestData ?? [])) {
            $date = (string) $this->input('target_date', '');
            $db->prepare("UPDATE study_groups SET target_date = ? WHERE conversation_id = ?")
                ->execute([preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) ? $date : null, $id]);
        }
        $this->success([], 'Saved');
    }

    public function leave(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $id = (int) $this->routeParam('id');
        if (!$this->isMember($id)) {
            $this->notFound('Group not found');
            return;
        }
        $db = $this->db();
        $db->prepare("DELETE FROM chat_participants WHERE conversation_id = ? AND user_id = ? AND user_role = 'student'")->execute([$id, $this->studentId()]);
        $left = $db->prepare("SELECT COUNT(*) FROM chat_participants WHERE conversation_id = ?");
        $left->execute([$id]);
        if ((int) $left->fetchColumn() < 2) {
            // One person isn't a group - close it (messages stay for monitoring)
            $db->prepare("UPDATE chat_conversations SET deleted_at = NOW() WHERE id = ?")->execute([$id]);
        }
        $this->success([], 'You left the group');
    }
}
