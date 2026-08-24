-- Migration: Add PDF resource support to item_bank_questions
-- Description: Lets teachers upload a PDF (e.g. a worksheet or past paper) into the item bank
-- using the same upload architecture as library_books (multipart upload, PDF-only validation,
-- immutable file, in-browser preview only). Adds a 'pdf' question_type and file columns, and
-- relaxes correct_answer to nullable since a PDF resource has no single correct answer.

ALTER TABLE `item_bank_questions`
    MODIFY COLUMN `question_type` ENUM('multiple_choice', 'true_false', 'short_answer', 'essay', 'fill_blank', 'pdf') NOT NULL,
    MODIFY COLUMN `correct_answer` TEXT NULL,
    ADD COLUMN `file_path` VARCHAR(255) NULL AFTER `options`,
    ADD COLUMN `file_type` VARCHAR(20) NULL AFTER `file_path`,
    ADD COLUMN `file_size` INT UNSIGNED NULL AFTER `file_type`;
