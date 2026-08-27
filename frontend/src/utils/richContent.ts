import { resolveAssetUrl } from './url'

// Rich-content post-processing shared by the note/topic viewers - CKEditor content sometimes
// references a YouTube video in a form browsers can't render on their own: a CKEditor media-embed
// <oembed url="..."> placeholder (real example seen in authored content: youtu.be short links,
// which the old teacher-preview regex didn't match since it only handled the watch?v= form), or
// just a plain <a href> / bare text link from pasting a URL instead of using the media tool.
const YOUTUBE_HOST_PATTERN = '(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtube\\.com\\/shorts\\/|youtu\\.be\\/)'
const OEMBED_YOUTUBE_RE = new RegExp(
  `<oembed\\b[^>]*\\burl="https?:\\/\\/${YOUTUBE_HOST_PATTERN}([a-zA-Z0-9_-]{6,})[^"]*"[^>]*>(?:\\s*<\\/oembed>)?`,
  'gi'
)
const ANCHOR_YOUTUBE_RE = new RegExp(
  `<a\\b[^>]*href="https?:\\/\\/${YOUTUBE_HOST_PATTERN}([a-zA-Z0-9_-]{6,})[^"]*"[^>]*>([\\s\\S]*?)<\\/a>`,
  'gi'
)
const BARE_YOUTUBE_RE = new RegExp(
  `(?<!["'=])(https?:\\/\\/${YOUTUBE_HOST_PATTERN}([a-zA-Z0-9_-]{6,})[^\\s<"']*)`,
  'gi'
)

function embedHtml(videoId: string): string {
  return `<span class="yt-embed"><iframe src="https://www.youtube.com/embed/${videoId}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></span>`
}

/** Turns any YouTube reference (oembed placeholder, anchor, or bare text URL) found in rendered HTML into an inline playable embed, once per distinct video. */
export function autoEmbedYoutube(html: string): string {
  if (!html || !html.includes('youtu')) return html || ''

  const seen = new Set<string>()

  // oembed placeholders carry no visible content worth keeping - replace outright.
  let out = html.replace(OEMBED_YOUTUBE_RE, (_match, videoId) => {
    if (seen.has(videoId)) return ''
    seen.add(videoId)
    return embedHtml(videoId)
  })

  out = out.replace(ANCHOR_YOUTUBE_RE, (match, videoId) => {
    if (seen.has(videoId)) return match
    seen.add(videoId)
    return `${match}${embedHtml(videoId)}`
  })

  out = out.replace(BARE_YOUTUBE_RE, (match, _url, videoId) => {
    if (seen.has(videoId)) return match
    seen.add(videoId)
    return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>${embedHtml(videoId)}`
  })

  return out
}

const SRC_ATTR_RE = /\ssrc="(\/uploads\/[^"]*)"/gi

/**
 * Rewrites root-relative /uploads/... src attributes (img/source/etc.) embedded in saved eNote
 * HTML to include the /eSpace/ base path, the same way resolveAssetUrl() does for every other
 * backend-provided file reference. Content saved before CKEditor.vue's upload adapter baked the
 * base path in itself (or any future content that ends up storing a bare path some other way)
 * would otherwise 404 against the domain root instead of /eSpace/uploads/... - this is a
 * render-time safety net so existing eNotes don't show broken images/GIFs.
 */
export function resolveContentAssetUrls(html: string): string {
  if (!html || !html.includes('/uploads/')) return html || ''
  return html.replace(SRC_ATTR_RE, (_match, path) => ` src="${resolveAssetUrl(path)}"`)
}

// Only these top-level tags count as an explainable "paragraph" for the AI Tutor walkthrough -
// must match backend\app\Utils\HtmlBlockSplitter::BLOCK_TAGS exactly, so a block's narrationIndex
// here lines up with the paragraph_index the backend narrates against.
const BLOCK_TAGS = new Set(['P', 'UL', 'OL', 'BLOCKQUOTE', 'TABLE'])

// Top-level media the backend never narrates (images/GIFs render as <figure>, YouTube as the
// <span class="yt-embed"> wrapper from autoEmbedYoutube(), Vimeo as a bare <iframe>). These used
// to be silently dropped entirely from the student view because they aren't in BLOCK_TAGS -
// they're still not narratable, but they must still be displayed, so they're kept as
// narrationIndex: null entries instead of being excluded from the split.
const isMediaElement = (el: Element): boolean =>
  el.tagName === 'FIGURE' || el.tagName === 'IFRAME' || (el.tagName === 'SPAN' && el.classList.contains('yt-embed'))

export interface ContentBlock {
  html: string
  // Index into the backend's narration paragraph list, or null if this block is media that was
  // never narrated (and so has no AI Tutor highlight/scroll target).
  narrationIndex: number | null
}

/**
 * Splits rendered page HTML into the ordered list of top-level blocks the AI Tutor walkthrough
 * renders - "paragraph" blocks (P/UL/OL/BLOCKQUOTE/TABLE with non-trivial text), which mirror
 * HtmlBlockSplitter::split() so narrationIndex lines up with the backend's paragraph_index, plus
 * media blocks (figure/iframe/YouTube embed) interleaved in document order for display only.
 */
export function splitContentBlocks(html: string): ContentBlock[] {
  if (!html || !html.trim()) return []

  const container = document.createElement('div')
  container.innerHTML = html

  const blocks: ContentBlock[] = []
  let narrationIndex = 0
  for (const el of Array.from(container.children)) {
    if (BLOCK_TAGS.has(el.tagName)) {
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim()
      if (text.length < 3) continue
      blocks.push({ html: el.outerHTML, narrationIndex: narrationIndex++ })
    } else if (isMediaElement(el)) {
      blocks.push({ html: el.outerHTML, narrationIndex: null })
    }
  }

  return blocks
}
