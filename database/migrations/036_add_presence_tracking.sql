-- Online presence ("green dot") for chat: last_login_at only updates at login and can't tell
-- whether someone is still active, so a separate heartbeat-driven column is needed. Added to
-- every role table (students/teachers/hods) plus the shared users table (admin/super_admin),
-- mirroring how last_login_at is already spread across the same four tables.
ALTER TABLE `students` ADD COLUMN `last_active_at` TIMESTAMP NULL DEFAULT NULL AFTER `last_login_at`;
ALTER TABLE `teachers` ADD COLUMN `last_active_at` TIMESTAMP NULL DEFAULT NULL AFTER `last_login_at`;
ALTER TABLE `hods` ADD COLUMN `last_active_at` TIMESTAMP NULL DEFAULT NULL AFTER `last_login_at`;
ALTER TABLE `users` ADD COLUMN `last_active_at` TIMESTAMP NULL DEFAULT NULL AFTER `last_login_at`;
