import DOMPurify from 'dompurify'

/**
 * Teacher-written HTML (questions, scenarios, instructions) made safe to show with v-html: scripts,
 * event handlers (onerror=...) and javascript: links are removed, so a hijacked teacher account
 * can't run code in every student's browser. Formatting, tables, images, maths (MathML) and links
 * stay; links open in a new tab.
 */
DOMPurify.addHook('afterSanitizeAttributes', node => {
  if (node.tagName === 'A' && node.getAttribute('href')) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

export function safeHtml(html?: string | null): string {
  return html ? DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }) : ''
}

// Embedded players a teacher may put in rich content; any other iframe is removed
const PLAYER_HOSTS = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com|dailymotion\.com)\//i
DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  if (data.tagName === 'iframe' && !PLAYER_HOSTS.test((node as Element).getAttribute?.('src') || '')) {
    node.parentNode?.removeChild(node)
  }
})

/**
 * Like safeHtml, for whole pages of teacher-written notes: also keeps YouTube/Vimeo players and
 * the editor's <oembed url="..."> video placeholders (autoEmbedYoutube turns those into players
 * afterwards - clean first, then embed).
 */
export function safeRichHtml(html?: string | null): string {
  return html
    ? DOMPurify.sanitize(html, {
        ADD_TAGS: ['iframe', 'oembed'],
        ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'frameborder', 'url', 'loading'],
      })
    : ''
}

// Formatted chat messages: only what the chat toolbar makes (the server, ChatHtml.php, already
// cleaned it to this list - cleaned again here so a message never runs anything in the browser)
const CHAT_TAGS = ['p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre', 'ul', 'ol', 'li', 'blockquote', 'hr', 'a']
export function safeChatHtml(html?: string | null): string {
  return html
    ? DOMPurify.sanitize(html, { ALLOWED_TAGS: CHAT_TAGS, ALLOWED_ATTR: ['href', 'target', 'rel'], ALLOWED_URI_REGEXP: /^(?:https?:\/\/|mailto:)/i })
    : ''
}
