<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Utils\GenderGuesser;

/**
 * Import learners from a spreadsheet - how a new school gets its whole register into Tusome in
 * one go (schools without an SMIS feed have no other way than typing them in one by one).
 *
 * The browser reads the sheet and sends its rows; nothing is saved until the admin has seen the
 * preview and confirmed. One row per learner:
 *
 *  - name: "surname, other names" or "SURNAME Other Names" (a register's order: surname first),
 *    or separate surname / other_names (first_name / last_name) columns
 *  - class: S.1 ... S.6 ("S1", "Senior 1" and "S.1 A" all work; a stream can ride along)
 *  - stream (optional), sex (optional - guessed from the first name when blank), LIN (optional)
 *  - admission number (optional - one is made when blank: the year and a running number)
 *  - subjects (optional): subject codes or names, separated by commas, on top of the subjects
 *    the admin ticks for every O Level / A Level learner
 *
 * A learner's username and first password are their admission number, as when an admin adds one
 * by hand. Missing classes and streams are created when the admin allows it. All of it happens
 * in one transaction: a failed import changes nothing.
 */
class StudentImportController extends Controller
{
    private const MAX_ROWS = 3000;

    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function allowed(): bool
    {
        if (!$this->isAuthenticated() || !in_array($this->getCurrentUserRole(), ['admin', 'super_admin'], true)) {
            $this->forbidden();
            return false;
        }
        return true;
    }

    /** "S.1", "s1", "Senior 1", "S 1" -> "S.1"; anything else is kept as typed */
    private static function className(string $raw): string
    {
        $t = strtoupper(trim($raw));
        if (preg_match('/^(?:S|SENIOR|SEN|FORM|F)\s*\.?\s*([1-6])$/', $t, $m)) {
            return 'S.' . $m[1];
        }
        return trim($raw);
    }

    /** a class cell may carry its stream: "S.1 A", "S1-East", "Senior 2 North" */
    private static function splitClass(string $raw): array
    {
        $t = trim($raw);
        if (preg_match('/^((?:S|SENIOR|SEN|FORM|F)\s*\.?\s*[1-6])(?:\s*[-\/ ]\s*|(?=[A-Z]))(.+)$/i', $t, $m)) {
            return [self::className($m[1]), trim($m[2])];
        }
        return [self::className($t), ''];
    }

    private static function levelOf(string $className): string
    {
        return preg_match('/^S\.([56])$/', $className) ? 'A Level' : 'O Level';
    }

    private static function key(string $s): string
    {
        return preg_replace('/[^A-Z0-9]/', '', strtoupper($s)) ?? '';
    }

    private static function gender(string $raw): ?string
    {
        $g = strtolower(trim($raw));
        if ($g === '') return null;
        if (in_array($g, ['m', 'male', 'boy', 'b'], true)) return 'male';
        if (in_array($g, ['f', 'female', 'girl', 'g'], true)) return 'female';
        return 'invalid';
    }

    /** [last_name, first_name] from a row: separate columns, or one name in register order */
    private static function names(array $row): array
    {
        $last = trim((string) ($row['surname'] ?? $row['last_name'] ?? ''));
        $first = trim((string) ($row['other_names'] ?? $row['first_name'] ?? $row['given_names'] ?? ''));
        if ($last !== '' || $first !== '') {
            return [$last, $first];
        }
        $full = trim(preg_replace('/\s+/', ' ', (string) ($row['name'] ?? $row['full_name'] ?? $row['learner'] ?? $row['student_name'] ?? '')) ?? '');
        if ($full === '') return ['', ''];
        if (str_contains($full, ',')) {
            [$a, $b] = array_map('trim', explode(',', $full, 2));
            return [$a, $b];
        }
        $parts = explode(' ', $full);
        $last = array_shift($parts);
        return [$last, implode(' ', $parts)];
    }

    /** Proper case for words typed in capitals ("OKELLO JAMES Peter" -> "Okello James Peter"), others left alone */
    private static function tidy(string $name): string
    {
        $words = explode(' ', trim(preg_replace('/\s+/', ' ', $name) ?? ''));
        foreach ($words as &$w) {
            if (mb_strlen($w) > 1 && $w === mb_strtoupper($w)) {
                $w = mb_convert_case(mb_strtolower($w), MB_CASE_TITLE, 'UTF-8');
            }
        }
        return implode(' ', $words);
    }

