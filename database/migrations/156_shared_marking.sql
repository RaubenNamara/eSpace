-- Conveyor-belt marking: the teacher who set an assessment shares some of its questions with
-- colleagues, and each marks only their questions for every student (Mark by question). The
-- marks add up on each script; the owner then totals and returns the scripts.
-- question_ids: a JSON list of top-level question ids the colleague marks.

CREATE TABLE IF NOT EXISTS `assignment_markers` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `assignment_id` INT UNSIGNED NOT NULL,
    `teacher_id` INT UNSIGNED NOT NULL,
    `question_ids` TEXT NOT NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uniq_assignment_marker` (`assignment_id`, `teacher_id`),
    KEY `idx_marker_teacher` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
