<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * A learner's work deleted by the teacher so they can do the assessment again
 * (Teacher\MarkingController::clearForRedo). If the deadline had passed, the teacher gives a date
 * to redo it by (assignment_redo_grants.redo_until); until then that learner's deadline is that
 * date instead. The table comes from migration 169; ensureSchema() makes it if that hasn't run.
 */
final class AssignmentRedo
{
    private static bool $checked = false;
    private static ?bool $exists = null;

    /** Whether the table is there (a plain read: safe inside a transaction) */
    private static function exists(\PDO $db): bool
    {
        if (self::$exists === null) {
            try {
                self::$exists = (bool) $db->query("SHOW TABLES LIKE 'assignment_redo_grants'")->fetch();
            } catch (\Throwable $e) {
                self::$exists = false;
            }
        }
        return self::$exists;
    }

    /**
     * Makes the table if migration 169 hasn't run. Never call it inside a transaction: any CREATE
     * TABLE (even IF NOT EXISTS) commits the transaction in MySQL.
     */
    public static function ensureSchema(\PDO $db): void
    {
        if (self::$checked) {
            return;
        }
        self::$checked = true;
        if (self::exists($db)) {
            return;
        }
        try {
            self::$exists = null;
            $db->exec(
                "CREATE TABLE IF NOT EXISTS assignment_redo_grants (
                    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    assignment_id INT UNSIGNED NOT NULL,
                    student_id INT UNSIGNED NOT NULL,
                    redo_until DATETIME NULL,
                    granted_by INT UNSIGNED NOT NULL,
                    reason VARCHAR(255) NULL,
                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE KEY uq_redo_grant (assignment_id, student_id),
                    KEY idx_redo_student (student_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
            );
        } catch (\Throwable $e) {
            error_log('AssignmentRedo schema check failed: ' . $e->getMessage());
        }
    }

    /** The date this learner has to redo the assessment by, while it is still ahead; else null */
    public static function until(\PDO $db, int $assignmentId, int $studentId): ?string
    {
        // only reads (it is asked inside the hand-in's transaction): no table yet, no redo
        if (!self::exists($db)) {
            return null;
        }
        try {
            $stmt = $db->prepare('SELECT redo_until FROM assignment_redo_grants WHERE assignment_id = ? AND student_id = ? AND redo_until > NOW()');
            $stmt->execute([$assignmentId, $studentId]);
            $until = $stmt->fetchColumn();
            return $until ? (string) $until : null;
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * SQL for "this learner's deadline" on assignments alias $a: the redo date while one is ahead,
     * else the assessment's own. $studentRef is a trusted SQL expression (an int or a column).
     */
    public static function dueSql(string $studentRef, string $a = 'a', string $col = 'due_date'): string
    {
        return "COALESCE((SELECT rg.redo_until FROM assignment_redo_grants rg WHERE rg.assignment_id = {$a}.id"
            . " AND rg.student_id = {$studentRef} AND rg.redo_until > NOW()), {$a}.{$col})";
    }
}
