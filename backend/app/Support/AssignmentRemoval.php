<?php

declare(strict_types=1);

namespace eSpace\App\Support;

/**
 * SQL for assessments closed because their teacher was deleted (assignments.removed_at, see
 * TeacherRemovalService): students can't see or start them any more, except ones they already
 * submitted, which stay in their history - and on report cards, which don't use these filters.
 * Until migration 141 has run there is no such column, and every filter here is empty.
 */
final class AssignmentRemoval
{
    private static ?bool $hasColumn = null;

    public static function hasColumn(): bool
    {
        if (self::$hasColumn === null) {
            try {
                self::$hasColumn = (bool) \eSpace\Config\Database::getInstance()
                    ->query("SHOW COLUMNS FROM assignments LIKE 'removed_at'")->fetch();
            } catch (\Throwable $e) {
                self::$hasColumn = false;
            }
        }
        return self::$hasColumn;
    }

    /** " AND <alias>.removed_at IS NULL" - not closed */
    public static function open(string $alias = 'a'): string
    {
        return self::hasColumn() ? " AND {$alias}.removed_at IS NULL" : '';
    }

    /**
     * Not closed, or this student already submitted it (their work stays in their history).
     * $studentRef is the SQL for the student id - a placeholder like ':student_id' or a column.
     */
    public static function openOrSubmitted(string $studentRef, string $alias = 'a'): string
    {
        if (!self::hasColumn()) {
            return '';
        }
        return " AND ({$alias}.removed_at IS NULL OR EXISTS (SELECT 1 FROM assignment_submissions rs_kept"
            . " WHERE rs_kept.assignment_id = {$alias}.id AND rs_kept.student_id = {$studentRef}))";
    }
}
