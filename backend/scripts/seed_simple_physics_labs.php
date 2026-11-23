<?php
/**
 * Seeds very simple Physics Virtual Lab templates for S.1 and S.2 (few steps each).
 * They reuse existing scenes (pendulum, hookes_law, circuit, optics, moments_balance and the 3D
 * bench), so no frontend change is needed.
 * Safe to re-run: a template whose template_key already exists is skipped.
 *
 * Usage: php backend/scripts/seed_simple_physics_labs.php
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

$db = \eSpace\Config\Database::getInstance();

const PHYSICS_SUBJECT_ID = 9;
const PHYSICS_DEPARTMENT_ID = 5;

$templates = [
    [
        'template_key' => 'physics_s1_pendulum_swing',
        'title' => 'S.1 Timing a Simple Pendulum',
        'topic' => 'Measurement: Time',
        'render_component' => 'pendulum',
        'engine_version' => 'pendulum-2d-v1',
        'minutes' => 15,
        'marks' => 10,
        'skills' => ['measuring_length', 'measuring_time', 'recording_observations'],
        'objective' => 'To measure the time for one complete swing of a simple pendulum.',
        'introduction' => 'A pendulum is a small weight (bob) hanging on a string. One complete swing (one oscillation) is when the bob moves from one side to the other and back again. Timing one swing is hard because it is so quick, so we time 10 swings and divide by 10.',
        'apparatus' => 'Pendulum bob on a string, ruler, stopwatch.',
        'safety' => 'None.',
        'scene' => [
            ['key' => 'bob1', 'object_type' => 'specimen', 'position' => ['x' => -0.8, 'y' => 0, 'z' => 0], 'props' => ['length_cm' => 50, 'mass_g' => 50]],
            ['key' => 'ruler1', 'object_type' => 'ruler', 'position' => ['x' => 0.8, 'y' => 0, 'z' => 0.8]],
            ['key' => 'stopwatch1', 'object_type' => 'stopwatch', 'position' => ['x' => 0.8, 'y' => 0, 'z' => -0.8]],
        ],
        'steps' => [
            ['Look closely at the pendulum bob and string.', 'bob1', 'inspect', null, null, null],
            ['Measure the length of the string using the ruler.', 'ruler1', 'measure', '50', 1.0, 'Select the ruler, choose Measure, then click the bob.'],
            ['Start the stopwatch as you let the bob go.', 'stopwatch1', 'switch_on', null, null, 'Select the stopwatch and press Start.'],
            ['Count 10 complete swings, then stop the stopwatch.', 'stopwatch1', 'switch_off', null, null, 'One swing is from one side, to the other side, and back.'],
            ['Read the time on the stopwatch.', 'stopwatch1', 'measure', null, null, 'Select the stopwatch and press Read Time.'],
        ],
        'questions' => [
            ['What was the length of the string in cm?', 'observation', null, 2],
            ['How long did 10 swings take?', 'observation', null, 2],
            ['Find the time for one swing: time for 10 swings divided by 10.', 'calculation', null, 4],
            ['Why do we time 10 swings instead of just one?', 'short_answer', 'One swing is too quick to time accurately; timing many swings and dividing reduces the error.', 2],
        ],
        'conclusion' => 'Write one sentence about what you found out.',
    ],
    [
        'template_key' => 'physics_s1_stretching_spring',
        'title' => 'S.1 Stretching a Spring',
        'topic' => 'Forces: Stretching',
        'render_component' => 'hookes_law',
        'engine_version' => 'hookes-law-2d-v1',
        'minutes' => 15,
        'marks' => 10,
        'skills' => ['measuring_length', 'recording_observations'],
        'objective' => 'To see how a spring stretches when a mass is hung on it.',
        'introduction' => 'When you hang a mass on a spring, the weight of the mass pulls the spring and it gets longer. The extra length is called the extension. Extension = stretched length minus original length.',
        'apparatus' => 'Retort stand, spring, 100g mass, ruler.',
        'safety' => 'Do not hang too many masses on the spring or it will be damaged.',
        'scene' => [
            ['key' => 'stand1', 'object_type' => 'retort_stand', 'position' => ['x' => -1.5, 'y' => 0, 'z' => 0], 'in_tray' => true],
            ['key' => 'spring1', 'object_type' => 'spring', 'position' => ['x' => -1.5, 'y' => 0, 'z' => 0.9], 'props' => ['natural_length_cm' => 15, 'spring_constant_n_per_m' => 40, 'max_safe_extension_cm' => 12], 'in_tray' => true],
            ['key' => 'ruler1', 'object_type' => 'ruler', 'position' => ['x' => 1.5, 'y' => 0, 'z' => 0], 'in_tray' => true],
            ['key' => 'mass100', 'object_type' => 'mass_piece', 'position' => ['x' => 0.85, 'y' => 0, 'z' => 1.2], 'props' => ['mass_g' => 100], 'in_tray' => true],
        ],
        'steps' => [
            ['Set up the retort stand on the bench.', 'stand1', 'move', 'stand1', null, null],
            ['Hang the spring on the clamp of the retort stand.', 'spring1', 'move', 'stand1', null, 'Drag the spring close to the arm of the stand.'],
            ['Pick up the ruler and measure the length of the spring.', 'ruler1', 'measure', null, null, 'Select the ruler, click Measure, then click the spring.'],
            ['Hang the 100g mass on the spring.', 'mass100', 'move', 'spring1', null, 'Drag the mass to the bottom of the spring.'],
            ['Measure the new length of the spring.', 'ruler1', 'measure', null, null, 'Measure it the same way as before.'],
        ],
        'questions' => [
            ['What was the length of the spring before adding the mass?', 'observation', null, 2],
            ['What was the length of the spring with the 100g mass?', 'observation', null, 2],
            ['Find the extension: new length minus original length.', 'calculation', null, 4],
            ['What do you think will happen if you hang a bigger mass?', 'short_answer', 'The spring will stretch more (bigger extension).', 2],
        ],
        'conclusion' => 'Complete: When a mass is hung on a spring, the spring ...',
    ],
    [
        'template_key' => 'physics_s2_lighting_bulb',
        'title' => 'S.2 Lighting a Bulb in a Simple Circuit',
        'topic' => 'Electricity: Simple Circuits',
        'render_component' => 'circuit',
        'engine_version' => 'circuit-2d-v1',
        'minutes' => 15,
        'marks' => 10,
        'skills' => ['circuit_construction', 'recording_observations'],
        'objective' => 'To build a simple circuit that lights a bulb and to see what a switch does.',
        'introduction' => 'Electric current only flows when there is a complete path (a closed circuit) from the battery, through the bulb, and back to the battery. A switch opens or closes this path.',
        'apparatus' => 'Battery, switch, bulb, connecting wires.',
        'safety' => 'Never connect the two ends of a battery directly to each other.',
        'scene' => [
            ['key' => 'battery1', 'object_type' => 'battery', 'position' => ['x' => -3, 'y' => 0, 'z' => 0], 'in_tray' => true],
            ['key' => 'switch1', 'object_type' => 'switch', 'position' => ['x' => -1.5, 'y' => 0, 'z' => 0], 'in_tray' => true],
            ['key' => 'bulb1', 'object_type' => 'bulb', 'position' => ['x' => 0, 'y' => 0, 'z' => 0], 'props' => ['rating_v' => 6], 'in_tray' => true],
        ],
        'steps' => [
            ['Connect a wire from the battery to the switch.', 'switch1', 'connect', 'battery1', null, null],
            ['Connect a wire from the switch to the bulb.', 'bulb1', 'connect', 'switch1', null, null],
            ['Connect a wire from the bulb back to the battery.', 'battery1', 'connect', 'bulb1', null, 'This completes the circuit.'],
            ['Close the switch and watch the bulb.', 'switch1', 'switch_on', null, null, null],
            ['Open the switch and watch the bulb again.', 'switch1', 'switch_off', null, null, null],
        ],
        'questions' => [
            ['What happened to the bulb when you closed the switch?', 'observation', 'The bulb lit up.', 2],
            ['What happened to the bulb when you opened the switch?', 'observation', 'The bulb went off.', 2],
            ['Explain why the bulb goes off when the switch is open.', 'short_answer', 'The circuit is broken (incomplete), so no current flows.', 3],
            ['Draw the circuit diagram using the correct symbols for a battery, switch and bulb.', 'procedure', null, 3],
        ],
        'conclusion' => 'What is needed for a bulb to light?',
    ],
    [
        'template_key' => 'physics_s1_pendulum_length',
        'title' => 'S.1 Does a Longer Pendulum Swing Slower?',
        'topic' => 'Measurement: Time',
        'render_component' => 'pendulum',
        'engine_version' => 'pendulum-2d-v1',
        'minutes' => 20,
        'marks' => 10,
        'skills' => ['measuring_length', 'measuring_time', 'recording_observations'],
        'objective' => 'To find out whether a longer pendulum takes more or less time to swing.',
        'introduction' => 'You will time 10 swings of a short pendulum, then make the string longer and time 10 swings again. Comparing the two times tells you how the length of the string affects the swing.',
        'apparatus' => 'Pendulum bob on a string, ruler, stopwatch.',
        'safety' => 'None.',
        'scene' => [
            ['key' => 'bob1', 'object_type' => 'specimen', 'position' => ['x' => -0.8, 'y' => 0, 'z' => 0], 'props' => ['length_cm' => 20, 'mass_g' => 50]],
            ['key' => 'ruler1', 'object_type' => 'ruler', 'position' => ['x' => 0.8, 'y' => 0, 'z' => 0.8]],
            ['key' => 'stopwatch1', 'object_type' => 'stopwatch', 'position' => ['x' => 0.8, 'y' => 0, 'z' => -0.8]],
        ],
        'steps' => [
            ['Measure the length of the short string with the ruler.', 'ruler1', 'measure', '20', 1.0, 'Select the ruler, choose Measure, then click the bob.'],
            ['Start the stopwatch as you let the bob go.', 'stopwatch1', 'switch_on', null, null, 'Select the stopwatch and press Start.'],
            ['Count 10 complete swings, then stop the stopwatch and read the time.', 'stopwatch1', 'switch_off', null, null, 'One swing is from one side, to the other side, and back.'],
            ['Make the string longer with the length control, then measure the new length with the ruler.', 'ruler1', 'measure', null, null, 'Use the String Length slider, then measure again.'],
            ['Reset the stopwatch and start it as you let the bob go.', 'stopwatch1', 'switch_on', null, null, 'Press Reset first so the time starts from zero.'],
            ['Count 10 complete swings, then stop the stopwatch and read the time.', 'stopwatch1', 'switch_off', null, null, null],
        ],
        'questions' => [
            ['Write down the time for 10 swings with the short string and with the long string.', 'observation', null, 3],
            ['Which pendulum took longer to make 10 swings, the short one or the long one?', 'observation', 'The long one.', 2],
            ['Complete the sentence: The longer the string, the ... the pendulum swings.', 'short_answer', 'slower (each swing takes more time)', 3],
            ['Name one thing in daily life that swings like a pendulum.', 'short_answer', 'A playground swing, a clock pendulum.', 2],
        ],
        'conclusion' => 'How does the length of the string affect the time for a swing?',
    ],
    [
        'template_key' => 'physics_s1_spring_two_masses',
        'title' => 'S.1 Light and Heavy Masses on a Spring',
        'topic' => 'Forces: Weight',
        'render_component' => 'hookes_law',
        'engine_version' => 'hookes-law-2d-v1',
        'minutes' => 15,
        'marks' => 10,
        'skills' => ['measuring_length', 'recording_observations'],
        'objective' => 'To compare how much a spring stretches with a light mass and with a heavier mass.',
        'introduction' => 'The weight of a mass pulls a spring down and makes it longer. A heavier mass has a bigger weight. In this practical you hang a 50g mass, then add a 100g mass, and see which stretches the spring more.',
        'apparatus' => 'Retort stand, spring, 50g mass, 100g mass, ruler.',
        'safety' => 'Do not hang too many masses on the spring or it will be damaged.',
        'scene' => [
            ['key' => 'stand1', 'object_type' => 'retort_stand', 'position' => ['x' => -1.5, 'y' => 0, 'z' => 0], 'in_tray' => true],
            ['key' => 'spring1', 'object_type' => 'spring', 'position' => ['x' => -1.5, 'y' => 0, 'z' => 0.9], 'props' => ['natural_length_cm' => 15, 'spring_constant_n_per_m' => 40, 'max_safe_extension_cm' => 12], 'in_tray' => true],
            ['key' => 'ruler1', 'object_type' => 'ruler', 'position' => ['x' => 1.5, 'y' => 0, 'z' => 0], 'in_tray' => true],
            ['key' => 'mass50', 'object_type' => 'mass_piece', 'position' => ['x' => 0.4, 'y' => 0, 'z' => 1.2], 'props' => ['mass_g' => 50], 'in_tray' => true],
            ['key' => 'mass100', 'object_type' => 'mass_piece', 'position' => ['x' => 0.85, 'y' => 0, 'z' => 1.2], 'props' => ['mass_g' => 100], 'in_tray' => true],
        ],
        'steps' => [
            ['Set up the retort stand on the bench.', 'stand1', 'move', 'stand1', null, null],
            ['Hang the spring on the clamp of the retort stand.', 'spring1', 'move', 'stand1', null, 'Drag the spring close to the arm of the stand.'],
            ['Measure the length of the spring with the ruler.', 'ruler1', 'measure', null, null, 'Select the ruler, click Measure, then click the spring.'],
            ['Hang the 50g mass on the spring.', 'mass50', 'move', 'spring1', null, 'Drag the mass to the bottom of the spring.'],
            ['Measure the length of the spring with the 50g mass.', 'ruler1', 'measure', null, null, null],
            ['Add the 100g mass to the spring (150g in total).', 'mass100', 'move', 'spring1', null, null],
            ['Measure the length of the spring now.', 'ruler1', 'measure', null, null, null],
        ],
        'questions' => [
            ['Write down the three lengths of the spring: with no mass, with 50g and with 150g.', 'observation', null, 3],
            ['Work out how much the spring stretched (the extension) with 50g and with 150g.', 'calculation', 'Extension = stretched length minus original length.', 3],
            ['Which load stretched the spring more? Why?', 'short_answer', 'The 150g load, because it is heavier (bigger weight, bigger force).', 2],
            ['What is the force that pulls the masses down called?', 'short_answer', 'Weight (the pull of gravity).', 2],
        ],
        'conclusion' => 'Complete: The heavier the mass, the ... the spring stretches.',
    ],
    [
        'template_key' => 'physics_s1_hot_water_temperature',
        'title' => 'S.1 Measuring the Temperature of Hot Water',
        'topic' => 'Heat: Temperature',
        'render_mode' => '3d',
        'render_component' => null,
        'engine_version' => '3d-v1',
        'minutes' => 15,
        'marks' => 10,
        'skills' => ['reading_scales', 'recording_observations', 'lab_safety'],
        'objective' => 'To use a thermometer to measure the temperature of water before and after heating.',
        'introduction' => 'Temperature tells us how hot or cold something is. We measure it with a thermometer in degrees Celsius (°C). Water is heated in a glass conical flask standing on a wire gauze on a tripod, over a Bunsen burner flame. You will read the water, heat it, and read it again when it starts to bubble.',
        'apparatus' => 'Conical flask of water, Bunsen burner, tripod stand, wire gauze, thermometer.',
        'safety' => 'Wear safety goggles. Heat glass only on a wire gauze. Never touch the flame or the hot flask.',
        // The burner, tripod and gauze are already set up on the bench; the student carries the
        // flask and the thermometer to them
        'scene' => [
            ['key' => 'burner1', 'object_type' => 'bunsen_burner', 'position' => ['x' => 0.9, 'y' => 0, 'z' => -0.3]],
            ['key' => 'tripod1', 'object_type' => 'tripod_stand', 'position' => ['x' => 0.9, 'y' => 0, 'z' => -0.3]],
            ['key' => 'gauze1', 'object_type' => 'wire_gauze', 'position' => ['x' => 0.9, 'y' => 0.81, 'z' => -0.3]],
            ['key' => 'flask1', 'object_type' => 'conical_flask', 'position' => ['x' => -0.6, 'y' => 0, 'z' => 0.2], 'props' => ['color' => '#a9d6e5', 'capacity_ml' => 250, 'current_volume' => 150], 'in_tray' => true],
            ['key' => 'thermometer1', 'object_type' => 'thermometer', 'position' => ['x' => -1.4, 'y' => 0, 'z' => 0.5], 'in_tray' => true],
        ],
        'steps' => [
            ['Put on safety goggles before working with the burner.', null, 'acknowledge', null, null, null],
            ['Pick up the conical flask of water and place it on the bench.', 'flask1', 'move', 'flask1', null, null],
            ['Pick up the thermometer.', 'thermometer1', 'move', 'thermometer1', null, null],
            ['Carry the thermometer and put it into the water in the flask.', 'thermometer1', 'move', 'flask1', null, 'Click the thermometer, choose Carry, drag it onto the flask, then click Done.'],
            ['Read the temperature of the water on the thermometer.', 'thermometer1', 'measure', null, null, 'Click the thermometer, choose Measure, then Record the reading.'],
            ['Carry the flask (with the thermometer in it) onto the wire gauze on the tripod.', 'flask1', 'move', 'tripod1', null, 'Click the flask, choose Carry, drag it onto the tripod, then click Done.'],
            ['Light the Bunsen burner under the tripod.', 'burner1', 'switch_on', null, null, 'Click the burner and choose Switch On.'],
            ['Watch the water heat up. When it starts to bubble, read the thermometer again.', 'thermometer1', 'measure', null, null, 'The red line in the thermometer rises as the water gets hotter.'],
        ],
        'questions' => [
            ['What was the temperature of the water before heating?', 'observation', null, 2],
            ['What was the temperature of the water after heating?', 'observation', null, 2],
            ['By how many degrees did the temperature rise?', 'calculation', 'Temperature after minus temperature before.', 3],
            ['What is the unit of temperature you used, and what instrument measures temperature?', 'short_answer', 'Degrees Celsius (°C); a thermometer.', 3],
        ],
        'conclusion' => 'What happens to the temperature of water when it is heated?',
    ],
    [
        'template_key' => 'physics_s2_plane_mirror_reflection',
        'title' => 'S.2 Reflection of Light by a Plane Mirror',
        'topic' => 'Light: Reflection',
        'render_component' => 'optics',
        'engine_version' => 'optics-2d-v1',
        'minutes' => 20,
        'marks' => 10,
        'skills' => ['using_protractor', 'recording_observations'],
        'objective' => 'To show that light is reflected by a plane mirror and compare the angle of incidence with the angle of reflection.',
        'introduction' => 'A ray of light that hits a mirror bounces off. The ray going in is the incident ray and the ray coming out is the reflected ray. Both angles are measured from the normal, a line at 90° to the mirror.',
        'apparatus' => 'Ray box, plane mirror, protractor.',
        'safety' => 'Do not look straight into the ray box light.',
        'scene' => [
            ['key' => 'ray_box1', 'object_type' => 'ray_box', 'position' => ['x' => -1.5, 'y' => 0, 'z' => 0], 'in_tray' => true],
            ['key' => 'mirror1', 'object_type' => 'mirror', 'position' => ['x' => 0.6, 'y' => 0, 'z' => 0], 'in_tray' => true],
            ['key' => 'protractor1', 'object_type' => 'protractor', 'position' => ['x' => 0, 'y' => 0, 'z' => 1.2], 'in_tray' => true],
        ],
        'steps' => [
            ['Pick up the ray box and place it on the bench.', 'ray_box1', 'move', 'ray_box1', null, null],
            ['Pick up the plane mirror and place it on the bench, facing the ray box.', 'mirror1', 'move', 'mirror1', null, null],
            ['Switch on the ray box so that its ray hits the mirror.', 'ray_box1', 'switch_on', null, null, 'Move or turn the ray box until the ray strikes the mirror.'],
            ['Pick up the protractor.', 'protractor1', 'move', 'protractor1', null, null],
            ['Measure the angle of incidence with the protractor.', 'protractor1', 'measure', null, null, 'Centre the protractor where the ray meets the mirror.'],
            ['Measure the angle of reflection.', 'protractor1', 'measure', null, null, 'Keep the protractor on the same point.'],
        ],
        'questions' => [
            ['What was the angle of incidence?', 'observation', null, 2],
            ['What was the angle of reflection?', 'observation', null, 2],
            ['Compare the two angles. What do you notice?', 'short_answer', 'They are equal: angle of incidence = angle of reflection.', 3],
            ['Draw the mirror, the normal, the incident ray and the reflected ray, and label the two angles.', 'procedure', null, 3],
        ],
        'conclusion' => 'State the law of reflection you saw in this practical.',
    ],
    [
        'template_key' => 'physics_s2_balancing_metre_rule',
        'title' => 'S.2 Balancing a Metre Rule (See-saw)',
        'topic' => 'Moments: Balancing',
        'render_component' => 'moments_balance',
        'engine_version' => null,
        'minutes' => 20,
        'marks' => 10,
        'skills' => ['measuring_length', 'recording_observations'],
        'objective' => 'To balance a metre rule with a load on each side, like a see-saw, and measure where each load is.',
        'introduction' => 'A see-saw balances when the turning effect on one side equals the turning effect on the other. A heavy load close to the middle can balance a lighter load far from the middle. The middle, where the rule hangs, is the pivot G at the 50 cm mark.',
        'apparatus' => 'Retort stand, metre rule, 50g hanger, small bottle, thread.',
        'safety' => 'None.',
        'scene' => [
            ['key' => 'stand1', 'object_type' => 'retort_stand', 'position' => ['x' => -1.3, 'y' => 0, 'z' => 0], 'in_tray' => true],
            ['key' => 'rule1', 'object_type' => 'metre_rule', 'position' => ['x' => -1.3, 'y' => 0, 'z' => 1], 'in_tray' => true],
            ['key' => 'hanger1', 'object_type' => 'mass_piece', 'position' => ['x' => 0.3, 'y' => 0, 'z' => 1.2], 'props' => ['mass_g' => 50, 'length_cm' => 18], 'in_tray' => true],
            ['key' => 'bottle1', 'object_type' => 'soda_bottle', 'position' => ['x' => 1, 'y' => 0, 'z' => 1.2], 'props' => ['length_cm' => 25, 'mass_g' => 36], 'in_tray' => true],
        ],
        'steps' => [
            ['Pick up the retort stand and set it up on the bench.', 'stand1', 'move', 'stand1', null, null],
            ['Pick up the metre rule.', 'rule1', 'move', 'rule1', null, null],
            ['Hang the metre rule from the clamp at its middle (the 50 cm mark). This is the pivot G.', 'rule1', 'move', 'stand1', null, null],
            ['Pick up the 50g hanger or the bottle, either one first.', null, 'move', null, null, null],
            ['Tie it to the rule on one side of G.', null, 'move', 'rule1', null, null],
            ['Pick up the other one.', null, 'move', null, null, null],
            ['Tie it on the other side of G, then slide them along the rule until the rule hangs level.', null, 'move', 'rule1', null, 'The rule is balanced when it hangs level.'],
            ['Select the rule, choose Measure, then click the 50g hanger to read its distance from G.', 'rule1', 'measure', null, null, null],
            ['Now measure the distance of the bottle from G the same way.', 'rule1', 'measure', null, null, null],
        ],
        'questions' => [
            ['How far from G was the 50g hanger, and how far was the bottle?', 'observation', null, 2],
            ['Which was closer to G when the rule balanced? What does that tell you about which is heavier?', 'short_answer', 'The heavier load sits closer to the pivot.', 3],
            ['Work out mass x distance for the 50g hanger.', 'calculation', '50 x distance of the hanger from G (g cm).', 3],
            ['Give one example of balancing like this in daily life.', 'short_answer', 'A see-saw, a beam balance, carrying loads on a stick.', 2],
        ],
        'conclusion' => 'How can a light load balance a heavy load on a see-saw?',
    ],
];

$exists = $db->prepare('SELECT id FROM virtual_lab_experiments WHERE template_key = ?');
$insExp = $db->prepare(
    "INSERT INTO virtual_lab_experiments
        (title, subject_id, topic, category, difficulty, render_mode, render_component, template_key, template_version,
         engine_version, estimated_duration_minutes, competency, practical_skills, objective, introduction, apparatus,
         materials, safety_precautions, scene_objects, conclusion_prompt, marks, is_template, status)
     VALUES (?, ?, ?, 'physics', 'beginner', ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, 'None (all apparatus is simulated).', ?, ?, ?, ?, 1, 'published')"
);
$insStep = $db->prepare(
    'INSERT INTO virtual_lab_steps (experiment_id, step_number, instruction, target_object_key, required_action, expected_value, tolerance, hint, is_safety_check)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$insQ = $db->prepare(
    "INSERT INTO virtual_lab_questions (experiment_id, question_number, question_text, question_type, stage, requirement, expected_answer, marks)
     VALUES (?, ?, ?, ?, 'after_experiment', 'notebook_only', ?, ?)"
);
$insDept = $db->prepare('INSERT INTO virtual_lab_experiment_departments (experiment_id, department_id) VALUES (?, ?)');
$skills = new \eSpace\App\Services\PracticalSkillService();

// --refresh=<template_key>: rewrite that existing template in place (fields, apparatus, steps,
// questions) - only while no class has been given it, so no student work can be affected.
$refresh = null;
foreach ($argv as $arg) if (str_starts_with($arg, '--refresh=')) $refresh = substr($arg, 10);

foreach ($templates as $t) {
    $exists->execute([$t['template_key']]);
    $existingId = (int) $exists->fetchColumn();
    if ($existingId && $refresh === $t['template_key']) {
        $used = $db->prepare('SELECT COUNT(*) FROM virtual_lab_assignments WHERE experiment_id = ?');
        $used->execute([$existingId]);
        if ((int) $used->fetchColumn() > 0) { echo "NOT refreshed (already given to a class): {$t['title']}\n"; continue; }
        $db->beginTransaction();
        try {
            $db->prepare(
                "UPDATE virtual_lab_experiments SET title = ?, topic = ?, render_mode = ?, render_component = ?, engine_version = ?,
                   estimated_duration_minutes = ?, competency = ?, practical_skills = ?, objective = ?, introduction = ?, apparatus = ?,
                   safety_precautions = ?, scene_objects = ?, conclusion_prompt = ?, marks = ?, updated_at = NOW() WHERE id = ?"
            )->execute([
                $t['title'], $t['topic'], $t['render_mode'] ?? '2d', $t['render_component'], $t['engine_version'], $t['minutes'],
                $t['objective'], json_encode($t['skills']), $t['objective'], $t['introduction'], $t['apparatus'], $t['safety'],
                json_encode($t['scene']), $t['conclusion'], $t['marks'], $existingId,
            ]);
            $db->prepare('DELETE ss FROM virtual_lab_step_skills ss JOIN virtual_lab_steps s ON s.id = ss.step_id WHERE s.experiment_id = ?')->execute([$existingId]);
            $db->prepare('DELETE FROM virtual_lab_steps WHERE experiment_id = ?')->execute([$existingId]);
            $db->prepare('DELETE FROM virtual_lab_questions WHERE experiment_id = ?')->execute([$existingId]);
            foreach ($t['steps'] as $i => [$text, $target, $action, $expected, $tol, $hint]) {
                $insStep->execute([$existingId, $i + 1, $text, $target, $action, $expected, $tol, $hint, $action === 'acknowledge' ? 1 : 0]);
            }
            foreach ($t['questions'] as $i => [$text, $type, $answer, $marks]) {
                $insQ->execute([$existingId, $i + 1, $text, $type, $answer, $marks]);
            }
            $db->commit();
            $skills->syncStepSkills($existingId);
            echo "refreshed #$existingId: {$t['title']}\n";
        } catch (\Throwable $e) {
            $db->rollBack();
            echo "FAILED refresh {$t['title']}: {$e->getMessage()}\n";
        }
        continue;
    }
    if ($existingId) { echo "skip (exists): {$t['title']}\n"; continue; }

    $db->beginTransaction();
    try {
        $insExp->execute([
            $t['title'], PHYSICS_SUBJECT_ID, $t['topic'], $t['render_mode'] ?? '2d', $t['render_component'], $t['template_key'], $t['engine_version'],
            $t['minutes'], $t['objective'], json_encode($t['skills']), $t['objective'], $t['introduction'], $t['apparatus'],
            $t['safety'], json_encode($t['scene']), $t['conclusion'], $t['marks'],
        ]);
        $id = (int) $db->lastInsertId();
        foreach ($t['steps'] as $i => [$text, $target, $action, $expected, $tol, $hint]) {
            $insStep->execute([$id, $i + 1, $text, $target, $action, $expected, $tol, $hint, $action === 'acknowledge' ? 1 : 0]);
        }
        foreach ($t['questions'] as $i => [$text, $type, $answer, $marks]) {
            $insQ->execute([$id, $i + 1, $text, $type, $answer, $marks]);
        }
        $insDept->execute([$id, PHYSICS_DEPARTMENT_ID]);
        $db->commit();
        $skills->syncStepSkills($id);
        echo "added #$id: {$t['title']}\n";
    } catch (\Throwable $e) {
        $db->rollBack();
        echo "FAILED {$t['title']}: {$e->getMessage()}\n";
    }
}
