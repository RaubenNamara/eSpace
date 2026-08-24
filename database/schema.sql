-- eSpace Database Schema
-- Enterprise eLearning Management System
-- MySQL 8.4+

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Users Table
CREATE TABLE `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('student', 'teacher', 'hod', 'admin', 'super_admin') NOT NULL,
    `profile_photo` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `email_verified_at` TIMESTAMP NULL,
    `last_login_at` TIMESTAMP NULL,
    `last_login_ip` VARCHAR(45) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_username` (`username`),
    UNIQUE KEY `unique_email` (`email`),
    KEY `idx_role` (`role`),
    KEY `idx_is_active` (`is_active`),
    KEY `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Departments Table
CREATE TABLE `departments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `description` TEXT NULL,
    `head_id` INT UNSIGNED NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_code` (`code`),
    KEY `idx_head_id` (`head_id`),
    KEY `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Academic Years Table
CREATE TABLE `academic_years` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `is_current` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_name` (`name`),
    KEY `idx_is_current` (`is_current`),
    KEY `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Terms Table
CREATE TABLE `terms` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `academic_year_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `is_current` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_academic_year_id` (`academic_year_id`),
    KEY `idx_is_current` (`is_current`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_terms_academic_year` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Classes Table
CREATE TABLE `classes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `level` VARCHAR(20) NOT NULL,
    `academic_year_id` INT UNSIGNED NOT NULL,
    `stream_name` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_academic_year_id` (`academic_year_id`),
    KEY `idx_level` (`level`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_classes_academic_year` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Streams Table
CREATE TABLE `streams` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `class_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_class_id` (`class_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_streams_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Subjects Table
CREATE TABLE `subjects` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `department_id` INT UNSIGNED NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_code` (`code`),
    KEY `idx_department_id` (`department_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_subjects_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Teachers Table
CREATE TABLE `teachers` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `employee_number` VARCHAR(20) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `address` TEXT NULL,
    `department_id` INT UNSIGNED NULL,
    `qualification` VARCHAR(100) NULL,
    `specialization` VARCHAR(100) NULL,
    `hire_date` DATE NOT NULL,
    `phone` VARCHAR(20) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_employee_number` (`employee_number`),
    UNIQUE KEY `unique_user_id` (`user_id`),
    KEY `idx_department_id` (`department_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_teachers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_teachers_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Students Table
CREATE TABLE `students` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `admission_number` VARCHAR(20) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `address` TEXT NULL,
    `class_id` INT UNSIGNED NULL,
    `stream_id` INT UNSIGNED NULL,
    `admission_date` DATE NOT NULL,
    `parent_guardian_name` VARCHAR(100) NOT NULL,
    `parent_guardian_phone` VARCHAR(20) NOT NULL,
    `parent_guardian_email` VARCHAR(100) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_admission_number` (`admission_number`),
    UNIQUE KEY `unique_user_id` (`user_id`),
    KEY `idx_class_id` (`class_id`),
    KEY `idx_stream_id` (`stream_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_students_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_students_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_students_stream` FOREIGN KEY (`stream_id`) REFERENCES `streams` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- HODs Table
CREATE TABLE `hods` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `teacher_id` INT UNSIGNED NULL,
    `department_id` INT UNSIGNED NOT NULL,
    `appointed_date` DATE NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_user_id` (`user_id`),
    UNIQUE KEY `unique_department_id` (`department_id`),
    KEY `idx_teacher_id` (`teacher_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_hods_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_hods_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_hods_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Class Subjects (Many-to-Many)
CREATE TABLE `class_subjects` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `class_id` INT UNSIGNED NOT NULL,
    `subject_id` INT UNSIGNED NOT NULL,
    `teacher_id` INT UNSIGNED NOT NULL,
    `term_id` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_class_subject_teacher_term` (`class_id`, `subject_id`, `teacher_id`, `term_id`),
    KEY `idx_class_id` (`class_id`),
    KEY `idx_subject_id` (`subject_id`),
    KEY `idx_teacher_id` (`teacher_id`),
    KEY `idx_term_id` (`term_id`),
    CONSTRAINT `fk_class_subjects_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_class_subjects_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_class_subjects_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_class_subjects_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Student Enrollments (Many-to-Many)
CREATE TABLE `student_enrollments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` INT UNSIGNED NOT NULL,
    `class_subject_id` INT UNSIGNED NOT NULL,
    `enrollment_date` DATE NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_student_class_subject` (`student_id`, `class_subject_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_class_subject_id` (`class_subject_id`),
    CONSTRAINT `fk_enrollments_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_enrollments_class_subject` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subjects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Topics Table
CREATE TABLE `topics` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `subject_id` INT UNSIGNED NOT NULL,
    `class_subject_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `order` INT UNSIGNED NOT NULL DEFAULT 0,
    `term_id` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_subject_id` (`subject_id`),
    KEY `idx_class_subject_id` (`class_subject_id`),
    KEY `idx_term_id` (`term_id`),
    KEY `idx_order` (`order`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_topics_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_topics_class_subject` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_topics_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Subtopics Table
CREATE TABLE `subtopics` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `topic_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `order` INT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_order` (`order`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_subtopics_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Assignments Table
CREATE TABLE `assignments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `class_subject_id` INT UNSIGNED NOT NULL,
    `topic_id` INT UNSIGNED NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `type` ENUM('essay', 'scenario', 'objective', 'file_upload', 'mixed') NOT NULL,
    `total_marks` DECIMAL(5,2) NOT NULL,
    `due_date` DATETIME NOT NULL,
    `instructions` TEXT NULL,
    `attachments` JSON NULL,
    `rubric` JSON NULL,
    `is_published` TINYINT(1) NOT NULL DEFAULT 0,
    `published_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_class_subject_id` (`class_subject_id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_due_date` (`due_date`),
    KEY `idx_is_published` (`is_published`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_assignments_class_subject` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_assignments_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Assignment Submissions Table
CREATE TABLE `assignment_submissions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `assignment_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `content` TEXT NULL,
    `attachments` JSON NULL,
    `is_draft` TINYINT(1) NOT NULL DEFAULT 1,
    `submitted_at` TIMESTAMP NULL,
    `marks_obtained` DECIMAL(5,2) NULL,
    `feedback` TEXT NULL,
    `graded_at` TIMESTAMP NULL,
    `graded_by` INT UNSIGNED NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_assignment_student` (`assignment_id`, `student_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_submitted_at` (`submitted_at`),
    KEY `idx_is_draft` (`is_draft`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_submissions_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_submissions_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_submissions_grader` FOREIGN KEY (`graded_by`) REFERENCES `teachers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Assignment Annotations (for digital marking)
CREATE TABLE `assignment_annotations` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `submission_id` INT UNSIGNED NOT NULL,
    `teacher_id` INT UNSIGNED NOT NULL,
    `type` ENUM('pen', 'highlighter', 'text', 'shape', 'comment') NOT NULL,
    `page_number` INT UNSIGNED NOT NULL,
    `x` DECIMAL(10,2) NOT NULL,
    `y` DECIMAL(10,2) NOT NULL,
    `width` DECIMAL(10,2) NULL,
    `height` DECIMAL(10,2) NULL,
    `color` VARCHAR(20) NULL,
    `stroke_width` DECIMAL(5,2) NULL,
    `content` TEXT NULL,
    `points` JSON NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_submission_id` (`submission_id`),
    KEY `idx_teacher_id` (`teacher_id`),
    KEY `idx_page_number` (`page_number`),
    CONSTRAINT `fk_annotations_submission` FOREIGN KEY (`submission_id`) REFERENCES `assignment_submissions` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_annotations_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- eLibrary Books Table
CREATE TABLE `library_books` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `author` VARCHAR(100) NULL,
    `isbn` VARCHAR(20) NULL,
    `subject_id` INT UNSIGNED NULL,
    `description` TEXT NULL,
    `file_path` VARCHAR(255) NOT NULL,
    `file_type` VARCHAR(20) NOT NULL,
    `file_size` BIGINT UNSIGNED NULL,
    `cover_image` VARCHAR(255) NULL,
    `total_pages` INT UNSIGNED NULL,
    `uploaded_by` INT UNSIGNED NOT NULL,
    `is_approved` TINYINT(1) NOT NULL DEFAULT 0,
    `approved_by` INT UNSIGNED NULL,
    `approved_at` TIMESTAMP NULL,
    `assigned_to` ENUM('class', 'stream', 'department', 'school') NULL,
    `assigned_id` INT UNSIGNED NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_subject_id` (`subject_id`),
    KEY `idx_uploaded_by` (`uploaded_by`),
    KEY `idx_is_approved` (`is_approved`),
    KEY `idx_assigned_to` (`assigned_to`),
    KEY `idx_assigned_id` (`assigned_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_library_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_library_uploader` FOREIGN KEY (`uploaded_by`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_library_approver` FOREIGN KEY (`approved_by`) REFERENCES `hods` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Library Reading Progress
CREATE TABLE `library_progress` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `book_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `current_page` INT UNSIGNED NOT NULL DEFAULT 0,
    `pages_read` INT UNSIGNED NOT NULL DEFAULT 0,
    `percentage_completed` DECIMAL(5,2) NOT NULL DEFAULT 0,
    `last_read_at` TIMESTAMP NULL,
    `time_spent_minutes` INT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_book_student` (`book_id`, `student_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_last_read_at` (`last_read_at`),
    CONSTRAINT `fk_library_progress_book` FOREIGN KEY (`book_id`) REFERENCES `library_books` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_library_progress_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Library Bookmarks
CREATE TABLE `library_bookmarks` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `book_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `page_number` INT UNSIGNED NOT NULL,
    `note` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_book_id` (`book_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_page_number` (`page_number`),
    CONSTRAINT `fk_bookmarks_book` FOREIGN KEY (`book_id`) REFERENCES `library_books` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_bookmarks_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- eNotes Table
CREATE TABLE `notes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `subject_id` INT UNSIGNED NOT NULL,
    `topic_id` INT UNSIGNED NULL,
    `subtopic_id` INT UNSIGNED NULL,
    `title` VARCHAR(200) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `is_published` TINYINT(1) NOT NULL DEFAULT 0,
    `published_at` TIMESTAMP NULL,
    `is_approved` TINYINT(1) NOT NULL DEFAULT 0,
    `approved_by` INT UNSIGNED NULL,
    `approved_at` TIMESTAMP NULL,
    `assigned_to` ENUM('class', 'stream', 'department', 'school') NULL,
    `assigned_id` INT UNSIGNED NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_subject_id` (`subject_id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_subtopic_id` (`subtopic_id`),
    KEY `idx_created_by` (`created_by`),
    KEY `idx_is_published` (`is_published`),
    KEY `idx_is_approved` (`is_approved`),
    KEY `idx_assigned_to` (`assigned_to`),
    KEY `idx_assigned_id` (`assigned_id`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_notes_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_notes_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_notes_subtopic` FOREIGN KEY (`subtopic_id`) REFERENCES `subtopics` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_notes_creator` FOREIGN KEY (`created_by`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_notes_approver` FOREIGN KEY (`approved_by`) REFERENCES `hods` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notes Reading Progress
CREATE TABLE `notes_progress` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `note_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `percentage_completed` DECIMAL(5,2) NOT NULL DEFAULT 0,
    `last_read_at` TIMESTAMP NULL,
    `time_spent_minutes` INT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_note_student` (`note_id`, `student_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_last_read_at` (`last_read_at`),
    CONSTRAINT `fk_notes_progress_note` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_notes_progress_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notes Bookmarks
CREATE TABLE `notes_bookmarks` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `note_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `note_text` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_note_id` (`note_id`),
    KEY `idx_student_id` (`student_id`),
    CONSTRAINT `fk_notes_bookmarks_note` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_notes_bookmarks_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Item Bank Questions Table
CREATE TABLE `item_bank_questions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `subject_id` INT UNSIGNED NOT NULL,
    `topic_id` INT UNSIGNED NULL,
    `question_text` TEXT NOT NULL,
    `question_type` ENUM('multiple_choice', 'true_false', 'short_answer', 'essay', 'fill_blank') NOT NULL,
    `difficulty` ENUM('easy', 'medium', 'hard') NOT NULL,
    `options` JSON NULL,
    `correct_answer` TEXT NOT NULL,
    `explanation` TEXT NULL,
    `marks` DECIMAL(5,2) NOT NULL DEFAULT 1,
    `created_by` INT UNSIGNED NOT NULL,
    `is_approved` TINYINT(1) NOT NULL DEFAULT 0,
    `approved_by` INT UNSIGNED NULL,
    `approved_at` TIMESTAMP NULL,
    `tags` JSON NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_subject_id` (`subject_id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_question_type` (`question_type`),
    KEY `idx_difficulty` (`difficulty`),
    KEY `idx_created_by` (`created_by`),
    KEY `idx_is_approved` (`is_approved`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_item_bank_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_item_bank_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_item_bank_creator` FOREIGN KEY (`created_by`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_item_bank_approver` FOREIGN KEY (`approved_by`) REFERENCES `hods` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Item Bank Attempts
CREATE TABLE `item_bank_attempts` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `question_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `mode` ENUM('practice', 'study') NOT NULL,
    `answer` TEXT NULL,
    `is_correct` TINYINT(1) NULL,
    `time_spent_seconds` INT UNSIGNED NULL,
    `attempted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_question_id` (`question_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_mode` (`mode`),
    KEY `idx_attempted_at` (`attempted_at`),
    CONSTRAINT `fk_item_attempts_question` FOREIGN KEY (`question_id`) REFERENCES `item_bank_questions` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_item_attempts_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chat Conversations Table
CREATE TABLE `chat_conversations` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` ENUM('direct', 'group', 'class', 'announcement') NOT NULL,
    `name` VARCHAR(100) NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_type` (`type`),
    KEY `idx_created_by` (`created_by`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_conversations_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chat Participants Table
CREATE TABLE `chat_participants` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `conversation_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `joined_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_read_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_conversation_user` (`conversation_id`, `user_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_last_read_at` (`last_read_at`),
    CONSTRAINT `fk_participants_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `chat_conversations` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_participants_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chat Messages Table
CREATE TABLE `chat_messages` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `conversation_id` INT UNSIGNED NOT NULL,
    `sender_id` INT UNSIGNED NOT NULL,
    `message` TEXT NOT NULL,
    `attachment` VARCHAR(255) NULL,
    `is_read` TINYINT(1) NOT NULL DEFAULT 0,
    `read_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_conversation_id` (`conversation_id`),
    KEY `idx_sender_id` (`sender_id`),
    KEY `idx_is_read` (`is_read`),
    KEY `idx_created_at` (`created_at`),
    CONSTRAINT `fk_messages_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `chat_conversations` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_messages_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Live Classes (BigBlueButton) Table
CREATE TABLE `live_classes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `class_subject_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `scheduled_start` DATETIME NOT NULL,
    `scheduled_end` DATETIME NOT NULL,
    `actual_start` TIMESTAMP NULL,
    `actual_end` TIMESTAMP NULL,
    `meeting_id` VARCHAR(255) NULL,
    `meeting_url` VARCHAR(255) NULL,
    `moderator_password` VARCHAR(255) NULL,
    `attendee_password` VARCHAR(255) NULL,
    `is_recorded` TINYINT(1) NOT NULL DEFAULT 0,
    `recording_url` VARCHAR(255) NULL,
    `status` ENUM('scheduled', 'started', 'ended', 'cancelled') NOT NULL DEFAULT 'scheduled',
    `created_by` INT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `idx_class_subject_id` (`class_subject_id`),
    KEY `idx_scheduled_start` (`scheduled_start`),
    KEY `idx_status` (`status`),
    KEY `idx_created_by` (`created_by`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_live_classes_class_subject` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subjects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_live_classes_creator` FOREIGN KEY (`created_by`) REFERENCES `teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Live Class Attendance Table
CREATE TABLE `live_class_attendance` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `live_class_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `join_time` TIMESTAMP NULL,
    `leave_time` TIMESTAMP NULL,
    `duration_minutes` INT UNSIGNED NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_live_class_student` (`live_class_id`, `student_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_join_time` (`join_time`),
    CONSTRAINT `fk_live_attendance_class` FOREIGN KEY (`live_class_id`) REFERENCES `live_classes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_live_attendance_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications Table
CREATE TABLE `notifications` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `data` JSON NULL,
    `is_read` TINYINT(1) NOT NULL DEFAULT 0,
    `read_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_type` (`type`),
    KEY `idx_is_read` (`is_read`),
    KEY `idx_created_at` (`created_at`),
    CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Settings Table
CREATE TABLE `user_settings` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `key` VARCHAR(50) NOT NULL,
    `value` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_user_key` (`user_id`, `key`),
    KEY `idx_key` (`key`),
    CONSTRAINT `fk_user_settings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit Logs Table
CREATE TABLE `audit_logs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NULL,
    `action` VARCHAR(50) NOT NULL,
    `table_name` VARCHAR(50) NOT NULL,
    `record_id` INT UNSIGNED NULL,
    `old_values` JSON NULL,
    `new_values` JSON NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` VARCHAR(255) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_action` (`action`),
    KEY `idx_table_name` (`table_name`),
    KEY `idx_record_id` (`record_id`),
    KEY `idx_created_at` (`created_at`),
    CONSTRAINT `fk_audit_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Password Reset Tokens Table
CREATE TABLE `password_reset_tokens` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires_at` TIMESTAMP NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_token` (`token`),
    KEY `idx_email` (`email`),
    KEY `idx_expires_at` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sessions Table (for session storage)
CREATE TABLE `sessions` (
    `id` VARCHAR(128) NOT NULL,
    `user_id` INT UNSIGNED NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` VARCHAR(255) NULL,
    `payload` LONGTEXT NOT NULL,
    `last_activity` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_last_activity` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add foreign key constraints that couldn't be added during table creation
ALTER TABLE `departments` ADD CONSTRAINT `fk_departments_head` FOREIGN KEY (`head_id`) REFERENCES `hods` (`id`) ON DELETE SET NULL;
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_class_teacher` FOREIGN KEY (`class_teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
