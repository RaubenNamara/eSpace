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

    /**
     * Whether this signed-in user may open the file:
     *  - a student's hand-in (answer_<question>_<student>_...) and practical work
     *    (work_<question>_<student>_...): only that student; staff may open any
     *  - a chat attachment: only people in a conversation it was sent in (admins too, who
     *    oversee the school's chats)
     *  - anything else (notes, books, videos, question papers...): any signed-in user
     * $teacherId: the teacher account behind an HOD, who may chat as either.
     */
    public static function userMayOpen(string $rel, ?string $role, int $userId, ?int $teacherId = null): bool
    {
        if ($role === 'student' && preg_match('#^(?:assignment_submissions/answer|practicals/work)_\d+_(\d+)_#', $rel, $m)) {
            return (int) $m[1] === $userId;
        }
        if (str_starts_with($rel, 'chat/')) {
            return in_array($role, ['admin', 'super_admin'], true) || self::inChatWith($rel, $role, $userId, $teacherId);
        }
        return true;
    }

    /** Is the user in a conversation where this attachment was sent? */
    private static function inChatWith(string $rel, ?string $role, int $userId, ?int $teacherId): bool
    {
        $as = [];
        if (in_array($role, ['student', 'teacher', 'hod'], true) && $userId > 0) {
            $as[] = [$role, $userId];
        }
        if ($role === 'hod' && $teacherId) {
            $as[] = ['teacher', $teacherId];
        }
        if (!$as) {
            return false;
        }
        try {
            $db = \eSpace\Config\Database::getInstance();
            $who = implode(' OR ', array_fill(0, count($as), '(p.user_role = ? AND p.user_id = ?)'));
            $stmt = $db->prepare(
                "SELECT 1 FROM chat_messages m INNER JOIN chat_participants p ON p.conversation_id = m.conversation_id
                 WHERE m.attachment = ? AND ($who) LIMIT 1"
            );
            $stmt->execute(['/uploads/' . $rel, ...array_merge(...$as)]);
            return (bool) $stmt->fetchColumn();
        } catch (\Throwable $e) {
            error_log('Chat file check failed: ' . $e->getMessage());
            return false;
        }
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
