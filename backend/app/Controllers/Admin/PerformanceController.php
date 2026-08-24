<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\PerformanceReportService;
use eSpace\App\Utils\MarksheetCsvBuilder;

/**
 * Admin Performance & Marksheet Controller
 *
 * Unrestricted - admin can view any student's performance and download a marksheet for any
 * class/subject in the school, no entitlement/department check needed.
 */
class PerformanceController extends Controller
{
    private function service(): PerformanceReportService
    {
        return new PerformanceReportService();
    }

    /**
     * GET /admin/performance/students/{studentId}?term_id=
     */
    public function studentGeneral($studentId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        $this->success($this->service()->studentGeneral((int) $studentId, $termId));
    }

    /**
     * GET /admin/performance/students/{studentId}/subjects/{subjectId}?term_id=
     */
    public function studentSubject($studentId, $subjectId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        $this->success($this->service()->studentSubject((int) $studentId, (int) $subjectId, $termId));
    }

    private function marksheetParams(): ?array
    {
        $classId = (int) $this->query('class_id', 0);
        $subjectId = (int) $this->query('subject_id', 0);
        if (!$classId || !$subjectId) {
            return null;
        }

        $termId = $this->query('term_id') ? (int) $this->query('term_id') : null;
        return ['class_id' => $classId, 'subject_id' => $subjectId, 'term_id' => $termId];
    }

    /**
     * GET /admin/performance/marksheet?class_id=&subject_id=&term_id=
     */
    public function marksheet(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $params = $this->marksheetParams();
        if (!$params) {
            $this->validationError(['class_id' => 'class_id and subject_id are required']);
            return;
        }

        $this->success($this->service()->classMarksheet($params['class_id'], $params['subject_id'], $params['term_id']));
    }

    /**
     * GET /admin/performance/marksheet/download?class_id=&subject_id=&term_id=
     */
    public function downloadMarksheet(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $params = $this->marksheetParams();
        if (!$params) {
            $this->validationError(['class_id' => 'class_id and subject_id are required']);
            return;
        }

        $data = $this->service()->classMarksheet($params['class_id'], $params['subject_id'], $params['term_id']);
        $csv = MarksheetCsvBuilder::build($data);
        $this->downloadCsv("marksheet_class{$params['class_id']}_subject{$params['subject_id']}.csv", $csv['columns'], $csv['rows']);
    }
}
