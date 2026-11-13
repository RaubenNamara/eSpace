-- 162: The demo is opened only by a private link sent to a school that asked for one
-- (Admin > Demo requests > Send demo link). The link works for 7 days.
--  demo_token      - the key in the link (/demo/{token})
--  demo_sent_at    - when the link was made (and emailed, when there is an address)
--  demo_expires_at - when it stops working
-- Safe to run again.
ALTER TABLE `demo_requests`
  ADD COLUMN IF NOT EXISTS `demo_token` CHAR(48) NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `demo_sent_at` DATETIME NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `demo_expires_at` DATETIME NULL DEFAULT NULL,
  ADD UNIQUE KEY IF NOT EXISTS `uniq_demo_token` (`demo_token`);
