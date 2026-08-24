-- Migration: Add super_admin role to users table
-- Description: Adds super_admin role to the role ENUM

ALTER TABLE `users` MODIFY COLUMN `role` ENUM('student', 'teacher', 'hod', 'admin', 'super_admin') NOT NULL;
