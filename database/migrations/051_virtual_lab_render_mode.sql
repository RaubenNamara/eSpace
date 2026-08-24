-- Lets an experiment opt into the new 2D/SVG rendering engine instead of the existing Three.js
-- one, without touching any other experiment. Defaults to '3d' so every existing experiment (and
-- every field the teacher builder already writes) keeps behaving exactly as before - only the
-- Simple Pendulum template is switched over, as the pilot for the PhET-inspired visual redesign.
ALTER TABLE `virtual_lab_experiments`
    ADD COLUMN `render_mode` ENUM('3d','2d') NOT NULL DEFAULT '3d' AFTER `difficulty`;

UPDATE `virtual_lab_experiments` SET `render_mode` = '2d' WHERE `title` = 'Simple Pendulum' AND `is_template` = 1;
