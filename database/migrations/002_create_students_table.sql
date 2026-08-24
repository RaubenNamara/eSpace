-- Migration: Create Students Table
-- Description: Creates the students table for student information

CREATE TABLE IF NOT EXISTS `students` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `admission_number` VARCHAR(20) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `address` TEXT NULL,
    `class_id` INT UNSIGNED NULL,
    `stream_id` INT UNSIGNED NULL,
    `admission_date` DATE NOT NULL,
    `parent_guardian_name` VARCHAR(100) NOT NULL,
    `parent_guardian_phone` VARCHAR(20) NOT NULL,
    `parent_guardian_email` VARCHAR(100) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_admission_number` (`admission_number`),
    UNIQUE KEY `unique_user_id` (`user_id`),
    KEY `idx_class_id` (`class_id`),
    KEY `idx_stream_id` (`stream_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_students_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
