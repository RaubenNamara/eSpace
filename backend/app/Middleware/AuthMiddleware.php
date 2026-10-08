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
        
        if (!$this->controller->isAuthenticated()) {
            $this->controller->unauthorized('Authentication required');
            return false;
        }

        return true;
    }
}
