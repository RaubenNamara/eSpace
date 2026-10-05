-- Four features: Live Quiz, Daily Revision, parent links (with the weekly digest), and the
-- early-warning list (which needs no table - it is worked out from existing results and activity).

-- ---------------------------------------------------------------------------------------------
-- Live Quiz: a teacher runs an assessment's choice questions live; students join with a code.
-- `question_ids` is the order the questions are asked in (JSON array of assignment_questions.id).
-- `phase`: lobby (waiting for players) -> question (answering) -> reveal (showing the answer)
-- -> ... next question ... -> ended. `saved_at` is set once the scores go to the Learning Map.
CREATE TABLE IF NOT EXISTS `live_quizzes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_id` INT UNSIGNED NOT NULL,
  `assignment_id` INT UNSIGNED NOT NULL,
  `join_code` CHAR(6) NOT NULL,
  `question_ids` TEXT NOT NULL,
  `seconds_per_question` SMALLINT UNSIGNED NOT NULL DEFAULT 20,
  `phase` ENUM('lobby','question','reveal','ended') NOT NULL DEFAULT 'lobby',
  `current_index` SMALLINT NOT NULL DEFAULT -1,
  `question_started_at` DATETIME(3) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ended_at` DATETIME NULL,
  `saved_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  KEY `idx_live_quizzes_code` (`join_code`, `phase`),
  KEY `idx_live_quizzes_teacher` (`teacher_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `live_quiz_players` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `quiz_id` INT UNSIGNED NOT NULL,
  `student_id` INT UNSIGNED NOT NULL,
  `score` INT UNSIGNED NOT NULL DEFAULT 0,
  `correct` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `joined_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_live_quiz_player` (`quiz_id`, `student_id`),
  CONSTRAINT `fk_live_quiz_players_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `live_quizzes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `live_quiz_answers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `quiz_id` INT UNSIGNED NOT NULL,
  `student_id` INT UNSIGNED NOT NULL,
  `question_id` INT UNSIGNED NOT NULL,
  `option_ids` VARCHAR(255) NOT NULL,
  `is_correct` TINYINT(1) NOT NULL DEFAULT 0,
  `points` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `answered_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_live_quiz_answer` (`quiz_id`, `student_id`, `question_id`),
  KEY `idx_live_quiz_answers_question` (`quiz_id`, `question_id`),
  CONSTRAINT `fk_live_quiz_answers_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `live_quizzes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------------------------
-- Daily Revision: one row per student per question they have met. Leitner boxes 1-5; a card is
-- due again on `due_on` (box 1 = tomorrow ... box 5 = in two weeks).
CREATE TABLE IF NOT EXISTS `revision_cards` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` INT UNSIGNED NOT NULL,
  `question_id` INT UNSIGNED NOT NULL,
  `box` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `due_on` DATE NOT NULL,
  `times_right` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `times_wrong` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `last_seen_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_revision_card` (`student_id`, `question_id`),
  KEY `idx_revision_cards_due` (`student_id`, `due_on`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- A day on which the student finished their Daily 5 (for the streak)
CREATE TABLE IF NOT EXISTS `revision_days` (
  `student_id` INT UNSIGNED NOT NULL,
  `day` DATE NOT NULL,
  `right_count` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `card_count` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`student_id`, `day`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------------------------
-- Parent links: a private, read-only weekly view of one student for their parent or guardian,
-- opened with `token` (no login). Admins create and revoke them; `send_digest` also emails the
-- same summary to `guardian_email` once a week.
CREATE TABLE IF NOT EXISTS `parent_links` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` INT UNSIGNED NOT NULL,
  `token` CHAR(48) NOT NULL,
  `guardian_name` VARCHAR(120) NOT NULL,
  `relationship` VARCHAR(40) NULL,
  `guardian_email` VARCHAR(150) NULL,
  `guardian_phone` VARCHAR(40) NULL,
  `send_digest` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `revoked_at` DATETIME NULL,
  `last_viewed_at` DATETIME NULL,
  `last_digest_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_parent_links_token` (`token`),
  KEY `idx_parent_links_student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
