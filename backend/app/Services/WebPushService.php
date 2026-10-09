<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Web Push (browser notifications) with no external library - only ext-openssl and ext-curl.
 *
 *  - Subscriptions: a browser that turned notifications on registers its push endpoint and keys
 *    for the signed-in user (push_subscriptions).
 *  - Sending: NotificationService::notify() queues a push for the recipient; everything queued in a
 *    request is sent in parallel at the end of it, after the response has gone to the browser, so
 *    publishing to a class of 80 never waits on 80 push services.
 *  - Payloads are encrypted for each browser (RFC 8291, aes128gcm) and every request carries a
 *    VAPID signature (RFC 8292, ES256) made with the server key pair in web_push_keys, created
 *    on first use.
 * A browser whose subscription has gone (404/410 from its push service) is removed.
 */
class WebPushService
{
    /** @var array<int, array{user_id: int, role: string, payload: string}> */
    private static array $queue = [];
    private static bool $flushRegistered = false;

    private const TTL_SECONDS = 86400;

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    // ------------------------------------------------------------------ keys

    /** The server's VAPID key pair: ['public' => base64url raw P-256 point, 'pem' => private key PEM]. */
    public function keys(): array
    {
        $row = $this->getDb()->query('SELECT public_key, private_key_pem FROM web_push_keys WHERE id = 1')->fetch();
        if ($row) {
            return ['public' => $row['public_key'], 'pem' => $row['private_key_pem']];
        }
        $key = self::newEcKey();
        if (!openssl_pkey_export($key, $pem, null, self::opensslConfig())) {
            throw new \RuntimeException('Could not save the Web Push key pair');
        }
        $public = self::b64url($this->rawPublicKey($key));
        // INSERT IGNORE: if two requests race to create it, the first one wins and both use it
        $this->getDb()->prepare('INSERT IGNORE INTO web_push_keys (id, public_key, private_key_pem, created_at) VALUES (1, ?, ?, NOW())')
            ->execute([$public, $pem]);
        $row = $this->getDb()->query('SELECT public_key, private_key_pem FROM web_push_keys WHERE id = 1')->fetch();
        return ['public' => $row['public_key'], 'pem' => $row['private_key_pem']];
    }

    // ------------------------------------------------------------------ subscriptions

