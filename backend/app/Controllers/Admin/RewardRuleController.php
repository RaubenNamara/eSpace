<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\RewardService;

/**
 * Admin Reward Rule Controller
 *
 * The configurable Admin settings area for badge thresholds/conditions - editing a rule here
 * changes how RewardService evaluates every future mark change; nothing about the badge
 * thresholds is hard-coded in the evaluation engine itself.
 */
class RewardRuleController extends Controller
{
    private function service(): RewardService
    {
        return new RewardService();
    }

    /**
     * GET /admin/reward-rules
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $this->success(['rules' => $this->service()->listRules()]);
    }

    /**
     * POST /admin/reward-rules
     */
    public function store(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $errors = $this->validateRequired(['badge_type', 'award_title', 'metric', 'scope']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $id = $this->service()->createRule($this->input());
        $this->success(['id' => $id], 'Reward rule created');
    }

    /**
     * PUT /admin/reward-rules/{id}
     */
    public function update($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $ok = $this->service()->updateRule((int) $id, $this->input());
        if (!$ok) {
            $this->validationError(['fields' => 'No valid fields provided']);
            return;
        }

        $this->success([], 'Reward rule updated');
    }

    /**
     * DELETE /admin/reward-rules/{id}
     */
    public function destroy($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $this->service()->deleteRule((int) $id);
        $this->success([], 'Reward rule deleted');
    }
}
