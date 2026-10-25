<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\SupervisionService;
use eSpace\App\Services\TermService;

/**
 * Closing a term, in order: marking finished, paper exam marks in, report cards made for every
 * class, learners promoted (in the last term of the school year), and the next term set up.
 * Each step says what is left and links to where it is done.
 */
class EndOfTermController extends Controller
{
    /**
     * GET /admin/end-of-term?term_id=
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->hasAnyRole(['admin', 'super_admin'])) {
            $this->forbidden();
            return;
        }
        TermService::syncCurrent();
        $db = \eSpace\Config\Database::getInstance();

        $terms = $db->query(
            "SELECT t.id, t.name, t.start_date, t.end_date, t.is_current, t.academic_year_id, ay.name AS year_name
             FROM terms t LEFT JOIN academic_years ay ON ay.id = t.academic_year_id
             WHERE t.deleted_at IS NULL ORDER BY t.start_date DESC"
        )->fetchAll();
        $termId = (int) ($this->query('term_id') ?? 0);
        $term = null;
        foreach ($terms as $t) {
            if (($termId && (int) $t['id'] === $termId) || (!$termId && (int) $t['is_current'] === 1)) { $term = $t; break; }
        }
        $term ??= $terms[0] ?? null;
        $termList = array_map(fn ($t) => ['id' => (int) $t['id'], 'name' => trim($t['name'] . ' ' . ($t['year_name'] ?? '')), 'is_current' => (int) $t['is_current'] === 1], $terms);
        if (!$term) {
            $this->success(['terms' => $termList, 'term' => null, 'steps' => []]);
            return;
        }
        $tid = (int) $term['id'];
        $steps = [];

        // 1. marking
        $assessments = (new SupervisionService())->assessments($term);
        $waiting = array_sum(array_column($assessments, 'waiting'));
        $teachersMarking = count(array_unique(array_map(fn ($a) => $a['teacher_id'], array_filter($assessments, fn ($a) => $a['waiting'] > 0))));
        $steps[] = [
            'key' => 'marking',
            'title' => 'Marking finished',
            'done' => $waiting === 0,
            'detail' => $waiting === 0
                ? 'Every script handed in this term has been marked.'
                : "{$waiting} scripts are still waiting to be marked, by {$teachersMarking} teacher" . ($teachersMarking === 1 ? '' : 's') . '.',
            'link' => '/admin/supervision',
            'action' => 'Print the teacher report',
            'items' => [],
        ];

        // 2. paper exam marks
        $stmt = $db->prepare(
            "SELECT pa.id, pa.title, s.name AS subject, TRIM(CONCAT(c.name, ' ', COALESCE(c.stream_name, ''))) AS class,
                    (SELECT COUNT(DISTINCT sde.student_id) FROM student_department_enrollments sde
                      WHERE sde.class_id = pa.class_id AND sde.department_id = s.department_id
                        AND sde.deleted_at IS NULL AND sde.status = 'active') AS expected,
                    (SELECT COUNT(*) FROM physical_assessment_scores pas WHERE pas.physical_assessment_id = pa.id AND pas.score IS NOT NULL) AS entered
             FROM physical_assessments pa
             JOIN subjects s ON s.id = pa.subject_id
             JOIN classes c ON c.id = pa.class_id
             WHERE pa.term_id = ? AND pa.include_on_report = 1 AND pa.deleted_at IS NULL"
        );
        $stmt->execute([$tid]);
        $exams = $stmt->fetchAll();
        $short = array_values(array_filter($exams, fn ($e) => (int) $e['entered'] < (int) $e['expected']));
        $steps[] = [
            'key' => 'paper',
            'title' => 'Paper exam marks entered',
            'done' => !$short,
            'detail' => !$exams
                ? 'No paper exams are set to count on report cards this term.'
                : (!$short ? 'All ' . count($exams) . ' paper exams have every mark in.' : count($short) . ' of ' . count($exams) . ' paper exams are missing marks.'),
            'link' => '/admin/physical-exams',
            'action' => 'Open paper exams',
            'items' => array_map(fn ($e) => [
                'label' => "{$e['subject']} - {$e['title']} ({$e['class']})",
                'value' => ((int) $e['entered']) . ' of ' . ((int) $e['expected']) . ' marks in',
            ], array_slice($short, 0, 12)),
        ];

        // 3. report cards, class by class
        $stmt = $db->prepare(
            "SELECT c.id, TRIM(CONCAT(c.name, ' ', COALESCE(c.stream_name, ''))) AS class,
                    COUNT(DISTINCT st.id) AS learners, COUNT(DISTINCT rc.student_id) AS made
             FROM classes c
             JOIN students st ON st.class_id = c.id AND st.deleted_at IS NULL
             LEFT JOIN report_cards rc ON rc.student_id = st.id AND rc.term_id = ?
             WHERE c.deleted_at IS NULL
             GROUP BY c.id, c.name, c.stream_name
             ORDER BY c.name, c.stream_name"
        );
        $stmt->execute([$tid]);
        $classes = $stmt->fetchAll();
        $learners = array_sum(array_column($classes, 'learners'));
        $made = array_sum(array_column($classes, 'made'));
        $todo = array_values(array_filter($classes, fn ($c) => (int) $c['made'] < (int) $c['learners']));
        $steps[] = [
            'key' => 'reports',
            'title' => 'Report cards made',
            'done' => $learners > 0 && !$todo,
            'detail' => "{$made} of {$learners} learners have a report card for this term"
                . ($todo ? ' - ' . count($todo) . ' class' . (count($todo) === 1 ? '' : 'es') . ' still to do.' : '.'),
            'link' => '/admin/reports',
            'action' => 'Make report cards',
            'items' => array_map(fn ($c) => [
                'label' => $c['class'],
                'value' => ((int) $c['made']) . ' of ' . ((int) $c['learners']),
                'link' => '/admin/reports?class_id=' . (int) $c['id'] . '&term_id=' . $tid,
            ], $todo),
        ];

        // 4. promotion - only after the last term of the school year
        $stmt = $db->prepare("SELECT MAX(end_date) FROM terms WHERE academic_year_id = ? AND deleted_at IS NULL");
        $stmt->execute([(int) $term['academic_year_id']]);
        $lastTerm = (string) $stmt->fetchColumn() === (string) $term['end_date'];
        if ($lastTerm) {
            $stmt = $db->prepare("SELECT COUNT(DISTINCT student_id) FROM student_promotions WHERE from_academic_year_id = ?");
            $stmt->execute([(int) $term['academic_year_id']]);
            $promoted = (int) $stmt->fetchColumn();
            $steps[] = [
                'key' => 'promotion',
                'title' => 'Learners promoted',
                'done' => $promoted > 0,
                'detail' => $promoted > 0
                    ? "{$promoted} learners have been moved up to next year's classes."
                    : "This is the last term of the year - move learners up to next year's classes once report cards are out.",
                'link' => '/admin/promotion',
                'action' => 'Open promotion',
                'items' => [],
            ];
        }

        // 5. the next term
        $stmt = $db->prepare("SELECT name, start_date FROM terms WHERE deleted_at IS NULL AND start_date > ? ORDER BY start_date LIMIT 1");
        $stmt->execute([$term['end_date']]);
        $next = $stmt->fetch();
        $steps[] = [
            'key' => 'next',
            'title' => 'Next term set up',
            'done' => (bool) $next,
            'detail' => $next
                ? "{$next['name']} starts " . date('j M Y', strtotime((string) $next['start_date'])) . '.'
                : 'The next term is not in the calendar yet - add it so dashboards and report cards move on.',
            'link' => '/admin/terms',
            'action' => 'Open terms',
            'items' => [],
        ];

        $today = strtotime(date('Y-m-d'));
        $end = strtotime((string) $term['end_date']);
        $this->success([
            'terms' => $termList,
            'term' => [
                'id' => $tid,
                'name' => trim($term['name'] . ' ' . ($term['year_name'] ?? '')),
                'start_date' => $term['start_date'],
                'end_date' => $term['end_date'],
                'days_left' => (int) round(($end - $today) / 86400),
                'last_of_year' => $lastTerm,
            ],
            'steps' => $steps,
            'auto_switch' => TermService::autoSwitchOn(),
        ]);
    }
}
