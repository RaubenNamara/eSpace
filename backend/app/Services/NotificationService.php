<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Notification Service
 *
 * Thin wrapper around the notifications table, scoped by (user_id, user_role) rather than
 * user_id alone - this app has four separate auth tables (students/teachers/hods/users) with
 * independently-incrementing, colliding ids, so user_id alone can't tell whose notification it
 * is. notify() is the one entry point other services/controllers call to raise a notification;
 * the rest back the shared NotificationController that every role reads its own inbox through.
 */
class NotificationService
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    public function notify(int $userId, string $userRole, string $type, string $title, string $message, ?array $data = null): void
    {
        $stmt = $this->getDb()->prepare(
            'INSERT INTO notifications (user_id, user_role, type, title, message, data, created_at)
             VALUES (:user_id, :user_role, :type, :title, :message, :data, NOW())'
        );
        $stmt->execute([
            'user_id' => $userId,
            'user_role' => $userRole,
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'data' => $data !== null ? json_encode($data) : null,
        ]);
    }

    /**
     * Same notification to every row in a list of (user_id, user_role) recipients - e.g. every
     * student in a class when a teacher publishes a new assignment.
     *
     * @param array<int, array{id: int, role: string}> $recipients
     */
    public function notifyMany(array $recipients, string $type, string $title, string $message, ?array $data = null): void
    {
        foreach ($recipients as $recipient) {
            $this->notify($recipient['id'], $recipient['role'], $type, $title, $message, $data);
        }
    }

    /**
     * Every student in a class - assignments are scoped this way (class_id direct on the row,
     * no department_id), see Student\AssignmentController's own visibility query.
     */
    public function notifyClass(?int $classId, string $type, string $title, string $message, ?array $data = null): void
    {
        if (!$classId) {
            return;
        }

        $stmt = $this->getDb()->prepare(
            'SELECT student_id FROM student_department_enrollments WHERE class_id = :class_id AND deleted_at IS NULL'
        );
        $stmt->execute(['class_id' => $classId]);

        foreach ($stmt->fetchAll() as $row) {
            $this->notify((int) $row['student_id'], 'student', $type, $title, $message, $data);
        }
    }

    /**
     * Every student in a department, optionally narrowed to one class - the visibility scoping
     * eLibrary/eNotes/live classes/videos/item bank all already use (a NULL class_id on the
     * source content row means "whole department", matching the student-facing list queries for
     * each of those modules).
     */
    public function notifyDepartmentClass(?int $departmentId, ?int $classId, string $type, string $title, string $message, ?array $data = null, ?string $classGroupName = null): void
    {
        if (!$departmentId) {
            return;
        }

        if ($classGroupName !== null) {
            // "All Streams" for a class level: every actively-enrolled student across every
            // stream named $classGroupName in this department - see
            // Controller::getStudentIdsByDepartmentAndClassLevel() for the read-side equivalent.
            $sql = "SELECT DISTINCT sde.student_id
                    FROM student_department_enrollments sde
                    INNER JOIN classes c ON c.id = sde.class_id
                    WHERE c.name = :class_group_name AND c.deleted_at IS NULL
                      AND sde.department_id = :department_id
                      AND sde.status = 'active' AND sde.deleted_at IS NULL";
            $params = ['class_group_name' => $classGroupName, 'department_id' => $departmentId];
        } else {
            $sql = 'SELECT student_id FROM student_department_enrollments WHERE department_id = :department_id AND deleted_at IS NULL';
            $params = ['department_id' => $departmentId];
            if ($classId) {
                $sql .= ' AND class_id = :class_id';
                $params['class_id'] = $classId;
            }
        }

        $stmt = $this->getDb()->prepare($sql);
        $stmt->execute($params);

        foreach ($stmt->fetchAll() as $row) {
            $this->notify((int) $row['student_id'], 'student', $type, $title, $message, $data);
        }
    }

    public function listForUser(int $userId, string $userRole, bool $unreadOnly, int $limit): array
    {
        $where = 'user_id = :user_id AND user_role = :user_role';
        $params = ['user_id' => $userId, 'user_role' => $userRole];
        if ($unreadOnly) {
            $where .= ' AND is_read = 0';
        }

        $stmt = $this->getDb()->prepare(
            "SELECT * FROM notifications WHERE {$where} ORDER BY created_at DESC LIMIT {$limit}"
        );
        $stmt->execute($params);

        return array_map(fn($row) => [
            'id' => (int) $row['id'],
            'type' => $row['type'],
            'title' => $row['title'],
            'message' => $row['message'],
            'data' => $row['data'] !== null ? json_decode($row['data'], true) : null,
            'is_read' => (bool) $row['is_read'],
            'created_at' => $row['created_at'],
        ], $stmt->fetchAll());
    }

    public function unreadCount(int $userId, string $userRole): int
    {
        $stmt = $this->getDb()->prepare(
            'SELECT COUNT(*) AS c FROM notifications WHERE user_id = :user_id AND user_role = :user_role AND is_read = 0'
        );
        $stmt->execute(['user_id' => $userId, 'user_role' => $userRole]);
        return (int) $stmt->fetch()['c'];
    }

    public function markAsRead(int $id, int $userId, string $userRole): void
    {
        $stmt = $this->getDb()->prepare(
            'UPDATE notifications SET is_read = 1, read_at = NOW()
             WHERE id = :id AND user_id = :user_id AND user_role = :user_role AND is_read = 0'
        );
        $stmt->execute(['id' => $id, 'user_id' => $userId, 'user_role' => $userRole]);
    }

    public function markAllAsRead(int $userId, string $userRole): void
    {
        $stmt = $this->getDb()->prepare(
            'UPDATE notifications SET is_read = 1, read_at = NOW()
             WHERE user_id = :user_id AND user_role = :user_role AND is_read = 0'
        );
        $stmt->execute(['user_id' => $userId, 'user_role' => $userRole]);
    }
}
