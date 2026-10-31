<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\SchoolProvisioner;
use eSpace\App\Support\Tenant;

/**
 * The developer portal (tusome.ug/devportal) - for the Tusome team only, never a school.
 *
 * Its logins are the platform database's platform_admins (made with
 * backend/scripts/create_dev_admin.php), kept in the session apart from any school sign-in. From
 * here the team enrols schools (each gets its own database), pauses and resumes them, and turns
 * independent learners' requests into logins once they have paid. Every change is written to
 * platform_audit.
 */
class DevPortalController extends Controller
{
    private ?\PDO $platform;

    public function __construct()
    {
        parent::__construct();
        $this->platform = Tenant::platform();
    }

    private function adminId(): ?int
    {
        return isset($_SESSION['dev_admin_id']) ? (int) $_SESSION['dev_admin_id'] : null;
    }

    /** Stops the request unless a team member is signed in to the portal */
    private function guard(): bool
    {
        if (!$this->platform) {
            $this->error('The platform database is not set up yet (database/platform/001_platform.sql).', 503);
            return false;
        }
        $id = $this->adminId();
        if ($id) {
            $stmt = $this->platform->prepare('SELECT id FROM platform_admins WHERE id = ? AND is_active = 1');
            $stmt->execute([$id]);
            if ($stmt->fetch()) {
                return true;
            }
        }
        unset($_SESSION['dev_admin_id']);
        $this->unauthorized();
        return false;
    }

    private function audit(string $action, ?string $target = null, ?string $details = null): void
    {
        $this->platform?->prepare('INSERT INTO platform_audit (admin_id, action, target, details) VALUES (?, ?, ?, ?)')
            ->execute([$this->adminId(), $action, $target, $details !== null ? mb_substr($details, 0, 1000) : null]);
    }

