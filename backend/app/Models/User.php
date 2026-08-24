<?php

declare(strict_types=1);

namespace eSpace\App\Models;

use eSpace\App\Models\Model;

/**
 * User Model
 * 
 * Handles user data operations including authentication-related queries.
 */

class User extends Model
{
    protected string $table = 'users';
    protected string $primaryKey = 'id';
    protected array $fillable = [
        'username',
        'email',
        'password',
        'role',
        'profile_photo',
        'phone',
        'is_active',
        'email_verified_at',
        'last_login_at',
        'last_login_ip'
    ];
    protected array $hidden = ['password'];

    /**
     * Find user by username
     */
    public function findByUsername(string $username): ?array
    {
        return $this->first(['username' => $username]);
    }

    /**
     * Find user by email
     */
    public function findByEmail(string $email): ?array
    {
        return $this->first(['email' => $email]);
    }

    /**
     * Find user by username or email
     */
    public function findByUsernameOrEmail(string $identifier): ?array
    {
        $sql = "SELECT * FROM {$this->table} 
                WHERE (username = :username OR email = :email)
                AND deleted_at IS NULL 
                LIMIT 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['username' => $identifier, 'email' => $identifier]);
        $result = $stmt->fetch();

        if ($result) {
            // Don't hide password for authentication purposes
            return $result;
        }

        return null;
    }

    /**
     * Update last login information
     */
    public function updateLastLogin(int $userId, string $ip): bool
    {
        $sql = "UPDATE {$this->table} 
                SET last_login_at = NOW(), last_login_ip = :ip 
                WHERE {$this->primaryKey} = :id";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute(['ip' => $ip, 'id' => $userId]);
    }

    /**
     * Update password
     */
    public function updatePassword(int $userId, string $hashedPassword): bool
    {
        return $this->update($userId, ['password' => $hashedPassword]);
    }

    /**
     * Verify email
     */
    public function verifyEmail(int $userId): bool
    {
        return $this->update($userId, ['email_verified_at' => date('Y-m-d H:i:s')]);
    }

    /**
     * Activate user
     */
    public function activate(int $userId): bool
    {
        return $this->update($userId, ['is_active' => 1]);
    }

    /**
     * Deactivate user
     */
    public function deactivate(int $userId): bool
    {
        return $this->update($userId, ['is_active' => 0]);
    }

    /**
     * Check if user is active
     */
    public function isActive(int $userId): bool
    {
        $user = $this->find($userId);
        return $user && $user['is_active'] == 1;
    }
}
