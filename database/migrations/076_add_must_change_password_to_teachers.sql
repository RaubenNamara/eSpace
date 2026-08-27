-- Migration: Add must_change_password flag to teachers
-- Description: Forces a teacher on a temporary/default password (set by an admin/HOD when
-- creating the account, via Excel import, or via an admin password reset) to change it before
-- they can use any other teacher-facing feature. See MustChangePasswordMiddleware and
-- AuthService::changePassword().

ALTER TABLE `teachers`
ADD COLUMN `must_change_password` TINYINT(1) NOT NULL DEFAULT 0 AFTER `password`;