    /** GET /admin/students/import/options - subjects to tick per level, and the classes there are */
    public function options(): void
    {
        if (!$this->allowed()) return;
        $db = $this->db();
        $subjects = $db->query("SELECT id, name, COALESCE(NULLIF(description, ''), name) AS label FROM departments WHERE deleted_at IS NULL ORDER BY label")
            ->fetchAll(\PDO::FETCH_ASSOC);
        // the compulsory subjects, ticked to begin with (where the school has them)
        $compulsory = ['O Level' => ['MTC', 'BIO', 'CHEM', 'PHY', 'HIST', 'GEOG', 'ENG'], 'A Level' => ['GP']];
        $byKey = [];
        foreach ($subjects as $s) {
            $byKey[self::key((string) $s['name'])] = (int) $s['id'];
        }
        $defaults = [];
        foreach ($compulsory as $level => $codes) {
            $defaults[$level] = array_values(array_filter(array_map(fn ($c) => $byKey[$c] ?? null, $codes)));
        }
        $year = $db->query("SELECT name FROM academic_years WHERE is_current = 1 AND deleted_at IS NULL LIMIT 1")->fetchColumn();
        $classes = $db->query(
            "SELECT c.id, c.name, COALESCE(c.stream_name, '') AS stream_name,
                    (SELECT COUNT(*) FROM students s WHERE s.class_id = c.id AND s.deleted_at IS NULL) AS learners
               FROM classes c WHERE c.deleted_at IS NULL ORDER BY c.name, c.stream_name"
        )->fetchAll(\PDO::FETCH_ASSOC);

        $this->success([
            'subjects' => array_map(fn ($s) => ['id' => (int) $s['id'], 'code' => $s['name'], 'name' => $s['label']], $subjects),
            'defaults' => $defaults,
            'academic_year' => $year ?: null,
            'classes' => $classes,
        ]);
    }

