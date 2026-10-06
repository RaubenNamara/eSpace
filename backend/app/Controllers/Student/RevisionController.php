<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\AssignmentAccess;
use eSpace\App\Services\LiveQuizService;

/**
 * Daily Revision ("Daily 5"): five quick cards a day from the multiple-choice and true/false
 * questions of the student's own assessments - only ones that are closed or already marked for
 * them, so it never gives away open work. Questions from assessments they scored under 60% on
 * come first. Spaced repetition (Leitner boxes): a right answer comes back later and later
 * (1, 2, 4, 7, 14 days), a wrong one tomorrow. Finishing the five keeps a daily streak.
 *
 * GET  /student/revision            today's cards, streak
 * POST /student/revision/answer     { question_id, option_ids: [] }
 * POST /student/revision/finish     { right, total }
 * GET  /student/revision?more=1     five more, after today's are done
 */
class RevisionController extends Controller
{
    private const PER_DAY = 5;
    private const INTERVALS = [1 => 1, 2 => 2, 3 => 4, 4 => 7, 5 => 14];

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    // Days are counted in the school's time, so a streak doesn't roll over at 3 a.m.
    private static function day(string $when = 'today'): \DateTime
    {
        return new \DateTime($when, new \DateTimeZone('Africa/Kampala'));
    }

    private function today(): string
    {
        return self::day()->format('Y-m-d');
    }

    /**
     * The questions this student may revise, with how they did on that assessment
     *
     * @return array<int, array{assignment_id:int, pct:?float}> question id => info
     */
    private function pool($db, int $studentId, ?int $onlyQuestionId = null): array
    {
        $types = "'" . implode("','", LiveQuizService::CHOICE_TYPES) . "'";
        $stmt = $db->prepare(
            "SELECT q.id, a.id AS assignment_id, sb.percentage
             FROM assignment_questions q
             INNER JOIN assignments a ON a.id = q.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
             INNER JOIN subjects s ON s.id = a.subject_id
             LEFT JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.student_id = ? AND sb.deleted_at IS NULL AND sb.status = 'returned'
             WHERE q.deleted_at IS NULL AND q.parent_question_id IS NULL AND q.question_type IN ($types)
               " . ($onlyQuestionId ? 'AND q.id = ?' : '') . "
               AND (sb.id IS NOT NULL OR COALESCE(a.deadline_at, a.due_date) < NOW())
               AND EXISTS (SELECT 1 FROM assignment_question_options o WHERE o.question_id = q.id AND o.is_correct = 1)
               AND " . AssignmentAccess::clause()
        );
        $params = [$studentId];
        if ($onlyQuestionId) {
            $params[] = $onlyQuestionId;
        }
        $params[] = $studentId;
        $params[] = $studentId;
        $stmt->execute($params);
        $out = [];
        foreach ($stmt->fetchAll() as $r) {
            $out[(int) $r['id']] = ['assignment_id' => (int) $r['assignment_id'], 'pct' => $r['percentage'] !== null ? (float) $r['percentage'] : null];
        }
        return $out;
    }

    private function streak($db, int $studentId): array
    {
        $stmt = $db->prepare("SELECT day FROM revision_days WHERE student_id = ? ORDER BY day DESC LIMIT 400");
        $stmt->execute([$studentId]);
        $days = array_column($stmt->fetchAll(), 'day');
        $set = array_flip($days);
        $doneToday = isset($set[$this->today()]);
        // Count back from today (or yesterday, if today isn't done yet)
        $d = self::day($doneToday ? 'today' : 'yesterday');
        $streak = 0;
        while (isset($set[$d->format('Y-m-d')])) {
            $streak++;
            $d->modify('-1 day');
        }
        return ['streak' => $streak, 'done_today' => $doneToday, 'days_total' => count($days)];
    }

    private function cards($db, array $ids): array
    {
        if (!$ids) {
            return [];
        }
        $stmt = $db->prepare(
            "SELECT q.id, q.question_type, q.question_text, q.attachment_type, q.attachment_path,
                    a.title AS assignment_title, a.assessment_category, s.name AS subject_name
             FROM assignment_questions q
             INNER JOIN assignments a ON a.id = q.assignment_id
             INNER JOIN subjects s ON s.id = a.subject_id
             WHERE q.id IN (" . self::in($ids) . ")"
        );
        $stmt->execute($ids);
        $rows = [];
        foreach ($stmt->fetchAll() as $r) {
            $rows[(int) $r['id']] = $r;
        }
        $stmt = $db->prepare("SELECT id, question_id, option_text FROM assignment_question_options WHERE question_id IN (" . self::in($ids) . ") ORDER BY display_order, id");
        $stmt->execute($ids);
        $options = [];
        foreach ($stmt->fetchAll() as $o) {
            $options[(int) $o['question_id']][] = ['id' => (int) $o['id'], 'text' => $o['option_text']];
        }
        $out = [];
        foreach ($ids as $id) {
            if (!isset($rows[$id])) {
                continue;
            }
            $r = $rows[$id];
            $out[] = [
                'question_id' => $id,
                'type' => $r['question_type'],
                'text' => $r['question_text'],
                'image' => $r['attachment_type'] === 'image' ? $r['attachment_path'] : null,
                'options' => $options[$id] ?? [],
                'subject' => $r['subject_name'],
                'from' => trim(($r['assessment_category'] ? $r['assessment_category'] . ' · ' : '') . $r['assignment_title']),
            ];
        }
        return $out;
    }

