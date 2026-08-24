-- Names WHICH 2D component an experiment uses, decoupled from its title (titles can be edited or
-- duplicated by teachers copying a template; a stable slug can't drift). NULL/unmatched slugs fall
-- back to the 3D engine automatically in the frontend registry, so this is purely additive.
ALTER TABLE `virtual_lab_experiments`
    ADD COLUMN `render_component` VARCHAR(50) NULL AFTER `render_mode`;

UPDATE `virtual_lab_experiments` SET `render_component` = 'pendulum' WHERE `title` = 'Simple Pendulum' AND `is_template` = 1;
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'hookes_law' WHERE `title` = 'Investigating Hooke''s Law' AND `is_template` = 1;
