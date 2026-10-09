-- New admin-curated template: "Determining the Focal Length of a Concave Mirror" - a bespoke 3D
-- scene (VirtualLabSceneConcaveMirror.vue, render_component 'concave_mirror_focus') where the
-- student drags a concave mirror and a focus screen along a metre rule, gets live Blurred/Sharp
-- feedback (the same focus-quality idea the Microscope scene already uses), and can only record a
-- trial once the image is genuinely in focus. Six trials auto-fill a Results Table; the student then
-- plots the graph of uv against (u+v) by hand (VirtualLabStudentGraph.vue) - since uv = f(u+v), a straight line through the origin whose gradient is the
-- mirror's focal length f. Three new apparatus types (concave_mirror, illuminated_object,
-- focus_screen) were added to labObjectFactory.ts and the shared catalog below; the metre rule
-- reuses the existing 'metre_rule' model lying flat instead of suspended. Icons are byte literals
-- (see migration 123's note) so they survive a client that isn't already connected with utf8mb4.

INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('concave_mirror', 'Concave Mirror', 'physics', 'A converging mirror in a clip-on holder - forms a real image of an object placed beyond its focal point.', '{}', '["move","rotate","zoom","inspect"]', _utf8mb4 X'F09FAA9E'),
('illuminated_object', 'Illuminated Object', 'physics', 'A lit arrow-shaped aperture behind a wire gauze - the object whose image a mirror or lens forms.', '{}', '["move","switch_on","switch_off","zoom","inspect"]', _utf8mb4 X'F09F92A1'),
('focus_screen', 'Focus Screen', 'physics', 'A plain card on a stand that catches a real image - sharp only when positioned at the true image distance.', '{}', '["move","zoom","inspect"]', _utf8mb4 X'F09F96BC');

INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`, `render_mode`, `render_component`)
VALUES (
    'Determining the Focal Length of a Concave Mirror', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Light - Curved Mirrors', 'physics', 'intermediate', NULL,
    'To determine the focal length of a concave mirror by measuring object and image distances for several trials and plotting a graph.',
    'Peter noticed his brother using a concave mirror as a shaving mirror - it made his image look bigger than a plane mirror would. When Peter went to buy one himself, the shop could not tell him its focal length. As a physics learner, you will find it yourself: set up an illuminated object and a concave mirror on a metre rule, slide a screen until a sharp image forms, and record the object distance u and image distance v. Repeat for several values of u, then use the mirror relation uv = f(u+v) - a graph of uv against (u+v) is a straight line through the origin whose gradient is the focal length, f.',
    '2 dry cells, a double cell holder, 1 torch bulb, 1 bulb holder, 1 switch, 1 concave mirror, 1 screen with a wire gauze, connecting wires, 1 metre rule, 1 screen.',
    'None extra - all apparatus is simulated.',
    'Keep the object well illuminated and clearly visible; make sure the screen image is sharp and well defined before recording a reading; keep the concave mirror''s polished surface and the object facing each other; keep your eye exactly perpendicular to the metre rule when reading a distance, to avoid parallax error; if the rule''s ends are worn, do not measure from them; use the scale consistently throughout.',
    '[{"key":"object1","object_type":"illuminated_object","position":{"x":-1,"y":0,"z":0.3},"in_tray":true},{"key":"mirror1","object_type":"concave_mirror","position":{"x":1,"y":0,"z":-0.3},"in_tray":true},{"key":"screen1","object_type":"focus_screen","position":{"x":0,"y":0,"z":0.6},"in_tray":true},{"key":"rule1","object_type":"metre_rule","position":{"x":0,"y":0,"z":0},"in_tray":true}]',
    'Explain how the graph of uv against (u+v) let you find the focal length without needing to know it in advance.',
    20.00, 1, 'published', '2d', 'concave_mirror_focus'
);

SET @mirror_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Determining the Focal Length of a Concave Mirror' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@mirror_id, 1, 'Pick up any piece of apparatus from the tray to start setting up the bench.', NULL, 'move', NULL, NULL, 'Click an item in the apparatus tray.', 'Item placed on the bench.', 'Click an item in the apparatus tray.', 0),
(@mirror_id, 2, 'Pick up another piece of apparatus.', NULL, 'move', NULL, NULL, 'Click another item in the apparatus tray.', 'Item placed on the bench.', 'Click an item in the apparatus tray.', 0),
(@mirror_id, 3, 'Pick up another piece of apparatus.', NULL, 'move', NULL, NULL, 'Click another item in the apparatus tray.', 'Item placed on the bench.', 'Click an item in the apparatus tray.', 0),
(@mirror_id, 4, 'Pick up the last piece of apparatus.', NULL, 'move', NULL, NULL, 'Click the last item in the apparatus tray.', 'All apparatus is now on the bench.', 'Click the remaining item in the apparatus tray.', 0),
(@mirror_id, 5, 'Switch on the illuminated object''s lamp.', 'object1', 'switch_on', NULL, NULL, 'Click the illuminated object to switch it on.', 'Lamp on - the arrow is now lit.', 'Click the illuminated object to switch it on.', 0),
(@mirror_id, 6, 'Drag the mirror so it is about 15cm from the object (u is shown live). Slide the screen until the image is sharp, then click Record This Trial.', NULL, 'measure', NULL, NULL, 'Watch the Blurred/Sharp indicator as you slide the screen.', 'First trial recorded - it has been added to your Results Table.', 'Get the image sharp (green dot) before clicking Record.', 0),
(@mirror_id, 7, 'Drag the mirror to about 20cm from the object. Refocus the screen and record again.', NULL, 'measure', NULL, NULL, 'Re-check the indicator - the sharp position moves when u changes.', 'Second trial recorded.', 'Get the image sharp (green dot) before clicking Record.', 0),
(@mirror_id, 8, 'Drag the mirror to about 25cm from the object. Refocus the screen and record again.', NULL, 'measure', NULL, NULL, 'Re-check the indicator - the sharp position moves when u changes.', 'Third trial recorded.', 'Get the image sharp (green dot) before clicking Record.', 0),
(@mirror_id, 9, 'Drag the mirror to about 30cm from the object. Refocus the screen and record again.', NULL, 'measure', NULL, NULL, 'Re-check the indicator - the sharp position moves when u changes.', 'Fourth trial recorded.', 'Get the image sharp (green dot) before clicking Record.', 0),
(@mirror_id, 10, 'Drag the mirror to about 35cm from the object. Refocus the screen and record again.', NULL, 'measure', NULL, NULL, 'Re-check the indicator - the sharp position moves when u changes.', 'Fifth trial recorded.', 'Get the image sharp (green dot) before clicking Record.', 0),
(@mirror_id, 11, 'Drag the mirror to about 40cm from the object. Refocus the screen and record a sixth time. Then plot a graph of uv against (u+v) in your notebook.', NULL, 'measure', NULL, NULL, 'Re-check the indicator - the sharp position moves when u changes.', 'Sixth trial recorded - your graph now has six points.', 'Get the image sharp (green dot) before clicking Record.', 0);

INSERT INTO `virtual_lab_graph_configs` (`experiment_id`, `enabled`, `title`, `x_column`, `y_column`, `x_label`, `y_label`, `graph_type`, `allow_axis_change`, `min_points`, `show_best_fit`, `manual_plot`)
VALUES (@mirror_id, 1, 'uv against (u + v)', 'u_plus_v_cm', 'uv_cm2', '(u + v) (cm)', 'uv (cm squared)', 'scatter', 0, 5, 1, 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `stage`, `requirement`, `linked_to_graph`, `marks`) VALUES
(@mirror_id, 1, 'State the focal length f of the mirror that you found from the gradient of your graph, and say whether your line of best fit passes close to the origin, as uv = f(u+v) predicts.', 'calculation', 'after_experiment', 'notebook_only', 1, 6.00),
(@mirror_id, 2, 'Peter''s brother found his image bigger when using a concave mirror as a shaving mirror, instead of a plane mirror. Using the idea of focal length, explain why holding a concave mirror closer to your face than its focal length produces a bigger, upright image, unlike the smaller, upside-down images you measured in this experiment.', 'short_answer', 'after_experiment', 'notebook_only', 0, 5.00),
(@mirror_id, 3, 'State one precaution you took to avoid parallax error when reading u and v off the metre rule, and explain why it matters.', 'short_answer', 'after_experiment', 'notebook_only', 0, 5.00);
