-- Switches both existing optics templates to the new 2D renderer. No step, target_object_key,
-- expected_value, or tolerance is touched - all 9 steps in each template were traced against
-- VirtualLabSceneOptics.vue's emitted actions (move/switch_on/rotate/measure all reproduce the
-- exact same {objectKey, action, value} shapes the steps already grade against).
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'optics' WHERE `title` = 'Verification of the Laws of Reflection' AND `is_template` = 1;
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'optics' WHERE `title` = 'Refraction Through a Rectangular Glass Block' AND `is_template` = 1;
