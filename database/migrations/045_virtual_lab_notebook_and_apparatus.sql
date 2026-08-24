-- Practical Notebook: an append-only log of what the student explicitly chose to record
-- (measurements, calculations, results-table rows) - distinct from virtual_lab_observations
-- (free-text narrative) and virtual_lab_attempts.conclusion_text (both already exist and are
-- reused as-is, not duplicated here). `extra` carries structured fields for a results-table row
-- (e.g. {"voltage":2,"current":0.4,"resistance":5}) so the notebook can render a real table
-- rather than a flat list for experiments like Ohm's Law.
CREATE TABLE IF NOT EXISTS `virtual_lab_notebook_entries` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `attempt_id` INT UNSIGNED NOT NULL,
    `entry_type` ENUM('measurement', 'calculation', 'result_row') NOT NULL,
    `label` VARCHAR(150) NOT NULL,
    `value` VARCHAR(100) NOT NULL,
    `unit` VARCHAR(20) NULL,
    `extra` JSON NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_notebook_attempt` (`attempt_id`),
    CONSTRAINT `fk_notebook_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `virtual_lab_attempts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- How many times the student asked for a hint on the current attempt - shown to the teacher
-- alongside correct/wrong action counts as another signal of how much difficulty they had.
ALTER TABLE `virtual_lab_attempts`
    ADD COLUMN `hints_used` INT UNSIGNED NOT NULL DEFAULT 0 AFTER `wrong_actions`;

-- Balance and stopwatch - the two new apparatus this slice adds. A measurable object's real mass
-- (mass_g) is what the balance actually reads, the same way length_cm already drives the ruler.
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('balance', 'Balance', 'general', 'A weighing balance - place an object on it to read its real mass.', '{"unit": "g"}', '["move","measure","zoom","inspect"]', '⚖️'),
('stopwatch', 'Stopwatch', 'general', 'A stopwatch for timing real elapsed time during an experiment.', '{}', '["move","zoom","inspect"]', '⏱️');

-- specimen already exists (migration 043) with only length_cm - a density/mass practical also
-- needs a real mass, so give it one without renaming or duplicating the object type.
UPDATE `virtual_lab_objects`
SET `default_props` = JSON_SET(`default_props`, '$.mass_g', 45)
WHERE `object_type` = 'specimen';
