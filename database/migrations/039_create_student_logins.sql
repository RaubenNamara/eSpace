-- Tracks every student login so report cards can show an actual "logins this term" count
-- instead of a manually-entered attendance figure. Deliberately its own table rather than the
-- existing audit_logs (whose live schema has only a bare user_id, no role/table column - and ids
-- collide across the students/teachers/hods tables in this app, so that table can't safely
-- disambiguate which role a login belongs to).

CREATE TABLE IF NOT EXISTS `student_logins` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `logged_in_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_student_logins_student_date` (`student_id`, `logged_in_at`),
    CONSTRAINT `fk_student_logins_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
