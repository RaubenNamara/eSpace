-- The eLibrary from the admin and HOD side: admins (and super admins) and HODs upload books and
-- assign them to a department - the whole department, every stream of a class, or one stream -
-- just as teachers do. An admin has no teachers row, so uploaded_by (a teacher) becomes optional
-- and who uploaded the book is kept in uploader_role / uploader_id (users.id for an admin,
-- hods.id for a HOD, teachers.id for a teacher).

ALTER TABLE `library_books`
    MODIFY `uploaded_by` INT UNSIGNED NULL DEFAULT NULL,
    ADD COLUMN `uploader_role` ENUM('teacher', 'hod', 'admin') NOT NULL DEFAULT 'teacher' AFTER `uploaded_by`,
    ADD COLUMN `uploader_id` INT UNSIGNED NULL DEFAULT NULL AFTER `uploader_role`;

UPDATE `library_books` SET `uploader_id` = `uploaded_by` WHERE `uploader_id` IS NULL AND `uploaded_by` IS NOT NULL;
