-- Four new templates proving the microscope/Hooke's Law/optics engines end to end. All apparatus
-- starts in the tray (per the brief's "improve physical lab setup" requirement) except where an
-- action is inherently a two-click flow already (measure/rotate) rather than a placement.

-- ---------------------------------------------------------------------------------------------
-- Biology: Viewing Onion Cells Using a Microscope
-- ---------------------------------------------------------------------------------------------
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Viewing Onion Cells Using a Microscope', (SELECT id FROM subjects WHERE name = 'BIO' LIMIT 1), 'Cell Biology', 'biology', 'beginner', NULL,
    'To prepare a microscope and correctly focus it to observe the structure of onion epidermal cells.',
    'A microscope must be set up, lit and focused correctly before a specimen can be seen clearly. In this practical you will place a prepared onion slide on the stage, find it at low power, and bring it into sharp focus before increasing magnification.',
    'Microscope, prepared onion epidermal slide.',
    'None (all apparatus is simulated).',
    'Handle the microscope and glass slide with care.',
    '[{"key":"microscope1","object_type":"microscope","position":{"x":0,"y":0,"z":0},"in_tray":true},{"key":"slide1","object_type":"biological_model","position":{"x":1.4,"y":0,"z":0.6},"props":{"specimen":"Onion epidermal cells","optimal_focus":58,"focus_tolerance":6,"expected_structures":"the cell wall, nucleus and cytoplasm of the onion epidermal cells"},"in_tray":true}]',
    'What did focusing the microscope teach you about how magnification and focus affect what you can observe?',
    15.00, 1, 'published'
);

