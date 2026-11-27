<?php

declare(strict_types=1);

namespace eSpace\App\Support;

/**
 * Six-digit sign-in codes from an authenticator app (Google Authenticator, Microsoft
 * Authenticator, Authy...), the standard way (RFC 6238: a new code every 30 seconds from a shared
 * secret). Used as the second step of the developer portal's sign-in.
 */
final class Totp
{
    private const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    private const STEP = 30;

    /** A new random secret, in the base32 form the apps take */
    public static function newSecret(): string
    {
        $bytes = random_bytes(20);
        $bits = '';
        foreach (str_split($bytes) as $c) {
            $bits .= str_pad(decbin(ord($c)), 8, '0', STR_PAD_LEFT);
        }
        $out = '';
        foreach (str_split($bits, 5) as $chunk) {
            $out .= self::ALPHABET[bindec(str_pad($chunk, 5, '0'))];
        }
        return $out;
    }

    /** The otpauth:// address an app reads from the QR code */
    public static function uri(string $secret, string $account, string $issuer = 'Tusome developer portal'): string
    {
        return 'otpauth://totp/' . rawurlencode($issuer . ':' . $account)
            . '?secret=' . $secret . '&issuer=' . rawurlencode($issuer) . '&digits=6&period=' . self::STEP;
    }

    /**
     * The time step the code belongs to (this one, or one either side for a slow clock), or null
     * when it is wrong. The caller keeps the last step used, so one code can't be used twice.
     */
    public static function verify(string $secret, string $code, ?int $lastStep = null): ?int
    {
        $code = preg_replace('/\s+/', '', $code) ?? '';
        if (!preg_match('/^\d{6}$/', $code)) {
            return null;
        }
        $key = self::decode($secret);
        if ($key === '') {
            return null;
        }
        $now = intdiv(time(), self::STEP);
        foreach ([0, -1, 1] as $drift) {
            $step = $now + $drift;
            if ($lastStep !== null && $step <= $lastStep) {
                continue;
            }
            if (hash_equals(self::code($key, $step), $code)) {
                return $step;
            }
        }
        return null;
    }

    private static function code(string $key, int $step): string
    {
        $hash = hash_hmac('sha1', pack('N2', 0, $step), $key, true);
        $offset = ord($hash[19]) & 0x0f;
        $value = ((ord($hash[$offset]) & 0x7f) << 24) | (ord($hash[$offset + 1]) << 16)
            | (ord($hash[$offset + 2]) << 8) | ord($hash[$offset + 3]);
        return str_pad((string) ($value % 1000000), 6, '0', STR_PAD_LEFT);
    }

    private static function decode(string $secret): string
    {
        $secret = strtoupper(preg_replace('/[\s=]+/', '', $secret) ?? '');
        $bits = '';
        foreach (str_split($secret) as $c) {
            $i = strpos(self::ALPHABET, $c);
            if ($i === false) {
                return '';
            }
            $bits .= str_pad(decbin($i), 5, '0', STR_PAD_LEFT);
        }
        $out = '';
        foreach (str_split($bits, 8) as $byte) {
            if (strlen($byte) === 8) {
                $out .= chr(bindec($byte));
            }
        }
        return $out;
    }
}
