<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\PhysicalAssessmentService;
use RuntimeException;

/**
 * HOD Physical Exam Controller
 *
 * Scoped to the HOD's own department - any teacher's class/subject within it, same idea as
 * HOD\ReportCardController's department scoping.
 */
class PhysicalAssessmentController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getHodId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    private function getHodDepartmentId(): ?int
    {
        $hodId = $this->getHodId();
        if (!$hodId) {
            return null;
        }

        $stmt = $this->getDb()->prepare('SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $hodId]);
        $row = $stmt->fetch();

        return $row ? (int) $row['department_id'] : null;
    }

    private function subjectInDepartment(int $subjectId, int $departmentId): bool
    {
        $stmt = $this->getDb()->prepare('SELECT id FROM subjects WHERE id = :subject_id AND department_id = :department_id');
        $stmt->execute(['subject_id' => $subjectId, 'department_id' => $departmentId]);
        return (bool) $stmt->fetch();
    }

    /**
     * GET /hod/physical-exams?class_id=&subject_id=&term_id=
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        $subjectId = (int) $this->query('subject_id', 0);
        $termId = (int) $this->query('term_id', 0);

        if (!$classId || !$subjectId || !$termId) {
            $this->validationError(['class_id' => 'class_id, subject_id and term_id are required']);
            return;
        }

        if (!$this->subjectInDepartment($subjectId, $departmentId) || !$this->classBelongsToDepartment($classId, $departmentId)) {
            $this->forbidden('That class/subject is not in your department');
            return;
        }

        $this->success(['exams' => (new PhysicalAssessmentService())->listForClassSubject($classId, $subjectId, $termId)]);
    }

    /**
     * POST /hod/physical-exams
     */
    public function create(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $hodId = $this->getHodId();
        $departmentId = $this->getHodDepartmentId();
        if (!$hodId || !$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $data = $this->input();
        $errors = $this->validateRequired(['subject_id', 'class_id', 'term_id', 'title', 'max_score', 'exam_date'], $data);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $classId = (int) $data['class_id'];
        $subjectId = (int) $data['subject_id'];

        if (!$this->subjectInDepartment($subjectId, $departmentId) || !$this->classBelongsToDepartment($classId, $departmentId)) {
            $this->forbidden('That class/subject is not in your department');
            return;
        }

        $exam = (new PhysicalAssessmentService())->create($data, $hodId, 'hod');
        $this->success($exam, 'Physical exam created');
    }

    /**
     * PUT /hod/physical-exams/{id}
     */
    public function update($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $service = new PhysicalAssessmentService();

        try {
            $exam = $service->get((int) $id);
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        if (!$this->subjectInDepartment($exam['subject_id'], $departmentId)) {
            $this->forbidden('That exam is not in your department');
            return;
        }

        $updated = $service->update((int) $id, $this->input());
        $this->success($updated, 'Physical exam updated');
    }

    /**
     * DELETE /hod/physical-exams/{id}
     */
    public function delete($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $service = new PhysicalAssessmentService();

        try {
            $exam = $service->get((int) $id);
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        if (!$this->subjectInDepartment($exam['subject_id'], $departmentId)) {
            $this->forbidden('That exam is not in your department');
            return;
        }

        $service->delete((int) $id);
        $this->success([], 'Physical exam deleted');
    }

    /**
     * GET /hod/physical-exams/{id}/marksheet
     */
    public function getMarksheet($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $service = new PhysicalAssessmentService();

        try {
            $marksheet = $service->getMarksheet((int) $id);
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        if (!$this->subjectInDepartment($marksheet['exam']['subject_id'], $departmentId)) {
            $this->forbidden('That exam is not in your department');
            return;
        }

        $this->success($marksheet);
    }

    /**
     * PUT /hod/physical-exams/{id}/marksheet
     */
    public function saveScores($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD department not found', 403);
            return;
        }

        $service = new PhysicalAssessmentService();

        try {
            $exam = $service->get((int) $id);
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        if (!$this->subjectInDepartment($exam['subject_id'], $departmentId)) {
            $this->forbidden('That exam is not in your department');
            return;
        }

        $scores = $this->input('scores');
        if (!is_array($scores)) {
            $this->validationError(['scores' => 'scores must be an array']);
            return;
        }

        try {
            $service->saveScores((int) $id, $scores);
        } catch (RuntimeException $e) {
            $this->validationError(['scores' => $e->getMessage()]);
            return;
        }

        $this->success([], 'Marks saved');
    }
}
