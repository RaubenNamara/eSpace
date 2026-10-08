<?php

declare(strict_types=1);

/**
 * eSpace Backend API Entry Point
 * 
 * This is the main entry point for all API requests.
 * It initializes the application and routes requests to appropriate controllers.
 */

// Set timezone
date_default_timezone_set('UTC');

// Load Composer autoloader
require_once __DIR__ . '/../vendor/autoload.php';

// Load configuration
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

use eSpace\Config\Config;

// Load configuration
Config::load();

// Enable error reporting based on environment - APP_DEBUG must be false in production, or PHP
// would print file paths/stack traces straight into the HTTP response body.
error_reporting(E_ALL);
ini_set('display_errors', Config::isDebug() ? '1' : '0');

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    // Configure session settings
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.cookie_secure', Config::get('APP_ENV') === 'production' ? '1' : '0');
    ini_set('session.cookie_samesite', Config::get('APP_ENV') === 'production' ? 'Strict' : 'Lax');
    
    session_start();
}

// Set CORS headers
header('Access-Control-Allow-Origin: ' . Config::get('FRONTEND_URL', 'http://localhost:3000'));
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Set JSON header
header('Content-Type: application/json; charset=utf-8');

// An upload bigger than the server's post_max_size is thrown away by PHP before any of our code
// runs ($_POST and $_FILES arrive empty), which would otherwise surface as a confusing "choose a
// file" or validation error. Say plainly that the file is too big, and what the limit is.
$tooBig = (function (): ?array {
    $length = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    $limit = trim((string) ini_get('post_max_size'));
    if ($length <= 0 || $limit === '' || $limit === '0') {
        return null;
    }
    $bytes = (int) $limit;
    $unit = strtolower(substr($limit, -1));
    $bytes *= match ($unit) { 'g' => 1024 ** 3, 'm' => 1024 ** 2, 'k' => 1024, default => 1 };
    return $length > $bytes ? ['size' => $length, 'limit' => $bytes] : null;
})();
if ($tooBig !== null && empty($_POST) && empty($_FILES)) {
    $mb = fn (int $b) => $b >= 1024 ** 2 ? round($b / 1024 ** 2) . ' MB' : round($b / 1024) . ' KB';
    http_response_code(413);
    echo json_encode([
        'success' => false,
        'message' => "This file is {$mb($tooBig['size'])} - the server accepts uploads up to {$mb($tooBig['limit'])}. Use a smaller file or ask the administrator to raise the limit.",
        'errors' => ['file' => 'File too large'],
    ]);
    exit;
}

// Load routes
require_once __DIR__ . '/../routes/api.php';

// The router will handle the request and send the response
