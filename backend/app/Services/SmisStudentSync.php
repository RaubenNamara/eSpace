<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\App\Utils\GenderGuesser;
use eSpace\Config\Config;

/**
 * Brings eSpace's students in line with the school's SMIS roster (the St. Mark SMIS student API).
 * Run by the super admin's "Sync students from SMIS" toggle on Admin > Students; one run:
 *
 *  - New in SMIS: the student is created (username and first password = RegNo, like the original
 *    import script) in their class and stream, and enrolled in the compulsory departments for
 *    their level - O Level (S.1-S.4): MTC, BIO, CHEM, PHY, HIST, GEOG, ENG; A Level (S.5-S.6): GP -
 *    so they see those departments' published work straight away.
 *  - In both: login details (username, password) and names are never touched. If SMIS has them in
 *    another class or stream, their class and this year's active enrolments move with them (and a
 *    change of level adds the new level's compulsory departments).
 *  - In eSpace but no longer in SMIS: suspended - account deactivated (cannot sign in) and active
 *    enrolments withdrawn. What was withdrawn is recorded, so a student who reappears in SMIS is
 *    restored exactly. Students an admin deactivated by hand are never reactivated by the sync.
 *
 * All changes happen in one transaction: a failed run changes nothing. A run is refused when the
 * API answer looks wrong (empty, malformed, or far smaller than the school), so an SMIS outage can
 * never suspend the whole school.
 */
class SmisStudentSync
{
    public const DEFAULT_URL = 'https://smisug.com//STMARKLIBRARYAPI/SLISLIBRARYAPI/api/student';
    private const O_LEVEL = ['MTC', 'BIO', 'CHEM', 'PHY', 'HIST', 'GEOG', 'ENG'];
    private const A_LEVEL = ['GP'];
    /** a roster smaller than this share of the active students is treated as a broken answer */
    private const MIN_ROSTER_SHARE = 0.6;

    public function __construct(private \PDO $db)
    {
    }

