<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

/**
 * Anonymous feedback about Tusome: a short tick-box form (/feedback) anyone can fill in - student,
 * teacher, head of department, administrator, parent, or anyone else, who says what they are.
 *
 * Anonymous by design: no account, name or internet address is stored, even when the person is
 * signed in. A one-way code that changes every day (day_key) only stops one device sending the
 * form over and over.
 *
 * form() and store() are public; analysis() is for super admins (System > Feedback), and adds up
 * every answer by who gave it.
 */
class FeedbackController extends Controller
{
    protected \PDO $db;

    // At most this many responses from one device a day
    private const DAILY_LIMIT = 3;

    public const ROLES = [
        'student' => 'Student',
        'teacher' => 'Teacher',
        'hod' => 'Head of department',
        'admin' => 'School administrator',
        'parent' => 'Parent or guardian',
        'other' => 'Other',
    ];

    public const LEVELS = ['S.1', 'S.2', 'S.3', 'S.4', 'S.5', 'S.6'];

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * The questions - one list for everyone, so answers compare across roles. Kinds:
     * single (pick one), scale (1-5), grid (one choice per row), multi (tick any; `max` caps it).
     * Change the wording freely; keep the keys, or old answers stop adding up.
     */
    public static function questions(): array
    {
        return [
            ['key' => 'usage', 'type' => 'single', 'text' => 'How often do you use Tusome?', 'options' => [
                'daily' => 'Every day', 'few_weekly' => 'A few times a week', 'weekly' => 'About once a week', 'rarely' => 'Rarely',
            ]],
            ['key' => 'overall', 'type' => 'scale', 'text' => 'Overall, how good is Tusome?', 'required' => true, 'options' => [
                '1' => 'Very poor', '2' => 'Poor', '3' => 'Okay', '4' => 'Good', '5' => 'Excellent',
            ]],
            ['key' => 'ease', 'type' => 'single', 'text' => 'How easy is it to find your way around?', 'options' => [
                'very_easy' => 'Very easy', 'easy' => 'Easy', 'hard' => 'Hard', 'very_hard' => 'Very hard',
            ]],
            ['key' => 'device', 'type' => 'single', 'text' => 'Does it work well on the phone or computer you use?', 'options' => [
                'always' => 'Always', 'mostly' => 'Mostly', 'sometimes' => 'Sometimes', 'rarely' => 'Rarely',
            ]],
            ['key' => 'parts', 'type' => 'grid', 'text' => 'How good is each part you have used?', 'rows' => [
                'enotes' => 'eNotes', 'library' => 'eLibrary', 'assessments' => 'Assessments',
                'results' => 'Marking and results', 'learning_map' => 'Learning Map', 'live' => 'Live classes',
                'chats' => 'Chats and study groups', 'labs' => 'Virtual Lab and ICT Lab', 'reports' => 'Report cards',
            ], 'options' => [
                'good' => 'Good', 'okay' => 'Okay', 'poor' => 'Poor', 'unused' => 'Not used',
            ]],
            ['key' => 'blockers', 'type' => 'multi', 'text' => 'What gets in your way? Tick all that apply.', 'options' => [
                'data' => 'Internet or data costs', 'slow' => 'Pages are slow', 'find' => 'Hard to find things',
                'steps' => 'Too many steps', 'small_screen' => 'Hard to use on a phone', 'sign_in' => 'Signing in',
                'saving' => 'Work not saving', 'content' => 'Not enough notes or content', 'notifications' => 'Too many or too few notifications',
                'nothing' => 'Nothing - it works well',
            ]],
            ['key' => 'improve', 'type' => 'multi', 'max' => 3, 'text' => 'What should we improve first? Choose up to 3.', 'options' => [
                'speed' => 'Speed', 'easier' => 'Make it simpler', 'content' => 'More notes and books',
                'assessments' => 'Assessments', 'marking' => 'Marking and feedback', 'offline' => 'Working without internet',
                'phone' => 'The phone experience', 'live' => 'Live classes', 'communication' => 'Chats and notices',
                'help' => 'Help and training',
            ]],
            ['key' => 'recommend', 'type' => 'single', 'text' => 'Would you tell others to use Tusome?', 'options' => [
                'yes' => 'Yes', 'maybe' => 'Maybe', 'no' => 'No',
            ]],
        ];
    }

