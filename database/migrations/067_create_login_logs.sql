-- Tracks every successful login across all roles (student, teacher, hod, admin, super_admin)
-- for the admin System Logs page. Denormalized (username/role captured at login time) rather
-- than a user_id + FK, deliberately following the same reasoning as student_logins
-- (039_create_student_logins.sql): ids collide across the students/teachers/hods/users tables
-- in this app, and there is no single table a cross-role FK could point at.

CREATE TABLE IF NOT EXISTS `login_logs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `role` VARCHAR(20) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `full_name` VARCHAR(150) NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` VARCHAR(255) NULL,
    `logged_in_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_login_logs_user` (`user_id`, `role`),
    KEY `idx_login_logs_role` (`role`),
    KEY `idx_login_logs_date` (`logged_in_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