SET @onion_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Viewing Onion Cells Using a Microscope' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@onion_id, 1, 'Pick up the microscope from the tray and place it on the bench.', 'microscope1', 'move', 'microscope1', NULL, NULL, 'Microscope set up on the bench.', 'Click the microscope in the apparatus tray to place it.', 0),
(@onion_id, 2, 'Pick up the prepared onion slide and place it on the bench.', 'slide1', 'move', 'slide1', NULL, NULL, 'Slide ready.', 'Click the slide in the apparatus tray to place it.', 0),
(@onion_id, 3, 'Move the slide onto the microscope stage.', 'slide1', 'move', 'microscope1', NULL, 'Drag the slide close to the microscope.||It needs to land within the stage clips - drop it right on top of the microscope base.', 'Slide loaded onto the stage.', 'Select the slide and drag it onto the microscope.', 0),
(@onion_id, 4, 'Switch on the microscope''s illumination.', 'microscope1', 'switch_on', NULL, NULL, NULL, 'Lamp on - the stage is now lit.', 'Select the microscope and switch the light on.', 0),
(@onion_id, 5, 'Select the low-power (x40) objective lens before searching for the specimen.', 'microscope1', 'select_objective', '40', NULL, NULL, 'Low power selected - the widest field of view for finding the specimen.', 'Choose the x40 objective first.', 0),
(@onion_id, 6, 'Turn the coarse focus knob until the image starts to sharpen.', 'microscope1', 'focus_coarse', NULL, NULL, 'The image starts very blurred - that''s expected. Move the coarse focus in one direction and see whether it gets better or worse.', 'Coarse focus adjusted.', 'Use the coarse focus slider in the microscope panel.', 0),
(@onion_id, 7, 'Use the fine focus to sharpen the image further.', 'microscope1', 'focus_fine', NULL, NULL, 'Small nudges only - fine focus is for the final touches once coarse focus is close.', 'Fine focus adjusted.', 'Use the fine focus +/- buttons in the microscope panel.', 0),
(@onion_id, 8, 'Observe the specimen - keep adjusting focus until the eyepiece view is clearly sharp.', 'slide1', 'inspect', 'focused', NULL, 'Watch the eyepiece view circle - it sharpens as your focus gets closer to correct.||If it is still blurred, try the coarse focus again in bigger steps.', 'In focus - the cell wall, nucleus and cytoplasm are clearly visible.', 'Not quite in focus yet - adjust the coarse and fine focus, then observe again.', 0),
(@onion_id, 9, 'Now that you have located the specimen at low power, switch to the higher-power (x400) objective.', 'microscope1', 'select_objective', '400', NULL, 'Never jump straight to high power - always find the specimen at low power first.', 'Magnification increased to x400.', 'Select the x400 objective.', 0),
(@onion_id, 10, 'Observe the specimen again - higher magnification has a shallower focus range, so you will likely need to refocus.', 'slide1', 'inspect', 'focused', NULL, 'A focus that worked at x40 is often not sharp enough at x400 - use the fine focus to correct it.', 'Sharp at x400 - you can now see fine cellular detail.', 'Refocus using the coarse and fine focus controls, then observe again.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@onion_id, 1, 'What structures did you observe in the onion cells at high magnification?', 'observation', 5.00),
(@onion_id, 2, 'Explain why a specimen must first be located at low power before switching to a higher magnification.', 'short_answer', 5.00);

-- ---------------------------------------------------------------------------------------------
-- Physics: Investigating Hooke's Law
-- ---------------------------------------------------------------------------------------------
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Investigating Hooke''s Law', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Forces', 'physics', 'intermediate', NULL,
    'To investigate the relationship between the force applied to a spring and its extension.',
    'Hooke''s Law states that the extension of a spring is directly proportional to the force applied, provided the elastic limit is not exceeded (F = kx). In this practical you will mount a spring, load it with a series of known masses, and measure its real extension at each load.',
    'Retort stand, spring, mass pieces (50g, 100g, 150g, 200g), ruler.',
    'None (all apparatus is simulated).',
    'Do not exceed the spring''s safe load - watch for the overload warning and record it as an observation if it appears.',
    '[{"key":"stand1","object_type":"retort_stand","position":{"x":-1.5,"y":0,"z":0},"in_tray":true},{"key":"spring1","object_type":"spring","position":{"x":-1.5,"y":0,"z":0.9},"props":{"natural_length_cm":15,"spring_constant_n_per_m":40,"max_safe_extension_cm":12},"in_tray":true},{"key":"ruler1","object_type":"ruler","position":{"x":1.5,"y":0,"z":0},"in_tray":true},{"key":"mass50","object_type":"mass_piece","position":{"x":0.4,"y":0,"z":1.2},"props":{"mass_g":50},"in_tray":true},{"key":"mass100","object_type":"mass_piece","position":{"x":0.85,"y":0,"z":1.2},"props":{"mass_g":100},"in_tray":true},{"key":"mass150","object_type":"mass_piece","position":{"x":1.3,"y":0,"z":1.2},"props":{"mass_g":150},"in_tray":true},{"key":"mass200","object_type":"mass_piece","position":{"x":1.75,"y":0,"z":1.2},"props":{"mass_g":200},"in_tray":true}]',
    'Based on your Force vs Extension results, does the spring obey Hooke''s Law? Explain, referring to your results table.',
    20.00, 1, 'published'
);

