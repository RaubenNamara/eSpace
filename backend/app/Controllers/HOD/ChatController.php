<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ChatService;

/**
 * HOD Chat Controller
 *
 * Read-only monitoring of conversations touching the HOD's department (a participating teacher
 * of that department, a participating student enrolled in it, or a class conversation tagged
 * with it). The HOD is never a participant and can't send messages.
 */
class ChatController extends Controller
{
    private ChatService $chat;

    public function __construct()
    {
        parent::__construct();
        $this->chat = new ChatService();
    }

    private function getHodDepartmentId(): ?int
    {
        $hodId = $_SESSION['user_id'] ?? null;
        if (!$hodId) {
            return null;
        }

        $stmt = $this->chat->getDb()->prepare("SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $hodId]);
        $hod = $stmt->fetch();

        return $hod ? (int) $hod['department_id'] : null;
    }

    /**
     * GET /hod/chat/conversations
     */
    public function conversations(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $this->success(['conversations' => $this->chat->listConversationsInScope($departmentId)]);
    }

    /**
     * GET /hod/chat/conversations/{id}
     */
    public function messages($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $conversationId = (int) $id;
        if (!$this->chat->isConversationInDepartmentScope($conversationId, $departmentId)) {
            $this->notFound('Conversation not found');
            return;
        }

        $this->success(['messages' => $this->chat->getMessagesReadOnly($conversationId)]);
    }
}
