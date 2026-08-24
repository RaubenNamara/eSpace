-- Extends student_department_enrollments into a proper enrollment-history structure for the
-- Student Promotion module, rather than adding a second, disconnected class-enrollment table -
-- every resource/assignment/Virtual-Lab visibility check in the app already keys off this table
-- (student_id + department_id + class_id + academic_year), so promotion (and de-enrollment)
-- should close/open rows here instead of destroying them.
--
-- Backfill reasoning: de-enrollment today hard-deletes rows (see Admin\StudentController::
-- deenroll()/deenrollSingle(), fixed alongside this migration), so every row that currently
-- exists represents a live, active enrollment - hence status='active', end_date=NULL for all of
-- them, with start_date backfilled from the existing enrolled_at timestamp.

ALTER TABLE `student_department_enrollments`
    ADD COLUMN `start_date` DATE NULL AFTER `class_id`,
    ADD COLUMN `end_date` DATE NULL AFTER `start_date`,
    ADD COLUMN `status` ENUM('active', 'completed', 'promoted', 'transferred', 'withdrawn') NOT NULL DEFAULT 'active' AFTER `end_date`,
    ADD COLUMN `term_joined_id` INT UNSIGNED NULL AFTER `status`,
    ADD COLUMN `promoted_from_enrollment_id` INT UNSIGNED NULL AFTER `term_joined_id`;

UPDATE `student_department_enrollments` SET `start_date` = DATE(`enrolled_at`) WHERE `start_date` IS NULL;

ALTER TABLE `student_department_enrollments`
    MODIFY COLUMN `start_date` DATE NOT NULL;

ALTER TABLE `student_department_enrollments`
    ADD KEY `idx_sde_class_status` (`class_id`, `status`),
    ADD KEY `idx_sde_student_status` (`student_id`, `status`),
    ADD CONSTRAINT `fk_sde_term_joined` FOREIGN KEY (`term_joined_id`) REFERENCES `terms` (`id`) ON DELETE SET NULL,
    ADD CONSTRAINT `fk_sde_promoted_from` FOREIGN KEY (`promoted_from_enrollment_id`) REFERENCES `student_department_enrollments` (`id`) ON DELETE SET NULL;

-- Audit trail for promotion batches. Deliberately its own table, not the AuditLog model - that
-- model's live audit_logs schema has drifted from what it expects (acting_user_id/entity_type/
-- etc. don't exist on the live table) and would throw on every insert. Mirrors the
-- student_award_audit / login_logs precedent of a dedicated table matching what's actually used.
CREATE TABLE IF NOT EXISTS `student_promotions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `from_class_id` INT UNSIGNED NOT NULL,
    `to_class_id` INT UNSIGNED NOT NULL,
    `from_academic_year_id` INT UNSIGNED NOT NULL,
    `to_academic_year_id` INT UNSIGNED NOT NULL,
    `term_id` INT UNSIGNED NULL,
    `enrollments_migrated_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `promoted_by` INT UNSIGNED NULL,
    `promoted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_student_promotions_student` (`student_id`),
    KEY `idx_student_promotions_from_class` (`from_class_id`),
    KEY `idx_student_promotions_to_class` (`to_class_id`),
    CONSTRAINT `fk_student_promotions_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_student_promotions_from_class` FOREIGN KEY (`from_class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_student_promotions_to_class` FOREIGN KEY (`to_class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_student_promotions_from_year` FOREIGN KEY (`from_academic_year_id`) REFERENCES `academic_years` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_student_promotions_to_year` FOREIGN KEY (`to_academic_year_id`) REFERENCES `academic_years` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_student_promotions_promoted_by` FOREIGN KEY (`promoted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
