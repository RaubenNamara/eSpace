-- Catalogue expansion: 9 new official templates, all reusing existing renderers/apparatus - zero
-- new frontend code. Every INSERT is guarded by "does this template_key already exist" (the
-- duplicate-prevention safeguard from migration 057), making this file safe to re-run.

-- =================================================================================================
-- Physics: Resistance of a Conductor (circuit-2d)
-- =================================================================================================
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `render_mode`, `render_component`, `template_key`, `template_version`, `engine_version`, `estimated_duration_minutes`, `competency`, `learning_outcomes`, `prerequisite_knowledge`, `practical_skills`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
SELECT 'Resistance of a Conductor', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Electricity and Circuits', 'physics', 'intermediate', '2d', 'circuit', 'resistance_of_conductor', 1, 'circuit-2d-v1', 30,
    'Constructing and diagnosing a simple series circuit, and applying Ohm''s Law.',
    'Students will build a series circuit, take real ammeter/voltmeter readings, and calculate the resistance of an unknown conductor from their own measurements.',
    'Basic understanding of current, voltage and resistance, and Ohm''s Law formula V = IR.',
    JSON_ARRAY('circuit_construction', 'using_ammeter', 'using_voltmeter'),
    NULL,
    'To determine the resistance of a conductor using measured current and voltage.',
    'Every conductor resists the flow of electric current to some degree. By measuring the current through a conductor and the voltage across it, its resistance can be calculated using R = V / I.',
    'Battery, switch, resistor (unknown value), ammeter, voltmeter, connecting wires.',
    'None (all apparatus is simulated).',
    'Ensure the circuit is switched off before making or changing any connection.',
    '[{"key":"battery1","object_type":"battery","position":{"x":-3,"y":0,"z":0},"in_tray":true},{"key":"switch1","object_type":"switch","position":{"x":-1.5,"y":0,"z":0},"in_tray":true},{"key":"resistor1","object_type":"resistor","position":{"x":0,"y":0,"z":0},"props":{"resistance_ohm":22},"in_tray":true},{"key":"ammeter1","object_type":"ammeter","position":{"x":1.6,"y":0,"z":0.9},"in_tray":true},{"key":"voltmeter1","object_type":"voltmeter","position":{"x":1.6,"y":0,"z":-0.9},"in_tray":true}]',
    'How close was your calculated resistance to the value printed on the resistor''s colour bands?',
    20.00, 1, 'published'
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'resistance_of_conductor');

SET @roc_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'resistance_of_conductor' LIMIT 1);
DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @roc_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@roc_id, 1, 'Pick up the battery and place it on the bench.', 'battery1', 'move', 'battery1', NULL, NULL, 'Battery placed.', 'Click the battery in the apparatus tray.', 0),
(@roc_id, 2, 'Pick up the switch and place it on the bench.', 'switch1', 'move', 'switch1', NULL, NULL, 'Switch placed.', 'Click the switch in the apparatus tray.', 0),
(@roc_id, 3, 'Pick up the resistor and place it on the bench.', 'resistor1', 'move', 'resistor1', NULL, NULL, 'Resistor placed - inspect it to check its colour bands.', 'Click the resistor in the apparatus tray.', 0),
(@roc_id, 4, 'Pick up the ammeter and place it on the bench.', 'ammeter1', 'move', 'ammeter1', NULL, NULL, 'Ammeter placed.', 'Click the ammeter in the apparatus tray.', 0),
(@roc_id, 5, 'Pick up the voltmeter and place it on the bench.', 'voltmeter1', 'move', 'voltmeter1', NULL, NULL, 'Voltmeter placed.', 'Click the voltmeter in the apparatus tray.', 0),
(@roc_id, 6, 'Connect the battery to the switch.', 'switch1', 'connect', 'battery1', NULL, 'Drag a wire between the battery and switch terminals.', 'Battery connected to the switch.', 'Connect the battery to the switch.', 0),
(@roc_id, 7, 'Connect the switch to the resistor.', 'resistor1', 'connect', 'switch1', NULL, NULL, 'Switch connected to the resistor.', 'Connect the switch to the resistor.', 0),
(@roc_id, 8, 'Connect the resistor to the ammeter, keeping it in the same loop.', 'ammeter1', 'connect', 'resistor1', NULL, 'The ammeter must be in series (part of the main loop), not off to the side.', 'Resistor connected to the ammeter.', 'Connect the resistor to the ammeter.', 0),
(@roc_id, 9, 'Connect the ammeter back to the battery to complete the loop.', 'battery1', 'connect', 'ammeter1', NULL, NULL, 'Circuit loop complete.', 'Connect the ammeter back to the battery.', 0),
(@roc_id, 10, 'Connect the voltmeter in parallel across the resistor.', 'voltmeter1', 'connect', 'resistor1', NULL, 'The voltmeter reads the voltage across the resistor specifically.', 'Voltmeter connected across the resistor.', 'Connect the voltmeter across the resistor.', 0),
(@roc_id, 11, 'Close the switch.', 'switch1', 'switch_on', NULL, NULL, NULL, 'Current begins to flow - circuit is live.', 'Click the switch to close the circuit.', 0),
(@roc_id, 12, 'Measure the current using the ammeter.', 'ammeter1', 'measure', NULL, NULL, 'Select the ammeter and use Measure.', 'Reading recorded from the ammeter.', 'Select the ammeter and use Measure.', 0),
(@roc_id, 13, 'Measure the voltage across the resistor using the voltmeter.', 'voltmeter1', 'measure', NULL, NULL, 'Select the voltmeter and use Measure.', 'Reading recorded from the voltmeter.', 'Select the voltmeter and use Measure.', 0);

