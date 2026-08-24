<?php

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/Database.php';

use eSpace\Config\Database;

$pdo = Database::getInstance();

try {
    Database::beginTransaction();

    // Create assignment_questions table
    $sql = "CREATE TABLE IF NOT EXISTS assignment_questions (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        assignment_id INT(10) UNSIGNED NOT NULL,
        parent_question_id INT(10) UNSIGNED NULL,
        question_type ENUM('multiple_choice_single', 'multiple_choice_multiple', 'true_false', 'fill_blank', 'short_answer', 'essay', 'structured', 'scenario') NOT NULL,
        question_text TEXT NOT NULL,
        scenario_text TEXT NULL,
        marks DECIMAL(5,2) NOT NULL DEFAULT 1.00,
        display_order INT(10) UNSIGNED NOT NULL DEFAULT 0,
        allow_drawing TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_question_id) REFERENCES assignment_questions(id) ON DELETE CASCADE,
        INDEX idx_assignment_id (assignment_id),
        INDEX idx_parent_question_id (parent_question_id),
        INDEX idx_question_type (question_type),
        INDEX idx_display_order (display_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $pdo->exec($sql);
    echo "Created assignment_questions table\n";

    // Create assignment_question_options table
    $sql = "CREATE TABLE IF NOT EXISTS assignment_question_options (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        question_id INT(10) UNSIGNED NOT NULL,
        option_text TEXT NOT NULL,
        is_correct TINYINT(1) NOT NULL DEFAULT 0,
        display_order INT(10) UNSIGNED NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (question_id) REFERENCES assignment_questions(id) ON DELETE CASCADE,
        INDEX idx_question_id (question_id),
        INDEX idx_display_order (display_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $pdo->exec($sql);
    echo "Created assignment_question_options table\n";

    // Create assignment_answers table
    $sql = "CREATE TABLE IF NOT EXISTS assignment_answers (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        submission_id INT(10) UNSIGNED NOT NULL,
        question_id INT(10) UNSIGNED NOT NULL,
        answer_text TEXT NULL,
        drawing_path VARCHAR(255) NULL,
        auto_mark DECIMAL(5,2) NULL,
        manual_mark DECIMAL(5,2) NULL,
        teacher_feedback TEXT NULL,
        marked_at TIMESTAMP NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (submission_id) REFERENCES assignment_submissions(id) ON DELETE CASCADE,
        FOREIGN KEY (question_id) REFERENCES assignment_questions(id) ON DELETE CASCADE,
        INDEX idx_submission_id (submission_id),
        INDEX idx_question_id (question_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $pdo->exec($sql);
    echo "Created assignment_answers table\n";

    if (Database::getInstance()->inTransaction()) {
        Database::commit();
    }
    echo "\nMigration completed successfully!\n";

} catch (Exception $e) {
    if (Database::getInstance()->inTransaction()) {
        Database::rollback();
    }
    echo "Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
