<?php
// Remove foreign key constraint from teachers table

$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Removing foreign key constraints from role-specific tables...\n\n";

    // Remove foreign key from teachers table
    try {
        $pdo->exec("ALTER TABLE teachers DROP FOREIGN KEY fk_teachers_user");
        echo "Removed fk_teachers_user foreign key from teachers table\n";
    } catch (PDOException $e) {
        echo "Error removing fk_teachers_user: " . $e->getMessage() . "\n";
    }

    // Remove unique constraint on user_id from teachers table
    try {
        $pdo->exec("ALTER TABLE teachers DROP INDEX unique_user_id");
        echo "Removed unique_user_id index from teachers table\n";
    } catch (PDOException $e) {
        echo "Error removing unique_user_id: " . $e->getMessage() . "\n";
    }

    // Make user_id nullable and remove it from teachers table
    try {
        $pdo->exec("ALTER TABLE teachers DROP COLUMN user_id");
        echo "Removed user_id column from teachers table\n";
    } catch (PDOException $e) {
        echo "Error removing user_id column: " . $e->getMessage() . "\n";
    }

    // Do the same for students table
    try {
        $pdo->exec("ALTER TABLE students DROP FOREIGN KEY fk_students_user");
        echo "Removed fk_students_user foreign key from students table\n";
    } catch (PDOException $e) {
        echo "Error removing fk_students_user: " . $e->getMessage() . "\n";
    }

    try {
        $pdo->exec("ALTER TABLE students DROP INDEX unique_user_id");
        echo "Removed unique_user_id index from students table\n";
    } catch (PDOException $e) {
        echo "Error removing unique_user_id from students: " . $e->getMessage() . "\n";
    }

    try {
        $pdo->exec("ALTER TABLE students DROP COLUMN user_id");
        echo "Removed user_id column from students table\n";
    } catch (PDOException $e) {
        echo "Error removing user_id column from students: " . $e->getMessage() . "\n";
    }

    // Do the same for hods table
    try {
        $pdo->exec("ALTER TABLE hods DROP FOREIGN KEY fk_hods_user");
        echo "Removed fk_hods_user foreign key from hods table\n";
    } catch (PDOException $e) {
        echo "Error removing fk_hods_user: " . $e->getMessage() . "\n";
    }

    try {
        $pdo->exec("ALTER TABLE hods DROP INDEX unique_user_id");
        echo "Removed unique_user_id index from hods table\n";
    } catch (PDOException $e) {
        echo "Error removing unique_user_id from hods: " . $e->getMessage() . "\n";
    }

    try {
        $pdo->exec("ALTER TABLE hods DROP COLUMN user_id");
        echo "Removed user_id column from hods table\n";
    } catch (PDOException $e) {
        echo "Error removing user_id column from hods: " . $e->getMessage() . "\n";
    }

    echo "\nForeign key constraints removed successfully!\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
