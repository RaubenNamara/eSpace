<?php
/**
 * Drop foreign key constraint and user_id column from teachers table
 */

$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Drop foreign key constraint
    $sql = "ALTER TABLE teachers DROP FOREIGN KEY teachers_ibfk_1";
    try {
        $pdo->exec($sql);
        echo "Successfully dropped foreign key constraint.\n";
    } catch (PDOException $e) {
        echo "Foreign key might not exist or have different name: " . $e->getMessage() . "\n";
    }

    // Drop user_id column
    $sql = "ALTER TABLE teachers DROP COLUMN user_id";
    $pdo->exec($sql);
    echo "Successfully removed user_id column from teachers table.\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
