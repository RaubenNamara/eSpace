-- ICT practicals done inside Tusome (Word, Excel, PowerPoint, Access): which app a question is
-- worked in and the teacher's starting file; a learner's work is saved as answer_mode 'practical'.
-- Optional: the app adds these itself the first time (Utils/Practical::ensureSchema).

ALTER TABLE assignment_questions
  ADD COLUMN practical_app VARCHAR(16) NULL DEFAULT NULL AFTER response_type,
  ADD COLUMN practical_starter_path VARCHAR(255) NULL DEFAULT NULL AFTER practical_app;

ALTER TABLE assignment_answers
  MODIFY answer_mode ENUM('typed','canvas','pdf_upload','image_upload','practical') NOT NULL DEFAULT 'typed';
