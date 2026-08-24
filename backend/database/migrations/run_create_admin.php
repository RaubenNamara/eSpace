<?php
/**
 * Create Admin User Migration Script
 * Run this script to create the admin user in the database
 */

// Database configuration
$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Generate correct password hash for 'Admin@123'
    $passwordHash = password_hash('Admin@123', PASSWORD_BCRYPT);

    // Check if admin already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = 'admin' OR email = 'admin@espace.com'");
    $stmt->execute();
    $existing = $stmt->fetch();

    if ($existing) {
        echo "Admin user already exists. Updating...\n";
        
        // Update existing admin with correct password
        $stmt = $pdo->prepare("UPDATE users SET 
            username = 'admin',
            email = 'admin@espace.com',
            password = :password,
            role = 'admin',
            is_active = 1,
            email_verified_at = NOW(),
            updated_at = NOW()
            WHERE username = 'admin' OR email = 'admin@espace.com'");
        $stmt->execute(['password' => $passwordHash]);
        echo "Admin user updated successfully.\n";
    } else {
        echo "Creating new admin user...\n";
        
        // Insert new admin user
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role, is_active, email_verified_at, created_at, updated_at) 
            VALUES ('admin', 'admin@espace.com', :password, 'admin', 1, NOW(), NOW(), NOW())");
        $stmt->execute(['password' => $passwordHash]);
        echo "Admin user created successfully.\n";
    }

    echo "\n========================================\n";
    echo "Admin Account Credentials:\n";
    echo "Username: admin\n";
    echo "Password: Admin@123\n";
    echo "========================================\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Make sure the database 'espace' exists and MySQL is running.\n";
    exit(1);
}
