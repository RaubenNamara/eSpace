-- Migration: Add learning outcomes to eNote topics
-- Description: Stores the teacher-authored, ordered list of learning outcomes for a topic
-- as a JSON array of strings (e.g. ["Outcome one", "Outcome two"]).

ALTER TABLE `enote_topics`
    ADD COLUMN `learning_outcomes` TEXT NULL AFTER `description`;
