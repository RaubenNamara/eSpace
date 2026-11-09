<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * ICT practicals done inside Tusome: a question with a practical_app is worked on in the
 * in-browser word processor, spreadsheet, presentation or database (frontend/src/components/
 * practical), and the work is kept as one file:
 *
 *   word         .html     the document
 *   excel        .json     the workbook (Univer snapshot)
 *   powerpoint   .json     the slides
 *   access       .sqlite   the database (SQLite)
 *
 * The teacher may give a starting file (assignment_questions.practical_starter_path). A learner may
 * answer in any of the four apps, one file per app, kept in assignment_practical_files and handed
 * in app by app (or all together when the assessment is handed in). The file in the teacher's app
 * is also the answer's student_attachment_path (answer_mode 'practical'), as it was before learners
 * could use more than one app. Real .docx / .xlsx / .pptx files are made when someone downloads.
 *
 * Columns and the table come from migrations 157 and 158; ensureSchema() adds them the first time
 * if they haven't been run.
 */
final class Practical
{
    public const APPS = ['word' => 'html', 'excel' => 'json', 'powerpoint' => 'json', 'access' => 'sqlite'];
    public const MAX_BYTES = 25 * 1024 * 1024;
    private const DIR = '/uploads/practicals/';

    private static bool $checked = false;

    public static function app(mixed $value): ?string
    {
        $value = strtolower(trim((string) $value));
        return isset(self::APPS[$value]) ? $value : null;
    }

    public static function ensureSchema(\PDO $db): void
    {
        if (self::$checked) {
            return;
        }
        self::$checked = true;
        try {
            if (!$db->query("SHOW COLUMNS FROM assignment_questions LIKE 'practical_app'")->fetch()) {
                $db->exec("ALTER TABLE assignment_questions ADD COLUMN practical_app VARCHAR(16) NULL DEFAULT NULL AFTER response_type,
                           ADD COLUMN practical_starter_path VARCHAR(255) NULL DEFAULT NULL AFTER practical_app");
            }
            $col = $db->query("SHOW COLUMNS FROM assignment_answers LIKE 'answer_mode'")->fetch(\PDO::FETCH_ASSOC);
            if ($col && !str_contains((string) $col['Type'], "'practical'")) {
                $db->exec("ALTER TABLE assignment_answers MODIFY answer_mode ENUM('typed','canvas','pdf_upload','image_upload','practical') NOT NULL DEFAULT 'typed'");
            }
            if (!$db->query("SHOW TABLES LIKE 'assignment_practical_files'")->fetch()) {
                $db->exec(
                    "CREATE TABLE IF NOT EXISTS assignment_practical_files (
                        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        submission_id INT UNSIGNED NOT NULL,
                        question_id INT UNSIGNED NOT NULL,
                        app VARCHAR(16) NOT NULL,
                        path VARCHAR(255) NOT NULL,
                        original_name VARCHAR(200) NULL,
                        handed_in_at DATETIME NULL,
                        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        UNIQUE KEY uq_practical_file (submission_id, question_id, app),
                        KEY idx_practical_question (question_id)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
                );
            }
        } catch (\Throwable $e) {
            error_log('Practical schema check failed: ' . $e->getMessage());
        }
    }

    /**
     * Keep an uploaded work file for $app, checking it is what it claims to be. Returns its public
     * path, or null (with $error set).
     */
    public static function store(array $file, string $app, string $prefix, ?string &$error = null): ?string
    {
        $ext = self::APPS[$app] ?? null;
        if (!$ext) {
            $error = 'Unknown practical';
            return null;
        }
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || !is_uploaded_file((string) $file['tmp_name'])) {
            $error = 'The work did not arrive. Check your connection and try again.';
            return null;
        }
        if ((int) $file['size'] > self::MAX_BYTES) {
            $error = 'The work is too large to save (25 MB at most).';
            return null;
        }
        $head = (string) file_get_contents((string) $file['tmp_name'], false, null, 0, 64);
        $ok = match ($ext) {
            'sqlite' => str_starts_with($head, "SQLite format 3\0"),
            'json' => json_decode((string) file_get_contents((string) $file['tmp_name']), true) !== null,
            // a document as HTML - nothing that runs (tags, on...= handlers, javascript: links)
            'html' => !preg_match('/<\s*(script|iframe|object|embed|base|form)\b|<[^>]*[\s\/"\']on[a-z]+\s*=|<[^>]*(href|src)\s*=\s*["\']?\s*javascript:|<[^>]*http-equiv/i', (string) file_get_contents((string) $file['tmp_name'])),
        };
        if (!$ok) {
            $error = 'That is not a valid ' . $app . ' file.';
            return null;
        }

        $dir = __DIR__ . '/../../public' . self::DIR;
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $name = $prefix . '_' . bin2hex(random_bytes(10)) . '.' . $ext;
        if (!move_uploaded_file((string) $file['tmp_name'], $dir . $name)) {
            $error = 'The work could not be saved.';
            return null;
        }
        return self::DIR . $name;
    }

    /**
     * A learner's files for one practical question, the teacher's app first:
     * [{app, path, name, handed_in_at, updated_at}]. $answer is their answer row - work saved
     * before learners could use more than one app is only in its student_attachment_path.
     */
    public static function files(\PDO $db, int $submissionId, array $question, ?array $answer = null): array
    {
        $main = self::app($question['practical_app'] ?? null);
        if (!$main || $submissionId <= 0) {
            return [];
        }
        self::ensureSchema($db);
        $byApp = [];
        try {
            $stmt = $db->prepare('SELECT app, path, original_name, handed_in_at, updated_at FROM assignment_practical_files WHERE submission_id = ? AND question_id = ?');
            $stmt->execute([$submissionId, (int) $question['id']]);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
                if (self::app($row['app'])) {
                    $byApp[$row['app']] = ['app' => $row['app'], 'path' => $row['path'], 'name' => $row['original_name'], 'handed_in_at' => $row['handed_in_at'], 'updated_at' => $row['updated_at']];
                }
            }
        } catch (\PDOException $e) {
            error_log('Practical files: ' . $e->getMessage());
        }
        if (!isset($byApp[$main]) && !empty($answer['student_attachment_path']) && ($answer['answer_mode'] ?? '') === 'practical') {
            $byApp[$main] = ['app' => $main, 'path' => $answer['student_attachment_path'], 'name' => $answer['student_attachment_original_name'] ?? null, 'handed_in_at' => null, 'updated_at' => $answer['updated_at'] ?? null];
        }
        $out = [];
        foreach (array_unique(array_merge([$main], array_keys(self::APPS))) as $app) {
            if (isset($byApp[$app])) {
                $out[] = $byApp[$app];
            }
        }
        return $out;
    }

    /** Remove a file this class stored (anything else is left alone) */
    public static function discard(?string $path): void
    {
        if ($path && str_starts_with($path, self::DIR) && !str_contains($path, '..')) {
            $full = __DIR__ . '/../../public' . $path;
            if (is_file($full)) {
                @unlink($full);
            }
        }
    }
}
