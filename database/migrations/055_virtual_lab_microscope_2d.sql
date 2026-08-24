-- Switches the existing "Viewing Onion Cells Using a Microscope" template to the new 2D renderer.
-- No step, target_object_key, expected_value, or tolerance is touched - all 10 existing steps
-- were traced against VirtualLabSceneMicroscope.vue's emitted actions (move/switch_on/switch_off/
-- select_objective/focus_coarse/focus_fine/inspect all reproduce the exact same {objectKey,
-- action, value} shapes the steps already grade against).
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'microscope' WHERE `title` = 'Viewing Onion Cells Using a Microscope' AND `is_template` = 1;