SET @hooke_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Investigating Hooke''s Law' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@hooke_id, 1, 'Pick up the retort stand and set it up on the bench.', 'stand1', 'move', 'stand1', NULL, NULL, 'Stand set up.', 'Click the retort stand in the apparatus tray.', 0),
(@hooke_id, 2, 'Pick up the spring.', 'spring1', 'move', 'spring1', NULL, NULL, 'Spring in hand.', 'Click the spring in the apparatus tray.', 0),
(@hooke_id, 3, 'Mount the spring onto the retort stand''s clamp.', 'spring1', 'move', 'stand1', NULL, 'Drag the spring so it sits close to the retort stand''s arm.', 'Spring mounted vertically.', 'Select the spring and drag it onto the stand.', 0),
(@hooke_id, 4, 'Pick up the ruler.', 'ruler1', 'move', 'ruler1', NULL, NULL, 'Ruler ready.', 'Click the ruler in the apparatus tray.', 0),
(@hooke_id, 5, 'Measure the spring''s original, unloaded length using the ruler.', 'ruler1', 'measure', NULL, NULL, 'Select the ruler, click Measure, then click the spring - the ruler must be close to it.', 'Original length recorded.', 'Select the ruler and use Measure on the spring.', 0),
(@hooke_id, 6, 'Pick up a 50g mass.', 'mass50', 'move', 'mass50', NULL, NULL, '50g mass in hand.', 'Click the 50g mass in the apparatus tray.', 0),
(@hooke_id, 7, 'Hang the 50g mass on the spring.', 'mass50', 'move', 'spring1', NULL, 'Drag the mass so it sits right at the bottom of the spring.', '50g loaded - the spring stretches.', 'Select the 50g mass and drag it onto the spring.', 0),
(@hooke_id, 8, 'Measure the new, stretched length with the ruler.', 'ruler1', 'measure', NULL, NULL, 'The spring is genuinely longer now - re-measure it the same way as before.', 'New length recorded.', 'Select the ruler and use Measure on the spring again.', 0),
(@hooke_id, 9, 'Pick up a 100g mass.', 'mass100', 'move', 'mass100', NULL, NULL, '100g mass in hand.', 'Click the 100g mass in the apparatus tray.', 0),
(@hooke_id, 10, 'Add the 100g mass to the load already on the spring (total 150g).', 'mass100', 'move', 'spring1', NULL, NULL, 'Load increased - masses stack on the spring.', 'Drag the 100g mass onto the spring.', 0),
(@hooke_id, 11, 'Measure the length with 150g on the spring.', 'ruler1', 'measure', NULL, NULL, NULL, 'Length recorded for 150g.', 'Select the ruler and use Measure on the spring.', 0),
(@hooke_id, 12, 'Pick up a 150g mass.', 'mass150', 'move', 'mass150', NULL, NULL, '150g mass in hand.', 'Click the 150g mass in the apparatus tray.', 0),
(@hooke_id, 13, 'Add the 150g mass to the load (total 300g).', 'mass150', 'move', 'spring1', NULL, NULL, 'Load increased to 300g.', 'Drag the 150g mass onto the spring.', 0),
(@hooke_id, 14, 'Measure the length with 300g on the spring.', 'ruler1', 'measure', NULL, NULL, NULL, 'Length recorded for 300g.', 'Select the ruler and use Measure on the spring.', 0),
(@hooke_id, 15, 'Pick up a 200g mass.', 'mass200', 'move', 'mass200', NULL, NULL, '200g mass in hand.', 'Click the 200g mass in the apparatus tray.', 0),
(@hooke_id, 16, 'Add the 200g mass to the load (total 500g).', 'mass200', 'move', 'spring1', NULL, 'Watch for a warning if this exceeds the spring''s safe extension limit.', 'Load increased to 500g.', 'Drag the 200g mass onto the spring.', 0),
(@hooke_id, 17, 'Measure the final length with 500g on the spring.', 'ruler1', 'measure', NULL, NULL, NULL, 'Final length recorded.', 'Select the ruler and use Measure on the spring.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@hooke_id, 1, 'Using your recorded lengths, calculate the extension and force (F = mg) for each load and add them to your Results Table.', 'calculation', 6.00),
(@hooke_id, 2, 'Describe the relationship between force and extension you found. Does it support Hooke''s Law (F = kx)?', 'short_answer', 4.00);

-- ---------------------------------------------------------------------------------------------
-- Physics: Verification of the Laws of Reflection
-- ---------------------------------------------------------------------------------------------
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Verification of the Laws of Reflection', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Light', 'physics', 'intermediate', NULL,
    'To verify that the angle of incidence equals the angle of reflection for a plane mirror.',
    'The Law of Reflection states that when a ray of light strikes a plane mirror, the angle of incidence equals the angle of reflection, both measured from the normal. In this practical you will aim a ray at a mirror and measure both angles yourself with a protractor.',
    'Ray box, plane mirror, protractor.',
    'None (all apparatus is simulated).',
    'In a real lab, never look directly into a light source.',
    '[{"key":"ray_box1","object_type":"ray_box","position":{"x":-1.5,"y":0,"z":0},"in_tray":true},{"key":"mirror1","object_type":"mirror","position":{"x":0.6,"y":0,"z":0},"in_tray":true},{"key":"protractor1","object_type":"protractor","position":{"x":0,"y":0,"z":1.2},"in_tray":true}]',
    'Does your data confirm that the angle of incidence equals the angle of reflection? Explain using your measured values.',
    15.00, 1, 'published'
);