    public function ensureTables(): void
    {
        $this->db->exec(
            "CREATE TABLE IF NOT EXISTS `smis_sync_runs` (
              `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
              `started_by` INT UNSIGNED DEFAULT NULL,
              `started_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              `finished_at` TIMESTAMP NULL DEFAULT NULL,
              `status` ENUM('running','success','failed') NOT NULL DEFAULT 'running',
              `fetched` INT UNSIGNED NOT NULL DEFAULT 0,
              `created` INT UNSIGNED NOT NULL DEFAULT 0,
              `enrolled` INT UNSIGNED NOT NULL DEFAULT 0,
              `moved` INT UNSIGNED NOT NULL DEFAULT 0,
              `suspended` INT UNSIGNED NOT NULL DEFAULT 0,
              `reactivated` INT UNSIGNED NOT NULL DEFAULT 0,
              `message` VARCHAR(1000) DEFAULT NULL,
              `details` LONGTEXT DEFAULT NULL,
              PRIMARY KEY (`id`),
              KEY `idx_smis_sync_runs_status` (`status`, `started_at`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );
        $this->db->exec(
            "CREATE TABLE IF NOT EXISTS `student_sync_suspensions` (
              `student_id` INT UNSIGNED NOT NULL,
              `run_id` INT UNSIGNED DEFAULT NULL,
              `suspended_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              `enrollment_ids` TEXT DEFAULT NULL,
              PRIMARY KEY (`student_id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );
    }

    /** The running run (if any) and the last few, for the toggle card. */
    public function status(): array
    {
        $this->ensureTables();
        // a run that never finished (server restarted mid-way) stops blocking after 15 minutes
        $this->db->exec("UPDATE smis_sync_runs SET status = 'failed', finished_at = NOW(), message = 'Stopped before it finished' WHERE status = 'running' AND started_at < NOW() - INTERVAL 15 MINUTE");
        $runs = $this->db->query(
            "SELECT r.id, r.started_at, r.finished_at, r.status, r.fetched, r.created, r.enrolled, r.moved, r.suspended, r.reactivated, r.message,
                    COALESCE(u.username, '') AS started_by_name
             FROM smis_sync_runs r LEFT JOIN users u ON u.id = r.started_by
             ORDER BY r.id DESC LIMIT 5"
        )->fetchAll(\PDO::FETCH_ASSOC);
        return ['running' => isset($runs[0]) && $runs[0]['status'] === 'running', 'runs' => $runs];
    }

    /** @return array{ok: bool, message: string, run: array|null} */
    public function run(?int $startedBy): array
    {
        $this->ensureTables();
        $lock = (int) $this->db->query("SELECT GET_LOCK('espace_smis_sync', 0)")->fetchColumn();
        if ($lock !== 1) {
            return ['ok' => false, 'message' => 'A sync is already running. Wait for it to finish.', 'run' => null];
        }
        $this->db->prepare("INSERT INTO smis_sync_runs (started_by) VALUES (?)")->execute([$startedBy]);
        $runId = (int) $this->db->lastInsertId();

        try {
            $result = $this->sync($runId);
            $this->finish($runId, 'success', $result['counts'], $result['message'], $result['details']);
            return ['ok' => true, 'message' => $result['message'], 'run' => $this->runRow($runId)];
        } catch (\Throwable $e) {
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            error_log('SMIS sync failed: ' . $e->getMessage());
            $message = $e instanceof \RuntimeException ? $e->getMessage() : 'The sync failed and nothing was changed.';
            $this->finish($runId, 'failed', [], $message, null);
            return ['ok' => false, 'message' => $message, 'run' => $this->runRow($runId)];
        } finally {
            $this->db->query("SELECT RELEASE_LOCK('espace_smis_sync')");
        }
    }

    private function sync(int $runId): array
    {
        $roster = $this->fetchRoster();

        $year = $this->db->query("SELECT id, name FROM academic_years WHERE is_current = 1 AND deleted_at IS NULL LIMIT 1")->fetch(\PDO::FETCH_ASSOC);
        if (!$year) {
            throw new \RuntimeException('There is no current academic year. Set one first (Academic Years).');
        }
        $departments = $this->compulsoryDepartments();

        $students = [];
        foreach ($this->db->query(
            "SELECT s.id, s.admission_number, s.is_active, s.class_id, c.name AS class_name, c.stream_name, c.level
             FROM students s LEFT JOIN classes c ON c.id = s.class_id WHERE s.deleted_at IS NULL"
        )->fetchAll(\PDO::FETCH_ASSOC) as $s) {
            $students[$this->key((string) $s['admission_number'])] = $s;
        }
        $activeCount = count(array_filter($students, fn ($s) => (int) $s['is_active'] === 1));
        if (count($roster) < self::MIN_ROSTER_SHARE * $activeCount) {
            throw new \RuntimeException(sprintf(
                'SMIS returned only %d students but eSpace has %d active. That looks like an SMIS problem, so nothing was changed.',
                count($roster), $activeCount
            ));
        }
        $suspendedBySync = array_flip(array_map('intval', $this->db->query("SELECT student_id FROM student_sync_suspensions")->fetchAll(\PDO::FETCH_COLUMN)));

        $counts = ['fetched' => count($roster), 'created' => 0, 'enrolled' => 0, 'moved' => 0, 'suspended' => 0, 'reactivated' => 0];
        $details = ['created' => [], 'moved' => [], 'suspended' => [], 'reactivated' => []];

        $this->db->beginTransaction();

        $insertStudent = $this->db->prepare(
            "INSERT INTO students (username, email, password, role, admission_number, first_name, last_name, gender, class_id, is_active, created_at, updated_at)
             VALUES (?, NULL, ?, 'student', ?, ?, ?, ?, ?, 1, NOW(), NOW())"
        );
        $moveStudent = $this->db->prepare("UPDATE students SET class_id = ?, updated_at = NOW() WHERE id = ?");
        $moveEnrollments = $this->db->prepare(
            "UPDATE student_department_enrollments SET class_id = ?, updated_at = NOW()
             WHERE student_id = ? AND status = 'active' AND deleted_at IS NULL AND academic_year = ?"
        );

        foreach ($roster as $key => $r) {
            [$className, $level] = $this->classOf($r['class']);
            $classId = $this->classId($className, $level, $r['stream'], (int) $year['id']);
            $label = "{$r['regNo']} {$r['name']} ({$className}-{$r['stream']})";
            $existing = $students[$key] ?? null;

            if ($existing === null) {
                [$first, $last] = $this->splitName($r['name']);
                $genderSource = $last !== '' ? $last : $first;
                $insertStudent->execute([
                    $r['regNo'], password_hash($r['regNo'], PASSWORD_BCRYPT), $r['regNo'],
                    $first, $last, GenderGuesser::guess(explode(' ', $genderSource)[0]), $classId,
                ]);
                $studentId = (int) $this->db->lastInsertId();
                $counts['enrolled'] += $this->enrol($studentId, $departments[$level], $classId, $year['name']);
                $counts['created']++;
                $details['created'][] = $label;
                continue;
            }

            $studentId = (int) $existing['id'];

            // came back to SMIS after the sync suspended them: restore what the sync took away
            if ((int) $existing['is_active'] === 0 && isset($suspendedBySync[$studentId])) {
                $this->reactivate($studentId);
                $counts['reactivated']++;
                $details['reactivated'][] = $label;
            }

            // another class or stream in SMIS: move them (logins and names untouched)
            if ((int) $existing['class_id'] !== $classId) {
                $moveStudent->execute([$classId, $studentId]);
                $moveEnrollments->execute([$classId, $studentId, $year['name']]);
                if (($existing['level'] ?? null) !== $level) {
                    $counts['enrolled'] += $this->enrol($studentId, $departments[$level], $classId, $year['name']);
                }
                $counts['moved']++;
                $from = $existing['class_name'] ? $existing['class_name'] . ($existing['stream_name'] ? '-' . $existing['stream_name'] : '') : 'no class';
                $details['moved'][] = "{$r['regNo']} {$r['name']}: {$from} -> {$className}-{$r['stream']}";
            }
        }

        // in eSpace, active, but no longer in SMIS: suspend
        $withdraw = $this->db->prepare(
            "UPDATE student_department_enrollments SET status = 'withdrawn', end_date = CURDATE(), updated_at = NOW()
             WHERE student_id = ? AND status = 'active' AND deleted_at IS NULL"
        );
        $activeEnrollments = $this->db->prepare("SELECT id FROM student_department_enrollments WHERE student_id = ? AND status = 'active' AND deleted_at IS NULL");
        $deactivate = $this->db->prepare("UPDATE students SET is_active = 0, updated_at = NOW() WHERE id = ?");
        $record = $this->db->prepare(
            "INSERT INTO student_sync_suspensions (student_id, run_id, suspended_at, enrollment_ids) VALUES (?, ?, NOW(), ?)
             ON DUPLICATE KEY UPDATE run_id = VALUES(run_id), suspended_at = NOW(), enrollment_ids = VALUES(enrollment_ids)"
        );
        foreach ($students as $key => $s) {
            if (isset($roster[$key]) || (int) $s['is_active'] !== 1) {
                continue;
            }
            $studentId = (int) $s['id'];
            $activeEnrollments->execute([$studentId]);
            $ids = array_map('intval', $activeEnrollments->fetchAll(\PDO::FETCH_COLUMN));
            $withdraw->execute([$studentId]);
            $deactivate->execute([$studentId]);
            $record->execute([$studentId, $runId, json_encode($ids)]);
            $counts['suspended']++;
            $details['suspended'][] = $s['admission_number'];
        }

        $this->db->commit();

        $parts = [];
        foreach (['created' => 'new students added', 'moved' => 'moved to their SMIS class/stream', 'suspended' => 'suspended (no longer in SMIS)', 'reactivated' => 'reactivated'] as $k => $text) {
            if ($counts[$k]) {
                $parts[] = "{$counts[$k]} {$text}";
            }
        }
        $message = 'Sync complete: ' . ($parts ? implode(', ', $parts) : 'everything already matched SMIS') . ". {$counts['fetched']} students in SMIS.";
        return ['counts' => $counts, 'message' => $message, 'details' => $details];
    }

    /** RegNo => [regNo, name, class, stream], from the SMIS API */
    private function fetchRoster(): array
    {
        $url = (string) (Config::get('SMIS_STUDENTS_API_URL') ?: self::DEFAULT_URL);
        $ch = curl_init($url);
        curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 90, CURLOPT_CONNECTTIMEOUT => 20, CURLOPT_FOLLOWLOCATION => true]);
        $body = curl_exec($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = curl_error($ch);
        curl_close($ch);
        if ($body === false || $code !== 200) {
            throw new \RuntimeException('Could not reach SMIS' . ($err ? " ({$err})" : " (HTTP {$code})") . '. Nothing was changed.');
        }
        $rows = json_decode((string) $body, true);
        if (!is_array($rows) || !$rows) {
            throw new \RuntimeException('SMIS sent an empty or unreadable list. Nothing was changed.');
        }
        $roster = [];
        foreach ($rows as $row) {
            $regNo = trim((string) ($row['RegNo'] ?? ''));
            $class = strtoupper(trim((string) ($row['Class'] ?? '')));
            if ($regNo === '' || !preg_match('/^S\.?\s*([1-6])$/', $class)) {
                continue;
            }
            $roster[$this->key($regNo)] = [
                'regNo' => $regNo,
                'name' => trim(preg_replace('/\s+/', ' ', (string) ($row['Name'] ?? ''))),
                'class' => $class,
                'stream' => trim((string) ($row['Stream'] ?? '')),
            ];
        }
        if (!$roster) {
            throw new \RuntimeException('SMIS sent no usable students. Nothing was changed.');
        }
        return $roster;
    }

