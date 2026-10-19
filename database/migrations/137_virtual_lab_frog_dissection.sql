-- New admin-curated template: "Dissection of a Frog".
-- A separate experiment - no existing practical is changed.
--
-- Bespoke 3D scene VirtualLabSceneFrogDissection.vue (render_component 'frog_dissection') in a plain white studio.
-- Frog anatomy: a frog (lab3d/frogModel.ts) sitting up, turned by dragging (or a View menu), its external parts
-- found from a "Find the parts" list (eyes, nostrils, mouth, tympanum, skin, vocal sac, legs) and then, with
-- see-through skin and the heart beating and lungs breathing inside, six internal organs. Dissection: laid on
-- its back, pinned, opened with forceps and scissors along guide lines (skin, then the muscle wall beside the
-- abdominal vein), flaps pinned back, the heart watched through a hand lens; then the deep dissection - every
-- organ lifted out with forceps into its box. Each action is checked against the step. Below the lab
-- (VirtualLabFrogDissectionAnalysis.vue): a labelled diagram, organs and their functions, questions, the
-- conclusion and an assessment. Practical Brief: VirtualLabFrogDissectionBrief.vue. Safe to re-run.

-- The text has curly apostrophes and arrows - read it as UTF-8 whatever client imports it
SET NAMES utf8mb4;

-- Apparatus for the practical (the dissecting tray, forceps and hand lens are already in the catalogue)
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('preserved_frog', 'Preserved Frog', 'biology', 'A frog preserved for dissection, supplied in a jar of preservative. Handle it only with gloves.', '{}', '["move","rotate","inspect","zoom"]', '🐸'),
('dissecting_scissors', 'Dissecting Scissors', 'biology', 'Fine, sharp-pointed scissors for cutting skin and muscle in a dissection. Cut with the points lifted, away from the organs underneath.', '{}', '["move","inspect"]', '✂️'),
('dissecting_pins', 'Dissecting Pins', 'biology', 'Steel pins with coloured heads, pushed into the wax of a dissecting tray to hold a specimen and the flaps of skin in place.', '{}', '["move","inspect"]', '📌'),
('rubber_gloves', 'Rubber Gloves', 'biology', 'Disposable gloves worn when handling preserved specimens.', '{}', '["move"]', '🧤')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`);

INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`, `render_mode`, `render_component`, `template_key`, `template_version`)
SELECT
    'Dissection of a Frog', (SELECT id FROM subjects WHERE name = 'BIO' LIMIT 1), 'Animal organisation - the frog (an amphibian)', 'biology', 'intermediate', NULL,
    'To examine the external features of a frog, dissect it to expose the organs in its body cavity, and identify them and their positions.',
    'A Senior 2 biology class is studying how the body of a vertebrate is organised. The frog is an amphibian: it lives both in water and on land, and its organs are arranged in the same basic plan as those of other vertebrates, including humans.\nYour teacher has provided a preserved frog. You will first examine its external features, then dissect it to expose the organs in its body cavity and identify them.\nWork carefully: a good dissection opens the body without damaging the organs underneath.',
    'Preserved frog, dissecting pins, forceps, dissecting scissors, hand lens, rubber gloves.',
    'None (all apparatus is simulated).',
    'Wear gloves when handling the specimen. Scissors and pins are sharp - cut away from yourself and keep your fingers clear. Wash your hands afterwards and dispose of the specimen as your teacher directs.',
    '[{"key":"frog1","object_type":"preserved_frog","position":{"x":0,"y":0,"z":0},"in_tray":false},{"key":"gloves1","object_type":"rubber_gloves","position":{"x":0,"y":0,"z":0},"in_tray":true},{"key":"pins1","object_type":"dissecting_pins","position":{"x":0,"y":0,"z":0},"in_tray":true},{"key":"forceps1","object_type":"forceps","position":{"x":0,"y":0,"z":0},"in_tray":true},{"key":"scissors1","object_type":"dissecting_scissors","position":{"x":0,"y":0,"z":0},"in_tray":true},{"key":"lens1","object_type":"hand_lens","position":{"x":0,"y":0,"z":0},"in_tray":true}]',
    'Summarise what you observed: the external features of the frog and the organs you found in its body cavity, with their positions.',
    30.00, 1, 'published', '2d', 'frog_dissection', 'biology_frog_dissection', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'biology_frog_dissection');

SET @fd_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'biology_frog_dissection' LIMIT 1);

