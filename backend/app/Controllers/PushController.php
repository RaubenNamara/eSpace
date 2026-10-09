<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\WebPushService;

/**
 * Browser notifications for the signed-in user (any role): the server's public key, and turning
 * notifications on or off for the current browser. See WebPushService.
 */
class PushController extends Controller
{
    /**
     * GET /push/public-key
     */
    public function publicKey(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $this->success(['public_key' => (new WebPushService())->keys()['public']]);
    }

    /**
     * POST /push/subscribe
     * body: the browser's PushSubscription JSON - { endpoint, keys: { p256dh, auth } }
     */
    public function subscribe(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $endpoint = (string) $this->input('endpoint');
        $keys = $this->input('keys');
        $p256dh = is_array($keys) ? (string) ($keys['p256dh'] ?? '') : '';
        $auth = is_array($keys) ? (string) ($keys['auth'] ?? '') : '';
        if (!preg_match('#^https://#', $endpoint) || strlen($endpoint) > 2000 || $p256dh === '' || $auth === ''
            || strlen(WebPushService::b64urlDecode($p256dh)) !== 65 || strlen(WebPushService::b64urlDecode($auth)) !== 16) {
            $this->validationError(['subscription' => 'Invalid push subscription']);
            return;
        }
        (new WebPushService())->subscribe(
            (int) $this->getCurrentUserId(),
            (string) $this->getCurrentUserRole(),
            $endpoint,
            $p256dh,
            $auth,
            $_SERVER['HTTP_USER_AGENT'] ?? null
        );
        $this->success([], 'Notifications are on for this device');
    }

    /**
     * POST /push/unsubscribe
     * body: { endpoint } - only the signed-in user's own registration is removed.
     */
    public function unsubscribe(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $endpoint = (string) $this->input('endpoint');
        if ($endpoint !== '') {
            (new WebPushService())->unsubscribe($endpoint, (int) $this->getCurrentUserId(), (string) $this->getCurrentUserRole());
        }
        $this->success([], 'Notifications are off for this device');
    }
}
