-- Physical (offline) exam marks: a teacher/HOD/admin can record a whole class's marks for an
-- exam that happened on paper, tag whether it should count on report cards, and have it flow
-- into the same weighted-grade pipeline as online assignments via report_card_constructs.

CREATE TABLE `physical_assessments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `subject_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `term_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `max_score` DECIMAL(6,2) NOT NULL,
    `exam_date` DATE NOT NULL,
    `include_on_report` TINYINT(1) NOT NULL DEFAULT 1,
    `created_by` INT UNSIGNED NOT NULL,
    `created_by_role` ENUM('teacher','hod','admin') NOT NULL,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_physical_assessments_subject` (`subject_id`),
    KEY `idx_physical_assessments_class` (`class_id`),
    KEY `idx_physical_assessments_term` (`term_id`),
    CONSTRAINT `fk_physical_assessments_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
    CONSTRAINT `fk_physical_assessments_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
    CONSTRAINT `fk_physical_assessments_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `physical_assessment_scores` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `physical_assessment_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `score` DECIMAL(6,2) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_exam_student` (`physical_assessment_id`, `student_id`),
    KEY `idx_physical_assessment_scores_student` (`student_id`),
    CONSTRAINT `fk_physical_assessment_scores_exam` FOREIGN KEY (`physical_assessment_id`) REFERENCES `physical_assessments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_physical_assessment_scores_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- report_card_constructs.assignment_id was already nullable, so a physical-sourced construct just
-- leaves it NULL and fills physical_assessment_id instead.
ALTER TABLE `report_card_constructs`
    ADD COLUMN `physical_assessment_id` INT UNSIGNED NULL AFTER `assignment_id`,
    ADD COLUMN `source_type` ENUM('assignment','physical') NOT NULL DEFAULT 'assignment' AFTER `physical_assessment_id`,
    ADD CONSTRAINT `fk_report_card_constructs_physical` FOREIGN KEY (`physical_assessment_id`) REFERENCES `physical_assessments` (`id`) ON DELETE CASCADE;
