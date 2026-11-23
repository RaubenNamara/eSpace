<?php
/**
 * Seeds O-level Biology Virtual Lab practicals built on the food-test bench (render_component
 * 'food_tests') and the soil bench ('soil_tests'), following the New Systematic Guide to Ordinary
 * Level Practical Biology (Element of Construct 1): food tests, enzyme activity and soil properties.
 *
 * Every practical is laid out the way students write a practical report: the scenario and task in
 * the introduction; Title, Aim, Hypothesis and Variables answered before the experiment; a guided
 * procedure where each observation is recorded with its deduction; then Discussion, Conclusion and
 * Recommendation. Expected answers (from the guide's worked examples) are stored for teacher marking.
 *
 * Safe to re-run: a template whose template_key exists is skipped. --refresh=<template_key> rewrites
 * one in place while no class has been given it.
 *
 * Usage: php backend/scripts/seed_biology_labs.php [--refresh=<template_key>]
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

$db = \eSpace\Config\Database::getInstance();

const BIOLOGY_SUBJECT_ID = 11;
const BIOLOGY_DEPARTMENT_ID = 9;

// ---- Building blocks -----------------------------------------------------------------------------
function tubes(array $letters): array
{
    $out = [];
    foreach ($letters as $i => $l) {
        $out[] = ['key' => "tube$l", 'object_type' => 'test_tube', 'position' => ['x' => -0.1 + $i * 0.05, 'y' => 0, 'z' => 0.07], 'props' => ['label' => "Test tube $l"]];
    }
    return $out;
}
function rack(array $reagents, array $extra = []): array
{
    return ['key' => 'rack1', 'object_type' => 'test_tube_rack', 'position' => ['x' => -0.05, 'y' => 0, 'z' => 0.07], 'props' => array_merge(['reagents' => $reagents], $extra)];
}
function sample(string $key, string $label, array $composition, string $appearance, string $color): array
{
    return ['key' => $key, 'object_type' => 'specimen_bottle', 'position' => ['x' => -0.36, 'y' => 0, 'z' => 0.06], 'props' => [
        'label' => $label,
        'composition' => array_merge(['starch' => 0, 'reducing' => 0, 'nonReducing' => 0, 'protein' => 0, 'vitaminC' => 0, 'lipid' => 0], $composition),
        'appearance' => $appearance,
        'color' => $color,
    ]];
}
function bath(string $key, int $temp, string $label): array
{
    return ['key' => $key, 'object_type' => 'beaker', 'position' => ['x' => 0.22, 'y' => 0, 'z' => -0.02], 'props' => ['bath_temp' => $temp, 'label' => $label]];
}
function soil(string $key, string $label, string $type, float $ph = 6.5): array
{
    return ['key' => $key, 'object_type' => 'soil_sample', 'position' => ['x' => -0.46, 'y' => 0, 'z' => 0], 'props' => ['label' => $label, 'soil' => $type, 'ph' => $ph]];
}
function funnel(int $n): array
{
    return ['key' => "funnel$n", 'object_type' => 'filter_funnel', 'position' => ['x' => -0.28 + ($n - 1) * 0.12, 'y' => 0.24, 'z' => 0]];
}
/** Report questions answered before the experiment (title, aim, hypothesis, variables) */
function reportStart(string $title, string $aim, string $hypothesis, string $variables): array
{
    return [
        ['Write a suitable title for this investigation.', 'short_answer', $title, 1, 'before_experiment'],
        ['State the aim of the investigation.', 'short_answer', $aim, 1, 'before_experiment'],
        ['State your hypothesis.', 'short_answer', $hypothesis, 1, 'before_experiment'],
        ['Identify the dependent, independent and controlled variables.', 'short_answer', $variables, 2, 'before_experiment'],
    ];
}
const FOOD_VARIABLES = 'Independent: the food substance present. Dependent: the colour change of the test solution. Controlled: the volumes of reagents and food sample used (e.g. 1 cm³ or 3 drops).';

// Food samples used in several practicals
$starchSusp = fn ($k = 'sampleA', $l = 'Solution A (starch)') => sample($k, $l, ['starch' => 3], 'turbid', '#eef0ea');
$glucose = fn ($k = 'sampleB', $l = 'Solution B (glucose)') => sample($k, $l, ['reducing' => 3], 'colourless', '#f8fafc');

