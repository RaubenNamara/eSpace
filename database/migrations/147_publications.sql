-- 147: Publications - GP teachers publish A level learners' work.
--  A teacher in the GP department uploads a PDF, names the A level student who wrote it (the
--  author), and publishes it. Every A level student (all of them do GP) then sees it in
--  Publications and on their dashboard, and opens it in the page-turning reader. A draft is seen
--  only by GP teachers. Removing one sets deleted_at. See PublicationController.
--  Safe to run again.
CREATE TABLE IF NOT EXISTS `publications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `description` VARCHAR(1000) DEFAULT NULL,
  `author_student_id` INT UNSIGNED NOT NULL,
  `teacher_id` INT UNSIGNED NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `file_size` INT UNSIGNED DEFAULT NULL,
  `status` ENUM('draft','published') NOT NULL DEFAULT 'draft',
  `published_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_pub_status` (`status`, `deleted_at`, `published_at`),
  KEY `idx_pub_author` (`author_student_id`),
  KEY `idx_pub_teacher` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
