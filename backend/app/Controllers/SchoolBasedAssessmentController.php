<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\SchoolBasedAssessmentService;

/**
 * UNEB school-based assessment: how ready each learner's continuous assessment is, per subject and
 * class level, the evidence kept for it, learners' LIN and index numbers, and the export.
 * One controller for teacher, HOD and admin - each sees only their own subjects (teacher: their
 * department's, HOD: the department's, admin: all).
 *
 * GET    /{role}/sba/options
 * GET    /{role}/sba?subject_id=&level=&class_id=
 * GET    /{role}/sba/export?subject_id=&level=&class_id=
 * POST   /{role}/sba/evidence              multipart: student_id, subject_id, item (a12 | p7 | ''), note, file
 * DELETE /{role}/sba/evidence/{id}
 * PUT    /hod|admin/sba/learner-ids        {rows: [{student_id? | admission_number?, lin, uneb_index_number}]}
 * PUT    /admin/sba/settings               {uneb_centre_number, sba_out_of, sba_deadline}
 */
class SchoolBasedAssessmentController extends Controller
{
    private const MAX_FILE = 8 * 1024 * 1024;

    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function role(): string
    {
        $role = (string) ($_SESSION['role'] ?? '');
        return $role === 'super_admin' ? 'admin' : $role;
    }

    /** The department a teacher or HOD works in; null for an admin (every department) */
    private function departmentId(): ?int
    {
        $role = $this->role();
        if ($role === 'admin') {
            return null;
        }
        if ($role === 'hod') {
            $stmt = $this->db()->prepare('SELECT COALESCE(department_id_active, department_id) FROM hods WHERE id = ?');
            $stmt->execute([(int) ($_SESSION['user_id'] ?? 0)]);
            return (int) $stmt->fetchColumn() ?: -1;
        }
        return $this->getActiveDepartmentId() ?? -1;
    }

