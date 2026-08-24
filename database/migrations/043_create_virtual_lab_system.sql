-- Virtual Lab module. Reuses students/teachers/subjects/classes/terms/academic_years rather than
-- duplicating them (see backend/app/Services/VirtualLabService.php). Two subjects the live dataset
-- was missing (Chemistry, Biology - only ICT/MTC/GEOG/PHY existed) are added here since the
-- module's own brief names them as example categories and a teacher can't "select subject" for one
-- that doesn't exist yet; this is populating the existing subjects table the brief says to reuse,
-- not inventing a parallel one.

INSERT INTO `departments` (`name`, `created_at`, `updated_at`)
SELECT 'SCIENCES', NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM `departments` WHERE `name` = 'SCIENCES');

INSERT INTO `subjects` (`name`, `code`, `department_id`, `created_at`, `updated_at`)
SELECT 'CHEM', 'CHEM', (SELECT id FROM `departments` WHERE `name` = 'SCIENCES' LIMIT 1), NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM `subjects` WHERE `name` = 'CHEM');

INSERT INTO `subjects` (`name`, `code`, `department_id`, `created_at`, `updated_at`)
SELECT 'BIO', 'BIO', (SELECT id FROM `departments` WHERE `name` = 'SCIENCES' LIMIT 1), NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM `subjects` WHERE `name` = 'BIO');

