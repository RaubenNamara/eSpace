-- Migration: Create eLibrary Tables
-- Description: Creates tables for digital library management

CREATE TABLE IF NOT EXISTS `library_books` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `author` VARCHAR(100) NULL,
    `isbn` VARCHAR(20) NULL,
    `subject_id` INT UNSIGNED NULL,
    `description` TEXT NULL,
    `file_path` VARCHAR(255) NOT NULL,
    `file_type` VARCHAR(20) NOT NULL,
    `file_size` BIGINT UNSIGNED NULL,
    `cover_image` VARCHAR(255) NULL,
    `total_pages` INT UNSIGNED NULL,
    `uploaded_by` INT UNSIGNED NOT NULL,
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
    KEY `idx_uploaded_by` (`uploaded_by`),
    KEY `idx_is_approved` (`is_approved`),
    KEY `idx_assigned_to` (`assigned_to`),
    KEY `idx_assigned_id` (`assigned_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_library_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_library_uploader` FOREIGN KEY (`uploaded_by`) REFERENCES `teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `library_progress` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `book_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `current_page` INT UNSIGNED NOT NULL DEFAULT 0,
    `pages_read` INT UNSIGNED NOT NULL DEFAULT 0,
    `percentage_completed` DECIMAL(5,2) NOT NULL DEFAULT 0,
    `last_read_at` TIMESTAMP NULL,
    `time_spent_minutes` INT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_book_student` (`book_id`, `student_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_last_read_at` (`last_read_at`),
    CONSTRAINT `fk_library_progress_book` FOREIGN KEY (`book_id`) REFERENCES `library_books` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_library_progress_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `library_bookmarks` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `book_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `page_number` INT UNSIGNED NOT NULL,
    `note` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_book_id` (`book_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_page_number` (`page_number`),
    CONSTRAINT `fk_bookmarks_book` FOREIGN KEY (`book_id`) REFERENCES `library_books` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_bookmarks_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
