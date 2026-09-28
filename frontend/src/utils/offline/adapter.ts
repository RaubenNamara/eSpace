import axios, { type AxiosAdapter, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { idbAll, idbDelete, idbGet, idbPut } from './db'
import {
  offline, currentUserId, initDownloads, offlineTopic, offlineTopicList, reconcileWithList,
  refreshIfChanged, setLocalPlace, topicOfPage, downloadedPageIds, ensureUser
} from './enotes'
import {
  type DocKind, offlineDocList, reconcileDocs, localDocNotes, storeDocNotes, setLocalDocNote
} from './docs'

// Sits in front of axios's own adapter for the student eNotes, eLibrary and Item Bank requests. Online, requests go to the
// server as usual (and keep downloaded copies current). When the network isn't there, reads are
// answered from the copy on this device and changes - page notes, highlights, reading place - are
// kept in a queue and sent once the device is back online.

interface QueuedChange {
  seq?: number
  userId: number
  method: string
  url: string
  data: any
  // A highlight made offline has a temporary (negative) id until the server gives it a real one
  tempId?: number
  pageId?: number
}

const ROUTES = {
  list: /^\/api\/student\/enotes\/topics$/,
  topic: /^\/api\/student\/enotes\/topics\/(\d+)$/,
  note: /^\/api\/student\/enotes\/pages\/(\d+)\/note$/,
  highlights: /^\/api\/student\/enotes\/pages\/(\d+)\/highlights$/,
  highlight: /^\/api\/student\/enotes\/highlights\/(-?\d+)$/,
  progress: /^\/api\/student\/enotes\/topics\/(\d+)\/progress$/,
  // eLibrary / Item Bank (PDFs - see offline/docs.ts)
  docList: /^\/api\/student\/(library|itembank)$/,
  docNotes: /^\/api\/student\/(library\/books|itembank)\/(\d+)\/notes$/,
  docNote: /^\/api\/student\/(library\/books|itembank)\/(\d+)\/pages\/(\d+)\/note$/,
  docProgress: /^\/api\/student\/library\/(\d+)\/progress$/
}

const kindOf = (segment: string): DocKind => segment === 'itembank' ? 'itembank' : 'library'
const docListKey = (kind: DocKind) => `doclist:${currentUserId()}:${kind}`

// Temporary highlight ids the server has since replaced, so a highlight made offline can still be
// removed after it has synced
const realIds = new Map<number, number>()

let base: AxiosAdapter

const pathOf = (config: InternalAxiosRequestConfig) => {
  try {
    return new URL(config.url || '', location.origin).pathname
  } catch {
    return config.url || ''
  }
}

const reply = (config: InternalAxiosRequestConfig, data: any): AxiosResponse => ({
  data,
  status: 200,
  statusText: 'OK (offline copy)',
  headers: {},
  config,
  request: {}
})

// No answer from the server at all (or the dev proxy / a gateway couldn't reach it)
const unreachable = (err: any) => !err?.response || [502, 503, 504].includes(err.response.status)

const bodyOf = (config: InternalAxiosRequestConfig) => {
  if (!config.data) return {}
  if (typeof config.data === 'string') {
    try { return JSON.parse(config.data) } catch { return {} }
  }
  return config.data
}

const parsed = (data: any) => {
  if (typeof data !== 'string') return data
  try { return JSON.parse(data) } catch { return null }
}

const kvKey = (kind: 'note' | 'hl', pageId: number) => `${kind}:${currentUserId()}:${pageId}`

async function offlineRead(config: InternalAxiosRequestConfig, path: string): Promise<AxiosResponse | null> {
  let m: RegExpMatchArray | null
  if (ROUTES.list.test(path)) {
    return reply(config, { success: true, offline: true, data: await offlineTopicList() })
  }
  if ((m = path.match(ROUTES.topic))) {
    const topic = await offlineTopic(Number(m[1]))
    return topic ? reply(config, { success: true, offline: true, data: topic }) : null
  }
  if ((m = path.match(ROUTES.docList))) {
    const kind = kindOf(m[1])
    const saved = await idbGet<any>('kv', docListKey(kind))
    const rows = await offlineDocList(kind)
    return reply(config, { success: true, offline: true, data: { [kind === 'library' ? 'books' : 'resources']: rows, subjects: saved?.subjects || [] } })
  }
  if ((m = path.match(ROUTES.docNotes))) {
    const notes = await localDocNotes(kindOf(m[1]), Number(m[2]))
    return notes ? reply(config, { success: true, data: { notes } }) : null
  }
  if ((m = path.match(ROUTES.docNote))) {
    const notes = await localDocNotes(kindOf(m[1]), Number(m[2]))
    if (!notes) return null
    const note = notes.find(n => Number(n.page_number) === Number(m![3]))
    return reply(config, { success: true, data: { content: note?.content || '', color: note?.color ?? null } })
  }
  if ((m = path.match(ROUTES.note))) {
    const pageId = Number(m[1])
    if (topicOfPage(pageId) === null) return null
    const note = await idbGet<any>('kv', kvKey('note', pageId))
    return reply(config, { success: true, data: note || { content: '', color: null } })
  }
  if ((m = path.match(ROUTES.highlights))) {
    const pageId = Number(m[1])
    if (topicOfPage(pageId) === null) return null
    return reply(config, { success: true, data: { highlights: (await idbGet<any[]>('kv', kvKey('hl', pageId))) || [] } })
  }
  return null
}

// Keeps the copy on this device in step with what the server just answered or accepted
async function keepLocal(method: string, path: string, body: any, data: any) {
  let m: RegExpMatchArray | null
  if (method === 'get' && ROUTES.list.test(path) && data?.success) {
    await reconcileWithList(data.data || {})
  } else if (method === 'get' && (m = path.match(ROUTES.topic)) && data?.success) {
    refreshIfChanged(data.data)
  } else if ((m = path.match(ROUTES.note)) && topicOfPage(Number(m[1])) !== null) {
    const pageId = Number(m[1])
    if (method === 'get' && data?.success) await idbPut('kv', data.data, kvKey('note', pageId))
    if (method === 'put') await idbPut('kv', { content: body.content ?? '', color: body.color ?? null }, kvKey('note', pageId))
  } else if ((m = path.match(ROUTES.highlights)) && topicOfPage(Number(m[1])) !== null) {
    const pageId = Number(m[1])
    if (method === 'get' && data?.success) await idbPut('kv', data.data.highlights || [], kvKey('hl', pageId))
    if (method === 'post' && data?.success) await addLocalHighlight(pageId, { ...body, id: data.data.id })
  } else if (method === 'delete' && (m = path.match(ROUTES.highlight))) {
    await removeLocalHighlight(Number(m[1]))
  } else if (method === 'post' && (m = path.match(ROUTES.progress))) {
    await setLocalPlace(Number(m[1]), Number(body.page_id))
  } else if (method === 'get' && (m = path.match(ROUTES.docList)) && data?.success) {
    const kind = kindOf(m[1])
    await idbPut('kv', { subjects: data.data?.subjects || [] }, docListKey(kind))
    await reconcileDocs(kind, (kind === 'library' ? data.data?.books : data.data?.resources) || [])
  } else if (method === 'get' && (m = path.match(ROUTES.docNotes)) && data?.success) {
    await storeDocNotes(kindOf(m[1]), Number(m[2]), data.data?.notes || [])
  } else if (method === 'put' && (m = path.match(ROUTES.docNote))) {
    await setLocalDocNote(kindOf(m[1]), Number(m[2]), Number(m[3]), body.content ?? '', body.color ?? null)
  }
}

async function addLocalHighlight(pageId: number, highlight: any) {
  const list = ((await idbGet<any[]>('kv', kvKey('hl', pageId))) || []).filter(h => h.id !== highlight.id)
  await idbPut('kv', [...list, { id: highlight.id, start_offset: highlight.start_offset, end_offset: highlight.end_offset, color: highlight.color }], kvKey('hl', pageId))
}

async function removeLocalHighlight(id: number) {
  const uid = currentUserId()
  for (const pageId of downloadedPageIds()) {
    const key = `hl:${uid}:${pageId}`
    const list = await idbGet<any[]>('kv', key)
    if (list?.some(h => h.id === id)) await idbPut('kv', list.filter(h => h.id !== id), key)
  }
}

// ---- the queue ---------------------------------------------------------------------------------

async function refreshPending() {
  const uid = currentUserId()
  offline.pending = (await idbAll<QueuedChange>('queue').catch(() => [])).filter(c => c.userId === uid).length
}

async function enqueue(change: QueuedChange) {
  const all = await idbAll<QueuedChange>('queue')
  // Only the latest note text / reading place matters
  if (change.method === 'put' || ROUTES.progress.test(change.url) || ROUTES.docProgress.test(change.url)) {
    for (const c of all) if (c.url === change.url && c.userId === change.userId && c.seq) await idbDelete('queue', c.seq)
  }
  await idbPut('queue', change)
  await refreshPending()
}

/** Accepts a change while offline: saves it on this device and queues it for the server */
async function offlineWrite(config: InternalAxiosRequestConfig, method: string, path: string): Promise<AxiosResponse | null> {
  const uid = currentUserId()
  if (!uid) return null
  const body = bodyOf(config)
  let m: RegExpMatchArray | null

  if (method === 'put' && (m = path.match(ROUTES.note))) {
    await keepLocal('put', path, body, null)
    await enqueue({ userId: uid, method, url: path, data: body })
    return reply(config, { success: true, offline: true })
  }
  if (method === 'post' && (m = path.match(ROUTES.highlights))) {
    const pageId = Number(m[1])
    const tempId = -Date.now() - Math.floor(Math.random() * 1000)
    await addLocalHighlight(pageId, { ...body, id: tempId })
    await enqueue({ userId: uid, method, url: path, data: body, tempId, pageId })
    return reply(config, { success: true, offline: true, data: { id: tempId } })
  }
  if (method === 'delete' && (m = path.match(ROUTES.highlight))) {
    const id = Number(m[1])
    await removeLocalHighlight(id)
    if (id < 0 && !realIds.has(id)) {
      // Never reached the server - just forget the queued create
      for (const c of await idbAll<QueuedChange>('queue')) if (c.tempId === id && c.seq) await idbDelete('queue', c.seq)
      await refreshPending()
    } else {
      await enqueue({ userId: uid, method, url: path.replace(/-?\d+$/, String(realIds.get(id) ?? id)), data: null })
    }
    return reply(config, { success: true, offline: true })
  }
  if (method === 'put' && (m = path.match(ROUTES.docNote))) {
    const kind = kindOf(m[1])
    if (!(await localDocNotes(kind, Number(m[2])))) return null
    await keepLocal('put', path, body, null)
    await enqueue({ userId: uid, method, url: path, data: body })
    return reply(config, { success: true, offline: true })
  }
  if (method === 'post' && (m = path.match(ROUTES.docProgress))) {
    await enqueue({ userId: uid, method, url: path, data: body })
    return reply(config, { success: true, offline: true })
  }
  if (method === 'post' && (m = path.match(ROUTES.progress))) {
    await keepLocal('post', path, body, null)
    await enqueue({ userId: uid, method, url: path, data: body })
    return reply(config, { success: true, offline: true })
  }
  return null
}

let flushing: Promise<void> | null = null

/** Sends the changes made offline, oldest first; stops (to retry later) if the network drops */
export function flushQueue(): Promise<void> {
  if (!flushing) {
    flushing = (async () => {
      const uid = currentUserId()
      const changes = (await idbAll<QueuedChange>('queue').catch(() => [])).filter(c => c.userId === uid)
      for (const change of changes) {
        try {
          const response = await axios.request({ method: change.method, url: change.url, data: change.data, offlineBypass: true } as any)
          if (change.tempId && response.data?.data?.id) {
            const realId = Number(response.data.data.id)
            realIds.set(change.tempId, realId)
            await swapHighlightId(change.pageId!, change.tempId, realId)
          }
        } catch (err: any) {
          if (unreachable(err)) break
          // Refused by the server (e.g. the page was deleted) - nothing to retry
        }
        if (change.seq) await idbDelete('queue', change.seq)
      }
      await refreshPending()
    })().finally(() => { flushing = null })
  }
  return flushing
}

async function swapHighlightId(pageId: number, tempId: number, realId: number) {
  const key = kvKey('hl', pageId)
  const list = await idbGet<any[]>('kv', key)
  if (list) await idbPut('kv', list.map(h => h.id === tempId ? { ...h, id: realId } : h), key)
}

// ---- installing ------------------------------------------------------------------------------------

const offlineAdapter: AxiosAdapter = async (config) => {
  const path = pathOf(config)
  const method = (config.method || 'get').toLowerCase()
  const ours = path.startsWith('/api/student/') && Object.values(ROUTES).some(r => r.test(path))
  if (!ours || (config as any).offlineBypass) return base(config)
  await ensureUser()

  // Translate a highlight id that was temporary when the reader got it
  if (method === 'delete') {
    const m = path.match(ROUTES.highlight)
    if (m && realIds.has(Number(m[1]))) config.url = path.replace(/-?\d+$/, String(realIds.get(Number(m[1]))))
  }

  const tryOffline = () => method === 'get' ? offlineRead(config, path) : offlineWrite(config, method, path)

  if (!navigator.onLine) {
    const local = await tryOffline().catch(() => null)
    if (local) return local
  }
  try {
    const response = await base(config)
    // The adapter sees the raw response - axios only parses the JSON after it
    keepLocal(method, path, bodyOf(config), parsed(response.data)).catch(err => console.warn('Offline copy not updated:', err))
    return response
  } catch (err) {
    if (unreachable(err)) {
      offline.online = false
      const local = await tryOffline().catch(() => null)
      if (local) return local
    }
    throw err
  }
}

export function installOfflineSupport() {
  if (typeof indexedDB === 'undefined') return
  base = axios.getAdapter(axios.defaults.adapter)
  axios.defaults.adapter = offlineAdapter

  const load = async () => {
    await initDownloads()
    await refreshPending()
    if (navigator.onLine) flushQueue()
  }
  load()

  window.addEventListener('online', () => {
    offline.online = true
    flushQueue()
  })
  window.addEventListener('offline', () => { offline.online = false })
  // A different student signing in on this device sees their own downloads
  window.addEventListener('storage', e => { if (e.key === 'user') load() })
}
