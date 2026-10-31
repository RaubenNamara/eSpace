<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\App\Support\Tenant;

/**
 * Sets up a new school's own database (developer portal, Enrol a school): the same tables as the
 * home database (St Mark's), empty - no person, mark or message comes across - plus the settings
 * every school starts with, and the school's first administrator.
 *
 * Teaching content (curriculum, eNotes, books, Item Bank) is copied in separately from the master
 * school - see the content-library stage of docs/multi-school-plan.html.
 */
final class SchoolProvisioner
{
    // Copied with their rows (those matching the condition): settings every school starts with,
    // never people or content. A rule tied to one of the home school's own subjects stays there.
    private const SEED_TABLES = ['reward_rules' => 'subject_id IS NULL'];

    /**
     * Create the database when the server allows it. On shared hosting (cPanel) the site's
     * database user usually can't: the database is created in cPanel first, the user given ALL
     * PRIVILEGES on it, and its name entered in the portal - then this just checks it's reachable.
     */
    public static function ensureDatabase(string $dbName): ?string
    {
        try {
            Tenant::connect($dbName);
            return null;
        } catch (\PDOException $e) {
            // not there yet - try to create it
        }
        try {
            $root = Tenant::connect(null);
            $root->exec('CREATE DATABASE `' . str_replace('`', '', $dbName) . '` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
            Tenant::connect($dbName);
            return null;
        } catch (\PDOException $e) {
            return "The database \"{$dbName}\" doesn't exist and the server didn't allow creating it. Create it in cPanel (MySQL Databases), give the site's database user ALL PRIVILEGES on it, then enrol again with that exact name.";
        }
    }

    /** Every table of the home database, created empty in the new one. Returns how many were created. */
    public static function copySchema(\PDO $home, \PDO $target): int
    {
        $tables = $home->query("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'")->fetchAll(\PDO::FETCH_NUM);
        $existing = array_flip(array_map(fn($r) => $r[0], $target->query('SHOW TABLES')->fetchAll(\PDO::FETCH_NUM)));
        $target->exec('SET FOREIGN_KEY_CHECKS = 0');
        $made = 0;
        try {
            foreach ($tables as [$table]) {
                if (isset($existing[$table])) {
                    continue;
                }
                $create = $home->query('SHOW CREATE TABLE `' . $table . '`')->fetch(\PDO::FETCH_NUM)[1];
                // start the new school's ids from 1
                $create = preg_replace('/\sAUTO_INCREMENT=\d+/', '', $create);
                $target->exec($create);
                $made++;
            }
        } finally {
            $target->exec('SET FOREIGN_KEY_CHECKS = 1');
        }
        return $made;
    }

    /** Starting settings: the seed tables' rows, and the school's name */
    public static function seed(\PDO $home, \PDO $target, string $schoolName): void
    {
        foreach (self::SEED_TABLES as $table => $where) {
            if ((int) $target->query("SELECT COUNT(*) FROM `{$table}`")->fetchColumn() > 0) {
                continue;
            }
            $rows = $home->query("SELECT * FROM `{$table}` WHERE {$where}")->fetchAll(\PDO::FETCH_ASSOC);
            foreach ($rows as $row) {
                $cols = array_keys($row);
                $stmt = $target->prepare(
                    "INSERT INTO `{$table}` (`" . implode('`, `', $cols) . '`) VALUES (' . implode(', ', array_fill(0, count($cols), '?')) . ')'
                );
                $stmt->execute(array_values($row));
            }
        }
        if ((int) $target->query('SELECT COUNT(*) FROM school_settings')->fetchColumn() === 0) {
            $target->prepare('INSERT INTO school_settings (school_name) VALUES (?)')->execute([$schoolName]);
        }
    }

    /** The school's first administrator (full rights in their own school). Returns the password, once. */
    public static function createAdmin(\PDO $target, string $username, string $email): string
    {
        $password = self::password();
        $target->prepare(
            "INSERT INTO users (username, email, password, role, is_active, created_at, updated_at)
             VALUES (?, ?, ?, 'super_admin', 1, NOW(), NOW())"
        )->execute([$username, $email, password_hash($password, PASSWORD_BCRYPT)]);
        return $password;
    }

    /** A first password that is easy to read out and type: no 0/O or 1/l */
    public static function password(int $length = 10): string
    {
        $chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
        $out = '';
        for ($i = 0; $i < $length; $i++) {
            $out .= $chars[random_int(0, strlen($chars) - 1)];
        }
        return $out;
    }
}
