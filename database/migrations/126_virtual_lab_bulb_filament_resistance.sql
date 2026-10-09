-- New admin-curated template: "Determining the resistance of a torch-bulb filament"
-- (O-Level Physics practical: two dry cells, switch K, constantan wire P (SWG 28) on a metre rule
-- selected by two crocodile clips, torch bulb, 0-1 A ammeter in series and 0-3 V voltmeter across the
-- bulb). Bespoke 3D scene: VirtualLabSceneBulbResistance.vue, render_component 'bulb_filament_resistance'.
--
-- The circuit is genuinely simulated (bulbCircuitEngine.ts): the student wires terminals with leads,
-- and the readings come from nodal analysis of whatever they wired - cells with internal resistance,
-- wire P of resistance 4.4 ohm/m x the clip length x, a filament whose resistance rises as it heats
-- (and cools again with K open), and the two meters. A voltmeter in series starves the circuit, an
-- ammeter across the bulb shorts it, reversed meters read below zero.
--
-- The student reads the analogue meters and TYPES each reading (never auto-filled); a typed value
-- far from the needle is refused. Each finished V/I pair becomes a result_row {x_m, current_a,
-- voltage_v} - the student's own values - plus a 'Meter reading x = ...' calculation entry holding
-- what the meters really showed. The practical notebook (VirtualLabBulbResistanceAnalysis.vue) then
-- takes the student through an editable results table, choosing the axes (I against V), plotting
-- the points by hand, drawing a best-fit line, picking two points for the gradient s = dI/dV,
-- R = 1/s, the conclusion, errors and precautions, and a 16-criterion automatic assessment saved as
-- a 'Bulb analysis' calculation entry (shown to the teacher when grading).
--
-- Bulb props: cold_resistance_ohm (1.1 here - hot it reads ~1.15-1.2 ohm, close to but above the
-- 1 ohm hypothesis, consistent with the technician's suspicion). The tray holds only this practical's
-- own apparatus; the student picks each item and puts it down on the bench themselves. Safe to re-run.

INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('cell_holder', 'Two Dry Cells in a Double-Cell Holder', 'physics', 'Two 1.5 V dry cells in series in a double-cell holder, giving about 3 V. Partly used cells have a noticeable internal resistance, so the voltage they deliver falls as more current is drawn.', '{"emf_v": 3.0, "internal_resistance_ohm": 1.2}', '["move","connect","inspect"]', '🔋'),
('constantan_wire', 'Constantan Wire (SWG 28)', 'physics', 'Bare constantan resistance wire, standard wire gauge 28 (about 0.38 mm diameter). Constantan''s resistance hardly changes with temperature, about 4.4 ohm per metre for this gauge, so the length of wire in a circuit sets its resistance: R is proportional to length.', '{"ohm_per_m": 4.4}', '["move","connect","measure","inspect"]', '〰️'),
('crocodile_clip', 'Crocodile Clips (pair)', 'physics', 'Spring-loaded clips with insulated sleeves, used to make a temporary connection to a bare wire. Sliding one along a resistance wire changes the length of wire in the circuit.', '{}', '["move","connect","inspect"]', '🐊'),
('sellotape', 'Sellotape', 'physics', 'Clear adhesive tape, used to hold a bare wire flat and straight along a metre rule.', '{}', '["move","inspect"]', '🩹'),
('torch_bulb', 'Torch Bulb in Holder', 'physics', 'A small filament lamp of the kind used in torches, screwed into a holder with two terminals. Its tungsten filament glows when current flows, and its resistance rises as it gets hotter.', '{"cold_resistance_ohm": 1.1}', '["move","connect","switch_on","switch_off","inspect"]', '💡')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `default_props` = VALUES(`default_props`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`),
    `is_active` = 1;

INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`, `render_mode`, `render_component`, `template_key`, `template_version`)
SELECT
    'Determining the Resistance of a Torch-Bulb Filament', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Current Electricity: Resistance', 'physics', 'intermediate', NULL,
    'To determine the resistance of the filament of a simple torch bulb.',
    'A school was supplied with bulbs for laboratory use. When the laboratory technician tested the bulbs, he found that although they could light when connected to two dry cells, they produced a dim light.\nHe tested some older bulbs that had been supplied earlier and compared the results with the newer bulbs. The technician noticed that the newer bulbs did not have specifications on them and that their filaments were not the same size as those of the older bulbs. This made him suspect that the filaments of the newer bulbs might not have the recommended resistance.\nBecause the technician was busy, he selected one of the bulbs and gave it to a learner to determine the resistance of its filament.\nAs that learner, you must carry out a scientific investigation to determine the resistance of the torch-bulb filament.',
    'Two dry cells, ammeter (0-1 A), voltmeter (0-3 V), one torch bulb, constantan wire (SWG 28), connecting wires, one switch, one metre rule, two pieces of Sellotape, two crocodile clips, double-cell holder.',
    'None (all apparatus is simulated).',
    'Open switch K as soon as each pair of readings is taken - the filament heats up and the cells run down while current flows. Make firm connections, and never connect an ammeter directly across the cells.',
    '[{"key":"cells1","object_type":"cell_holder","position":{"x":-0.4,"y":0,"z":-0.08},"in_tray":true},{"key":"switch1","object_type":"switch","position":{"x":-0.16,"y":0,"z":-0.08},"in_tray":true},{"key":"ammeter1","object_type":"ammeter","position":{"x":0.35,"y":0,"z":-0.08},"props":{"label":"Ammeter (0-1 A)","range":1},"in_tray":true},{"key":"rule1","object_type":"metre_rule","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"bulb1","object_type":"torch_bulb","position":{"x":0.09,"y":0,"z":-0.08},"props":{"cold_resistance_ohm":1.1},"in_tray":true},{"key":"wireP","object_type":"constantan_wire","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"voltmeter1","object_type":"voltmeter","position":{"x":0.09,"y":0,"z":-0.26},"props":{"label":"Voltmeter (0-3 V)","range":3},"in_tray":true},{"key":"clips1","object_type":"crocodile_clip","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"tape1","object_type":"sellotape","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"leads1","object_type":"wire","position":{"x":0.62,"y":0,"z":0.2},"props":{"label":"Connecting Wires"},"in_tray":true}]',
    'State the resistance of the torch-bulb filament you found and compare it with the hypothesised value of about 1 ohm.',
    40.00, 1, 'published', '2d', 'bulb_filament_resistance', 'physics_bulb_filament_resistance', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'physics_bulb_filament_resistance');

