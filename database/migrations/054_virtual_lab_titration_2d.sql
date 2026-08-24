-- Additive-only: adds concentration props the new 2D titration chemistry model reads (with safe
-- defaults if absent, so no other experiment reusing burette/beaker object types is affected),
-- and switches the template to the new renderer. No step, target_object_key, expected_value, or
-- tolerance is touched - the 11 existing steps were traced against VirtualLabSceneTitration.vue's
-- emitted actions and all match unchanged.
--
-- titrant_concentration_m (0.1) matches the burette's existing "HCl (0.1M)" flavour text.
-- analyte_concentration_m (0.0992) is chosen so a real, live-simulated titration - 25ml of
-- analyte against 0.1M titrant - lands its true equivalence point at ~24.8ml, matching this
-- template's existing tolerance-graded expected value (24.8ml +/- 0.2ml) on step 10. This keeps
-- the chemistry self-consistent with the grading without the renderer ever reading step data.
UPDATE `virtual_lab_experiments`
SET `scene_objects` = JSON_SET(
        `scene_objects`,
        '$[0].props.titrant_concentration_m', 0.1,
        '$[1].props.analyte_concentration_m', 0.0992
    ),
    `render_mode` = '2d',
    `render_component` = 'titration'
WHERE `title` = 'Acid-Base Titration' AND `is_template` = 1;
