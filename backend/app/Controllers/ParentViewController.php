<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\ParentDigestService;
use eSpace\App\Services\ReportCardView;

/**
 * The parent page: a learner's weekly update, opened with the private token from a parent link
 * (Admin\ParentLinkController). Public - the token is the key - and read-only. A turned-off
 * link, or a wrong token, gets the same "not found". When the super admin lets parents see
 * report cards, the page also lists the terms and opens the child's card.
 *
 * GET /api/parent/{token}
 * GET /api/parent/{token}/report-card/{termId}
 */
class ParentViewController extends Controller
{
    /** The demo school's parent page says so (?school=demo); every other link is the session's school */
    private function demoSchool(): void
    {
        $code = (string) $this->query('school', '');
        if ($code !== '' && $code === \eSpace\App\Services\DemoSchool::code()) {
            \eSpace\App\Support\Tenant::useForRequest($code);
        }
    }

    public function show(): void
    {
        $this->demoSchool();
        $db = \eSpace\Config\Database::getInstance();
        $link = ParentDigestService::linkByToken($db, (string) $this->routeParam('token'));
        $summary = $link ? ParentDigestService::summary($db, (int) $link['student_id']) : null;
        if (!$link || !$summary) {
            $this->notFound('This link is not active. Ask the school for a new one.');
            return;
        }
        $db->prepare("UPDATE parent_links SET last_viewed_at = NOW() WHERE id = ?")->execute([(int) $link['id']]);
        $this->privateHeaders();
        $terms = ReportCardView::allowed('parents') ? ReportCardView::termsFor((int) $link['student_id']) : [];
        $this->success($summary + ['guardian_name' => $link['guardian_name'], 'report_terms' => $terms]);
    }

    public function reportCard(): void
    {
        $this->demoSchool();
        $db = \eSpace\Config\Database::getInstance();
        $link = ParentDigestService::linkByToken($db, (string) $this->routeParam('token'));
        if (!$link || !ReportCardView::allowed('parents')) {
            $this->notFound('This report card is not available. Ask the school.');
            return;
        }
        $termId = (int) $this->routeParam('termId');
        $allowed = array_column(ReportCardView::termsFor((int) $link['student_id']), 'id');
        if (!in_array($termId, $allowed, true)) {
            $this->notFound('There is no report card for that term.');
            return;
        }
        try {
            $card = ReportCardView::build((int) $link['student_id'], $termId);
        } catch (\RuntimeException $e) {
            $this->notFound($e->getMessage());
            return;
        }
        $this->privateHeaders();
        $this->success($card);
    }

    private function privateHeaders(): void
    {
        header('Cache-Control: private, no-store');
        header('X-Robots-Tag: noindex');
    }
}
