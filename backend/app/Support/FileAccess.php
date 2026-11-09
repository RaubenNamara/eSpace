<?php

declare(strict_types=1);

namespace eSpace\App\Support;

use eSpace\Config\Config;

/**
 * Who may open an uploaded file. backend/public/.htaccess sends every request under uploads/ to
 * public/file.php, except school logos and default pictures. A file opens for a signed-in user, or
 * for anyone holding a link signed here - Microsoft's Office viewer fetches a file itself, with
 * none of the user's cookies, so it is given a link that stops working after an hour.
 */
final class FileAccess
{
    public const LINK_SECONDS = 3600;

    /** The path inside uploads/ ("enotes/x.png"), or null if it isn't one */
    public static function relativePath(string $path): ?string
    {
        $pos = strpos($path, '/uploads/');
        $rel = $pos === false ? $path : substr($path, $pos + strlen('/uploads/'));
        $rel = ltrim($rel, '/');
        if ($rel === '' || str_contains($rel, "\0") || preg_match('#(^|/)\.#', $rel)) {
            return null; // nothing, or a hidden file, or a step up out of the folder
        }
        return $rel;
    }

    /** A student's own hand-in is theirs: answer_<question>_<student>_... - staff may open any */
    public static function userMayOpen(string $rel, ?string $role, int $userId): bool
    {
        if ($role === 'student' && preg_match('#^assignment_submissions/answer_\d+_(\d+)_#', $rel, $m)) {
            return (int) $m[1] === $userId;
        }
        return true;
    }

    /** The query string that lets this one file be opened without signing in, for a while */
    public static function signedQuery(string $rel, ?int $expires = null): string
    {
        $expires ??= time() + self::LINK_SECONDS;
        return 'exp=' . $expires . '&sig=' . self::signature($rel, $expires);
    }

    public static function validSignature(string $rel, string $expires, string $signature): bool
    {
        return ctype_digit($expires) && (int) $expires >= time()
            && hash_equals(self::signature($rel, (int) $expires), $signature);
    }

    private static function signature(string $rel, int $expires): string
    {
        // APP_KEY where it is set; otherwise made from the database password, equally private
        $secret = (string) Config::get('APP_KEY');
        if (strlen($secret) < 16) {
            $secret = 'file-links|' . (string) Config::getDatabaseConfig(false)['password'];
        }
        return hash_hmac('sha256', $rel . '|' . $expires, $secret);
    }
}
