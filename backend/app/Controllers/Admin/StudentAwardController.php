<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\RewardService;

/**
 * Admin Rewards & Badges Monitoring Controller
 *
 * Admin never needs to manually award normal performance badges - RewardService's automatic
 * engine already does that whenever a teacher returns marks. This controller is the monitoring
 * and exception-handling layer: search/filter what was automatically awarded, see why (via the
 * audit trail), edit/revoke/restore, or override the automatic choice for a specific case.
 */
class StudentAwardController extends Controller
{
    private function service(): RewardService
    {
        return new RewardService();
    }

    private function getAdminId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * GET /admin/rewards?search=&class_id=&subject_id=&badge_type=&term_id=&academic_year=&status=&award_source=&page=&per_page=
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $filters = [
            'search' => $this->query('search', ''),
            'class_id' => $this->query('class_id', ''),
            'subject_id' => $this->query('subject_id', ''),
            'badge_type' => $this->query('badge_type', ''),
            'term_id' => $this->query('term_id', ''),
            'academic_year' => $this->query('academic_year', ''),
            'status' => $this->query('status', ''),
            'award_source' => $this->query('award_source', ''),
        ];
        $page = max(1, (int) $this->query('page', 1));
        $perPage = (int) $this->query('per_page', 20);

        $this->success($this->service()->listAwardsForAdmin($filters, $page, $perPage));
    }

    /**
     * GET /admin/rewards/{id}
     */
    public function show($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $award = $this->service()->getAwardDetail((int) $id);
        if (!$award) {
            $this->notFound('Award not found');
            return;
        }

        $this->success($award);
    }

    /**
     * POST /admin/rewards
     * A brand-new manual award not tied to any automatic rule.
     */
    public function store(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $adminId = $this->getAdminId();
        if (!$adminId) {
            $this->error('Admin not found', 403);
            return;
        }

        $errors = $this->validateRequired(['student_id', 'badge_type', 'award_title', 'term_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $id = $this->service()->createManualAward($this->input(), $adminId, 'admin');
        $this->success(['id' => $id], 'Award created');
    }

    /**
     * PUT /admin/rewards/{id}
     */
    public function update($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $adminId = $this->getAdminId();
        if (!$adminId) {
            $this->error('Admin not found', 403);
            return;
        }

        $ok = $this->service()->editAward((int) $id, $this->input(), $adminId, 'admin');
        if (!$ok) {
            $this->notFound('Award not found or no valid fields provided');
            return;
        }

        $this->success([], 'Award updated');
    }

    /**
     * PUT /admin/rewards/{id}/override
     */
    public function override($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $adminId = $this->getAdminId();
        if (!$adminId) {
            $this->error('Admin not found', 403);
            return;
        }

        $note = trim((string) ($this->input('admin_note') ?? ''));
        if ($note === '') {
            $this->validationError(['admin_note' => 'A note explaining the override is required']);
            return;
        }

        $ok = $this->service()->overrideAward((int) $id, $this->input(), $adminId, 'admin', $note);
        if (!$ok) {
            $this->notFound('Award not found');
            return;
        }

        $this->success([], 'Award overridden');
    }

    /**
     * PUT /admin/rewards/{id}/revoke
     */
    public function revoke($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $adminId = $this->getAdminId();
        if (!$adminId) {
            $this->error('Admin not found', 403);
            return;
        }

        $note = $this->input('admin_note') !== null ? trim((string) $this->input('admin_note')) : null;
        $ok = $this->service()->revokeAward((int) $id, $adminId, 'admin', $note);
        if (!$ok) {
            $this->notFound('Award not found or already revoked');
            return;
        }

        $this->success([], 'Award revoked');
    }

    /**
     * PUT /admin/rewards/{id}/restore
     */
    public function restore($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $adminId = $this->getAdminId();
        if (!$adminId) {
            $this->error('Admin not found', 403);
            return;
        }

        $note = $this->input('admin_note') !== null ? trim((string) $this->input('admin_note')) : null;
        $ok = $this->service()->restoreAward((int) $id, $adminId, 'admin', $note);
        if (!$ok) {
            $this->notFound('Award not found or already active');
            return;
        }

        $this->success([], 'Award restored');
    }
}
