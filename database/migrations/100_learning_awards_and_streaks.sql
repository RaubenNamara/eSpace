-- Migration: Awards for real learning, and learning streaks
-- Description: Adds learning-based metrics to the rewards engine (reward_rules, Admin-editable):
--   outcomes_achieved      - learning outcomes at Satisfactory or above this year (Learning Map)
--   competencies_achieved  - topic competencies (Activities of Integration) at Satisfactory or above
--   evidence_confirmed     - pieces of competency evidence a teacher confirmed this term
--   learning_streak        - the longest run of consecutive days with real learning this term
-- and learning_activity_days, one row per student per day they read notes, answered an
-- assessment or added evidence (the streak is counted from it). Seeds four rules; admins can
-- change their thresholds or switch them off in Rewards.

CREATE TABLE IF NOT EXISTS `learning_activity_days` (
  `student_id` INT UNSIGNED NOT NULL,
  `day` DATE NOT NULL,
  PRIMARY KEY (`student_id`, `day`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `reward_rules`
  MODIFY `metric` ENUM('overall_average','subject_average','login_count','assignments_completed','improvement_delta',
                       'lab_average','lab_subject_average','lab_experiments_completed',
                       'outcomes_achieved','competencies_achieved','evidence_confirmed','learning_streak') NOT NULL;

INSERT INTO `reward_rules` (`badge_type`, `award_title`, `category`, `metric`, `scope`, `min_value`, `icon`, `is_active`, `description`) VALUES
  ('special', 'Outcome Achiever', 'academic', 'outcomes_achieved', 'individual', 10, NULL, 1, 'Achieved 10 or more learning outcomes this year'),
  ('special', 'Competent Learner', 'academic', 'competencies_achieved', 'individual', 3, NULL, 1, 'Reached Satisfactory or above on 3 topic competencies'),
  ('special', 'Evidence Builder', 'engagement', 'evidence_confirmed', 'individual', 3, NULL, 1, 'Had 3 pieces of competency evidence confirmed by teachers this term'),
  ('special', '7-Day Learning Streak', 'engagement', 'learning_streak', 'individual', 7, NULL, 1, 'Learned something 7 days in a row this term');
