-- Migration: Create student_department_enrollments table
-- Description: Creates table to track student enrollments in departments with academic year and class

CREATE TABLE IF NOT EXISTS `student_department_enrollments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `department_id` INT UNSIGNED NOT NULL,
    `academic_year` VARCHAR(20) NOT NULL,
    `class_id` INT UNSIGNED NULL,
    `enrolled_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_student_department_year` (`student_id`, `department_id`, `academic_year`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_department_id` (`department_id`),
    KEY `idx_academic_year` (`academic_year`),
    KEY `idx_class_id` (`class_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_student_enrollments_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_student_enrollments_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_student_enrollments_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
