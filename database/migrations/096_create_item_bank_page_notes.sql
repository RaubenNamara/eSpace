-- Migration: Student page notes for Item Bank resources
-- Description: A student's own private note on a page of an Item Bank PDF - same as
-- library_page_notes for eLibrary books. Pages with a note show a "My note" marker in the reader
-- that unfolds the note.

CREATE TABLE IF NOT EXISTS `item_bank_page_notes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `question_id` INT UNSIGNED NOT NULL,
    `page_number` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `content` TEXT NOT NULL,
    `color` VARCHAR(20) NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_item_page_student` (`question_id`, `page_number`, `student_id`),
    KEY `idx_item_bank_page_notes_student` (`student_id`),
    CONSTRAINT `fk_item_bank_page_notes_question` FOREIGN KEY (`question_id`) REFERENCES `item_bank_questions` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_item_bank_page_notes_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
