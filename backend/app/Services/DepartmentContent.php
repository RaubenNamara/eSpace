<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Sharing within a department: every teacher SEES the eNotes, eLibrary books, Item Bank papers
 * and videos of the other teachers in their department, but EDITS only their own - unless the
 * department's HOD has let them edit their colleagues' work as well
 * (department_content_editors, migration 145).
 *
 * The controllers build their WHERE clauses from here:
 *  editable() - what this teacher may change: their own, plus everything in a department they
 *               edit for.
 *  viewable() - what they may open: the editable set, plus everything in their (active)
 *               department.
 * Department ids go into the SQL as integers (cast here), so the caller's placeholder count
 * stays the same.
 */
class DepartmentContent
{
    /** @var array<int, int[]> teacher id => departments they edit for (once per request) */
    private static array $editorCache = [];

    private static function db()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /** The departments a teacher may edit everyone's content in. Empty before migration 145. */
    public static function editorDepartmentIds(int $teacherId): array
    {
        if ($teacherId <= 0) return [];
        if (isset(self::$editorCache[$teacherId])) return self::$editorCache[$teacherId];
        try {
            $stmt = self::db()->prepare(
                "SELECT dce.department_id FROM department_content_editors dce
                 JOIN teachers t ON t.id = dce.teacher_id AND t.deleted_at IS NULL AND t.is_active = 1
                 WHERE dce.teacher_id = ?
                   AND (t.department_id = dce.department_id
                        OR EXISTS (SELECT 1 FROM teacher_department_assignments tda
                                   WHERE tda.teacher_id = t.id AND tda.department_id = dce.department_id AND tda.deleted_at IS NULL))"
            );
            $stmt->execute([$teacherId]);
            $ids = array_map('intval', $stmt->fetchAll(\PDO::FETCH_COLUMN));
        } catch (\Throwable $e) {
            $ids = [];
        }
        return self::$editorCache[$teacherId] = $ids;
    }

    public static function isEditor(int $teacherId, int $departmentId): bool
    {
        return in_array($departmentId, self::editorDepartmentIds($teacherId), true);
    }

    /** "{alias}{owner} = {placeholder}" or, for an editor, also their departments' content */
    public static function editable(string $alias, string $ownerColumn, string $placeholder, int $teacherId): string
    {
        $own = "{$alias}{$ownerColumn} = {$placeholder}";
        $depts = self::editorDepartmentIds($teacherId);
        return $depts ? "({$own} OR {$alias}department_id IN (" . implode(',', $depts) . "))" : $own;
    }

    /** The editable set, plus everything in the teacher's department */
    public static function viewable(string $alias, string $ownerColumn, string $placeholder, int $teacherId, ?int $departmentId): string
    {
        $edit = self::editable($alias, $ownerColumn, $placeholder, $teacherId);
        return $departmentId ? "({$edit} OR {$alias}department_id = " . (int) $departmentId . ")" : $edit;
    }

    /** The HOD gives or takes away a teacher's permission to edit colleagues' work */
    public static function setEditor(int $departmentId, int $teacherId, bool $on, ?int $grantedBy): void
    {
        $db = self::db();
        if ($on) {
            $db->prepare(
                "INSERT INTO department_content_editors (department_id, teacher_id, granted_by) VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE granted_by = VALUES(granted_by)"
            )->execute([$departmentId, $teacherId, $grantedBy]);
        } else {
            $db->prepare("DELETE FROM department_content_editors WHERE department_id = ? AND teacher_id = ?")->execute([$departmentId, $teacherId]);
        }
        unset(self::$editorCache[$teacherId]);
    }

    /** The teachers allowed to edit colleagues' work in a department, as id => true */
    public static function editorsOf(int $departmentId): array
    {
        try {
            $stmt = self::db()->prepare("SELECT teacher_id FROM department_content_editors WHERE department_id = ?");
            $stmt->execute([$departmentId]);
            return array_fill_keys(array_map('intval', $stmt->fetchAll(\PDO::FETCH_COLUMN)), true);
        } catch (\Throwable $e) {
            return [];
        }
    }
}
