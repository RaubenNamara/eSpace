<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\Config\Config;

/**
 * Base Controller Class
 * 
 * Provides common functionality for all controllers.
 * Handles JSON responses, request validation, and HTTP methods.
 */

abstract class Controller
{
    protected array $requestData = [];
    protected array $queryParams = [];
    protected array $headers = [];

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->parseRequest();
    }

    /**
     * Parse incoming request data
     */
    protected function parseRequest(): void
    {
        $this->queryParams = $_GET;
        
        // Handle getallheaders() not available in CLI
        if (function_exists('getallheaders')) {
            $this->headers = getallheaders();
        } else {
            $this->headers = [];
            foreach ($_SERVER as $key => $value) {
                if (str_starts_with($key, 'HTTP_')) {
                    $header = str_replace('HTTP_', '', $key);
                    $header = str_replace('_', '-', $header);
                    $this->headers[$header] = $value;
                }
            }
        }

        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        
        if (strpos($contentType, 'application/json') !== false || strpos($contentType, 'json') !== false) {
            $rawInput = file_get_contents('php://input');
            if (!empty($rawInput)) {
                $this->requestData = json_decode($rawInput, true) ?? [];
            } else {
                $this->requestData = [];
            }
        } else {
            $this->requestData = $_POST;
        }
    }

    /**
     * Get request data
     */
    protected function input(string $key = null, mixed $default = null): mixed
    {
        if ($key === null) {
            return $this->requestData;
        }

        return $this->requestData[$key] ?? $default;
    }

    /**
     * Get query parameter
     */
    protected function query(string $key = null, mixed $default = null): mixed
    {
        if ($key === null) {
            return $this->queryParams;
        }

        return $this->queryParams[$key] ?? $default;
    }

    /**
     * Get header value
     */
    protected function header(string $key, mixed $default = null): mixed
    {
        return $this->headers[$key] ?? $default;
    }

    /**
     * Send JSON response
     */
    protected function json(array $data, int $statusCode = 200): void
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Stream a CSV file download and end the request - bypasses json()/success() since a file
     * download isn't a JSON envelope. $rows is an array of associative arrays; $columns maps
     * output header label => array key, so callers don't need to pre-flatten their data.
     *
     * @param array<string, string> $columns Header label => row array key
     * @param array<int, array<string, mixed>> $rows
     */
    protected function downloadCsv(string $filename, array $columns, array $rows): void
    {
        http_response_code(200);
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . str_replace('"', '', $filename) . '"');

        $out = fopen('php://output', 'w');
        // Excel needs a UTF-8 BOM to render non-ASCII (e.g. names with accents) correctly.
        fwrite($out, "\xEF\xBB\xBF");
        fputcsv($out, array_keys($columns));

        foreach ($rows as $row) {
            fputcsv($out, array_map(fn($key) => $row[$key] ?? '', array_values($columns)));
        }

        fclose($out);
        exit;
    }

    /**
     * Send success response
     */
    protected function success(array $data = [], string $message = 'Success'): void
    {
        $this->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], 200);
    }

    /**
     * Send error response
     */
    public function error(string $message, int $statusCode = 400, array $errors = []): void
    {
        $response = [
            'success' => false,
            'message' => $message
        ];

        if (!empty($errors)) {
            $response['errors'] = $errors;
        }

        $this->json($response, $statusCode);
    }

    /**
     * Send validation error response
     */
    protected function validationError(array $errors, string $message = 'Validation failed'): void
    {
        $this->error($message, 422, $errors);
    }

    /**
     * Send unauthorized response
     */
    public function unauthorized(string $message = 'Unauthorized'): void
    {
        $this->error($message, 401);
    }

    /**
     * Send forbidden response
     */
    public function forbidden(string $message = 'Forbidden'): void
    {
        $this->error($message, 403);
    }

    /**
     * Send not found response
     */
    protected function notFound(string $message = 'Resource not found'): void
    {
        $this->error($message, 404);
   }

    /**
     * Send server error response
     */
    protected function serverError(string $message = 'Internal server error'): void
    {
        if (Config::isDebug()) {
            $this->error($message, 500);
        } else {
            $this->error('An error occurred', 500);
        }
    }

    /**
     * Validate required fields
     */
    protected function validateRequired(array $fields, array $data = null): array
    {
        $data = $data ?? $this->requestData;
        $errors = [];

        foreach ($fields as $field) {
            if (!isset($data[$field])) {
                $errors[$field] = "The {$field} field is required";
            } else {
                // Check if value is empty (handle both strings and non-strings)
                $value = $data[$field];
                if (is_string($value)) {
                    if (trim($value) === '') {
                        $errors[$field] = "The {$field} field is required";
                    }
                } elseif (is_numeric($value)) {
                    // Numeric values (including 0) are considered valid
                    // Only check if it's actually null or empty in a different way
                    if ($value === null || $value === '') {
                        $errors[$field] = "The {$field} field is required";
                    }
                } elseif (empty($value)) {
                    $errors[$field] = "The {$field} field is required";
                }
            }
        }

        return $errors;
    }

    /**
     * Validate email format
     */
    protected function validateEmail(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Sanitize input data
     */
    protected function sanitize(array $data): array
    {
        $sanitized = [];
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $sanitized[$key] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
            } elseif (is_array($value)) {
                $sanitized[$key] = $this->sanitize($value);
            } else {
                $sanitized[$key] = $value;
            }
        }
        return $sanitized;
    }

    /**
     * Get current user ID from session
     */
    protected function getCurrentUserId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Get current user role from session
     */
    protected function getCurrentUserRole(): ?string
    {
        return $_SESSION['role'] ?? null;
    }

    /**
     * Check if user is authenticated
     */
    public function isAuthenticated(): bool
    {
        return isset($_SESSION['user_id']) && isset($_SESSION['role']);
    }

    /**
     * Require authentication (throw error if not authenticated)
     */
    protected function requireAuth(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
        }
    }

    /**
     * Require specific role (throw error if user doesn't have role)
     */
    protected function requireRole(string $role): void
    {
        if (!$this->hasRole($role)) {
            $this->forbidden();
        }
    }

    /**
     * Check if user has specific role
     */
    protected function hasRole(string $role): bool
    {
        $currentRole = $this->getCurrentUserRole();
        if ($currentRole === $role) {
            return true;
        }

        // A HOD assigned from an existing teacher account ("Assign Teacher as HOD") keeps full
        // teacher access via their linked teacher_id (stored in session at login - see
        // AuthService::createSession). This is the dual-role bridge that lets them act as HOD
        // (department oversight) and as their underlying teacher account without a second login.
        if ($role === 'teacher' && $currentRole === 'hod' && !empty($_SESSION['teacher_id'])) {
            return true;
        }

        return false;
    }

    /**
     * Check if user has any of the specified roles
     */
    public function hasAnyRole(array $roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Make $departmentId the given teacher's primary department: demotes any other membership
     * row to non-primary, then upserts the membership row for $departmentId as primary. Does
     * NOT remove the teacher's other department memberships - a teacher can belong to more than
     * one department, this only changes which one is "active" (teachers.department_id, which the
     * rest of the app - dashboards, content stamping, HOD scoping that still reads the column
     * directly - continues to treat as the teacher's department). Callers are still responsible
     * for updating teachers.department_id itself; this only keeps the membership table in sync.
     */
    protected function syncTeacherPrimaryDepartment(int $teacherId, int $departmentId): void
    {
        $db = \eSpace\Config\Database::getInstance();

        $demote = $db->prepare("UPDATE teacher_department_assignments SET is_primary = 0 WHERE teacher_id = :teacher_id AND department_id != :department_id");
        $demote->execute(['teacher_id' => $teacherId, 'department_id' => $departmentId]);

        $existing = $db->prepare("SELECT id FROM teacher_department_assignments WHERE teacher_id = :teacher_id AND department_id = :department_id");
        $existing->execute(['teacher_id' => $teacherId, 'department_id' => $departmentId]);

        if ($existing->fetch()) {
            $update = $db->prepare("UPDATE teacher_department_assignments SET is_primary = 1 WHERE teacher_id = :teacher_id AND department_id = :department_id");
            $update->execute(['teacher_id' => $teacherId, 'department_id' => $departmentId]);
        } else {
            $insert = $db->prepare("INSERT INTO teacher_department_assignments (teacher_id, department_id, is_primary, created_at, updated_at) VALUES (:teacher_id, :department_id, 1, NOW(), NOW())");
            $insert->execute(['teacher_id' => $teacherId, 'department_id' => $departmentId]);
        }
    }

    /**
     * Resolve the teachers.id backing the current session, honoring the HOD/teacher dual-role
     * bridge (an HOD assigned from an existing teacher account acts as that teacher via
     * $_SESSION['teacher_id'] - see AuthService::createSession and Controller::hasRole()).
     */
    protected function resolveActiveTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return !empty($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        }

        return $this->getCurrentUserId();
    }

    /**
     * The teacher's department for the current login session - what their dashboard, roster
     * views, and new content they create are scoped to. Distinct from teachers.department_id
     * ("primary", admin-controlled - see syncTeacherPrimaryDepartment()): a teacher who belongs
     * to more than one department (teacher_department_assignments) can switch their *active*
     * one for the session via PUT /teacher/departments/active, without changing their primary.
     * Defaults to and caches their primary department_id the first time it's read in a session.
     */
    protected function getActiveDepartmentId(): ?int
    {
        if (isset($_SESSION['active_department_id'])) {
            return (int) $_SESSION['active_department_id'];
        }

        $teacherId = $this->resolveActiveTeacherId();
        if (!$teacherId) {
            return null;
        }

        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare("SELECT department_id FROM teachers WHERE id = :teacher_id AND deleted_at IS NULL");
        $stmt->execute(['teacher_id' => $teacherId]);
        $teacher = $stmt->fetch();

        if (!$teacher || $teacher['department_id'] === null) {
            return null;
        }

        $departmentId = (int) $teacher['department_id'];
        $_SESSION['active_department_id'] = $departmentId;

        return $departmentId;
    }

    /**
     * Get client IP address
     */
    protected function getClientIp(): string
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        
        // Check for proxy headers
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $ip = trim($ips[0]);
        } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        }

        return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
    }

    /**
     * Get user agent
     */
    protected function getUserAgent(): string
    {
        return $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
    }

    /**
     * Get route parameter
     */
    protected function routeParam(string $key, mixed $default = null): mixed
    {
        global $routeParams;
        return $routeParams[$key] ?? $default;
    }
}
