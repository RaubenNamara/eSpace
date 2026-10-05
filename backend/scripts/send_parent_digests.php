<?php

declare(strict_types=1);

/**
 * Weekly parent digest - run by a cPanel cron job, e.g. every Friday at 17:00:
 *
 *   0 17 * * 5  php /home/smacon/public_html/eSpace/backend/scripts/send_parent_digests.php https://espace.stmark.sc.ug
 *
 * Emails each active parent link (with an address, digest on) that hasn't had one in the last
 * six days. Safe to run more often - a link never gets two in a week.
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

date_default_timezone_set('UTC');

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../config/config.php';
require __DIR__ . '/../config/Database.php';

\eSpace\Config\Config::load();

$siteUrl = $argv[1] ?? 'https://espace.stmark.sc.ug';
$result = \eSpace\App\Controllers\Admin\ParentLinkController::sendDue(\eSpace\Config\Database::getInstance(), $siteUrl, true);
echo date('Y-m-d H:i') . " parent digests: {$result['sent']} sent, {$result['failed']} failed\n";
