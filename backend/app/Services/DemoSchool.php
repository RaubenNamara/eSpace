<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\App\Support\Tenant;
use eSpace\Config\Config;

/**
 * The live demo school: what a visitor to the website opens with "Try Tusome" - as a learner,
 * a teacher, a head teacher or a parent - without signing up.
 *
 * It is an ordinary school in the platform (code DEMO_SCHOOL_CODE, default "demo") whose database
 * is rebuilt from nothing every night (backend/scripts/demo_reset.php, run by cron):
 *   - the tables, empty, from the home database; the shared content (curriculum, eNotes, books,
 *     Item Bank, videos) copied from the master school exactly as for a new school
 *   - made-up people only: a head teacher, six teachers, two S.2 streams of learners
 *   - a few weeks of believable activity: sign-ins, reading, assessments handed in and marked,
 *     paper exams, a live class held and one coming up, revision, a notice
 * No real learner, teacher or mark is ever copied. The random seed is fixed, so the school looks
 * the same each morning; only the dates move with today.
 *
 * The demo accounts have unguessable passwords: the only way in is the website's demo buttons
 * (DemoController), and DemoGuard keeps visitors from changing what others would see.
 */
final class DemoSchool
{
    public const ACCOUNTS = ['head' => 'headteacher', 'teacher' => 'demo.teacher', 'learner' => 'demo.learner'];
    private const SUBJECT_ORDER = ['ENG', 'MTC', 'PHY', 'BIO', 'CHEM', 'GEOG', 'HIST', 'ENT', 'ICT', 'CRE', 'LIT', 'AGRIC'];

    private \PDO $db;
    private array $log = [];
    private string $today;
    private int $yearId = 0;
    private string $yearName = '';
    private array $term = [];
    private array $streams = [];
    /** subject code => [id, department_id, name, teacher_id] */
    private array $subjects = [];
    /** learner id => ability (0-1) and engagement (0-1) */
    private array $learners = [];
    private int $demoLearner = 0;
    private int $demoTeacher = 0;
    private int $headId = 0;

    public static function code(): string
    {
        return strtolower((string) Config::get('DEMO_SCHOOL_CODE', 'demo'));
    }

    /** The demo school's platform row when it is set up and active, else null */
    public static function school(): ?array
    {
        $school = Tenant::find(self::code());
        return $school && $school['status'] === 'active' && $school['db_name'] ? $school : null;
    }

    /** Is this signed-in session a demo visitor? */
    public static function inDemo(): bool
    {
        return !empty($_SESSION['demo']);
    }

    /** Throw the demo school away and build it again. Returns what was done, line by line. */
    public function rebuild(): array
    {
        $school = self::school();
        if (!$school) {
            throw new \RuntimeException('There is no active school with the code "' . self::code() . '" in the platform (developer portal) - enrol it first.');
        }
        if ((int) $school['is_master'] === 1 || $school['code'] === Tenant::homeCode()) {
            throw new \RuntimeException('Refusing to rebuild the master school.');
        }
        mt_srand(20261112);
        $this->today = date('Y-m-d');
        $home = Tenant::connect(null);
        $this->db = Tenant::connect($school['db_name']);

        $this->wipe();
        $tables = SchoolProvisioner::copySchema($home, $this->db);
        $this->say("{$tables} tables created");
        SchoolProvisioner::seed($home, $this->db, 'Tusome Demo Secondary School');
        $this->settings();
        $this->head();

        $masterDb = Tenant::platform()?->query('SELECT db_name FROM schools WHERE is_master = 1 ORDER BY id LIMIT 1')->fetchColumn();
        $added = (new ContentLibrary(Tenant::connect($masterDb ?: null), $this->db))->copy(['A', 'B']);
        $this->say('content: ' . ($added ? implode(', ', array_map(fn($k, $n) => "{$n} {$k}", array_keys($added), $added)) : 'none'));

        $this->frame();
        $this->teachers();
        $this->learners();
        $this->enrol();
        $this->ownNotes();
        $this->assessments();
        $this->paperExams();
        $this->reading();
        $this->signIns();
        $this->liveClasses();
        $this->extras();
        $this->say('done');
        return $this->log;
    }

    // ------------------------------------------------------------------ helpers

    private function say(string $line): void
    {
        $this->log[] = $line;
    }

    private function exec(string $sql, array $p = []): int
    {
        $this->db->prepare($sql)->execute($p);
        return (int) $this->db->lastInsertId();
    }

    private function one(string $sql, array $p = [])
    {
        $s = $this->db->prepare($sql);
        $s->execute($p);
        return $s->fetchColumn();
    }