    /**
     * GET /api/feedback/form
     */
    public function form(): void
    {
        $this->success(['roles' => self::ROLES, 'levels' => self::LEVELS, 'questions' => self::questions()]);
    }

    /**
     * POST /api/feedback   { role, role_other?, level?, answers: {key: value | value[] | {row: value}}, comment?, website? }
     */
    public function store(): void
    {
        // `website` is a field people never see - only bots fill it in. Pretend it worked.
        if (trim((string) $this->input('website', '')) !== '') {
            $this->success([], 'Thank you for your feedback.');
            return;
        }

        $role = (string) $this->input('role', '');
        $roleOther = mb_substr(trim(strip_tags((string) $this->input('role_other', ''))), 0, 60);
        $level = (string) $this->input('level', '');
        $comment = mb_substr(trim(strip_tags((string) $this->input('comment', ''))), 0, 2000);
        $given = $this->input('answers', []);
        $given = is_array($given) ? $given : [];

        $errors = [];
        if (!isset(self::ROLES[$role])) $errors['role'] = 'Please choose who you are';
        if ($role === 'other' && $roleOther === '') $errors['role_other'] = 'Please say who you are';
        if ($level !== '' && ($role !== 'student' || !in_array($level, self::LEVELS, true))) $level = '';

        // Keep only answers that match the questions
        $answers = [];
        foreach (self::questions() as $q) {
            $v = $given[$q['key']] ?? null;
            if ($q['type'] === 'single' || $q['type'] === 'scale') {
                if (is_scalar($v) && isset($q['options'][(string) $v])) $answers[$q['key']] = (string) $v;
            } elseif ($q['type'] === 'multi' && is_array($v)) {
                $picked = array_values(array_unique(array_filter(array_map('strval', $v), fn($o) => isset($q['options'][$o]))));
                if (isset($q['max'])) $picked = array_slice($picked, 0, $q['max']);
                if ($picked) $answers[$q['key']] = $picked;
            } elseif ($q['type'] === 'grid' && is_array($v)) {
                $rows = [];
                foreach ($q['rows'] as $row => $_) {
                    if (isset($v[$row]) && is_scalar($v[$row]) && isset($q['options'][(string) $v[$row]])) $rows[$row] = (string) $v[$row];
                }
                if ($rows) $answers[$q['key']] = $rows;
            }
            if (!empty($q['required']) && !isset($answers[$q['key']])) $errors[$q['key']] = 'Please answer this one';
        }
        if ($errors) {
            $this->validationError($errors);
            return;
        }

        // A one-way daily code for this device - no internet address is stored
        $secret = (string) ($_ENV['APP_KEY'] ?? getenv('APP_KEY') ?: 'tusome-feedback');
        $dayKey = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . date('Y-m-d') . '|' . $secret);
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM feedback_responses WHERE day_key = ?");
        $stmt->execute([$dayKey]);
        if ((int) $stmt->fetchColumn() >= self::DAILY_LIMIT) {
            $this->error('Thank you - we already have your feedback for today.', 429);
            return;
        }

