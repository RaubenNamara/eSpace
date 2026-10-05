<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use PDO;

/**
 * The history of a teacher's eNote pages (table enote_page_history, migration 120): every
 * version of a page - drafts included - and every page added, copied, moved, deleted or
 * restored. Recording never blocks a save: if anything here fails it is logged and the
 * teacher's edit goes through regardless.
 */
class ENotePageHistory
{
    /** Edits closer together than this belong to the same session (one history row) */
    public const SESSION_MINUTES = 15;

    /**
     * Records a content/title save. `$before` is the page row as it was before the save (id,
     * topic_id, title, content, order_number, updated_at) and `$after` the new title/content.
     * `$newVersion` always starts a new row - used when a teacher settles a "changed somewhere
     * else" clash, so neither of the two versions is folded into the other.
     */
    public static function recordEdit(PDO $db, array $before, string $title, string $content, $teacherId, bool $newVersion = false): void
    {
        $teacherId = (int) $teacherId;
        try {
            $pageId = (int) $before['id'];
            $last = $db->prepare(
                "SELECT id, action, teacher_id, updated_at, content, title FROM enote_page_history
                  WHERE page_id = ? ORDER BY id DESC LIMIT 1"
            );
            $last->execute([$pageId]);
            $latest = $last->fetch(PDO::FETCH_ASSOC) ?: null;

            if ($latest === null) {
                if ((string) $before['content'] === $content && html_entity_decode((string) $before['title'], ENT_QUOTES, 'UTF-8') === $title) {
                    return; // saved without a change - nothing to keep yet
                }
                // A page from before history existed: keep how it looked before this first edit,
                // so even that first change can be undone
                self::insert($db, [
                    'topic_id' => (int) $before['topic_id'],
                    'page_id' => $pageId,
                    'teacher_id' => null,
                    'action' => 'snapshot',
                    'title' => html_entity_decode((string) $before['title'], ENT_QUOTES, 'UTF-8'),
                    'content' => (string) $before['content'],
                    'page_number' => (int) $before['order_number'],
                    'created_at' => $before['updated_at'] ?? null,
                ]);
            } elseif ($latest['content'] === $content && $latest['title'] === $title) {
                return; // nothing new (a Save draft with no changes)
            }

            $sameSession = !$newVersion
                && $latest !== null
                && $latest['action'] === 'edit'
                && (int) $latest['teacher_id'] === $teacherId
                && strtotime((string) $latest['updated_at']) >= time() - self::SESSION_MINUTES * 60;

            // A big cut is a checkpoint: the session so far stays as it was (with the text or
            // images still in it) and the cut starts a new version - so a paragraph typed and then
            // deleted within one sitting can still be got back
            if ($sameSession) {
                $wordsWere = self::words((string) $latest['content']);
                $wordsNow = self::words($content);
                $bigCut = ($wordsWere - $wordsNow) >= max(20, (int) ceil($wordsWere * 0.25));
                $imageLost = self::images($content) < self::images((string) $latest['content']);
                if ($bigCut || $imageLost) {
                    $sameSession = false;
                }
            }

            if ($sameSession) {
                $db->prepare(
                    "UPDATE enote_page_history
                        SET title = ?, content = ?, word_count = ?, image_count = ?, page_number = ?, updated_at = NOW()
                      WHERE id = ?"
                )->execute([$title, $content, self::words($content), self::images($content), (int) $before['order_number'], (int) $latest['id']]);
                return;
            }

            self::insert($db, [
                'topic_id' => (int) $before['topic_id'],
                'page_id' => $pageId,
                'teacher_id' => $teacherId,
                'action' => 'edit',
                'title' => $title,
                'content' => $content,
                'page_number' => (int) $before['order_number'],
            ]);
        } catch (\Throwable $e) {
            error_log('ENotePageHistory::recordEdit - ' . $e->getMessage());
        }
    }

    /**
     * Records a structural change - a page added, copied, deleted or restored (with the page's
     * content at that moment, so a deleted page can always be brought back), or pages moved.
     */
    public static function recordEvent(PDO $db, int $topicId, ?int $pageId, $teacherId, string $action, ?string $title = null, ?string $content = null, ?int $pageNumber = null, ?string $detail = null): void
    {
        $teacherId = (int) $teacherId;
        try {
            self::insert($db, [
                'topic_id' => $topicId,
                'page_id' => $pageId,
                'teacher_id' => $teacherId,
                'action' => $action,
                'title' => $title !== null ? html_entity_decode($title, ENT_QUOTES, 'UTF-8') : null,
                'content' => $content,
                'page_number' => $pageNumber,
                'detail' => $detail,
            ]);
        } catch (\Throwable $e) {
            error_log('ENotePageHistory::recordEvent - ' . $e->getMessage());
        }
    }

    private static function insert(PDO $db, array $row): void
    {
        $content = $row['content'] ?? null;
        $createdAt = $row['created_at'] ?? null;
        $db->prepare(
            "INSERT INTO enote_page_history
                (topic_id, page_id, teacher_id, action, title, content, word_count, image_count, page_number, detail, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, NOW()), COALESCE(?, NOW()))"
        )->execute([
            $row['topic_id'],
            $row['page_id'] ?? null,
            $row['teacher_id'] ?? null,
            $row['action'],
            $row['title'] ?? null,
            $content,
            $content !== null ? self::words($content) : 0,
            $content !== null ? self::images($content) : 0,
            $row['page_number'] ?? null,
            $row['detail'] ?? null,
            $createdAt,
            $createdAt,
        ]);
    }

    public static function words(string $html): int
    {
        $text = trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags(str_replace('<', ' <', $html)), ENT_QUOTES, 'UTF-8')) ?? '');
        return $text === '' ? 0 : count(preg_split('/\s+/u', $text) ?: []);
    }

    public static function images(string $html): int
    {
        return (int) preg_match_all('/<img\b/i', $html);
    }
}
