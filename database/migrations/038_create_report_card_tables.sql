-- Report Card / CBC assessment module: school-wide settings (report header), termly attendance
-- summary, and the report card itself (subjects -> constructs), built on top of the existing
-- assignments/grading data rather than a new manual gradebook.

CREATE TABLE IF NOT EXISTS `school_settings` (
    `id` INT UNSIGNED NOT NULL,
    `school_name` VARCHAR(150) NOT NULL DEFAULT '',
    `logo_path` VARCHAR(255) NULL,
    `box_number` VARCHAR(100) NULL,
    `website` VARCHAR(150) NULL,
    `email` VARCHAR(150) NULL,
    `phone` VARCHAR(50) NULL,
    `motto` VARCHAR(150) NULL,
    `address` VARCHAR(255) NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `school_settings` (`id`, `school_name`) VALUES (1, 'My School')
    ON DUPLICATE KEY UPDATE `id` = `id`;

CREATE TABLE IF NOT EXISTS `student_attendance` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `term_id` INT UNSIGNED NOT NULL,
    `days_present` INT UNSIGNED NOT NULL DEFAULT 0,
    `days_absent` INT UNSIGNED NOT NULL DEFAULT 0,
    `updated_by` INT UNSIGNED NULL,
    `updated_by_role` ENUM('teacher','admin') NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_student_term_attendance` (`student_id`, `term_id`),
    KEY `idx_attendance_student` (`student_id`),
    KEY `idx_attendance_term` (`term_id`),
    CONSTRAINT `fk_attendance_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_attendance_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `report_cards` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `term_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NULL,
    `total_points` INT UNSIGNED NOT NULL DEFAULT 0,
    `overall_avg_weight` DECIMAL(3,1) NOT NULL DEFAULT 0.0,
    `performance_level` VARCHAR(20) NULL,
    `result_category` TINYINT UNSIGNED NULL,
    `class_teacher_comment` TEXT NULL,
    `head_teacher_comment` TEXT NULL,
    `generated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `generated_by` INT UNSIGNED NULL,
    `generated_by_role` ENUM('teacher','admin') NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_student_term_report` (`student_id`, `term_id`),
    KEY `idx_report_cards_student` (`student_id`),
    KEY `idx_report_cards_term` (`term_id`),
    KEY `idx_report_cards_class` (`class_id`),
    CONSTRAINT `fk_report_cards_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_report_cards_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `report_card_subjects` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `report_card_id` INT UNSIGNED NOT NULL,
    `subject_id` INT UNSIGNED NOT NULL,
    `avg_weight` DECIMAL(3,1) NOT NULL DEFAULT 0.0,
    `grade` CHAR(1) NULL,
    `descriptor_text` TEXT NULL,
    `teacher_initials` VARCHAR(10) NULL,
    `assignments_included_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `assignments_total_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `source_hash` CHAR(64) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_report_subject` (`report_card_id`, `subject_id`),
    KEY `idx_report_card_subjects_report` (`report_card_id`),
    KEY `idx_report_card_subjects_subject` (`subject_id`),
    CONSTRAINT `fk_report_card_subjects_report` FOREIGN KEY (`report_card_id`) REFERENCES `report_cards` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_report_card_subjects_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `report_card_constructs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `report_card_subject_id` INT UNSIGNED NOT NULL,
    `assignment_id` INT UNSIGNED NULL,
    `construct_label` VARCHAR(100) NOT NULL,
    `score_obtained` DECIMAL(6,2) NOT NULL DEFAULT 0,
    `score_total` DECIMAL(6,2) NOT NULL DEFAULT 0,
    `weight` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_report_card_constructs_subject` (`report_card_subject_id`),
    CONSTRAINT `fk_report_card_constructs_subject` FOREIGN KEY (`report_card_subject_id`) REFERENCES `report_card_subjects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
