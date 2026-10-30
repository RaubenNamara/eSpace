<?php

declare(strict_types=1);

namespace eSpace\App\Support;

/**
 * Signing out ends "online" straight away. Online status everywhere comes from how recent a
 * person's last activity is (last_active_at, kept fresh by the presence ping), so without this a
 * person who signs out stays "online" until that time ages out. Sign-out stamps signed_out_at on
 * their account; someone counts as online only if their last activity is newer than their last
 * sign-out - signing in again, or activity on another device still signed in, brings them back.
 *
 * The column is added by migration 151, and by the first sign-out if it is missing; until then
 * every check here falls back to the old behaviour.
 */
final class SignOut
{
    /** role => table that holds the account */
    private const TABLES = ['student' => 'students', 'teacher' => 'teachers', 'hod' => 'hods', 'admin' => 'users', 'super_admin' => 'users'];
    private static array $has = [];

    private static function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    public static function has(string $table): bool
    {
        if (!array_key_exists($table, self::$has)) {
            try {
                self::$has[$table] = (bool) self::db()->query("SHOW COLUMNS FROM `{$table}` LIKE 'signed_out_at'")->fetch();
            } catch (\Throwable $e) {
                self::$has[$table] = false;
            }
        }
        return self::$has[$table];
    }

    private static function ensure(string $table): void
    {
        if (!self::has($table)) {
            self::db()->exec("ALTER TABLE `{$table}` ADD COLUMN IF NOT EXISTS `signed_out_at` TIMESTAMP NULL DEFAULT NULL");
            self::$has[$table] = true;
        }
    }

    /** Stamp the sign-out (a HOD who is also a teacher is signed out of both accounts). */
    public static function record(?string $role, ?int $id): void
    {
        $table = self::TABLES[$role ?? ''] ?? null;
        if ($table === null || !$id) {
            return;
        }
        try {
            self::ensure($table);
            self::db()->prepare("UPDATE `{$table}` SET signed_out_at = NOW() WHERE id = ?")->execute([$id]);
            if ($role === 'hod') {
                self::ensure('teachers');
                self::db()->prepare("UPDATE teachers t INNER JOIN hods h ON h.teacher_id = t.id SET t.signed_out_at = NOW() WHERE h.id = ?")->execute([$id]);
            } elseif ($role === 'teacher') {
                self::ensure('hods');
                self::db()->prepare("UPDATE hods SET signed_out_at = NOW() WHERE teacher_id = ?")->execute([$id]);
            }
        } catch (\Throwable $e) {
            error_log('Recording sign-out failed: ' . $e->getMessage());
        }
    }

    /**
     * SQL condition (with a leading AND) that the person at $alias has not signed out since
     * $activity (a column or expression; their last activity by default).
     */
    public static function stillSignedIn(string $table, string $alias, ?string $activity = null): string
    {
        if (!self::has($table)) {
            return '';
        }
        $activity ??= "{$alias}.last_active_at";
        return " AND ({$alias}.signed_out_at IS NULL OR {$alias}.signed_out_at < {$activity})";
    }

    /** The column for a SELECT list, or NULL while it does not exist yet. */
    public static function column(string $table, string $alias): string
    {
        return self::has($table) ? "{$alias}.signed_out_at" : 'NULL';
    }
}
