-- Ripple tank; 3D model in labObjectFactory.ts. Safe to re-run.
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('ripple_tank', 'Ripple Tank', 'physics', 'A ripple tank: a glass-sided tray of shallow water. A vibrating dipper sends plane waves across the surface, and barriers and obstacles in the water show reflection, refraction and diffraction. Measure the distance between neighbouring crests to find the wavelength, then use v = f x wavelength.', '{}', '["move","rotate","measure","zoom","inspect"]', '💧')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `default_props` = VALUES(`default_props`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`),
    `is_active` = 1;
