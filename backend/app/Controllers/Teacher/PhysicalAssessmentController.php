<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\PerformanceReportService;
use eSpace\App\Services\PhysicalAssessmentService;
use RuntimeException;

/**
 * Teacher Physical Exam Controller
 *
 * Scoped to class/subject combinations the teacher actually teaches, reusing
 * PerformanceReportService::teacherCanAccessClassSubject() - the same entitlement check the
 * report card class-summary view already relies on (class teacher, class_subjects, or an
 * assignments.teacher_id match).
 */
class PhysicalAssessmentController extends Controller
{
    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    private function canAccess(int $teacherId, int $classId, int $subjectId): bool
    {
        return (new PerformanceReportService())->teacherCanAccessClassSubject($teacherId, $classId, $subjectId);
    }

    /**
     * GET /teacher/physical-exams?class_id=&subject_id=&term_id=
     */
    public function index(): void
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

        $classId = (int) $this->query('class_id', 0);
        $subjectId = (int) $this->query('subject_id', 0);
        $termId = (int) $this->query('term_id', 0);

        if (!$classId || !$subjectId || !$termId) {
            $this->validationError(['class_id' => 'class_id, subject_id and term_id are required']);
            return;
        }

        if (!$this->canAccess($teacherId, $classId, $subjectId)) {
            $this->forbidden('You do not teach this subject for this class');
            return;
        }

        $this->success(['exams' => (new PhysicalAssessmentService())->listForClassSubject($classId, $subjectId, $termId)]);
    }

    /**
     * POST /teacher/physical-exams
     */
    public function create(): void
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

        $data = $this->input();
        $errors = $this->validateRequired(['subject_id', 'class_id', 'term_id', 'title', 'max_score', 'exam_date'], $data);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $classId = (int) $data['class_id'];
        $subjectId = (int) $data['subject_id'];

        if (!$this->canAccess($teacherId, $classId, $subjectId)) {
            $this->forbidden('You do not teach this subject for this class');
            return;
        }

        $exam = (new PhysicalAssessmentService())->create($data, $teacherId, 'teacher');
        $this->success($exam, 'Physical exam created');
    }

    /**
     * PUT /teacher/physical-exams/{id}
     */
    public function update($id): void
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

        $service = new PhysicalAssessmentService();

        try {
            $exam = $service->get((int) $id);
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        if (!$this->canAccess($teacherId, $exam['class_id'], $exam['subject_id'])) {
            $this->forbidden('You do not teach this subject for this class');
            return;
        }

        $updated = $service->update((int) $id, $this->input());
        $this->success($updated, 'Physical exam updated');
    }

    /**
     * DELETE /teacher/physical-exams/{id}
     */
    public function delete($id): void
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

        $service = new PhysicalAssessmentService();

        try {
            $exam = $service->get((int) $id);
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        if (!$this->canAccess($teacherId, $exam['class_id'], $exam['subject_id'])) {
            $this->forbidden('You do not teach this subject for this class');
            return;
        }

        $service->delete((int) $id);
        $this->success([], 'Physical exam deleted');
    }

    /**
     * GET /teacher/physical-exams/{id}/marksheet
     */
    public function getMarksheet($id): void
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

        $service = new PhysicalAssessmentService();

        try {
            $marksheet = $service->getMarksheet((int) $id);
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        if (!$this->canAccess($teacherId, $marksheet['exam']['class_id'], $marksheet['exam']['subject_id'])) {
            $this->forbidden('You do not teach this subject for this class');
            return;
        }

        $this->success($marksheet);
    }

    /**
     * PUT /teacher/physical-exams/{id}/marksheet
     * Body: { scores: [{ student_id, score }, ...] }
     */
    public function saveScores($id): void
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

        $service = new PhysicalAssessmentService();

        try {
            $exam = $service->get((int) $id);
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        if (!$this->canAccess($teacherId, $exam['class_id'], $exam['subject_id'])) {
            $this->forbidden('You do not teach this subject for this class');
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
