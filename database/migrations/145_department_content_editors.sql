-- 145: Teachers see their department's content; editing someone else's needs the HOD's say-so.
--  Every teacher sees the eNotes, eLibrary books, Item Bank papers and videos of the other
--  teachers in their department (read only). They edit and delete only their own - unless the
--  department's HOD lets them edit their colleagues' work too: one row here per teacher and
--  department (Services/DepartmentContent). Removing the row takes the permission away.
--  Safe to run again.
CREATE TABLE IF NOT EXISTS `department_content_editors` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department_id` INT UNSIGNED NOT NULL,
  `teacher_id` INT UNSIGNED NOT NULL,
  `granted_by` INT UNSIGNED DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_dce_department_teacher` (`department_id`, `teacher_id`),
  KEY `idx_dce_teacher` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
