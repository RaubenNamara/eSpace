-- Migration: Create eNotes Tables
-- Description: Creates tables for teacher eNotes module with topics and pages

CREATE TABLE IF NOT EXISTS `enote_topics` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `teacher_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NULL,
    `subject_id` INT UNSIGNED NOT NULL,
    `department_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    `published_at` TIMESTAMP NULL,
    `archived_at` TIMESTAMP NULL,
    `total_pages` INT UNSIGNED NOT NULL DEFAULT 0,
    `estimated_reading_time` INT UNSIGNED NULL COMMENT 'in minutes',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_teacher_id` (`teacher_id`),
    KEY `idx_class_id` (`class_id`),
    KEY `idx_subject_id` (`subject_id`),
    KEY `idx_department_id` (`department_id`),
    KEY `idx_status` (`status`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_enote_topics_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_enote_topics_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_enote_topics_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_enote_topics_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `enote_pages` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `topic_id` INT UNSIGNED NOT NULL,
    `order_number` INT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_topic_order` (`topic_id`, `order_number`, `deleted_at`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_order_number` (`order_number`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_enote_pages_topic` FOREIGN KEY (`topic_id`) REFERENCES `enote_topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table for tracking student progress on eNotes (for future student module)
CREATE TABLE IF NOT EXISTS `enote_progress` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `topic_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `current_page_id` INT UNSIGNED NULL,
    `pages_completed` INT UNSIGNED NOT NULL DEFAULT 0,
    `percentage_completed` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    `last_read_at` TIMESTAMP NULL,
    `time_spent_minutes` INT UNSIGNED NOT NULL DEFAULT 0,
    `completed_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_topic_student` (`topic_id`, `student_id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_current_page_id` (`current_page_id`),
    KEY `idx_last_read_at` (`last_read_at`),
    CONSTRAINT `fk_enote_progress_topic` FOREIGN KEY (`topic_id`) REFERENCES `enote_topics` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_enote_progress_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_enote_progress_page` FOREIGN KEY (`current_page_id`) REFERENCES `enote_pages` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table for eNote bookmarks (for future student module)
CREATE TABLE IF NOT EXISTS `enote_bookmarks` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `topic_id` INT UNSIGNED NOT NULL,
    `page_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `note_text` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_page_id` (`page_id`),
    KEY `idx_student_id` (`student_id`),
    CONSTRAINT `fk_enote_bookmarks_topic` FOREIGN KEY (`topic_id`) REFERENCES `enote_topics` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_enote_bookmarks_page` FOREIGN KEY (`page_id`) REFERENCES `enote_pages` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_enote_bookmarks_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
