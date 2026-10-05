<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

/**
 * Demo requests from the public landing page - a school asking to see eSpace.
 *
 * store() is public (no sign-in); index() and update() are for admins, who follow each one up.
 */
class DemoRequestController extends Controller
{
    protected \PDO $db;

    // At most this many requests from one address per hour - enough for a real school, not a flood
    private const HOURLY_LIMIT = 5;

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
        if ($data['email'] === '' && $data['phone'] === '') $errors['email'] = 'Please give an email address or a phone number';
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
            "SELECT id, school_name, contact_name, role, email, phone, students, message, status, created_at, updated_at
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
}
