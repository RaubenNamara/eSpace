<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\VirtualLab;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\PlaygroundNotebookService;

/**
 * Playground Notebook for students and teachers. Each user only ever sees and removes their own
 * entries; the same endpoints serve both roles (routes are registered under each role's group).
 */
class PlaygroundNotebookController extends Controller
{
    private const ACTIONS = ['heat', 'connect', 'pour', 'measure', 'switch_on', 'switch_off', 'wash'];

    private function service(): PlaygroundNotebookService
    {
        return new PlaygroundNotebookService();
    }

    /** GET /{role}/virtual-lab/playground/notebook */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success(['entries' => $this->service()->list((int) $this->getCurrentUserId())]);
    }

    /** POST /{role}/virtual-lab/playground/notebook */
    public function store(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $errors = $this->validateRequired(['action', 'summary']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }
        $action = (string) $this->input('action');
        if (!in_array($action, self::ACTIONS, true)) {
            $this->error('That action cannot be recorded in the notebook.', 400);
            return;
        }
        $readings = $this->input('readings');
        $id = $this->service()->add(
            (int) $this->getCurrentUserId(),
            $this->input('object_type') ? (string) $this->input('object_type') : null,
            $action,
            (string) $this->input('summary'),
            is_array($readings) ? $readings : null
        );
        $this->success(['id' => $id], 'Added to notebook');
    }

    /** DELETE /{role}/virtual-lab/playground/notebook/{entryId} */
    public function destroy($entryId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->service()->remove((int) $this->getCurrentUserId(), (int) $entryId)) {
            $this->notFound('Notebook entry not found');
            return;
        }
        $this->success([], 'Removed from notebook');
    }
}
