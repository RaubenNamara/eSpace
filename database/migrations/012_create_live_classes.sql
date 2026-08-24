-- Migration: Create Live Classes Tables (BigBlueButton)
-- Description: Creates tables for live class management

CREATE TABLE IF NOT EXISTS `live_classes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `class_subject_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `scheduled_start` DATETIME NOT NULL,
    `scheduled_end` DATETIME NOT NULL,
    `actual_start` TIMESTAMP NULL,
    `actual_end` TIMESTAMP NULL,
    `meeting_id` VARCHAR(255) NULL,
    `meeting_url` VARCHAR(255) NULL,
    `moderator_password` VARCHAR(255) NULL,
    `attendee_password` VARCHAR(255) NULL,
    `is_recorded` TINYINT(1) NOT NULL DEFAULT 0,
    `recording_url` VARCHAR(255) NULL,
    `status` ENUM('scheduled', 'started', 'ended', 'cancelled') NOT NULL DEFAULT 'scheduled',
    `created_by` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_class_subject_id` (`class_subject_id`),
    KEY `idx_scheduled_start` (`scheduled_start`),
    KEY `idx_status` (`status`),
    KEY `idx_created_by` (`created_by`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_live_classes_class_subject` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_live_classes_creator` FOREIGN KEY (`created_by`) REFERENCES `teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `live_class_attendance` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `live_class_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `join_time` TIMESTAMP NULL,
    `leave_time` TIMESTAMP NULL,
    `duration_minutes` INT UNSIGNED NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_live_class_student` (`live_class_id`, `student_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_join_time` (`join_time`),
    CONSTRAINT `fk_live_attendance_class` FOREIGN KEY (`live_class_id`) REFERENCES `live_classes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_live_attendance_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
