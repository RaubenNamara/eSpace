<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\GrowthService;

/**
 * The class growth board: who in the student's class stream is improving most - by their recent
 * results against their earlier ones, and by learning outcomes achieved this term - so a student
 * doesn't have to be top of the class to be on it (see GrowthService). Classmates appear by first
 * name and initial; the student sees where they stand themselves.
 *
 * GET /student/growth
 */
class GrowthController extends Controller
{
    private const TOP = 10;

    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        $studentId = (int) ($_SESSION['user_id'] ?? 0);

        $stmt = $db->prepare(
            "SELECT sde.class_id,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_name
             FROM student_department_enrollments sde
             INNER JOIN classes c ON c.id = sde.class_id
             WHERE sde.student_id = ? AND sde.status = 'active' AND sde.deleted_at IS NULL
             ORDER BY sde.id DESC LIMIT 1"
        );
        $stmt->execute([$studentId]);
        $class = $stmt->fetch();
        if (!$class) {
            $this->success(['class_name' => null, 'improved' => [], 'climbers' => [], 'me' => null, 'student_count' => 0]);
            return;
        }

        $stmt = $db->prepare(
            "SELECT DISTINCT st.id, st.first_name, st.last_name
             FROM student_department_enrollments sde
             INNER JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL
             WHERE sde.class_id = ? AND sde.status = 'active' AND sde.deleted_at IS NULL"
        );
        $stmt->execute([(int) $class['class_id']]);
        $students = [];
        foreach ($stmt->fetchAll() as $s) {
            $last = trim((string) $s['last_name']);
            $students[(int) $s['id']] = trim(ucwords(mb_strtolower(trim((string) $s['first_name']))) . ($last !== '' ? ' ' . mb_strtoupper(mb_substr($last, 0, 1)) . '.' : ''));
        }

        $growth = GrowthService::forStudents($db, array_keys($students), GrowthService::currentTermId($db));

        $row = fn(int $sid) => ['student_id' => $sid, 'name' => $students[$sid] ?? '', 'is_me' => $sid === $studentId] + $growth[$sid];

        $improved = array_keys(array_filter($growth, fn($g) => $g['improvement'] !== null && $g['improvement'] > 0));
        usort($improved, fn($a, $b) => $growth[$b]['improvement'] <=> $growth[$a]['improvement'] ?: strcmp($students[$a], $students[$b]));
        $climbers = array_keys(array_filter($growth, fn($g) => $g['outcomes_term'] > 0));
        usort($climbers, fn($a, $b) => $growth[$b]['outcomes_term'] <=> $growth[$a]['outcomes_term'] ?: strcmp($students[$a], $students[$b]));

        $me = isset($growth[$studentId]) ? $row($studentId) + [
            'improved_rank' => ($i = array_search($studentId, $improved, true)) !== false ? $i + 1 : null,
            'climb_rank' => ($j = array_search($studentId, $climbers, true)) !== false ? $j + 1 : null,
        ] : null;

        $this->success([
            'class_name' => $class['class_name'],
            'student_count' => count($students),
            'improved' => array_map($row, array_slice($improved, 0, self::TOP)),
            'climbers' => array_map($row, array_slice($climbers, 0, self::TOP)),
            'me' => $me,
        ]);
    }
}
