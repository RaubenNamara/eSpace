-- "Clear Chat" is per-participant only: it hides message history before the clear moment from
-- that participant's own view without touching the underlying chat_messages rows at all, so
-- HOD/Admin monitoring (which reads chat_messages directly, never joining chat_participants)
-- keeps seeing the full, untouched history regardless of what any participant has cleared.

ALTER TABLE `chat_participants`
    ADD COLUMN `cleared_at` DATETIME NULL DEFAULT NULL AFTER `last_read_at`;
