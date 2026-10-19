<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Keeps one eNote topic from reaching the same students twice: within a department, two topics
 * with the same subject and title (compared loosely - case, spacing and punctuation ignored) must
 * not both be published to an overlapping audience (the same stream, a stream and its class's
 * "All Streams", or anything and a department-wide topic). Used by every path that publishes
 * (teacher create/update/publish/bulk/duplicate, admin status change) and by the student list,
 * which hides any such repeat that already exists.
 */
class ENoteDuplicateGuard
{
    public static function normalize(string $title): string
    {
        $t = mb_strtolower(html_entity_decode($title, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        $t = preg_replace('/[^\p{L}\p{N}]+/u', ' ', $t) ?? $t;
        return trim($t);
    }

    /**
     * Topics in the department (same subject, same title) that already reach any stream the
     * target reaches. $publishedOnly: only live topics count (publishing); otherwise drafts too.
     *
     * @param int[] $excludeIds
     * @return array<int, array{id:int, label:string, teacher:string, status:string}>
     */
    public static function conflicts(\PDO $db, int $departmentId, int $subjectId, string $title, ?int $classId, ?string $groupName, array $excludeIds = [], bool $publishedOnly = true): array
    {
        $key = self::normalize($title);
        if ($key === '') {
            return [];
        }

        $targetClassName = null;
        if ($classId !== null) {
            $stmt = $db->prepare('SELECT name FROM classes WHERE id = ?');
            $stmt->execute([$classId]);
            $targetClassName = $stmt->fetchColumn() ?: null;
        }
        $groupName = ($groupName !== null && $groupName !== '') ? $groupName : null;
        $targetWhole = $classId === null && $groupName === null;

        $statuses = $publishedOnly ? "('published')" : "('published', 'draft')";
        $stmt = $db->prepare(
            "SELECT et.id, et.title, et.status, et.class_id, et.class_group_name, c.name AS class_name, c.stream_name,
                    t.first_name, t.last_name
             FROM enote_topics et
             LEFT JOIN classes c ON c.id = et.class_id
             LEFT JOIN teachers t ON t.id = et.teacher_id
             WHERE et.department_id = ? AND et.subject_id = ? AND et.deleted_at IS NULL AND et.status IN {$statuses}"
        );
        $stmt->execute([$departmentId, $subjectId]);

        $exclude = array_flip(array_map('intval', $excludeIds));
        $out = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
            if (isset($exclude[(int) $row['id']]) || self::normalize((string) $row['title']) !== $key) {
                continue;
            }
            $rowGroup = $row['class_group_name'] !== null && $row['class_group_name'] !== '' ? $row['class_group_name'] : null;
            $rowWhole = $row['class_id'] === null && $rowGroup === null;

            $overlaps = $targetWhole || $rowWhole
                || ($classId !== null && ((int) $row['class_id'] === $classId || ($rowGroup !== null && $rowGroup === $targetClassName)))
                || ($groupName !== null && ($rowGroup === $groupName || $row['class_name'] === $groupName));
            if (!$overlaps) {
                continue;
            }
            $out[] = [
                'id' => (int) $row['id'],
                'label' => $rowGroup !== null ? "{$rowGroup} (All Streams)"
                    : ($row['class_name'] ? $row['class_name'] . ($row['stream_name'] ? '-' . $row['stream_name'] : '') : 'the whole department'),
                'teacher' => trim(($row['first_name'] ?? '') . ' ' . ($row['last_name'] ?? '')),
                'status' => $row['status'],
            ];
        }
        return $out;
    }

    /** "STATES OF MATTER" is already published for S.1-S (by Ahwera Rabwon) - ... */
    public static function message(array $conflicts, string $title): string
    {
        $where = implode(', ', array_unique(array_map(
            fn ($c) => $c['label'] . ($c['teacher'] !== '' ? " (by {$c['teacher']})" : ''),
            $conflicts
        )));
        $name = html_entity_decode($title, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        return "\"{$name}\" is already published for {$where} in this department, so students there would see it twice.";
    }
}
