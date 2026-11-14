<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Support\Tenant;
use eSpace\App\Utils\MimeType;

/**
 * Cases - a learner's discipline record (migration 163).
 *
 * A teacher or HOD finds a learner, records what happened (date, type, how serious, what was done)
 * and attaches evidence - a photo or PDF, such as a written apology. Teachers see only the cases
 * they reported. HODs and every admin (the DOS included) see every case, learner by learner, newest
 * first, each with who reported it, and print a disciplinary report for a learner, a stream, a
 * class or the whole school. Admins resolve cases and note the committee's decision; only the super
 * admin deletes a case. Learners and parents never see cases.
 *
 * Evidence is stored outside the public folder (backend/storage/cases/{school}/) and served by
 * file() only to the case's reporter and to those who see every case.
 *
 * Teacher / HOD:          GET /cases/students?q=   GET /cases   POST /cases (multipart)
 * HOD and admins:         GET /case-records?q=   GET /case-records/students/{id}
 *                         GET /case-records/report?scope=&value=&from=&to=   GET /case-records/scopes
 * Admins:                 PUT /case-records/{id} { status?, admin_note? }
 * Super admin:            DELETE /case-records/{id}
 * Everyone above:         GET /cases/files/{id}
 */
class CaseController extends Controller
{
    public const CATEGORIES = ['Bullying', 'Fighting', 'Disrespect', 'Cheating', 'Absent without leave', 'Late coming', 'Uniform', 'Phone or gadget', 'Theft', 'Damage to property', 'Substance use', 'Other'];
    private const SEVERITIES = ['minor', 'serious', 'major'];
    private const MAX_FILES = 5;
    private const MAX_BYTES = 8 * 1024 * 1024;
    private const ALLOWED = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'application/pdf' => 'pdf'];

    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function role(): string
    {
        return (string) ($this->getCurrentUserRole() ?? '');
    }

    /** Records cases: teachers, HODs and the super admin */
    private function isReporterRole(): bool
    {
        return in_array($this->role(), ['teacher', 'hod', 'super_admin'], true);
    }

    private function isSuperAdmin(): bool
    {
        return $this->role() === 'super_admin';
    }

    /** Sees every case: HODs and every admin */
    private function isViewer(): bool
    {
        return in_array($this->role(), ['hod', 'admin', 'super_admin'], true);
    }

    /** Resolves cases and writes the committee's note: every admin */
    private function isManager(): bool
    {
        return in_array($this->role(), ['admin', 'super_admin'], true);
    }

    /** The signed-in reporter: [role, id, name] */
    private function reporter(): array
    {
        $role = $this->role();
        $id = (int) ($_SESSION['user_id'] ?? 0);
        $name = '';
        // the super admin's cases are marked as theirs: "Super admin" (with their username)
        if ($role === 'super_admin') {
            $user = trim((string) ($_SESSION['username'] ?? ''));
            return [$role, $id, $user !== '' ? "Super admin ({$user})" : 'Super admin'];
        }
        $table = $role === 'hod' ? 'hods' : 'teachers';
        try {
            $stmt = $this->db()->prepare("SELECT first_name, last_name FROM {$table} WHERE id = ?");
            $stmt->execute([$id]);
            if ($r = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $name = trim($r['first_name'] . ' ' . $r['last_name']);
            }
        } catch (\PDOException $e) {
            // no such table: fall back to the username
        }
        return [$role, $id, ucwords(strtolower($name ?: (string) ($_SESSION['username'] ?? 'Staff')))];
    }

    private static function folder(): string
    {
        $school = preg_replace('/[^a-z0-9-]/', '', (string) (Tenant::sessionCode() ?? Tenant::homeCode())) ?: 'home';
        return dirname(__DIR__, 2) . '/storage/cases/' . $school;
    }

    // ------------------------------------------------------------------ teachers and HODs

    /** GET /cases/students?q= - learners by name or admission number, for the report form */
    public function students(): void
    {
        if (!$this->isAuthenticated() || !$this->isReporterRole()) {
            $this->forbidden();
            return;
        }
        $q = trim((string) $this->query('q', ''));
        if (mb_strlen($q) < 2) {
            $this->success(['students' => []]);
            return;
        }
        $like = '%' . str_replace(['%', '_'], ['\\%', '\\_'], $q) . '%';
        $stmt = $this->db()->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.profile_photo, c.name AS class_name, c.stream_name
             FROM students s LEFT JOIN classes c ON c.id = s.class_id
             WHERE s.deleted_at IS NULL
               AND (CONCAT(s.first_name, ' ', s.last_name) LIKE ? OR CONCAT(s.last_name, ' ', s.first_name) LIKE ? OR s.admission_number LIKE ?)
             ORDER BY s.first_name, s.last_name LIMIT 15"
        );
        $stmt->execute([$like, $like, $like]);
        $this->success(['students' => array_map([$this, 'learner'], $stmt->fetchAll(\PDO::FETCH_ASSOC))]);
    }

    /** GET /cases - the cases this teacher reported, newest first */
    public function mine(): void
    {
        if (!$this->isAuthenticated() || !$this->isReporterRole()) {
            $this->forbidden();
            return;
        }
        [$role, $id] = $this->reporter();
        $stmt = $this->db()->prepare(
            "SELECT k.*, s.first_name, s.last_name, s.admission_number, s.profile_photo, c.name AS class_name, c.stream_name
             FROM student_cases k INNER JOIN students s ON s.id = k.student_id LEFT JOIN classes c ON c.id = s.class_id
             WHERE k.deleted_at IS NULL AND k.reporter_role = ? AND k.reporter_id = ?
             ORDER BY k.occurred_on DESC, k.id DESC LIMIT 300"
        );
        $stmt->execute([$role, $id]);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $this->success(['cases' => $this->withFiles($rows, true), 'categories' => self::CATEGORIES]);
    }

    /** POST /cases (multipart) - record a case, with up to five photos or PDFs as evidence */
    public function store(): void
    {
        if (!$this->isAuthenticated() || !$this->isReporterRole()) {
            $this->forbidden();
            return;
        }
        $studentId = (int) $this->input('student_id', 0);
        $occurred = (string) $this->input('occurred_on', '');
        $category = trim((string) $this->input('category', ''));
        $severity = (string) $this->input('severity', 'minor');
        $title = mb_substr(trim(strip_tags((string) $this->input('title', ''))), 0, 150);
        $description = mb_substr(trim(strip_tags((string) $this->input('description', ''))), 0, 5000);
        $action = mb_substr(trim(strip_tags((string) $this->input('action_taken', ''))), 0, 3000);

        $errors = [];
        $stmt = $this->db()->prepare('SELECT id FROM students WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([$studentId]);
        if (!$stmt->fetchColumn()) $errors['student_id'] = 'Choose the learner';
        $d = \DateTime::createFromFormat('Y-m-d', $occurred);
        if (!$d || $d->format('Y-m-d') !== $occurred || $occurred > date('Y-m-d')) $errors['occurred_on'] = 'Give the date it happened (not in the future)';
        if (!in_array($category, self::CATEGORIES, true)) $errors['category'] = 'Choose what kind of case it is';
        if (!in_array($severity, self::SEVERITIES, true)) $errors['severity'] = 'Choose how serious it was';
        if ($title === '') $errors['title'] = 'Give the case a short title';
        if (mb_strlen($description) < 10) $errors['description'] = 'Say what happened (a sentence or two at least)';

        $files = $this->uploads();
        if (is_string($files)) $errors['files'] = $files;
        if ($errors) {
            $this->validationError($errors);
            return;
        }

        [$role, $id, $name] = $this->reporter();
        $db = $this->db();
        $db->beginTransaction();
        $saved = [];
        try {
            $db->prepare(
                "INSERT INTO student_cases (student_id, reporter_id, reporter_role, reporter_name, occurred_on, category, severity, title, description, action_taken)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            )->execute([$studentId, $id, $role, $name, $occurred, $category, $severity, $title, $description, $action ?: null]);
            $caseId = (int) $db->lastInsertId();

            $dir = self::folder();
            if ($files && !is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
                throw new \RuntimeException('The evidence could not be saved on the server.');
            }
            $ins = $db->prepare('INSERT INTO student_case_files (case_id, stored_name, original_name, mime_type, size_bytes) VALUES (?, ?, ?, ?, ?)');
            foreach ($files as $f) {
                $stored = 'case' . $caseId . '_' . bin2hex(random_bytes(10)) . '.' . $f['ext'];
                if (!move_uploaded_file($f['tmp'], $dir . '/' . $stored)) {
                    throw new \RuntimeException('The evidence could not be saved on the server.');
                }
                $saved[] = $dir . '/' . $stored;
                $ins->execute([$caseId, $stored, $f['name'], $f['mime'], $f['size']]);
            }
            $db->commit();
        } catch (\Throwable $e) {
            $db->rollBack();
            foreach ($saved as $path) {
                @unlink($path);
            }
            $this->error($e instanceof \RuntimeException ? $e->getMessage() : 'The case could not be saved.', 500);
            return;
        }
        $this->success(['id' => $caseId], 'Case recorded');
    }

    /** The uploaded evidence, checked: a list of files, or a message saying what is wrong */
    private function uploads(): array|string
    {
        $raw = $_FILES['files'] ?? null;
        if (!$raw || !isset($raw['name'])) {
            return [];
        }
        $names = (array) $raw['name'];
        $out = [];
        foreach ($names as $i => $name) {
            $err = ((array) $raw['error'])[$i] ?? UPLOAD_ERR_NO_FILE;
            if ($err === UPLOAD_ERR_NO_FILE) {
                continue;
            }
            if ($err !== UPLOAD_ERR_OK) {
                return "\"{$name}\" did not upload - please try again.";
            }
            $tmp = ((array) $raw['tmp_name'])[$i];
            $size = (int) (((array) $raw['size'])[$i] ?? 0);
            if ($size > self::MAX_BYTES) {
                return "\"{$name}\" is bigger than 8 MB.";
            }
            $mime = MimeType::detect($tmp, (string) $name);
            if (!isset(self::ALLOWED[$mime])) {
                return "\"{$name}\" isn't a photo (JPG, PNG, WebP) or a PDF.";
            }
            $out[] = ['tmp' => $tmp, 'name' => mb_substr(basename((string) $name), 0, 255), 'mime' => $mime, 'ext' => self::ALLOWED[$mime], 'size' => $size];
        }
        if (count($out) > self::MAX_FILES) {
            return 'Attach at most ' . self::MAX_FILES . ' files.';
        }
        return $out;
    }

    // ------------------------------------------------------------------ HODs and admins

    /** GET /case-records?q= - every learner with a case, the most recent first */
    public function learners(): void
    {
        if (!$this->isAuthenticated() || !$this->isViewer()) {
            $this->forbidden('Cases are for HODs and the administration');
            return;
        }
        $q = trim((string) $this->query('q', ''));
        $where = 'k.deleted_at IS NULL';
        $params = [];
        if ($q !== '') {
            $like = '%' . str_replace(['%', '_'], ['\\%', '\\_'], $q) . '%';
            $where .= " AND (CONCAT(s.first_name, ' ', s.last_name) LIKE ? OR s.admission_number LIKE ?)";
            $params = [$like, $like];
        }
        $stmt = $this->db()->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.profile_photo, c.name AS class_name, c.stream_name,
                    COUNT(*) AS cases, SUM(k.status = 'open') AS open_cases, MAX(k.occurred_on) AS last_on,
                    MAX(FIELD(k.severity, 'minor', 'serious', 'major')) AS worst
             FROM student_cases k INNER JOIN students s ON s.id = k.student_id LEFT JOIN classes c ON c.id = s.class_id
             WHERE {$where}
             GROUP BY s.id, s.first_name, s.last_name, s.admission_number, s.profile_photo, c.name, c.stream_name
             ORDER BY last_on DESC, s.first_name LIMIT 500"
        );
        $stmt->execute($params);
        $sev = [1 => 'minor', 2 => 'serious', 3 => 'major'];
        $rows = array_map(fn($r) => $this->learner($r) + [
            'cases' => (int) $r['cases'],
            'open_cases' => (int) $r['open_cases'],
            'last_on' => $r['last_on'],
            'worst' => $sev[(int) $r['worst']] ?? 'minor',
        ], $stmt->fetchAll(\PDO::FETCH_ASSOC));

        $totals = $this->db()->query(
            "SELECT COUNT(*) AS cases, SUM(status = 'open') AS open_cases, COUNT(DISTINCT student_id) AS learners,
                    SUM(created_at >= NOW() - INTERVAL 30 DAY) AS last_30
             FROM student_cases WHERE deleted_at IS NULL"
        )->fetch(\PDO::FETCH_ASSOC);
        $this->success([
            'learners' => $rows,
            'totals' => array_map('intval', $totals ?: []),
            'can' => ['manage' => $this->isManager(), 'delete' => $this->isSuperAdmin()],
        ]);
    }

    /** GET /case-records/students/{id} - one learner and every case on them, newest first */
    public function learnerCases($id): void
    {
        if (!$this->isAuthenticated() || !$this->isViewer()) {
            $this->forbidden('Cases are for HODs and the administration');
            return;
        }
        $stmt = $this->db()->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.profile_photo, s.gender, c.name AS class_name, c.stream_name
             FROM students s LEFT JOIN classes c ON c.id = s.class_id WHERE s.id = ?"
        );
        $stmt->execute([(int) $id]);
        $s = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$s) {
            $this->notFound('Learner not found');
            return;
        }
        $stmt = $this->db()->prepare(
            'SELECT * FROM student_cases WHERE student_id = ? AND deleted_at IS NULL ORDER BY occurred_on DESC, id DESC'
        );
        $stmt->execute([(int) $id]);
        $this->success([
            'student' => $this->learner($s) + ['gender' => $s['gender']],
            'cases' => $this->withFiles($stmt->fetchAll(\PDO::FETCH_ASSOC), false),
            'can' => ['manage' => $this->isManager(), 'delete' => $this->isSuperAdmin()],
        ]);
    }

    /** PUT /case-records/{id} { status?, admin_note? } - resolve a case, or note the committee's decision */
    public function update($id): void
    {
        if (!$this->isAuthenticated() || !$this->isManager()) {
            $this->forbidden('Only the administration resolves cases');
            return;
        }
        $set = [];
        $params = [];
        $status = $this->input('status');
        if ($status !== null) {
            if (!in_array($status, ['open', 'resolved'], true)) {
                $this->validationError(['status' => 'Unknown status']);
                return;
            }
            $set[] = 'status = ?';
            $params[] = $status;
            $set[] = $status === 'resolved' ? 'resolved_at = NOW()' : 'resolved_at = NULL';
        }
        if ($this->input('admin_note') !== null) {
            $set[] = 'admin_note = ?';
            $params[] = mb_substr(trim(strip_tags((string) $this->input('admin_note'))), 0, 3000) ?: null;
        }
        if (!$set) {
            $this->validationError(['status' => 'Nothing to change']);
            return;
        }
        $params[] = (int) $id;
        $stmt = $this->db()->prepare('UPDATE student_cases SET ' . implode(', ', $set) . ' WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute($params);
        $row = $this->db()->prepare('SELECT * FROM student_cases WHERE id = ?');
        $row->execute([(int) $id]);
        $case = $row->fetch(\PDO::FETCH_ASSOC);
        if (!$case) {
            $this->notFound('Case not found');
            return;
        }
        $this->success(['case' => $this->withFiles([$case], false)[0]], 'Saved');
    }

    /** DELETE /case-records/{id} - take a case off the record (super admin only; kept, hidden) */
    public function destroy($id): void
    {
        if (!$this->isAuthenticated() || !$this->isSuperAdmin()) {
            $this->forbidden('Only the super admin can delete a case');
            return;
        }
        $stmt = $this->db()->prepare('UPDATE student_cases SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([(int) $id]);
        if (!$stmt->rowCount()) {
            $this->notFound('Case not found');
            return;
        }
        $this->success(['id' => (int) $id], 'Case deleted');
    }

    /** GET /case-records/scopes - the classes and streams a report can be made for */
    public function scopes(): void
    {
        if (!$this->isAuthenticated() || !$this->isViewer()) {
            $this->forbidden();
            return;
        }
        $streams = $this->db()->query(
            "SELECT c.id, c.name, c.stream_name FROM classes c
             WHERE c.deleted_at IS NULL AND EXISTS (SELECT 1 FROM students s WHERE s.class_id = c.id AND s.deleted_at IS NULL)
             ORDER BY c.name, c.stream_name"
        )->fetchAll(\PDO::FETCH_ASSOC);
        $classes = array_values(array_unique(array_column($streams, 'name')));
        $this->success([
            'classes' => $classes,
            'streams' => array_map(fn($r) => ['id' => (int) $r['id'], 'label' => $r['name'] . ($r['stream_name'] ? ' ' . $r['stream_name'] : '')], $streams),
        ]);
    }

    /**
     * GET /case-records/report?scope=school|class|stream|student&value=&from=&to=
     * The disciplinary report: the cases in scope over the period, with what stands out - the
     * learners, streams and classes with the most cases, the most committed offences, how serious,
     * month by month - and the cases themselves.
     */
    public function report(): void
    {
        if (!$this->isAuthenticated() || !$this->isViewer()) {
            $this->forbidden('Cases are for HODs and the administration');
            return;
        }
        $db = $this->db();
        $scope = (string) $this->query('scope', 'school');
        $value = trim((string) $this->query('value', ''));
        $from = (string) $this->query('from', '');
        $to = (string) $this->query('to', '');
        $isDate = fn($d) => (bool) preg_match('/^\d{4}-\d{2}-\d{2}$/', $d);
        if (!$isDate($from)) $from = date('Y-01-01');
        if (!$isDate($to)) $to = date('Y-m-d');

        $where = ['k.deleted_at IS NULL', 'k.occurred_on BETWEEN ? AND ?'];
        $params = [$from, $to];
        $label = 'Whole school';
        if ($scope === 'student') {
            $where[] = 's.id = ?';
            $params[] = (int) $value;
            $st = $db->prepare("SELECT s.first_name, s.last_name, s.admission_number, c.name, c.stream_name FROM students s LEFT JOIN classes c ON c.id = s.class_id WHERE s.id = ?");
            $st->execute([(int) $value]);
            $r = $st->fetch(\PDO::FETCH_ASSOC);
            if (!$r) {
                $this->validationError(['value' => 'Choose a learner']);
                return;
            }
            $label = ucwords(strtolower($r['first_name'] . ' ' . $r['last_name'])) . ' (' . $r['admission_number'] . ($r['name'] ? ', ' . $r['name'] . ($r['stream_name'] ? ' ' . $r['stream_name'] : '') : '') . ')';
        } elseif ($scope === 'stream') {
            $where[] = 's.class_id = ?';
            $params[] = (int) $value;
            $st = $db->prepare('SELECT name, stream_name FROM classes WHERE id = ?');
            $st->execute([(int) $value]);
            $r = $st->fetch(\PDO::FETCH_ASSOC);
            if (!$r) {
                $this->validationError(['value' => 'Choose a stream']);
                return;
            }
            $label = 'Stream ' . $r['name'] . ($r['stream_name'] ? ' ' . $r['stream_name'] : '');
        } elseif ($scope === 'class') {
            if ($value === '') {
                $this->validationError(['value' => 'Choose a class']);
                return;
            }
            $where[] = 'c.name = ?';
            $params[] = $value;
            $label = 'Class ' . $value . ' (all streams)';
        } else {
            $scope = 'school';
        }
        $w = implode(' AND ', $where);
        $base = "FROM student_cases k INNER JOIN students s ON s.id = k.student_id LEFT JOIN classes c ON c.id = s.class_id WHERE {$w}";
        $all = function (string $select, string $tail = '') use ($db, $base, $params) {
            $st = $db->prepare("SELECT {$select} {$base} {$tail}");
            $st->execute($params);
            return $st->fetchAll(\PDO::FETCH_ASSOC);
        };

        $t = $all("COUNT(*) AS cases, COUNT(DISTINCT k.student_id) AS learners, SUM(k.status = 'open') AS open_cases,
                   SUM(k.status = 'resolved') AS resolved, SUM(k.severity = 'major') AS major, SUM(k.severity = 'serious') AS serious,
                   SUM(k.severity = 'minor') AS minor, COUNT(DISTINCT CONCAT(k.reporter_role, k.reporter_id)) AS reporters,
                   SUM(k.student_id IN (SELECT student_id FROM student_cases WHERE deleted_at IS NULL GROUP BY student_id HAVING COUNT(*) > 1)) AS repeat_cases")[0];
        $totals = array_map(fn($v) => (int) $v, $t);
        $repeaters = $all('k.student_id', 'GROUP BY k.student_id HAVING COUNT(*) > 1');
        $totals['repeat_learners'] = count($repeaters);

        $offences = array_map(fn($r) => ['category' => $r['category'], 'cases' => (int) $r['n'], 'learners' => (int) $r['l']],
            $all('k.category, COUNT(*) AS n, COUNT(DISTINCT k.student_id) AS l', 'GROUP BY k.category ORDER BY n DESC, k.category'));
        $learners = array_map(fn($r) => [
            'id' => (int) $r['id'], 'name' => ucwords(strtolower($r['first_name'] . ' ' . $r['last_name'])), 'admission_number' => $r['admission_number'],
            'class_label' => $r['cname'] ? $r['cname'] . ($r['stream_name'] ? ' ' . $r['stream_name'] : '') : null,
            'cases' => (int) $r['n'], 'major' => (int) $r['major'], 'open' => (int) $r['open'], 'last_on' => $r['last_on'],
            'offences' => $r['offences'],
        ], $all("s.id, s.first_name, s.last_name, s.admission_number, c.name AS cname, c.stream_name, COUNT(*) AS n,
                 SUM(k.severity = 'major') AS major, SUM(k.status = 'open') AS open, MAX(k.occurred_on) AS last_on,
                 GROUP_CONCAT(DISTINCT k.category ORDER BY k.category SEPARATOR ', ') AS offences",
                "GROUP BY s.id, s.first_name, s.last_name, s.admission_number, c.name, c.stream_name ORDER BY n DESC, major DESC, last_on DESC LIMIT 15"));
        $streams = array_map(fn($r) => ['label' => $r['cname'] ? $r['cname'] . ($r['stream_name'] ? ' ' . $r['stream_name'] : '') : 'No class', 'cases' => (int) $r['n'], 'learners' => (int) $r['l']],
            $all('c.id, c.name AS cname, c.stream_name, COUNT(*) AS n, COUNT(DISTINCT k.student_id) AS l', 'GROUP BY c.id, c.name, c.stream_name ORDER BY n DESC'));
        $classes = array_map(fn($r) => ['label' => $r['cname'] ?: 'No class', 'cases' => (int) $r['n'], 'learners' => (int) $r['l']],
            $all('c.name AS cname, COUNT(*) AS n, COUNT(DISTINCT k.student_id) AS l', 'GROUP BY c.name ORDER BY n DESC'));
        $months = array_map(fn($r) => ['month' => $r['m'], 'cases' => (int) $r['n']],
            $all("DATE_FORMAT(k.occurred_on, '%Y-%m') AS m, COUNT(*) AS n", 'GROUP BY m ORDER BY m'));
        $reporters = array_map(fn($r) => ['name' => $r['reporter_name'], 'cases' => (int) $r['n']],
            $all('k.reporter_name, COUNT(*) AS n', 'GROUP BY k.reporter_name ORDER BY n DESC LIMIT 10'));
        $cases = array_map(fn($r) => [
            'id' => (int) $r['id'], 'occurred_on' => $r['occurred_on'], 'category' => $r['category'], 'severity' => $r['severity'],
            'title' => $r['title'], 'description' => $r['description'], 'action_taken' => $r['action_taken'], 'status' => $r['status'],
            'admin_note' => $r['admin_note'], 'reporter_name' => $r['reporter_name'], 'reporter_role' => $r['reporter_role'],
            'student' => ucwords(strtolower($r['first_name'] . ' ' . $r['last_name'])),
            'class_label' => $r['cname'] ? $r['cname'] . ($r['stream_name'] ? ' ' . $r['stream_name'] : '') : null,
        ], $all('k.*, s.first_name, s.last_name, c.name AS cname, c.stream_name', 'ORDER BY k.occurred_on DESC, k.id DESC LIMIT 500'));

        $school = $db->query('SELECT school_name, logo_path, motto, address, box_number, phone, email FROM school_settings WHERE id = 1')->fetch(\PDO::FETCH_ASSOC) ?: [];
        $this->success([
            'scope' => $scope, 'value' => $value, 'label' => $label, 'from' => $from, 'to' => $to, 'school' => $school,
            'totals' => $totals, 'offences' => $offences, 'learners' => $learners, 'streams' => $streams, 'classes' => $classes,
            'months' => $months, 'reporters' => $reporters, 'cases' => $cases,
        ]);
    }

    // ------------------------------------------------------------------ evidence

    /** GET /cases/files/{id} - a piece of evidence, for its case's reporter and those who see every case */
    public function file($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $stmt = $this->db()->prepare(
            'SELECT f.*, k.reporter_role, k.reporter_id FROM student_case_files f INNER JOIN student_cases k ON k.id = f.case_id
             WHERE f.id = ? AND k.deleted_at IS NULL'
        );
        $stmt->execute([(int) $id]);
        $f = $stmt->fetch(\PDO::FETCH_ASSOC);
        $mine = $f && $this->isReporterRole() && $f['reporter_role'] === $this->role() && (int) $f['reporter_id'] === (int) ($_SESSION['user_id'] ?? 0);
        if (!$f || !($this->isViewer() || $mine)) {
            $this->notFound('File not found');
            return;
        }
        $path = self::folder() . '/' . basename((string) $f['stored_name']);
        if (!is_file($path)) {
            $this->notFound('File not found');
            return;
        }
        header_remove('Content-Type');
        header('Content-Type: ' . $f['mime_type']);
        header('Content-Length: ' . filesize($path));
        header('Content-Disposition: inline; filename="' . str_replace('"', '', (string) $f['original_name']) . '"');
        header('Cache-Control: private, no-store');
        header('X-Content-Type-Options: nosniff');
        readfile($path);
        exit;
    }

    // ------------------------------------------------------------------ shapes

    private function learner(array $r): array
    {
        return [
            'id' => (int) $r['id'],
            'name' => ucwords(strtolower(trim($r['first_name'] . ' ' . $r['last_name']))),
            'admission_number' => $r['admission_number'],
            'photo' => $r['profile_photo'] ?? null,
            'class_label' => $r['class_name'] ? $r['class_name'] . ($r['stream_name'] ? ' ' . $r['stream_name'] : '') : null,
        ];
    }

    /** Cases with their evidence files (and the learner, for a teacher's own list) */
    private function withFiles(array $rows, bool $withLearner): array
    {
        if (!$rows) {
            return [];
        }
        $ids = array_map(fn($r) => (int) $r['id'], $rows);
        $in = implode(',', array_fill(0, count($ids), '?'));
        $stmt = $this->db()->prepare("SELECT id, case_id, original_name, mime_type, size_bytes FROM student_case_files WHERE case_id IN ({$in}) ORDER BY id");
        $stmt->execute($ids);
        $files = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $f) {
            $files[(int) $f['case_id']][] = ['id' => (int) $f['id'], 'name' => $f['original_name'], 'mime' => $f['mime_type'], 'size' => (int) $f['size_bytes']];
        }
        return array_map(fn($r) => [
            'id' => (int) $r['id'],
            'occurred_on' => $r['occurred_on'],
            'category' => $r['category'],
            'severity' => $r['severity'],
            'title' => $r['title'],
            'description' => $r['description'],
            'action_taken' => $r['action_taken'],
            'status' => $r['status'],
            'admin_note' => $r['admin_note'],
            'resolved_at' => $r['resolved_at'],
            'reporter_name' => $r['reporter_name'],
            'reporter_role' => $r['reporter_role'],
            'created_at' => $r['created_at'],
            'files' => $files[(int) $r['id']] ?? [],
        ] + ($withLearner ? ['student' => $this->learner(['id' => $r['student_id']] + $r)] : []), $rows);
    }
}
