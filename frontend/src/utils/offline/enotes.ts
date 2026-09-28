import { reactive } from 'vue'
import axios from 'axios'
import { idbAll, idbDelete, idbGet, idbPut } from './db'
import { resolveAssetUrl } from '@/utils/url'

// Offline copies of a student's eNotes. Downloading a topic keeps, on this device:
//   - the topic and its pages exactly as the reader receives them (IndexedDB)
//   - the pictures in its pages and on its cover, and optionally its Read Aloud audio (Cache Storage)
//   - the student's own page notes and highlights
// When the network is unavailable, offline/adapter.ts answers the reader's requests from here.
// A copy lasts DAYS_KEPT days and is renewed (or updated, or removed if the teacher unpublished
// the topic) whenever the shelf loads online.

export const DAYS_KEPT = 30
export const DAY = 24 * 60 * 60 * 1000
export const ASSET_CACHE = 'espace-offline-files'

export interface DownloadMeta {
  id: number
  userId: number
  title: string
  subject_name?: string
  subject_code?: string
  total_pages: number
  contentVersion: string | null
  downloadedAt: number
  expiresAt: number
  bytes: number
  audio: boolean
  hasAudio: boolean
  // The topic's row from the shelf's list, so the shelf can show it while offline
  listRow: any
}

interface DownloadRecord extends DownloadMeta {
  topic: any
  assets: string[]
  pageIds: number[]
}

export const offline = reactive({
  online: typeof navigator === 'undefined' ? true : navigator.onLine,
  ready: false,
  downloads: {} as Record<number, DownloadMeta>,
  // 0..1 while a topic is downloading
  progress: {} as Record<number, number>,
  // Saved eLibrary / Item Bank PDFs (see offline/docs.ts), keyed 'library:12' / 'itembank:7'
  docs: {} as Record<string, any>,
  docProgress: {} as Record<string, number>,
  // Changes made offline that haven't reached the server yet
  pending: 0
})

// Other kinds of saved copies (offline/docs.ts) load alongside the eNotes
const initHooks: ((uid: number | null, records: any[]) => Promise<void>)[] = []
export const onInitDownloads = (hook: (uid: number | null, records: any[]) => Promise<void>) => { initHooks.push(hook) }

// Which downloaded topic each page belongs to (to keep a page's note/highlights current)
const pageTopic = new Map<number, number>()

export function currentUserId(): number | null {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return user?.id ? Number(user.id) : null
  } catch {
    return null
  }
}

const metaOf = (r: DownloadRecord): DownloadMeta => {
  const { topic: _t, assets: _a, pageIds: _p, ...meta } = r
  return meta
}

/** Loads this student's downloads into `offline` and drops any that have expired */
export async function initDownloads() {
  const uid = currentUserId()
  pageTopic.clear()
  const downloads: Record<number, DownloadMeta> = {}
  let all: any[] = []
  if (uid) {
    try {
      all = await idbAll<any>('topics')
      for (const r of all as DownloadRecord[]) {
        // PDFs are offline/docs.ts's
        if (r.userId !== uid || (r as any).kind) continue
        if (r.expiresAt < Date.now()) {
          await removeTopic(r.id, r)
          continue
        }
        downloads[r.id] = metaOf(r)
        r.pageIds.forEach(p => pageTopic.set(p, r.id))
      }
    } catch {
      // IndexedDB unavailable (private window) - nothing downloaded
    }
  }
  offline.downloads = downloads
  for (const hook of initHooks) await hook(uid, all).catch(() => {})
  loadedFor = uid
  offline.ready = true
}

export const isDownloaded = (id: number) => !!offline.downloads[id]
export const topicOfPage = (pageId: number) => pageTopic.get(pageId) ?? null
export const downloadedPageIds = () => [...pageTopic.keys()]

// Whose downloads are loaded - another student signing in on this device gets their own
let loadedFor: number | null = null
export async function ensureUser() {
  if (!offline.ready || loadedFor !== currentUserId()) await initDownloads()
}

async function getRecord(id: number): Promise<DownloadRecord | null> {
  const r = await idbGet<DownloadRecord>('topics', id).catch(() => undefined)
  return r && r.userId === currentUserId() ? r : null
}

// ---- files (pictures, audio) ------------------------------------------------------------------

export const absolute = (path: string) => new URL(resolveAssetUrl(path), location.origin).href

/** Uploaded files a topic's pages and cover point at (pictures; audio when asked for) */
function assetsOf(topic: any, withAudio: boolean): string[] {
  const found = new Set<string>()
  const add = (path?: string | null) => {
    if (!path || /^(data:|blob:)/i.test(path)) return
    try {
      const url = new URL(path, location.origin)
      if (url.origin === location.origin && url.pathname.includes('/uploads/')) found.add(path)
    } catch { /* not a URL */ }
  }
  const cover = parseMaybeJson(topic.cover_design)
  add(cover?.image)
  for (const page of topic.pages || []) {
    const html: string = page.content || ''
    // Pictures (and audio clips) inside the page - not videos, which are too big to keep
    for (const m of html.matchAll(/<(?:img|source|audio)\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/gi)) {
      if (!/\.(mp4|webm|mov|m4v|avi)(\?|$)/i.test(m[1])) add(m[1])
    }
    if (withAudio) add(page.narration_audio_path)
  }
  return [...found]
}

