-- Migration: Add allow_download flag to item_bank_questions
-- Description: Same as library_books.allow_download (migration 078) - Item Bank resources are
-- preview-only by default; a teacher can opt a resource into letting students download it and
-- save it for offline reading. Defaults to 0 so every existing resource stays preview-only.

ALTER TABLE `item_bank_questions`
ADD COLUMN `allow_download` TINYINT(1) NOT NULL DEFAULT 0 AFTER `file_size`;
