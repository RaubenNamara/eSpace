-- New admin-curated template proving out the existing reusable engine for a classic O-level
-- practical (principle of moments / metre rule balance) end to end - no new object_type, action,
-- or engine code needed: retort_stand, metre_rule, mass_piece and specimen_bottle already exist
-- (migrations 043, 049, 108), and the ruler's generic "measure" reading already reads a target's
-- length_cm prop (see VirtualLabScene.vue's rulerReading()), exactly as used for the pendulum's
-- string length and Hooke's Law's spring length. Point G (the rule's own balance point when
-- suspended alone) is given in the introduction rather than modelled as a step, since a real rule
-- is suspended only once and the interesting, markable physics is the pair of distances either
-- side of it - matching how the existing Density/Pendulum templates also state a fixed reference
-- point in the brief rather than invent an object just to re-derive it.

INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`)
VALUES (
    'Finding the Mass of a Bottle Using the Principle of Moments', (SELECT id FROM subjects WHERE name = 'PHY' LIMIT 1), 'Moments and Equilibrium', 'physics', 'intermediate', NULL,
    'To determine the mass of an object that cannot be weighed directly, by balancing it against a known mass on a freely-suspended metre rule.',
    'At a trading centre, a boy has collected 714 empty plastic bottles to sell for recycling at Ugx 25 per gram. He does not have a balance, but he can find the mass of one sample bottle using only a metre rule, a 50g hanger, a retort stand and some thread, by applying the principle of moments (F1 x d1 = F2 x d2). For this trial, the empty rule was first suspended alone from the stand and found to balance at the 49.6cm mark - this is point G, the rule''s centre of gravity. Keeping the rule suspended at G, you will now hang the 50g hanger and the sample bottle from either side and read the two balance distances once it settles level again.',
    'Metre rule, 50g hanger, retort stand with a clamp, two pieces of thread about 30cm long each.',
    'One empty plastic bottle with a lid (the sample to be tested).',
    'Make sure the retort stand is stable on the bench before hanging any load, and do not swing the loaded rule.',
    '[{"key":"stand1","object_type":"retort_stand","position":{"x":-1.3,"y":0,"z":0},"in_tray":true},{"key":"rule1","object_type":"metre_rule","position":{"x":-1.3,"y":0,"z":1},"in_tray":true},{"key":"hanger1","object_type":"mass_piece","position":{"x":0.3,"y":0,"z":1.2},"props":{"mass_g":50,"length_cm":18},"in_tray":true},{"key":"bottle1","object_type":"specimen_bottle","position":{"x":1,"y":0,"z":1.2},"props":{"length_cm":25,"mass_g":36},"in_tray":true}]',
    'Explain, using your results, how the principle of moments let you find the mass of an object you could not weigh directly.',
    20.00, 1, 'published'
);

SET @bottle_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Finding the Mass of a Bottle Using the Principle of Moments' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`) VALUES
(@bottle_id, 1, 'Pick up the retort stand and set it up on the bench.', 'stand1', 'move', 'stand1', NULL, NULL, 'Stand set up.', 'Click the retort stand in the apparatus tray.', 0),
(@bottle_id, 2, 'Pick up the metre rule.', 'rule1', 'move', 'rule1', NULL, NULL, 'Rule in hand.', 'Click the metre rule in the apparatus tray.', 0),
(@bottle_id, 3, 'Suspend the metre rule from the retort stand''s clamp using a thread loop, at the point where it was already found to balance (point G, the 49.6cm mark).', 'rule1', 'move', 'stand1', NULL, 'Drag the rule so it sits close to the retort stand''s clamp.', 'Rule suspended freely from G, ready to be loaded.', 'Select the rule and drag it onto the retort stand.', 0),
(@bottle_id, 4, 'Pick up the 50g hanger.', 'hanger1', 'move', 'hanger1', NULL, NULL, '50g hanger in hand.', 'Click the 50g hanger in the apparatus tray.', 0),
(@bottle_id, 5, 'Tie the 50g hanger to the rule with a thread, on one side of G.', 'hanger1', 'move', 'rule1', NULL, 'Drag the hanger so it sits close to the rule.', 'Hanger hung on the rule.', 'Select the hanger and drag it onto the rule.', 0),
(@bottle_id, 6, 'Pick up the sample bottle.', 'bottle1', 'move', 'bottle1', NULL, NULL, 'Bottle in hand.', 'Click the bottle in the apparatus tray.', 0),
(@bottle_id, 7, 'Tie the bottle to the rule with the second thread, on the opposite side of G, then slide both threads until the rule balances level again.', 'bottle1', 'move', 'rule1', NULL, 'Drag the bottle so it sits close to the rule, on the other side from the hanger.', 'Rule balances level, loaded with the hanger and the bottle.', 'Select the bottle and drag it onto the rule.', 0),
(@bottle_id, 8, 'Using the metre rule''s own scale, read the distance from G to the thread holding the 50g hanger (call this d).', 'rule1', 'measure', '18', 0.3, 'Select the rule, choose Measure, then click the hanger.', 'Distance d from G to the hanger recorded.', 'Select the rule and use Measure on the hanger.', 0),
(@bottle_id, 9, 'Now read the distance from G to the thread holding the bottle (call this y).', 'rule1', 'measure', '25', 0.3, 'Select the rule, choose Measure, then click the bottle.', 'Distance y from G to the bottle recorded.', 'Select the rule and use Measure on the bottle.', 0);

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `marks`) VALUES
(@bottle_id, 1, 'Using the principle of moments (50 x d = mb x y) and your measured values of d and y, calculate the mass mb of the sample bottle in grams. Show your working.', 'calculation', 6.00),
(@bottle_id, 2, 'The boy collected 714 bottles, each assumed to have the same mass as your sample. At Ugx 25 per gram, calculate the total amount (in Uganda Shillings) he will earn from selling all 714 bottles.', 'calculation', 6.00),
(@bottle_id, 3, 'Explain why the empty rule had to be balanced alone first, to find point G, before the hanger and bottle were hung on it.', 'short_answer', 4.00);
