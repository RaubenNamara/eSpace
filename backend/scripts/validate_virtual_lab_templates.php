<?php
/**
 * Virtual Lab template QA audit - a keepable maintenance script (not a throwaway), safe to re-run
 * any time after seeding or editing official templates. Checks every `is_template = 1` row for
 * structural problems that the app itself won't surface until a student actually hits them:
 *
 *  - render_mode/render_component point at a real, registered 2D renderer (or are correctly 3D)
 *  - the apparatus each 2D renderer actually needs is present in scene_objects
 *  - every step's target_object_key (and, for connect steps, expected_value) references a real
 *    scene_objects key - catches typos that would silently make a step ungradable
 *  - every scene_objects entry's object_type exists in the virtual_lab_objects catalog
 *  - step_numbers are contiguous starting at 1
 *  - tolerance is only set on numeric expected_value (a non-numeric tolerance is meaningless)
 *  - question marks don't exceed the experiment's total marks
 *
 * Usage: php backend/scripts/validate_virtual_lab_templates.php
 * Exits 0 if clean, 1 if any FAIL-level issue was found (WARN-level issues don't fail the run).
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

$db = \eSpace\Config\Database::getInstance();

// Keep this in sync with frontend/src/components/virtuallab/render2d/registry.ts.
const KNOWN_2D_RENDERERS = ['pendulum', 'hookes_law', 'circuit', 'titration', 'microscope', 'optics', 'projectile'];

// The apparatus object_types each 2D renderer actually looks for by hardcoded convention -
// keep in sync with each VirtualLabScene*.vue file's own expectations.
const RENDERER_REQUIRED_TYPES = [
    'pendulum' => ['specimen', 'ruler', 'stopwatch'],
    'hookes_law' => ['retort_stand', 'spring', 'ruler', 'mass_piece'],
    'circuit' => ['battery', 'switch', 'resistor'],
    'titration' => ['burette', 'beaker', 'pipette'],
    'microscope' => ['microscope', 'biological_model'],
    'optics' => ['ray_box', 'protractor'], // + one of mirror/glass_block, checked separately
    'projectile' => ['projectile_launcher', 'projectile', 'ruler'],
];

$catalogTypes = array_column($db->query('SELECT object_type FROM virtual_lab_objects')->fetchAll(), 'object_type');
$knownSkills = array_keys(\eSpace\App\Services\PracticalSkillService::SKILLS);

$failCount = 0;
$warnCount = 0;
function report(string $level, string $expTitle, string $msg): void {
    global $failCount, $warnCount;
    echo "[$level] $expTitle: $msg\n";
    if ($level === 'FAIL') $GLOBALS['failCount']++;
    else $GLOBALS['warnCount']++;
}

$experiments = $db->query("SELECT * FROM virtual_lab_experiments WHERE is_template = 1 AND deleted_at IS NULL ORDER BY id")->fetchAll();

foreach ($experiments as $exp) {
    $title = "#{$exp['id']} {$exp['title']}";
    $sceneObjects = json_decode($exp['scene_objects'], true) ?: [];
    $sceneKeys = array_column($sceneObjects, 'key');

    // 1. render_mode / render_component consistency
    if ($exp['render_mode'] === '2d') {
        if (empty($exp['render_component'])) {
            report('FAIL', $title, 'render_mode=2d but render_component is empty.');
        } elseif (!in_array($exp['render_component'], KNOWN_2D_RENDERERS, true)) {
            report('FAIL', $title, "render_component '{$exp['render_component']}' is not a registered 2D renderer.");
        } else {
            $required = RENDERER_REQUIRED_TYPES[$exp['render_component']];
            $sceneTypes = array_column($sceneObjects, 'object_type');
            foreach ($required as $reqType) {
                if (!in_array($reqType, $sceneTypes, true)) {
                    report('FAIL', $title, "renderer '{$exp['render_component']}' expects a '$reqType' object but none is in scene_objects.");
                }
            }
            if ($exp['render_component'] === 'optics' && !in_array('mirror', $sceneTypes, true) && !in_array('glass_block', $sceneTypes, true)) {
                report('FAIL', $title, "optics renderer needs a mirror or glass_block, neither is present.");
            }
        }
    } elseif (!empty($exp['render_component'])) {
        report('WARN', $title, "render_mode=3d but render_component is set ('{$exp['render_component']}') - ignored by the frontend, likely stale.");
    }

    // 2. scene_objects object_type must exist in the catalog
    foreach ($sceneObjects as $o) {
        if (!in_array($o['object_type'], $catalogTypes, true)) {
            report('FAIL', $title, "scene object '{$o['key']}' has unknown object_type '{$o['object_type']}'.");
        }
    }

    // 3. steps
    $steps = $db->prepare('SELECT * FROM virtual_lab_steps WHERE experiment_id = :id ORDER BY step_number');
    $steps->execute(['id' => $exp['id']]);
    $stepRows = $steps->fetchAll();

    $expectedNumber = 1;
    foreach ($stepRows as $s) {
        if ((int) $s['step_number'] !== $expectedNumber) {
            report('FAIL', $title, "step_number gap/duplicate - expected $expectedNumber, found {$s['step_number']}.");
        }
        $expectedNumber = (int) $s['step_number'] + 1;

        if ($s['target_object_key'] !== null && !in_array($s['target_object_key'], $sceneKeys, true)) {
            report('FAIL', $title, "step #{$s['step_number']} target_object_key '{$s['target_object_key']}' is not a key in scene_objects.");
        }
        if ($s['required_action'] === 'connect' && $s['expected_value'] !== null && !in_array($s['expected_value'], $sceneKeys, true) && !is_numeric($s['expected_value'])) {
            report('WARN', $title, "step #{$s['step_number']} connect expected_value '{$s['expected_value']}' is not a known object key.");
        }
        if ($s['tolerance'] !== null && !is_numeric($s['expected_value'])) {
            report('WARN', $title, "step #{$s['step_number']} has a tolerance but expected_value ('{$s['expected_value']}') isn't numeric - tolerance is ignored.");
        }
    }
    if (empty($stepRows)) {
        report('FAIL', $title, 'has no steps at all.');
    }

    // 4. questions vs marks
    $questions = $db->prepare('SELECT SUM(marks) total FROM virtual_lab_questions WHERE experiment_id = :id');
    $questions->execute(['id' => $exp['id']]);
    $qMarks = (float) ($questions->fetch()['total'] ?? 0);
    if ($qMarks > (float) $exp['marks']) {
        report('WARN', $title, "question marks ($qMarks) exceed the experiment's total marks ({$exp['marks']}).");
    }

    // 5. every official template should carry a stable template_key (a template without one can't
    // be found by findTemplateByKey()'s duplicate-prevention safeguard).
    if (empty($exp['template_key'])) {
        report('WARN', $title, 'is a template but has no template_key set.');
    }
}

// 6. duplicate template_key (belt-and-braces on top of the DB's own UNIQUE constraint).
$dupes = $db->query(
    "SELECT template_key, COUNT(*) c FROM virtual_lab_experiments
     WHERE is_template = 1 AND template_key IS NOT NULL AND deleted_at IS NULL
     GROUP BY template_key HAVING COUNT(*) > 1"
)->fetchAll();
foreach ($dupes as $d) {
    report('FAIL', 'template_key=' . $d['template_key'], "used by {$d['c']} template rows - should be unique.");
}

// 7. orphan skill references - a virtual_lab_step_skills row whose skill_key isn't in the current
// PracticalSkillService catalog (stale after a catalog rename/removal).
$orphans = $db->query(
    "SELECT DISTINCT skill_key FROM virtual_lab_step_skills WHERE skill_key NOT IN ('" . implode("','", $knownSkills) . "')"
)->fetchAll();
foreach ($orphans as $o) {
    report('WARN', 'skill_key=' . $o['skill_key'], 'is mapped on some steps but is not in PracticalSkillService::SKILLS.');
}

// 8. a deprecated template must still resolve to a real renderer/apparatus set - it stays fully
// functional for historical attempts, just hidden from new-assignment browsing.
$deprecated = $db->query("SELECT id, title FROM virtual_lab_experiments WHERE is_template = 1 AND is_deprecated = 1 AND deleted_at IS NULL")->fetchAll();
foreach ($deprecated as $d) {
    $stepCount = $db->prepare('SELECT COUNT(*) c FROM virtual_lab_steps WHERE experiment_id = :id');
    $stepCount->execute(['id' => $d['id']]);
    if ((int) $stepCount->fetch()['c'] === 0) {
        report('FAIL', "#{$d['id']} {$d['title']}", 'is deprecated but has no steps left - historical attempts would be unreviewable.');
    }
}

echo "\n" . count($experiments) . " templates checked, " . count($deprecated) . " deprecated - $failCount FAIL, $warnCount WARN.\n";
exit($failCount > 0 ? 1 : 0);