    /**
     * POST /admin/students/import
     * { rows: [...], confirm: bool, create_classes: bool, subjects: { "O Level": [ids], "A Level": [ids] } }
     */
    public function import(): void
    {
        if (!$this->allowed()) return;
        $rows = $this->input('rows', []);
        $confirm = (bool) $this->input('confirm', false);
        $createClasses = (bool) $this->input('create_classes', true);
        $levelSubjects = (array) $this->input('subjects', []);

        if (!is_array($rows) || !$rows) {
            $this->validationError(['rows' => 'No learners found in the file.']);
            return;
        }
        if (count($rows) > self::MAX_ROWS) {
            $this->validationError(['rows' => 'At most ' . self::MAX_ROWS . ' learners at a time - split the file.']);
            return;
        }

        $db = $this->db();
        $year = $db->query("SELECT id, name FROM academic_years WHERE is_current = 1 AND deleted_at IS NULL LIMIT 1")->fetch(\PDO::FETCH_ASSOC);
        if (!$year) {
            $this->error('Set the current school year first (Academic years), then import.', 422);
            return;
        }
        $yearId = (int) $year['id'];
        $yearName = (string) $year['name'];

        // ---- what exists already ----
        $classes = []; // "S.1|A" (keys) => id
        foreach ($db->query("SELECT id, name, COALESCE(stream_name, '') AS stream FROM classes WHERE deleted_at IS NULL ORDER BY academic_year_id = {$yearId} DESC, id")->fetchAll(\PDO::FETCH_ASSOC) as $c) {
            $k = self::key(self::className((string) $c['name'])) . '|' . self::key((string) $c['stream']);
            $classes[$k] ??= ['id' => (int) $c['id'], 'name' => $c['name'], 'stream' => $c['stream']];
        }
        $streamsOf = []; // class key => [stream keys]
        foreach ($classes as $k => $_) {
            [$ck, $sk] = explode('|', $k, 2);
            $streamsOf[$ck][] = $sk;
        }
        $subjects = []; // code or name key => [id, code]
        foreach ($db->query("SELECT id, name, description FROM departments WHERE deleted_at IS NULL")->fetchAll(\PDO::FETCH_ASSOC) as $d) {
            $subjects[self::key((string) $d['name'])] = ['id' => (int) $d['id'], 'code' => $d['name']];
            if (!empty($d['description'])) {
                $subjects[self::key((string) $d['description'])] ??= ['id' => (int) $d['id'], 'code' => $d['name']];
            }
        }
        $validIds = array_column($subjects, 'id');
        $forLevel = [];
        foreach (['O Level', 'A Level'] as $lv) {
            $forLevel[$lv] = array_values(array_intersect(array_map('intval', (array) ($levelSubjects[$lv] ?? [])), $validIds));
        }
        $taken = [];
        foreach ($db->query("SELECT admission_number, username FROM students")->fetchAll(\PDO::FETCH_ASSOC) as $s) {
            $taken[strtoupper((string) $s['admission_number'])] = true;
            if ($s['username'] !== null) $taken[strtoupper((string) $s['username'])] = true;
        }

        // admission numbers made for rows without one: "26-0001", the next free number this year
        $prefix = substr((string) $yearName, -2) . '-';
        $next = 1;
        $makeNumber = static function () use (&$next, &$taken, $prefix): string {
            do {
                $n = $prefix . str_pad((string) $next++, 4, '0', STR_PAD_LEFT);
            } while (isset($taken[$n]));
            return $n;
        };

        // ---- check every row ----
        $results = [];
        $newClasses = [];
        $seen = [];
        foreach (array_values($rows) as $i => $row) {
            if (!is_array($row)) continue;
            $rowNo = (int) ($row['_row'] ?? ($i + 2));
            $errors = [];
            [$last, $first] = self::names($row);
            $last = self::tidy($last);
            $first = self::tidy($first);
            if ($last === '' || $first === '') {
                $errors[] = $last === '' && $first === '' ? 'No name' : 'Give both the surname and other names';
            }
            if (mb_strlen($last) > 50 || mb_strlen($first) > 50) {
                $errors[] = 'Name too long';
            }

            [$className, $streamInCell] = self::splitClass((string) ($row['class'] ?? $row['class_name'] ?? $row['form'] ?? ''));
            $stream = trim((string) ($row['stream'] ?? '')) ?: $streamInCell;
            if ($className === '') {
                $errors[] = 'No class';
            }
            $ck = self::key($className);
            $sk = self::key($stream);
            // a school with one stream per class may leave the stream out
            if ($stream === '' && isset($streamsOf[$ck]) && count($streamsOf[$ck]) === 1) {
                $sk = $streamsOf[$ck][0];
            }
            $classKey = "{$ck}|{$sk}";
            $classLabel = trim($className . ' ' . $stream);
            $classIsNew = false;
            if ($className !== '' && $stream === '' && !isset($classes[$classKey]) && !empty($streamsOf[$ck])) {
                $have = array_map(fn ($k) => $classes["{$ck}|{$k}"]['stream'], $streamsOf[$ck]);
                $errors[] = "{$className} has streams " . implode(', ', array_filter($have)) . ' - give the stream';
            } elseif ($className !== '' && !isset($classes[$classKey])) {
                if (!preg_match('/^S\.[1-6]$/', $className)) {
                    $errors[] = "Class '{$className}' is not S.1 to S.6";
                } elseif (!$createClasses) {
                    $errors[] = "No class {$classLabel} in Tusome";
                } else {
                    $classIsNew = true;
                    $newClasses[$classKey] = $classLabel;
                }
            } elseif (isset($classes[$classKey])) {
                $classLabel = trim($classes[$classKey]['name'] . ' ' . $classes[$classKey]['stream']);
            }

            $gender = self::gender((string) ($row['sex'] ?? $row['gender'] ?? ''));
            if ($gender === 'invalid') {
                $errors[] = 'Sex should be M or F';
            }
            $genderGuessed = $gender === null;
            if ($genderGuessed) {
                $gender = GenderGuesser::guess($first);
            }

            $adm = trim((string) ($row['admission_number'] ?? $row['admission_no'] ?? $row['adm_no'] ?? $row['reg_no'] ?? $row['regno'] ?? $row['student_number'] ?? ''));
            if ($adm !== '') {
                if (mb_strlen($adm) > 20) {
                    $errors[] = 'Admission number longer than 20 characters';
                } elseif (isset($taken[strtoupper($adm)])) {
                    $errors[] = "Admission number {$adm} is already in Tusome";
                } elseif (isset($seen[strtoupper($adm)])) {
                    $errors[] = "Admission number {$adm} appears twice in the file (row {$seen[strtoupper($adm)]})";
                }
            }

            $lin = trim((string) ($row['lin'] ?? ''));
            if (mb_strlen($lin) > 20) {
                $errors[] = 'LIN longer than 20 characters';
            }

            $mine = [];
            $unknown = [];
            foreach (preg_split('/[,;\/]+/', (string) ($row['subjects'] ?? '')) ?: [] as $s) {
                if (trim($s) === '') continue;
                $hit = $subjects[self::key($s)] ?? null;
                if ($hit) $mine[$hit['id']] = $hit['code'];
                else $unknown[] = trim($s);
            }
            if ($unknown) {
                $errors[] = 'Unknown subject' . (count($unknown) > 1 ? 's' : '') . ': ' . implode(', ', $unknown);
            }

            $result = [
                'row' => $rowNo,
                'name' => trim("{$last} {$first}"),
                'last_name' => $last,
                'first_name' => $first,
                'class' => $classLabel,
                'class_key' => $classKey,
                'new_class' => $classIsNew,
                'gender' => $gender,
                'gender_guessed' => $genderGuessed,
                'admission_number' => $adm,
                'lin' => $lin,
                'subject_ids' => array_keys($mine),
                'level' => self::levelOf($className),
            ];
            if ($errors) {
                $result['status'] = 'failed';
                $result['errors'] = $errors;
            } else {
                $result['status'] = 'valid';
                if ($adm !== '') $seen[strtoupper($adm)] = $rowNo;
            }
            $results[] = $result;
        }

        // numbers for those without one (after every given number is known, so none collide)
        foreach ($results as &$r) {
            if ($r['status'] === 'valid' && $r['admission_number'] === '') {
                $r['admission_number'] = $makeNumber();
                $r['number_made'] = true;
                $taken[strtoupper($r['admission_number'])] = true;
            } elseif ($r['status'] === 'valid') {
                $taken[strtoupper($r['admission_number'])] = true;
            }
        }
        unset($r);

        $valid = array_values(array_filter($results, fn ($r) => $r['status'] === 'valid'));
        $usedNew = array_unique(array_column(array_filter($valid, fn ($r) => $r['new_class']), 'class_key'));
        $summary = [
            'total' => count($results),
            'valid' => count($valid),
            'failed' => count($results) - count($valid),
            'new_classes' => array_values(array_map(fn ($k) => $newClasses[$k], $usedNew)),
            'numbers_made' => count(array_filter($valid, fn ($r) => !empty($r['number_made']))),
            'genders_guessed' => count(array_filter($valid, fn ($r) => $r['gender_guessed'])),
        ];
        $public = static fn (array $r): array => array_diff_key($r, ['class_key' => 1, 'subject_ids' => 1, 'last_name' => 1, 'first_name' => 1]);

        if (!$confirm) {
            $this->success(['summary' => $summary, 'results' => array_map($public, $results)], 'Preview');
            return;
        }
        if (!$valid) {
            $this->error('There is no learner ready to import - fix the rows marked in red.', 422);
            return;
        }

        // ---- save ----
        @set_time_limit(300);
        $db->beginTransaction();
        try {
            $insClass = $db->prepare("INSERT INTO classes (name, level, stream_name, academic_year_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())");
            $classIds = [];
            foreach ($valid as $r) {
                $k = $r['class_key'];
                if (isset($classIds[$k])) continue;
                if (isset($classes[$k])) {
                    $classIds[$k] = $classes[$k]['id'];
                    continue;
                }
                $label = $newClasses[$k];
                [$cn, $st] = self::splitClass($label);
                $cn = self::className($cn);
                $st = strtoupper($st) === $st ? $st : ucfirst($st);
                $insClass->execute([$cn, self::levelOf($cn), $st, $yearId]);
                $classIds[$k] = (int) $db->lastInsertId();
            }

            $insStudent = $db->prepare(
                "INSERT INTO students (username, password, role, admission_number, lin, first_name, last_name, gender, class_id, is_active, created_at, updated_at)
                 VALUES (?, ?, 'student', ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())"
            );
            $insEnrol = $db->prepare(
                "INSERT IGNORE INTO student_department_enrollments (student_id, department_id, academic_year, class_id, start_date, status)
                 VALUES (?, ?, ?, ?, CURDATE(), 'active')"
            );
            $byClass = [];
            $enrolments = 0;
            foreach ($valid as $r) {
                $adm = $r['admission_number'];
                $classId = $classIds[$r['class_key']];
                // a lighter hash keeps a whole register within the time limit (the first password is the admission number)
                $insStudent->execute([
                    $adm, password_hash($adm, PASSWORD_BCRYPT, ['cost' => 8]), $adm, $r['lin'] !== '' ? $r['lin'] : null,
                    $r['first_name'], $r['last_name'], $r['gender'], $classId,
                ]);
                $sid = (int) $db->lastInsertId();
                $deps = array_unique(array_merge($forLevel[$r['level']] ?? [], $r['subject_ids']));
                foreach ($deps as $d) {
                    $insEnrol->execute([$sid, $d, $yearName, $classId]);
                    $enrolments += $insEnrol->rowCount();
                }
                $byClass[$classId] = ($byClass[$classId] ?? ['class_id' => $classId, 'class' => $r['class'], 'learners' => 0, 'without_subjects' => 0]);
                $byClass[$classId]['learners']++;
                if (!$deps) $byClass[$classId]['without_subjects']++;
            }
            $db->commit();
        } catch (\Throwable $e) {
            if ($db->inTransaction()) $db->rollBack();
            error_log('Learner import failed: ' . $e->getMessage());
            $this->error('The import failed and nothing was saved: ' . $e->getMessage(), 500);
            return;
        }

        $classesOut = array_values($byClass);
        usort($classesOut, fn ($a, $b) => strnatcmp($a['class'], $b['class']));
        $summary['imported'] = count($valid);
        $summary['enrolments'] = $enrolments;
        $this->success([
            'summary' => $summary,
            'classes' => $classesOut,
            'results' => array_map($public, $results),
        ], count($valid) . ' learners imported');
    }
}
