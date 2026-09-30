<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\App\Controllers\Student\MasteryController;

/**
 * A learner's one-page "what I can do" report, from their Learning Map (returned Learning Outcome
 * Assessments and Activities of Integration): per subject, the outcomes achieved, the topic
 * competencies with their level, what they can do and what they're working on - for parents'
 * meetings and conferences, alongside the report card. Printed by CompetencyReportSheet.vue.
 */
class LearningReportService
{
    private const CAN_PER_SUBJECT = 4;
    private const WORKING_PER_SUBJECT = 3;

    /** @return array<string, mixed>|null */
    public static function build($db, int $studentId): ?array
    {
        $stmt = $db->prepare(
            "SELECT st.id, st.first_name, st.last_name, st.admission_number,
                    (SELECT CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name)))
                     FROM student_department_enrollments sde INNER JOIN classes c ON c.id = sde.class_id
                     WHERE sde.student_id = st.id AND sde.status = 'active' AND sde.deleted_at IS NULL
                     ORDER BY sde.id DESC LIMIT 1) AS class_name
             FROM students st WHERE st.id = ? AND st.deleted_at IS NULL"
        );
        $stmt->execute([$studentId]);
        $student = $stmt->fetch();
        if (!$student) {
            return null;
        }

        $map = (new MasteryController())->compute($studentId);
        $school = $db->query("SELECT school_name, logo_path, motto, address, box_number, phone, email FROM school_settings WHERE id = 1")->fetch() ?: [];
        $term = $db->query("SELECT name FROM terms WHERE is_current = 1 ORDER BY id DESC LIMIT 1")->fetch();

        $subjects = [];
        foreach ($map['subjects'] ?? [] as $subject) {
            $can = [];
            $working = [];
            $competencies = [];
            foreach ($subject['topics'] as $topic) {
                foreach ($topic['outcomes'] as $o) {
                    if ($o['status'] === 'achieved') {
                        $can[] = ['text' => self::sentence($o['text']), 'percentage' => $o['percentage']];
                    } elseif (in_array($o['status'], ['developing', 'needs_support'], true)) {
                        $working[] = ['text' => self::sentence($o['text']), 'percentage' => $o['percentage']];
                    }
                }
                if ($topic['competency']['grade']) {
                    $competencies[] = [
                        'topic' => $topic['topic'],
                        'grade' => $topic['competency']['grade'],
                        'level' => $topic['competency']['level'],
                    ];
                }
            }
            $totals = $subject['totals'];
            $assessed = $totals['achieved'] + $totals['developing'] + $totals['needs_support'];
            // Subjects with nothing assessed yet are listed in one line, not given a block
            usort($can, fn($a, $b) => ($b['percentage'] ?? 0) <=> ($a['percentage'] ?? 0));
            usort($working, fn($a, $b) => ($a['percentage'] ?? 0) <=> ($b['percentage'] ?? 0));
            $subjects[] = [
                'name' => $subject['name'],
                'outcomes' => $totals['outcomes'],
                'assessed' => $assessed,
                'achieved' => $totals['achieved'],
                'percent' => $totals['percent'],
                'competencies' => $competencies,
                'can' => array_slice($can, 0, self::CAN_PER_SUBJECT),
                'can_more' => max(0, count($can) - self::CAN_PER_SUBJECT),
                'working_on' => array_slice($working, 0, self::WORKING_PER_SUBJECT),
                'working_more' => max(0, count($working) - self::WORKING_PER_SUBJECT),
            ];
        }
        usort($subjects, fn($a, $b) => ($b['assessed'] > 0) <=> ($a['assessed'] > 0) ?: strcmp($a['name'], $b['name']));

        return [
            'school' => $school,
            'student' => [
                'name' => trim($student['first_name'] . ' ' . $student['last_name']),
                'admission_number' => $student['admission_number'],
                'class_name' => $student['class_name'],
            ],
            'year' => $map['year'] ?? null,
            'term_name' => $term['name'] ?? null,
            'generated_at' => date('j F Y'),
            'overall' => $map['overall'] ?? null,
            'competencies' => $map['competencies'] ?? null,
            'subjects' => $subjects,
        ];
    }

    /** "understand how to measure length" -> "Understand how to measure length" (reads after "I can") */
    private static function sentence(string $text): string
    {
        $text = trim(preg_replace('/\s+/', ' ', $text));
        $text = rtrim($text, '. ');
        return mb_strtoupper(mb_substr($text, 0, 1)) . mb_substr($text, 1);
    }
}
