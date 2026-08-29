-- Migration: Add attachment_id to assignment_annotations
-- Description: Lets a teacher's marking annotations target a specific supplementary file from
-- assignment_answer_attachments (migration 084), not just the single primary evidence file.
-- NULL (the existing, unchanged meaning for every row saved before this migration) means "the
-- primary evidence file" - page_number alone is no longer a safe key across multiple files, since
-- page 1 of one additional file would otherwise collide with page 1 of another.

ALTER TABLE `assignment_annotations`
  ADD COLUMN `attachment_id` INT UNSIGNED NULL DEFAULT NULL AFTER `question_id`,
  ADD KEY `idx_annotations_attachment` (`attachment_id`),
  ADD CONSTRAINT `fk_annotations_attachment` FOREIGN KEY (`attachment_id`)
    REFERENCES `assignment_answer_attachments` (`id`) ON DELETE CASCADE;
