<?php

declare(strict_types=1);

namespace eSpace\App\Repositories;

use eSpace\App\Models\User;
use eSpace\App\Repositories\Repository;

/**
 * User Repository
 * 
 * Handles data access operations for users.
 */

class UserRepository extends Repository
{
    private User $userModel;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->userModel = new User();
        parent::__construct($this->userModel);
    }

    /**
     * Find user by username
     */
    public function findByUsername(string $username): ?array
    {
        return $this->userModel->findByUsername($username);
    }

    /**
     * Find user by email
     */
    public function findByEmail(string $email): ?array
    {
        return $this->userModel->findByEmail($email);
    }

    /**
     * Find user by username or email (checks all role tables)
     */
    public function findByUsernameOrEmail(string $identifier): ?array
    {
        // First check users table (for admin/super_admin)
        $user = $this->userModel->findByUsernameOrEmail($identifier);
        if ($user && in_array($user['role'], ['admin', 'super_admin'])) {
            return $user;
        }

        // Check hods table before teachers: "Assign Teacher as HOD" copies the teacher's own
        // username/email into the new hods row (by design, so the HOD can dual-role as their
        // underlying teacher account via secondaryRole/switchRole on the frontend). If teachers
        // were checked first, that same username would always resolve as a plain teacher and the
        // person could never actually reach their HOD identity - the primary role for a dual-role
        // person must be 'hod' (with teacher_id carried along) so the frontend's dual-role switch
        // has something to switch away from.
        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare("SELECT h.id, h.username, h.email, h.password, h.role, h.profile_photo, h.phone, h.is_active, h.last_login_at, h.last_login_ip, h.teacher_id, h.department_id, 'hod' as table_name FROM hods h WHERE (h.username = :identifier5 OR h.email = :identifier6) AND h.deleted_at IS NULL");
        $stmt->execute(['identifier5' => $identifier, 'identifier6' => $identifier]);
        $hod = $stmt->fetch();
        if ($hod) {
            return $hod;
        }

        // Check teachers table directly
        $stmt = $db->prepare("SELECT id, username, email, password, role, profile_photo, phone, is_active, last_login_at, last_login_ip, 'teacher' as table_name FROM teachers WHERE (username = :identifier1 OR email = :identifier2) AND deleted_at IS NULL");
        $stmt->execute(['identifier1' => $identifier, 'identifier2' => $identifier]);
        $teacher = $stmt->fetch();
        if ($teacher) {
            return $teacher;
        }

        // Check students table directly
        $stmt = $db->prepare("SELECT id, username, email, password, role, profile_photo, phone, is_active, last_login_at, last_login_ip, first_name, last_name, admission_number, 'student' as table_name FROM students WHERE (username = :identifier3 OR email = :identifier4) AND deleted_at IS NULL");
        $stmt->execute(['identifier3' => $identifier, 'identifier4' => $identifier]);
        $student = $stmt->fetch();
        if ($student) {
            return $student;
        }

        return null;
    }

    /**
     * Update last login (works with all role tables)
     */
    public function updateLastLogin(int $userId, string $ip): bool
    {
        $db = \eSpace\Config\Database::getInstance();
        
        // Try users table first (admin/super_admin)
        $stmt = $db->prepare("UPDATE users SET last_login_at = NOW(), last_login_ip = :ip WHERE id = :id");
        $result = $stmt->execute(['ip' => $ip, 'id' => $userId]);
        if ($result && $stmt->rowCount() > 0) {
            return true;
        }

        // Try teachers table
        $stmt = $db->prepare("UPDATE teachers SET last_login_at = NOW(), last_login_ip = :ip WHERE id = :id");
        $result = $stmt->execute(['ip' => $ip, 'id' => $userId]);
        if ($result && $stmt->rowCount() > 0) {
            return true;
        }

        // Try students table
        $stmt = $db->prepare("UPDATE students SET last_login_at = NOW(), last_login_ip = :ip WHERE id = :id");
        $result = $stmt->execute(['ip' => $ip, 'id' => $userId]);
        if ($result && $stmt->rowCount() > 0) {
            return true;
        }

        // Try hods table
        $stmt = $db->prepare("UPDATE hods SET last_login_at = NOW(), last_login_ip = :ip WHERE id = :id");
        $result = $stmt->execute(['ip' => $ip, 'id' => $userId]);
        if ($result && $stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    /**
     * Heartbeat: mark a user active right now (works with all role tables, same lookup order as
     * updateLastLogin). Called periodically while the user has the app open, so chat can show an
     * online indicator - last_login_at alone can't do this since it only ever updates at login.
     */
    public function updateLastActive(int $userId): bool
    {
        $db = \eSpace\Config\Database::getInstance();

        $stmt = $db->prepare("UPDATE users SET last_active_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        if ($stmt->rowCount() > 0) {
            return true;
        }

        $stmt = $db->prepare("UPDATE teachers SET last_active_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        if ($stmt->rowCount() > 0) {
            return true;
        }

        $stmt = $db->prepare("UPDATE students SET last_active_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        if ($stmt->rowCount() > 0) {
            return true;
        }

        $stmt = $db->prepare("UPDATE hods SET last_active_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        if ($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    /**
     * Which table a role's row lives in - lets a caller who already knows the role (e.g. from
     * the session) target the exact row instead of the id-only "try every table in order" guess
     * below, which can silently match the wrong person when ids collide across role tables (this
     * app has confirmed collisions, e.g. a student and an admin sharing id 1).
     */
    public function tableForRole(?string $role): ?string
    {
        return match ($role) {
            'student' => 'students',
            'teacher' => 'teachers',
            'hod' => 'hods',
            'admin', 'super_admin' => 'users',
            default => null,
        };
    }

    /**
     * Find a user by id within the one table their role actually lives in.
     */
    public function findByIdAndRole(int $id, string $role): ?array
    {
        $table = $this->tableForRole($role);
        if (!$table) {
            return null;
        }

        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare("SELECT * FROM {$table} WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch() ?: null;
    }

    /**
     * Update a password within the one table the given role actually lives in.
     */
    public function updatePasswordForRole(int $id, string $role, string $hashedPassword): bool
    {
        $table = $this->tableForRole($role);
        if (!$table) {
            return false;
        }

        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare("UPDATE {$table} SET password = :password WHERE id = :id");
        return $stmt->execute(['password' => $hashedPassword, 'id' => $id]) && $stmt->rowCount() > 0;
    }

    /**
     * Update password (works with all role tables) - id-only guess used where the caller has no
     * known role to scope by (e.g. the forgot-password flow, resolved by email instead of a
     * session). Prefer updatePasswordForRole() wherever the role is already known.
     */
    public function updatePassword(int $userId, string $hashedPassword): bool
    {
        $db = \eSpace\Config\Database::getInstance();
        
        // Try users table first (admin/super_admin)
        $stmt = $db->prepare("UPDATE users SET password = :password WHERE id = :id");
        $result = $stmt->execute(['password' => $hashedPassword, 'id' => $userId]);
        if ($result && $stmt->rowCount() > 0) {
            return true;
        }

        // Try teachers table
        $stmt = $db->prepare("UPDATE teachers SET password = :password WHERE id = :id");
        $result = $stmt->execute(['password' => $hashedPassword, 'id' => $userId]);
        if ($result && $stmt->rowCount() > 0) {
            return true;
        }

        // Try students table
        $stmt = $db->prepare("UPDATE students SET password = :password WHERE id = :id");
        $result = $stmt->execute(['password' => $hashedPassword, 'id' => $userId]);
        if ($result && $stmt->rowCount() > 0) {
            return true;
        }

        // Try hods table
        $stmt = $db->prepare("UPDATE hods SET password = :password WHERE id = :id");
        $result = $stmt->execute(['password' => $hashedPassword, 'id' => $userId]);
        if ($result && $stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    /**
     * Verify email
     */
    public function verifyEmail(int $userId): bool
    {
        return $this->userModel->verifyEmail($userId);
    }

    /**
     * Activate user
     */
    public function activate(int $userId): bool
    {
        return $this->userModel->activate($userId);
    }

    /**
     * Deactivate user
     */
    public function deactivate(int $userId): bool
    {
        return $this->userModel->deactivate($userId);
    }

    /**
     * Check if user is active (works with all role tables)
     */
    public function isActive(int $userId): bool
    {
        $db = \eSpace\Config\Database::getInstance();
        
        // Try users table first (admin/super_admin)
        $stmt = $db->prepare("SELECT is_active FROM users WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $result = $stmt->fetch();
        if ($result) {
            return (bool) $result['is_active'];
        }

        // Try teachers table
        $stmt = $db->prepare("SELECT is_active FROM teachers WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $result = $stmt->fetch();
        if ($result) {
            return (bool) $result['is_active'];
        }

        // Try students table
        $stmt = $db->prepare("SELECT is_active FROM students WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $result = $stmt->fetch();
        if ($result) {
            return (bool) $result['is_active'];
        }

        // Try hods table
        $stmt = $db->prepare("SELECT is_active FROM hods WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $result = $stmt->fetch();
        if ($result) {
            return (bool) $result['is_active'];
        }

        return false;
    }

    /**
     * Get users by role
     */
    public function getByRole(string $role): array
    {
        return $this->userModel->all(['role' => $role]);
    }

    /**
     * Get active users only
     */
    public function getActiveUsers(array $conditions = []): array
    {
        return $this->userModel->all(array_merge($conditions, ['is_active' => 1]));
    }
}
