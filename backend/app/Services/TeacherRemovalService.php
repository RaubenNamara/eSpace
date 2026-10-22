<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use PDO;

/**
 * Admin "Delete teacher": the teacher and their work leave eSpace, recoverably for 30 days.
 *
 *  remove()  - the account is closed (can't sign in) and every piece of the teacher's work is
 *              hidden everywhere: eNotes, videos, eLibrary books, Item Bank papers, notes, notices,
 *              live classes, Virtual Lab experiments and assignments, eNote answers. Their
 *              ASSESSMENTS are only closed (assignments.removed_at): students can't open or attempt
 *              them any more, but marks already earned stay on report cards and mastery, as the
 *              school chose. Exactly what was hidden is recorded in teacher_removals.
 *  restore() - within RESTORE_DAYS: puts back exactly what remove() hid, and reopens the account.
 *  purgeDue()- after RESTORE_DAYS: the hidden work is deleted for good (rows and their files) and
 *              the teacher row is anonymised. The teacher row itself is NEVER deleted: the database
 *              cascades a teacher delete to assignments and from there to every student submission,
 *              which would wipe the marks the school chose to keep.
 *
 * Suspending a teacher is separate (TeacherController::suspend): they can't sign in, work stays.
 */
class TeacherRemovalService
{
    public const RESTORE_DAYS = 30;

    /**
     * Each kind of work: its table, how to find the teacher's rows, a label for the admin.
     * 'hide' => the column stamped NOW() to hide a row (purge deletes these rows),
     * except assignments, which are closed with removed_at and never purged (they carry marks).
     */
    private const KINDS = [
        'enote_topics' => ['label' => 'eNote topics', 'where' => 'teacher_id = :t'],
        'videos' => ['label' => 'videos', 'where' => "(teacher_id = :t OR (created_by = :t2 AND uploader_role = 'teacher'))", 'files' => ['file_path', 'thumbnail_path']],
        'library_books' => ['label' => 'eLibrary books', 'where' => "uploaded_by = :t AND uploader_role = 'teacher'", 'files' => ['file_path', 'cover_image']],
        'item_bank_questions' => ['label' => 'Item Bank papers', 'where' => "created_by = :t AND uploader_role = 'teacher'", 'files' => ['file_path', 'cover_image']],
        'notes' => ['label' => 'notes', 'where' => 'created_by = :t'],
        'notices' => ['label' => 'notices', 'where' => "author_id = :t AND author_role = 'teacher'"],
        'live_classes' => ['label' => 'live classes', 'where' => 'created_by = :t'],
        'virtual_lab_experiments' => ['label' => 'Virtual Lab experiments', 'where' => 'created_by = :t AND is_template = 0'],
        'virtual_lab_assignments' => ['label' => 'Virtual Lab assignments', 'where' => 'teacher_id = :t'],
        'enote_answers' => ['label' => 'eNote answers', 'where' => "author_id = :t AND author_role = 'teacher'"],
    ];

    private function db(): PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    private static function bind(string $where, int $teacherId): array
    {
        $p = ['t' => $teacherId];
        if (str_contains($where, ':t2')) {
            $p['t2'] = $teacherId;
        }
        return $p;
    }

    /** Whether migration 141 has run */
    public function isReady(): bool
    {
        try {
            return (bool) $this->db()->query("SHOW TABLES LIKE 'teacher_removals'")->fetch();
        } catch (\PDOException $e) {
            return false;
        }
    }

    /**
     * What removing this teacher would take away: counts per kind, plus the assessments and the
     * student submissions on them (which are kept).
     */
    public function preview(int $teacherId): array
    {
        $db = $this->db();
        $counts = [];
        foreach (self::KINDS as $table => $k) {
            $stmt = $db->prepare("SELECT COUNT(*) FROM {$table} WHERE {$k['where']} AND deleted_at IS NULL");
            $stmt->execute(self::bind($k['where'], $teacherId));
            $n = (int) $stmt->fetchColumn();
            if ($n > 0) {
                $counts[] = ['kind' => $table, 'label' => $k['label'], 'count' => $n];
            }
        }
        $stmt = $db->prepare('SELECT COUNT(*) FROM assignments WHERE teacher_id = ? AND deleted_at IS NULL');
        $stmt->execute([$teacherId]);
        $assessments = (int) $stmt->fetchColumn();
        $stmt = $db->prepare('SELECT COUNT(*) FROM assignment_submissions s JOIN assignments a ON a.id = s.assignment_id WHERE a.teacher_id = ? AND a.deleted_at IS NULL');
        $stmt->execute([$teacherId]);
        $submissions = (int) $stmt->fetchColumn();

        return ['work' => $counts, 'assessments' => $assessments, 'submissions_kept' => $submissions, 'restore_days' => self::RESTORE_DAYS];
    }

