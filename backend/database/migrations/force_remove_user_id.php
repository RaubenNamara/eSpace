<?php
/**
 * Force remove user_id column from teachers table by disabling foreign key checks
 */

$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Disable foreign key checks
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
    echo "Disabled foreign key checks.\n";

    // Drop user_id column
    $sql = "ALTER TABLE teachers DROP COLUMN user_id";
    $pdo->exec($sql);
    echo "Successfully removed user_id column from teachers table.\n";

    // Re-enable foreign key checks
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
    echo "Re-enabled foreign key checks.\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
    // Make sure to re-enable foreign key checks even if there's an error
    try {
        $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
    } catch (PDOException $e2) {
        // Ignore
    }
}
