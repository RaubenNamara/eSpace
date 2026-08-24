<?php

namespace eSpace\App\Utils;

class HtmlSanitizer
{
    private static $allowedTags = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'b', 'em', 'i', 'u', 's', 'strike',
        'ul', 'ol', 'li',
        'blockquote',
        'pre', 'code',
        'a',
        'img',
        'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
        'div', 'span',
        'figure', 'figcaption',
        'iframe',
        'oembed'
    ];

    private static $allowedAttributes = [
        'href' => ['a'],
        'src' => ['img', 'iframe'],
        'alt' => ['img'],
        'title' => ['img', 'a'],
        'width' => ['img', 'iframe', 'td', 'th'],
        'height' => ['img', 'iframe', 'td', 'th'],
        'class' => ['*'],
        'style' => ['*'],
        'target' => ['a'],
        'rel' => ['a'],
        'colspan' => ['td', 'th'],
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
        'url' => ['oembed'],
        'data-oembed-url' => ['iframe', 'figure', 'oembed'],
        'data-oembed-type' => ['iframe', 'figure', 'oembed'],
        'data-oembed-provider' => ['iframe', 'figure', 'oembed']
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

        error_log('HtmlSanitizer: Input HTML (first 500 chars): ' . substr($html, 0, 500));
        error_log('HtmlSanitizer: Contains oembed: ' . (strpos($html, 'oembed') !== false ? 'YES' : 'NO'));
        error_log('HtmlSanitizer: Contains iframe: ' . (strpos($html, 'iframe') !== false ? 'YES' : 'NO'));

        // Remove dangerous content
        $html = self::removeScripts($html);
        $html = self::removeInlineStyles($html);
        $html = self::removeDangerousAttributes($html);
        
        // Sanitize HTML using DOMDocument
        $html = self::sanitizeWithDOM($html);
        
        // Final cleanup
        $html = self::cleanEmptyTags($html);
        
        error_log('HtmlSanitizer: Output HTML (first 500 chars): ' . substr($html, 0, 500));
        error_log('HtmlSanitizer: Output contains oembed: ' . (strpos($html, 'oembed') !== false ? 'YES' : 'NO'));
        error_log('HtmlSanitizer: Output contains iframe: ' . (strpos($html, 'iframe') !== false ? 'YES' : 'NO'));
        
        return $html;
    }

    private static function removeScripts(string $html): string
    {
        // Remove script tags and their content
        $html = preg_replace('#<script[^>]*>.*?</script>#is', '', $html);
        
        // Remove on* event handlers
        $html = preg_replace('/\s*on\w+\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/is', '', $html);
        
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
        $dangerousTags = ['script', 'style', 'object', 'embed', 'form', 'input', 'button'];
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
                
                if ($allowedForTag !== '*' && !in_array($tagName, $allowedForTag)) {
                    continue;
                }
                
                // Special handling for href/src
                if ($attrName === 'href' || $attrName === 'src') {
                    if (!self::isValidUrl($attrValue, $tagName)) {
                        continue;
                    }
                }
                
                $attributes[$attrName] = $attrValue;
            }
            
            // Remove all attributes and re-add allowed ones
            foreach ($element->attributes as $attr) {
                $element->removeAttribute($attr->name);
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
        
        $html = $dom->saveHTML();
        
        libxml_clear_errors();
        
        // Remove XML declaration and doctype
        $html = preg_replace('/^<!DOCTYPE[^>]*>/i', '', $html);
        $html = preg_replace('/^<\?xml[^>]*\?>/i', '', $html);
        
        // Remove the XML encoding that was added for loading
        $html = str_replace('<?xml encoding="UTF-8">', '', $html);
        
        return trim($html);
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

        // For img tags, allow relative URLs (starting with /)
        if ($tagName === 'img' && strpos($url, '/') === 0) {
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