-- Reusable catalog of 3D lab equipment - what Admin -> Virtual Lab -> Objects manages, and what
-- the teacher experiment builder picks apart. `object_type` is a plain string, not an ENUM, so new
-- equipment types can be added by inserting a row (admin-configurable, not a schema change) -
-- `supported_actions` is what the front-end 3D engine reads to decide which of
-- move/rotate/connect/pour/heat/measure/switch_on/switch_off/zoom/inspect to offer for that object.
CREATE TABLE IF NOT EXISTS `virtual_lab_objects` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `object_type` VARCHAR(50) NOT NULL,
    `display_name` VARCHAR(100) NOT NULL,
    `category` ENUM('physics','chemistry','biology','general') NOT NULL DEFAULT 'general',
    `description` TEXT NULL,
    `default_props` JSON NULL,
    `supported_actions` JSON NOT NULL,
    `icon` VARCHAR(10) NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_object_type` (`object_type`),
    KEY `idx_lab_objects_category` (`category`),
    KEY `idx_lab_objects_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- An experiment definition. `scene_objects` is the 3D layout (array of {key, object_type,
-- position, props}) - kept as JSON rather than a join table because it's always read/written whole
-- alongside the experiment and never queried by SQL on individual object fields.
-- `is_template` = 1 marks the system-seeded starting points teachers can copy rather than building
-- an experiment from a blank scene (the brief's "reusable experiment templates").
CREATE TABLE IF NOT EXISTS `virtual_lab_experiments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `subject_id` INT UNSIGNED NULL,
    `topic` VARCHAR(150) NULL,
    `category` ENUM('physics','chemistry','biology','agriculture') NOT NULL,
    `created_by` INT UNSIGNED NULL,
    `objective` TEXT NULL,
    `introduction` TEXT NULL,
    `apparatus` TEXT NULL,
    `materials` TEXT NULL,
    `safety_precautions` TEXT NULL,
    `scene_objects` JSON NOT NULL,
    `conclusion_prompt` VARCHAR(255) NULL,
    `marks` DECIMAL(5,2) NOT NULL DEFAULT 20.00,
    `is_template` TINYINT(1) NOT NULL DEFAULT 0,
    `status` ENUM('draft','published','disabled') NOT NULL DEFAULT 'draft',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_lab_experiments_subject` (`subject_id`),
    KEY `idx_lab_experiments_creator` (`created_by`),
    KEY `idx_lab_experiments_status` (`status`),
    KEY `idx_lab_experiments_category` (`category`),
    KEY `idx_lab_experiments_deleted` (`deleted_at`),
    CONSTRAINT `fk_lab_experiments_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_lab_experiments_teacher` FOREIGN KEY (`created_by`) REFERENCES `teachers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `virtual_lab_steps` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `experiment_id` INT UNSIGNED NOT NULL,
    `step_number` INT UNSIGNED NOT NULL,
    `instruction` TEXT NOT NULL,
    `target_object_key` VARCHAR(50) NULL,
    `required_action` ENUM('move','rotate','connect','pour','heat','measure','switch_on','switch_off','zoom','inspect','acknowledge') NOT NULL,
    `expected_value` VARCHAR(100) NULL,
    `hint` TEXT NULL,
    `feedback_correct` TEXT NULL,
    `feedback_incorrect` TEXT NULL,
    `is_safety_check` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_experiment_step` (`experiment_id`, `step_number`),
    CONSTRAINT `fk_lab_steps_experiment` FOREIGN KEY (`experiment_id`) REFERENCES `virtual_lab_experiments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `virtual_lab_questions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `experiment_id` INT UNSIGNED NOT NULL,
    `question_number` INT UNSIGNED NOT NULL,
    `question_text` TEXT NOT NULL,
    `question_type` ENUM('short_answer','calculation','observation') NOT NULL DEFAULT 'short_answer',
    `expected_answer` TEXT NULL,
    `marks` DECIMAL(5,2) NOT NULL DEFAULT 1.00,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_experiment_question` (`experiment_id`, `question_number`),
    CONSTRAINT `fk_lab_questions_experiment` FOREIGN KEY (`experiment_id`) REFERENCES `virtual_lab_experiments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Publishing an experiment to a class/term - one row per (experiment, class, term), mirroring how
-- `assignments` publishes to a single class rather than an arbitrary student list.
CREATE TABLE IF NOT EXISTS `virtual_lab_assignments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `experiment_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `subject_id` INT UNSIGNED NULL,
    `teacher_id` INT UNSIGNED NOT NULL,
    `term_id` INT UNSIGNED NOT NULL,
    `academic_year` VARCHAR(20) NULL,
    `due_date` DATETIME NULL,
    `marks` DECIMAL(5,2) NOT NULL,
    `status` ENUM('active','closed') NOT NULL DEFAULT 'active',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_lab_assignment` (`experiment_id`, `class_id`, `term_id`),
    KEY `idx_lab_assignments_class` (`class_id`),
    KEY `idx_lab_assignments_teacher` (`teacher_id`),
    KEY `idx_lab_assignments_term` (`term_id`),
    KEY `idx_lab_assignments_deleted` (`deleted_at`),
    CONSTRAINT `fk_lab_assignments_experiment` FOREIGN KEY (`experiment_id`) REFERENCES `virtual_lab_experiments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_assignments_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_assignments_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_assignments_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- One row per student per published experiment - the live, mutable tracking record while a
-- student is working (or has worked) through it.
CREATE TABLE IF NOT EXISTS `virtual_lab_attempts` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `assignment_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `status` ENUM('in_progress','submitted','graded') NOT NULL DEFAULT 'in_progress',
    `started_at` TIMESTAMP NULL,
    `submitted_at` TIMESTAMP NULL,
    `time_spent_seconds` INT UNSIGNED NOT NULL DEFAULT 0,
    `current_step` INT UNSIGNED NOT NULL DEFAULT 1,
    `steps_completed` INT UNSIGNED NOT NULL DEFAULT 0,
    `correct_actions` INT UNSIGNED NOT NULL DEFAULT 0,
    `wrong_actions` INT UNSIGNED NOT NULL DEFAULT 0,
    `conclusion_text` TEXT NULL,
    `score` DECIMAL(5,2) NULL,
    `teacher_feedback` TEXT NULL,
    `graded_by` INT UNSIGNED NULL,
    `graded_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_lab_attempt` (`assignment_id`, `student_id`),
    KEY `idx_lab_attempts_student` (`student_id`),
    KEY `idx_lab_attempts_status` (`status`),
    CONSTRAINT `fk_lab_attempts_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `virtual_lab_assignments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_attempts_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_attempts_grader` FOREIGN KEY (`graded_by`) REFERENCES `teachers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Fine-grained automatic tracking of every action the student performs in the 3D scene - what lets
-- the teacher see "mistakes made during the experiment", not just the final outcome.
CREATE TABLE IF NOT EXISTS `virtual_lab_action_log` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `attempt_id` INT UNSIGNED NOT NULL,
    `step_id` INT UNSIGNED NULL,
    `object_key` VARCHAR(50) NULL,
    `action` VARCHAR(30) NOT NULL,
    `value` VARCHAR(100) NULL,
    `is_correct` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_lab_action_log_attempt` (`attempt_id`),
    CONSTRAINT `fk_lab_action_log_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `virtual_lab_attempts` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_action_log_step` FOREIGN KEY (`step_id`) REFERENCES `virtual_lab_steps` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `virtual_lab_observations` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `attempt_id` INT UNSIGNED NOT NULL,
    `step_id` INT UNSIGNED NULL,
    `observation_text` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_lab_observations_attempt` (`attempt_id`),
    CONSTRAINT `fk_lab_observations_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `virtual_lab_attempts` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_observations_step` FOREIGN KEY (`step_id`) REFERENCES `virtual_lab_steps` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `virtual_lab_answers` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `attempt_id` INT UNSIGNED NOT NULL,
    `question_id` INT UNSIGNED NOT NULL,
    `answer_text` TEXT NULL,
    `is_correct` TINYINT(1) NULL,
    `marks_awarded` DECIMAL(5,2) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_lab_answer` (`attempt_id`, `question_id`),
    CONSTRAINT `fk_lab_answers_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `virtual_lab_attempts` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_answers_question` FOREIGN KEY (`question_id`) REFERENCES `virtual_lab_questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Finalized, report-facing snapshot - written once a teacher grades an attempt, so
-- ReportCardService/RewardService always read a stable, graded-only surface instead of joining
-- through the mutable attempts/action-log tracking detail.
CREATE TABLE IF NOT EXISTS `virtual_lab_results` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `attempt_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `subject_id` INT UNSIGNED NULL,
    `class_id` INT UNSIGNED NULL,
    `term_id` INT UNSIGNED NOT NULL,
    `academic_year` VARCHAR(20) NULL,
    `experiment_title` VARCHAR(200) NOT NULL,
    `category` ENUM('physics','chemistry','biology','agriculture') NOT NULL,
    `score` DECIMAL(5,2) NOT NULL,
    `max_marks` DECIMAL(5,2) NOT NULL,
    `percentage` DECIMAL(5,2) NOT NULL,
    `teacher_comment` TEXT NULL,
    `completed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_lab_result_attempt` (`attempt_id`),
    KEY `idx_lab_results_student` (`student_id`),
    KEY `idx_lab_results_term` (`term_id`),
    CONSTRAINT `fk_lab_results_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `virtual_lab_attempts` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_results_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_results_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------------------------
-- Rewards & Badges integration - extend the existing reward_rules engine (migration 041) rather
-- than building a parallel one. `subject_id` lets a rule pin to one specific named subject (e.g.
-- "Physics Master" only fires for the Physics subject); NULL keeps existing rules' behaviour
-- unchanged. Three new metrics let RewardService read Virtual Lab performance the same way it
-- already reads assignment performance.
-- ---------------------------------------------------------------------------------------------
ALTER TABLE `reward_rules`
    ADD COLUMN `subject_id` INT UNSIGNED NULL AFTER `scope`,
    MODIFY COLUMN `metric` ENUM('overall_average','subject_average','login_count','assignments_completed','improvement_delta','lab_average','lab_subject_average','lab_experiments_completed') NOT NULL;

ALTER TABLE `reward_rules`
    ADD CONSTRAINT `fk_reward_rules_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL;

-- ---------------------------------------------------------------------------------------------
-- Seed data: the reusable 3D object catalog (Admin -> Virtual Lab -> Objects manages these).
-- ---------------------------------------------------------------------------------------------
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('beaker', 'Beaker', 'chemistry', 'A glass container for holding, mixing and heating liquids.', '{"color": "#a9d6e5", "capacity_ml": 250}', '["move","rotate","pour","heat","zoom","inspect"]', '🧪'),
('test_tube', 'Test Tube', 'chemistry', 'A slim glass tube used for small-scale reactions.', '{"color": "#cfe8f3", "capacity_ml": 20}', '["move","rotate","pour","heat","zoom","inspect"]', '🧫'),
('burette', 'Burette', 'chemistry', 'A graduated tube with a tap, used to dispense precise liquid volumes during titration.', '{"color": "#7dd3fc", "capacity_ml": 50}', '["move","rotate","pour","measure","zoom","inspect"]', '💧'),
('pipette', 'Pipette', 'chemistry', 'A narrow tube used to transfer a precise, small volume of liquid.', '{"color": "#7dd3fc", "capacity_ml": 25}', '["move","rotate","pour","measure","zoom","inspect"]', '💉'),
('measuring_cylinder', 'Measuring Cylinder', 'chemistry', 'A tall graduated cylinder for measuring liquid volumes.', '{"color": "#cfe8f3", "capacity_ml": 100}', '["move","rotate","pour","measure","zoom","inspect"]', '📏'),
('bunsen_burner', 'Bunsen Burner', 'chemistry', 'A gas burner used to heat substances in the lab.', '{"flame": "off"}', '["move","rotate","heat","switch_on","switch_off","zoom","inspect"]', '🔥'),
('thermometer', 'Thermometer', 'general', 'Measures the temperature of a substance.', '{"unit": "C"}', '["move","rotate","measure","zoom","inspect"]', '🌡️'),
('battery', 'Battery', 'physics', 'A DC power source for a circuit.', '{"voltage": 6}', '["move","rotate","connect","switch_on","switch_off","zoom","inspect"]', '🔋'),
('bulb', 'Light Bulb', 'physics', 'Lights up when current flows through it - useful for showing a circuit is complete.', '{"rating_v": 6}', '["move","rotate","connect","zoom","inspect"]', '💡'),
('wire', 'Wire', 'physics', 'A conducting wire used to connect circuit components.', '{}', '["move","connect","zoom","inspect"]', '➰'),
('switch', 'Switch', 'physics', 'Opens or closes a circuit.', '{"state": "open"}', '["move","rotate","connect","switch_on","switch_off","zoom","inspect"]', '🔘'),
('resistor', 'Resistor', 'physics', 'Resists current flow in a circuit, given a resistance in ohms.', '{"resistance_ohm": 10}', '["move","rotate","connect","zoom","inspect"]', '⚡'),
('ammeter', 'Ammeter', 'physics', 'Measures current flowing through a circuit, connected in series.', '{"unit": "A"}', '["move","rotate","connect","measure","zoom","inspect"]', '📟'),
('voltmeter', 'Voltmeter', 'physics', 'Measures voltage across a component, connected in parallel.', '{"unit": "V"}', '["move","rotate","connect","measure","zoom","inspect"]', '📟'),
('microscope', 'Microscope', 'biology', 'Magnifies small specimens for observation.', '{"magnification": "40x"}', '["move","rotate","zoom","inspect"]', '🔬'),
('lens', 'Lens', 'physics', 'A curved glass lens used to refract light.', '{"type": "convex"}', '["move","rotate","zoom","inspect"]', '🔍'),
('mirror', 'Mirror', 'physics', 'A reflective surface used to demonstrate reflection of light.', '{"type": "plane"}', '["move","rotate","zoom","inspect"]', '🪞'),
('biological_model', 'Biological Specimen', 'biology', 'A specimen, slide or anatomical model for observation.', '{"specimen": "generic"}', '["move","rotate","zoom","inspect"]', '🧬'),
('ruler', 'Ruler', 'general', 'A 30cm ruler used to measure the length or size of an object.', '{}', '["move","rotate","measure","zoom","inspect"]', '📏'),
('water_container', 'Water Container', 'chemistry', 'A jug of water used as a source when measuring or diluting liquids.', '{"color": "#a5d8ff", "capacity_ml": 1000}', '["move","rotate","pour","zoom","inspect"]', '🫙'),
('specimen', 'Specimen / Object', 'general', 'A generic object (rod, block, sample) with a real measurable length for ruler practicals.', '{"length_cm": 12}', '["move","rotate","zoom","inspect"]', '📐');

-- ---------------------------------------------------------------------------------------------
-- Seed data: three complete example experiments (one per practical category using an existing
-- real subject - Chemistry/Biology now exist via the inserts above), proving the engine end to
-- end. `is_template = 1` so teachers can copy them as a starting point per the brief's "reusable
-- experiment templates" requirement.
-- ---------------------------------------------------------------------------------------------

-- Physics: Ohm's Law
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Ohm''s Law', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Electricity and Circuits', 'physics', NULL,
    'To investigate the relationship between voltage, current and resistance in a simple circuit.',
    'Ohm''s Law states that the current through a conductor is directly proportional to the voltage across it, provided temperature stays constant. In this practical you will build a simple series circuit and use it to verify this relationship.',
    'Battery, switch, resistor, ammeter, voltmeter, connecting wires.',
    'None (all apparatus is simulated).',
    'Ensure the circuit is switched off before making or changing any connection.',
    '[{"key":"battery1","object_type":"battery","position":{"x":-3,"y":0,"z":0}},{"key":"switch1","object_type":"switch","position":{"x":-1.5,"y":0,"z":0}},{"key":"resistor1","object_type":"resistor","position":{"x":0,"y":0,"z":0}},{"key":"ammeter1","object_type":"ammeter","position":{"x":1.6,"y":0,"z":0.9}},{"key":"voltmeter1","object_type":"voltmeter","position":{"x":1.6,"y":0,"z":-0.9}}]',
    'Based on your measurements, what can you conclude about the relationship between voltage and current?',
    20.00, 1, 'published'
);

