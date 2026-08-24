<?php

declare(strict_types=1);

namespace eSpace\Routes;

use eSpace\App\Controllers\Controller;
use eSpace\App\Middleware\AuthMiddleware;
use eSpace\App\Middleware\RoleMiddleware;
use eSpace\App\Middleware\CSRFMiddleware;
use eSpace\App\Middleware\RateLimitMiddleware;

/**
 * Router Class
 * 
 * Handles URL routing and middleware execution.
 * Maps HTTP requests to controller methods.
 */

class Router
{
    private static array $routes = [];
    private static array $middleware = [];
    private static array $groupMiddleware = [];
    private static string $currentGroupPrefix = '';

    /**
     * Register a GET route
     */
    public static function get(string $path, array|string $handler, array $middleware = []): void
    {
        self::addRoute('GET', $path, $handler, $middleware);
    }

    /**
     * Register a POST route
     */
    public static function post(string $path, array|string $handler, array $middleware = []): void
    {
        self::addRoute('POST', $path, $handler, $middleware);
    }

    /**
     * Register a PUT route
     */
    public static function put(string $path, array|string $handler, array $middleware = []): void
    {
        self::addRoute('PUT', $path, $handler, $middleware);
    }

    /**
     * Register a PATCH route
     */
    public static function patch(string $path, array|string $handler, array $middleware = []): void
    {
        self::addRoute('PATCH', $path, $handler, $middleware);
    }

    /**
     * Register a DELETE route
     */
    public static function delete(string $path, array|string $handler, array $middleware = []): void
    {
        self::addRoute('DELETE', $path, $handler, $middleware);
    }

    /**
     * Add route to registry
     */
    private static function addRoute(string $method, string $path, array|string $handler, array $middleware): void
    {
        $fullPath = self::$currentGroupPrefix . $path;
        
        // Merge group middleware with route middleware
        $allMiddleware = array_merge(self::$groupMiddleware, $middleware);

        self::$routes[$method][$fullPath] = [
            'handler' => $handler,
            'middleware' => $allMiddleware
        ];
    }

    /**
     * Create a route group with shared middleware and prefix
     */
    public static function group(array $attributes, callable $callback): void
    {
        $previousPrefix = self::$currentGroupPrefix;
        $previousMiddleware = self::$groupMiddleware;

        if (isset($attributes['prefix'])) {
            self::$currentGroupPrefix .= $attributes['prefix'];
        }

        if (isset($attributes['middleware'])) {
            self::$groupMiddleware = array_merge(
                self::$groupMiddleware,
                (array) $attributes['middleware']
            );
        }

        $callback();

        // Restore previous state
        self::$currentGroupPrefix = $previousPrefix;
        self::$groupMiddleware = $previousMiddleware;
    }

    /**
     * Dispatch the incoming request
     */
    public static function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $uri = self::getRequestUri();

        // Handle OPTIONS requests for CORS
        if ($method === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        // Find matching route
        $route = self::findRoute($method, $uri);

        if (!$route) {
            self::notFound();
            return;
        }

        // Extract parameters
        $params = self::extractParams($uri, $route['pattern']);

        // Execute handler
        self::executeHandler($route['handler'], $params, $route['middleware'], $route['pattern']);
    }

    /**
     * Get request URI
     */
    private static function getRequestUri(): string
    {
        $uri = $_SERVER['REQUEST_URI'] ?? '/';

        // Remove query string
        if (($pos = strpos($uri, '?')) !== false) {
            $uri = substr($uri, 0, $pos);
        }

        // Remove base path if configured - this is the direct-hit case, where the request
        // physically lives under this script's own directory (e.g. /backend/public/api/... hit
        // straight on, or Vite's dev proxy forwarding /api/... through unchanged).
        $basePath = self::getBasePath();
        if ($basePath && str_starts_with($uri, $basePath)) {
            $uri = substr($uri, strlen($basePath));
        } elseif (($apiPos = strpos($uri, '/api/')) !== false) {
            // Reached through a rewritten alias instead (e.g. production's public-facing
            // /eSpace/api/... rewritten in .htaccess to this script) - SCRIPT_NAME then reflects
            // this script's own physical path, which the original REQUEST_URI never lived under,
            // so the stripping above can't match. Every API route is registered under /api, so
            // anchor on that segment instead.
            $uri = substr($uri, $apiPos);
        }

        return '/' . trim($uri, '/');
    }

    /**
     * Get base path from configuration
     */
    private static function getBasePath(): string
    {
        $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
        return dirname($scriptName);
    }

    /**
     * Find matching route
     */
    private static function findRoute(string $method, string $uri): ?array
    {
        if (!isset(self::$routes[$method])) {
            return null;
        }

        foreach (self::$routes[$method] as $pattern => $route) {
            $regex = self::convertToRegex($pattern);
            
            if (preg_match($regex, $uri, $matches)) {
                return [
                    'handler' => $route['handler'],
                    'middleware' => $route['middleware'],
                    'pattern' => $pattern
                ];
            }
        }

        return null;
    }