DELETE FROM `virtual_lab_questions` WHERE `experiment_id` = @roc_id;
INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@roc_id, 1, 'Using your measured voltage and current, calculate the resistance (R = V / I). Show your working.', 'calculation', 6.00),
(@roc_id, 2, 'How did your calculated resistance compare with the resistor''s printed colour-band value?', 'short_answer', 4.00);

-- =================================================================================================
-- Physics: Bulb Brightness and Power (circuit-2d) - a resistor is still required so the shared
-- circuit engine's completeness check passes; the bulb is the visual/brightness element.
-- =================================================================================================
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `render_mode`, `render_component`, `template_key`, `template_version`, `engine_version`, `estimated_duration_minutes`, `competency`, `learning_outcomes`, `prerequisite_knowledge`, `practical_skills`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
SELECT 'Bulb Brightness and Power', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Electricity and Circuits', 'physics', 'beginner', '2d', 'circuit', 'bulb_brightness_power', 1, 'circuit-2d-v1', 25,
    'Relating electrical power to voltage and current in a simple circuit.',
    'Students will observe how a bulb''s brightness responds to circuit voltage and calculate electrical power from real readings.',
    'Basic circuit construction, and the formula P = VI.',
    JSON_ARRAY('circuit_construction', 'using_ammeter', 'using_voltmeter'),
    NULL,
    'To investigate how a light bulb''s brightness relates to the electrical power delivered to it.',
    'A bulb converts electrical energy to light and heat. The power delivered to it is P = V x I - the brighter the bulb burns, the more power it is receiving.',
    'Battery, switch, resistor, light bulb, ammeter, voltmeter, connecting wires.',
    'None (all apparatus is simulated).',
    'Ensure the circuit is switched off before making or changing any connection.',
    '[{"key":"battery1","object_type":"battery","position":{"x":-3,"y":0,"z":0},"in_tray":true},{"key":"switch1","object_type":"switch","position":{"x":-1.5,"y":0,"z":0},"in_tray":true},{"key":"resistor1","object_type":"resistor","position":{"x":0,"y":0,"z":0},"props":{"resistance_ohm":8},"in_tray":true},{"key":"bulb1","object_type":"bulb","position":{"x":0.8,"y":0,"z":0},"props":{"rating_v":6},"in_tray":true},{"key":"ammeter1","object_type":"ammeter","position":{"x":1.6,"y":0,"z":0.9},"in_tray":true},{"key":"voltmeter1","object_type":"voltmeter","position":{"x":1.6,"y":0,"z":-0.9},"in_tray":true}]',
    'What happened to the bulb''s brightness as you increased the voltage? Relate this to power.',
    15.00, 1, 'published'
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'bulb_brightness_power');

SET @bbp_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'bulb_brightness_power' LIMIT 1);
DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @bbp_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@bbp_id, 1, 'Pick up the battery and place it on the bench.', 'battery1', 'move', 'battery1', NULL, NULL, 'Battery placed.', 'Click the battery in the tray.', 0),
(@bbp_id, 2, 'Pick up the switch and place it on the bench.', 'switch1', 'move', 'switch1', NULL, NULL, 'Switch placed.', 'Click the switch in the tray.', 0),
(@bbp_id, 3, 'Pick up the resistor and place it on the bench.', 'resistor1', 'move', 'resistor1', NULL, NULL, 'Resistor placed.', 'Click the resistor in the tray.', 0),
(@bbp_id, 4, 'Pick up the bulb and place it on the bench.', 'bulb1', 'move', 'bulb1', NULL, NULL, 'Bulb placed.', 'Click the bulb in the tray.', 0),
(@bbp_id, 5, 'Pick up the ammeter and place it on the bench.', 'ammeter1', 'move', 'ammeter1', NULL, NULL, 'Ammeter placed.', 'Click the ammeter in the tray.', 0),
(@bbp_id, 6, 'Pick up the voltmeter and place it on the bench.', 'voltmeter1', 'move', 'voltmeter1', NULL, NULL, 'Voltmeter placed.', 'Click the voltmeter in the tray.', 0),
(@bbp_id, 7, 'Connect the battery to the switch.', 'switch1', 'connect', 'battery1', NULL, NULL, 'Battery connected to switch.', 'Connect the battery to the switch.', 0),
(@bbp_id, 8, 'Connect the switch to the resistor.', 'resistor1', 'connect', 'switch1', NULL, NULL, 'Switch connected to resistor.', 'Connect the switch to the resistor.', 0),
(@bbp_id, 9, 'Connect the resistor to the bulb.', 'bulb1', 'connect', 'resistor1', NULL, NULL, 'Resistor connected to bulb.', 'Connect the resistor to the bulb.', 0),
(@bbp_id, 10, 'Connect the bulb to the ammeter, keeping it in the main loop.', 'ammeter1', 'connect', 'bulb1', NULL, 'The ammeter must be part of the main loop, not off to the side.', 'Bulb connected to the ammeter.', 'Connect the bulb to the ammeter.', 0),
(@bbp_id, 11, 'Connect the ammeter back to the battery to complete the loop.', 'battery1', 'connect', 'ammeter1', NULL, NULL, 'Circuit loop complete.', 'Connect the ammeter back to the battery.', 0),
(@bbp_id, 12, 'Connect the voltmeter in parallel across the resistor.', 'voltmeter1', 'connect', 'resistor1', NULL, NULL, 'Voltmeter connected.', 'Connect the voltmeter across the resistor.', 0),
(@bbp_id, 13, 'Close the switch and watch the bulb light up.', 'switch1', 'switch_on', NULL, NULL, NULL, 'The bulb glows - circuit is live.', 'Click the switch to close the circuit.', 0),
(@bbp_id, 14, 'Measure the current using the ammeter.', 'ammeter1', 'measure', NULL, NULL, NULL, 'Reading recorded.', 'Select the ammeter and use Measure.', 0),
(@bbp_id, 15, 'Measure the voltage using the voltmeter.', 'voltmeter1', 'measure', NULL, NULL, 'Try increasing the power supply voltage afterwards and see how the bulb''s brightness changes.', 'Reading recorded.', 'Select the voltmeter and use Measure.', 0);