export const plain = <T>(value: T): T => (value == null ? value : JSON.parse(JSON.stringify(value)))

export function parseMaybeJson(raw: unknown): any {
  if (!raw) return null
  if (typeof raw === 'object') return raw
  try { return JSON.parse(String(raw)) } catch { return null }
}

async function fetchAssets(paths: string[], onEach: () => void): Promise<{ kept: string[]; bytes: number }> {
  if (typeof caches === 'undefined') return { kept: [], bytes: 0 }
  const cache = await caches.open(ASSET_CACHE)
  const kept: string[] = []
  let bytes = 0
  for (const path of paths) {
    try {
      const url = absolute(path)
      let response = await cache.match(url)
      if (!response) {
        const fresh = await fetch(url, { credentials: 'same-origin' })
        // A missing file can come back as the app's own page (text/html) rather than a 404
        if (fresh.ok && !/text\/html|application\/json/i.test(fresh.headers.get('content-type') || '')) {
          await cache.put(url, fresh.clone())
          response = fresh
        }
      }
      if (response) {
        bytes += (await response.clone().blob()).size
        kept.push(path)
      }
    } catch {
      // A missing picture isn't worth failing the download over - the reader hides broken images
    }
    onEach()
  }
  return { kept, bytes }
}

// Blob URLs for kept files, made once per session
const blobUrls = new Map<string, string>()

export async function blobUrl(path: string): Promise<string | null> {
  const url = absolute(path)
  const known = blobUrls.get(url)
  if (known) return known
  if (typeof caches === 'undefined') return null
  const response = await caches.match(url, { cacheName: ASSET_CACHE }).catch(() => undefined)
  if (!response) return null
  const made = URL.createObjectURL(await response.blob())
  blobUrls.set(url, made)
  return made
}

/** The topic as the reader expects it, with its files pointing at the copies on this device */
export async function offlineTopic(id: number): Promise<any | null> {
  const r = await getRecord(id)
  if (!r) return null
  const topic = JSON.parse(JSON.stringify(r.topic))
  const swap: [string, string][] = []
  for (const path of r.assets) {
    const local = await blobUrl(path)
    if (local) swap.push([path, local])
  }
  const local = (path?: string | null) => (path && swap.find(([p]) => p === path)?.[1]) || null

  for (const page of topic.pages || []) {
    let html: string = page.content || ''
    for (const [path, url] of swap) html = html.split(`"${path}"`).join(`"${url}"`).split(`'${path}'`).join(`'${url}'`)
    page.content = html
    // Audio that wasn't downloaded can't play offline - hide Read Aloud rather than fail
    page.narration_audio_path = local(page.narration_audio_path)
  }
  topic.cover_design = await localCover(topic.cover_design)
  return topic
}

async function localCover(raw: unknown) {
  const cover = parseMaybeJson(raw)
  if (!cover?.image) return raw
  const local = await blobUrl(cover.image)
  const next = { ...cover, image: local }
  return typeof raw === 'string' ? JSON.stringify(next) : next
}

/** The shelf's topic list while offline: only the downloaded topics, covers from this device */
export async function offlineTopicList(): Promise<{ topics: any[]; subjects: any[] }> {
  const saved = await idbGet<any>('kv', `enotes:list:${currentUserId()}`).catch(() => undefined)
  const topics: any[] = []
  for (const meta of Object.values(offline.downloads)) {
    const row = { ...meta.listRow }
    row.cover_design = await localCover(row.cover_design)
    topics.push(row)
  }
  return { topics, subjects: saved?.subjects || [] }
}

// ---- downloading ------------------------------------------------------------------------------

/**
 * Keeps a copy of a topic on this device. `listRow` is the topic's row from the shelf (kept so the
 * shelf can show it offline); `fresh` is the topic's data when it's already at hand.
 */
