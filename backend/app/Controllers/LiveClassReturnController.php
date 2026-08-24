<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\Config\Config;

/**
 * Live Class Return Controller
 *
 * BBB's logoutURL (set on every meeting by BBBService::createMeeting()) points here instead of
 * at live.stmark.sc.ug's bare BigBlueButton/Greenlight page. Whether a user got here by clicking
 * "Leave Meeting" themselves or because a moderator ended the meeting for everyone, BBB always
 * redirects their browser to the same logoutURL - so this one route re-checks their still-live
 * eSpace PHP session and sends them on to the right role-specific Live Classes page. Not part of
 * the /api JSON contract: BBB does a real top-level browser navigation here, so the response has
 * to be an HTTP redirect, not a JSON body.
 */
class LiveClassReturnController extends Controller
{
    private const ROLE_PATHS = [
        'student' => '/student/live-classes',
        'teacher' => '/teacher/live-classes',
        'hod' => '/hod/live-classes',
        'admin' => '/admin/live-classes',
        'super_admin' => '/admin/live-classes',
    ];

    /**
     * GET /live-class/return
     */
    public function handle(): void
    {
        $frontendUrl = rtrim(Config::get('FRONTEND_URL'), '/');

        if (!$this->isAuthenticated()) {
            $this->redirectTo($frontendUrl . '/login');
            return;
        }

        $role = $this->getCurrentUserRole();
        $path = self::ROLE_PATHS[$role] ?? '/login';

        // BBB's redirect happens in the same tab the user joined from (it doesn't close it), so
        // that tab lands back on Live Classes instead of disappearing. The `left=1` marker lets
        // the student page proactively clear its own already_joined state here rather than
        // waiting on the popup-close poll running in a different tab, which will never fire since
        // this tab never actually closes.
        $suffix = $role === 'student' ? '?left=1' : '';

        $this->redirectTo($frontendUrl . $path . $suffix);
    }

    private function redirectTo(string $url): void
    {
        header('Location: ' . $url, true, 302);
        exit;
    }
}
