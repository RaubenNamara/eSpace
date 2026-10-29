<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\WebPushService;

/**
 * "Report a concern" on the public Privacy page: anyone - a learner, a parent, a teacher, someone
 * outside the school - tells the Tusome team about a privacy or safety problem.
 *
 * store() is public (signed in or not; a signed-in reporter is recorded with the report). Every
 * super admin is told at once in the bell, and on their phone where turned on. index() and
 * update() are for super admins only, who follow each report up.
 */
class PrivacyReportController extends Controller
{
    protected \PDO $db;

    // At most this many reports from one address per hour - enough for a real concern, not a flood
    private const HOURLY_LIMIT = 5;

    public const CATEGORIES = [
        'data_exposed' => 'Someone can see data they should not',
        'my_data' => 'A question or request about my data',
        'account_misuse' => 'An account used by someone else',
        'child_safety' => 'A learner may be at risk',
        'inappropriate' => 'Bullying or inappropriate content',
        'other' => 'Something else',
    ];

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    private function isSuperAdmin(): bool
    {
        return $this->getCurrentUserRole() === 'super_admin';
    }

    /**
     * POST /api/privacy-reports   { category, message, contact_name?, contact?, website? }
     */
    public function store(): void
    {
        // `website` is a field people never see - only bots fill it in. Pretend it worked.
        if (trim((string) $this->input('website', '')) !== '') {
            $this->success([], 'Thank you - your report has been sent.');
            return;
        }

        $clean = fn(string $key, int $max) => mb_substr(trim(strip_tags((string) $this->input($key, ''))), 0, $max);
        $category = (string) $this->input('category', '');
        $message = $clean('message', 4000);
        $contactName = $clean('contact_name', 120);
        $contact = $clean('contact', 150);

        $errors = [];
        if (!isset(self::CATEGORIES[$category])) $errors['category'] = 'Please choose what it is about';
        if (mb_strlen($message) < 10) $errors['message'] = 'Please tell us a little more about what happened';
        if ($errors) {
            $this->validationError($errors);
            return;
        }

        $ip = $_SERVER['REMOTE_ADDR'] ?? null;
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM privacy_reports WHERE ip_address = :ip AND created_at > (NOW() - INTERVAL 1 HOUR)");
        $stmt->execute(['ip' => $ip]);
        if ((int) $stmt->fetchColumn() >= self::HOURLY_LIMIT) {
            $this->error('We have your reports - please write to us by email if there is more to add.', 429);
            return;
        }

        $userId = $this->getCurrentUserId();
        $role = $userId ? $this->getCurrentUserRole() : null;
        $stmt = $this->db->prepare(
            "INSERT INTO privacy_reports (category, message, contact_name, contact, reporter_user_id, reporter_role, ip_address)
             VALUES (:category, :message, :contact_name, :contact, :uid, :role, :ip)"
        );
        $stmt->execute([
            'category' => $category,
            'message' => $message,
            'contact_name' => $contactName ?: null,
            'contact' => $contact ?: null,
            'uid' => $userId ?: null,
            'role' => $role ?: null,
            'ip' => $ip,
        ]);
        $id = (int) $this->db->lastInsertId();

        // Every super admin, now: the bell and a phone notification. The message itself stays on
        // the Privacy reports page - only the kind of concern travels in the notification.
        $title = 'New privacy report';
        $body = self::CATEGORIES[$category];
        $admins = $this->db->query(
            "SELECT id FROM users WHERE role = 'super_admin' AND deleted_at IS NULL AND (is_active = 1 OR is_active IS NULL)"
        )->fetchAll(\PDO::FETCH_COLUMN);
        $notify = $this->db->prepare(
            "INSERT INTO notifications (user_id, user_role, type, title, message, data) VALUES (?, 'super_admin', 'privacy_report', ?, ?, ?)"
        );
        foreach ($admins as $adminId) {
            $notify->execute([(int) $adminId, $title, $body, json_encode(['report_id' => $id])]);
            WebPushService::queue((int) $adminId, 'super_admin', $title, $body, '/admin/privacy-reports', 'privacy-report-' . $id);
        }

        $this->success(['id' => $id], 'Thank you - your report has been sent to the Tusome team.');
    }

    /**
     * Every report, open ones first
     * GET /api/admin/privacy-reports
     */
    public function index(): void
    {
        if (!$this->isSuperAdmin()) {
            $this->forbidden();
            return;
        }
        $rows = $this->db->query(
            "SELECT id, category, message, contact_name, contact, reporter_user_id, reporter_role, status, note, created_at, updated_at
             FROM privacy_reports ORDER BY (status = 'closed'), (status = 'looking'), created_at DESC LIMIT 500"
        )->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($rows as &$r) {
            $r['category_label'] = self::CATEGORIES[$r['category']] ?? $r['category'];
        }
        unset($r);
        $this->success(['reports' => $rows]);
    }

    /**
     * Move a report along, with a note for the other super admins
     * PUT /api/admin/privacy-reports/{id}   { status, note? }
     */
    public function update($id): void
    {
        if (!$this->isSuperAdmin()) {
            $this->forbidden();
            return;
        }
        $status = (string) $this->input('status', '');
        if (!in_array($status, ['new', 'looking', 'closed'], true)) {
            $this->validationError(['status' => 'Unknown status']);
            return;
        }
        $note = mb_substr(trim(strip_tags((string) $this->input('note', ''))), 0, 1000);
        $stmt = $this->db->prepare("SELECT id FROM privacy_reports WHERE id = :id");
        $stmt->execute(['id' => (int) $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Report not found');
            return;
        }
        $stmt = $this->db->prepare("UPDATE privacy_reports SET status = :status, note = :note WHERE id = :id");
        $stmt->execute(['status' => $status, 'note' => $note !== '' ? $note : null, 'id' => (int) $id]);
        $this->success(['id' => (int) $id, 'status' => $status], 'Updated');
    }
}
