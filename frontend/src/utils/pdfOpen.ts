// Opens an uploaded PDF so pdf.js downloads only the parts it needs (the pages being read), not the
// whole file first.
//
// Why this is needed: pdf.js only reads a file in parts when the server's first reply carries a
// Content-Length. Uploaded files are sent by backend/public/file.php, and Apache's PHP-FPM
// connector drops that header from every PHP reply (checked on the live server: PHP-FPM sends it,
// Apache 2.4 mod_proxy_fcgi removes it), so pdf.js fell back to downloading the whole book before
// showing page 1 (24 MB and ~13 s for a large book in Uganda). Range replies (206) do arrive
// intact, with the file's full size in Content-Range - so the first piece is asked for here, the
// size is read from it, and pdf.js gets a range transport that fetches every further piece itself.
//
// One more thing makes a book slow to open over ranges: before showing anything pdf.js looks up
// every page's entry in the book's page list, one after another. In many scanned books those
// entries sit between the page pictures, spread across the whole file - one round trip each
// (~0.8 s from Uganda, so a 100-page scan would take over a minute). So the book's own index is
// read here first, and every block holding a page entry is fetched at once, side by side.

// Files are fetched in blocks of this size - pdf.js asks for pieces on the same boundaries
export const PDF_CHUNK = 64 * 1024
// The first piece: a PDF's header, and often its whole first page, fit in this
const FIRST_BLOCKS = 4
const RETRIES = 3
// Blocks this close together are fetched in one request, gap included
const MERGE_GAP = 2

type PdfjsLib = { PDFDataRangeTransport: new (length: number, initialData: Uint8Array | null) => any }

const latin1 = new TextDecoder('latin1')

/** Fetches byte blocks of one file, each block once, joining neighbours into one request */
class BlockStore {
  private blocks = new Map<number, Promise<Uint8Array>>()
  private controller = new AbortController()

  constructor(private url: string, readonly total: number, private credentials: RequestCredentials) {}

  get blockCount() { return Math.ceil(this.total / PDF_CHUNK) }

  put(index: number, data: Uint8Array) { this.blocks.set(index, Promise.resolve(data)) }

  abort() { this.controller.abort() }

  /** Starts fetching every listed block not already on its way */
  ensure(indexes: Iterable<number>) {
    const missing = [...new Set(indexes)].filter(i => i >= 0 && i < this.blockCount && !this.blocks.has(i)).sort((a, b) => a - b)
    let run: number[] = []
    const flush = () => {
      if (!run.length) return
      const from = run[0], to = run[run.length - 1]
      const all: number[] = []
      for (let i = from; i <= to; i++) if (!this.blocks.has(i)) all.push(i)
      const bytes = this.fetchRange(from * PDF_CHUNK, Math.min(this.total, (to + 1) * PDF_CHUNK))
      for (const i of all) {
        const block = bytes.then(b => b.subarray((i - from) * PDF_CHUNK, Math.min(b.length, (i - from + 1) * PDF_CHUNK)))
        // a failed block is forgotten, so the next read asks for it again
        block.catch(() => { if (this.blocks.get(i) === block) this.blocks.delete(i) })
        this.blocks.set(i, block)
      }
      run = []
    }
    for (const i of missing) {
      if (run.length && i - run[run.length - 1] > MERGE_GAP + 1) flush()
      run.push(i)
    }
    flush()
  }

  /** Bytes [begin, end) of the file */
  async read(begin: number, end: number): Promise<Uint8Array> {
    end = Math.min(end, this.total)
    const first = Math.floor(begin / PDF_CHUNK), last = Math.floor((end - 1) / PDF_CHUNK)
    const indexes = Array.from({ length: last - first + 1 }, (_, k) => first + k)
    this.ensure(indexes)
    const parts = await Promise.all(indexes.map(i => this.blocks.get(i)!))
    const out = new Uint8Array(end - begin)
    let at = 0
    parts.forEach((part, k) => {
      const blockStart = (first + k) * PDF_CHUNK
      const from = Math.max(begin, blockStart) - blockStart
      const to = Math.min(end, blockStart + part.length) - blockStart
      out.set(part.subarray(from, to), at)
      at += to - from
    })
    return out
  }

