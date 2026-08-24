-- Fixes a real regression: pour steps' expected_value was authored as the SOURCE object's key
-- (the old pour semantics), but the engine now emits the amount actually poured as the value
-- (the live pour-amount slider added when real volume tracking was built) - these two steps could
-- never have passed grading since a numeric amount never equals a string like "burette1". Also
-- expands the workflow to match the brief's realistic titration sequence (initial/final burette
-- readings, indicator, endpoint tolerance) and rebuilds the two glassware pieces the student picks
-- up through the apparatus tray rather than starting pre-placed.
UPDATE `virtual_lab_experiments`
SET `scene_objects` = '[{"key":"burette1","object_type":"burette","position":{"x":-1,"y":0,"z":0},"props":{"liquid":"HCl (0.1M)","color":"#7dd3fc","capacity_ml":50},"in_tray":true},{"key":"flask1","object_type":"beaker","position":{"x":-1,"y":0,"z":1.4},"props":{"liquid":"","color":"#f9a8d4","capacity_ml":100,"current_volume":0},"in_tray":true},{"key":"pipette1","object_type":"pipette","position":{"x":1.4,"y":0,"z":0.6},"in_tray":true}]',
    `introduction` = 'Titration is used to find the concentration of an unknown solution by reacting it with a solution of known concentration until the reaction is exactly complete, shown by an indicator colour change. Collect your glassware from the tray before you begin.'
WHERE `title` = 'Acid-Base Titration' AND `is_template` = 1;

SET @titration_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Acid-Base Titration' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @titration_id;

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@titration_id, 1, 'Put on safety goggles before handling acids and bases.', NULL, 'acknowledge', NULL, NULL, NULL, 'Safety first - goggles on.', 'Acknowledge the safety warning to continue.', 1),
(@titration_id, 2, 'Pick up the burette and place it on the bench.', 'burette1', 'move', 'burette1', NULL, 'Click the burette in the apparatus tray to place it.', 'Burette placed on the bench.', 'Pick the burette from the apparatus tray.', 0),
(@titration_id, 3, 'Pick up the conical flask and place it on the bench.', 'flask1', 'move', 'flask1', NULL, 'Click the conical flask in the apparatus tray to place it.', 'Flask placed on the bench.', 'Pick the conical flask from the apparatus tray.', 0),
(@titration_id, 4, 'Pick up the pipette and place it on the bench.', 'pipette1', 'move', 'pipette1', NULL, 'Click the pipette in the apparatus tray to place it.', 'Pipette placed on the bench.', 'Pick the pipette from the apparatus tray.', 0),
(@titration_id, 5, 'Inspect the burette to confirm it is filled with dilute hydrochloric acid.', 'burette1', 'inspect', NULL, NULL, NULL, 'Confirmed: 0.1M HCl.', 'Click on the burette to inspect it.', 0),
(@titration_id, 6, 'Record the initial burette reading.', 'burette1', 'measure', NULL, NULL, 'Select the burette and use Measure.', 'Initial reading recorded.', 'Select the burette and use Measure.', 0),
(@titration_id, 7, 'Use the pipette to measure 25ml of sodium hydroxide solution.', 'pipette1', 'measure', '25', 1, 'Select the pipette and use Measure, then set the reading to 25ml.', 'Pipette filled to 25ml.', 'Select the pipette and measure out 25ml.', 0),
(@titration_id, 8, 'Transfer the measured sodium hydroxide into the conical flask.', 'flask1', 'pour', '25', 2, 'Select the pipette, choose Pour, then click the flask and pour the full amount.', 'Sodium hydroxide transferred into the flask.', 'Select the pipette first, then pour into the flask.', 0),
(@titration_id, 9, 'Add a few drops of phenolphthalein indicator and inspect the flask.', 'flask1', 'inspect', NULL, NULL, 'Click on the flask to inspect it.', 'The solution is now pink in the alkaline flask.', 'Click on the flask to inspect it.', 0),
(@titration_id, 10, 'Slowly open the burette tap and add acid to the flask until the indicator just turns colourless at the endpoint.', 'flask1', 'pour', '24.8', 0.2, 'Add the acid gradually using the pour control - stop as close to 24.8ml as you can.', 'The solution turns colourless at the endpoint - that''s your signal to stop.', 'Select the burette first, then pour into the flask, stopping near the endpoint.', 0),
(@titration_id, 11, 'Record the final burette reading.', 'burette1', 'measure', NULL, NULL, 'Select the burette and use Measure.', 'Final reading recorded.', 'Select the burette and use Measure.', 0);

