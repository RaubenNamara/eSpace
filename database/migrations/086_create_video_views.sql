-- Migration: Create video_views
-- Description: Per-student watch tracking for videos, the one content module with no engagement
-- table at all (eNotes/library/item-bank already have dead-but-existing progress tables; live
-- classes already track attendance). A video counts as "watched" once percentage_watched crosses
-- 90 - see Student\VideoController's watch-progress endpoint, which only ever moves this forward.

CREATE TABLE `video_views` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `video_id` INT UNSIGNED NOT NULL,
  `student_id` INT UNSIGNED NOT NULL,
  `percentage_watched` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `watched_seconds` INT UNSIGNED NOT NULL DEFAULT 0,
  `first_watched_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_watched_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_video_student` (`video_id`, `student_id`),
  KEY `idx_student_id` (`student_id`),
  CONSTRAINT `fk_video_views_video` FOREIGN KEY (`video_id`)
    REFERENCES `videos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
