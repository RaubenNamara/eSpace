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

// Only these top-level tags count as an explainable "paragraph" for the AI Tutor walkthrough -
// must match backend\app\Utils\HtmlBlockSplitter::BLOCK_TAGS exactly, so a block's index here
// lines up with the paragraph_index the backend narrates against.
const BLOCK_TAGS = new Set(['P', 'UL', 'OL', 'BLOCKQUOTE', 'TABLE'])

/**
 * Splits rendered page HTML into the same ordered list of top-level "paragraph" blocks the
 * backend generated AI Tutor narration for - used to wrap each block in its own highlightable
 * element. Mirrors HtmlBlockSplitter::split()'s rule (top-level P/UL/OL/BLOCKQUOTE/TABLE with
 * non-trivial text) using the browser's own HTML parser instead of PHP's DOMDocument.
 */
export function splitContentBlocks(html: string): string[] {
  if (!html || !html.trim()) return []

  const container = document.createElement('div')
  container.innerHTML = html

  const blocks: string[] = []
  for (const el of Array.from(container.children)) {
    if (!BLOCK_TAGS.has(el.tagName)) continue
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim()
    if (text.length < 3) continue
    blocks.push(el.outerHTML)
  }

  return blocks
}
