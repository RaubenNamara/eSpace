<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Report Card Grading Math
 *
 * Pure functions, no DB access - the CBC-style weighted grading used on report cards, kept
 * entirely separate from backend/app/Utils/Grading.php (a plain percentage->letter scale used
 * elsewhere for ordinary assignment grading; unrelated to report cards).
 *
 * The construct-weight bands below are a placeholder first pass (tunable in one place, isolated
 * from the generation pipeline in ReportCardService) - the 5-point (A-Level) subject grade bands
 * are taken as-is from the reference report's own "Result Key" legend and are not placeholders.
 *
 * O-Level and A-Level use different max weights (3 and 5 respectively, per school policy) - every
 * band set below is keyed by that max weight rather than hardcoded to one scale. The O-Level (3)
 * bands are this file's own proportional scaling of the A-Level (5) reference bands (same
 * percentage-of-max philosophy, same letter grades/descriptors, just compressed) since no
 * separate O-Level reference document exists yet - tune MAX_WEIGHT_O_LEVEL's band rows directly
 * here if the school provides different official O-Level cutoffs.
 */
class ReportCardGradingService
{
    public const MAX_WEIGHT_O_LEVEL = 3;
    public const MAX_WEIGHT_A_LEVEL = 5;
    public const DEFAULT_MAX_WEIGHT = self::MAX_WEIGHT_A_LEVEL;

    /** classes.level -> the max weight report cards for that level are scored out of. */
    public static function maxWeightForClassLevel(?string $classLevel): int
    {
        return $classLevel === 'O Level' ? self::MAX_WEIGHT_O_LEVEL : self::MAX_WEIGHT_A_LEVEL;
    }

    /** Percentage -> construct weight, per max-weight scale. Tunable. */
    private const WEIGHT_BANDS = [
        self::MAX_WEIGHT_A_LEVEL => [
            ['min' => 85.0, 'weight' => 5],
            ['min' => 70.0, 'weight' => 4],
            ['min' => 55.0, 'weight' => 3],
            ['min' => 40.0, 'weight' => 2],
            ['min' => 0.0, 'weight' => 1],
        ],
        self::MAX_WEIGHT_O_LEVEL => [
            ['min' => 70.0, 'weight' => 3],
            ['min' => 40.0, 'weight' => 2],
            ['min' => 0.0, 'weight' => 1],
        ],
    ];

    /** Average weight -> subject/overall grade + performance level, per max-weight scale. */
    private const GRADE_BANDS = [
        self::MAX_WEIGHT_A_LEVEL => [
            ['min' => 4.6, 'grade' => 'A', 'level' => 'Exceptional', 'points' => 5],
            ['min' => 3.7, 'grade' => 'B', 'level' => 'Outstanding', 'points' => 4],
            ['min' => 2.8, 'grade' => 'C', 'level' => 'Satisfactory', 'points' => 3],
            ['min' => 1.9, 'grade' => 'D', 'level' => 'Basic', 'points' => 2],
            ['min' => 0.0, 'grade' => 'E', 'level' => 'Elementary', 'points' => 1],
        ],
        // Proportional to the A-Level bands above (min/points scaled by 3/5, points rounded).
        self::MAX_WEIGHT_O_LEVEL => [
            ['min' => 2.76, 'grade' => 'A', 'level' => 'Exceptional', 'points' => 3],
            ['min' => 2.22, 'grade' => 'B', 'level' => 'Outstanding', 'points' => 2],
            ['min' => 1.68, 'grade' => 'C', 'level' => 'Satisfactory', 'points' => 2],
            ['min' => 1.14, 'grade' => 'D', 'level' => 'Basic', 'points' => 1],
            ['min' => 0.0, 'grade' => 'E', 'level' => 'Elementary', 'points' => 1],
        ],
    ];

    private static function bands(int $maxWeight): array
    {
        return self::WEIGHT_BANDS[$maxWeight] ?? self::WEIGHT_BANDS[self::DEFAULT_MAX_WEIGHT];
    }

    private static function gradeBands(int $maxWeight): array
    {
        return self::GRADE_BANDS[$maxWeight] ?? self::GRADE_BANDS[self::DEFAULT_MAX_WEIGHT];
    }

    public static function percentageToWeight(float $percentage, int $maxWeight = self::DEFAULT_MAX_WEIGHT): int
    {
        foreach (self::bands($maxWeight) as $band) {
            if ($percentage >= $band['min']) {
                return $band['weight'];
            }
        }

        return 1;
    }

    private static function bandForWeight(float $avgWeight, int $maxWeight): array
    {
        $bands = self::gradeBands($maxWeight);
        foreach ($bands as $band) {
            if ($avgWeight >= $band['min']) {
                return $band;
            }
        }

        return $bands[array_key_last($bands)];
    }

    public static function weightToGrade(float $avgWeight, int $maxWeight = self::DEFAULT_MAX_WEIGHT): string
    {
        return self::bandForWeight($avgWeight, $maxWeight)['grade'];
    }

    public static function weightToPerformanceLevel(float $avgWeight, int $maxWeight = self::DEFAULT_MAX_WEIGHT): string
    {
        return self::bandForWeight($avgWeight, $maxWeight)['level'];
    }

    public static function gradeToPrinciplePoints(string $grade, int $maxWeight = self::DEFAULT_MAX_WEIGHT): int
    {
        foreach (self::gradeBands($maxWeight) as $band) {
            if ($band['grade'] === $grade) {
                return $band['points'];
            }
        }

        return 0;
    }

    /**
     * @param int[] $weights Construct weights for one subject, already capped to the same
     *     max-weight scale by percentageToWeight().
     */
    public static function averageWeight(array $weights): float
    {
        if (empty($weights)) {
            return 0.0;
        }

        return round(array_sum($weights) / count($weights), 1);
    }

    /**
     * TODO: real UACE principal/subsidiary subject-combination validation rules are a
     * school-specific policy question out of scope for v1 - this is a deliberately simple
     * placeholder, not an attempt at the real thing.
     */
    public static function resultCategory(float $overallAvgWeight, int $maxWeight = self::DEFAULT_MAX_WEIGHT): int
    {
        $passThreshold = $maxWeight === self::MAX_WEIGHT_O_LEVEL ? 1.14 : 1.9;
        return $overallAvgWeight >= $passThreshold ? 1 : 2;
    }
}
