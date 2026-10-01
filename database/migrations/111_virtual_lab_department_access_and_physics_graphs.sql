-- Virtual Lab library access by department + compulsory graphs for physics.
-- Safe to re-run.

-- ---------------------------------------------------------------------------------------------
-- 1. Which departments may use each library (admin/template) experiment. A teacher sees a
--    library experiment, and can publish it to their classes, only when the admin has shared it
--    with the teacher's department.
-- ---------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `virtual_lab_experiment_departments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `experiment_id` INT UNSIGNED NOT NULL,
    `department_id` INT UNSIGNED NOT NULL,
    `shared_by` INT UNSIGNED NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_experiment_department` (`experiment_id`, `department_id`),
    KEY `idx_lab_exp_dept_department` (`department_id`),
    CONSTRAINT `fk_lab_exp_dept_experiment` FOREIGN KEY (`experiment_id`) REFERENCES `virtual_lab_experiments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lab_exp_dept_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Start each existing library experiment off shared with the department that owns its subject,
-- so teachers keep the experiments they already use. The admin can add or remove departments.
INSERT IGNORE INTO `virtual_lab_experiment_departments` (`experiment_id`, `department_id`)
SELECT e.id, s.department_id
FROM `virtual_lab_experiments` e
INNER JOIN `subjects` s ON s.id = e.subject_id
WHERE e.is_template = 1 AND e.deleted_at IS NULL AND s.department_id IS NOT NULL;

-- Library experiments whose subject has no department (or no subject at all) would otherwise be
-- invisible to every teacher - keep them available to all departments, as they were before, until
-- the admin narrows them down.
INSERT IGNORE INTO `virtual_lab_experiment_departments` (`experiment_id`, `department_id`)
SELECT e.id, d.id
FROM `virtual_lab_experiments` e
CROSS JOIN `departments` d
WHERE e.is_template = 1 AND e.deleted_at IS NULL
  AND NOT EXISTS (SELECT 1 FROM `virtual_lab_experiment_departments` x WHERE x.experiment_id = e.id);

-- ---------------------------------------------------------------------------------------------
-- 2. Physics: every experiment that records readings now needs a graph plotted by the student
--    (at least 3 points, line of best fit) and a gradient question about it.
-- ---------------------------------------------------------------------------------------------
INSERT INTO `virtual_lab_graph_configs` (`experiment_id`, `enabled`, `title`, `x_column`, `y_column`, `x_label`, `y_label`, `graph_type`, `allow_axis_change`, `min_points`, `show_best_fit`, `manual_plot`)
SELECT e.id, 1, g.title, g.x_col, g.y_col, g.x_label, g.y_label, 'scatter', 0, 3, 1, 1
FROM `virtual_lab_experiments` e
JOIN (
    SELECT 'hookes_law' k, 'Force against Extension' title, 'extension_cm' x_col, 'force_n' y_col, 'Extension e (cm)' x_label, 'Force F (N)' y_label
    UNION ALL SELECT 'elastic_limit_spring', 'Force against Extension', 'extension_cm', 'force_n', 'Extension e (cm)', 'Force F (N)'
    UNION ALL SELECT 'ohms_law', 'Voltage against Current', 'current', 'voltage', 'Current I (A)', 'Voltage V (V)'
    UNION ALL SELECT 'resistance_of_conductor', 'Voltage against Current', 'current', 'voltage', 'Current I (A)', 'Voltage V (V)'
    UNION ALL SELECT 'series_circuit', 'Voltage against Current', 'current', 'voltage', 'Current I (A)', 'Voltage V (V)'
    UNION ALL SELECT 'bulb_brightness_power', 'Voltage against Current', 'current', 'voltage', 'Current I (A)', 'Voltage V (V)'
    UNION ALL SELECT 'reflection_laws', 'Angle of Reflection against Angle of Incidence', 'incidence_deg', 'reflection_deg', 'Angle of incidence i (degrees)', 'Angle of reflection r (degrees)'
    UNION ALL SELECT 'refraction_glass_block', 'sin i against sin r', 'sin_refraction', 'sin_incidence', 'sin r', 'sin i'
) g ON g.k = e.template_key
WHERE e.deleted_at IS NULL
ON DUPLICATE KEY UPDATE `enabled` = 1, `title` = VALUES(`title`), `x_column` = VALUES(`x_column`), `y_column` = VALUES(`y_column`),
    `x_label` = VALUES(`x_label`), `y_label` = VALUES(`y_label`), `graph_type` = 'scatter', `allow_axis_change` = 0,
    `min_points` = 3, `show_best_fit` = 1, `manual_plot` = 1;

-- The pendulum experiments already have their T squared against L graph - students now plot it themselves too
UPDATE `virtual_lab_graph_configs` gc
INNER JOIN `virtual_lab_experiments` e ON e.id = gc.experiment_id
SET gc.enabled = 1, gc.manual_plot = 1, gc.show_best_fit = 1, gc.min_points = GREATEST(gc.min_points, 3)
WHERE e.template_key IN ('simple_pendulum', 'pendulum_length_period');

INSERT INTO `virtual_lab_questions` (`experiment_id`, `question_number`, `question_text`, `question_type`, `stage`, `requirement`, `linked_to_graph`, `marks`)
SELECT e.id, (SELECT COALESCE(MAX(q.question_number), 0) + 1 FROM `virtual_lab_questions` q WHERE q.experiment_id = e.id), g.question, 'calculation', 'after_experiment', 'notebook_only', 1, 6.00
FROM `virtual_lab_experiments` e
JOIN (
    SELECT 'hookes_law' k, 'Take at least 3 readings (add a mass, measure, then Add to Results Table each time) and plot Force F against Extension e. Find the gradient of your line of best fit, showing the two points you used. Convert e to metres and give the spring constant k in N/m.' question
    UNION ALL SELECT 'elastic_limit_spring', 'Plot Force F against Extension e for at least 3 readings. Find the gradient of the straight part of your graph (the spring constant k, in N/m) and mark where the line stops being straight (the elastic limit).'
    UNION ALL SELECT 'ohms_law', 'Take at least 3 readings (change the battery voltage, measure V and I, then Add to Results Table each time) and plot Voltage V against Current I. Find the gradient of your line of best fit, showing your working. What does the gradient represent?'
    UNION ALL SELECT 'resistance_of_conductor', 'Plot Voltage V against Current I for at least 3 readings. The gradient of your line of best fit is the resistance of the conductor - find it, showing your working, and compare it with the colour-band value.'
    UNION ALL SELECT 'series_circuit', 'Plot Voltage V against Current I for at least 3 readings. Find the gradient of your line of best fit and state what it tells you about the total resistance of the series circuit.'
    UNION ALL SELECT 'bulb_brightness_power', 'Plot Voltage V against Current I for at least 3 readings. Find the gradient between your first two and last two points. Is the graph a straight line? Explain what this shows about the bulb filament.'
    UNION ALL SELECT 'reflection_laws', 'Plot the angle of reflection r against the angle of incidence i for at least 3 readings. Find the gradient of your line of best fit. What law of reflection does it confirm?'
    UNION ALL SELECT 'refraction_glass_block', 'Plot sin i against sin r for at least 3 readings. Find the gradient of your line of best fit, showing your working. This gradient is the refractive index n of the glass - how close is it to 1.5?'
) g ON g.k = e.template_key
WHERE e.deleted_at IS NULL
  AND NOT EXISTS (SELECT 1 FROM `virtual_lab_questions` x WHERE x.experiment_id = e.id AND x.linked_to_graph = 1);
