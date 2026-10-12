-- New admin-curated template: "Determining the Mass of a Metre Rule Using the Principle of Moments"
-- (O'Level Physics Practical Workbook, Item 5). A separate experiment - no existing practical is changed.
--
-- Rendered by VirtualLabSceneRuleMass.vue (render_component 'metre_rule_mass'): the rule hangs from the
-- retort stand's clamp by a thread loop (the pivot P) the student slides it through; its own weight acts
-- at its centre of gravity C - hidden in the rule's props: mass 86 g, C at 49.6 cm - and the 100 g mass
-- hangs at mark a. The rule tilts by the net moment about P and readings are only taken once it is level.
-- The student balances the rule alone (C), then with the mass at 10.0, 15.0, 20.0, 25.0 and 30.0 cm
-- records P each time. Below the lab (VirtualLabRuleMassAnalysis.vue): the results table (a, P,
-- x = P - a, z = C - P), a graph of x against z plotted by the student (gradient s = M/100, M = 100 s),
-- the conclusion and an assessment. Practical Brief: VirtualLabRuleMassBrief.vue. Safe to re-run.

INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`, `render_mode`, `render_component`, `template_key`, `template_version`)
SELECT
    'Determining the Mass of a Metre Rule Using the Principle of Moments', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Moments and Equilibrium', 'physics', 'intermediate', NULL,
    'To determine the mass of a metre rule using the principle of moments, without a balance.',
    'In a certain school, thieves broke into a school science laboratory and stole all the mass measuring balances. The next morning, students were to do a physics practical assessment involving an investigation that required using metre rules of mass 70 g to 120 g.\nThere is no time for the Headteacher to buy new mass-measuring instruments. The neighbouring school has just started and they have always come to borrow instruments, so they cannot run to them. The assessment cannot be postponed and no alternative question can be given.\nThe only way out is to measure the masses of the metre rules in the laboratory using other possible means. The laboratory assistant was tasked by the Headteacher to improvise a way of measuring the masses of the metre rules so that the learners can use them. Unfortunately, the metre rules are many - and the laboratory assistant has called you for help.',
    '1 metre rule, 1 mass of 100 g, 1 100 g mass hanger, 1 retort stand with a clamp, and 1 piece of thread of about 50 cm long.',
    'None (all apparatus is simulated).',
    'Make sure the retort stand is stable before hanging the rule; let the rule come to rest before reading it, and do not swing the loaded rule.',
    '[{"key":"stand1","object_type":"retort_stand","position":{"x":-0.4,"y":0,"z":0},"in_tray":true},{"key":"rule1","object_type":"metre_rule","position":{"x":0,"y":0,"z":0.2},"props":{"mass_g":86,"cg_cm":49.6},"in_tray":true},{"key":"mass1","object_type":"mass_piece","position":{"x":0.3,"y":0,"z":0.2},"props":{"mass_g":100},"in_tray":true}]',
    'State the mass of the metre rule you found, with its unit.',
    30.00, 1, 'published', '2d', 'metre_rule_mass', 'physics_metre_rule_mass_moments', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'physics_metre_rule_mass_moments');

SET @rm_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'physics_metre_rule_mass_moments' LIMIT 1);

-- Steps are only (re)written while no student has an attempt on this experiment, so re-running can
-- never disturb work in progress.
DELETE s FROM `virtual_lab_steps` s
WHERE s.`experiment_id` = @rm_id
  AND NOT EXISTS (SELECT 1 FROM `virtual_lab_attempts` att INNER JOIN `virtual_lab_assignments` a ON a.id = att.assignment_id WHERE a.experiment_id = @rm_id);
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`)
SELECT * FROM (
SELECT 0 AS e, 0 AS n, '' AS i, NULL AS t, '' AS r, NULL AS v, NULL AS tol, '' AS h, '' AS fc, '' AS fi, 0 AS sc FROM DUAL WHERE 1 = 0
UNION ALL SELECT @rm_id, 1, 'Set up the apparatus: take the retort stand, the metre rule and the 100 g mass from the tray and put them on the bench.', NULL, 'move', 'apparatus_ready', NULL, 'Click each item in the apparatus tray.', 'All the apparatus is on the bench.', 'Take the remaining apparatus from the tray.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 2, 'Hang the metre rule from the clamp of the retort stand using the thread loop.', 'rule1', 'move', 'stand1', NULL, 'Drag the metre rule up to the clamp of the retort stand.', 'The rule hangs from the thread loop - this is the pivot.', 'Drag the rule to the retort stand''s clamp.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 3, 'With nothing else on the rule, slide it through the thread loop until it balances level. Then measure and record the position of the thread loop - this is the centre of gravity C of the rule.', 'rule1', 'measure', NULL, NULL, 'Use the pivot buttons (or drag the rule sideways) until the indicator says "Balanced - level", then click Measure and Record.||The rule tilts down on the side where there is more of its weight - move the loop towards that side.', 'C recorded - the whole weight of the rule acts here.', 'Balance the rule alone, then measure the position of the loop.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 4, 'Hang the 100 g mass from a thread at the 10.0 cm mark of the rule.', 'mass1', 'move', '10.0', 0.05, 'Drag the mass under the rule, then use the mass buttons to set it exactly on the mark.', 'The mass hangs at the 10.0 cm mark.', 'Hang the mass at exactly the 10.0 cm mark.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 5, 'Slide the rule through the loop until it balances level again, then measure and record the position of the pivot P.', 'rule1', 'measure', NULL, NULL, 'The mass pulls the 0 cm side down - move the loop towards the mass until the rule is level, then Measure and Record.', 'Balance point P recorded.', 'Balance the rule, then measure the position of the pivot.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 6, 'Hang the 100 g mass from a thread at the 15.0 cm mark of the rule.', 'mass1', 'move', '15.0', 0.05, 'Drag the mass under the rule, then use the mass buttons to set it exactly on the mark.', 'The mass hangs at the 15.0 cm mark.', 'Hang the mass at exactly the 15.0 cm mark.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 7, 'Slide the rule through the loop until it balances level again, then measure and record the position of the pivot P.', 'rule1', 'measure', NULL, NULL, 'The mass pulls the 0 cm side down - move the loop towards the mass until the rule is level, then Measure and Record.', 'Balance point P recorded.', 'Balance the rule, then measure the position of the pivot.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 8, 'Hang the 100 g mass from a thread at the 20.0 cm mark of the rule.', 'mass1', 'move', '20.0', 0.05, 'Drag the mass under the rule, then use the mass buttons to set it exactly on the mark.', 'The mass hangs at the 20.0 cm mark.', 'Hang the mass at exactly the 20.0 cm mark.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 9, 'Slide the rule through the loop until it balances level again, then measure and record the position of the pivot P.', 'rule1', 'measure', NULL, NULL, 'The mass pulls the 0 cm side down - move the loop towards the mass until the rule is level, then Measure and Record.', 'Balance point P recorded.', 'Balance the rule, then measure the position of the pivot.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 10, 'Hang the 100 g mass from a thread at the 25.0 cm mark of the rule.', 'mass1', 'move', '25.0', 0.05, 'Drag the mass under the rule, then use the mass buttons to set it exactly on the mark.', 'The mass hangs at the 25.0 cm mark.', 'Hang the mass at exactly the 25.0 cm mark.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 11, 'Slide the rule through the loop until it balances level again, then measure and record the position of the pivot P.', 'rule1', 'measure', NULL, NULL, 'The mass pulls the 0 cm side down - move the loop towards the mass until the rule is level, then Measure and Record.', 'Balance point P recorded.', 'Balance the rule, then measure the position of the pivot.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 12, 'Hang the 100 g mass from a thread at the 30.0 cm mark of the rule.', 'mass1', 'move', '30.0', 0.05, 'Drag the mass under the rule, then use the mass buttons to set it exactly on the mark.', 'The mass hangs at the 30.0 cm mark.', 'Hang the mass at exactly the 30.0 cm mark.', 0 FROM DUAL
UNION ALL SELECT @rm_id, 13, 'Slide the rule through the loop until it balances level again, then measure and record the position of the pivot P. All readings are taken - complete the results table below, then plot x against z.', 'rule1', 'measure', NULL, NULL, 'The mass pulls the 0 cm side down - move the loop towards the mass until the rule is level, then Measure and Record.', 'All balance points recorded. Now complete the table and plot x against z.', 'Balance the rule, then measure the position of the pivot.', 0 FROM DUAL
) AS new_steps
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_steps` WHERE `experiment_id` = @rm_id);

-- Shared with the physics department (the department that owns its subject) so its teachers can use
-- and publish it. Only while it has no departments yet - re-running never undoes the admin's choice.
INSERT IGNORE INTO `virtual_lab_experiment_departments` (`experiment_id`, `department_id`)
SELECT e.id, s.department_id
FROM `virtual_lab_experiments` e
INNER JOIN `subjects` s ON s.id = e.subject_id
WHERE e.id = @rm_id AND s.department_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM `virtual_lab_experiment_departments` x WHERE x.experiment_id = e.id);

INSERT INTO `virtual_lab_graph_configs` (`experiment_id`, `enabled`, `title`, `x_column`, `y_column`, `x_label`, `y_label`, `graph_type`, `allow_axis_change`, `min_points`, `show_best_fit`, `manual_plot`)
VALUES (@rm_id, 1, 'x against z', 'z_cm', 'x_cm', 'z (cm)', 'x (cm)', 'scatter', 0, 5, 1, 0)
ON DUPLICATE KEY UPDATE `enabled` = VALUES(`enabled`), `title` = VALUES(`title`), `x_column` = VALUES(`x_column`), `y_column` = VALUES(`y_column`),
    `x_label` = VALUES(`x_label`), `y_label` = VALUES(`y_label`), `graph_type` = VALUES(`graph_type`), `allow_axis_change` = VALUES(`allow_axis_change`),
    `min_points` = VALUES(`min_points`), `show_best_fit` = VALUES(`show_best_fit`), `manual_plot` = VALUES(`manual_plot`);
