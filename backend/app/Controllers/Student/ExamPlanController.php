<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Exam countdown and revision plan. The student's next exam (from Admin > Exam dates, for their
 * class level or everyone), the days left, and a week-by-week plan up to it: the curriculum topics
 * of their own class streams, weakest first - topics they scored under 60% on (as on the Learning
 * Map), then ones not assessed yet, then the rest - each with its eNotes when there are some.
 *
 * GET /student/exam-plan
 */
class ExamPlanController extends Controller
{
    private const PER_WEEK_MAX = 5;

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    public function index(): void
    {
        $db = $this->getDb();
        $studentId = (int) $this->getCurrentUserId();

        // My class streams (and their level names), in departments I'm enrolled in
        $stmt = $db->prepare(
            "SELECT DISTINCT sde.class_id, sde.department_id, c.name FROM student_department_enrollments sde
             INNER JOIN classes c ON c.id = sde.class_id
             WHERE sde.student_id = ? AND sde.status = 'active' AND sde.deleted_at IS NULL"
        );
        $stmt->execute([$studentId]);
        $enrol = $stmt->fetchAll();
        $classIds = array_values(array_unique(array_map(fn($r) => (int) $r['class_id'], $enrol)));
        $departments = array_values(array_unique(array_map(fn($r) => (int) $r['department_id'], $enrol)));
        $levels = array_values(array_unique(array_column($enrol, 'name')));

        // The next exam for me
        $levelSql = $levels ? " OR class_level IN (" . self::in($levels) . ")" : '';
        $stmt = $db->prepare(
            "SELECT id, title, class_level, starts_on, ends_on FROM exam_dates
             WHERE deleted_at IS NULL AND COALESCE(ends_on, starts_on) >= CURDATE() AND (class_level IS NULL$levelSql)
             ORDER BY starts_on LIMIT 3"
        );
        $stmt->execute($levels);
        $exams = $stmt->fetchAll();
        $exam = $exams[0] ?? null;
        if (!$exam || !$classIds || !$departments) {
            $this->success(['exam' => $exam ? $this->examOut($exam) : null, 'upcoming' => array_map(fn($e) => $this->examOut($e), array_slice($exams, 1)), 'weeks' => [], 'topics' => 0]);
            return;
        }

        // Topics of my streams, this year, in my departments' subjects
        $stmt = $db->prepare(
            "SELECT ct.id, ct.topic, ct.theme_branch, ct.term_id, s.id AS subject_id, s.name AS subject_name, s.code AS subject_code
             FROM enote_curriculum_topics ct
             INNER JOIN academic_years ay ON ay.id = ct.academic_year_id AND ay.is_current = 1
             INNER JOIN subjects s ON s.id = ct.subject_id AND s.deleted_at IS NULL AND s.department_id IN (" . self::in($departments) . ")
             LEFT JOIN terms tm ON tm.id = ct.term_id
             WHERE ct.deleted_at IS NULL AND ct.class_id IN (" . self::in($classIds) . ")
               AND (tm.id IS NULL OR tm.start_date <= CURDATE())
             ORDER BY s.name, ct.term_id, ct.id"
        );
        $stmt->execute(array_merge($departments, $classIds));
        $topics = $stmt->fetchAll();
        if (!$topics) {
            $this->success(['exam' => $this->examOut($exam), 'upcoming' => array_map(fn($e) => $this->examOut($e), array_slice($exams, 1)), 'weeks' => [], 'topics' => 0]);
            return;
        }
        $ids = array_map(fn($t) => (int) $t['id'], $topics);

        // How I did on each topic (returned LOA results on its outcomes)
        $stmt = $db->prepare(
            "SELECT alo.curriculum_topic_id, AVG(sb.percentage) AS pct
             FROM assignment_learning_outcomes alo
             INNER JOIN assignments a ON a.id = alo.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
             INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.student_id = ? AND sb.deleted_at IS NULL
                    AND sb.status = 'returned' AND sb.percentage IS NOT NULL
             WHERE alo.curriculum_topic_id IN (" . self::in($ids) . ")
             GROUP BY alo.curriculum_topic_id"
        );
        $stmt->execute(array_merge([$studentId], $ids));
        $score = [];
        foreach ($stmt->fetchAll() as $r) {
            $score[(int) $r['curriculum_topic_id']] = round((float) $r['pct']);
        }

        // eNotes I can read for each topic (the reader's rule uses named placeholders, so the
        // topic list is bound by name too)
        $sql = "SELECT et.id, et.curriculum_topic_id FROM enote_topics et
                WHERE et.curriculum_topic_id IN (" . implode(',', array_map(fn($i) => ":t$i", array_keys($ids))) . ") AND " . ENoteController::visibilityClause();
        $stmt = $db->prepare($sql);
        $bind = ['student_id' => $studentId, 'student_id_te' => $studentId];
        foreach ($ids as $i => $id) {
            $bind["t$i"] = $id;
        }
        $stmt->execute($bind);
        $enotes = [];
        foreach ($stmt->fetchAll() as $r) {
            $enotes[(int) $r['curriculum_topic_id']] ??= (int) $r['id'];
        }

        // Weakest first: under 60%, then not assessed (with eNotes to revise from first), then the rest
        $items = array_map(function ($t) use ($score, $enotes) {
            $id = (int) $t['id'];
            $s = $score[$id] ?? null;
            return [
                'topic_id' => $id,
                'topic' => $t['topic'],
                'subject' => $t['subject_name'],
                'subject_code' => $t['subject_code'],
                'score' => $s,
                'state' => $s === null ? 'new' : ($s < 60 ? 'weak' : 'good'),
                'enote_id' => $enotes[$id] ?? null,
            ];
        }, $topics);
        $tier = fn($i) => $i['state'] === 'weak' ? 0 : ($i['state'] === 'new' ? ($i['enote_id'] ? 1 : 2) : 3);
        usort($items, fn($a, $b) => $tier($a) <=> $tier($b) ?: ($a['score'] ?? 0) <=> ($b['score'] ?? 0));
        // Within each tier, take subjects in turn so a week mixes subjects
        $mixed = [];
        foreach ([0, 1, 2, 3] as $t) {
            $bySubject = [];
            foreach ($items as $i) {
                if ($tier($i) === $t) {
                    $bySubject[$i['subject']][] = $i;
                }
            }
            while ($bySubject) {
                foreach (array_keys($bySubject) as $subject) {
                    $mixed[] = array_shift($bySubject[$subject]);
                    if (!$bySubject[$subject]) {
                        unset($bySubject[$subject]);
                    }
                }
            }
        }
        $items = $mixed;

        // Spread over the weeks before the exam (this week first), at most a few a week
        $today = new \DateTime('today');
        $monday = (clone $today)->modify('-' . ((int) $today->format('N') - 1) . ' days');
        $examDay = new \DateTime($exam['starts_on']);
        $weeksLeft = max(1, (int) ceil(($examDay->getTimestamp() - $monday->getTimestamp()) / (7 * 86400)));
        $perWeek = min(self::PER_WEEK_MAX, max(1, (int) ceil(count($items) / $weeksLeft)));
        $weeks = [];
        foreach (array_chunk($items, $perWeek) as $i => $chunk) {
            if ($i >= $weeksLeft) {
                break;
            }
            $start = (clone $monday)->modify("+$i week");
            $weeks[] = ['week_start' => $start->format('Y-m-d'), 'items' => $chunk];
        }

        $this->success([
            'exam' => $this->examOut($exam),
            'upcoming' => array_map(fn($e) => $this->examOut($e), array_slice($exams, 1)),
            'weeks' => $weeks,
            'topics' => count($items),
            'planned' => array_sum(array_map(fn($w) => count($w['items']), $weeks)),
            'weak' => count(array_filter($items, fn($i) => $i['state'] === 'weak')),
        ]);
    }

    private function examOut(array $e): array
    {
        $days = (int) (new \DateTime('today'))->diff(new \DateTime($e['starts_on']))->format('%r%a');
        return ['id' => (int) $e['id'], 'title' => $e['title'], 'class_level' => $e['class_level'], 'starts_on' => $e['starts_on'], 'ends_on' => $e['ends_on'], 'days_left' => max(0, $days)];
    }
}
