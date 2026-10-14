-- ICT Lab: hands-on computer activities (parts of a computer, RJ45 termination, ...), each run step
-- by step at a Simple, Intermediate or Advanced level. The activities themselves live in the app's
-- code; the database keeps what teachers link to them and how students did.

-- A teacher linking a step of an activity to one of their eNotes (a topic, optionally one page),
-- so a student on that step can open "Read about this". One link per teacher per step.
CREATE TABLE IF NOT EXISTS `ict_lab_step_links` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `teacher_id` INT UNSIGNED NOT NULL,
    `activity_key` VARCHAR(60) NOT NULL,
    `step_key` VARCHAR(60) NOT NULL,
    `enote_topic_id` INT UNSIGNED NOT NULL,
    `enote_page_id` INT UNSIGNED NULL DEFAULT NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_ict_link_teacher_step` (`teacher_id`, `activity_key`, `step_key`),
    KEY `idx_ict_link_activity` (`activity_key`, `step_key`),
    KEY `idx_ict_link_topic` (`enote_topic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Each time a student finishes an activity: the level, how many mistakes and hints, the time
-- taken and the score.
CREATE TABLE IF NOT EXISTS `ict_lab_attempts` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `activity_key` VARCHAR(60) NOT NULL,
    `level` ENUM('simple', 'intermediate', 'advanced') NOT NULL,
    `steps_total` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `mistakes` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `hints_used` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `duration_seconds` INT UNSIGNED NOT NULL DEFAULT 0,
    `score` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `completed_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_ict_attempt_student` (`student_id`, `activity_key`, `level`),
    KEY `idx_ict_attempt_activity` (`activity_key`, `completed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
