<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\MasteryOverviewService;

/**
 * Curriculum mastery across the school (or one department with ?department_id=) - outcomes (LOA),
 * topic competencies (AOI) and Elements of Construct (EOC) per subject.
 * GET /admin/mastery-overview
 */
class MasteryOverviewController extends Controller
{
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $departmentId = (int) ($_GET['department_id'] ?? 0);
        $this->success((new MasteryOverviewService())->forDepartments($departmentId > 0 ? [$departmentId] : null));
    }
}
