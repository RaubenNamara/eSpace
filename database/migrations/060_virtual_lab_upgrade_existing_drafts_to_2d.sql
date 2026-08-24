-- Bug fix: teacher id=5's draft copies were each created by copying an official template at some
-- point *before* that template was later migrated to a 2D renderer (migrations 052-053, 054, 055,
-- 056). A copy is a point-in-time snapshot, so those drafts silently stayed on render_mode='3d'
-- forever - meaning every currently-published assignment (what the real student, id=12, actually
-- sees) kept rendering the old Three.js engine even though the corresponding template had long
-- since become a 2D experiment. This is what "I can't see the 2D experiment" was actually about.
--
-- Fix: bring each affected draft's render_mode/render_component in line with its source template
-- - a pure DISPLAY flag change, not touched by any teacher-facing edit control, so this is the
-- same kind of "safe to broadcast" fix as the earlier liquid-colour-prop correction. Before writing
-- this, every affected draft's scene_objects apparatus set was diffed against its template's -
-- only drafts with a matching (or a superset with zero steps depending on the extra items, as
-- confirmed for draft #15's unused retort_stand/spring) apparatus shape are touched. No step,
-- title, instruction, tolerance, mark, or attempt is changed - existing attempts (including
-- student id=12's 8 real ones) reference these experiment IDs directly and are completely
-- unaffected by a render_mode flip.
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'circuit' WHERE `id` IN (4, 6, 7, 8) AND `is_template` = 0;
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'titration' WHERE `id` IN (5, 9) AND `is_template` = 0;
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'pendulum' WHERE `id` = 15 AND `is_template` = 0;
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'circuit' WHERE `id` = 20 AND `is_template` = 0;
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'hookes_law' WHERE `id` IN (21, 22) AND `is_template` = 0;
UPDATE `virtual_lab_experiments` SET `render_mode` = '2d', `render_component` = 'optics' WHERE `id` IN (23, 24) AND `is_template` = 0;