        $stmt = $this->db->prepare(
            "INSERT INTO feedback_responses (role, role_other, level, overall, answers, comment, day_key)
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $role,
            $role === 'other' ? $roleOther : null,
            $level ?: null,
            isset($answers['overall']) ? (int) $answers['overall'] : null,
            json_encode($answers),
            $comment !== '' ? $comment : null,
            $dayKey,
        ]);
        $this->success([], 'Thank you for your feedback.');
    }

    /**
     * Every answer added up, for one role or all, over a period
     * GET /api/admin/feedback?role=&days=   (days: 30, 90, or empty for all time)
     */
    public function analysis(): void
    {
        if ($this->getCurrentUserRole() !== 'super_admin') {
            $this->forbidden();
            return;
        }
        $role = (string) ($_GET['role'] ?? '');
        $days = (int) ($_GET['days'] ?? 0);
        $where = ['1 = 1'];
        $params = [];
        if (isset(self::ROLES[$role])) {
            $where[] = 'role = ?';
            $params[] = $role;
        }
        if ($days > 0) {
            $where[] = 'created_at >= (NOW() - INTERVAL ? DAY)';
            $params[] = $days;
        }
        $stmt = $this->db->prepare(
            "SELECT role, role_other, level, overall, answers, comment, created_at FROM feedback_responses
             WHERE " . implode(' AND ', $where) . " ORDER BY created_at DESC"
        );
        $stmt->execute($params);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $questions = self::questions();
        $totals = [];
        foreach ($questions as $q) {
            $totals[$q['key']] = $q['type'] === 'grid'
                ? array_map(fn() => array_fill_keys(array_keys($q['options']), 0), $q['rows'])
                : array_fill_keys(array_keys($q['options']), 0);
        }
        $answered = array_fill_keys(array_column($questions, 'key'), 0);
        $byRole = [];
        $comments = [];
        $others = [];
        foreach ($rows as $r) {
            $a = json_decode((string) $r['answers'], true) ?: [];
            foreach ($questions as $q) {
                $v = $a[$q['key']] ?? null;
                if ($v === null) continue;
                $answered[$q['key']]++;
                if ($q['type'] === 'multi') {
                    foreach ((array) $v as $o) if (isset($totals[$q['key']][$o])) $totals[$q['key']][$o]++;
                } elseif ($q['type'] === 'grid') {
                    foreach ((array) $v as $row => $o) if (isset($totals[$q['key']][$row][$o])) $totals[$q['key']][$row][$o]++;
                } elseif (isset($totals[$q['key']][(string) $v])) {
                    $totals[$q['key']][(string) $v]++;
                }
            }
            $byRole[$r['role']] ??= ['role' => $r['role'], 'label' => self::ROLES[$r['role']] ?? $r['role'], 'responses' => 0, 'rated' => 0, 'rating_sum' => 0, 'recommend_yes' => 0, 'recommend_answered' => 0];
            $g = &$byRole[$r['role']];
            $g['responses']++;
            if ($r['overall'] !== null) {
                $g['rated']++;
                $g['rating_sum'] += (int) $r['overall'];
            }
            if (isset($a['recommend'])) {
                $g['recommend_answered']++;
                if ($a['recommend'] === 'yes') $g['recommend_yes']++;
            }
            unset($g);
            if ($r['role'] === 'other' && $r['role_other']) {
                $others[$r['role_other']] = ($others[$r['role_other']] ?? 0) + 1;
            }
            if ($r['comment'] !== null && count($comments) < 300) {
                $comments[] = [
                    'role' => self::ROLES[$r['role']] ?? $r['role'],
                    'role_other' => $r['role_other'],
                    'level' => $r['level'],
                    'overall' => $r['overall'] !== null ? (int) $r['overall'] : null,
                    'comment' => $r['comment'],
                    'date' => substr((string) $r['created_at'], 0, 10),
                ];
            }
        }

        $roles = [];
        $rated = 0;
        $ratingSum = 0;
        $recYes = 0;
        $recAnswered = 0;
        foreach ($byRole as $g) {
            $rated += $g['rated'];
            $ratingSum += $g['rating_sum'];
            $recYes += $g['recommend_yes'];
            $recAnswered += $g['recommend_answered'];
            $roles[] = [
                'role' => $g['role'],
                'label' => $g['label'],
                'responses' => $g['responses'],
                'average' => $g['rated'] ? round($g['rating_sum'] / $g['rated'], 1) : null,
                'recommend' => $g['recommend_answered'] ? (int) round($g['recommend_yes'] / $g['recommend_answered'] * 100) : null,
            ];
        }
        usort($roles, fn($x, $y) => $y['responses'] <=> $x['responses']);
        arsort($others);

        $this->success([
            'responses' => count($rows),
            'average' => $rated ? round($ratingSum / $rated, 1) : null,
            'recommend' => $recAnswered ? (int) round($recYes / $recAnswered * 100) : null,
            'roles' => $roles,
            'role_options' => self::ROLES,
            'other_roles' => array_slice(array_map(fn($k, $n) => ['label' => $k, 'count' => $n], array_keys($others), $others), 0, 20),
            'questions' => $questions,
            'totals' => $totals,
            'answered' => $answered,
            'comments' => $comments,
        ]);
    }
}
