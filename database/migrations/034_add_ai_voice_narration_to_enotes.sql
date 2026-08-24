-- Migration: Add AI voice narration to eNotes
-- Description: Lets a teacher pick an AI voice for a topic (applies to all its pages) and
-- generate/cache narration audio per page. Narration is cached per (page, voice) pair rather
-- than overwritten in place, so switching voices or regenerating after an edit never discards
-- previously-generated audio for a voice the teacher might switch back to. content_hash lets the
-- UI detect when a page's content has changed since its narration for a given voice was
-- generated (stale narration), without needing to re-fetch/compare the full content text.

ALTER TABLE `enote_topics`
    ADD COLUMN `narration_voice` VARCHAR(20) NULL AFTER `estimated_reading_time`;

CREATE TABLE IF NOT EXISTS `enote_page_narrations` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `page_id` INT UNSIGNED NOT NULL,
    `voice` VARCHAR(20) NOT NULL,
    `audio_path` VARCHAR(255) NOT NULL,
    `content_hash` CHAR(64) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_page_voice` (`page_id`, `voice`),
    KEY `idx_page_narrations_page_id` (`page_id`),
    CONSTRAINT `fk_page_narrations_page` FOREIGN KEY (`page_id`) REFERENCES `enote_pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
