-- Teacher-to-teacher sharing of eNotes: a teacher shares a topic with their department
-- (shared_at), and colleagues copy it into their own classes to adapt - each copy remembers the
-- topic it came from (shared_from_id), so the original shows how many times it has been copied.

ALTER TABLE `enote_topics`
  ADD COLUMN `shared_at` TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN `shared_from_id` INT UNSIGNED NULL DEFAULT NULL,
  ADD KEY `idx_enote_topics_shared` (`shared_at`),
  ADD KEY `idx_enote_topics_shared_from` (`shared_from_id`);
