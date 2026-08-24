<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ChatService;

/**
 * Student Chat Controller
 *
 * A student can message classmates (other students sharing a class/department enrollment),
 * message teachers of their department(s), and use the auto-membership group chat for each class
 * they're enrolled in.
 */
class ChatController extends Controller
{
    private ChatService $chat;

    public function __construct()
    {
        parent::__construct();
        $this->chat = new ChatService();
    }

    private function getStudentId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * People this student can start a direct chat with: classmates + teachers of their
     * department(s)
     * GET /student/chat/contacts
     */
    public function contacts(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $db = $this->chat->getDb();

        $stmt = $db->prepare(
            "SELECT DISTINCT s.id, s.first_name, s.last_name, 'student' as role
             FROM student_department_enrollments sde1
             INNER JOIN student_department_enrollments sde2
                ON sde1.class_id = sde2.class_id AND sde1.department_id = sde2.department_id
             INNER JOIN students s ON sde2.student_id = s.id
             WHERE sde1.student_id = :student_id_a AND sde2.student_id != :student_id_b
               AND sde1.deleted_at IS NULL AND sde2.deleted_at IS NULL AND s.deleted_at IS NULL
             ORDER BY s.first_name, s.last_name"
        );
        $stmt->execute(['student_id_a' => $studentId, 'student_id_b' => $studentId]);
        $classmates = $this->chat->attachPresence($stmt->fetchAll());

        $stmt = $db->prepare(
            "SELECT DISTINCT t.id, t.first_name, t.last_name, 'teacher' as role
             FROM teachers t
             WHERE t.department_id IN (
                 SELECT DISTINCT department_id FROM student_department_enrollments
                 WHERE student_id = :student_id AND deleted_at IS NULL
             ) AND t.deleted_at IS NULL
             ORDER BY t.first_name, t.last_name"
        );
        $stmt->execute(['student_id' => $studentId]);
        $teachers = $this->chat->attachPresence($stmt->fetchAll());

        $this->success(['classmates' => $classmates, 'teachers' => $teachers]);
    }

    /**
     * The classes this student can open a group chat for
     * GET /student/chat/classes
     */
    public function classes(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $db = $this->chat->getDb();
        $stmt = $db->prepare(
            "SELECT DISTINCT c.id as class_id, c.name as class_name, c.stream_name, sde.department_id, d.name as department_name
             FROM student_department_enrollments sde
             INNER JOIN classes c ON sde.class_id = c.id
             LEFT JOIN departments d ON sde.department_id = d.id
             WHERE sde.student_id = :student_id AND sde.deleted_at IS NULL AND c.deleted_at IS NULL
             ORDER BY c.name"
        );
        $stmt->execute(['student_id' => $studentId]);

        $this->success(['classes' => $stmt->fetchAll()]);
    }

    /**
     * GET /student/chat/conversations
     */
    public function conversations(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $this->success(['conversations' => $this->chat->listConversations($studentId, 'student')]);
    }

    /**
     * GET /student/chat/unread-count
     */
    public function unreadCount(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $this->success(['count' => $this->chat->totalUnreadCount($studentId, 'student')]);
    }

    /**
     * Open (or create) a direct chat with a contact, or a class group chat
     * POST /student/chat/conversations
     */
    public function createConversation(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $data = $this->input();
        $db = $this->chat->getDb();

        if (($data['type'] ?? '') === 'class') {
            $classId = (int) ($data['class_id'] ?? 0);
            $departmentId = (int) ($data['department_id'] ?? 0);

            $stmt = $db->prepare(
                "SELECT id FROM student_department_enrollments
                 WHERE student_id = :student_id AND class_id = :class_id AND department_id = :department_id AND deleted_at IS NULL"
            );
            $stmt->execute(['student_id' => $studentId, 'class_id' => $classId, 'department_id' => $departmentId]);
            if (!$stmt->fetch()) {
                $this->error('You are not enrolled in this class', 403);
                return;
            }

            $conversationId = $this->chat->findOrCreateClassConversation($classId, $departmentId, $studentId, 'student');
            $this->success(['id' => $conversationId]);
            return;
        }

        $contactId = (int) ($data['contact_id'] ?? 0);
        $contactRole = $data['contact_role'] ?? '';

        if (!$contactId || !in_array($contactRole, ['student', 'teacher'], true)) {
            $this->validationError(['contact_id' => 'A valid contact is required']);
            return;
        }

        // Verify the contact is actually reachable (classmate or department teacher)
        if ($contactRole === 'student') {
            $stmt = $db->prepare(
                "SELECT 1 FROM student_department_enrollments sde1
                 INNER JOIN student_department_enrollments sde2
                    ON sde1.class_id = sde2.class_id AND sde1.department_id = sde2.department_id
                 WHERE sde1.student_id = :me AND sde2.student_id = :contact_id
                   AND sde1.deleted_at IS NULL AND sde2.deleted_at IS NULL LIMIT 1"
            );
        } else {
            $stmt = $db->prepare(
                "SELECT 1 FROM teachers t WHERE t.id = :contact_id AND t.deleted_at IS NULL AND t.department_id IN (
                    SELECT DISTINCT department_id FROM student_department_enrollments WHERE student_id = :me AND deleted_at IS NULL
                 ) LIMIT 1"
            );
        }
        $stmt->execute(['me' => $studentId, 'contact_id' => $contactId]);
        if (!$stmt->fetch()) {
            $this->error('That contact is not reachable', 403);
            return;
        }

        $conversationId = $this->chat->findOrCreateDirectConversation($studentId, 'student', $contactId, $contactRole);
        $this->success(['id' => $conversationId]);
    }

    /**
     * GET /student/chat/conversations/{id}
     */
    public function messages($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $conversationId = (int) $id;
        if (!$this->chat->isParticipant($conversationId, $studentId, 'student')) {
            $this->notFound('Conversation not found');
            return;
        }

        $this->success(['messages' => $this->chat->getMessages($conversationId, $studentId, 'student')]);
    }

    /**
     * POST /student/chat/conversations/{id}/send
     */
    public function sendMessage($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $conversationId = (int) $id;
        if (!$this->chat->isParticipant($conversationId, $studentId, 'student')) {
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
            $studentId,
            'student',
            htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
            $attachment,
            $replyToId
        );

        $this->success(['id' => $messageId], 'Message sent');
    }

    /**
     * Clear this student's own view of a conversation's history. Only affects what this
     * student sees going forward - the other participant(s) and any HOD/Admin monitoring
     * view are unaffected, since the underlying messages are never touched.
     * POST /student/chat/conversations/{id}/clear
     */
    public function clearChat($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $conversationId = (int) $id;
        if (!$this->chat->clearChat($conversationId, $studentId, 'student')) {
            $this->notFound('Conversation not found');
            return;
        }

        $this->success([], 'Chat cleared');
    }
}
