<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Teacher Dashboard Controller
 * 
 * Handles teacher dashboard operations including analytics.
 */
class DashboardController extends Controller
{
    /**
     * Get database instance
     */
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Get current user ID from session
     */
    protected function getCurrentUserId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Get current teacher's active department ID (session-scoped - see
     * Controller::getActiveDepartmentId(); a teacher in more than one department can switch
     * this via PUT /teacher/departments/active without changing their admin-set primary)
     */
    private function getTeacherDepartmentId(): ?int
    {
        return $this->getActiveDepartmentId();
    }

    /**
     * Get teacher dashboard analytics
     * GET /teacher/dashboard
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $db = $this->getDb();

        try {
            // Total enrollments in teacher's department
            $stmt = $db->prepare("SELECT COUNT(*) as total FROM student_department_enrollments WHERE department_id = :department_id AND deleted_at IS NULL");
            $stmt->execute(['department_id' => $departmentId]);
            $totalEnrollments = $stmt->fetch()['total'];

            // Enrollments by class-stream in teacher's department - one row per actual
            // class-stream (e.g. "S.1 A"/"S.1 B"), ordered so streams of the same class group
            // together in the chart instead of being scattered by count.
            $stmt = $db->prepare("
                SELECT c.name as class_name, c.level, c.stream_name, COUNT(se.id) as count
                FROM student_department_enrollments se
                INNER JOIN classes c ON se.class_id = c.id
                WHERE se.department_id = :department_id AND se.deleted_at IS NULL
                GROUP BY c.id, c.name, c.level, c.stream_name
                ORDER BY c.name ASC, c.stream_name ASC
            ");
            $stmt->execute(['department_id' => $departmentId]);
            $enrollmentsByClass = $stmt->fetchAll();

            // Enrollments by academic year in teacher's department
            $stmt = $db->prepare("
                SELECT academic_year, COUNT(*) as count
                FROM student_department_enrollments
                WHERE department_id = :department_id AND deleted_at IS NULL
                GROUP BY academic_year
                ORDER BY academic_year DESC
            ");
            $stmt->execute(['department_id' => $departmentId]);
            $enrollmentsByYear = $stmt->fetchAll();

            // Recent enrollments (last 7 days) in teacher's department
            $stmt = $db->prepare("
                SELECT COUNT(*) as count
                FROM student_department_enrollments
                WHERE department_id = :department_id AND deleted_at IS NULL AND enrolled_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            ");
            $stmt->execute(['department_id' => $departmentId]);
            $recentEnrollments = $stmt->fetch()['count'];

            // Get students by gender in teacher's department
            $stmt = $db->prepare("
                SELECT 
                    SUM(CASE WHEN s.gender = 'male' THEN 1 ELSE 0 END) as male,
                    SUM(CASE WHEN s.gender = 'female' THEN 1 ELSE 0 END) as female,
                    SUM(CASE WHEN s.gender = 'other' THEN 1 ELSE 0 END) as other
                FROM student_department_enrollments se
                INNER JOIN students s ON se.student_id = s.id
                WHERE se.department_id = :department_id AND se.deleted_at IS NULL
            ");
            $stmt->execute(['department_id' => $departmentId]);
            $genderData = $stmt->fetch();

            // Get students by stream in teacher's department
            $stmt = $db->prepare("
                SELECT c.stream_name, COUNT(*) as count
                FROM student_department_enrollments se
                INNER JOIN classes c ON se.class_id = c.id
                WHERE se.department_id = :department_id AND se.deleted_at IS NULL
                AND c.stream_name IS NOT NULL AND c.stream_name != ''
                GROUP BY c.stream_name
                ORDER BY count DESC
            ");
            $stmt->execute(['department_id' => $departmentId]);
            $streamData = $stmt->fetchAll();

            // Get department info
            $deptSql = "SELECT id, name, code, description FROM departments WHERE id = :id AND deleted_at IS NULL";
            $deptStmt = $db->prepare($deptSql);
            $deptStmt->execute(['id' => $departmentId]);
            $departmentInfo = $deptStmt->fetch();

            $this->success([
                'total_enrollments' => $totalEnrollments,
                'recent_enrollments' => $recentEnrollments,
                'by_class' => $enrollmentsByClass,
                'by_academic_year' => $enrollmentsByYear,
                'by_stream' => $streamData,
                'by_gender' => [
                    'male' => (int) ($genderData['male'] ?? 0),
                    'female' => (int) ($genderData['female'] ?? 0),
                    'other' => (int) ($genderData['other'] ?? 0),
                ],
                'department' => $departmentInfo
            ], 'Teacher dashboard analytics retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch teacher dashboard analytics: " . $e->getMessage());
            $this->error('Failed to fetch analytics: ' . $e->getMessage(), 500);
        }
    }
}
