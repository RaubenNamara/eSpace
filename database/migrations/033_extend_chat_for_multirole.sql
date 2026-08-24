-- Migration: Extend chat schema for multi-role messaging with replies and rich attachments
-- Description: The original chat schema referenced a single `users` table for created_by/
-- user_id/sender_id, but this app resolves identity per-role (students/teachers/hods/admins each
-- have their own table with independently auto-incrementing ids - the same pattern used by every
-- other feature in this app, e.g. $_SESSION['user_id'] + $_SESSION['role']), so a single FK into
-- `users` can't correctly identify a participant. This migration drops those FKs (a polymorphic
-- id+role pair is validated in application code instead, same as everywhere else) and adds a role
-- column alongside each id. It also adds: class_id/department_id on conversations (so a class
-- group chat and HOD/Admin department-scoped monitoring both have something to filter on),
-- reply_to_id on messages (quoted replies), and proper attachment metadata columns (type/name/
-- size) since the original schema only had a bare file path.

ALTER TABLE `chat_conversations`
    DROP FOREIGN KEY `fk_conversations_creator`,
    ADD COLUMN `created_by_role` ENUM('student', 'teacher', 'hod', 'admin') NOT NULL DEFAULT 'student' AFTER `created_by`,
    ADD COLUMN `class_id` INT UNSIGNED NULL AFTER `created_by_role`,
    ADD COLUMN `department_id` INT UNSIGNED NULL AFTER `class_id`,
    ADD KEY `idx_conversations_class_id` (`class_id`),
    ADD KEY `idx_conversations_department_id` (`department_id`),
    ADD CONSTRAINT `fk_conversations_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
    ADD CONSTRAINT `fk_conversations_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;

ALTER TABLE `chat_participants`
    DROP FOREIGN KEY `fk_participants_user`,
    DROP KEY `unique_conversation_user`,
    ADD COLUMN `user_role` ENUM('student', 'teacher', 'hod', 'admin') NOT NULL DEFAULT 'student' AFTER `user_id`,
    ADD UNIQUE KEY `unique_conversation_user_role` (`conversation_id`, `user_id`, `user_role`);

ALTER TABLE `chat_messages`
    DROP FOREIGN KEY `fk_messages_sender`,
    ADD COLUMN `sender_role` ENUM('student', 'teacher', 'hod', 'admin') NOT NULL DEFAULT 'student' AFTER `sender_id`,
    ADD COLUMN `reply_to_id` INT UNSIGNED NULL AFTER `message`,
    ADD COLUMN `attachment_type` VARCHAR(20) NULL AFTER `attachment`,
    ADD COLUMN `attachment_name` VARCHAR(255) NULL AFTER `attachment_type`,
    ADD COLUMN `attachment_size` INT UNSIGNED NULL AFTER `attachment_name`,
    ADD KEY `idx_messages_reply_to_id` (`reply_to_id`),
    ADD CONSTRAINT `fk_messages_reply_to` FOREIGN KEY (`reply_to_id`) REFERENCES `chat_messages` (`id`) ON DELETE SET NULL;