DELETE FROM `virtual_lab_questions` WHERE `experiment_id` = @bbp_id;
INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@bbp_id, 1, 'Calculate the electrical power delivered to the circuit (P = V x I) from your readings.', 'calculation', 5.00),
(@bbp_id, 2, 'Describe what happened to the bulb''s brightness as the voltage increased.', 'observation', 5.00);

-- =================================================================================================
-- Physics: Effect of Length on Pendulum Period (pendulum-2d)
-- =================================================================================================
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `render_mode`, `render_component`, `template_key`, `template_version`, `engine_version`, `estimated_duration_minutes`, `competency`, `learning_outcomes`, `prerequisite_knowledge`, `practical_skills`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
SELECT 'Effect of Length on Pendulum Period', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Forces and Motion', 'physics', 'intermediate', '2d', 'pendulum', 'pendulum_length_period', 1, 'pendulum-2d-v1', 30,
    'Investigating how a variable affects a measured outcome using repeated real timing.',
    'Students will measure the period of a pendulum at two different string lengths and relate the two using real, simulation-derived timing.',
    'Basic pendulum motion, and how to use a stopwatch and ruler.',
    JSON_ARRAY('measuring_length', 'reading_scales', 'recording_observations'),
    NULL,
    'To investigate how the length of a pendulum affects its period of oscillation.',
    'A pendulum''s period - the time for one complete swing - depends on its length. In this practical you will time the pendulum at two different lengths and compare the results.',
    'Retort stand, pendulum bob, string, ruler, stopwatch.',
    'None (all apparatus is simulated).',
    'None.',
    '[{"key":"bob1","object_type":"specimen","position":{"x":-0.8,"y":0,"z":0},"props":{"length_cm":15,"mass_g":50}},{"key":"ruler1","object_type":"ruler","position":{"x":0.8,"y":0,"z":0.8}},{"key":"stopwatch1","object_type":"stopwatch","position":{"x":0.8,"y":0,"z":-0.8}}]',
    'How did increasing the pendulum''s length affect its period? Does this match your prediction?',
    20.00, 1, 'published'
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'pendulum_length_period');

SET @plp_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'pendulum_length_period' LIMIT 1);
DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @plp_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@plp_id, 1, 'Inspect the pendulum bob.', 'bob1', 'inspect', NULL, NULL, NULL, 'A pendulum bob, ready to swing.', 'Click on the bob to inspect it.', 0),
(@plp_id, 2, 'Measure the pendulum''s starting length using the ruler.', 'ruler1', 'measure', '15', 0.5, 'Select the ruler, use Measure, then click the pendulum.', 'Starting length recorded (~15cm).', 'Select the ruler and measure the pendulum length.', 0),
(@plp_id, 3, 'Drag the bob sideways and release it, then start the stopwatch.', 'stopwatch1', 'switch_on', NULL, NULL, 'Release the bob first, then click Start on the stopwatch.', 'Timing started.', 'Start the stopwatch as the pendulum swings.', 0),
(@plp_id, 4, 'Stop the stopwatch after counting 10 full oscillations.', 'stopwatch1', 'switch_off', NULL, NULL, NULL, 'Timing stopped.', 'Click Stop on the stopwatch after 10 oscillations.', 0),
(@plp_id, 5, 'Read the elapsed time for this length from the stopwatch.', 'stopwatch1', 'measure', NULL, NULL, 'Use Read Time on the stopwatch.', 'Time recorded for the first length.', 'Read the elapsed time from the stopwatch.', 0),
(@plp_id, 6, 'Increase the string length using the length control, then measure the new length with the ruler.', 'ruler1', 'measure', NULL, NULL, 'Drag the String Length slider to a bigger value first.', 'New length recorded.', 'Adjust the length, then measure it with the ruler.', 0),
(@plp_id, 7, 'Reset the stopwatch, release the bob again, and start timing at the new length.', 'stopwatch1', 'switch_on', NULL, NULL, 'Click Reset on the stopwatch before starting again.', 'Timing started for the new length.', 'Start the stopwatch again at the new length.', 0),
(@plp_id, 8, 'Stop the stopwatch after counting 10 more oscillations.', 'stopwatch1', 'switch_off', NULL, NULL, NULL, 'Timing stopped.', 'Click Stop after 10 oscillations.', 0),
(@plp_id, 9, 'Read the elapsed time for the new length.', 'stopwatch1', 'measure', NULL, NULL, NULL, 'Time recorded for the second length.', 'Read the elapsed time from the stopwatch.', 0);