DELETE FROM `virtual_lab_questions` WHERE `experiment_id` = @titration_id;
INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@titration_id, 1, 'Calculate the titre (initial burette reading minus final burette reading).', 'calculation', 3.00),
(@titration_id, 2, 'Using your titration results, calculate the concentration of the sodium hydroxide solution.', 'calculation', 7.00);

-- Physics: Series Circuit - built entirely from the apparatus tray to demonstrate the new
-- pick-and-place workflow end to end, reusing the exact same battery/switch/resistor/ammeter/
-- voltmeter apparatus and V=IR simulation Ohm's Law already uses.
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Series Circuit', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Electricity and Circuits', 'physics', 'beginner', NULL,
    'To build a simple series circuit from individual apparatus and verify that current is the same at every point in the loop.',
    'A series circuit has only one path for current to flow. In this practical you will collect each piece of apparatus from the tray yourself and build the circuit from scratch, rather than starting with everything already wired.',
    'Battery, switch, resistor, ammeter, voltmeter, connecting wires.',
    'None (all apparatus is simulated).',
    'Ensure the circuit is switched off before making or changing any connection.',
    '[{"key":"battery1","object_type":"battery","position":{"x":-3,"y":0,"z":0},"in_tray":true},{"key":"switch1","object_type":"switch","position":{"x":-1.5,"y":0,"z":0},"in_tray":true},{"key":"resistor1","object_type":"resistor","position":{"x":0,"y":0,"z":0},"in_tray":true},{"key":"ammeter1","object_type":"ammeter","position":{"x":1.6,"y":0,"z":0.9},"in_tray":true},{"key":"voltmeter1","object_type":"voltmeter","position":{"x":1.6,"y":0,"z":-0.9},"in_tray":true}]',
    'Why is there only one path for current in a series circuit, and what happens to the current if you add a second resistor in the same loop?',
    20.00, 1, 'published'
);

