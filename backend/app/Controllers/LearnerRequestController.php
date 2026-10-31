<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Support\Tenant;

/**
 * An independent learner - in no school - asks to join Tusome (/join). Kept in the platform
 * database; the Tusome team contacts them, takes payment, and activates them in the developer
 * portal, which creates their login (DevPortalController::activateLearner).
 */
class LearnerRequestController extends Controller
{
    // At most this many requests from one address per hour
    private const HOURLY_LIMIT = 5;
    public const LEVELS = ['S.1', 'S.2', 'S.3', 'S.4', 'S.5', 'S.6'];

    /** POST /api/learner-requests   { first_name, last_name, email?, phone?, level, gender?, message?, website? } */
    public function store(): void
    {
        // `website` is a field people never see - only bots fill it in. Pretend it worked.
        if (trim((string) $this->input('website', '')) !== '') {
            $this->success([], 'Thank you - we will contact you.');
            return;
        }
        $db = Tenant::platform();
        if (!$db) {
            $this->error('Joining on your own is not open yet - please write to us.', 503);
            return;
        }
        $clean = fn(string $k, int $max) => mb_substr(trim(strip_tags((string) $this->input($k, ''))), 0, $max);
        $d = [
            'first_name' => $clean('first_name', 50),
            'last_name' => $clean('last_name', 50),
            'email' => $clean('email', 150),
            'phone' => $clean('phone', 40),
            'level' => (string) $this->input('level', ''),
            'gender' => in_array($this->input('gender'), ['male', 'female', 'other'], true) ? $this->input('gender') : null,
            'message' => $clean('message', 1000),
        ];
        $errors = [];
        if ($d['first_name'] === '') $errors['first_name'] = 'Please give your first name';
        if ($d['last_name'] === '') $errors['last_name'] = 'Please give your last name';
        if (!in_array($d['level'], self::LEVELS, true)) $errors['level'] = 'Please choose your class';
        if ($d['email'] === '' && $d['phone'] === '') $errors['phone'] = 'Please give a phone number or an email address, so we can reach you';
        if ($d['email'] !== '' && !filter_var($d['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'That email address doesn\'t look right';
        if ($errors) {
            $this->validationError($errors);
            return;
        }
        $ip = $_SERVER['REMOTE_ADDR'] ?? null;
        $stmt = $db->prepare('SELECT COUNT(*) FROM learner_requests WHERE ip_address = ? AND created_at > (NOW() - INTERVAL 1 HOUR)');
        $stmt->execute([$ip]);
        if ((int) $stmt->fetchColumn() >= self::HOURLY_LIMIT) {
            $this->error('We already have your request - we will contact you soon.', 429);
            return;
        }
        $db->prepare(
            'INSERT INTO learner_requests (first_name, last_name, email, phone, level, gender, message, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        )->execute([$d['first_name'], $d['last_name'], $d['email'] ?: null, $d['phone'] ?: null, $d['level'], $d['gender'], $d['message'] ?: null, $ip]);
        $this->success([], 'Thank you - we will contact you.');
    }
}
