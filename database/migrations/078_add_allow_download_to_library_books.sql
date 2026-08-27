-- Migration: Add allow_download flag to library_books
-- Description: eLibrary resources are preview-only by default (students view PDF/PPT/PPTX
-- in-app, no download link shown) - this lets a teacher opt a specific resource into showing a
-- real download button to students. Defaults to 0 so every existing resource keeps today's
-- preview-only behavior unchanged.

ALTER TABLE `library_books`
ADD COLUMN `allow_download` TINYINT(1) NOT NULL DEFAULT 0 AFTER `file_size`;
