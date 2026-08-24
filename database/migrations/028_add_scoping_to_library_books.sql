-- Migration: Add class/department scoping and lifecycle status to library_books
-- Description: Mirrors the enote_topics scoping model (explicit class_id/department_id FKs
-- plus a draft/published/archived status) so teachers can scope PDF uploads to a class within
-- their department/subject and control visibility, the same way eNotes topics work.

ALTER TABLE `library_books`
    ADD COLUMN `class_id` INT UNSIGNED NULL AFTER `subject_id`,
    ADD COLUMN `department_id` INT UNSIGNED NULL AFTER `class_id`,
    ADD COLUMN `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft' AFTER `is_approved`,
    ADD COLUMN `published_at` TIMESTAMP NULL AFTER `status`,
    ADD KEY `idx_library_books_class_id` (`class_id`),
    ADD KEY `idx_library_books_department_id` (`department_id`),
    ADD KEY `idx_library_books_status` (`status`),
    ADD CONSTRAINT `fk_library_books_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
    ADD CONSTRAINT `fk_library_books_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;
