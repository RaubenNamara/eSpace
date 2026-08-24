<?php

/**
 * Migration: Make question_text column nullable in assignment_questions table
 * This allows scenario questions to have NULL question_text
 */

// Direct database connection without framework dependencies
$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check current column definition
    $checkSql = "SHOW COLUMNS FROM assignment_questions LIKE 'question_text'";
    $stmt = $pdo->query($checkSql);
    $columnInfo = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($columnInfo) {
        echo "Current question_text column: " . $columnInfo['Type'] . " Null: " . $columnInfo['Null'] . "\n";
        
        if ($columnInfo['Null'] === 'NO') {
            // Make column nullable
            $sql = "ALTER TABLE assignment_questions MODIFY COLUMN question_text TEXT DEFAULT NULL";
            $pdo->exec($sql);
            echo "SUCCESS: Made question_text column nullable\n";
        } else {
            echo "INFO: question_text column is already nullable\n";
        }
    } else {
        echo "ERROR: question_text column not found\n";
        exit(1);
    }
    
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
