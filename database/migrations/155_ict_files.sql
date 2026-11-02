-- 155: ICT files - support files for an assessment, and Office files handed in.
--  An ICT teacher attaches support files to an assessment (any document format, zip archives of
--  starter files, ...); students download them from the assessment. Students in ICT hand in
--  Word, PowerPoint, Excel, Publisher and Access files as extra answer files ('document' - no
--  preview; the teacher downloads them to mark). See FileKinds and AssignmentResourceController.
--  Safe to run again.
ALTER TABLE `assignment_answer_attachments`
  MODIFY `file_type` ENUM('pdf','image','document') NOT NULL;

CREATE TABLE IF NOT EXISTS `assignment_resources` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `assignment_id` INT UNSIGNED NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `file_size` INT UNSIGNED DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_assignment_resources_assignment` (`assignment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
