-- Platform database: the developer portal's two-step sign-in. Each team member's authenticator-app
-- secret, and the last 30-second code step used (so one code can't be used twice). DevPortalController
-- also adds these itself when missing; this file is for setting the database up by hand.
ALTER TABLE platform_admins
  ADD COLUMN IF NOT EXISTS totp_secret VARCHAR(64) NULL,
  ADD COLUMN IF NOT EXISTS totp_last_step BIGINT NULL;