    private function rows(string $sql, array $p = []): array
    {
        $s = $this->db->prepare($sql);
        $s->execute($p);
        return $s->fetchAll(\PDO::FETCH_ASSOC);
    }

    private function rand(): float
    {
        return mt_rand() / mt_getrandmax();
    }

    private function pick(array $a)
    {
        return $a[mt_rand(0, count($a) - 1)];
    }

    /** a date-time $daysAgo days before today, at a school-ish hour */
    private function at(float $daysAgo, int $fromHour = 7, int $toHour = 21): string
    {
        $t = strtotime($this->today . ' 00:00:00') - (int) round($daysAgo * 86400);
        return date('Y-m-d', $t) . sprintf(' %02d:%02d:00', mt_rand($fromHour, $toHour), mt_rand(0, 59));
    }

    /** The demo term's first day (or six weeks ago, whichever is later) in days ago */
    private function span(): int
    {
        $start = strtotime($this->term['start_date']);
        $days = (int) floor((strtotime($this->today) - $start) / 86400);
        return max(7, min(45, $days));
    }

    private static function hash(): string
    {
        return password_hash(bin2hex(random_bytes(24)), PASSWORD_BCRYPT, ['cost' => 8]);
    }

    // ------------------------------------------------------------------ the building

    private function wipe(): void
    {
        $tables = array_map(fn($r) => $r[0], $this->db->query("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'")->fetchAll(\PDO::FETCH_NUM));
        $this->db->exec('SET FOREIGN_KEY_CHECKS = 0');
        foreach ($tables as $t) {
            $this->db->exec('DROP TABLE `' . str_replace('`', '', $t) . '`');
        }
        $this->db->exec('SET FOREIGN_KEY_CHECKS = 1');
        $this->say(count($tables) . ' old tables removed');
    }

    private function settings(): void
    {
        $this->db->exec(
            "UPDATE school_settings SET school_name = 'Tusome Demo Secondary School', motto = 'Learning that goes with you',
                address = 'Kampala, Uganda', box_number = 'P.O. Box 1234, Kampala', website = 'tusome.ug', email = 'demo@tusome.ug',
                phone = '+256 700 000 000', max_awards_on_report_card = 2"
        );
        foreach (['report_cards_students', 'report_cards_teachers', 'report_cards_parents'] as $col) {
            try {
                $this->db->exec("UPDATE school_settings SET {$col} = 1");
            } catch (\PDOException $e) {
                // migration 160 not on the home database yet
            }
        }
    }

    private function head(): void
    {
        $this->headId = $this->exec(
            "INSERT INTO users (username, email, password, role, phone, is_active, created_at, updated_at)
             VALUES (?, 'head@demo.tusome.ug', ?, 'admin', NULL, 1, NOW(), NOW())",
            [self::ACCOUNTS['head'], self::hash()]
        );
    }

    private function frame(): void
    {
        $year = $this->rows('SELECT id, name FROM academic_years WHERE deleted_at IS NULL ORDER BY is_current DESC, id DESC LIMIT 1')[0] ?? null;
        if (!$year) {
            throw new \RuntimeException('The master school has no academic year to copy.');
        }
        $this->yearId = (int) $year['id'];
        $this->yearName = (string) $year['name'];
        // the term today falls in, else the latest one already begun
        $this->term = $this->rows(
            "SELECT id, name, start_date, end_date FROM terms WHERE academic_year_id = ? AND deleted_at IS NULL
             ORDER BY (CURDATE() BETWEEN start_date AND end_date) DESC, (start_date <= CURDATE()) DESC, start_date DESC LIMIT 1",
            [$this->yearId]
        )[0] ?? throw new \RuntimeException('The master school has no terms to copy.');
        $this->exec('UPDATE terms SET is_current = (id = ?)', [(int) $this->term['id']]);
        $this->exec('UPDATE academic_years SET is_current = (id = ?)', [$this->yearId]);
        try {
            $this->db->exec('UPDATE school_settings SET term_auto_switch = 1');
        } catch (\PDOException $e) {
        }
        foreach (['A', 'B'] as $s) {
            $id = (int) $this->one("SELECT id FROM classes WHERE name = 'S.2' AND stream_name = ? AND academic_year_id = ?", [$s, $this->yearId]);
            if (!$id) {
                $id = $this->exec("INSERT INTO classes (name, level, stream_name, academic_year_id, created_at, updated_at) VALUES ('S.2', 'O Level', ?, ?, NOW(), NOW())", [$s, $this->yearId]);
            }
            $this->streams[$s] = $id;
        }
        $have = [];
        foreach ($this->rows('SELECT id, code, name, department_id FROM subjects WHERE deleted_at IS NULL AND department_id IS NOT NULL') as $r) {
            // schools name subjects by their short name (MTC, PHY); the code may be a generated one
            $key = strtoupper(trim((string) $r['name']));
            if (!in_array($key, self::SUBJECT_ORDER, true) && in_array(strtoupper((string) $r['code']), self::SUBJECT_ORDER, true)) {
                $key = strtoupper((string) $r['code']);
            }
            $have[$key] = $r;
        }
        foreach (self::SUBJECT_ORDER as $code) {
            if (isset($have[$code]) && count($this->subjects) < 6) {
                $this->subjects[$code] = ['id' => (int) $have[$code]['id'], 'department_id' => (int) $have[$code]['department_id'], 'name' => $have[$code]['name'], 'teacher_id' => 0];
            }
        }
        foreach ($have as $code => $r) {
            if (count($this->subjects) >= 6) {
                break;
            }
            $this->subjects[$code] ??= ['id' => (int) $r['id'], 'department_id' => (int) $r['department_id'], 'name' => $r['name'], 'teacher_id' => 0];
        }
        if (!$this->subjects) {
            throw new \RuntimeException('No subjects came across from the master school.');
        }
        $this->say('term: ' . $this->term['name'] . ', subjects: ' . implode(', ', array_keys($this->subjects)));
    }

