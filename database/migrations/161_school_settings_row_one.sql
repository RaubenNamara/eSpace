-- 161: A school's settings are the row with id 1 (every page reads WHERE id = 1). Schools set up
-- from the developer portal before this fix got their row with id 0 (school_settings.id has no
-- AUTO_INCREMENT), so their name, badge and details never showed - on report cards, the Settings
-- page, slips and parent pages. Move that row to id 1. Does nothing where the row is already 1.
-- Safe to run again.
UPDATE IGNORE `school_settings` SET `id` = 1 WHERE `id` = 0;
