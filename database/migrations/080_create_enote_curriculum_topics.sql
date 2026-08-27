-- Migration: Create enote_curriculum_topics and enote_learning_outcomes
-- Description: Admin-authored curriculum reference data (theme/branch, topic, competence, and
-- ordered learning outcomes) scoped to an existing subject + academic year + class-stream + term,
-- so a teacher creating an eNote topic can pick a curriculum entry instead of typing this
-- metadata by hand. Deliberately reuses the existing subjects/academic_years/classes/terms tables
-- (a `classes` row already IS one class-stream, e.g. name="S.1", stream_name="A" -> "S.1-A") -
-- no new class/stream tables. FK columns are RESTRICT, not CASCADE: removing an academic
-- structure row that curriculum data depends on should require clearing that curriculum data
-- first, not silently orphan/delete it.

CREATE TABLE `enote_curriculum_topics` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `class_id` INT UNSIGNED NOT NULL COMMENT 'a classes row IS one class-stream (name + stream_name)',
  `term_id` INT UNSIGNED NOT NULL,
  `theme_branch` VARCHAR(255) NOT NULL,
  `topic` VARCHAR(255) NOT NULL,
  `competence` TEXT NOT NULL,
  `created_by` INT UNSIGNED DEFAULT NULL COMMENT 'admin user id',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_enote_curriculum_lookup` (`subject_id`, `academic_year_id`, `class_id`, `term_id`),
  KEY `idx_enote_curriculum_deleted_at` (`deleted_at`),
  CONSTRAINT `fk_enote_curriculum_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_enote_curriculum_academic_year` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_enote_curriculum_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_enote_curriculum_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `enote_learning_outcomes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `curriculum_topic_id` INT UNSIGNED NOT NULL,
  `learning_outcome` TEXT NOT NULL,
  `order_number` INT UNSIGNED NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_enote_learning_outcomes_topic` (`curriculum_topic_id`, `order_number`),
  CONSTRAINT `fk_enote_learning_outcomes_topic` FOREIGN KEY (`curriculum_topic_id`) REFERENCES `enote_curriculum_topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
