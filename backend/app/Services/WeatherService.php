<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\Config\Config;

/**
 * The weather now, for the dashboards' sky (clear, clouds, rain, a storm...). Google's Weather API
 * when GOOGLE_WEATHER_API_KEY is set in backend/.env (Google Cloud: enable "Weather API"), and
 * Open-Meteo (free, no key) otherwise or whenever Google fails - so the sky works without a key.
 *
 * The place comes from the user's browser, rounded to 0.1 degree (about 11 km) before it gets
 * here; without one, WEATHER_LAT / WEATHER_LON (default Kampala). Nothing about who asked is kept.
 * Each rounded place is cached for 15 minutes in storage/cache/weather, so the whole school makes
 * a handful of calls an hour.
 *
 * Every answer has the same shape:
 *   condition   clear | partly_cloudy | cloudy | fog | drizzle | rain | heavy_rain | thunderstorm
 *   rain_soon   true when it isn't raining yet but rain is likely in the next few hours
 *   is_day, temp_c, rain_chance (0-100, next few hours), description, source, updated_at
 */
final class WeatherService
{
    private const CACHE_SECONDS = 900;
    /** a failed lookup is remembered briefly too, so a down service isn't asked on every page */
    private const FAIL_SECONDS = 300;
    private const RAIN_SOON_PERCENT = 60;

    public const CONDITIONS = ['clear', 'partly_cloudy', 'cloudy', 'fog', 'drizzle', 'rain', 'heavy_rain', 'thunderstorm'];

    /** The fallback place (backend/.env), Kampala unless set */
    public static function defaultPlace(): array
    {
        $lat = (float) Config::get('WEATHER_LAT', '0.3476');
        $lon = (float) Config::get('WEATHER_LON', '32.5825');
        return [self::round($lat), self::round($lon)];
    }

    public static function round(float $deg): float
    {
        return round($deg, 1);
    }

    /** The weather at this (rounded) place, or null when no service answered */
    public static function at(float $lat, float $lon): ?array
    {
        $lat = self::round($lat);
        $lon = self::round($lon);
        $file = self::cacheDir() . '/' . sprintf('%.1f_%.1f', $lat, $lon) . '.json';
        $cached = is_file($file) ? json_decode((string) @file_get_contents($file), true) : null;
        if (is_array($cached) && isset($cached['at']) && time() - (int) $cached['at'] < (empty($cached['data']) ? self::FAIL_SECONDS : self::CACHE_SECONDS)) {
            return $cached['data'] ?: null;
        }

        $data = null;
        if (trim((string) Config::get('GOOGLE_WEATHER_API_KEY', '')) !== '') {
            $data = self::fromGoogle($lat, $lon);
        }
        $data ??= self::fromOpenMeteo($lat, $lon);
        // a service that failed now keeps the last good reading a little longer, if there is one
        if (!$data && is_array($cached) && !empty($cached['data'])) {
            $data = $cached['data'];
        }
        @file_put_contents($file, json_encode(['at' => time(), 'data' => $data]), LOCK_EX);
        return $data;
    }

    // --- Google Weather API ------------------------------------------------------------------

    private static function fromGoogle(float $lat, float $lon): ?array
    {
        $key = trim((string) Config::get('GOOGLE_WEATHER_API_KEY', ''));
        $now = self::getJson('https://weather.googleapis.com/v1/currentConditions:lookup?' . http_build_query([
            'key' => $key, 'location.latitude' => $lat, 'location.longitude' => $lon, 'unitsSystem' => 'METRIC',
        ]));
        if (!$now || empty($now['weatherCondition']['type'])) {
            return null;
        }
        // the chance of rain over the next few hours (the current reading's own chance otherwise)
        $chance = (int) ($now['precipitation']['probability']['percent'] ?? 0);
        $hours = self::getJson('https://weather.googleapis.com/v1/forecast/hours:lookup?' . http_build_query([
            'key' => $key, 'location.latitude' => $lat, 'location.longitude' => $lon, 'hours' => 3, 'unitsSystem' => 'METRIC',
        ]));
        foreach ($hours['forecastHours'] ?? [] as $h) {
            $chance = max($chance, (int) ($h['precipitation']['probability']['percent'] ?? 0));
        }
        $type = strtoupper((string) $now['weatherCondition']['type']);
        return self::shape(
            self::googleCondition($type),
            (bool) ($now['isDaytime'] ?? true),
            isset($now['temperature']['degrees']) ? (float) $now['temperature']['degrees'] : null,
            $chance,
            (string) ($now['weatherCondition']['description']['text'] ?? ucfirst(strtolower(str_replace('_', ' ', $type)))),
            'google'
        );
    }

