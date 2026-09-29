<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\MasteryOverviewService;

/**
 * Curriculum mastery for the HOD's department - outcomes (LOA), topic competencies (AOI) and
 * Elements of Construct (EOC) per subject: how much has an assessment linked, and how students do.
 * GET /hod/mastery-overview
 */
class MasteryOverviewController extends Controller
{
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $hodId = $_SESSION['user_id'] ?? null;
        $stmt = \eSpace\Config\Database::getInstance()->prepare("SELECT department_id FROM hods WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$hodId]);
        $hod = $stmt->fetch();
        if (!$hod) {
            $this->error('HOD not found', 403);
            return;
        }
        $this->success((new MasteryOverviewService())->forDepartments([(int) $hod['department_id']]));
    }
}
