<?php

declare(strict_types=1);

namespace eSpace\App\Middleware;

use eSpace\App\Controllers\Controller;

/**
 * Role-Based Access Control Middleware
 * 
 * Verifies that the user has the required role to access the route.
 */

class RoleMiddleware extends Middleware
{
    private array $allowedRoles;

    /**
     * Constructor
     */
    public function __construct(Controller $controller, array $allowedRoles)
    {
        parent::__construct($controller);
        $this->allowedRoles = $allowedRoles;
    }

    /**
     * Handle role check
     */
    public function handle(): bool
    {
        if (!$this->controller->isAuthenticated()) {
            $this->controller->unauthorized('Authentication required');
            return false;
        }

        if (!$this->controller->hasAnyRole($this->allowedRoles)) {
            $this->controller->forbidden('Insufficient permissions');
            return false;
        }

        return true;
    }
}
