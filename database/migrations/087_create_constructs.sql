-- Migration: Create constructs and construct_topics
-- Description: The missing definition layer for EOC (Elements of Construct) - a named
-- competency tied to a Department, Subject, Level (O Level / A Level) and Assessment Objective
-- (AO1-AO8), grouping one or more existing enote_curriculum_topics rows. Deliberately does not
-- carry academic_year_id/term_id - a construct is year-independent even though the topics it
-- links to individually still are (see construct_topics -> enote_curriculum_topics).

CREATE TABLE `constructs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  `subject_id` INT UNSIGNED NOT NULL,
  `level` ENUM('O Level','A Level') NOT NULL,
  `assessment_objective` ENUM('AO1','AO2','AO3','AO4','AO5','AO6','AO7','AO8') NOT NULL,
  `description` TEXT NULL,
  `created_by` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_constructs_department` (`department_id`),
  KEY `idx_constructs_subject` (`subject_id`),
  CONSTRAINT `fk_constructs_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `fk_constructs_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `construct_topics` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `construct_id` INT UNSIGNED NOT NULL,
  `curriculum_topic_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_construct_topic` (`construct_id`, `curriculum_topic_id`),
  CONSTRAINT `fk_construct_topics_construct` FOREIGN KEY (`construct_id`) REFERENCES `constructs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_construct_topics_topic` FOREIGN KEY (`curriculum_topic_id`) REFERENCES `enote_curriculum_topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
