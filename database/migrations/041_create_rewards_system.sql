-- Automatic Student Rewards & Badges system. Reuses existing data rather than duplicating marks:
-- performance is always recomputed on demand from assignment_submissions (the same source
-- ReportCardService/PerformanceReportService already use), never stored redundantly here except
-- as a snapshot of the score/average that triggered a given award (needed so an admin reviewing
-- an old award can see why it was given even after marks later change).

-- Configurable badge thresholds/conditions - what the Admin settings area edits. One row per
-- badge/special-award type; evaluated for every student on every mark change.
CREATE TABLE IF NOT EXISTS `reward_rules` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `badge_type` ENUM('platinum','gold','silver','bronze','special') NOT NULL,
    `award_title` VARCHAR(150) NOT NULL,
    `category` ENUM('academic','subject','improvement','attendance','engagement') NOT NULL DEFAULT 'academic',
    -- What figure this rule looks at.
    `metric` ENUM('overall_average','subject_average','login_count','assignments_completed','improvement_delta') NOT NULL,
    -- individual: every student who clears the threshold qualifies.
    -- class_top / subject_top: only the single highest-scoring student in that class (optionally
    -- per subject) qualifies - a ranking rule rather than a flat threshold.
    `scope` ENUM('individual','class_top','subject_top') NOT NULL DEFAULT 'individual',
    `min_value` DECIMAL(6,2) NULL,
    `max_value` DECIMAL(6,2) NULL,
    `icon` VARCHAR(10) NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `description` VARCHAR(255) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_reward_rules_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `student_awards` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `rule_id` INT UNSIGNED NULL,
    `badge_type` ENUM('platinum','gold','silver','bronze','special') NOT NULL,
    `award_title` VARCHAR(150) NOT NULL,
    `category` VARCHAR(50) NULL,
    -- 0 = not subject-specific (kept NOT NULL with a 0 sentinel, not NULL, so the uniqueness
    -- check below actually works - MySQL unique indexes never treat two NULLs as duplicates).
    `subject_id` INT UNSIGNED NOT NULL DEFAULT 0,
    `class_id` INT UNSIGNED NULL,
    `score` DECIMAL(6,2) NULL,
    `average` DECIMAL(6,2) NULL,
    `term_id` INT UNSIGNED NOT NULL,
    `academic_year` VARCHAR(20) NULL,
    `award_source` ENUM('automatic','manual','override') NOT NULL DEFAULT 'automatic',
    `status` ENUM('active','revoked') NOT NULL DEFAULT 'active',
    `admin_override` TINYINT(1) NOT NULL DEFAULT 0,
    `admin_note` TEXT NULL,
    `awarded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_auto_award` (`student_id`, `rule_id`, `term_id`, `subject_id`),
    KEY `idx_student_awards_student` (`student_id`),
    KEY `idx_student_awards_term` (`term_id`),
    KEY `idx_student_awards_status` (`status`),
    KEY `idx_student_awards_class` (`class_id`),
    CONSTRAINT `fk_student_awards_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_student_awards_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_student_awards_rule` FOREIGN KEY (`rule_id`) REFERENCES `reward_rules` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `student_award_audit` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_award_id` INT UNSIGNED NOT NULL,
    `action` VARCHAR(50) NOT NULL,
    `actor_id` INT UNSIGNED NULL,
    `actor_role` VARCHAR(20) NULL,
    `before_values` TEXT NULL,
    `after_values` TEXT NULL,
    `note` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_award_audit_award` (`student_award_id`),
    CONSTRAINT `fk_award_audit_award` FOREIGN KEY (`student_award_id`) REFERENCES `student_awards` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default rules matching the brief's own examples - Admin can edit/disable any of these
-- afterward, nothing here is hard-coded into the evaluation logic itself.
INSERT INTO `reward_rules` (`badge_type`, `award_title`, `category`, `metric`, `scope`, `min_value`, `max_value`, `icon`, `description`) VALUES
('platinum', 'Outstanding Academic Performance', 'academic', 'overall_average', 'individual', 95.00, NULL, '💎', 'Overall average 95% and above'),
('gold', 'Outstanding Academic Performance', 'academic', 'overall_average', 'individual', 85.00, 94.99, '🥇', 'Overall average 85% to 94%'),
('silver', 'Excellent Academic Performance', 'academic', 'overall_average', 'individual', 75.00, 84.99, '🥈', 'Overall average 75% to 84%'),
('bronze', 'Good Academic Performance', 'academic', 'overall_average', 'individual', 65.00, 74.99, '🥉', 'Overall average 65% to 74%'),
('special', 'Best Performer in Subject', 'subject', 'subject_average', 'subject_top', NULL, NULL, '⭐', 'Highest average in a subject, within a class'),
('special', 'Best Performer in Class', 'academic', 'overall_average', 'class_top', NULL, NULL, '⭐', 'Highest overall average in a class'),
('special', 'Most Improved Student', 'improvement', 'improvement_delta', 'class_top', 5.00, NULL, '⭐', 'Largest improvement in overall average vs. the previous term (min. +5 points), highest in class'),
('special', 'Excellent Attendance', 'attendance', 'login_count', 'individual', 15.00, NULL, '⭐', 'Logged in at least this many times during the term'),
('special', 'Assignment Champion', 'engagement', 'assignments_completed', 'class_top', NULL, NULL, '⭐', 'Most assignments completed in a class'),
('special', 'Active Learner', 'engagement', 'assignments_completed', 'individual', 5.00, NULL, '⭐', 'Completed at least this many assignments during the term');
