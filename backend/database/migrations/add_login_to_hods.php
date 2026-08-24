<?php
/**
 * Add login credentials to hods table
 */

$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Add username, email, password, role fields to hods table
    $sql = "ALTER TABLE hods 
            ADD COLUMN username VARCHAR(50) UNIQUE AFTER id,
            ADD COLUMN email VARCHAR(100) UNIQUE AFTER username,
            ADD COLUMN password VARCHAR(255) NOT NULL AFTER email,
            ADD COLUMN role ENUM('hod') NOT NULL DEFAULT 'hod' AFTER password,
            ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1 AFTER role,
            ADD COLUMN email_verified_at TIMESTAMP NULL AFTER is_active,
            ADD COLUMN last_login_at TIMESTAMP NULL AFTER email_verified_at,
            ADD COLUMN last_login_ip VARCHAR(45) NULL AFTER last_login_at,
            ADD COLUMN profile_photo VARCHAR(255) NULL AFTER last_login_ip";

    $pdo->exec($sql);
    echo "Successfully added login credentials to hods table.\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Note: Columns might already exist.\n";
}
