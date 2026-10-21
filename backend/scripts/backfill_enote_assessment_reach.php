<?php

declare(strict_types=1);

/**
 * One-off: bring every duplicated eNote topic's existing LOA/AOI to the streams its published
 * copies are in (new duplicates/publishes do this themselves - see ENoteAssessmentReach).
 * Idempotent, only ever adds visibility rows.
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

// one live topic per group that has an LOA/AOI anywhere in it
$topicIds = $db->query(
    "SELECT MIN(et.id) FROM enote_topics et
     WHERE et.content_group_id IS NOT NULL AND et.deleted_at IS NULL
       AND EXISTS (SELECT 1 FROM assignments a INNER JOIN enote_topics g ON g.id = a.enote_topic_id
                   WHERE g.content_group_id = et.content_group_id AND a.deleted_at IS NULL)
     GROUP BY et.content_group_id"
)->fetchAll(\PDO::FETCH_COLUMN);

foreach ($topicIds as $topicId) {
    \eSpace\App\Services\ENoteAssessmentReach::sync($db, (int) $topicId);
}

echo count($topicIds) . ' topic group(s) synced, ' . ($countRows() - $before) . " visibility row(s) added\n";
