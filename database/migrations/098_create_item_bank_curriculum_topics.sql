-- Migration: Link Item Bank resources to the curriculum topics they cover
-- Description: Lets a teacher tag an Item Bank resource (past paper, practice set) with the
-- curriculum topics it practises, so a student's Learning Map can offer it as practice on those
-- topics. One row per underlying curriculum topic row (a resource for "All Streams" links every
-- stream's copy of the topic, the same way constructs do - see construct_topics).

CREATE TABLE IF NOT EXISTS `item_bank_curriculum_topics` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_id` INT UNSIGNED NOT NULL,
  `curriculum_topic_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_item_bank_topic` (`question_id`, `curriculum_topic_id`),
  KEY `idx_item_bank_topics_topic` (`curriculum_topic_id`),
  CONSTRAINT `fk_item_bank_topics_question` FOREIGN KEY (`question_id`) REFERENCES `item_bank_questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_item_bank_topics_topic` FOREIGN KEY (`curriculum_topic_id`) REFERENCES `enote_curriculum_topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
