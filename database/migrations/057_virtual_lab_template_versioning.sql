-- Versioning + curriculum metadata for official templates. All additive/nullable - existing rows
-- (including teacher drafts, which never get a template_key) are completely unaffected.
--
-- template_key: a stable slug identifying "this is the Ohm's Law template" independent of its
-- title (titles can be edited). Only ever set on is_template=1 rows. Used going forward as the
-- duplicate-prevention check: before seeding an official template, look up its template_key first
-- - if a row already exists, update it in place (bumping template_version) instead of inserting a
-- second copy, exactly the kind of accidental duplication already found among teacher drafts.
-- template_version / engine_version: lightweight change tracking, so a future edit to a template's
-- steps can be distinguished from "this is a different template" and so a renderer rewrite can be
-- identified as needing re-validation.
ALTER TABLE `virtual_lab_experiments`
    ADD COLUMN `template_key` VARCHAR(80) NULL AFTER `render_component`,
    ADD COLUMN `template_version` INT UNSIGNED NULL DEFAULT 1 AFTER `template_key`,
    ADD COLUMN `engine_version` VARCHAR(40) NULL AFTER `template_version`,
    ADD COLUMN `is_deprecated` TINYINT(1) NOT NULL DEFAULT 0 AFTER `engine_version`,
    ADD COLUMN `estimated_duration_minutes` SMALLINT UNSIGNED NULL AFTER `is_deprecated`,
    ADD COLUMN `competency` TEXT NULL AFTER `estimated_duration_minutes`,
    ADD COLUMN `learning_outcomes` TEXT NULL AFTER `competency`,
    ADD COLUMN `prerequisite_knowledge` TEXT NULL AFTER `learning_outcomes`,
    ADD COLUMN `practical_skills` JSON NULL AFTER `prerequisite_knowledge`,
    ADD UNIQUE KEY `unique_template_key` (`template_key`);

-- Backfill stable keys + engine versions for the 11 templates that exist today.
UPDATE `virtual_lab_experiments` SET `template_key` = 'density_of_a_solid', `engine_version` = '3d-v1', `estimated_duration_minutes` = 35 WHERE title = 'Density of a Solid' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'hookes_law', `engine_version` = 'hookes-law-2d-v1', `estimated_duration_minutes` = 40 WHERE title = 'Investigating Hooke''s Law' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'ohms_law', `engine_version` = 'circuit-2d-v1', `estimated_duration_minutes` = 30 WHERE title = 'Ohm''s Law' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'refraction_glass_block', `engine_version` = 'optics-2d-v1', `estimated_duration_minutes` = 30 WHERE title = 'Refraction Through a Rectangular Glass Block' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'series_circuit', `engine_version` = 'circuit-2d-v1', `estimated_duration_minutes` = 30 WHERE title = 'Series Circuit' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'simple_pendulum', `engine_version` = 'pendulum-2d-v1', `estimated_duration_minutes` = 25 WHERE title = 'Simple Pendulum' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'reflection_laws', `engine_version` = 'optics-2d-v1', `estimated_duration_minutes` = 30 WHERE title = 'Verification of the Laws of Reflection' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'acid_base_titration', `engine_version` = 'titration-2d-v1', `estimated_duration_minutes` = 40 WHERE title = 'Acid-Base Titration' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'measuring_50ml_water', `engine_version` = '3d-v1', `estimated_duration_minutes` = 15 WHERE title = 'Measuring 50ml of Water' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'cell_observation_microscope', `engine_version` = '3d-v1', `estimated_duration_minutes` = 25, `is_deprecated` = 1 WHERE title = 'Cell Observation Under the Microscope' AND is_template = 1;
UPDATE `virtual_lab_experiments` SET `template_key` = 'onion_epidermal_cells', `engine_version` = 'microscope-2d-v1', `estimated_duration_minutes` = 30 WHERE title = 'Viewing Onion Cells Using a Microscope' AND is_template = 1;
