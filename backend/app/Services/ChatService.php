<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use PDO;

/**
 * Chat Service
 *
 * Shared logic for the messaging feature, used by Student/Teacher/HOD/Admin ChatControllers.
 * Participants are identified by an (id, role) pair rather than a single `users.id` FK, because
 * this app resolves identity per-role (students/teachers/hods/admins each have their own table
 * with an independently auto-incrementing id) - the same pattern every other controller in this
 * app uses via $_SESSION['user_id'] + $_SESSION['role'].
 */
class ChatService
{
    private const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
    private const UPLOAD_SUBDIR = 'chat';

    /** A user counts as "online" if their last heartbeat was within this many seconds. */
    private const ONLINE_THRESHOLD_SECONDS = 90;

    /** MIME type => attachment category */
    private const ALLOWED_MIME = [
        'image/jpeg' => 'image',
        'image/png' => 'image',
        'image/gif' => 'image',
        'image/webp' => 'image',
        'audio/webm' => 'audio',
        'audio/ogg' => 'audio',
        'audio/mpeg' => 'audio',
        'audio/mp4' => 'audio',
        'audio/wav' => 'audio',
        'audio/x-wav' => 'audio',
        'video/mp4' => 'video',
        'video/webm' => 'video',
        'application/pdf' => 'file',
        'application/msword' => 'file',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'file',
    ];

    public function getDb(): PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Resolve a display name for a participant by (id, role)
     */
    public function getUserName(int $id, string $role): string
    {
        $db = $this->getDb();

        if ($role === 'student') {
            $stmt = $db->prepare("SELECT first_name, last_name FROM students WHERE id = :id");
        } elseif ($role === 'teacher') {
            $stmt = $db->prepare("SELECT first_name, last_name FROM teachers WHERE id = :id");
        } elseif ($role === 'hod') {
            $stmt = $db->prepare(
                "SELECT t.first_name, t.last_name FROM hods h
                 LEFT JOIN teachers t ON h.teacher_id = t.id
                 WHERE h.id = :id"
            );
        } else {
            $stmt = $db->prepare("SELECT username as first_name, '' as last_name FROM users WHERE id = :id");
        }

        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row || empty($row['first_name'])) {
            return ucfirst($role);
        }

