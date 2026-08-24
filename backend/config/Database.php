<?php

declare(strict_types=1);

namespace eSpace\Config;

use PDO;
use PDOException;

/**
 * Database Connection Manager
 * 
 * Singleton pattern for managing database connections.
 * Provides PDO instance with secure configuration.
 */

class Database
{
    private static ?PDO $instance = null;
    private static array $config = [];

    /**
     * Get database instance (Singleton)
     * Reconnects if the connection has been lost (MySQL server has gone away)
     */
    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            self::connect();
        }

        // Test the connection and reconnect if needed
        try {
            self::$instance->query('SELECT 1');
        } catch (\PDOException $e) {
            // Connection lost, reconnect
            self::$instance = null;
            self::connect();
        }

        return self::$instance;
    }

    /**
     * Establish database connection
     */
    private static function connect(): void
    {
        self::$config = Config::getDatabaseConfig();

        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            self::$config['host'],
            self::$config['port'],
            self::$config['database'],
            self::$config['charset']
        );

        try {
            self::$instance = new PDO(
                $dsn,
                self::$config['username'],
                self::$config['password'],
                self::$config['options']
            );

            // Set collation
            self::$instance->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
        } catch (PDOException $e) {
            if (Config::isDebug()) {
                throw new PDOException(
                    'Database Connection Failed: ' . $e->getMessage()
                );
            }
            throw new PDOException('Database Connection Failed');
        }
    }

    /**
     * Close database connection
     */
    public static function close(): void
    {
        self::$instance = null;
    }

    /**
     * Test database connection
     */
    public static function testConnection(): bool
    {
        try {
            self::getInstance();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    /**
     * Begin transaction
     */
    public static function beginTransaction(): bool
    {
        return self::getInstance()->beginTransaction();
    }

    /**
     * Commit transaction
     */
    public static function commit(): bool
    {
        return self::getInstance()->commit();
    }

    /**
     * Rollback transaction
     */
    public static function rollback(): bool
    {
        return self::getInstance()->rollBack();
    }

    /**
     * Get last insert ID
     *
     * Deliberately does NOT go through getInstance() - its connection-health check runs a
     * `SELECT 1` on every call, and for PDO_MySQL that intervening query silently resets the
     * driver's tracked last-insert-id back to 0 (it reflects the most recent statement on the
     * connection, not specifically the most recent INSERT). Reading self::$instance directly
     * avoids that extra query so the real id from the INSERT just executed is returned. The
     * instance is always already connected here since an insert was just run through it.
     */
    public static function lastInsertId(): string|false
    {
        if (self::$instance === null) {
            self::connect();
        }

        return self::$instance->lastInsertId();
    }
}
