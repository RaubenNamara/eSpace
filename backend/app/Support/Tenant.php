<?php

declare(strict_types=1);

namespace eSpace\App\Support;

use eSpace\Config\Config;

/**
 * Which school this request is for. Tusome runs many schools, each in its own database, on one
 * web address: the school is chosen at login (its "school code") and kept in the session. A
 * request with no school in its session - the public website, someone not signed in - uses the
 * home database in backend/.env (DB_NAME), which is St Mark's. So with one school nothing changes.
 *
 * The list of schools lives in the platform database (PLATFORM_DB_NAME, see
 * database/platform/001_platform.sql). If that database doesn't exist yet, every request simply
 * uses the home database.
 */
final class Tenant
{
    private static ?\PDO $platform = null;
    private static bool $platformTried = false;
    /** @var array<string, ?array> */
    private static array $byCode = [];

    /** The code that means "the home database" (St Mark's) */
    public static function homeCode(): string
    {
        return (string) Config::get('HOME_SCHOOL_CODE', 'stmark');
    }

    /** The platform database, or null when it hasn't been set up */
    public static function platform(): ?\PDO
    {
        if (self::$platformTried) {
            return self::$platform;
        }
        self::$platformTried = true;
        $c = Config::getDatabaseConfig(false);
        try {
            self::$platform = new \PDO(
                sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $c['host'], $c['port'], (string) Config::get('PLATFORM_DB_NAME', 'tusome_platform')),
                $c['username'],
                $c['password'],
                $c['options']
            );
        } catch (\PDOException $e) {
            self::$platform = null;
        }
        return self::$platform;
    }

    /** A school by its code, or null */
    public static function find(string $code): ?array
    {
        $code = strtolower(trim($code));
        if (array_key_exists($code, self::$byCode)) {
            return self::$byCode[$code];
        }
        $db = self::platform();
        $row = null;
        if ($db) {
            $stmt = $db->prepare('SELECT id, code, name, kind, db_name, status, is_master FROM schools WHERE code = ?');
            $stmt->execute([$code]);
            $row = $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
        }
        return self::$byCode[$code] = $row;
    }

    /** The school code in this session, or null for the home database */
    public static function sessionCode(): ?string
    {
        $code = $_SESSION['tenant'] ?? null;
        return is_string($code) && $code !== '' ? $code : null;
    }

    /**
     * The database this request reads and writes: the session's school, else the home database.
     * A school that can't be found falls back to home only when no school is in the session -
     * a session for a missing school gets no database name at all, so it can never touch home data.
     */
    public static function databaseName(): string
    {
        $home = (string) Config::get('DB_NAME');
        $code = self::sessionCode();
        if ($code === null || $code === self::homeCode()) {
            return $home;
        }
        $school = self::find($code);
        if (!$school) {
            throw new \RuntimeException('School not found');
        }
        return $school['db_name'] ?: $home;
    }

    /**
     * A login names its school after an @: "amos@kings" -> ['amos', 'kings']. Only when what
     * follows the @ is a school's code - an email address, or anything at the home school
     * (St Mark's: admission numbers, usernames), comes back unchanged with no school.
     *
     * @return array{0: string, 1: string}
     */
    public static function splitLogin(string $login): array
    {
        $at = strrpos($login, '@');
        if ($at === false || $at === 0) {
            return [$login, ''];
        }
        $code = strtolower(substr($login, $at + 1));
        if ($code === self::homeCode()) {
            return [substr($login, 0, $at), ''];
        }
        return preg_match('/^[a-z0-9][a-z0-9-]{1,38}$/', $code) && self::find($code)
            ? [substr($login, 0, $at), $code]
            : [$login, ''];
    }

    /**
     * The space independent learners log in to when they choose "Learning on my own" on the login
     * page - so they type just their username. INDEPENDENT_SCHOOL_CODE in .env, else the first
     * active independent space. Null when there is none.
     */
    public static function independentCode(): ?string
    {
        $code = (string) Config::get('INDEPENDENT_SCHOOL_CODE', '');
        if ($code !== '') {
            return $code;
        }
        $db = self::platform();
        if (!$db) {
            return null;
        }
        $found = $db->query("SELECT code FROM schools WHERE kind = 'independent' AND status = 'active' ORDER BY id LIMIT 1")->fetchColumn();
        return $found ?: null;
    }

    /** How a person at a school types their login: "amos@kings" (just "amos" at the home school) */
    public static function loginFor(string $username, string $code): string
    {
        return $code === self::homeCode() ? $username : $username . '@' . $code;
    }

    /**
     * Switch this session to a school (at login). Returns the school, or an error message.
     * An empty code, or the home code, means the home school.
     */
    public static function enter(string $code): array
    {
        $code = strtolower(trim($code));
        if ($code === '' || $code === self::homeCode()) {
            unset($_SESSION['tenant']);
            \eSpace\Config\Database::close();
            return ['school' => self::find(self::homeCode()) ?? ['code' => self::homeCode(), 'name' => null, 'kind' => 'school']];
        }
        $school = self::find($code);
        if (!$school) {
            return ['error' => 'There is no school with that code. Check the code with your school.'];
        }
        if ($school['status'] !== 'active') {
            return ['error' => 'Tusome is paused for this school. Please contact the school or the Tusome team.'];
        }
        $_SESSION['tenant'] = $school['code'];
        \eSpace\Config\Database::close();
        return ['school' => $school];
    }

    /**
     * Before any request is handled: a signed-in session whose school was paused or removed is
     * signed out at once.
     */
    public static function guardSession(): ?string
    {
        $code = self::sessionCode();
        if ($code === null || $code === self::homeCode()) {
            return null;
        }
        $school = self::find($code);
        if ($school && $school['status'] === 'active') {
            return null;
        }
        session_unset();
        return $school ? 'Tusome is paused for this school.' : 'This school is no longer on Tusome.';
    }

    /** A PDO for any school's database (developer portal work: enrolling, activating learners) */
    public static function connect(?string $dbName): \PDO
    {
        $c = Config::getDatabaseConfig(false);
        $pdo = new \PDO(
            sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $c['host'], $c['port'], $dbName ?: (string) Config::get('DB_NAME')),
            $c['username'],
            $c['password'],
            $c['options']
        );
        $pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("SET SESSION sql_mode = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION'");
        return $pdo;
    }
}
