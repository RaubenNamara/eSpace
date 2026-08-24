-- Migration: Revert to role-specific authentication
-- Description: Add username, email, password fields to role-specific tables
-- This allows teachers, students, hods to have their own auth credentials
-- Users table will only store admin and super_admin

-- Add auth fields to teachers table
ALTER TABLE teachers 
ADD COLUMN username VARCHAR(50) NULL AFTER id,
ADD COLUMN email VARCHAR(100) NULL AFTER username,
ADD COLUMN password VARCHAR(255) NULL AFTER email,
ADD COLUMN role ENUM('teacher') DEFAULT 'teacher' AFTER password,
ADD COLUMN profile_photo VARCHAR(255) NULL AFTER role,
ADD COLUMN phone VARCHAR(20) NULL AFTER profile_photo,
ADD COLUMN is_active TINYINT(1) DEFAULT 1 AFTER phone,
ADD COLUMN email_verified_at TIMESTAMP NULL AFTER is_active,
ADD COLUMN last_login_at TIMESTAMP NULL AFTER email_verified_at,
ADD COLUMN last_login_ip VARCHAR(45) NULL AFTER last_login_at;

-- Add unique constraints
ALTER TABLE teachers 
ADD UNIQUE KEY unique_teacher_username (username),
ADD UNIQUE KEY unique_teacher_email (email);

-- Add auth fields to students table
ALTER TABLE students 
ADD COLUMN username VARCHAR(50) NULL AFTER id,
ADD COLUMN email VARCHAR(100) NULL AFTER username,
ADD COLUMN password VARCHAR(255) NULL AFTER email,
ADD COLUMN role ENUM('student') DEFAULT 'student' AFTER password,
ADD COLUMN profile_photo VARCHAR(255) NULL AFTER role,
ADD COLUMN phone VARCHAR(20) NULL AFTER profile_photo,
ADD COLUMN is_active TINYINT(1) DEFAULT 1 AFTER phone,
ADD COLUMN email_verified_at TIMESTAMP NULL AFTER is_active,
ADD COLUMN last_login_at TIMESTAMP NULL AFTER email_verified_at,
ADD COLUMN last_login_ip VARCHAR(45) NULL AFTER last_login_at;

-- Add unique constraints
ALTER TABLE students 
ADD UNIQUE KEY unique_student_username (username),
ADD UNIQUE KEY unique_student_email (email);

-- Add auth fields to hods table
ALTER TABLE hods 
ADD COLUMN username VARCHAR(50) NULL AFTER id,
ADD COLUMN email VARCHAR(100) NULL AFTER username,
ADD COLUMN password VARCHAR(255) NULL AFTER email,
ADD COLUMN role ENUM('hod') DEFAULT 'hod' AFTER password,
ADD COLUMN profile_photo VARCHAR(255) NULL AFTER role,
ADD COLUMN phone VARCHAR(20) NULL AFTER profile_photo,
ADD COLUMN is_active TINYINT(1) DEFAULT 1 AFTER phone,
ADD COLUMN email_verified_at TIMESTAMP NULL AFTER is_active,
ADD COLUMN last_login_at TIMESTAMP NULL AFTER email_verified_at,
ADD COLUMN last_login_ip VARCHAR(45) NULL AFTER last_login_at;

-- Add unique constraints
ALTER TABLE hods 
ADD UNIQUE KEY unique_hod_username (username),
ADD UNIQUE KEY unique_hod_email (email);

-- Update users table role ENUM to only include admin and super_admin
ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'super_admin') NOT NULL;