    /**
     * Remove a teacher and hide their work. Returns the removal id.
     * @throws \RuntimeException when the teacher doesn't exist or is already removed
     */
    public function remove(int $teacherId, ?int $adminId): int
    {
        $db = $this->db();
        $stmt = $db->prepare('SELECT id, first_name, last_name, username, is_active FROM teachers WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([$teacherId]);
        $teacher = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$teacher) {
            throw new \RuntimeException('Teacher not found');
        }

        $db->beginTransaction();
        try {
            $items = [];
            $summary = [];
            foreach (self::KINDS as $table => $k) {
                $sel = $db->prepare("SELECT id FROM {$table} WHERE {$k['where']} AND deleted_at IS NULL");
                $sel->execute(self::bind($k['where'], $teacherId));
                $ids = array_map('intval', $sel->fetchAll(PDO::FETCH_COLUMN));
                if (!$ids) {
                    continue;
                }
                $in = implode(',', $ids);
                $db->exec("UPDATE {$table} SET deleted_at = NOW() WHERE id IN ({$in})");
                if ($table === 'enote_topics') {
                    // their pages, so nothing of the topic can be reached by id either
                    $pageIds = array_map('intval', $db->query("SELECT id FROM enote_pages WHERE topic_id IN ({$in}) AND deleted_at IS NULL")->fetchAll(PDO::FETCH_COLUMN));
                    if ($pageIds) {
                        $db->exec('UPDATE enote_pages SET deleted_at = NOW() WHERE id IN (' . implode(',', $pageIds) . ')');
                        $items['enote_pages'] = $pageIds;
                    }
                }
                $items[$table] = $ids;
                $summary[] = count($ids) . ' ' . $k['label'];
            }

            // assessments: closed, marks kept
            $sel = $db->prepare('SELECT id FROM assignments WHERE teacher_id = ? AND deleted_at IS NULL AND removed_at IS NULL');
            $sel->execute([$teacherId]);
            $assessmentIds = array_map('intval', $sel->fetchAll(PDO::FETCH_COLUMN));
            if ($assessmentIds) {
                $db->exec('UPDATE assignments SET removed_at = NOW() WHERE id IN (' . implode(',', $assessmentIds) . ')');
                $items['assignments'] = $assessmentIds;
                $summary[] = count($assessmentIds) . ' assessments closed (marks kept)';
            }

            $db->prepare('UPDATE teachers SET deleted_at = NOW(), is_active = 0 WHERE id = ?')->execute([$teacherId]);

            $db->prepare(
                'INSERT INTO teacher_removals (teacher_id, teacher_name, teacher_username, was_active, removed_by, removed_at, restore_until, items, summary)
                 VALUES (?, ?, ?, ?, ?, NOW(), NOW() + INTERVAL ' . self::RESTORE_DAYS . ' DAY, ?, ?)'
            )->execute([
                $teacherId,
                trim($teacher['first_name'] . ' ' . $teacher['last_name']),
                $teacher['username'],
                (int) $teacher['is_active'],
                $adminId,
                json_encode($items),
                $summary ? implode(', ', $summary) : 'No work',
            ]);
            $removalId = (int) $db->lastInsertId();
            $db->commit();
            return $removalId;
        } catch (\Throwable $e) {
            $db->rollBack();
            throw $e;
        }
    }

