<?php
/**
 * Drop foreign key fk_teachers_user and user_id column from teachers table
 */

$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Disable foreign key checks temporarily
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");

    // Drop the foreign key constraint
    $sql = "ALTER TABLE teachers DROP FOREIGN KEY fk_teachers_user";
    $pdo->exec($sql);
    echo "Successfully dropped foreign key constraint fk_teachers_user.\n";

    // Drop the user_id column
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