    /** @return array<int, array{id: int, name: string, code: string}> */
    private function subjects(): array
    {
        $dept = $this->departmentId();
        $sql = 'SELECT id, name, code FROM subjects WHERE deleted_at IS NULL';
        $params = [];
        if ($dept !== null) {
            $sql .= ' AND department_id = ?';
            $params[] = $dept;
        }
        $stmt = $this->db()->prepare($sql . ' ORDER BY name');
        $stmt->execute($params);
        return array_map(fn($r) => ['id' => (int) $r['id'], 'name' => $r['name'], 'code' => $r['code']], $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    private function allowedSubject(int $subjectId): bool
    {
        return in_array($subjectId, array_column($this->subjects(), 'id'), true);
    }

    public function options(): void
    {
        $db = $this->db();
        // O Level class levels (the new lower secondary curriculum), with their streams this year
        $rows = $db->query(
            "SELECT c.id, c.name, c.stream_name FROM classes c
             LEFT JOIN academic_years ay ON ay.id = c.academic_year_id
             WHERE c.level = 'O Level' AND (ay.is_current = 1 OR c.academic_year_id IS NULL OR NOT EXISTS (SELECT 1 FROM academic_years WHERE is_current = 1))
             ORDER BY c.name, c.stream_name"
        )->fetchAll(\PDO::FETCH_ASSOC);
        $levels = [];
        foreach ($rows as $r) {
            $levels[$r['name']] ??= ['name' => $r['name'], 'streams' => []];
            $levels[$r['name']]['streams'][] = ['id' => (int) $r['id'], 'name' => trim($r['name'] . ' ' . $r['stream_name'])];
        }
        uksort($levels, fn($a, $b) => strnatcmp($a, $b));
        $this->success([
            'subjects' => $this->subjects(),
            'levels' => array_values($levels),
            'settings' => (new SchoolBasedAssessmentService($db))->settings(),
            'can_edit_ids' => in_array($this->role(), ['hod', 'admin'], true),
            'can_edit_settings' => $this->role() === 'admin',
        ]);
    }

    private function load(): ?array
    {
        $subjectId = (int) $this->query('subject_id', 0);
        $level = trim((string) $this->query('level', ''));
        $classId = (int) $this->query('class_id', 0) ?: null;
        if (!$subjectId || $level === '') {
            $this->validationError(['subject_id' => 'Choose a subject and a class']);
            return null;
        }
        if (!$this->allowedSubject($subjectId)) {
            $this->forbidden();
            return null;
        }
        return (new SchoolBasedAssessmentService($this->db()))->forSubject($subjectId, $level, $classId);
    }

    public function index(): void
    {
        $data = $this->load();
        if ($data !== null) {
            $this->success($data);
        }
    }

    public function export(): void
    {
        $data = $this->load();
        if ($data === null) {
            return;
        }
        $s = $data['settings'];
        $outOf = rtrim(rtrim(number_format($s['sba_out_of'], 2, '.', ''), '0'), '.');
        $rows = array_map(fn($l) => [
            'centre' => $s['uneb_centre_number'] ?? '',
            'index' => $l['uneb_index_number'] ?? '',
            'lin' => $l['lin'] ?? '',
            'name' => strtoupper($l['name']),
            'sex' => strtoupper(substr((string) $l['gender'], 0, 1)),
            'stream' => $l['stream'],
            'subject' => $data['subject']['name'],
            'aois' => $l['aoi_marked'] . ' of ' . $l['aoi_set'],
            'average' => $l['average'] ?? '',
            'ca' => $l['ca_score'] ?? '',
            'project' => $l['project'] ?? '',
            'missing' => $l['missing'],
            'evidence' => $l['evidence_count'],
            'status' => $l['ready'] ? 'Ready' : implode('; ', array_map(fn($i) => [
                'no_lin' => 'No LIN', 'none_due' => 'No AOI due yet', 'no_scores' => 'No AOI scores', 'missing' => 'AOIs missed', 'waiting' => 'AOIs to mark',
            ][$i] ?? $i, $l['issues'])),
        ], $data['learners']);
        $file = sprintf('UNEB-CA_%s_%s_%s.csv', preg_replace('/\W+/', '', (string) $data['subject']['name']), preg_replace('/\W+/', '', $data['level']), date('Y-m-d'));
        $this->downloadCsv($file, [
            'Centre number' => 'centre',
            'Index number' => 'index',
            'LIN' => 'lin',
            'Name' => 'name',
            'Sex' => 'sex',
            'Stream' => 'stream',
            'Subject' => 'subject',
            'AOIs scored' => 'aois',
            'AOI average %' => 'average',
            "CA score (out of {$outOf})" => 'ca',
            'Project %' => 'project',
            'AOIs missed' => 'missing',
            'Evidence files' => 'evidence',
            'Status' => 'status',
        ], $rows);
    }

    public function uploadEvidence(): void
    {
        $studentId = (int) ($_POST['student_id'] ?? 0);
        $subjectId = (int) ($_POST['subject_id'] ?? 0);
        $item = (string) ($_POST['item'] ?? '');
        $note = trim(strip_tags((string) ($_POST['note'] ?? '')));
        if (!$studentId || !$subjectId || !$this->allowedSubject($subjectId)) {
            $this->validationError(['student_id' => 'Choose the learner and subject']);
            return;
        }
        $file = $_FILES['file'] ?? null;
        if (!$file || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            $this->validationError(['file' => 'Choose a photo or PDF']);
            return;
        }
        if ($file['size'] > self::MAX_FILE) {
            $this->validationError(['file' => 'The file is larger than 8 MB']);
            return;
        }
        // MimeType falls back to the file's magic bytes on hosts without the fileinfo extension (the live server)
        $mime = \eSpace\App\Utils\MimeType::detect($file['tmp_name'], (string) $file['name']);
        $ext = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'application/pdf' => 'pdf'][$mime] ?? null;
        if (!$ext) {
            $this->validationError(['file' => 'Only photos (JPG, PNG, WebP) and PDFs']);
            return;
        }

        $assignmentId = null;
        $physicalId = null;
        $db = $this->db();
        if (preg_match('/^a(\d+)$/', $item, $m)) {
            $stmt = $db->prepare('SELECT id FROM assignments WHERE id = ? AND subject_id = ? AND deleted_at IS NULL');
            $stmt->execute([(int) $m[1], $subjectId]);
            $assignmentId = (int) $stmt->fetchColumn() ?: null;
        } elseif (preg_match('/^p(\d+)$/', $item, $m)) {
            $stmt = $db->prepare('SELECT id FROM physical_assessments WHERE id = ? AND subject_id = ? AND deleted_at IS NULL');
            $stmt->execute([(int) $m[1], $subjectId]);
            $physicalId = (int) $stmt->fetchColumn() ?: null;
        }

        $dir = __DIR__ . '/../../public/uploads/sba_evidence/';
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $name = 'sba_' . $studentId . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
        if (!move_uploaded_file($file['tmp_name'], $dir . $name)) {
            $this->error('The file could not be saved', 500);
            return;
        }
        $stmt = $db->prepare(
            'INSERT INTO sba_evidence (student_id, subject_id, assignment_id, physical_assessment_id, file_path, file_kind, original_name, note, uploaded_by, uploaded_by_role)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $studentId, $subjectId, $assignmentId, $physicalId, '/uploads/sba_evidence/' . $name, $ext === 'pdf' ? 'pdf' : 'image',
            mb_substr((string) $file['name'], 0, 255), $note !== '' ? mb_substr($note, 0, 500) : null,
            (int) ($_SESSION['user_id'] ?? 0), $this->role(),
        ]);
        $this->success(['id' => (int) $db->lastInsertId(), 'url' => '/uploads/sba_evidence/' . $name], 'Evidence saved');
    }

