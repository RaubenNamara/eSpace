-- The browser, operating system and kind of device of each sign-in, as reported by the browser
-- itself at login (User-Agent Client Hints: real Windows 10/11, macOS and Android versions, the
-- phone model, Brave) and read from the User-Agent string where the browser does not report them.
-- Shown on the admin dashboard's staff and student activity. Older rows keep only user_agent; the
-- dashboard reads those as before. Safe to re-run.

SET @col := (SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'login_logs' AND COLUMN_NAME = 'browser');
SET @sql := IF(@col = 0,
  'ALTER TABLE login_logs
     ADD COLUMN browser VARCHAR(80) NULL AFTER user_agent,
     ADD COLUMN os VARCHAR(80) NULL AFTER browser,
     ADD COLUMN device_type VARCHAR(20) NULL AFTER os,
     ADD COLUMN device_model VARCHAR(80) NULL AFTER device_type',
  'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
