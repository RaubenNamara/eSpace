<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\App\Repositories\UserRepository;
use eSpace\App\Services\Service;
use eSpace\Config\Config;

/**
 * Authentication Service
 * 
 * Handles authentication business logic including login, logout, password management.
 */

class AuthService extends Service
{
    private UserRepository $userRepository;
    private int $maxLoginAttempts = 5;
    private int $lockoutTime = 900; // 15 minutes

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }

    /**
     * Authenticate user
     */
    public function login(string $identifier, string $password): array
    {
        // Check rate limiting - TEMPORARILY DISABLED FOR DEBUGGING
        // if ($this->isLockedOut($identifier)) {
        //     return [
        //         'success' => false,
        //         'message' => 'Too many failed attempts. Please try again later.',
        //         'lockout_remaining' => $this->getLockoutRemaining($identifier)
        //     ];
        // }

        // Find user
        $user = $this->userRepository->findByUsernameOrEmail($identifier);

        if (!$user) {
            error_log("Login failed: User not found for identifier: " . $identifier);
            $this->recordFailedAttempt($identifier);
            return [
                'success' => false,
                'message' => 'Invalid credentials'
            ];
        }

        error_log("User found: " . $user['username'] . ", ID: " . $user['id']);

        // Check if user is active
        if (!$this->userRepository->isActive($user['id'])) {
            error_log("Login failed: User inactive");
            return [
                'success' => false,
                'message' => 'Account is inactive. Please contact administrator.'
            ];
        }

        // Verify password
        error_log("Input password (raw): '" . $password . "'");
        error_log("Input password length: " . strlen($password));
        error_log("Stored password hash: " . $user['password']);
        $passwordMatch = $this->verifyPassword($password, $user['password']);
        error_log("Password verification: " . ($passwordMatch ? 'SUCCESS' : 'FAILED'));

        if (!$passwordMatch) {
            $this->recordFailedAttempt($identifier);
            return [
                'success' => false,
                'message' => 'Invalid credentials'
            ];
        }

        // Clear failed attempts
        $this->clearFailedAttempts($identifier);

        // Update last login
        $this->userRepository->updateLastLogin($user['id'], $this->getClientIp());

        // Create session
        $this->createSession($user);

        return [
            'success' => true,
            'message' => 'Login successful',
            'user' => $this->getUserData($user)
        ];
    }

    /**
     * Logout user
     */
    public function logout(): void
    {
        // Destroy session
        session_unset();
        session_destroy();

        // Clear session cookie
        if (isset($_COOKIE[session_name()])) {
            setcookie(session_name(), '', time() - 3600, '/');
        }
    }

    /**
     * Register new user
     */
    public function register(array $data): array
    {
        // Validate data
        $rules = [
            'username' => ['required', 'string', 'min:3'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'in:student,teacher,hod,admin']
        ];

        $errors = $this->validate($data, $rules);

        if (!empty($errors)) {
            return [
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $errors
            ];
        }

        // Check if username exists
        if ($this->userRepository->findByUsername($data['username'])) {
            return [
                'success' => false,
                'message' => 'Username already exists'
            ];
        }

        // Check if email exists
        if ($this->userRepository->findByEmail($data['email'])) {
            return [
                'success' => false,
                'message' => 'Email already exists'
            ];
        }

        // Hash password
        $data['password'] = $this->hashPassword($data['password']);

        // Create user
        $userId = $this->userRepository->create($data);

        if (!$userId) {
            return [
                'success' => false,
                'message' => 'Failed to create user'
            ];
        }

        $user = $this->userRepository->findById($userId);

        return [
            'success' => true,
            'message' => 'Registration successful',
            'user' => $this->getUserData($user)
        ];
    }

    /**
     * Change password
     *
     * $role, when known (the authenticated /auth/password endpoint always has it from the
     * session), targets the exact table that role's row lives in for both the current-password
     * check and the update - not the id-only "try every table" fallback, which can silently
     * match the wrong person when ids collide across role tables (this app has confirmed
     * collisions, e.g. a student and an admin sharing id 1). Students get a lower minimum length
     * (5) than staff roles (8).
     */
    public function changePassword(int $userId, string $currentPassword, string $newPassword, ?string $role = null, ?string $newPasswordConfirmation = null): array
    {
        $user = $role ? $this->userRepository->findByIdAndRole($userId, $role) : $this->userRepository->findById($userId);

        if (!$user) {
            return [
                'success' => false,
                'message' => 'User not found'
            ];
        }

        // Verify current password
        if (!$this->verifyPassword($currentPassword, $user['password'])) {
            return [
                'success' => false,
                'message' => 'Current password is incorrect'
            ];
        }

        // Only checked when the caller actually sends a confirmation field - existing callers
        // that don't (e.g. the generic Settings page) are unaffected.
        if ($newPasswordConfirmation !== null && $newPassword !== $newPasswordConfirmation) {
            return [
                'success' => false,
                'message' => 'New password and confirmation do not match'
            ];
        }

        // Validate new password
        $minLength = $role === 'student' ? 5 : 8;
        $errors = $this->validate(['password' => $newPassword], ['password' => ['required', 'string', "min:{$minLength}"]]);

        if (!empty($errors)) {
            return [
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $errors
            ];
        }

        // Must actually be a new password - most relevant for a teacher moving off a temporary
        // default one, but reasonable to require of everyone.
        if ($this->verifyPassword($newPassword, $user['password'])) {
            return [
                'success' => false,
                'message' => 'New password must be different from your current password'
            ];
        }

        // Hash new password
        $hashedPassword = $this->hashPassword($newPassword);

        // Update password
        $updated = $role
            ? $this->userRepository->updatePasswordForRole($userId, $role, $hashedPassword)
            : $this->userRepository->updatePassword($userId, $hashedPassword);

        if (!$updated) {
            return [
                'success' => false,
                'message' => 'Failed to update password'
            ];
        }

        // A teacher who just changed their (possibly temporary) password no longer needs to be
        // forced through the change-password screen - clear both the persisted flag and this
        // session's mirror of it (see MustChangePasswordMiddleware) so they can use the rest of
        // the teacher module immediately, without logging out and back in.
        if ($role === 'teacher') {
            $db = \eSpace\Config\Database::getInstance();
            $db->prepare("UPDATE teachers SET must_change_password = 0 WHERE id = :id")->execute(['id' => $userId]);
            $_SESSION['must_change_password'] = false;
        }

        return [
            'success' => true,
            'message' => 'Password updated successfully'
        ];
    }

    /**
     * Request password reset
     */
    public function requestPasswordReset(string $email): array
    {
        $user = $this->userRepository->findByEmail($email);

        if (!$user) {
            // Don't reveal if email exists
            return [
                'success' => true,
                'message' => 'If the email exists, a reset link has been sent'
            ];
        }

        // Generate reset token
        $token = $this->generateToken();
        $expiresAt = date('Y-m-d H:i:s', time() + 3600); // 1 hour

        // Store token (would normally save to database)
        // For now, we'll use session
        $_SESSION['password_reset_token'] = $token;
        $_SESSION['password_reset_email'] = $email;
        $_SESSION['password_reset_expires'] = $expiresAt;

        // In production, send email with reset link
        // For now, return the token for testing
        return [
            'success' => true,
            'message' => 'Password reset link sent',
            'token' => $token // Remove in production
        ];
    }

    /**
     * Reset password
     */
    public function resetPassword(string $token, string $newPassword): array
    {
        // Validate token
        if (!isset($_SESSION['password_reset_token']) || 
            $_SESSION['password_reset_token'] !== $token ||
            strtotime($_SESSION['password_reset_expires']) < time()) {
            return [
                'success' => false,
                'message' => 'Invalid or expired reset token'
            ];
        }

        $email = $_SESSION['password_reset_email'];
        $user = $this->userRepository->findByEmail($email);

        if (!$user) {
            return [
                'success' => false,
                'message' => 'User not found'
            ];
        }

        // Validate new password
        $errors = $this->validate(['password' => $newPassword], ['password' => ['required', 'string', 'min:8']]);

        if (!empty($errors)) {
            return [
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $errors
            ];
        }

        // Hash new password
        $hashedPassword = $this->hashPassword($newPassword);

        // Update password
        if (!$this->userRepository->updatePassword($user['id'], $hashedPassword)) {
            return [
                'success' => false,
                'message' => 'Failed to update password'
            ];
        }

        // Clear reset token
        unset($_SESSION['password_reset_token']);
        unset($_SESSION['password_reset_email']);
        unset($_SESSION['password_reset_expires']);

        return [
            'success' => true,
            'message' => 'Password reset successful'
        ];
    }

    /**
     * Create session
     */
    private function createSession(array $user): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['logged_in_at'] = time();

        // Dual-role bridge for HODs assigned from an existing teacher account: carries their
        // linked teachers.id through the session so Controller::hasRole()/getTeacherId() can
        // resolve teacher-only access and data scoping without a second login.
        if ($user['role'] === 'hod' && !empty($user['teacher_id'])) {
            $_SESSION['teacher_id'] = $user['teacher_id'];
        }

        // Mirrored into the session so MustChangePasswordMiddleware can gate every /teacher
        // route without a DB lookup per request - see teachers.must_change_password.
        if ($user['role'] === 'teacher') {
            $_SESSION['must_change_password'] = !empty($user['must_change_password']);
        }
    }

    /**
     * Get user data for response
     */
    public function getUserData(array $user): array
    {
        $userData = [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'role' => $user['role'],
            'profile_photo' => $user['profile_photo'] ?? null,
            'phone' => $user['phone'] ?? null,
            'is_active' => $user['is_active'],
            'email_verified_at' => $user['email_verified_at'] ?? null
        ];
        
        // Add student-specific fields
        if ($user['role'] === 'student') {
            $userData['first_name'] = $user['first_name'] ?? null;
            $userData['last_name'] = $user['last_name'] ?? null;
            $userData['admission_number'] = $user['admission_number'] ?? null;
        }
        
        // Add teacher_id for HODs who are also teachers
        if ($user['role'] === 'hod' && isset($user['teacher_id'])) {
            $userData['teacher_id'] = $user['teacher_id'];
        }

        // Lets the frontend redirect straight to /teacher/change-password on login instead of
        // waiting for the first blocked API call - see MustChangePasswordMiddleware.
        if ($user['role'] === 'teacher') {
            $userData['must_change_password'] = !empty($user['must_change_password']);
        }

        error_log("getUserData returning: " . json_encode($userData));
        return $userData;
    }

    /**
     * Check if user is locked out
     */
    private function isLockedOut(string $identifier): bool
    {
        $key = "login_attempts_{$identifier}";
        
        if (!isset($_SESSION[$key])) {
            return false;
        }

        $attempts = $_SESSION[$key];
        
        if ($attempts['count'] >= $this->maxLoginAttempts) {
            $lockoutUntil = $attempts['last_attempt'] + $this->lockoutTime;
            if (time() < $lockoutUntil) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get remaining lockout time
     */
    private function getLockoutRemaining(string $identifier): int
    {
        $key = "login_attempts_{$identifier}";
        
        if (!isset($_SESSION[$key])) {
            return 0;
        }

        $attempts = $_SESSION[$key];
        $lockoutUntil = $attempts['last_attempt'] + $this->lockoutTime;
        $remaining = $lockoutUntil - time();

        return max(0, $remaining);
    }

    /**
     * Record failed login attempt
     */
    private function recordFailedAttempt(string $identifier): void
    {
        $key = "login_attempts_{$identifier}";
        
        if (!isset($_SESSION[$key])) {
            $_SESSION[$key] = [
                'count' => 0,
                'last_attempt' => 0
            ];
        }

        $_SESSION[$key]['count']++;
        $_SESSION[$key]['last_attempt'] = time();
    }

    /**
     * Clear failed login attempts
     */
    private function clearFailedAttempts(string $identifier): void
    {
        $key = "login_attempts_{$identifier}";
        unset($_SESSION[$key]);
    }

    /**
     * Get client IP
     */
    private function getClientIp(): string
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $ip = trim($ips[0]);
        } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        }

        return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
    }
}
