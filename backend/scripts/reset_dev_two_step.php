<?php

declare(strict_types=1);

/**
 * Turn off a developer-portal login's two-step sign-in (a lost or replaced phone). The next time
 * they sign in, the portal asks them to set it up again with their new phone.
 *
 *   php backend/scripts/reset_dev_two_step.php you@example.com
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

use eSpace\App\Support\Tenant;

\eSpace\Config\Config::load();

$email = strtolower(trim((string) ($argv[1] ?? '')));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fwrite(STDERR, "Usage: php reset_dev_two_step.php you@example.com\n");
    exit(1);
}
$db = Tenant::platform();
if (!$db) {
    fwrite(STDERR, "The platform database isn't reachable.\n");
    exit(1);
}
$stmt = $db->prepare('UPDATE platform_admins SET totp_secret = NULL, totp_last_step = NULL WHERE email = ?');
$stmt->execute([$email]);
echo $stmt->rowCount() ? "Two-step sign-in turned off for {$email}. They set it up again at their next sign-in.\n" : "No developer-portal login has that email (or it was already off).\n";