SET @ohms_law_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Ohm''s Law' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@ohms_law_id, 1, 'Inspect the battery to check its voltage rating before wiring the circuit.', 'battery1', 'inspect', NULL, 'Good - this battery is rated at 6V.', 'Click on the battery to inspect it first.', 0),
(@ohms_law_id, 2, 'Connect a wire from the battery to the switch.', 'switch1', 'connect', 'battery1', 'Battery connected to the switch.', 'Select the battery first, then connect it to the switch.', 0),
(@ohms_law_id, 3, 'Connect the switch to the resistor.', 'resistor1', 'connect', 'switch1', 'Switch connected to the resistor.', 'Select the switch first, then connect it to the resistor.', 0),
(@ohms_law_id, 4, 'Connect the resistor to the ammeter to complete the measuring branch.', 'ammeter1', 'connect', 'resistor1', 'Resistor connected to the ammeter.', 'Select the resistor first, then connect it to the ammeter.', 0),
(@ohms_law_id, 5, 'Connect the ammeter back to the battery to complete the circuit loop.', 'battery1', 'connect', 'ammeter1', 'Circuit loop complete.', 'Select the ammeter first, then connect it back to the battery.', 0),
(@ohms_law_id, 6, 'Connect the voltmeter in parallel across the resistor.', 'voltmeter1', 'connect', 'resistor1', 'Voltmeter connected across the resistor.', 'Select the resistor first, then connect it to the voltmeter.', 0),
(@ohms_law_id, 7, 'Switch on the circuit.', 'switch1', 'switch_on', NULL, 'The bulb of current begins to flow - circuit is live.', 'Click the switch to turn the circuit on.', 0),
(@ohms_law_id, 8, 'Measure the current flowing through the circuit using the ammeter.', 'ammeter1', 'measure', NULL, 'Reading recorded from the ammeter.', 'Select the ammeter and use Measure.', 0),
(@ohms_law_id, 9, 'Measure the voltage across the resistor using the voltmeter.', 'voltmeter1', 'measure', NULL, 'Reading recorded from the voltmeter.', 'Select the voltmeter and use Measure.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@ohms_law_id, 1, 'Using your measured voltage and current, calculate the resistance (R = V / I). Show your working.', 'calculation', 5.00),
(@ohms_law_id, 2, 'State Ohm''s Law in your own words.', 'short_answer', 5.00);

-- Chemistry: Acid-Base Titration
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Acid-Base Titration', (SELECT id FROM subjects WHERE name = 'CHEM' LIMIT 1), 'Acids, Bases and Salts', 'chemistry', NULL,
    'To determine the concentration of a sodium hydroxide solution by titrating it against a hydrochloric acid solution of known concentration.',
    'Titration is used to find the concentration of an unknown solution by reacting it with a solution of known concentration until the reaction is exactly complete, shown by an indicator colour change.',
    'Burette, conical flask, pipette, retort stand, indicator.',
    'Dilute hydrochloric acid (0.1M), sodium hydroxide solution, phenolphthalein indicator.',
    'Wear safety goggles at all times. Handle acids and bases with care and avoid skin contact.',
    '[{"key":"burette1","object_type":"burette","position":{"x":-1,"y":0,"z":0},"props":{"liquid":"HCl (0.1M)","color":"#7dd3fc"}},{"key":"flask1","object_type":"beaker","position":{"x":-1,"y":0,"z":1.4},"props":{"liquid":"NaOH + phenolphthalein","color":"#f9a8d4"}},{"key":"pipette1","object_type":"pipette","position":{"x":1.4,"y":0,"z":0.6}}]',
    'What does the colour change at the endpoint tell you about the reaction?',
    20.00, 1, 'published'
);

