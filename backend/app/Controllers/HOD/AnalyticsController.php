<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;

/**
 * HOD Analytics Controller
 *
 * Department-wide analytics for the /hod/analytics routes registered in routes/api.php - these
 * pointed at this class before it existed (a fatal "class not found" 500 for anyone who visited
 * the page), matching a gap already noted elsewhere in this codebase (see
 * HOD\PerformanceController's comment on the missing HOD\SubjectController).
 *
 * Scoped consistently with the rest of the HOD controllers: subjects/assignments via
 * subjects.department_id, students via student_department_enrollments, teachers via
 * teachers.department_id - the same department-wide (not class-restricted) scope used by
 * HOD\TeacherController and HOD\StudentController, so this covers every class level (S1-S6).
 */
class AnalyticsController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function isHOD(): bool
    {
        return $this->getCurrentUserRole() === 'hod';
    }

    private function getDepartmentId(): ?int
    {
        $hodId = $_SESSION['user_id'] ?? null;
        if (!$hodId) {
            return null;
        }
        $stmt = $this->getDb()->prepare("SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $hodId]);
        $hod = $stmt->fetch();
        return $hod ? (int) $hod['department_id'] : null;
    }

    /**
     * GET /hod/analytics
     * Department overview: headcounts, department-wide average score, submission status mix.
     */
    public function index(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found', 404);
            return;
        }

        $db = $this->getDb();

        $department = $db->prepare("SELECT id, name, code, description FROM departments WHERE id = :id");
        $department->execute(['id' => $departmentId]);
        $department = $department->fetch();

        $teacherCount = $db->prepare("SELECT COUNT(*) as count FROM teachers t WHERE t.deleted_at IS NULL AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)");
        $teacherCount->execute(['department_id' => $departmentId]);
        $teacherCount = (int) $teacherCount->fetch()['count'];

        $subjectCount = $db->prepare("SELECT COUNT(*) as count FROM subjects WHERE department_id = :department_id");
        $subjectCount->execute(['department_id' => $departmentId]);
        $subjectCount = (int) $subjectCount->fetch()['count'];

        $studentCount = $db->prepare(
            "SELECT COUNT(DISTINCT student_id) as count FROM student_department_enrollments
             WHERE department_id = :department_id AND status = 'active' AND deleted_at IS NULL"
        );
        $studentCount->execute(['department_id' => $departmentId]);
        $studentCount = (int) $studentCount->fetch()['count'];

        $assignmentCount = $db->prepare(
            "SELECT COUNT(*) as count FROM assignments a
             INNER JOIN subjects s ON a.subject_id = s.id
             WHERE s.department_id = :department_id AND a.deleted_at IS NULL"
        );
        $assignmentCount->execute(['department_id' => $departmentId]);
        $assignmentCount = (int) $assignmentCount->fetch()['count'];

        $avgPercentage = $db->prepare(
            "SELECT AVG(sub.percentage) as avg_percentage FROM assignment_submissions sub
             INNER JOIN assignments a ON sub.assignment_id = a.id
             INNER JOIN subjects s ON a.subject_id = s.id
             WHERE s.department_id = :department_id AND sub.percentage IS NOT NULL AND sub.deleted_at IS NULL"
        );
        $avgPercentage->execute(['department_id' => $departmentId]);
        $avgPercentage = $avgPercentage->fetch()['avg_percentage'];

        $statusBreakdown = $db->prepare(
            "SELECT sub.status, COUNT(*) as count FROM assignment_submissions sub
             INNER JOIN assignments a ON sub.assignment_id = a.id
             INNER JOIN subjects s ON a.subject_id = s.id
             WHERE s.department_id = :department_id AND sub.deleted_at IS NULL
             GROUP BY sub.status"
        );
        $statusBreakdown->execute(['department_id' => $departmentId]);
        $statusBreakdown = $statusBreakdown->fetchAll();

        $this->success([
            'department' => $department,
            'teachers_count' => $teacherCount,
            'subjects_count' => $subjectCount,
            'students_count' => $studentCount,
            'assignments_count' => $assignmentCount,
            'average_percentage' => $avgPercentage !== null ? round((float) $avgPercentage, 1) : null,
            'submission_status_breakdown' => $statusBreakdown,
        ]);
    }

    /**
     * GET /hod/analytics/teachers
     * Per-teacher workload and average student performance.
     */
    public function teachers(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found', 404);
            return;
        }

        $stmt = $this->getDb()->prepare(
            "SELECT t.id, t.first_name, t.last_name, t.employee_number,
                    COUNT(DISTINCT a.id) as assignments_count,
                    COUNT(DISTINCT sub.id) as total_submissions,
                    COUNT(DISTINCT CASE WHEN sub.status IN ('graded', 'returned') THEN sub.id END) as submissions_marked,
                    COUNT(DISTINCT CASE WHEN sub.status IN ('submitted', 'marking') THEN sub.id END) as submissions_pending,
                    COUNT(DISTINCT sub.student_id) as students_reached,
                    AVG(sub.percentage) as average_percentage
             FROM teachers t
             LEFT JOIN assignments a ON a.teacher_id = t.id AND a.deleted_at IS NULL
             LEFT JOIN assignment_submissions sub ON sub.assignment_id = a.id AND sub.deleted_at IS NULL
             WHERE t.deleted_at IS NULL
               AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)
             GROUP BY t.id, t.first_name, t.last_name, t.employee_number
             ORDER BY t.first_name, t.last_name"
        );
        $stmt->execute(['department_id' => $departmentId]);
        $teachers = $stmt->fetchAll();

        foreach ($teachers as &$teacher) {
            // AVG(sub.percentage) only makes sense over graded submissions - now that the LEFT
            // JOIN above no longer filters sub.percentage IS NOT NULL (needed so
            // total_submissions/submissions_pending count ungraded rows too), MySQL's AVG already
            // ignores NULLs on its own, so this stays correct without a separate query.
            $teacher['average_percentage'] = $teacher['average_percentage'] !== null ? round((float) $teacher['average_percentage'], 1) : null;
        }

        $this->success(['teachers' => $teachers]);
    }

    /**
     * GET /hod/analytics/assignments
     * Per-subject assignment volume and average performance.
     */
    public function assignments(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found', 404);
            return;
        }

        $stmt = $this->getDb()->prepare(
            "SELECT s.id, s.name,
                    COUNT(DISTINCT a.id) as assignment_count,
                    COUNT(DISTINCT sub.id) as submission_count,
                    AVG(sub.percentage) as average_percentage
             FROM subjects s
             LEFT JOIN assignments a ON a.subject_id = s.id AND a.deleted_at IS NULL
             LEFT JOIN assignment_submissions sub ON sub.assignment_id = a.id AND sub.deleted_at IS NULL AND sub.percentage IS NOT NULL
             WHERE s.department_id = :department_id
             GROUP BY s.id, s.name
             ORDER BY s.name"
        );
        $stmt->execute(['department_id' => $departmentId]);
        $subjects = $stmt->fetchAll();

        foreach ($subjects as &$subject) {
            $subject['average_percentage'] = $subject['average_percentage'] !== null ? round((float) $subject['average_percentage'], 1) : null;
        }

        $this->success(['subjects' => $subjects]);
    }

    /**
     * GET /hod/analytics/performance
     * Department-wide average score trend, month by month, over the last 6 months.
     */
    public function performance(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found', 404);
            return;
        }

        $stmt = $this->getDb()->prepare(
            "SELECT DATE_FORMAT(sub.submitted_at, '%Y-%m') as month, AVG(sub.percentage) as average_percentage, COUNT(*) as submission_count
             FROM assignment_submissions sub
             INNER JOIN assignments a ON sub.assignment_id = a.id
             INNER JOIN subjects s ON a.subject_id = s.id
             WHERE s.department_id = :department_id
               AND sub.percentage IS NOT NULL
               AND sub.deleted_at IS NULL
               AND sub.submitted_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
             GROUP BY month
             ORDER BY month ASC"
        );
        $stmt->execute(['department_id' => $departmentId]);
        $trend = $stmt->fetchAll();

        foreach ($trend as &$row) {
            $row['average_percentage'] = round((float) $row['average_percentage'], 1);
        }

        $this->success(['trend' => $trend]);
    }

    /**
     * GET /hod/analytics/reading
     * Library engagement within the department: totals plus the most-bookmarked books (a proxy
     * for "most read", since library_bookmarks records a reading position per student per book).
     */
    public function reading(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found', 404);
            return;
        }

        $db = $this->getDb();

        $totals = $db->prepare(
            "SELECT COUNT(DISTINCT b.id) as books_count,
                    COUNT(DISTINCT bm.student_id) as readers_count
             FROM library_books b
             LEFT JOIN library_bookmarks bm ON bm.book_id = b.id
             WHERE b.department_id = :department_id AND b.is_approved = 1"
        );
        $totals->execute(['department_id' => $departmentId]);
        $totals = $totals->fetch();

        $topBooks = $db->prepare(
            "SELECT b.id, b.title, b.author, COUNT(DISTINCT bm.student_id) as readers_count
             FROM library_books b
             INNER JOIN library_bookmarks bm ON bm.book_id = b.id
             WHERE b.department_id = :department_id AND b.is_approved = 1
             GROUP BY b.id, b.title, b.author
             ORDER BY readers_count DESC
             LIMIT 5"
        );
        $topBooks->execute(['department_id' => $departmentId]);
        $topBooks = $topBooks->fetchAll();

        $this->success([
            'books_count' => (int) $totals['books_count'],
            'readers_count' => (int) $totals['readers_count'],
            'top_books' => $topBooks,
        ]);
    }
}
