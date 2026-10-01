-- Simple pendulum templates: students now plot a graph.
-- Each length + timing is recorded in the Results Table automatically (length L, time for the
-- oscillations, period T and T^2), and the graph is T^2 against L - a straight line through the
-- origin whose gradient is 4*pi^2/g, so the line of best fit gives a value of g.
-- A straight line needs at least three points, so both templates get steps for a third length.
-- Only the official templates are changed (found by template_key); teachers' own copies are left
-- as they are (a teacher can switch the graph on for a copy from Edit Experiment > Graph).

-- ---- Simple Pendulum (one length so far): add a second and third length ----------------------
INSERT INTO virtual_lab_steps (experiment_id, step_number, instruction, target_object_key, required_action, expected_value, tolerance, hint, feedback_correct, feedback_incorrect, is_safety_check)
SELECT e.id, s.n, s.instruction, s.target, s.action, NULL, NULL, s.hint, s.ok, s.bad, 0
FROM virtual_lab_experiments e
JOIN (
  SELECT 6 n, 'Change the string length with the length control, then measure the new length with the ruler.' instruction, 'ruler1' target, 'measure' action, 'Open Controls to change the length, then use the ruler on the bob.' hint, 'New length recorded.' ok, 'Use the ruler to measure the pendulum length.' bad
  UNION ALL SELECT 7, 'Reset the stopwatch, release the bob and start timing.', 'stopwatch1', 'switch_on', 'Reset first so the time starts from zero.', 'Timing started.', 'Start the stopwatch as you release the bob.'
  UNION ALL SELECT 8, 'Stop the stopwatch after 10 full oscillations.', 'stopwatch1', 'switch_off', 'Count 10 complete swings back to the start.', 'Timing stopped.', 'Stop the stopwatch after 10 oscillations.'
  UNION ALL SELECT 9, 'Read the time for this length from the stopwatch.', 'stopwatch1', 'measure', NULL, 'Reading recorded - it has been added to your Results Table.', 'Read the time from the stopwatch.'
  UNION ALL SELECT 10, 'Change the length a third time and measure it with the ruler.', 'ruler1', 'measure', 'Three different lengths give three points on your graph.', 'Third length recorded.', 'Use the ruler to measure the pendulum length.'
  UNION ALL SELECT 11, 'Reset the stopwatch, release the bob and start timing.', 'stopwatch1', 'switch_on', NULL, 'Timing started.', 'Start the stopwatch as you release the bob.'
  UNION ALL SELECT 12, 'Stop the stopwatch after 10 full oscillations.', 'stopwatch1', 'switch_off', NULL, 'Timing stopped.', 'Stop the stopwatch after 10 oscillations.'
  UNION ALL SELECT 13, 'Read the time for this length. Then plot T squared against L in your notebook.', 'stopwatch1', 'measure', NULL, 'Reading recorded - your graph now has three points.', 'Read the time from the stopwatch.'
) s
WHERE e.template_key = 'simple_pendulum'
  AND NOT EXISTS (SELECT 1 FROM virtual_lab_steps x WHERE x.experiment_id = e.id AND x.step_number = s.n);

-- ---- Effect of Length on Pendulum Period (two lengths so far): add a third -------------------
INSERT INTO virtual_lab_steps (experiment_id, step_number, instruction, target_object_key, required_action, expected_value, tolerance, hint, feedback_correct, feedback_incorrect, is_safety_check)
SELECT e.id, s.n, s.instruction, s.target, s.action, NULL, NULL, s.hint, s.ok, s.bad, 0
FROM virtual_lab_experiments e
JOIN (
  SELECT 10 n, 'Change the length a third time and measure it with the ruler.' instruction, 'ruler1' target, 'measure' action, 'Three different lengths give three points on your graph.' hint, 'Third length recorded.' ok, 'Use the ruler to measure the pendulum length.' bad
  UNION ALL SELECT 11, 'Reset the stopwatch, release the bob and start timing.', 'stopwatch1', 'switch_on', NULL, 'Timing started.', 'Start the stopwatch as you release the bob.'
  UNION ALL SELECT 12, 'Stop the stopwatch after 10 full oscillations.', 'stopwatch1', 'switch_off', NULL, 'Timing stopped.', 'Stop the stopwatch after 10 oscillations.'
  UNION ALL SELECT 13, 'Read the time for this length. Then plot T squared against L in your notebook.', 'stopwatch1', 'measure', NULL, 'Reading recorded - your graph now has three points.', 'Read the time from the stopwatch.'
) s
WHERE e.template_key = 'pendulum_length_period'
  AND NOT EXISTS (SELECT 1 FROM virtual_lab_steps x WHERE x.experiment_id = e.id AND x.step_number = s.n);

-- ---- The graph: T^2 against L with a line of best fit ----------------------------------------
-- (the superscript 2 is written as its UTF-8 bytes so it survives any client character set)
INSERT INTO virtual_lab_graph_configs (experiment_id, enabled, title, x_column, y_column, x_label, y_label, graph_type, allow_axis_change, min_points, show_best_fit, manual_plot)
SELECT e.id, 1, 'Period squared against Length', 'length_m', 'period_squared_s2', 'Length L (m)', CONCAT('Period squared T', _utf8mb4 X'C2B2', ' (s', _utf8mb4 X'C2B2', ')'), 'scatter', 1, 3, 1, 0
FROM virtual_lab_experiments e
WHERE e.template_key IN ('simple_pendulum', 'pendulum_length_period')
ON DUPLICATE KEY UPDATE enabled = 1, title = VALUES(title), x_column = VALUES(x_column), y_column = VALUES(y_column),
  x_label = VALUES(x_label), y_label = VALUES(y_label), graph_type = VALUES(graph_type), allow_axis_change = 1,
  min_points = 3, show_best_fit = 1, manual_plot = 0;

-- ---- A question about the graph -------------------------------------------------------------
INSERT INTO virtual_lab_questions (experiment_id, question_number, question_text, question_type, stage, requirement, linked_to_graph, marks)
SELECT e.id, (SELECT COALESCE(MAX(q.question_number), 0) + 1 FROM virtual_lab_questions q WHERE q.experiment_id = e.id),
  'Find the gradient of your graph of T squared against L, then use g = 4 x pi^2 / gradient to find g. How close is it to 9.8 m/s^2?',
  'calculation', 'after_experiment', 'notebook_only', 1, 6.00
FROM virtual_lab_experiments e
WHERE e.template_key IN ('simple_pendulum', 'pendulum_length_period')
  AND NOT EXISTS (SELECT 1 FROM virtual_lab_questions x WHERE x.experiment_id = e.id AND x.linked_to_graph = 1);
