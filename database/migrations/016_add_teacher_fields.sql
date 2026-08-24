-- Migration: Add Missing Teacher Fields
-- Description: Adds additional fields to the teachers table for comprehensive teacher management

ALTER TABLE `teachers`
ADD COLUMN `middle_name` VARCHAR(50) NULL AFTER `first_name`,
ADD COLUMN `alternative_phone` VARCHAR(20) NULL AFTER `phone`,
ADD COLUMN `employment_type` ENUM('full_time', 'part_time', 'contract', 'temporary') NULL AFTER `specialization`,
ADD COLUMN `employment_status` ENUM('active', 'on_leave', 'probation', 'terminated') DEFAULT 'active' AFTER `employment_type`,
ADD COLUMN `job_title` VARCHAR(100) NULL AFTER `employment_status`;
