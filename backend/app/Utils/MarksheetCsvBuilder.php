<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * Shapes PerformanceReportService::classMarksheet()'s nested result into the flat
 * {columns, rows} pair Controller::downloadCsv() expects - one assignment per column, since the
 * assignment count/titles vary per class+subject and can't be a fixed column list. Shared by
 * Teacher/HOD/Admin\PerformanceController so the shaping logic exists in exactly one place.
 */
final class MarksheetCsvBuilder
{
    public static function build(array $marksheet): array
    {
        $columns = [
            'Admission No' => 'admission_number',
            'Name' => 'name',
        ];

        foreach ($marksheet['assignments'] as $assignment) {
            $key = 'a' . $assignment['id'];
            $columns["{$assignment['title']} (/{$assignment['total_marks']})"] = $key;
        }

        $columns['Average %'] = 'average';
        $columns['Grade'] = 'grade';

        $rows = [];
        foreach ($marksheet['rows'] as $studentRow) {
            $row = [
                'admission_number' => $studentRow['admission_number'],
                'name' => trim($studentRow['first_name'] . ' ' . $studentRow['last_name']),
                'average' => $studentRow['avg_percentage'] ?? '',
                'grade' => $studentRow['grade'] ?? '',
            ];

            foreach ($studentRow['cells'] as $cell) {
                $row['a' . $cell['assignment_id']] = $cell['score'] !== null ? $cell['score'] : '-';
            }

            $rows[] = $row;
        }

        return ['columns' => $columns, 'rows' => $rows];
    }
}