        return trim($row['first_name'] . ' ' . ($row['last_name'] ?? ''));
    }

    /**
     * Online status for a participant by (id, role) - "online" means a presence heartbeat
     * (POST /presence/ping, sent periodically by the frontend while the app is open) landed
     * within the last ONLINE_THRESHOLD_SECONDS.
     */
    public function getUserPresence(int $id, string $role): array
    {
        $db = $this->getDb();

        if ($role === 'student') {
            $stmt = $db->prepare("SELECT last_active_at FROM students WHERE id = :id");
        } elseif ($role === 'teacher') {
            $stmt = $db->prepare("SELECT last_active_at FROM teachers WHERE id = :id");
        } elseif ($role === 'hod') {
            $stmt = $db->prepare("SELECT last_active_at FROM hods WHERE id = :id");
        } else {
            $stmt = $db->prepare("SELECT last_active_at FROM users WHERE id = :id");
        }

        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        $lastActiveAt = $row['last_active_at'] ?? null;

        $isOnline = $lastActiveAt !== null
            && (time() - strtotime($lastActiveAt)) <= self::ONLINE_THRESHOLD_SECONDS;

        return ['is_online' => $isOnline, 'last_active_at' => $lastActiveAt];
    }

    /**
     * Attach is_online/last_active_at to a list of rows that each already have 'id' and 'role'
     * keys (e.g. a contacts list) - used wherever a list of people, rather than a single
     * participant, needs a presence dot.
     */
    public function attachPresence(array $rows): array
    {
        foreach ($rows as &$row) {
            $presence = $this->getUserPresence((int) $row['id'], $row['role']);
            $row['is_online'] = $presence['is_online'];
            $row['last_active_at'] = $presence['last_active_at'];
        }
        unset($row);

        return $rows;
    }

    /**
     * Whether (userId, userRole) is a participant of $conversationId
     */
    public function isParticipant(int $conversationId, int $userId, string $userRole): bool
    {
        $stmt = $this->getDb()->prepare(
            "SELECT id FROM chat_participants WHERE conversation_id = :cid AND user_id = :uid AND user_role = :role"
        );
        $stmt->execute(['cid' => $conversationId, 'uid' => $userId, 'role' => $userRole]);
        return (bool) $stmt->fetch();
    }

    /**
     * Add a participant if not already present (idempotent)
     */
    public function ensureParticipant(int $conversationId, int $userId, string $userRole): void
    {
        $stmt = $this->getDb()->prepare(
            "INSERT IGNORE INTO chat_participants (conversation_id, user_id, user_role, joined_at)
             VALUES (:cid, :uid, :role, NOW())"
        );
        $stmt->execute(['cid' => $conversationId, 'uid' => $userId, 'role' => $userRole]);
    }

    /**
     * Clear this participant's own view of a conversation's history. This only stamps
     * chat_participants.cleared_at for (conversationId, userId, userRole) - it never touches
     * chat_messages, so the other participant(s) and HOD/Admin monitoring (which reads
     * chat_messages directly and never joins chat_participants) are completely unaffected.
     * Returns false if the caller isn't actually a participant.
     */
    public function clearChat(int $conversationId, int $userId, string $userRole): bool
    {
        if (!$this->isParticipant($conversationId, $userId, $userRole)) {
            return false;
        }

        $stmt = $this->getDb()->prepare(
            "UPDATE chat_participants SET cleared_at = NOW()
             WHERE conversation_id = :cid AND user_id = :uid AND user_role = :role"
        );
        $stmt->execute(['cid' => $conversationId, 'uid' => $userId, 'role' => $userRole]);

        return true;
    }

    /**
     * Find an existing direct conversation between two participants, or create one
     */
    public function findOrCreateDirectConversation(int $aId, string $aRole, int $bId, string $bRole): int
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            "SELECT cp1.conversation_id
             FROM chat_participants cp1
             INNER JOIN chat_participants cp2 ON cp1.conversation_id = cp2.conversation_id
             INNER JOIN chat_conversations c ON c.id = cp1.conversation_id
             WHERE c.type = 'direct' AND c.deleted_at IS NULL
               AND cp1.user_id = :a_id AND cp1.user_role = :a_role
               AND cp2.user_id = :b_id AND cp2.user_role = :b_role"
        );
        $stmt->execute(['a_id' => $aId, 'a_role' => $aRole, 'b_id' => $bId, 'b_role' => $bRole]);
        $existing = $stmt->fetch();
        if ($existing) {
            return (int) $existing['conversation_id'];
        }

        $stmt = $db->prepare(
            "INSERT INTO chat_conversations (type, created_by, created_by_role, created_at, updated_at)
             VALUES ('direct', :created_by, :created_by_role, NOW(), NOW())"
        );
        $stmt->execute(['created_by' => $aId, 'created_by_role' => $aRole]);
        $conversationId = (int) $db->lastInsertId();

        $this->ensureParticipant($conversationId, $aId, $aRole);
        $this->ensureParticipant($conversationId, $bId, $bRole);

        return $conversationId;
    }

    /**
     * Find (or create) the group chat for a class/department pairing, syncing every currently
     * enrolled student into it as a participant.
     */
    public function findOrCreateClassConversation(int $classId, int $departmentId, int $creatorId, string $creatorRole): int
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            "SELECT id FROM chat_conversations WHERE type = 'class' AND class_id = :class_id AND department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['class_id' => $classId, 'department_id' => $departmentId]);
        $existing = $stmt->fetch();

        if ($existing) {
            $conversationId = (int) $existing['id'];
        } else {
            $stmt = $db->prepare(
                "SELECT c.name as class_name, c.stream_name, d.name as department_name
                 FROM classes c LEFT JOIN departments d ON d.id = :department_id
                 WHERE c.id = :class_id"
            );
            $stmt->execute(['class_id' => $classId, 'department_id' => $departmentId]);
            $meta = $stmt->fetch();
            $name = $meta
                ? trim(($meta['class_name'] ?? 'Class') . ($meta['stream_name'] ? ' - ' . $meta['stream_name'] : '') . ' (' . ($meta['department_name'] ?? '') . ')')
                : 'Class Chat';

            $stmt = $db->prepare(
                "INSERT INTO chat_conversations (type, name, created_by, created_by_role, class_id, department_id, created_at, updated_at)
                 VALUES ('class', :name, :created_by, :created_by_role, :class_id, :department_id, NOW(), NOW())"
            );
            $stmt->execute([
                'name' => $name,
                'created_by' => $creatorId,
                'created_by_role' => $creatorRole,
                'class_id' => $classId,
                'department_id' => $departmentId,
            ]);
            $conversationId = (int) $db->lastInsertId();
        }

        // Sync currently-enrolled students into the group (additive only - doesn't remove
        // students who since left the class, keeping this simple and idempotent).
        $stmt = $db->prepare(
            "SELECT DISTINCT student_id FROM student_department_enrollments
             WHERE class_id = :class_id AND department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['class_id' => $classId, 'department_id' => $departmentId]);
        foreach ($stmt->fetchAll() as $row) {
            $this->ensureParticipant($conversationId, (int) $row['student_id'], 'student');
        }

        return $conversationId;
    }

    /**
     * List conversations for a participant, each with the latest message preview, an unread
     * count, and a resolved display name (the other person for direct chats, the group/class
     * name otherwise).
     */
    public function listConversations(int $userId, string $userRole): array
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            "SELECT c.id, c.type, c.name, c.class_id, c.department_id, c.updated_at, cp.last_read_at, cp.cleared_at
             FROM chat_conversations c
             INNER JOIN chat_participants cp ON cp.conversation_id = c.id AND cp.user_id = :uid AND cp.user_role = :role
             WHERE c.deleted_at IS NULL
             ORDER BY c.updated_at DESC"
        );
        $stmt->execute(['uid' => $userId, 'role' => $userRole]);
        $conversations = $stmt->fetchAll();

        $result = [];
        foreach ($conversations as $conv) {
            $displayName = $conv['name'];
            $presence = ['is_online' => false, 'last_active_at' => null];

            if ($conv['type'] === 'direct') {
                $stmt = $db->prepare(
                    "SELECT user_id, user_role FROM chat_participants
                     WHERE conversation_id = :cid AND NOT (user_id = :uid AND user_role = :role) LIMIT 1"
                );
                $stmt->execute(['cid' => $conv['id'], 'uid' => $userId, 'role' => $userRole]);
                $other = $stmt->fetch();
                $displayName = $other ? $this->getUserName((int) $other['user_id'], $other['user_role']) : 'Unknown';
                if ($other) {
                    $presence = $this->getUserPresence((int) $other['user_id'], $other['user_role']);
                }
            }

            $lastMessageSql = "SELECT message, attachment_type, sender_id, sender_role, created_at
                 FROM chat_messages WHERE conversation_id = :cid";
            $lastMessageParams = ['cid' => $conv['id']];
            if ($conv['cleared_at']) {
                $lastMessageSql .= " AND created_at > :cleared_at";
                $lastMessageParams['cleared_at'] = $conv['cleared_at'];
            }
            $lastMessageSql .= " ORDER BY created_at DESC LIMIT 1";
            $stmt = $db->prepare($lastMessageSql);
            $stmt->execute($lastMessageParams);
            $lastMessage = $stmt->fetch();

            $unreadWhere = "conversation_id = :cid AND NOT (sender_id = :uid AND sender_role = :role)";
            $params = ['cid' => $conv['id'], 'uid' => $userId, 'role' => $userRole];
            if ($conv['last_read_at']) {
                $unreadWhere .= " AND created_at > :last_read_at";
                $params['last_read_at'] = $conv['last_read_at'];
            }
            if ($conv['cleared_at']) {
                $unreadWhere .= " AND created_at > :cleared_at";
                $params['cleared_at'] = $conv['cleared_at'];
            }
            $stmt = $db->prepare("SELECT COUNT(*) as cnt FROM chat_messages WHERE {$unreadWhere}");
            $stmt->execute($params);
            $unread = (int) $stmt->fetch()['cnt'];

            $result[] = [
                'id' => (int) $conv['id'],
                'type' => $conv['type'],
                'name' => $displayName,
                'class_id' => $conv['class_id'] ? (int) $conv['class_id'] : null,
                'department_id' => $conv['department_id'] ? (int) $conv['department_id'] : null,
                'updated_at' => $conv['updated_at'],
                'is_online' => $presence['is_online'],
                'last_active_at' => $presence['last_active_at'],
                'last_message' => $lastMessage ? [
                    'message' => $lastMessage['message'],
                    'attachment_type' => $lastMessage['attachment_type'],
                    'sender_name' => $this->getUserName((int) $lastMessage['sender_id'], $lastMessage['sender_role']),
                    'is_mine' => (int) $lastMessage['sender_id'] === $userId && $lastMessage['sender_role'] === $userRole,
                    'created_at' => $lastMessage['created_at'],
                ] : null,
                'unread_count' => $unread,
            ];
        }

        return $result;
    }

    /**
     * Total unread message count across every conversation this participant is in - a single
     * lean query for the header's WhatsApp-style badge, rather than the heavier per-conversation
     * breakdown listConversations() computes (N+1 queries for previews/presence it doesn't need).
     */
    public function totalUnreadCount(int $userId, string $userRole): int
    {
        $stmt = $this->getDb()->prepare(
            "SELECT COUNT(*) as cnt
             FROM chat_messages m
             INNER JOIN chat_participants cp ON cp.conversation_id = m.conversation_id
                 AND cp.user_id = :uid AND cp.user_role = :role
             WHERE NOT (m.sender_id = :uid2 AND m.sender_role = :role2)
               AND (cp.last_read_at IS NULL OR m.created_at > cp.last_read_at)
               AND (cp.cleared_at IS NULL OR m.created_at > cp.cleared_at)"
        );
        $stmt->execute(['uid' => $userId, 'role' => $userRole, 'uid2' => $userId, 'role2' => $userRole]);
        return (int) $stmt->fetch()['cnt'];
    }

    /**
     * Get messages in a conversation (oldest first), each with sender name and a quoted preview
     * of the message it's replying to, if any. Marks the conversation read for this participant.
     */
    public function getMessages(int $conversationId, int $userId, string $userRole, int $limit = 100): array
    {
        $db = $this->getDb();

        // Read receipts (WhatsApp-style ticks) only make sense for a direct (1:1) chat, where
        // "the other person" is unambiguous - if there's more than one other participant (a
        // group/class chat), read status per-member isn't tracked and messages just show as sent.
        $stmt = $db->prepare(
            "SELECT user_id, user_role, last_read_at, cleared_at FROM chat_participants
             WHERE conversation_id = :cid"
        );
        $stmt->execute(['cid' => $conversationId]);
        $participants = $stmt->fetchAll();

        $selfClearedAt = null;
        $others = [];
        foreach ($participants as $p) {
            if ((int) $p['user_id'] === $userId && $p['user_role'] === $userRole) {
                $selfClearedAt = $p['cleared_at'];
            } else {
                $others[] = $p;
            }
        }
        $otherLastReadAt = count($others) === 1 ? $others[0]['last_read_at'] : null;

        $sql = "SELECT m.*, r.message as reply_message, r.sender_id as reply_sender_id, r.sender_role as reply_sender_role
             FROM chat_messages m
             LEFT JOIN chat_messages r ON m.reply_to_id = r.id
             WHERE m.conversation_id = :cid";
        if ($selfClearedAt !== null) {
            $sql .= " AND m.created_at > :cleared_at";
        }
        $sql .= " ORDER BY m.created_at DESC LIMIT :limit";

        $stmt = $db->prepare($sql);
        $stmt->bindValue('cid', $conversationId, PDO::PARAM_INT);
        if ($selfClearedAt !== null) {
            $stmt->bindValue('cleared_at', $selfClearedAt);
        }
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        $rows = array_reverse($stmt->fetchAll());

        $messages = array_map(function ($row) use ($userId, $userRole, $otherLastReadAt) {
            $isMine = (int) $row['sender_id'] === $userId && $row['sender_role'] === $userRole;

            return [
                'id' => (int) $row['id'],
                'sender_id' => (int) $row['sender_id'],
                'sender_role' => $row['sender_role'],
                'sender_name' => $this->getUserName((int) $row['sender_id'], $row['sender_role']),
                'is_mine' => $isMine,
                'is_read' => $isMine && $otherLastReadAt !== null && $row['created_at'] <= $otherLastReadAt,
                'message' => $row['message'],
                'attachment' => $row['attachment'],
                'attachment_type' => $row['attachment_type'],
                'attachment_name' => $row['attachment_name'],
                'attachment_size' => $row['attachment_size'] ? (int) $row['attachment_size'] : null,
                'reply_to' => $row['reply_to_id'] ? [
                    'id' => (int) $row['reply_to_id'],
                    'message' => $row['reply_message'],
                    'sender_name' => $row['reply_sender_id'] !== null ? $this->getUserName((int) $row['reply_sender_id'], $row['reply_sender_role']) : null,
                ] : null,
                'created_at' => $row['created_at'],
            ];
        }, $rows);

        $stmt = $db->prepare(
            "UPDATE chat_participants SET last_read_at = NOW() WHERE conversation_id = :cid AND user_id = :uid AND user_role = :role"
        );
        $stmt->execute(['cid' => $conversationId, 'uid' => $userId, 'role' => $userRole]);

        return $messages;
    }

    /**
     * Send a message (text and/or an already-uploaded attachment) into a conversation and bump
     * the conversation's updated_at so it sorts to the top of the list.
     */
    public function sendMessage(int $conversationId, int $senderId, string $senderRole, string $message, ?array $attachment, ?int $replyToId): int
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            "INSERT INTO chat_messages
                (conversation_id, sender_id, sender_role, message, reply_to_id, attachment, attachment_type, attachment_name, attachment_size, created_at)
             VALUES
                (:cid, :sender_id, :sender_role, :message, :reply_to_id, :attachment, :attachment_type, :attachment_name, :attachment_size, NOW())"
        );
        $stmt->execute([
            'cid' => $conversationId,
            'sender_id' => $senderId,
            'sender_role' => $senderRole,
            'message' => $message,
            'reply_to_id' => $replyToId,
            'attachment' => $attachment['url'] ?? null,
            'attachment_type' => $attachment['category'] ?? null,
            'attachment_name' => $attachment['name'] ?? null,
            'attachment_size' => $attachment['size'] ?? null,
        ]);
        $messageId = (int) $db->lastInsertId();

        $stmt = $db->prepare("UPDATE chat_conversations SET updated_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $conversationId]);

        return $messageId;
    }

    /**
     * List conversations for HOD/Admin monitoring. When $departmentId is null (Admin), every
     * conversation is in scope; otherwise only conversations touching that department (a
     * participating teacher of that department, a participating student enrolled in that
     * department, or a class conversation tagged with that department) are included. Unlike
     * listConversations(), the caller isn't a real participant, so every participant is listed
     * instead of resolving a single "other person" name, and there's no unread count.
     */
    public function listConversationsInScope(?int $departmentId): array
    {
        $db = $this->getDb();

        $where = ['c.deleted_at IS NULL'];
        $params = [];

        if ($departmentId !== null) {
            $where[] = "(
                c.department_id = :dept_direct
                OR EXISTS (
                    SELECT 1 FROM chat_participants cp
                    INNER JOIN teachers t ON cp.user_id = t.id AND cp.user_role = 'teacher'
                    WHERE cp.conversation_id = c.id AND t.department_id = :dept_teacher
                )
                OR EXISTS (
                    SELECT 1 FROM chat_participants cp
                    INNER JOIN student_department_enrollments sde ON cp.user_id = sde.student_id AND cp.user_role = 'student'
                    WHERE cp.conversation_id = c.id AND sde.department_id = :dept_student AND sde.deleted_at IS NULL
                )
            )";
            $params['dept_direct'] = $departmentId;
            $params['dept_teacher'] = $departmentId;
            $params['dept_student'] = $departmentId;
        }

        $sql = "SELECT c.id, c.type, c.name, c.class_id, c.department_id, c.updated_at
                FROM chat_conversations c
                WHERE " . implode(' AND ', $where) . "
                ORDER BY c.updated_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $conversations = $stmt->fetchAll();

        $result = [];
        foreach ($conversations as $conv) {
            $stmt = $db->prepare("SELECT user_id, user_role FROM chat_participants WHERE conversation_id = :cid");
            $stmt->execute(['cid' => $conv['id']]);
            $participants = array_map(
                fn($p) => array_merge(
                    ['id' => (int) $p['user_id'], 'role' => $p['user_role'], 'name' => $this->getUserName((int) $p['user_id'], $p['user_role'])],
                    $this->getUserPresence((int) $p['user_id'], $p['user_role'])
                ),
                $stmt->fetchAll()
            );

            $stmt = $db->prepare(
                "SELECT message, attachment_type, sender_id, sender_role, created_at
                 FROM chat_messages WHERE conversation_id = :cid ORDER BY created_at DESC LIMIT 1"
            );
            $stmt->execute(['cid' => $conv['id']]);
            $last = $stmt->fetch();

            $displayName = $conv['name'] ?: implode(' & ', array_column($participants, 'name'));

            $result[] = [
                'id' => (int) $conv['id'],
                'type' => $conv['type'],
                'name' => $displayName,
                'participants' => $participants,
                'class_id' => $conv['class_id'] ? (int) $conv['class_id'] : null,
                'department_id' => $conv['department_id'] ? (int) $conv['department_id'] : null,
                'updated_at' => $conv['updated_at'],
                'last_message' => $last ? [
                    'message' => $last['message'],
                    'attachment_type' => $last['attachment_type'],
                    'sender_name' => $this->getUserName((int) $last['sender_id'], $last['sender_role']),
                    'created_at' => $last['created_at'],
                ] : null,
            ];
        }

        return $result;
    }

    /**
     * Whether $conversationId touches $departmentId (same scope rule as
     * listConversationsInScope()), for authorizing a single-conversation monitoring view.
     */
    public function isConversationInDepartmentScope(int $conversationId, int $departmentId): bool
    {
        $stmt = $this->getDb()->prepare(
            "SELECT 1 FROM chat_conversations c
             WHERE c.id = :cid AND c.deleted_at IS NULL AND (
                c.department_id = :dept_direct
                OR EXISTS (
                    SELECT 1 FROM chat_participants cp
                    INNER JOIN teachers t ON cp.user_id = t.id AND cp.user_role = 'teacher'
                    WHERE cp.conversation_id = c.id AND t.department_id = :dept_teacher
                )
                OR EXISTS (
                    SELECT 1 FROM chat_participants cp
                    INNER JOIN student_department_enrollments sde ON cp.user_id = sde.student_id AND cp.user_role = 'student'
                    WHERE cp.conversation_id = c.id AND sde.department_id = :dept_student AND sde.deleted_at IS NULL
                )
             ) LIMIT 1"
        );
        $stmt->execute([
            'cid' => $conversationId,
            'dept_direct' => $departmentId,
            'dept_teacher' => $departmentId,
            'dept_student' => $departmentId,
        ]);
        return (bool) $stmt->fetch();
    }

    /**
     * Get messages in a conversation for a read-only monitor (HOD/Admin) - same shape as
     * getMessages() but never marks anything read since the monitor isn't a real participant.
     */
    public function getMessagesReadOnly(int $conversationId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT m.*, r.message as reply_message, r.sender_id as reply_sender_id, r.sender_role as reply_sender_role
             FROM chat_messages m
             LEFT JOIN chat_messages r ON m.reply_to_id = r.id
             WHERE m.conversation_id = :cid
             ORDER BY m.created_at ASC"
        );
        $stmt->execute(['cid' => $conversationId]);

        return array_map(function ($row) {
            return [
                'id' => (int) $row['id'],
                'sender_id' => (int) $row['sender_id'],
                'sender_role' => $row['sender_role'],
                'sender_name' => $this->getUserName((int) $row['sender_id'], $row['sender_role']),
                'message' => $row['message'],
                'attachment' => $row['attachment'],
                'attachment_type' => $row['attachment_type'],
                'attachment_name' => $row['attachment_name'],
                'attachment_size' => $row['attachment_size'] ? (int) $row['attachment_size'] : null,
                'reply_to' => $row['reply_to_id'] ? [
                    'id' => (int) $row['reply_to_id'],
                    'message' => $row['reply_message'],
                    'sender_name' => $row['reply_sender_id'] !== null ? $this->getUserName((int) $row['reply_sender_id'], $row['reply_sender_role']) : null,
                ] : null,
                'created_at' => $row['created_at'],
            ];
        }, $stmt->fetchAll());
    }

    /**
     * Validate and store an uploaded chat attachment (image/audio/video/document). Returns
     * ['url','path','category','name','size'], or null (having sent an error response via
     * $controller) if validation fails.
     */
    public function handleUpload(\eSpace\App\Controllers\Controller $controller): ?array
    {
        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            $controller->error('No file uploaded or upload error occurred', 400);
            return null;
        }

        $file = $_FILES['file'];

        if ($file['size'] > self::MAX_FILE_SIZE) {
            $controller->error('File exceeds maximum size of 25MB', 400);
            return null;
        }

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!isset(self::ALLOWED_MIME[$mimeType])) {
            $controller->error('Unsupported file type', 400);
            return null;
        }

        $category = self::ALLOWED_MIME[$mimeType];

        $uploadDir = __DIR__ . '/../../public/uploads/' . self::UPLOAD_SUBDIR . '/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = 'chat_' . bin2hex(random_bytes(8)) . '_' . time() . ($ext ? '.' . preg_replace('/[^a-zA-Z0-9]/', '', $ext) : '');
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            $controller->serverError('Failed to save uploaded file');
            return null;
        }

        return [
            'url' => '/uploads/' . self::UPLOAD_SUBDIR . '/' . $filename,
            'path' => $filepath,
            'category' => $category,
            'name' => htmlspecialchars(basename($file['name']), ENT_QUOTES, 'UTF-8'),
            'size' => (int) $file['size'],
        ];
    }
}
