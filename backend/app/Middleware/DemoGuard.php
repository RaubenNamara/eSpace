<?php

declare(strict_types=1);

namespace eSpace\App\Middleware;

use eSpace\App\Services\DemoSchool;

/**
 * Keeps demo visitors (DemoSchool) from changing what the next visitor would find, or from
 * reaching anyone real. Run before every request (public/index.php). Reading is always allowed,
 * and so is the everyday work a visitor wants to try - answering an assessment, marking, writing
 * an eNote, posting work - since the whole school is wiped and rebuilt every week. Turned off:
 *   - passwords, sign-in details, profiles and photos; admins, staff and learner records; school settings
 *   - anything uploaded (files would be seen by every visitor until the night's reset)
 *   - chat messages and anything that sends email, SMS or push to a real address
 *   - the AI features (report remarks, explanations, narration), which cost money per use
 */
final class DemoGuard
{
    private const BLOCKED = [
        '#/auth/(change-password|password|register|reset|forgot)#',
        '#/settings(/|$)#',
        '#/(profile|password|photo|avatar)#',
        '#/admin/(users|admins|teachers|students|hods|bulk-enrol|promotion|parent-links|settings|report-cards/visibility|academic-years|terms|classes|subjects|departments|backup|permissions)#',
        '#/chat/#',
        '#/(push|subscribe|notifications/push|send)#',
        '#(generate|tutor|explain|narrat|tts|speech|gemini|/ai[-/])#',
    ];

    /** 401 when the visit has ended (the app then signs out), else 403 */
    public static int $status = 403;

    /** The message to stop the request with, or null to let it through */
    public static function check(): ?string
    {
        if (!DemoSchool::inDemo()) {
            return null;
        }
        // the demo link has ended: the visit ends too
        if (!empty($_SESSION['demo_until']) && time() > (int) $_SESSION['demo_until']) {
            session_unset();
            session_destroy();
            self::$status = 401;
            return 'Your demo link has ended. Ask us for a new one on the Tusome website.';
        }
        $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
        if (in_array($method, ['GET', 'HEAD', 'OPTIONS'], true)) {
            return null;
        }
        $path = (string) parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH);
        $path = substr($path, (int) strpos($path, '/api/'));
        if (preg_match('#^/api/auth/logout#', $path)) {
            return null;
        }
        if (!empty($_FILES)) {
            return 'Uploading files is turned off in the demo school. At your own school, it works here.';
        }
        foreach (self::BLOCKED as $re) {
            if (preg_match($re, $path)) {
                return 'This is turned off in the demo school, so the next visitor finds it as you did. At your own school, it works here.';
            }
        }
        return null;
    }
}