$templates = [
    // =========================================================================================
    [
        'template_key' => 'biology_food_starch_reducing',
        'title' => 'Food Tests 1: Starch and Reducing Sugars',
        'topic' => 'Nutrition: food tests',
        'render_component' => 'food_tests',
        'minutes' => 30, 'marks' => 20,
        'skills' => ['recording_observations', 'lab_safety', 'experimental_analysis'],
        'objective' => 'To test solutions A and B for starch and reducing sugars.',
        'introduction' => "Food tests are carried out to find out which food substances are present in a sample. Iodine solution (brown) turns blue-black with starch. Benedict's solution (blue) gives a green, yellow then orange (brick-red) precipitate when boiled with a reducing sugar such as glucose.\n\nTask: You are provided with solutions A and B. Test each for starch and for reducing sugars, and record each test as procedure, observation and deduction.",
        'apparatus' => 'Solutions A and B, iodine solution, Benedict\'s solution, 4 test tubes in a rack, dropper, boiling water bath (beaker of water on a tripod and gauze over a Bunsen burner), test tube holder.',
        'safety' => 'Point a heated test tube away from yourself and others. Wear goggles when boiling.',
        'scene' => array_merge(tubes(['A', 'B', 'C', 'D']), [rack(['iodine', 'benedicts']), $starchSusp(), $glucose(), bath('bath_boil', 100, 'Boiling water bath')]),
        'steps' => [
            ['Starch test on A: put 1 cm³ of solution A into test tube A.', 'tubeA', 'pour', 'sampleA', null, 'Choose Tube A, choose Solution A, then press 1 cm³.'],
            ['Add 3 drops of iodine solution to test tube A.', 'tubeA', 'pour', 'iodine', null, null],
            ['Record the observation and choose the deduction for test tube A.', 'tubeA', 'inspect', 'Much starch present', null, 'A blue-black colour means much starch.'],
            ['Starch test on B: put 1 cm³ of solution B into test tube B.', 'tubeB', 'pour', 'sampleB', null, null],
            ['Add 3 drops of iodine solution to test tube B.', 'tubeB', 'pour', 'iodine', null, null],
            ['Record the observation and deduction for test tube B.', 'tubeB', 'inspect', 'Starch absent', null, 'If the iodine stays brown, there is no starch.'],
            ['Reducing sugar test on B: put 1 cm³ of solution B into test tube C.', 'tubeC', 'pour', 'sampleB', null, null],
            ["Add 1 cm³ of Benedict's solution to test tube C.", 'tubeC', 'pour', 'benedicts', null, null],
            ['Put test tube C in the boiling water bath and watch the colour change.', 'tubeC', 'heat', 'bath_boil', null, 'Watch for green, then yellow, then orange.'],
            ['Record the observation and deduction for test tube C.', 'tubeC', 'inspect', 'Much reducing sugars present', null, null],
            ['Reducing sugar test on A: put 1 cm³ of solution A into test tube D.', 'tubeD', 'pour', 'sampleA', null, null],
            ["Add 1 cm³ of Benedict's solution to test tube D.", 'tubeD', 'pour', 'benedicts', null, null],
            ['Put test tube D in the boiling water bath.', 'tubeD', 'heat', 'bath_boil', null, null],
            ['Record the observation and deduction for test tube D.', 'tubeD', 'inspect', 'Reducing sugars absent', null, 'Benedict\'s that stays blue on boiling means no reducing sugar.'],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the presence of starch and reducing sugars in solutions A and B',
            'To test solutions A and B for starch and reducing sugars.',
            'Solution A contains starch and solution B contains reducing sugars.',
            FOOD_VARIABLES,
        ), [
            ['Present your results in a table with the columns: test, procedure, observation, deduction.', 'procedure', null, 6, 'after_experiment'],
            ['Which solution contains starch and which contains reducing sugars? Use your observations to explain.', 'short_answer', 'A contains starch (blue-black with iodine); B contains reducing sugar (orange precipitate with Benedict\'s on boiling).', 4, 'after_experiment'],
            ["Why must the Benedict's test be heated, and why is the heat applied in a water bath rather than directly?", 'short_answer', 'Heat provides the energy for the reaction; a water bath heats evenly and safely, preventing the solution from spurting out.', 4, 'after_experiment'],
        ]),
        'conclusion' => 'Solution A contains starch only; solution B contains reducing sugars only.',
    ],
    // =========================================================================================
    [
        'template_key' => 'biology_food_non_reducing',
        'title' => 'Food Tests 2: Non-reducing Sugars (Sucrose)',
        'topic' => 'Nutrition: food tests',
        'render_component' => 'food_tests',
        'minutes' => 30, 'marks' => 20,
        'skills' => ['recording_observations', 'lab_safety', 'experimental_analysis'],
        'objective' => 'To show that solution S contains a non-reducing sugar.',
        'introduction' => "Sucrose (table sugar) is a non-reducing sugar: it does not change Benedict's solution on its own. Boiling it with dilute hydrochloric acid breaks it down (hydrolysis) into reducing sugars. The acid is then neutralised with sodium hydroxide, and Benedict's test is done again.\n\nTask: Carry out tests on solution S to show whether it contains reducing or non-reducing sugars.",
        'apparatus' => "Solution S, Benedict's solution, dilute hydrochloric acid, sodium hydroxide solution, test tubes, boiling water bath.",
        'safety' => 'Hydrochloric acid and sodium hydroxide are corrosive: wear goggles and wash spills off at once.',
        'scene' => array_merge(tubes(['A', 'B']), [rack(['benedicts', 'hcl', 'naoh']), sample('sampleS', 'Solution S (sugar)', ['nonReducing' => 3], 'colourless', '#f8fafc'), bath('bath_boil', 100, 'Boiling water bath')]),
        'steps' => [
            ['Put 1 cm³ of solution S into test tube A.', 'tubeA', 'pour', 'sampleS', null, null],
            ["Add 1 cm³ of Benedict's solution to test tube A.", 'tubeA', 'pour', 'benedicts', null, null],
            ['Boil test tube A in the boiling water bath.', 'tubeA', 'heat', 'bath_boil', null, null],
            ['Record the observation and deduction for test tube A.', 'tubeA', 'inspect', 'Reducing sugars absent', null, null],
            ['Put 1 cm³ of solution S into test tube B.', 'tubeB', 'pour', 'sampleS', null, null],
            ['Add 1 cm³ of dilute hydrochloric acid to test tube B.', 'tubeB', 'pour', 'hcl', null, null],
            ['Boil test tube B in the boiling water bath (this hydrolyses the sugar).', 'tubeB', 'heat', 'bath_boil', null, 'Leave it in for a few seconds, then take it out.'],
            ['Take tube B out and add 1 cm³ of sodium hydroxide solution to neutralise the acid.', 'tubeB', 'pour', 'naoh', null, null],
            ["Add 1 cm³ of Benedict's solution to test tube B.", 'tubeB', 'pour', 'benedicts', null, null],
            ['Boil test tube B again in the boiling water bath.', 'tubeB', 'heat', 'bath_boil', null, null],
            ['Record the observation and deduction for test tube B.', 'tubeB', 'inspect', 'Non-reducing sugars present', null, null],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the type of sugar in solution S',
            'To test solution S for reducing and non-reducing sugars.',
            'Solution S contains a non-reducing sugar.',
            FOOD_VARIABLES,
        ), [
            ['What is the role of (a) the dilute hydrochloric acid, (b) the sodium hydroxide, (c) the first boiling?', 'short_answer', '(a) hydrolyses the non-reducing sugar to reducing sugars; (b) neutralises the excess acid; (c) provides activation energy for the hydrolysis.', 6, 'after_experiment'],
            ['Explain why test tube A stayed blue but test tube B gave an orange precipitate.', 'short_answer', 'Sucrose cannot reduce Benedict\'s; after hydrolysis it becomes glucose and fructose, which are reducing sugars.', 4, 'after_experiment'],
        ]),
        'conclusion' => 'Solution S contains a non-reducing sugar and no reducing sugar.',
    ],
    // =========================================================================================
    [
        'template_key' => 'biology_food_protein_lipid',
        'title' => 'Food Tests 3: Proteins and Lipids',
        'topic' => 'Nutrition: food tests',
        'render_component' => 'food_tests',
        'minutes' => 30, 'marks' => 20,
        'skills' => ['recording_observations', 'experimental_analysis'],
        'objective' => 'To test egg albumen for protein and cooking oil for lipids.',
        'introduction' => "Biuret test: sodium hydroxide then copper(II) sulphate turns a protein solution purple; without protein it stays blue. Emulsion test: fat dissolves in ethanol, and when the ethanol is poured into cold water the fat forms a milky (white) emulsion. Translucent mark test: fat leaves a permanent see-through mark on filter paper.\n\nTask: Test sample E (egg albumen) for protein, and sample L (cooking oil) for lipids by two different tests.",
        'apparatus' => 'Egg albumen solution (E), cooking oil (L), sodium hydroxide solution, copper(II) sulphate solution, ethanol, cold distilled water, test tubes, filter paper. No heating is needed for these tests.',
        'safety' => 'Ethanol is flammable: keep it away from any flame. No burner is needed for these tests.',
        'scene' => array_merge(tubes(['A', 'B', 'C']), [rack(['naoh', 'cuso4', 'ethanol', 'water'], ['paper' => true]),
            sample('sampleE', 'Sample E (egg albumen)', ['protein' => 3], 'turbid', '#f4f1e6'),
            sample('sampleL', 'Sample L (cooking oil)', ['lipid' => 3], 'colourless', '#f6e7a1')]),
        'steps' => [
            ['Put 1 cm³ of sample E into test tube A.', 'tubeA', 'pour', 'sampleE', null, null],
            ['Add 1 cm³ of sodium hydroxide solution to test tube A.', 'tubeA', 'pour', 'naoh', null, null],
            ['Add copper(II) sulphate solution, then shake the tube.', 'tubeA', 'pour', 'cuso4', null, 'Press Shake after adding it.'],
            ['Record the observation and deduction for test tube A.', 'tubeA', 'inspect', 'Proteins present', null, null],
            ['Emulsion test: put 1 cm³ of sample L into test tube B.', 'tubeB', 'pour', 'sampleL', null, null],
            ['Add 1 cm³ of ethanol to test tube B and shake it well.', 'tubeB', 'pour', 'ethanol', null, 'Press Shake after adding the ethanol.'],
            ['Put 10 cm³ of cold distilled water into test tube C.', 'tubeC', 'pour', 'water', null, null],
            ['Pour the contents of test tube B into the water in test tube C.', 'tubeC', 'pour', 'tubeB', null, 'Choose Tube B, then "Pour into C".'],
            ['Record the observation and deduction for test tube C.', 'tubeC', 'inspect', 'Lipids present', null, null],
            ['Translucent mark test: put 3 drops of sample L at the centre of the filter paper.', 'paper1', 'pour', 'sampleL', null, 'Choose "Filter paper" at the top of the panel.'],
            ['Leave the paper to dry in the air for a minute.', 'paper1', 'move', 'air', null, 'Press "Leave to dry". Water marks disappear as the paper dries; a grease mark does not.'],
            ['Hold it against the light, then record the observation and deduction.', 'paper1', 'inspect', 'Lipids present', null, null],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the presence of proteins and lipids in samples E and L',
            'To test sample E for proteins and sample L for lipids.',
            'Sample E contains proteins and sample L contains lipids.',
            FOOD_VARIABLES,
        ), [
            ['Record your results as test, procedure, observation and deduction.', 'procedure', null, 6, 'after_experiment'],
            ['Why is the translucent mark test done after drying the paper?', 'short_answer', 'Water also makes a damp mark but it dries off; only fat leaves a permanent translucent mark.', 3, 'after_experiment'],
            ['Give two roles of proteins and two roles of lipids in the body.', 'short_answer', 'Proteins: growth and repair, enzymes/hormones/antibodies. Lipids: energy, insulation against heat loss, cushioning organs.', 4, 'after_experiment'],
        ]),
        'conclusion' => 'Sample E contains proteins; sample L contains lipids.',
    ],
    // =========================================================================================
    [
        'template_key' => 'biology_food_vitamin_c_heat',
        'title' => 'Food Tests 4: Vitamin C and the Effect of Boiling',
        'topic' => 'Nutrition: food tests',
        'render_component' => 'food_tests',
        'minutes' => 30, 'marks' => 20,
        'skills' => ['recording_observations', 'experimental_analysis'],
        'objective' => 'To test specimen O for vitamin C and find out the effect of boiling on it.',
        'introduction' => "In a campaign on \"good feeding for better health\", the Ministry of Health advised people to eat fruits and vegetables mainly raw, arguing that cooking or boiling highly affects their nutritional value. Specimen O (fresh orange juice) is one of these foods.\n\nVitamin C (ascorbic acid) turns blue DCPIP solution colourless. The fewer drops of juice needed, the more vitamin C it contains.\n\nTask: As a scientist, test specimen O for vitamin C, find out the effect of boiling on it, and comment on the Ministry of Health's argument.",
        'apparatus' => 'Specimen O (fresh fruit juice), DCPIP solution, test tubes, dropper, boiling water bath.',
        'safety' => 'Point heated test tubes away from people.',
        'scene' => array_merge(tubes(['A', 'B', 'C']), [rack(['dcpip']),
            sample('sampleO', 'Specimen O (orange juice)', ['vitaminC' => 3, 'reducing' => 2], 'colourless', '#fcd879'),
            bath('bath_boil', 100, 'Boiling water bath')]),
        'steps' => [
            ['Put 1 cm³ of DCPIP solution into test tube A.', 'tubeA', 'pour', 'dcpip', null, null],
            ['Add specimen O to test tube A drop by drop, counting the drops, until the blue colour disappears.', 'tubeA', 'pour', 'sampleO', null, 'Press "+1 drop" one drop at a time.'],
            ['Record the observation (number of drops) and deduction for test tube A.', 'tubeA', 'inspect', 'Vitamin C present', null, null],
            ['Put 1 cm³ of specimen O into test tube B.', 'tubeB', 'pour', 'sampleO', null, null],
            ['Boil test tube B in the boiling water bath for some time, then take it out.', 'tubeB', 'heat', 'bath_boil', null, 'Leave it in the boiling water for at least 10 seconds.'],
            ['Put 1 cm³ of DCPIP solution into test tube C.', 'tubeC', 'pour', 'dcpip', null, null],
            ['Add the boiled juice from tube B to tube C drop by drop (about 12 drops).', 'tubeC', 'pour', 'tubeB', null, 'In the Add list choose "Contents of tube B".'],
            ['Record the observation and deduction for test tube C.', 'tubeC', 'inspect', 'Vitamin C absent', null, null],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the effect of boiling on the vitamin C content of specimen O',
            'To find out whether specimen O contains vitamin C and the effect of boiling on it.',
            'Boiling destroys the vitamin C in specimen O.',
            'Independent: boiling (raw or boiled juice). Dependent: whether DCPIP is decolourised / number of drops needed. Controlled: volume of DCPIP (1 cm³), the juice used.',
        ), [
            ['How many drops of raw juice decolourised the DCPIP? What does a small number of drops tell you?', 'observation', 'Few drops means the juice is rich in vitamin C.', 3, 'after_experiment'],
            ['Explain the result with the boiled juice.', 'short_answer', 'Vitamin C (ascorbic acid) is unstable to heat; boiling destroyed it, so DCPIP stayed blue.', 4, 'after_experiment'],
            ["Comment on the Ministry of Health's argument and give one recommendation.", 'short_answer', 'The argument is correct for vitamin C: fruits and vegetables rich in vitamin C should be eaten raw or only lightly cooked.', 4, 'after_experiment'],
        ]),
        'conclusion' => 'Specimen O contains vitamin C, which is destroyed by boiling.',
    ],
    // =========================================================================================
    [
        'template_key' => 'biology_food_mixture_q',
        'title' => 'Food Mixture Q: Advising an 80-year-old Woman (Worked Example)',
        'topic' => 'Nutrition: food tests',
        'render_component' => 'food_tests',
        'minutes' => 40, 'marks' => 25,
        'skills' => ['recording_observations', 'experimental_analysis', 'lab_safety'],
        'objective' => 'To investigate the nutrient composition of food mixture Q.',
        'introduction' => "An 80-year-old woman has been falling sick and is constantly hospitalised. On diagnosis, a nutritional therapist suspected that her health condition was mainly due to imbalances in her diet. She was asked to bring the food mixture she regularly feeds on, identified as Q, for further investigation.\n\nTask: You have been provided with food mixture Q. As a nutritional therapist, carry out investigations on food mixture Q and advise the 80-year-old woman accordingly.",
        'apparatus' => "Food sample Q, iodine solution, sodium hydroxide solution, copper(II) sulphate solution, Benedict's solution, DCPIP solution, test tubes, dropper, Bunsen burner (boiling water bath), test tube holders.",
        'safety' => 'Heat test tubes in the water bath, pointing them away from people.',
        'scene' => array_merge(tubes(['A', 'B', 'C', 'D']), [rack(['iodine', 'naoh', 'cuso4', 'benedicts', 'dcpip']),
            sample('sampleQ', 'Food mixture Q', ['starch' => 3, 'reducing' => 3, 'protein' => 2], 'turbid', '#efe6cf'),
            bath('bath_boil', 100, 'Boiling water bath')]),
        'steps' => [
            ['Starch test: put 1 cm³ of solution Q into test tube A.', 'tubeA', 'pour', 'sampleQ', null, null],
            ['Add 3 drops of iodine solution to test tube A.', 'tubeA', 'pour', 'iodine', null, null],
            ['Record the observation and deduction for the starch test.', 'tubeA', 'inspect', 'Much starch present', null, null],
            ['Protein test: put 1 cm³ of solution Q into test tube B.', 'tubeB', 'pour', 'sampleQ', null, null],
            ['Add 1 cm³ of sodium hydroxide solution to test tube B.', 'tubeB', 'pour', 'naoh', null, null],
            ['Add copper(II) sulphate solution and shake.', 'tubeB', 'pour', 'cuso4', null, 'Press Shake after adding it.'],
            ['Record the observation and deduction for the protein test.', 'tubeB', 'inspect', 'Proteins present', null, null],
            ['Reducing sugar test: put 1 cm³ of solution Q into test tube C.', 'tubeC', 'pour', 'sampleQ', null, null],
            ["Add 1 cm³ of Benedict's solution to test tube C.", 'tubeC', 'pour', 'benedicts', null, null],
            ['Boil test tube C in the boiling water bath.', 'tubeC', 'heat', 'bath_boil', null, null],
            ['Record the observation and deduction for the reducing sugar test.', 'tubeC', 'inspect', 'Much reducing sugars present', null, null],
            ['Vitamin C test: put 1 cm³ of DCPIP solution into test tube D.', 'tubeD', 'pour', 'dcpip', null, null],
            ['Add solution Q to test tube D drop by drop (about 12 drops).', 'tubeD', 'pour', 'sampleQ', null, 'Press "+1 drop" one drop at a time.'],
            ['Record the observation and deduction for the vitamin C test.', 'tubeD', 'inspect', 'Vitamin C absent', null, null],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the nutrient composition of food mixture Q',
            'To investigate the nutrient composition of food mixture Q.',
            'Food mixture Q contains all the necessary food nutrients (or: does not contain all the required food nutrients).',
            FOOD_VARIABLES,
        ), [
            ['Discussion / analysis: what does food mixture Q contain and lack, and what does this mean for the woman\'s health?', 'short_answer', 'Q contains carbohydrates (starch and reducing sugars) and proteins but lacks vitamin C. It provides energy and growth/repair but cannot build strong immunity, which explains why she frequently falls sick.', 5, 'after_experiment'],
            ['Conclusion.', 'short_answer', 'Food mixture Q does not contain all the necessary food nutrients.', 2, 'after_experiment'],
            ['Recommendation to the woman.', 'short_answer', 'Supplement food mixture Q with foods rich in vitamin C, such as fruits and vegetables.', 3, 'after_experiment'],
        ]),
        'conclusion' => 'Food mixture Q lacks vitamin C: the woman should add fruits and vegetables to her diet.',
    ],
    // =========================================================================================
    [
        'template_key' => 'biology_enzyme_amylase_temperature',
        'title' => 'Enzymes: Effect of Temperature on Salivary Amylase',
        'topic' => 'Nutrition in animals: enzyme activity',
        'render_component' => 'food_tests',
        'minutes' => 35, 'marks' => 20,
        'skills' => ['recording_observations', 'experimental_analysis', 'measuring_time'],
        'objective' => 'To investigate the effect of temperature on the action of salivary amylase on starch.',
        'introduction' => "Enzymes are biological catalysts, protein in nature, that speed up reactions in the body. Salivary amylase (ptyalin) breaks starch down to maltose; its optimum pH is about 6.5 to 7.5 and it works best near body temperature (37 °C). Being proteins, enzymes are destroyed (denatured) by boiling.\n\nWhile the starch is being digested, a drop of the mixture tested with iodine on a white tile stays blue-black; when all the starch has been digested the iodine stays brown.\n\nTask: Investigate the activity of amylase at 37 °C, in the cold (about 10 °C), and after the enzyme has been boiled.",
        'apparatus' => "Starch suspension, amylase (saliva) solution, boiled amylase solution, iodine solution, white spotting tile, Benedict's solution, test tubes, water bath at 37 °C, ice bath, boiling water bath, thermometer.",
        'safety' => 'Point heated test tubes away from people.',
        'scene' => array_merge(tubes(['A', 'B', 'C']), [rack(['starch', 'amylase', 'boiled_amylase', 'iodine', 'benedicts'], ['tile' => true]),
            bath('bath_37', 37, 'Water bath 37 °C'), bath('bath_ice', 10, 'Ice bath'), bath('bath_boil', 100, 'Boiling water bath')]),
        'steps' => [
            ['Put 2 cm³ of starch suspension into test tube A.', 'tubeA', 'pour', 'starch', null, 'Choose "Starch suspension" in the reagent list.'],
            ['Add 1 cm³ of amylase solution to test tube A.', 'tubeA', 'pour', 'amylase', null, null],
            ['Put test tube A in the water bath at 37 °C.', 'tubeA', 'heat', 'bath_37', null, null],
            ['Put 2 cm³ of starch suspension into test tube B.', 'tubeB', 'pour', 'starch', null, null],
            ['Add 1 cm³ of amylase solution to test tube B.', 'tubeB', 'pour', 'amylase', null, null],
            ['Put test tube B in the ice bath.', 'tubeB', 'heat', 'bath_ice', null, null],
            ['Put 2 cm³ of starch suspension into test tube C.', 'tubeC', 'pour', 'starch', null, null],
            ['Add 1 cm³ of BOILED amylase solution to test tube C.', 'tubeC', 'pour', 'boiled_amylase', null, null],
            ['Put test tube C in the water bath at 37 °C.', 'tubeC', 'heat', 'bath_37', null, null],
            ['After about 1 minute (watch the clock in the panel), do an iodine spot test on tube A and record the result.', 'tubeA', 'inspect', 'Starch absent', null, 'Choose Tube A, press "Iodine spot test", then record.'],
            ['Do an iodine spot test on tube B and record the result.', 'tubeB', 'inspect', 'Starch present', null, null],
            ['Do an iodine spot test on tube C and record the result.', 'tubeC', 'inspect', 'Starch present', null, null],
            ["Take tube A out, add 1 cm³ of Benedict's solution to it.", 'tubeA', 'pour', 'benedicts', null, null],
            ['Boil tube A in the boiling water bath.', 'tubeA', 'heat', 'bath_boil', null, null],
            ['Record the observation and deduction for tube A.', 'tubeA', 'inspect', 'Much reducing sugars present', null, 'Maltose made by the enzyme is a reducing sugar.'],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the effect of temperature on the activity of salivary amylase',
            'To investigate the effect of temperature on the action of salivary amylase on starch.',
            'Salivary amylase digests starch fastest at body temperature, slowly in the cold, and not at all once boiled.',
            'Independent: temperature / boiling of the enzyme. Dependent: presence of starch (iodine colour) after a given time. Controlled: volumes of starch and enzyme, time, pH.',
        ), [
            ['Explain the result of each tube (A at 37 °C, B in ice, C boiled enzyme).', 'short_answer', 'A: optimum temperature, starch fully digested to maltose. B: low temperature, low kinetic energy, enzyme slowed so starch remained. C: boiling denatured the enzyme, so no digestion.', 6, 'after_experiment'],
            ['What was the purpose of tube C?', 'short_answer', 'It is a control, showing that the digestion in A was caused by the active enzyme.', 2, 'after_experiment'],
            ['State two other factors that affect the rate of an enzyme-controlled reaction.', 'short_answer', 'pH, enzyme concentration, substrate concentration, inhibitors/activators.', 2, 'after_experiment'],
        ]),
        'conclusion' => 'Salivary amylase works best at body temperature; it is slowed by cold and destroyed by boiling.',
    ],
    // =========================================================================================
    [
        'template_key' => 'biology_soil_drainage_retention',
        'title' => 'Soil: Drainage and Water Retention of Sandy, Loam and Clay Soils',
        'topic' => 'Physical and chemical properties of soil',
        'render_component' => 'soil_tests',
        'minutes' => 30, 'marks' => 20,
        'skills' => ['measuring_volume', 'measuring_time', 'recording_observations', 'experimental_analysis'],
        'objective' => 'To compare the rate of drainage and the amount of water retained by sandy, loam and clay soils.',
        'introduction' => "Sandy soil has large, loosely packed particles and large air spaces: it drains quickly and holds little water. Clay soil has tiny, closely packed particles: it drains slowly and holds a lot of water. Loam is in between.\n\nWater retained = water added - water collected.\nPercentage of water retained = (water retained / water added) x 100.\n\nTask: Using funnels with filter paper on measuring cylinders, compare soils X, Y and Z.",
        'apparatus' => 'Soil samples X, Y and Z, 3 filter funnels, 3 filter papers, 3 measuring cylinders (100 ml), water, stop clock.',
        'safety' => 'Wipe up spilled water at once.',
        'scene' => [soil('soilX', 'Soil X', 'sand', 6.5), soil('soilY', 'Soil Y', 'loam', 6.5), soil('soilZ', 'Soil Z', 'clay', 6.5), funnel(1), funnel(2), funnel(3),
            ['key' => 'water1', 'object_type' => 'water_container', 'position' => ['x' => 0.3, 'y' => 0, 'z' => 0], 'props' => ['cm3' => 30]]],
        'steps' => [
            ['Put soil X into funnel 1, up to half way up the filter paper.', 'funnel1', 'pour', 'soilX', null, 'Choose Soil X, then "Put soil in".'],
            ['Put soil Y into funnel 2.', 'funnel2', 'pour', 'soilY', null, null],
            ['Put soil Z into funnel 3.', 'funnel3', 'pour', 'soilZ', null, null],
            ['Pour 30 cm³ of water into funnel 1 and start timing.', 'funnel1', 'pour', 'water', null, null],
            ['Pour 30 cm³ of water into funnel 2.', 'funnel2', 'pour', 'water', null, null],
            ['Pour 30 cm³ of water into funnel 3.', 'funnel3', 'pour', 'water', null, null],
            ['When funnel 1 stops dripping, read the volume of water collected.', 'funnel1', 'measure', null, null, 'Wait for "stopped dripping".'],
            ['When funnel 2 stops dripping, read the volume of water collected.', 'funnel2', 'measure', null, null, null],
            ['When funnel 3 stops dripping, read the volume of water collected.', 'funnel3', 'measure', null, null, 'Clay drains slowly: be patient.'],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the drainage and water retention of soils X, Y and Z',
            'To compare the rate of drainage and the water retention of soils X, Y and Z.',
            'Soil X (sandy) drains fastest and retains least water; soil Z (clay) retains most.',
            'Independent: type of soil. Dependent: volume of water collected / time to stop draining. Controlled: volume of water (30 cm³), amount of soil, time allowed.',
        ), [
            ['Tabulate: soil, water added, water collected, water retained, % water retained.', 'calculation', null, 6, 'after_experiment'],
            ['Which soil has the highest water retention, and which has the best drainage? Explain using particle size.', 'short_answer', 'Z (clay): small closely packed particles hold water. X (sand): large air spaces let water drain through.', 4, 'after_experiment'],
            ['A farmer wants to grow beans, which need well-drained soil. Which soil would you recommend, and why?', 'short_answer', 'Soil X/Y (sandy or loam): good drainage; loam also keeps enough water.', 3, 'after_experiment'],
        ]),
        'conclusion' => 'Sandy soil drains fastest and retains least water; clay drains slowest and retains most; loam is moderate.',
    ],
    // =========================================================================================
    [
        'template_key' => 'biology_soil_wetland_rice',
        'title' => 'Soil: Which Land Suits Wetland Rice? (Worked Example)',
        'topic' => 'Physical and chemical properties of soil',
        'render_component' => 'soil_tests',
        'minutes' => 25, 'marks' => 20,
        'skills' => ['measuring_volume', 'recording_observations', 'experimental_analysis'],
        'objective' => 'To determine the soil sample more suitable for wetland rice growing.',
        'introduction' => "An investor wishes to establish a commercial wetland rice growing scheme in Uganda. The government has two pieces of land, A and B. Soil experts found both soils have good soil air, humus and micro-organisms, but more tests are needed to decide the best land for the crop. Soil samples A and B have been collected from the two pieces of land.\n\nWetland rice grows well in waterlogged soils that hold a lot of water.\n\nTask: Carry out an investigation on soil samples A and B to determine which is suitable for rice growing.",
        'apparatus' => 'Soil samples A and B, 2 measuring cylinders (100 ml), 2 funnels, filter papers, water, beakers.',
        'safety' => 'Wipe up spilled water at once.',
        'scene' => [soil('soilA', 'Soil A', 'sand', 6.5), soil('soilB', 'Soil B', 'clay', 6.5), funnel(1), funnel(2),
            ['key' => 'water1', 'object_type' => 'water_container', 'position' => ['x' => 0.3, 'y' => 0, 'z' => 0], 'props' => ['cm3' => 30]]],
        'steps' => [
            ['Set up A: put soil sample A into funnel 1, up to half way up the paper.', 'funnel1', 'pour', 'soilA', null, null],
            ['Set up B: put soil sample B into funnel 2.', 'funnel2', 'pour', 'soilB', null, null],
            ['Pour 30 cm³ of water into funnel 1.', 'funnel1', 'pour', 'water', null, null],
            ['Pour 30 cm³ of water into funnel 2.', 'funnel2', 'pour', 'water', null, null],
            ['When it stops dripping, record the volume of water collected from set up A.', 'funnel1', 'measure', null, null, null],
            ['When it stops dripping, record the volume of water collected from set up B.', 'funnel2', 'measure', null, null, null],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the two soil samples to determine the one suitable for wetland rice growing',
            'To determine the suitable soil sample for wetland rice growing.',
            'Both soil samples from lands A and B are suitable for growing wetland rice.',
            'Independent: soil sample. Dependent: volume of water collected (water retained). Controlled: volume of water added (30 cm³), amount of soil, time.',
        ), [
            ['Tabulate: set up / soil sample, volume of water added, volume collected, difference in volume (water retained).', 'calculation', 'A: 30, about 25.5, about 4.5; B: 30, about 9.5, about 20.5', 6, 'after_experiment'],
            ['Analysis: describe the drainage and water retention of each soil.', 'short_answer', 'A allowed much water through and retained little: low water retention, good drainage. B allowed very little through and retained much: good water retention, poor drainage.', 4, 'after_experiment'],
            ['Conclusion and recommendation to the government.', 'short_answer', 'Soil sample B is more suitable for wetland rice growing because it retains much water; allocate land B to the investor.', 4, 'after_experiment'],
        ]),
        'conclusion' => 'Soil B retains more water, so land B is better for wetland rice.',
    ],
    // =========================================================================================
    [
        'template_key' => 'biology_soil_air_content',
        'title' => 'Soil: Volume of Air in Three Soil Samples (Demonstration Farm)',
        'topic' => 'Physical and chemical properties of soil',
        'render_component' => 'soil_tests',
        'minutes' => 30, 'marks' => 20,
        'skills' => ['measuring_volume', 'recording_observations', 'experimental_analysis'],
        'objective' => 'To determine the volume and percentage of air in soil samples X, Y and Z.',
        'introduction' => "The Ministry of Agriculture wants to set up a demonstration farm on soils with a moderate amount of air for growing maize and beans in Luwero district. Three farmers, Musoke, Lawrence and Edward, have offered their land. Soil sample X is from Musoke's land, Y from Lawrence's and Z from Edward's.\n\nWater poured onto a soil pushes out the air in its spaces, which escapes as bubbles, so the mixture's volume is less than soil + water.\nVolume of air V = (a + b) - c, where a = volume of soil, b = volume of water, c = final volume of the mixture.\nPercentage of air = V / a x 100.\n\nTask: Analyse the soil samples and advise the ministry on which farmer's land to use.",
        'apparatus' => 'Soil samples X, Y and Z, two measuring cylinders, water, stirring rod.',
        'safety' => 'Wipe up spilled water at once.',
        'scene' => [soil('soilX', 'Soil X (Musoke)', 'loam', 6.5), soil('soilY', 'Soil Y (Lawrence)', 'sand', 6.5), soil('soilZ', 'Soil Z (Edward)', 'clay', 6.5),
            ['key' => 'cylinder1', 'object_type' => 'measuring_cylinder', 'position' => ['x' => 0.14, 'y' => 0, 'z' => 0.02], 'props' => ['air_test' => true, 'soil_cm3' => 50]]],
        'steps' => [
            ['Soil X: put soil X into the cylinder to the 50 cm³ mark and tap it to compact it.', 'cylinder1', 'pour', 'soilX', null, 'Choose Soil X, then "Soil to 50 cm³".'],
            ['Put 50 cm³ of water into the second cylinder.', 'cylinder1', 'pour', 'water', null, null],
            ['Pour the water onto the soil and stir until the bubbling stops.', 'cylinder1', 'pour', 'water_onto_soil', null, null],
            ['Read the final volume of the mixture (c) for soil X.', 'cylinder1', 'measure', null, null, 'Wait for the bubbles to stop.'],
            ['Empty the cylinders. Soil Y: put soil Y to the 50 cm³ mark and tap it.', 'cylinder1', 'pour', 'soilY', null, 'Press Empty first, then choose Soil Y.'],
            ['Put 50 cm³ of water into the second cylinder.', 'cylinder1', 'pour', 'water', null, null],
            ['Pour the water onto the soil and stir.', 'cylinder1', 'pour', 'water_onto_soil', null, null],
            ['Read the final volume of the mixture (c) for soil Y.', 'cylinder1', 'measure', null, null, null],
            ['Empty the cylinders. Soil Z: put soil Z to the 50 cm³ mark and tap it.', 'cylinder1', 'pour', 'soilZ', null, null],
            ['Put 50 cm³ of water into the second cylinder.', 'cylinder1', 'pour', 'water', null, null],
            ['Pour the water onto the soil and stir.', 'cylinder1', 'pour', 'water_onto_soil', null, null],
            ['Read the final volume of the mixture (c) for soil Z.', 'cylinder1', 'measure', null, null, null],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the amount of air in soil samples X, Y and Z',
            'To determine the volume and percentage of air in soil samples X, Y and Z.',
            'The three soil samples contain different amounts of air.',
            'Independent: soil sample. Dependent: volume of air (from the final volume of the mixture). Controlled: volume of soil (50 cm³) and of water (50 cm³).',
        ), [
            ['Complete the table for X, Y and Z: volume of soil, volume of water, volume of mixture, volume of air, percentage of air.', 'calculation', 'X about 10 cm³ (20%), Y about 15 cm³ (30%), Z about 5 cm³ (10%)', 8, 'after_experiment'],
            ['Explain why the soils contain different amounts of air.', 'short_answer', 'Sandy soil has large loosely packed particles with large air spaces; clay has tiny closely packed particles with very small air spaces; loam is moderate.', 3, 'after_experiment'],
            ["Which farmer's land should the ministry use for the demonstration farm? Give a reason.", 'short_answer', "Musoke's land (soil X, loam): it has a moderate amount of air, suitable for maize and beans.", 4, 'after_experiment'],
        ]),
        'conclusion' => "Soil X (loam, Musoke's land) has a moderate amount of air and suits the demonstration farm.",
    ],
    // =========================================================================================
    [
        'template_key' => 'biology_soil_ph_avocado',
        'title' => 'Soil pH: Which Plot Suits Hass Avocado?',
        'topic' => 'Physical and chemical properties of soil',
        'render_component' => 'soil_tests',
        'minutes' => 25, 'marks' => 20,
        'skills' => ['recording_observations', 'experimental_analysis'],
        'objective' => 'To determine the pH of soil samples X, Y and Z and their suitability for Hass avocado.',
        'introduction' => "Hass avocado is a prominent cash crop. It thrives in acidic soils that hold moderate amounts of water. A farmer has three pieces of land and plans to plant avocado on one and food crops on the other two, but cannot tell which plot has the right pH. Soil samples X, Y and Z were collected from the three plots.\n\nSoil pH is the degree of acidity or alkalinity of the soil. Below 7 is acidic, 7 is neutral and above 7 is alkaline. Soil soaked with universal indicator changes colour; the colour is matched on the indicator chart to read the pH.\n\nTask: Carry out a scientific investigation on the three soil samples to assess their suitability for avocado and make recommendations to the farmer.",
        'apparatus' => 'Fresh soil samples X, Y and Z, petri dish, universal indicator solution, indicator chart, distilled water.',
        'safety' => 'Wash hands after handling soil.',
        'scene' => [soil('soilX', 'Soil X', 'loam', 5), soil('soilY', 'Soil Y', 'loam', 7), soil('soilZ', 'Soil Z', 'clay', 8),
            ['key' => 'dish1', 'object_type' => 'petri_dish', 'position' => ['x' => 0.3, 'y' => 0, 'z' => 0.12], 'props' => ['ph_test' => true]]],
        'steps' => [
            ['Place about 3 g of soil X in the petri dish.', 'dish1', 'pour', 'soilX', null, 'Choose Soil X, then "Put about 3 g of soil".'],
            ['Soak it with universal indicator and leave it for about 2 minutes.', 'dish1', 'pour', 'universal', null, null],
            ['Tilt the dish and match the indicator colour on the chart to read the pH of soil X.', 'dish1', 'measure', '5', 0.5, 'Click the chart colour that matches.'],
            ['Clean the dish. Place about 3 g of soil Y in it.', 'dish1', 'pour', 'soilY', null, 'Press "Clean dish" first.'],
            ['Soak soil Y with universal indicator.', 'dish1', 'pour', 'universal', null, null],
            ['Read the pH of soil Y from the chart.', 'dish1', 'measure', '7', 0.5, null],
            ['Clean the dish. Place about 3 g of soil Z in it.', 'dish1', 'pour', 'soilZ', null, null],
            ['Soak soil Z with universal indicator.', 'dish1', 'pour', 'universal', null, null],
            ['Read the pH of soil Z from the chart.', 'dish1', 'measure', '8', 0.5, null],
        ],
        'questions' => array_merge(reportStart(
            'An investigation on the pH of soil samples X, Y and Z',
            'To determine the pH of soil samples X, Y and Z and their suitability for growing Hass avocado.',
            'One of the soil samples is acidic and suitable for Hass avocado.',
            'Independent: soil sample. Dependent: indicator colour / pH. Controlled: amount of soil (3 g), volume of indicator, time left to soak.',
        ), [
            ['Record the colour and pH of each soil, and say whether it is acidic, neutral or alkaline.', 'observation', 'X: orange, pH 5, acidic. Y: green, pH 7, neutral. Z: blue-green, pH 8, alkaline.', 6, 'after_experiment'],
            ['Which plot should the farmer use for avocado, and why?', 'short_answer', 'Plot X: its soil is acidic, which Hass avocado needs.', 3, 'after_experiment'],
            ['Why does soil pH matter to plants?', 'short_answer', 'It affects the rate at which mineral salts (nitrogen, phosphorus, iron) are absorbed by the roots; most plants grow best in slightly acidic or neutral soil.', 3, 'after_experiment'],
        ]),
        'conclusion' => 'Soil X is acidic and suits Hass avocado; Y (neutral) and Z (alkaline) can be used for food crops.',
    ],
];

