-- Signing out ends "online" at once: the time of a person's last sign-out, compared with their
-- last activity (last_active_at). The app also adds these columns itself on the first sign-out.
ALTER TABLE `students` ADD COLUMN IF NOT EXISTS `signed_out_at` TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE `teachers` ADD COLUMN IF NOT EXISTS `signed_out_at` TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE `hods`     ADD COLUMN IF NOT EXISTS `signed_out_at` TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE `users`    ADD COLUMN IF NOT EXISTS `signed_out_at` TIMESTAMP NULL DEFAULT NULL;
