-- Videos and the Item Bank from the admin and HOD side, as the eLibrary already is (126): admins
-- and HODs upload into a department and choose who it's for. The teacher owner column becomes
-- optional for the Item Bank (videos.teacher_id already is), and who added each item is kept in
-- uploader_role / uploader_id (users.id for an admin, hods.id for a HOD, teachers.id for a teacher).

ALTER TABLE `videos`
    ADD COLUMN `uploader_role` ENUM('teacher', 'hod', 'admin') NOT NULL DEFAULT 'teacher' AFTER `teacher_id`,
    ADD COLUMN `uploader_id` INT UNSIGNED NULL DEFAULT NULL AFTER `uploader_role`;

UPDATE `videos` SET `uploader_id` = `teacher_id` WHERE `uploader_id` IS NULL AND `teacher_id` IS NOT NULL;
-- The old admin upload stored only created_by (users.id)
UPDATE `videos` SET `uploader_role` = 'admin', `uploader_id` = `created_by` WHERE `teacher_id` IS NULL AND `created_by` IS NOT NULL;

ALTER TABLE `item_bank_questions`
    MODIFY `created_by` INT UNSIGNED NULL DEFAULT NULL,
    ADD COLUMN `uploader_role` ENUM('teacher', 'hod', 'admin') NOT NULL DEFAULT 'teacher' AFTER `created_by`,
    ADD COLUMN `uploader_id` INT UNSIGNED NULL DEFAULT NULL AFTER `uploader_role`;

UPDATE `item_bank_questions` SET `uploader_id` = `created_by` WHERE `uploader_id` IS NULL AND `created_by` IS NOT NULL;