  private async fetchRange(begin: number, end: number, attempt = 1): Promise<Uint8Array> {
    try {
      const res = await fetch(this.url, { headers: { Range: `bytes=${begin}-${end - 1}` }, credentials: this.credentials, signal: this.controller.signal })
      if (res.status !== 206) {
        await res.body?.cancel().catch(() => {})
        throw new Error(`HTTP ${res.status}`)
      }
      return new Uint8Array(await res.arrayBuffer())
    } catch (e) {
      if (this.controller.signal.aborted || attempt >= RETRIES) throw e
      await new Promise(resolve => setTimeout(resolve, 800 * attempt))
      return this.fetchRange(begin, end, attempt + 1)
    }
  }
}

// ---- reading just enough of the PDF's structure to find its page entries ------------------------

/** Text of the file from `offset`, growing until `done` says it has enough (or a limit) */
async function textAt(store: BlockStore, offset: number, done: (s: string) => boolean, limit = 1024 * 1024): Promise<string> {
  let size = 4096
  for (;;) {
    const text = latin1.decode(await store.read(offset, offset + size))
    if (done(text) || size >= limit || offset + size >= store.total) return text
    size *= 4
  }
}

/** Object number -> byte offset, from the classic cross-reference table(s); null for an xref stream */
async function readXref(store: BlockStore, total: number): Promise<{ offsets: Map<number, number>; root: number } | null> {
  const tail = latin1.decode(await store.read(Math.max(0, total - 2048), total))
  const sx = tail.lastIndexOf('startxref')
  if (sx < 0) return null
  let xrefAt = parseInt(tail.slice(sx + 9).trim(), 10)
  const offsets = new Map<number, number>()
  let root = 0
  for (let hop = 0; hop < 8 && Number.isFinite(xrefAt) && xrefAt > 0 && xrefAt < total; hop++) {
    const text = await textAt(store, xrefAt, s => s.includes('trailer') && /trailer[\s\S]*?>>/.test(s), 8 * 1024 * 1024)
    if (!/^\s*xref/.test(text)) return null // a cross-reference stream: leave it to pdf.js
    const end = text.indexOf('trailer')
    const table = text.slice(0, end)
    const sectionRe = /(\d+)\s+(\d+)\s*[\r\n]+((?:\d{10}\s\d{5}\s[nf]\s*)+)/g
    for (let m; (m = sectionRe.exec(table));) {
      let num = parseInt(m[1], 10)
      for (const e of m[3].matchAll(/(\d{10})\s(\d{5})\s([nf])/g)) {
        if (e[3] === 'n' && !offsets.has(num)) offsets.set(num, parseInt(e[1], 10))
        num++
      }
    }
    const trailer = text.slice(end, text.indexOf('>>', end) + 2)
    if (!root) root = parseInt(trailer.match(/\/Root\s+(\d+)\s+\d+\s+R/)?.[1] ?? '0', 10)
    xrefAt = parseInt(trailer.match(/\/Prev\s+(\d+)/)?.[1] ?? 'NaN', 10)
  }
  return root ? { offsets, root } : null
}

/** The text of object `num`, up to its endobj (or a size limit) */
async function objectText(store: BlockStore, offsets: Map<number, number>, num: number): Promise<string> {
  const at = offsets.get(num)
  if (at === undefined) return ''
  const text = await textAt(store, at, s => s.includes('endobj') || s.includes('stream'), 512 * 1024)
  const stop = [text.indexOf('endobj'), text.indexOf('stream')].filter(i => i >= 0)
  return stop.length ? text.slice(0, Math.min(...stop)) : text
}

const refs = (s: string) => [...s.matchAll(/(\d+)\s+\d+\s+R/g)].map(m => parseInt(m[1], 10))

