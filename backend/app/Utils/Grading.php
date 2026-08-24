<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * Single source of truth for turning marks into a percentage and letter grade.
 * No grading configuration existed anywhere in the project prior to this;
 * thresholds below are a standard scale and can be tuned in one place.
 */
class Grading
{
    private const SCALE = [
        ['min' => 80.0, 'grade' => 'A'],
        ['min' => 70.0, 'grade' => 'B'],
        ['min' => 60.0, 'grade' => 'C'],
        ['min' => 50.0, 'grade' => 'D'],
        ['min' => 0.0, 'grade' => 'E'],
    ];

    public static function percentageToGrade(float $percentage): string
    {
        foreach (self::SCALE as $band) {
            if ($percentage >= $band['min']) {
                return $band['grade'];
            }
        }

        return 'E';
    }

    /**
     * @return array{marks_awarded: float, total_marks: float, percentage: float, grade: string}
     */
    public static function computeSummary(float $marksAwarded, float $totalMarks): array
    {
        $percentage = $totalMarks > 0 ? round(($marksAwarded / $totalMarks) * 100, 2) : 0.0;

        return [
            'marks_awarded' => $marksAwarded,
            'total_marks' => $totalMarks,
            'percentage' => $percentage,
            'grade' => self::percentageToGrade($percentage),
        ];
    }
}
