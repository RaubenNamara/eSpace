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
