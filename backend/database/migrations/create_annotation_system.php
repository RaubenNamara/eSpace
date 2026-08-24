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

    $checkFK = function ($table, $fkName) use ($pdo) {
        $stmt = $pdo->query("SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS
                            WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '$table' AND CONSTRAINT_NAME = '$fkName'");
        return $stmt->rowCount() > 0;
    };

    $columnType = function ($table, $column) use ($pdo) {
        $stmt = $pdo->query("SHOW COLUMNS FROM `$table` LIKE '$column'");
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? $row['Type'] : null;
    };

    // --- assignment_questions: how the student is meant to respond, plus optional source attachment ---
    $questionColumns = [
        'response_type' => "ADD COLUMN response_type ENUM('text','rich_text','multiple_choice','canvas','pdf_annotation','file_upload') NOT NULL DEFAULT 'text' AFTER allow_drawing",
        'attachment_type' => "ADD COLUMN attachment_type ENUM('none','image','pdf') NOT NULL DEFAULT 'none' AFTER response_type",
        'attachment_path' => "ADD COLUMN attachment_path VARCHAR(255) NULL AFTER attachment_type",
    ];

    foreach ($questionColumns as $column => $sql) {
        if (!$checkColumn('assignment_questions', $column)) {
            $pdo->exec("ALTER TABLE assignment_questions $sql");
            echo "Added column $column to assignment_questions\n";
        } else {
            echo "Column $column already exists on assignment_questions\n";
        }
    }

    // --- assignment_submissions.status: add 'marking' as a distinct in-progress-marking state ---
    $statusType = $columnType('assignment_submissions', 'status');
    if ($statusType !== null && strpos($statusType, "'marking'") === false) {
        $pdo->exec("ALTER TABLE assignment_submissions MODIFY COLUMN status ENUM('in_progress','submitted','marking','graded','returned') NOT NULL DEFAULT 'in_progress'");
        echo "Added 'marking' to assignment_submissions.status enum\n";
    } else {
        echo "assignment_submissions.status already includes 'marking' (or column missing)\n";
    }

    // --- assignment_annotations: repurpose as the teacher-marking layer, scoped per question, JSON-based ---
    $annotationColumns = [
        'question_id' => "ADD COLUMN question_id INT(10) UNSIGNED NULL AFTER submission_id",
        'annotation_data' => "ADD COLUMN annotation_data LONGTEXT NULL AFTER points",
    ];

    foreach ($annotationColumns as $column => $sql) {
        if (!$checkColumn('assignment_annotations', $column)) {
            $pdo->exec("ALTER TABLE assignment_annotations $sql");
            echo "Added column $column to assignment_annotations\n";
        } else {
            echo "Column $column already exists on assignment_annotations\n";
        }
    }

    if (!$checkFK('assignment_annotations', 'fk_annotations_question')) {
        $pdo->exec("ALTER TABLE assignment_annotations ADD CONSTRAINT fk_annotations_question
                    FOREIGN KEY (question_id) REFERENCES assignment_questions(id) ON DELETE CASCADE");
        echo "Added foreign key fk_annotations_question\n";
    } else {
        echo "Foreign key fk_annotations_question already exists\n";
    }

    // --- question_annotations: teacher's annotations made while authoring the question ---
    $pdo->exec("CREATE TABLE IF NOT EXISTS question_annotations (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        question_id INT(10) UNSIGNED NOT NULL,
        teacher_id INT(10) UNSIGNED NOT NULL,
        page_number INT(10) UNSIGNED NOT NULL DEFAULT 1,
        annotation_data LONGTEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_question_page (question_id, page_number),
        KEY idx_question_id (question_id),
        KEY idx_teacher_id (teacher_id),
        CONSTRAINT fk_question_annotations_question FOREIGN KEY (question_id) REFERENCES assignment_questions(id) ON DELETE CASCADE,
        CONSTRAINT fk_question_annotations_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "Ensured question_annotations table exists\n";

    // --- student_answer_annotations: the student's own drawing/writing layer while attempting ---
    $pdo->exec("CREATE TABLE IF NOT EXISTS student_answer_annotations (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        submission_id INT(10) UNSIGNED NOT NULL,
        question_id INT(10) UNSIGNED NOT NULL,
        student_id INT(10) UNSIGNED NOT NULL,
        page_number INT(10) UNSIGNED NOT NULL DEFAULT 1,
        annotation_data LONGTEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_submission_question_page (submission_id, question_id, page_number),
        KEY idx_submission_id (submission_id),
        KEY idx_question_id (question_id),
        KEY idx_student_id (student_id),
        CONSTRAINT fk_student_annotations_submission FOREIGN KEY (submission_id) REFERENCES assignment_submissions(id) ON DELETE CASCADE,
        CONSTRAINT fk_student_annotations_question FOREIGN KEY (question_id) REFERENCES assignment_questions(id) ON DELETE CASCADE,
        CONSTRAINT fk_student_annotations_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "Ensured student_answer_annotations table exists\n";

    // --- question_marks: per-question marks + feedback for a submission ---
    $pdo->exec("CREATE TABLE IF NOT EXISTS question_marks (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        submission_id INT(10) UNSIGNED NOT NULL,
        question_id INT(10) UNSIGNED NOT NULL,
        marks_awarded DECIMAL(5,2) NULL,
        feedback TEXT NULL,
        marked_by INT(10) UNSIGNED NULL,
        marked_at TIMESTAMP NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_submission_question (submission_id, question_id),
        KEY idx_submission_id (submission_id),
        KEY idx_question_id (question_id),
        CONSTRAINT fk_question_marks_submission FOREIGN KEY (submission_id) REFERENCES assignment_submissions(id) ON DELETE CASCADE,
        CONSTRAINT fk_question_marks_question FOREIGN KEY (question_id) REFERENCES assignment_questions(id) ON DELETE CASCADE,
        CONSTRAINT fk_question_marks_teacher FOREIGN KEY (marked_by) REFERENCES teachers(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "Ensured question_marks table exists\n";

    if (Database::getInstance()->inTransaction()) {
        Database::commit();
    }

    // --- uploads directory hardening + assignment attachment dir ---
    $publicUploadsDir = __DIR__ . '/../../public/uploads';
    $assignmentsUploadsDir = $publicUploadsDir . '/assignments';
    $htaccessPath = $publicUploadsDir . '/.htaccess';

    if (!is_dir($assignmentsUploadsDir)) {
        mkdir($assignmentsUploadsDir, 0755, true);
        echo "Created uploads/assignments directory\n";
    } else {
        echo "uploads/assignments directory already exists\n";
    }

    if (!file_exists($htaccessPath)) {
        $htaccessContents = <<<HTACCESS
# Prevent execution of any script inside the uploads directory
php_flag engine off

<FilesMatch "\.(php|php\d|phtml|phar|pl|py|cgi|sh)$">
    Require all denied
</FilesMatch>
HTACCESS;
        file_put_contents($htaccessPath, $htaccessContents);
        echo "Created uploads/.htaccess to block script execution\n";
    } else {
        echo "uploads/.htaccess already exists\n";
    }

    echo "\nMigration completed successfully!\n";

} catch (Exception $e) {
    if (Database::getInstance()->inTransaction()) {
        Database::rollback();
    }
    echo "Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
