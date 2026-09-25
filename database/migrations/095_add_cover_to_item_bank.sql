-- Migration: Add a cover picture and page count to item bank resources
-- Description: Lets Item Bank PDFs stand on the same bookshelves as eLibrary books - the PDF's
-- first page (rendered in the teacher's browser) or a picture the teacher uploads becomes the
-- resource's cover, and the page count gives the book its thickness on the shelf. Same columns
-- as library_books.cover_image / total_pages.

ALTER TABLE `item_bank_questions`
    ADD COLUMN `cover_image` VARCHAR(255) NULL AFTER `file_size`,
    ADD COLUMN `total_pages` INT UNSIGNED NULL AFTER `cover_image`;