    /** Google's condition types (CLEAR, MOSTLY_CLOUDY, LIGHT_RAIN_SHOWERS, SCATTERED_THUNDERSTORMS...) */
    private static function googleCondition(string $type): string
    {
        return match (true) {
            str_contains($type, 'THUNDER') => 'thunderstorm',
            str_contains($type, 'HEAVY') && (str_contains($type, 'RAIN') || str_contains($type, 'SHOWER')) => 'heavy_rain',
            str_contains($type, 'LIGHT_RAIN') || str_contains($type, 'DRIZZLE') || $type === 'CHANCE_OF_SHOWERS' => 'drizzle',
            str_contains($type, 'RAIN') || str_contains($type, 'SHOWER') || str_contains($type, 'HAIL') || str_contains($type, 'SNOW') => 'rain',
            str_contains($type, 'FOG') || str_contains($type, 'HAZE') || str_contains($type, 'MIST') => 'fog',
            $type === 'CLOUDY' || $type === 'MOSTLY_CLOUDY' => 'cloudy',
            $type === 'PARTLY_CLOUDY' || $type === 'MOSTLY_CLEAR' || $type === 'WINDY' => 'partly_cloudy',
            default => 'clear',
        };
    }

    // --- Open-Meteo (free, no key) -----------------------------------------------------------

    private static function fromOpenMeteo(float $lat, float $lon): ?array
    {
        $r = self::getJson('https://api.open-meteo.com/v1/forecast?' . http_build_query([
            'latitude' => $lat, 'longitude' => $lon,
            'current' => 'temperature_2m,weather_code,is_day',
            'hourly' => 'precipitation_probability',
            'forecast_hours' => 4, 'timezone' => 'auto',
        ]));
        if (!$r || !isset($r['current']['weather_code'])) {
            return null;
        }
        $code = (int) $r['current']['weather_code'];
        $chance = 0;
        foreach ($r['hourly']['precipitation_probability'] ?? [] as $p) {
            $chance = max($chance, (int) $p);
        }
        [$condition, $text] = self::wmo($code);
        return self::shape($condition, (int) ($r['current']['is_day'] ?? 1) === 1, isset($r['current']['temperature_2m']) ? (float) $r['current']['temperature_2m'] : null, $chance, $text, 'open-meteo');
    }

    /** WMO weather codes, as Open-Meteo gives them */
    private static function wmo(int $c): array
    {
        return match (true) {
            $c === 0 => ['clear', 'Clear'],
            $c === 1 => ['partly_cloudy', 'Mainly clear'],
            $c === 2 => ['partly_cloudy', 'Partly cloudy'],
            $c === 3 => ['cloudy', 'Cloudy'],
            $c === 45 || $c === 48 => ['fog', 'Fog'],
            $c >= 51 && $c <= 57 => ['drizzle', 'Drizzle'],
            $c === 61 || $c === 80 => ['drizzle', 'Light rain'],
            $c === 63 || $c === 81 || $c === 66 => ['rain', 'Rain'],
            $c === 65 || $c === 82 || $c === 67 => ['heavy_rain', 'Heavy rain'],
            $c >= 71 && $c <= 77, $c === 85, $c === 86 => ['rain', 'Snow'],
            $c >= 95 => ['thunderstorm', 'Thunderstorm'],
            default => ['partly_cloudy', 'Cloudy spells'],
        };
    }

    // --- helpers -------------------------------------------------------------------------------

    private static function shape(string $condition, bool $isDay, ?float $temp, int $chance, string $text, string $source): array
    {
        $chance = max(0, min(100, $chance));
        $wet = in_array($condition, ['drizzle', 'rain', 'heavy_rain', 'thunderstorm'], true);
        return [
            'condition' => $condition,
            'rain_soon' => !$wet && $chance >= self::RAIN_SOON_PERCENT,
            'is_day' => $isDay,
            'temp_c' => $temp !== null ? (int) round($temp) : null,
            'rain_chance' => $chance,
            'description' => mb_substr(trim($text), 0, 60),
            'source' => $source,
            'updated_at' => date('c'),
        ];
    }

    private static function getJson(string $url): ?array
    {
        if (!function_exists('curl_init')) {
            return null;
        }
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 6,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_HTTPHEADER => ['Accept: application/json'],
        ]);
        $body = curl_exec($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($body === false || $code !== 200) {
            // never log the URL: Google's has the key in it
            error_log('[weather] ' . parse_url($url, PHP_URL_HOST) . ' answered ' . $code);
            return null;
        }
        $data = json_decode((string) $body, true);
        return is_array($data) ? $data : null;
    }

    private static function cacheDir(): string
    {
        $dir = dirname(__DIR__, 2) . '/storage/cache/weather';
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }
        return $dir;
    }
}
