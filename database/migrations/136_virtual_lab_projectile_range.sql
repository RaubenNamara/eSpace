-- New admin-curated template: "Projectile Motion: How the Angle of Projection Affects the Range".
-- A separate experiment - no existing practical is changed.
--
-- Uses the projectile field and launcher (VirtualLabSceneProjectile.vue) under render_component
-- 'projectile_range'; the launcher prop experiment 'range_angles' turns on its guided mode: the launch
-- speed is fixed at 10 m/s, and for each angle (15, 30, 45, 60, 75 degrees) the student sets the angle,
-- fires and measures the range with the 30 m tape - each action checked against the step. Below the lab
-- (VirtualLabProjectileAnalysis.vue): the results table (angle, range) and questions - no graph - then
-- the conclusion and an assessment. Practical Brief: VirtualLabProjectileBrief.vue. Safe to re-run.

-- The text has degree signs - read it as UTF-8 whatever client imports it
SET NAMES utf8mb4;

INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`, `render_mode`, `render_component`, `template_key`, `template_version`)
SELECT
    'Projectile Motion: How the Angle of Projection Affects the Range', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Motion - Projectiles', 'physics', 'beginner', NULL,
    'To investigate how the range of a projectile depends on its angle of projection, for a fixed launch speed.',
    'During a school sports day, the shot-put and javelin coaches argue about the best angle at which to throw. One says that throwing "as high as possible" sends the object furthest; the other says a low, flat throw is best.\nTo settle the argument, the physics club decides to test it with a projectile launcher that always fires a ball at the same speed. Only the angle of projection is changed, and the range - how far along the ground the ball lands - is measured each time.\nAs a member of the physics club, carry out the investigation and advise the coaches.',
    'Projectile launcher with an angle (quadrant) scale, projectile ball, 30 m measuring tape.',
    'None (all apparatus is simulated).',
    'Never stand in front of the launcher or in the landing area while it is being fired; fire only when the field is clear.',
    '[{"key":"launcher1","object_type":"projectile_launcher","position":{"x":0,"y":0,"z":0},"props":{"launch_velocity_ms":10,"experiment":"range_angles"},"in_tray":true},{"key":"ball1","object_type":"projectile","position":{"x":0,"y":0,"z":0},"in_tray":false},{"key":"tape1","object_type":"ruler","position":{"x":0,"y":0,"z":0},"props":{"label":"Measuring tape (30 m)"},"in_tray":true}]',
    'State how the range of the projectile depends on the angle of projection.',
    25.00, 1, 'published', '2d', 'projectile_range', 'physics_projectile_range_angle', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'physics_projectile_range_angle');

SET @pr_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'physics_projectile_range_angle' LIMIT 1);

-- Steps are only written while the experiment has none, so re-running never disturbs work in progress.
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`)
SELECT * FROM (
SELECT @pr_id AS e, 1 AS n, 'Set up: click "Projectile Launcher" and then "Measuring tape" in the apparatus tray. The tape lies along the ground from the launcher.' AS ins, NULL AS tgt, 'move' AS act, 'apparatus_ready' AS ev, NULL AS tol, 'Click each item in the apparatus tray (top left).' AS h, 'The launcher and the tape are in place. The launch speed is fixed at 10 m/s.' AS fc, 'Take the remaining apparatus from the tray.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 2 AS n, 'Set the angle of projection to 15°: click "+1°" or "−1°" (or drag the slider) until the red pointer on the launcher''s protractor points to 15° and the panel shows "Launch angle: 15°".' AS ins, 'launcher1' AS tgt, 'rotate' AS act, '15' AS ev, NULL AS tol, 'Use the +1° / −1° buttons in the panel on the right. Click "Launcher View" to see the protractor close up.' AS h, 'The launcher is set at 15°.' AS fc, 'Set the angle to exactly 15°.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 3 AS n, 'Fire: click the red "Fire" button and watch the ball fly. A white ring marks where it lands.' AS ins, 'launcher1' AS tgt, 'switch_on' AS act, NULL AS ev, NULL AS tol, 'Click the red "Fire" button in the panel on the right.' AS h, 'The ball has landed - the white ring marks the spot.' AS fc, 'Click "Fire".' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 4 AS n, 'Measure the range R: (1) click the yellow measuring tape on the ground, (2) click "Measure", (3) click the ball where it landed, (4) click "Record".' AS ins, 'tape1' AS tgt, 'measure' AS act, NULL AS ev, NULL AS tol, 'Click the yellow tape on the ground first - its "Measure" panel opens at the bottom right.' AS h, 'Range recorded - now set the next angle.' AS fc, 'Measure the range of this shot.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 5 AS n, 'Set the angle of projection to 30°: click "+1°" or "−1°" (or drag the slider) until the red pointer on the launcher''s protractor points to 30° and the panel shows "Launch angle: 30°".' AS ins, 'launcher1' AS tgt, 'rotate' AS act, '30' AS ev, NULL AS tol, 'Use the +1° / −1° buttons in the panel on the right. Click "Launcher View" to see the protractor close up.' AS h, 'The launcher is set at 30°.' AS fc, 'Set the angle to exactly 30°.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 6 AS n, 'Fire: click the red "Fire" button and watch the ball fly. A white ring marks where it lands.' AS ins, 'launcher1' AS tgt, 'switch_on' AS act, NULL AS ev, NULL AS tol, 'Click the red "Fire" button in the panel on the right.' AS h, 'The ball has landed - the white ring marks the spot.' AS fc, 'Click "Fire".' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 7 AS n, 'Measure the range R: (1) click the yellow measuring tape on the ground, (2) click "Measure", (3) click the ball where it landed, (4) click "Record".' AS ins, 'tape1' AS tgt, 'measure' AS act, NULL AS ev, NULL AS tol, 'Click the yellow tape on the ground first - its "Measure" panel opens at the bottom right.' AS h, 'Range recorded - now set the next angle.' AS fc, 'Measure the range of this shot.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 8 AS n, 'Set the angle of projection to 45°: click "+1°" or "−1°" (or drag the slider) until the red pointer on the launcher''s protractor points to 45° and the panel shows "Launch angle: 45°".' AS ins, 'launcher1' AS tgt, 'rotate' AS act, '45' AS ev, NULL AS tol, 'Use the +1° / −1° buttons in the panel on the right. Click "Launcher View" to see the protractor close up.' AS h, 'The launcher is set at 45°.' AS fc, 'Set the angle to exactly 45°.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 9 AS n, 'Fire: click the red "Fire" button and watch the ball fly. A white ring marks where it lands.' AS ins, 'launcher1' AS tgt, 'switch_on' AS act, NULL AS ev, NULL AS tol, 'Click the red "Fire" button in the panel on the right.' AS h, 'The ball has landed - the white ring marks the spot.' AS fc, 'Click "Fire".' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 10 AS n, 'Measure the range R: (1) click the yellow measuring tape on the ground, (2) click "Measure", (3) click the ball where it landed, (4) click "Record".' AS ins, 'tape1' AS tgt, 'measure' AS act, NULL AS ev, NULL AS tol, 'Click the yellow tape on the ground first - its "Measure" panel opens at the bottom right.' AS h, 'Range recorded - now set the next angle.' AS fc, 'Measure the range of this shot.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 11 AS n, 'Set the angle of projection to 60°: click "+1°" or "−1°" (or drag the slider) until the red pointer on the launcher''s protractor points to 60° and the panel shows "Launch angle: 60°".' AS ins, 'launcher1' AS tgt, 'rotate' AS act, '60' AS ev, NULL AS tol, 'Use the +1° / −1° buttons in the panel on the right. Click "Launcher View" to see the protractor close up.' AS h, 'The launcher is set at 60°.' AS fc, 'Set the angle to exactly 60°.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 12 AS n, 'Fire: click the red "Fire" button and watch the ball fly. A white ring marks where it lands.' AS ins, 'launcher1' AS tgt, 'switch_on' AS act, NULL AS ev, NULL AS tol, 'Click the red "Fire" button in the panel on the right.' AS h, 'The ball has landed - the white ring marks the spot.' AS fc, 'Click "Fire".' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 13 AS n, 'Measure the range R: (1) click the yellow measuring tape on the ground, (2) click "Measure", (3) click the ball where it landed, (4) click "Record".' AS ins, 'tape1' AS tgt, 'measure' AS act, NULL AS ev, NULL AS tol, 'Click the yellow tape on the ground first - its "Measure" panel opens at the bottom right.' AS h, 'Range recorded - now set the next angle.' AS fc, 'Measure the range of this shot.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 14 AS n, 'Set the angle of projection to 75°: click "+1°" or "−1°" (or drag the slider) until the red pointer on the launcher''s protractor points to 75° and the panel shows "Launch angle: 75°".' AS ins, 'launcher1' AS tgt, 'rotate' AS act, '75' AS ev, NULL AS tol, 'Use the +1° / −1° buttons in the panel on the right. Click "Launcher View" to see the protractor close up.' AS h, 'The launcher is set at 75°.' AS fc, 'Set the angle to exactly 75°.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 15 AS n, 'Fire: click the red "Fire" button and watch the ball fly. A white ring marks where it lands.' AS ins, 'launcher1' AS tgt, 'switch_on' AS act, NULL AS ev, NULL AS tol, 'Click the red "Fire" button in the panel on the right.' AS h, 'The ball has landed - the white ring marks the spot.' AS fc, 'Click "Fire".' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @pr_id AS e, 16 AS n, 'Measure the range R: (1) click the yellow measuring tape on the ground, (2) click "Measure", (3) click the ball where it landed, (4) click "Record". All readings are taken - complete the results table and answer the questions below.' AS ins, 'tape1' AS tgt, 'measure' AS act, NULL AS ev, NULL AS tol, 'Click the yellow tape on the ground first - its "Measure" panel opens at the bottom right.' AS h, 'All ranges recorded. Now complete the table and answer the questions.' AS fc, 'Measure the range of this shot.' AS fi, 0 AS sc FROM DUAL
) AS new_steps
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_steps` WHERE `experiment_id` = @pr_id);

-- Shared with the physics department (owner of its subject) while it has no departments yet.
INSERT IGNORE INTO `virtual_lab_experiment_departments` (`experiment_id`, `department_id`)
SELECT e.id, s.department_id
FROM `virtual_lab_experiments` e
INNER JOIN `subjects` s ON s.id = e.subject_id
WHERE e.id = @pr_id AND s.department_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM `virtual_lab_experiment_departments` x WHERE x.experiment_id = e.id);
