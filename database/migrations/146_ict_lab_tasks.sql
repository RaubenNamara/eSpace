-- 146: A teacher sets an ICT Lab practical for a class, like an assessment.
--  One row per class stream it is set for: which practical (the card key the ICT Lab front page
--  uses - 'assembly', 'boot', 'laptop-repair' ...), at which level, and when it is due. The
--  learners in that class get a notification and see it at the top of their ICT Lab; their best
--  score after it was set counts (IctLabController). Removing a task sets deleted_at.
--  Safe to run again.
CREATE TABLE IF NOT EXISTS `ict_lab_tasks` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_id` INT UNSIGNED NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  `class_id` INT UNSIGNED NOT NULL,
  `practical` VARCHAR(60) NOT NULL,
  `level` ENUM('simple','intermediate','advanced') NOT NULL DEFAULT 'simple',
  `due_at` DATETIME DEFAULT NULL,
  `note` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ilt_class` (`class_id`, `department_id`, `deleted_at`),
  KEY `idx_ilt_teacher` (`teacher_id`, `deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
