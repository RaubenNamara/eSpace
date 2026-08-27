-- Migration: Create Student-Teacher Enrollments Table
-- Description: Tracks per-teacher visibility for a student within a department, independent
-- of the department-wide enrollment in student_department_enrollments. A missing row means
-- "implicitly enrolled with this teacher" (the default - no row needs to exist for the normal
-- case where a student can see every teacher's content in their department). A row only gets
-- created when a teacher de-enrolls a student from just their own account - status='withdrawn'
-- hides that specific teacher's content from the student while every other teacher in the same
-- department, the HOD, and the admin are completely unaffected. Re-enrolling flips the same
-- row back to 'active' rather than deleting it, preserving history (see enrollment_audit_log
-- for the full event trail of de-enroll/re-enroll actions).

CREATE TABLE IF NOT EXISTS `student_teacher_enrollments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `teacher_id` INT UNSIGNED NOT NULL,
    `department_id` INT UNSIGNED NOT NULL,
    `status` ENUM('active', 'withdrawn') NOT NULL DEFAULT 'active',
    `enrolled_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `de_enrolled_at` TIMESTAMP NULL,
    `de_enrolled_by` INT UNSIGNED NULL,
    `de_enrolled_by_role` VARCHAR(20) NULL,
    `reason` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_student_teacher_department` (`student_id`, `teacher_id`, `department_id`),
    KEY `idx_student_status` (`student_id`, `status`),
    KEY `idx_teacher_status` (`teacher_id`, `status`),
    CONSTRAINT `fk_ste_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_ste_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_ste_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
