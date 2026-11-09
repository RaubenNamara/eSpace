-- ICT practicals: a learner may answer one practical in several apps (Word, Excel, PowerPoint,
-- Access), one file each, handed in app by app (backend/app/Utils/Practical.php). Optional: the
-- app creates this table itself the first time it is needed.
CREATE TABLE IF NOT EXISTS assignment_practical_files (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    submission_id INT UNSIGNED NOT NULL,
    question_id INT UNSIGNED NOT NULL,
    app VARCHAR(16) NOT NULL,
    path VARCHAR(255) NOT NULL,
    original_name VARCHAR(200) NULL,
    handed_in_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_practical_file (submission_id, question_id, app),
    KEY idx_practical_question (question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
