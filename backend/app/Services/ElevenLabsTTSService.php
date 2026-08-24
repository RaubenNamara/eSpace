<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\Config\Config;
use RuntimeException;

/**
 * ElevenLabs Text-to-Speech Client
 *
 * Thin wrapper around ElevenLabs' /v1/text-to-speech/{voice_id} endpoint
 * (https://elevenlabs.io/docs/api-reference/text-to-speech/convert), used to generate AI voice
 * narration for eNotes pages. Every public method throws \RuntimeException with a clear message
 * on failure (including when ELEVENLABS_API_KEY hasn't been configured yet), so controllers can
 * catch it and surface a friendly error rather than crashing.
 *
 * The short slugs below ('rachel', 'bella', 'antoni', 'josh') are what's stored in the database
 * and shown in the UI; ELEVEN_LABS_VOICE_IDS maps each to ElevenLabs' actual (opaque) voice_id.
 */
class ElevenLabsTTSService
{
    /** Voice slugs exposed to teachers: 2 female (sarah, bella), 2 male (george, daniel) */
    public const VOICES = ['sarah', 'bella', 'george', 'daniel'];

    /**
     * Premade voice IDs confirmed available via this account's API access (Voice Library
     * voices are blocked on the free tier - these are the account's own default/premade set,
     * fetched from GET /v1/voices).
     */
    private const ELEVEN_LABS_VOICE_IDS = [
        'sarah' => 'EXAVITQu4vr4xnSDxMaL',
        'bella' => 'hpp4J3VqNfWAUOO0d1Us',
        'george' => 'JBFqnCBsd6RMkjVDRZzb',
        'daniel' => 'onwK4e9ZLuTAKqWW03F9',
    ];

    /** Stay comfortably under ElevenLabs' practical per-request text length. */
    private const MAX_CHARS = 4500;

    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = Config::getElevenLabsConfig()['api_key'];
    }

    public function isConfigured(): bool
    {
        return $this->apiKey !== '';
    }

    /**
     * Strip HTML (eNotes page content is rich-text) down to plain, speakable text - tags removed,
     * entities decoded, whitespace collapsed, then capped to a safe input length.
     */
    public function htmlToSpeechText(string $html): string
    {
        $text = strip_tags($html);
        $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
        $text = preg_replace('/\s+/u', ' ', $text) ?? $text;
        $text = trim($text);

        if (mb_strlen($text) > self::MAX_CHARS) {
            $text = mb_substr($text, 0, self::MAX_CHARS);
        }

        return $text;
    }

    /**
     * Generate narration audio (MP3 bytes) for $text in the given voice.
     */
    public function synthesize(string $text, string $voice): string
    {
        if (!$this->isConfigured()) {
            throw new RuntimeException('AI voice narration is not configured yet. Set ELEVENLABS_API_KEY in backend/.env.');
        }

        if (!in_array($voice, self::VOICES, true)) {
            throw new RuntimeException('Invalid voice selected.');
        }

        if (trim($text) === '') {
            throw new RuntimeException('This page has no readable text to narrate.');
        }

        if (!function_exists('curl_init')) {
            throw new RuntimeException('The PHP curl extension is required for AI voice narration.');
        }

        $voiceId = self::ELEVEN_LABS_VOICE_IDS[$voice];

        $ch = curl_init("https://api.elevenlabs.io/v1/text-to-speech/{$voiceId}");
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_HTTPHEADER => [
                'xi-api-key: ' . $this->apiKey,
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode([
                'text' => $text,
                'model_id' => 'eleven_multilingual_v2',
                'output_format' => 'mp3_44100_128',
            ]),
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            throw new RuntimeException("Could not reach ElevenLabs: {$error}");
        }

        if ($httpCode !== 200) {
            $message = 'AI voice generation failed';
            $decoded = json_decode((string) $response, true);
            if (is_array($decoded) && isset($decoded['detail'])) {
                $detail = $decoded['detail'];
                $message = is_array($detail) ? ($detail['message'] ?? $message) : $detail;
            }
            throw new RuntimeException($message);
        }

        if ($contentType && !str_starts_with($contentType, 'audio/')) {
            throw new RuntimeException('Unexpected response from ElevenLabs TTS.');
        }

        return $response;
    }
}
