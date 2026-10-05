<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Comment bank: a teacher's own reusable marking comments. Shown as one-tap chips under each
 * feedback box when marking - the most-used first. A teacher with none yet starts with a few
 * common ones, which they can delete.
 *
 * GET    /teacher/comment-bank
 * POST   /teacher/comment-bank             { text }
 * POST   /teacher/comment-bank/{id}/used
 * DELETE /teacher/comment-bank/{id}
 */
class CommentBankController extends Controller
{
    private const MAX = 60;
    private const STARTERS = [
        'Well done - clear and correct.',
        'Show your working, step by step.',
        'Mind your units.',
        'Read the question carefully - answer what it asks.',
        'Good start - add more detail and an example.',
        'Revise the notes on this topic, then try again.',
    ];

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function teacherId(): int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return (int) ($_SESSION['teacher_id'] ?? 0);
        }
        return (int) ($_SESSION['user_id'] ?? 0);
    }

    private function list($db, int $teacherId): array
    {
        $stmt = $db->prepare("SELECT id, text, use_count FROM teacher_comments WHERE teacher_id = ? ORDER BY use_count DESC, last_used_at DESC, id LIMIT " . self::MAX);
        $stmt->execute([$teacherId]);
        return array_map(fn($r) => ['id' => (int) $r['id'], 'text' => $r['text'], 'uses' => (int) $r['use_count']], $stmt->fetchAll());
    }

    public function index(): void
    {
        $db = $this->getDb();
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $comments = $this->list($db, $teacherId);
        if (!$comments) {
            $stmt = $db->prepare("SELECT COUNT(*) FROM teacher_comments WHERE teacher_id = ?");
            $stmt->execute([$teacherId]);
            if (!(int) $stmt->fetchColumn()) {
                $ins = $db->prepare("INSERT INTO teacher_comments (teacher_id, text) VALUES (?, ?)");
                foreach (self::STARTERS as $t) {
                    $ins->execute([$teacherId, $t]);
                }
                $comments = $this->list($db, $teacherId);
            }
        }
        $this->success(['comments' => $comments]);
    }

    public function store(): void
    {
        $db = $this->getDb();
        $teacherId = $this->teacherId();
        $text = mb_substr(trim(preg_replace('/\s+/', ' ', strip_tags((string) $this->input('text', '')))), 0, 300);
        if (!$teacherId || $text === '') {
            $this->error('Write the comment first', 422);
            return;
        }
        $stmt = $db->prepare("SELECT id FROM teacher_comments WHERE teacher_id = ? AND text = ?");
        $stmt->execute([$teacherId, $text]);
        if (!$stmt->fetchColumn()) {
            $db->prepare("INSERT INTO teacher_comments (teacher_id, text) VALUES (?, ?)")->execute([$teacherId, $text]);
        }
        $this->success(['comments' => $this->list($db, $teacherId)], 'Saved to your comments');
    }

    public function used(): void
    {
        $this->getDb()->prepare("UPDATE teacher_comments SET use_count = use_count + 1, last_used_at = NOW() WHERE id = ? AND teacher_id = ?")
            ->execute([(int) $this->routeParam('id'), $this->teacherId()]);
        $this->success([]);
    }

    public function destroy(): void
    {
        $db = $this->getDb();
        $db->prepare("DELETE FROM teacher_comments WHERE id = ? AND teacher_id = ?")->execute([(int) $this->routeParam('id'), $this->teacherId()]);
        $this->success(['comments' => $this->list($db, $this->teacherId())]);
    }
}
