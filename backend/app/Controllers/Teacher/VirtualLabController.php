<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\VirtualLabService;

/**
 * Teacher Virtual Lab Controller
 *
 * Create/edit experiments (own + copy from system templates), publish to a class/term, view
 * student attempts and progress, and grade submitted practicals. Class/subject authorization
 * reuses VirtualLabService::teacherCanAccessClassSubject(), which itself delegates to
 * PerformanceReportService - the same entitlement check already used by Marksheet/Performance,
 * so a teacher can publish to any class/subject they can already see marks for.
 */
class VirtualLabController extends Controller
{
    private function service(): VirtualLabService
    {
        return new VirtualLabService();
    }

    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * GET /teacher/virtual-lab/objects
     */
    public function objects(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success(['objects' => $this->service()->listObjects(true)]);
    }

    /**
     * GET /teacher/virtual-lab/experiments?category=&subject_id=&mine=1
     * By default returns this teacher's own experiments plus the system templates, so the
     * builder can offer "start from a template" alongside "your experiments".
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->getTeacherId();

        $filters = [];
        if ($this->query('category')) {
            $filters['category'] = $this->query('category');
        }
        if ($this->query('subject_id')) {
            $filters['subject_id'] = (int) $this->query('subject_id');
        }

        if ($this->query('templates') === '1') {
            $filters['is_template'] = true;
            $this->success(['experiments' => $this->service()->listExperiments($filters)]);
            return;
        }

        $filters['created_by'] = $teacherId;
        $mine = $this->service()->listExperiments($filters);
        $this->success(['experiments' => $mine]);
    }

    /**
     * GET /teacher/virtual-lab/experiments/{id}
     */
    public function show($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $experiment = $this->service()->getExperimentDetail((int) $id);
        if (!$experiment) {
            $this->notFound('Experiment not found');
            return;
        }
        $this->success($experiment);
    }

    /**
     * POST /teacher/virtual-lab/experiments
     */
    public function store(): void
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

        $errors = $this->validateRequired(['title', 'category', 'scene_objects']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $id = $this->service()->createExperiment($this->input(), $teacherId);
        $this->success(['id' => $id], 'Experiment created');
    }

    /**
     * POST /teacher/virtual-lab/experiments/{id}/copy-template
     */
    public function copyTemplate($id): void
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

        $newId = $this->service()->createExperimentFromTemplate((int) $id, $teacherId, $this->input());
        if (!$newId) {
            $this->notFound('Template not found');
            return;
        }
        $this->success(['id' => $newId], 'Experiment created from template');
    }

    /**
     * PUT /teacher/virtual-lab/experiments/{id}
     */
    public function update($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->service()->updateExperiment((int) $id, $this->input());
        $this->success([], 'Experiment updated');
    }

    /**
     * DELETE /teacher/virtual-lab/experiments/{id}
     */
    public function destroy($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->service()->deleteExperiment((int) $id);
        $this->success([], 'Experiment deleted');
    }

    /**
     * POST /teacher/virtual-lab/experiments/{id}/publish
     * body: { class_id, term_id, due_date, marks }
     */
    public function publish($id): void
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

        $errors = $this->validateRequired(['class_id', 'term_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $classId = (int) $this->input('class_id');
        $experiment = $this->service()->getExperimentDetail((int) $id);
        if (!$experiment) {
            $this->notFound('Experiment not found');
            return;
        }

        if (!$this->service()->teacherCanAccessClassSubject($teacherId, $classId, $experiment['subject_id'])) {
            $this->forbidden();
            return;
        }

        try {
            $assignmentId = $this->service()->publishExperiment(
                (int) $id,
                $classId,
                $teacherId,
                (int) $this->input('term_id'),
                $this->input('due_date'),
                $this->input('marks') !== null ? (float) $this->input('marks') : null
            );
            $this->success(['id' => $assignmentId], 'Experiment published');
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 400);
        }
    }

    /**
     * GET /teacher/virtual-lab/assignments?term_id=&class_id=
     */
    public function assignments(): void
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

        $filters = [];
        if ($this->query('term_id')) {
            $filters['term_id'] = (int) $this->query('term_id');
        }
        if ($this->query('class_id')) {
            $filters['class_id'] = (int) $this->query('class_id');
        }

        $this->success(['assignments' => $this->service()->listAssignmentsForTeacher($teacherId, $filters)]);
    }

    /**
     * GET /teacher/virtual-lab/assignments/{id}/attempts
     */
    public function attempts($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success(['attempts' => $this->service()->listAttemptsForAssignment((int) $id)]);
    }

    /**
     * GET /teacher/virtual-lab/attempts/{id}
     */
    public function attemptDetail($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $attempt = $this->service()->getAttemptDetail((int) $id);
        if (!$attempt) {
            $this->notFound('Attempt not found');
            return;
        }
        $this->success($attempt);
    }

    /**
     * PUT /teacher/virtual-lab/attempts/{id}/grade
     * body: { score, feedback }
     */
    public function grade($id): void
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

        $errors = $this->validateRequired(['score']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $ok = $this->service()->gradeAttempt((int) $id, (float) $this->input('score'), $this->input('feedback'), $teacherId);
        if (!$ok) {
            $this->notFound('Attempt not found');
            return;
        }
        $this->success([], 'Practical graded');
    }

    /**
     * PUT /teacher/virtual-lab/attempts/{id}/answers/{questionId}/grade
     * body: { marks_awarded, feedback }
     * Separate from grade() above - this marks one question, not the whole attempt's overall score.
     */
    public function gradeAnswer($id, $questionId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->getTeacherId()) {
            $this->error('Teacher not found', 403);
            return;
        }

        $errors = $this->validateRequired(['marks_awarded']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $ok = $this->service()->gradeQuestionAnswer((int) $id, (int) $questionId, (float) $this->input('marks_awarded'), $this->input('feedback'));
        if (!$ok) {
            $this->error('Could not save this question\'s grade', 400);
            return;
        }
        $this->success([], 'Question graded');
    }

    /**
     * GET /teacher/virtual-lab/students/{studentId}/skills
     * Same underlying skill data the student sees about themselves, plus the overview summary -
     * gated by PracticalSkillService::teacherCanViewStudentSkills() so a teacher can only inspect
     * students they actually teach.
     */
    public function studentSkills($studentId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->getTeacherId();
        $skillSvc = new \eSpace\App\Services\PracticalSkillService();
        if (!$teacherId || !$skillSvc->teacherCanViewStudentSkills($teacherId, (int) $studentId)) {
            $this->forbidden();
            return;
        }
        $overview = $skillSvc->skillsOverviewForStudent((int) $studentId);
        $overview['results_summary'] = $this->service()->summaryForStudent((int) $studentId);
        $this->success([
            'skills' => $skillSvc->skillScoresForStudent((int) $studentId),
            'overview' => $overview,
        ]);
    }

    /**
     * GET /teacher/virtual-lab/students/{studentId}/skills/{skillKey}/evidence
     */
    public function studentSkillEvidence($studentId, $skillKey): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->getTeacherId();
        $skillSvc = new \eSpace\App\Services\PracticalSkillService();
        if (!$teacherId || !$skillSvc->teacherCanViewStudentSkills($teacherId, (int) $studentId)) {
            $this->forbidden();
            return;
        }
        $this->success($skillSvc->skillEvidenceSummaryForStudent((int) $studentId, (string) $skillKey));
    }
}
