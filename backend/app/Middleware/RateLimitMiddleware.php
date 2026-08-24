<?php

declare(strict_types=1);

namespace eSpace\App\Middleware;

use eSpace\App\Controllers\Controller;
use eSpace\Config\Config;
use Predis\Client as RedisClient;

/**
 * Rate Limiting Middleware
 * 
 * Limits the number of requests a user can make within a time window.
 * Uses Redis for distributed rate limiting.
 */

class RateLimitMiddleware extends Middleware
{
    private int $maxRequests;
    private int $windowSeconds;
    private ?RedisClient $redis;

    /**
     * Constructor
     */
    public function __construct(?Controller $controller, int $maxRequests = 60, int $windowSeconds = 60)
    {
        parent::__construct($controller);
        $this->maxRequests = $maxRequests;
        $this->windowSeconds = $windowSeconds;
        $this->redis = $this->getRedisConnection();
    }

    /**
     * Handle rate limiting
     */
    public function handle(): bool
    {
        // If no controller is available, skip rate limiting for public routes
        if ($this->controller === null) {
            return true;
        }
        
        $identifier = $this->getIdentifier();
        $key = "rate_limit:{$identifier}";

        if ($this->redis) {
            return $this->handleWithRedis($key);
        }

        return $this->handleWithSession($key);
    }

    /**
     * Handle rate limiting with Redis
     */
    private function handleWithRedis(string $key): bool
    {
        try {
            $current = $this->redis->incr($key);

            if ($current === 1) {
                $this->redis->expire($key, $this->windowSeconds);
            }

            if ($current > $this->maxRequests) {
                $ttl = $this->redis->ttl($key);
                $this->controller->error(
                    "Rate limit exceeded. Try again in {$ttl} seconds.",
                    429
                );
                return false;
            }

            $this->setRateLimitHeaders($current, $this->maxRequests);
            return true;
        } catch (\Exception $e) {
            // Fallback to session if Redis fails
            return $this->handleWithSession($key);
        }
    }

    /**
     * Handle rate limiting with session
     */
    private function handleWithSession(string $key): bool
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $now = time();
        $windowStart = $now - $this->windowSeconds;

        if (!isset($_SESSION[$key])) {
            $_SESSION[$key] = [
                'requests' => [],
                'count' => 0
            ];
        }

        // Clean old requests outside the window
        $_SESSION[$key]['requests'] = array_filter(
            $_SESSION[$key]['requests'],
            fn($timestamp) => $timestamp > $windowStart
        );

        $_SESSION[$key]['count'] = count($_SESSION[$key]['requests']);

        if ($_SESSION[$key]['count'] >= $this->maxRequests) {
            $oldestRequest = min($_SESSION[$key]['requests']);
            $retryAfter = $oldestRequest + $this->windowSeconds - $now;
            
            $this->controller->error(
                "Rate limit exceeded. Try again in {$retryAfter} seconds.",
                429
            );
            return false;
        }

        $_SESSION[$key]['requests'][] = $now;
        $_SESSION[$key]['count']++;

        $this->setRateLimitHeaders($_SESSION[$key]['count'], $this->maxRequests);
        return true;
    }

    /**
     * Get unique identifier for rate limiting
     */
    private function getIdentifier(): string
    {
        // Use user ID if authenticated, otherwise use IP
        if ($this->controller->isAuthenticated()) {
            return 'user:' . $this->controller->getCurrentUserId();
        }

        return 'ip:' . $this->controller->getClientIp();
    }

    /**
     * Set rate limit headers
     */
    private function setRateLimitHeaders(int $current, int $limit): void
    {
        header("X-RateLimit-Limit: {$limit}");
        header("X-RateLimit-Remaining: " . max(0, $limit - $current));
        header("X-RateLimit-Reset: " . (time() + $this->windowSeconds));
    }

    /**
     * Get Redis connection
     */
    private function getRedisConnection(): ?RedisClient
    {
        try {
            $config = Config::getRedisConfig();
            return new RedisClient([
                'host' => $config['host'],
                'port' => $config['port'],
                'password' => $config['password'],
                'database' => $config['database'],
                'timeout' => 2.0,
            ]);
        } catch (\Exception $e) {
            return null;
        }
    }
}
