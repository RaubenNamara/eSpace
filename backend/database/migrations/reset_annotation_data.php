<?php

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/Database.php';

use eSpace\Config\Database;

$pdo = Database::getInstance();

try {
    Database::beginTransaction();

    // The annotation engine was migrated from a hand-rolled Canvas2D format to Fabric.js -
    // canvas.toObject()/loadFromJSON() shape instead of a bare AnnotationObject[] array. Existing
    // saved rows (test data from before this migration, per product decision - no live student
    // submissions depend on this yet) are in the old format and would fail to load under the new
    // engine, so they're cleared here rather than attempting a lossy structural conversion.
    $tables = ['question_annotations', 'student_answer_annotations', 'assignment_annotations'];

    foreach ($tables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() === 0) {
            echo "Table $table does not exist, skipping\n";
            continue;
        }

        $countStmt = $pdo->query("SELECT COUNT(*) as c FROM `$table`");
        $count = (int) $countStmt->fetch()['c'];

        $pdo->exec("DELETE FROM `$table`");
        echo "Cleared $count old-format row(s) from $table\n";
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