    public function deleteEvidence($id): void
    {
        $db = $this->db();
        $stmt = $db->prepare('SELECT subject_id FROM sba_evidence WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([(int) $id]);
        $subjectId = $stmt->fetchColumn();
        if ($subjectId === false) {
            $this->notFound('Evidence not found');
            return;
        }
        if (!$this->allowedSubject((int) $subjectId)) {
            $this->forbidden();
            return;
        }
        $db->prepare('UPDATE sba_evidence SET deleted_at = NOW() WHERE id = ?')->execute([(int) $id]);
        $this->success([], 'Evidence removed');
    }

    /** LIN and UNEB index numbers, typed in or imported, matched by learner id or admission number */
    public function saveLearnerIds(): void
    {
        if (!in_array($this->role(), ['hod', 'admin'], true)) {
            $this->forbidden();
            return;
        }
        $rows = $this->input()['rows'] ?? [];
        if (!is_array($rows) || !$rows) {
            $this->validationError(['rows' => 'Nothing to save']);
            return;
        }
        $db = $this->db();
        $dept = $this->departmentId();
        $find = $db->prepare('SELECT id FROM students WHERE deleted_at IS NULL AND (id = ? OR (? <> \'\' AND admission_number = ?))');
        $inDept = $db->prepare("SELECT 1 FROM student_department_enrollments WHERE student_id = ? AND department_id = ? AND deleted_at IS NULL LIMIT 1");
        $saved = 0;
        $unknown = [];
        foreach (array_slice($rows, 0, 5000) as $r) {
            $adm = trim((string) ($r['admission_number'] ?? ''));
            $find->execute([(int) ($r['student_id'] ?? 0), $adm, $adm]);
            $sid = (int) $find->fetchColumn();
            // A HOD may only set numbers for learners in their own department
            $ok = $sid > 0;
            if ($ok && $dept !== null) {
                $inDept->execute([$sid, $dept]);
                $ok = (bool) $inDept->fetchColumn();
            }
            if (!$ok) {
                $unknown[] = $adm ?: (string) ($r['student_id'] ?? '');
                continue;
            }
            // Only the numbers sent are changed (a sheet with just LINs leaves index numbers alone)
            $set = [];
            $params = [];
            if (array_key_exists('lin', $r)) {
                $lin = strtoupper(preg_replace('/\s+/', '', (string) $r['lin']));
                $set[] = 'lin = ?';
                $params[] = $lin !== '' ? mb_substr($lin, 0, 20) : null;
            }
            if (array_key_exists('uneb_index_number', $r)) {
                $index = strtoupper(trim((string) $r['uneb_index_number']));
                $set[] = 'uneb_index_number = ?';
                $params[] = $index !== '' ? mb_substr($index, 0, 30) : null;
            }
            if ($set) {
                $db->prepare('UPDATE students SET ' . implode(', ', $set) . ' WHERE id = ?')->execute([...$params, $sid]);
                $saved++;
            }
        }
        $this->success(['saved' => $saved, 'unknown' => array_slice($unknown, 0, 50), 'unknown_count' => count($unknown)], "{$saved} learners updated");
    }

    public function saveSettings(): void
    {
        if ($this->role() !== 'admin') {
            $this->forbidden();
            return;
        }
        $in = $this->input();
        $outOf = (float) ($in['sba_out_of'] ?? 20);
        if ($outOf <= 0 || $outOf > 100) {
            $this->validationError(['sba_out_of' => 'Between 1 and 100']);
            return;
        }
        $deadline = (string) ($in['sba_deadline'] ?? '');
        $centre = strtoupper(trim((string) ($in['uneb_centre_number'] ?? '')));
        $this->db()->prepare('UPDATE school_settings SET uneb_centre_number = ?, sba_out_of = ?, sba_deadline = ? WHERE id = 1')->execute([
            $centre !== '' ? mb_substr($centre, 0, 20) : null,
            $outOf,
            preg_match('/^\d{4}-\d{2}-\d{2}$/', $deadline) ? $deadline : null,
        ]);
        $this->success((new SchoolBasedAssessmentService($this->db()))->settings(), 'Settings saved');
    }
}
