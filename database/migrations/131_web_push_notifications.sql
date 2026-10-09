-- Browser (Web Push) notifications: every in-app notification is also pushed to the devices where
-- its recipient turned notifications on, so it reaches them even when eSpace isn't open.
--
-- push_subscriptions: one row per browser/device subscription (the endpoint the browser's push
-- service gave it, plus that browser's encryption keys), linked to the user signed in on it. The
-- same browser signing in as someone else moves the row to them; signing out detaches it.
--
-- web_push_keys: the server's own VAPID key pair (P-256), generated automatically by
-- WebPushService the first time it is needed - one row. Keep it: replacing it invalidates every
-- existing subscription.
--
-- New tables only - nothing existing is changed. Safe to re-run.

CREATE TABLE IF NOT EXISTS `push_subscriptions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `user_role` VARCHAR(20) NOT NULL,
    `endpoint` TEXT NOT NULL,
    `endpoint_hash` CHAR(64) NOT NULL,
    `p256dh` VARCHAR(255) NOT NULL,
    `auth` VARCHAR(64) NOT NULL,
    `user_agent` VARCHAR(255) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `last_success_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uniq_push_endpoint` (`endpoint_hash`),
    KEY `idx_push_user` (`user_id`, `user_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `web_push_keys` (
    `id` TINYINT UNSIGNED NOT NULL,
    `public_key` VARCHAR(255) NOT NULL,
    `private_key_pem` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
