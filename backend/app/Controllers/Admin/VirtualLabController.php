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
        $this->success(['experiments' => $this->service()->listExperiments($filters)]);
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
