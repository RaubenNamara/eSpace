-- Apparatus expansion: more equipment for every subject, plus an Agriculture group (which had no
-- apparatus of its own). Each object_type has a matching 3D model in
-- frontend/src/components/virtuallab/labObjectFactory.ts. Safe to re-run (upsert on object_type).

ALTER TABLE `virtual_lab_objects`
    MODIFY COLUMN `category` ENUM('physics','chemistry','biology','agriculture','general') NOT NULL DEFAULT 'general';

INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
-- Chemistry
('conical_flask', 'Conical Flask', 'chemistry', 'A flask with a wide base and narrow neck - liquids can be swirled without spilling, ideal for titrations and reactions.', '{"color": "#e0f2fe", "capacity_ml": 250}', '["move","rotate","pour","heat","measure","zoom","inspect"]', '🧪'),
('round_bottom_flask', 'Round-Bottom Flask', 'chemistry', 'A flask with a spherical bulb that heats evenly - used for boiling and distillation.', '{"color": "#e0f2fe", "capacity_ml": 250}', '["move","rotate","pour","heat","measure","zoom","inspect"]', '⚗️'),
('evaporating_dish', 'Evaporating Dish', 'chemistry', 'A shallow porcelain dish used to evaporate a solvent and leave the dissolved solid behind.', '{"color": "#bae6fd", "capacity_ml": 50}', '["move","rotate","pour","heat","zoom","inspect"]', '🥣'),
('tripod_stand', 'Tripod Stand', 'chemistry', 'A three-legged iron stand that holds a wire gauze and container above a Bunsen burner.', '{}', '["move","rotate","zoom","inspect"]', '🔺'),
('wire_gauze', 'Wire Gauze', 'chemistry', 'A wire mesh with a ceramic centre placed on a tripod to spread the heat of a flame evenly.', '{}', '["move","rotate","zoom","inspect"]', '🔳'),
('filter_funnel', 'Filter Funnel', 'chemistry', 'A glass funnel lined with filter paper, used to separate an insoluble solid from a liquid.', '{}', '["move","rotate","zoom","inspect"]', '🔻'),
('test_tube_rack', 'Test Tube Rack', 'chemistry', 'A wooden rack that holds test tubes upright.', '{}', '["move","rotate","zoom","inspect"]', '🧫'),
('spatula', 'Spatula', 'chemistry', 'A small metal scoop for transferring solid chemicals.', '{}', '["move","rotate","zoom","inspect"]', '🥄'),
('wash_bottle', 'Wash Bottle', 'chemistry', 'A squeeze bottle of distilled water used for rinsing apparatus and topping up solutions.', '{"color": "#e0f2fe", "capacity_ml": 500}', '["move","rotate","pour","zoom","inspect"]', '🧴'),
('dropper', 'Dropper', 'chemistry', 'A glass dropper with a rubber teat for adding indicator or reagent drop by drop.', '{}', '["move","rotate","zoom","inspect"]', '💧'),
('crucible', 'Crucible and Lid', 'chemistry', 'A heat-resistant porcelain cup for heating solids strongly.', '{}', '["move","rotate","heat","zoom","inspect"]', '🏺'),
-- Physics
('bar_magnet', 'Bar Magnet', 'physics', 'A permanent magnet with a north (red) and south (blue) pole - used to study magnetic fields.', '{}', '["move","rotate","zoom","inspect"]', '🧲'),
('plotting_compass', 'Plotting Compass', 'physics', 'A small compass whose needle lines up with a magnetic field - used to plot field lines.', '{}', '["move","rotate","zoom","inspect"]', '🧭'),
('prism', 'Triangular Prism', 'physics', 'A triangular glass prism used to show refraction and the dispersion of white light.', '{"refractive_index": 1.5}', '["move","rotate","zoom","inspect"]', '🔷'),
('rheostat', 'Rheostat', 'physics', 'A variable resistor - sliding the contact changes the resistance and so the current in a circuit.', '{"resistance_ohm": 20}', '["move","rotate","connect","zoom","inspect"]', '🎚️'),
('metre_rule', 'Metre Rule', 'physics', 'A 1 m wooden rule for measuring longer lengths.', '{}', '["move","rotate","measure","zoom","inspect"]', '📏'),
('galvanometer', 'Galvanometer', 'physics', 'A sensitive meter that detects very small currents - its needle swings either way from the centre zero.', '{"unit": "mA"}', '["move","rotate","connect","zoom","inspect"]', '📟'),
('tuning_fork', 'Tuning Fork', 'physics', 'A steel fork that vibrates at one fixed frequency when struck - used in sound and resonance experiments.', '{"frequency_hz": 256}', '["move","rotate","zoom","inspect"]', '🎵'),
('pulley', 'Pulley', 'physics', 'A grooved wheel on a clamp stand used to study simple machines, load and effort.', '{}', '["move","rotate","zoom","inspect"]', '⚙️'),
-- Biology
('petri_dish', 'Petri Dish', 'biology', 'A shallow dish of nutrient agar for growing and observing microorganism colonies.', '{"color": "#fde68a"}', '["move","rotate","zoom","inspect"]', '🧫'),
('hand_lens', 'Hand Lens', 'biology', 'A magnifying glass for examining specimens such as leaves, flowers and insects.', '{"magnification": "10x"}', '["move","rotate","zoom","inspect"]', '🔍'),
('scalpel', 'Scalpel', 'biology', 'A very sharp blade for making clean cuts during dissections. Always cut away from yourself.', '{}', '["move","rotate","zoom","inspect"]', '🔪'),
('forceps', 'Forceps', 'biology', 'Fine tweezers for holding and lifting small or delicate tissues.', '{}', '["move","rotate","zoom","inspect"]', '🥢'),
('dissecting_tray', 'Dissecting Tray', 'biology', 'A wax-lined tray with pins, used to hold a specimen in place during dissection.', '{}', '["move","rotate","zoom","inspect"]', '🗂️'),
('specimen_bottle', 'Specimen Bottle', 'biology', 'A screw-top jar for storing preserved specimens or collected samples.', '{"color": "#fef3c7", "capacity_ml": 250}', '["move","rotate","pour","zoom","inspect"]', '🫙'),
('potted_plant', 'Potted Plant', 'biology', 'A living plant in soil - for experiments on photosynthesis, transpiration and growth.', '{}', '["move","rotate","zoom","inspect"]', '🪴'),
-- Agriculture
('soil_sieve', 'Soil Sieve', 'agriculture', 'A mesh sieve for separating soil into particle sizes (gravel, sand, silt and clay).', '{}', '["move","rotate","zoom","inspect"]', '🧺'),
('rain_gauge', 'Rain Gauge', 'agriculture', 'A funnel and graduated cylinder that collects and measures rainfall.', '{"color": "#bfdbfe", "capacity_ml": 200}', '["move","rotate","pour","measure","zoom","inspect"]', '🌧️'),
('watering_can', 'Watering Can', 'agriculture', 'A can with a rose spout for watering seedlings gently.', '{"color": "#bfdbfe", "capacity_ml": 2000}', '["move","rotate","pour","zoom","inspect"]', '🚿'),
('seed_tray', 'Seed Tray', 'agriculture', 'A shallow tray of soil for germinating seeds and raising seedlings.', '{}', '["move","rotate","zoom","inspect"]', '🌱'),
('garden_trowel', 'Garden Trowel', 'agriculture', 'A small hand tool for digging, transplanting seedlings and taking soil samples.', '{}', '["move","rotate","zoom","inspect"]', '🥄'),
('hand_hoe', 'Hand Hoe', 'agriculture', 'A long-handled hoe for weeding and loosening soil.', '{}', '["move","rotate","zoom","inspect"]', '⛏️'),
('soil_auger', 'Soil Auger', 'agriculture', 'A screw-shaped tool twisted into the ground to bring up a soil core from below the surface.', '{}', '["move","rotate","zoom","inspect"]', '🔩'),
('soil_sample', 'Soil Samples', 'agriculture', 'A tray of clay, loam and sandy soil for comparing texture, drainage and water retention.', '{}', '["move","rotate","zoom","inspect"]', '🟤'),
-- General
('safety_goggles', 'Safety Goggles', 'general', 'Eye protection that must be worn whenever chemicals are handled or anything is heated.', '{}', '["move","rotate","zoom","inspect"]', '🥽'),
('crucible_tongs', 'Crucible Tongs', 'general', 'Long metal tongs for gripping hot crucibles and containers.', '{}', '["move","rotate","zoom","inspect"]', '🗜️'),
('heat_proof_mat', 'Heat-Proof Mat', 'general', 'A fire-resistant mat that protects the bench under a Bunsen burner or hot apparatus.', '{}', '["move","rotate","zoom","inspect"]', '🟫')
ON DUPLICATE KEY UPDATE
    `display_name` = VALUES(`display_name`),
    `category` = VALUES(`category`),
    `description` = VALUES(`description`),
    `default_props` = VALUES(`default_props`),
    `supported_actions` = VALUES(`supported_actions`),
    `icon` = VALUES(`icon`),
    `is_active` = 1;
