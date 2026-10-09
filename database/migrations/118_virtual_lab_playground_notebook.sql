-- Playground Notebook: results from the Apparatus Playground (free practice, no attempt).
-- One row per recorded result, per user (student or teacher). Safe to re-run.
CREATE TABLE IF NOT EXISTS `virtual_lab_playground_notebook` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `object_type` varchar(50) DEFAULT NULL,
  `action` varchar(30) NOT NULL,
  `summary` varchar(500) NOT NULL,
  `readings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`readings`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_playground_notebook_user` (`user_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
