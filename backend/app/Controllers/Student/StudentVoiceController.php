<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\Config\Config;

/**
 * Student Voice (the school's anonymous feedback polls) from the student dashboard.
 *
 * GET  /api/student/student-voice       whether to show the button
 * POST /api/student/student-voice/link  a link that opens Student Voice signed in as this learner
 *
 * The link carries a ticket: who the learner is (admission number, name, class, stream, school),
 * valid for 2 minutes and usable once, signed with STUDENT_VOICE_API_KEY (the key Student Voice
 * also holds as TUSOME_API_KEY). Student Voice checks the signature and signs the learner in, so
 * learners use their Tusome account instead of a voting number. The ticket holds no password and
 * nothing beyond what Student Voice already has from SMIS.
 */
class StudentVoiceController extends Controller
{
    private const TICKET_SECONDS = 120;

    private function settings(\PDO $db): array
    {
        try {
            $row = $db->query('SELECT student_voice_enabled, student_voice_url FROM school_settings WHERE id = 1')->fetch(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return ['enabled' => false, 'url' => ''];
        }
        $url = rtrim(trim((string) ($row['student_voice_url'] ?? '')), '/');
        $key = (string) Config::get('STUDENT_VOICE_API_KEY', '');
        return [
            'enabled' => !empty($row['student_voice_enabled']) && preg_match('#^https?://#i', $url) && strlen($key) >= 32,
            'url' => $url,
        ];
    }

    public function status(): void
    {
        if (!$this->isAuthenticated() || !$this->hasRole('student')) {
            $this->unauthorized();
            return;
        }
        $s = $this->settings(\eSpace\Config\Database::getInstance());
        $this->success(['enabled' => (bool) $s['enabled']]);
    }

    public function link(): void
    {
        if (!$this->isAuthenticated() || !$this->hasRole('student')) {
            $this->unauthorized();
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        $s = $this->settings($db);
        if (!$s['enabled']) {
            $this->error('Student Voice is not open right now.', 404);
            return;
        }
        $stmt = $db->prepare(
            "SELECT s.admission_number, s.first_name, s.last_name, c.name AS class_name, c.stream_name
             FROM students s LEFT JOIN classes c ON c.id = s.class_id
             WHERE s.id = ? AND s.deleted_at IS NULL AND s.is_active = 1"
        );
        $stmt->execute([$this->getCurrentUserId()]);
        $me = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$me || trim((string) $me['admission_number']) === '') {
            $this->error('Your account has no admission number, so Student Voice cannot know who you are. Ask the school office.', 422);
            return;
        }
        $payload = [
            'adm' => trim((string) $me['admission_number']),
            'name' => trim($me['first_name'] . ' ' . $me['last_name']),
            'class' => (string) ($me['class_name'] ?? ''),
            'stream' => (string) ($me['stream_name'] ?? ''),
            'school' => \eSpace\App\Support\Tenant::sessionCode() ?? '',
            'exp' => time() + self::TICKET_SECONDS,
            'n' => bin2hex(random_bytes(12)),
        ];
        $body = rtrim(strtr(base64_encode((string) json_encode($payload, JSON_UNESCAPED_UNICODE)), '+/', '-_'), '=');
        $sig = hash_hmac('sha256', $body, (string) Config::get('STUDENT_VOICE_API_KEY'));
        $this->success(['url' => $s['url'] . '/api/vote/tusome?t=' . $body . '.' . $sig]);
    }
}
