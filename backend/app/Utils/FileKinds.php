<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * Which file a user really uploaded - by its name AND its first bytes, so a renamed program or
 * web page can never pass as a document. Works without PHP's fileinfo (the live server has none).
 *
 * Used for ICT: teachers' support files (any document, archives of starter files) and students'
 * Office files handed in. Web pages, scripts and programs are never accepted - they would run
 * from the uploads folder or in the reader's browser.
 */
final class FileKinds
{
    // What an ICT teacher may attach as support files
    public const SUPPORT = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pub', 'mdb', 'accdb',
        'odt', 'ods', 'odp', 'rtf', 'txt', 'csv', 'zip', 'rar', '7z', 'jpg', 'jpeg', 'png', 'gif', 'webp'];

    // What an ICT student may hand in besides PDFs and pictures
    public const STUDENT_OFFICE = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pub', 'mdb', 'accdb'];

    /**
     * The file's extension when it is one of $allowed and its contents match it, else null.
     */
    public static function check(string $path, string $originalName, array $allowed): ?string
    {
        $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        if ($ext === 'jpeg') {
            $ext = 'jpg';
        }
        if (!in_array($ext, $allowed, true) && !($ext === 'jpg' && in_array('jpeg', $allowed, true))) {
            return null;
        }
        $head = (string) @file_get_contents($path, false, null, 0, 4096);
        if ($head === '') {
            return null;
        }
        $zip = str_starts_with($head, "PK\x03\x04") || str_starts_with($head, "PK\x05\x06");
        $ole = str_starts_with($head, "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1"); // old Office: doc, xls, ppt, pub
        $ok = match ($ext) {
            'docx', 'xlsx', 'pptx', 'odt', 'ods', 'odp', 'zip' => $zip,
            'doc', 'xls', 'ppt', 'pub' => $ole,
            'mdb' => substr($head, 4, 15) === 'Standard Jet DB',
            'accdb' => substr($head, 4, 15) === 'Standard ACE DB',
            'pdf' => str_starts_with($head, '%PDF-'),
            'rtf' => str_starts_with($head, '{\\rtf'),
            'rar' => str_starts_with($head, "Rar!\x1A\x07"),
            '7z' => str_starts_with($head, "7z\xBC\xAF\x27\x1C"),
            'jpg', 'png', 'gif', 'webp' => @getimagesize($path) !== false,
            // plain text: no NUL bytes, and nothing that looks like a web page
            'txt', 'csv' => !str_contains($head, "\0") && !preg_match('/<\s*(html|script|svg|iframe)/i', $head),
            default => false,
        };
        return $ok ? $ext : null;
    }

    /** Whether a department is ICT (by its name or code, e.g. "ICT", "ICT001") */
    public static function isIct(\PDO $db, ?int $departmentId): bool
    {
        if (!$departmentId) {
            return false;
        }
        $stmt = $db->prepare('SELECT name, code FROM departments WHERE id = ?');
        $stmt->execute([$departmentId]);
        $d = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$d) {
            return false;
        }
        return (bool) preg_match('/^ict\b|computer|information\s*(and\s*)?comm/i', trim((string) $d['name']))
            || str_starts_with(strtoupper((string) $d['code']), 'ICT');
    }

    /** An assessment's department is ICT (through its subject) */
    public static function assignmentIsIct(\PDO $db, int $assignmentId): bool
    {
        $stmt = $db->prepare('SELECT s.department_id FROM assignments a JOIN subjects s ON s.id = a.subject_id WHERE a.id = ?');
        $stmt->execute([$assignmentId]);
        $dep = $stmt->fetchColumn();
        return self::isIct($db, $dep ? (int) $dep : null);
    }

    /** A file name safe to show and to suggest when downloading */
    public static function cleanName(string $name): string
    {
        $name = basename(str_replace('\\', '/', $name));
        $name = preg_replace('/[\x00-\x1F\x7F<>:"|?*]+/', '', $name) ?? 'file';
        return mb_substr(trim($name), 0, 200) ?: 'file';
    }
}
