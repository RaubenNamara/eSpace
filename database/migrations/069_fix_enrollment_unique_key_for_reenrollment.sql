-- 068 made de-enrollment close a row (status='withdrawn') instead of deleting it, but the
-- pre-existing unique key `unique_enrollment` (student_id, department_id, academic_year) still
-- only allows ONE row per that combination ever - so a student withdrawn from a department can
-- no longer be re-enrolled in the same department/year, since the closed row still occupies the
-- key. MySQL has no partial/filtered unique index, so a generated column that's NULL for any
-- non-active row is used instead - NULLs don't collide in a unique index, so only ACTIVE rows
-- are constrained to be unique per (student, department, year); any number of withdrawn/
-- completed/promoted rows for that same combination can coexist as history.

ALTER TABLE `student_department_enrollments`
    DROP INDEX `unique_enrollment`;

ALTER TABLE `student_department_enrollments`
    ADD COLUMN `active_department_id` INT UNSIGNED
        GENERATED ALWAYS AS (IF(`status` = 'active', `department_id`, NULL)) STORED
        AFTER `department_id`;

ALTER TABLE `student_department_enrollments`
    ADD UNIQUE KEY `unique_active_enrollment` (`student_id`, `active_department_id`, `academic_year`);
