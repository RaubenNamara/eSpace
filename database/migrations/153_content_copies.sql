-- 153: Content copied from the master school (multi-school Tusome, see ContentLibrary).
--  When a school is given the shared content - curriculum, eNotes, books, Item Bank, videos - each
--  copied row is remembered here: which master row it came from, and its own id in this school.
--  Copying again skips what is already here, and later master updates know what to update.
--  One master row can have several copies (a curriculum topic copied into each stream).
--  Empty at St Mark's (the master). Safe to run again.
CREATE TABLE IF NOT EXISTS `content_copies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `source_table` VARCHAR(60) NOT NULL,
  `source_id` INT UNSIGNED NOT NULL,
  `local_id` INT UNSIGNED NOT NULL,
  `copied_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_content_copies` (`source_table`, `source_id`, `local_id`),
  KEY `idx_content_copies_local` (`source_table`, `local_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