    /**
     * Convert route pattern to regex
     */
    private static function convertToRegex(string $pattern): string
    {
        // Replace {id} style parameters with regex
        $pattern = preg_replace('/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/', '([^/]+)', $pattern);
        
        // Escape special characters except for the capture groups
        $pattern = str_replace('/', '\/', $pattern);
        
        return '/^' . $pattern . '$/';
    }

    /**
     * Extract parameters from URI
     */
    private static function extractParams(string $uri, string $pattern): array
    {
        $params = [];
        $regex = self::convertToRegex($pattern);
        
        if (preg_match($regex, $uri, $matches)) {
            array_shift($matches); // Remove full match
            $params = $matches;
        }

        return $params;
    }

    /**
     * Execute route handler with middleware
     */
    private static function executeHandler(array|string $handler, array $params, array $middleware, string $pattern = ''): void
    {
        error_log("Router: executeHandler called");
        error_log("Handler: " . (is_array($handler) ? $handler[0] . '@' . $handler[1] : $handler));
        
        // Parse string handler format "Controller@method"
        if (is_string($handler) && str_contains($handler, '@')) {
            [$controllerClass, $method] = explode('@', $handler);
            $handler = [$controllerClass, $method];
        }
        
        // Instantiate controller
        $controller = null;
        if (is_array($handler)) {
            [$controllerClass, $method] = $handler;
            try {
                error_log("Instantiating controller: " . $controllerClass);
                $controller = new $controllerClass();
                error_log("Controller instantiated successfully");
            } catch (\Exception $e) {
                error_log("Controller instantiation failed: " . $e->getMessage());
                http_response_code(500);
                header('Content-Type: application/json');
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to instantiate controller: ' . $controllerClass,
                    'error' => $e->getMessage()
                ]);
                exit;
            }
        } else {
            // For closure handlers
            $method = $handler;
        }

        error_log("Executing middleware");
        // Execute middleware
        foreach ($middleware as $mw) {
            $middlewareInstance = self::instantiateMiddleware($mw, $controller);
            
            if ($middlewareInstance && !$middlewareInstance->handle()) {
                error_log("Middleware blocked request: " . $mw);
                return; // Middleware stopped the request
            }
        }

        error_log("Executing handler method: " . $method);
        // Execute handler
        try {
            if ($controller) {
                error_log("Controller is not null, type: " . get_class($controller));
                error_log("Checking if method exists: " . $method);
                error_log("Method exists: " . method_exists($controller, $method) ? 'yes' : 'no');
                
                if (!method_exists($controller, $method)) {
                    error_log("ERROR: Method does not exist!");
                    http_response_code(500);
                    header('Content-Type: application/json');
                    echo json_encode([
                        'success' => false,
                        'message' => 'Method does not exist: ' . $method
                    ]);
                    exit;
                }
                
                // Set global route parameters for controllers that use routeParam()
                global $routeParams;
                $routeParams = [];
                
                // Extract parameter names from the pattern
                preg_match_all('/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/', $pattern, $paramNames);
                
                // Map parameter names to values
                foreach ($paramNames[1] as $index => $paramName) {
                    if (isset($params[$index])) {
                        $routeParams[$paramName] = $params[$index];
                    }
                }
                
                error_log("Route parameters set: " . json_encode($routeParams));
                error_log("Calling controller method directly");
                $controller->$method(...$params);
                error_log("Handler method executed successfully");
            } elseif (is_callable($handler)) {
                call_user_func_array($handler, $params);
            }
        } catch (\Exception $e) {
            error_log("Handler execution failed: " . $e->getMessage());
            error_log("Exception trace: " . $e->getTraceAsString());
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Handler execution failed',
                'error' => $e->getMessage()
            ]);
            exit;
        }
        
        error_log("executeHandler completed");
    }

    /**
     * Instantiate middleware
     */
    private static function instantiateMiddleware(string $middleware, ?Controller $controller): ?object
    {
        // Skip middleware if controller is not available (for public routes)
        if ($controller === null && in_array($middleware, ['rate_limit'])) {
            return null;
        }
        
        // Handle role middleware (format: role:admin,role:teacher, etc.)
        if (str_starts_with($middleware, 'role:')) {
            $roles = explode(':', $middleware)[1];
            $rolesArray = explode(',', $roles);
            return self::instantiateRoleMiddleware($rolesArray, $controller);
        }
        
        return match ($middleware) {
            'auth' => new AuthMiddleware($controller),
            'csrf' => new CSRFMiddleware($controller),
            'rate_limit' => new RateLimitMiddleware($controller),
            default => null
        };
    }

    /**
     * Instantiate role middleware with parameters
     */
    private static function instantiateRoleMiddleware(array $roles, ?Controller $controller): RoleMiddleware
    {
        return new RoleMiddleware($controller, $roles);
    }

    /**
     * Handle 404 Not Found
     */
    private static function notFound(): void
    {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Route not found'
        ]);
        exit;
    }

    /**
     * Get all registered routes (for debugging)
     */
    public static function getRoutes(): array
    {
        return self::$routes;
    }
}
