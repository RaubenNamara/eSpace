<?php

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/Database.php';

use eSpace\Config\Database;

$pdo = Database::getInstance();

try {
    Database::beginTransaction();

    // Widen answer_mode to also cover a student's own uploaded image (not just PDF), since a
    // free-response question now lets the student attach either. Without this, MySQL silently
    // coerces an unrecognised enum value ('image_upload') to '', instead of raising an error.
    $stmt = $pdo->query("SHOW COLUMNS FROM assignment_answers LIKE 'answer_mode'");
    $column = $stmt->fetch();
    if ($column && strpos($column['Type'], "'image_upload'") === false) {
        $pdo->exec("ALTER TABLE assignment_answers MODIFY COLUMN answer_mode ENUM('typed','canvas','pdf_upload','image_upload') NOT NULL DEFAULT 'typed'");
        echo "Widened assignment_answers.answer_mode to include 'image_upload'\n";
    } else {
        echo "assignment_answers.answer_mode already includes 'image_upload'\n";
    }

    Database::commit();

    echo "\nMigration completed successfully!\n";
} catch (Exception $e) {
    if (Database::getInstance()->inTransaction()) {
        Database::rollback();
    }
    echo "Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
