<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\TeachingUsage;

/**
 * How the HOD's department's teachers are using Tusome over the last 7 or 30 days, against the
 * period before: teachers active, sign-ins, everything done, scripts marked and content made. The
 * department's teachers are its members (teacher_department_assignments), as on the Teachers page.
 *
 * GET /hod/teacher-usage?days=30
 */
class TeacherUsageController extends Controller
{
    public function index(): void
    {
        $this->requireAuth();
        $departmentId = $this->hodDepartmentId();
        if (!$departmentId) {
            $this->forbidden();
            return;
        }
        $ids = $this->departmentTeacherIds($departmentId);
        $this->success(TeachingUsage::summary($ids, 'teacher', $ids, (int) $this->query('days', 30)));
    }

    /**
     * Each of the department's teachers' work over the last 7, 30 or 90 days, for the chart
     * comparing them (most work first)
     *
     * GET /hod/teacher-performance?days=30
     */
    public function performance(): void
    {
        $this->requireAuth();
        $departmentId = $this->hodDepartmentId();
        if (!$departmentId) {
            $this->forbidden();
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        $ids = $this->departmentTeacherIds($departmentId);
        $days = (int) $this->query('days', 30);
        $work = TeachingUsage::perTeacher($ids, $days);

        $names = [];
        if ($ids) {
            $in = implode(',', array_fill(0, count($ids), '?'));
            $stmt = $db->prepare("SELECT id, first_name, last_name FROM teachers WHERE id IN ($in)");
            $stmt->execute($ids);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $t) {
                $names[(int) $t['id']] = trim($t['first_name'] . ' ' . $t['last_name']);
            }
        }
        $teachers = [];
        foreach ($work as $id => $w) {
            $teachers[] = ['id' => $id, 'name' => $names[$id] ?? 'Teacher'] + $w
                + ['total' => $w['enotes'] + $w['elibrary'] + $w['item_bank'] + $w['assessments'] + $w['marked']];
        }
        usort($teachers, fn ($a, $b) => $b['total'] <=> $a['total'] ?: strcmp($a['name'], $b['name']));
        $this->success(['days' => in_array($days, [7, 30, 90], true) ? $days : 30, 'teachers' => $teachers]);
    }

    /** The HOD's department, or 0 when the user is not a HOD */
    private function hodDepartmentId(): int
    {
        if (($_SESSION['role'] ?? null) !== 'hod') {
            return 0;
        }
        $stmt = \eSpace\Config\Database::getInstance()->prepare('SELECT department_id FROM hods WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([(int) ($_SESSION['user_id'] ?? 0)]);
        return (int) $stmt->fetchColumn();
    }

    /**
     * The department's active teachers (its members, as on the Teachers page)
     *
     * @return int[]
     */
    private function departmentTeacherIds(int $departmentId): array
    {
        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare(
            'SELECT t.id FROM teachers t
             WHERE t.deleted_at IS NULL AND t.is_active = 1
               AND EXISTS (SELECT 1 FROM teacher_department_assignments tda
                           WHERE tda.teacher_id = t.id AND tda.department_id = ? AND tda.deleted_at IS NULL)'
        );
        $stmt->execute([$departmentId]);
        return array_map('intval', $stmt->fetchAll(\PDO::FETCH_COLUMN));
    }
}
