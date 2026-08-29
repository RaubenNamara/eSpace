-- Migration: Create assignment_answer_attachments
-- Description: Supplementary multi-file uploads for a free-response question answer, additive to
-- (not replacing) assignment_answers.student_attachment_path. That single column stays exactly as
-- it is - the one attachment Write mode's canvas bootstraps from and the one the teacher annotates
-- - while this table lets a student attach any number of extra supporting files (e.g. several
-- photos of handwritten work) that the teacher can view/preview but does not annotate directly.

CREATE TABLE `assignment_answer_attachments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `submission_id` INT UNSIGNED NOT NULL,
  `question_id` INT UNSIGNED NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `file_type` ENUM('pdf','image') NOT NULL,
  `display_order` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_answer_attachments_submission_question` (`submission_id`, `question_id`),
  CONSTRAINT `fk_answer_attachments_submission` FOREIGN KEY (`submission_id`)
    REFERENCES `assignment_submissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
