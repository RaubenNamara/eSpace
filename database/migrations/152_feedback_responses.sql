-- 152: Anonymous feedback about Tusome (/feedback), read by super admins under System > Feedback.
--  Nothing that identifies the person is kept: no account, no name, no internet address. Only who
--  they are in general (student, teacher, ... or "other" in their own words), a student's class
--  level if they give it, their ticked answers (`answers`, by question - see FeedbackController::
--  questions()), the overall rating and an optional comment. `day_key` is a one-way code that
--  changes every day, used only to stop one device sending the form again and again.
--  Safe to run again.
CREATE TABLE IF NOT EXISTS `feedback_responses` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(20) NOT NULL,
  `role_other` VARCHAR(60) DEFAULT NULL,
  `level` VARCHAR(10) DEFAULT NULL,
  `overall` TINYINT UNSIGNED DEFAULT NULL,
  `answers` TEXT NOT NULL,
  `comment` TEXT DEFAULT NULL,
  `day_key` CHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_feedback_role_time` (`role`, `created_at`),
  KEY `idx_feedback_day_key` (`day_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
