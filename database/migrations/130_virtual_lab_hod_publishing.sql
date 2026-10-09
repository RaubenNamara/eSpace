-- HOD publishing of Virtual Lab experiments to their own department's classes.
--
-- Like an admin-published assignment (migration 129), a HOD-published one has teacher_id NULL and
-- department_id set (the HOD's department), so the department's students see it and its teachers
-- can follow and mark it. published_by_hod records the HOD (hods.id), so the assignment shows as
-- published by the HOD rather than by the admin. Schema change only - no existing row is
-- modified. Safe to re-run.

SET @col_exists = (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'virtual_lab_assignments' AND COLUMN_NAME = 'published_by_hod');
SET @sql = IF(@col_exists = 0,
    'ALTER TABLE `virtual_lab_assignments` ADD COLUMN `published_by_hod` INT UNSIGNED NULL AFTER `published_by_admin`',
    'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
