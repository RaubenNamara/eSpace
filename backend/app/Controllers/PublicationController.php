<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Utils\MimeType;
use eSpace\App\Services\WebPushService;

/**
 * Publications: A level learners' work, published by the GP department.
 *
 * A teacher in GP uploads a PDF, picks the A level student who wrote it (the author) and
 * publishes it. Every A level student - all of them do GP - then sees it in Publications and on
 * their dashboard, and reads it in the page-turning book reader. Other students never see it.
 * Any GP teacher sees every publication; only the teacher who added one changes or removes it.
 */
class PublicationController extends Controller
{
    private const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    private const UPLOAD_SUBDIR = 'publications';

    // An active enrollment in an A Level class (every A level student is enrolled in GP)
    private const A_LEVEL_STUDENT = "EXISTS (
        SELECT 1 FROM student_department_enrollments sde
        JOIN classes sde_c ON sde_c.id = sde.class_id
        WHERE sde.student_id = s.id AND sde.status = 'active' AND sde.deleted_at IS NULL AND sde_c.level = 'A Level'
    )";

    private function db()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /** The GP department's id - named "GP", "G.P" or "General Paper" depending on the school */
    private function gpDepartmentId(): ?int
    {
        $stmt = $this->db()->query(
            "SELECT id FROM departments
             WHERE deleted_at IS NULL AND (REPLACE(REPLACE(UPPER(name), '.', ''), ' ', '') = 'GP' OR UPPER(name) = 'GENERAL PAPER')
             ORDER BY id LIMIT 1"
        );
        $id = $stmt->fetchColumn();
        return $id ? (int) $id : null;
    }

    /** The signed-in teacher's id when they teach GP (their main department or another one) */
    private function gpTeacherId(): ?int
    {
        if (!$this->isAuthenticated() || !in_array($this->getCurrentUserRole(), ['teacher', 'hod'], true)) {
            return null;
        }
        $teacherId = $this->resolveActiveTeacherId();
        $gp = $this->gpDepartmentId();
        if (!$teacherId || !$gp) {
            return null;
        }
        $stmt = $this->db()->prepare(
            "SELECT 1 FROM teachers t
             WHERE t.id = :t AND t.deleted_at IS NULL AND (
                t.department_id = :d
                OR EXISTS (SELECT 1 FROM teacher_department_assignments a WHERE a.teacher_id = t.id AND a.department_id = :d2 AND a.deleted_at IS NULL)
             )"
        );
        $stmt->execute(['t' => $teacherId, 'd' => $gp, 'd2' => $gp]);
        return $stmt->fetchColumn() ? $teacherId : null;
    }

    /** The signed-in student's id when they are in A level */
    private function aLevelStudentId(): ?int
    {
        if (!$this->isAuthenticated() || $this->getCurrentUserRole() !== 'student') {
            return null;
        }
        $id = (int) $this->getCurrentUserId();
        $stmt = $this->db()->prepare("SELECT 1 FROM students s WHERE s.id = :id AND s.deleted_at IS NULL AND " . self::A_LEVEL_STUDENT);
        $stmt->execute(['id' => $id]);
        return $stmt->fetchColumn() ? $id : null;
    }

    /** Publications with their author's name and class, and the teacher who added them */
    private function fetch(string $where, array $params): array
    {
        $stmt = $this->db()->prepare(
            "SELECT p.id, p.title, p.description, p.author_student_id, p.teacher_id, p.file_path, p.file_size,
                    p.status, p.published_at, p.created_at,
                    s.first_name AS author_first_name, s.last_name AS author_last_name, s.profile_photo AS author_photo,
                    (SELECT TRIM(CONCAT(c.name, ' ', COALESCE(c.stream_name, '')))
                     FROM student_department_enrollments e JOIN classes c ON c.id = e.class_id
                     WHERE e.student_id = s.id AND e.status = 'active' AND e.deleted_at IS NULL AND c.level = 'A Level'
                     ORDER BY e.id DESC LIMIT 1) AS author_class,
                    te.first_name AS teacher_first_name, te.last_name AS teacher_last_name
             FROM publications p
             JOIN students s ON s.id = p.author_student_id
             LEFT JOIN teachers te ON te.id = p.teacher_id
             WHERE p.deleted_at IS NULL AND {$where}
             ORDER BY COALESCE(p.published_at, p.created_at) DESC, p.id DESC"
        );
        $stmt->execute($params);
        return array_map(static function (array $r): array {
            $r['id'] = (int) $r['id'];
            $r['author_student_id'] = (int) $r['author_student_id'];
            $r['teacher_id'] = (int) $r['teacher_id'];
            $r['file_size'] = $r['file_size'] !== null ? (int) $r['file_size'] : null;
            $r['author_name'] = trim($r['author_first_name'] . ' ' . $r['author_last_name']);
            $r['file_type'] = 'pdf';
            return $r;
        }, $stmt->fetchAll());
    }

    /**
     * GET /student/publications/access, /teacher/publications/access
     * Whether Publications shows in this user's sidebar
     */
    public function access(): void
    {
        $role = $this->getCurrentUserRole();
        $allowed = $role === 'student' ? $this->aLevelStudentId() !== null : $this->gpTeacherId() !== null;
        $this->success(['allowed' => $allowed]);
    }

    /**
     * GET /student/publications
     * Everything published, newest first - A level students only
     */
    public function studentIndex(): void
    {
        $studentId = $this->aLevelStudentId();
        if (!$studentId) {
            $this->forbidden('Publications are for A level students');
            return;
        }
        $this->success(['publications' => $this->fetch("p.status = 'published'", []), 'me' => $studentId]);
    }

    /**
     * GET /teacher/publications
     */
    public function teacherIndex(): void
    {
        $teacherId = $this->gpTeacherId();
        if (!$teacherId) {
            $this->forbidden('Publications are made in the GP department');
            return;
        }
        $this->success(['publications' => $this->fetch('1 = 1', []), 'me' => $teacherId]);
    }

    /**
     * GET /teacher/publications/authors?q=
     * A level students to choose the author from, found by name or admission number
     */
    public function authors(): void
    {
        if (!$this->gpTeacherId()) {
            $this->forbidden('Publications are made in the GP department');
            return;
        }
        $q = trim((string) $this->query('q', ''));
        $params = [];
        $search = '';
        if ($q !== '') {
            $search = " AND (CONCAT(s.first_name, ' ', s.last_name) LIKE :q1 OR CONCAT(s.last_name, ' ', s.first_name) LIKE :q2 OR s.admission_number LIKE :q3)";
            $like = '%' . $q . '%';
            $params = ['q1' => $like, 'q2' => $like, 'q3' => $like];
        }
        $stmt = $this->db()->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.profile_photo,
                    (SELECT TRIM(CONCAT(c.name, ' ', COALESCE(c.stream_name, '')))
                     FROM student_department_enrollments e JOIN classes c ON c.id = e.class_id
                     WHERE e.student_id = s.id AND e.status = 'active' AND e.deleted_at IS NULL AND c.level = 'A Level'
                     ORDER BY e.id DESC LIMIT 1) AS class_name
             FROM students s
             WHERE s.deleted_at IS NULL AND " . self::A_LEVEL_STUDENT . $search . "
             ORDER BY s.first_name, s.last_name
             LIMIT 20"
        );
        $stmt->execute($params);
        $rows = array_map(static fn (array $r) => [
            'id' => (int) $r['id'],
            'name' => trim($r['first_name'] . ' ' . $r['last_name']),
            'admission_number' => $r['admission_number'],
            'class_name' => $r['class_name'],
            'profile_photo' => $r['profile_photo'],
        ], $stmt->fetchAll());
        $this->success(['students' => $rows]);
    }

    /**
     * POST /teacher/publications   multipart: title, description?, author_student_id, status, file
     */
    public function create(): void
    {
        $teacherId = $this->gpTeacherId();
        if (!$teacherId) {
            $this->forbidden('Publications are made in the GP department');
            return;
        }
        $data = $this->input();
        $title = trim((string) ($data['title'] ?? ''));
        $authorId = (int) ($data['author_student_id'] ?? 0);
        $errors = [];
        if ($title === '') {
            $errors['title'] = 'Give the publication a title';
        }
        if (!$authorId || !$this->isALevelStudent($authorId)) {
            $errors['author_student_id'] = 'Choose the A level student who wrote it';
        }
        if ($errors) {
            $this->validationError($errors);
            return;
        }

        $upload = $this->handleUpload();
        if ($upload === null) {
            return; // handleUpload() already sent the error
        }

        $publish = ($data['status'] ?? 'draft') === 'published';
        $db = $this->db();
        $db->prepare(
            "INSERT INTO publications (title, description, author_student_id, teacher_id, department_id, file_path, file_size, status, published_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, IF(? = 'published', NOW(), NULL))"
        )->execute([
            mb_substr($title, 0, 200),
            $this->cleanDescription($data['description'] ?? null),
            $authorId,
            $teacherId,
            (int) $this->gpDepartmentId(),
            $upload['url'],
            $upload['size'],
            $publish ? 'published' : 'draft',
            $publish ? 'published' : 'draft',
        ]);
        $id = (int) $db->lastInsertId();

        if ($publish) {
            $this->notifyALevel($id, $title, $authorId);
        }
        $this->success(['id' => $id], $publish ? 'Published - A level students can read it now' : 'Saved as a draft');
    }

    /**
     * POST /teacher/publications/{id}   multipart: title, description, author_student_id, file? (to replace it)
     * (POST, not PUT, so a new file can come with it)
     */
    public function update($id): void
    {
        $row = $this->ownRow((int) $id);
        if (!$row) {
            return;
        }
        $data = $this->input();
        $title = trim((string) ($data['title'] ?? $row['title']));
        $authorId = (int) ($data['author_student_id'] ?? $row['author_student_id']);
        $errors = [];
        if ($title === '') {
            $errors['title'] = 'Give the publication a title';
        }
        if ($authorId !== (int) $row['author_student_id'] && !$this->isALevelStudent($authorId)) {
            $errors['author_student_id'] = 'Choose the A level student who wrote it';
        }
        if ($errors) {
            $this->validationError($errors);
            return;
        }

        $filePath = $row['file_path'];
        $fileSize = $row['file_size'];
        if (isset($_FILES['file']) && $_FILES['file']['error'] !== UPLOAD_ERR_NO_FILE) {
            $upload = $this->handleUpload();
            if ($upload === null) {
                return;
            }
            $this->deleteFile((string) $row['file_path']);
            $filePath = $upload['url'];
            $fileSize = $upload['size'];
        }

        $this->db()->prepare(
            "UPDATE publications SET title = ?, description = ?, author_student_id = ?, file_path = ?, file_size = ? WHERE id = ?"
        )->execute([
            mb_substr($title, 0, 200),
            array_key_exists('description', $data) ? $this->cleanDescription($data['description']) : $row['description'],
            $authorId,
            $filePath,
            $fileSize,
            (int) $id,
        ]);
        $this->success(['id' => (int) $id], 'Publication saved');
    }

    /**
     * PUT /teacher/publications/{id}/status   { status: published | draft }
     */
    public function setStatus($id): void
    {
        $row = $this->ownRow((int) $id);
        if (!$row) {
            return;
        }
        $publish = ($this->input('status') ?? '') === 'published';
        // Learners are told the first time it is published, not every time it comes back
        $firstTime = $publish && $row['published_at'] === null;
        $this->db()->prepare(
            "UPDATE publications SET status = ?, published_at = COALESCE(published_at, IF(? = 'published', NOW(), NULL)) WHERE id = ?"
        )->execute([$publish ? 'published' : 'draft', $publish ? 'published' : 'draft', (int) $id]);

        if ($firstTime) {
            $this->notifyALevel((int) $id, (string) $row['title'], (int) $row['author_student_id']);
        }
        $this->success(['status' => $publish ? 'published' : 'draft'], $publish ? 'Published - A level students can read it now' : 'Taken down - back to a draft');
    }

    /**
     * DELETE /teacher/publications/{id}
     */
    public function delete($id): void
    {
        $row = $this->ownRow((int) $id);
        if (!$row) {
            return;
        }
        $this->db()->prepare("UPDATE publications SET deleted_at = NOW() WHERE id = ?")->execute([(int) $id]);
        $this->success([], 'Publication removed');
    }

    /** The publication, when it is the signed-in GP teacher's own (else the error is sent) */
    private function ownRow(int $id): ?array
    {
        $teacherId = $this->gpTeacherId();
        if (!$teacherId) {
            $this->forbidden('Publications are made in the GP department');
            return null;
        }
        $stmt = $this->db()->prepare("SELECT * FROM publications WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            $this->notFound('Publication not found');
            return null;
        }
        if ((int) $row['teacher_id'] !== $teacherId) {
            $this->forbidden('Only the teacher who added this publication can change it');
            return null;
        }
        return $row;
    }

    private function isALevelStudent(int $id): bool
    {
        $stmt = $this->db()->prepare("SELECT 1 FROM students s WHERE s.id = :id AND s.deleted_at IS NULL AND " . self::A_LEVEL_STUDENT);
        $stmt->execute(['id' => $id]);
        return (bool) $stmt->fetchColumn();
    }

    private function cleanDescription($value): ?string
    {
        $text = trim((string) ($value ?? ''));
        return $text === '' ? null : mb_substr($text, 0, 1000);
    }

    /** Tell every A level student - in one insert, then to the phones that turned notifications on */
    private function notifyALevel(int $id, string $title, int $authorId): void
    {
        try {
            $db = $this->db();
            $stmt = $db->prepare("SELECT CONCAT(first_name, ' ', last_name) FROM students WHERE id = ?");
            $stmt->execute([$authorId]);
            $author = (string) $stmt->fetchColumn();
            $heading = 'New publication';
            $message = "\"{$title}\" by {$author} is now in Publications.";
            $payload = json_encode(['publication_id' => $id]);

            $ids = $db->query("SELECT s.id FROM students s WHERE s.deleted_at IS NULL AND " . self::A_LEVEL_STUDENT)->fetchAll(\PDO::FETCH_COLUMN);
            if (!$ids) {
                return;
            }
            $db->prepare(
                "INSERT INTO notifications (user_id, user_role, type, title, message, data, created_at)
                 SELECT s.id, 'student', 'new_publication', ?, ?, ?, NOW()
                 FROM students s WHERE s.deleted_at IS NULL AND " . self::A_LEVEL_STUDENT
            )->execute([$heading, $message, $payload]);

            $url = WebPushService::urlFor('new_publication', ['publication_id' => $id], 'student');
            foreach ($ids as $sid) {
                WebPushService::queue((int) $sid, 'student', $heading, $message, $url, 'new_publication');
            }
        } catch (\Throwable $e) {
            // The publication is out either way; a notification problem must not undo it
            error_log('Publication notify: ' . $e->getMessage());
        }
    }

    private function deleteFile(string $url): void
    {
        if (str_starts_with($url, '/uploads/' . self::UPLOAD_SUBDIR . '/') && !str_contains($url, '..')) {
            $path = __DIR__ . '/../../public' . $url;
            if (is_file($path)) {
                @unlink($path);
            }
        }
    }

    private function handleUpload(): ?array
    {
        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            $this->error('Choose the PDF to publish', 400);
            return null;
        }
        $file = $_FILES['file'];
        if ($file['size'] > self::MAX_FILE_SIZE) {
            $this->error('The file is bigger than 50MB', 400);
            return null;
        }
        if (MimeType::detect($file['tmp_name'], $file['name'] ?? null) !== 'application/pdf') {
            $this->error('Only PDF documents can be published', 400);
            return null;
        }

        $dir = __DIR__ . '/../../public/uploads/' . self::UPLOAD_SUBDIR . '/';
        if (!file_exists($dir)) {
            mkdir($dir, 0755, true);
        }
        $filename = 'publication_' . bin2hex(random_bytes(8)) . '_' . time() . '.pdf';
        if (!move_uploaded_file($file['tmp_name'], $dir . $filename)) {
            $this->serverError('The file could not be saved');
            return null;
        }
        if (substr((string) file_get_contents($dir . $filename, false, null, 0, 5), 0, 5) !== '%PDF-') {
            unlink($dir . $filename);
            $this->error('That file is not a valid PDF', 400);
            return null;
        }
        return ['url' => '/uploads/' . self::UPLOAD_SUBDIR . '/' . $filename, 'size' => (int) $file['size']];
    }
}
