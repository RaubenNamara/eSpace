<?php

declare(strict_types=1);

/**
 * Makes the PDF copy (".reader.pdf") of every eLibrary PowerPoint that has none yet, so it opens
 * in the book reader like a PDF book. New uploads get theirs at upload time; this is for books
 * uploaded before that (or while the server had no LibreOffice). Safe to run again: books that
 * already have a copy are skipped. --force makes them all again.
 *
 *   php backend/scripts/convert_library_presentations.php [--force]
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../config/config.php';

\eSpace\Config\Config::load();

use eSpace\App\Services\PresentationToPdf;

$force = in_array('--force', $argv, true);
$soffice = PresentationToPdf::soffice();
if ($soffice === null) {
    fwrite(STDERR, "LibreOffice not found. Install it, or set SOFFICE_PATH in backend/.env.\n");
    exit(1);
}
echo "Using $soffice\n";

$dir = __DIR__ . '/../public/uploads/library';
$files = array_merge(glob($dir . '/*.pptx') ?: [], glob($dir . '/*.ppt') ?: []);
$made = $skipped = $failed = 0;
foreach ($files as $file) {
    $name = basename($file);
    if (!$force && is_file(PresentationToPdf::readerPath($file))) {
        $skipped++;
        continue;
    }
    echo "  $name ... ";
    $started = microtime(true);
    if (PresentationToPdf::convert($file)) {
        $made++;
        printf("done (%.1fs)\n", microtime(true) - $started);
    } else {
        $failed++;
        echo "FAILED (see the PHP error log)\n";
    }
}
echo "Made $made, already had one $skipped, failed $failed.\n";
exit($failed ? 1 : 0);
