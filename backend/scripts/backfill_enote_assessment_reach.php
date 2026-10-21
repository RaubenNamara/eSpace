<?php

declare(strict_types=1);

/**
 * Bring every duplicated eNote topic's existing LOA/AOI to the streams its published copies are
 * in. Not normally needed - this runs by itself once after deploy (ENoteAssessmentReach::
 * backfillOnce()) and new duplicates/publishes keep reach up to date. Idempotent, only ever adds
 * visibility rows.
 *
 *   php backend/scripts/backfill_enote_assessment_reach.php
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../config/config.php';
require __DIR__ . '/../config/Database.php';

\eSpace\Config\Config::load();

$db = \eSpace\Config\Database::getInstance();

$countRows = fn(): int => (int) $db->query('SELECT COUNT(*) FROM assignment_classes')->fetchColumn();
$before = $countRows();
$groups = \eSpace\App\Services\ENoteAssessmentReach::syncAll($db);

echo $groups . ' topic group(s) synced, ' . ($countRows() - $before) . " visibility row(s) added\n";
