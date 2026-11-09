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
