-- Dry cell, lead-acid accumulator and amber conical flask; 3D models in labObjectFactory.ts. Safe to re-run.
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('dry_cell', 'Dry Cell (1.5 V)', 'physics', 'A 1.5 V zinc-carbon dry cell - the positive terminal is the brass cap on top, the negative is the flat base. Can power a simple circuit.', '{"voltage": 1.5}', '["move","rotate","connect","zoom","inspect"]', '🔋'),
('accumulator', 'Accumulator (12 V)', 'physics', 'A rechargeable 12 V lead-acid accumulator (car battery) made of six 2 V cells. Keep the electrolyte between the upper and lower level lines.', '{"voltage": 12}', '["move","rotate","connect","zoom","inspect"]', '🔋'),
('amber_conical_flask', 'Amber Conical Flask', 'chemistry', 'A 250 ml conical flask made of amber (brown) glass, which protects light-sensitive solutions such as silver nitrate and iodine.', '{"color": "#fde68a", "capacity_ml": 250}', '["move","rotate","pour","heat","measure","zoom","inspect"]', '🧪')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `default_props` = VALUES(`default_props`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`),
    `is_active` = 1;
