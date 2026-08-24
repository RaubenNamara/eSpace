<?php

declare(strict_types=1);

namespace eSpace\App\Middleware;

use eSpace\App\Controllers\Controller;
use eSpace\Config\Config;

/**
 * CSRF Protection Middleware
 * 
 * Validates CSRF tokens for state-changing requests to prevent cross-site request forgery.
 */

class CSRFMiddleware extends Middleware
{
    /**
     * Handle CSRF validation
     */
    public function handle(): bool
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

        // Skip CSRF check for safe methods
        if (in_array($method, ['GET', 'HEAD', 'OPTIONS'])) {
            return true;
        }

        // Skip CSRF check for login and register routes (public endpoints)
        $uri = $_SERVER['REQUEST_URI'] ?? '';
        if (str_contains($uri, '/auth/login') || str_contains($uri, '/auth/register')) {
            return true;
        }

        $tokenName = Config::get('CSRF_TOKEN_NAME', 'csrf_token');
        $headerToken = $this->controller->header('X-CSRF-Token');
        $bodyToken = $this->controller->input($tokenName);

        $providedToken = $headerToken ?: $bodyToken;

        if (empty($providedToken)) {
            $this->controller->error('CSRF token is missing', 419);
            return false;
        }

        if (!$this->validateToken($providedToken)) {
            $this->controller->error('Invalid CSRF token', 419);
            return false;
        }

        return true;
    }

    /**
     * Validate CSRF token
     */
    private function validateToken(string $token): bool
    {
        if (!isset($_SESSION['csrf_token'])) {
            return false;
        }

        return hash_equals($_SESSION['csrf_token'], $token);
    }

    /**
     * Generate new CSRF token
     */
    public static function generateToken(): string
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $token = bin2hex(random_bytes(32));
        $_SESSION['csrf_token'] = $token;

        return $token;
    }

    /**
     * Get current CSRF token
     */
    public static function getToken(): ?string
    {
        return $_SESSION['csrf_token'] ?? null;
    }
}
