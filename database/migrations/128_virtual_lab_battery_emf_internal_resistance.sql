-- New admin-curated template: "Determination of Internal Resistance and EMF of a Battery"
-- (Physics Practical Workbook). A separate experiment - no existing electricity practical is changed.
--
-- Reuses the torch-bulb bench (VirtualLabSceneBulbResistance.vue) under render_component
-- 'battery_internal_resistance'. With no torch bulb among its apparatus that scene switches to its
-- battery set-up: the loop is cells - K - ammeter - constantan wire P (clips), the voltmeter goes across
-- the battery (terminal voltage V), lengths are 10.0-50.0 cm (wire prop target_lengths_m) and readings
-- come from the circuit solver: two dry cells with a hidden emf 3.0 V and internal resistance 2.8 ohm
-- (cell_holder props - partly used cells, which keeps the current inside the 0-1 A ammeter), wire P at
-- 4.4 ohm/m, so V = E - Ir: l = 10 cm gives I about 0.91 A, V about 0.45 V; l = 50 cm I about 0.59 A,
-- V about 1.34 V. The student types each reading (never auto-filled; a value far from the needle is refused).
--
-- Below the lab (VirtualLabEmfAnalysis.vue): the standard variables (collapsed), the results table
-- (l, I, V - editable), a V against I graph plotted by the student (VirtualLabStudentGraph.vue: axes,
-- points, best-fit line, two points, s = dV/dI, r = -s, then E read from the V-axis intercept), the
-- conclusion and a 16-criterion assessment. Errors and precautions are not shown (as for all practicals).
-- Safe to re-run.

INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`, `render_mode`, `render_component`, `template_key`, `template_version`)
SELECT
    'Determination of Internal Resistance and EMF of a Battery', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Current Electricity: EMF and internal resistance', 'physics', 'intermediate', NULL,
    'To determine the internal resistance and electromotive force (emf) of a battery.',
    'A school laboratory technician keeps several battery packs that are used to power electrical equipment. When she checks them, she notices something puzzling: the voltage measured across a battery is not fixed - it changes when different loads are connected to it, and drops when the battery supplies more current.\nShe suspects the batteries have internal resistance: some of their energy is used up driving current through the cells themselves, so less voltage is left at the terminals when more current flows.\nA Physics learner is asked to investigate whether the battery has internal resistance and to determine (1) the internal resistance of the battery and (2) its electromotive force (emf). The learner uses a variable length of constantan wire as the external load, and investigates how the terminal voltage changes with the current.',
    'Two dry cells, double cell holder, one switch, connecting wires (about 20 cm each), one metre rule, constantan wire SWG 28 (about 110 cm), two pieces of Sellotape, two crocodile clips, one voltmeter (0-3 V), one ammeter (0-1 A).',
    'None (all apparatus is simulated).',
    'Close switch K only while taking readings and open it straight afterwards; make all connections firm; never connect the ammeter directly across the cells.',
    '[{"key":"cells1","object_type":"cell_holder","position":{"x":-0.4,"y":0,"z":-0.08},"props":{"emf_v":3,"internal_resistance_ohm":2.8},"in_tray":true},{"key":"switch1","object_type":"switch","position":{"x":-0.16,"y":0,"z":-0.08},"in_tray":true},{"key":"ammeter1","object_type":"ammeter","position":{"x":0.35,"y":0,"z":-0.08},"props":{"label":"Ammeter (0-1 A)","range":1},"in_tray":true},{"key":"rule1","object_type":"metre_rule","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"wireP","object_type":"constantan_wire","position":{"x":0,"y":0,"z":0.13},"props":{"target_lengths_m":[0.1,0.2,0.3,0.4,0.5]},"in_tray":true},{"key":"voltmeter1","object_type":"voltmeter","position":{"x":-0.4,"y":0,"z":-0.26},"props":{"label":"Voltmeter (0-3 V)","range":3},"in_tray":true},{"key":"clips1","object_type":"crocodile_clip","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"tape1","object_type":"sellotape","position":{"x":0,"y":0,"z":0.13},"in_tray":true},{"key":"leads1","object_type":"wire","position":{"x":0.62,"y":0,"z":0.2},"props":{"label":"Connecting Wires"},"in_tray":true}]',
    'State the internal resistance and the emf of the battery you found, with their units.',
    40.00, 1, 'published', '2d', 'battery_internal_resistance', 'physics_battery_emf_internal_resistance', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'physics_battery_emf_internal_resistance');

SET @emf_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'physics_battery_emf_internal_resistance' LIMIT 1);

DELETE FROM `virtual_lab_steps` WHERE `experiment_id` = @emf_id;
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@emf_id, 1, 'Set up the circuit: take each piece of apparatus from the tray and put it down on the bench.', NULL, 'move', 'apparatus_ready', NULL, 'Click an item in the tray, then click on the bench.||Put the metre rule down before the constantan wire, crocodile clips and Sellotape.', 'All the apparatus is on the bench.', 'Put the remaining apparatus on the bench.', 0),
(@emf_id, 2, 'Fix the constantan wire along the metre rule using the two pieces of Sellotape.', 'wireP', 'move', 'taped', NULL, 'Click the dashed orange marks at each end of the wire.', 'The wire is fixed along the metre rule.', 'Click both dashed marks at the ends of the wire.', 0),
(@emf_id, 3, 'Connect the two cells, switch K, the ammeter and the constantan wire (through the two crocodile clips) in one series loop. Make sure the ammeter is in series, with its + (red) terminal towards the cells'' + terminal.', NULL, 'connect', 'series_loop', NULL, 'Click a terminal, then the terminal to join it to.||Loop: cells + to K, K to the ammeter +, ammeter - to one crocodile clip, the other clip back to the cells -.', 'Series loop complete - the ammeter is in series.', 'The series loop is not complete yet.', 0),
(@emf_id, 4, 'Connect the voltmeter across the battery terminals: + (red) to the cells'' +, - to the cells'' -.', NULL, 'connect', 'voltmeter_across_battery', NULL, 'Join one voltmeter terminal to each terminal of the cell holder.', 'The voltmeter is across the battery - it measures the terminal voltage V.', 'Connect the voltmeter across the battery.', 0),
(@emf_id, 5, 'With K open, set the effective length of constantan wire to l = 10.0 cm.', 'clip2', 'move', '0.100', 0.002, 'Drag the red crocodile clip along the wire, or use the -10 mm / -1 mm buttons.', 'l = 10.0 cm.', 'Set the length to exactly 10.0 cm.', 0),
(@emf_id, 6, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed - the battery is supplying current.', 'Close switch K now.', 0),
(@emf_id, 7, 'Allow the readings to stabilise, then read the ammeter. Type your reading of the current I and click Record I.', 'ammeter1', 'measure', NULL, NULL, 'Each small division on the 0-1 A scale is 0.02 A.', 'Current recorded.', 'Record the ammeter reading next.', 0),
(@emf_id, 8, 'Read the voltmeter. Type your reading of the terminal voltage V and click Record V.', 'voltmeter1', 'measure', NULL, NULL, 'Each small division on the 0-3 V scale is 0.1 V.', 'Terminal voltage recorded.', 'Record the voltmeter reading next.', 0),
(@emf_id, 9, 'Open switch K after taking the readings.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'K is open.', 'Open switch K now.', 0),
(@emf_id, 10, 'With K open, change the length of the constantan wire to l = 20.0 cm.', 'clip2', 'move', '0.200', 0.002, 'Drag the red crocodile clip along the wire, or use the -10 mm / -1 mm buttons.', 'l = 20.0 cm.', 'Set the length to exactly 20.0 cm.', 0),
(@emf_id, 11, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed - the battery is supplying current.', 'Close switch K now.', 0),
(@emf_id, 12, 'Allow the readings to stabilise, then read the ammeter. Type your reading of the current I and click Record I.', 'ammeter1', 'measure', NULL, NULL, 'Each small division on the 0-1 A scale is 0.02 A.', 'Current recorded.', 'Record the ammeter reading next.', 0),
(@emf_id, 13, 'Read the voltmeter. Type your reading of the terminal voltage V and click Record V.', 'voltmeter1', 'measure', NULL, NULL, 'Each small division on the 0-3 V scale is 0.1 V.', 'Terminal voltage recorded.', 'Record the voltmeter reading next.', 0),
(@emf_id, 14, 'Open switch K after taking the readings.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'K is open.', 'Open switch K now.', 0),
(@emf_id, 15, 'With K open, change the length of the constantan wire to l = 30.0 cm.', 'clip2', 'move', '0.300', 0.002, 'Drag the red crocodile clip along the wire, or use the -10 mm / -1 mm buttons.', 'l = 30.0 cm.', 'Set the length to exactly 30.0 cm.', 0),
(@emf_id, 16, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed - the battery is supplying current.', 'Close switch K now.', 0),
(@emf_id, 17, 'Allow the readings to stabilise, then read the ammeter. Type your reading of the current I and click Record I.', 'ammeter1', 'measure', NULL, NULL, 'Each small division on the 0-1 A scale is 0.02 A.', 'Current recorded.', 'Record the ammeter reading next.', 0),
(@emf_id, 18, 'Read the voltmeter. Type your reading of the terminal voltage V and click Record V.', 'voltmeter1', 'measure', NULL, NULL, 'Each small division on the 0-3 V scale is 0.1 V.', 'Terminal voltage recorded.', 'Record the voltmeter reading next.', 0),
(@emf_id, 19, 'Open switch K after taking the readings.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'K is open.', 'Open switch K now.', 0),
(@emf_id, 20, 'With K open, change the length of the constantan wire to l = 40.0 cm.', 'clip2', 'move', '0.400', 0.002, 'Drag the red crocodile clip along the wire, or use the -10 mm / -1 mm buttons.', 'l = 40.0 cm.', 'Set the length to exactly 40.0 cm.', 0),
(@emf_id, 21, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed - the battery is supplying current.', 'Close switch K now.', 0),
(@emf_id, 22, 'Allow the readings to stabilise, then read the ammeter. Type your reading of the current I and click Record I.', 'ammeter1', 'measure', NULL, NULL, 'Each small division on the 0-1 A scale is 0.02 A.', 'Current recorded.', 'Record the ammeter reading next.', 0),
(@emf_id, 23, 'Read the voltmeter. Type your reading of the terminal voltage V and click Record V.', 'voltmeter1', 'measure', NULL, NULL, 'Each small division on the 0-3 V scale is 0.1 V.', 'Terminal voltage recorded.', 'Record the voltmeter reading next.', 0),
(@emf_id, 24, 'Open switch K after taking the readings.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'K is open.', 'Open switch K now.', 0),
(@emf_id, 25, 'With K open, change the length of the constantan wire to l = 50.0 cm.', 'clip2', 'move', '0.500', 0.002, 'Drag the red crocodile clip along the wire, or use the -10 mm / -1 mm buttons.', 'l = 50.0 cm.', 'Set the length to exactly 50.0 cm.', 0),
(@emf_id, 26, 'Close switch K.', 'switch1', 'switch_on', NULL, NULL, 'Click switch K or the Close K button.', 'K is closed - the battery is supplying current.', 'Close switch K now.', 0),
(@emf_id, 27, 'Allow the readings to stabilise, then read the ammeter. Type your reading of the current I and click Record I.', 'ammeter1', 'measure', NULL, NULL, 'Each small division on the 0-1 A scale is 0.02 A.', 'Current recorded.', 'Record the ammeter reading next.', 0),
(@emf_id, 28, 'Read the voltmeter. Type your reading of the terminal voltage V and click Record V.', 'voltmeter1', 'measure', NULL, NULL, 'Each small division on the 0-3 V scale is 0.1 V.', 'Terminal voltage recorded.', 'Record the voltmeter reading next.', 0),
(@emf_id, 29, 'Open switch K. All five readings are taken - complete the results table below, then plot V against I.', 'switch1', 'switch_off', NULL, NULL, 'Click switch K or the Open K button.', 'All readings taken. Now plot V against I.', 'Open switch K now.', 0);

INSERT INTO `virtual_lab_graph_configs` (`experiment_id`, `enabled`, `title`, `x_column`, `y_column`, `x_label`, `y_label`, `graph_type`, `allow_axis_change`, `min_points`, `show_best_fit`, `manual_plot`)
VALUES (@emf_id, 1, 'Terminal voltage V against current I', 'current_a', 'voltage_v', 'Current, I (A)', 'Terminal voltage, V (V)', 'scatter', 0, 5, 1, 0)
ON DUPLICATE KEY UPDATE `enabled` = VALUES(`enabled`), `title` = VALUES(`title`), `x_column` = VALUES(`x_column`), `y_column` = VALUES(`y_column`),
    `x_label` = VALUES(`x_label`), `y_label` = VALUES(`y_label`), `graph_type` = VALUES(`graph_type`), `allow_axis_change` = VALUES(`allow_axis_change`),
    `min_points` = VALUES(`min_points`), `show_best_fit` = VALUES(`show_best_fit`), `manual_plot` = VALUES(`manual_plot`);
