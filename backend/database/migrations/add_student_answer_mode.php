<?php

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/Database.php';

use eSpace\Config\Database;

$pdo = Database::getInstance();

try {
    Database::beginTransaction();

    $checkColumn = function ($table, $column) use ($pdo) {
        $stmt = $pdo->query("SHOW COLUMNS FROM `$table` LIKE '$column'");
        return $stmt->rowCount() > 0;
    };

    // --- assignment_answers: which of the three modes (typed / canvas / pdf_upload) the
    // student used, plus the student's own uploaded PDF (distinct from a teacher-set
    // assignment_questions.attachment_path) when the mode is pdf_upload ---
    $answerColumns = [
        'answer_mode' => "ADD COLUMN answer_mode ENUM('typed','canvas','pdf_upload') NOT NULL DEFAULT 'typed' AFTER answer_text",
        'student_attachment_path' => "ADD COLUMN student_attachment_path VARCHAR(255) NULL AFTER answer_mode",
        'student_attachment_original_name' => "ADD COLUMN student_attachment_original_name VARCHAR(255) NULL AFTER student_attachment_path",
    ];

    foreach ($answerColumns as $column => $sql) {
        if (!$checkColumn('assignment_answers', $column)) {
            $pdo->exec("ALTER TABLE assignment_answers $sql");
            echo "Added column $column to assignment_answers\n";
        } else {
            echo "Column $column already exists on assignment_answers\n";
        }
    }

    if (Database::getInstance()->inTransaction()) {
        Database::commit();
    }

    // --- uploads directory for student-submitted answer PDFs (covered by the existing
    // top-level uploads/.htaccess, which already disables script execution) ---
    $submissionsUploadsDir = __DIR__ . '/../../public/uploads/assignment_submissions';
    if (!is_dir($submissionsUploadsDir)) {
        mkdir($submissionsUploadsDir, 0755, true);
        echo "Created uploads/assignment_submissions directory\n";
    } else {
        echo "uploads/assignment_submissions directory already exists\n";
    }

    echo "\nMigration completed successfully!\n";

} catch (Exception $e) {
    if (Database::getInstance()->inTransaction()) {
        Database::rollback();
    }
    echo "Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
