-- Adds per-question teacher feedback. `marks_awarded` already exists on this table from the
-- original schema but has never been read or written by any PHP code - this migration only adds
-- what's missing; VirtualLabService is updated separately to actually use both columns.
ALTER TABLE `virtual_lab_answers`
  ADD COLUMN `feedback` TEXT NULL AFTER `marks_awarded`;
