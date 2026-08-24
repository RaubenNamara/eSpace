<?php
/**
 * Remove user_id column from teachers table
 */

$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Remove user_id column from teachers table
    $sql = "ALTER TABLE teachers DROP COLUMN user_id";
    $pdo->exec($sql);
    echo "Successfully removed user_id column from teachers table.\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Note: Column might not exist or there might be foreign key constraints.\n";
}
