-- 123: question papers written in eSpace (page by page, like eNotes), and Item Bank questions
-- linked onto eNote pages so students practise them right where the topic is taught.

ALTER TABLE `item_bank_questions`
  MODIFY `question_type` ENUM('multiple_choice','true_false','short_answer','essay','fill_blank','pdf','paper') NOT NULL;

-- A written paper is an item_bank_questions row with question_type = 'paper' and no file; its
-- questions live here, one per page.
CREATE TABLE IF NOT EXISTS `item_bank_pages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_id` INT UNSIGNED NOT NULL,
  `page_number` INT UNSIGNED NOT NULL,
  `content` LONGTEXT NOT NULL,
  -- none | single | multiple | true_false | short | written
  `answer_type` VARCHAR(16) NOT NULL DEFAULT 'none',
  `options` JSON NULL,
  `correct` JSON NULL,
  `model_answer` TEXT NULL,
  `marks` DECIMAL(5,1) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_item_bank_pages_item` (`item_id`, `page_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Which page of a paper (or of an uploaded PDF) an attempt was on, and where it was made
ALTER TABLE `item_bank_attempts`
  ADD COLUMN IF NOT EXISTS `page_number` INT UNSIGNED NULL AFTER `question_id`,
  ADD COLUMN IF NOT EXISTS `enote_page_id` INT UNSIGNED NULL AFTER `page_number`;

-- Item Bank questions placed on an eNote page: a page of a written paper, or a page of an
-- uploaded PDF paper
CREATE TABLE IF NOT EXISTS `enote_page_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `enote_page_id` INT UNSIGNED NOT NULL,
  `item_id` INT UNSIGNED NOT NULL,
  `item_page` INT UNSIGNED NOT NULL DEFAULT 1,
  `display_order` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_enote_page_item` (`enote_page_id`, `item_id`, `item_page`),
  KEY `idx_enote_page_items_item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

