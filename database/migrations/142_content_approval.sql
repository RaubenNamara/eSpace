-- 142: The HOD approves teachers' work before students see it.
--  When a teacher publishes an eNote topic, a library book, an Item Bank paper or a video in a
--  department that has an HOD, it becomes 'pending' instead of 'published'. Students only ever
--  see 'published' work, so pending work stays hidden until the HOD approves it (it then becomes
--  'published') or returns it to the teacher with a note (it goes back to 'draft').
--  submitted_at - when it was sent for approval
--  approved_at / approved_by - when and by which HOD it was approved; once approved, the teacher
--                              can unpublish and publish it again without asking a second time
--  review_note - the HOD's note when work is returned
--  Everything already published counts as approved, so nothing disappears from students.

ALTER TABLE `enote_topics`
  MODIFY `status` ENUM('draft','pending','published','archived') NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS `submitted_at` TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `approved_at` TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `approved_by` INT UNSIGNED NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `review_note` VARCHAR(500) NULL DEFAULT NULL;

ALTER TABLE `library_books`
  MODIFY `status` ENUM('draft','pending','published','archived') NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS `submitted_at` TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `approved_at` TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `approved_by` INT UNSIGNED NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `review_note` VARCHAR(500) NULL DEFAULT NULL;

ALTER TABLE `item_bank_questions`
  MODIFY `status` ENUM('draft','pending','published','archived') NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS `submitted_at` TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `approved_at` TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `approved_by` INT UNSIGNED NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `review_note` VARCHAR(500) NULL DEFAULT NULL;

ALTER TABLE `videos`
  MODIFY `status` ENUM('draft','pending','published','archived') NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS `submitted_at` TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `approved_at` TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `approved_by` INT UNSIGNED NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `review_note` VARCHAR(500) NULL DEFAULT NULL;

-- work that was ever published counts as approved
UPDATE `enote_topics` SET `approved_at` = COALESCE(`published_at`, `updated_at`, NOW()) WHERE `approved_at` IS NULL AND (`status` IN ('published','archived') OR `published_at` IS NOT NULL);
UPDATE `library_books` SET `approved_at` = COALESCE(`published_at`, `updated_at`, NOW()) WHERE `approved_at` IS NULL AND (`status` IN ('published','archived') OR `published_at` IS NOT NULL);
UPDATE `item_bank_questions` SET `approved_at` = COALESCE(`published_at`, `updated_at`, NOW()) WHERE `approved_at` IS NULL AND (`status` IN ('published','archived') OR `published_at` IS NOT NULL);
UPDATE `videos` SET `approved_at` = COALESCE(`published_at`, `updated_at`, NOW()) WHERE `approved_at` IS NULL AND (`status` IN ('published','archived') OR `published_at` IS NOT NULL);
