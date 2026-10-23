<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ChatService;

/**
 * HOD Chat Controller
 *
 * The HOD chats like anyone else - with any teacher in their department, any student enrolled
 * in it, and any of its classes (the class group chat) - as participant role 'hod'.
 *
 * The HOD also watches over their department's students' chats, read only (/hod/chat/monitor):
 * teachers with students, and students with students and in class groups. Conversations with no
 * student in them (colleagues talking to each other) are not shown, nor the HOD's own chats.
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

    // ------------------------------------------------------------------ the HOD's own chats

    /**
     * Who the HOD can message: the department's teachers, its students, and its classes
     * GET /hod/chat/contacts
     */
    public function contacts(): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $db = $this->chat->getDb();
        $dept = $me['department_id'];

        // teachers of the department - their main department, or also assigned to it
        $stmt = $db->prepare(
            "SELECT DISTINCT t.id, t.first_name, t.last_name, 'teacher' AS role, d.name AS department_name
             FROM teachers t
             LEFT JOIN departments d ON d.id = t.department_id
             WHERE t.deleted_at IS NULL AND t.is_active = 1 AND (
                t.department_id = :dept
                OR EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :dept2 AND tda.deleted_at IS NULL)
             )
             ORDER BY t.first_name, t.last_name"
        );
        $stmt->execute(['dept' => $dept, 'dept2' => $dept]);
        $teachers = $this->chat->attachPresence($stmt->fetchAll());

        $stmt = $db->prepare(
            "SELECT DISTINCT s.id, s.first_name, s.last_name, 'student' AS role
             FROM students s
             INNER JOIN student_department_enrollments sde ON sde.student_id = s.id
             WHERE sde.department_id = :dept AND sde.deleted_at IS NULL AND s.deleted_at IS NULL
             ORDER BY s.first_name, s.last_name"
        );
        $stmt->execute(['dept' => $dept]);
        $students = $this->chat->attachPresence($stmt->fetchAll());

        $stmt = $db->prepare(
            "SELECT c.id AS class_id, c.name AS class_name, c.stream_name, sde.department_id, d.name AS department_name, COUNT(DISTINCT sde.student_id) AS students
             FROM student_department_enrollments sde
             INNER JOIN classes c ON c.id = sde.class_id
             LEFT JOIN departments d ON d.id = sde.department_id
             WHERE sde.department_id = :dept AND sde.deleted_at IS NULL AND c.deleted_at IS NULL
             GROUP BY c.id, c.name, c.stream_name, sde.department_id, d.name
             ORDER BY c.name, c.stream_name"
        );
        $stmt->execute(['dept' => $dept]);
        $classes = $stmt->fetchAll();

        $this->success(['colleagues' => $teachers, 'students' => $students, 'classes' => $classes]);
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
     * Open (or start) a chat with a teacher or student of the department, or a class's group chat
     * POST /hod/chat/conversations  { contact_id, contact_role } | { class_id }
     */
    public function createConversation(): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $db = $this->chat->getDb();
        $data = $this->input();

        if (!empty($data['class_id'])) {
            $classId = (int) $data['class_id'];
            $stmt = $db->prepare("SELECT 1 FROM student_department_enrollments WHERE class_id = ? AND department_id = ? AND deleted_at IS NULL LIMIT 1");
            $stmt->execute([$classId, $me['department_id']]);
            if (!$stmt->fetch()) {
                $this->error('That class has no students in your department', 403);
                return;
            }
            $conversationId = $this->chat->findOrCreateClassConversation($classId, $me['department_id'], $me['id'], 'hod');
            $this->chat->ensureParticipant($conversationId, $me['id'], 'hod');
            $this->success(['id' => $conversationId]);
            return;
        }

        $contactId = (int) ($data['contact_id'] ?? 0);
        $contactRole = (string) ($data['contact_role'] ?? '');
        if (!$contactId || !in_array($contactRole, ['student', 'teacher'], true)) {
            $this->validationError(['contact_id' => 'A valid contact is required']);
            return;
        }
        if ($contactRole === 'teacher') {
            $stmt = $db->prepare("SELECT 1 FROM teachers WHERE id = ? AND deleted_at IS NULL AND is_active = 1");
            $stmt->execute([$contactId]);
        } else {
            $stmt = $db->prepare("SELECT 1 FROM student_department_enrollments WHERE student_id = ? AND department_id = ? AND deleted_at IS NULL LIMIT 1");
            $stmt->execute([$contactId, $me['department_id']]);
        }
        if (!$stmt->fetch()) {
            $this->error('That contact is not reachable', 403);
            return;
        }
        $this->success(['id' => $this->chat->findOrCreateDirectConversation($me['id'], 'hod', $contactId, $contactRole)]);
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

    // ------------------------------------------------------------------ watching over the department

    /**
     * The department's students' chats, read only
     * GET /hod/chat/monitor
     */
    public function monitor(): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $people = $this->departmentPeople($me['department_id']);
        $list = array_values(array_filter(
            $this->chat->listConversationsInScope($me['department_id']),
            fn ($c) => $this->watchable($c, $people, $me)
        ));
        $this->success(['conversations' => $list]);
    }

    /**
     * GET /hod/chat/monitor/{id}
     */
    public function monitorMessages($id): void
    {
        $me = $this->me();
        if (!$me) {
            return;
        }
        $conversationId = (int) $id;
        if (!$this->chat->isConversationInDepartmentScope($conversationId, $me['department_id'])) {
            $this->notFound('Conversation not found');
            return;
        }
        $db = $this->chat->getDb();
        $stmt = $db->prepare("SELECT type, department_id FROM chat_conversations WHERE id = ?");
        $stmt->execute([$conversationId]);
        $conv = $stmt->fetch() ?: [];
        $stmt = $db->prepare("SELECT user_id AS id, user_role AS role FROM chat_participants WHERE conversation_id = ?");
        $stmt->execute([$conversationId]);
        $conv['participants'] = $stmt->fetchAll();
        if (!$this->watchable($conv, $this->departmentPeople($me['department_id']), $me)) {
            $this->notFound('Conversation not found');
            return;
        }
        $this->success(['messages' => $this->chat->getMessagesReadOnly($conversationId)]);
    }

    /** The department's teachers and students, as id => true */
    private function departmentPeople(int $departmentId): array
    {
        $db = $this->chat->getDb();
        $stmt = $db->prepare(
            "SELECT t.id FROM teachers t WHERE t.deleted_at IS NULL AND (t.department_id = :d
                OR EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :d2 AND tda.deleted_at IS NULL))"
        );
        $stmt->execute(['d' => $departmentId, 'd2' => $departmentId]);
        $teachers = array_fill_keys(array_map('intval', $stmt->fetchAll(\PDO::FETCH_COLUMN)), true);
        $stmt = $db->prepare("SELECT DISTINCT student_id FROM student_department_enrollments WHERE department_id = ? AND deleted_at IS NULL");
        $stmt->execute([$departmentId]);
        $students = array_fill_keys(array_map('intval', $stmt->fetchAll(\PDO::FETCH_COLUMN)), true);
        return ['teachers' => $teachers, 'students' => $students];
    }

    /**
     * What the HOD may watch: this department's class groups, and chats between this
     * department's teachers and students or among its students. Never a chat the HOD is in,
     * nor one without a student (colleagues talking to each other).
     */
    private function watchable(array $conv, array $people, array $me): bool
    {
        $participants = $conv['participants'] ?? [];
        $students = 0;
        $ourStudents = 0;
        $teachers = 0;
        $ourTeachers = 0;
        foreach ($participants as $p) {
            $role = $p['role'] ?? '';
            $id = (int) ($p['id'] ?? 0);
            if ($role === 'hod' && $id === $me['id']) {
                return false;
            }
            if ($role === 'student') {
                $students++;
                if (isset($people['students'][$id])) {
                    $ourStudents++;
                }
            } elseif ($role === 'teacher') {
                $teachers++;
                if (isset($people['teachers'][$id])) {
                    $ourTeachers++;
                }
            }
        }
        if (($conv['type'] ?? '') === 'class') {
            return (int) ($conv['department_id'] ?? 0) === $me['department_id'];
        }
        if (!$students || !$ourStudents) {
            return false;
        }
        // a teacher in it must be one of this department's
        return $teachers === 0 || $ourTeachers > 0;
    }
}
