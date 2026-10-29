<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\SmisStudentSync;

/**
 * The super admin's "Sync students from SMIS" toggle (Admin > Students): its state and last runs,
 * and starting a run. See SmisStudentSync for what a run does.
 */
class SmisSyncController extends Controller
{
    private function isSuperAdmin(): bool
    {
        return $this->getCurrentUserRole() === 'super_admin';
    }

    /** GET /admin/students/smis-sync */
    public function status(): void
    {
        if (!$this->isSuperAdmin()) {
            $this->forbidden();
            return;
        }
        $this->success((new SmisStudentSync(\eSpace\Config\Database::getInstance()))->status());
    }

    /** POST /admin/students/smis-sync */
    public function run(): void
    {
        if (!$this->isSuperAdmin()) {
            $this->forbidden();
            return;
        }
        @set_time_limit(300);
        $result = (new SmisStudentSync(\eSpace\Config\Database::getInstance()))->run($this->getCurrentUserId());
        if (!$result['ok']) {
            $this->error($result['message'], 422, ['run' => $result['run']]);
            return;
        }
        $this->success(['run' => $result['run']], $result['message']);
    }
}
