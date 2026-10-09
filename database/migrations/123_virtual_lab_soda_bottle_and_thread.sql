-- Adds a proper empty soft-drink bottle model ('soda_bottle' in labObjectFactory.ts - petaloid
-- base, straight body, tapered shoulder, neck and screw cap, ~23cm tall) to replace the generic
-- small specimen jar previously used for the sample bottle in "Finding the Mass of a Bottle Using
-- the Principle of Moments" (VirtualLabSceneMomentsBalance.vue, which now also hangs it, and the
-- 50g hanger, from real thin cylinder "thread" meshes instead of flat unlit lines).

-- The icon is a byte literal (its UTF-8 bytes, like migration 107's superscript 2) rather than a
-- literal emoji character, so it survives being applied through a client that isn't already
-- connected with utf8mb4 (the earlier literal-emoji version of this migration got mangled that way).
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`) VALUES
('soda_bottle', 'Soft Drink Bottle', 'general', 'An empty plastic soft-drink bottle with a screw cap - the kind collected for recycling.', '{}', '["move","rotate","zoom","inspect"]', _utf8mb4 X'F09FA5A4');

SET @bottle_id = (SELECT id FROM `virtual_lab_experiments` WHERE `title` = 'Finding the Mass of a Bottle Using the Principle of Moments' AND `is_template` = 1 ORDER BY id DESC LIMIT 1);

UPDATE `virtual_lab_experiments`
SET `scene_objects` = REPLACE(`scene_objects`, '"specimen_bottle"', '"soda_bottle"')
WHERE `id` = @bottle_id;
