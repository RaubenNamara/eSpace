-- Migration: The order a student arranged a free-response answer in
-- Description: A written answer can combine typed text, a page the student wrote/drew on, and
-- uploaded files. parts_order records the order the student chose to hand them in (a JSON list of
-- part keys: 'typed', 'primary', 'af-<answer attachment id>'), so the teacher marks the answer as
-- one document in that order. NULL = the default order (typed, then the page, then the files).

ALTER TABLE `assignment_answers`
  ADD COLUMN `parts_order` TEXT NULL AFTER `answer_text`;
