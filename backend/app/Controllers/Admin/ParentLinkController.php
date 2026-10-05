<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ParentDigestService;

/**
 * Parent links (admin): a parent or guardian gets a private, read-only link to their child's
 * weekly update - no account, no password - and, with an email address, the same update by email
 * every week. A link can be turned off at any time (revoked), which stops both.
 *
 * GET    /admin/parent-links?q=              the links, newest first
 * GET    /admin/parent-links/students?q=     students to add a link for
 * POST   /admin/parent-links                 { student_id, guardian_name, relationship?, guardian_email?, guardian_phone?, send_digest }
 * PUT    /admin/parent-links/{id}            the same fields
 * DELETE /admin/parent-links/{id}            revoke
 * POST   /admin/parent-links/send            { site_url } - this week's emails now (each link at most once a day)
 */
class ParentLinkController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function row(array $r): array
    {
        return [
            'id' => (int) $r['id'],
            'student_id' => (int) $r['student_id'],
            'student_name' => trim(($r['first_name'] ?? '') . ' ' . ($r['last_name'] ?? '')),
            'admission_number' => $r['admission_number'] ?? null,
            'class_label' => ($r['class_name'] ?? null) ? $r['class_name'] . ($r['stream_name'] ? '-' . $r['stream_name'] : '') : null,
            'token' => $r['token'],
            'guardian_name' => $r['guardian_name'],
            'relationship' => $r['relationship'],
            'guardian_email' => $r['guardian_email'],
            'guardian_phone' => $r['guardian_phone'],
            'send_digest' => (bool) $r['send_digest'],
            'created_at' => $r['created_at'],
            'revoked_at' => $r['revoked_at'],
            'last_viewed_at' => $r['last_viewed_at'],
            'last_digest_at' => $r['last_digest_at'],
        ];
    }

    public function index(): void
    {
        $q = trim((string) $this->query('q', ''));
        $sql = "SELECT pl.*, st.first_name, st.last_name, st.admission_number, c.name AS class_name, c.stream_name
                FROM parent_links pl
                INNER JOIN students st ON st.id = pl.student_id
                LEFT JOIN classes c ON c.id = st.class_id
                WHERE 1 = 1";
        $params = [];
        if ($q !== '') {
            $sql .= " AND (CONCAT(st.first_name, ' ', st.last_name) LIKE ? OR st.admission_number LIKE ? OR pl.guardian_name LIKE ? OR pl.guardian_email LIKE ?)";
            $like = '%' . $q . '%';
            $params = [$like, $like, $like, $like];
        }
        $sql .= " ORDER BY pl.revoked_at IS NOT NULL, pl.created_at DESC LIMIT 500";
        $stmt = $this->getDb()->prepare($sql);
        $stmt->execute($params);
        $this->success(['links' => array_map(fn($r) => $this->row($r), $stmt->fetchAll())]);
    }

    public function students(): void
    {
        $q = trim((string) $this->query('q', ''));
        if (mb_strlen($q) < 2) {
            $this->success(['students' => []]);
            return;
        }
        $like = '%' . $q . '%';
        $stmt = $this->getDb()->prepare(
            "SELECT st.id, st.first_name, st.last_name, st.admission_number, c.name AS class_name, c.stream_name
             FROM students st LEFT JOIN classes c ON c.id = st.class_id
             WHERE st.deleted_at IS NULL AND (CONCAT(st.first_name, ' ', st.last_name) LIKE ? OR st.admission_number LIKE ? OR st.username LIKE ?)
             ORDER BY st.first_name, st.last_name LIMIT 12"
        );
        $stmt->execute([$like, $like, $like]);
        $this->success(['students' => array_map(fn($r) => [
            'id' => (int) $r['id'],
            'name' => trim($r['first_name'] . ' ' . $r['last_name']),
            'admission_number' => $r['admission_number'],
            'class_label' => $r['class_name'] ? $r['class_name'] . ($r['stream_name'] ? '-' . $r['stream_name'] : '') : null,
        ], $stmt->fetchAll())]);
    }

    /** @return array{0: ?array, 1: array} clean fields, errors */
    private function fields(): array
    {
        $clean = fn(string $k, int $max) => mb_substr(trim(strip_tags((string) $this->input($k, ''))), 0, $max);
        $f = [
            'guardian_name' => $clean('guardian_name', 120),
            'relationship' => $clean('relationship', 40) ?: null,
            'guardian_email' => $clean('guardian_email', 150) ?: null,
            'guardian_phone' => $clean('guardian_phone', 40) ?: null,
            'send_digest' => $this->input('send_digest', true) ? 1 : 0,
        ];
        $errors = [];
        if ($f['guardian_name'] === '') {
            $errors['guardian_name'] = 'Give the parent or guardian\'s name';
        }
        if ($f['guardian_email'] !== null && !filter_var($f['guardian_email'], FILTER_VALIDATE_EMAIL)) {
            $errors['guardian_email'] = 'That email address doesn\'t look right';
        }
        return [$f, $errors];
    }

    private function one(int $id): ?array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT pl.*, st.first_name, st.last_name, st.admission_number, c.name AS class_name, c.stream_name
             FROM parent_links pl INNER JOIN students st ON st.id = pl.student_id LEFT JOIN classes c ON c.id = st.class_id
             WHERE pl.id = ?"
        );
        $stmt->execute([$id]);
        return $stmt->fetch() ?: null;
    }

    public function store(): void
    {
        $db = $this->getDb();
        $studentId = (int) $this->input('student_id', 0);
        $stmt = $db->prepare("SELECT id FROM students WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$studentId]);
        [$f, $errors] = $this->fields();
        if (!$stmt->fetchColumn()) {
            $errors['student_id'] = 'Choose the student';
        }
        if ($errors) {
            $this->validationError($errors);
            return;
        }
        $db->prepare(
            "INSERT INTO parent_links (student_id, token, guardian_name, relationship, guardian_email, guardian_phone, send_digest, created_by)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        )->execute([$studentId, ParentDigestService::newToken(), $f['guardian_name'], $f['relationship'], $f['guardian_email'], $f['guardian_phone'], $f['send_digest'], $this->getCurrentUserId()]);
        $this->success(['link' => $this->row($this->one((int) $db->lastInsertId()))], 'Parent link created');
    }

    public function update(): void
    {
        $id = (int) $this->routeParam('id');
        if (!$this->one($id)) {
            $this->notFound('Link not found');
            return;
        }
        [$f, $errors] = $this->fields();
        if ($errors) {
            $this->validationError($errors);
            return;
        }
        $this->getDb()->prepare(
            "UPDATE parent_links SET guardian_name = ?, relationship = ?, guardian_email = ?, guardian_phone = ?, send_digest = ? WHERE id = ?"
        )->execute([$f['guardian_name'], $f['relationship'], $f['guardian_email'], $f['guardian_phone'], $f['send_digest'], $id]);
        $this->success(['link' => $this->row($this->one($id))], 'Saved');
    }

    public function destroy(): void
    {
        $id = (int) $this->routeParam('id');
        $this->getDb()->prepare("UPDATE parent_links SET revoked_at = NOW() WHERE id = ? AND revoked_at IS NULL")->execute([$id]);
        $this->success([], 'Link turned off');
    }

    public function send(): void
    {
        $siteUrl = (string) $this->input('site_url', '');
        if (!filter_var($siteUrl, FILTER_VALIDATE_URL)) {
            $this->error('Missing site address', 422);
            return;
        }
        $result = self::sendDue($this->getDb(), $siteUrl, false);
        $this->success($result, $result['sent'] . ' sent');
    }

    /**
     * Email every active link with an address that hasn't had one in the last 6 days (or today,
     * when `$force` - the admin's "send now" still skips links already sent today)
     *
     * @return array{sent:int, failed:int, skipped:int}
     */
    public static function sendDue($db, string $siteUrl, bool $weekly = true): array
    {
        $gap = $weekly ? 'INTERVAL 6 DAY' : 'INTERVAL 20 HOUR';
        $rows = $db->query(
            "SELECT * FROM parent_links
             WHERE revoked_at IS NULL AND send_digest = 1 AND guardian_email IS NOT NULL AND guardian_email <> ''
               AND (last_digest_at IS NULL OR last_digest_at < DATE_SUB(NOW(), $gap))"
        )->fetchAll();
        $out = ['sent' => 0, 'failed' => 0, 'skipped' => 0];
        foreach ($rows as $link) {
            ParentDigestService::send($db, $link, $siteUrl) ? $out['sent']++ : $out['failed']++;
        }
        return $out;
    }
}
