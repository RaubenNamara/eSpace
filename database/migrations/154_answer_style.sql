-- The learner's mark sheet look: 'print_wide' / 'handwriting_wide' (the wide page every answer
-- now uses), 'print' / 'handwriting' (the first 800px page) or NULL (the original layout). Answers
-- a teacher has marked on keep the layout they were marked on. The app also adds the column, and
-- moves unmarked answers to the wide page, by itself - running this file is optional.
ALTER TABLE `assignment_answers` ADD COLUMN IF NOT EXISTS `answer_style` VARCHAR(20) NULL DEFAULT NULL;

UPDATE assignment_answers a
   SET a.answer_style = CASE WHEN a.answer_style = 'handwriting' THEN 'handwriting_wide' ELSE 'print_wide' END
 WHERE (a.answer_style IS NULL OR a.answer_style IN ('print', 'handwriting'))
   AND a.answer_text IS NOT NULL AND TRIM(a.answer_text) <> ''
   AND NOT EXISTS (SELECT 1 FROM assignment_annotations aa
                   WHERE aa.submission_id = a.submission_id AND aa.question_id = a.question_id
                     AND aa.page_number = 9999 AND aa.attachment_id IS NULL);
