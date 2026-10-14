<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

/**
 * Bulk subject enrolment from a spreadsheet: the admin uploads a workbook with a sheet per subject
 * (a list of student names and streams - e.g. a sitting plan), picks the subject for a sheet, and
 * the students on it are enrolled in that subject's department.
 *
 * The browser reads the sheet; here names are matched to students in the chosen class (forgiving
 * spelling, word order and spacing, helped by the stream), and nothing is saved until the admin
 * has checked the matches. Enrolling follows the same rule as the Enrol Students window: a student
 * already actively enrolled in the subject for the academic year is skipped, never duplicated.
 */
class BulkEnrolController extends Controller
{
    private function db()
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

    /** GET /admin/bulk-enrol/options - classes, subjects (departments) and academic years */
    public function options(): void
    {
        if (!$this->allowed()) return;
        $db = $this->db();
        $levels = $db->query("SELECT DISTINCT name FROM classes WHERE deleted_at IS NULL ORDER BY name")->fetchAll(\PDO::FETCH_COLUMN);
        $departments = $db->query("SELECT id, name, code FROM departments WHERE deleted_at IS NULL ORDER BY name")->fetchAll();
        $years = $db->query("SELECT id, name, is_current FROM academic_years WHERE deleted_at IS NULL ORDER BY name DESC")->fetchAll();
        $this->success([
            'levels' => $levels,
            'departments' => array_map(fn ($d) => ['id' => (int) $d['id'], 'name' => $d['name'], 'code' => $d['code']], $departments),
            'academic_years' => array_map(fn ($y) => ['id' => (int) $y['id'], 'name' => $y['name'], 'is_current' => (int) $y['is_current'] === 1], $years),
        ]);
    }

    // ---------------------------------------------------------------- name matching

    /** "  Nassonko  RUTH sanyu " -> ['NASSONKO', 'RUTH', 'SANYU'] */
    private static function tokens(string $name): array
    {
        $n = strtoupper(preg_replace('/[^A-Za-z]+/', ' ', $name) ?? '');
        return array_values(array_filter(explode(' ', $n), fn ($t) => strlen($t) >= 2));
    }

    /** How alike two name words are, 0..1 - forgiving one or two wrong letters */
    private static function wordSim(string $a, string $b): float
    {
        if ($a === $b) return 1.0;
        $max = max(strlen($a), strlen($b));
        // "ATWIINE" / "ATWIINEE", "MAXON" / "MAXSON"
        $sim = 1 - levenshtein($a, $b) / $max;
        // a shortened name: "CHRIS" / "CHRISTOPHER"
        if (min(strlen($a), strlen($b)) >= 4 && (str_starts_with($a, $b) || str_starts_with($b, $a))) $sim = max($sim, 0.85);
        return $sim;
    }

    /** How alike two names are, whatever order the words are in, 0..1 */
    private static function nameSim(array $row, array $cand): float
    {
        if (!$row || !$cand) return 0.0;
        $used = [];
        $sum = 0.0;
        foreach ($row as $w) {
            $best = 0.0;
            $bestJ = -1;
            foreach ($cand as $j => $c) {
                if (isset($used[$j])) continue;
                $s = self::wordSim($w, $c);
                if ($s > $best) {
                    $best = $s;
                    $bestJ = $j;
                }
            }
            if ($best >= 0.75 && $bestJ >= 0) {
                $used[$bestJ] = true;
                $sum += $best;
            }
        }
        $short = min(count($row), count($cand));
        $long = max(count($row), count($cand));
        // the shorter name fully found in the longer counts most (a middle name more or less is fine)
        return 0.7 * ($sum / $short) + 0.3 * ($sum / $long);
    }

    /** "East" / "e" / "S.1 E" -> "E" */
    private static function streamKey(?string $stream): string
    {
        $s = strtoupper(trim((string) $stream));
        if ($s === '') return '';
        // "S.1 E", "S1E" - the stream is the last letter group
        if (preg_match('/^S\.?\s*\d+\s*([A-Z]+)$/', $s, $m)) $s = $m[1];
        return $s[0];
    }

