<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * The browser, operating system and kind of device behind a sign-in.
 *
 * Preferred source: what the browser reports about itself at login (User-Agent Client Hints, sent
 * by the login page as `client`) - it gives the real OS version (Windows 11, macOS 14, Android 14),
 * the phone model and browsers that hide behind Chrome's name (Brave). Fallback: the User-Agent
 * string, which every browser sends but which freezes some details (all Windows 10 and 11 report
 * "Windows NT 10.0"; Safari on a Mac always says 10.15.7).
 */
final class DeviceInfo
{
    /**
     * @param array<string, mixed>|null $client  the login page's report (navigator.userAgentData)
     * @return array{browser: ?string, os: ?string, device_type: ?string, device_model: ?string}
     */
    public static function detect(string $userAgent, ?array $client = null): array
    {
        $ua = self::fromUserAgent($userAgent);
        if (!$client) {
            return $ua;
        }
        $platform = self::clean($client['platform'] ?? null);
        $platformVersion = self::clean($client['platformVersion'] ?? null);
        $model = self::clean($client['model'] ?? null);
        $mobile = isset($client['mobile']) ? (bool) $client['mobile'] : null;

        $os = $ua['os'];
        if ($platform) {
            $os = self::osFromHints($platform, $platformVersion) ?? $os;
        }
        $browser = self::browserFromHints($client) ?? $ua['browser'];
        $type = $ua['device_type'];
        if ($mobile === true && $type === 'computer') {
            $type = 'phone';
        }
        return [
            'browser' => $browser,
            'os' => $os,
            'device_type' => $type,
            'device_model' => $model ?: $ua['device_model'],
        ];
    }

    /** "Chrome 129 on Windows 10/11 (computer)" style summary for one line on the dashboard */
    public static function summary(?string $browser, ?string $os, ?string $model = null): ?string
    {
        if (!$browser && !$os) {
            return null;
        }
        // the browser by name only ("Chrome", not "Chrome 155"); the version stays in the stored record
        $browser = $browser !== null ? (preg_replace('/\s+\d+(\.\d+)*$/', '', $browser) ?: $browser) : null;
        $where = $model ? trim(($os ?? '') . ' · ' . $model, ' ·') : $os;
        return $browser && $where ? "{$browser} on {$where}" : ($browser ?: $where);
    }

    /** @return array{browser: ?string, os: ?string, device_type: ?string, device_model: ?string} */
    public static function fromUserAgent(string $ua): array
    {
        if ($ua === '' || $ua === 'Unknown') {
            return ['browser' => null, 'os' => null, 'device_type' => null, 'device_model' => null];
        }
        // --- browser (order matters: Edge, Opera and Samsung all also say "Chrome") ---
        $browser = null;
        $browsers = [
            'Edge' => '/Edg(?:e|A|iOS)?\/(\d+)/',
            'Opera' => '/(?:OPR|Opera)\/(\d+)/',
            'Samsung Internet' => '/SamsungBrowser\/(\d+)/',
            'UC Browser' => '/UCBrowser\/(\d+)/',
            'Firefox' => '/(?:Firefox|FxiOS)\/(\d+)/',
            'Chrome' => '/(?:Chrome|CriOS)\/(\d+)/',
            'Safari' => '/Version\/(\d+)[\d.]* .*Safari\//',
        ];
        foreach ($browsers as $name => $re) {
            if (preg_match($re, $ua, $m)) {
                $browser = "{$name} {$m[1]}";
                break;
            }
        }
        if (!$browser && preg_match('/curl|wget|python|okhttp|postman/i', $ua)) {
            $browser = 'Script / API tool';
        }

        // --- operating system ---
        $os = null;
        $model = null;
        if (preg_match('/iPhone OS (\d+)[_.](\d+)/', $ua, $m)) {
            $os = "iOS {$m[1]}.{$m[2]}";
        } elseif (preg_match('/iPad.*OS (\d+)[_.](\d+)/', $ua, $m)) {
            $os = "iPadOS {$m[1]}.{$m[2]}";
        } elseif (preg_match('/Android (\d+(?:\.\d+)?)/', $ua, $m)) {
            $os = "Android {$m[1]}";
            // "Android 13; SM-A515F Build/..." - the model, when the browser still sends it
            if (preg_match('/Android [\d.]+; (?:[a-z]{2}-[a-z]{2}; )?([^;)]+?)(?: Build|\))/i', $ua, $mm) && strtoupper(trim($mm[1])) !== 'K') {
                $model = trim($mm[1]);
            }
        } elseif (preg_match('/Windows NT (\d+\.\d+)/', $ua, $m)) {
            $os = match ($m[1]) {
                // Windows 11 still reports NT 10.0; only the browser's own report tells them apart
                '10.0' => 'Windows 10/11',
                '6.3' => 'Windows 8.1',
                '6.2' => 'Windows 8',
                '6.1' => 'Windows 7',
                default => 'Windows',
            };
        } elseif (str_contains($ua, 'CrOS')) {
            $os = 'ChromeOS';
        } elseif (str_contains($ua, 'Macintosh') || str_contains($ua, 'Mac OS X')) {
            $os = 'macOS';
        } elseif (preg_match('/Ubuntu|Fedora|Debian/i', $ua, $m)) {
            $os = 'Linux (' . $m[0] . ')';
        } elseif (str_contains($ua, 'Linux')) {
            $os = 'Linux';
        }

        // --- kind of device ---
        $type = 'computer';
        if (str_contains($ua, 'iPad') || (str_contains($ua, 'Android') && !str_contains($ua, 'Mobile')) || str_contains($ua, 'Tablet')) {
            $type = 'tablet';
        } elseif (preg_match('/iPhone|iPod|Android.*Mobile|Mobile Safari|Windows Phone/', $ua)) {
            $type = 'phone';
        }
        if ($browser === 'Script / API tool') {
            $type = null;
        }
        if (str_contains($ua, 'iPhone')) {
            $model = 'iPhone';
        }
        return ['browser' => $browser, 'os' => $os, 'device_type' => $type, 'device_model' => $model];
    }

