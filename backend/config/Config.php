<?php

declare(strict_types=1);

namespace eSpace\Config;

use PDO;

/**
 * Application Configuration
 * 
 * Centralized configuration management for the eSpace application.
 * Loads environment variables and provides configuration access.
 */

class Config
{
    private static array $config = [];
    private static bool $loaded = false;

    /**
     * Load configuration from environment file
     */
    public static function load(): void
    {
        if (self::$loaded) {
            return;
        }

        $envFile = __DIR__ . '/../.env';
        
        if (file_exists($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            
            foreach ($lines as $line) {
                // Skip comments
                if (str_starts_with(trim($line), '#')) {
                    continue;
                }

                // Parse key=value pairs
                if (strpos($line, '=') !== false) {
                    list($key, $value) = explode('=', $line, 2);
                    self::$config[trim($key)] = trim($value);
                }
            }
        }

        // Set default values for required config
        self::$config = array_merge([
            'DB_HOST' => 'localhost',
            'DB_PORT' => '3306',
            'DB_NAME' => 'espace',
            'DB_USER' => 'root',
            'DB_PASS' => '',
            'REDIS_HOST' => '127.0.0.1',
            'REDIS_PORT' => '6379',
            'REDIS_PASSWORD' => '',
            'REDIS_DB' => '0',
            'APP_ENV' => 'production',
            'APP_DEBUG' => 'false',
            'APP_URL' => 'http://localhost/eSpace/backend/public',
            'APP_NAME' => 'eSpace',
            'FRONTEND_URL' => 'http://localhost:3000',
            'SESSION_LIFETIME' => '7200',
            'CSRF_TOKEN_NAME' => 'csrf_token',
            'STORAGE_PATH' => __DIR__ . '/../storage',
            'UPLOADS_PATH' => __DIR__ . '/../uploads',
            'MAX_UPLOAD_SIZE' => '52428800',
            'BBB_SERVER_URL' => '',
            'BBB_SECRET' => '',
            'ELEVENLABS_API_KEY' => '',
            'GEMINI_API_KEY' => '',
        ], self::$config);

        self::$loaded = true;
    }

    /**
     * Get configuration value
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        self::load();
        
        return self::$config[$key] ?? $default;
    }

    /**
     * Set configuration value (runtime only)
     */
    public static function set(string $key, mixed $value): void
    {
        self::load();
        self::$config[$key] = $value;
    }

    /**
     * Check if application is in debug mode
     */
    public static function isDebug(): bool
    {
        return self::get('APP_DEBUG') === 'true';
    }

    /**
     * Get database configuration
     */
    public static function getDatabaseConfig(): array
    {
        self::load();
        
        return [
            'host' => self::get('DB_HOST'),
            'port' => (int) self::get('DB_PORT'),
            'database' => self::get('DB_NAME'),
            'username' => self::get('DB_USER'),
            'password' => self::get('DB_PASS'),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'options' => [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        ];
    }

    /**
     * Get BigBlueButton configuration
     */
    public static function getBBBConfig(): array
    {
        self::load();

        return [
            'server_url' => rtrim(self::get('BBB_SERVER_URL'), '/'),
            'secret' => self::get('BBB_SECRET'),
        ];
    }

    /**
     * Get ElevenLabs configuration
     */
    public static function getElevenLabsConfig(): array
    {
        self::load();

        return [
            'api_key' => self::get('ELEVENLABS_API_KEY'),
        ];
    }

    /**
     * Get Gemini configuration
     */
    public static function getGeminiConfig(): array
    {
        self::load();

        return [
            'api_key' => self::get('GEMINI_API_KEY'),
        ];
    }

    /**
     * Get Redis configuration
     */
    public static function getRedisConfig(): array
    {
        self::load();
        
        return [
            'host' => self::get('REDIS_HOST'),
            'port' => (int) self::get('REDIS_PORT'),
            'password' => self::get('REDIS_PASSWORD') ?: null,
            'database' => (int) self::get('REDIS_DB'),
        ];
    }

    /**
     * Get storage path
     */
    public static function getStoragePath(string $path = ''): string
    {
        $basePath = self::get('STORAGE_PATH');
        return $basePath . ($path ? DIRECTORY_SEPARATOR . ltrim($path, DIRECTORY_SEPARATOR) : '');
    }

    /**
     * Get uploads path
     */
    public static function getUploadsPath(string $path = ''): string
    {
        $basePath = self::get('UPLOADS_PATH');
        return $basePath . ($path ? DIRECTORY_SEPARATOR . ltrim($path, DIRECTORY_SEPARATOR) : '');
    }

    /**
     * Get maximum upload size in bytes
     */
    public static function getMaxUploadSize(): int
    {
        return (int) self::get('MAX_UPLOAD_SIZE');
    }
}