DELETE FROM `virtual_lab_questions` WHERE `experiment_id` = @plp_id;
INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@plp_id, 1, 'Calculate the period (T = time / number of oscillations) for both lengths.', 'calculation', 6.00),
(@plp_id, 2, 'Describe the relationship between pendulum length and period that your results show.', 'short_answer', 4.00);

-- =================================================================================================
-- Physics: Elastic Limit of a Spring (hookes_law-2d) - the same apparatus/mechanic as
-- "Investigating Hooke's Law", configured so the standard loads clearly exceed the safe limit,
-- making the elastic-limit / permanent-deformation mechanic the explicit focus.
-- =================================================================================================
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `render_mode`, `render_component`, `template_key`, `template_version`, `engine_version`, `estimated_duration_minutes`, `competency`, `learning_outcomes`, `prerequisite_knowledge`, `practical_skills`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
SELECT 'Elastic Limit of a Spring', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Forces', 'physics', 'advanced', '2d', 'hookes_law', 'elastic_limit_spring', 1, 'hookes-law-2d-v1', 35,
    'Investigating the limits of elastic behaviour beyond Hooke''s Law.',
    'Students will load a spring beyond its elastic limit and observe that extension is no longer proportional to force, and that the spring does not fully recover.',
    'Hooke''s Law (F = kx), and the difference between elastic and plastic deformation.',
    JSON_ARRAY('measuring_length', 'reading_scales', 'recording_observations'),
    NULL,
    'To find the point at which a spring stops obeying Hooke''s Law and investigate its behaviour beyond the elastic limit.',
    'Hooke''s Law only holds while a spring remains within its elastic limit. Beyond that point, extension increases disproportionately and the spring does not return to its original length.',
    'Retort stand, spring, mass pieces (50g, 100g, 150g, 200g), ruler.',
    'None (all apparatus is simulated).',
    'Stop adding load once you notice the extension is no longer increasing in proportion to the force - this is the elastic limit.',
    '[{"key":"stand1","object_type":"retort_stand","position":{"x":-1.5,"y":0,"z":0},"in_tray":true},{"key":"spring1","object_type":"spring","position":{"x":-1.5,"y":0,"z":0.9},"props":{"natural_length_cm":15,"spring_constant_n_per_m":60,"max_safe_extension_cm":5},"in_tray":true},{"key":"ruler1","object_type":"ruler","position":{"x":1.5,"y":0,"z":0},"in_tray":true},{"key":"mass50","object_type":"mass_piece","position":{"x":0.4,"y":0,"z":1.2},"props":{"mass_g":50},"in_tray":true},{"key":"mass100","object_type":"mass_piece","position":{"x":0.85,"y":0,"z":1.2},"props":{"mass_g":100},"in_tray":true},{"key":"mass150","object_type":"mass_piece","position":{"x":1.3,"y":0,"z":1.2},"props":{"mass_g":150},"in_tray":true},{"key":"mass200","object_type":"mass_piece","position":{"x":1.75,"y":0,"z":1.2},"props":{"mass_g":200},"in_tray":true}]',
    'At roughly what load did the spring stop obeying Hooke''s Law? What happened to it afterwards?',
    15.00, 1, 'published'
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'elastic_limit_spring');

