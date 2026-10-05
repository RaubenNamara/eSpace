<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Whether a student is one of an assessment's learners - the same rule the student Assessments
 * page uses (Student\AssignmentController::index): enrolled in the assessment's class, stream group
 * or one of its extra classes, in the subject's department, at the time it was published, and not
 * withdrawn from that teacher. Shared by Live Quiz and Daily Revision so they never disagree.
 */
class AssignmentAccess
{
    /**
     * SQL condition for an assignment aliased `$a` whose subject is aliased `$s`. Binds two `?`
     * placeholders, both the student id.
     */
    public static function clause(string $a = 'a', string $s = 's'): string
    {
        return "EXISTS (
                SELECT 1 FROM student_department_enrollments sde
                LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                WHERE sde.student_id = ?
                  AND (
                    sde.class_id = {$a}.class_id
                    OR ({$a}.class_group_name IS NOT NULL AND sde_c.name = {$a}.class_group_name)
                    OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = {$a}.id AND ac.class_id = sde.class_id)
                  )
                  AND sde.department_id = {$s}.department_id
                  AND sde.deleted_at IS NULL
                  AND sde.status = 'active'
                  AND COALESCE({$a}.published_at, {$a}.created_at) BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
            )
            AND NOT EXISTS (
                SELECT 1 FROM student_teacher_enrollments ste
                WHERE ste.student_id = ?
                  AND ste.teacher_id = {$a}.teacher_id
                  AND ste.department_id = {$s}.department_id
                  AND ste.status = 'withdrawn'
            )";
    }

    public static function canSee($db, int $studentId, int $assignmentId): bool
    {
        $stmt = $db->prepare(
            "SELECT 1 FROM assignments a INNER JOIN subjects s ON s.id = a.subject_id
             WHERE a.id = ? AND a.deleted_at IS NULL AND a.status = 'published' AND " . self::clause()
        );
        $stmt->execute([$assignmentId, $studentId, $studentId]);
        return (bool) $stmt->fetchColumn();
    }
}
