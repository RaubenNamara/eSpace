-- Support groups (re-teaching): from the Class Learning Map a teacher gathers the students who
-- haven't achieved a learning outcome or topic competency yet, and sends them to revise it - the
-- notes page it's taught on, else practice - with an optional note and remedial session.
-- item_text / topic_text identify the outcome or competency across streams (every stream has its
-- own copy of the curriculum); item_ids are those copies' ids, for the group's progress.

CREATE TABLE IF NOT EXISTS `support_groups` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_id` INT UNSIGNED NOT NULL,
  `subject_id` INT UNSIGNED NOT NULL,
  `kind` ENUM('outcome','competency') NOT NULL,
  `item_ids` TEXT NOT NULL,
  `item_text` TEXT NOT NULL,
  `topic_text` VARCHAR(255) NOT NULL,
  `note` TEXT NULL,
  `meet_at` DATETIME NULL,
  `meet_place` VARCHAR(120) NULL,
  `status` ENUM('open','closed') NOT NULL DEFAULT 'open',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `closed_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  KEY `idx_support_groups_teacher` (`teacher_id`, `subject_id`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `support_group_members` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group_id` INT UNSIGNED NOT NULL,
  `student_id` INT UNSIGNED NOT NULL,
  `start_percentage` DECIMAL(5,2) NULL,
  `revised_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_support_group_member` (`group_id`, `student_id`),
  KEY `idx_support_group_members_student` (`student_id`),
  CONSTRAINT `fk_support_group_members_group` FOREIGN KEY (`group_id`) REFERENCES `support_groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
