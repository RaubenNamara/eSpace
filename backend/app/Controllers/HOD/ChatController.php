<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ChatService;

/**
 * HOD Chat Controller
 *
 * The HOD messages the teachers of their department - one teacher at a time, or all of them at
 * once in the department's teachers group - as participant role 'hod'. The HOD only ever sees
 * chats they are in; other people's chats stay private.
 */
class ChatController extends Controller
{
    private ChatService $chat;

    public function __construct()
    {
        parent::__construct();
        $this->chat = new ChatService();
    }

    private function hodId(): ?int
    {
        return ($_SESSION['role'] ?? '') === 'hod' && !empty($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    private function getHodDepartmentId(): ?int
    {
        $hodId = $this->hodId();
        if (!$hodId) {
            return null;
        }
        $stmt = $this->chat->getDb()->prepare("SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $hodId]);
        $hod = $stmt->fetch();
        return $hod && $hod['department_id'] ? (int) $hod['department_id'] : null;
    }

    /** The HOD and their department, or null with an error already sent */
    private function me(): ?array
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return null;
        }
        $hodId = $this->hodId();
        $departmentId = $this->getHodDepartmentId();
        if (!$hodId || !$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return null;
        }
        return ['id' => $hodId, 'department_id' => $departmentId];
    }

    /**
     * The department's active teachers - their main department, or also assigned to it - except
     * the HOD's own teacher account (an HOD who also teaches)
     */
    private function departmentTeachers(int $departmentId): array
    {
        $own = $this->chat->getDb()->prepare("SELECT teacher_id FROM hods WHERE id = ?");
        $own->execute([$this->hodId()]);
        $ownTeacherId = (int) ($own->fetchColumn() ?: 0);
        $stmt = $this->chat->getDb()->prepare(
            "SELECT DISTINCT t.id, t.first_name, t.last_name, 'teacher' AS role, d.name AS department_name
             FROM teachers t
             LEFT JOIN departments d ON d.id = t.department_id
             WHERE t.deleted_at IS NULL AND t.is_active = 1 AND (
                t.department_id = :dept
                OR EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :dept2 AND tda.deleted_at IS NULL)
             )
             ORDER BY t.first_name, t.last_name"
        );
        $stmt->execute(['dept' => $departmentId, 'dept2' => $departmentId]);
        return array_values(array_filter($stmt->fetchAll(), fn ($t) => (int) $t['id'] !== $ownTeacherId));
    }

