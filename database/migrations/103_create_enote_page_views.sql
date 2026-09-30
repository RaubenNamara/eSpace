-- Reading analytics for eNotes: how many times each student opened each page, and roughly how long
-- they spent on it. Recorded as the reader saves the student's place (Student\ENoteController
-- saveProgress); read by the teacher's Reading insights (Teacher\ENoteInsightsController) to show
-- the pages students stop on or come back to - often the confusing ones.

CREATE TABLE IF NOT EXISTS `enote_page_views` (
  `page_id` INT UNSIGNED NOT NULL,
  `student_id` INT UNSIGNED NOT NULL,
  `topic_id` INT UNSIGNED NOT NULL,
  `views` INT UNSIGNED NOT NULL DEFAULT 1,
  `seconds` INT UNSIGNED NOT NULL DEFAULT 0,
  `first_viewed_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `last_viewed_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`page_id`, `student_id`),
  KEY `idx_enote_page_views_topic` (`topic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
