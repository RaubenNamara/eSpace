<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\EngagementAnalyticsService;

/**
 * Teacher Engagement Analytics Controller
 *
 * "Did a student open/watch/attend this content" - eNotes, eLibrary, Item Bank, Videos and Live
 * Classes - scoped to only the classes this teacher actually teaches within their active
 * department (see EngagementAnalyticsService::teacherScope's docblock for how that's determined).
 * Distinct from Teacher\ReportController, which is assignment/grade-based.
 */
class AnalyticsController extends Controller
{
    /**
     * GET /teacher/analytics/engagement
     * Reading/watching/attendance engagement for the teacher's own classes, department-scoped.
     */
    public function engagement(): void
    {
        // hasRole('teacher') (not a raw getCurrentUserRole() === 'teacher' check) so a HOD
        // dual-roling as their linked teacher account - see Controller::hasRole()'s docblock -
        // can reach this page too; resolveActiveTeacherId() is the matching lookup for *which*
        // teacher_id that is (their own session user_id for a plain teacher login, or the
        // session's linked teacher_id for that dual-role HOD).
        if (!$this->isAuthenticated() || !$this->hasRole('teacher')) {
            $this->forbidden();
            return;
        }

        $teacherId = $this->resolveActiveTeacherId();
        $departmentId = $this->getActiveDepartmentId();
        if (!$teacherId || !$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $service = new EngagementAnalyticsService();
        $roster = $service->teacherScope($teacherId, $departmentId)['roster'];

        if (empty($roster)) {
            $this->success([
                'modules' => [
                    'enotes' => ['engaged' => 0, 'total' => 0, 'percentage' => null],
                    'library' => ['engaged' => 0, 'total' => 0, 'percentage' => null],
                    'itembank' => ['engaged' => 0, 'total' => 0, 'percentage' => null],
                    'videos' => ['engaged' => 0, 'total' => 0, 'percentage' => null],
                    'live_classes' => ['engaged' => 0, 'total' => 0, 'percentage' => null],
                ],
                'students' => [],
            ]);
            return;
        }

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
