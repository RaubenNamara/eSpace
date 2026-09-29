<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\App\Utils\MimeType;

/**
 * Competency evidence portfolio (competency_evidence, migration 099): the files students attach
 * as evidence of a topic competency, and what kinds of file are accepted.
 */
class EvidenceService
{
    public const MAX_BYTES = 25 * 1024 * 1024;

    /** Accepted content types -> [kind, extension] */
    private const TYPES = [
        'image/jpeg' => ['image', 'jpg'],
        'image/png' => ['image', 'png'],
        'image/webp' => ['image', 'webp'],
        'image/gif' => ['image', 'gif'],
        'application/pdf' => ['pdf', 'pdf'],
        'audio/mpeg' => ['audio', 'mp3'],
        'audio/mp4' => ['audio', 'm4a'],
        'audio/x-m4a' => ['audio', 'm4a'],
        'audio/aac' => ['audio', 'aac'],
        'audio/ogg' => ['audio', 'ogg'],
        'audio/webm' => ['audio', 'webm'],
        'audio/wav' => ['audio', 'wav'],
        'audio/x-wav' => ['audio', 'wav'],
        'video/mp4' => ['video', 'mp4'],
        'video/webm' => ['video', 'webm'],
        'video/quicktime' => ['video', 'mov'],
    ];

    public static function available($db): bool
    {
        try {
            return (bool) $db->query("SHOW TABLES LIKE 'competency_evidence'")->fetch();
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Saves an uploaded file ($_FILES entry) - never trusting its name or claimed type.
     *
     * @return array{path: string, kind: string, original_name: string}|string the saved file, or an error message
     */
    public static function saveUpload(array $file, int $studentId): array|string
    {
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            return ($file['error'] ?? 0) === UPLOAD_ERR_INI_SIZE || ($file['error'] ?? 0) === UPLOAD_ERR_FORM_SIZE
                ? 'That file is too large'
                : 'The file did not upload - please try again';
        }
        if ((int) $file['size'] > self::MAX_BYTES) {
            return 'That file is too large - the limit is 25MB';
        }
        $mime = MimeType::detect((string) $file['tmp_name'], (string) ($file['name'] ?? ''));
        if (!isset(self::TYPES[$mime])) {
            return 'Please attach a photo, PDF, audio recording or short video';
        }
        [$kind, $extension] = self::TYPES[$mime];
        // A voice note recorded in the browser is a sound-only webm, which can be reported as video
        if ($kind === 'video' && $extension === 'webm' && str_starts_with((string) ($file['name'] ?? ''), 'voice-note')) {
            $kind = 'audio';
        }

        $dir = __DIR__ . '/../../public/uploads/evidence/';
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $name = 'evidence_' . $studentId . '_' . bin2hex(random_bytes(8)) . '_' . time() . '.' . $extension;
        if (!move_uploaded_file((string) $file['tmp_name'], $dir . $name)) {
            return 'The file could not be saved';
        }
        if ($kind === 'image' && @getimagesize($dir . $name) === false) {
            @unlink($dir . $name);
            return 'That picture could not be read';
        }
        return [
            'path' => '/uploads/evidence/' . $name,
            'kind' => $kind,
            'original_name' => mb_substr(basename((string) ($file['name'] ?? 'file')), 0, 255),
        ];
    }

    public static function deleteFile(?string $path): void
    {
        if ($path && str_starts_with($path, '/uploads/evidence/')) {
            @unlink(__DIR__ . '/../../public' . $path);
        }
    }
}
