-- Migration: Add class/department scoping and lifecycle status to item_bank_questions
-- Description: Mirrors the enote_topics/library_books/videos scoping model so teachers can
-- scope item bank questions to a class within their department/subject and control student
-- visibility via a draft/published/archived status, the same way eLibrary works.

ALTER TABLE `item_bank_questions`
    ADD COLUMN `class_id` INT UNSIGNED NULL AFTER `topic_id`,
    ADD COLUMN `department_id` INT UNSIGNED NULL AFTER `class_id`,
    ADD COLUMN `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft' AFTER `is_approved`,
    ADD COLUMN `published_at` TIMESTAMP NULL AFTER `status`,
    ADD KEY `idx_item_bank_class_id` (`class_id`),
    ADD KEY `idx_item_bank_department_id` (`department_id`),
    ADD KEY `idx_item_bank_status` (`status`),
    ADD CONSTRAINT `fk_item_bank_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
    ADD CONSTRAINT `fk_item_bank_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;
