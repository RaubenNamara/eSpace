<?php

declare(strict_types=1);

/**
 * Create (or reset the password of) a developer-portal login - for the Tusome team only.
 *
 *   php backend/scripts/create_dev_admin.php you@example.com "Your Name"
 *
 * Prints a new password once. Needs the platform database (database/platform/001_platform.sql).
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

use eSpace\App\Support\Tenant;
use eSpace\App\Services\SchoolProvisioner;

\eSpace\Config\Config::load();

[$_, $email, $name] = array_pad($argv, 3, null);
$email = strtolower(trim((string) $email));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fwrite(STDERR, "Usage: php create_dev_admin.php you@example.com \"Your Name\"\n");
    exit(1);
}
$db = Tenant::platform();
if (!$db) {
    fwrite(STDERR, "The platform database isn't reachable - create it and run database/platform/001_platform.sql first.\n");
    exit(1);
}
$password = SchoolProvisioner::password(12);
$db->prepare(
    'INSERT INTO platform_admins (name, email, password) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password = VALUES(password), is_active = 1' . ($name ? ', name = VALUES(name)' : '')
)->execute([$name ?: $email, $email, password_hash($password, PASSWORD_BCRYPT)]);
echo "Developer portal login\n  email:    {$email}\n  password: {$password}\n";