    private static function osFromHints(string $platform, ?string $version): ?string
    {
        $m = [];
        $major = $version !== null && preg_match('/^(\d+)(?:\.(\d+))?/', $version, $m) ? (int) $m[1] : null;
        $minor = isset($m[2]) ? (int) $m[2] : null;
        return match (strtolower($platform)) {
            // Windows reports 1-10 for Windows 10 and 13+ for Windows 11
            'windows' => $major === null || $major === 0 ? 'Windows' : ($major >= 13 ? 'Windows 11' : 'Windows 10'),
            'macos' => $major ? "macOS {$major}" . ($minor ? ".{$minor}" : '') : 'macOS',
            'android' => $major ? "Android {$major}" : 'Android',
            'chrome os', 'chromeos' => 'ChromeOS',
            'linux' => 'Linux',
            'ios' => $major ? "iOS {$major}" : 'iOS',
            default => self::clean($platform),
        };
    }

    /** @param array<string, mixed> $client */
    private static function browserFromHints(array $client): ?string
    {
        if (!empty($client['brave'])) {
            $v = self::brandVersion($client, ['Brave', 'Chromium', 'Google Chrome']);
            return 'Brave' . ($v ? " {$v}" : '');
        }
        foreach (['Microsoft Edge' => 'Edge', 'Opera' => 'Opera', 'Samsung Internet' => 'Samsung Internet', 'Google Chrome' => 'Chrome', 'Chromium' => 'Chromium'] as $brand => $name) {
            $v = self::brandVersion($client, [$brand]);
            if ($v !== null) {
                return "{$name} {$v}";
            }
        }
        return null;
    }

    /** @param array<string, mixed> $client  @param string[] $brands */
    private static function brandVersion(array $client, array $brands): ?string
    {
        $list = is_array($client['fullVersionList'] ?? null) ? $client['fullVersionList'] : (is_array($client['brands'] ?? null) ? $client['brands'] : []);
        foreach ($brands as $want) {
            foreach ($list as $b) {
                if (is_array($b) && ($b['brand'] ?? '') === $want && isset($b['version'])) {
                    return explode('.', (string) $b['version'])[0];
                }
            }
        }
        return null;
    }

    private static function clean(mixed $v): ?string
    {
        if (!is_string($v)) {
            return null;
        }
        $v = trim(preg_replace('/[^\w .,()\/+-]/u', '', $v) ?? '');
        return $v === '' ? null : mb_substr($v, 0, 80);
    }
}
