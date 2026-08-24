<?php
// Simple script to create superadmin user
// Run this from the backend directory: php create_superadmin.php

require_once __DIR__ . '/vendor/autoload.php';

// Database configuration
$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if superadmin exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = 'superadmin'");
    $stmt->execute();
    $existing = $stmt->fetch();

    if ($existing) {
        echo "Superadmin user already exists.\n";
        echo "Username: " . $existing['username'] . "\n";
        echo "Email: " . $existing['email'] . "\n";
        echo "Role: " . $existing['role'] . "\n";
        echo "Active: " . ($existing['is_active'] ? 'Yes' : 'No') . "\n";
    } else {
        // Generate password hash
        $plainPassword = 'SuperAdmin123!';
        $hashedPassword = password_hash($plainPassword, PASSWORD_BCRYPT);
        
        echo "Generated hash for '$plainPassword': $hashedPassword\n\n";

        // Insert superadmin user
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role, is_active, email_verified_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW())");
        $stmt->execute([
            'superadmin',
            'superadmin@espace.com',
            $hashedPassword,
            'super_admin',
            1
        ]);

        echo "Superadmin user created successfully!\n";
        echo "Username: superadmin\n";
        echo "Password: $plainPassword\n";
        echo "Email: superadmin@espace.com\n";
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
