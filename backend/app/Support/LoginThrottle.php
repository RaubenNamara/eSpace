<?php

declare(strict_types=1);

namespace eSpace\App\Support;

/**
 * Slows down password guessing. Failed sign-ins are counted on the server (in storage/throttle/,
 * shared by every school), never in the session an attacker can simply throw away:
 *  - one account from one address: 8 wrong passwords, then a 15-minute wait
 *  - one account from anywhere: 30, so spreading guesses over many addresses doesn't help
 *  - one address on any accounts: 200 - a whole school shares one internet address, so this is
 *    set high enough for a lab of learners mistyping at once
 * A correct sign-in clears that account's count from that address.
 */
final class LoginThrottle
{
    private const WINDOW = 900;
    private const LIMITS = ['pair' => 8, 'account' => 30, 'address' => 200];

    /** Seconds to wait before trying again, or 0 when sign-in may go ahead */
    public static function waitFor(string $scope, string $identifier): int
    {
        $now = time();
        $wait = 0;
        foreach (self::keys($scope, $identifier) as $kind => $key) {
            $hits = self::read($key, $now);
            if (count($hits) >= self::LIMITS[$kind]) {
                $wait = max($wait, $hits[0] + self::WINDOW - $now);
            }
        }
        return $wait;
    }

    public static function failed(string $scope, string $identifier): void
    {
        // one sign-in can look the account up more than once (in more than one school's database):
        // it still counts as one wrong password
        static $counted = [];
        $once = $scope . '|' . mb_strtolower(trim($identifier));
        if (isset($counted[$once])) {
            return;
        }
        $counted[$once] = true;
        $now = time();
        foreach (self::keys($scope, $identifier) as $key) {
            $hits = self::read($key, $now);
            $hits[] = $now;
            self::write($key, array_slice($hits, -250));
        }
    }

    public static function succeeded(string $scope, string $identifier): void
    {
        @unlink(self::file(self::keys($scope, $identifier)['pair']));
    }

    /** "Try again in 12 minutes" */
    public static function message(int $seconds): string
    {
        $minutes = max(1, (int) ceil($seconds / 60));
        return "Too many wrong passwords. Try again in {$minutes} minute" . ($minutes === 1 ? '' : 's') . '.';
    }

    private static function keys(string $scope, string $identifier): array
    {
        $id = mb_strtolower(trim($identifier));
        $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
        return [
            'pair' => "$scope|pair|$id|$ip",
            'account' => "$scope|account|$id",
            'address' => "$scope|address|$ip",
        ];
    }

    private static function file(string $key): string
    {
        return dirname(__DIR__, 2) . '/storage/throttle/' . hash('sha256', $key);
    }

    /** The failures still inside the window, oldest first */
    private static function read(string $key, int $now): array
    {
        $raw = @file_get_contents(self::file($key));
        $hits = $raw ? (json_decode($raw, true) ?: []) : [];
        return array_values(array_filter($hits, fn ($t) => is_int($t) && $t > $now - self::WINDOW));
    }

    private static function write(string $key, array $hits): void
    {
        $dir = dirname(__DIR__, 2) . '/storage/throttle';
        if (!is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }
        @file_put_contents(self::file($key), json_encode($hits), LOCK_EX);
    }
}
