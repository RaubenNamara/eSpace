<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * Formatted chat messages (bold, italic, underline, strikethrough, code, lists, quotes, separators
 * and links - the chat composer's toolbar). The browser sends HTML from the editor; nothing of it
 * is trusted: it is rebuilt here from a short list of tags with no attributes at all, except a
 * link's address (http, https or mailto only). Everything else - scripts, styles, event handlers,
 * iframes, images, forms - is dropped; unknown wrappers keep only their text.
 *
 * clean() also says whether anything is formatted: a message that is only paragraphs and line
 * breaks is stored as plain text, exactly as before.
 */
final class ChatHtml
{
    /** Stored HTML longer than this is refused (a long message is a few KB) */
    public const MAX_HTML = 20000;
    /** Plain text longer than this is refused */
    public const MAX_TEXT = 8000;

    /** tag => the tag it is stored as */
    private const TAGS = [
        'p' => 'p', 'div' => 'p', 'br' => 'br',
        'strong' => 'strong', 'b' => 'strong',
        'em' => 'em', 'i' => 'em',
        'u' => 'u',
        's' => 's', 'strike' => 's', 'del' => 's',
        'code' => 'code', 'pre' => 'pre',
        'ul' => 'ul', 'ol' => 'ol', 'li' => 'li',
        'blockquote' => 'blockquote',
        'hr' => 'hr',
        'a' => 'a',
    ];

    /** removed together with everything inside them */
    private const DROP = ['script', 'style', 'iframe', 'frame', 'frameset', 'object', 'embed', 'applet', 'svg', 'math',
        'template', 'noscript', 'textarea', 'select', 'option', 'button', 'input', 'form', 'img', 'video', 'audio',
        'source', 'track', 'canvas', 'link', 'meta', 'base', 'head', 'title', 'xml'];

    private const VOID = ['br', 'hr'];
    private const MAX_DEPTH = 12;

    /**
     * @return array{html: ?string, text: string} html is null when nothing is formatted; text is
     *         the message as plain text (lists as "- " / "1. ", quotes as "> ") for previews,
     *         notifications, search and anything that shows plain text.
     */
    public static function clean(string $html): array
    {
        $html = trim($html);
        if ($html === '') {
            return ['html' => null, 'text' => ''];
        }
        if (strlen($html) > self::MAX_HTML * 2) {
            throw new \InvalidArgumentException('This message is too long.');
        }

        $doc = new \DOMDocument();
        $prev = libxml_use_internal_errors(true);
        // the XML encoding hint makes libxml read the text as UTF-8; LIBXML_NONET: never fetch anything
        $doc->loadHTML('<?xml encoding="UTF-8"?><div id="chat-root">' . $html . '</div>', LIBXML_NONET | LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();
        libxml_use_internal_errors($prev);

        $root = null;
        foreach ($doc->getElementsByTagName('div') as $div) {
            if ($div->getAttribute('id') === 'chat-root') {
                $root = $div;
                break;
            }
        }
        if (!$root) {
            return ['html' => null, 'text' => ''];
        }

        $out = new \DOMDocument('1.0', 'UTF-8');
        $wrap = $out->createElement('div');
        $out->appendChild($wrap);
        $formatted = false;
        self::copyChildren($root, $wrap, $out, 0, $formatted);

        $clean = '';
        foreach ($wrap->childNodes as $child) {
            $clean .= $out->saveHTML($child);
        }
        $clean = trim($clean);
        $text = self::toText($wrap);

        if (mb_strlen($text) > self::MAX_TEXT || strlen($clean) > self::MAX_HTML) {
            throw new \InvalidArgumentException('This message is too long.');
        }
        // nothing but paragraphs and line breaks: plain text, stored the old way
        return ['html' => $formatted && $text !== '' ? $clean : null, 'text' => $text];
    }

    private static function copyChildren(\DOMNode $from, \DOMNode $to, \DOMDocument $out, int $depth, bool &$formatted): void
    {
        foreach (iterator_to_array($from->childNodes) as $node) {
            if ($node instanceof \DOMText) {
                $to->appendChild($out->createTextNode($node->nodeValue ?? ''));
                continue;
            }
            if (!$node instanceof \DOMElement) {
                continue; // comments, processing instructions
            }
            $name = strtolower($node->nodeName);
            if (in_array($name, self::DROP, true)) {
                continue;
            }
            $tag = self::TAGS[$name] ?? null;
            if ($tag === null || $depth >= self::MAX_DEPTH) {
                // an unknown wrapper (span, h1, table...): keep its text, not the tag
                self::copyChildren($node, $to, $out, $depth, $formatted);
                continue;
            }
            $el = $out->createElement($tag);
            if ($tag === 'a') {
                $href = self::safeHref($node->getAttribute('href'));
                if ($href === null) {
                    self::copyChildren($node, $to, $out, $depth, $formatted); // a link to nowhere safe: just its text
                    continue;
                }
                $el->setAttribute('href', $href);
                $el->setAttribute('target', '_blank');
                $el->setAttribute('rel', 'noopener noreferrer nofollow');
            }
            if (!in_array($tag, ['p', 'br'], true)) {
                $formatted = true;
            }
            if (!in_array($tag, self::VOID, true)) {
                self::copyChildren($node, $el, $out, $depth + 1, $formatted);
            }
            $to->appendChild($el);
        }
    }

    /** An http(s) or mailto address, or null; "www.x.org" becomes https:// */
    public static function safeHref(string $href): ?string
    {
        $href = trim(html_entity_decode($href, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        // control characters and spaces inside a scheme ("java\tscript:") are how filters are fooled
        $href = preg_replace('/[\x00-\x20\x7f]+/u', '', $href) ?? '';
        if ($href === '' || strlen($href) > 2000) {
            return null;
        }
        if (preg_match('/^www\./i', $href)) {
            $href = 'https://' . $href;
        }
        if (preg_match('#^mailto:[^@\s]+@[^@\s]+$#i', $href)) {
            return $href;
        }
        if (!preg_match('#^https?://#i', $href)) {
            return null;
        }
        $host = parse_url($href, PHP_URL_HOST);
        return is_string($host) && $host !== '' ? $href : null;
    }

    /** The message as plain text, keeping its shape: lines, "- " and "1. " list items, "> " quotes */
    private static function toText(\DOMNode $node): string
    {
        $lines = [];
        self::textLines($node, $lines, '');
        $text = implode("\n", $lines);
        $text = preg_replace("/\n{3,}/", "\n\n", $text) ?? $text;
        return trim($text);
    }

    private static function textLines(\DOMNode $node, array &$lines, string $prefix): void
    {
        $inline = '';
        $flush = function () use (&$inline, &$lines, $prefix) {
            if (trim($inline) !== '') {
                foreach (explode("\n", $inline) as $l) {
                    $lines[] = $prefix . rtrim($l);
                }
            }
            $inline = '';
        };
        $n = 0;
        foreach ($node->childNodes as $child) {
            $name = $child instanceof \DOMElement ? strtolower($child->nodeName) : '#text';
            switch ($name) {
                case '#text':
                    $inline .= $child->nodeValue;
                    break;
                case 'br':
                    $inline .= "\n";
                    break;
                case 'p':
                case 'pre':
                    $flush();
                    self::textLines($child, $lines, $prefix);
                    break;
                case 'blockquote':
                    $flush();
                    self::textLines($child, $lines, $prefix . '> ');
                    break;
                case 'hr':
                    $flush();
                    $lines[] = $prefix . '---';
                    break;
                case 'ul':
                case 'ol':
                    $flush();
                    $i = 0;
                    foreach ($child->childNodes as $li) {
                        if ($li instanceof \DOMElement && strtolower($li->nodeName) === 'li') {
                            $i++;
                            $before = count($lines);
                            self::textLines($li, $lines, $prefix . '   ');
                            $marker = $name === 'ol' ? "{$i}. " : '- ';
                            if (isset($lines[$before])) {
                                $lines[$before] = $prefix . $marker . ltrim(substr($lines[$before], strlen($prefix)));
                            } else {
                                $lines[] = $prefix . $marker;
                            }
                        }
                    }
                    break;
                default:
                    // inline formatting (strong, em, u, s, code, a): its text, in line
                    $inline .= $child->textContent;
            }
            $n++;
        }
        $flush();
    }
}
