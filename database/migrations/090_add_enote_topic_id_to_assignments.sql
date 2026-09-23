-- Links an assignment to the specific eNote topic (the readable, paginated content a student
-- goes through in ENotePreview.vue) it assesses, so the reader's "Topic Complete!" celebration
-- can offer a direct "Attempt Assessment" quick-link. Distinct from the older, unused
-- `assignments.topic_id` (references the legacy `topics` table from migration 006, never wired
-- up to any controller) and from `assignment_curriculum_topics`/`curriculum_topic_id` (a
-- CBC/competency tagging bank for individual questions, not this readable content topic) - kept
-- separate rather than reusing either, since both mean something different.
ALTER TABLE `assignments`
    ADD COLUMN `enote_topic_id` INT UNSIGNED NULL AFTER `topic_id`,
    ADD KEY `idx_assignments_enote_topic` (`enote_topic_id`),
    ADD CONSTRAINT `fk_assignments_enote_topic` FOREIGN KEY (`enote_topic_id`) REFERENCES `enote_topics` (`id`) ON DELETE SET NULL;
