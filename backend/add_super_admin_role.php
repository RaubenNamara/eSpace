<?php
// Add super_admin role to users table

$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Add super_admin to role ENUM
    $sql = "ALTER TABLE users MODIFY COLUMN role ENUM('student', 'teacher', 'hod', 'admin', 'super_admin') NOT NULL";
    $pdo->exec($sql);

    echo "Successfully added super_admin to role ENUM\n";

    // Update superadmin user
    $stmt = $pdo->prepare("UPDATE users SET role = 'super_admin' WHERE id = 5");
    $stmt->execute();

    echo "Updated " . $stmt->rowCount() . " row(s)\n";

    // Verify
    $stmt = $pdo->prepare("SELECT id, username, email, role, is_active FROM users WHERE id = 5");
    $stmt->execute();
    $superadmin = $stmt->fetch(PDO::FETCH_ASSOC);

    echo "\nSuperadmin after update:\n";
    print_r($superadmin);

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
