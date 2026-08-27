-- Migration: Add content_group_id to enote_topics
-- Description: Links a topic to the duplicates created from it (or the topic it was duplicated
-- from) across other class streams, so an edit to the topic's title/competency/learning outcomes
-- or its pages can be mirrored to every linked copy. NULL for a topic that has never been
-- duplicated. Not a foreign key - the group id is just the id of whichever topic was the root of
-- the duplicate group, which may itself later be deleted without invalidating the grouping for
-- the remaining linked topics.

ALTER TABLE `enote_topics`
ADD COLUMN `content_group_id` INT UNSIGNED NULL AFTER `teacher_id`;

ALTER TABLE `enote_topics`
ADD INDEX `idx_enote_topics_content_group_id` (`content_group_id`);
