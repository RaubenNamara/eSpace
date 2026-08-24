<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student Class Controller
 *
 * Lets a student see the classes they're enrolled in (one card per class/department
 * enrollment, mirroring how Teacher\ClassController scopes a class to a department) and the
 * classmates enrolled in the same class/department.
 */
class ClassController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getStudentId(): ?int
    {
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return null;
        }

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM students WHERE id = :user_id AND deleted_at IS NULL");
        $stmt->execute(['user_id' => $userId]);
        $student = $stmt->fetch();

        return $student ? (int) $student['id'] : null;
    }

    /**
     * Get the classes the student is enrolled in
     * GET /student/classes
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $db = $this->getDb();

        try {
            $sql = "SELECT c.id, c.name, c.level, c.stream_name,
                           sde.department_id, sde.academic_year,
                           d.name as department_name,
                           (SELECT COUNT(*) FROM student_department_enrollments se2
                            WHERE se2.class_id = c.id AND se2.department_id = sde.department_id
                              AND se2.deleted_at IS NULL) as student_count
                    FROM student_department_enrollments sde
                    INNER JOIN classes c ON sde.class_id = c.id
                    LEFT JOIN departments d ON sde.department_id = d.id
                    WHERE sde.student_id = :student_id
                      AND sde.deleted_at IS NULL
                      AND c.deleted_at IS NULL
                    ORDER BY c.level, c.name";

            $stmt = $db->prepare($sql);
            $stmt->execute(['student_id' => $studentId]);
            $classes = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($classes, 'Classes retrieved successfully');
        } catch (\PDOException $e) {
            error_log('Failed to fetch student classes: ' . $e->getMessage());
            $this->error('Failed to fetch classes', 500);
        }
    }

    /**
     * Get the classmates enrolled in the same class/department as the requesting student
     * GET /student/classes/{id}/students?department_id=
     */
    public function students($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $classId = (int) $id;
        $departmentId = (int) $this->query('department_id', 0);

        if (!$departmentId) {
            $this->error('department_id is required', 400);
            return;
        }

        $db = $this->getDb();

        // Verify the requesting student actually belongs to this class/department pairing
        // before revealing classmates.
        $stmt = $db->prepare(
            "SELECT id FROM student_department_enrollments
             WHERE student_id = :student_id AND class_id = :class_id AND department_id = :department_id
               AND deleted_at IS NULL"
        );
        $stmt->execute(['student_id' => $studentId, 'class_id' => $classId, 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->error('You are not enrolled in this class', 403);
            return;
        }

        try {
            $sql = "SELECT se.id as enrollment_id, s.id as student_id, s.admission_number, s.first_name, s.last_name, s.gender,
                           se.department_id, se.academic_year, se.class_id,
                           d.name as department_name, c.name as class_name, c.level, c.stream_name
                    FROM student_department_enrollments se
                    INNER JOIN students s ON se.student_id = s.id
                    LEFT JOIN departments d ON se.department_id = d.id
                    LEFT JOIN classes c ON se.class_id = c.id
                    WHERE se.department_id = :department_id
                      AND se.class_id = :class_id
                      AND se.deleted_at IS NULL
                      AND s.deleted_at IS NULL
                    ORDER BY s.last_name, s.first_name";

            $stmt = $db->prepare($sql);
            $stmt->execute(['department_id' => $departmentId, 'class_id' => $classId]);
            $students = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($students, 'Students retrieved successfully');
        } catch (\PDOException $e) {
            error_log('Failed to fetch classmates: ' . $e->getMessage());
            $this->error('Failed to fetch students', 500);
        }
    }
}
