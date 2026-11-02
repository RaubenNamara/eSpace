<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\AssessmentMarksheetService;

/**
 * Marksheets by assessment (see AssessmentMarksheetService):
 *   GET /teacher/marksheets[/{id}]  the teacher's own assessments only
 *   GET /hod/marksheets[/{id}]      every assessment in the HOD's department
 *   GET /admin/marksheets[/{id}]    every department (?department_id= to narrow)
 */
class AssessmentMarksheetController extends Controller
{
    private function service(): AssessmentMarksheetService
    {
        return new AssessmentMarksheetService(\eSpace\Config\Database::getInstance());
    }

    /** a teacher (or a HOD working as a teacher) sees their own assessments */
    private function teacherScope(): ?array
    {
        $role = $this->getCurrentUserRole();
        $teacherId = $role === 'hod' ? ($_SESSION['teacher_id'] ?? null) : ($role === 'teacher' ? ($_SESSION['user_id'] ?? null) : null);
        return $teacherId ? ['teacher_id' => (int) $teacherId] : null;
    }

    private function hodScope(): ?array
    {
        if ($this->getCurrentUserRole() !== 'hod') {
            return null;
        }
        $stmt = \eSpace\Config\Database::getInstance()->prepare('SELECT department_id FROM hods WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([$_SESSION['user_id'] ?? 0]);
        $dept = $stmt->fetchColumn();
        return $dept ? ['department_id' => (int) $dept] : null;
    }

    private function adminScope(): ?array
    {
        if (!in_array($this->getCurrentUserRole(), ['admin', 'super_admin'], true)) {
            return null;
        }
        $dept = (int) $this->query('department_id', 0);
        return $dept ? ['department_id' => $dept] : [];
    }

    private function listFor(?array $scope): void
    {
        if ($scope === null) {
            $this->forbidden();
            return;
        }
        $this->success(['assessments' => $this->service()->list($scope)]);
    }

    private function showFor(?array $scope, $id): void
    {
        if ($scope === null) {
            $this->forbidden();
            return;
        }
        $service = $this->service();
        if (!$service->canSee((int) $id, $scope)) {
            $this->notFound('Assessment not found');
            return;
        }
        $this->success($service->sheet((int) $id));
    }

    public function teacherIndex(): void { $this->listFor($this->teacherScope()); }
    public function teacherShow($id): void { $this->showFor($this->teacherScope(), $id); }
    public function hodIndex(): void { $this->listFor($this->hodScope()); }
    public function hodShow($id): void { $this->showFor($this->hodScope(), $id); }
    public function adminIndex(): void { $this->listFor($this->adminScope()); }
    public function adminShow($id): void { $this->showFor($this->adminScope(), $id); }
}
