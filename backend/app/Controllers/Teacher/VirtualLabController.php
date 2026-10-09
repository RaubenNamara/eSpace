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
     * GET /teacher/virtual-lab/subjects
     * Real rows of the subjects table - experiments.subject_id references it. (The generic
     * /teacher/subjects endpoint returns departments, whose ids are different and cannot be used.)
     */
    public function subjects(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success($this->service()->listSubjects());
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

        $filters = ['published_by' => $teacherId];
        if ($this->query('category')) {
            $filters['category'] = $this->query('category');
        }
        if ($this->query('subject_id')) {
            $filters['subject_id'] = (int) $this->query('subject_id');
        }

        // The department library: only experiments the admin has shared with this teacher's
        // (active) department
        if ($this->query('templates') === '1') {
            $departmentId = $this->getActiveDepartmentId();
            if (!$departmentId) {
                $this->success(['experiments' => []]);
                return;
            }
            $filters['is_template'] = true;
            $filters['shared_with_department'] = $departmentId;
            $filters['published_department'] = $departmentId;
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
        $teacherId = $this->getTeacherId();
        $ownership = $this->service()->getExperimentOwnership((int) $id);
        // A teacher can open their own experiments and library experiments shared with their department
        if (!$ownership || !$this->canUseExperiment((int) $id, $ownership, $teacherId)) {
            $this->notFound('Experiment not found');
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
     * POST /teacher/virtual-lab/experiments/{id}/practice/action
     * body: { step_number, object_key, action, value }
     * A teacher doing the experiment like a student: the action is checked against that step the
     * same way a student's is, and nothing is saved - practice runs can't be submitted.
     */
    public function practiceAction($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->getTeacherId();
        $ownership = $this->service()->getExperimentOwnership((int) $id);
        // Same visibility as opening the experiment
        if (!$ownership || !$this->canUseExperiment((int) $id, $ownership, $teacherId)) {
            $this->notFound('Experiment not found');
            return;
        }
        $action = (string) $this->input('action');
        if ($action === '') {
            $this->validationError(['action' => 'action is required']);
            return;
        }
        $value = $this->input('value');
        $this->success($this->service()->practiceAction(
            (int) $id,
            max(1, (int) $this->input('step_number')),
            $this->input('object_key') !== null ? (string) $this->input('object_key') : null,
            $action,
            $value !== null ? (string) $value : null
        ));
    }

    /**
     * Only the teacher who created an experiment may change or delete it, and official templates
     * are read-only (teachers copy them first). Sends the error response itself when denied.
     */
    /** Own experiment, or a library experiment the admin has shared with the teacher's department. */
    private function canUseExperiment(int $id, array $ownership, ?int $teacherId): bool
    {
        if ($ownership['is_template']) {
            return $this->service()->isSharedWithDepartment($id, $this->getActiveDepartmentId());
        }
        return $teacherId !== null && $ownership['created_by'] === $teacherId;
    }

    private function ownsExperiment(int $id): bool
    {
        $teacherId = $this->getTeacherId();
        $ownership = $this->service()->getExperimentOwnership($id);
        if (!$ownership) {
            $this->notFound('Experiment not found');
            return false;
        }
        if ($ownership['is_template'] || !$teacherId || $ownership['created_by'] !== $teacherId) {
            $this->error('You can only change experiments you created', 403);
            return false;
        }
        return true;
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

        // scene_objects may be an empty list (a guided experiment supplies its own apparatus), so
        // only its presence and type are checked, not that it has entries
        $errors = $this->validateRequired(['title', 'category']);
        if (!is_array($this->input('scene_objects'))) {
            $errors['scene_objects'] = 'scene_objects must be a list (it can be empty)';
        }
        if ($this->input('subject_id') && !$this->service()->subjectExists((int) $this->input('subject_id'))) {
            $errors['subject_id'] = 'Choose a valid subject';
        }
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

        if (!$this->service()->isSharedWithDepartment((int) $id, $this->getActiveDepartmentId())) {
            $this->notFound('Template not found');
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
        if (!$this->ownsExperiment((int) $id)) {
            return;
        }
        if ($this->input('subject_id') && !$this->service()->subjectExists((int) $this->input('subject_id'))) {
            $this->validationError(['subject_id' => 'Choose a valid subject']);
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
        if (!$this->ownsExperiment((int) $id)) {
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

        $errors = $this->validateRequired(['term_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $ownership = $this->service()->getExperimentOwnership((int) $id);
        if (!$ownership || !$this->canUseExperiment((int) $id, $ownership, $teacherId)) {
            $this->notFound('Experiment not found');
            return;
        }

        // Class/class-level re-validated against the teacher's own *active* department (not the
        // admin-set primary teacherCanAccessClassSubject() used to check) - matching every other
        // content module, and what actually reflects a teacher who's switched active department
        // this session (see Controller::getActiveDepartmentId()).
        $departmentId = $this->getActiveDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department to publish experiments', 403);
            return;
        }

        $classTarget = $this->resolveClassTarget($this->input(), $departmentId);
        if (!$classTarget['ok']) {
            $this->validationError(['class_id' => $classTarget['message']]);
            return;
        }

        try {
            $assignmentId = $this->service()->publishExperiment(
                (int) $id,
                $classTarget['class_id'],
                $classTarget['class_group_name'],
                $teacherId,
                (int) $this->input('term_id'),
                $this->input('due_date'),
                $this->input('marks') !== null ? (float) $this->input('marks') : null
            );
            // Publishing makes the teacher's own experiment "published" so it no longer shows as a
            // draft on their list (official templates keep their own status)
            if (!$ownership['is_template']) {
                $this->service()->setExperimentStatus((int) $id, 'published');
            }
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

        // Classes the admin published to straight from the library show here for the whole department
        $filters['department_id'] = $this->getActiveDepartmentId();
        $this->success(['assignments' => $this->service()->listAssignmentsForTeacher($teacherId, $filters)]);
    }

    /**
     * GET /teacher/virtual-lab/assignments/{id}/preview
     * Read-only "preview as student" view of one of the teacher's own published assignments -
     * same experiment detail shape a student attempt loads, minus any attempt state.
     */
    public function previewAssignment($assignmentId): void
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
        $detail = $this->service()->getAssignmentExperimentDetailForTeacher($teacherId, (int) $assignmentId, $this->getActiveDepartmentId());
        if (!$detail) {
            $this->notFound('Assignment not found');
            return;
        }
        $this->success($detail);
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
     * PUT /teacher/virtual-lab/attempts/{id}/marking-annotations
     * body: { section_key, base, annotation } - the teacher's canvas marks on one part of the
     * attempt (see VirtualLabService::MARKING_SECTION_PATTERN), saved as they mark.
     */
    public function saveMarkingAnnotation($id): void
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
        // The publishing teacher - or, for a class the admin published to, any teacher of that department
        $canMark = $this->service()->teacherCanMarkAttempt((int) $id, (int) $teacherId, $this->getActiveDepartmentId());
        if ($canMark === null) {
            $this->notFound('Attempt not found');
            return;
        }
        if (!$canMark) {
            $this->error('Only the teacher who published this practical can mark it', 403);
            return;
        }

        $sectionKey = (string) $this->input('section_key');
        $base = $this->input('base');
        $annotation = $this->input('annotation');
        $errors = [];
        if (!preg_match(\eSpace\App\Services\VirtualLabService::MARKING_SECTION_PATTERN, $sectionKey)) {
            $errors['section_key'] = 'Unknown section';
        }
        if (!is_array($base)) {
            $errors['base'] = 'base must be an object';
        }
        if (!is_array($annotation) || !isset($annotation['objects']) || !is_array($annotation['objects'])) {
            $errors['annotation'] = 'annotation must be an annotation layer ({ objects: [...] })';
        }
        if (empty($errors) && strlen(json_encode($annotation)) > 4 * 1024 * 1024) {
            $errors['annotation'] = 'These marks are too large to save';
        }
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $this->service()->saveMarkingAnnotation((int) $id, $sectionKey, $base, $annotation, (int) $teacherId);
        $this->success([], 'Marks saved');
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
