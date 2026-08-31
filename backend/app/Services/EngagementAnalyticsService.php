<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Engagement Analytics Service
 *
 * Shared by Teacher\AnalyticsController, HOD\AnalyticsController and Admin\AnalyticsController -
 * "did a student open/watch/attend this content at least once", not a grade or a reading position.
 * Distinct from PerformanceReportService, which is assignment/grade-based.
 *
 * Two-step per module (avoids N+1 per-student queries):
 *  1. totals-by-class: for every class in scope, how many published/ended items are visible to it
 *     (department + class_id/class_group_name match, same shape as every Student\*Controller's
 *     visibilityClause(), minus the withdrawn-teacher exclusion which doesn't matter in aggregate).
 *  2. engaged-by-student: for every student in scope, how many of those items they have an
 *     engagement row for.
 * Merged in PHP against the roster so every student appears even with zero engagement.
 *
 * Roster/scope note: class_subjects is confirmed empty in this live database (see
 * PerformanceReportService's docblock) - "which classes does this teacher teach" is instead
 * determined the same way PerformanceReportService::teacherCanAccessClass does: classes where the
 * teacher is the designated class_teacher, OR classes they've created at least one assignment for.
 * class_subjects is still checked (harmless, forward-compatible) if it's ever populated. Teacher
 * scope is class-only, not further narrowed by subject - a designated class_teacher's homeroom
 * relationship covers the whole class, not one subject (see teacherScope()'s own docblock).
 */
class EngagementAnalyticsService
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    // ---------------------------------------------------------------------
    // Rosters
    // ---------------------------------------------------------------------

    /**
     * Every active student in one department, with their class - one row per student. A student
     * can have more than one active enrollment row for the same department (confirmed dirty data
     * in this live database - e.g. two rows in different classes), so this picks a single
     * deterministic enrollment (lowest id) per student rather than joining every one, which would
     * otherwise duplicate that student in the roster.
     */
    public function departmentRoster(int $departmentId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT s.id AS student_id, s.first_name, s.last_name, s.admission_number,
                    sde.class_id,
                    CONCAT(c.name, IF(c.stream_name IS NOT NULL AND c.stream_name != '', CONCAT(' - ', c.stream_name), '')) AS class_name
             FROM (
                SELECT student_id, MIN(id) AS enrollment_id
                FROM student_department_enrollments
                WHERE department_id = :department_id AND status = 'active' AND deleted_at IS NULL
                GROUP BY student_id
             ) picked
             INNER JOIN student_department_enrollments sde ON sde.id = picked.enrollment_id
             INNER JOIN students s ON s.id = sde.student_id AND s.deleted_at IS NULL
             LEFT JOIN classes c ON c.id = sde.class_id
             ORDER BY s.last_name, s.first_name"
        );
        $stmt->execute(['department_id' => $departmentId]);
        return $stmt->fetchAll();
    }

    /**
     * Every active student, across every department (Admin/Super Admin), optionally narrowed to
     * one department - one row per student, same "pick one enrollment" reasoning as
     * departmentRoster() (a student can belong to several departments too; that's collapsed to one
     * representative row here since the engagement figures already aggregate across all of a
     * student's departments in moduleBreakdown(), not per-department).
     */
    public function schoolRoster(?int $departmentId = null): array
    {
        $where = "status = 'active' AND deleted_at IS NULL";
        $params = [];
        if ($departmentId) {
            $where .= " AND department_id = :department_id";
            $params['department_id'] = $departmentId;
        }

        $stmt = $this->getDb()->prepare(
            "SELECT s.id AS student_id, s.first_name, s.last_name, s.admission_number,
                    sde.class_id,
                    CONCAT(c.name, IF(c.stream_name IS NOT NULL AND c.stream_name != '', CONCAT(' - ', c.stream_name), '')) AS class_name, sde.department_id
             FROM (
                SELECT student_id, MIN(id) AS enrollment_id
                FROM student_department_enrollments
                WHERE {$where}
                GROUP BY student_id
             ) picked
             INNER JOIN student_department_enrollments sde ON sde.id = picked.enrollment_id
             INNER JOIN students s ON s.id = sde.student_id AND s.deleted_at IS NULL
             LEFT JOIN classes c ON c.id = sde.class_id
             ORDER BY s.last_name, s.first_name"
        );
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    /**
     * Only the students in classes this teacher actually teaches within one department - the
     * "his class attached to him in a department" scope. Scoped by class only (not further by
     * subject) - a designated class_teacher is a homeroom relationship to the whole class, and a
     * teacher can otherwise own a class here purely through having assigned work to it, neither of
     * which implies a single subject to filter down to.
     */
    public function teacherScope(int $teacherId, int $departmentId): array
    {
        $db = $this->getDb();

        $classes = $db->prepare(
            "SELECT DISTINCT c.id FROM classes c
             WHERE c.deleted_at IS NULL AND (
                c.class_teacher_id = :teacher_id
                OR EXISTS (SELECT 1 FROM class_subjects cs WHERE cs.class_id = c.id AND cs.teacher_id = :teacher_id2)
                OR EXISTS (SELECT 1 FROM assignments a WHERE a.class_id = c.id AND a.teacher_id = :teacher_id3 AND a.deleted_at IS NULL)
             )"
        );
        $classes->execute(['teacher_id' => $teacherId, 'teacher_id2' => $teacherId, 'teacher_id3' => $teacherId]);
        $classIds = array_map(fn($row) => (int) $row['id'], $classes->fetchAll());

        if (empty($classIds)) {
            return ['roster' => []];
        }

        // Same "pick one enrollment per student" reasoning as departmentRoster() - a student could
        // otherwise have two active rows across two of this teacher's own classes and get listed twice.
        $placeholders = implode(',', array_fill(0, count($classIds), '?'));
        $roster = $db->prepare(
            "SELECT s.id AS student_id, s.first_name, s.last_name, s.admission_number,
                    sde.class_id,
                    CONCAT(c.name, IF(c.stream_name IS NOT NULL AND c.stream_name != '', CONCAT(' - ', c.stream_name), '')) AS class_name
             FROM (
                SELECT student_id, MIN(id) AS enrollment_id
                FROM student_department_enrollments
                WHERE department_id = ? AND status = 'active' AND deleted_at IS NULL AND class_id IN ({$placeholders})
                GROUP BY student_id
             ) picked
             INNER JOIN student_department_enrollments sde ON sde.id = picked.enrollment_id
             INNER JOIN students s ON s.id = sde.student_id AND s.deleted_at IS NULL
             LEFT JOIN classes c ON c.id = sde.class_id
             ORDER BY s.last_name, s.first_name"
        );
        $roster->execute(array_merge([$departmentId], $classIds));

        return ['roster' => $roster->fetchAll()];
    }

    // ---------------------------------------------------------------------
    // Per-module breakdowns
    // ---------------------------------------------------------------------

    /**
     * @param array $roster departmentRoster()/schoolRoster()/teacherScope()['roster'] shape
     * @param string $contentTable e.g. 'enote_topics'
     * @param string $contentAlias e.g. 'et'
     * @param array<string> $activeStatuses e.g. ['published'] or ['started','ended']
     * @param string $progressTable e.g. 'enote_progress'
     * @param string $progressFk the progress table's column referencing the content row, e.g. 'topic_id'
     * @param ?int $departmentId null = no department filter (Admin school-wide with no department filter)
     * @param string $progressCondition extra SQL condition on the progress row itself (alias p),
     *   e.g. video_views needs "p.completed_at IS NOT NULL" - a row exists from the very first
     *   watch-progress ping, long before the 90% "watched" threshold, unlike enote_progress/
     *   library_progress/item_bank_attempts where a row's mere existence already means "opened".
     * @return array<int, array{engaged:int,total:int,percentage:?float}> keyed by student_id
     */
    private function moduleBreakdown(
        array $roster,
        string $contentTable,
        string $contentAlias,
        array $activeStatuses,
        string $progressTable,
        string $progressFk,
        ?int $departmentId,
        string $progressCondition = ''
    ): array {
        if (empty($roster)) {
            return [];
        }

        $db = $this->getDb();
        $a = $contentAlias;

        $statusPlaceholders = implode(',', array_fill(0, count($activeStatuses), '?'));
        $params = $activeStatuses;

        $deptClause = '';
        if ($departmentId !== null) {
            $deptClause = " AND {$a}.department_id = ?";
            $params[] = $departmentId;
        }

        // 1. Totals per class: how many active items are visible to each class in the roster.
        $classIds = array_values(array_unique(array_map(fn($r) => (int) $r['class_id'], $roster)));
        $classPlaceholders = implode(',', array_fill(0, count($classIds), '?'));

        $totalsSql = "SELECT c.id AS class_id, COUNT(DISTINCT {$a}.id) AS total
             FROM classes c
             LEFT JOIN {$contentTable} {$a} ON {$a}.status IN ({$statusPlaceholders}) AND {$a}.deleted_at IS NULL{$deptClause}
               AND ({$a}.class_id IS NULL AND {$a}.class_group_name IS NULL OR {$a}.class_id = c.id OR {$a}.class_group_name = c.name)
             WHERE c.id IN ({$classPlaceholders})
             GROUP BY c.id";
        $totalsStmt = $db->prepare($totalsSql);
        $totalsStmt->execute(array_merge($params, $classIds));
        $totalByClass = [];
        foreach ($totalsStmt->fetchAll() as $row) {
            $totalByClass[(int) $row['class_id']] = (int) $row['total'];
        }

        // 2. Engaged count per student: how many of those items this student has a progress row for.
        $studentIds = array_map(fn($r) => (int) $r['student_id'], $roster);
        $studentPlaceholders = implode(',', array_fill(0, count($studentIds), '?'));

        $engagedParams = $activeStatuses;
        if ($departmentId !== null) {
            $engagedParams[] = $departmentId;
        }
        $engagedParams = array_merge($engagedParams, $studentIds);

        $engagedSql = "SELECT p.student_id, COUNT(DISTINCT p.{$progressFk}) AS engaged
             FROM {$progressTable} p
             INNER JOIN {$contentTable} {$a} ON {$a}.id = p.{$progressFk}
               AND {$a}.status IN ({$statusPlaceholders}) AND {$a}.deleted_at IS NULL{$deptClause}
             WHERE p.student_id IN ({$studentPlaceholders}){$progressCondition}
             GROUP BY p.student_id";
        $engagedStmt = $db->prepare($engagedSql);
        $engagedStmt->execute($engagedParams);
        $engagedByStudent = [];
        foreach ($engagedStmt->fetchAll() as $row) {
            $engagedByStudent[(int) $row['student_id']] = (int) $row['engaged'];
        }

        // 3. Merge onto the roster so every student appears, even with zero engagement.
        $result = [];
        foreach ($roster as $row) {
            $studentId = (int) $row['student_id'];
            $total = $totalByClass[(int) $row['class_id']] ?? 0;
            $engaged = min($engagedByStudent[$studentId] ?? 0, $total);
            $result[$studentId] = [
                'engaged' => $engaged,
                'total' => $total,
                'percentage' => $total > 0 ? round($engaged / $total * 100, 1) : null,
            ];
        }
        return $result;
    }

    public function enotesBreakdown(array $roster, ?int $departmentId): array
    {
        return $this->moduleBreakdown($roster, 'enote_topics', 'et', ['published'], 'enote_progress', 'topic_id', $departmentId);
    }

    public function libraryBreakdown(array $roster, ?int $departmentId): array
    {
        return $this->moduleBreakdown($roster, 'library_books', 'lb', ['published'], 'library_progress', 'book_id', $departmentId);
    }

    public function itemBankBreakdown(array $roster, ?int $departmentId): array
    {
        return $this->moduleBreakdown($roster, 'item_bank_questions', 'q', ['published'], 'item_bank_attempts', 'question_id', $departmentId);
    }

    public function videoBreakdown(array $roster, ?int $departmentId): array
    {
        return $this->moduleBreakdown($roster, 'videos', 'v', ['published'], 'video_views', 'video_id', $departmentId, ' AND p.completed_at IS NOT NULL');
    }

    /**
     * Live classes have no subject-agnostic "content library" concept in the same sense - a
     * session simply happened or didn't - so this reuses the same engine with live_classes'
     * own status vocabulary instead of published/draft/archived.
     */
    public function liveClassBreakdown(array $roster, ?int $departmentId): array
    {
        return $this->moduleBreakdown($roster, 'live_classes', 'lc', ['started', 'ended'], 'live_class_attendance', 'live_class_id', $departmentId);
    }

    /**
     * Rolls a per-student breakdown into department/class-wide totals for the summary tiles.
     */
    public function summarize(array $breakdown): array
    {
        $engaged = array_sum(array_column($breakdown, 'engaged'));
        $total = array_sum(array_column($breakdown, 'total'));
        return [
            'engaged' => $engaged,
            'total' => $total,
            'percentage' => $total > 0 ? round($engaged / $total * 100, 1) : null,
        ];
    }
}
