-- Upgrades "Finding the Mass of a Bottle Using the Principle of Moments" (migration 119) from the
-- generic free-layout engine's baked-reading simplification to a real bespoke 3D scene
-- (VirtualLabSceneMomentsBalance.vue, render_component 'moments_balance') where the rule actually
-- hangs from the stand and tilts live as the hanger and bottle are dragged along it, settling level
-- only once the moments genuinely balance - matching the Pendulum/Hooke's Law scenes' pattern.
--
-- The rule now pivots at its exact geometric centre (the 50cm mark) rather than a stated-but-
-- unverified "49.6cm", so the introduction/step 3 text advertising a slightly-off G no longer
-- applies - also, because the real balance point for a GIVEN hidden bottle mass is a whole family
-- of valid (d, y) pairs (any pair with d/y = mb/50), not one fixed number, the two measure steps'
-- expected_value/tolerance are cleared to NULL (same pattern already used by Hooke's Law's spring
-- length readings, which are equally student-dependent) - correctness is judged by the calculation
-- question instead, not by the raw reading.

UPDATE `virtual_lab_experiments`
SET
    `render_mode` = '2d',
    `render_component` = 'moments_balance',
    `introduction` = 'At a trading centre, a boy has collected 714 empty plastic bottles to sell for recycling at Ugx 25 per gram. He does not have a balance, but he can find the mass of one sample bottle using only a metre rule, a 50g hanger, a retort stand and some thread, by applying the principle of moments (F1 x d1 = F2 x d2). The rule is suspended from the stand at its exact centre - the 50cm mark - which is point G, its centre of gravity. You will hang the 50g hanger and the sample bottle from threads on either side and slide them until the rule settles level, then read the two balance distances from G.'
WHERE `title` = 'Finding the Mass of a Bottle Using the Principle of Moments' AND `is_template` = 1;

SET @bottle_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Finding the Mass of a Bottle Using the Principle of Moments' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

UPDATE `virtual_lab_steps`
SET `instruction` = 'Suspend the metre rule from the retort stand''s clamp using a thread loop at its centre - the rule pivots freely here at point G, the 50cm mark.'
WHERE `experiment_id` = @bottle_id AND `step_number` = 3;

UPDATE `virtual_lab_steps`
SET `instruction` = 'Tie the 50g hanger to the rule with a thread, anywhere on one side of G - you will slide it to the right spot once the bottle is hung too.'
WHERE `experiment_id` = @bottle_id AND `step_number` = 5;

UPDATE `virtual_lab_steps`
SET `instruction` = 'Tie the bottle to the rule with the second thread, anywhere on the opposite side of G. Then slide both the hanger and the bottle along the rule until it settles level - that is the balance point.'
WHERE `experiment_id` = @bottle_id AND `step_number` = 7;

UPDATE `virtual_lab_steps`
SET `expected_value` = NULL, `tolerance` = NULL,
    `instruction` = 'Once the rule is balanced level, select it, choose Measure, then click the 50g hanger to read its distance from G (call this d).',
    `hint` = 'Select the rule, choose Measure, then click the hanger.'
WHERE `experiment_id` = @bottle_id AND `step_number` = 8;

UPDATE `virtual_lab_steps`
SET `expected_value` = NULL, `tolerance` = NULL,
    `instruction` = 'Now measure the bottle''s distance from G the same way (call this y).',
    `hint` = 'Select the rule, choose Measure, then click the bottle.'
WHERE `experiment_id` = @bottle_id AND `step_number` = 9;

UPDATE `virtual_lab_questions`
SET `question_text` = 'A metre rule is uniform (the same thickness and density all along its length). Explain why this means its centre of gravity, point G, is exactly at its midpoint.'
WHERE `experiment_id` = @bottle_id AND `question_number` = 3;
