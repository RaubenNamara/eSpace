<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Database updates for every school (developer portal, Updates). Each school has its own
 * database, so a new database/migrations/*.sql file has to reach all of them, not only St Mark's.
 *
 * The platform database records, per school, which files it has had (school_migrations). Pending
 * = the numbered .sql files it hasn't. Running goes school by school, file by file in order, and
 * stops a school at its first error - recorded with the message, tried again next time - so no
 * school is left with a later update on top of a failed one.
 *
 * Files are tracked by name, not number: some numbers are used twice (two 117_... files).
 */
final class SchemaUpdater
{
    public function __construct(private \PDO $platform)
    {
    }

    /** The numbered migration files, in the order they were written */
    public static function files(): array
    {
        $dir = dirname(__DIR__, 3) . '/database/migrations';
        $files = array_map('basename', glob($dir . '/*.sql') ?: []);
        $files = array_values(array_filter($files, fn($f) => preg_match('/^\d+_/', $f)));
        natsort($files);
        return array_values($files);
    }

    /** @return array<string, array{status: string, message: ?string}> by file name */
    public function recorded(int $schoolId): array
    {
        $stmt = $this->platform->prepare('SELECT migration, status, message FROM school_migrations WHERE school_id = ?');
        $stmt->execute([$schoolId]);
        $out = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $out[$r['migration']] = ['status' => $r['status'], 'message' => $r['message']];
        }
        return $out;
    }

    /** Files the school hasn't had (a failed one stays pending) */
    public function pending(int $schoolId): array
    {
        $done = $this->recorded($schoolId);
        return array_values(array_filter(self::files(), fn($f) => !isset($done[$f]) || $done[$f]['status'] === 'failed'));
    }

    /** Mark files as already in the school's database (no SQL is run) */
    public function baseline(int $schoolId, array $files): int
    {
        $known = array_flip(self::files());
        $stmt = $this->platform->prepare(
            "INSERT INTO school_migrations (school_id, migration, status) VALUES (?, ?, 'baseline')
             ON DUPLICATE KEY UPDATE status = IF(status = 'applied', 'applied', 'baseline'), message = NULL"
        );
        $n = 0;
        foreach ($files as $f) {
            if (isset($known[$f])) {
                $stmt->execute([$schoolId, $f]);
                $n++;
            }
        }
        return $n;
    }

    /** A new school's tables were copied from another school's: it has had the same files */
    public function inherit(int $schoolId, int $fromSchoolId): int
    {
        $done = array_keys(array_filter($this->recorded($fromSchoolId), fn($r) => $r['status'] !== 'failed'));
        return $this->baseline($schoolId, $done);
    }

    /**
     * Run the school's pending files, in order, stopping at the first error.
     * @return array{applied: string[], failed: ?array{file: string, message: string}}
     */
    public function run(int $schoolId, \PDO $db): array
    {
        $applied = [];
        $record = $this->platform->prepare(
            'INSERT INTO school_migrations (school_id, migration, status, message) VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE status = VALUES(status), message = VALUES(message)'
        );
        $dir = dirname(__DIR__, 3) . '/database/migrations/';
        foreach ($this->pending($schoolId) as $file) {
            try {
                foreach (self::statements((string) file_get_contents($dir . $file)) as $sql) {
                    $db->exec($sql);
                }
            } catch (\Throwable $e) {
                $message = mb_substr($e->getMessage(), 0, 1000);
                $record->execute([$schoolId, $file, 'failed', $message]);
                return ['applied' => $applied, 'failed' => ['file' => $file, 'message' => $message]];
            }
            $record->execute([$schoolId, $file, 'applied', null]);
            $applied[] = $file;
        }
        return ['applied' => $applied, 'failed' => null];
    }

    /**
     * A .sql file's statements: split on ; outside quotes and comments. Comments are dropped.
     * @return string[]
     */
    public static function statements(string $sql): array
    {
        $out = [];
        $buf = '';
        $len = strlen($sql);
        $quote = null;
        for ($i = 0; $i < $len; $i++) {
            $c = $sql[$i];
            $next = $sql[$i + 1] ?? '';
            if ($quote !== null) {
                $buf .= $c;
                if ($c === '\\' && $quote !== '`') {
                    $buf .= $next;
                    $i++;
                } elseif ($c === $quote) {
                    if ($next === $quote) { // '' inside a string
                        $buf .= $next;
                        $i++;
                    } else {
                        $quote = null;
                    }
                }
                continue;
            }
            if ($c === "'" || $c === '"' || $c === '`') {
                $quote = $c;
                $buf .= $c;
            } elseif ($c === '-' && $next === '-' && in_array($sql[$i + 2] ?? ' ', [' ', "\t", "\n", "\r"], true)) {
                while ($i < $len && $sql[$i] !== "\n") $i++;
                $buf .= "\n";
            } elseif ($c === '#') {
                while ($i < $len && $sql[$i] !== "\n") $i++;
                $buf .= "\n";
            } elseif ($c === '/' && $next === '*') {
                $end = strpos($sql, '*/', $i + 2);
                $i = $end === false ? $len : $end + 1;
                $buf .= ' ';
            } elseif ($c === ';') {
                if (trim($buf) !== '') $out[] = trim($buf);
                $buf = '';
            } else {
                $buf .= $c;
            }
        }
        if (trim($buf) !== '') $out[] = trim($buf);
        return $out;
    }
}
