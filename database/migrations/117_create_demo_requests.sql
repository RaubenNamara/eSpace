-- Demo requests from the public eSpace landing page: a school asking to see eSpace. Listed for
-- admins under Demo requests; `status` tracks follow-up (new -> contacted -> closed).
CREATE TABLE IF NOT EXISTS `demo_requests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_name` VARCHAR(150) NOT NULL,
  `contact_name` VARCHAR(120) NOT NULL,
  `role` VARCHAR(80) NULL,
  `email` VARCHAR(150) NULL,
  `phone` VARCHAR(40) NULL,
  `students` VARCHAR(30) NULL,
  `message` TEXT NULL,
  `status` ENUM('new','contacted','closed') NOT NULL DEFAULT 'new',
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_demo_requests_status` (`status`),
  KEY `idx_demo_requests_ip_time` (`ip_address`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
