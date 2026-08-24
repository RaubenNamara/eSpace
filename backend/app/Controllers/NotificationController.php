<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\NotificationService;

/**
 * Notification Controller
 *
 * One shared controller for every role (same pattern as AuthController's /auth/* routes) - each
 * request is scoped to the signed-in user's own (id, role) from the session, so there's no
 * per-role business logic to split out.
 */
class NotificationController extends Controller
{
    private function service(): NotificationService
    {
        return new NotificationService();
    }

    /**
     * GET /notifications?unread_only=1&limit=30
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $unreadOnly = $this->query('unread_only') === '1';
        $limit = min(100, max(1, (int) $this->query('limit', 30)));

        $notifications = $this->service()->listForUser(
            $this->getCurrentUserId(),
            $this->getCurrentUserRole(),
            $unreadOnly,
            $limit
        );

        $this->success(['notifications' => $notifications]);
    }

    /**
     * GET /notifications/unread-count
     */
    public function unreadCount(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $count = $this->service()->unreadCount($this->getCurrentUserId(), $this->getCurrentUserRole());
        $this->success(['count' => $count]);
    }

    /**
     * PUT /notifications/{id}/read
     */
    public function markAsRead($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $this->service()->markAsRead((int) $id, $this->getCurrentUserId(), $this->getCurrentUserRole());
        $this->success([], 'Marked as read');
    }

    /**
     * PUT /notifications/read-all
     */
    public function markAllAsRead(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $this->service()->markAllAsRead($this->getCurrentUserId(), $this->getCurrentUserRole());
        $this->success([], 'All marked as read');
    }
}
