<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;

/**
 * Support groups (re-teaching), made from the Class Learning Map: the students who haven't
 * achieved a learning outcome (LOA) or topic competency (AOI) yet, sent to revise it. Each
 * student's "What to do next" then leads with it - the notes page for their own stream, else the
 * practice tagged to the topic (see Student\NextStepsController) - and the group shows who has
 * revised and where each student stood when it was made against where they stand now.
 * Same levels as the Learning Map: returned results only, achieved from 60%.
 *
 * GET  /teacher/support-groups?subject_id=
 * POST /teacher/support-groups
 * POST /teacher/support-groups/{id}/remind
 * PUT  /teacher/support-groups/{id}/close
 */
class SupportGroupController extends Controller
{
    private const ACHIEVED_FROM = 60.0;

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function teacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return isset($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        }
        return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    /** @return int[] positive, unique */
    private static function ids($raw): array
    {
        return array_values(array_unique(array_filter(array_map('intval', is_array($raw) ? $raw : []), fn($id) => $id > 0)));
    }

    /** The subject, when it's in one of the teacher's departments */
    private function subject($db, int $teacherId, int $subjectId): ?array
    {
        $stmt = $db->prepare(
            "SELECT s.id, s.name, s.department_id FROM subjects s
             WHERE s.id = ? AND s.deleted_at IS NULL AND s.department_id IN (
                SELECT department_id FROM teacher_department_assignments WHERE teacher_id = ? AND deleted_at IS NULL
                UNION SELECT department_id FROM teachers WHERE id = ? AND department_id IS NOT NULL
             )"
        );
        $stmt->execute([$subjectId, $teacherId, $teacherId]);
        return $stmt->fetch() ?: null;
    }

    /**
     * Each student's returned result on the outcome / competency (all its stream copies), as a
     * percentage - the same results the Learning Map uses
     *
     * @return array<int, float> student id => percentage
     */
    private function currentResults($db, string $kind, array $itemIds, array $studentIds): array
    {
        if (!$itemIds || !$studentIds) {
            return [];
        }
        if ($kind === 'outcome') {
            $stmt = $db->prepare(
                "SELECT sb.student_id, AVG(sb.percentage) AS pct
                 FROM assignment_learning_outcomes alo
                 INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
                 INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL
                        AND sb.status = 'returned' AND sb.percentage IS NOT NULL
                 WHERE alo.learning_outcome_id IN (" . self::in($itemIds) . ")
                   AND sb.student_id IN (" . self::in($studentIds) . ")
                 GROUP BY sb.student_id"
            );
            $stmt->execute(array_merge($itemIds, $studentIds));
        } else {
            $links = "SELECT act.assignment_id FROM assignment_curriculum_topics act
                      WHERE act.curriculum_topic_id IN (" . self::in($itemIds) . ")";
            $params = $itemIds;
            try {
                $db->query("SELECT curriculum_topic_id FROM enote_topics LIMIT 0");
                $links .= " UNION SELECT a2.id FROM assignments a2
                            INNER JOIN enote_topics et ON et.id = a2.enote_topic_id
                            WHERE et.curriculum_topic_id IN (" . self::in($itemIds) . ")";
                $params = array_merge($params, $itemIds);
            } catch (\PDOException $e) {
                // eNote curriculum links not migrated yet
            }
            $stmt = $db->prepare(
                "SELECT sb.student_id, AVG(sb.percentage) AS pct
                 FROM ($links) links
                 INNER JOIN assignments a ON a.id = links.assignment_id AND a.assessment_category = 'AOI'
                        AND a.deleted_at IS NULL AND a.status = 'published'
                 INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL
                        AND sb.status = 'returned' AND sb.percentage IS NOT NULL
                 WHERE sb.student_id IN (" . self::in($studentIds) . ")
                 GROUP BY sb.student_id"
            );
            $stmt->execute(array_merge($params, $studentIds));
        }
        $out = [];
        foreach ($stmt->fetchAll() as $r) {
            $out[(int) $r['student_id']] = round((float) $r['pct'], 1);
        }
        return $out;
    }

    private static function meetingText(?string $meetAt, ?string $place): string
    {
        $parts = [];
        if ($meetAt) {
            $parts[] = date('D j M, g:i A', strtotime($meetAt));
        }
        if ($place) {
            $parts[] = $place;
        }
        return implode(' · ', $parts);
    }

    private function notifyMembers(array $studentIds, array $group, string $title, bool $reminder = false): void
    {
        $what = $group['kind'] === 'competency'
            ? 'the competency in ' . $group['topic_text']
            : 'this learning outcome: ' . $group['item_text'];
        $meeting = self::meetingText($group['meet_at'] ?? null, $group['meet_place'] ?? null);
        $message = ($reminder ? 'Reminder: revise ' : 'Your teacher wants you to revise ') . $what . '.'
            . ($meeting ? " Support session: $meeting." : '')
            . (!empty($group['note']) ? ' ' . $group['note'] : '');
        (new NotificationService())->notifyMany(
            array_map(fn($id) => ['id' => $id, 'role' => 'student'], $studentIds),
            'support_group',
            $title,
            mb_substr($message, 0, 1000),
            ['support_group_id' => (int) $group['id']]
        );
    }

