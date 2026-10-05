<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Live Quiz: a teacher runs the choice questions of one of their assessments live in class -
 * on the projector - and students answer on their phones with a 6-digit code.
 *
 * Phases: lobby -> question -> reveal -> question -> ... -> ended. Both screens poll for the
 * state (about once a second); the teacher's screen moves the quiz on. A right answer scores
 * 500 points plus up to 500 more for speed.
 *
 * When every question of the assessment marks itself (choice questions only), the scores can be
 * saved as returned submissions - so they count on the Learning Map exactly like the assessment
 * done the normal way. Students who already have a submission for it keep theirs.
 */
class LiveQuizService
{
    public const CHOICE_TYPES = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'];
    private const GRACE_SECONDS = 1.5;

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    private static function types(): string
    {
        return "'" . implode("','", self::CHOICE_TYPES) . "'";
    }

    // ----------------------------------------------------------------------------------------
    // Teacher

    /** The teacher's published assessments that have at least one choice question */
    public static function candidates($db, int $teacherId): array
    {
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.assessment_category, a.class_group_name, a.created_at,
                    s.name AS subject_name, c.name AS class_name, c.stream_name,
                    SUM(q.question_type IN (" . self::types() . ")) AS choice_count,
                    COUNT(q.id) AS question_count
             FROM assignments a
             INNER JOIN subjects s ON s.id = a.subject_id
             LEFT JOIN classes c ON c.id = a.class_id
             INNER JOIN assignment_questions q ON q.assignment_id = a.id AND q.deleted_at IS NULL AND q.parent_question_id IS NULL
             WHERE a.teacher_id = ? AND a.deleted_at IS NULL AND a.status = 'published'
             GROUP BY a.id
             HAVING choice_count > 0
             ORDER BY a.created_at DESC
             LIMIT 60"
        );
        $stmt->execute([$teacherId]);
        return array_map(fn($r) => [
            'id' => (int) $r['id'],
            'title' => $r['title'],
            'category' => $r['assessment_category'],
            'subject' => $r['subject_name'],
            'class_label' => $r['class_name'] ? $r['class_name'] . ($r['stream_name'] ? '-' . $r['stream_name'] : '') : ($r['class_group_name'] ? $r['class_group_name'] . ' (all streams)' : ''),
            'choice_count' => (int) $r['choice_count'],
            'question_count' => (int) $r['question_count'],
            'counts_on_map' => (int) $r['choice_count'] === (int) $r['question_count'],
        ], $stmt->fetchAll());
    }

    public static function create($db, int $teacherId, int $assignmentId, int $seconds): array
    {
        $stmt = $db->prepare("SELECT id FROM assignments WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL AND status = 'published'");
        $stmt->execute([$assignmentId, $teacherId]);
        if (!$stmt->fetchColumn()) {
            throw new \InvalidArgumentException('Choose one of your published assessments.');
        }
        $stmt = $db->prepare(
            "SELECT id FROM assignment_questions
             WHERE assignment_id = ? AND deleted_at IS NULL AND parent_question_id IS NULL AND question_type IN (" . self::types() . ")
             ORDER BY display_order, id"
        );
        $stmt->execute([$assignmentId]);
        $ids = array_map('intval', array_column($stmt->fetchAll(), 'id'));
        if (!$ids) {
            throw new \InvalidArgumentException('That assessment has no multiple-choice or true/false questions.');
        }

        // A code no running quiz is using
        do {
            $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $check = $db->prepare("SELECT 1 FROM live_quizzes WHERE join_code = ? AND phase <> 'ended'");
            $check->execute([$code]);
        } while ($check->fetchColumn());

        $seconds = max(10, min(120, $seconds));
        $db->prepare("INSERT INTO live_quizzes (teacher_id, assignment_id, join_code, question_ids, seconds_per_question) VALUES (?, ?, ?, ?, ?)")
            ->execute([$teacherId, $assignmentId, $code, json_encode($ids), $seconds]);
        return ['id' => (int) $db->lastInsertId(), 'join_code' => $code];
    }

    public static function forTeacher($db, int $quizId, int $teacherId): ?array
    {
        $stmt = $db->prepare("SELECT * FROM live_quizzes WHERE id = ? AND teacher_id = ?");
        $stmt->execute([$quizId, $teacherId]);
        return $stmt->fetch() ?: null;
    }

    /** start / next: the next question; reveal: show the answer; end: finish */
    public static function advance($db, array $quiz, string $action): void
    {
        $ids = json_decode($quiz['question_ids'], true) ?: [];
        $id = (int) $quiz['id'];
        if ($action === 'end' || (($action === 'next' || $action === 'start') && (int) $quiz['current_index'] + 1 >= count($ids))) {
            $db->prepare("UPDATE live_quizzes SET phase = 'ended', ended_at = NOW() WHERE id = ? AND phase <> 'ended'")->execute([$id]);
            return;
        }
        if ($action === 'start' || $action === 'next') {
            if ($quiz['phase'] === 'question') {
                return; // reveal first
            }
            $db->prepare("UPDATE live_quizzes SET phase = 'question', current_index = current_index + 1, question_started_at = NOW(3) WHERE id = ? AND phase IN ('lobby','reveal')")
                ->execute([$id]);
            return;
        }
        if ($action === 'reveal') {
            $db->prepare("UPDATE live_quizzes SET phase = 'reveal' WHERE id = ? AND phase = 'question'")->execute([$id]);
        }
    }

    /** Everything the teacher's screen shows */
    public static function hostState($db, array $quiz): array
    {
        $base = self::baseState($db, $quiz);
        $id = (int) $quiz['id'];

        $stmt = $db->prepare(
            "SELECT p.student_id, p.score, p.correct, st.first_name, st.last_name
             FROM live_quiz_players p INNER JOIN students st ON st.id = p.student_id
             WHERE p.quiz_id = ? ORDER BY p.score DESC, p.joined_at"
        );
        $stmt->execute([$id]);
        $players = array_map(fn($r) => [
            'student_id' => (int) $r['student_id'],
            'name' => trim($r['first_name'] . ' ' . $r['last_name']),
            'score' => (int) $r['score'],
            'correct' => (int) $r['correct'],
        ], $stmt->fetchAll());

        $question = null;
        $answered = 0;
        $right = 0;
        if ($base['question_id']) {
            $question = self::question($db, $base['question_id'], true);
            $stmt = $db->prepare("SELECT option_ids, is_correct FROM live_quiz_answers WHERE quiz_id = ? AND question_id = ?");
            $stmt->execute([$id, $base['question_id']]);
            $counts = [];
            foreach ($stmt->fetchAll() as $r) {
                $answered++;
                $right += (int) $r['is_correct'];
                foreach (array_filter(explode(',', $r['option_ids'])) as $o) {
                    $counts[(int) $o] = ($counts[(int) $o] ?? 0) + 1;
                }
            }
            foreach ($question['options'] as &$o) {
                $o['count'] = $counts[$o['id']] ?? 0;
            }
            unset($o);
        }

        $stmt = $db->prepare(
            "SELECT a.title, a.assessment_category, s.name AS subject_name,
                    (SELECT COUNT(*) FROM assignment_questions q WHERE q.assignment_id = a.id AND q.deleted_at IS NULL AND q.parent_question_id IS NULL) AS question_count,
                    (SELECT COUNT(*) FROM assignment_questions q WHERE q.assignment_id = a.id AND q.deleted_at IS NULL AND q.parent_question_id IS NULL AND q.question_type IN (" . self::types() . ")) AS choice_count
             FROM assignments a INNER JOIN subjects s ON s.id = a.subject_id WHERE a.id = ?"
        );
        $stmt->execute([(int) $quiz['assignment_id']]);
        $a = $stmt->fetch() ?: [];
        $countsOnMap = $a && (int) $a['question_count'] === (int) $a['choice_count'];

        return $base + [
            'join_code' => $quiz['join_code'],
            'assignment' => [
                'id' => (int) $quiz['assignment_id'],
                'title' => $a['title'] ?? '',
                'category' => $a['assessment_category'] ?? null,
                'subject' => $a['subject_name'] ?? '',
            ],
            'question' => $question,
            'answered' => $answered,
            'right' => $right,
            'players' => $players,
            'counts_on_map' => $countsOnMap,
            'saved' => $quiz['saved_at'] !== null,
        ];
    }

    /** Write each player's score as a returned submission, so it counts on the Learning Map */
    public static function save($db, array $quiz): int
    {
        if ($quiz['phase'] !== 'ended') {
            throw new \InvalidArgumentException('End the quiz first.');
        }
        if ($quiz['saved_at'] !== null) {
            throw new \InvalidArgumentException('These results are already saved.');
        }
        $assignmentId = (int) $quiz['assignment_id'];
        $stmt = $db->prepare("SELECT id, question_type, marks FROM assignment_questions WHERE assignment_id = ? AND deleted_at IS NULL AND parent_question_id IS NULL");
        $stmt->execute([$assignmentId]);
        $questions = $stmt->fetchAll();
        foreach ($questions as $q) {
            if (!in_array($q['question_type'], self::CHOICE_TYPES, true)) {
                throw new \InvalidArgumentException('This assessment has written questions, so a quiz score can\'t stand for it on the Learning Map.');
            }
        }
        $marks = [];
        foreach ($questions as $q) {
            $marks[(int) $q['id']] = (float) $q['marks'];
        }
        $total = array_sum($marks);
        if ($total <= 0) {
            throw new \InvalidArgumentException('The questions have no marks.');
        }

        $stmt = $db->prepare("SELECT student_id FROM live_quiz_players WHERE quiz_id = ?");
        $stmt->execute([(int) $quiz['id']]);
        $players = array_map('intval', array_column($stmt->fetchAll(), 'student_id'));

        $saved = 0;
        $db->beginTransaction();
        try {
            foreach ($players as $sid) {
                $has = $db->prepare("SELECT 1 FROM assignment_submissions WHERE assignment_id = ? AND student_id = ? AND deleted_at IS NULL");
                $has->execute([$assignmentId, $sid]);
                if ($has->fetchColumn()) {
                    continue; // their own attempt stands
                }
                $ans = $db->prepare("SELECT question_id, option_ids, is_correct FROM live_quiz_answers WHERE quiz_id = ? AND student_id = ?");
                $ans->execute([(int) $quiz['id'], $sid]);
                $answers = [];
                foreach ($ans->fetchAll() as $r) {
                    $answers[(int) $r['question_id']] = $r;
                }
                $score = 0.0;
                foreach ($answers as $qid => $r) {
                    if ((int) $r['is_correct'] && isset($marks[$qid])) {
                        $score += $marks[$qid];
                    }
                }
                $pct = round($score / $total * 100, 2);
                $db->prepare(
                    "INSERT INTO assignment_submissions
                       (assignment_id, student_id, attempt_number, started_at, status, auto_score, total_score, percentage,
                        marked_by, marked_at, released_at, is_draft, submitted_at, marks_obtained, feedback, graded_at, graded_by)
                     VALUES (?, ?, 1, NOW(), 'returned', ?, ?, ?, ?, NOW(), NOW(), 0, NOW(), ?, 'Live Quiz in class', NOW(), ?)"
                )->execute([$assignmentId, $sid, $score, $score, $pct, (int) $quiz['teacher_id'], $score, (int) $quiz['teacher_id']]);
                $subId = (int) $db->lastInsertId();
                $ins = $db->prepare("INSERT INTO assignment_answers (submission_id, question_id, answer_text, answer_mode, auto_mark, marked_at) VALUES (?, ?, ?, 'typed', ?, NOW())");
                foreach ($marks as $qid => $m) {
                    $r = $answers[$qid] ?? null;
                    $ins->execute([$subId, $qid, $r ? $r['option_ids'] : null, $r && (int) $r['is_correct'] ? $m : 0]);
                }
                $saved++;
            }
            $db->prepare("UPDATE live_quizzes SET saved_at = NOW() WHERE id = ?")->execute([(int) $quiz['id']]);
            $db->commit();
        } catch (\Throwable $e) {
            $db->rollBack();
            throw $e;
        }
        return $saved;
    }

    // ----------------------------------------------------------------------------------------
    // Student

    /**
     * Quizzes running right now (opened in the last 3 hours, not ended) that this student can
     * join - so they can tap Join instead of typing the code
     */
    public static function availableFor($db, int $studentId): array
    {
        $stmt = $db->prepare(
            "SELECT q.id, q.join_code, q.phase, a.title, s.name AS subject_name, t.first_name, t.last_name,
                    EXISTS (SELECT 1 FROM live_quiz_players p WHERE p.quiz_id = q.id AND p.student_id = ?) AS joined
             FROM live_quizzes q
             INNER JOIN assignments a ON a.id = q.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
             INNER JOIN subjects s ON s.id = a.subject_id
             INNER JOIN teachers t ON t.id = q.teacher_id
             WHERE q.phase <> 'ended' AND q.created_at >= DATE_SUB(NOW(), INTERVAL 3 HOUR)
               AND " . AssignmentAccess::clause() . "
             ORDER BY q.created_at DESC LIMIT 5"
        );
        $stmt->execute([$studentId, $studentId, $studentId]);
        return array_map(fn($r) => [
            'id' => (int) $r['id'],
            'code' => $r['join_code'],
            'phase' => $r['phase'],
            'title' => $r['title'],
            'subject' => $r['subject_name'],
            'teacher' => trim($r['first_name'] . ' ' . $r['last_name']),
            'joined' => (bool) $r['joined'],
        ], $stmt->fetchAll());
    }

    public static function join($db, int $studentId, string $code): array
    {
        $stmt = $db->prepare("SELECT * FROM live_quizzes WHERE join_code = ? AND phase <> 'ended' ORDER BY id DESC LIMIT 1");
        $stmt->execute([$code]);
        $quiz = $stmt->fetch();
        if (!$quiz) {
            throw new \InvalidArgumentException('No quiz is running with that code. Check it with your teacher.');
        }
        if (!AssignmentAccess::canSee($db, $studentId, (int) $quiz['assignment_id'])) {
            throw new \InvalidArgumentException('This quiz is for another class.');
        }
        $db->prepare("INSERT IGNORE INTO live_quiz_players (quiz_id, student_id) VALUES (?, ?)")->execute([(int) $quiz['id'], $studentId]);
        return ['id' => (int) $quiz['id']];
    }

    public static function forPlayer($db, int $quizId, int $studentId): ?array
    {
        $stmt = $db->prepare(
            "SELECT q.* FROM live_quizzes q INNER JOIN live_quiz_players p ON p.quiz_id = q.id AND p.student_id = ? WHERE q.id = ?"
        );
        $stmt->execute([$studentId, $quizId]);
        return $stmt->fetch() ?: null;
    }

    public static function playerState($db, array $quiz, int $studentId): array
    {
        $base = self::baseState($db, $quiz);
        $id = (int) $quiz['id'];
        $reveal = in_array($quiz['phase'], ['reveal', 'ended'], true);

        $question = $base['question_id'] && $quiz['phase'] !== 'ended' ? self::question($db, $base['question_id'], $quiz['phase'] === 'reveal') : null;
        $mine = null;
        $hidden = 0; // points for the open question, not shown until the answer is
        if ($base['question_id']) {
            $stmt = $db->prepare("SELECT option_ids, is_correct, points FROM live_quiz_answers WHERE quiz_id = ? AND student_id = ? AND question_id = ?");
            $stmt->execute([$id, $studentId, $base['question_id']]);
            if ($r = $stmt->fetch()) {
                $hidden = $quiz['phase'] === 'question' ? (int) $r['points'] : 0;
                $mine = [
                    'option_ids' => array_map('intval', array_filter(explode(',', $r['option_ids']))),
                    'is_correct' => $reveal ? (bool) $r['is_correct'] : null,
                    'points' => $reveal ? (int) $r['points'] : null,
                ];
            }
        }

        $stmt = $db->prepare("SELECT student_id, score FROM live_quiz_players WHERE quiz_id = ? ORDER BY score DESC, joined_at");
        $stmt->execute([$id]);
        $rows = $stmt->fetchAll();
        $rank = null;
        $score = 0;
        foreach ($rows as $i => $r) {
            if ((int) $r['student_id'] === $studentId) {
                $rank = $i + 1;
                $score = (int) $r['score'];
            }
        }

        $podium = [];
        if ($quiz['phase'] === 'ended') {
            $stmt = $db->prepare(
                "SELECT st.first_name, st.last_name, p.score FROM live_quiz_players p INNER JOIN students st ON st.id = p.student_id
                 WHERE p.quiz_id = ? ORDER BY p.score DESC, p.joined_at LIMIT 3"
            );
            $stmt->execute([$id]);
            $podium = array_map(fn($r) => ['name' => trim($r['first_name'] . ' ' . mb_substr((string) $r['last_name'], 0, 1)) . '.', 'score' => (int) $r['score']], $stmt->fetchAll());
        }

        return $base + [
            'question' => $question,
            'my_answer' => $mine,
            'my_score' => $score - $hidden,
            'my_rank' => $quiz['phase'] === 'question' ? null : $rank,
            'players' => count($rows),
            'podium' => $podium,
        ];
    }

    public static function answer($db, array $quiz, int $studentId, array $optionIds): array
    {
        if ($quiz['phase'] !== 'question') {
            throw new \InvalidArgumentException('Too late - this question is closed.');
        }
        $base = self::baseState($db, $quiz);
        if ($base['time_left'] !== null && $base['time_left'] <= -self::GRACE_SECONDS) {
            throw new \InvalidArgumentException('Too late - time is up.');
        }
        $qid = (int) $base['question_id'];
        $question = self::question($db, $qid, true);
        $valid = array_column($question['options'], 'id');
        $chosen = array_values(array_unique(array_filter(array_map('intval', $optionIds), fn($o) => in_array($o, $valid, true))));
        if (!$chosen) {
            throw new \InvalidArgumentException('Pick an answer.');
        }
        if ($question['type'] !== 'multiple_choice_multiple') {
            $chosen = [$chosen[0]];
        }
        $correct = array_values(array_map(fn($o) => $o['id'], array_filter($question['options'], fn($o) => $o['is_correct'])));
        sort($chosen);
        sort($correct);
        $isCorrect = $chosen === $correct;
        $elapsed = max(0.0, (float) $quiz['seconds_per_question'] - (float) $base['time_left']);
        $speed = max(0.0, 1 - $elapsed / max(1, (int) $quiz['seconds_per_question']));
        $points = $isCorrect ? 500 + (int) round(500 * $speed) : 0;

        $stmt = $db->prepare(
            "INSERT IGNORE INTO live_quiz_answers (quiz_id, student_id, question_id, option_ids, is_correct, points, answered_at)
             VALUES (?, ?, ?, ?, ?, ?, NOW(3))"
        );
        $stmt->execute([(int) $quiz['id'], $studentId, $qid, implode(',', $chosen), $isCorrect ? 1 : 0, $points]);
        if ($stmt->rowCount() === 0) {
            throw new \InvalidArgumentException('You have already answered this one.');
        }
        $db->prepare("UPDATE live_quiz_players SET score = score + ?, correct = correct + ? WHERE quiz_id = ? AND student_id = ?")
            ->execute([$points, $isCorrect ? 1 : 0, (int) $quiz['id'], $studentId]);
        return ['answered' => true];
    }

    // ----------------------------------------------------------------------------------------

    private static function baseState($db, array $quiz): array
    {
        $ids = json_decode($quiz['question_ids'], true) ?: [];
        $index = (int) $quiz['current_index'];
        $questionId = ($index >= 0 && $index < count($ids) && $quiz['phase'] !== 'lobby') ? (int) $ids[$index] : null;
        $timeLeft = null;
        if ($quiz['phase'] === 'question' && $quiz['question_started_at']) {
            $stmt = $db->prepare("SELECT TIMESTAMPDIFF(MICROSECOND, ?, NOW(3)) / 1000000");
            $stmt->execute([$quiz['question_started_at']]);
            $timeLeft = round((int) $quiz['seconds_per_question'] - (float) $stmt->fetchColumn(), 1);
        }
        return [
            'id' => (int) $quiz['id'],
            'phase' => $quiz['phase'],
            'index' => $index,
            'total' => count($ids),
            'seconds' => (int) $quiz['seconds_per_question'],
            'time_left' => $timeLeft,
            'question_id' => $questionId,
        ];
    }

    private static function question($db, int $questionId, bool $withAnswers): array
    {
        $stmt = $db->prepare("SELECT id, question_type, question_text, attachment_type, attachment_path FROM assignment_questions WHERE id = ?");
        $stmt->execute([$questionId]);
        $q = $stmt->fetch();
        $stmt = $db->prepare("SELECT id, option_text, is_correct FROM assignment_question_options WHERE question_id = ? ORDER BY display_order, id");
        $stmt->execute([$questionId]);
        $options = array_map(fn($o) => ['id' => (int) $o['id'], 'text' => $o['option_text']] + ($withAnswers ? ['is_correct' => (bool) $o['is_correct']] : []), $stmt->fetchAll());
        return [
            'id' => (int) $q['id'],
            'type' => $q['question_type'],
            'text' => $q['question_text'],
            'image' => $q['attachment_type'] === 'image' ? $q['attachment_path'] : null,
            'options' => $options,
        ];
    }
}
