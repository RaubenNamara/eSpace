<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\WeatherService;

/**
 * GET /api/weather?lat=&lon= - the weather now, for the dashboards' sky (any signed-in role).
 * lat/lon come from the user's browser, already rounded; without them (location refused), the
 * install's own place. See WeatherService.
 */
class WeatherController extends Controller
{
    public function current(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        [$lat, $lon] = WeatherService::defaultPlace();
        $qLat = $this->query('lat', null);
        $qLon = $this->query('lon', null);
        if (is_numeric($qLat) && is_numeric($qLon) && abs((float) $qLat) <= 90 && abs((float) $qLon) <= 180) {
            $lat = (float) $qLat;
            $lon = (float) $qLon;
        }
        $weather = WeatherService::at($lat, $lon);
        if ($weather === null) {
            // the sky simply follows the clock as before
            $this->success(['weather' => null]);
            return;
        }
        $this->success(['weather' => $weather]);
    }
}
