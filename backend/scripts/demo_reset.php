<?php

declare(strict_types=1);

/**
 * Rebuild the demo school (DemoSchool), wiping whatever visitors changed - run every week by a
 * cPanel cron job, e.g. Sundays at 02:30:
 *
 *   30 2 * * 0  php /home/smacon/public_html/eSpace/backend/scripts/demo_reset.php
 *
 * Needs a school in the developer portal with the code in DEMO_SCHOOL_CODE (default "demo") and
 * its own database. Everything in that database is thrown away and built again; nothing else is
 * touched. Takes a minute or so.
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../config/Config.php';
require __DIR__ . '/../config/Database.php';

\eSpace\Config\Config::load();

$started = microtime(true);
try {
    foreach ((new \eSpace\App\Services\DemoSchool())->rebuild() as $line) {
        echo date('H:i:s') . "  {$line}\n";
    }
    printf("%s demo school rebuilt in %.1fs\n", date('Y-m-d H:i'), microtime(true) - $started);
} catch (\Throwable $e) {
    fwrite(STDERR, date('Y-m-d H:i') . ' demo reset failed: ' . $e->getMessage() . "\n");
    exit(1);
}
