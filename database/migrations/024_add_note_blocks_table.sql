-- Migration: Add Note Blocks Table for Rich Media Content
-- Description: Creates a table to store individual content blocks for better organization and navigation

CREATE TABLE IF NOT EXISTS `note_blocks` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `note_id` INT UNSIGNED NOT NULL,
    `block_type` ENUM('text', 'heading', 'image', 'video', 'youtube', 'gif', 'quote', 'divider', 'code', 'list') NOT NULL,
    `content` TEXT NULL,
    `metadata` JSON NULL COMMENT 'Stores additional data like image URL, video URL, YouTube ID, etc.',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_note_id` (`note_id`),
    KEY `idx_block_type` (`block_type`),
    KEY `idx_sort_order` (`sort_order`),
    CONSTRAINT `fk_note_blocks_note` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
