-- Reusable engine mechanics for the three deferred simulations (microscope focus, Hooke's Law
-- spring physics, reflection/refraction optics). Backward-compatible: the ENUM widen only adds
-- new values (existing rows/behaviour untouched), and every new object_type is an additive catalog
-- row - no existing experiment, step, or object definition is modified except microscope's
-- supported_actions (widened, not narrowed) so its existing "Cell Observation" template keeps
-- working exactly as before (its steps use move/zoom/inspect, all still present).

ALTER TABLE `virtual_lab_steps`
    MODIFY COLUMN `required_action` ENUM('move','rotate','connect','pour','heat','measure','switch_on','switch_off','zoom','inspect','acknowledge','focus_coarse','focus_fine','select_objective') NOT NULL;

UPDATE `virtual_lab_objects`
SET `supported_actions` = '["move","rotate","switch_on","switch_off","focus_coarse","focus_fine","select_objective","zoom","inspect"]'
WHERE `object_type` = 'microscope';

INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('spring', 'Spring', 'physics', 'A coiled spring that stretches under load - its extension is derived from the real mass attached, used to investigate Hooke''s Law.', '{"natural_length_cm": 15, "spring_constant_n_per_m": 40, "max_safe_extension_cm": 12}', '["move","rotate","measure","zoom","inspect"]', '🌀'),
('retort_stand', 'Retort Stand', 'physics', 'A stand with a clamp used to mount a spring or other apparatus vertically.', '{}', '["move","zoom","inspect"]', '🧷'),
('mass_piece', 'Mass Piece', 'physics', 'A known mass used to load a spring or balance.', '{"mass_g": 50}', '["move","zoom","inspect"]', '⚖️'),
('ray_box', 'Ray Box', 'physics', 'A light source that emits a single ray - move and rotate it to aim the ray at a mirror or glass block.', '{}', '["move","rotate","switch_on","switch_off","zoom","inspect"]', '🔦'),
('glass_block', 'Glass Block', 'physics', 'A rectangular glass block used to demonstrate refraction of light, with a configurable refractive index.', '{"refractive_index": 1.5, "width_cm": 5}', '["move","rotate","zoom","inspect"]', '🧊'),
('protractor', 'Protractor', 'general', 'A semi-circular scale used to measure angles - must be centred precisely on the point where the ray meets the surface to give a valid reading.', '{}', '["move","rotate","measure","zoom","inspect"]', '📐');
