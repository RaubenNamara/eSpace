<?php

require_once __DIR__ . '/vendor/autoload.php';

use eSpace\Config\Database;

$db = Database::getInstance();

// Set default password for all students
$defaultPassword = 'student123';
$hashedPassword = password_hash($defaultPassword, PASSWORD_DEFAULT);

try {
    // Update all students with the default password
    $stmt = $db->prepare("UPDATE students SET password = :password WHERE deleted_at IS NULL");
    $stmt->execute(['password' => $hashedPassword]);
    
    $affectedRows = $stmt->rowCount();
    
    echo "Successfully updated password for {$affectedRows} students.\n\n";
    
    // Display student credentials
    $stmt = $db->query("SELECT id, username, email, role, is_active FROM students WHERE deleted_at IS NULL ORDER BY id");
    $students = $stmt->fetchAll();
    
    echo "=== Student Login Credentials ===\n\n";
    echo "Password for all students: student123\n\n";
    
    foreach ($students as $student) {
        echo "ID: " . $student['id'] . "\n";
        echo "Username: " . $student['username'] . "\n";
        echo "Email: " . ($student['email'] ?: 'Not set') . "\n";
        echo "Role: " . $student['role'] . "\n";
        echo "Active: " . ($student['is_active'] ? 'Yes' : 'No') . "\n";
        echo "--------------------------\n\n";
    }
    
    echo "\nYou can now login with any of these usernames using password: student123\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