SET @els_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'elastic_limit_spring' LIMIT 1);
DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @els_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@els_id, 1, 'Pick up the retort stand and place it on the bench.', 'stand1', 'move', 'stand1', NULL, NULL, 'Stand set up.', 'Click the retort stand in the tray.', 0),
(@els_id, 2, 'Pick up the spring.', 'spring1', 'move', 'spring1', NULL, NULL, 'Spring in hand.', 'Click the spring in the tray.', 0),
(@els_id, 3, 'Mount the spring onto the retort stand''s clamp.', 'spring1', 'move', 'stand1', NULL, NULL, 'Spring mounted.', 'Drag the spring onto the stand.', 0),
(@els_id, 4, 'Pick up the ruler.', 'ruler1', 'move', 'ruler1', NULL, NULL, 'Ruler ready.', 'Click the ruler in the tray.', 0),
(@els_id, 5, 'Measure the spring''s original, unloaded length.', 'ruler1', 'measure', NULL, NULL, NULL, 'Original length recorded.', 'Select the ruler and measure the spring.', 0),
(@els_id, 6, 'Pick up and hang the 50g mass on the spring.', 'mass50', 'move', 'mass50', NULL, NULL, '50g in hand.', 'Click the 50g mass in the tray.', 0),
(@els_id, 7, 'Hang the 50g mass on the spring.', 'mass50', 'move', 'spring1', NULL, NULL, '50g loaded.', 'Drag the mass onto the spring.', 0),
(@els_id, 8, 'Measure the new length.', 'ruler1', 'measure', NULL, NULL, NULL, 'Length recorded.', 'Measure the spring again.', 0),
(@els_id, 9, 'Pick up and add the 100g mass (total 150g).', 'mass100', 'move', 'mass100', NULL, NULL, '100g in hand.', 'Click the 100g mass in the tray.', 0),
(@els_id, 10, 'Add the 100g mass to the load.', 'mass100', 'move', 'spring1', NULL, NULL, 'Load now 150g.', 'Drag the mass onto the spring.', 0),
(@els_id, 11, 'Measure the length with 150g on the spring.', 'ruler1', 'measure', NULL, NULL, NULL, 'Length recorded.', 'Measure the spring again.', 0),
(@els_id, 12, 'Pick up and add the 150g mass (total 300g).', 'mass150', 'move', 'mass150', NULL, NULL, '150g in hand.', 'Click the 150g mass in the tray.', 0),
(@els_id, 13, 'Add the 150g mass to the load.', 'mass150', 'move', 'spring1', NULL, 'Watch for a warning if the spring''s safe extension limit is exceeded.', 'Load now 300g.', 'Drag the mass onto the spring.', 0),
(@els_id, 14, 'Measure the length with 300g on the spring.', 'ruler1', 'measure', NULL, NULL, NULL, 'Length recorded - check whether it is still proportional to your earlier readings.', 'Measure the spring again.', 0),
(@els_id, 15, 'Pick up and add the final 200g mass (total 500g).', 'mass200', 'move', 'mass200', NULL, NULL, '200g in hand.', 'Click the 200g mass in the tray.', 0),
(@els_id, 16, 'Add the 200g mass to the load.', 'mass200', 'move', 'spring1', NULL, NULL, 'Load now 500g - well beyond the elastic limit.', 'Drag the mass onto the spring.', 0),
(@els_id, 17, 'Measure the final length with 500g on the spring.', 'ruler1', 'measure', NULL, NULL, 'Compare this extension to what you would predict from your earlier (elastic) readings.', 'Final length recorded.', 'Measure the spring one last time.', 0);

DELETE FROM `virtual_lab_questions` WHERE `experiment_id` = @els_id;
INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@els_id, 1, 'Calculate the extension at each load and identify where it stops being proportional to force.', 'calculation', 6.00),
(@els_id, 2, 'Explain what "elastic limit" means, referring to your own results.', 'short_answer', 4.00);

-- =================================================================================================
-- Chemistry: Heating Water and Measuring Temperature Change (3D engine - real elapsed-time-based
-- thermometer/stopwatch, already established mechanics, no new apparatus).
-- =================================================================================================
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `render_mode`, `render_component`, `template_key`, `template_version`, `engine_version`, `estimated_duration_minutes`, `competency`, `learning_outcomes`, `prerequisite_knowledge`, `practical_skills`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
SELECT 'Heating Water and Measuring Temperature Change', (SELECT id FROM subjects WHERE name = 'CHEM' LIMIT 1), 'Heat and Energy', 'chemistry', 'beginner', '3d', NULL, 'heating_water_temperature', 1, '3d-v1', 25,
    'Using a thermometer and stopwatch to track a real physical change over time.',
    'Students will heat water and record real temperature readings against real elapsed time.',
    'Basic use of a thermometer, and what temperature measures.',
    JSON_ARRAY('reading_scales', 'recording_observations'),
    NULL,
    'To measure how the temperature of water changes with heating time.',
    'Heating a liquid increases the average kinetic energy of its particles, raising its temperature. In this practical you will heat water and track its real temperature rise over time.',
    'Beaker, Bunsen burner, thermometer, stopwatch.',
    'Water.',
    'Keep hands and loose clothing away from the flame. Never leave a heated beaker unattended.',
    '[{"key":"beaker1","object_type":"beaker","position":{"x":-1,"y":0,"z":0},"props":{"color":"#a9d6e5","capacity_ml":250,"current_volume":150},"in_tray":true},{"key":"burner1","object_type":"bunsen_burner","position":{"x":-1,"y":0,"z":-1},"in_tray":true},{"key":"thermometer1","object_type":"thermometer","position":{"x":0.5,"y":0,"z":0.8},"in_tray":true},{"key":"stopwatch1","object_type":"stopwatch","position":{"x":0.5,"y":0,"z":-0.8},"in_tray":true}]',
    'How did the water''s temperature change over time? Was the rate of change constant?',
    15.00, 1, 'published'
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'heating_water_temperature');

