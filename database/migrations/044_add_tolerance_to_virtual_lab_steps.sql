-- Tolerance-based measurement grading (e.g. "50ml, tolerance +/-2ml" instead of requiring an
-- exact value) - lets VirtualLabService::logAction() accept a numeric range around
-- expected_value instead of a byte-for-byte string match, which is all the previous schema
-- supported. NULL tolerance keeps the old exact-match behaviour (used for non-numeric steps like
-- connect/switch, where expected_value is an object key, not a measurement).
ALTER TABLE `virtual_lab_steps`
    ADD COLUMN `tolerance` DECIMAL(8,3) NULL AFTER `expected_value`;

-- Demonstrates the new tolerance feature on the one seeded step that's a genuine numeric target
-- (measuring exactly 25ml with a pipette) - accept 24-26ml instead of only a byte-perfect "25".
UPDATE `virtual_lab_steps` SET `tolerance` = 1.0
WHERE `instruction` = 'Use the pipette to measure 25ml of sodium hydroxide solution.' AND `expected_value` = '25';