export async function downloadTopic(id: number, options: { audio: boolean; listRow: any; fresh?: any }) {
  const uid = currentUserId()
  if (!uid || offline.progress[id] !== undefined) return
  offline.progress[id] = 0
  // Plain copies - the shelf's rows are Vue reactive objects, which IndexedDB can't store
  options = { ...options, listRow: plain(options.listRow), fresh: options.fresh && plain(options.fresh) }
  try {
    // The browser may otherwise clear stored copies when space runs low
    navigator.storage?.persist?.().catch(() => {})

    const topic = options.fresh ?? (await axios.get(`/api/student/enotes/topics/${id}`, { offlineBypass: true } as any)).data.data
    const pages: any[] = topic.pages || []
    const assets = assetsOf(topic, options.audio)
    const steps = assets.length + pages.length + 1
    let done = 0
    const tick = () => { offline.progress[id] = Math.min(0.99, ++done / steps) }

    const { kept, bytes } = await fetchAssets(assets, tick)

    // The student's own notes and highlights for every page
    let userBytes = 0
    for (const page of pages) {
      try {
        const [note, highlights] = await Promise.all([
          axios.get(`/api/student/enotes/pages/${page.id}/note`, { offlineBypass: true } as any),
          axios.get(`/api/student/enotes/pages/${page.id}/highlights`, { offlineBypass: true } as any)
        ])
        if (note.data?.success) await idbPut('kv', note.data.data, `note:${uid}:${page.id}`)
        if (highlights.data?.success) await idbPut('kv', highlights.data.data.highlights || [], `hl:${uid}:${page.id}`)
        userBytes += JSON.stringify(note.data).length + JSON.stringify(highlights.data).length
      } catch { /* the page still reads without them */ }
      tick()
    }

    const record: DownloadRecord = {
      id,
      userId: uid,
      title: topic.title,
      subject_name: topic.subject_name ?? options.listRow?.subject_name,
      subject_code: topic.subject_code ?? options.listRow?.subject_code,
      total_pages: pages.length,
      contentVersion: topic.content_version ?? options.listRow?.content_version ?? null,
      downloadedAt: Date.now(),
      expiresAt: Date.now() + DAYS_KEPT * DAY,
      bytes: bytes + userBytes + JSON.stringify(topic).length,
      audio: options.audio,
      hasAudio: pages.some(p => !!p.narration_audio_path),
      listRow: { ...(options.listRow || {}), content_version: topic.content_version ?? options.listRow?.content_version },
      topic,
      assets: kept,
      pageIds: pages.map(p => p.id)
    }
    // Files the old copy had that this one no longer uses
    const previous = await getRecord(id)
    await idbPut('topics', record)
    if (previous) await dropUnusedAssets(previous.assets)

    record.pageIds.forEach(p => pageTopic.set(p, id))
    offline.downloads[id] = metaOf(record)
  } finally {
    delete offline.progress[id]
  }
}

export async function removeTopic(id: number, known?: DownloadRecord) {
  const r = known ?? await getRecord(id)
  if (!r) return
  await idbDelete('topics', id)
  for (const p of r.pageIds) {
    pageTopic.delete(p)
    await idbDelete('kv', `note:${r.userId}:${p}`).catch(() => {})
    await idbDelete('kv', `hl:${r.userId}:${p}`).catch(() => {})
  }
  await dropUnusedAssets(r.assets)
  delete offline.downloads[id]
}

/** Removes files no remaining download (of any student on this device) points at */
export async function dropUnusedAssets(paths: string[]) {
  if (typeof caches === 'undefined' || !paths.length) return
  const inUse = new Set((await idbAll<DownloadRecord>('topics').catch(() => [])).flatMap(r => r.assets))
  const cache = await caches.open(ASSET_CACHE)
  for (const path of paths) {
    if (!inUse.has(path)) await cache.delete(absolute(path))
  }
}

/**
 * The shelf loaded online: renew every copy that's still current, update the ones the teacher has
 * changed since, and remove the ones no longer on the student's shelf (unpublished or deleted).
 */
export async function reconcileWithList(data: { topics?: any[]; subjects?: any[] }) {
  const uid = currentUserId()
  if (!uid) return
  const topics = data.topics || []
  await idbPut('kv', { subjects: data.subjects || [] }, `enotes:list:${uid}`).catch(() => {})
  await ensureUser()
  for (const meta of Object.values(offline.downloads)) {
    const row = topics.find(t => Number(t.id) === meta.id)
    if (!row) {
      await removeTopic(meta.id)
    } else if (row.content_version && row.content_version !== meta.contentVersion) {
      downloadTopic(meta.id, { audio: meta.audio, listRow: row }).catch(() => {})
    } else {
      const r = await getRecord(meta.id)
      if (!r) continue
      r.expiresAt = Date.now() + DAYS_KEPT * DAY
      r.listRow = plain(row)
      await idbPut('topics', r)
      offline.downloads[meta.id] = metaOf(r)
    }
  }
}

/** The reader fetched a downloaded topic online and it has changed - refresh the copy with it */
export function refreshIfChanged(topic: any) {
  const meta = offline.downloads[Number(topic?.id)]
  if (meta && topic.content_version && topic.content_version !== meta.contentVersion) {
    downloadTopic(meta.id, { audio: meta.audio, listRow: meta.listRow, fresh: topic }).catch(() => {})
  }
}

/** Remembers where the student is in a downloaded topic (for Continue on the offline shelf) */
export async function setLocalPlace(topicId: number, pageId: number) {
  const r = await getRecord(topicId)
  if (!r) return
  const index = (r.topic.pages || []).findIndex((p: any) => p.id === pageId)
  if (index < 0) return
  r.listRow = { ...r.listRow, resume_page_id: pageId, resume_page_number: index + 1 }
  await idbPut('topics', r)
  offline.downloads[topicId] = metaOf(r)
}
