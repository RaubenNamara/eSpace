<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\EngagementAnalyticsService;

/**
 * Admin Engagement Analytics Controller
 *
 * "Did a student open/watch/attend this content" - eNotes, eLibrary, Item Bank, Videos and Live
 * Classes - school-wide (every department), with an optional ?department_id= filter for
 * usability. Distinct from Admin\PerformanceController, which is assignment/grade-based.
 */
class AnalyticsController extends Controller
{
    /**
     * GET /admin/analytics/engagement?department_id=
     */
    public function engagement(): void
    {
        if (!$this->isAuthenticated() || !in_array($this->getCurrentUserRole(), ['admin', 'super_admin'], true)) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->query('department_id') ? (int) $this->query('department_id') : null;

        $service = new EngagementAnalyticsService();
        $roster = $service->schoolRoster($departmentId);

        $enotes = $service->enotesBreakdown($roster, $departmentId);
        $library = $service->libraryBreakdown($roster, $departmentId);
        $itembank = $service->itemBankBreakdown($roster, $departmentId);
        $videos = $service->videoBreakdown($roster, $departmentId);
        $liveClasses = $service->liveClassBreakdown($roster, $departmentId);

        $students = [];
        foreach ($roster as $row) {
            $studentId = (int) $row['student_id'];
            $students[] = [
                'student_id' => $studentId,
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'admission_number' => $row['admission_number'],
                'class_name' => $row['class_name'],
                'department_id' => (int) $row['department_id'],
                'enotes' => $enotes[$studentId] ?? ['engaged' => 0, 'total' => 0, 'percentage' => null],
                'library' => $library[$studentId] ?? ['engaged' => 0, 'total' => 0, 'percentage' => null],
                'itembank' => $itembank[$studentId] ?? ['engaged' => 0, 'total' => 0, 'percentage' => null],
                'videos' => $videos[$studentId] ?? ['engaged' => 0, 'total' => 0, 'percentage' => null],
                'live_classes' => $liveClasses[$studentId] ?? ['engaged' => 0, 'total' => 0, 'percentage' => null],
            ];
        }

        $this->success([
            'modules' => [
                'enotes' => $service->summarize($enotes),
                'library' => $service->summarize($library),
                'itembank' => $service->summarize($itembank),
                'videos' => $service->summarize($videos),
                'live_classes' => $service->summarize($liveClasses),
            ],
            'students' => $students,
        ]);
    }
}