SET @hw_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'heating_water_temperature' LIMIT 1);
DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @hw_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@hw_id, 1, 'Put on safety goggles before working with the burner.', NULL, 'acknowledge', NULL, NULL, NULL, 'Safety first.', 'Acknowledge the safety warning to continue.', 1),
(@hw_id, 2, 'Pick up the beaker of water and place it on the bench.', 'beaker1', 'move', 'beaker1', NULL, NULL, 'Beaker placed.', 'Click the beaker in the tray.', 0),
(@hw_id, 3, 'Pick up the Bunsen burner and place it on the bench.', 'burner1', 'move', 'burner1', NULL, NULL, 'Burner placed.', 'Click the burner in the tray.', 0),
(@hw_id, 4, 'Pick up the thermometer.', 'thermometer1', 'move', 'thermometer1', NULL, NULL, 'Thermometer ready.', 'Click the thermometer in the tray.', 0),
(@hw_id, 5, 'Pick up the stopwatch.', 'stopwatch1', 'move', 'stopwatch1', NULL, NULL, 'Stopwatch ready.', 'Click the stopwatch in the tray.', 0),
(@hw_id, 6, 'Select the burner, choose Heat, then click the beaker to place it over the flame.', 'burner1', 'heat', 'beaker1', NULL, 'Select the Bunsen burner first, then use Heat and click the beaker.', 'The beaker is now over the flame.', 'Select the burner, choose Heat, then click the beaker.', 0),
(@hw_id, 7, 'Start the stopwatch as heating begins.', 'stopwatch1', 'switch_on', NULL, NULL, NULL, 'Timing started.', 'Click Start on the stopwatch.', 0),
(@hw_id, 8, 'After a short wait, measure the water''s temperature with the thermometer.', 'thermometer1', 'measure', NULL, NULL, 'Select the thermometer, use Measure, then click the beaker.', 'Temperature recorded.', 'Select the thermometer and measure the beaker.', 0),
(@hw_id, 9, 'Stop the stopwatch.', 'stopwatch1', 'switch_off', NULL, NULL, NULL, 'Timing stopped.', 'Click Stop on the stopwatch.', 0),
(@hw_id, 10, 'Read the elapsed heating time.', 'stopwatch1', 'measure', NULL, NULL, NULL, 'Time recorded.', 'Use Read Time on the stopwatch.', 0),
(@hw_id, 11, 'Measure the water''s final temperature.', 'thermometer1', 'measure', NULL, NULL, NULL, 'Final temperature recorded.', 'Select the thermometer and measure the beaker again.', 0);

DELETE FROM `virtual_lab_questions` WHERE `experiment_id` = @hw_id;
INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@hw_id, 1, 'Calculate the change in temperature over your measured heating time.', 'calculation', 5.00),
(@hw_id, 2, 'Describe how the temperature changed as heating continued.', 'observation', 5.00);

-- =================================================================================================
-- Physics: Measuring Length with a Ruler (3D engine - a focused measurement-skills template;
-- also covers "measuring specimen length" generically, whatever the specimen represents).
-- =================================================================================================
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `render_mode`, `render_component`, `template_key`, `template_version`, `engine_version`, `estimated_duration_minutes`, `competency`, `learning_outcomes`, `prerequisite_knowledge`, `practical_skills`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
SELECT 'Measuring Length with a Ruler', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Measurement', 'physics', 'beginner', '3d', NULL, 'measuring_length_ruler', 1, '3d-v1', 15,
    'Reading a linear scale accurately.',
    'Students will measure the real length of two objects using a ruler, practising correct scale-reading technique.',
    'None - this is an introductory measurement-skills practical.',
    JSON_ARRAY('measuring_length', 'reading_scales'),
    NULL,
    'To practise measuring the length of objects accurately using a ruler.',
    'Accurate measurement is a foundational practical skill. In this exercise you will measure two objects of different lengths and record your readings.',
    'Ruler, two objects of different length.',
    'None (all apparatus is simulated).',
    'None.',
    '[{"key":"rod1","object_type":"specimen","position":{"x":-1,"y":0,"z":0},"props":{"length_cm":15.5},"in_tray":true},{"key":"rod2","object_type":"specimen","position":{"x":1,"y":0,"z":0},"props":{"length_cm":22.0},"in_tray":true},{"key":"ruler1","object_type":"ruler","position":{"x":0,"y":0,"z":1},"in_tray":true}]',
    'Which reading were you more confident in, and why?',
    10.00, 1, 'published'
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'measuring_length_ruler');

