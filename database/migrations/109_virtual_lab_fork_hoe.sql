-- Fork hoe (three-pronged hand cultivator) for Agriculture; 3D model in labObjectFactory.ts. Safe to re-run.
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('fork_hoe', 'Fork Hoe', 'agriculture', 'A three-pronged hand hoe for breaking up hard soil, loosening the ground around crops and pulling out weeds.', '{}', '["move","rotate","zoom","inspect"]', '🔱')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `default_props` = VALUES(`default_props`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`),
    `is_active` = 1;
