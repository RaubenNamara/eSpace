<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\PerformanceReportService;
use eSpace\App\Utils\MarksheetCsvBuilder;

/**
 * HOD Performance & Marksheet Controller
 *
 * An HOD can view performance for any student enrolled in their department, and download a
 * marksheet for any class/subject within their department - broader than a teacher's per-
 * class_subjects entitlement, matching how HOD\ReportCardController already scopes by
 * department membership rather than individual class ownership.
 */
class PerformanceController extends Controller
{
    private function service(): PerformanceReportService
    {
        return new PerformanceReportService();
    }

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getDepartmentId(): ?int
    {
        $hodId = $_SESSION['user_id'] ?? null;
        if (!$hodId) {
            return null;
        }
        return $this->service()->getHodDepartmentId($hodId);
    }

    /**
     * GET /hod/performance/classes
     *
     * HOD has no general classes-list endpoint elsewhere (unlike Teacher\ClassController /
     * Admin\ClassController) - added narrowly here since the marksheet/performance UI needs a
     * class picker scoped to the HOD's department.
     */
    public function listClasses(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $stmt = $this->getDb()->prepare(
            'SELECT DISTINCT c.id, c.name, c.level, c.stream_name
             FROM classes c
             INNER JOIN student_department_enrollments sde ON sde.class_id = c.id AND sde.department_id = :department_id AND sde.deleted_at IS NULL
             WHERE c.deleted_at IS NULL
             ORDER BY c.level ASC, c.name ASC'
        );
        $stmt->execute(['department_id' => $departmentId]);

        $this->success(['classes' => $stmt->fetchAll()]);
    }

    /**
     * GET /hod/performance/subjects
     *
     * The routed /hod/subjects (HOD\SubjectController@index) points at a controller class that
     * doesn't exist - added here instead, scoped to subjects in the HOD's own department.
     */
    public function listSubjects(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $stmt = $this->getDb()->prepare(
            'SELECT id, name, code FROM subjects WHERE department_id = :department_id AND deleted_at IS NULL ORDER BY name ASC'
        );
        $stmt->execute(['department_id' => $departmentId]);

        $this->success(['subjects' => $stmt->fetchAll()]);
    }

    /**
     * GET /hod/performance/students/{studentId}?term_id=
     */
    public function studentGeneral($studentId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $studentId = (int) $studentId;
        if (!$this->service()->hodCanAccessStudent($departmentId, $studentId)) {
            $this->forbidden('Student not found in your department');
            return;
        }

        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        $this->success($this->service()->studentGeneral($studentId, $termId));
    }

    /**
     * GET /hod/performance/students/{studentId}/subjects/{subjectId}?term_id=
     */
    public function studentSubject($studentId, $subjectId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $studentId = (int) $studentId;
        if (!$this->service()->hodCanAccessStudent($departmentId, $studentId)) {
            $this->forbidden('Student not found in your department');
            return;
        }

        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        $this->success($this->service()->studentSubject($studentId, (int) $subjectId, $termId));
    }

    private function authorizeMarksheet(): ?array
    {
        $departmentId = $this->getDepartmentId();
        if (!$departmentId) {
            return null;
        }

        $classId = (int) $this->query('class_id', 0);
        $subjectId = (int) $this->query('subject_id', 0);
        if (!$classId || !$subjectId) {
            return null;
        }

        if (!$this->service()->hodCanAccessClass($departmentId, $classId)) {
            return null;
        }

        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        return ['class_id' => $classId, 'subject_id' => $subjectId, 'term_id' => $termId];
    }

    /**
     * GET /hod/performance/marksheet?class_id=&subject_id=&term_id=
     */
    public function marksheet(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $params = $this->authorizeMarksheet();
        if (!$params) {
            $this->forbidden('class_id and subject_id are required, and the class must be in your department');
            return;
        }

        $this->success($this->service()->classMarksheet($params['class_id'], $params['subject_id'], $params['term_id']));
    }

    /**
     * GET /hod/performance/marksheet/download?class_id=&subject_id=&term_id=
     */
    public function downloadMarksheet(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $params = $this->authorizeMarksheet();
        if (!$params) {
            $this->forbidden('class_id and subject_id are required, and the class must be in your department');
            return;
        }

        $data = $this->service()->classMarksheet($params['class_id'], $params['subject_id'], $params['term_id']);
        $csv = MarksheetCsvBuilder::build($data);
        $this->downloadCsv("marksheet_class{$params['class_id']}_subject{$params['subject_id']}.csv", $csv['columns'], $csv['rows']);
    }
}
