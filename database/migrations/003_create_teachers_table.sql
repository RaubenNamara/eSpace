-- Migration: Create Teachers Table
-- Description: Creates the teachers table for teacher information

CREATE TABLE IF NOT EXISTS `teachers` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `employee_number` VARCHAR(20) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `address` TEXT NULL,
    `department_id` INT UNSIGNED NULL,
    `qualification` VARCHAR(100) NULL,
    `specialization` VARCHAR(100) NULL,
    `hire_date` DATE NOT NULL,
    `phone` VARCHAR(20) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_employee_number` (`employee_number`),
    UNIQUE KEY `unique_user_id` (`user_id`),
    KEY `idx_department_id` (`department_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_teachers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
