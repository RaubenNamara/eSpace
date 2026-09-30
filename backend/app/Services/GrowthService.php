<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Growth, not rank: how much each student is improving, from the same returned results the
 * Learning Map uses (Learning Outcome Assessments and Activities of Integration).
 *  - improvement: their average on their most recent results (up to 3) against their average
 *    before that - so a student moving from 35% to 55% shows the same growth as one moving from
 *    70% to 90%
 *  - outcomes this term: learning outcomes they have achieved (60%+) from this term's assessments
 * Used by the student growth board (Student\GrowthController) and the Class Learning Map.
 */
class GrowthService
{
    private const ACHIEVED_FROM = 60.0;
    private const RECENT = 3;

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    /**
     * @param int[] $studentIds
     * @return array<int, array{recent: ?float, before: ?float, improvement: ?float, results: int, outcomes_term: int}>
     */
    public static function forStudents($db, array $studentIds, ?int $termId, ?int $subjectId = null): array
    {
        $out = [];
        foreach ($studentIds as $sid) {
            $out[$sid] = ['recent' => null, 'before' => null, 'improvement' => null, 'results' => 0, 'outcomes_term' => 0];
        }
        if (!$studentIds) {
            return $out;
        }
        $subjectSql = $subjectId ? ' AND a.subject_id = ?' : '';
        $subjectParam = $subjectId ? [$subjectId] : [];

        // Every returned result, oldest first
        $stmt = $db->prepare(
            "SELECT sb.student_id, sb.percentage
             FROM assignment_submissions sb
             INNER JOIN assignments a ON a.id = sb.assignment_id AND a.deleted_at IS NULL
                    AND a.assessment_category IN ('LOA', 'AOI')$subjectSql
             WHERE sb.student_id IN (" . self::in($studentIds) . ") AND sb.deleted_at IS NULL
               AND sb.status = 'returned' AND sb.percentage IS NOT NULL
             ORDER BY sb.student_id, COALESCE(sb.released_at, sb.marked_at, sb.submitted_at, sb.id)"
        );
        $stmt->execute(array_merge($subjectParam, $studentIds));
        $series = [];
        foreach ($stmt->fetchAll() as $r) {
            $series[(int) $r['student_id']][] = (float) $r['percentage'];
        }
        foreach ($series as $sid => $pcts) {
            $n = count($pcts);
            $out[$sid]['results'] = $n;
            if ($n < 2) {
                continue;
            }
            $recentCount = min(self::RECENT, $n - 1);
            $recent = array_slice($pcts, -$recentCount);
            $before = array_slice($pcts, 0, $n - $recentCount);
            $out[$sid]['recent'] = round(array_sum($recent) / count($recent), 1);
            $out[$sid]['before'] = round(array_sum($before) / count($before), 1);
            $out[$sid]['improvement'] = round($out[$sid]['recent'] - $out[$sid]['before'], 1);
        }

        // Outcomes achieved from this term's Learning Outcome Assessments
        if ($termId) {
            $stmt = $db->prepare(
                "SELECT x.student_id, COUNT(*) AS n FROM (
                    SELECT sb.student_id, alo.learning_outcome_id, AVG(sb.percentage) AS pct
                    FROM assignment_learning_outcomes alo
                    INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL
                           AND a.status = 'published' AND a.term_id = ?$subjectSql
                    INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL
                           AND sb.status = 'returned' AND sb.percentage IS NOT NULL
                    WHERE sb.student_id IN (" . self::in($studentIds) . ")
                    GROUP BY sb.student_id, alo.learning_outcome_id
                 ) x WHERE x.pct >= ? GROUP BY x.student_id"
            );
            $stmt->execute(array_merge([$termId], $subjectParam, $studentIds, [self::ACHIEVED_FROM]));
            foreach ($stmt->fetchAll() as $r) {
                $out[(int) $r['student_id']]['outcomes_term'] = (int) $r['n'];
            }
        }
        return $out;
    }

    public static function currentTermId($db): ?int
    {
        $row = $db->query("SELECT id FROM terms WHERE is_current = 1 ORDER BY id DESC LIMIT 1")->fetch();
        return $row ? (int) $row['id'] : null;
    }
}
