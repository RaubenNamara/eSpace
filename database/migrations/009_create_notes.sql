-- Migration: Create eNotes Tables
-- Description: Creates tables for interactive notes management

CREATE TABLE IF NOT EXISTS `notes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `subject_id` INT UNSIGNED NOT NULL,
    `topic_id` INT UNSIGNED NULL,
    `subtopic_id` INT UNSIGNED NULL,
    `title` VARCHAR(200) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `is_published` TINYINT(1) NOT NULL DEFAULT 0,
    `published_at` TIMESTAMP NULL,
    `is_approved` TINYINT(1) NOT NULL DEFAULT 0,
    `approved_by` INT UNSIGNED NULL,
    `approved_at` TIMESTAMP NULL,
    `assigned_to` ENUM('class', 'stream', 'department', 'school') NULL,
    `assigned_id` INT UNSIGNED NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_subject_id` (`subject_id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_subtopic_id` (`subtopic_id`),
    KEY `idx_created_by` (`created_by`),
    KEY `idx_is_published` (`is_published`),
    KEY `idx_is_approved` (`is_approved`),
    KEY `idx_assigned_to` (`assigned_to`),
    KEY `idx_assigned_id` (`assigned_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_notes_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_notes_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_notes_subtopic` FOREIGN KEY (`subtopic_id`) REFERENCES `subtopics` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_notes_creator` FOREIGN KEY (`created_by`) REFERENCES `teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notes_progress` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `note_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `percentage_completed` DECIMAL(5,2) NOT NULL DEFAULT 0,
    `last_read_at` TIMESTAMP NULL,
    `time_spent_minutes` INT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_note_student` (`note_id`, `student_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_last_read_at` (`last_read_at`),
    CONSTRAINT `fk_notes_progress_note` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_notes_progress_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notes_bookmarks` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `note_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `note_text` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_note_id` (`note_id`),
    KEY `idx_student_id` (`student_id`),
    CONSTRAINT `fk_notes_bookmarks_note` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_notes_bookmarks_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