    public function index(): void
    {
        $db = $this->getDb();
        $studentId = (int) $this->getCurrentUserId();
        $pool = $this->pool($db, $studentId);
        $streak = $this->streak($db, $studentId);
        $more = (bool) $this->query('more', false);

        $ids = [];
        if (!$streak['done_today'] || $more) {
            // Cards that are due, lowest box first
            $stmt = $db->prepare("SELECT question_id FROM revision_cards WHERE student_id = ? AND due_on <= ? ORDER BY box, due_on, RAND()");
            $stmt->execute([$studentId, $this->today()]);
            foreach (array_map('intval', array_column($stmt->fetchAll(), 'question_id')) as $qid) {
                if (isset($pool[$qid]) && count($ids) < self::PER_DAY) {
                    $ids[] = $qid;
                }
            }
            // Then new ones - weakest assessments first
            if (count($ids) < self::PER_DAY) {
                $stmt = $db->prepare("SELECT question_id FROM revision_cards WHERE student_id = ?");
                $stmt->execute([$studentId]);
                $seen = array_flip(array_map('intval', array_column($stmt->fetchAll(), 'question_id')));
                $fresh = array_filter(array_keys($pool), fn($qid) => !isset($seen[$qid]) && !in_array($qid, $ids, true));
                shuffle($fresh);
                usort($fresh, fn($a, $b) => ($pool[$a]['pct'] ?? 100) <=> ($pool[$b]['pct'] ?? 100));
                $ids = array_merge($ids, array_slice($fresh, 0, self::PER_DAY - count($ids)));
            }
        }

        $stmt = $db->prepare("SELECT COUNT(*) FROM revision_cards WHERE student_id = ? AND due_on = DATE_ADD(?, INTERVAL 1 DAY)");
        $stmt->execute([$studentId, $this->today()]);
        $tomorrow = (int) $stmt->fetchColumn();
        $stmt = $db->prepare("SELECT COUNT(*) FROM revision_cards WHERE student_id = ? AND box >= 4");
        $stmt->execute([$studentId]);
        $known = (int) $stmt->fetchColumn();

        $this->success([
            'cards' => $this->cards($db, $ids),
            'streak' => $streak['streak'],
            'done_today' => $streak['done_today'],
            'days_total' => $streak['days_total'],
            'due_tomorrow' => $tomorrow,
            'known' => $known,
            'pool' => count($pool),
        ]);
    }

    public function answer(): void
    {
        $db = $this->getDb();
        $studentId = (int) $this->getCurrentUserId();
        $qid = (int) $this->input('question_id', 0);
        if (!$qid || !$this->pool($db, $studentId, $qid)) {
            $this->notFound('Card not found');
            return;
        }
        $stmt = $db->prepare("SELECT q.question_type, o.id, o.is_correct FROM assignment_question_options o INNER JOIN assignment_questions q ON q.id = o.question_id WHERE o.question_id = ?");
        $stmt->execute([$qid]);
        $rows = $stmt->fetchAll();
        $valid = array_map(fn($r) => (int) $r['id'], $rows);
        $correct = array_values(array_map(fn($r) => (int) $r['id'], array_filter($rows, fn($r) => (int) $r['is_correct'] === 1)));
        $raw = $this->input('option_ids', []);
        $chosen = array_values(array_unique(array_filter(array_map('intval', is_array($raw) ? $raw : []), fn($o) => in_array($o, $valid, true))));
        if (!$chosen) {
            $this->error('Pick an answer', 422);
            return;
        }
        sort($chosen);
        sort($correct);
        $right = $chosen === $correct;

        $stmt = $db->prepare("SELECT box FROM revision_cards WHERE student_id = ? AND question_id = ?");
        $stmt->execute([$studentId, $qid]);
        $box = (int) ($stmt->fetchColumn() ?: 0);
        // A new card answered right skips to box 2; any wrong answer goes back to box 1
        $newBox = $right ? min(5, max(2, $box + 1)) : 1;
        $due = self::day()->modify('+' . self::INTERVALS[$newBox] . ' day')->format('Y-m-d');
        $db->prepare(
            "INSERT INTO revision_cards (student_id, question_id, box, due_on, times_right, times_wrong, last_seen_at)
             VALUES (?, ?, ?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE box = VALUES(box), due_on = VALUES(due_on),
               times_right = times_right + VALUES(times_right), times_wrong = times_wrong + VALUES(times_wrong), last_seen_at = NOW()"
        )->execute([$studentId, $qid, $newBox, $due, $right ? 1 : 0, $right ? 0 : 1]);

        $this->success([
            'right' => $right,
            'correct_option_ids' => $correct,
            'box' => $newBox,
            'next_in_days' => self::INTERVALS[$newBox],
        ]);
    }

    public function finish(): void
    {
        $db = $this->getDb();
        $studentId = (int) $this->getCurrentUserId();
        $right = max(0, min(255, (int) $this->input('right', 0)));
        $total = max(0, min(255, (int) $this->input('total', 0)));
        $db->prepare(
            "INSERT INTO revision_days (student_id, day, right_count, card_count) VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE right_count = right_count + VALUES(right_count), card_count = card_count + VALUES(card_count)"
        )->execute([$studentId, $this->today(), $right, $total]);
        // A revision session is a learning day for the main streak too
        \eSpace\App\Services\RewardService::recordLearningDay((int) $studentId);
        $this->success($this->streak($db, $studentId));
    }
}
