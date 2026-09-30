<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * "What should I do next?" - a short, ordered list of the student's most useful next steps, from
 * what the system already knows about them:
 *  1. assessments they started and haven't submitted
 *  2. assessments due within a few days
 *  3. notes to read first, for a topic whose assessment is waiting for them
 *  4. other assessments still to do
 *  5. the eNotes they were part-way through
 *  6. learning outcomes to strengthen (their Learning Map: developing / needs support), with the
 *     practice their teacher tagged to the topic, else the notes
 * Assessments follow the student's own Assessments list (same visibility rules).
 *
 * GET /student/next-steps
 */
class NextStepsController extends Controller
{
    private const MAX_STEPS = 5;
    private const SOON_DAYS = 3;

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM students WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$_SESSION['user_id'] ?? 0]);
        $studentId = ($row = $stmt->fetch()) ? (int) $row['id'] : null;
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $steps = [];
        $now = time();

        // ---- Assessments ------------------------------------------------------------------------
        $assessments = $this->openAssessments($db, $studentId);
        $pendingAssessmentIds = [];
        foreach ($assessments as $a) {
            $due = $a['due_date'] ? strtotime($a['due_date']) : null;
            if ($due !== null && $due < $now && !(int) $a['allow_late_submission']) {
                continue; // closed
            }
            $pendingAssessmentIds[(int) $a['id']] = true;
            $days = $due !== null ? (int) floor(($due - $now) / 86400) : null;
            $started = $a['submission_status'] === 'in_progress';
            $category = $this->categoryName($a['assessment_category']);
            $steps[] = [
                'kind' => $started ? 'finish' : 'assessment',
                'priority' => $started ? 100 : ($days !== null && $days <= self::SOON_DAYS ? 90 - max(0, $days) : 60),
                'title' => ($started ? 'Finish ' : 'Attempt ') . $this->title($a['title']),
                'detail' => trim(($category ? $category . ' · ' : '') . $a['subject_name'] . ($due !== null ? ' · ' . $this->dueText($due, $now) : '')),
                'subject' => $a['subject_name'],
                'due_date' => $a['due_date'],
                'overdue' => $due !== null && $due < $now,
                'action' => ['label' => $started ? 'Continue' : 'Start', 'to' => "/student/assignments/{$a['id']}/answer"],
            ];
        }

        // ---- The Learning Map: notes before assessments, and outcomes to strengthen -------------
        $map = null;
        try {
            $map = (new MasteryController())->compute($studentId);
        } catch (\Throwable $e) {
            error_log('Next steps: learning map unavailable: ' . $e->getMessage());
        }
        foreach ($map['subjects'] ?? [] as $subject) {
            foreach ($subject['topics'] as $topic) {
                $waiting = array_filter(
                    array_merge(...array_map(fn($o) => $o['assessments'], $topic['outcomes']), ...[$topic['aoi']['assessments'] ?? []]),
                    fn($x) => in_array($x['state'], ['available', 'started'], true) && isset($pendingAssessmentIds[$x['id']])
                );
                // Notes first: an assessment on this topic is waiting and its notes aren't read yet
                if ($waiting && $topic['enote'] && !$topic['enote']['opened']) {
                    $steps[] = [
                        'kind' => 'read_first',
                        'priority' => 80,
                        'title' => 'Read the ' . $this->title($topic['topic']) . ' notes',
                        'detail' => 'Before your assessment on it · ' . $subject['name'],
                        'subject' => $subject['name'],
                        'due_date' => null,
                        'overdue' => false,
                        'action' => ['label' => 'Read', 'to' => "/student/enotes/{$topic['enote']['id']}"],
                    ];
                }
                // Outcomes to strengthen (returned results below Satisfactory)
                foreach ($topic['outcomes'] as $o) {
                    if (!in_array($o['status'], ['needs_support', 'developing'], true)) {
                        continue;
                    }
                    $practice = $topic['practice'][0] ?? null;
                    $steps[] = [
                        'kind' => 'strengthen',
                        'priority' => $o['status'] === 'needs_support' ? 45 : 40,
                        'title' => 'Strengthen: ' . $this->shorten($o['text']),
                        'detail' => ($o['level'] ? "{$o['level']} · {$o['percentage']}%" : '') . ' · ' . $subject['name'],
                        'subject' => $subject['name'],
                        'due_date' => null,
                        'overdue' => false,
                        'action' => $practice
                            ? ['label' => 'Practise', 'to' => "/student/itembank?open={$practice['id']}"]
                            // else the very page the outcome is taught on (where its assessment was set)
                            : ($o['revise']
                                ? ['label' => 'Revise', 'to' => "/student/enotes/{$o['revise']['topic_id']}?resumePage={$o['revise']['page_id']}"]
                                : ($topic['enote']
                                    ? ['label' => 'Revise', 'to' => "/student/enotes/{$topic['enote']['id']}"]
                                    : ['label' => 'See map', 'to' => '/student/learning-map'])),
                    ];
                }
            }
        }

        // ---- Revision their teacher sent them (support groups) ---------------------------------
        foreach ($this->supportGroups($db, $studentId) as $g) {
            $meeting = $g['meet_at'] && strtotime($g['meet_at']) > $now - 86400
                ? 'Session ' . date('D j M, g:i A', strtotime($g['meet_at'])) . ($g['meet_place'] ? ' · ' . $g['meet_place'] : '')
                : ($g['meet_place'] ? 'Session: ' . $g['meet_place'] : '');
            $steps[] = [
                'kind' => 'support',
                'priority' => 85,
                'title' => 'Revise: ' . $this->shorten($g['kind'] === 'competency' ? $this->title($g['topic_text']) . ' competency' : $g['item_text']),
                'detail' => trim('From your teacher · ' . ($meeting ? $meeting . ' · ' : '') . $g['subject_name']),
                'note' => $g['note'],
                'subject' => $g['subject_name'],
                'due_date' => $g['meet_at'],
                'overdue' => false,
                // Opening it counts as revising (the card tells the server first)
                'action' => $this->supportAction($map, $g) + ['mark' => "/api/student/support-groups/{$g['id']}/revised"],
            ];
        }

        // ---- Reading they were part-way through ------------------------------------------------
        foreach ($this->unfinishedReading($db, $studentId) as $r) {
            $steps[] = [
                'kind' => 'continue_reading',
                'priority' => 50,
                'title' => 'Continue reading ' . $this->title($r['title']),
                'detail' => "Page {$r['page_number']} of {$r['total_pages']} · " . $r['subject_name'],
                'subject' => $r['subject_name'],
                'due_date' => null,
                'overdue' => false,
                'action' => ['label' => 'Continue', 'to' => "/student/enotes/{$r['id']}?resumePage={$r['current_page_id']}"],
            ];
        }

        // Most useful first; soonest due breaks ties
        usort($steps, function ($a, $b) {
            if ($a['priority'] !== $b['priority']) {
                return $b['priority'] <=> $a['priority'];
            }
            return strcmp((string) ($a['due_date'] ?? '9999'), (string) ($b['due_date'] ?? '9999'));
        });
        // One "read first" per set of notes
        $seen = [];
        $steps = array_values(array_filter($steps, function ($s) use (&$seen) {
            $key = $s['action']['to'];
            if (isset($seen[$key])) {
                return false;
            }
            $seen[$key] = true;
            return true;
        }));

        $this->success([
            'steps' => array_map(fn($s) => array_diff_key($s, ['priority' => 0]), array_slice($steps, 0, self::MAX_STEPS)),
            'total' => count($steps),
            'assessments_to_do' => count($pendingAssessmentIds),
            // Consecutive days of real learning (reading, answering)
            'streak' => \eSpace\App\Services\RewardService::currentStreak($studentId),
        ]);
    }

    /**
     * The student opened revision their teacher sent them
     * POST /student/support-groups/{id}/revised
     */
    public function revised($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = (int) ($_SESSION['user_id'] ?? 0);
        try {
            $this->getDb()->prepare(
                "UPDATE support_group_members SET revised_at = NOW()
                 WHERE group_id = ? AND student_id = ? AND revised_at IS NULL"
            )->execute([(int) $id, $studentId]);
        } catch (\PDOException $e) {
            // migration 102 not run yet
        }
        $this->success(['id' => (int) $id]);
    }

    /** Open support groups the student is in and hasn't revised for yet, newest first */
    private function supportGroups($db, int $studentId): array
    {
        try {
            $stmt = $db->prepare(
                "SELECT g.id, g.subject_id, g.kind, g.item_text, g.topic_text, g.note, g.meet_at, g.meet_place,
                        s.name AS subject_name
                 FROM support_group_members m
                 INNER JOIN support_groups g ON g.id = m.group_id AND g.status = 'open'
                 INNER JOIN subjects s ON s.id = g.subject_id
                 WHERE m.student_id = ? AND m.revised_at IS NULL
                 ORDER BY g.created_at DESC
                 LIMIT 5"
            );
            $stmt->execute([$studentId]);
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            return []; // migration 102 not run yet
        }
    }

    /**
     * Where to revise a support group's outcome or competency, from the student's own Learning Map
     * (so it's their own stream's notes): the page it's taught on, else the topic's notes, else the
     * practice tagged to the topic, else the map itself
     */
    private function supportAction(?array $map, array $g): array
    {
        $norm = fn($t) => mb_strtolower(trim(preg_replace('/\s+/', ' ', (string) $t)));
        foreach ($map['subjects'] ?? [] as $subject) {
            if ((int) ($subject['id'] ?? 0) !== (int) $g['subject_id']) {
                continue;
            }
            foreach ($subject['topics'] as $topic) {
                if ($norm($topic['topic']) !== $norm($g['topic_text'])) {
                    continue;
                }
                if ($g['kind'] === 'outcome') {
                    foreach ($topic['outcomes'] as $o) {
                        if ($norm($o['text']) === $norm($g['item_text']) && $o['revise']) {
                            return ['label' => 'Revise', 'to' => "/student/enotes/{$o['revise']['topic_id']}?resumePage={$o['revise']['page_id']}"];
                        }
                    }
                }
                if ($topic['enote']) {
                    return ['label' => 'Revise', 'to' => "/student/enotes/{$topic['enote']['id']}"];
                }
                if ($topic['practice']) {
                    return ['label' => 'Practise', 'to' => "/student/itembank?open={$topic['practice'][0]['id']}"];
                }
            }
        }
        return ['label' => 'See map', 'to' => '/student/learning-map'];
    }

    /** Published, open assessments for the student that they haven't submitted (or have started) */
    private function openAssessments($db, int $studentId): array
    {
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.due_date, a.allow_late_submission, a.assessment_category,
                    s.name AS subject_name, COALESCE(sub.status, 'new') AS submission_status
             FROM assignments a
             INNER JOIN subjects s ON a.subject_id = s.id
             LEFT JOIN assignment_submissions sub ON sub.id = (
                 SELECT s2.id FROM assignment_submissions s2
                 WHERE s2.assignment_id = a.id AND s2.student_id = :student_id_sub AND s2.deleted_at IS NULL
                 ORDER BY s2.attempt_number DESC, s2.id DESC LIMIT 1
             )
             WHERE a.status = 'published' AND a.deleted_at IS NULL
               AND (a.open_at IS NULL OR a.open_at <= NOW())
               AND EXISTS (
                   SELECT 1 FROM student_department_enrollments sde
                   LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                   WHERE sde.student_id = :student_id_enroll
                     AND (
                       sde.class_id = a.class_id
                       OR (a.class_group_name IS NOT NULL AND sde_c.name = a.class_group_name)
                       OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id AND ac.class_id = sde.class_id)
                     )
                     AND sde.department_id = s.department_id
                     AND sde.deleted_at IS NULL
                     AND sde.status = 'active'
                     AND COALESCE(a.published_at, a.created_at) BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
               )
               AND NOT EXISTS (
                   SELECT 1 FROM student_teacher_enrollments ste
                   WHERE ste.student_id = :student_id_te
                     AND ste.teacher_id = a.teacher_id
                     AND ste.department_id = s.department_id
                     AND ste.status = 'withdrawn'
               )
               AND COALESCE(sub.status, 'new') IN ('new', 'in_progress')
             ORDER BY a.due_date IS NULL, a.due_date ASC"
        );
        $stmt->execute(['student_id_sub' => $studentId, 'student_id_enroll' => $studentId, 'student_id_te' => $studentId]);
        return $stmt->fetchAll();
    }

    /** eNotes the student opened and stopped part-way through, most recent first */
    private function unfinishedReading($db, int $studentId): array
    {
        try {
            $stmt = $db->prepare(
                "SELECT et.id, et.title, s.name AS subject_name, prog.current_page_id,
                        (SELECT COUNT(*) FROM enote_pages p WHERE p.topic_id = et.id AND p.is_active = 1 AND p.deleted_at IS NULL) AS total_pages,
                        (SELECT COUNT(*) FROM enote_pages rp INNER JOIN enote_pages cp ON cp.id = prog.current_page_id
                          WHERE rp.topic_id = et.id AND rp.is_active = 1 AND rp.deleted_at IS NULL AND rp.order_number <= cp.order_number) AS page_number
                 FROM enote_progress prog
                 INNER JOIN enote_topics et ON et.id = prog.topic_id AND et.status = 'published' AND et.deleted_at IS NULL
                 LEFT JOIN subjects s ON s.id = et.subject_id
                 WHERE prog.student_id = ? AND prog.current_page_id IS NOT NULL
                 ORDER BY prog.last_read_at DESC
                 LIMIT 5"
            );
            $stmt->execute([$studentId]);
        } catch (\PDOException $e) {
            return [];
        }
        return array_values(array_filter($stmt->fetchAll(), fn($r) => (int) $r['page_number'] > 1 && (int) $r['page_number'] < (int) $r['total_pages']));
    }

    private function categoryName(?string $category): string
    {
        return match ($category) {
            'LOA' => 'Learning Outcome Assessment',
            'AOI' => 'Activity of Integration',
            'EOC' => 'End of Chapter',
            default => '',
        };
    }

    private function dueText(int $due, int $now): string
    {
        $days = (int) floor(($due - $now) / 86400);
        if ($due < $now) {
            return 'overdue';
        }
        if ($days === 0) {
            return 'due today';
        }
        if ($days === 1) {
            return 'due tomorrow';
        }
        return $days < 7 ? 'due ' . date('l', $due) : 'due ' . date('j M', $due);
    }

    /** Curriculum titles are often in capitals - "MEASUREMENTS IN PHYSICS" reads better as a title */
    private function title(string $text): string
    {
        $text = trim($text);
        if (mb_strtoupper($text) !== $text) {
            return $text;
        }
        $small = ['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with'];
        $words = explode(' ', mb_convert_case(mb_strtolower($text), MB_CASE_TITLE));
        foreach ($words as $i => $word) {
            if ($i > 0 && in_array(mb_strtolower($word), $small, true)) {
                $words[$i] = mb_strtolower($word);
            }
        }
        return implode(' ', $words);
    }

    private function shorten(string $text, int $max = 80): string
    {
        $text = trim(preg_replace('/\s+/', ' ', $text));
        return mb_strlen($text) > $max ? rtrim(mb_substr($text, 0, $max - 1)) . '…' : $text;
    }
}
