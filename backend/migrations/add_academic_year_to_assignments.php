<?php

/**
 * Migration: Add academic_year column to assignments table
 * Run this file to add the column to the database
 */

// Direct database connection without framework dependencies
$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if column already exists
    $checkSql = "SHOW COLUMNS FROM assignments LIKE 'academic_year'";
    $stmt = $pdo->query($checkSql);
    
    if ($stmt->fetch() === false) {
        // Column doesn't exist, add it
        $sql = "ALTER TABLE assignments ADD COLUMN academic_year VARCHAR(20) DEFAULT NULL AFTER stream_id";
        $pdo->exec($sql);
        echo "SUCCESS: academic_year column added to assignments table\n";
    } else {
        echo "INFO: academic_year column already exists in assignments table\n";
    }
    
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