    /** Registers (or moves to this user) a browser's subscription. */
    public function subscribe(int $userId, string $role, string $endpoint, string $p256dh, string $auth, ?string $userAgent): void
    {
        $this->getDb()->prepare(
            'INSERT INTO push_subscriptions (user_id, user_role, endpoint, endpoint_hash, p256dh, auth, user_agent, created_at, updated_at)
             VALUES (:user_id, :role, :endpoint, :hash, :p256dh, :auth, :ua, NOW(), NOW())
             ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), user_role = VALUES(user_role), p256dh = VALUES(p256dh),
                                     auth = VALUES(auth), user_agent = VALUES(user_agent), updated_at = NOW()'
        )->execute([
            'user_id' => $userId,
            'role' => $role,
            'endpoint' => $endpoint,
            'hash' => hash('sha256', $endpoint),
            'p256dh' => $p256dh,
            'auth' => $auth,
            'ua' => $userAgent !== null ? mb_substr($userAgent, 0, 255) : null,
        ]);
    }

    /** Detaches a browser from whoever it was registered to (sign-out, or notifications turned off). */
    public function unsubscribe(string $endpoint, ?int $userId = null, ?string $role = null): void
    {
        $sql = 'DELETE FROM push_subscriptions WHERE endpoint_hash = ?';
        $params = [hash('sha256', $endpoint)];
        if ($userId !== null && $role !== null) {
            $sql .= ' AND user_id = ? AND user_role = ?';
            array_push($params, $userId, $role);
        }
        $this->getDb()->prepare($sql)->execute($params);
    }

    // ------------------------------------------------------------------ sending

    /** Queues a push to every device of one user; sent at the end of the request. */
    public static function queue(int $userId, string $role, string $title, string $body, string $url, ?string $tag = null): void
    {
        self::$queue[] = [
            'user_id' => $userId,
            'role' => $role,
            'payload' => json_encode(['title' => $title, 'body' => $body, 'url' => $url, 'tag' => $tag], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ];
        if (!self::$flushRegistered) {
            self::$flushRegistered = true;
            register_shutdown_function([self::class, 'flushAfterResponse']);
        }
    }

    /** Shutdown hook: hand the response to the browser first, then send. Never throws. */
    public static function flushAfterResponse(): void
    {
        try {
            if (session_status() === PHP_SESSION_ACTIVE) {
                session_write_close();
            }
            if (function_exists('fastcgi_finish_request')) {
                fastcgi_finish_request();
            } elseif (function_exists('litespeed_finish_request')) {
                litespeed_finish_request();
            }
            ignore_user_abort(true);
            @set_time_limit(120);
            (new self())->flush();
        } catch (\Throwable $e) {
            error_log('WebPush: ' . $e->getMessage());
        }
    }

    /** Sends everything queued so far. Returns [sent, failed, removed] counts. */
    public function flush(): array
    {
        $queue = self::$queue;
        self::$queue = [];
        if (!$queue) {
            return [0, 0, 0];
        }

        // Each recipient's devices, looked up once
        $byUser = [];
        foreach ($queue as $q) {
            $byUser[$q['role'] . ':' . $q['user_id']] = [$q['user_id'], $q['role']];
        }
        $subs = [];
        $stmt = $this->getDb()->prepare('SELECT id, endpoint, p256dh, auth FROM push_subscriptions WHERE user_id = ? AND user_role = ?');
        foreach ($byUser as $key => [$userId, $role]) {
            $stmt->execute([$userId, $role]);
            $subs[$key] = $stmt->fetchAll();
        }

        $keys = $this->keys();
        $jwtCache = [];
        $multi = curl_multi_init();
        $handles = [];
        foreach ($queue as $q) {
            foreach ($subs[$q['role'] . ':' . $q['user_id']] ?? [] as $sub) {
                try {
                    $origin = self::origin($sub['endpoint']);
                    $jwtCache[$origin] ??= $this->vapidJwt($origin, $keys['pem']);
                    $body = $this->encrypt($q['payload'], $sub['p256dh'], $sub['auth']);
                } catch (\Throwable $e) {
                    error_log('WebPush encrypt: ' . $e->getMessage());
                    continue;
                }
                $ch = curl_init($sub['endpoint']);
                curl_setopt_array($ch, [
                    CURLOPT_POST => true,
                    CURLOPT_POSTFIELDS => $body,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_TIMEOUT => 15,
                    CURLOPT_CONNECTTIMEOUT => 8,
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/octet-stream',
                        'Content-Encoding: aes128gcm',
                        'TTL: ' . self::TTL_SECONDS,
                        'Urgency: normal',
                        'Authorization: vapid t=' . $jwtCache[$origin] . ', k=' . $keys['public'],
                    ],
                ]);
                curl_multi_add_handle($multi, $ch);
                $handles[] = [$ch, (int) $sub['id']];
            }
        }

        do {
            $status = curl_multi_exec($multi, $running);
            if ($running) {
                curl_multi_select($multi, 1.0);
            }
        } while ($running && $status === CURLM_OK);

        $sent = $failed = 0;
        $gone = [];
        $ok = [];
        foreach ($handles as [$ch, $subId]) {
            $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
            if ($code >= 200 && $code < 300) {
                $sent++;
                $ok[] = $subId;
            } else {
                $failed++;
                if ($code === 404 || $code === 410) {
                    $gone[] = $subId;
                } else {
                    error_log("WebPush: push service answered {$code}: " . substr((string) curl_multi_getcontent($ch), 0, 200));
                }
            }
            curl_multi_remove_handle($multi, $ch);
            curl_close($ch);
        }
        curl_multi_close($multi);

        if ($gone) {
            $this->getDb()->exec('DELETE FROM push_subscriptions WHERE id IN (' . implode(',', array_map('intval', $gone)) . ')');
        }
        if ($ok) {
            $this->getDb()->exec('UPDATE push_subscriptions SET last_success_at = NOW() WHERE id IN (' . implode(',', array_map('intval', $ok)) . ')');
        }
        return [$sent, $failed, count($gone)];
    }

    // ------------------------------------------------------------------ RFC 8291 / 8292

    /** Encrypts a payload for one browser: salt | rs | idlen | server public key | ciphertext. */
    public function encrypt(string $payload, string $p256dhB64, string $authB64): string
    {
        $uaPublic = self::b64urlDecode($p256dhB64);
        $authSecret = self::b64urlDecode($authB64);
        if (strlen($uaPublic) !== 65 || strlen($authSecret) !== 16) {
            throw new \InvalidArgumentException('Malformed subscription keys');
        }

        $local = self::newEcKey();
        $asPublic = $this->rawPublicKey($local);
        $shared = openssl_pkey_derive(openssl_pkey_get_public(self::publicKeyPem($uaPublic)), $local, 32);
        if ($shared === false) {
            throw new \RuntimeException('ECDH failed');
        }

        $ikm = hash_hkdf('sha256', $shared, 32, "WebPush: info\0" . $uaPublic . $asPublic, $authSecret);
        $salt = random_bytes(16);
        $cek = hash_hkdf('sha256', $ikm, 16, "Content-Encoding: aes128gcm\0", $salt);
        $nonce = hash_hkdf('sha256', $ikm, 12, "Content-Encoding: nonce\0", $salt);

        $tag = '';
        // One record, ending with the 0x02 last-record delimiter
        $cipher = openssl_encrypt($payload . "\x02", 'aes-128-gcm', $cek, OPENSSL_RAW_DATA, $nonce, $tag, '', 16);
        if ($cipher === false) {
            throw new \RuntimeException('Encryption failed');
        }
        return $salt . pack('N', 4096) . chr(65) . $asPublic . $cipher . $tag;
    }

    /**
     * A new P-256 key. Some PHP builds (XAMPP on Windows) can't find openssl.cnf and fail to
     * create keys at all, so it retries with the config files such installs ship with.
     */
    private static function newEcKey()
    {
        $args = ['private_key_type' => OPENSSL_KEYTYPE_EC, 'curve_name' => 'prime256v1'];
        $key = @openssl_pkey_new($args + self::opensslConfig());
        if ($key === false) {
            throw new \RuntimeException('Could not create a P-256 key: ' . (openssl_error_string() ?: 'openssl unavailable'));
        }
        return $key;
    }

    /** ['config' => path] when PHP's default openssl.cnf is unusable (XAMPP on Windows), else []. */
    private static function opensslConfig(): array
    {
        static $config = null;
        if ($config !== null) {
            return $config;
        }
        $args = ['private_key_type' => OPENSSL_KEYTYPE_EC, 'curve_name' => 'prime256v1'];
        if (@openssl_pkey_new($args) !== false) {
            return $config = [];
        }
        $phpDir = dirname(PHP_BINARY);
        $candidates = [getenv('OPENSSL_CONF') ?: '', $phpDir . '/extras/ssl/openssl.cnf', dirname($phpDir) . '/php/extras/ssl/openssl.cnf',
            dirname($phpDir) . '/apache/conf/openssl.cnf', 'C:/xampp/php/extras/ssl/openssl.cnf'];
        foreach ($candidates as $cnf) {
            if ($cnf !== '' && is_file($cnf) && @openssl_pkey_new($args + ['config' => $cnf]) !== false) {
                return $config = ['config' => $cnf];
            }
        }
        return $config = [];
    }

    /** VAPID JWT for one push service origin, signed ES256 with the server key. */
    private function vapidJwt(string $audience, string $privatePem): string
    {
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $claims = ['aud' => $audience, 'exp' => time() + 12 * 3600, 'sub' => 'https://' . preg_replace('/[^A-Za-z0-9.\-:]/', '', $host)];
        $input = self::b64url(json_encode(['typ' => 'JWT', 'alg' => 'ES256'])) . '.' . self::b64url(json_encode($claims, JSON_UNESCAPED_SLASHES));
        if (!openssl_sign($input, $der, openssl_pkey_get_private($privatePem), OPENSSL_ALGO_SHA256)) {
            throw new \RuntimeException('VAPID signing failed');
        }
        return $input . '.' . self::b64url(self::derToRawSignature($der));
    }

    /** Uncompressed P-256 point (0x04 | X | Y) of an EC key. */
    private function rawPublicKey($key): string
    {
        $d = openssl_pkey_get_details($key)['ec'];
        return "\x04" . str_pad($d['x'], 32, "\0", STR_PAD_LEFT) . str_pad($d['y'], 32, "\0", STR_PAD_LEFT);
    }

    /** PEM (SubjectPublicKeyInfo) for a raw uncompressed P-256 point. */
    private static function publicKeyPem(string $raw): string
    {
        $der = hex2bin('3059301306072a8648ce3d020106082a8648ce3d030107034200') . $raw;
        return "-----BEGIN PUBLIC KEY-----\n" . chunk_split(base64_encode($der), 64, "\n") . "-----END PUBLIC KEY-----\n";
    }

    /** ECDSA DER signature (SEQUENCE of two INTEGERs) to the 64-byte r|s form JWT uses. */
    private static function derToRawSignature(string $der): string
    {
        $pos = 2;
        if ((ord($der[1]) & 0x80) !== 0) {
            $pos += ord($der[1]) & 0x7f;
        }
        $out = '';
        for ($i = 0; $i < 2; $i++) {
            $len = ord($der[$pos + 1]);
            $int = ltrim(substr($der, $pos + 2, $len), "\0");
            $out .= str_pad($int, 32, "\0", STR_PAD_LEFT);
            $pos += 2 + $len;
        }
        return $out;
    }

    private static function origin(string $url): string
    {
        $p = parse_url($url);
        return $p['scheme'] . '://' . $p['host'] . (isset($p['port']) ? ':' . $p['port'] : '');
    }

    public static function b64url(string $bin): string
    {
        return rtrim(strtr(base64_encode($bin), '+/', '-_'), '=');
    }

    public static function b64urlDecode(string $s): string
    {
        return (string) base64_decode(strtr($s, '-_', '+/') . str_repeat('=', (4 - strlen($s) % 4) % 4));
    }

    // ------------------------------------------------------------------ links

    /**
     * Where tapping the notification should go - the same places the in-app bell opens
     * (frontend NotificationPanel.vue routeForNotification(); keep the two in step).
     */
    public static function urlFor(string $type, ?array $data, string $role): string
    {
        $base = '/' . ($role === 'super_admin' ? 'admin' : $role);
        $data = $data ?? [];
        return match ($type) {
            'new_live_class' => $base . '/live-classes?join=' . rawurlencode((string) ($data['live_class_id'] ?? '')),
            'new_assessment' => $base . '/assignments/' . (int) ($data['assignment_id'] ?? 0) . '/answer',
            'assignment_graded' => $base . '/assignments/' . (int) ($data['assignment_id'] ?? 0) . '/result/' . (int) ($data['submission_id'] ?? 0),
            'new_enote' => $base . '/enotes/' . (int) ($data['topic_id'] ?? 0),
            'new_video', 'new_video_resource' => $base . '/videos',
            'new_library_resource' => $base . '/library',
            'new_item_bank_resource' => $base . '/itembank',
            'report_card_ready' => $base . '/reports',
            'new_virtual_lab' => $base . '/virtual-lab/' . (int) ($data['assignment_id'] ?? 0),
            default => $base . '/dashboard',
        };
    }
}
