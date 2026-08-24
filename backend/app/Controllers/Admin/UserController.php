<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Models\User;

/**
 * Admin User Controller
 * 
 * Handles user management operations for administrators.
 */
class UserController extends Controller
{
    private User $userModel;

    public function __construct()
    {
        parent::__construct();
        $this->userModel = new User();
    }

    /**
     * Get all users
     * GET /admin/users
     */
    public function index(): void
    {
        try {
            if (!$this->isAdmin()) {
                $this->forbidden();
                return;
            }

            $role = $this->input('role', '');
            $search = $this->input('search', '');
            $page = (int) $this->input('page', 1);
            $limit = (int) $this->input('limit', 20);

            error_log("UserController::index - role: $role, search: $search, page: $page, limit: $limit");

            // Regular admins can only see other admins, super admins can see all admin types
            $currentUserRole = $this->getCurrentUserRole();
            error_log("Current user role: $currentUserRole");
            
            if ($role === '') {
                // Default to showing admin and super_admin users
                // For regular admins, they can only see other regular admins
                if ($currentUserRole === 'admin') {
                    $role = 'admin';
                } else {
                    // Super admins see both admin and super_admin by default
                    // We need to handle this differently since paginate only accepts single role
                    // For now, let's show all admin types for super admin
                    $role = 'admin'; // Will be handled by custom query
                }
            }

            error_log("Final role to fetch: $role");

        // For super admins viewing all admin types, we need a custom query
        if ($currentUserRole === 'super_admin' && $role === 'admin') {
            // Custom query to get both admin and super_admin
            $offset = ($page - 1) * $limit;
            $sql = "SELECT * FROM users WHERE (role = 'admin' OR role = 'super_admin') AND deleted_at IS NULL";
            $params = [];
            
            if ($search) {
                $sql .= " AND (username LIKE :search OR email LIKE :search)";
                $params['search'] = "%{$search}%";
            }
            
            // Get total count
            $countSql = "SELECT COUNT(*) as total FROM users WHERE (role = 'admin' OR role = 'super_admin') AND deleted_at IS NULL";
            if ($search) {
                $countSql .= " AND (username LIKE :search OR email LIKE :search)";
            }
            
            $db = $this->userModel->getDb();
            $countStmt = $db->prepare($countSql);
            $countStmt->execute($params);
            $total = (int) $countStmt->fetch()['total'];
            
            // Get paginated results
            $sql .= " ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}";
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $data = $stmt->fetchAll();
            
            $this->success([
                'users' => array_map([$this->userModel, 'hideFields'], $data),
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'pages' => ceil($total / $limit)
                ]
            ]);
            return;
        }

        // Use the User model to get users with filters
        error_log("Using model paginate with role: $role");
        $result = $this->userModel->paginate($page, $limit, [
            'role' => $role,
            'search' => $search
        ]);

        $this->success([
            'users' => array_map([$this->userModel, 'hideFields'], $result['data']),
            'pagination' => $result['pagination']
        ]);
        } catch (\Exception $e) {
            error_log("Error in UserController::index: " . $e->getMessage());
            error_log("Stack trace: " . $e->getTraceAsString());
            $this->error('Failed to fetch users: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Create a new user
     * POST /admin/users
     */
    public function create(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();

        // Validate required fields
        $errors = $this->validateRequired(['username', 'email', 'password', 'role']);

        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        // Validate email
        if (!$this->validateEmail($data['email'])) {
            $this->validationError(['email' => 'Invalid email format']);
            return;
        }

        // Validate role based on current user's role
        $currentUserRole = $this->getCurrentUserRole();
        $validRoles = ['student', 'teacher', 'hod', 'admin'];
        
        // Only super_admin can create super_admin users
        if ($currentUserRole === 'super_admin') {
            $validRoles[] = 'super_admin';
        } else {
            // Regular admins can only create regular admins
            if ($data['role'] !== 'admin') {
                $this->validationError(['role' => 'Regular admins can only create other regular admins']);
                return;
            }
        }
        
        if (!in_array($data['role'], $validRoles)) {
            $this->validationError(['role' => 'Invalid role. Must be one of: ' . implode(', ', $validRoles)]);
            return;
        }

        // Validate password strength
        if (strlen($data['password']) < 8) {
            $this->validationError(['password' => 'Password must be at least 8 characters']);
            return;
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Check if username or email already exists
        $existingUser = $this->userModel->findByUsername($data['username']);
        if ($existingUser) {
            $this->error('Username already exists', 409);
            return;
        }

        $existingEmail = $this->userModel->findByEmail($data['email']);
        if ($existingEmail) {
            $this->error('Email already exists', 409);
            return;
        }

        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        // Insert user using the model
        $userId = $this->userModel->create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $hashedPassword,
            'role' => $data['role'],
            'is_active' => 1
        ]);

        if ($userId) {
            $user = $this->userModel->find($userId);
            $this->success($this->userModel->hideFields($user), 'User created successfully');
        } else {
            // Get database error info
            $errorInfo = $this->db->errorInfo();
            $errorMessage = 'Failed to create user';
            if ($errorInfo && $errorInfo[0] !== '00000') {
                $errorMessage .= ': ' . $errorInfo[2];
            }
            $this->error($errorMessage, 500);
        }
    }

    /**
     * Get user by ID
     * GET /admin/users/{id}
     */
    public function show($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $user = $this->userModel->find($id);

        if (!$user) {
            $this->notFound('User not found');
            return;
        }

        $this->success($this->userModel->hideFields($user));
    }

    /**
     * Update user
     * PUT /admin/users/{id}
     */
    public function update($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        $data = $this->input();

        $user = $this->userModel->find($id);
        if (!$user) {
            $this->notFound('User not found');
            return;
        }

        // Validate email if provided
        if (isset($data['email']) && !$this->validateEmail($data['email'])) {
            $this->validationError(['email' => 'Invalid email format']);
            return;
        }

        // Validate role if provided
        if (isset($data['role'])) {
            $validRoles = ['student', 'teacher', 'hod', 'admin', 'super_admin'];
            if (!in_array($data['role'], $validRoles)) {
                $this->validationError(['role' => 'Invalid role']);
                return;
            }
        }

        // Sanitize input
        $data = $this->sanitize($data);

        // Remove password from update data (use separate endpoint for password change)
        unset($data['password']);

        // Update user
        $result = $this->userModel->update($id, $data);

        if ($result) {
            $updatedUser = $this->userModel->find($id);
            $this->success($this->userModel->hideFields($updatedUser), 'User updated successfully');
        } else {
            $this->error('Failed to update user', 500);
        }
    }

    /**
     * Delete user (soft delete)
     * DELETE /admin/users/{id}
     */
    public function delete($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;

        // Prevent deleting yourself
        if ($id === $this->getCurrentUserId()) {
            $this->error('Cannot delete your own account', 400);
            return;
        }

        $user = $this->userModel->find($id);
        if (!$user) {
            $this->notFound('User not found');
            return;
        }

        // Only super_admin can delete other super_admins
        $currentUserRole = $this->getCurrentUserRole();
        if ($user['role'] === 'super_admin' && $currentUserRole !== 'super_admin') {
            $this->forbidden('Only super admins can delete other super admins');
            return;
        }

        // Soft delete
        $db = $this->userModel->getDb();
        $sql = "UPDATE users SET deleted_at = NOW() WHERE id = :id";
        $stmt = $db->prepare($sql);
        $result = $stmt->execute(['id' => $id]);

        if ($result) {
            $this->success([], 'User deleted successfully');
        } else {
            $this->error('Failed to delete user', 500);
        }
    }

    /**
     * Suspend user
     * PUT /admin/users/{id}/suspend
     */
    public function suspend($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;

        // Prevent suspending yourself
        if ($id === $this->getCurrentUserId()) {
            $this->error('Cannot suspend your own account', 400);
            return;
        }

        $user = $this->userModel->find($id);
        if (!$user) {
            $this->notFound('User not found');
            return;
        }

        // Only super_admin can suspend other super_admins
        $currentUserRole = $this->getCurrentUserRole();
        if ($user['role'] === 'super_admin' && $currentUserRole !== 'super_admin') {
            $this->forbidden('Only super admins can suspend other super admins');
            return;
        }

        $result = $this->userModel->deactivate($id);

        if ($result) {
            $this->success([], 'User suspended successfully');
        } else {
            $this->error('Failed to suspend user', 500);
        }
    }

    /**
     * Restore suspended user
     * PUT /admin/users/{id}/restore
     */
    public function restore($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $id;
        
        $user = $this->userModel->find($id);
        if (!$user) {
            $this->notFound('User not found');
            return;
        }

        // Only super_admin can restore other super_admins
        $currentUserRole = $this->getCurrentUserRole();
        if ($user['role'] === 'super_admin' && $currentUserRole !== 'super_admin') {
            $this->forbidden('Only super admins can restore other super admins');
            return;
        }

        $result = $this->userModel->activate($id);

        if ($result) {
            $this->success([], 'User restored successfully');
        } else {
            $this->error('Failed to restore user', 500);
        }
    }

    /**
     * Check if current user is admin or super_admin
     */
    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
