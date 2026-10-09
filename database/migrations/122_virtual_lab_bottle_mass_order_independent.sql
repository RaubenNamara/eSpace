-- Fixes a real stuck-progress bug in "Finding the Mass of a Bottle Using the Principle of
-- Moments" (migrations 119-121): steps 4-7 required the hanger to be picked up and hung before
-- the bottle, in that exact order (target_object_key pinned to 'hanger1' then 'bottle1'). But
-- VirtualLabSceneMomentsBalance.vue never gated picking up or hanging an item on which step is
-- current - exactly like Hooke's Law's spring/masses, a student can tie the bottle on first with
-- no physical problem. When that happened, the "pick up the hanger1" step (expecting specifically
-- hanger1) could never be satisfied again: tray pickups are one-way (once an item leaves the tray
-- it can't trigger that action a second time), so the step - and the student's progress - got
-- permanently stuck even though the apparatus was correctly, fully set up and balanced.
--
-- Fix: loosen target_object_key to NULL on these four steps so either item satisfies whichever
-- "pick up"/"hang it" step is current, matching how the 3D scene actually behaves (order between
-- the hanger and the bottle genuinely doesn't matter). The pickup steps' expected_value is also
-- nulled (any 'move' self-pickup counts); the "hang on the rule" steps keep expected_value =
-- 'rule1' since that destination still matters, just not which of the two items got there first.

SET @bottle_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Finding the Mass of a Bottle Using the Principle of Moments' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

UPDATE `virtual_lab_steps`
SET `target_object_key` = NULL, `expected_value` = NULL,
    `instruction` = 'Pick up the 50g hanger or the sample bottle - either one first.',
    `feedback_correct` = 'Item in hand.',
    `feedback_incorrect` = 'Click the 50g hanger or the bottle in the apparatus tray.'
WHERE `experiment_id` = @bottle_id AND `step_number` = 4;

UPDATE `virtual_lab_steps`
SET `target_object_key` = NULL,
    `instruction` = 'Tie it to the rule with a thread, on one side of G.',
    `feedback_correct` = 'Hung on the rule.',
    `feedback_incorrect` = 'Select it and drag it onto the rule.'
WHERE `experiment_id` = @bottle_id AND `step_number` = 5;

UPDATE `virtual_lab_steps`
SET `target_object_key` = NULL, `expected_value` = NULL,
    `instruction` = 'Now pick up the other one (the hanger or the bottle, whichever you haven’t placed yet).',
    `feedback_correct` = 'Item in hand.',
    `feedback_incorrect` = 'Click the remaining item in the apparatus tray.'
WHERE `experiment_id` = @bottle_id AND `step_number` = 6;

UPDATE `virtual_lab_steps`
SET `target_object_key` = NULL,
    `instruction` = 'Tie it to the rule with the second thread, on the opposite side of G. Then slide both the hanger and the bottle along the rule until it settles level - that is the balance point.',
    `feedback_correct` = 'Rule balances level, loaded with the hanger and the bottle.',
    `feedback_incorrect` = 'Select it and drag it onto the rule.'
WHERE `experiment_id` = @bottle_id AND `step_number` = 7;
