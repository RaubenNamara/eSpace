-- Migration: Link EOC assignments to an admin-defined Construct
-- Description: Lets a teacher's EOC assessment record which admin-authored Construct (see
-- 087_create_constructs.sql) it was built from, instead of only the raw curriculum topics it
-- resolves to (assignment_curriculum_topics). Additive/nullable - every existing assignment (and
-- every LOA/AOI assignment, which never set this) keeps working unchanged.

ALTER TABLE `assignments`
  ADD COLUMN `construct_id` INT UNSIGNED NULL AFTER `term_id`;

ALTER TABLE `assignments`
  ADD CONSTRAINT `fk_assignments_construct` FOREIGN KEY (`construct_id`) REFERENCES `constructs` (`id`) ON DELETE SET NULL;
