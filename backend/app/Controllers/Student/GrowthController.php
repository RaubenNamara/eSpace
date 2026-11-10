<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\GrowthService;

/**
 * A student's own growth: how much their recent results have improved on their earlier ones, and
 * the learning outcomes they achieved this term (see GrowthService), with where that places them
 * in their class stream. Only the student's own figures are sent - never a classmate's name or
 * marks (the old class board listed classmates, and sent their averages to the browser).
 *
 * GET /student/growth
 */
class GrowthController extends Controller
{
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
            $this->success(['class_name' => null, 'me' => null, 'student_count' => 0]);
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
            'me' => $me,
        ]);
    }
}
