<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * How a class stream is doing, from the same returned results the Learning Map uses: the share of
 * student x learning-outcome results that are achieved (60%+), who needs support (average below
 * 50%), and each student's own figures. Shared by the teacher dashboard, My Classes and the class
 * page, so they always agree.
 */
class ClassHealthService
{
    public const ACHIEVED_FROM = 60.0;
    public const SUPPORT_BELOW = 50.0;

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    /**
     * The class streams a teacher teaches: those they've published an assessment or eNote for,
     * directly or as "all streams" of a class level
     *
     * @return int[]
     */
    public static function teacherClassIds($db, int $teacherId): array
    {
        $stmt = $db->prepare(
            "SELECT DISTINCT c.id FROM classes c
             WHERE c.id IN (
                 SELECT a.class_id FROM assignments a WHERE a.teacher_id = ? AND a.deleted_at IS NULL AND a.status = 'published' AND a.class_id IS NOT NULL
                 UNION SELECT et.class_id FROM enote_topics et WHERE et.teacher_id = ? AND et.deleted_at IS NULL AND et.status = 'published' AND et.class_id IS NOT NULL
             ) OR c.name IN (
                 SELECT a.class_group_name FROM assignments a WHERE a.teacher_id = ? AND a.deleted_at IS NULL AND a.status = 'published' AND a.class_group_name IS NOT NULL
                 UNION SELECT et.class_group_name FROM enote_topics et WHERE et.teacher_id = ? AND et.deleted_at IS NULL AND et.status = 'published' AND et.class_group_name IS NOT NULL
             )"
        );
        $stmt->execute([$teacherId, $teacherId, $teacherId, $teacherId]);
        return array_map('intval', array_column($stmt->fetchAll(), 'id'));
    }

    /**
     * @param int[] $studentIds
     * @param int[] $subjectIds the subjects whose results count (the teacher's department)
     * @return array{achieved_percent: ?int, outcome_results: int, need_support: int, assessed_students: int,
     *               students: array<int, array{average: ?float, outcomes_achieved: int, outcomes_assessed: int}>}
     */
    public static function forStudents($db, array $studentIds, array $subjectIds): array
    {
        $students = [];
        foreach ($studentIds as $sid) {
            $students[$sid] = ['average' => null, 'outcomes_achieved' => 0, 'outcomes_assessed' => 0];
        }
        $empty = ['achieved_percent' => null, 'outcome_results' => 0, 'need_support' => 0, 'assessed_students' => 0, 'students' => $students];
        if (!$studentIds || !$subjectIds) {
            return $empty;
        }

        // Student x outcome results (Learning Outcome Assessments)
        $stmt = $db->prepare(
            "SELECT sb.student_id, alo.learning_outcome_id, AVG(sb.percentage) AS pct
             FROM assignment_learning_outcomes alo
             INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
                    AND a.subject_id IN (" . self::in($subjectIds) . ")
             INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL
                    AND sb.status = 'returned' AND sb.percentage IS NOT NULL
             WHERE sb.student_id IN (" . self::in($studentIds) . ")
             GROUP BY sb.student_id, alo.learning_outcome_id"
        );
        $stmt->execute(array_merge($subjectIds, $studentIds));
        $pairs = 0;
        $achieved = 0;
        foreach ($stmt->fetchAll() as $r) {
            $sid = (int) $r['student_id'];
            $ok = (float) $r['pct'] >= self::ACHIEVED_FROM;
            $pairs++;
            $achieved += $ok ? 1 : 0;
            $students[$sid]['outcomes_assessed']++;
            $students[$sid]['outcomes_achieved'] += $ok ? 1 : 0;
        }

        // Each student's average over returned LOA and AOI results
        $stmt = $db->prepare(
            "SELECT sb.student_id, AVG(sb.percentage) AS pct
             FROM assignment_submissions sb
             INNER JOIN assignments a ON a.id = sb.assignment_id AND a.deleted_at IS NULL
                    AND a.assessment_category IN ('LOA', 'AOI') AND a.subject_id IN (" . self::in($subjectIds) . ")
             WHERE sb.student_id IN (" . self::in($studentIds) . ") AND sb.deleted_at IS NULL
               AND sb.status = 'returned' AND sb.percentage IS NOT NULL
             GROUP BY sb.student_id"
        );
        $stmt->execute(array_merge($subjectIds, $studentIds));
        $needSupport = 0;
        $assessed = 0;
        foreach ($stmt->fetchAll() as $r) {
            $avg = round((float) $r['pct'], 1);
            $students[(int) $r['student_id']]['average'] = $avg;
            $assessed++;
            $needSupport += $avg < self::SUPPORT_BELOW ? 1 : 0;
        }

        return [
            'achieved_percent' => $pairs ? (int) round($achieved / $pairs * 100) : null,
            'outcome_results' => $pairs,
            'need_support' => $needSupport,
            'assessed_students' => $assessed,
            'students' => $students,
        ];
    }

    /** @return int[] the subjects of a department */
    public static function departmentSubjectIds($db, ?int $departmentId): array
    {
        if (!$departmentId) {
            return [];
        }
        $stmt = $db->prepare("SELECT id FROM subjects WHERE department_id = ? AND deleted_at IS NULL");
        $stmt->execute([$departmentId]);
        return array_map('intval', array_column($stmt->fetchAll(), 'id'));
    }
}
