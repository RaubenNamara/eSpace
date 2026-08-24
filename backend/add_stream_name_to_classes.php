<?php
// Add stream_name column to classes table

$host = 'localhost';
$dbname = 'espace';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Adding stream_name column to classes table...\n";

    // Check if column already exists
    $stmt = $pdo->prepare("SHOW COLUMNS FROM classes LIKE 'stream_name'");
    $stmt->execute();
    if ($stmt->fetch()) {
        echo "Column stream_name already exists.\n";
    } else {
        // Add the column
        $pdo->exec("ALTER TABLE classes ADD COLUMN stream_name VARCHAR(20) AFTER level");
        echo "Added stream_name column successfully.\n";
    }

    echo "\nUpdated classes table structure:\n";
    $stmt = $pdo->prepare("DESCRIBE classes");
    $stmt->execute();
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($columns as $col) {
        echo "  {$col['Field']}: {$col['Type']}\n";
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
