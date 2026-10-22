-- 140: WhatsApp-style chat status.
--  last_delivered_at - when this participant's eSpace last fetched their chats (their app is open),
--                      so the sender sees two grey ticks; read is still last_read_at (two blue ticks).
--  activity / activity_at - "typing" or "recording" while the participant is doing it; others see
--                      "typing..." / "recording audio..." while activity_at is a few seconds old.
ALTER TABLE `chat_participants`
  ADD COLUMN IF NOT EXISTS `last_delivered_at` TIMESTAMP NULL DEFAULT NULL AFTER `last_read_at`,
  ADD COLUMN IF NOT EXISTS `activity` VARCHAR(10) NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `activity_at` TIMESTAMP NULL DEFAULT NULL;

-- anything already read was delivered
UPDATE `chat_participants` SET `last_delivered_at` = `last_read_at`
 WHERE `last_delivered_at` IS NULL AND `last_read_at` IS NOT NULL;
