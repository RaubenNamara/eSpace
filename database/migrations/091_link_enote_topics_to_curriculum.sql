-- One-time, teacher-chosen link from an eNote topic (the readable, paginated content in
-- ENoteBuilder.vue/ENotePreview.vue) to a specific admin-authored `enote_curriculum_topics` row.
-- Curriculum-bank topics are themselves scoped per academic_year_id/term_id (migration 080) with
-- no year-independent identity to link to instead, so this is a snapshot link, not a "the same
-- real topic across every year" link - a teacher re-links it if they want a different year/term's
-- version. Once linked, the eNote topic "knows" its own Learning Outcomes (via
-- enote_learning_outcomes.curriculum_topic_id) for the per-page Learning Outcome Assessment
-- quick-create, without re-picking Theme/Branch/Topic every time.
ALTER TABLE `enote_topics`
    ADD COLUMN `curriculum_topic_id` INT UNSIGNED NULL AFTER `content_group_id`,
    ADD KEY `idx_enote_topics_curriculum_topic` (`curriculum_topic_id`),
    ADD CONSTRAINT `fk_enote_topics_curriculum_topic` FOREIGN KEY (`curriculum_topic_id`)
        REFERENCES `enote_curriculum_topics` (`id`) ON DELETE SET NULL;