-- Steps are only written while the experiment has none, so re-running never disturbs work in progress.
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`)
SELECT * FROM (
SELECT @fd_id AS e, 1 AS n, 'Frog anatomy - external: drag the frog to turn it (or use the View menu at the bottom). Click each part on the "Find the parts" list: eyes, nostrils, mouth, external ears (tympanic membranes), skin, vocal sac and legs. Each is ticked when you find it.' AS ins, 'frog1' AS tgt, 'inspect' AS act, 'external_parts' AS ev, NULL AS tol, 'Click directly on a part. The vocal sac is the pale skin under the throat; the tympanum is the round disc behind the eye.' AS h, 'All seven external parts found.' AS fc, 'Find every part on the External list.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 2 AS n, 'Frog anatomy - internal: click the eye beside "Internal" (or choose Internal in the menu at the bottom) to see through the skin. Find the fat bodies, stomach, liver, lungs, heart and kidneys - turn the frog to see the kidneys from its back.' AS ins, 'frog1' AS tgt, 'inspect' AS act, 'internal_parts' AS ev, NULL AS tol, 'With the Internal eye on, clicks go through the skin to the organs. Watch the heart beat and the lungs breathe.' AS h, 'All six organs found.' AS fc, 'Find every organ on the Internal list.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 3 AS n, 'Equipment: put on the rubber gloves and take each instrument from the Apparatus Tray (top left) - pins, forceps, scissors and hand lens.' AS ins, NULL AS tgt, 'move' AS act, 'apparatus_ready' AS ev, NULL AS tol, 'Click every item in the Apparatus Tray, starting with the gloves.' AS h, 'Gloves on and the instruments ready.' AS fc, 'Take the remaining items from the Apparatus Tray.' AS fi, 1 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 4 AS n, 'Click "Lay it on its back to dissect" (panel on the right). The frog now lies on its back, ventral side up.' AS ins, 'frog1' AS tgt, 'move' AS act, 'tray' AS ev, NULL AS tol, 'The button is in the panel on the right.' AS h, 'The frog is on its back, ready to be pinned.' AS fc, 'Lay the frog on its back.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 5 AS n, 'Select "Pins" and click each of the four feet to pin the frog down - 4 pins.' AS ins, 'pins1' AS tgt, 'move' AS act, 'limbs_pinned' AS ev, NULL AS tol, 'Select Pins, then click each hand and each hind foot.' AS h, 'The frog is pinned out - it will not slip while you cut.' AS fc, 'Pin all four feet.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 6 AS n, 'Select "Forceps" and click the skin of the lower belly, just in front of the hind legs, to grip it and lift it up.' AS ins, 'forceps1' AS tgt, 'move' AS act, 'skin_lifted' AS ev, NULL AS tol, 'Select Forceps, then click the belly skin near the hind legs.' AS h, 'The skin is lifted away from the organs underneath.' AS fc, 'Lift the skin of the lower belly with the forceps.' AS fi, 1 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 7 AS n, 'Select "Scissors". Press on the green ring at the start of the dotted line and drag along the line, up the middle of the belly to the chest, to cut the skin.' AS ins, 'scissors1' AS tgt, 'move' AS act, 'skin_cut' AS ev, NULL AS tol, 'Start on the green ring (near the hind legs) and keep the scissors on the dotted line all the way up.' AS h, 'The skin is cut along the midline.' AS fc, 'Cut along the dotted line from the green ring to the chest.' AS fi, 1 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 8 AS n, 'Select "Pins" and click each flap of skin - left and right of the cut - to fold it back and pin it. You can now see the muscle wall.' AS ins, 'pins1' AS tgt, 'move' AS act, 'skin_pinned' AS ev, NULL AS tol, 'Click the skin on each side of the cut with the Pins selected.' AS h, 'Both flaps of skin are pinned back.' AS fc, 'Pin back both flaps of skin.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 9 AS n, 'Notice the dark abdominal vein running up the middle of the muscle wall. Select "Forceps" and click the muscle wall of the lower belly to lift it.' AS ins, 'forceps1' AS tgt, 'move' AS act, 'muscle_lifted' AS ev, NULL AS tol, 'Select Forceps, then click the pink muscle wall near the hind legs.' AS h, 'The muscle wall is lifted.' AS fc, 'Lift the muscle wall of the lower belly with the forceps.' AS fi, 1 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 10 AS n, 'Select "Scissors" and cut along the new dotted line - it runs just to one side of the abdominal vein, so the vein is not cut - from the green ring up to the chest.' AS ins, 'scissors1' AS tgt, 'move' AS act, 'muscle_cut' AS ev, NULL AS tol, 'Start on the green ring and keep to the dotted line beside the vein.' AS h, 'The muscle wall is cut without damaging the abdominal vein.' AS fc, 'Cut along the dotted line beside the vein.' AS fi, 1 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 11 AS n, 'Select "Pins" and click each flap of muscle to fold it back and pin it. The organs are exposed - click any of them with "Hand" to read what it does.' AS ins, 'pins1' AS tgt, 'move' AS act, 'muscle_pinned' AS ev, NULL AS tol, 'Click the muscle on each side of the cut with the Pins selected.' AS h, 'The body cavity is open. With "Living functions" on, the heart beats, the lungs breathe and the intestine moves.' AS fc, 'Pin back both flaps of muscle.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 12 AS n, 'Select "Hand lens" and click the heart to watch it beat. Count its chambers: the two thin-walled atria at the front contract first, then the thick-walled ventricle behind them. Then click "Put the lens down".' AS ins, 'frog1' AS tgt, 'zoom' AS act, 'heart' AS ev, NULL AS tol, 'Select Hand lens, then click the heart.' AS h, 'The frog’s heart has three chambers: two atria and one ventricle.' AS fc, 'Look at the heart through the hand lens.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @fd_id AS e, 13 AS n, 'Deep dissection: select "Forceps", click an organ to lift it out, then click the box it belongs in (boxes at the bottom). Take out every organ - the kidneys and testes, spleen, pancreas and bladder lie underneath the others. Then answer the questions below.' AS ins, 'forceps1' AS tgt, 'move' AS act, 'organs_sorted' AS ev, NULL AS tol, 'Lift an organ with the forceps, then click its box. A wrong box gives you a clue.' AS h, 'Every organ is in its box. Now answer the questions below.' AS fc, 'Put every organ in its box.' AS fi, 0 AS sc FROM DUAL
) AS new_steps
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_steps` WHERE `experiment_id` = @fd_id);

-- Shared with the biology department (owner of its subject) while it has no departments yet.
INSERT IGNORE INTO `virtual_lab_experiment_departments` (`experiment_id`, `department_id`)
SELECT e.id, s.department_id
FROM `virtual_lab_experiments` e
INNER JOIN `subjects` s ON s.id = e.subject_id
WHERE e.id = @fd_id AND s.department_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM `virtual_lab_experiment_departments` x WHERE x.experiment_id = e.id);
