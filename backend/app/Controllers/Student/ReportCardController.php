<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ReportCardView;
use RuntimeException;

/**
 * Student Report Card Controller
 *
 * The learner's own card, read-only - only when the super admin has let students see report
 * cards (school_settings.report_cards_students). Every term they have been at school has a card,
 * marked or not (ReportCardView).
 */
class ReportCardController extends Controller
{
    private function getStudentId(): ?int
    {
        return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    /**
     * GET /student/report-cards/access - whether the menu shows Report card
     */
    public function access(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success(['allowed' => ReportCardView::allowed('students')]);
    }

    /**
     * GET /student/report-cards/terms
     */
    public function listTerms(): void
    {
        $this->index();
    }

    /**
     * GET /student/report-cards - the terms the learner can open a card for, newest first
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
        if (!ReportCardView::allowed('students')) {
            $this->forbidden('Report cards are not open to students yet');
            return;
        }
        $this->success(['terms' => ReportCardView::termsFor($studentId)]);
    }

    /**
     * GET /student/report-cards/{termId}
     */
    public function show($termId): void
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
        if (!ReportCardView::allowed('students')) {
            $this->forbidden('Report cards are not open to students yet');
            return;
        }
        try {
            $this->success(ReportCardView::build($studentId, (int) $termId));
        } catch (RuntimeException $e) {
            $this->notFound($e->getMessage());
        }
    }
}
