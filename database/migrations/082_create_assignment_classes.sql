-- Migration: Create assignment_classes
-- Description: Lets one assignment be visible to more than one specific class-stream at once
-- (checked via checkboxes in the builder), in addition to the existing single class_id /
-- class_group_name ("All Streams") targeting on `assignments`. Purely additive - an assignment
-- with no assignment_classes rows behaves exactly as before (single-class or all-streams via the
-- existing columns); Student\AssignmentController's visibility check gets one more OR'd EXISTS
-- branch against this table, nothing existing is removed or changed.

CREATE TABLE `assignment_classes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `assignment_id` INT UNSIGNED NOT NULL,
  `class_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_assignment_class` (`assignment_id`, `class_id`),
  CONSTRAINT `fk_assignment_classes_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_assignment_classes_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
