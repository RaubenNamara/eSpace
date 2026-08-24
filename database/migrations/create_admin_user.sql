-- Create Admin User for eSpace
-- Run this SQL to create the initial admin account
-- Default credentials: username=admin, password=Admin@123

-- Insert admin user
INSERT INTO users (username, email, password, role, is_active, email_verified_at, created_at, updated_at)
VALUES (
    'admin',
    'admin@espace.com',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt hash for 'Admin@123'
    'admin',
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