SET @mlr_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'measuring_length_ruler' LIMIT 1);
DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @mlr_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@mlr_id, 1, 'Pick up the first object and place it on the bench.', 'rod1', 'move', 'rod1', NULL, NULL, 'Object 1 placed.', 'Click the first object in the tray.', 0),
(@mlr_id, 2, 'Pick up the second object and place it on the bench.', 'rod2', 'move', 'rod2', NULL, NULL, 'Object 2 placed.', 'Click the second object in the tray.', 0),
(@mlr_id, 3, 'Pick up the ruler.', 'ruler1', 'move', 'ruler1', NULL, NULL, 'Ruler ready.', 'Click the ruler in the tray.', 0),
(@mlr_id, 4, 'Align the ruler with the first object and measure its length.', 'ruler1', 'measure', NULL, NULL, 'Line up the ruler''s zero mark with the start of the object.', 'Length of object 1 recorded.', 'Align the ruler''s zero with the object, then measure.', 0),
(@mlr_id, 5, 'Align the ruler with the second object and measure its length.', 'ruler1', 'measure', NULL, NULL, NULL, 'Length of object 2 recorded.', 'Align the ruler with the second object, then measure.', 0);

DELETE FROM `virtual_lab_questions` WHERE `experiment_id` = @mlr_id;
INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@mlr_id, 1, 'Record the lengths you measured for both objects, and calculate the difference between them.', 'calculation', 6.00),
(@mlr_id, 2, 'Explain one thing to watch for when reading a ruler accurately (e.g. parallax, zero error).', 'short_answer', 4.00);

-- =================================================================================================
-- Biology: Viewing Cheek Cells Using a Microscope (microscope-2d) - pure specimen configuration on
-- top of the existing microscope renderer, proving the "new specimen, not a new renderer" model.
-- =================================================================================================
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `render_mode`, `render_component`, `template_key`, `template_version`, `engine_version`, `estimated_duration_minutes`, `competency`, `learning_outcomes`, `prerequisite_knowledge`, `practical_skills`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
SELECT 'Viewing Cheek Cells Using a Microscope', (SELECT id FROM subjects WHERE name = 'BIO' LIMIT 1), 'Cell Biology', 'biology', 'intermediate', '2d', 'microscope', 'cheek_cells', 1, 'microscope-2d-v1', 30,
    'Operating a microscope to observe and compare animal cell structure.',
    'Students will focus a microscope on cheek epithelial cells and identify structures that distinguish animal cells from plant cells.',
    'Basic microscope operation (ideally after Viewing Onion Epidermal Cells).',
    JSON_ARRAY('microscope_handling', 'focusing_microscope', 'recording_observations'),
    NULL,
    'To observe and identify the structures of human cheek epithelial cells using a microscope.',
    'Cheek cells are a convenient example of animal cells. Unlike plant cells, they have no cell wall or chloroplasts, giving them an irregular rather than boxy shape.',
    'Microscope, prepared cheek cell slide.',
    'None (all apparatus is simulated).',
    'Handle the microscope and slide with care.',
    '[{"key":"microscope1","object_type":"microscope","position":{"x":0,"y":0,"z":0},"in_tray":true},{"key":"slide1","object_type":"biological_model","position":{"x":1.4,"y":0,"z":0.6},"props":{"specimen":"Human cheek epithelial cells","optimal_focus":45,"focus_tolerance":7,"expected_structures":"the cell membrane, cytoplasm and nucleus of the cheek cells - notice there is no cell wall, unlike the onion cells","cell_color":"#fbcfe8","nucleus_color":"#9d174d"},"in_tray":true}]',
    'How did the cheek cells differ in shape and structure from the onion cells you observed before?',
    15.00, 1, 'published'
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'cheek_cells');

SET @cc_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'cheek_cells' LIMIT 1);
DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @cc_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@cc_id, 1, 'Pick up the microscope from the tray and place it on the bench.', 'microscope1', 'move', 'microscope1', NULL, NULL, 'Microscope set up.', 'Click the microscope in the tray.', 0),
(@cc_id, 2, 'Pick up the prepared cheek cell slide and place it on the bench.', 'slide1', 'move', 'slide1', NULL, NULL, 'Slide ready.', 'Click the slide in the tray.', 0),
(@cc_id, 3, 'Move the slide onto the microscope stage.', 'slide1', 'move', 'microscope1', NULL, 'Drag the slide onto the microscope.', 'Slide loaded onto the stage.', 'Drag the slide onto the microscope.', 0),
(@cc_id, 4, 'Switch on the microscope''s illumination.', 'microscope1', 'switch_on', NULL, NULL, NULL, 'Lamp on.', 'Switch the light on.', 0),
(@cc_id, 5, 'Select the low-power (x40) objective lens.', 'microscope1', 'select_objective', '40', NULL, NULL, 'Low power selected.', 'Choose the x40 objective first.', 0),
(@cc_id, 6, 'Turn the coarse focus knob until the image starts to sharpen.', 'microscope1', 'focus_coarse', NULL, NULL, 'Move the coarse focus in one direction and see whether the image improves.', 'Coarse focus adjusted.', 'Use the coarse focus slider.', 0),
(@cc_id, 7, 'Use the fine focus to sharpen the image further.', 'microscope1', 'focus_fine', NULL, NULL, NULL, 'Fine focus adjusted.', 'Use the fine focus +/- buttons.', 0),
(@cc_id, 8, 'Observe the specimen - keep adjusting focus until the eyepiece view is clearly sharp.', 'slide1', 'inspect', 'focused', NULL, 'Watch the eyepiece view - it sharpens as focus improves.', 'In focus - cheek cells clearly visible.', 'Adjust focus, then observe again.', 0),
(@cc_id, 9, 'Switch to the higher-power (x400) objective.', 'microscope1', 'select_objective', '400', NULL, NULL, 'Magnification increased.', 'Select the x400 objective.', 0),
(@cc_id, 10, 'Observe the specimen again - refocus if needed at the higher magnification.', 'slide1', 'inspect', 'focused', NULL, 'A focus that worked at x40 often needs correcting at x400.', 'Sharp at x400 - fine cellular detail visible.', 'Refocus, then observe again.', 0);

