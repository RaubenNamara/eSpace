<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * Splits a page's rich-text HTML into an ordered list of top-level "paragraph" blocks - used by
 * the eNotes AI Tutor walkthrough to narrate/explain one block at a time while highlighting it in
 * the rendered content.
 *
 * The frontend (see enotes.ts::splitContentBlocks) mirrors this exact same rule using the
 * browser's DOMParser, so a block's index here matches the index of the element it should
 * highlight on the page - keep the two in sync if this list ever changes.
 */
class HtmlBlockSplitter
{
    /** Only these top-level tags count as an explainable "paragraph" - headings are structural, not content to narrate. */
    private const BLOCK_TAGS = ['P', 'UL', 'OL', 'BLOCKQUOTE', 'TABLE'];

    /**
     * @return array<int, array{html: string, text: string}> Ordered blocks with non-trivial text.
     */
    public static function split(string $html): array
    {
        if (trim($html) === '') {
            return [];
        }

        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML('<?xml encoding="utf-8"?><div id="__root">' . $html . '</div>', LIBXML_NOERROR | LIBXML_NOWARNING);
        libxml_clear_errors();

        $root = $dom->getElementById('__root');
        if (!$root) {
            return [];
        }

        $blocks = [];
        foreach ($root->childNodes as $node) {
            if (!($node instanceof \DOMElement)) {
                continue;
            }
            if (!in_array(strtoupper($node->nodeName), self::BLOCK_TAGS, true)) {
                continue;
            }

            $text = preg_replace('/\s+/u', ' ', trim($node->textContent)) ?? '';
            if (mb_strlen($text) < 3) {
                continue;
            }

            $blocks[] = [
                'html' => $dom->saveHTML($node),
                'text' => $text,
            ];
        }

        return $blocks;
    }
}
