-- Migration: Create Enrollment Audit Log Table
-- Description: Records every de-enroll/re-enroll action taken against a student, at whichever
-- scope (teacher-level via student_teacher_enrollments, or department-level via
-- student_department_enrollments), who performed it, their role, and an optional reason.
--
-- A dedicated table rather than the existing AuditLog model/audit_logs table: that model's
-- fillable columns (acting_user_id, entity_type, ...) don't match audit_logs' real live schema
-- (user_id, table_name, ...), and every existing caller of AuditLog::logAction() is placed
-- after a success()/error() call that already exits, so it's unreachable everywhere in this
-- codebase - see the 068 migration's own comment, which independently reached the same
-- conclusion and used a bespoke student_promotions table for the same reason.

CREATE TABLE IF NOT EXISTS `enrollment_audit_log` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `action` ENUM('teacher_de_enroll', 'teacher_re_enroll', 'department_de_enroll', 'department_re_enroll') NOT NULL,
    `teacher_id` INT UNSIGNED NULL,
    `department_id` INT UNSIGNED NOT NULL,
    `performed_by_id` INT UNSIGNED NOT NULL,
    `performed_by_role` VARCHAR(20) NOT NULL,
    `reason` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_department_id` (`department_id`),
    KEY `idx_teacher_id` (`teacher_id`),
    KEY `idx_created_at` (`created_at`),
    CONSTRAINT `fk_eal_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
