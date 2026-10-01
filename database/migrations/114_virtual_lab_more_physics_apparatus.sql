-- Transformer, twin flex wire, toroidal inductor, micrometer screw gauge and vernier caliper;
-- 3D models in labObjectFactory.ts. Safe to re-run.
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('transformer', 'Transformer', 'physics', 'A transformer: two copper coils wound on a laminated soft-iron core. An alternating current in the primary coil makes a changing magnetic field in the core, which induces a voltage in the secondary. Vs/Vp = Ns/Np.', '{"primary_turns": 200, "secondary_turns": 100}', '["move","rotate","connect","zoom","inspect"]', '🧲'),
('twin_flex_wire', 'Twin Flex Wire (Red/Black)', 'physics', 'A coil of red and black twisted twin flex for connecting circuits. By convention red is used for the positive side and black for the negative side.', '{}', '["move","rotate","connect","zoom","inspect"]', '🔌'),
('toroid_inductor', 'Toroidal Inductor', 'physics', 'An inductor made of enamelled copper wire wound round a ring-shaped (toroidal) ferrite core. The ring keeps the magnetic field inside the core, so it stores energy well and interferes little with nearby parts.', '{}', '["move","rotate","connect","zoom","inspect"]', '🌀'),
('micrometer', 'Micrometer Screw Gauge', 'physics', 'A micrometer screw gauge reading 0-25 mm to 0.01 mm. Close the spindle on the object with the ratchet, read the last mm or half-mm visible on the sleeve, then add the thimble division in line with the sleeve line x 0.01 mm. Check the zero error first.', '{"range_mm": 25, "precision_mm": 0.01}', '["move","rotate","measure","zoom","inspect"]', '🔩'),
('vernier_caliper', 'Vernier Caliper', 'physics', 'A vernier caliper reading to 0.02 mm. Use the outside jaws for lengths and diameters, the inside jaws for internal diameters and the depth rod for depths. Reading = main-scale value before the vernier zero + (vernier line that coincides x 0.02 mm).', '{"range_mm": 150, "precision_mm": 0.02}', '["move","rotate","measure","zoom","inspect"]', '📐')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `default_props` = VALUES(`default_props`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`),
    `is_active` = 1;
