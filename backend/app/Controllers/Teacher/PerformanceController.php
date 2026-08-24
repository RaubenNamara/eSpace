<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\PerformanceReportService;
use eSpace\App\Utils\MarksheetCsvBuilder;

/**
 * Teacher Performance & Marksheet Controller
 *
 * A teacher can view performance for students in a class they teach (class_subjects
 * entitlement or class_teacher_id - same two-tier model as report cards), and download a
 * marksheet for a class/subject they're entitled to.
 */
class PerformanceController extends Controller
{
    private function service(): PerformanceReportService
    {
        return new PerformanceReportService();
    }

    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * GET /teacher/performance/subjects
     *
     * The existing /teacher/subjects route (Teacher\AssignmentController@subjects) actually
     * queries the departments table, not subjects, despite its name - not reusable here, where a
     * real subjects.id is required. Matches PerformanceReportService's entitlement checks:
     * class_subjects (present for forward-compatibility, but confirmed empty - 0 rows - in this
     * live database), class_teacher_id (every subject taught in a class this teacher heads), and
     * assignments.teacher_id (the signal actually populated in practice, since that's how a
     * subject teacher's relationship to a class/subject is really established here).
     */
    public function listSubjects(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $stmt = $this->getDb()->prepare(
            'SELECT DISTINCT s.id, s.name, s.code
             FROM subjects s
             WHERE s.deleted_at IS NULL AND s.id IN (
                 SELECT subject_id FROM class_subjects WHERE teacher_id = :teacher_id
                 UNION
                 SELECT cs.subject_id FROM class_subjects cs
                 INNER JOIN classes c ON c.id = cs.class_id AND c.class_teacher_id = :teacher_id2
                 UNION
                 SELECT a.subject_id FROM assignments a WHERE a.teacher_id = :teacher_id3 AND a.deleted_at IS NULL AND a.subject_id IS NOT NULL
                 UNION
                 SELECT a2.subject_id FROM assignments a2
                 INNER JOIN classes c2 ON c2.id = a2.class_id AND c2.class_teacher_id = :teacher_id4
                 WHERE a2.deleted_at IS NULL AND a2.subject_id IS NOT NULL
             )
             ORDER BY s.name ASC'
        );
        $stmt->execute([
            'teacher_id' => $teacherId, 'teacher_id2' => $teacherId,
            'teacher_id3' => $teacherId, 'teacher_id4' => $teacherId,
        ]);

        $this->success(['subjects' => $stmt->fetchAll()]);
    }

    /**
     * GET /teacher/performance/students/{studentId}?term_id=
     */
    public function studentGeneral($studentId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $studentId = (int) $studentId;
        $service = $this->service();

        if (!$service->teacherCanAccessStudent($teacherId, $studentId)) {
            $this->forbidden('You do not teach this student');
            return;
        }

        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        $this->success($service->studentGeneral($studentId, $termId));
    }

    /**
     * GET /teacher/performance/students/{studentId}/subjects/{subjectId}?term_id=
     */
    public function studentSubject($studentId, $subjectId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $studentId = (int) $studentId;
        $subjectId = (int) $subjectId;
        $service = $this->service();

        if (!$service->teacherCanAccessStudentSubject($teacherId, $studentId, $subjectId)) {
            $this->forbidden('You are not entitled to this student/subject');
            return;
        }

        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        $this->success($service->studentSubject($studentId, $subjectId, $termId));
    }

    private function authorizeMarksheet(): ?array
    {
        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            return null;
        }

        $classId = (int) $this->query('class_id', 0);
        $subjectId = (int) $this->query('subject_id', 0);
        if (!$classId || !$subjectId) {
            return null;
        }

        if (!$this->service()->teacherCanAccessClassSubject($teacherId, $classId, $subjectId)) {
            return null;
        }

        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        return ['class_id' => $classId, 'subject_id' => $subjectId, 'term_id' => $termId];
    }

    /**
     * GET /teacher/performance/marksheet?class_id=&subject_id=&term_id=
     */
    public function marksheet(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $params = $this->authorizeMarksheet();
        if (!$params) {
            $this->forbidden('class_id and subject_id are required, and you must be entitled to teach that class/subject');
            return;
        }

        $this->success($this->service()->classMarksheet($params['class_id'], $params['subject_id'], $params['term_id']));
    }

    /**
     * GET /teacher/performance/marksheet/download?class_id=&subject_id=&term_id=
     */
    public function downloadMarksheet(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $params = $this->authorizeMarksheet();
        if (!$params) {
            $this->forbidden('class_id and subject_id are required, and you must be entitled to teach that class/subject');
            return;
        }

        $data = $this->service()->classMarksheet($params['class_id'], $params['subject_id'], $params['term_id']);
        $csv = MarksheetCsvBuilder::build($data);
        $this->downloadCsv("marksheet_class{$params['class_id']}_subject{$params['subject_id']}.csv", $csv['columns'], $csv['rows']);
    }
}
