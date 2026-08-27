-- Migration: Add LOA/AOI/EOC curriculum linkage to Assignments
-- Description: Extends the Assignment module to optionally align an assessment with the same
-- admin-authored curriculum data eNotes already uses (enote_curriculum_topics /
-- enote_learning_outcomes). Deliberately additive/nullable throughout so every existing
-- assignment, question, submission, and the marking workflow keep working unchanged -
-- `assessment_category` is NULL for every assignment created before this feature, and the
-- existing flat `assignment_questions` array shape is untouched (curriculum_topic_id /
-- learning_outcome_id are just two more nullable columns on each question row, not a new nested
-- structure) so MarkingPanel.vue / AssignmentAnswer.vue / MarkingController / AssignmentPreview
-- Service - none of which know about these columns - keep working exactly as before.

ALTER TABLE `assignments`
  ADD COLUMN `assessment_category` ENUM('LOA','AOI','EOC') NULL AFTER `category`,
  ADD COLUMN `academic_year_id` INT UNSIGNED NULL AFTER `assessment_category`,
  ADD COLUMN `term_id` INT UNSIGNED NULL AFTER `academic_year_id`;

ALTER TABLE `assignments`
  ADD CONSTRAINT `fk_assignments_academic_year` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_assignments_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE SET NULL;

-- Per-question curriculum link: which curriculum topic (and, for LOA, which specific learning
-- outcome) a question is assessing. Nullable so legacy questions and non-curriculum-aligned
-- assignments are entirely unaffected.
ALTER TABLE `assignment_questions`
  ADD COLUMN `curriculum_topic_id` INT UNSIGNED NULL AFTER `parent_question_id`,
  ADD COLUMN `learning_outcome_id` INT UNSIGNED NULL AFTER `curriculum_topic_id`;

ALTER TABLE `assignment_questions`
  ADD CONSTRAINT `fk_assignment_questions_curriculum_topic` FOREIGN KEY (`curriculum_topic_id`) REFERENCES `enote_curriculum_topics` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_assignment_questions_learning_outcome` FOREIGN KEY (`learning_outcome_id`) REFERENCES `enote_learning_outcomes` (`id`) ON DELETE SET NULL;

-- Which curriculum topic(s) are in scope for an assignment - one row for LOA, one per selected
-- Topic for AOI/EOC. Drives "every selected Topic needs >=1 question" publish validation.
CREATE TABLE `assignment_curriculum_topics` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `assignment_id` INT UNSIGNED NOT NULL,
  `curriculum_topic_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_assignment_topic` (`assignment_id`, `curriculum_topic_id`),
  CONSTRAINT `fk_act_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_act_topic` FOREIGN KEY (`curriculum_topic_id`) REFERENCES `enote_curriculum_topics` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Which specific Learning Outcome(s) an LOA assignment is assessing (a subset of its single
-- curriculum topic's outcomes).
CREATE TABLE `assignment_learning_outcomes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `assignment_id` INT UNSIGNED NOT NULL,
  `curriculum_topic_id` INT UNSIGNED NOT NULL,
  `learning_outcome_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_assignment_lo` (`assignment_id`, `learning_outcome_id`),
  CONSTRAINT `fk_alo_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_alo_topic` FOREIGN KEY (`curriculum_topic_id`) REFERENCES `enote_curriculum_topics` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_alo_outcome` FOREIGN KEY (`learning_outcome_id`) REFERENCES `enote_learning_outcomes` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