SET @reflect_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Verification of the Laws of Reflection' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@reflect_id, 1, 'Pick up the ray box and place it on the bench.', 'ray_box1', 'move', 'ray_box1', NULL, NULL, 'Ray box placed.', 'Click the ray box in the apparatus tray.', 0),
(@reflect_id, 2, 'Pick up the plane mirror and place it on the bench, facing the ray box.', 'mirror1', 'move', 'mirror1', NULL, 'Rotate the mirror afterwards so its reflective face points back toward the ray box.', 'Mirror placed.', 'Click the mirror in the apparatus tray.', 0),
(@reflect_id, 3, 'Switch on the ray box to produce the incident ray. Move/rotate the ray box and mirror until the ray strikes the mirror.', 'ray_box1', 'switch_on', NULL, NULL, 'The amber ray line only appears once the ray box is aimed so it actually reaches the mirror.', 'Ray produced.', 'Select the ray box and switch it on.', 0),
(@reflect_id, 4, 'Pick up the protractor.', 'protractor1', 'move', 'protractor1', NULL, NULL, 'Protractor in hand.', 'Click the protractor in the apparatus tray.', 0),
(@reflect_id, 5, 'Centre the protractor where the ray meets the mirror and measure the angle of incidence.', 'protractor1', 'measure', NULL, NULL, 'Drag the protractor so its centre crosshair sits exactly where the amber ray touches the mirror.||If the reading will not register, nudge the protractor a little closer.', 'Angle of incidence recorded.', 'Select the protractor, choose Angle of Incidence, then click the mirror.', 0),
(@reflect_id, 6, 'Now measure the angle of reflection with the protractor, still centred on the same point.', 'protractor1', 'measure', NULL, NULL, NULL, 'Angle of reflection recorded.', 'Select the protractor, choose Angle of Reflection / Refraction, then click the mirror.', 0),
(@reflect_id, 7, 'Rotate the ray box to change the angle of the incident ray.', 'ray_box1', 'rotate', NULL, NULL, NULL, 'Ray angle changed.', 'Select the ray box, use Rotate, then click Done.', 0),
(@reflect_id, 8, 'Measure the new angle of incidence.', 'protractor1', 'measure', NULL, NULL, NULL, 'Second angle of incidence recorded.', 'Select the protractor, choose Angle of Incidence, then click the mirror.', 0),
(@reflect_id, 9, 'Measure the new angle of reflection.', 'protractor1', 'measure', NULL, NULL, NULL, 'Second angle of reflection recorded.', 'Select the protractor, choose Angle of Reflection / Refraction, then click the mirror.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@reflect_id, 1, 'Record your two sets of incidence/reflection angle measurements. What do you notice?', 'observation', 4.00),
(@reflect_id, 2, 'State the Law of Reflection in your own words, referring to your measurements.', 'short_answer', 4.00);

-- ---------------------------------------------------------------------------------------------
-- Physics: Refraction Through a Rectangular Glass Block
-- ---------------------------------------------------------------------------------------------
INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Refraction Through a Rectangular Glass Block', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Light', 'physics', 'intermediate', NULL,
    'To observe and measure the refraction of light as it passes into a glass block.',
    'When light passes from air into a denser medium such as glass, it bends towards the normal - described by Snell''s Law. In this practical you will aim a ray at a glass block and measure the real angle of incidence and angle of refraction with a protractor.',
    'Ray box, glass block, protractor.',
    'None (all apparatus is simulated).',
    'In a real lab, never look directly into a light source.',
    '[{"key":"ray_box1","object_type":"ray_box","position":{"x":-1.5,"y":0,"z":0},"in_tray":true},{"key":"block1","object_type":"glass_block","position":{"x":0.6,"y":0,"z":0},"props":{"refractive_index":1.5,"width_cm":6},"in_tray":true},{"key":"protractor1","object_type":"protractor","position":{"x":0,"y":0,"z":1.2},"in_tray":true}]',
    'Based on your measured angles, does the ray bend towards or away from the normal when entering the glass block? Why?',
    15.00, 1, 'published'
);

