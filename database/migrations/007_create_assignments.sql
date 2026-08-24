-- Migration: Create Assignments and Submissions
-- Description: Creates tables for assignment management

CREATE TABLE IF NOT EXISTS `assignments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `class_subject_id` INT UNSIGNED NOT NULL,
    `topic_id` INT UNSIGNED NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `type` ENUM('essay', 'scenario', 'objective', 'file_upload', 'mixed') NOT NULL,
    `total_marks` DECIMAL(5,2) NOT NULL,
    `due_date` DATETIME NOT NULL,
    `instructions` TEXT NULL,
    `attachments` JSON NULL,
    `rubric` JSON NULL,
    `is_published` TINYINT(1) NOT NULL DEFAULT 0,
    `published_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_class_subject_id` (`class_subject_id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_due_date` (`due_date`),
    KEY `idx_is_published` (`is_published`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_assignments_class_subject` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_assignments_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `assignment_submissions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `assignment_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `content` TEXT NULL,
    `attachments` JSON NULL,
    `is_draft` TINYINT(1) NOT NULL DEFAULT 1,
    `submitted_at` TIMESTAMP NULL,
    `marks_obtained` DECIMAL(5,2) NULL,
    `feedback` TEXT NULL,
    `graded_at` TIMESTAMP NULL,
    `graded_by` INT UNSIGNED NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_assignment_student` (`assignment_id`, `student_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_submitted_at` (`submitted_at`),
    KEY `idx_is_draft` (`is_draft`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_submissions_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_submissions_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `assignment_annotations` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `submission_id` INT UNSIGNED NOT NULL,
    `teacher_id` INT UNSIGNED NOT NULL,
    `type` ENUM('pen', 'highlighter', 'text', 'shape', 'comment') NOT NULL,
    `page_number` INT UNSIGNED NOT NULL,
    `x` DECIMAL(10,2) NOT NULL,
    `y` DECIMAL(10,2) NOT NULL,
    `width` DECIMAL(10,2) NULL,
    `height` DECIMAL(10,2) NULL,
    `color` VARCHAR(20) NULL,
    `stroke_width` DECIMAL(5,2) NULL,
    `content` TEXT NULL,
    `points` JSON NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_submission_id` (`submission_id`),
    KEY `idx_teacher_id` (`teacher_id`),
    KEY `idx_page_number` (`page_number`),
    CONSTRAINT `fk_annotations_submission` FOREIGN KEY (`submission_id`) REFERENCES `assignment_submissions` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_annotations_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add foreign key constraint for graded_by
ALTER TABLE `assignment_submissions` ADD CONSTRAINT `fk_submissions_grader` FOREIGN KEY (`graded_by`) REFERENCES `teachers` (`id`) ON DELETE SET NULL;
