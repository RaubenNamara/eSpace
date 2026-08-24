-- Lets a teacher tie a question to a specific point in the practical (before it starts, after a
-- named step, or after all steps as today) and mark it required/optional/notebook-only, instead of
-- every question only ever appearing in the end-of-experiment Practical Notebook. Defaults
-- reproduce today's behaviour exactly for all existing questions - fully backward compatible.
ALTER TABLE `virtual_lab_questions`
  ADD COLUMN `stage` ENUM('before_experiment', 'after_step', 'after_measurement', 'after_experiment') NOT NULL DEFAULT 'after_experiment' AFTER `question_type`,
  ADD COLUMN `stage_step_number` SMALLINT UNSIGNED NULL AFTER `stage`,
  ADD COLUMN `requirement` ENUM('required', 'optional', 'notebook_only') NOT NULL DEFAULT 'notebook_only' AFTER `stage_step_number`,
  ADD COLUMN `linked_to_graph` TINYINT(1) NOT NULL DEFAULT 0 AFTER `requirement`;
