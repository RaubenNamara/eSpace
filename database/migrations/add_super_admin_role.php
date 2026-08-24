<?php

/**
 * Migration: Add super_admin role to users table
 * 
 * This migration adds the 'super_admin' role to the users table enum.
 */

// Load environment variables
$envFile = __DIR__ . '/../../backend/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($key, $value) = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
    }
}

// Get database config
$host = $_ENV['DB_HOST'] ?? 'localhost';
$port = $_ENV['DB_PORT'] ?? '3306';
$dbname = $_ENV['DB_NAME'] ?? 'espace';
$username = $_ENV['DB_USER'] ?? 'root';
$password = $_ENV['DB_PASS'] ?? '';

try {
    // Connect to database
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if super_admin already exists in the enum
    $stmt = $pdo->query("SHOW COLUMNS FROM users LIKE 'role'");
    $column = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($column && strpos($column['Type'], 'super_admin') === false) {
        // Modify the enum to include super_admin
        $sql = "ALTER TABLE users MODIFY COLUMN role ENUM('student', 'teacher', 'hod', 'admin', 'super_admin') NOT NULL";
        $pdo->exec($sql);
        echo "Migration completed: Added 'super_admin' role to users table\n";
    } else {
        echo "Migration not needed: 'super_admin' role already exists in users table\n";
    }
    
} catch (Exception $e) {
    echo "Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
