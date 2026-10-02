-- Tape measure, triple beam balance, carbon resistor and two telescopes; 3D models in
-- labObjectFactory.ts. Safe to re-run.
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('tape_measure', 'Tape Measure', 'physics', 'A retractable 5 m (25 ft) steel tape measure, marked in cm and mm. Hook the end over the edge of what you are measuring, pull the blade out straight and read where it meets the other end. Press the lock button to hold the blade.', '{"length_m": 5}', '["move","rotate","measure","zoom","inspect"]', '📏'),
('triple_beam_balance', 'Triple Beam Balance', 'physics', 'A triple beam balance measuring mass to 0.1 g (up to 610 g). Zero it first, place the object on the pan, then slide the riders - 100 g, 10 g, then the 0-10 g one - until the pointer lines up with the zero mark. Mass = the sum of the three rider readings.', '{"max_g": 610, "precision_g": 0.1}', '["move","rotate","measure","zoom","inspect"]', '⚖️'),
('carbon_resistor', 'Carbon Resistor (1 kΩ)', 'physics', 'A carbon film resistor. Its colour bands give its value: brown (1), black (0), red (x100) = 1000 Ω = 1 kΩ, and the gold band means ±5% tolerance. Read the bands starting from the end furthest from the gold band.', '{"resistance": 1000, "tolerance": 5}', '["move","rotate","connect","zoom","inspect"]', '🟫'),
('antique_telescope', 'Antique Telescope', 'physics', 'An old-style telescope with a brass-banded tube on a wooden tripod. Light from a distant object passes through the objective lens at the front and is magnified by the eyepiece at the back.', '{}', '["move","rotate","zoom","inspect"]', '🔭'),
('telescope', 'Refracting Telescope', 'physics', 'A refracting telescope on a tripod. The large objective lens forms an image of a distant object (such as the Moon) and the eyepiece magnifies it. Magnification = focal length of objective / focal length of eyepiece. Never look at the Sun through it.', '{"objective_mm": 360, "eyepiece_mm": 20}', '["move","rotate","zoom","inspect"]', '🔭')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `default_props` = VALUES(`default_props`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`),
    `is_active` = 1;
