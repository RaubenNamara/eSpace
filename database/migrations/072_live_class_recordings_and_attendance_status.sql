-- Migration: Live Class recordings table + richer attendance tracking
-- Description: Adds a local cache of BBB recordings (record_id/playback_url/publish state) so
-- Admin/HOD/Teacher/Student recording lists don't need a live BBB API round-trip per class, and
-- so Admin can publish/unpublish/delete a recording. Also adds attendance_status + leave_time/
-- duration bookkeeping (already-existing columns, now actually populated) to live_class_attendance.

CREATE TABLE IF NOT EXISTS `live_class_recordings` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `live_class_id` INT UNSIGNED NOT NULL,
    `record_id` VARCHAR(255) NOT NULL,
    `start_time` DATETIME NULL,
    `end_time` DATETIME NULL,
    `playback_url` VARCHAR(500) NULL,
    `is_published` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_live_class_record` (`live_class_id`, `record_id`),
    KEY `idx_live_class_id` (`live_class_id`),
    CONSTRAINT `fk_live_recordings_class` FOREIGN KEY (`live_class_id`) REFERENCES `live_classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `live_class_attendance`
    ADD COLUMN `attendance_status` ENUM('present', 'left_early') NOT NULL DEFAULT 'present' AFTER `student_id`;
