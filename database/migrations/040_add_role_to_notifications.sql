-- The notifications table (migration 013) was scoped only to the `users` table - its FK
-- literally references users.id - but this app has four separate auth tables
-- (students/teachers/hods/users) with independently-incrementing, colliding ids (e.g. a student
-- and an admin sharing id 1, already confirmed elsewhere in this app). The table was never
-- actually used (stale scaffold routes pointed at a controller that was never built, 0 rows
-- written), so fix the schema now rather than build the Notification Center on top of a FK that
-- can't express "this id belongs to one of four different tables."

ALTER TABLE `notifications` DROP FOREIGN KEY `fk_notifications_user`;
ALTER TABLE `notifications` ADD COLUMN `user_role` VARCHAR(20) NOT NULL AFTER `user_id`;
ALTER TABLE `notifications` ADD INDEX `idx_notifications_user_role_read` (`user_id`, `user_role`, `is_read`);
