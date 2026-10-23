<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use PDO;

/**
 * The HOD approves teachers' work before students see it (migration 142).
 *
 * A teacher who publishes an eNote topic, a library book, an Item Bank paper or a video in a
 * department that has an HOD gets status 'pending' instead of 'published' - and students only
 * ever see 'published' work. The HOD then approves it (it becomes 'published', and the class is
 * told, as publishing always did) or returns it with a note (back to 'draft'). Work approved once
 * can be unpublished and published again without asking twice. Nothing waits when the teacher is
 * the department's HOD, or when the department has no HOD.
 */
class ContentApproval
{
    /** Each kind of work: its table, its title column, how to find its teacher, and what the class is told */
    public const TYPES = [
        'enote' => ['table' => 'enote_topics', 'title' => 'title', 'teacher' => 'teacher_id', 'notify' => ['new_enote', 'New eNote', 'A new eNote topic "%s" is now available.', 'topic_id'], 'label' => 'eNote'],
        'library' => ['table' => 'library_books', 'title' => 'title', 'teacher' => 'uploader_id', 'notify' => ['new_library_resource', 'New eLibrary resource', 'A new library resource "%s" is now available.', 'book_id'], 'label' => 'Library book'],
        'itembank' => ['table' => 'item_bank_questions', 'title' => 'question_text', 'teacher' => 'uploader_id', 'notify' => ['new_item_bank_resource', 'New item bank resource', 'A new item bank resource "%s" is now available.', 'resource_id'], 'label' => 'Item Bank paper'],
        'video' => ['table' => 'videos', 'title' => 'title', 'teacher' => 'teacher_id', 'notify' => ['new_video', 'New video uploaded', 'A new video "%s" is now available.', 'video_id'], 'label' => 'Video']
    ];

    /** The department's HOD (id, name, the teacher account they also teach with), or null */
    public static function hodOf(PDO $db, ?int $departmentId): ?array
    {
        if (!$departmentId) {
            return null;
        }
        $stmt = $db->prepare('SELECT id, first_name, last_name, teacher_id FROM hods WHERE department_id = ? AND deleted_at IS NULL AND is_active = 1 ORDER BY id LIMIT 1');
        $stmt->execute([$departmentId]);
        return $stmt->fetch() ?: null;
    }

    /** Does work by this teacher in this department wait for the HOD? */
    public static function needed(PDO $db, ?int $departmentId, int $teacherId): bool
    {
        $hod = self::hodOf($db, $departmentId);
        return $hod !== null && (int) ($hod['teacher_id'] ?? 0) !== $teacherId;
    }

    /**
     * The status to store when a teacher asks for `$requested`: 'pending' in place of 'published'
     * when the HOD has to approve it first (and has not approved this item before).
     */
    public static function statusFor(PDO $db, string $type, ?int $id, ?int $departmentId, int $teacherId, string $requested): string
    {
        if ($requested !== 'published' || ($_SESSION['role'] ?? '') !== 'teacher') {
            return $requested;
        }
        if ($id) {
            $t = self::TYPES[$type]['table'];
            $stmt = $db->prepare("SELECT approved_at FROM {$t} WHERE id = ?");
            $stmt->execute([$id]);
            if ($stmt->fetchColumn()) {
                return 'published';
            }
        }
        return self::needed($db, $departmentId, $teacherId) ? 'pending' : 'published';
    }

    /**
     * After saving: work now 'pending' is marked as sent (clearing any old note), and the HOD is
     * told. Safe to call with ids that are not pending - they are left alone.
     */
    public static function submitted(PDO $db, string $type, array $ids): void
    {
        $ids = array_values(array_filter(array_map('intval', $ids)));
        if (!$ids) {
            return;
        }
        $cfg = self::TYPES[$type];
        $t = $cfg['table'];
        $in = implode(',', array_fill(0, count($ids), '?'));
        $stmt = $db->prepare("SELECT id, department_id, {$cfg['title']} AS title FROM {$t} WHERE id IN ({$in}) AND status = 'pending' AND submitted_at IS NULL");
        $stmt->execute($ids);
        $rows = $stmt->fetchAll();
        if (!$rows) {
            return;
        }
        $db->prepare("UPDATE {$t} SET submitted_at = NOW(), review_note = NULL WHERE id IN ({$in}) AND status = 'pending' AND submitted_at IS NULL")->execute($ids);
        // one note to each HOD, however many items were sent at once
        $byDept = [];
        foreach ($rows as $r) {
            $byDept[(int) $r['department_id']][] = self::plain($r['title']);
        }
        foreach ($byDept as $deptId => $titles) {
            $hod = self::hodOf($db, $deptId);
            if (!$hod) {
                continue;
            }
            $what = count($titles) === 1 ? "\"{$titles[0]}\"" : count($titles) . ' items';
            (new NotificationService())->notify((int) $hod['id'], 'hod', 'approval_request', 'Waiting for your approval', "{$cfg['label']}: {$what} sent for approval.", ['type' => $type]);
        }
    }

