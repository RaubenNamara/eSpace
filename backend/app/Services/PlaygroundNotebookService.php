<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Playground Notebook: results recorded while practising in the Apparatus Playground. Unlike a
 * guided attempt there is no assignment or marking, so each row simply belongs to one user.
 */
class PlaygroundNotebookService
{
    private const MAX_ENTRIES = 300;

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /** Newest first, capped so one user's notebook stays a sensible size */
    public function list(int $userId): array
    {
        $stmt = $this->getDb()->prepare(
            'SELECT id, object_type, action, summary, readings, created_at
             FROM virtual_lab_playground_notebook
             WHERE user_id = :user_id
             ORDER BY created_at DESC, id DESC
             LIMIT ' . self::MAX_ENTRIES
        );
        $stmt->execute(['user_id' => $userId]);
        return array_map(function (array $row): array {
            $row['id'] = (int) $row['id'];
            $row['readings'] = $row['readings'] !== null ? json_decode($row['readings'], true) : null;
            return $row;
        }, $stmt->fetchAll());
    }

    public function add(int $userId, ?string $objectType, string $action, string $summary, ?array $readings): int
    {
        $stmt = $this->getDb()->prepare(
            'INSERT INTO virtual_lab_playground_notebook (user_id, object_type, action, summary, readings, created_at)
             VALUES (:user_id, :object_type, :action, :summary, :readings, NOW())'
        );
        $stmt->execute([
            'user_id' => $userId,
            'object_type' => $objectType,
            'action' => $action,
            'summary' => mb_substr($summary, 0, 500),
            'readings' => $readings !== null ? json_encode($readings) : null,
        ]);
        return (int) \eSpace\Config\Database::lastInsertId();
    }

    /** Only the owner's own entry can be removed */
    public function remove(int $userId, int $entryId): bool
    {
        $stmt = $this->getDb()->prepare('DELETE FROM virtual_lab_playground_notebook WHERE id = :id AND user_id = :user_id');
        $stmt->execute(['id' => $entryId, 'user_id' => $userId]);
        return $stmt->rowCount() > 0;
    }
}
