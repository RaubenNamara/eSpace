<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Repositories\UserRepository;

/**
 * Presence Controller
 *
 * Shared across every role (student/teacher/hod/admin) - a single heartbeat endpoint the
 * frontend calls periodically while the app is open, so chat can show a WhatsApp-style "online"
 * indicator. Not chat-specific itself: it just stamps last_active_at on whichever role table the
 * current session belongs to (see UserRepository::updateLastActive).
 */
class PresenceController extends Controller
{
    /**
     * POST /presence/ping
     */
    public function ping(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            $this->error('User not found', 403);
            return;
        }

        (new UserRepository())->updateLastActive((int) $userId);

        $this->success([], 'ok');
    }
}
