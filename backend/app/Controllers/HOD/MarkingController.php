<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;
use eSpace\App\Services\SupervisionService;

/**
 * Marking: the HOD following up their own department's teachers - for each one, what they set
 * this term for the department's subjects, how much of it they have marked, what is still
 * waiting (and for how long), and the learners who didn't hand in. The admin's Supervision view,
 * kept to one department. A reminder can be sent to a teacher from here.
 */
class MarkingController extends Controller
{
    private function departmentId(): ?int
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return null;
        }
        $stmt = \eSpace\Config\Database::getInstance()->prepare("SELECT department_id FROM hods WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([(int) $this->getCurrentUserId()]);
        $id = (int) ($stmt->fetchColumn() ?: 0);
        if ($id <= 0) {
            $this->error('HOD not assigned to a department', 403);
            return null;
        }
        return $id;
    }

    /** The term asked for (?term_id=), else today's. */
    private function pickTerm(SupervisionService $service): ?array
    {
        $wanted = (int) ($this->query('term_id') ?? 0);
        if ($wanted <= 0) $wanted = (int) ($service->terms()['default'] ?? 0);
        return $wanted > 0 ? $service->term($wanted) : null;
    }

    private function teacherInDepartment(int $teacherId, int $departmentId): bool
    {
        $stmt = \eSpace\Config\Database::getInstance()->prepare(
            "SELECT 1 FROM teachers t
             WHERE t.id = :t AND t.deleted_at IS NULL
               AND EXISTS (SELECT 1 FROM teacher_department_assignments tda
                           WHERE tda.teacher_id = t.id AND tda.department_id = :d AND tda.deleted_at IS NULL)"
        );
        $stmt->execute(['t' => $teacherId, 'd' => $departmentId]);
        return (bool) $stmt->fetchColumn();
    }

    /**
     * GET /hod/marking?term_id=
     */
    public function index(): void
    {
        $departmentId = $this->departmentId();
        if ($departmentId === null) return;
        $service = new SupervisionService();
        $terms = $service->terms();
        $term = $this->pickTerm($service);
        $base = ['terms' => $terms['terms'], 'marking_days' => SupervisionService::MARKING_DAYS, 'quiet_days' => SupervisionService::QUIET_DAYS];
        if (!$term) {
            $this->success($base + ['term' => null, 'departments' => [], 'teachers' => []]);
            return;
        }
        $this->success($base + ['term' => ['id' => (int) $term['id'], 'start_date' => $term['start_date'], 'end_date' => $term['end_date']]]
            + $service->overview($term, $departmentId));
    }

    /**
     * GET /hod/marking/teachers/{id}?term_id=
     * One teacher's assessments this term for the department's subjects, each with its hand-in
     * and marking figures.
     */
    public function teacher($id): void
    {
        $departmentId = $this->departmentId();
        if ($departmentId === null) return;
        if (!$this->teacherInDepartment((int) $id, $departmentId)) {
            $this->notFound('Teacher not found in your department');
            return;
        }
        $service = new SupervisionService();
        $term = $this->pickTerm($service);
        if (!$term) {
            $this->error('No term has been set up yet', 404);
            return;
        }
        $stmt = \eSpace\Config\Database::getInstance()->prepare("SELECT id, first_name, last_name, email, phone FROM teachers WHERE id = ?");
        $stmt->execute([(int) $id]);
        $t = $stmt->fetch();
        $this->success([
            'teacher' => ['id' => (int) $t['id'], 'name' => trim($t['first_name'] . ' ' . $t['last_name']), 'email' => $t['email'], 'phone' => $t['phone']],
            'assessments' => $service->assessments($term, (int) $id, $departmentId),
        ]);
    }

    private function assessmentInDepartment(int $id, int $departmentId): bool
    {
        $stmt = \eSpace\Config\Database::getInstance()->prepare(
            "SELECT 1 FROM assignments a JOIN subjects s ON s.id = a.subject_id WHERE a.id = ? AND s.department_id = ? AND a.deleted_at IS NULL"
        );
        $stmt->execute([$id, $departmentId]);
        return (bool) $stmt->fetchColumn();
    }

    /**
     * GET /hod/marking/assignments/{id}/scripts
     */
    public function scripts($id): void
    {
        $departmentId = $this->departmentId();
        if ($departmentId === null) return;
        $result = $this->assessmentInDepartment((int) $id, $departmentId) ? (new SupervisionService())->scripts((int) $id) : null;
        if ($result === null) {
            $this->notFound('Assessment not found');
            return;
        }
        $this->success($result);
    }

    /**
     * GET /hod/marking/assignments/{id}/missing
     */
    public function missing($id): void
    {
        $departmentId = $this->departmentId();
        if ($departmentId === null) return;
        $result = $this->assessmentInDepartment((int) $id, $departmentId) ? (new SupervisionService())->missingLearners((int) $id) : null;
        if ($result === null) {
            $this->notFound('Assessment not found');
            return;
        }
        $this->success($result);
    }

    /**
     * POST /hod/marking/teachers/{id}/remind  { message }
     */
    public function remind($id): void
    {
        $departmentId = $this->departmentId();
        if ($departmentId === null) return;
        $message = trim((string) ($this->input('message') ?? ''));
        if ($message === '') {
            $this->validationError(['message' => 'Write the reminder first']);
            return;
        }
        if (!$this->teacherInDepartment((int) $id, $departmentId)) {
            $this->notFound('Teacher not found in your department');
            return;
        }
        (new NotificationService())->notify((int) $id, 'teacher', 'supervision_reminder', 'A reminder from your head of department', mb_substr($message, 0, 500));
        $this->success([], 'Reminder sent');
    }
}