// ---- Insert / refresh ------------------------------------------------------------------------------
$exists = $db->prepare('SELECT id FROM virtual_lab_experiments WHERE template_key = ?');
$insExp = $db->prepare(
    "INSERT INTO virtual_lab_experiments
        (title, subject_id, topic, category, difficulty, render_mode, render_component, template_key, template_version,
         engine_version, estimated_duration_minutes, competency, practical_skills, objective, introduction, apparatus,
         materials, safety_precautions, scene_objects, conclusion_prompt, marks, is_template, status)
     VALUES (?, ?, ?, 'biology', 'intermediate', '2d', ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, 'None (all apparatus is simulated).', ?, ?, ?, ?, 1, 'published')"
);
$insStep = $db->prepare(
    'INSERT INTO virtual_lab_steps (experiment_id, step_number, instruction, target_object_key, required_action, expected_value, tolerance, hint, is_safety_check)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$insQ = $db->prepare(
    "INSERT INTO virtual_lab_questions (experiment_id, question_number, question_text, question_type, stage, requirement, expected_answer, marks)
     VALUES (?, ?, ?, ?, ?, 'notebook_only', ?, ?)"
);
$insDept = $db->prepare('INSERT INTO virtual_lab_experiment_departments (experiment_id, department_id) VALUES (?, ?)');
$skills = new \eSpace\App\Services\PracticalSkillService();