DELETE FROM `virtual_lab_questions` WHERE `experiment_id` = @cc_id;
INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@cc_id, 1, 'What structures did you observe in the cheek cells at high magnification?', 'observation', 5.00),
(@cc_id, 2, 'Name two differences between the cheek cells you observed and the onion cells from an earlier practical.', 'short_answer', 5.00);

-- =================================================================================================
-- Biology: Microscope Handling Practice (microscope-2d) - a simplified, generous-tolerance,
-- low-power-only practice run, meant as a prerequisite before the graded specimen practicals.
-- =================================================================================================
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `render_mode`, `render_component`, `template_key`, `template_version`, `engine_version`, `estimated_duration_minutes`, `competency`, `learning_outcomes`, `prerequisite_knowledge`, `practical_skills`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
SELECT 'Microscope Handling Practice', (SELECT id FROM subjects WHERE name = 'BIO' LIMIT 1), 'Microscope Skills', 'biology', 'beginner', '2d', 'microscope', 'microscope_handling_practice', 1, 'microscope-2d-v1', 15,
    'Basic, confident handling and focusing of a microscope.',
    'Students will practise the core mechanical skill of setting up and focusing a microscope before attempting a graded specimen practical.',
    'None - this is an introductory practice exercise.',
    JSON_ARRAY('microscope_handling', 'focusing_microscope'),
    NULL,
    'To practise setting up, illuminating and focusing a microscope at low power.',
    'Before observing real specimens, it helps to practise the basic mechanics of microscope use: placing a slide, switching on the light, and focusing.',
    'Microscope, practice slide.',
    'None (all apparatus is simulated).',
    'Handle the microscope and slide with care.',
    '[{"key":"microscope1","object_type":"microscope","position":{"x":0,"y":0,"z":0},"in_tray":true},{"key":"slide1","object_type":"biological_model","position":{"x":1.4,"y":0,"z":0.6},"props":{"specimen":"Practice specimen","optimal_focus":50,"focus_tolerance":10,"expected_structures":"a simple practice pattern","cell_color":"#a5f3fc","nucleus_color":"#155e75"},"in_tray":true}]',
    'What did you find hardest about setting up and focusing the microscope?',
    10.00, 1, 'published'
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'microscope_handling_practice');

SET @mhp_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'microscope_handling_practice' LIMIT 1);
DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @mhp_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@mhp_id, 1, 'Pick up the microscope and place it on the bench.', 'microscope1', 'move', 'microscope1', NULL, NULL, 'Microscope set up.', 'Click the microscope in the tray.', 0),
(@mhp_id, 2, 'Pick up the practice slide and place it on the bench.', 'slide1', 'move', 'slide1', NULL, NULL, 'Slide ready.', 'Click the slide in the tray.', 0),
(@mhp_id, 3, 'Move the slide onto the microscope stage.', 'slide1', 'move', 'microscope1', NULL, 'Drag the slide onto the microscope.', 'Slide loaded.', 'Drag the slide onto the microscope.', 0),
(@mhp_id, 4, 'Switch on the illumination.', 'microscope1', 'switch_on', NULL, NULL, NULL, 'Lamp on.', 'Switch the light on.', 0),
(@mhp_id, 5, 'Select the low-power (x40) objective.', 'microscope1', 'select_objective', '40', NULL, NULL, 'Low power selected.', 'Choose the x40 objective.', 0),
(@mhp_id, 6, 'Use the coarse focus knob to bring the image roughly into view.', 'microscope1', 'focus_coarse', NULL, NULL, NULL, 'Coarse focus adjusted.', 'Use the coarse focus slider.', 0),
(@mhp_id, 7, 'Use the fine focus to sharpen the image.', 'microscope1', 'focus_fine', NULL, NULL, NULL, 'Fine focus adjusted.', 'Use the fine focus +/- buttons.', 0),
(@mhp_id, 8, 'Observe the specimen once it is clearly in focus.', 'slide1', 'inspect', 'focused', NULL, 'Keep adjusting the focus controls until the view sharpens.', 'Well done - you brought the specimen into focus.', 'Keep adjusting focus, then observe again.', 0);

DELETE FROM `virtual_lab_questions` WHERE `experiment_id` = @mhp_id;
INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@mhp_id, 1, 'Describe the steps you took to bring the specimen into focus.', 'short_answer', 10.00);

