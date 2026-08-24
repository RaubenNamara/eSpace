<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ChatService;

/**
 * Admin Chat Controller
 *
 * Read-only, school-wide monitoring of every conversation (optionally filtered to one
 * department). Admin is never a participant and can't send messages.
 */
class ChatController extends Controller
{
    private ChatService $chat;

    public function __construct()
    {
        parent::__construct();
        $this->chat = new ChatService();
    }

    /**
     * GET /admin/chat/conversations?department_id=
     */
    public function conversations(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->query('department_id', '');
        $this->success([
            'conversations' => $this->chat->listConversationsInScope($departmentId !== '' ? (int) $departmentId : null)
        ]);
    }

    /**
     * GET /admin/chat/conversations/{id}
     */
    public function messages($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $conversationId = (int) $id;

        $stmt = $this->chat->getDb()->prepare("SELECT id FROM chat_conversations WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $conversationId]);
        if (!$stmt->fetch()) {
            $this->notFound('Conversation not found');
            return;
        }

        $this->success(['messages' => $this->chat->getMessagesReadOnly($conversationId)]);
    }
}
