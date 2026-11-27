<?php

declare(strict_types=1);

namespace eSpace\App\Support;

/**
 * Keeps the public forms (demo requests, join requests, privacy reports, feedback) from being
 * flooded by a script: each internet address may send a form so many times an hour. Counted on
 * the server in storage/throttle/, like LoginThrottle, so dropping cookies doesn't reset it.
 * A whole school can share one address, so the limits leave room for a class using a form at once.
 */
final class RequestLimit
{
    /**
     * Records this request and says whether the address has gone over $perHour for $scope.
     * Returns the minutes to wait, or 0 when the request may go ahead.
     */
    public static function hit(string $scope, int $perHour): int
    {
        $now = time();
        $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
        $dir = dirname(__DIR__, 2) . '/storage/throttle';
        if (!is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }
        $file = $dir . '/' . hash('sha256', "form|$scope|$ip");
        $raw = @file_get_contents($file);
        $hits = array_values(array_filter($raw ? (json_decode($raw, true) ?: []) : [], fn ($t) => is_int($t) && $t > $now - 3600));
        if (count($hits) >= $perHour) {
            return max(1, (int) ceil(($hits[0] + 3600 - $now) / 60));
        }
        $hits[] = $now;
        @file_put_contents($file, json_encode(array_slice($hits, -$perHour)), LOCK_EX);
        return 0;
    }

    public static function message(int $minutes): string
    {
        return "Too many requests from this connection. Please try again in {$minutes} minute" . ($minutes === 1 ? '' : 's') . '.';
    }
}
