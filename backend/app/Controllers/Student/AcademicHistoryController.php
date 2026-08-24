<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student Academic History Controller
 *
 * "My Academic History" - the student's own enrollment record across every class/year they've
 * been through, sourced entirely from student_department_enrollments (both active and closed
 * rows - see 068_extend_student_department_enrollments.sql). A student typically has several
 * enrollment rows per period (one per department), so they're grouped here into one card per
 * (class, academic_year) rather than shown as a flat list of department rows.
 */
class AcademicHistoryController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * GET /student/academic-history
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        if (!$this->hasRole('student')) {
            $this->forbidden();
            return;
        }

        $studentId = $this->getCurrentUserId();

        $sql = "SELECT sde.class_id, sde.academic_year, sde.status, sde.start_date, sde.end_date,
                       c.name as class_name, c.level as class_level, c.stream_name,
                       d.name as department_name
                FROM student_department_enrollments sde
                LEFT JOIN classes c ON sde.class_id = c.id
                LEFT JOIN departments d ON sde.department_id = d.id
                WHERE sde.student_id = :student_id AND sde.deleted_at IS NULL
                ORDER BY sde.start_date DESC, sde.class_id";

        $stmt = $this->db->prepare($sql);
        $stmt->execute(['student_id' => $studentId]);
        $rows = $stmt->fetchAll();

        // Group department-level rows into one period per (class, academic_year). A period is
        // "current" only if at least one of its department rows is still active - a student can
        // be mid-transition (some departments closed, one not yet) but the period as a whole
        // reads as current until every row in it has closed.
        $periods = [];
        foreach ($rows as $row) {
            $key = $row['class_id'] . '|' . $row['academic_year'];

            if (!isset($periods[$key])) {
                $periods[$key] = [
                    'class_id' => (int) $row['class_id'],
                    'class_name' => $row['class_name'],
                    'class_level' => $row['class_level'],
                    'stream_name' => $row['stream_name'],
                    'academic_year' => $row['academic_year'],
                    'start_date' => $row['start_date'],
                    'end_date' => $row['end_date'],
                    'is_current' => false,
                    'departments' => [],
                ];
            }

            $period = &$periods[$key];
            $period['departments'][] = $row['department_name'];
            $period['start_date'] = min($period['start_date'], $row['start_date']);
            if ($row['status'] === 'active') {
                $period['is_current'] = true;
                $period['end_date'] = null;
            } elseif ($period['end_date'] !== null && $row['end_date'] !== null) {
                $period['end_date'] = max($period['end_date'], $row['end_date']);
            }
            unset($period);
        }

        $periods = array_values($periods);
        usort($periods, fn($a, $b) => strcmp($b['start_date'], $a['start_date']));

        $this->success(['periods' => $periods]);
    }
}
