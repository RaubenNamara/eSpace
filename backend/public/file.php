<?php

declare(strict_types=1);

// Serves an uploaded file to someone allowed to have it - see App\Support\FileAccess. Reached only
// through the rewrite in this folder's .htaccess, so the file's address never changes. Supports
// Range requests (a video can skip ahead) and answers 304 when the browser's copy is still good.

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

use eSpace\App\Support\FileAccess;
use eSpace\App\Support\Tenant;
use eSpace\Config\Config;

Config::load();
ini_set('display_errors', '0');

function refuse(int $code, string $message): void
{
    http_response_code($code);
    header('Content-Type: text/plain; charset=utf-8');
    header('Cache-Control: no-store');
    echo $message;
    exit;
}

if (!in_array($_SERVER['REQUEST_METHOD'] ?? '', ['GET', 'HEAD'], true)) {
    refuse(405, 'Not allowed.');
}

$uri = rawurldecode((string) parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH));
$rel = str_contains($uri, '/uploads/') ? FileAccess::relativePath($uri) : null;
if ($rel === null) {
    refuse(404, 'File not found.');
}

// A signed link, or a signed-in user
$signed = FileAccess::validSignature($rel, (string) ($_GET['exp'] ?? ''), (string) ($_GET['sig'] ?? ''));
if (!$signed) {
    if (empty($_COOKIE[session_name()])) {
        refuse(401, 'Please sign in to Tusome to open this file.');
    }
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_strict_mode', '1');
    ini_set('session.cookie_secure', Config::get('APP_ENV') === 'production' ? '1' : '0');
    ini_set('session.cookie_samesite', Config::get('APP_ENV') === 'production' ? 'Strict' : 'Lax');
    // read and let go at once: a long video must not hold the session and stall every other request
    session_start(['read_and_close' => true]);

    $signedIn = !empty($_SESSION['dev_admin_id']) || (!empty($_SESSION['user_id']) && !empty($_SESSION['role']));
    if (!$signedIn || Tenant::guardSession() !== null) {
        refuse(401, 'Please sign in to Tusome to open this file.');
    }
    if (!FileAccess::userMayOpen($rel, $_SESSION['role'] ?? null, (int) ($_SESSION['user_id'] ?? 0))) {
        refuse(403, 'You do not have access to this file.');
    }
}

$root = realpath(__DIR__ . '/uploads');
$file = realpath(__DIR__ . '/uploads/' . $rel);
$ext = strtolower(pathinfo((string) $file, PATHINFO_EXTENSION));
if ($root === false || $file === false || !str_starts_with($file, $root . DIRECTORY_SEPARATOR) || !is_file($file)
    || preg_match('/^(php\d*|phtml|phar|pl|py|cgi|sh)$/', $ext)) {
    refuse(404, 'File not found.');
}

$types = [
    'pdf' => 'application/pdf', 'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'gif' => 'image/gif',
    'webp' => 'image/webp', 'svg' => 'image/svg+xml', 'ico' => 'image/x-icon', 'bmp' => 'image/bmp',
    'mp4' => 'video/mp4', 'webm' => 'video/webm', 'ogv' => 'video/ogg', 'mov' => 'video/quicktime',
    'mp3' => 'audio/mpeg', 'wav' => 'audio/wav', 'ogg' => 'audio/ogg', 'm4a' => 'audio/mp4', 'aac' => 'audio/aac',
    'txt' => 'text/plain; charset=utf-8', 'csv' => 'text/csv; charset=utf-8', 'json' => 'application/json',
    'doc' => 'application/msword', 'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls' => 'application/vnd.ms-excel', 'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt' => 'application/vnd.ms-powerpoint', 'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'pub' => 'application/x-mspublisher', 'mdb' => 'application/x-msaccess', 'accdb' => 'application/x-msaccess',
    'zip' => 'application/zip', 'rar' => 'application/vnd.rar', '7z' => 'application/x-7z-compressed',
];

$size = (int) filesize($file);
$etag = '"' . dechex($size) . '-' . dechex((int) filemtime($file)) . '"';

header('X-Content-Type-Options: nosniff');
header('Cache-Control: private, max-age=86400');
header('ETag: ' . $etag);
header('Accept-Ranges: bytes');
header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
if ($ext === 'svg') {
    header('Content-Security-Policy: sandbox'); // a picture can't run scripts as the site
}
if (!isset($types[$ext])) {
    header('Content-Disposition: attachment'); // anything else downloads; it never opens as a page
}

if (trim((string) ($_SERVER['HTTP_IF_NONE_MATCH'] ?? '')) === $etag) {
    http_response_code(304);
    exit;
}

$start = 0;
$end = $size - 1;
if ($size > 0 && preg_match('/^bytes=(\d*)-(\d*)$/', (string) ($_SERVER['HTTP_RANGE'] ?? ''), $m) && ($m[1] !== '' || $m[2] !== '')) {
    if ($m[1] === '') {
        $start = max(0, $size - (int) $m[2]);
    } else {
        $start = (int) $m[1];
        $end = $m[2] === '' ? $end : min((int) $m[2], $end);
    }
    if ($start > $end) {
        header('Content-Range: bytes */' . $size);
        http_response_code(416);
        exit;
    }
    http_response_code(206);
    header("Content-Range: bytes {$start}-{$end}/{$size}");
}

header('Content-Length: ' . ($size > 0 ? $end - $start + 1 : 0));
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'HEAD' || $size === 0) {
    exit;
}

ini_set('zlib.output_compression', '0');
set_time_limit(0);
while (ob_get_level() > 0) {
    ob_end_clean();
}

$in = fopen($file, 'rb');
if ($in === false) {
    exit;
}
fseek($in, $start);
$left = $end - $start + 1;
while ($left > 0 && !feof($in) && !connection_aborted()) {
    $chunk = fread($in, min(65536, $left));
    if ($chunk === false || $chunk === '') {
        break;
    }
    echo $chunk;
    flush();
    $left -= strlen($chunk);
}
fclose($in);
