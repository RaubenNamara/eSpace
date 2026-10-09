-- Admin publishing of Virtual Lab experiments to a department's classes.
--
-- Until now every assignment was published by a teacher (teacher_id NOT NULL). An admin can now
-- publish a library experiment straight to a class (or all streams of a class level) in a chosen
-- department: such an assignment has teacher_id NULL, records the admin in published_by_admin
-- (users.id) and the department in department_id.
--
-- department_id is what students are matched through for these rows (otherwise, as before, the
-- department of the assignment's subject), and it is what lets every teacher of that department
-- see and mark the class's work. Existing rows are left exactly as they are: their department_id
-- stays NULL, so they keep matching through their subject's department and their own teacher.
-- Schema change only - no existing assignment, attempt or teacher copy is modified. Safe to re-run.

SET @col_exists = (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'virtual_lab_assignments' AND COLUMN_NAME = 'published_by_admin');
SET @sql = IF(@col_exists = 0,
    'ALTER TABLE `virtual_lab_assignments`
        MODIFY `teacher_id` INT UNSIGNED NULL,
        ADD COLUMN `published_by_admin` INT UNSIGNED NULL AFTER `teacher_id`,
        ADD COLUMN `department_id` INT UNSIGNED NULL AFTER `subject_id`,
        ADD KEY `idx_lab_assignments_department` (`department_id`)',
    'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
