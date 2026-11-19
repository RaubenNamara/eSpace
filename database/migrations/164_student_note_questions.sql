-- 164: Ask my notes - a learner asks a question and gets a short answer drawn only from their
-- school's eNotes, with links to the pages it came from. Each question is kept: for the learner's
-- recent questions, and to hold each learner to a daily number of AI answers (they cost money per
-- use). Safe to run again.
CREATE TABLE IF NOT EXISTS `student_note_questions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` INT UNSIGNED NOT NULL,
  `question` VARCHAR(300) NOT NULL,
  `answer` TEXT NULL,
  `found` TINYINT(1) NOT NULL DEFAULT 0,
  `used_ai` TINYINT(1) NOT NULL DEFAULT 0,
  `sources` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_snq_student_time` (`student_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
