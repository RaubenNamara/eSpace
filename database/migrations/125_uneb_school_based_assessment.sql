-- UNEB school-based assessment (continuous assessment) under the new lower secondary curriculum.
--
--  * students: the Learner Identification Number (LIN) and the UNEB index number, which the
--    continuous-assessment returns are keyed on
--  * physical_assessments: a category, so paper Activities of Integration and project work count
--    towards a learner's continuous assessment the same way online AOIs do
--  * sba_evidence: photos and scans of a learner's AOI or project work, kept against the AOI they
--    prove (an online assessment or a paper one), for moderation
--  * school_settings: the UNEB centre number, what the continuous-assessment score is out of
--    (20 by default) and the school's own deadline for having it ready

ALTER TABLE `students`
    ADD COLUMN `lin` VARCHAR(20) NULL DEFAULT NULL AFTER `admission_number`,
    ADD COLUMN `uneb_index_number` VARCHAR(30) NULL DEFAULT NULL AFTER `lin`,
    ADD KEY `idx_students_lin` (`lin`);

ALTER TABLE `physical_assessments`
    ADD COLUMN `assessment_category` ENUM('AOI', 'PROJECT') NULL DEFAULT NULL AFTER `title`,
    ADD COLUMN `curriculum_topic_id` INT UNSIGNED NULL DEFAULT NULL AFTER `assessment_category`,
    ADD KEY `idx_physical_category` (`subject_id`, `assessment_category`);

CREATE TABLE IF NOT EXISTS `sba_evidence` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `subject_id` INT UNSIGNED NOT NULL,
    `assignment_id` INT UNSIGNED NULL DEFAULT NULL,
    `physical_assessment_id` INT UNSIGNED NULL DEFAULT NULL,
    `file_path` VARCHAR(255) NOT NULL,
    `file_kind` ENUM('image', 'pdf') NOT NULL,
    `original_name` VARCHAR(255) NULL DEFAULT NULL,
    `note` VARCHAR(500) NULL DEFAULT NULL,
    `uploaded_by` INT UNSIGNED NOT NULL,
    `uploaded_by_role` ENUM('teacher', 'hod', 'admin') NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_sba_evidence_student_subject` (`student_id`, `subject_id`),
    KEY `idx_sba_evidence_assignment` (`assignment_id`),
    KEY `idx_sba_evidence_physical` (`physical_assessment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `school_settings`
    ADD COLUMN `uneb_centre_number` VARCHAR(20) NULL DEFAULT NULL,
    ADD COLUMN `sba_out_of` DECIMAL(5,2) NOT NULL DEFAULT 20.00,
    ADD COLUMN `sba_deadline` DATE NULL DEFAULT NULL;
