<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * Least-squares linear regression over a learner's own recorded (x, y) points - used to render an
 * optional best-fit line without ever replacing or adjusting the real scatter points themselves.
 * The same formulas are mirrored client-side in frontend/src/utils/linearRegression.ts for the live
 * chart preview; this copy is the one that produces the frozen per-attempt snapshot.
 */
class GraphMath
{
    /**
     * @param array<int, array{x: float, y: float}> $points
     * @return array{slope: float, intercept: float, r_squared: float}|null null if fewer than 2
     *   distinct x values exist (a line isn't well-defined).
     */
    public static function linearRegression(array $points): ?array
    {
        $n = count($points);
        if ($n < 2) {
            return null;
        }

        $sumX = 0.0;
        $sumY = 0.0;
        $sumXY = 0.0;
        $sumXX = 0.0;
        foreach ($points as $p) {
            $sumX += $p['x'];
            $sumY += $p['y'];
            $sumXY += $p['x'] * $p['y'];
            $sumXX += $p['x'] * $p['x'];
        }

        $denominator = ($n * $sumXX) - ($sumX * $sumX);
        if (abs($denominator) < 1e-12) {
            return null; // all points share the same x - no well-defined slope
        }

        $slope = (($n * $sumXY) - ($sumX * $sumY)) / $denominator;
        $intercept = ($sumY - ($slope * $sumX)) / $n;

        $meanY = $sumY / $n;
        $ssTotal = 0.0;
        $ssResidual = 0.0;
        foreach ($points as $p) {
            $predicted = ($slope * $p['x']) + $intercept;
            $ssTotal += ($p['y'] - $meanY) ** 2;
            $ssResidual += ($p['y'] - $predicted) ** 2;
        }
        $rSquared = $ssTotal > 0 ? 1 - ($ssResidual / $ssTotal) : 1.0;

        return [
            'slope' => round($slope, 4),
            'intercept' => round($intercept, 4),
            'r_squared' => round(max(0.0, min(1.0, $rSquared)), 4),
        ];
    }
}
