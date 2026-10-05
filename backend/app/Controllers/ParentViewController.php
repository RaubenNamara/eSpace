<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\ParentDigestService;

/**
 * The parent page: a learner's weekly update, opened with the private token from a parent link
 * (Admin\ParentLinkController). Public - the token is the key - and read-only. A turned-off
 * link, or a wrong token, gets the same "not found".
 *
 * GET /api/parent/{token}
 */
class ParentViewController extends Controller
{
    public function show(): void
    {
        $db = \eSpace\Config\Database::getInstance();
        $link = ParentDigestService::linkByToken($db, (string) $this->routeParam('token'));
        $summary = $link ? ParentDigestService::summary($db, (int) $link['student_id']) : null;
        if (!$link || !$summary) {
            $this->notFound('This link is not active. Ask the school for a new one.');
            return;
        }
        $db->prepare("UPDATE parent_links SET last_viewed_at = NOW() WHERE id = ?")->execute([(int) $link['id']]);
        header('Cache-Control: private, no-store');
        header('X-Robots-Tag: noindex');
        $this->success($summary + ['guardian_name' => $link['guardian_name']]);
    }
}