SET @titration_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Acid-Base Titration' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@titration_id, 1, 'Put on safety goggles before handling acids and bases.', NULL, 'acknowledge', NULL, 'Safety first - goggles on.', 'Acknowledge the safety warning to continue.', 1),
(@titration_id, 2, 'Inspect the burette to confirm it is filled with dilute hydrochloric acid.', 'burette1', 'inspect', NULL, 'Confirmed: 0.1M HCl.', 'Click on the burette to inspect it.', 0),
(@titration_id, 3, 'Use the pipette to measure 25ml of sodium hydroxide solution.', 'pipette1', 'measure', '25', 'Pipette filled to 25ml.', 'Select the pipette and measure out 25ml.', 0),
(@titration_id, 4, 'Pour the measured sodium hydroxide into the conical flask.', 'flask1', 'pour', 'pipette1', 'Sodium hydroxide added to the flask.', 'Select the pipette first, then pour into the flask.', 0),
(@titration_id, 5, 'Slowly pour acid from the burette into the flask until the indicator changes colour.', 'flask1', 'pour', 'burette1', 'The solution turns colourless at the endpoint - that''s your signal to stop.', 'Select the burette first, then pour into the flask.', 0),
(@titration_id, 6, 'Measure the final volume of acid used from the burette.', 'burette1', 'measure', NULL, 'Reading recorded from the burette.', 'Select the burette and use Measure.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@titration_id, 1, 'Record the volume of acid used to reach the endpoint.', 'observation', 3.00),
(@titration_id, 2, 'Using your titration results, calculate the concentration of the sodium hydroxide solution.', 'calculation', 7.00);

-- Biology: Cell Observation Under the Microscope
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Cell Observation Under the Microscope', (SELECT id FROM subjects WHERE name = 'BIO' LIMIT 1), 'Cell Biology', 'biology', NULL,
    'To observe and identify the main structures of a plant cell using a microscope.',
    'The microscope allows us to see structures too small for the naked eye. In this practical you will prepare a slide, focus the microscope and observe the visible parts of a plant cell.',
    'Microscope, prepared specimen slide.',
    'Onion cell slide.',
    'Handle the microscope and slide with care.',
    '[{"key":"microscope1","object_type":"microscope","position":{"x":0,"y":0,"z":0}},{"key":"slide1","object_type":"biological_model","position":{"x":1.6,"y":0,"z":0.6},"props":{"specimen":"Onion cell slide"}}]',
    'What did observing the cell under the microscope teach you about its structure?',
    15.00, 1, 'published'
);