    /**
     * POST /admin/bulk-enrol/match
     * { level: "S.1", academic_year_id, department_ids: [], rows: [{ row, name, stream }] }
     */
    public function match(): void
    {
        if (!$this->allowed()) return;
        $level = trim((string) ($this->input('level') ?? ''));
        $yearId = (int) $this->input('academic_year_id', 0);
        $deptIds = array_values(array_filter(array_map('intval', (array) ($this->input('department_ids') ?? []))));
        $rows = (array) ($this->input('rows') ?? []);
        if ($level === '' || $yearId <= 0 || !$rows) {
            $this->validationError(['rows' => 'Choose the class, the academic year and a sheet with names']);
            return;
        }
        if (count($rows) > 2000) {
            $this->validationError(['rows' => 'A sheet can have at most 2,000 names']);
            return;
        }
        $db = $this->db();
        $stmt = $db->prepare("SELECT name FROM academic_years WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$yearId]);
        $yearName = $stmt->fetchColumn();
        if ($yearName === false) {
            $this->validationError(['academic_year_id' => 'Academic year not found']);
            return;
        }

        // Everyone in the class (all its streams)
        $stmt = $db->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.class_id, c.stream_name
             FROM students s JOIN classes c ON c.id = s.class_id
             WHERE s.deleted_at IS NULL AND c.deleted_at IS NULL AND c.name = ?"
        );
        $stmt->execute([$level]);
        $students = [];
        foreach ($stmt->fetchAll() as $s) {
            $full = trim($s['first_name'] . ' ' . $s['last_name']);
            $students[] = [
                'id' => (int) $s['id'],
                'name' => $full,
                'admission_number' => $s['admission_number'],
                'stream' => $s['stream_name'],
                'class_id' => (int) $s['class_id'],
                'tokens' => self::tokens($full),
                'streamKey' => self::streamKey($s['stream_name']),
            ];
        }

        // Who is already in the chosen subjects this year
        $enrolled = [];
        if ($deptIds && $students) {
            $ph = implode(',', array_fill(0, count($deptIds), '?'));
            $stmt = $db->prepare(
                "SELECT student_id, department_id FROM student_department_enrollments
                 WHERE department_id IN ($ph) AND academic_year = ? AND status = 'active' AND deleted_at IS NULL"
            );
            $stmt->execute([...$deptIds, $yearName]);
            foreach ($stmt->fetchAll() as $e) $enrolled[(int) $e['student_id']][] = (int) $e['department_id'];
        }

        $out = [];
        $seen = [];
        foreach ($rows as $r) {
            $name = trim((string) ($r['name'] ?? ''));
            $stream = trim((string) ($r['stream'] ?? ''));
            $rowTokens = self::tokens($name);
            $rowStream = self::streamKey($stream);
            $scored = [];
            foreach ($students as $s) {
                $score = self::nameSim($rowTokens, $s['tokens']);
                if ($score < 0.45) continue;
                // the stream on the sheet helps tell apart students with similar names
                if ($rowStream !== '') $score += $s['streamKey'] === $rowStream ? 0.08 : -0.1;
                $scored[] = ['score' => min(1.0, $score), 's' => $s];
            }
            usort($scored, fn ($a, $b) => $b['score'] <=> $a['score']);
            $best = $scored[0] ?? null;
            $second = $scored[1] ?? null;
            $candidates = array_map(fn ($x) => [
                'id' => $x['s']['id'], 'name' => $x['s']['name'], 'admission_number' => $x['s']['admission_number'],
                'stream' => $x['s']['stream'], 'score' => round($x['score'], 2),
            ], array_slice(array_filter($scored, fn ($x) => $x['score'] >= 0.5), 0, 4));

            $status = 'not_found';
            $match = null;
            if ($best && $best['score'] >= 0.85 && (!$second || $second['score'] < $best['score'] - 0.1)) {
                $status = 'matched';
                $match = $best['s'];
            } elseif ($best && $best['score'] >= 0.6) {
                $status = 'check';
            }
            if ($match) {
                if (isset($seen[$match['id']])) $status = 'repeat';
                $seen[$match['id']] = true;
            }
            $out[] = [
                'row' => $r['row'] ?? null,
                'name' => $name,
                'stream' => $stream,
                'status' => $status,
                'student' => $match ? ['id' => $match['id'], 'name' => $match['name'], 'admission_number' => $match['admission_number'], 'stream' => $match['stream']] : null,
                'candidates' => $status === 'matched' ? [] : $candidates,
            ];
        }

        $this->success([
            'rows' => $out,
            // for the rows the admin picks a student on: who is already in which subject
            'enrolled' => (object) array_map(fn ($ds) => array_values(array_unique($ds)), $enrolled),
            'class_size' => count($students),
        ]);
    }

