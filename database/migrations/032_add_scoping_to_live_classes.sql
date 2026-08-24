-- Migration: Add subject/class/department scoping to live_classes
-- Description: live_classes.class_subject_id pointed at the legacy (and entirely unused - 0 rows)
-- class_subjects/term model. This mirrors the enote_topics/library_books/videos/item_bank_questions
-- scoping model instead: teachers schedule a live class against a subject + class within their
-- department, and students/HOD/Admin visibility is resolved from that department/class pairing,
-- the same way eLibrary and Item Bank already work. class_subject_id is kept (now nullable) for
-- backward compatibility but is no longer required.

ALTER TABLE `live_classes`
    MODIFY COLUMN `class_subject_id` INT UNSIGNED NULL,
    ADD COLUMN `subject_id` INT UNSIGNED NULL AFTER `class_subject_id`,
    ADD COLUMN `class_id` INT UNSIGNED NULL AFTER `subject_id`,
    ADD COLUMN `department_id` INT UNSIGNED NULL AFTER `class_id`,
    ADD KEY `idx_live_classes_subject_id` (`subject_id`),
    ADD KEY `idx_live_classes_class_id` (`class_id`),
    ADD KEY `idx_live_classes_department_id` (`department_id`),
    ADD CONSTRAINT `fk_live_classes_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL,
    ADD CONSTRAINT `fk_live_classes_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
    ADD CONSTRAINT `fk_live_classes_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;
