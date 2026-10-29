-- SMIS student sync (super admin toggle on Admin > Students).
-- smis_sync_runs: one row per run - who started it, how it went, and what it changed.
-- student_sync_suspensions: students the sync suspended because they left SMIS, with the
-- enrolments it withdrew, so they are restored exactly if the student shows up in SMIS again.
-- (The app also creates these tables itself if they are missing.)

CREATE TABLE IF NOT EXISTS `smis_sync_runs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `started_by` INT UNSIGNED DEFAULT NULL,
  `started_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `finished_at` TIMESTAMP NULL DEFAULT NULL,
  `status` ENUM('running','success','failed') NOT NULL DEFAULT 'running',
  `fetched` INT UNSIGNED NOT NULL DEFAULT 0,
  `created` INT UNSIGNED NOT NULL DEFAULT 0,
  `enrolled` INT UNSIGNED NOT NULL DEFAULT 0,
  `moved` INT UNSIGNED NOT NULL DEFAULT 0,
  `suspended` INT UNSIGNED NOT NULL DEFAULT 0,
  `reactivated` INT UNSIGNED NOT NULL DEFAULT 0,
  `message` VARCHAR(1000) DEFAULT NULL,
  `details` LONGTEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_smis_sync_runs_status` (`status`, `started_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `student_sync_suspensions` (
  `student_id` INT UNSIGNED NOT NULL,
  `run_id` INT UNSIGNED DEFAULT NULL,
  `suspended_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enrollment_ids` TEXT DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