SET @bulb_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'physics_bulb_filament_resistance' LIMIT 1);

UPDATE `virtual_lab_experiments`
SET `scene_objects` = '[{"key":"cells1","object_type":"cell_holder","position":{"x":-0.4,"y":0,"z":-0.08},"in_tray":true},{"key":"switch1","object_type":"switch","position":{"x":-0.16,"y":0,"z":-0.08},"in_tray":true},{"key":"ammeter1","object_type":"ammeter","position":{"x":0.35,"y":0,"z":-0.08},"props":{"label":"Ammeter (0-1 A)","range":1},"in_tray":true},{"key":"rule1","object_type":"metre_rule","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"bulb1","object_type":"torch_bulb","position":{"x":0.09,"y":0,"z":-0.08},"props":{"cold_resistance_ohm":1.1},"in_tray":true},{"key":"wireP","object_type":"constantan_wire","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"voltmeter1","object_type":"voltmeter","position":{"x":0.09,"y":0,"z":-0.26},"props":{"label":"Voltmeter (0-3 V)","range":3},"in_tray":true},{"key":"clips1","object_type":"crocodile_clip","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"tape1","object_type":"sellotape","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"leads1","object_type":"wire","position":{"x":0.62,"y":0,"z":0.2},"props":{"label":"Connecting Wires"},"in_tray":true}]'
WHERE `id` = @bulb_id;

DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @bulb_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@bulb_id, 1, 'Take each piece of apparatus from the tray and put it down on the bench where you want it.', NULL, 'move', 'apparatus_ready', NULL, 'Click an item in the tray, then click on the bench to put it down.||Put the metre rule down before the constantan wire, crocodile clips and Sellotape - they go onto the rule.', 'All the apparatus is on the bench.', 'Pick up the remaining apparatus from the tray.', 0),
(@bulb_id, 2, 'Fix the bare constantan wire P along the metre rule using the two pieces of Sellotape.', 'wireP', 'move', 'taped', NULL, 'Click the dashed orange marks at each end of the wire.', 'Wire P is fixed straight along the metre rule.', 'Click both dashed marks at the ends of wire P.', 0),
(@bulb_id, 3, 'Connect the two cells, switch K, wire P (through the two crocodile clips), the torch bulb and the ammeter in one series loop. Make sure the ammeter is connected in series, with its + (red) terminal towards the cells'' + terminal.', NULL, 'connect', 'series_loop', NULL, 'Drag from one brass terminal to another to connect a lead.||Follow the loop in the setup diagram: cells + to K, K to one clip, the other clip to the bulb, the bulb to the ammeter +, ammeter - back to the cells -.', 'Series loop complete - the ammeter is in series.', 'The series loop is not complete yet.', 0),
(@bulb_id, 4, 'Connect the voltmeter across the torch bulb (in parallel with it), + terminal on the side nearer the cells'' + terminal.', NULL, 'connect', 'voltmeter_across_bulb', NULL, 'Join one voltmeter terminal to each terminal of the bulb holder.', 'The voltmeter is connected across the bulb.', 'Connect the voltmeter across the bulb.', 0),
(@bulb_id, 5, 'With K open, move the crocodile clip so the effective length of wire is x = 0.200 m.', 'clip2', 'move', '0.200', 0.002, 'Drag the red crocodile clip, or use the -10 mm / -1 mm buttons on the Lab Bench panel.', 'x = 0.200 m.', 'Set x to exactly 0.200 m.', 0),
(@bulb_id, 6, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed - current flows and the bulb lights.', 'Close switch K now.', 0),
(@bulb_id, 7, 'Allow the readings to stabilise, then read the voltmeter. Type your reading of V and click Record V.', 'voltmeter1', 'measure', NULL, NULL, 'Wait until the needle stops moving.||Read with your eye directly above the needle; each small division on the 0-3 V scale is 0.1 V.', 'Voltmeter reading recorded.', 'Record the voltmeter reading next.', 0),
(@bulb_id, 8, 'Read the ammeter. Type your reading of I and click Record I.', 'ammeter1', 'measure', NULL, NULL, 'Each small division on the 0-1 A scale is 0.02 A.', 'Ammeter reading recorded.', 'Record the ammeter reading next.', 0),
(@bulb_id, 9, 'Open switch K immediately, to reduce unnecessary heating of the bulb and voltage drop of the cells.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'K is open - the bulb is cooling.', 'Open switch K now.', 0),
(@bulb_id, 10, 'Allow the bulb to cool, then change the wire length to x = 0.300 m.', 'clip2', 'move', '0.300', 0.002, 'Wait for the filament bar to show Cool, then move the clip.', 'x = 0.300 m.', 'Set x to exactly 0.300 m.', 0),
(@bulb_id, 11, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed.', 'Close switch K now.', 0),
(@bulb_id, 12, 'When the readings have stabilised, read and record the voltmeter reading V.', 'voltmeter1', 'measure', NULL, NULL, 'Wait until the needle stops moving, then read it.', 'Voltmeter reading recorded.', 'Record the voltmeter reading next.', 0),
(@bulb_id, 13, 'Read and record the ammeter reading I.', 'ammeter1', 'measure', NULL, NULL, 'Read the needle against the 0-1 A scale.', 'Ammeter reading recorded.', 'Record the ammeter reading next.', 0),
(@bulb_id, 14, 'Open switch K immediately.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'K is open.', 'Open switch K now.', 0),
(@bulb_id, 15, 'Allow the bulb to cool, then change the wire length to x = 0.400 m.', 'clip2', 'move', '0.400', 0.002, 'Move the clip with K open.', 'x = 0.400 m.', 'Set x to exactly 0.400 m.', 0),
(@bulb_id, 16, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed.', 'Close switch K now.', 0),
(@bulb_id, 17, 'When the readings have stabilised, read and record the voltmeter reading V.', 'voltmeter1', 'measure', NULL, NULL, 'Wait until the needle stops moving, then read it.', 'Voltmeter reading recorded.', 'Record the voltmeter reading next.', 0),
(@bulb_id, 18, 'Read and record the ammeter reading I.', 'ammeter1', 'measure', NULL, NULL, 'Read the needle against the 0-1 A scale.', 'Ammeter reading recorded.', 'Record the ammeter reading next.', 0),
(@bulb_id, 19, 'Open switch K immediately.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'K is open.', 'Open switch K now.', 0),
(@bulb_id, 20, 'Allow the bulb to cool, then change the wire length to x = 0.500 m.', 'clip2', 'move', '0.500', 0.002, 'Move the clip with K open.', 'x = 0.500 m.', 'Set x to exactly 0.500 m.', 0),
(@bulb_id, 21, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed.', 'Close switch K now.', 0),
(@bulb_id, 22, 'When the readings have stabilised, read and record the voltmeter reading V.', 'voltmeter1', 'measure', NULL, NULL, 'Wait until the needle stops moving, then read it.', 'Voltmeter reading recorded.', 'Record the voltmeter reading next.', 0),
(@bulb_id, 23, 'Read and record the ammeter reading I.', 'ammeter1', 'measure', NULL, NULL, 'Read the needle against the 0-1 A scale.', 'Ammeter reading recorded.', 'Record the ammeter reading next.', 0),
(@bulb_id, 24, 'Open switch K immediately.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'K is open.', 'Open switch K now.', 0),
(@bulb_id, 25, 'Allow the bulb to cool, then change the wire length to x = 0.600 m.', 'clip2', 'move', '0.600', 0.002, 'Move the clip with K open.', 'x = 0.600 m.', 'Set x to exactly 0.600 m.', 0),
(@bulb_id, 26, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed.', 'Close switch K now.', 0),
(@bulb_id, 27, 'When the readings have stabilised, read and record the voltmeter reading V.', 'voltmeter1', 'measure', NULL, NULL, 'Wait until the needle stops moving, then read it.', 'Voltmeter reading recorded.', 'Record the voltmeter reading next.', 0),
(@bulb_id, 28, 'Read and record the ammeter reading I.', 'ammeter1', 'measure', NULL, NULL, 'Read the needle against the 0-1 A scale.', 'Ammeter reading recorded.', 'Record the ammeter reading next.', 0),
(@bulb_id, 29, 'Open switch K. All five readings are taken - go to your Practical Notebook to complete the results table, plot I against V, and find the gradient and the resistance.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'All readings taken. Now analyse them in your notebook.', 'Open switch K now.', 0);

INSERT INTO `virtual_lab_graph_configs` (`experiment_id`, `enabled`, `title`, `x_column`, `y_column`, `x_label`, `y_label`, `graph_type`, `allow_axis_change`, `min_points`, `show_best_fit`, `manual_plot`)
VALUES (@bulb_id, 1, 'Current, I against voltage, V', 'voltage_v', 'current_a', 'Voltage, V (V)', 'Current, I (A)', 'scatter', 0, 5, 1, 0)
ON DUPLICATE KEY UPDATE `enabled` = VALUES(`enabled`), `title` = VALUES(`title`), `x_column` = VALUES(`x_column`), `y_column` = VALUES(`y_column`),
    `x_label` = VALUES(`x_label`), `y_label` = VALUES(`y_label`), `graph_type` = VALUES(`graph_type`), `allow_axis_change` = VALUES(`allow_axis_change`),
    `min_points` = VALUES(`min_points`), `show_best_fit` = VALUES(`show_best_fit`), `manual_plot` = VALUES(`manual_plot`);
