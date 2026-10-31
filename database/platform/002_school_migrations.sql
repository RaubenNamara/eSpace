-- Platform database: which database updates (database/migrations/*.sql) each school has had, so
-- the developer portal's Updates can run what is missing on every school, one by one.
--   applied  - run by the portal
--   baseline - already in the school's database before the portal kept count (St Mark's, whose
--              updates were run by hand; a new school, whose tables were copied from St Mark's)
--   failed   - the last try stopped with an error (`message`); it is tried again next time
-- Run in the platform database (PLATFORM_DB_NAME). Safe to run again.
CREATE TABLE IF NOT EXISTS `school_migrations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` INT UNSIGNED NOT NULL,
  `migration` VARCHAR(190) NOT NULL,
  `status` ENUM('applied','baseline','failed') NOT NULL,
  `message` VARCHAR(1000) DEFAULT NULL,
  `ran_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_school_migration` (`school_id`, `migration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
