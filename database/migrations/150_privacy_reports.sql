-- 150: Privacy reports - "Report a concern" on the public Privacy page (/privacy).
--  Anyone, signed in or not, can report a privacy or safety concern: data that should not be seen,
--  a learner at risk, misuse of an account. Every super admin is notified at once (the bell, and
--  a phone notification where turned on) and follows it up under System > Privacy reports
--  (new -> looking into it -> closed). See PrivacyReportController.
--  Safe to run again.
CREATE TABLE IF NOT EXISTS `privacy_reports` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(40) NOT NULL,
  `message` TEXT NOT NULL,
  `contact_name` VARCHAR(120) DEFAULT NULL,
  `contact` VARCHAR(150) DEFAULT NULL,
  `reporter_user_id` INT UNSIGNED DEFAULT NULL,
  `reporter_role` VARCHAR(20) DEFAULT NULL,
  `status` ENUM('new','looking','closed') NOT NULL DEFAULT 'new',
  `note` VARCHAR(1000) DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_privacy_reports_status` (`status`, `created_at`),
  KEY `idx_privacy_reports_ip_time` (`ip_address`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