    /**
     * POST /admin/bulk-enrol/commit  { academic_year_id, department_ids: [], student_ids: [] }
     * Each student goes into each subject under their own stream - unless already in it this year.
     */
    public function commit(): void
    {
        if (!$this->allowed()) return;
        $yearId = (int) $this->input('academic_year_id', 0);
        $deptIds = array_values(array_unique(array_filter(array_map('intval', (array) ($this->input('department_ids') ?? [])))));
        $studentIds = array_values(array_unique(array_filter(array_map('intval', (array) ($this->input('student_ids') ?? [])))));
        if ($yearId <= 0 || !$deptIds || !$studentIds) {
            $this->validationError(['student_ids' => 'Nothing to enrol']);
            return;
        }
        $db = $this->db();
        $stmt = $db->prepare("SELECT name FROM academic_years WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$yearId]);
        $yearName = $stmt->fetchColumn();
        if ($yearName === false) {
            $this->validationError(['academic_year_id' => 'Academic year not found']);
            return;
        }
        $ph = implode(',', array_fill(0, count($deptIds), '?'));
        $stmt = $db->prepare("SELECT id, name FROM departments WHERE id IN ($ph) AND deleted_at IS NULL");
        $stmt->execute($deptIds);
        $depts = $stmt->fetchAll(\PDO::FETCH_KEY_PAIR);
        if (count($depts) !== count($deptIds)) {
            $this->validationError(['department_ids' => 'A chosen subject was not found']);
            return;
        }

        $ph = implode(',', array_fill(0, count($studentIds), '?'));
        $stmt = $db->prepare("SELECT id, class_id FROM students WHERE id IN ($ph) AND deleted_at IS NULL");
        $stmt->execute($studentIds);
        $classOf = $stmt->fetchAll(\PDO::FETCH_KEY_PAIR);

        $exists = $db->prepare("SELECT 1 FROM student_department_enrollments WHERE student_id = ? AND department_id = ? AND academic_year = ? AND status = 'active' AND deleted_at IS NULL");
        $insert = $db->prepare("INSERT IGNORE INTO student_department_enrollments (student_id, department_id, academic_year, class_id, start_date, status) VALUES (?, ?, ?, ?, CURDATE(), 'active')");

        $results = [];
        $db->beginTransaction();
        try {
            foreach ($deptIds as $deptId) {
                $added = 0;
                $already = 0;
                foreach ($studentIds as $sid) {
                    if (!isset($classOf[$sid])) continue;
                    $exists->execute([$sid, $deptId, $yearName]);
                    if ($exists->fetchColumn()) {
                        $already++;
                        continue;
                    }
                    $insert->execute([$sid, $deptId, $yearName, $classOf[$sid]]);
                    if ($insert->rowCount() > 0) $added++;
                    else $already++;
                }
                $results[] = ['department_id' => $deptId, 'department' => $depts[$deptId], 'enrolled' => $added, 'already' => $already];
            }
            $db->commit();
        } catch (\Throwable $e) {
            $db->rollBack();
            error_log('BulkEnrol commit: ' . $e->getMessage());
            $this->error('Could not enrol the students - nothing was changed.', 500);
            return;
        }
        $this->success(['results' => $results, 'students' => count($classOf)]);
    }
}
