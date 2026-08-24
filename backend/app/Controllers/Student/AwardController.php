<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\RewardService;

/**
 * Student Awards Controller
 *
 * Read-only, own-awards-only - a student never awards themselves anything, this just surfaces
 * what the automatic engine (or an admin) has already decided. Only active/non-revoked awards
 * are shown here and on the report card, matching the brief.
 */
class AwardController extends Controller
{
    private function service(): RewardService
    {
        return new RewardService();
    }

    private function getStudentId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * GET /student/awards?all=1
     * By default, active awards only ("My Achievements" summary); pass all=1 for the full
     * history including revoked ones ("View All Achievements").
     */
    public function index(): void
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

        $activeOnly = $this->query('all') !== '1';
        $this->success(['awards' => $this->service()->listAwardsForStudent($studentId, $activeOnly)]);
    }

    /**
     * GET /student/awards/summary
     */
    public function summary(): void
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

        $this->success($this->service()->summaryForStudent($studentId));
    }
}
