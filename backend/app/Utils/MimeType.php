<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * Detects an uploaded file's MIME type from its contents. Uses the fileinfo
 * extension when the server has it; some shared hosts ship PHP without it,
 * so we fall back to sniffing the file's magic bytes for the types the app
 * accepts. The original filename is only used to tell apart formats that
 * share a container (docx vs pptx, doc vs ppt, mp4 video vs m4a audio) —
 * never on its own, so a renamed file can't slip through.
 */
class MimeType
{
    public static function detect(string $path, ?string $originalName = null): string
    {
        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            if ($finfo !== false) {
                $mime = finfo_file($finfo, $path);
                finfo_close($finfo);
                if (is_string($mime) && $mime !== '') {
                    return $mime;
                }
            }
        }

        return self::sniff($path, $originalName);
    }

    private static function sniff(string $path, ?string $originalName): string
    {
        $head = @file_get_contents($path, false, null, 0, 64);
        if ($head === false || $head === '') {
            return 'application/octet-stream';
        }

        $ext = strtolower(pathinfo((string) $originalName, PATHINFO_EXTENSION));

        if (str_starts_with($head, "\xFF\xD8\xFF")) {
            return 'image/jpeg';
        }
        if (str_starts_with($head, "\x89PNG\r\n\x1A\n")) {
            return 'image/png';
        }
        if (str_starts_with($head, 'GIF87a') || str_starts_with($head, 'GIF89a')) {
            return 'image/gif';
        }
        if (str_starts_with($head, 'RIFF') && substr($head, 8, 4) === 'WEBP') {
            return 'image/webp';
        }
        if (str_starts_with($head, 'RIFF') && substr($head, 8, 4) === 'WAVE') {
            return 'audio/x-wav';
        }
        if (str_starts_with($head, '%PDF-')) {
            return 'application/pdf';
        }
        if (str_starts_with($head, "\x1A\x45\xDF\xA3")) {
            return $ext === 'weba' ? 'audio/webm' : 'video/webm';
        }
        if (str_starts_with($head, 'OggS')) {
            return in_array($ext, ['ogv'], true) ? 'video/ogg' : 'audio/ogg';
        }
        if (substr($head, 4, 4) === 'ftyp') {
            $brand = substr($head, 8, 4);
            if ($brand === 'qt  ') {
                return 'video/quicktime';
            }
            if ($brand === 'M4A ' || $ext === 'm4a') {
                return 'audio/mp4';
            }
            return 'video/mp4';
        }
        if (str_starts_with($head, 'ID3') || (strlen($head) > 1 && ord($head[0]) === 0xFF && (ord($head[1]) & 0xE0) === 0xE0)) {
            return 'audio/mpeg';
        }
        if (str_starts_with($head, "PK\x03\x04")) {
            return match ($ext) {
                'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                default => 'application/zip',
            };
        }
        if (str_starts_with($head, "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1")) {
            return match ($ext) {
                'doc' => 'application/msword',
                'ppt' => 'application/vnd.ms-powerpoint',
                default => 'application/octet-stream',
            };
        }
        $trimmed = ltrim($head);
        if ($trimmed !== '' && ($trimmed[0] === '{' || $trimmed[0] === '[') && $ext === 'json') {
            return 'application/json';
        }

        return 'application/octet-stream';
    }
}
