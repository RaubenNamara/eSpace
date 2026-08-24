-- Migration: Add teacher/class/department scoping and lifecycle status to videos
-- Description: The videos table previously only supported admin uploads (created_by -> users.id)
-- with no visibility scoping. This mirrors the enote_topics/library_books scoping model so
-- teachers can upload videos scoped to their department/subject/class, and students only see
-- published videos for their enrollment.

ALTER TABLE `videos`
    MODIFY COLUMN `created_by` INT UNSIGNED NULL,
    ADD COLUMN `teacher_id` INT UNSIGNED NULL AFTER `created_by`,
    ADD COLUMN `subject_id` INT UNSIGNED NULL AFTER `teacher_id`,
    ADD COLUMN `class_id` INT UNSIGNED NULL AFTER `subject_id`,
    ADD COLUMN `department_id` INT UNSIGNED NULL AFTER `class_id`,
    ADD COLUMN `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft' AFTER `department_id`,
    ADD COLUMN `published_at` TIMESTAMP NULL AFTER `status`,
    ADD KEY `idx_videos_teacher_id` (`teacher_id`),
    ADD KEY `idx_videos_subject_id` (`subject_id`),
    ADD KEY `idx_videos_class_id` (`class_id`),
    ADD KEY `idx_videos_department_id` (`department_id`),
    ADD KEY `idx_videos_status` (`status`),
    ADD CONSTRAINT `fk_videos_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
    ADD CONSTRAINT `fk_videos_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL,
    ADD CONSTRAINT `fk_videos_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
    ADD CONSTRAINT `fk_videos_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;
