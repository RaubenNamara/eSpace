-- 141: removing a teacher with their work (admin "Delete teacher").
--  assignments.removed_at - the assessment's teacher was removed: students can no longer open or
--      attempt it, but marks already earned stay on report cards / mastery (those read
--      status + deleted_at, which are left alone). Cleared again if the teacher is restored.
--  teacher_removals - one row per removal: what was hidden (so a restore within 30 days puts back
--      exactly that), when it may be restored until, and when it was restored or purged.
ALTER TABLE `assignments`
  ADD COLUMN IF NOT EXISTS `removed_at` TIMESTAMP NULL DEFAULT NULL AFTER `deleted_at`;

CREATE TABLE IF NOT EXISTS `teacher_removals` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_id` INT UNSIGNED NOT NULL,
  `teacher_name` VARCHAR(200) NOT NULL,
  `teacher_username` VARCHAR(100) DEFAULT NULL,
  `was_active` TINYINT(1) NOT NULL DEFAULT 1,
  `removed_by` INT UNSIGNED DEFAULT NULL,
  `removed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `restore_until` TIMESTAMP NULL DEFAULT NULL,
  `restored_at` TIMESTAMP NULL DEFAULT NULL,
  `purged_at` TIMESTAMP NULL DEFAULT NULL,
  `items` LONGTEXT NOT NULL,
  `summary` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_teacher_removals_teacher` (`teacher_id`),
  KEY `idx_teacher_removals_open` (`restored_at`, `purged_at`, `restore_until`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
