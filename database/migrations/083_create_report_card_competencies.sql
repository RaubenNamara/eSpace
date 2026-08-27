-- Migration: Create report_card_competencies
-- Description: Per-subject LOA/AOI/EOC competency breakdown on a report card, alongside (not
-- replacing) the existing per-assignment report_card_constructs. A subject only gets rows here
-- once it has at least one assignment tagged with assessment_category (migration 081) - subjects
-- with only untagged/legacy assignments keep showing just the constructs table. Percentage/status
-- come from averaging normalized assessment percentages within the category (never averaging
-- weights); weight is a separate, additional O-Level(/3)/A-Level(/5) representation of that same
-- percentage, not a substitute for it.

CREATE TABLE `report_card_competencies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `report_card_subject_id` INT UNSIGNED NOT NULL,
  `assessment_category` ENUM('LOA','AOI','EOC') NOT NULL,
  `percentage` DECIMAL(5,2) NOT NULL DEFAULT 0,
  `status` CHAR(1) NOT NULL,
  `performance_descriptor` VARCHAR(20) NOT NULL,
  `weight` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `descriptor_text` TEXT NULL,
  `source_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_subject_category` (`report_card_subject_id`, `assessment_category`),
  KEY `idx_report_card_competencies_subject` (`report_card_subject_id`),
  CONSTRAINT `fk_report_card_competencies_subject` FOREIGN KEY (`report_card_subject_id`)
    REFERENCES `report_card_subjects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
