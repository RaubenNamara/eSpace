-- 163: Cases - a learner's discipline record. A teacher (or HOD) records a case on a learner, with
-- evidence such as a photo or PDF of a written apology; the super admin sees every case, learner by
-- learner, for the discipline committee. Learners, parents and other staff never see them.
-- Evidence files are kept outside the public folder (backend/storage/cases) and served only to the
-- reporter and the super admin (CaseController::file). Safe to run again.
CREATE TABLE IF NOT EXISTS `student_cases` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` INT UNSIGNED NOT NULL,
  `reporter_id` INT UNSIGNED NOT NULL,
  `reporter_role` VARCHAR(20) NOT NULL,
  `reporter_name` VARCHAR(150) NOT NULL,
  `occurred_on` DATE NOT NULL,
  `category` VARCHAR(60) NOT NULL,
  `severity` ENUM('minor','serious','major') NOT NULL DEFAULT 'minor',
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `action_taken` TEXT NULL,
  `status` ENUM('open','resolved') NOT NULL DEFAULT 'open',
  `admin_note` TEXT NULL,
  `resolved_at` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_cases_student` (`student_id`, `occurred_on`),
  KEY `idx_cases_reporter` (`reporter_role`, `reporter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `student_case_files` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `case_id` INT UNSIGNED NOT NULL,
  `stored_name` VARCHAR(120) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(80) NOT NULL,
  `size_bytes` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_case_files_case` (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
