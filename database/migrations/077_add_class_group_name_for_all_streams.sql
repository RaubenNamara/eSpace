-- Migration: "All Streams" virtual targeting for teacher-published content
-- Description: Adds a nullable class_group_name column to every content table that currently
-- targets one specific class+stream row via class_id. When class_id is set, behavior is
-- unchanged (targets that one stream). When class_id IS NULL and class_group_name IS NOT NULL
-- (e.g. "S.1"), the resource targets every stream of that class name within department_id -
-- resolved at read time by joining classes.name = class_group_name, not by duplicating one row
-- per stream.

ALTER TABLE `live_classes` ADD COLUMN `class_group_name` VARCHAR(50) NULL AFTER `class_id`;
ALTER TABLE `enote_topics` ADD COLUMN `class_group_name` VARCHAR(50) NULL AFTER `class_id`;
ALTER TABLE `library_books` ADD COLUMN `class_group_name` VARCHAR(50) NULL AFTER `class_id`;
ALTER TABLE `videos` ADD COLUMN `class_group_name` VARCHAR(50) NULL AFTER `class_id`;
ALTER TABLE `item_bank_questions` ADD COLUMN `class_group_name` VARCHAR(50) NULL AFTER `class_id`;
ALTER TABLE `assignments` ADD COLUMN `class_group_name` VARCHAR(50) NULL AFTER `class_id`;

-- virtual_lab_assignments.class_id was NOT NULL - an all-streams publish has no single class_id,
-- so this must become nullable like the others.
ALTER TABLE `virtual_lab_assignments`
    ADD COLUMN `class_group_name` VARCHAR(50) NULL AFTER `class_id`,
    MODIFY COLUMN `class_id` INT UNSIGNED NULL;
