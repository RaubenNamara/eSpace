-- 143: The HOD no longer approves teachers' work - undo 142.
--  Teachers publish straight to students again. Anything still waiting for the HOD ('pending')
--  is published now, so nothing a teacher sent stays hidden. Then the 'pending' status and the
--  columns 142 added go.
--  library_books and item_bank_questions keep approved_by / approved_at - they were there before
--  142 (008/010, with foreign keys to hods). enote_topics and videos only got them from 142.
--  Safe to run again, and safe on a database where 142 never ran.

UPDATE `enote_topics`        SET `status` = 'published', `published_at` = COALESCE(`published_at`, NOW()) WHERE `status` = 'pending';
UPDATE `library_books`       SET `status` = 'published', `published_at` = COALESCE(`published_at`, NOW()) WHERE `status` = 'pending';
UPDATE `item_bank_questions` SET `status` = 'published', `published_at` = COALESCE(`published_at`, NOW()) WHERE `status` = 'pending';
UPDATE `videos`              SET `status` = 'published', `published_at` = COALESCE(`published_at`, NOW()) WHERE `status` = 'pending';

ALTER TABLE `enote_topics`
  MODIFY `status` ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  DROP COLUMN IF EXISTS `submitted_at`,
  DROP COLUMN IF EXISTS `approved_at`,
  DROP COLUMN IF EXISTS `approved_by`,
  DROP COLUMN IF EXISTS `review_note`;

ALTER TABLE `videos`
  MODIFY `status` ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  DROP COLUMN IF EXISTS `submitted_at`,
  DROP COLUMN IF EXISTS `approved_at`,
  DROP COLUMN IF EXISTS `approved_by`,
  DROP COLUMN IF EXISTS `review_note`;

ALTER TABLE `library_books`
  MODIFY `status` ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  DROP COLUMN IF EXISTS `submitted_at`,
  DROP COLUMN IF EXISTS `review_note`;

ALTER TABLE `item_bank_questions`
  MODIFY `status` ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  DROP COLUMN IF EXISTS `submitted_at`,
  DROP COLUMN IF EXISTS `review_note`;
