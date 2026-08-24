-- Migration 019 (modify_hods_table) intended `hods` to store its own first_name/last_name so a
-- standalone HOD (no linked teacher_id) still has a name, but the live table never actually
-- picked up those two columns even though Admin\HODController's create()/update()/search code
-- has always assumed they exist - the "Add HOD" form's INSERT has been failing outright, and
-- name search has been querying a nonexistent h.first_name/h.last_name. Backfilling from the
-- linked teacher for existing rows keeps this additive and non-destructive.

ALTER TABLE `hods`
    ADD COLUMN `first_name` VARCHAR(100) NULL AFTER `password`,
    ADD COLUMN `last_name` VARCHAR(100) NULL AFTER `first_name`;

UPDATE `hods` h
INNER JOIN `teachers` t ON h.teacher_id = t.id
SET h.first_name = t.first_name, h.last_name = t.last_name
WHERE h.first_name IS NULL;
