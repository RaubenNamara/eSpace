-- The learner's mark sheet look: 'print' (the app's font), 'handwriting', or NULL for answers from
-- before this, which keep the layout a teacher may already have marked on. Teachers, HODs and
-- admins see the mark sheet the same way. The app also adds the column (and does the update below)
-- the first time a learner saves a typed answer.
ALTER TABLE `assignment_answers` ADD COLUMN IF NOT EXISTS `answer_style` VARCHAR(20) NULL DEFAULT NULL;

-- answers no teacher has marked on yet move to the app's font
UPDATE assignment_answers a SET a.answer_style = 'print'
 WHERE a.answer_style IS NULL AND a.answer_text IS NOT NULL AND TRIM(a.answer_text) <> ''
   AND NOT EXISTS (SELECT 1 FROM assignment_annotations aa
                   WHERE aa.submission_id = a.submission_id AND aa.question_id = a.question_id
                     AND aa.page_number = 9999 AND aa.attachment_id IS NULL);
