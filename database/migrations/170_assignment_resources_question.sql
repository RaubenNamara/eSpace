-- A support file can belong to one question of the assessment (e.g. the zip of files for an ICT
-- practical), shown with that question; NULL = for the whole assessment, as before.
-- Teacher\AssignmentResourceController::ensureQuestionColumn() adds it if this hasn't run.
ALTER TABLE assignment_resources
    ADD COLUMN question_id INT UNSIGNED NULL DEFAULT NULL AFTER assignment_id,
    ADD KEY idx_assignment_resources_question (question_id);
