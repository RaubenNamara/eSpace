-- AI Tutor moves from "one explanation per page" to "one short explanation per paragraph", read
-- and highlighted in sequence as the student follows along. Repurposes the existing
-- enote_page_tutor_explanations table (added a paragraph_index) rather than creating a parallel
-- table - old whole-page-grain rows are incompatible with the new grain, so the table is cleared;
-- content regenerates on next use exactly like any other cache invalidation in this app.
DELETE FROM `enote_page_tutor_explanations`;

ALTER TABLE `enote_page_tutor_explanations`
    DROP INDEX `unique_page_voice_tutor`,
    ADD COLUMN `paragraph_index` INT UNSIGNED NOT NULL DEFAULT 0 AFTER `page_id`,
    ADD UNIQUE KEY `unique_page_paragraph_voice_tutor` (`page_id`, `paragraph_index`, `voice`);
