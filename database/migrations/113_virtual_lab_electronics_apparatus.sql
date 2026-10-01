-- Potentiometer, metre bridge, optical pyrometer, power transistor and electrolytic capacitor;
-- 3D models in labObjectFactory.ts. Safe to re-run.
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('potentiometer', 'Potentiometer (Rotary)', 'physics', 'A rotary potentiometer: a variable resistor with three lugs. The two outer lugs connect across the resistance track and the middle lug to the wiper, which moves as the shaft is turned - used as a voltage divider or volume control.', '{"resistance": 10000}', '["move","rotate","connect","zoom","inspect"]', '🎛️'),
('metre_bridge', 'Metre Bridge', 'physics', 'A slide-wire (metre) bridge: 1 m of uniform resistance wire stretched over a metre scale on a wooden board, with thick metal strips leaving two gaps for the known and unknown resistors. Slide the jockey along the wire to find the balance point, then R1/R2 = l/(100 - l).', '{"length_cm": 100}', '["move","rotate","connect","measure","zoom","inspect"]', '📏'),
('optical_pyrometer', 'Optical Pyrometer', 'physics', 'A disappearing-filament optical pyrometer, shown with its carrying case. Look at a very hot object through the eyepiece and turn the adjusting ring until the lamp filament disappears against it, then read its temperature off the scale - no contact needed.', '{}', '["move","rotate","measure","zoom","inspect"]', '🔭'),
('power_transistor', 'Power Transistor (TIP122)', 'physics', 'A TIP122 NPN Darlington power transistor in a TO-220 package. Facing the printed side, the legs are base, collector and emitter from left to right; the metal tab is joined to the collector and bolts to a heat sink.', '{"type": "NPN"}', '["move","rotate","connect","zoom","inspect"]', '🔳'),
('capacitor', 'Electrolytic Capacitor (2200 µF)', 'physics', 'A 2200 µF, 16 V radial electrolytic capacitor. It is polarised: the leg on the side of the black stripe with minus signs is negative and must go to the lower voltage. Never exceed 16 V across it.', '{"capacitance_uf": 2200, "voltage": 16}', '["move","rotate","connect","zoom","inspect"]', '⚡')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `default_props` = VALUES(`default_props`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`),
    `is_active` = 1;
