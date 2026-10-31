-- Platform database (multi-school Tusome). NOT a school's database: it only knows which schools
-- exist and where each one's database is, the Tusome team's developer-portal logins, what the team
-- did, and independent learners asking to join. No student, teacher or mark lives here.
--
-- Create the database first (locally: CREATE DATABASE tusome_platform; on cPanel: MySQL Databases,
-- then give the site's database user ALL PRIVILEGES on it), set PLATFORM_DB_NAME in backend/.env
-- (default: tusome_platform), then run this file in it. Safe to run again.

CREATE TABLE IF NOT EXISTS `schools` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  -- typed at login ("School code"); lowercase letters, digits and dashes
  `code` VARCHAR(40) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  -- school: a real school · independent: learners on their own, not in any school
  `kind` ENUM('school','independent') NOT NULL DEFAULT 'school',
  -- the school's own database; NULL = the home database in backend/.env (DB_NAME, St Mark's)
  `db_name` VARCHAR(64) DEFAULT NULL,
  `status` ENUM('active','suspended') NOT NULL DEFAULT 'active',
  -- the school whose teaching content is the master copy every other school starts from
  `is_master` TINYINT(1) NOT NULL DEFAULT 0,
  `contact_name` VARCHAR(120) DEFAULT NULL,
  `contact_email` VARCHAR(150) DEFAULT NULL,
  `contact_phone` VARCHAR(40) DEFAULT NULL,
  `notes` VARCHAR(1000) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_schools_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- St Mark's: the first school, on the home database, and the master content
INSERT IGNORE INTO `schools` (`code`, `name`, `kind`, `db_name`, `status`, `is_master`)
VALUES ('stmark', 'St Mark''s College Namagoma', 'school', NULL, 'active', 1);

CREATE TABLE IF NOT EXISTS `platform_admins` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_platform_admins_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `platform_audit` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id` INT UNSIGNED DEFAULT NULL,
  `action` VARCHAR(60) NOT NULL,
  `target` VARCHAR(150) DEFAULT NULL,
  `details` VARCHAR(1000) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_platform_audit_time` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Independent learners asking to join (/join). The team contacts them, takes payment, then
-- activates them in the developer portal, which creates their login in the independent space.
CREATE TABLE IF NOT EXISTS `learner_requests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `phone` VARCHAR(40) DEFAULT NULL,
  `level` VARCHAR(10) NOT NULL,
  `gender` ENUM('male','female','other') DEFAULT NULL,
  `message` VARCHAR(1000) DEFAULT NULL,
  `status` ENUM('new','contacted','activated','declined') NOT NULL DEFAULT 'new',
  `note` VARCHAR(1000) DEFAULT NULL,
  `school_code` VARCHAR(40) DEFAULT NULL,
  `student_id` INT UNSIGNED DEFAULT NULL,
  `username` VARCHAR(50) DEFAULT NULL,
  `activated_at` TIMESTAMP NULL DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_learner_requests_status` (`status`, `created_at`),
  KEY `idx_learner_requests_ip_time` (`ip_address`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
