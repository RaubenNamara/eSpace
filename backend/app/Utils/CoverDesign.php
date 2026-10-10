<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * A book cover designed in eSpace (the eNote cover templates, used for eLibrary books too):
 * template, colour, an optional picture, and the words on the cover. Turns what the editor sends
 * into the stored JSON, or null when it isn't a valid design.
 */
class CoverDesign
{
    public const TEMPLATES = ['portrait', 'classic', 'split', 'exercise'];

    /**
     * @param mixed    $cover        what the editor sent
     * @param string[] $imagePrefixes the upload folders a cover picture may come from
     */
    public static function normalize($cover, array $imagePrefixes): ?string
    {
        if (!is_array($cover)) {
            return null;
        }
        $template = $cover['template'] ?? 'portrait';
        if (!in_array($template, self::TEMPLATES, true)) {
            return null;
        }
        $color = $cover['color'] ?? '';
        if (!is_string($color) || !preg_match('/^#[0-9a-fA-F]{6}$/', $color)) {
            return null;
        }

        $image = $cover['image'] ?? null;
        if ($image !== null && $image !== '') {
            $ok = false;
            foreach ($imagePrefixes as $prefix) {
                if (is_string($image) && preg_match('#^' . preg_quote($prefix, '#') . '[A-Za-z0-9._-]+$#', $image)) {
                    $ok = true;
                    break;
                }
            }
            if (!$ok) {
                return null;
            }
        } else {
            $image = null;
        }

        $text = static function ($value, int $max): string {
            $value = is_string($value) ? trim(strip_tags($value)) : '';
            return mb_substr($value, 0, $max);
        };

        return json_encode([
            'template' => $template,
            'color' => strtolower($color),
            'image' => $image,
            'title' => $text($cover['title'] ?? '', 120),
            'author' => $text($cover['author'] ?? '', 80),
            'year' => $text($cover['year'] ?? '', 10),
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
}
