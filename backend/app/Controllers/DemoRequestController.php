<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

/**
 * Demo requests from the public landing page - a school asking to see Tusome.
 *
 * store() is public (no sign-in); index(), update() and sendLink() are for admins, who follow
 * each one up. sendLink() gives the school a private link into the demo school (DemoSchool),
 * open for 7 days, emailed when there is an address and shown to copy (for WhatsApp).
 */
class DemoRequestController extends Controller
{
    protected \PDO $db;

    // At most this many requests from one address per hour - enough for a real school, not a flood
    private const HOURLY_LIMIT = 5;
    /** How long a demo link works */
    public const LINK_DAYS = 7;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }

    /**
     * A school asks for a demo
     * POST /api/demo-requests   { school_name, contact_name, role?, email?, phone?, students?, message?, website? }
     */
    public function store(): void
    {
        // `website` is a field people never see - only bots fill it in. Pretend it worked.
        if (trim((string) $this->input('website', '')) !== '') {
            $this->success([], 'Thank you - we will be in touch.');
            return;
        }

        $clean = fn(string $key, int $max) => mb_substr(trim(strip_tags((string) $this->input($key, ''))), 0, $max);
        $data = [
            'school_name' => $clean('school_name', 150),
            'contact_name' => $clean('contact_name', 120),
            'role' => $clean('role', 80),
            'email' => $clean('email', 150),
            'phone' => $clean('phone', 40),
            'students' => $clean('students', 30),
            'message' => $clean('message', 2000),
        ];

        $errors = [];
        if ($data['school_name'] === '') $errors['school_name'] = 'Please give the school\'s name';
        if ($data['contact_name'] === '') $errors['contact_name'] = 'Please give your name';
        if ($data['email'] === '') $errors['email'] = 'Please give an email address - the demo link is sent there';
        if ($data['email'] !== '' && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'That email address doesn\'t look right';
        if ($errors) {
            $this->validationError($errors);
            return;
        }

        $ip = $_SERVER['REMOTE_ADDR'] ?? null;
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM demo_requests WHERE ip_address = :ip AND created_at > (NOW() - INTERVAL 1 HOUR)");
        $stmt->execute(['ip' => $ip]);
        if ((int) $stmt->fetchColumn() >= self::HOURLY_LIMIT) {
            $this->error('We already have your request - we will be in touch soon.', 429);
            return;
        }

        $stmt = $this->db->prepare(
            "INSERT INTO demo_requests (school_name, contact_name, role, email, phone, students, message, ip_address)
             VALUES (:school_name, :contact_name, :role, :email, :phone, :students, :message, :ip)"
        );
        $stmt->execute([
            'school_name' => $data['school_name'],
            'contact_name' => $data['contact_name'],
            'role' => $data['role'] ?: null,
            'email' => $data['email'] ?: null,
            'phone' => $data['phone'] ?: null,
            'students' => $data['students'] ?: null,
            'message' => $data['message'] ?: null,
            'ip' => $ip,
        ]);

        $this->success(['id' => (int) $this->db->lastInsertId()], 'Thank you - we will be in touch.');
    }

    /**
     * Every demo request, newest first
     * GET /api/admin/demo-requests
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }
        $stmt = $this->db->query(
            "SELECT id, school_name, contact_name, role, email, phone, students, message, status, created_at, updated_at,
                    demo_token, demo_sent_at, demo_expires_at
             FROM demo_requests ORDER BY (status = 'new') DESC, created_at DESC LIMIT 500"
        );
        $this->success(['requests' => $stmt->fetchAll(\PDO::FETCH_ASSOC)]);
    }

    /**
     * Move a request along: new -> contacted -> closed
     * PUT /api/admin/demo-requests/{id}   { status }
     */
    public function update($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }
        $status = (string) $this->input('status', '');
        if (!in_array($status, ['new', 'contacted', 'closed'], true)) {
            $this->validationError(['status' => 'Unknown status']);
            return;
        }
        $stmt = $this->db->prepare("UPDATE demo_requests SET status = :status WHERE id = :id");
        $stmt->execute(['status' => $status, 'id' => (int) $id]);
        if (!$stmt->rowCount()) {
            $stmt = $this->db->prepare("SELECT id FROM demo_requests WHERE id = :id");
            $stmt->execute(['id' => (int) $id]);
            if (!$stmt->fetch()) {
                $this->notFound('Demo request not found');
                return;
            }
        }
        $this->success(['id' => (int) $id, 'status' => $status], 'Updated');
    }

    /**
     * Send the school its private demo link: a new link each time, open for 7 days. Emailed when
     * the request has an address; always returned, so it can be copied into WhatsApp too.
     * POST /api/admin/demo-requests/{id}/demo-link   { site: "https://tusome.ug" }
     */
    public function sendLink($id): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }
        $stmt = $this->db->prepare('SELECT * FROM demo_requests WHERE id = ?');
        $stmt->execute([(int) $id]);
        $r = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$r) {
            $this->notFound('Demo request not found');
            return;
        }
        $site = rtrim((string) $this->input('site', ''), '/');
        if (!preg_match('#^https?://[a-z0-9.-]+(:\d+)?$#i', $site)) {
            $site = rtrim((string) \eSpace\Config\Config::get('FRONTEND_URL', 'https://tusome.ug'), '/');
        }
        $token = bin2hex(random_bytes(24));
        // both times on the database's clock - the one activeLink() checks against
        $this->db->prepare(
            "UPDATE demo_requests SET demo_token = ?, demo_sent_at = NOW(), demo_expires_at = NOW() + INTERVAL " . self::LINK_DAYS . " DAY,
                    status = IF(status = 'new', 'contacted', status) WHERE id = ?"
        )->execute([$token, (int) $id]);
        $stmt = $this->db->prepare('SELECT demo_sent_at, demo_expires_at FROM demo_requests WHERE id = ?');
        $stmt->execute([(int) $id]);
        [$sentAt, $expires] = array_values($stmt->fetch(\PDO::FETCH_ASSOC));
        $link = $site . '/demo/' . $token;

        $emailed = false;
        if ($r['email'] && filter_var($r['email'], FILTER_VALIDATE_EMAIL)) {
            $emailed = $this->emailLink($r, $link, $expires);
        }
        $this->success([
            'link' => $link,
            'emailed' => $emailed,
            'demo_sent_at' => $sentAt,
            'demo_expires_at' => $expires,
            'status' => $r['status'] === 'new' ? 'contacted' : $r['status'],
        ], $emailed ? 'Demo link emailed' : 'Demo link ready to copy');
    }

    private function emailLink(array $r, string $link, string $expires): bool
    {
        $e = fn($v) => htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
        $until = date('l j F', strtotime($expires));
        $first = $e(explode(' ', trim((string) $r['contact_name']))[0] ?: 'there');
        $html = "<!doctype html><html><body style=\"margin:0;background:#faf5e8;font-family:Segoe UI,Arial,sans-serif\">
<div style=\"max-width:560px;margin:0 auto;padding:24px\">
  <p style=\"font-size:22px;font-weight:700;margin:0 0 16px;color:#14307d\">Tusome<span style=\"color:#d9a520\">.</span></p>
  <div style=\"background:#fff;border:1px solid #e7dcc0;border-radius:16px;padding:24px\">
    <h1 style=\"margin:0 0 8px;font-size:22px;color:#0f172a\">Your Tusome demo is ready</h1>
    <p style=\"margin:0 0 12px;color:#334155;line-height:1.6\">Hello {$first}, thank you for asking to see Tusome for {$e($r['school_name'])}.</p>
    <p style=\"margin:0 0 12px;color:#334155;line-height:1.6\">The link below opens our demo school. Walk in as a learner, a teacher, the head teacher or a parent - set work, mark it, read the notes, open a report card. The learners and teachers are made up, so change anything you like.</p>
    <p style=\"margin:20px 0\"><a href=\"{$e($link)}\" style=\"display:inline-block;background:#d9a520;color:#10276a;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:700;font-size:15px\">Open the demo</a></p>
    <p style=\"margin:0;color:#64748b;font-size:13px\">The link works until {$e($until)}. Please keep it to your school.</p>
  </div>
  <p style=\"color:#94a3b8;font-size:12px;margin:16px 4px\">You get this because you asked for a demo on the Tusome website.</p>
</div></body></html>";
        $from = (string) (\eSpace\Config\Config::get('MAIL_FROM_ADDRESS') ?: 'no-reply@tusome.ug');
        $fromName = (string) (\eSpace\Config\Config::get('MAIL_FROM_NAME') ?: 'Tusome');
        $enc = fn(string $s) => '=?UTF-8?B?' . base64_encode($s) . '?=';
        $headers = implode("\r\n", ['MIME-Version: 1.0', 'Content-Type: text/html; charset=UTF-8', 'From: ' . $enc($fromName) . " <{$from}>"]);
        return @mail((string) $r['email'], $enc('Your Tusome demo is ready'), $html, $headers);
    }

    /**
     * The demo request a link belongs to, while the link still works - null otherwise. Demo
     * requests live in the home database (the website's), whatever school a session is in.
     */
    public static function activeLink(string $token): ?array
    {
        if (!preg_match('/^[a-f0-9]{48}$/', $token)) {
            return null;
        }
        $db = \eSpace\App\Support\Tenant::connect(null);
        $stmt = $db->prepare('SELECT id, school_name, contact_name, demo_expires_at FROM demo_requests WHERE demo_token = ? AND demo_expires_at > NOW()');
        $stmt->execute([$token]);
        return $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
    }
}
