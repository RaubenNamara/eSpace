-- New admin-curated template: "Human Body Systems".
-- A separate experiment - no existing practical is changed.
--
-- Bespoke 3D scene VirtualLabSceneHumanBody.vue (render_component 'human_body') in a plain white studio:
-- a neutral anatomical figure (lab3d/humanModel.ts) turned by dragging or a View menu. The student finds
-- its external parts, then - with see-through skin, the heart beating, the lungs and diaphragm breathing
-- and the gut moving - the internal organs; opens each body system (skeletal with named bones, muscular,
-- nervous, circulatory, respiratory, digestive, urinary, endocrine; anatomy planes cut the body open);
-- and places each organ in its system. Each action is checked against the step. Below the lab
-- (VirtualLabHumanBodyAnalysis.vue): a labelled diagram, organs and their functions, questions, the
-- conclusion and an assessment. Practical Brief: VirtualLabHumanBodyBrief.vue. Safe to re-run.

SET NAMES utf8mb4;

INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('human_body_model', 'Human Body Model', 'biology', 'A 3D anatomical model of the human body: the outside, the organs inside, and each body system.', '{}', '["rotate","inspect","move"]', '🧍')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`);

INSERT INTO `virtual_lab_experiments`
    (`title`, `subject_id`, `topic`, `category`, `difficulty`, `created_by`, `objective`, `introduction`, `apparatus`, `materials`, `safety_precautions`, `scene_objects`, `conclusion_prompt`, `marks`, `is_template`, `status`, `render_mode`, `render_component`, `template_key`, `template_version`)
SELECT
    'Human Body Systems', (SELECT id FROM subjects WHERE name = 'BIO' LIMIT 1), 'Organisation of the human body - organ systems', 'biology', 'beginner', NULL,
    'To identify the main external parts and internal organs of the human body, and to describe the organ systems they belong to and what they do.',
    'The human body is made of organ systems that work together to keep us alive: the skeleton holds us up, muscles move us, the nervous system controls everything, the heart and blood vessels carry materials round the body, the lungs bring in oxygen, the digestive system breaks down food, the kidneys clean the blood and glands send out hormones.\nIn this practical you will explore a 3D model of the human body. You will find its outer parts, look inside to find the main organs - watching the heart beat and the lungs breathe - open each body system in turn, and finally decide which system each organ belongs to.',
    '3D model of the human body.',
    'None (all apparatus is simulated).',
    'None - this is a model.',
    '[{"key":"body1","object_type":"human_body_model","position":{"x":0,"y":0,"z":0},"in_tray":false}]',
    'Summarise the main organ systems of the human body: name the organs in each and say what the system does.',
    30.00, 1, 'published', '2d', 'human_body', 'biology_human_body_systems', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_experiments` WHERE `template_key` = 'biology_human_body_systems');

SET @hb_id = (SELECT id FROM `virtual_lab_experiments` WHERE `template_key` = 'biology_human_body_systems' LIMIT 1);

-- Steps are only written while the experiment has none, so re-running never disturbs work in progress.
INSERT INTO `virtual_lab_steps` (`experiment_id`, `step_number`, `instruction`, `target_object_key`, `required_action`, `expected_value`, `tolerance`, `hint`, `feedback_correct`, `feedback_incorrect`, `is_safety_check`)
SELECT * FROM (
SELECT @hb_id AS e, 1 AS n, 'External parts: drag the body to turn it (or use the View menu at the bottom). Click each part on the "Find the parts" list: head, eyes, ears, nose, mouth, neck, chest, abdomen, arms and legs. Each is ticked when you find it.' AS ins, 'body1' AS tgt, 'inspect' AS act, 'external_parts' AS ev, NULL AS tol, 'Click directly on a part. The chest is the upper trunk, the abdomen the lower trunk.' AS h, 'All the external parts found.' AS fc, 'Find every part on the External list.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @hb_id AS e, 2 AS n, 'Internal organs: click the eye beside "Internal" (or choose Internal in the menu at the bottom) to see through the skin. Find the brain, heart, lungs, trachea, liver, stomach, small and large intestine, kidneys, bladder, pancreas and spleen - turn the body to see the kidneys from the back.' AS ins, 'body1' AS tgt, 'inspect' AS act, 'internal_parts' AS ev, NULL AS tol, 'With Internal on, clicks go through the skin to the organs. Watch the heart beat and the lungs breathe.' AS h, 'All the organs found.' AS fc, 'Find every organ on the Internal list.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @hb_id AS e, 3 AS n, 'Body systems: open each system from the menu at the bottom (or the list on the left) - skeletal, muscular, nervous, circulatory, respiratory, digestive, urinary and endocrine. Read its card, and click its parts to see what they do. Try the anatomy planes too.' AS ins, 'body1' AS tgt, 'inspect' AS act, 'systems_explored' AS ev, NULL AS tol, 'Each system is ticked on the list when you open it.' AS h, 'Every body system explored.' AS fc, 'Open every system on the list.' AS fi, 0 AS sc FROM DUAL
UNION ALL SELECT @hb_id AS e, 4 AS n, 'Organs and their systems: click an organ in the body, then click the system it belongs to (the boxes on the right). Place every organ on the list - a wrong box gives you a clue. Then answer the questions below.' AS ins, 'body1' AS tgt, 'move' AS act, 'organs_sorted' AS ev, NULL AS tol, 'Click an organ, then its system. The pancreas belongs to two systems - either box is right.' AS h, 'Every organ is in its system. Now answer the questions below.' AS fc, 'Place every organ in its system.' AS fi, 0 AS sc FROM DUAL
) AS new_steps
WHERE NOT EXISTS (SELECT 1 FROM `virtual_lab_steps` WHERE `experiment_id` = @hb_id);

-- Shared with the biology department (owner of its subject) while it has no departments yet.
INSERT IGNORE INTO `virtual_lab_experiment_departments` (`experiment_id`, `department_id`)
SELECT e.id, s.department_id
FROM `virtual_lab_experiments` e
INNER JOIN `subjects` s ON s.id = e.subject_id
WHERE e.id = @hb_id AND s.department_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM `virtual_lab_experiment_departments` x WHERE x.experiment_id = e.id);
