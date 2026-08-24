<?php

/**
 * Migration: Add stream_name column to classes table
 * 
 * This migration adds the stream_name column to the classes table
 * and removes the class_teacher_id and capacity columns.
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
    
    // Check if stream_name column already exists
    $stmt = $pdo->query("SHOW COLUMNS FROM classes LIKE 'stream_name'");
    $column = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$column) {
        // Add stream_name column
        $sql = "ALTER TABLE classes ADD COLUMN stream_name VARCHAR(50) NOT NULL AFTER academic_year_id";
        $pdo->exec($sql);
        echo "Migration completed: Added stream_name column to classes table\n";
    } else {
        echo "Migration not needed: stream_name column already exists in classes table\n";
    }
    
    // Remove class_teacher_id column if it exists
    $stmt = $pdo->query("SHOW COLUMNS FROM classes LIKE 'class_teacher_id'");
    $column = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($column) {
        // Drop foreign key constraint first
        $sql = "ALTER TABLE classes DROP FOREIGN KEY fk_classes_class_teacher";
        $pdo->exec($sql);
        echo "Migration completed: Dropped foreign key constraint fk_classes_class_teacher\n";
        
        // Then drop the column
        $sql = "ALTER TABLE classes DROP COLUMN class_teacher_id";
        $pdo->exec($sql);
        echo "Migration completed: Removed class_teacher_id column from classes table\n";
    }
    
    // Remove capacity column if it exists
    $stmt = $pdo->query("SHOW COLUMNS FROM classes LIKE 'capacity'");
    $column = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($column) {
        $sql = "ALTER TABLE classes DROP COLUMN capacity";
        $pdo->exec($sql);
        echo "Migration completed: Removed capacity column from classes table\n";
    }
    
} catch (Exception $e) {
    echo "Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