    /** Removed teachers that can still be restored (newest first) */
    public function listRestorable(): array
    {
        return $this->db()->query(
            'SELECT id, teacher_id, teacher_name, teacher_username, removed_at, restore_until, summary,
                    GREATEST(0, CEIL(TIMESTAMPDIFF(HOUR, NOW(), restore_until) / 24)) AS days_left
             FROM teacher_removals
             WHERE restored_at IS NULL AND purged_at IS NULL AND restore_until > NOW()
             ORDER BY removed_at DESC'
        )->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Put back exactly what remove() hid, and reopen the account (active again if it was active).
     * @throws \RuntimeException when it can no longer be restored
     */
    public function restore(int $removalId): array
    {
        $db = $this->db();
        $stmt = $db->prepare('SELECT * FROM teacher_removals WHERE id = ? AND restored_at IS NULL AND purged_at IS NULL AND restore_until > NOW()');
        $stmt->execute([$removalId]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$r) {
            throw new \RuntimeException('This removal can no longer be restored');
        }
        // someone else may have taken the username in the meantime
        $clash = $db->prepare('SELECT COUNT(*) FROM teachers WHERE username = ? AND id <> ? AND deleted_at IS NULL');
        $clash->execute([$r['teacher_username'], $r['teacher_id']]);
        if ((int) $clash->fetchColumn() > 0) {
            throw new \RuntimeException("Another teacher now uses the username \"{$r['teacher_username']}\" - change it before restoring");
        }

        $items = json_decode((string) $r['items'], true) ?: [];
        $db->beginTransaction();
        try {
            foreach ($items as $table => $ids) {
                $ids = array_map('intval', (array) $ids);
                if (!$ids || ($table !== 'enote_pages' && $table !== 'assignments' && !isset(self::KINDS[$table]))) {
                    continue;
                }
                $in = implode(',', $ids);
                if ($table === 'assignments') {
                    $db->exec("UPDATE assignments SET removed_at = NULL WHERE id IN ({$in})");
                } else {
                    $db->exec("UPDATE {$table} SET deleted_at = NULL WHERE id IN ({$in})");
                }
            }
            $db->prepare('UPDATE teachers SET deleted_at = NULL, is_active = ? WHERE id = ?')->execute([(int) $r['was_active'], (int) $r['teacher_id']]);
            $db->prepare('UPDATE teacher_removals SET restored_at = NOW() WHERE id = ?')->execute([$removalId]);
            $db->commit();
        } catch (\Throwable $e) {
            $db->rollBack();
            throw $e;
        }
        return ['teacher_id' => (int) $r['teacher_id'], 'teacher_name' => $r['teacher_name']];
    }

    /**
     * Removals past their restore window: delete the hidden work for good (and its files) and
     * anonymise the teacher row. Assessments and student submissions are left exactly as they are.
     * Safe to run any time; returns how many removals were purged.
     */
    public function purgeDue(): int
    {
        if (!$this->isReady()) {
            return 0;
        }
        $db = $this->db();
        $due = $db->query('SELECT * FROM teacher_removals WHERE restored_at IS NULL AND purged_at IS NULL AND restore_until <= NOW()')->fetchAll(PDO::FETCH_ASSOC);
        foreach ($due as $r) {
            $items = json_decode((string) $r['items'], true) ?: [];
            try {
                $db->beginTransaction();
                $files = [];
                foreach (self::KINDS as $table => $k) {
                    $ids = array_map('intval', (array) ($items[$table] ?? []));
                    if (!$ids) {
                        continue;
                    }
                    $in = implode(',', $ids);
                    // only rows still hidden (a row an admin restored by hand stays)
                    foreach ($k['files'] ?? [] as $col) {
                        foreach ($db->query("SELECT {$col} FROM {$table} WHERE id IN ({$in}) AND deleted_at IS NOT NULL AND {$col} IS NOT NULL AND {$col} <> ''")->fetchAll(PDO::FETCH_COLUMN) as $path) {
                            $files[] = [$table, $col, (string) $path];
                        }
                    }
                    $db->exec("DELETE FROM {$table} WHERE id IN ({$in}) AND deleted_at IS NOT NULL");
                }
                $db->prepare(
                    "UPDATE teachers SET first_name = 'Removed', last_name = 'teacher', username = CONCAT('removed_teacher_', id),
                            email = NULL, phone = NULL, profile_photo = NULL, password = :pw, is_active = 0
                     WHERE id = :id"
                )->execute(['pw' => password_hash(bin2hex(random_bytes(24)), PASSWORD_DEFAULT), 'id' => (int) $r['teacher_id']]);
                $db->prepare('UPDATE teacher_removals SET purged_at = NOW(), items = ? WHERE id = ?')->execute(['{}', (int) $r['id']]);
                $db->commit();
            } catch (\Throwable $e) {
                if ($db->inTransaction()) {
                    $db->rollBack();
                }
                error_log('Teacher removal purge failed for removal ' . $r['id'] . ': ' . $e->getMessage());
                continue;
            }
            // files last, and only ones nothing else still points at (copies can share a file)
            foreach ($files as [$table, $col, $path]) {
                $still = $db->prepare("SELECT COUNT(*) FROM {$table} WHERE {$col} = ?");
                $still->execute([$path]);
                if ((int) $still->fetchColumn() > 0) {
                    continue;
                }
                $local = self::localUploadPath($path);
                if ($local !== null && is_file($local)) {
                    @unlink($local);
                }
            }
        }
        return count($due);
    }

    /** /uploads/... (or uploads/...) -> the file under backend/public; anything else -> null */
    private static function localUploadPath(string $path): ?string
    {
        $path = preg_replace('#^https?://[^/]+#', '', $path);
        $path = ltrim((string) $path, '/');
        if (!str_starts_with($path, 'uploads/') || str_contains($path, '..')) {
            return null;
        }
        return dirname(__DIR__, 2) . '/public/' . $path;
    }
}
