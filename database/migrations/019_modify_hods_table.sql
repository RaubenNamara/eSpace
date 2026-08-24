-- Migration: Modify HODs table to be independent
-- Description: Modify hods table to include authentication fields directly instead of linking to users table

-- First, drop the foreign key constraint to users table
ALTER TABLE `hods` DROP FOREIGN KEY `fk_hods_user`;

-- Remove the user_id column and add authentication fields directly
ALTER TABLE `hods` 
DROP COLUMN `user_id`,
ADD COLUMN `username` VARCHAR(50) NOT NULL UNIQUE AFTER `id`,
ADD COLUMN `email` VARCHAR(100) NOT NULL UNIQUE AFTER `username`,
ADD COLUMN `password` VARCHAR(255) NOT NULL AFTER `email`,
ADD COLUMN `first_name` VARCHAR(100) NOT NULL AFTER `password`,
ADD COLUMN `last_name` VARCHAR(100) NOT NULL AFTER `first_name`,
ADD COLUMN `phone` VARCHAR(20) NULL AFTER `last_name`,
ADD COLUMN `is_active` TINYINT(1) NOT NULL DEFAULT 1 AFTER `phone`,
ADD COLUMN `last_login_at` TIMESTAMP NULL AFTER `is_active`;

-- Add unique constraints for username and email
ALTER TABLE `hods` ADD UNIQUE KEY `unique_username` (`username`);
ALTER TABLE `hods` ADD UNIQUE KEY `unique_email` (`email`);

-- Update the foreign key for approved_by in library_books, notes, and item_bank_questions
-- These should now reference hods.id directly
ALTER TABLE `library_books` DROP FOREIGN KEY `fk_library_approver`;
ALTER TABLE `library_books` ADD CONSTRAINT `fk_library_approver` FOREIGN KEY (`approved_by`) REFERENCES `hods` (`id`) ON DELETE SET NULL;

ALTER TABLE `notes` DROP FOREIGN KEY `fk_notes_approver`;
ALTER TABLE `notes` ADD CONSTRAINT `fk_notes_approver` FOREIGN KEY (`approved_by`) REFERENCES `hods` (`id`) ON DELETE SET NULL;

ALTER TABLE `item_bank_questions` DROP FOREIGN KEY `fk_item_bank_approver`;
ALTER TABLE `item_bank_questions` ADD CONSTRAINT `fk_item_bank_approver` FOREIGN KEY (`approved_by`) REFERENCES `hods` (`id`) ON DELETE SET NULL;
