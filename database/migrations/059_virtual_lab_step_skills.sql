-- Additive-only: a new mapping table, no existing table is altered. Maps individual steps to
-- practical-skill tags so scoring can be computed from real step-level attempt history instead of
-- only the coarse experiment-level `practical_skills` tag list. Population happens via
-- PracticalSkillService::syncStepSkills() (PHP, not raw SQL) so the same inference logic that
-- backfills existing templates also applies automatically to any new step going forward.
CREATE TABLE IF NOT EXISTS `virtual_lab_step_skills` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `step_id` INT UNSIGNED NOT NULL,
    `skill_key` VARCHAR(60) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_step_skill` (`step_id`, `skill_key`),
    KEY `idx_step_skills_skill` (`skill_key`),
    CONSTRAINT `fk_step_skills_step` FOREIGN KEY (`step_id`) REFERENCES `virtual_lab_steps` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
