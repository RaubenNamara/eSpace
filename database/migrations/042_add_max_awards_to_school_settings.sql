ALTER TABLE school_settings
  ADD COLUMN max_awards_on_report_card TINYINT UNSIGNED NOT NULL DEFAULT 2 AFTER motto;
