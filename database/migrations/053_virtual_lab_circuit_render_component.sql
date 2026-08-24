-- Switches Series Circuit and Ohm's Law over to the new 2D circuit renderer. Purely a display
-- flag change - no steps, target_object_key, expected_value, or tolerance values are touched.
-- Both templates were traced step-by-step against VirtualLabSceneCircuit.vue's emitted actions
-- before this migration was written (move/connect/switch_on/measure/inspect all reproduce the
-- exact same {objectKey, action, value} shapes the existing steps already grade against).
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'circuit' WHERE `title` = 'Series Circuit' AND `is_template` = 1;
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'circuit' WHERE `title` = 'Ohm''s Law' AND `is_template` = 1;
