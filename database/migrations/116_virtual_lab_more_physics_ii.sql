-- Fork-mount telescope, continuous flow calorimeter, sonometer, Kundt's tube and Van de Graaff
-- generator; 3D models in labObjectFactory.ts. Safe to re-run.
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('sct_telescope', 'Reflecting Telescope (Fork Mount)', 'physics', 'A Schmidt-Cassegrain reflecting telescope on a fork mount, cut away to show inside. Light enters through the corrector plate, reflects off the large primary mirror at the back, then off the small secondary mirror and back through the baffle tube to the star diagonal and eyepiece. The base has a clock drive to follow the stars.', '{}', '["move","rotate","zoom","inspect"]', '🔭'),
('flow_calorimeter', 'Continuous Flow Calorimeter', 'physics', 'Callendar and Barnes continuous flow calorimeter: water flows steadily through a glass tube past an electric heating coil. From the current, voltage, flow rate and the temperature rise between inlet and outlet you find the specific heat capacity of water: VIt = mcΔθ + heat lost.', '{}', '["move","rotate","connect","measure","zoom","inspect"]', '🌡️'),
('sonometer', 'Sonometer', 'physics', 'A sonometer: wires stretched over two bridges on a hollow wooden sound box. Hang masses on the end to set the tension and move the bridges to change the vibrating length. Frequency f = (1/2L)√(T/μ) - halve the length and the frequency doubles.', '{}', '["move","rotate","measure","zoom","inspect"]', '🎼'),
('kundts_tube', 'Kundt''s Tube', 'physics', 'Kundt''s tube: a clear tube with a scale, holding light powder. A sound wave sent down the tube by the vibrating rod sets up a standing wave, and the powder gathers in heaps at the nodes. The distance between neighbouring heaps is half a wavelength, so v = f x 2d.', '{}', '["move","rotate","measure","zoom","inspect"]', '🌊'),
('van_de_graaff', 'Van de Graaff Generator', 'physics', 'A Van de Graaff generator: a motor drives a rubber belt up the column, carrying charge that collects on the polished metal dome until it reaches a very high voltage. Used to show electrostatic effects such as sparks and hair standing on end. Do not touch the dome while it is running.', '{}', '["move","rotate","switch_on","switch_off","zoom","inspect"]', '⚡')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `default_props` = VALUES(`default_props`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`),
    `is_active` = 1;
