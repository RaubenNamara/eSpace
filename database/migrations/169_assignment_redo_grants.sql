-- A teacher deleted a learner's handed-in work so they can do the assessment again
-- (Teacher\MarkingController::clearForRedo). When the deadline had already passed, the learner gets
-- until redo_until to do it again; until then the deadline doesn't stop them (Utils\AssignmentRedo).
CREATE TABLE IF NOT EXISTS assignment_redo_grants (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT UNSIGNED NOT NULL,
    student_id INT UNSIGNED NOT NULL,
    redo_until DATETIME NULL,
    granted_by INT UNSIGNED NOT NULL,
    reason VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_redo_grant (assignment_id, student_id),
    KEY idx_redo_student (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