SET @series_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Series Circuit' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@series_id, 1, 'Pick up the battery from the apparatus tray and place it on the bench.', 'battery1', 'move', 'battery1', NULL, 'Click the battery in the tray to place it.', 'Battery placed on the bench.', 'Pick the battery from the apparatus tray.', 0),
(@series_id, 2, 'Pick up the switch and place it on the bench.', 'switch1', 'move', 'switch1', NULL, 'Click the switch in the tray to place it.', 'Switch placed on the bench.', 'Pick the switch from the apparatus tray.', 0),
(@series_id, 3, 'Pick up the resistor and place it on the bench.', 'resistor1', 'move', 'resistor1', NULL, 'Click the resistor in the tray to place it.', 'Resistor placed on the bench.', 'Pick the resistor from the apparatus tray.', 0),
(@series_id, 4, 'Pick up the ammeter and place it on the bench.', 'ammeter1', 'move', 'ammeter1', NULL, 'Click the ammeter in the tray to place it.', 'Ammeter placed on the bench.', 'Pick the ammeter from the apparatus tray.', 0),
(@series_id, 5, 'Pick up the voltmeter and place it on the bench.', 'voltmeter1', 'move', 'voltmeter1', NULL, 'Click the voltmeter in the tray to place it.', 'Voltmeter placed on the bench.', 'Pick the voltmeter from the apparatus tray.', 0),
(@series_id, 6, 'Connect a wire from the battery to the switch.', 'switch1', 'connect', 'battery1', NULL, NULL, 'Battery connected to the switch.', 'Select the battery first, then connect it to the switch.', 0),
(@series_id, 7, 'Connect the switch to the resistor.', 'resistor1', 'connect', 'switch1', NULL, NULL, 'Switch connected to the resistor.', 'Select the switch first, then connect it to the resistor.', 0),
(@series_id, 8, 'Connect the resistor to the ammeter to keep it in the same loop.', 'ammeter1', 'connect', 'resistor1', NULL, 'The ammeter must be in series (part of the main loop), not off to the side.', 'Resistor connected to the ammeter.', 'Select the resistor first, then connect it to the ammeter.', 0),
(@series_id, 9, 'Connect the ammeter back to the battery to complete the loop.', 'battery1', 'connect', 'ammeter1', NULL, NULL, 'Circuit loop complete.', 'Select the ammeter first, then connect it back to the battery.', 0),
(@series_id, 10, 'Connect the voltmeter in parallel across the resistor.', 'voltmeter1', 'connect', 'resistor1', NULL, 'The voltmeter reads the voltage across the resistor specifically.', 'Voltmeter connected across the resistor.', 'Select the resistor first, then connect it to the voltmeter.', 0),
(@series_id, 11, 'Close the switch.', 'switch1', 'switch_on', NULL, NULL, NULL, 'Current begins to flow - circuit is live.', 'Click the switch to close the circuit.', 0),
(@series_id, 12, 'Measure the current using the ammeter.', 'ammeter1', 'measure', NULL, NULL, NULL, 'Reading recorded from the ammeter.', 'Select the ammeter and use Measure.', 0),
(@series_id, 13, 'Measure the voltage across the resistor using the voltmeter.', 'voltmeter1', 'measure', NULL, NULL, NULL, 'Reading recorded from the voltmeter.', 'Select the voltmeter and use Measure.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@series_id, 1, 'Calculate the resistance using your measured voltage and current (R = V / I).', 'calculation', 5.00),
(@series_id, 2, 'If a second identical resistor were added in series, what would happen to the total resistance and the current?', 'short_answer', 5.00);

-- Chemistry: Measuring 50ml of Water - the exact worked example from the brief, using the
-- existing water_container/measuring_cylinder pour-and-measure mechanics as-is.
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Measuring 50ml of Water', (SELECT id FROM subjects WHERE name = 'CHEM' LIMIT 1), 'Measurement and Volume', 'chemistry', 'beginner', NULL,
    'To accurately measure a fixed volume of liquid using a measuring cylinder.',
    'Measuring cylinders are graduated so you can read off a liquid''s volume directly. Pour carefully and read the scale at eye level - stopping at exactly the target volume takes practice, so a small tolerance is allowed.',
    'Measuring cylinder, water container.',
    'Water.',
    'None.',
    '[{"key":"container1","object_type":"water_container","position":{"x":-1,"y":0,"z":0}},{"key":"cylinder1","object_type":"measuring_cylinder","position":{"x":1,"y":0,"z":0},"props":{"current_volume":0}}]',
    'How close did you get to exactly 50ml, and what would you do differently to be more precise next time?',
    10.00, 1, 'published'
);

SET @water_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Measuring 50ml of Water' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@water_id, 1, 'Inspect the measuring cylinder before you begin.', 'cylinder1', 'inspect', NULL, NULL, NULL, 'An empty graduated measuring cylinder.', 'Click on the measuring cylinder to inspect it.', 0),
(@water_id, 2, 'Pour water from the container into the measuring cylinder. Stop at approximately 50ml.', 'cylinder1', 'pour', '50', 2, 'Select the water container, choose Pour, click the cylinder, then drag the amount slider close to 50ml before stopping.', 'Poured close to the target volume.', 'Select the water container first, then pour into the measuring cylinder.', 0),
(@water_id, 3, 'Read the measurement scale on the measuring cylinder.', 'cylinder1', 'measure', NULL, NULL, 'Select the cylinder and use Measure to read the real level.', 'Reading recorded from the measuring cylinder.', 'Select the measuring cylinder and use Measure.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@water_id, 1, 'What was your measured volume, and how far off from 50ml was it?', 'observation', 4.00),
(@water_id, 2, 'Why do we read a measuring cylinder at eye level, at the bottom of the meniscus?', 'short_answer', 6.00);
