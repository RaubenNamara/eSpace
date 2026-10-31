<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Support\Tenant;

/**
 * Login slips - one small card per student with their login and first password, printed for a
 * class (or one student) and cut out to hand round. And a teacher resetting a student's
 * forgotten password, which many students can't do themselves (no email).
 *
 * A student's first password is their admission number (Admin\StudentController). A slip shows it
 * only while it still IS the password - one the student has changed is never shown ("the password
 * you chose"); a reset sets it back to the admission number.
 *
 * The login is the username, with "@school" at a school other than the home one (Tenant::loginFor).
 *
 * Admins: any class or student. Teachers: students enrolled in their department.
 */
class LoginSlipController extends Controller
{
    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function isAdmin(): bool
    {
        return in_array($this->getCurrentUserRole(), ['admin', 'super_admin'], true);
    }

    /** The teacher's department, or null */
    private function teacherDepartment(): ?int
    {
        $teacherId = $this->resolveActiveTeacherId();
        if (!$teacherId) {
            return null;
        }
        $stmt = $this->db()->prepare('SELECT department_id FROM teachers WHERE id = ?');
        $stmt->execute([$teacherId]);
        $dep = $stmt->fetchColumn();
        return $dep ? (int) $dep : null;
    }

    /**
     * GET /api/admin/login-slips?class_id= | ?student_id=
     * GET /api/teacher/login-slips?class_id= | ?student_id=
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $admin = $this->isAdmin();
        $department = $admin ? null : $this->teacherDepartment();
        if (!$admin && !$department) {
            $this->forbidden('Only administrators and teachers in a department can print login slips');
            return;
        }
        $classId = (int) ($_GET['class_id'] ?? 0);
        $studentId = (int) ($_GET['student_id'] ?? 0);
        if (!$classId && !$studentId) {
            $this->validationError(['class_id' => 'Choose a class']);
            return;
        }

        $where = ["se.deleted_at IS NULL", "se.status = 'active'"];
        $params = [];
        if ($classId) {
            $where[] = 'se.class_id = ?';
            $params[] = $classId;
        }
        if ($studentId) {
            $where[] = 'se.student_id = ?';
            $params[] = $studentId;
        }
        if ($department) {
            $where[] = 'se.department_id = ?';
            $params[] = $department;
        }
        $stmt = $this->db()->prepare(
            "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.username, s.password,
                    MAX(CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT(' ', c.stream_name)))) AS class_label
             FROM student_department_enrollments se
             INNER JOIN students s ON s.id = se.student_id AND s.deleted_at IS NULL
             LEFT JOIN classes c ON c.id = se.class_id
             WHERE " . implode(' AND ', $where) . "
             GROUP BY s.id, s.first_name, s.last_name, s.admission_number, s.username, s.password
             ORDER BY s.last_name, s.first_name"
        );
        $stmt->execute($params);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        if ($studentId && !$rows) {
            $this->notFound('Student not found');
            return;
        }
        $this->success([
            'school' => $this->schoolName(),
            'slips' => array_map(fn($r) => $this->slip($r), $rows),
        ]);
    }

    /**
     * A teacher (or admin) sets a student's forgotten password back to their admission number,
     * and gets their slip to print.
     * POST /api/teacher/students/{id}/reset-password
     */
    public function reset($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $admin = $this->isAdmin();
        $department = $admin ? null : $this->teacherDepartment();
        if (!$admin && !$department) {
            $this->forbidden();
            return;
        }
        $sql = "SELECT s.id, s.first_name, s.last_name, s.admission_number, s.username FROM students s WHERE s.id = ? AND s.deleted_at IS NULL";
        $params = [(int) $id];
        if ($department) {
            $sql .= " AND EXISTS (SELECT 1 FROM student_department_enrollments se WHERE se.student_id = s.id AND se.department_id = ? AND se.deleted_at IS NULL AND se.status = 'active')";
            $params[] = $department;
        }
        $stmt = $this->db()->prepare($sql);
        $stmt->execute($params);
        $student = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$student) {
            $this->notFound('Student not found in your department');
            return;
        }
        if (trim((string) $student['admission_number']) === '') {
            $this->error('This student has no admission number to use as a first password - ask the administrator.', 422);
            return;
        }
        $this->db()->prepare('UPDATE students SET password = ?, updated_at = NOW() WHERE id = ?')
            ->execute([password_hash((string) $student['admission_number'], PASSWORD_BCRYPT), (int) $student['id']]);

        $this->success([
            'login' => Tenant::loginFor((string) ($student['username'] ?: $student['admission_number']), Tenant::sessionCode() ?? Tenant::homeCode()),
            'password' => $student['admission_number'],
        ], 'Password reset to the admission number');
    }

    private function slip(array $r): array
    {
        $username = (string) ($r['username'] ?: $r['admission_number']);
        $adm = (string) $r['admission_number'];
        // the first password only while it still is the password - never one the student chose
        $isFirst = $adm !== '' && !empty($r['password']) && password_verify($adm, (string) $r['password']);
        return [
            'student_id' => (int) $r['id'],
            'name' => trim($r['first_name'] . ' ' . $r['last_name']),
            'admission_number' => $adm,
            'class' => $r['class_label'] ?? null,
            'login' => Tenant::loginFor($username, Tenant::sessionCode() ?? Tenant::homeCode()),
            'password' => $isFirst ? $adm : null,
        ];
    }

    private function schoolName(): ?string
    {
        try {
            return $this->db()->query('SELECT school_name FROM school_settings ORDER BY id LIMIT 1')->fetchColumn() ?: null;
        } catch (\PDOException $e) {
            return null;
        }
    }
}