    /** POST /api/devportal/login   { email, password } */
    public function login(): void
    {
        if (!$this->platform) {
            $this->error('The platform database is not set up yet.', 503);
            return;
        }
        $email = strtolower(trim((string) $this->input('email', '')));
        $stmt = $this->platform->prepare('SELECT id, name, email, password FROM platform_admins WHERE email = ? AND is_active = 1');
        $stmt->execute([$email]);
        $admin = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$admin || !password_verify((string) $this->input('password', ''), $admin['password'])) {
            $this->error('Wrong email or password', 401);
            return;
        }
        session_regenerate_id(true);
        $_SESSION['dev_admin_id'] = (int) $admin['id'];
        $this->platform->prepare('UPDATE platform_admins SET last_login_at = NOW() WHERE id = ?')->execute([$admin['id']]);
        $this->audit('login');
        $this->success(['admin' => ['id' => (int) $admin['id'], 'name' => $admin['name'], 'email' => $admin['email']]]);
    }

    /** GET /api/devportal/me */
    public function me(): void
    {
        if (!$this->guard()) {
            return;
        }
        $stmt = $this->platform->prepare('SELECT id, name, email FROM platform_admins WHERE id = ?');
        $stmt->execute([$this->adminId()]);
        $this->success(['admin' => $stmt->fetch(\PDO::FETCH_ASSOC)]);
    }

    /** POST /api/devportal/logout - ends the portal sign-in only (a school sign-in in the same browser stays) */
    public function logout(): void
    {
        unset($_SESSION['dev_admin_id']);
        $this->success([], 'Signed out');
    }

    /** GET /api/devportal/schools - every school, with its learners, teachers and last sign-in */
    public function schools(): void
    {
        if (!$this->guard()) {
            return;
        }
        $rows = $this->platform->query(
            'SELECT id, code, name, kind, db_name, status, is_master, contact_name, contact_email, contact_phone, notes, created_at FROM schools ORDER BY is_master DESC, name'
        )->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($rows as &$s) {
            try {
                $db = Tenant::connect($s['db_name']);
                $s['students'] = (int) $db->query('SELECT COUNT(*) FROM students WHERE deleted_at IS NULL')->fetchColumn();
                $s['teachers'] = (int) $db->query("SELECT COUNT(*) FROM teachers WHERE deleted_at IS NULL AND (employee_number IS NULL OR employee_number <> 'TUSOME-LIBRARY')")->fetchColumn();
                $s['last_login'] = $db->query('SELECT MAX(logged_in_at) FROM login_logs')->fetchColumn() ?: null;
                // shared content copied in so far (ContentLibrary), by kind
                try {
                    $s['content'] = $db->query('SELECT source_table, COUNT(DISTINCT source_id) FROM content_copies GROUP BY source_table')->fetchAll(\PDO::FETCH_KEY_PAIR);
                } catch (\PDOException $e) {
                    $s['content'] = null;
                }
                $s['reachable'] = true;
            } catch (\Throwable $e) {
                $s['students'] = $s['teachers'] = null;
                $s['last_login'] = null;
                $s['reachable'] = false;
            }
            $s['database'] = $s['db_name'] ?: '(home database)';
            unset($s['db_name']);
        }
        unset($s);
        $this->success(['schools' => $rows, 'home_code' => Tenant::homeCode()]);
    }

    /**
     * Enrol a school - its own database with every table, the starting settings and its first
     * administrator, whose password is shown once.
     * POST /api/devportal/schools   { code, name, kind, db_name?, admin_username, admin_email, contact_* , notes }
     */
    public function createSchool(): void
    {
        if (!$this->guard()) {
            return;
        }
        $clean = fn(string $k, int $max) => mb_substr(trim(strip_tags((string) $this->input($k, ''))), 0, $max);
        $code = strtolower($clean('code', 40));
        $name = $clean('name', 150);
        $kind = $this->input('kind') === 'independent' ? 'independent' : 'school';
        $dbName = $clean('db_name', 64) ?: 'tusome_' . str_replace('-', '_', $code);
        $adminUsername = $clean('admin_username', 50);
        $adminEmail = strtolower($clean('admin_email', 100));

        $errors = [];
        // the code is what follows the @ in every login at the school ("amos@kings")
        if (!preg_match('/^[a-z0-9][a-z0-9-]{1,38}$/', $code)) $errors['code'] = '2-40 lowercase letters, digits or dashes - it goes after the @ in every login';
        elseif ($code === Tenant::homeCode() || Tenant::find($code)) $errors['code'] = 'That code is taken';
        if ($name === '') $errors['name'] = 'Give the school\'s name';
        if (!preg_match('/^[A-Za-z0-9_]{1,64}$/', $dbName)) $errors['db_name'] = 'Letters, digits and _ only';
        if (!preg_match('/^[A-Za-z0-9._-]{3,50}$/', $adminUsername)) $errors['admin_username'] = '3-50 letters, digits, dots, dashes';
        if (!filter_var($adminEmail, FILTER_VALIDATE_EMAIL)) $errors['admin_email'] = 'A valid email';
        $taken = $this->platform->prepare('SELECT code FROM schools WHERE db_name = ?');
        $taken->execute([$dbName]);
        if ($dbName === \eSpace\Config\Config::get('DB_NAME') || $taken->fetch()) $errors['db_name'] = 'That database already belongs to a school';
        if ($errors) {
            $this->validationError($errors);
            return;
        }

        if ($problem = SchoolProvisioner::ensureDatabase($dbName)) {
            $this->error($problem, 422);
            return;
        }
        try {
            $home = Tenant::connect(null);
            $target = Tenant::connect($dbName);
            if ((int) $target->query("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'students'")->fetchColumn() > 0
                && (int) $target->query('SELECT COUNT(*) FROM students')->fetchColumn() > 0) {
                $this->error('That database already has students in it - use an empty database.', 422);
                return;
            }
            $tables = SchoolProvisioner::copySchema($home, $target);
            SchoolProvisioner::seed($home, $target, $name);
            $password = SchoolProvisioner::createAdmin($target, $adminUsername, $adminEmail);
        } catch (\Throwable $e) {
            error_log('Enrol school failed: ' . $e->getMessage());
            $this->error('Setting up the database failed: ' . $e->getMessage(), 500);
            return;
        }

        $this->platform->prepare(
            'INSERT INTO schools (code, name, kind, db_name, status, contact_name, contact_email, contact_phone, notes) VALUES (?, ?, ?, ?, \'active\', ?, ?, ?, ?)'
        )->execute([$code, $name, $kind, $dbName, $clean('contact_name', 120) ?: null, $clean('contact_email', 150) ?: null, $clean('contact_phone', 40) ?: null, $clean('notes', 1000) ?: null]);
        $newId = (int) $this->platform->lastInsertId();
        $this->audit('enrol_school', $code, "{$name} · database {$dbName} · {$tables} tables · admin {$adminUsername}");

        // Its tables are the home school's, so it has had the same database updates: the home
        // school's record of them, or - before that record exists - every update so far
        $updater = new \eSpace\App\Services\SchemaUpdater($this->platform);
        $homeId = (int) ($this->platform->query("SELECT id FROM schools WHERE code = " . $this->platform->quote(Tenant::homeCode()))->fetchColumn() ?: 0);
        if ($homeId && $updater->recorded($homeId)) {
            $updater->inherit($newId, $homeId);
        } else {
            $updater->baseline($newId, \eSpace\App\Services\SchemaUpdater::files());
        }

        // the shared content, straight away when asked
        $content = null;
        $contentError = null;
        if ($this->input('copy_content')) {
            try {
                $content = $this->copyContentInto($target, (string) $this->input('streams', 'A'));
                $this->audit('copy_content', $code, $this->describe($content));
            } catch (\Throwable $e) {
                error_log('Copy content failed: ' . $e->getMessage());
                $contentError = 'The school is enrolled, but copying the content failed: ' . $e->getMessage() . ' - try Copy content again.';
            }
        }

        $this->success([
            'code' => $code,
            // what the administrator types to log in: their username @ the school's code
            'admin' => ['login' => Tenant::loginFor($adminUsername, $code), 'password' => $password],
            'tables' => $tables,
            'content' => $content,
            'content_error' => $contentError,
        ], "{$name} is ready");
    }

    /**
     * Copy the master school's shared content into a school - the first time, or again to add
     * what is new at the master (nothing is copied twice). See ContentLibrary.
     * POST /api/devportal/schools/{id}/content   { streams: "A, B, C" }
     */
    public function copyContent($id): void
    {
        if (!$this->guard()) {
            return;
        }
        $stmt = $this->platform->prepare('SELECT * FROM schools WHERE id = ?');
        $stmt->execute([(int) $id]);
        $school = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$school) {
            $this->notFound('School not found');
            return;
        }
        if ((int) $school['is_master'] === 1 || $school['code'] === Tenant::homeCode()) {
            $this->error('This is the master school - its content is the one others copy.', 422);
            return;
        }
        try {
            $added = $this->copyContentInto(Tenant::connect($school['db_name']), (string) $this->input('streams', 'A'));
        } catch (\Throwable $e) {
            error_log('Copy content failed: ' . $e->getMessage());
            $this->error('Copying failed - nothing was changed: ' . $e->getMessage(), 500);
            return;
        }
        $this->audit('copy_content', $school['code'], $this->describe($added));
        $this->success(['added' => $added], $added ? 'Content copied' : 'Nothing new to copy');
    }

    private function copyContentInto(\PDO $target, string $streams): array
    {
        $master = $this->platform->query('SELECT db_name FROM schools WHERE is_master = 1 ORDER BY id LIMIT 1')->fetchColumn();
        $library = new \eSpace\App\Services\ContentLibrary(Tenant::connect($master ?: null), $target);
        return $library->copy(preg_split('/[\s,]+/', $streams) ?: ['A']);
    }

    private function describe(array $added): string
    {
        return $added ? implode(', ', array_map(fn($k, $n) => "{$n} {$k}", array_keys($added), $added)) : 'nothing new';
    }

    /** PUT /api/devportal/schools/{id}   { status?, name?, contact_*?, notes? } */
    public function updateSchool($id): void
    {
        if (!$this->guard()) {
            return;
        }
        $stmt = $this->platform->prepare('SELECT * FROM schools WHERE id = ?');
        $stmt->execute([(int) $id]);
        $school = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$school) {
            $this->notFound('School not found');
            return;
        }
        $fields = [];
        $params = [];
        $status = $this->input('status');
        if ($status !== null) {
            if (!in_array($status, ['active', 'suspended'], true)) {
                $this->validationError(['status' => 'Unknown status']);
                return;
            }
            if ($status === 'suspended' && ($school['code'] === Tenant::homeCode() || (int) $school['is_master'] === 1)) {
                $this->error('The home school can\'t be paused here.', 422);
                return;
            }
            $fields[] = 'status = ?';
            $params[] = $status;
        }
        foreach (['name' => 150, 'contact_name' => 120, 'contact_email' => 150, 'contact_phone' => 40, 'notes' => 1000] as $k => $max) {
            $v = $this->input($k);
            if ($v !== null) {
                $fields[] = "{$k} = ?";
                $params[] = mb_substr(trim(strip_tags((string) $v)), 0, $max) ?: null;
            }
        }
        if ($fields) {
            $params[] = (int) $id;
            $this->platform->prepare('UPDATE schools SET ' . implode(', ', $fields) . ' WHERE id = ?')->execute($params);
            $this->audit($status === 'suspended' ? 'pause_school' : ($status === 'active' ? 'resume_school' : 'edit_school'), $school['code']);
        }
        $this->success(['id' => (int) $id], 'Saved');
    }

    /** GET /api/devportal/learner-requests */
    public function learnerRequests(): void
    {
        if (!$this->guard()) {
            return;
        }
        $rows = $this->platform->query(
            "SELECT id, first_name, last_name, email, phone, level, gender, message, status, note, school_code, username, activated_at, created_at
             FROM learner_requests ORDER BY (status = 'new') DESC, (status = 'contacted') DESC, created_at DESC LIMIT 500"
        )->fetchAll(\PDO::FETCH_ASSOC);
        $spaces = $this->platform->query("SELECT code, name FROM schools WHERE kind = 'independent' AND status = 'active' ORDER BY name")->fetchAll(\PDO::FETCH_ASSOC);
        $this->success(['requests' => $rows, 'spaces' => $spaces]);
    }

    /** PUT /api/devportal/learner-requests/{id}   { status, note? } - contacted / declined / back to new */
    public function updateLearnerRequest($id): void
    {
        if (!$this->guard()) {
            return;
        }
        $status = (string) $this->input('status', '');
        if (!in_array($status, ['new', 'contacted', 'declined'], true)) {
            $this->validationError(['status' => 'Use Activate to give a login']);
            return;
        }
        $stmt = $this->platform->prepare("UPDATE learner_requests SET status = ?, note = ? WHERE id = ? AND status <> 'activated'");
        $stmt->execute([$status, mb_substr(trim(strip_tags((string) $this->input('note', ''))), 0, 1000) ?: null, (int) $id]);
        $this->audit('learner_request_' . $status, '#' . (int) $id);
        $this->success(['id' => (int) $id, 'status' => $status], 'Saved');
    }

    /**
     * Paid: create the learner's login in an independent space, put them in their class and its
     * departments, and show the username and password once - to send to them.
     * POST /api/devportal/learner-requests/{id}/activate   { school_code }
     */
    public function activateLearner($id): void
    {
        if (!$this->guard()) {
            return;
        }
        $stmt = $this->platform->prepare('SELECT * FROM learner_requests WHERE id = ?');
        $stmt->execute([(int) $id]);
        $req = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$req) {
            $this->notFound('Request not found');
            return;
        }
        if ($req['status'] === 'activated') {
            $this->error('Already activated - the login is ' . $req['username'], 422);
            return;
        }
        $space = Tenant::find((string) $this->input('school_code', ''));
        if (!$space || $space['kind'] !== 'independent' || $space['status'] !== 'active') {
            $this->validationError(['school_code' => 'Choose an independent space (enrol one first, kind "Independent learners")']);
            return;
        }

        try {
            $db = Tenant::connect($space['db_name']);
            $db->beginTransaction();
            // username: first.last, then first.last2 ...
            $base = preg_replace('/[^a-z0-9]+/', '', strtolower($req['first_name'])) . '.' . preg_replace('/[^a-z0-9]+/', '', strtolower($req['last_name']));
            $base = trim($base, '.') ?: 'learner';
            $username = $base;
            $check = $db->prepare('SELECT 1 FROM students WHERE username = ?');
            for ($n = 2; ; $n++) {
                $check->execute([$username]);
                if (!$check->fetch()) break;
                $username = $base . $n;
            }
            $password = SchoolProvisioner::password(8);
            $class = $db->prepare('SELECT id FROM classes WHERE name = ? AND deleted_at IS NULL ORDER BY id LIMIT 1');
            $class->execute([$req['level']]);
            $classId = $class->fetchColumn() ?: null;

            $db->prepare(
                "INSERT INTO students (username, email, password, role, phone, is_active, admission_number, first_name, last_name, gender, class_id, created_at, updated_at)
                 VALUES (?, ?, ?, 'student', ?, 1, ?, ?, ?, ?, ?, NOW(), NOW())"
            )->execute([
                $username, $req['email'] ?: null, password_hash($password, PASSWORD_BCRYPT), $req['phone'] ?: null,
                'IND-' . str_pad((string) $req['id'], 5, '0', STR_PAD_LEFT), $req['first_name'], $req['last_name'], $req['gender'] ?: 'other', $classId,
            ]);
            $studentId = (int) $db->lastInsertId();

            // Their class's departments, so the content for their level shows
            $enrolled = 0;
            if ($classId) {
                $year = $db->query('SELECT name FROM academic_years WHERE is_current = 1 ORDER BY id DESC LIMIT 1')->fetchColumn() ?: date('Y');
                $deps = $db->query('SELECT id FROM departments WHERE deleted_at IS NULL')->fetchAll(\PDO::FETCH_COLUMN);
                $ins = $db->prepare(
                    "INSERT INTO student_department_enrollments (student_id, department_id, academic_year, class_id, start_date, status, enrolled_at, created_at, updated_at)
                     VALUES (?, ?, ?, ?, CURDATE() - INTERVAL 1 YEAR, 'active', NOW(), NOW(), NOW())"
                );
                foreach ($deps as $dep) {
                    $ins->execute([$studentId, (int) $dep, $year, $classId]);
                    $enrolled++;
                }
            }
            $db->commit();
        } catch (\Throwable $e) {
            if (isset($db) && $db->inTransaction()) $db->rollBack();
            error_log('Activate learner failed: ' . $e->getMessage());
            $this->error('Creating the login failed: ' . $e->getMessage(), 500);
            return;
        }

        $this->platform->prepare(
            "UPDATE learner_requests SET status = 'activated', school_code = ?, student_id = ?, username = ?, activated_at = NOW() WHERE id = ?"
        )->execute([$space['code'], $studentId, Tenant::loginFor($username, $space['code']), (int) $id]);
        $this->audit('activate_learner', $space['code'], "{$req['first_name']} {$req['last_name']} · " . Tenant::loginFor($username, $space['code']));

        $this->success([
            'school_code' => $space['code'],
            'login' => Tenant::loginFor($username, $space['code']),
            // what they type after choosing "Learning on my own" on the login page
            'username' => $username,
            'is_default_space' => Tenant::independentCode() === $space['code'],
            'password' => $password,
            'class_found' => $classId !== null,
            'departments' => $enrolled,
        ], 'Login created');
    }

    // ------------------------------------------------------------------ database updates

    /**
     * Every school's database updates: what it still needs, and any that stopped with an error.
     * GET /api/devportal/updates
     */
    public function updates(): void
    {
        if (!$this->guard()) {
            return;
        }
        $updater = new \eSpace\App\Services\SchemaUpdater($this->platform);
        $files = \eSpace\App\Services\SchemaUpdater::files();
        $out = [];
        foreach ($this->platform->query('SELECT id, code, name, status, is_master FROM schools ORDER BY is_master DESC, name')->fetchAll(\PDO::FETCH_ASSOC) as $s) {
            $recorded = $updater->recorded((int) $s['id']);
            $failed = [];
            foreach ($recorded as $file => $r) {
                if ($r['status'] === 'failed') $failed[$file] = $r['message'];
            }
            $out[] = [
                'id' => (int) $s['id'],
                'code' => $s['code'],
                'name' => $s['name'],
                'status' => $s['status'],
                'is_home' => $s['code'] === Tenant::homeCode(),
                // nothing recorded yet: the portal doesn't know what this database already has
                'unrecorded' => !$recorded,
                'pending' => $updater->pending((int) $s['id']),
                'failed' => $failed,
            ];
        }
        $this->success(['files' => count($files), 'latest' => end($files) ?: null, 'schools' => $out]);
    }

    /**
     * Run the pending updates - on one school, or on every school that has any, one at a time.
     * Each school stops at its first error.
     * POST /api/devportal/updates/run   { school_id? }
     */
    public function runUpdates(): void
    {
        if (!$this->guard()) {
            return;
        }
        @set_time_limit(600);
        $updater = new \eSpace\App\Services\SchemaUpdater($this->platform);
        $only = (int) $this->input('school_id', 0);
        $schools = $this->platform->query('SELECT id, code, name, db_name FROM schools ORDER BY is_master DESC, name')->fetchAll(\PDO::FETCH_ASSOC);
        $results = [];
        foreach ($schools as $s) {
            if ($only && (int) $s['id'] !== $only) continue;
            if (!$updater->recorded((int) $s['id'])) {
                // never run every update ever written on a database we know nothing about
                $results[] = ['code' => $s['code'], 'name' => $s['name'], 'applied' => [], 'failed' => null, 'skipped' => 'Tell the portal which updates this database already has first (Mark as already run).'];
                continue;
            }
            if (!$updater->pending((int) $s['id'])) continue;
            try {
                $r = $updater->run((int) $s['id'], Tenant::connect($s['db_name']));
            } catch (\Throwable $e) {
                $r = ['applied' => [], 'failed' => ['file' => '(connecting)', 'message' => $e->getMessage()]];
            }
            $results[] = ['code' => $s['code'], 'name' => $s['name']] + $r;
            $this->audit($r['failed'] ? 'update_failed' : 'update_school', $s['code'],
                count($r['applied']) . ' applied' . ($r['failed'] ? " · stopped at {$r['failed']['file']}: {$r['failed']['message']}" : ''));
        }
        $this->success(['results' => $results]);
    }

    /**
     * Mark updates as already in a school's database, without running them - St Mark's, whose
     * updates were run by hand before the portal kept count.
     * POST /api/devportal/updates/baseline   { school_id, files: string[] | "all" }
     */
    public function baselineUpdates(): void
    {
        if (!$this->guard()) {
            return;
        }
        $schoolId = (int) $this->input('school_id', 0);
        $stmt = $this->platform->prepare('SELECT code FROM schools WHERE id = ?');
        $stmt->execute([$schoolId]);
        $code = $stmt->fetchColumn();
        if (!$code) {
            $this->notFound('School not found');
            return;
        }
        $files = $this->input('files');
        $files = $files === 'all' ? \eSpace\App\Services\SchemaUpdater::files() : (is_array($files) ? array_map('strval', $files) : []);
        $n = (new \eSpace\App\Services\SchemaUpdater($this->platform))->baseline($schoolId, $files);
        $this->audit('mark_updates_run', $code, "{$n} marked as already run");
        $this->success(['marked' => $n], 'Marked');
    }

    /** GET /api/devportal/audit - the latest 200 actions */
    public function audit_log(): void
    {
        if (!$this->guard()) {
            return;
        }
        $rows = $this->platform->query(
            'SELECT a.id, a.action, a.target, a.details, a.created_at, p.name AS admin_name
             FROM platform_audit a LEFT JOIN platform_admins p ON p.id = a.admin_id ORDER BY a.id DESC LIMIT 200'
        )->fetchAll(\PDO::FETCH_ASSOC);
        $this->success(['entries' => $rows]);
    }
}
