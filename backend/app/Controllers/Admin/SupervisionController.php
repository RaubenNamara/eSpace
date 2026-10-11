<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;
use eSpace\App\Services\SupervisionService;

/**
 * Supervision: the admin following up teaching across every department, down to each teacher -
 * what they have set this term, scripts still waiting to be marked, hand-in rates, and the
 * learners who didn't hand work in. A reminder can be sent to a teacher from here.
 */
class SupervisionController extends Controller
{
    private function allowed(): bool
    {
        if (!$this->isAuthenticated() || !in_array($this->getCurrentUserRole(), ['admin', 'super_admin'], true)) {
            $this->forbidden();
            return false;
        }
        return true;
    }

    /** The term asked for (?term_id=), else today's. */
    private function pickTerm(SupervisionService $service): ?array
    {
        $wanted = (int) ($this->query('term_id') ?? 0);
        if ($wanted <= 0) $wanted = (int) ($service->terms()['default'] ?? 0);
        return $wanted > 0 ? $service->term($wanted) : null;
    }

    /**
     * GET /admin/supervision?term_id=
     */
    public function index(): void
    {
        if (!$this->allowed()) return;
        $service = new SupervisionService();
        $terms = $service->terms();
        $term = $this->pickTerm($service);
        if (!$term) {
            $this->success(['terms' => $terms['terms'], 'term' => null, 'departments' => [], 'teachers' => [], 'marking_days' => SupervisionService::MARKING_DAYS]);
            return;
        }
        $this->success(array_merge(
            ['terms' => $terms['terms'], 'term' => ['id' => (int) $term['id'], 'start_date' => $term['start_date'], 'end_date' => $term['end_date']], 'marking_days' => SupervisionService::MARKING_DAYS, 'quiet_days' => SupervisionService::QUIET_DAYS],
            $service->overview($term)
        ));
    }

    /**
     * GET /admin/supervision/teachers/{id}?term_id=
     * One teacher's assessments this term, each with its hand-in and marking figures.
     */
    public function teacher($id): void
    {
        if (!$this->allowed()) return;
        $service = new SupervisionService();
        $term = $this->pickTerm($service);
        if (!$term) {
            $this->error('No term has been set up yet', 404);
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare("SELECT id, first_name, last_name, email, phone FROM teachers WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([(int) $id]);
        $t = $stmt->fetch();
        if (!$t) {
            $this->notFound('Teacher not found');
            return;
        }
        $this->success([
            'teacher' => ['id' => (int) $t['id'], 'name' => trim($t['first_name'] . ' ' . $t['last_name']), 'email' => $t['email'], 'phone' => $t['phone']],
            'assessments' => $service->assessments($term, (int) $id),
        ]);
    }

    /**
     * GET /admin/supervision/assignments/{id}/missing
     */
    public function missing($id): void
    {
        if (!$this->allowed()) return;
        $result = (new SupervisionService())->missingLearners((int) $id);
        if ($result === null) {
            $this->notFound('Assessment not found');
            return;
        }
        $this->success($result);
    }

    /**
     * POST /admin/supervision/teachers/{id}/remind  { message }
     * A notification (and a push to their phone, if they turned that on) to the teacher.
     */
    public function remind($id): void
    {
        if (!$this->allowed()) return;
        $message = trim((string) ($this->input('message') ?? ''));
        if ($message === '') {
            $this->validationError(['message' => 'Write the reminder first']);
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare("SELECT id FROM teachers WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([(int) $id]);
        if (!$stmt->fetchColumn()) {
            $this->notFound('Teacher not found');
            return;
        }
        (new NotificationService())->notify((int) $id, 'teacher', 'supervision_reminder', 'A reminder from the school office', mb_substr($message, 0, 500));
        $this->success([], 'Reminder sent');
    }
}
