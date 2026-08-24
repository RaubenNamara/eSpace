-- Migration: Create Item Bank Tables
-- Description: Creates tables for question bank management

CREATE TABLE IF NOT EXISTS `item_bank_questions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `subject_id` INT UNSIGNED NOT NULL,
    `topic_id` INT UNSIGNED NULL,
    `question_text` TEXT NOT NULL,
    `question_type` ENUM('multiple_choice', 'true_false', 'short_answer', 'essay', 'fill_blank') NOT NULL,
    `difficulty` ENUM('easy', 'medium', 'hard') NOT NULL,
    `options` JSON NULL,
    `correct_answer` TEXT NOT NULL,
    `explanation` TEXT NULL,
    `marks` DECIMAL(5,2) NOT NULL DEFAULT 1,
    `created_by` INT UNSIGNED NOT NULL,
    `is_approved` TINYINT(1) NOT NULL DEFAULT 0,
    `approved_by` INT UNSIGNED NULL,
    `approved_at` TIMESTAMP NULL,
    `tags` JSON NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_subject_id` (`subject_id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_question_type` (`question_type`),
    KEY `idx_difficulty` (`difficulty`),
    KEY `idx_created_by` (`created_by`),
    KEY `idx_is_approved` (`is_approved`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_item_bank_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_item_bank_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_item_bank_creator` FOREIGN KEY (`created_by`) REFERENCES `teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `item_bank_attempts` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `question_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `mode` ENUM('practice', 'study') NOT NULL,
    `answer` TEXT NULL,
    `is_correct` TINYINT(1) NULL,
    `time_spent_seconds` INT UNSIGNED NULL,
    `attempted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_question_id` (`question_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_mode` (`mode`),
    KEY `idx_attempted_at` (`attempted_at`),
    CONSTRAINT `fk_item_attempts_question` FOREIGN KEY (`question_id`) REFERENCES `item_bank_questions` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_item_attempts_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
