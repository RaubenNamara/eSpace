<?php

namespace eSpace\App\Utils;

class HtmlSanitizer
{
    private static $allowedTags = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del', 'ins', 'small',
        // Superscript/subscript and highlighter (CKEditor's highlight is <mark class="marker-...">)
        'sub', 'sup', 'mark',
        // To-do lists: <label><input type="checkbox" disabled> ...</label> (see the input rules below)
        'label', 'input',
        'ul', 'ol', 'li',
        'blockquote',
        'pre', 'code',
        'a',
        'img',
        'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
        'div', 'span',
        'figure', 'figcaption',
        'iframe',
        'oembed',
        'video'
    ];

    private static $allowedAttributes = [
        'href' => ['a'],
        'src' => ['img', 'iframe', 'video'],
        'alt' => ['img'],
        'title' => ['img', 'a'],
        'width' => ['img', 'iframe', 'td', 'th'],
        'height' => ['img', 'iframe', 'td', 'th'],
        'class' => ['*'],
        'style' => ['*'],
        'target' => ['a'],
        'rel' => ['a'],
        'colspan' => ['td', 'th'],
        'span' => ['col', 'colgroup'],
        'start' => ['ol'],
        'reversed' => ['ol'],
        'type' => ['input'],
        'checked' => ['input'],
        'disabled' => ['input'],
        'rowspan' => ['td', 'th'],
        'align' => ['td', 'th', 'p', 'div'],
        'valign' => ['td', 'th'],
        'border' => ['table'],
        'cellpadding' => ['table'],
        'cellspacing' => ['table'],
        'allowfullscreen' => ['iframe'],
        'frameborder' => ['iframe'],
        'scrolling' => ['iframe'],
        'allow' => ['iframe'],
        'loading' => ['img'],
        'controls' => ['video'],
        'preload' => ['video'],
        'url' => ['oembed'],
        'data-oembed-url' => ['iframe', 'figure', 'oembed'],
        'data-oembed-type' => ['iframe', 'figure', 'oembed'],
        'data-oembed-provider' => ['iframe', 'figure', 'oembed']
    ];

    // CSS properties kept in style="" - what the editor's font colour/background, size, family,
    // alignment, indent, list style, image size and table/cell properties produce. Anything else
    // (position, url(), expression() and the like) is dropped.
    private static $allowedStyleProperties = [
        'color', 'background-color',
        'font-size', 'font-family', 'font-weight', 'font-style', 'text-decoration', 'text-decoration-line',
        'text-align', 'text-indent', 'line-height', 'letter-spacing', 'vertical-align', 'white-space',
        'margin-left', 'margin-right', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom',
        'list-style-type',
        'width', 'height', 'max-width', 'min-width', 'aspect-ratio', 'float',
        'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
        'border-color', 'border-style', 'border-width', 'border-collapse', 'border-spacing'
    ];

    private static $allowedProtocols = ['http', 'https', 'mailto', 'tel'];

    private static $allowedIframeDomains = [
        'www.youtube.com',
        'youtube.com',
        'player.vimeo.com',
        'vimeo.com',
        'www.dailymotion.com',
        'dailymotion.com'
    ];

    public static function sanitize(string $html): string
    {
        if (empty($html)) {
            return '';
        }

        // Remove dangerous content
        $html = self::removeScripts($html);
        $html = self::removeInlineStyles($html);
        $html = self::removeDangerousAttributes($html);

        // Sanitize HTML using DOMDocument
        $html = self::sanitizeWithDOM($html);

        // Final cleanup
        $html = self::cleanEmptyTags($html);

        return $html;
    }

    private static function removeScripts(string $html): string
    {
        // Remove script tags and their content
        $html = preg_replace('#<script[^>]*>.*?</script>#is', '', $html);
        
        // Remove on* event handlers - requires at least one real whitespace character before
        // "on" (not just \s* which can match zero characters and start matching "on" wherever it
        // happens to occur, including mid-word) so this doesn't also delete legitimate attributes
        // that merely contain "on" as a substring, like <video controls> - "c[on]trols" was
        // matching as "ontrols=" and getting stripped, silently breaking every video's controls.
        $html = preg_replace('/\s+on\w+\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/is', '', $html);
        
        // Remove javascript: protocol
        $html = preg_replace('/\s*href\s*=\s*("|\')javascript:[^"\']*("|\')/is', '', $html);
        
        return $html;
    }

    private static function removeInlineStyles(string $html): string
    {
        // Remove style tags
        $html = preg_replace('#<style[^>]*>.*?</style>#is', '', $html);
        
        return $html;
    }

    private static function removeDangerousAttributes(string $html): string
    {
        $dangerousAttrs = [
            'onload', 'onerror', 'onclick', 'ondblclick', 'onmousedown', 'onmouseup',
            'onmouseover', 'onmousemove', 'onmouseout', 'onfocus', 'onblur',
            'onkeypress', 'onkeydown', 'onkeyup', 'onsubmit', 'onreset',
            'onchange', 'onselect', 'data-', 'formaction'
        ];

        foreach ($dangerousAttrs as $attr) {
            $html = preg_replace('/\s*' . preg_quote($attr, '/') . '\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/is', '', $html);
        }

        return $html;
    }

    private static function sanitizeWithDOM(string $html): string
    {
        libxml_use_internal_errors(true);
        
        $dom = new \DOMDocument();
        
        // Load HTML with UTF-8 encoding
        $html = '<?xml encoding="UTF-8">' . $html;
        $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        
        $xpath = new \DOMXPath($dom);
        
        // Remove script tags
        $scripts = $xpath->query('//script');
        foreach ($scripts as $script) {
            $script->parentNode->removeChild($script);
        }
        
        // Remove style tags
        $styles = $xpath->query('//style');
        foreach ($styles as $style) {
            $style->parentNode->removeChild($style);
        }
        
        // Remove dangerous elements
        $dangerousTags = ['script', 'style', 'object', 'embed', 'form', 'button', 'select', 'textarea'];
        foreach ($dangerousTags as $tag) {
            $elements = $xpath->query('//' . $tag);
            foreach ($elements as $element) {
                $element->parentNode->removeChild($element);
            }
        }
        
        // Sanitize remaining elements
        $allElements = $xpath->query('//*');
        foreach ($allElements as $element) {
            $tagName = strtolower($element->tagName);
            
            // Check if tag is allowed
            if (!in_array($tagName, self::$allowedTags)) {
                // Remove disallowed tags but keep content
                $fragment = $dom->createDocumentFragment();
                while ($element->hasChildNodes()) {
                    $fragment->appendChild($element->firstChild);
                }
                $element->parentNode->replaceChild($fragment, $element);
                continue;
            }
            
            // Sanitize attributes
            $attributes = [];
            foreach ($element->attributes as $attr) {
                $attrName = strtolower($attr->name);
                $attrValue = $attr->value;
                
                // Skip dangerous attributes
                if (preg_match('/^on/i', $attrName) || strpos($attrName, 'data-') === 0) {
                    continue;
                }
                
                // Check if attribute is allowed for this tag
                $allowedForTag = self::$allowedAttributes[$attrName] ?? null;
                if ($allowedForTag === null) {
                    continue;
                }
                
                if (!in_array('*', $allowedForTag, true) && !in_array($tagName, $allowedForTag, true)) {
                    continue;
                }

                if ($attrName === 'style') {
                    $attrValue = self::sanitizeStyle($attrValue);
                    if ($attrValue === '') {
                        continue;
                    }
                }
                
                // Special handling for href/src
                if ($attrName === 'href' || $attrName === 'src') {
                    if (!self::isValidUrl($attrValue, $tagName)) {
                        continue;
                    }
                }
                
                $attributes[$attrName] = $attrValue;
            }
            
            // Remove all attributes and re-add allowed ones (names collected first - removing while
            // iterating the live attribute list skips every other one)
            $names = [];
            foreach ($element->attributes as $attr) {
                $names[] = $attr->name;
            }
            foreach ($names as $name) {
                $element->removeAttribute($name);
            }

            // The only input kept is a to-do list's checkbox, and it can't be ticked by a reader
            if ($tagName === 'input') {
                if (strtolower($attributes['type'] ?? '') !== 'checkbox') {
                    $element->parentNode->removeChild($element);
                    continue;
                }
                $attributes['disabled'] = 'disabled';
            }
            
            foreach ($attributes as $name => $value) {
                $element->setAttribute($name, $value);
            }
            
            // Add rel="noopener noreferrer" to external links
            if ($tagName === 'a' && isset($attributes['href'])) {
                $href = $attributes['href'];
                if (self::isExternalUrl($href)) {
                    $element->setAttribute('rel', 'noopener noreferrer');
                    $element->setAttribute('target', '_blank');
                }
            }
        }

        // Drop <img>/<video> elements left with no src (e.g. an upload placeholder CKEditor
        // inserted that never resolved to a real URL) - nothing to render without one.
        $emptyImages = $xpath->query('//img[not(@src) or normalize-space(@src) = ""] | //video[not(@src) or normalize-space(@src) = ""]');
        foreach ($emptyImages as $img) {
            $img->parentNode->removeChild($img);
        }

        // A <figure> whose only content was the removed <img>/<oembed> is now an empty
        // shell (e.g. <figure></figure>) with nothing to render - drop it too.
        $emptyFigures = $xpath->query('//figure[not(*) and normalize-space(text()) = ""]');
        foreach ($emptyFigures as $figure) {
            $figure->parentNode->removeChild($figure);
        }

        // Defensive cleanup: a <figure> should never be nested directly inside another <figure>
        // (CKEditor never emits this itself, but malformed pasted HTML via Source Editing could).
        // Unwrap the outer wrapper so the image/media isn't boxed twice.
        $nestedFigures = $xpath->query('//figure[parent::figure]');
        foreach ($nestedFigures as $innerFigure) {
            $outerFigure = $innerFigure->parentNode;
            if ($outerFigure && $outerFigure->parentNode) {
                $outerFigure->parentNode->replaceChild($innerFigure, $outerFigure);
            }
        }

        $html = $dom->saveHTML();
        
        libxml_clear_errors();
        
        // Remove XML declaration and doctype
        $html = preg_replace('/^<!DOCTYPE[^>]*>/i', '', $html);
        $html = preg_replace('/^<\?xml[^>]*\?>/i', '', $html);
        
        // Remove the XML encoding that was added for loading
        $html = str_replace('<?xml encoding="UTF-8">', '', $html);
        
        return trim($html);
    }

    // Keeps only the allowed CSS properties, and none whose value could load or run anything
    private static function sanitizeStyle(string $style): string
    {
        $kept = [];
        foreach (explode(';', $style) as $declaration) {
            $parts = explode(':', $declaration, 2);
            if (count($parts) !== 2) {
                continue;
            }
            $property = strtolower(trim($parts[0]));
            $value = trim($parts[1]);
            if ($value === '' || !in_array($property, self::$allowedStyleProperties, true)) {
                continue;
            }
            if (preg_match('/url\s*\(|expression\s*\(|javascript:|behavior|-moz-binding|@import|[<>]/i', $value) || strpos($value, '\\') !== false) {
                continue;
            }
            $kept[] = $property . ':' . $value;
        }
        return $kept ? implode(';', $kept) . ';' : '';
    }

    private static function isValidUrl(string $url, string $tagName): bool
    {
        if (empty($url)) {
            return false;
        }

        // For iframes, check against allowed domains
        if ($tagName === 'iframe') {
            $parsed = parse_url($url);
            if ($parsed === false) {
                return false;
            }
            
            $host = strtolower($parsed['host'] ?? '');
            foreach (self::$allowedIframeDomains as $allowedDomain) {
                if ($host === $allowedDomain || strpos($host, '.' . $allowedDomain) !== false) {
                    return true;
                }
            }
            
            return false;
        }

        // For img/video tags, allow relative URLs (starting with /) - both are always uploaded
        // files served from this app's own backend, never an arbitrary external host.
        if (($tagName === 'img' || $tagName === 'video') && strpos($url, '/') === 0) {
            return true;
        }

        // For other tags, check protocol
        $parsed = parse_url($url);
        if ($parsed === false) {
            return false;
        }

        $scheme = strtolower($parsed['scheme'] ?? '');
        if (!in_array($scheme, self::$allowedProtocols)) {
            return false;
        }

        return true;
    }

    private static function isExternalUrl(string $url): bool
    {
        $parsed = parse_url($url);
        if ($parsed === false) {
            return false;
        }

        $host = strtolower($parsed['host'] ?? '');
        $currentHost = strtolower($_SERVER['HTTP_HOST'] ?? '');

        return $host !== '' && $host !== $currentHost;
    }

    private static function cleanEmptyTags(string $html): string
    {
        // Remove empty p tags
        $html = preg_replace('/<p[^>]*>\s*<\/p>/i', '', $html);
        
        // Remove multiple consecutive br tags
        $html = preg_replace('/(<br\s*\/?>\s*){2,}/i', '<br>', $html);
        
        return $html;
    }

    public static function stripAllTags(string $html): string
    {
        return strip_tags($html);
    }

    public static function escape(string $string): string
    {
        return htmlspecialchars($string, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
}
