-- Migration: Competency evidence portfolio
-- Description: A student's own evidence of a topic competency - a photo of a model or project, a
-- short video or voice recording, a document - with a note on what it shows. Their teacher
-- confirms it (it then counts as evidence of the competency) or returns it with a comment.
-- One row per piece of evidence, against the curriculum topic whose competency it shows.

CREATE TABLE IF NOT EXISTS `competency_evidence` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` INT UNSIGNED NOT NULL,
  `curriculum_topic_id` INT UNSIGNED NOT NULL,
  `note` TEXT NULL,
  `file_path` VARCHAR(255) NULL,
  `file_kind` ENUM('image','pdf','audio','video') NULL,
  `original_name` VARCHAR(255) NULL,
  `status` ENUM('pending','confirmed','returned') NOT NULL DEFAULT 'pending',
  `teacher_comment` TEXT NULL,
  `reviewed_by` INT UNSIGNED NULL,
  `reviewed_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_evidence_student_topic` (`student_id`, `curriculum_topic_id`),
  KEY `idx_evidence_topic_status` (`curriculum_topic_id`, `status`),
  CONSTRAINT `fk_evidence_topic` FOREIGN KEY (`curriculum_topic_id`) REFERENCES `enote_curriculum_topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
