<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * The weekly summary of one learner for their parent or guardian - shown on the private parent
 * page (/parent/{token}) and sent as the weekly digest email. Read-only, and only what a parent
 * needs: what was read and handed in this week, results that came back, outcomes achieved so far,
 * and what is due next. No other learners, no teacher comments.
 */
class ParentDigestService
{
    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    public static function linkByToken($db, string $token): ?array
    {
        if (!preg_match('/^[a-f0-9]{48}$/', $token)) {
            return null;
        }
        $stmt = $db->prepare("SELECT * FROM parent_links WHERE token = ? AND revoked_at IS NULL");
        $stmt->execute([$token]);
        return $stmt->fetch() ?: null;
    }

    public static function newToken(): string
    {
        return bin2hex(random_bytes(24));
    }

    public static function summary($db, int $studentId): ?array
    {
        $stmt = $db->prepare(
            "SELECT st.id, st.first_name, st.last_name, st.last_active_at, c.name AS class_name, c.stream_name
             FROM students st LEFT JOIN classes c ON c.id = st.class_id
             WHERE st.id = ? AND st.deleted_at IS NULL"
        );
        $stmt->execute([$studentId]);
        $s = $stmt->fetch();
        if (!$s) {
            return null;
        }
        $since = (new \DateTime('-7 days'))->format('Y-m-d H:i:s');

        // Reading this week
        $stmt = $db->prepare(
            "SELECT COUNT(*) AS topics, SUM(completed_at IS NOT NULL AND completed_at >= ?) AS finished, COALESCE(SUM(time_spent_minutes), 0) AS minutes
             FROM enote_progress WHERE student_id = ? AND last_read_at >= ?"
        );
        $stmt->execute([$since, $studentId, $since]);
        $reading = $stmt->fetch() ?: [];

        // Handed in this week
        $stmt = $db->prepare("SELECT COUNT(*) FROM assignment_submissions WHERE student_id = ? AND deleted_at IS NULL AND submitted_at >= ? AND status <> 'in_progress'");
        $stmt->execute([$studentId, $since]);
        $handedIn = (int) $stmt->fetchColumn();

        // Results that came back this week
        $stmt = $db->prepare(
            "SELECT a.title, a.assessment_category, s.name AS subject, sb.percentage, sb.released_at
             FROM assignment_submissions sb
             INNER JOIN assignments a ON a.id = sb.assignment_id AND a.deleted_at IS NULL
             INNER JOIN subjects s ON s.id = a.subject_id
             WHERE sb.student_id = ? AND sb.deleted_at IS NULL AND sb.status = 'returned' AND sb.released_at >= ? AND sb.percentage IS NOT NULL
             ORDER BY sb.released_at DESC LIMIT 8"
        );
        $stmt->execute([$studentId, $since]);
        $results = array_map(fn($r) => [
            'title' => $r['title'],
            'category' => $r['assessment_category'],
            'subject' => $r['subject'],
            'percentage' => (int) round((float) $r['percentage']),
            'date' => substr((string) $r['released_at'], 0, 10),
        ], $stmt->fetchAll());

        // Outcomes so far (every subject), as on the Learning Map
        $subjectIds = array_map('intval', array_column($db->query("SELECT id FROM subjects WHERE deleted_at IS NULL")->fetchAll(), 'id'));
        $health = ClassHealthService::forStudents($db, [$studentId], $subjectIds)['students'][$studentId] ?? null;

        // Due in the next 7 days, not handed in
        $stmt = $db->prepare(
            "SELECT a.title, a.assessment_category, s.name AS subject, COALESCE(a.deadline_at, a.due_date) AS due
             FROM assignments a INNER JOIN subjects s ON s.id = a.subject_id
             WHERE a.deleted_at IS NULL AND a.status = 'published'
               AND COALESCE(a.deadline_at, a.due_date) BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)
               AND NOT EXISTS (SELECT 1 FROM assignment_submissions sb WHERE sb.assignment_id = a.id AND sb.student_id = ? AND sb.deleted_at IS NULL AND sb.status <> 'in_progress')
               AND " . AssignmentAccess::clause() . "
             ORDER BY due LIMIT 6"
        );
        $stmt->execute([$studentId, $studentId, $studentId]);
        $due = array_map(fn($r) => [
            'title' => $r['title'],
            'category' => $r['assessment_category'],
            'subject' => $r['subject'],
            'due' => $r['due'],
        ], $stmt->fetchAll());

        // Revision streak
        $stmt = $db->prepare("SELECT COUNT(*) FROM revision_days WHERE student_id = ? AND day >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)");
        $stmt->execute([$studentId]);
        $revisionDays = (int) $stmt->fetchColumn();

        $school = $db->query("SELECT school_name, logo_path FROM school_settings ORDER BY id LIMIT 1")->fetch() ?: [];

