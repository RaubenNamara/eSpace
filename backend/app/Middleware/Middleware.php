<?php

declare(strict_types=1);

namespace eSpace\App\Middleware;

use eSpace\App\Controllers\Controller;

/**
 * Base Middleware Class
 * 
 * Provides the foundation for all middleware components.
 * Middleware can intercept requests before they reach controllers.
 */

abstract class Middleware
{
    protected ?Controller $controller;

    /**
     * Constructor
     */
    public function __construct(?Controller $controller)
    {
        $this->controller = $controller;
    }

    /**
     * Handle the incoming request
     * Return true to continue, or call controller methods to stop
     */
    abstract public function handle(): bool;
}
