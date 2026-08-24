<?php

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/Database.php';

use eSpace\Config\Database;

$pdo = Database::getInstance();

try {
    Database::beginTransaction();

    // Check if columns exist before adding them
    $checkColumn = function($table, $column) use ($pdo) {
        $stmt = $pdo->query("SHOW COLUMNS FROM `$table` LIKE '$column'");
        return $stmt->rowCount() > 0;
    };

    // Add missing columns to assignments table
    $assignmentsColumns = [
        'teacher_id' => "ADD COLUMN teacher_id INT(10) UNSIGNED NOT NULL AFTER id",
        'subject_id' => "ADD COLUMN subject_id INT(10) UNSIGNED NULL AFTER teacher_id",
        'class_id' => "ADD COLUMN class_id INT(10) UNSIGNED NULL AFTER subject_id",
        'stream_id' => "ADD COLUMN stream_id INT(10) UNSIGNED NULL AFTER class_id",
        'category' => "ADD COLUMN category VARCHAR(100) NULL AFTER instructions",
        'open_at' => "ADD COLUMN open_at DATETIME NULL AFTER category",
        'deadline_at' => "ADD COLUMN deadline_at DATETIME NULL AFTER open_at",
        'duration_minutes' => "ADD COLUMN duration_minutes INT(10) UNSIGNED NULL AFTER deadline_at",
        'pass_mark' => "ADD COLUMN pass_mark DECIMAL(5,2) NULL AFTER total_marks",
        'allow_late_submission' => "ADD COLUMN allow_late_submission TINYINT(1) NOT NULL DEFAULT 1 AFTER pass_mark",
        'attempts_allowed' => "ADD COLUMN attempts_allowed INT(10) UNSIGNED NOT NULL DEFAULT 1 AFTER allow_late_submission",
        'shuffle_questions' => "ADD COLUMN shuffle_questions TINYINT(1) NOT NULL DEFAULT 0 AFTER attempts_allowed",
        'shuffle_options' => "ADD COLUMN shuffle_options TINYINT(1) NOT NULL DEFAULT 0 AFTER shuffle_questions",
        'show_marks_immediately' => "ADD COLUMN show_marks_immediately TINYINT(1) NOT NULL DEFAULT 0 AFTER shuffle_options",
        'show_answers_after_submission' => "ADD COLUMN show_answers_after_submission TINYINT(1) NOT NULL DEFAULT 0 AFTER show_marks_immediately",
        'allow_save_resume' => "ADD COLUMN allow_save_resume TINYINT(1) NOT NULL DEFAULT 1 AFTER show_answers_after_submission",
        'status' => "ADD COLUMN status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft' AFTER allow_save_resume"
    ];

    foreach ($assignmentsColumns as $column => $sql) {
        if (!$checkColumn('assignments', $column)) {
            $pdo->exec("ALTER TABLE assignments $sql");
            echo "Added column $column to assignments table\n";
        } else {
            echo "Column $column already exists in assignments table\n";
        }
    }

    // Add foreign keys for assignments table
    $checkFK = function($table, $fkName) use ($pdo) {
        $stmt = $pdo->query("SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS 
                            WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '$table' AND CONSTRAINT_NAME = '$fkName'");
        return $stmt->rowCount() > 0;
    };

    if (!$checkFK('assignments', 'fk_assignments_teacher_id')) {
        $pdo->exec("ALTER TABLE assignments ADD CONSTRAINT fk_assignments_teacher_id 
                    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE");
        echo "Added foreign key fk_assignments_teacher_id\n";
    }

    if (!$checkFK('assignments', 'fk_assignments_subject_id')) {
        $pdo->exec("ALTER TABLE assignments ADD CONSTRAINT fk_assignments_subject_id 
                    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL");
        echo "Added foreign key fk_assignments_subject_id\n";
    }

    if (!$checkFK('assignments', 'fk_assignments_class_id')) {
        $pdo->exec("ALTER TABLE assignments ADD CONSTRAINT fk_assignments_class_id 
                    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL");
        echo "Added foreign key fk_assignments_class_id\n";
    }

    if (!$checkFK('assignments', 'fk_assignments_stream_id')) {
        $pdo->exec("ALTER TABLE assignments ADD CONSTRAINT fk_assignments_stream_id 
                    FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE SET NULL");
        echo "Added foreign key fk_assignments_stream_id\n";
    }

    // Add missing columns to assignment_submissions table
    $submissionsColumns = [
        'attempt_number' => "ADD COLUMN attempt_number INT(10) UNSIGNED NOT NULL DEFAULT 1 AFTER student_id",
        'started_at' => "ADD COLUMN started_at TIMESTAMP NULL AFTER attempt_number",
        'status' => "ADD COLUMN status ENUM('in_progress', 'submitted', 'graded', 'returned') NOT NULL DEFAULT 'in_progress' AFTER started_at",
        'auto_score' => "ADD COLUMN auto_score DECIMAL(5,2) NULL AFTER status",
        'manual_score' => "ADD COLUMN manual_score DECIMAL(5,2) NULL AFTER auto_score",
        'total_score' => "ADD COLUMN total_score DECIMAL(5,2) NULL AFTER manual_score",
        'percentage' => "ADD COLUMN percentage DECIMAL(5,2) NULL AFTER total_score",
        'marked_by' => "ADD COLUMN marked_by INT(10) UNSIGNED NULL AFTER percentage",
        'marked_at' => "ADD COLUMN marked_at TIMESTAMP NULL AFTER marked_by",
        'released_at' => "ADD COLUMN released_at TIMESTAMP NULL AFTER marked_at"
    ];

    foreach ($submissionsColumns as $column => $sql) {
        if (!$checkColumn('assignment_submissions', $column)) {
            $pdo->exec("ALTER TABLE assignment_submissions $sql");
            echo "Added column $column to assignment_submissions table\n";
        } else {
            echo "Column $column already exists in assignment_submissions table\n";
        }
    }

    // Add index for assignment_submissions
    try {
        $pdo->exec("CREATE INDEX idx_assignment_submissions_status ON assignment_submissions(status)");
        echo "Added index idx_assignment_submissions_status\n";
    } catch (Exception $e) {
        echo "Index idx_assignment_submissions_status may already exist\n";
    }

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