    public function index(): void
    {
        if (!$this->isAuthenticated() || !($teacherId = $this->teacherId())) {
            $this->unauthorized();
            return;
        }
        $db = $this->getDb();
        $subjectId = (int) ($_GET['subject_id'] ?? 0);
        if (!$this->subject($db, $teacherId, $subjectId)) {
            $this->notFound('Subject not found');
            return;
        }
        $stmt = $db->prepare(
            "SELECT * FROM support_groups WHERE teacher_id = ? AND subject_id = ?
             ORDER BY status = 'open' DESC, created_at DESC LIMIT 60"
        );
        $stmt->execute([$teacherId, $subjectId]);
        $groups = $stmt->fetchAll();
        if (!$groups) {
            $this->success(['groups' => []]);
            return;
        }

        $groupIds = array_map(fn($g) => (int) $g['id'], $groups);
        $stmt = $db->prepare(
            "SELECT m.group_id, m.student_id, m.start_percentage, m.revised_at, st.first_name, st.last_name,
                    (SELECT CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name)))
                     FROM student_department_enrollments sde INNER JOIN classes c ON c.id = sde.class_id
                     WHERE sde.student_id = m.student_id AND sde.status = 'active' AND sde.deleted_at IS NULL
                     ORDER BY sde.id DESC LIMIT 1) AS class_name
             FROM support_group_members m
             INNER JOIN students st ON st.id = m.student_id
             WHERE m.group_id IN (" . self::in($groupIds) . ")
             ORDER BY st.first_name, st.last_name"
        );
        $stmt->execute($groupIds);
        $members = [];
        foreach ($stmt->fetchAll() as $m) {
            $members[(int) $m['group_id']][] = $m;
        }

        $out = [];
        foreach ($groups as $g) {
            $gid = (int) $g['id'];
            $list = $members[$gid] ?? [];
            $itemIds = self::ids(json_decode((string) $g['item_ids'], true));
            $now = $this->currentResults($db, $g['kind'], $itemIds, array_map(fn($m) => (int) $m['student_id'], $list));
            $rows = [];
            $revised = 0;
            $achieved = 0;
            foreach ($list as $m) {
                $sid = (int) $m['student_id'];
                $current = $now[$sid] ?? null;
                $revised += $m['revised_at'] ? 1 : 0;
                $achieved += $current !== null && $current >= self::ACHIEVED_FROM ? 1 : 0;
                $rows[] = [
                    'student_id' => $sid,
                    'name' => trim($m['first_name'] . ' ' . $m['last_name']),
                    'class_name' => $m['class_name'],
                    'start_percentage' => $m['start_percentage'] !== null ? (float) $m['start_percentage'] : null,
                    'percentage' => $current,
                    'revised_at' => $m['revised_at'],
                ];
            }
            $out[] = [
                'id' => $gid,
                'kind' => $g['kind'],
                'item_ids' => $itemIds,
                'item_text' => $g['item_text'],
                'topic_text' => $g['topic_text'],
                'note' => $g['note'],
                'meet_at' => $g['meet_at'],
                'meet_place' => $g['meet_place'],
                'status' => $g['status'],
                'created_at' => $g['created_at'],
                'closed_at' => $g['closed_at'],
                'members' => $rows,
                'counts' => ['members' => count($rows), 'revised' => $revised, 'achieved' => $achieved],
            ];
        }
        $this->success(['groups' => $out]);
    }

    public function store(): void
    {
        if (!$this->isAuthenticated() || !($teacherId = $this->teacherId())) {
            $this->unauthorized();
            return;
        }
        $db = $this->getDb();
        $data = $this->input();
        $subject = $this->subject($db, $teacherId, (int) ($data['subject_id'] ?? 0));
        if (!$subject) {
            $this->notFound('Subject not found');
            return;
        }
        $kind = ($data['kind'] ?? '') === 'competency' ? 'competency' : 'outcome';
        $itemIds = self::ids($data['item_ids'] ?? []);
        $studentIds = self::ids($data['student_ids'] ?? []);
        if (!$itemIds || !$studentIds) {
            $this->error('Choose the students to support', 422);
            return;
        }

        // The outcome / competency must be this subject's; its wording comes from the curriculum
        if ($kind === 'outcome') {
            $stmt = $db->prepare(
                "SELECT o.id, o.learning_outcome AS item_text, ct.topic AS topic_text
                 FROM enote_learning_outcomes o
                 INNER JOIN enote_curriculum_topics ct ON ct.id = o.curriculum_topic_id AND ct.deleted_at IS NULL
                 WHERE o.id IN (" . self::in($itemIds) . ") AND ct.subject_id = ?"
            );
        } else {
            $stmt = $db->prepare(
                "SELECT ct.id, COALESCE(NULLIF(TRIM(ct.competence), ''), ct.topic) AS item_text, ct.topic AS topic_text
                 FROM enote_curriculum_topics ct
                 WHERE ct.id IN (" . self::in($itemIds) . ") AND ct.subject_id = ? AND ct.deleted_at IS NULL"
            );
        }
        $stmt->execute(array_merge($itemIds, [(int) $subject['id']]));
        $items = $stmt->fetchAll();
        if (!$items) {
            $this->notFound('Learning outcome not found');
            return;
        }
        $itemIds = array_map(fn($i) => (int) $i['id'], $items);

        // Only students in the subject's department
        $stmt = $db->prepare(
            "SELECT DISTINCT sde.student_id FROM student_department_enrollments sde
             INNER JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL
             WHERE sde.student_id IN (" . self::in($studentIds) . ") AND sde.department_id = ?
               AND sde.status = 'active' AND sde.deleted_at IS NULL"
        );
        $stmt->execute(array_merge($studentIds, [(int) $subject['department_id']]));
        $studentIds = array_map('intval', array_column($stmt->fetchAll(), 'student_id'));
        if (!$studentIds) {
            $this->error('None of those students take this subject', 422);
            return;
        }

        $note = trim((string) ($data['note'] ?? ''));
        $meetAt = trim((string) ($data['meet_at'] ?? ''));
        $meetAt = $meetAt !== '' && strtotime($meetAt) ? date('Y-m-d H:i:s', strtotime($meetAt)) : null;
        $place = mb_substr(trim(strip_tags((string) ($data['meet_place'] ?? ''))), 0, 120);
        $group = [
            'teacher_id' => $teacherId,
            'subject_id' => (int) $subject['id'],
            'kind' => $kind,
            'item_ids' => json_encode($itemIds),
            'item_text' => $items[0]['item_text'],
            'topic_text' => mb_substr((string) $items[0]['topic_text'], 0, 255),
            'note' => $note !== '' ? mb_substr(strip_tags($note), 0, 1000) : null,
            'meet_at' => $meetAt,
            'meet_place' => $place !== '' ? $place : null,
        ];

        $start = $this->currentResults($db, $kind, $itemIds, $studentIds);
        $db->beginTransaction();
        try {
            $db->prepare(
                "INSERT INTO support_groups (teacher_id, subject_id, kind, item_ids, item_text, topic_text, note, meet_at, meet_place)
                 VALUES (:teacher_id, :subject_id, :kind, :item_ids, :item_text, :topic_text, :note, :meet_at, :meet_place)"
            )->execute($group);
            $group['id'] = (int) $db->lastInsertId();
            $add = $db->prepare("INSERT IGNORE INTO support_group_members (group_id, student_id, start_percentage) VALUES (?, ?, ?)");
            foreach ($studentIds as $sid) {
                $add->execute([$group['id'], $sid, $start[$sid] ?? null]);
            }
            $db->commit();
        } catch (\Throwable $e) {
            $db->rollBack();
            error_log('Support group: ' . $e->getMessage());
            $this->error('Could not create the support group', 500);
            return;
        }

        try {
            $this->notifyMembers($studentIds, $group, 'Revision from your ' . $subject['name'] . ' teacher');
        } catch (\Throwable $e) {
            error_log('Support group notifications: ' . $e->getMessage());
        }
        $this->success(['id' => $group['id'], 'members' => count($studentIds)], 'Support group created');
    }

    /** The group, when it's this teacher's */
    private function ownGroup($db, int $teacherId, int $id): ?array
    {
        $stmt = $db->prepare("SELECT g.*, s.name AS subject_name FROM support_groups g INNER JOIN subjects s ON s.id = g.subject_id WHERE g.id = ? AND g.teacher_id = ?");
        $stmt->execute([$id, $teacherId]);
        return $stmt->fetch() ?: null;
    }

    /** Reminds the members who haven't revised yet */
    public function remind($id): void
    {
        if (!$this->isAuthenticated() || !($teacherId = $this->teacherId())) {
            $this->unauthorized();
            return;
        }
        $db = $this->getDb();
        $group = $this->ownGroup($db, $teacherId, (int) $id);
        if (!$group || $group['status'] !== 'open') {
            $this->notFound('Support group not found');
            return;
        }
        $stmt = $db->prepare("SELECT student_id FROM support_group_members WHERE group_id = ? AND revised_at IS NULL");
        $stmt->execute([(int) $id]);
        $studentIds = array_map('intval', array_column($stmt->fetchAll(), 'student_id'));
        if ($studentIds) {
            $this->notifyMembers($studentIds, $group, 'Reminder from your ' . $group['subject_name'] . ' teacher', true);
        }
        $this->success(['reminded' => count($studentIds)], $studentIds ? 'Reminder sent' : 'Everyone has revised');
    }

    public function close($id): void
    {
        if (!$this->isAuthenticated() || !($teacherId = $this->teacherId())) {
            $this->unauthorized();
            return;
        }
        $db = $this->getDb();
        if (!$this->ownGroup($db, $teacherId, (int) $id)) {
            $this->notFound('Support group not found');
            return;
        }
        $db->prepare("UPDATE support_groups SET status = 'closed', closed_at = NOW() WHERE id = ?")->execute([(int) $id]);
        $this->success(['id' => (int) $id], 'Support group closed');
    }
}
