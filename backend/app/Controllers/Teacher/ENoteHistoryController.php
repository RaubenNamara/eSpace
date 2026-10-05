<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * A teacher's eNote history (see Services\ENotePageHistory): the timeline of everything done to
 * a topic's pages, any one version in full (with the version before it, to show what changed),
 * and the pages deleted from it that can still be brought back.
 */
class ENoteHistoryController extends Controller
{
    private function teacherId(): int
    {
        return ($_SESSION['role'] ?? null) === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
    }

    private function ownTopic(int $topicId): ?array
    {
        $stmt = \eSpace\Config\Database::getInstance()->prepare(
            "SELECT id, title FROM enote_topics WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL"
        );
        $stmt->execute([$topicId, $this->teacherId()]);
        return $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
    }

    /**
     * GET /teacher/enotes/topics/{id}/history
     * The timeline (newest first, without the page contents) and the deleted pages.
     */
    public function index($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $topic = $this->ownTopic((int) $id);
        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }
        $db = \eSpace\Config\Database::getInstance();

        $stmt = $db->prepare(
            "SELECT h.id, h.page_id, h.action, h.title, h.word_count, h.image_count, h.page_number, h.detail,
                    h.created_at, h.updated_at,
                    (h.content IS NOT NULL) AS has_content,
                    p.deleted_at AS page_deleted_at, p.order_number AS current_page_number
               FROM enote_page_history h
               LEFT JOIN enote_pages p ON p.id = h.page_id
              WHERE h.topic_id = ?
              ORDER BY h.updated_at DESC, h.id DESC
              LIMIT 500"
        );
        $stmt->execute([(int) $topic['id']]);
        $entries = array_map(static function (array $r): array {
            return [
                'id' => (int) $r['id'],
                'page_id' => $r['page_id'] !== null ? (int) $r['page_id'] : null,
                'action' => $r['action'],
                'title' => $r['title'],
                'word_count' => (int) $r['word_count'],
                'image_count' => (int) $r['image_count'],
                'page_number' => $r['page_number'] !== null ? (int) $r['page_number'] : null,
                'current_page_number' => $r['current_page_number'] !== null && $r['page_deleted_at'] === null ? (int) $r['current_page_number'] : null,
                'page_deleted' => $r['page_id'] !== null && ($r['page_deleted_at'] !== null || $r['current_page_number'] === null),
                'detail' => $r['detail'],
                'has_content' => (bool) $r['has_content'],
                'started_at' => $r['created_at'],
                'at' => $r['updated_at'],
            ];
        }, $stmt->fetchAll(\PDO::FETCH_ASSOC));

        // Deleted pages still worth offering back: deleted, and not already restored as a copy
        $stmt = $db->prepare(
            "SELECT h.id AS history_id, h.page_id, h.title, h.word_count, h.image_count, h.page_number, h.created_at AS deleted_at
               FROM enote_page_history h
               JOIN enote_pages p ON p.id = h.page_id AND p.deleted_at IS NOT NULL
              WHERE h.topic_id = ? AND h.action = 'delete'
                AND NOT EXISTS (
                    SELECT 1 FROM enote_page_history r
                     WHERE r.topic_id = h.topic_id AND r.action = 'restore' AND r.detail = CONCAT('Brought back a deleted page #', h.page_id)
                )
              ORDER BY h.created_at DESC"
        );
        $stmt->execute([(int) $topic['id']]);
        $deleted = array_map(static fn (array $r): array => [
            'history_id' => (int) $r['history_id'],
            'page_id' => (int) $r['page_id'],
            'title' => $r['title'],
            'word_count' => (int) $r['word_count'],
            'image_count' => (int) $r['image_count'],
            'page_number' => $r['page_number'] !== null ? (int) $r['page_number'] : null,
            'deleted_at' => $r['deleted_at'],
        ], $stmt->fetchAll(\PDO::FETCH_ASSOC));

        $this->success(['entries' => $entries, 'deleted' => $deleted]);
    }

    /**
     * GET /teacher/enotes/history/{id}
     * One version in full, with the version of the same page just before it (for what changed).
     */
    public function show($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare(
            "SELECT h.* FROM enote_page_history h
               JOIN enote_topics t ON t.id = h.topic_id AND t.teacher_id = ? AND t.deleted_at IS NULL
              WHERE h.id = ?"
        );
        $stmt->execute([$this->teacherId(), (int) $id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$row) {
            $this->notFound('Version not found');
            return;
        }

        $previous = null;
        if ($row['page_id'] !== null) {
            $stmt = $db->prepare(
                "SELECT id, title, content, updated_at FROM enote_page_history
                  WHERE page_id = ? AND id < ? AND content IS NOT NULL
                  ORDER BY id DESC LIMIT 1"
            );
            $stmt->execute([(int) $row['page_id'], (int) $row['id']]);
            $previous = $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
        }

        $this->success([
            'version' => [
                'id' => (int) $row['id'],
                'page_id' => $row['page_id'] !== null ? (int) $row['page_id'] : null,
                'action' => $row['action'],
                'title' => $row['title'],
                'content' => $row['content'],
                'page_number' => $row['page_number'] !== null ? (int) $row['page_number'] : null,
                'detail' => $row['detail'],
                'started_at' => $row['created_at'],
                'at' => $row['updated_at'],
            ],
            'previous' => $previous ? [
                'id' => (int) $previous['id'],
                'title' => $previous['title'],
                'content' => $previous['content'],
                'at' => $previous['updated_at'],
            ] : null,
        ]);
    }
}
