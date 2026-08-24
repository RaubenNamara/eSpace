<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\VirtualLabService;
use eSpace\App\Services\PracticalSkillService;

/**
 * Student Virtual Lab Controller
 *
 * Everything here is scoped to the logged-in student's own attempts - a student can only see
 * experiments published to their own class (via studentCanAccessAssignment/listAssignmentsForStudent,
 * both checked against student_department_enrollments) and can only act on attempts that are
 * theirs.
 */
class VirtualLabController extends Controller
{
    private function service(): VirtualLabService
    {
        return new VirtualLabService();
    }

    private function getStudentId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * GET /student/virtual-lab/objects
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
     * GET /student/virtual-lab/assignments?term_id=
     */
    public function assignments(): void
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
        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        $this->success(['assignments' => $this->service()->listAssignmentsForStudent($studentId, $termId)]);
    }

    /**
     * POST /student/virtual-lab/assignments/{assignmentId}/start
     */
    public function start($assignmentId): void
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

        if (!$this->service()->studentCanAccessAssignment($studentId, (int) $assignmentId)) {
            $this->forbidden();
            return;
        }

        try {
            $state = $this->service()->startAttempt((int) $assignmentId, $studentId);
            $this->success($state);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 400);
        }
    }

    private function ownsAttempt(int $attemptId, int $studentId): bool
    {
        $state = null;
        try {
            $state = $this->service()->getAttemptState($attemptId);
        } catch (\RuntimeException $e) {
            return false;
        }
        // getAttemptState doesn't return student_id directly, so this is verified via
        // studentCanAccessAssignment against the assignment it belongs to instead.
        return $this->service()->studentCanAccessAssignment($studentId, (int) $state['assignment_id']);
    }

    /**
     * GET /student/virtual-lab/attempts/{attemptId}
     */
    public function show($attemptId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId || !$this->ownsAttempt((int) $attemptId, $studentId)) {
            $this->forbidden();
            return;
        }

        try {
            $this->success($this->service()->getAttemptState((int) $attemptId));
        } catch (\RuntimeException $e) {
            $this->notFound($e->getMessage());
        }
    }

    /**
     * POST /student/virtual-lab/attempts/{attemptId}/action
     * body: { step_id, object_key, action, value }
     */
    public function logAction($attemptId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId || !$this->ownsAttempt((int) $attemptId, $studentId)) {
            $this->forbidden();
            return;
        }

        $errors = $this->validateRequired(['action']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        try {
            $result = $this->service()->logAction(
                (int) $attemptId,
                $this->input('step_id') ? (int) $this->input('step_id') : null,
                $this->input('object_key'),
                (string) $this->input('action'),
                $this->input('value') !== null ? (string) $this->input('value') : null
            );
            $this->success($result);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 400);
        }
    }

    /**
     * POST /student/virtual-lab/attempts/{attemptId}/observation
     * body: { step_id, text }
     */
    public function saveObservation($attemptId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId || !$this->ownsAttempt((int) $attemptId, $studentId)) {
            $this->forbidden();
            return;
        }

        $this->service()->saveObservation(
            (int) $attemptId,
            $this->input('step_id') ? (int) $this->input('step_id') : null,
            (string) ($this->input('text') ?? '')
        );
        $this->success([], 'Observation saved');
    }

    /**
     * POST /student/virtual-lab/attempts/{attemptId}/answer
     * body: { question_id, text }
     */
    public function saveAnswer($attemptId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId || !$this->ownsAttempt((int) $attemptId, $studentId)) {
            $this->forbidden();
            return;
        }

        $errors = $this->validateRequired(['question_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $this->service()->saveAnswer((int) $attemptId, (int) $this->input('question_id'), (string) ($this->input('text') ?? ''));
        $this->success([], 'Answer saved');
    }

    /**
     * POST /student/virtual-lab/attempts/{attemptId}/notebook
     * body: { entry_type, label, value, unit, extra }
     * Records a real simulation reading (or a calculation the student worked out from one) - the
     * value itself was already produced by the 3D engine before this call, this just files it
     * into the Practical Notebook for the results table/review.
     */
    public function addNotebookEntry($attemptId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId || !$this->ownsAttempt((int) $attemptId, $studentId)) {
            $this->forbidden();
            return;
        }

        $errors = $this->validateRequired(['entry_type', 'label', 'value']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        try {
            $id = $this->service()->addNotebookEntry(
                (int) $attemptId,
                (string) $this->input('entry_type'),
                (string) $this->input('label'),
                (string) $this->input('value'),
                $this->input('unit'),
                $this->input('extra')
            );
            $this->success(['id' => $id], 'Added to notebook');
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 400);
        }
    }

    /**
     * DELETE /student/virtual-lab/attempts/{attemptId}/notebook/{entryId}
     */
    public function removeNotebookEntry($attemptId, $entryId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId || !$this->ownsAttempt((int) $attemptId, $studentId)) {
            $this->forbidden();
            return;
        }

        $ok = $this->service()->removeNotebookEntry((int) $attemptId, (int) $entryId);
        if (!$ok) {
            $this->notFound('Notebook entry not found');
            return;
        }
        $this->success([], 'Removed from notebook');
    }

    /**
     * POST /student/virtual-lab/attempts/{attemptId}/hint
     * Purely a counter for teacher review ("how much difficulty did they have") - doesn't reveal
     * anything itself, the hint text already lives on the step and is shown client-side.
     */
    public function recordHint($attemptId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId || !$this->ownsAttempt((int) $attemptId, $studentId)) {
            $this->forbidden();
            return;
        }

        $this->service()->recordHintUsed((int) $attemptId);
        $this->success([]);
    }

    /**
     * POST /student/virtual-lab/attempts/{attemptId}/safety-mistake
     * Reported by the frontend engine itself (e.g. a short circuit) rather than derived from a
     * step - a real lab hazard is a hazard regardless of which step the student happened to be on.
     */
    public function recordSafetyMistake($attemptId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId || !$this->ownsAttempt((int) $attemptId, $studentId)) {
            $this->forbidden();
            return;
        }

        $this->service()->recordSafetyMistake((int) $attemptId);
        $this->success([]);
    }

    /**
     * GET /student/virtual-lab/skills
     * Real, traceable practical-skill scores (correct/total step attempts) across every Virtual
     * Lab attempt this student has ever made - own data only, same auth pattern as everywhere else.
     */
    public function skills(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->forbidden();
            return;
        }
        $this->success(['skills' => (new PracticalSkillService())->skillScoresForStudent($studentId)]);
    }

    /**
     * GET /student/virtual-lab/skills/overview
     */
    public function skillsOverview(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->forbidden();
            return;
        }
        $skillSvc = new PracticalSkillService();
        $overview = $skillSvc->skillsOverviewForStudent($studentId);
        $overview['results_summary'] = $this->service()->summaryForStudent($studentId);
        $this->success($overview);
    }

    /**
     * GET /student/virtual-lab/skills/{skillKey}/evidence
     */
    public function skillEvidence($skillKey): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->forbidden();
            return;
        }
        $skillSvc = new PracticalSkillService();
        $this->success($skillSvc->skillEvidenceSummaryForStudent($studentId, (string) $skillKey));
    }

    /**
     * GET /student/virtual-lab/skills/{skillKey}/recommendations
     */
    public function skillRecommendations($skillKey): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->getStudentId()) {
            $this->forbidden();
            return;
        }
        $this->success(['templates' => (new PracticalSkillService())->recommendedTemplatesForSkill((string) $skillKey)]);
    }

    /**
     * GET /student/virtual-lab/assignments/{assignmentId}/preview
     * The full experiment detail behind an assignment, for the pre-simulation preview screen -
     * does NOT start or touch any attempt.
     */
    public function previewAssignment($assignmentId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->forbidden();
            return;
        }
        $detail = $this->service()->getAssignmentExperimentDetail($studentId, (int) $assignmentId);
        if (!$detail) {
            $this->forbidden();
            return;
        }
        $this->success($detail);
    }

    /**
     * POST /student/virtual-lab/attempts/{attemptId}/submit
     * body: { conclusion, graph_x_key?, graph_y_key? } - the axis keys are only meaningful when the
     * experiment's graph config allows the learner to change axes; otherwise the frozen snapshot
     * uses the config's own configured columns regardless of what's sent here.
     */
    public function submit($attemptId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->getStudentId();
        if (!$studentId || !$this->ownsAttempt((int) $attemptId, $studentId)) {
            $this->forbidden();
            return;
        }

        $ok = $this->service()->submitAttempt((int) $attemptId, $this->input('conclusion'), $this->input('graph_x_key'), $this->input('graph_y_key'));
        if (!$ok) {
            $this->error('Attempt already submitted or not found', 400);
            return;
        }
        $this->success([], 'Practical submitted');
    }

    /**
     * GET /student/virtual-lab/results?term_id=
     */
    public function results(): void
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
        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        $this->success(['results' => $this->service()->listResultsForStudent($studentId, $termId), 'summary' => $this->service()->summaryForStudent($studentId, $termId)]);
    }
}
