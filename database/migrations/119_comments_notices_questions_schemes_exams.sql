-- Five features: the marking comment bank, the school noticeboard, questions and answers on
-- eNote topics, the scheme of work, and exam dates (for the student countdown and revision plan).

-- ---------------------------------------------------------------------------------------------
-- Comment bank: a teacher's own reusable marking comments, most-used first
CREATE TABLE IF NOT EXISTS `teacher_comments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_id` INT UNSIGNED NOT NULL,
  `text` VARCHAR(300) NOT NULL,
  `use_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `last_used_at` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_teacher_comments_teacher` (`teacher_id`, `use_count`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------------------------
-- Noticeboard: school notices with read receipts.
-- audience: everyone | students | staff | class (one stream, class_id) | level (all streams of
-- a class, class_level = classes.name). Admins and HODs post to any audience; teachers to their
-- own classes. A notice disappears from boards after expires_on.
CREATE TABLE IF NOT EXISTS `notices` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `author_role` VARCHAR(20) NOT NULL,
  `author_id` INT UNSIGNED NOT NULL,
  `author_name` VARCHAR(150) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `body` TEXT NOT NULL,
  `audience` ENUM('everyone','students','staff','class','level') NOT NULL DEFAULT 'everyone',
  `class_id` INT UNSIGNED NULL,
  `class_level` VARCHAR(50) NULL,
  `pinned` TINYINT(1) NOT NULL DEFAULT 0,
  `expires_on` DATE NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  KEY `idx_notices_audience` (`audience`, `class_id`, `class_level`),
  KEY `idx_notices_author` (`author_role`, `author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notice_reads` (
  `notice_id` INT UNSIGNED NOT NULL,
  `reader_role` VARCHAR(20) NOT NULL,
  `reader_id` INT UNSIGNED NOT NULL,
  `read_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notice_id`, `reader_role`, `reader_id`),
  CONSTRAINT `fk_notice_reads_notice` FOREIGN KEY (`notice_id`) REFERENCES `notices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------------------------
-- Questions and answers on eNote topics: a student asks under a topic (optionally on a page);
-- classmates and the teacher answer; the teacher can mark the best answer.
CREATE TABLE IF NOT EXISTS `enote_questions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `topic_id` INT UNSIGNED NOT NULL,
  `page_id` INT UNSIGNED NULL,
  `student_id` INT UNSIGNED NOT NULL,
  `body` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  KEY `idx_enote_questions_topic` (`topic_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `enote_answers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_id` INT UNSIGNED NOT NULL,
  `author_role` VARCHAR(20) NOT NULL,
  `author_id` INT UNSIGNED NOT NULL,
  `body` TEXT NOT NULL,
  `endorsed` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  KEY `idx_enote_answers_question` (`question_id`),
  CONSTRAINT `fk_enote_answers_question` FOREIGN KEY (`question_id`) REFERENCES `enote_questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------------------------
-- Scheme of work: the week a teacher plans to teach each curriculum topic, per subject and class
-- level, and when they ticked it off as taught. One row per topic (the class level's copy that
-- Coverage shows).
CREATE TABLE IF NOT EXISTS `scheme_entries` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_id` INT UNSIGNED NOT NULL,
  `subject_id` INT UNSIGNED NOT NULL,
  `class_level` VARCHAR(50) NOT NULL,
  `curriculum_topic_id` INT UNSIGNED NOT NULL,
  `week_start` DATE NULL,
  `taught_at` DATETIME NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_scheme_entry` (`teacher_id`, `subject_id`, `class_level`, `curriculum_topic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------------------------
-- Exam dates (admin): drive the student exam countdown and revision plan. class_level NULL =
-- every class; otherwise a classes.name such as 'S.4'.
CREATE TABLE IF NOT EXISTS `exam_dates` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(120) NOT NULL,
  `class_level` VARCHAR(50) NULL,
  `starts_on` DATE NOT NULL,
  `ends_on` DATE NULL,
  `created_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  KEY `idx_exam_dates_start` (`starts_on`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
