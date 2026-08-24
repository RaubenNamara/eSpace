<?php
// Migrate existing teacher auth data from users table to teachers table

$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Migrating teacher auth data...\n\n";

    // Get teachers with user_id
    $stmt = $pdo->prepare("SELECT t.id as teacher_id, t.user_id, u.username, u.email, u.password, u.profile_photo, u.phone, u.is_active, u.email_verified_at, u.last_login_at, u.last_login_ip 
                           FROM teachers t 
                           INNER JOIN users u ON t.user_id = u.id 
                           WHERE t.deleted_at IS NULL");
    $stmt->execute();
    $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "Found " . count($teachers) . " teachers with user accounts\n\n";

    foreach ($teachers as $teacher) {
        echo "Migrating teacher ID {$teacher['teacher_id']} (username: {$teacher['username']})...\n";
        
        // Update teachers table with auth data
        $updateStmt = $pdo->prepare("UPDATE teachers SET 
            username = :username,
            email = :email,
            password = :password,
            role = 'teacher',
            profile_photo = :profile_photo,
            phone = :phone,
            is_active = :is_active,
            email_verified_at = :email_verified_at,
            last_login_at = :last_login_at,
            last_login_ip = :last_login_ip
            WHERE id = :teacher_id");
        
        $updateStmt->execute([
            'username' => $teacher['username'],
            'email' => $teacher['email'],
            'password' => $teacher['password'],
            'profile_photo' => $teacher['profile_photo'],
            'phone' => $teacher['phone'],
            'is_active' => $teacher['is_active'],
            'email_verified_at' => $teacher['email_verified_at'],
            'last_login_at' => $teacher['last_login_at'],
            'last_login_ip' => $teacher['last_login_ip'],
            'teacher_id' => $teacher['teacher_id']
        ]);

        echo "  Updated teachers table\n";
    }

    echo "\nMigration completed!\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
