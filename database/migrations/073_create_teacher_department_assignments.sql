-- Migration: Create Teacher Department Assignments Table
-- Description: Allows a teacher to belong to more than one department, with one marked as
-- their primary/active department. teachers.department_id remains the single "primary"
-- column that the rest of the app (teacher dashboards, content stamping, HOD scoping via
-- the code paths that were left on primary-only lookups) continues to read - this table adds
-- membership on top of that, it does not replace the column.

CREATE TABLE IF NOT EXISTS `teacher_department_assignments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `teacher_id` INT UNSIGNED NOT NULL,
    `department_id` INT UNSIGNED NOT NULL,
    `is_primary` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_teacher_department` (`teacher_id`, `department_id`),
    KEY `idx_teacher_id` (`teacher_id`),
    KEY `idx_department_id` (`department_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_tda_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_tda_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Backfill: every teacher who already has a department_id becomes a primary member of it
INSERT INTO teacher_department_assignments (teacher_id, department_id, is_primary, created_at, updated_at)
SELECT id, department_id, 1, NOW(), NOW()
FROM teachers
WHERE department_id IS NOT NULL AND deleted_at IS NULL;
