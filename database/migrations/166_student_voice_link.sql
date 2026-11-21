-- 166: Student Voice from the student dashboard. When switched on (Admin > Settings), learners see
-- a Student Voice button that opens the school's Student Voice already signed in with their Tusome
-- account (a signed one-use link, see Student\StudentVoiceController) - no voting numbers.
-- student_voice_url is Student Voice's address, e.g. https://studentvoice.stmark.sc.ug.
-- Safe to run again.
ALTER TABLE `school_settings`
  ADD COLUMN IF NOT EXISTS `student_voice_enabled` TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `student_voice_url` VARCHAR(255) NULL;