    private const TEACHERS = [
        ['Grace', 'Nakato', 'female'], ['Joseph', 'Okello', 'male'], ['Sarah', 'Namugga', 'female'],
        ['David', 'Mugisha', 'male'], ['Ruth', 'Akello', 'female'], ['Peter', 'Ssemwogerere', 'male'],
    ];

    private function teachers(): void
    {
        // the demo teacher takes the subject with the most notes to show
        $codes = array_keys($this->subjects);
        $best = $codes[0];
        $most = -1;
        foreach ($this->subjects as $code => $s) {
            $n = (int) $this->one("SELECT COUNT(*) FROM enote_topics WHERE subject_id = ? AND status = 'published' AND deleted_at IS NULL", [$s['id']]);
            if ($n > $most) {
                $most = $n;
                $best = $code;
            }
        }
        $order = array_merge([$best], array_values(array_diff($codes, [$best])));
        foreach ($order as $i => $code) {
            [$first, $last, $gender] = self::TEACHERS[$i % count(self::TEACHERS)];
            $isDemo = $i === 0;
            $id = $this->exec(
                "INSERT INTO teachers (username, email, password, must_change_password, employee_number, first_name, last_name, date_of_birth, gender,
                        department_id, qualification, specialization, hire_date, phone, is_active, created_at, updated_at)
                 VALUES (?, ?, ?, 0, ?, ?, ?, '1988-05-14', ?, ?, 'B.Ed', ?, '2020-02-01', NULL, 1, NOW(), NOW())",
                [$isDemo ? self::ACCOUNTS['teacher'] : 'demo.t' . ($i + 1), ($isDemo ? 'teacher' : 't' . ($i + 1)) . '@demo.tusome.ug', self::hash(),
                 'DEMO-T' . ($i + 1), $first, $last, $gender, $this->subjects[$code]['department_id'], $this->subjects[$code]['name']]
            );
            $this->subjects[$code]['teacher_id'] = $id;
            if ($isDemo) {
                $this->demoTeacher = $id;
            }
        }
        // the demo teacher is S.2 A's class teacher; the next teacher has S.2 B
        $this->exec('UPDATE classes SET class_teacher_id = ? WHERE id = ?', [$this->demoTeacher, $this->streams['A']]);
        $second = $order[1] ?? null;
        if ($second) {
            $this->exec('UPDATE classes SET class_teacher_id = ? WHERE id = ?', [$this->subjects[$second]['teacher_id'], $this->streams['B']]);
        }
        $this->subjects = array_merge(array_flip($order), $this->subjects);
        $this->say(count($order) . ' teachers');
    }

    private const FIRST = [
        'male' => ['Brian', 'Ivan', 'Denis', 'Isaac', 'Mark', 'Samuel', 'Allan', 'Ronald', 'Joel', 'Emmanuel', 'Arnold', 'Trevor', 'Edwin', 'Calvin', 'Derrick', 'Felix', 'Jonah', 'Hassan'],
        'female' => ['Aisha', 'Patience', 'Mercy', 'Joan', 'Esther', 'Shamim', 'Brenda', 'Doreen', 'Gloria', 'Faith', 'Precious', 'Tracy', 'Vivian', 'Sharon', 'Hope', 'Martha', 'Naomi', 'Sylvia'],
    ];
    private const LAST = ['Nabirye', 'Ochieng', 'Kato', 'Nansubuga', 'Tumusiime', 'Opio', 'Nakimuli', 'Byaruhanga', 'Atim', 'Lubega', 'Namatovu', 'Kizza',
        'Achieng', 'Mukasa', 'Ninsiima', 'Wasswa', 'Nalwoga', 'Ouma', 'Kyomuhendo', 'Ssali', 'Auma', 'Kasozi', 'Nyakato', 'Odongo'];

    private function learners(): void
    {
        $n = 0;
        foreach (['A' => 34, 'B' => 30] as $stream => $count) {
            for ($i = 0; $i < $count; $i++) {
                $n++;
                $isDemo = $stream === 'A' && $i === 0;
                $gender = $isDemo ? 'female' : ($this->rand() < 0.5 ? 'male' : 'female');
                $first = $isDemo ? 'Aisha' : $this->pick(self::FIRST[$gender]);
                $last = $isDemo ? 'Nabirye' : $this->pick(self::LAST);
                $id = $this->exec(
                    "INSERT INTO students (username, email, password, role, is_active, admission_number, first_name, last_name, gender, class_id, created_at, updated_at)
                     VALUES (?, NULL, ?, 'student', 1, ?, ?, ?, ?, ?, NOW(), NOW())",
                    [$isDemo ? self::ACCOUNTS['learner'] : 'demo.l' . $n, self::hash(), sprintf('DEMO/%04d', $n), $first, $last, $gender, $this->streams[$stream]]
                );
                // ability and how much they use Tusome: most in the middle, a few at each end
                $ability = $isDemo ? 0.66 : min(0.97, max(0.22, 0.6 + ($this->rand() + $this->rand() + $this->rand() - 1.5) * 0.45));
                $engagement = $isDemo ? 0.8 : min(1.0, max(0.1, $ability * 0.7 + $this->rand() * 0.45));
                $this->learners[$id] = ['ability' => $ability, 'engagement' => $engagement, 'stream' => $stream];
                if ($isDemo) {
                    $this->demoLearner = $id;
                }
            }
        }
        $this->say(count($this->learners) . ' learners');
    }

    private function enrol(): void
    {
        $start = date('Y-m-d', min(strtotime($this->term['start_date']), strtotime($this->today . ' -60 days')));
        foreach ($this->learners as $id => $l) {
            foreach ($this->subjects as $s) {
                $this->exec(
                    "INSERT INTO student_department_enrollments (student_id, department_id, academic_year, class_id, start_date, status, term_joined_id, enrolled_at, created_at, updated_at)
                     VALUES (?, ?, ?, ?, ?, 'active', ?, NOW(), NOW(), NOW())",
                    [$id, $s['department_id'], $this->yearName, $this->streams[$l['stream']], $start, (int) $this->term['id']]
                );
                $this->exec(
                    "INSERT INTO student_teacher_enrollments (student_id, teacher_id, department_id, status, enrolled_at, created_at, updated_at)
                     VALUES (?, ?, ?, 'active', NOW(), NOW(), NOW())",
                    [$id, $s['teacher_id'], $s['department_id']]
                );
            }
        }
    }

    /** A short eNote of the demo teacher's own, so their eNotes page has their work on it */
    private function ownNotes(): void
    {
        $s = reset($this->subjects);
        $topic = $this->exec(
            "INSERT INTO enote_topics (teacher_id, class_group_name, subject_id, department_id, title, description, learning_outcomes, status, published_at, total_pages, estimated_reading_time, created_at, updated_at)
             VALUES (?, 'S.2', ?, ?, 'How to revise well', 'Three habits that make revision stick, with a short self-check.', 'Plan revision in short sessions; test yourself instead of re-reading', 'published', ?, 3, 8, NOW(), NOW())",
            [$this->demoTeacher, $s['id'], $s['department_id'], $this->at(20)]
        );
        $pages = [
            ['Little and often', '<h2>Little and often</h2><p>Twenty focused minutes every day beat three hours the night before a test. Your brain keeps what it meets again and again, with sleep in between.</p><ul><li>Choose one topic per session.</li><li>Put your phone face down.</li><li>Stop while you still have energy left.</li></ul>'],
            ['Test yourself', '<h2>Test yourself</h2><p>Reading your notes again feels like learning, but trying to <b>remember</b> without looking is what makes it stick.</p><p>Close the book and write down everything you can recall. Then open it and fill the gaps in a different colour.</p>'],
            ['Check yourself', '<h2>Check yourself</h2><p>Before you finish: can you explain today\'s topic to a friend in one minute? If not, which part was hard? Write it down - that is where tomorrow\'s session starts.</p>'],
        ];
        foreach ($pages as $i => [$title, $html]) {
            $this->exec('INSERT INTO enote_pages (topic_id, order_number, title, content, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, NOW(), NOW())', [$topic, $i + 1, $title, $html]);
        }
    }

    // ---------------------------------------------------------- assessments

    /** Five objective questions per subject: [question, [options], correct index] */
    private const QUESTIONS = [
        'ENG' => [
            ['Choose the correctly punctuated sentence.', ['Its raining, take an umbrella.', "It's raining; take an umbrella.", 'Its raining take an umbrella', "It's raining take, an umbrella."], 1],
            ['Which word is a synonym of "rapid"?', ['slow', 'quick', 'heavy', 'quiet'], 1],
            ['Pick the passive sentence.', ['The teacher marked the books.', 'The books were marked by the teacher.', 'The teacher is marking.', 'Mark the books!'], 1],
            ['"She has lived here ___ 2019." Fill the gap.', ['for', 'since', 'from', 'by'], 1],
            ['Which is a compound sentence?', ['Because it rained.', 'I ran, and she walked.', 'Running fast.', 'The tall boy.'], 1],
        ],
        'MTC' => [
            ['Simplify 3x + 5x - 2x.', ['6x', '10x', '8x', '4x'], 0],
            ['What is 15% of 200?', ['15', '30', '20', '45'], 1],
            ['Solve 2x + 6 = 14.', ['x = 3', 'x = 4', 'x = 10', 'x = 8'], 1],
            ['The angles of a triangle add up to', ['90°', '180°', '270°', '360°'], 1],
            ['Which is a prime number?', ['21', '27', '29', '33'], 2],
        ],
        'PHY' => [
            ['The SI unit of length is the', ['centimetre', 'metre', 'kilometre', 'inch'], 1],
            ['Which instrument measures the diameter of a thin wire best?', ['metre rule', 'tape measure', 'micrometer screw gauge', 'beam balance'], 2],
            ['Mass is measured in', ['newtons', 'kilograms', 'joules', 'litres'], 1],
            ['Density = ', ['mass × volume', 'mass ÷ volume', 'volume ÷ mass', 'weight × volume'], 1],
            ['The volume of an irregular stone can be found by', ['weighing it', 'displacement of water', 'measuring its length', 'heating it'], 1],
        ],
        'BIO' => [
            ['The basic unit of life is the', ['organ', 'tissue', 'cell', 'system'], 2],
            ['Which part of a plant cell makes food?', ['nucleus', 'chloroplast', 'cell wall', 'vacuole'], 1],
            ['Which is NOT a characteristic of living things?', ['respiration', 'growth', 'rusting', 'excretion'], 2],
            ['A magnifying lens is used to', ['see small specimens larger', 'cut specimens', 'weigh specimens', 'heat specimens'], 0],
            ['Animals that eat only plants are', ['carnivores', 'herbivores', 'omnivores', 'decomposers'], 1],
        ],
        'CHEM' => [
            ['Which is a chemical change?', ['melting ice', 'burning paper', 'dissolving sugar', 'cutting wood'], 1],
            ['Water boils at (at sea level)', ['0 °C', '50 °C', '100 °C', '120 °C'], 2],
            ['A mixture of sand and water is best separated by', ['filtration', 'evaporation', 'distillation', 'chromatography'], 0],
            ['Which apparatus measures an exact volume of liquid?', ['beaker', 'measuring cylinder', 'test tube', 'evaporating dish'], 1],
            ['The smallest particle of an element is', ['a molecule', 'an atom', 'a compound', 'an ion'], 1],
        ],
        'GEOG' => [
            ['The line of latitude 0° is the', ['Prime Meridian', 'Equator', 'Tropic of Cancer', 'Arctic Circle'], 1],
            ['Uganda is found in which part of Africa?', ['West', 'East', 'North', 'South'], 1],
            ['A scale of 1:50,000 means 1 cm on the map is', ['50 m', '500 m', '0.5 km', '5 km'], 2],
            ['Which is a renewable resource?', ['oil', 'coal', 'sunlight', 'copper'], 2],
            ['The largest lake in Africa is', ['Lake Kyoga', 'Lake Victoria', 'Lake Albert', 'Lake Tanganyika'], 1],
        ],
    ];

    private function questionsFor(string $code, string $name): array
    {
        return self::QUESTIONS[$code] ?? [
            ["Which habit helps most when revising {$name}?", ['re-reading only', 'testing yourself', 'staying up late', 'skipping practice'], 1],
            ['A good study session is', ['short and focused', 'as long as possible', 'with music videos', 'only the night before'], 0],
            ['When you get a question wrong you should', ['ignore it', 'find out why and try again', 'copy a friend', 'stop revising'], 1],
            ['Learning outcomes tell you', ['what you should be able to do', 'the exam date', 'your class position', 'the teacher\'s name'], 0],
            ['Which is the best way to check understanding?', ['explain it to someone', 'highlight everything', 'read faster', 'memorise page numbers'], 0],
        ];
    }

    private function assessments(): void
    {
        $span = $this->span();
        $made = 0;
        $handed = 0;
        foreach ($this->subjects as $code => $s) {
            $outcomes = $this->rows(
                "SELECT lo.id, lo.curriculum_topic_id FROM enote_learning_outcomes lo INNER JOIN enote_curriculum_topics ct ON ct.id = lo.curriculum_topic_id
                 WHERE ct.subject_id = ? AND ct.class_id = ? AND ct.deleted_at IS NULL ORDER BY ct.id, lo.order_number LIMIT 6",
                [$s['id'], $this->streams['A']]
            );
            $bank = $this->questionsFor($code, $s['name']);
            $plan = [
                ['LOA', 'Topic check 1', $span - 4],
                ['LOA', 'Topic check 2', (int) round($span * 0.55)],
                ['AOI', 'Activity of integration', max(3, (int) round($span * 0.2))],
                ['LOA', 'Topic check 3', -5], // still open: due in five days
            ];
            foreach ($plan as $k => [$cat, $label, $dueAgo]) {
                $due = $this->at($dueAgo, 17, 17);
                $published = $this->at(max($dueAgo + 6, 1), 8, 12);
                $title = "{$s['name']}: {$label}";
                $a = $this->exec(
                    "INSERT INTO assignments (teacher_id, subject_id, class_group_name, academic_year, title, description, type, total_marks, pass_mark,
                            allow_late_submission, attempts_allowed, show_marks_immediately, allow_save_resume, status, due_date, assessment_category,
                            academic_year_id, term_id, deadline_at, is_published, published_at, created_at, updated_at)
                     VALUES (?, ?, 'S.2', ?, ?, ?, 'objective', 10, 5, 1, 1, 0, 1, 'published', ?, ?, ?, ?, ?, 1, ?, ?, ?)",
                    [$s['teacher_id'], $s['id'], $this->yearName, $title, 'Five short questions. Read each one carefully before you choose.',
                     $due, $cat, $this->yearId, (int) $this->term['id'], $due, $published, $published, $published]
                );
                $made++;
                $lo = $outcomes[$k % max(1, count($outcomes))] ?? null;
                $outcome = $lo ? (int) $lo['id'] : null;
                if ($lo) {
                    $this->exec('INSERT INTO assignment_learning_outcomes (assignment_id, curriculum_topic_id, learning_outcome_id, created_at) VALUES (?, ?, ?, NOW())', [$a, (int) $lo['curriculum_topic_id'], $outcome]);
                }
                $questions = [];
                foreach ($bank as $qi => [$text, $options, $right]) {
                    $q = $this->exec(
                        "INSERT INTO assignment_questions (assignment_id, learning_outcome_id, question_type, question_text, marks, display_order, response_type, created_at, updated_at)
                         VALUES (?, ?, 'multiple_choice_single', ?, 2, ?, 'multiple_choice', NOW(), NOW())",
                        [$a, $outcome, $text, $qi + 1]
                    );
                    $ids = [];
                    foreach ($options as $oi => $opt) {
                        $ids[] = $this->exec('INSERT INTO assignment_question_options (question_id, option_text, is_correct, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())', [$q, $opt, $oi === $right ? 1 : 0, $oi + 1]);
                    }
                    $questions[] = ['id' => $q, 'options' => $ids, 'right' => $ids[$right]];
                }
                if ($dueAgo < 0) {
                    continue; // still open: nobody has handed it in yet, except a few early birds below
                }
                foreach ($this->learners as $sid => $l) {
                    // keen learners hand in nearly everything
                    if ($this->rand() > 0.45 + $l['engagement'] * 0.55) {
                        continue;
                    }
                    $late = $this->rand() < 0.12;
                    $submitted = $this->at($late ? $dueAgo - 1 : $dueAgo + $this->rand() * 3, 15, 21);
                    $released = $this->at(max(0, $dueAgo - 2), 9, 16);
                    $score = 0;
                    $answers = [];
                    foreach ($questions as $q) {
                        $right = $this->rand() < $l['ability'] + ($this->rand() - 0.5) * 0.25;
                        $choice = $right ? $q['right'] : $this->pick(array_values(array_diff($q['options'], [$q['right']])));
                        $answers[] = [$q['id'], $choice, $right ? 2 : 0];
                        $score += $right ? 2 : 0;
                    }
                    $sub = $this->exec(
                        "INSERT INTO assignment_submissions (assignment_id, student_id, attempt_number, started_at, status, auto_score, total_score, percentage,
                                marked_by, marked_at, released_at, is_draft, submitted_at, marks_obtained, graded_at, graded_by, created_at, updated_at)
                         VALUES (?, ?, 1, ?, 'returned', ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?)",
                        [$a, $sid, $submitted, $score, $score, $score * 10, $s['teacher_id'], $released, $released, $submitted, $score, $released, $s['teacher_id'], $submitted, $released]
                    );
                    foreach ($answers as [$qid, $choice, $mark]) {
                        $this->exec("INSERT INTO assignment_answers (submission_id, question_id, answer_text, answer_mode, auto_mark, marked_at, created_at, updated_at) VALUES (?, ?, ?, 'typed', ?, ?, NOW(), NOW())", [$sub, $qid, (string) $choice, $mark, $released]);
                    }
                    $handed++;
                }
            }
        }
        $this->say("{$made} assessments, {$handed} scripts marked");
    }

    private function paperExams(): void
    {
        $date = date('Y-m-d', strtotime($this->today . ' -' . max(5, (int) round($this->span() * 0.4)) . ' days'));
        foreach ($this->subjects as $s) {
            $exam = $this->exec(
                "INSERT INTO physical_assessments (subject_id, class_id, term_id, title, max_score, exam_date, include_on_report, created_by, created_by_role, created_at, updated_at)
                 VALUES (?, ?, ?, 'Mid-term paper', 50, ?, 1, ?, 'teacher', NOW(), NOW())",
                [$s['id'], $this->streams['A'], (int) $this->term['id'], $date, $s['teacher_id']]
            );
            foreach ($this->learners as $sid => $l) {
                if ($l['stream'] !== 'A') {
                    continue;
                }
                $score = (int) round(50 * min(1, max(0.1, $l['ability'] + ($this->rand() - 0.5) * 0.3)));
                $this->exec('INSERT INTO physical_assessment_scores (physical_assessment_id, student_id, score, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())', [$exam, $sid, $score]);
            }
        }
    }

    private function reading(): void
    {
        $topics = $this->rows(
            "SELECT t.id, t.total_pages, (SELECT MIN(p.id) FROM enote_pages p WHERE p.topic_id = t.id) AS first_page
             FROM enote_topics t WHERE t.status = 'published' AND t.deleted_at IS NULL
               AND (t.class_group_name = 'S.2' OR t.class_id IN (?, ?) OR (t.class_id IS NULL AND t.class_group_name IS NULL))
               AND t.department_id IN (" . implode(',', array_map(fn($s) => (int) $s['department_id'], $this->subjects)) . ')',
            [$this->streams['A'], $this->streams['B']]
        );
        $reads = 0;
        foreach ($this->learners as $sid => $l) {
            foreach ($topics as $t) {
                if ($this->rand() > $l['engagement'] * 0.95) {
                    continue;
                }
                $pct = min(100, (int) round(100 * min(1, $l['engagement'] * 0.6 + $this->rand() * 0.6)));
                $pages = max(1, (int) $t['total_pages']);
                $done = $pct >= 100;
                $last = $this->at($this->rand() * $this->span(), 16, 22);
                $this->exec(
                    "INSERT INTO enote_progress (topic_id, student_id, current_page_id, pages_completed, percentage_completed, last_read_at, time_spent_minutes, completed_at, created_at, updated_at)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [$t['id'], $sid, $t['first_page'], (int) round($pages * $pct / 100), $pct, $last, mt_rand(3, 25), $done ? $last : null, $last, $last]
                );
                $reads++;
            }
        }
        $this->say(count($topics) . " eNote topics open to S.2, {$reads} reading records");
    }

    private function signIns(): void
    {
        $span = $this->span();
        $n = 0;
        foreach ($this->learners as $sid => $l) {
            $last = null;
            for ($d = $span; $d >= 0; $d--) {
                if ($this->rand() < $l['engagement'] * 0.55) {
                    $at = $this->at($d, 15, 21);
                    $this->exec('INSERT INTO student_logins (student_id, logged_in_at) VALUES (?, ?)', [$sid, $at]);
                    $this->exec("INSERT INTO login_logs (user_id, role, username, full_name, ip_address, user_agent, logged_in_at) VALUES (?, 'student', '', NULL, '127.0.0.1', 'demo', ?)", [$sid, $at]);
                    if ($this->rand() < $l['engagement'] * 0.6) {
                        $this->exec('INSERT IGNORE INTO revision_days (student_id, day, right_count, card_count) VALUES (?, ?, ?, 5)', [$sid, substr($at, 0, 10), mt_rand(2, 5)]);
                    }
                    $last = $at;
                    $n++;
                }
            }
            if ($last) {
                $this->exec('UPDATE students SET last_login_at = ?, last_active_at = ? WHERE id = ?', [$last, $last, $sid]);
            }
        }
        foreach ($this->subjects as $s) {
            for ($d = $span; $d >= 0; $d -= mt_rand(1, 3)) {
                $at = $this->at($d, 7, 18);
                $this->exec("INSERT INTO login_logs (user_id, role, username, full_name, ip_address, user_agent, logged_in_at) VALUES (?, 'teacher', '', NULL, '127.0.0.1', 'demo', ?)", [$s['teacher_id'], $at]);
                $this->exec('UPDATE teachers SET last_login_at = ?, last_active_at = ? WHERE id = ?', [$at, $at, $s['teacher_id']]);
            }
        }
        $this->say("{$n} learner sign-ins");
    }

    private function liveClasses(): void
    {
        $s = reset($this->subjects);
        $start = $this->at(6, 16, 16);
        $held = $this->exec(
            "INSERT INTO live_classes (subject_id, class_group_name, department_id, title, description, scheduled_start, scheduled_end, actual_start, actual_end, status, created_by, created_at, updated_at)
             VALUES (?, 'S.2', ?, 'Revision clinic: your questions answered', 'Bring the questions from this week\\'s topic check.', ?, DATE_ADD(?, INTERVAL 45 MINUTE), ?, DATE_ADD(?, INTERVAL 42 MINUTE), 'ended', ?, ?, ?)",
            [$s['id'], $s['department_id'], $start, $start, $start, $start, $this->demoTeacher, $start, $start]
        );
        foreach ($this->learners as $sid => $l) {
            if ($this->rand() < $l['engagement'] * 0.8) {
                $this->exec("INSERT INTO live_class_attendance (live_class_id, student_id, attendance_status, join_time, leave_time, duration_minutes, created_at) VALUES (?, ?, 'present', ?, DATE_ADD(?, INTERVAL 40 MINUTE), 40, ?)", [$held, $sid, $start, $start, $start]);
            }
        }
        $next = date('Y-m-d', strtotime($this->today . ' +1 day')) . ' 16:00:00';
        $this->exec(
            "INSERT INTO live_classes (subject_id, class_group_name, department_id, title, description, scheduled_start, scheduled_end, status, created_by, created_at, updated_at)
             VALUES (?, 'S.2', ?, 'Live lesson: going over the topic check', 'We go through each question together.', ?, DATE_ADD(?, INTERVAL 45 MINUTE), 'scheduled', ?, NOW(), NOW())",
            [$s['id'], $s['department_id'], $next, $next, $this->demoTeacher]
        );
    }

    private function extras(): void
    {
        $this->exec(
            "INSERT INTO notices (author_role, author_id, author_name, title, body, audience, pinned, created_at)
             VALUES ('admin', ?, 'Head Teacher', 'Welcome to the Tusome demo school', ?, 'everyone', 1, NOW())",
            [$this->headId, "This is a demo school with made-up learners and teachers. Look around as much as you like - anything you change is put back every night.\n\nWant Tusome at your school? Write to demo@tusome.ug."]
        );
        // a parent link for the demo learner, for the "as a parent" door
        $this->exec(
            "INSERT INTO parent_links (student_id, token, guardian_name, relationship, send_digest, created_at) VALUES (?, ?, 'Mrs Nabirye', 'Mother', 0, NOW())",
            [$this->demoLearner, ParentDigestService::newToken()]
        );
    }
}
