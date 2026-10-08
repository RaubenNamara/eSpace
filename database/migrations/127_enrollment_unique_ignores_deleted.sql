-- A deleted enrolment (deleted_at set) that still said status = 'active' kept its place in the
-- "one active enrolment per student, department and year" unique key, so the learner could never
-- be enrolled in that department again that year: the app's own check skips deleted rows, then
-- the INSERT IGNORE was silently dropped by the key. The key now counts only live, active rows.

ALTER TABLE `student_department_enrollments`
    DROP INDEX `unique_active_enrollment`;

ALTER TABLE `student_department_enrollments`
    MODIFY `active_department_id` INT UNSIGNED
        GENERATED ALWAYS AS (IF(`status` = 'active' AND `deleted_at` IS NULL, `department_id`, NULL)) STORED;

ALTER TABLE `student_department_enrollments`
    ADD UNIQUE KEY `unique_active_enrollment` (`student_id`, `active_department_id`, `academic_year`);