    private function key(string $regNo): string
    {
        return strtoupper(trim($regNo));
    }

    /** "S1".."S6" -> ["S.1".."S.6", "O Level"|"A Level"] */
    private function classOf(string $code): array
    {
        $n = (int) preg_replace('/\D/', '', $code);
        return ['S.' . $n, $n >= 5 ? 'A Level' : 'O Level'];
    }

    private array $classCache = [];

    private function classId(string $name, string $level, string $stream, int $yearId): int
    {
        $k = "{$name}|{$stream}";
        if (isset($this->classCache[$k])) {
            return $this->classCache[$k];
        }
        $stmt = $this->db->prepare("SELECT id FROM classes WHERE name = ? AND stream_name = ? AND academic_year_id = ? AND deleted_at IS NULL ORDER BY id LIMIT 1");
        $stmt->execute([$name, $stream, $yearId]);
        $id = (int) $stmt->fetchColumn();
        if (!$id) {
            $this->db->prepare("INSERT INTO classes (name, level, stream_name, academic_year_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())")
                ->execute([$name, $level, $stream, $yearId]);
            $id = (int) $this->db->lastInsertId();
        }
        return $this->classCache[$k] = $id;
    }

    /** ['O Level' => [deptIds], 'A Level' => [deptIds]] - names matched ignoring dots/spaces ("G.P" is GP) */
    private function compulsoryDepartments(): array
    {
        $byName = [];
        foreach ($this->db->query("SELECT id, name FROM departments WHERE deleted_at IS NULL")->fetchAll(\PDO::FETCH_ASSOC) as $d) {
            $byName[preg_replace('/[^A-Z0-9]/', '', strtoupper((string) $d['name']))] = (int) $d['id'];
        }
        $out = [];
        foreach (['O Level' => self::O_LEVEL, 'A Level' => self::A_LEVEL] as $level => $names) {
            $missing = array_diff($names, array_keys($byName));
            if ($missing) {
                throw new \RuntimeException('Missing compulsory department(s): ' . implode(', ', $missing) . '. Nothing was changed.');
            }
            $out[$level] = array_map(fn ($n) => $byName[$n], $names);
        }
        return $out;
    }

