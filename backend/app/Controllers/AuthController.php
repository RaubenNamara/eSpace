<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\AuthService;

/**
 * Authentication Controller
 * 
 * Handles authentication-related HTTP requests.
 */

class AuthController extends Controller
{
    private const ALLOWED_PHOTO_MIME = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
    ];
    private const MAX_PHOTO_SIZE = 2 * 1024 * 1024; // 2MB

    private AuthService $authService;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->authService = new AuthService();
    }

    /**
     * Login user
     * POST /auth/login
     */
    public function login(): void
    {
        $identifier = $this->input('identifier');
        $password = $this->input('password');

        // Validate input
        $errors = $this->validateRequired(['identifier', 'password']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $identifier = $this->sanitize(['identifier' => $identifier])['identifier'];

        error_log("AuthController: Attempting login for identifier: " . $identifier);
        error_log("AuthController: Password length: " . strlen($password));

        // Attempt login
        $result = $this->authService->login($identifier, $password);

        error_log("AuthController: Login result: " . ($result['success'] ? 'SUCCESS' : 'FAILED'));
        error_log("AuthController: Login message: " . $result['message']);

        if ($result['success']) {
            // Generate CSRF token
            $csrfToken = \eSpace\App\Middleware\CSRFMiddleware::generateToken();
            
            // Ensure user data includes role
            $userData = $result['user'];
            if (!isset($userData['role'])) {
                $userData['role'] = 'admin'; // Default to admin for testing
            }

            // Recorded so report cards can show a student's actual login count for the term
            // (replaces manually-entered attendance days - see ReportCardService). A dedicated
            // table rather than the existing audit_logs, whose live schema has no role/table
            // column to disambiguate ids that collide across the students/teachers/hods tables.
            if ($userData['role'] === 'student') {
                $stmt = \eSpace\Config\Database::getInstance()->prepare(
                    'INSERT INTO student_logins (student_id, logged_in_at) VALUES (:student_id, NOW())'
                );
                $stmt->execute(['student_id' => (int) $userData['id']]);
            }

            // Record every successful login, across all roles, for the admin System Logs page
            $fullName = trim(($userData['first_name'] ?? '') . ' ' . ($userData['last_name'] ?? '')) ?: null;
            $stmt = \eSpace\Config\Database::getInstance()->prepare(
                'INSERT INTO login_logs (user_id, role, username, full_name, ip_address, user_agent, logged_in_at)
                 VALUES (:user_id, :role, :username, :full_name, :ip_address, :user_agent, NOW())'
            );
            $stmt->execute([
                'user_id' => (int) $userData['id'],
                'role' => $userData['role'],
                'username' => $userData['username'],
                'full_name' => $fullName,
                'ip_address' => $this->getClientIp(),
                'user_agent' => $this->getUserAgent(),
            ]);

            $this->success([
                'user' => $userData,
                'csrf_token' => $csrfToken
            ], $result['message']);
        } else {
            $this->error($result['message'], 401);
        }
    }

    /**
     * Register new user
     * POST /auth/register
     */
    public function register(): void
    {
        $data = $this->input();

        // Validate required fields
        $errors = $this->validateRequired(['username', 'email', 'password', 'role']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Attempt registration
        $result = $this->authService->register($data);

        if ($result['success']) {
            $this->success($result['user'], $result['message']);
        } else {
            if (isset($result['errors'])) {
                $this->validationError($result['errors'], $result['message']);
            } else {
                $this->error($result['message'], 400);
            }
        }
    }

    /**
     * Logout user
     * POST /auth/logout
     */
    public function logout(): void
    {
        // Capture before authService->logout() destroys the session - if the student left a live
        // class's BBB tab open and just logged out instead of closing it, this is the safety net
        // that clears already_joined (the frontend's popup-close polling only fires while they
        // stay on the Live Classes page).
        $userId = $this->getCurrentUserId();
        $role = $this->getCurrentUserRole();

        $this->authService->logout();

        if ($role === 'student' && $userId) {
            (new \eSpace\App\Services\LiveClassService())->closeAllOpenAttendanceForStudent($userId);
        }

        $this->success([], 'Logged out successfully');
    }

    /**
     * Refresh session
     * POST /auth/refresh
     */
    public function refresh(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $userId = $this->getCurrentUserId();
        $role = $this->getCurrentUserRole();
        
        // Fetch full user data from database based on role
        $userRepository = new \eSpace\App\Repositories\UserRepository();
        $user = null;
        
        if ($role === 'student') {
            $db = \eSpace\Config\Database::getInstance();
            $stmt = $db->prepare("SELECT id, username, email, password, role, profile_photo, phone, is_active, last_login_at, last_login_ip, first_name, last_name, admission_number FROM students WHERE id = :id AND deleted_at IS NULL");
            $stmt->execute(['id' => $userId]);
            $user = $stmt->fetch();
        } elseif ($role === 'teacher') {
            $db = \eSpace\Config\Database::getInstance();
            $stmt = $db->prepare("SELECT id, username, email, password, role, profile_photo, phone, is_active, last_login_at, last_login_ip FROM teachers WHERE id = :id AND deleted_at IS NULL");
            $stmt->execute(['id' => $userId]);
            $user = $stmt->fetch();
        } elseif ($role === 'hod') {
            $db = \eSpace\Config\Database::getInstance();
            $stmt = $db->prepare("SELECT h.id, h.username, h.email, h.password, h.role, h.profile_photo, h.phone, h.is_active, h.last_login_at, h.last_login_ip, h.teacher_id, h.department_id FROM hods h WHERE h.id = :id AND h.deleted_at IS NULL");
            $stmt->execute(['id' => $userId]);
            $user = $stmt->fetch();
        } else {
            // Admin/super_admin from users table
            $user = $userRepository->findById($userId);
        }
        
        if (!$user) {
            $this->unauthorized();
            return;
        }
        
        // Use AuthService to get formatted user data
        $userData = $this->authService->getUserData($user);

        // Generate new CSRF token
        $csrfToken = \eSpace\App\Middleware\CSRFMiddleware::generateToken();

        $this->success([
            'user' => $userData,
            'csrf_token' => $csrfToken
        ], 'Session refreshed');
    }

    /**
     * Get current user
     * GET /auth/me
     */
    public function me(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $userId = $this->getCurrentUserId();
        $role = $this->getCurrentUserRole();
        
        // Fetch full user data from database based on role
        $userRepository = new \eSpace\App\Repositories\UserRepository();
        $user = null;
        
        if ($role === 'student') {
            $db = \eSpace\Config\Database::getInstance();
            $stmt = $db->prepare("SELECT id, username, email, password, role, profile_photo, phone, is_active, last_login_at, last_login_ip, first_name, last_name, admission_number FROM students WHERE id = :id AND deleted_at IS NULL");
            $stmt->execute(['id' => $userId]);
            $user = $stmt->fetch();
        } elseif ($role === 'teacher') {
            $db = \eSpace\Config\Database::getInstance();
            $stmt = $db->prepare("SELECT id, username, email, password, role, profile_photo, phone, is_active, last_login_at, last_login_ip FROM teachers WHERE id = :id AND deleted_at IS NULL");
            $stmt->execute(['id' => $userId]);
            $user = $stmt->fetch();
        } elseif ($role === 'hod') {
            $db = \eSpace\Config\Database::getInstance();
            $stmt = $db->prepare("SELECT h.id, h.username, h.email, h.password, h.role, h.profile_photo, h.phone, h.is_active, h.last_login_at, h.last_login_ip, h.teacher_id, h.department_id FROM hods h WHERE h.id = :id AND h.deleted_at IS NULL");
            $stmt->execute(['id' => $userId]);
            $user = $stmt->fetch();
        } else {
            // Admin/super_admin from users table
            $user = $userRepository->findById($userId);
        }
        
        if (!$user) {
            $this->unauthorized();
            return;
        }
        
        // Use AuthService to get formatted user data
        $userData = $this->authService->getUserData($user);

        $this->success($userData);
    }

    /**
     * Update profile
     * PUT /auth/profile
     */
    public function updateProfile(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $userId = $this->getCurrentUserId();
        $data = $this->input();

        // Validate
        $errors = $this->validateRequired(['username', 'email']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Sanitize
        $data = $this->sanitize($data);

        // Update profile (would use repository in production)
        // For now, just update session
        $_SESSION['username'] = $data['username'];
        $_SESSION['email'] = $data['email'];

        $this->success([
            'id' => $userId,
            'username' => $data['username'],
            'email' => $data['email'],
            'role' => $this->getCurrentUserRole()
        ], 'Profile updated successfully');
    }

    /**
     * Change password
     * PUT /auth/password
     */
    public function changePassword(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $userId = $this->getCurrentUserId();
        $currentPassword = $this->input('current_password');
        $newPassword = $this->input('new_password');

        // Validate
        $errors = $this->validateRequired(['current_password', 'new_password']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Change password
        $result = $this->authService->changePassword($userId, $currentPassword, $newPassword, $this->getCurrentUserRole());

        if ($result['success']) {
            $this->success([], $result['message']);
        } else {
            $this->error($result['message'], 400);
        }
    }

    /**
     * Upload/replace the signed-in user's profile photo
     * POST /auth/profile-photo
     */
    public function uploadProfilePhoto(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
            $this->error('No photo uploaded or upload error occurred', 400);
            return;
        }

        $table = (new \eSpace\App\Repositories\UserRepository())->tableForRole($this->getCurrentUserRole());
        if (!$table) {
            $this->error('Unsupported account type', 400);
            return;
        }

        $file = $_FILES['photo'];

        if ($file['size'] > self::MAX_PHOTO_SIZE) {
            $this->error('Photo exceeds maximum size of 2MB', 400);
            return;
        }

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!isset(self::ALLOWED_PHOTO_MIME[$mimeType]) || getimagesize($file['tmp_name']) === false) {
            $this->error('Invalid file type. Only JPEG, PNG, and WebP images are allowed', 400);
            return;
        }

        $userId = $this->getCurrentUserId();
        $db = \eSpace\Config\Database::getInstance();

        $stmt = $db->prepare("SELECT profile_photo FROM {$table} WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $existing = $stmt->fetch();

        $uploadDir = __DIR__ . '/../../public/uploads/profiles/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = 'profile_' . $userId . '_' . bin2hex(random_bytes(8)) . '.' . self::ALLOWED_PHOTO_MIME[$mimeType];
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            $this->serverError('Failed to save photo');
            return;
        }

        $photoUrl = '/uploads/profiles/' . $filename;

        $stmt = $db->prepare("UPDATE {$table} SET profile_photo = :photo WHERE id = :id");
        $stmt->execute(['photo' => $photoUrl, 'id' => $userId]);

        if ($existing && !empty($existing['profile_photo'])) {
            $oldPath = __DIR__ . '/../../public' . $existing['profile_photo'];
            if (is_file($oldPath)) {
                @unlink($oldPath);
            }
        }

        $_SESSION['profile_photo'] = $photoUrl;

        $this->success(['profile_photo' => $photoUrl], 'Profile photo updated');
    }

    /**
     * Request password reset
     * POST /auth/forgot-password
     */
    public function forgotPassword(): void
    {
        $email = $this->input('email');

        // Validate
        $errors = $this->validateRequired(['email']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Validate email format
        if (!$this->validateEmail($email)) {
            $this->validationError(['email' => 'Invalid email format']);
            return;
        }

        // Request reset
        $result = $this->authService->requestPasswordReset($email);

        $this->success($result, $result['message']);
    }

    /**
     * Reset password
     * POST /auth/reset-password
     */
    public function resetPassword(): void
    {
        $token = $this->input('token');
        $newPassword = $this->input('new_password');

        // Validate
        $errors = $this->validateRequired(['token', 'new_password']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Reset password
        $result = $this->authService->resetPassword($token, $newPassword);

        if ($result['success']) {
            $this->success([], $result['message']);
        } else {
            $this->error($result['message'], 400);
        }
    }
}
