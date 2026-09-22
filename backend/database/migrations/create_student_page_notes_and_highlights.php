<?php

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/Database.php';

use eSpace\Config\Database;

$pdo = Database::getInstance();

try {
    Database::beginTransaction();

    $pdo->exec("CREATE TABLE IF NOT EXISTS enote_page_notes (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        page_id INT(10) UNSIGNED NOT NULL,
        student_id INT(10) UNSIGNED NOT NULL,
        content TEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_page_student (page_id, student_id),
        CONSTRAINT fk_enote_page_notes_page FOREIGN KEY (page_id) REFERENCES enote_pages(id) ON DELETE CASCADE,
        CONSTRAINT fk_enote_page_notes_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "Ensured enote_page_notes table exists\n";

    $pdo->exec("CREATE TABLE IF NOT EXISTS library_page_notes (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        book_id INT(10) UNSIGNED NOT NULL,
        page_number INT(10) UNSIGNED NOT NULL,
        student_id INT(10) UNSIGNED NOT NULL,
        content TEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_book_page_student (book_id, page_number, student_id),
        CONSTRAINT fk_library_page_notes_book FOREIGN KEY (book_id) REFERENCES library_books(id) ON DELETE CASCADE,
        CONSTRAINT fk_library_page_notes_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "Ensured library_page_notes table exists\n";

    // One row per highlighted span (a student can highlight many spans on one page), offsets are
    // plain-text character positions into the page's rendered text content - re-applied on top of
    // whatever the page's current content is, so if a teacher edits the page afterward the
    // highlight can drift, same tradeoff any offset-based annotation system makes.
    $pdo->exec("CREATE TABLE IF NOT EXISTS enote_page_highlights (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        page_id INT(10) UNSIGNED NOT NULL,
        student_id INT(10) UNSIGNED NOT NULL,
        start_offset INT(10) UNSIGNED NOT NULL,
        end_offset INT(10) UNSIGNED NOT NULL,
        color VARCHAR(20) NOT NULL DEFAULT 'yellow',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_enote_page_highlights_page FOREIGN KEY (page_id) REFERENCES enote_pages(id) ON DELETE CASCADE,
        CONSTRAINT fk_enote_page_highlights_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        INDEX idx_page_student (page_id, student_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "Ensured enote_page_highlights table exists\n";

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