    /** Active enrolment in each department for this year (skipping any they already have). */
    private function enrol(int $studentId, array $departmentIds, int $classId, string $yearName): int
    {
        $stmt = $this->db->prepare(
            "INSERT IGNORE INTO student_department_enrollments (student_id, department_id, academic_year, class_id, start_date, status, enrolled_at)
             VALUES (?, ?, ?, ?, CURDATE(), 'active', NOW())"
        );
        $n = 0;
        foreach ($departmentIds as $deptId) {
            $stmt->execute([$studentId, $deptId, $yearName, $classId]);
            $n += $stmt->rowCount();
        }
        return $n;
    }

    private function reactivate(int $studentId): void
    {
        $stmt = $this->db->prepare("SELECT enrollment_ids FROM student_sync_suspensions WHERE student_id = ?");
        $stmt->execute([$studentId]);
        $ids = json_decode((string) $stmt->fetchColumn(), true) ?: [];
        $restore = $this->db->prepare(
            "UPDATE IGNORE student_department_enrollments SET status = 'active', end_date = NULL, updated_at = NOW()
             WHERE id = ? AND student_id = ? AND status = 'withdrawn' AND deleted_at IS NULL"
        );
        foreach ($ids as $id) {
            $restore->execute([(int) $id, $studentId]);
        }
        $this->db->prepare("UPDATE students SET is_active = 1, updated_at = NOW() WHERE id = ?")->execute([$studentId]);
        $this->db->prepare("DELETE FROM student_sync_suspensions WHERE student_id = ?")->execute([$studentId]);
    }

    private function splitName(string $name): array
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [''];
        $first = (string) array_shift($parts);
        return [$first, implode(' ', $parts)];
    }

    private function finish(int $runId, string $status, array $counts, string $message, ?array $details): void
    {
        $this->db->prepare(
            "UPDATE smis_sync_runs SET status = ?, finished_at = NOW(), fetched = ?, created = ?, enrolled = ?, moved = ?, suspended = ?, reactivated = ?, message = ?, details = ? WHERE id = ?"
        )->execute([
            $status, $counts['fetched'] ?? 0, $counts['created'] ?? 0, $counts['enrolled'] ?? 0, $counts['moved'] ?? 0,
            $counts['suspended'] ?? 0, $counts['reactivated'] ?? 0, mb_substr($message, 0, 1000),
            $details !== null ? json_encode($details) : null, $runId,
        ]);
    }

    private function runRow(int $runId): ?array
    {
        $stmt = $this->db->prepare("SELECT id, started_at, finished_at, status, fetched, created, enrolled, moved, suspended, reactivated, message FROM smis_sync_runs WHERE id = ?");
        $stmt->execute([$runId]);
        return $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
    }
}
