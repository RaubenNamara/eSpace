-- 165: Case resolutions - how a case ended, kept on the learner's record: the outcome (counselling,
-- warning, parents called, internal punishment, suspension, expulsion, no action, other), the date
-- it was decided, the dates a suspension runs (or an expulsion takes effect), what was decided,
-- and who resolved it. The signed forms and letters (PDFs or photos) are kept with the case as
-- resolution files, apart from the evidence the reporter attached. Safe to run again.
ALTER TABLE `student_cases`
  ADD COLUMN IF NOT EXISTS `outcome` VARCHAR(30) NULL AFTER `admin_note`,
  ADD COLUMN IF NOT EXISTS `outcome_detail` TEXT NULL AFTER `outcome`,
  ADD COLUMN IF NOT EXISTS `decided_on` DATE NULL AFTER `outcome_detail`,
  ADD COLUMN IF NOT EXISTS `outcome_from` DATE NULL AFTER `decided_on`,
  ADD COLUMN IF NOT EXISTS `outcome_to` DATE NULL AFTER `outcome_from`,
  ADD COLUMN IF NOT EXISTS `resolved_by` VARCHAR(150) NULL AFTER `resolved_at`;

ALTER TABLE `student_case_files`
  ADD COLUMN IF NOT EXISTS `kind` ENUM('evidence', 'resolution') NOT NULL DEFAULT 'evidence' AFTER `case_id`;
