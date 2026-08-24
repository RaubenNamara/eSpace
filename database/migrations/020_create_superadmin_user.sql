-- Create Super Admin User for eSpace
-- Run this SQL to create the initial superadmin account
-- Default credentials: username=superadmin, password=SuperAdmin123!

-- Insert superadmin user
INSERT INTO users (username, email, password, role, is_active, email_verified_at, created_at, updated_at)
VALUES (
    'superadmin',
    'superadmin@espace.com',
    '$2y$10$YourHashedPasswordHere', -- bcrypt hash for 'SuperAdmin123!'
    'super_admin',
    1,
    NOW(),
    NOW(),
    NOW()
)
ON DUPLICATE KEY UPDATE 
    username = VALUES(username),
    email = VALUES(email),
    role = VALUES(role),
    is_active = VALUES(is_active);
