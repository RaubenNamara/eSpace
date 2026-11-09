-- Failed logins counted per account and address (AuthService). Optional: the app creates this
-- table itself at the first login.
CREATE TABLE IF NOT EXISTS login_throttle (
    throttle_key CHAR(64) NOT NULL PRIMARY KEY,
    attempts INT UNSIGNED NOT NULL DEFAULT 0,
    last_at DATETIME NOT NULL
) ENGINE=InnoDB;
