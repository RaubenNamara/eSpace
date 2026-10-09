<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\VirtualLabService;

/**
 * HOD Virtual Lab Controller
 *
 * The admin's Virtual Lab page, limited to the HOD's own department: the library experiments the
 * admin has shared with it (one card each, with every class of the department it is published to),
 * publishing them straight to the department's classes, withdrawing what the HOD or admin
 * published there, and opening any of them in the same experiment page students use.
 */
class VirtualLabController extends Controller
{
    private function service(): VirtualLabService
    {
        return new VirtualLabService();
    }

    private function getHodId(): ?int
    {
        return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    private function getHodDepartmentId(): ?int
    {
        $stmt = \eSpace\Config\Database::getInstance()->prepare(
            'SELECT COALESCE(department_id_active, department_id) FROM hods WHERE id = ? AND deleted_at IS NULL'
        );
        $stmt->execute([(int) $this->getHodId()]);
        $id = (int) $stmt->fetchColumn();
        return $id ?: null;
    }

    /** The HOD's department id, or sends the error response and returns null. */
    private function requireDepartment(): ?int
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return null;
        }
        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('You are not assigned to a department', 403);
            return null;
        }
        return $departmentId;
    }

    /** The experiment, if it belongs to the department's Virtual Lab; sends 404 otherwise. */
    private function requireExperimentInDepartment(int $id, int $departmentId): bool
    {
        if (!$this->service()->getExperimentOwnership($id) || !$this->service()->experimentInDepartment($id, $departmentId)) {
            $this->notFound('Experiment not found');
            return false;
        }
        return true;
    }

    /**
     * GET /hod/virtual-lab/experiments?category=&search=
     * The department's experiments - same cards as the admin's, showing only this department.
     */
    public function experiments(): void
    {
        $departmentId = $this->requireDepartment();
        if (!$departmentId) {
            return;
        }
        $filters = [];
        foreach (['category', 'subject_id', 'search'] as $key) {
            if ($this->query($key)) {
                $filters[$key] = $this->query($key);
            }
        }
        $cards = [];
        foreach ($this->service()->listExperimentsForAdmin($filters) as $card) {
            $shared = (bool) array_filter($card['shared_departments'], fn ($d) => $d['id'] === $departmentId);
            $card['publications'] = array_values(array_filter($card['publications'], fn ($p) => $p['department_id'] === $departmentId));
            if (!$shared && !$card['publications']) {
                continue;
            }
            // Hidden experiments stay off the HOD's list, as they are for the department's teachers
            if ($card['status'] === 'disabled') {
                continue;
            }
            $card['assignment_count'] = count($card['publications']);
            $card['published_to'] = array_map(fn ($p) => $p['class_label'], $card['publications']);
            $cards[] = $card;
        }

        $name = \eSpace\Config\Database::getInstance()->prepare('SELECT name FROM departments WHERE id = ?');
        $name->execute([$departmentId]);
        $this->success([
            'experiments' => $cards,
            'department' => ['id' => $departmentId, 'name' => (string) $name->fetchColumn()],
        ]);
    }

    /**
     * GET /hod/virtual-lab/classes
     */
    public function classes(): void
    {
        $departmentId = $this->requireDepartment();
        if (!$departmentId) {
            return;
        }
        $this->success($this->service()->departmentClasses($departmentId));
    }

    /**
     * GET /hod/virtual-lab/terms
     * Terms to publish into, newest first (same shape as the admin's /admin/terms).
     */
    public function terms(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $rows = \eSpace\Config\Database::getInstance()->query(
            'SELECT t.id, t.name, t.is_current, ay.name AS academic_year_name
             FROM terms t LEFT JOIN academic_years ay ON ay.id = t.academic_year_id
             ORDER BY t.created_at DESC'
        )->fetchAll();
        $this->success(array_map(fn ($r) => [
            'id' => (int) $r['id'],
            'name' => $r['name'],
            'is_current' => (int) $r['is_current'],
            'academic_year' => ['name' => $r['academic_year_name']],
        ], $rows));
    }

    /**
     * POST /hod/virtual-lab/experiments/{id}/publish
     * body: { class_id | (scope: 'all_streams', class_group_name), term_id, due_date?, marks? }
     */
    public function publish($id): void
    {
        $departmentId = $this->requireDepartment();
        if (!$departmentId) {
            return;
        }
        $errors = $this->validateRequired(['term_id']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }
        $ownership = $this->service()->getExperimentOwnership((int) $id);
        if (!$ownership || !$ownership['is_template'] || !$this->service()->isSharedWithDepartment((int) $id, $departmentId)) {
            $this->notFound('Only library experiments shared with your department can be published');
            return;
        }

        $classTarget = $this->resolveClassTarget($this->input(), $departmentId);
        if (!$classTarget['ok']) {
            $this->validationError(['class_id' => $classTarget['message']]);
            return;
        }

        try {
            $service = $this->service();
            $assignmentId = $service->publishExperiment(
                (int) $id,
                $classTarget['class_id'],
                $classTarget['class_group_name'],
                null,
                (int) $this->input('term_id'),
                $this->input('due_date') ?: null,
                $this->input('marks') !== null && $this->input('marks') !== '' ? (float) $this->input('marks') : null,
                $departmentId,
                null,
                $this->getHodId()
            );
            // Alert the class's students - only when it is newly in front of them, not on a re-publish
            if ($service->lastPublishWasNew()) {
                $service->notifyStudentsOfAssignment($assignmentId);
            }
            $this->success(['id' => $assignmentId], 'Experiment published');
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 400);
        }
    }

    /**
     * DELETE /hod/virtual-lab/assignments/{id}
     * Withdraws a class assignment the HOD or admin published in this department.
     */
    public function withdrawAssignment($id): void
    {
        $departmentId = $this->requireDepartment();
        if (!$departmentId) {
            return;
        }
        if (!$this->service()->withdrawAdminAssignment((int) $id, $departmentId)) {
            $this->notFound('Only classes the HOD or admin published in your department can be withdrawn here');
            return;
        }
        $this->success([], 'Withdrawn from the class');
    }

    /**
     * GET /hod/virtual-lab/objects
     */
    public function objects(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success(['objects' => $this->service()->listObjects()]);
    }

    /**
     * GET /hod/virtual-lab/experiments/{id}
     */
    public function experimentDetail($id): void
    {
        $departmentId = $this->requireDepartment();
        if (!$departmentId || !$this->requireExperimentInDepartment((int) $id, $departmentId)) {
            return;
        }
        $this->success($this->service()->getExperimentDetail((int) $id));
    }

    /**
     * POST /hod/virtual-lab/experiments/{id}/practice/action
     * The same stateless step-checking students' attempts use - nothing is saved.
     */
    public function practiceAction($id): void
    {
        $departmentId = $this->requireDepartment();
        if (!$departmentId || !$this->requireExperimentInDepartment((int) $id, $departmentId)) {
            return;
        }
        $action = (string) $this->input('action');
        if ($action === '') {
            $this->validationError(['action' => 'action is required']);
            return;
        }
        $value = $this->input('value');
        $this->success($this->service()->practiceAction(
            (int) $id,
            max(1, (int) $this->input('step_number')),
            $this->input('object_key') !== null ? (string) $this->input('object_key') : null,
            $action,
            $value !== null ? (string) $value : null
        ));
    }
}
