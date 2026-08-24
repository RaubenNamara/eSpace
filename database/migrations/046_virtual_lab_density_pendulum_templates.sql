-- Two new example experiments proving the new apparatus (balance, stopwatch, water-displacement)
-- end to end. Both use the existing reusable engine and object catalog - nothing here is
-- hard-coded into the engine itself, it's all step/scene_object data.

-- Physics: Density of a Solid (by water displacement)
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Density of a Solid', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Density and Matter', 'physics', NULL,
    'To determine the density of an irregular solid using mass and water displacement.',
    'Density is mass per unit volume. Mass can be measured directly on a balance; the volume of an irregular solid can be found by measuring how much water it displaces when submerged.',
    'Balance, measuring cylinder, water.',
    'A solid specimen of unknown density.',
    'Handle the balance and glassware carefully.',
    '[{"key":"specimen1","object_type":"specimen","position":{"x":-1,"y":0,"z":0},"props":{"mass_g":158,"volume_ml":20,"length_cm":10}},{"key":"balance1","object_type":"balance","position":{"x":0,"y":0,"z":0.9}},{"key":"cylinder1","object_type":"measuring_cylinder","position":{"x":1.2,"y":0,"z":0},"props":{"current_volume":50,"capacity_ml":100,"color":"#cfe8f3"}}]',
    'What does your calculated density tell you about this material? Compare it to a material you know.',
    20.00, 1, 'published'
);

SET @density_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Density of a Solid' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@density_id, 1, 'Inspect the specimen before you begin.', 'specimen1', 'inspect', NULL, NULL, NULL, 'A solid sample of unknown material.', 'Click on the specimen to inspect it.', 0),
(@density_id, 2, 'Move the specimen onto the balance.', 'balance1', 'move', 'balance1', NULL, 'Select the specimen, choose Move, then drag it onto the balance.', 'Specimen placed on the balance.', 'Drag the specimen so it sits on the balance.', 0),
(@density_id, 3, 'Measure the mass of the specimen using the balance.', 'balance1', 'measure', NULL, NULL, 'Select the balance and use Measure to read the display.', 'Mass recorded from the balance.', 'Select the balance and use Measure.', 0),
(@density_id, 4, 'Move the specimen into the measuring cylinder to displace the water.', 'cylinder1', 'move', 'cylinder1', NULL, 'The water level will rise by exactly the specimen''s own volume.', 'The water level rises as the specimen displaces water.', 'Drag the specimen into the measuring cylinder.', 0),
(@density_id, 5, 'Measure the new water level in the measuring cylinder.', 'cylinder1', 'measure', '70', 2, 'The new level is the original 50ml plus the volume displaced.', 'New level recorded.', 'Select the measuring cylinder and use Measure.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@density_id, 1, 'Calculate the volume of the specimen from the rise in water level (final reading - initial 50ml).', 'calculation', 5.00),
(@density_id, 2, 'Calculate the density of the specimen (density = mass / volume). Show your units.', 'calculation', 5.00);

-- Physics: Simple Pendulum
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Simple Pendulum', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Oscillations', 'physics', NULL,
    'To measure the period of a simple pendulum and use it to estimate the acceleration due to gravity.',
    'A simple pendulum swings with a period that depends on its length. In this practical you will measure the pendulum''s length with a ruler, time a number of oscillations with a real stopwatch, and calculate the period. Publish a second copy of this experiment with a different specimen length to compare how period changes with length.',
    'Pendulum bob on a string, ruler, stopwatch.',
    'None (all apparatus is simulated).',
    'None.',
    '[{"key":"bob1","object_type":"specimen","position":{"x":-0.8,"y":0,"z":0},"props":{"length_cm":25,"mass_g":50}},{"key":"ruler1","object_type":"ruler","position":{"x":0.8,"y":0,"z":0.8}},{"key":"stopwatch1","object_type":"stopwatch","position":{"x":0.8,"y":0,"z":-0.8}}]',
    'How would you expect the period to change if the pendulum were made longer? Explain using your results.',
    15.00, 1, 'published'
);

SET @pendulum_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Simple Pendulum' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@pendulum_id, 1, 'Inspect the pendulum bob.', 'bob1', 'inspect', NULL, NULL, NULL, 'A small bob on a string of fixed length for this attempt.', 'Click on the bob to inspect it.', 0),
(@pendulum_id, 2, 'Measure the length of the pendulum using the ruler.', 'ruler1', 'measure', '25', 0.5, 'Select the ruler, choose Measure, then click the bob - make sure the ruler is placed close to it first.||Align the ruler''s zero mark with the top of the string before measuring.', 'Length recorded.', 'Move the ruler close to the pendulum, then select it and use Measure.', 0),
(@pendulum_id, 3, 'Start the stopwatch as you release the pendulum.', 'stopwatch1', 'switch_on', NULL, NULL, 'Select the stopwatch and use Start.', 'Timing started.', 'Select the stopwatch and click Start.', 0),
(@pendulum_id, 4, 'Stop the stopwatch after counting 10 full oscillations.', 'stopwatch1', 'switch_off', NULL, NULL, 'Select the stopwatch and use Stop once you have counted 10 swings.', 'Timing stopped.', 'Select the stopwatch and click Stop.', 0),
(@pendulum_id, 5, 'Read the elapsed time from the stopwatch.', 'stopwatch1', 'measure', NULL, NULL, 'Select the stopwatch and use Read Time.', 'Time recorded from the stopwatch.', 'Select the stopwatch and use Read Time.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@pendulum_id, 1, 'Calculate the period of one oscillation (T = total time / number of oscillations).', 'calculation', 4.00),
(@pendulum_id, 2, 'Using T = 2*pi*sqrt(L/g), estimate g from your measured length and period.', 'calculation', 4.00);