    /** Approve: publish it, tell the teacher, and tell the class it is there */
    public static function approve(PDO $db, string $type, int $id, int $hodId): bool
    {
        $cfg = self::TYPES[$type];
        $t = $cfg['table'];
        $row = self::row($db, $type, $id);
        if (!$row || $row['status'] !== 'pending') {
            return false;
        }
        $db->prepare("UPDATE {$t} SET status = 'published', published_at = NOW(), approved_at = NOW(), approved_by = ?, review_note = NULL, updated_at = NOW() WHERE id = ?")->execute([$hodId, $id]);
        if ($type === 'library' || $type === 'itembank') {
            $db->prepare("UPDATE {$t} SET is_approved = 1 WHERE id = ?")->execute([$id]);
        }
        $title = self::plain($row['title']);
        [$kind, $heading, $message, $key] = $cfg['notify'];
        (new NotificationService())->notifyDepartmentClass(
            $row['department_id'] !== null ? (int) $row['department_id'] : null,
            $row['class_id'] !== null ? (int) $row['class_id'] : null,
            $kind,
            $heading,
            sprintf($message, $title),
            [$key => $id],
            $row['class_group_name']
        );
        if ($row['teacher'] !== null) {
            (new NotificationService())->notify((int) $row['teacher'], 'teacher', 'approval_approved', 'Approved by your HOD', "{$cfg['label']} \"{$title}\" was approved - students can see it now.", ['type' => $type, 'id' => $id]);
        }
        if ($type === 'enote') {
            ENoteAssessmentReach::trySync($db, $id);
        }
        return true;
    }

    /** Return it to the teacher with a note: back to draft, students still do not see it */
    public static function returnToTeacher(PDO $db, string $type, int $id, int $hodId, string $note): bool
    {
        $cfg = self::TYPES[$type];
        $t = $cfg['table'];
        $row = self::row($db, $type, $id);
        if (!$row || $row['status'] !== 'pending') {
            return false;
        }
        $note = mb_substr(trim(strip_tags($note)), 0, 500);
        $db->prepare("UPDATE {$t} SET status = 'draft', submitted_at = NULL, review_note = ?, updated_at = NOW() WHERE id = ?")->execute([$note, $id]);
        if ($row['teacher'] !== null) {
            $title = self::plain($row['title']);
            (new NotificationService())->notify((int) $row['teacher'], 'teacher', 'approval_returned', 'Returned by your HOD', "{$cfg['label']} \"{$title}\" needs changes: {$note}", ['type' => $type, 'id' => $id]);
        }
        return true;
    }

    /** Everything waiting in a department, oldest first, with its class, subject and teacher */
    public static function pending(PDO $db, int $departmentId): array
    {
        $out = [];
        foreach (self::TYPES as $type => $cfg) {
            $t = $cfg['table'];
            $teacherJoin = "LEFT JOIN teachers tr ON tr.id = x.{$cfg['teacher']}";
            $extra = match ($type) {
                'library' => ", x.file_path AS file_url, x.file_type",
                'itembank' => ", x.file_path AS file_url, x.file_type, x.question_type AS kind",
                'video' => ", x.file_path AS file_url",
                default => ", (SELECT COUNT(*) FROM enote_pages p WHERE p.topic_id = x.id AND p.deleted_at IS NULL) AS pages"
            };
            $sql = "SELECT x.id, x.{$cfg['title']} AS title, x.class_id, x.class_group_name, x.submitted_at, x.updated_at,
                           c.name AS class_name, c.stream_name, s.name AS subject_name, tr.id AS teacher_id, CONCAT(tr.first_name, ' ', tr.last_name) AS teacher_name{$extra}
                    FROM {$t} x
                    LEFT JOIN classes c ON c.id = x.class_id
                    LEFT JOIN subjects s ON s.id = x.subject_id
                    {$teacherJoin}
                    WHERE x.department_id = ? AND x.status = 'pending' AND x.deleted_at IS NULL";
            $stmt = $db->prepare($sql);
            $stmt->execute([$departmentId]);
            foreach ($stmt->fetchAll() as $r) {
                $r['type'] = $type;
                $r['type_label'] = $cfg['label'];
                $r['title'] = self::plain($r['title']);
                $out[] = $r;
            }
        }
        usort($out, fn ($a, $b) => strcmp((string) ($a['submitted_at'] ?? $a['updated_at']), (string) ($b['submitted_at'] ?? $b['updated_at'])));
        return $out;
    }

    private static function row(PDO $db, string $type, int $id): ?array
    {
        $cfg = self::TYPES[$type];
        $stmt = $db->prepare("SELECT id, status, department_id, class_id, class_group_name, {$cfg['title']} AS title, {$cfg['teacher']} AS teacher FROM {$cfg['table']} WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        return $stmt->fetch() ?: null;
    }

    private static function plain(?string $s): string
    {
        return html_entity_decode(strip_tags((string) $s), ENT_QUOTES, 'UTF-8');
    }
}
