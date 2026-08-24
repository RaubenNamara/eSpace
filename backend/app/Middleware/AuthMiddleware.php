<?php

declare(strict_types=1);

namespace eSpace\App\Middleware;

use eSpace\App\Controllers\Controller;

/**
 * Authentication Middleware
 * 
 * Verifies that the user is authenticated before allowing access to protected routes.
 */

class AuthMiddleware extends Middleware
{
    /**
     * Handle authentication check
     */
    public function handle(): bool
    {
        error_log("AuthMiddleware: Checking authentication");
        error_log("AuthMiddleware: Session data: " . json_encode($_SESSION));
        error_log("AuthMiddleware: isAuthenticated: " . ($this->controller->isAuthenticated() ? 'true' : 'false'));
        
        if (!$this->controller->isAuthenticated()) {
            $this->controller->unauthorized('Authentication required');
            return false;
        }

        return true;
    }
}
