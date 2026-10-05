-- eNote page history: every version of a teacher's page (drafts included), and every page
-- added, copied, moved, deleted or restored - so a teacher can always see when they last
-- edited, what changed, and get back anything that went missing.
--
-- Edits arrive as autosaves every few seconds, so one row is one editing *session*: while the
-- same teacher keeps editing the same page, the latest row is updated with the newest content;
-- after a pause (see ENotePageHistory::SESSION_MINUTES) the next edit starts a new row. Each
-- row therefore holds the page as it stood at the end of that session.
--
-- `revision` on enote_pages is bumped on every content/title save. The builder sends the
-- revision it loaded, and a save from a stale copy (another tab or device) is refused instead
-- of silently overwriting newer work.

CREATE TABLE IF NOT EXISTS `enote_page_history` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `topic_id` INT UNSIGNED NOT NULL,
  `page_id` INT UNSIGNED NULL,
  `teacher_id` INT UNSIGNED NULL,
  `action` ENUM('snapshot','create','edit','duplicate','move','delete','restore') NOT NULL,
  `title` VARCHAR(255) NULL,
  `content` LONGTEXT NULL,
  `word_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `image_count` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `page_number` INT UNSIGNED NULL,
  `detail` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_eph_topic` (`topic_id`, `created_at`),
  KEY `idx_eph_page` (`page_id`, `created_at`),
  CONSTRAINT `fk_eph_topic` FOREIGN KEY (`topic_id`) REFERENCES `enote_topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `enote_pages`
  ADD COLUMN IF NOT EXISTS `revision` INT UNSIGNED NOT NULL DEFAULT 0 AFTER `is_active`;
