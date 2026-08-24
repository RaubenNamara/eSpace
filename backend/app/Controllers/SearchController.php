<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\SearchService;
use RuntimeException;

/**
 * Global Search Controller
 *
 * One shared controller for student and teacher (same pattern as AuthController/
 * NotificationController) - permission is enforced inside SearchService per role, scoped to the
 * signed-in user's own id from the session, so there's no separate per-role controller needed.
 * HOD/admin are out of scope - the request that specced this feature only asked for the student
 * and teacher portals.
 */
class SearchController extends Controller
{
    private function service(): SearchService
    {
        return new SearchService();
    }

    private function allowedRole(): ?string
    {
        $role = $this->getCurrentUserRole();
        return in_array($role, ['student', 'teacher'], true) ? $role : null;
    }

    /**
     * GET /search?q=&type=&subject_id=&page=&per_page=
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $role = $this->allowedRole();
        if (!$role) {
            $this->forbidden('Search is only available to students and teachers');
            return;
        }

        $term = trim((string) $this->query('q', ''));
        if ($term === '') {
            $this->validationError(['q' => 'A search term is required']);
            return;
        }

        $type = (string) $this->query('type', 'all');
        $subjectId = $this->query('subject_id') !== null && $this->query('subject_id') !== ''
            ? (int) $this->query('subject_id') : null;
        $page = max(1, (int) $this->query('page', 1));
        $perPage = (int) $this->query('per_page', 20);

        try {
            $result = $this->service()->search($role, $this->getCurrentUserId(), $term, $type, $subjectId, $page, $perPage);
            $this->success($result);
        } catch (RuntimeException $e) {
            $this->error($e->getMessage(), 400);
        }
    }

    /**
     * GET /search/suggestions?q=
     */
    public function suggestions(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $role = $this->allowedRole();
        if (!$role) {
            $this->forbidden('Search is only available to students and teachers');
            return;
        }

        $term = trim((string) $this->query('q', ''));
        if ($term === '' || mb_strlen($term) < 2) {
            $this->success(['suggestions' => []]);
            return;
        }

        try {
            $suggestions = $this->service()->suggestions($role, $this->getCurrentUserId(), $term);
            $this->success(['suggestions' => $suggestions]);
        } catch (RuntimeException $e) {
            $this->error($e->getMessage(), 400);
        }
    }
}
