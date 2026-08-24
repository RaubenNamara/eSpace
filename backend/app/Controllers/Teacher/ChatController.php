<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ChatService;

/**
 * Teacher Chat Controller
 *
 * A teacher can message any other registered teacher school-wide (colleague to colleague, not
 * limited to their own department), and students enrolled in their own department.
 */
class ChatController extends Controller
{
    private ChatService $chat;

    public function __construct()
    {
        parent::__construct();
        $this->chat = new ChatService();
    }

    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Session-scoped active department (see Controller::getActiveDepartmentId()) - a teacher in
     * more than one department can switch this via PUT /teacher/departments/active without
     * changing their admin-set primary.
     */
    private function getTeacherDepartmentId(): ?int
    {
        return $this->getActiveDepartmentId();
    }

    /**
     * People this teacher can start a direct chat with: every other registered teacher
     * school-wide, and students enrolled in this teacher's department
     * GET /teacher/chat/contacts
     */
    public function contacts(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        $departmentId = $this->getTeacherDepartmentId();

        $db = $this->chat->getDb();

        $stmt = $db->prepare(
            "SELECT t.id, t.first_name, t.last_name, 'teacher' as role, d.name as department_name
             FROM teachers t
             LEFT JOIN departments d ON t.department_id = d.id
             WHERE t.id != :teacher_id AND t.deleted_at IS NULL AND t.is_active = 1
             ORDER BY t.first_name, t.last_name"
        );
        $stmt->execute(['teacher_id' => $teacherId]);
        $colleagues = $this->chat->attachPresence($stmt->fetchAll());

        $students = [];
        if ($departmentId) {
            $stmt = $db->prepare(
                "SELECT DISTINCT s.id, s.first_name, s.last_name, 'student' as role
                 FROM students s
                 INNER JOIN student_department_enrollments sde ON sde.student_id = s.id
                 WHERE sde.department_id = :department_id AND sde.deleted_at IS NULL AND s.deleted_at IS NULL
                 ORDER BY s.first_name, s.last_name"
            );
            $stmt->execute(['department_id' => $departmentId]);
            $students = $this->chat->attachPresence($stmt->fetchAll());
        }

        $this->success(['colleagues' => $colleagues, 'students' => $students]);
    }

    /**
     * GET /teacher/chat/conversations
     */
    public function conversations(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $this->success(['conversations' => $this->chat->listConversations($teacherId, 'teacher')]);
    }

    /**
     * GET /teacher/chat/unread-count
     */
    public function unreadCount(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $this->success(['count' => $this->chat->totalUnreadCount($teacherId, 'teacher')]);
    }

    /**
     * Open (or create) a direct chat with a contact
     * POST /teacher/chat/conversations
     */
    public function createConversation(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();

        $data = $this->input();
        $contactId = (int) ($data['contact_id'] ?? 0);
        $contactRole = $data['contact_role'] ?? '';

        if (!$contactId || !in_array($contactRole, ['student', 'teacher'], true)) {
            $this->validationError(['contact_id' => 'A valid contact is required']);
            return;
        }

        $db = $this->chat->getDb();

        if ($contactRole === 'teacher') {
            // Any other registered, active teacher is reachable school-wide
            $stmt = $db->prepare("SELECT 1 FROM teachers WHERE id = :id AND id != :self AND deleted_at IS NULL AND is_active = 1");
            $stmt->execute(['id' => $contactId, 'self' => $teacherId]);
        } else {
            $departmentId = $this->getTeacherDepartmentId();
            if (!$departmentId) {
                $this->error('Teacher must be assigned to a department to message students', 403);
                return;
            }
            $stmt = $db->prepare(
                "SELECT 1 FROM student_department_enrollments WHERE student_id = :id AND department_id = :department_id AND deleted_at IS NULL LIMIT 1"
            );
            $stmt->execute(['id' => $contactId, 'department_id' => $departmentId]);
        }
        if (!$stmt->fetch()) {
            $this->error('That contact is not reachable', 403);
            return;
        }

        $conversationId = $this->chat->findOrCreateDirectConversation($teacherId, 'teacher', $contactId, $contactRole);
        $this->success(['id' => $conversationId]);
    }

    /**
     * GET /teacher/chat/conversations/{id}
     */
    public function messages($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $conversationId = (int) $id;
        if (!$this->chat->isParticipant($conversationId, $teacherId, 'teacher')) {
            $this->notFound('Conversation not found');
            return;
        }

        $this->success(['messages' => $this->chat->getMessages($conversationId, $teacherId, 'teacher')]);
    }

    /**
     * POST /teacher/chat/conversations/{id}/send
     */
    public function sendMessage($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $conversationId = (int) $id;
        if (!$this->chat->isParticipant($conversationId, $teacherId, 'teacher')) {
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

        $messageId = $this->chat->sendMessage(
            $conversationId,
            $teacherId,
            'teacher',
            htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
            $attachment,
            $replyToId
        );

        $this->success(['id' => $messageId], 'Message sent');
    }

    /**
     * Clear this teacher's own view of a conversation's history. Only affects what this
     * teacher sees going forward - the other participant(s) and any HOD/Admin monitoring
     * view are unaffected, since the underlying messages are never touched.
     * POST /teacher/chat/conversations/{id}/clear
     */
    public function clearChat($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $conversationId = (int) $id;
        if (!$this->chat->clearChat($conversationId, $teacherId, 'teacher')) {
            $this->notFound('Conversation not found');
            return;
        }

        $this->success([], 'Chat cleared');
    }
}
