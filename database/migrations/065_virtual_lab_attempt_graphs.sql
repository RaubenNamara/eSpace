-- Frozen per-attempt snapshot of the graph shown to the student at submission time (title, axes,
-- labels, chart type, point count, and best-fit gradient/intercept/R^2 if enabled). Written once by
-- VirtualLabService::submitAttempt() and never updated again, so a teacher's later edits to the
-- experiment's graph_configs row never change what a historical review shows.
CREATE TABLE IF NOT EXISTS `virtual_lab_attempt_graphs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `attempt_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(200) NULL,
  `x_column` VARCHAR(60) NULL,
  `y_column` VARCHAR(60) NULL,
  `x_label` VARCHAR(100) NULL,
  `y_label` VARCHAR(100) NULL,
  `graph_type` ENUM('scatter', 'line') NULL,
  `point_count` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `gradient` DECIMAL(12, 4) NULL,
  `intercept` DECIMAL(12, 4) NULL,
  `r_squared` DECIMAL(6, 4) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_attempt_graph` (`attempt_id`),
  CONSTRAINT `fk_attempt_graph_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `virtual_lab_attempts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