/** Fetches, side by side, every block holding an entry of the book's page list */
async function prefetchPageEntries(store: BlockStore, total: number) {
  const xref = await readXref(store, total)
  if (!xref) return
  const { offsets, root } = xref
  const catalog = await objectText(store, offsets, root)
  const pages = parseInt(catalog.match(/\/Pages\s+(\d+)\s+\d+\s+R/)?.[1] ?? '0', 10)
  let level = [pages]
  const seen = new Set<number>()
  for (let depth = 0; depth < 6 && level.length; depth++) {
    const kids: number[] = []
    // these nodes' blocks are all fetched at once by ensure(), then read
    store.ensure(level.map(n => Math.floor((offsets.get(n) ?? -PDF_CHUNK) / PDF_CHUNK)))
    const texts = await Promise.all(level.map(n => objectText(store, offsets, n)))
    for (const text of texts) {
      const list = text.match(/\/Kids\s*\[([^\]]*)\]/)?.[1]
      if (list) for (const k of refs(list)) if (!seen.has(k)) { seen.add(k); kids.push(k) }
    }
    if (!kids.length) break
    store.ensure(kids.map(k => Math.floor((offsets.get(k) ?? -PDF_CHUNK) / PDF_CHUNK)))
    // only page-tree nodes (with their own Kids) need another level; reading them waits for their blocks
    level = kids
  }
}

/**
 * What to hand pdf.js's getDocument() for this file (merge in your own options after it).
 * Falls back to a plain { url } load when the server doesn't answer the range request.
 */
export async function pdfSource(pdfjsLib: PdfjsLib, url: string, opts: { withCredentials?: boolean } = {}): Promise<Record<string, any>> {
  const credentials: RequestCredentials = opts.withCredentials ? 'include' : 'same-origin'
  const firstPiece = () => fetch(url, { headers: { Range: `bytes=0-${FIRST_BLOCKS * PDF_CHUNK - 1}` }, credentials })
  try {
    let res = await firstPiece()
    if (res.status === 200) {
      // The whole file came back instead of the piece. Cloudflare does this the first time it sees
      // a .pdf address (it tries to cache it, learns it's private, then passes ranges through) -
      // stop reading it and ask again, which gets the piece
      await res.body?.cancel().catch(() => {})
      res = await firstPiece()
      if (res.status === 200) {
        await res.body?.cancel().catch(() => {})
        // the server really doesn't do ranges: let pdf.js stream it, drawing page 1 as it arrives
        return { url, withCredentials: !!opts.withCredentials, rangeChunkSize: PDF_CHUNK }
      }
    }
    if (res.status === 206) {
      const total = Number((res.headers.get('Content-Range') || '').split('/')[1])
      const first = new Uint8Array(await res.arrayBuffer())
      if (Number.isFinite(total) && total > 0) {
        if (first.length >= total) return { data: first }
        const store = new BlockStore(url, total, credentials)
        for (let i = 0; i * PDF_CHUNK < first.length; i++) store.put(i, first.subarray(i * PDF_CHUNK, Math.min(first.length, (i + 1) * PDF_CHUNK)))
        // the end of the file (pdf.js reads it first, for the index) and the page entries, side by side
        store.ensure([store.blockCount - 1])
        void prefetchPageEntries(store, total).catch(() => {})

        const transport = new pdfjsLib.PDFDataRangeTransport(total, first)
        // pdf.js calls these: end is exclusive
        transport.requestDataRange = (begin: number, end: number) => {
          store.read(begin, end).then(bytes => transport.onDataRange(begin, bytes), () => {})
        }
        transport.abort = () => store.abort()
        return { range: transport, rangeChunkSize: PDF_CHUNK, disableAutoFetch: true, disableStream: true }
      }
    }
  } catch {
    // network trouble: let pdf.js try the plain way below, which reports its own error
  }
  return { url, withCredentials: !!opts.withCredentials, rangeChunkSize: PDF_CHUNK, disableAutoFetch: true, disableStream: true }
}
