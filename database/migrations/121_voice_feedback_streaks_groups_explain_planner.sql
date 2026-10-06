-- 121: voice-note feedback on marked scripts, daily learning streaks, study groups,
-- "explain it back" on eNote pages, and the teacher's weekly planner.

-- A teacher's spoken feedback on a script (an audio file, up to two minutes)
ALTER TABLE `assignment_submissions`
  ADD COLUMN IF NOT EXISTS `voice_feedback_path` VARCHAR(255) NULL AFTER `feedback`,
  ADD COLUMN IF NOT EXISTS `voice_feedback_seconds` SMALLINT UNSIGNED NULL AFTER `voice_feedback_path`;

-- The teacher's weekly planner: a short note per day ("bring the lab keys", "S.2 test")
CREATE TABLE IF NOT EXISTS `planner_notes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_id` INT UNSIGNED NOT NULL,
  `day` DATE NOT NULL,
  `note` VARCHAR(500) NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_planner_note` (`teacher_id`, `day`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Study groups: a few classmates revising together. The conversation itself is a chat group
-- (chat_conversations.type = 'group'), so messages, HOD/admin monitoring and the chat screen all
-- work as they do for any chat; this row adds what the group is working towards.
CREATE TABLE IF NOT EXISTS `study_groups` (
  `conversation_id` INT UNSIGNED NOT NULL,
  `goal` VARCHAR(200) NOT NULL,
  `subject_id` INT UNSIGNED NULL,
  `target_date` DATE NULL,
  `class_id` INT UNSIGNED NULL,
  `created_by` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`conversation_id`),
  KEY `idx_study_groups_class` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- "Explain it back": after a page, a student puts it in one sentence of their own; the teacher
-- reads the class's sentences page by page to spot misunderstandings
CREATE TABLE IF NOT EXISTS `enote_explanations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `topic_id` INT UNSIGNED NOT NULL,
  `page_id` INT UNSIGNED NOT NULL,
  `student_id` INT UNSIGNED NOT NULL,
  `body` VARCHAR(400) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_explanation` (`page_id`, `student_id`),
  KEY `idx_explanations_topic` (`topic_id`),
  CONSTRAINT `fk_explanations_topic` FOREIGN KEY (`topic_id`) REFERENCES `enote_topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
