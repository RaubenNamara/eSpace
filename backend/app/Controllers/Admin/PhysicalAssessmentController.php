<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\PhysicalAssessmentService;
use RuntimeException;

/**
 * Admin Physical Exam Controller
 *
 * Full access: create/edit/delete a physical exam for any class/subject/term.
 */
class PhysicalAssessmentController extends Controller
{
    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }

    /**
     * GET /admin/physical-exams?class_id=&subject_id=&term_id=
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        $subjectId = (int) $this->query('subject_id', 0);
        $termId = (int) $this->query('term_id', 0);

        if (!$classId || !$subjectId || !$termId) {
            $this->validationError(['class_id' => 'class_id, subject_id and term_id are required']);
            return;
        }

        $this->success(['exams' => (new PhysicalAssessmentService())->listForClassSubject($classId, $subjectId, $termId)]);
    }

    /**
     * POST /admin/physical-exams
     */
    public function create(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $data = $this->input();
        $errors = $this->validateRequired(['subject_id', 'class_id', 'term_id', 'title', 'max_score', 'exam_date'], $data);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $adminId = $this->getCurrentUserId();
        $exam = (new PhysicalAssessmentService())->create($data, $adminId, 'admin');
        $this->success($exam, 'Physical exam created');
    }

    /**
     * PUT /admin/physical-exams/{id}
     */
    public function update($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        try {
            $updated = (new PhysicalAssessmentService())->update((int) $id, $this->input());
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        $this->success($updated, 'Physical exam updated');
    }

    /**
     * DELETE /admin/physical-exams/{id}
     */
    public function delete($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        (new PhysicalAssessmentService())->delete((int) $id);
        $this->success([], 'Physical exam deleted');
    }

    /**
     * GET /admin/physical-exams/{id}/marksheet
     */
    public function getMarksheet($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        try {
            $marksheet = (new PhysicalAssessmentService())->getMarksheet((int) $id);
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }

        $this->success($marksheet);
    }

    /**
     * PUT /admin/physical-exams/{id}/marksheet
     */
    public function saveScores($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $scores = $this->input('scores');
        if (!is_array($scores)) {
            $this->validationError(['scores' => 'scores must be an array']);
            return;
        }

        try {
            (new PhysicalAssessmentService())->saveScores((int) $id, $scores);
        } catch (RuntimeException $e) {
            $this->validationError(['scores' => $e->getMessage()]);
            return;
        }

        $this->success([], 'Marks saved');
    }
}