SET @refract_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Refraction Through a Rectangular Glass Block' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@refract_id, 1, 'Pick up the ray box and place it on the bench.', 'ray_box1', 'move', 'ray_box1', NULL, NULL, 'Ray box placed.', 'Click the ray box in the apparatus tray.', 0),
(@refract_id, 2, 'Pick up the glass block and place it on the bench, facing the ray box.', 'block1', 'move', 'block1', NULL, 'Rotate the block afterwards so one of its faces points back toward the ray box.', 'Glass block placed.', 'Click the glass block in the apparatus tray.', 0),
(@refract_id, 3, 'Switch on the ray box, aimed at the glass block, to produce the incident ray.', 'ray_box1', 'switch_on', NULL, NULL, 'The amber ray only appears once the ray box is aimed so it actually reaches the block.', 'Ray produced.', 'Select the ray box and switch it on.', 0),
(@refract_id, 4, 'Pick up the protractor.', 'protractor1', 'move', 'protractor1', NULL, NULL, 'Protractor in hand.', 'Click the protractor in the apparatus tray.', 0),
(@refract_id, 5, 'Centre the protractor where the ray enters the block and measure the angle of incidence.', 'protractor1', 'measure', NULL, NULL, 'Drag the protractor so its centre crosshair sits exactly where the amber ray meets the block.', 'Angle of incidence recorded.', 'Select the protractor, choose Angle of Incidence, then click the glass block.', 0),
(@refract_id, 6, 'Now measure the angle of refraction inside the block.', 'protractor1', 'measure', NULL, NULL, 'This bent ray should read a smaller angle than the incidence you just measured - it has bent toward the normal.', 'Angle of refraction recorded.', 'Select the protractor, choose Angle of Reflection / Refraction, then click the glass block.', 0),
(@refract_id, 7, 'Rotate the ray box to change the angle of the incident ray.', 'ray_box1', 'rotate', NULL, NULL, NULL, 'Ray angle changed.', 'Select the ray box, use Rotate, then click Done.', 0),
(@refract_id, 8, 'Measure the new angle of incidence.', 'protractor1', 'measure', NULL, NULL, NULL, 'Second angle of incidence recorded.', 'Select the protractor, choose Angle of Incidence, then click the glass block.', 0),
(@refract_id, 9, 'Measure the new angle of refraction.', 'protractor1', 'measure', NULL, NULL, NULL, 'Second angle of refraction recorded.', 'Select the protractor, choose Angle of Reflection / Refraction, then click the glass block.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@refract_id, 1, 'Using Snell''s Law (n = sin(incidence) / sin(refraction)), calculate the refractive index from one of your readings.', 'calculation', 6.00),
(@refract_id, 2, 'Explain why the ray bends as it enters the glass block.', 'short_answer', 4.00);
