-- Adds a 'procedure' question_type so a teacher can ask a student to describe the procedure they
-- followed, reusing the existing per-experiment questions mechanism (short_answer/calculation/
-- observation already work this way) rather than inventing a parallel field.
ALTER TABLE `virtual_lab_questions`
  MODIFY COLUMN `question_type` ENUM('short_answer', 'calculation', 'observation', 'procedure') NOT NULL DEFAULT 'short_answer';