    /**
     * Who the HOD can message: the department's teachers (one at a time, or all together)
     * GET /hod/chat/contacts
     */
    public function contacts(): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $stmt = $this->chat->getDb()->prepare("SELECT name FROM departments WHERE id = ?");
        $stmt->execute([$me['department_id']]);
        $this->success([
            'colleagues' => $this->chat->attachPresence($this->departmentTeachers($me['department_id'])),
            'department_name' => (string) ($stmt->fetchColumn() ?: ''),
        ]);
    }

    /**
     * The department's teachers group - one per department, started by its HOD. Everyone who
     * teaches in the department now is added each time it is opened (a new teacher joins it then).
     */
    private function teachersGroup(array $me): int
    {
        $db = $this->chat->getDb();
        $stmt = $db->prepare(
            "SELECT id FROM chat_conversations
             WHERE type = 'group' AND created_by_role = 'hod' AND department_id = ? AND class_id IS NULL AND deleted_at IS NULL
             ORDER BY id LIMIT 1"
        );
        $stmt->execute([$me['department_id']]);
        $id = (int) ($stmt->fetchColumn() ?: 0);
        if (!$id) {
            $stmt = $db->prepare("SELECT name FROM departments WHERE id = ?");
            $stmt->execute([$me['department_id']]);
            $name = trim((string) ($stmt->fetchColumn() ?: 'Department')) . ' teachers';
            $db->prepare(
                "INSERT INTO chat_conversations (type, name, created_by, created_by_role, class_id, department_id, created_at, updated_at)
                 VALUES ('group', ?, ?, 'hod', NULL, ?, NOW(), NOW())"
            )->execute([mb_substr($name, 0, 100), $me['id'], $me['department_id']]);
            $id = (int) $db->lastInsertId();
        }
        $this->chat->ensureParticipant($id, $me['id'], 'hod');
        foreach ($this->departmentTeachers($me['department_id']) as $t) {
            $this->chat->ensureParticipant($id, (int) $t['id'], 'teacher');
        }
        return $id;
    }

    /**
     * GET /hod/chat/conversations
     */
    public function conversations(): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $this->success(['conversations' => $this->chat->listConversations($me['id'], 'hod')]);
    }

    /**
     * GET /hod/chat/unread-count
     */
    public function unreadCount(): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $this->success(['count' => $this->chat->totalUnreadCount($me['id'], 'hod')]);
    }

    /**
     * Open (or start) a chat with one teacher of the department, or the department's teachers group
     * POST /hod/chat/conversations  { contact_id, contact_role: 'teacher' } | { all_teachers: true }
     */
    public function createConversation(): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $data = $this->input();

        if (!empty($data['all_teachers'])) {
            $this->success(['id' => $this->teachersGroup($me)]);
            return;
        }

        $contactId = (int) ($data['contact_id'] ?? 0);
        if (!$contactId || ($data['contact_role'] ?? '') !== 'teacher') {
            $this->validationError(['contact_id' => 'Choose a teacher in your department']);
            return;
        }
        $inDepartment = in_array($contactId, array_map(fn ($t) => (int) $t['id'], $this->departmentTeachers($me['department_id'])), true);
        if (!$inDepartment) {
            $this->error('You can message the teachers of your department', 403);
            return;
        }
        $this->success(['id' => $this->chat->findOrCreateDirectConversation($me['id'], 'hod', $contactId, 'teacher')]);
    }

    /**
     * GET /hod/chat/conversations/{id}
     */
    public function messages($id): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $conversationId = (int) $id;
        if (!$this->chat->isParticipant($conversationId, $me['id'], 'hod')) {
            $this->notFound('Conversation not found');
            return;
        }
        $this->success([
            'messages' => $this->chat->getMessages($conversationId, $me['id'], 'hod'),
            'status' => $this->chat->getThreadStatus($conversationId, $me['id'], 'hod'),
        ]);
    }

    /**
     * POST /hod/chat/conversations/{id}/send
     */
    public function sendMessage($id): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $conversationId = (int) $id;
        if (!$this->chat->isParticipant($conversationId, $me['id'], 'hod')) {
            $this->notFound('Conversation not found');
            return;
        }
        $data = $this->input();
        $message = trim((string) ($data['message'] ?? ''));
        $replyToId = !empty($data['reply_to_id']) ? (int) $data['reply_to_id'] : null;
        $attachment = null;
        if (isset($_FILES['file'])) {
            $attachment = $this->chat->handleUpload($this);
            if ($attachment === null) {
                return;
            }
        }
        if ($message === '' && !$attachment) {
            $this->validationError(['message' => 'Message text or an attachment is required']);
            return;
        }
        $messageId = $this->chat->sendMessage($conversationId, $me['id'], 'hod', htmlspecialchars($message, ENT_QUOTES, 'UTF-8'), $attachment, $replyToId);
        $this->success(['id' => $messageId], 'Message sent');
    }

    /**
     * POST /hod/chat/conversations/{id}/activity  { activity: 'typing' | 'recording' | null }
     */
    public function activity($id): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $conversationId = (int) $id;
        if (!$this->chat->isParticipant($conversationId, $me['id'], 'hod')) {
            $this->notFound('Conversation not found');
            return;
        }
        $activity = $this->input('activity');
        $this->chat->setActivity($conversationId, $me['id'], 'hod', is_string($activity) ? $activity : null);
        $this->success([]);
    }

    /**
     * Clear the HOD's own view of a chat (others still see it)
     * POST /hod/chat/conversations/{id}/clear
     */
    public function clearChat($id): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        if (!$this->chat->clearChat((int) $id, $me['id'], 'hod')) {
            $this->notFound('Conversation not found');
            return;
        }
        $this->success([], 'Chat cleared');
    }
}