SET @microscope_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Cell Observation Under the Microscope' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@microscope_id, 1, 'Inspect the microscope and identify its main parts before use.', 'microscope1', 'inspect', NULL, 'Eyepiece, objective lens and stage identified.', 'Click on the microscope to inspect it.', 0),
(@microscope_id, 2, 'Place the specimen slide onto the microscope stage.', 'slide1', 'move', 'microscope1', 'Slide placed on the stage.', 'Drag the slide onto the microscope.', 0),
(@microscope_id, 3, 'Adjust the focus and zoom in on the specimen.', 'microscope1', 'zoom', NULL, 'The specimen comes into sharp focus.', 'Select the microscope and use Zoom.', 0),
(@microscope_id, 4, 'Observe the cell structure visible under the microscope.', 'slide1', 'inspect', NULL, 'You can make out the cell wall, nucleus and cytoplasm.', 'Click on the slide to observe it under the microscope.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@microscope_id, 1, 'Sketch and label the parts of the cell you observed.', 'observation', 4.00),
(@microscope_id, 2, 'Explain the function of the cell wall.', 'short_answer', 3.00);

-- ---------------------------------------------------------------------------------------------
-- Seed data: new reward rules for Virtual Lab badges, using the reward_rules engine unchanged.
-- ---------------------------------------------------------------------------------------------
INSERT INTO `reward_rules` (`badge_type`, `award_title`, `category`, `metric`, `scope`, `subject_id`, `min_value`, `max_value`, `icon`, `description`) VALUES
('special', 'Lab Excellence', 'academic', 'lab_average', 'individual', NULL, 85.00, NULL, '🥇', 'Virtual Lab practical average of 85% and above this term'),
('special', 'Science Explorer', 'engagement', 'lab_experiments_completed', 'individual', NULL, 3.00, NULL, '🔬', 'Completed at least 3 Virtual Lab experiments this term'),
('special', 'Physics Master', 'subject', 'lab_subject_average', 'individual', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 85.00, NULL, '⚡', 'Physics Virtual Lab average of 85% and above this term'),
('special', 'Chemistry Champion', 'subject', 'lab_subject_average', 'individual', (SELECT id FROM subjects WHERE name = 'CHEM' LIMIT 1), 85.00, NULL, '🧪', 'Chemistry Virtual Lab average of 85% and above this term'),
('special', 'Biology Explorer', 'subject', 'lab_subject_average', 'individual', (SELECT id FROM subjects WHERE name = 'BIO' LIMIT 1), 85.00, NULL, '🧬', 'Biology Virtual Lab average of 85% and above this term');