        return [
            'student' => [
                'first_name' => $s['first_name'],
                'name' => trim($s['first_name'] . ' ' . $s['last_name']),
                'class_label' => $s['class_name'] ? $s['class_name'] . ($s['stream_name'] ? '-' . $s['stream_name'] : '') : null,
                'last_active_at' => $s['last_active_at'],
            ],
            'school' => ['name' => $school['school_name'] ?? null, 'logo' => $school['logo_path'] ?? null],
            'week' => [
                'from' => substr($since, 0, 10),
                'to' => date('Y-m-d'),
                'topics_read' => (int) ($reading['topics'] ?? 0),
                'topics_finished' => (int) ($reading['finished'] ?? 0),
                'reading_minutes' => (int) ($reading['minutes'] ?? 0),
                'handed_in' => $handedIn,
                'revision_days' => $revisionDays,
            ],
            'results' => $results,
            'outcomes' => [
                'achieved' => $health['outcomes_achieved'] ?? 0,
                'assessed' => $health['outcomes_assessed'] ?? 0,
                'average' => $health['average'] ?? null,
            ],
            'due' => $due,
        ];
    }

    /** Send one link's weekly email. Returns false when there is no address or mail() fails. */
    public static function send($db, array $link, string $siteUrl): bool
    {
        $to = trim((string) $link['guardian_email']);
        if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        $sum = self::summary($db, (int) $link['student_id']);
        if (!$sum) {
            return false;
        }
        $first = $sum['student']['first_name'];
        $url = rtrim($siteUrl, '/') . '/parent/' . $link['token'];
        $subject = "{$first}'s week on eSpace";
        $html = self::emailHtml($sum, (string) $link['guardian_name'], $url);

        $from = (string) (\eSpace\Config\Config::get('MAIL_FROM_ADDRESS') ?: 'no-reply@' . (parse_url($siteUrl, PHP_URL_HOST) ?: 'localhost'));
        $fromName = (string) (\eSpace\Config\Config::get('MAIL_FROM_NAME') ?: 'eSpace');
        $headers = implode("\r\n", [
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . self::encode($fromName) . " <{$from}>",
        ]);
        $ok = @mail($to, self::encode($subject), $html, $headers);
        if ($ok) {
            $db->prepare("UPDATE parent_links SET last_digest_at = NOW() WHERE id = ?")->execute([(int) $link['id']]);
        }
        return $ok;
    }

    private static function encode(string $s): string
    {
        return '=?UTF-8?B?' . base64_encode($s) . '?=';
    }

    private static function emailHtml(array $sum, string $guardian, string $url): string
    {
        $e = fn($v) => htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
        $w = $sum['week'];
        $first = $e($sum['student']['first_name']);
        $rows = '';
        foreach ([
            ['Topics read', $w['topics_read']],
            ['Topics finished', $w['topics_finished']],
            ['Work handed in', $w['handed_in']],
            ['Days of revision', $w['revision_days'] . ' of 7'],
        ] as [$k, $v]) {
            $rows .= "<tr><td style=\"padding:6px 0;color:#475569\">{$k}</td><td style=\"padding:6px 0;text-align:right;font-weight:700;color:#0f172a\">{$e($v)}</td></tr>";
        }
        $results = '';
        foreach ($sum['results'] as $r) {
            $results .= "<li style=\"margin:4px 0\">{$e($r['subject'])} - {$e($r['title'])}: <b>{$e($r['percentage'])}%</b></li>";
        }
        $due = '';
        foreach ($sum['due'] as $d) {
            $due .= "<li style=\"margin:4px 0\">{$e($d['subject'])} - {$e($d['title'])} (due {$e(date('D j M', strtotime($d['due'])))})</li>";
        }
        $o = $sum['outcomes'];
        $outcomes = $o['assessed'] ? "{$o['achieved']} of {$o['assessed']} learning outcomes achieved so far." : 'No outcomes assessed yet this year.';
        $school = $sum['school']['name'] ? $e($sum['school']['name']) . ' · ' : '';
        return "<!doctype html><html><body style=\"margin:0;background:#f8fafc;font-family:Segoe UI,Arial,sans-serif\">
<div style=\"max-width:560px;margin:0 auto;padding:24px\">
  <p style=\"font-size:22px;font-weight:800;margin:0 0 16px\"><span style=\"color:#4f46e5\">e</span>Space</p>
  <div style=\"background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px\">
    <p style=\"margin:0;color:#64748b;font-size:13px\">{$school}Weekly update</p>
    <h1 style=\"margin:6px 0 4px;font-size:22px;color:#0f172a\">{$first}'s week</h1>
    <p style=\"margin:0 0 16px;color:#475569\">Dear {$e($guardian)}, here is how {$first} got on this week.</p>
    <table style=\"width:100%;border-collapse:collapse;font-size:14px\">{$rows}</table>
    <p style=\"margin:16px 0 0;color:#0f172a;font-size:14px\">{$e($outcomes)}</p>
    " . ($results ? "<h2 style=\"font-size:15px;margin:20px 0 6px\">Results this week</h2><ul style=\"padding-left:18px;margin:0;font-size:14px;color:#334155\">{$results}</ul>" : '') . "
    " . ($due ? "<h2 style=\"font-size:15px;margin:20px 0 6px\">Coming up</h2><ul style=\"padding-left:18px;margin:0;font-size:14px;color:#334155\">{$due}</ul>" : '') . "
    <p style=\"margin:24px 0 0\"><a href=\"{$e($url)}\" style=\"display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-weight:700;font-size:14px\">See the full update</a></p>
  </div>
  <p style=\"color:#94a3b8;font-size:12px;margin:16px 4px\">You get this because the school added you as {$first}'s parent or guardian on eSpace. To stop it, ask the school.</p>
</div></body></html>";
    }
}
