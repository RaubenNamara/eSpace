<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\VirtualLabService;

/**
 * Admin Virtual Lab Controller
 *
 * Oversight, not authoring: view every experiment across all teachers, enable/disable them,
 * manage the reusable 3D object catalog, and see system-wide usage analytics.
 */
class VirtualLabController extends Controller
{
    private function service(): VirtualLabService
    {
        return new VirtualLabService();
    }

    /**
     * GET /admin/virtual-lab/objects
     */
    public function objects(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success(['objects' => $this->service()->listObjects()]);
    }

    /**
     * POST /admin/virtual-lab/objects
     */
    public function storeObject(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $errors = $this->validateRequired(['object_type', 'display_name']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }
        $id = $this->service()->createObject($this->input());
        $this->success(['id' => $id], 'Lab object created');
    }

    /**
     * PUT /admin/virtual-lab/objects/{id}
     */
    public function updateObject($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $ok = $this->service()->updateObject((int) $id, $this->input());
        if (!$ok) {
            $this->validationError(['fields' => 'No valid fields provided']);
            return;
        }
        $this->success([], 'Lab object updated');
    }

    /**
     * GET /admin/virtual-lab/experiments?category=&subject_id=&status=&search=
     */
    public function experiments(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $filters = [];
        foreach (['category', 'subject_id', 'status', 'search'] as $key) {
            if ($this->query($key)) {
                $filters[$key] = $this->query($key);
            }
        }
        $this->success(['experiments' => $this->service()->listExperimentsForAdmin($filters)]);
    }

    /**
     * POST /admin/virtual-lab/experiments/{id}/publish
     * body: { department_id, class_id | (scope: 'all_streams', class_group_name), term_id, due_date?, marks? }
     * Publishes a library experiment straight to a class of the chosen department. The experiment
     * is shared with that department too, so its teachers have it in their library and can follow
     * and mark the class's work.
     */
    public function publish($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $errors = $this->validateRequired(['department_id', 'term_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }
        $ownership = $this->service()->getExperimentOwnership((int) $id);
        if (!$ownership) {
            $this->notFound('Experiment not found');
            return;
        }
        if (!$ownership['is_template']) {
            $this->error('Only library experiments can be published by the admin', 422);
            return;
        }

        $departmentId = (int) $this->input('department_id');
        $classTarget = $this->resolveClassTarget($this->input(), $departmentId);
        if (!$classTarget['ok']) {
            $message = str_replace('your department', 'that department', (string) $classTarget['message']);
            $this->validationError(['class_id' => $message]);
            return;
        }

        $adminId = isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
        try {
            $this->service()->addSharedDepartment((int) $id, $departmentId, $adminId);
            $service = $this->service();
            $assignmentId = $service->publishExperiment(
                (int) $id,
                $classTarget['class_id'],
                $classTarget['class_group_name'],
                null,
                (int) $this->input('term_id'),
                $this->input('due_date') ?: null,
                $this->input('marks') !== null && $this->input('marks') !== '' ? (float) $this->input('marks') : null,
                $departmentId,
                $adminId
            );
            // Alert the class's students - only when it is newly in front of them, not on a re-publish
            if ($service->lastPublishWasNew()) {
                $service->notifyStudentsOfAssignment($assignmentId);
            }
            $this->success(['id' => $assignmentId], 'Experiment published');
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 400);
        }
    }

    /**
     * DELETE /admin/virtual-lab/assignments/{id}
     * Withdraws a class assignment the admin published. A teacher's own publications are theirs
     * to withdraw.
     */
    public function withdrawAssignment($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->service()->withdrawAdminAssignment((int) $id)) {
            $this->notFound('Only classes the admin published can be withdrawn here');
            return;
        }
        $this->success([], 'Withdrawn from the class');
    }

    /**
     * GET /admin/virtual-lab/departments/{id}/classes
     * The classes (streams) with students enrolled in a department - the same rule publishing
     * validates against - plus their class levels for "All Streams".
     */
    public function departmentClasses($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success($this->service()->departmentClasses((int) $id));
    }

    /**
     * GET /admin/virtual-lab/experiments/{id}
     */
    public function experimentDetail($id): void
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
     * PUT /admin/virtual-lab/experiments/{id}/status
     * body: { status: draft|published|disabled }
     */
    public function setStatus($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $errors = $this->validateRequired(['status']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }
        $this->service()->setExperimentStatus((int) $id, (string) $this->input('status'));
        $this->success([], 'Experiment status updated');
    }

    /**
     * PUT /admin/virtual-lab/experiments/{id}/departments
     * body: { department_ids: number[] } - which departments' teachers may use and publish this
     * library experiment (an empty list withdraws it from everyone).
     */
    public function setDepartments($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $ownership = $this->service()->getExperimentOwnership((int) $id);
        if (!$ownership) {
            $this->notFound('Experiment not found');
            return;
        }
        if (!$ownership['is_template']) {
            $this->error('Only library experiments can be shared with departments', 422);
            return;
        }
        $ids = $this->input('department_ids');
        $this->service()->setSharedDepartments((int) $id, is_array($ids) ? $ids : [], $_SESSION['user_id'] ?? null);
        $this->success([], 'Departments updated');
    }

    /**
     * DELETE /admin/virtual-lab/experiments/{id}
     * Removes the experiment (draft or published) and every class it was published to.
     */
    public function destroy($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->service()->deleteExperimentEverywhere((int) $id)) {
            $this->notFound('Experiment not found');
            return;
        }
        $this->success([], 'Experiment deleted');
    }

    /**
     * POST /admin/virtual-lab/experiments/bulk-delete
     * body: { ids: number[] }
     */
    public function bulkDestroy(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $raw = $this->input('ids');
        $ids = is_array($raw) ? array_values(array_unique(array_filter(array_map('intval', $raw), fn ($v) => $v > 0))) : [];
        if (empty($ids)) {
            $this->validationError(['ids' => 'No experiments selected']);
            return;
        }
        $deleted = 0;
        foreach ($ids as $id) {
            if ($this->service()->deleteExperimentEverywhere($id)) {
                $deleted++;
            }
        }
        $this->success(['deleted' => $deleted], $deleted . ' experiment(s) deleted');
    }

    /**
     * POST /admin/virtual-lab/experiments/{id}/practice/action
     * Same stateless step-checking the teacher practice route uses - admin can open any
     * experiment and work through its diagram/procedure exactly like a student, nothing is saved.
     */
    public function practiceAction($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
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
     * GET /admin/virtual-lab/analytics
     */
    public function analytics(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success($this->service()->analytics());
    }
}
