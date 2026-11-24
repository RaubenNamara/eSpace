-- 167: The projectile experiment's "Measure" panel now opens under the "Fire" button (it used to
-- open in a corner of the scene), so the measuring steps' hint says so. Only the library experiment
-- (is_template = 1) is changed; teachers' own copies keep their wording. Safe to run again.
UPDATE virtual_lab_steps s
JOIN virtual_lab_experiments e ON e.id = s.experiment_id AND e.is_template = 1
SET s.hint = REPLACE(s.hint, 'its "Measure" panel opens at the bottom right.', 'its "Measure" panel opens under the "Fire" button.')
WHERE s.hint LIKE '%its "Measure" panel opens at the bottom right.%';
