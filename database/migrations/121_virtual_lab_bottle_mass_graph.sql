-- Adds the results-table-and-graph requirement to "Finding the Mass of a Bottle Using the
-- Principle of Moments" (migrations 119-120): three trials at different hanger/bottle positions,
-- each balanced pair (d, y) auto-recorded as a Results Table row (frontend watch on
-- lastMomentsD/lastMomentsY in VirtualLabExperiment.vue), then a graph of d against y - since
-- 50*d = mb*y means d = (mb/50)*y, a straight line through the origin whose gradient is mb/50.
-- Mirrors the exact pattern migration 107 used to add a third pendulum trial + graph.

SET @bottle_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Finding the Mass of a Bottle Using the Principle of Moments' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@bottle_id, 10, 'For a second trial: slide the hanger to a new position on the rule, then slide the bottle until it balances level again. Measure the new distance d to the hanger.', 'rule1', 'measure', NULL, NULL, 'Select the rule, choose Measure, then click the hanger.', 'Second trial''s distance d recorded.', 'Select the rule and use Measure on the hanger.', 0),
(@bottle_id, 11, 'Now measure the bottle''s distance y for this second trial.', 'rule1', 'measure', NULL, NULL, 'Select the rule, choose Measure, then click the bottle.', 'Second trial recorded - it has been added to your Results Table.', 'Select the rule and use Measure on the bottle.', 0),
(@bottle_id, 12, 'For a third trial: slide the hanger to a new position again, rebalance the bottle, then measure the new distance d.', 'rule1', 'measure', NULL, NULL, 'Three different positions give three points on your graph.', 'Third trial''s distance d recorded.', 'Select the rule and use Measure on the hanger.', 0),
(@bottle_id, 13, 'Measure the bottle''s distance y for this third trial. Then plot d against y in your notebook - your graph now has three points.', 'rule1', 'measure', NULL, NULL, 'Select the rule, choose Measure, then click the bottle.', 'Third trial recorded - your graph now has three points.', 'Select the rule and use Measure on the bottle.', 0);

INSERT INTO `virtual_lab_graph_configs` (`experiment_id`, `enabled`, `title`, `x_column`, `y_column`, `x_label`, `y_label`, `graph_type`, `allow_axis_change`, `min_points`, `show_best_fit`, `manual_plot`)
VALUES (@bottle_id, 1, 'Distance to hanger against distance to bottle', 'y_cm', 'd_cm', 'Distance y to the bottle (cm)', 'Distance d to the 50g hanger (cm)', 'scatter', 0, 3, 1, 0);

UPDATE `virtual_lab_questions`
SET `question_text` = 'Plot a graph of d (y-axis) against y (x-axis) from your three trials - it should be a straight line through the origin, since 50 x d = mb x y means d = (mb/50) x y. Find the gradient of your line of best fit, then use mb = 50 x gradient to calculate the mass of the sample bottle in grams.',
    `stage` = 'after_experiment', `requirement` = 'notebook_only', `linked_to_graph` = 1
WHERE `experiment_id` = @bottle_id AND `question_number` = 1;
