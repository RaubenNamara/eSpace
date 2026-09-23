-- `enote_page_id`: distinguishes a page-scoped assignment (Learning Outcome Assessment, created
-- from a specific eNote page in ENoteBuilder.vue) from a topic-scoped one (AOI, or the
-- pre-existing generic "Create Assessment" quick-link) which leaves this NULL. Nullable/SET NULL,
-- mirrors `enote_topic_id` (migration 090) exactly. Any query that looks up "the" topic-level
-- linked assignment must add `enote_page_id IS NULL` so a per-page LOA assignment is never
-- mistaken for the topic-level one.
ALTER TABLE `assignments`
    ADD COLUMN `enote_page_id` INT UNSIGNED NULL AFTER `enote_topic_id`,
    ADD KEY `idx_assignments_enote_page` (`enote_page_id`),
    ADD CONSTRAINT `fk_assignments_enote_page` FOREIGN KEY (`enote_page_id`)
        REFERENCES `enote_pages` (`id`) ON DELETE SET NULL;

-- Purely informational weighting a teacher assigns to an LOA/AOI assessment - not wired into
-- grading/report-card math in this pass. Distinct from the unrelated, auto-computed
-- `report_card_competencies.weight`.
ALTER TABLE `assignments`
    ADD COLUMN `weight` DECIMAL(5,2) NULL AFTER `assessment_category`;