$refresh = null;
foreach ($argv as $arg) if (str_starts_with($arg, '--refresh=')) $refresh = substr($arg, 10);

function writeChildren(int $id, array $t): void
{
    global $insStep, $insQ;
    foreach ($t['steps'] as $i => [$text, $target, $action, $expected, $tol, $hint]) {
        $insStep->execute([$id, $i + 1, $text, $target, $action, $expected, $tol, $hint, $action === 'acknowledge' ? 1 : 0]);
    }
    foreach ($t['questions'] as $i => $q) {
        [$text, $type, $answer, $marks] = $q;
        $insQ->execute([$id, $i + 1, $text, $type, $q[4] ?? 'after_experiment', $answer, $marks]);
    }
}

foreach ($templates as $t) {
    $exists->execute([$t['template_key']]);
    $existingId = (int) $exists->fetchColumn();
    $engine = $t['render_component'] . '-v1';
    if ($existingId && $refresh === $t['template_key']) {
        $used = $db->prepare('SELECT COUNT(*) FROM virtual_lab_assignments WHERE experiment_id = ?');
        $used->execute([$existingId]);
        if ((int) $used->fetchColumn() > 0) { echo "NOT refreshed (already given to a class): {$t['title']}\n"; continue; }
        $db->beginTransaction();
        try {
            $db->prepare(
                "UPDATE virtual_lab_experiments SET title = ?, topic = ?, render_component = ?, engine_version = ?, estimated_duration_minutes = ?,
                   competency = ?, practical_skills = ?, objective = ?, introduction = ?, apparatus = ?, safety_precautions = ?,
                   scene_objects = ?, conclusion_prompt = ?, marks = ?, updated_at = NOW() WHERE id = ?"
            )->execute([$t['title'], $t['topic'], $t['render_component'], $engine, $t['minutes'], $t['objective'], json_encode($t['skills']),
                $t['objective'], $t['introduction'], $t['apparatus'], $t['safety'], json_encode($t['scene'], JSON_UNESCAPED_UNICODE), $t['conclusion'], $t['marks'], $existingId]);
            $db->prepare('DELETE ss FROM virtual_lab_step_skills ss JOIN virtual_lab_steps s ON s.id = ss.step_id WHERE s.experiment_id = ?')->execute([$existingId]);
            $db->prepare('DELETE FROM virtual_lab_steps WHERE experiment_id = ?')->execute([$existingId]);
            $db->prepare('DELETE FROM virtual_lab_questions WHERE experiment_id = ?')->execute([$existingId]);
            writeChildren($existingId, $t);
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
            $t['title'], BIOLOGY_SUBJECT_ID, $t['topic'], $t['render_component'], $t['template_key'], $engine,
            $t['minutes'], $t['objective'], json_encode($t['skills']), $t['objective'], $t['introduction'], $t['apparatus'],
            $t['safety'], json_encode($t['scene'], JSON_UNESCAPED_UNICODE), $t['conclusion'], $t['marks'],
        ]);
        $id = (int) $db->lastInsertId();
        writeChildren($id, $t);
        $insDept->execute([$id, BIOLOGY_DEPARTMENT_ID]);
        $db->commit();
        $skills->syncStepSkills($id);
        echo "added #$id: {$t['title']}\n";
    } catch (\Throwable $e) {
        $db->rollBack();
        echo "FAILED {$t['title']}: {$e->getMessage()}\n";
    }
}
