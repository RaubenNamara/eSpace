-- Per-experiment graph configuration (title, which two Results Table columns to plot, labels,
-- chart type, whether the learner may change axes, minimum points required, best-fit line toggle).
-- One-to-one with virtual_lab_experiments - both templates and teacher drafts can have their own.
CREATE TABLE IF NOT EXISTS `virtual_lab_graph_configs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `experiment_id` INT UNSIGNED NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 0,
  `title` VARCHAR(200) NULL,
  `x_column` VARCHAR(60) NULL,
  `y_column` VARCHAR(60) NULL,
  `x_label` VARCHAR(100) NULL,
  `y_label` VARCHAR(100) NULL,
  `graph_type` ENUM('scatter', 'line') NOT NULL DEFAULT 'scatter',
  `allow_axis_change` TINYINT(1) NOT NULL DEFAULT 1,
  `min_points` SMALLINT UNSIGNED NOT NULL DEFAULT 2,
  `show_best_fit` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_graph_config_experiment` (`experiment_id`),
  CONSTRAINT `fk_graph_config_experiment` FOREIGN KEY (`experiment_id`) REFERENCES `virtual_lab_experiments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
