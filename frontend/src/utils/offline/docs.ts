import axios from 'axios'
import { idbDelete, idbGet, idbPut } from './db'
import {
  offline, currentUserId, onInitDownloads, absolute, blobUrl, plain, dropUnusedAssets,
  ASSET_CACHE, DAY, DAYS_KEPT
} from './enotes'

// Offline copies of eLibrary books and Item Bank resources (PDFs). Saving one keeps the PDF file
// and its cover picture on this device (Cache Storage), its row from the shelf, and the student's
// page notes for it. The PDF reader (usePdfRenderer) opens the kept file first, so a saved book
// reads the same with or without a network. Books can only be saved when the teacher allowed
// downloading; copies are renewed, updated or removed whenever the shelf loads online,
// like the eNotes (offline/enotes.ts).

export type DocKind = 'library' | 'itembank'

export interface DocMeta {
  key: string
  kind: DocKind
  docId: number
  userId: number
  title: string
  subject_name?: string
  subject_code?: string
  bytes: number
  downloadedAt: number
  expiresAt: number
  filePath: string
  // Changes when the teacher replaces the file
  version: string
  listRow: any
}

interface DocRecord extends DocMeta {
  // IndexedDB key (the 'topics' store, shared with the eNotes - numbers there, strings here)
  id: string
  assets: string[]
}

export const docKey = (kind: DocKind, id: number) => `${kind}:${id}`
const recordId = (uid: number, kind: DocKind, id: number) => `doc:${uid}:${kind}:${id}`
const notesKey = (uid: number, kind: DocKind, id: number) => `pdfnotes:${uid}:${kind}:${id}`
const versionOf = (row: any) => `${row?.file_path || ''}|${row?.file_size || ''}`

/** Whether this shelf item may be kept on the device */
export function canSaveOffline(row: any): boolean {
  if (String(row?.file_type || 'pdf').toLowerCase() !== 'pdf' || !row?.file_path) return false
  // Both the eLibrary and the Item Bank follow the teacher's "Allow download" (off by default)
  return !!Number(row.allow_download)
}

const metaOf = (r: DocRecord): DocMeta => {
  const { id: _i, assets: _a, ...meta } = r
  return meta
}

onInitDownloads(async (uid, records) => {
  const docs: Record<string, DocMeta> = {}
  for (const r of records as DocRecord[]) {
    if (!(r as any).kind || r.userId !== uid) continue
    if (r.expiresAt < Date.now()) {
      await removeDoc(r.kind, r.docId, r)
      continue
    }
    docs[r.key] = metaOf(r)
  }
  offline.docs = docs
})

async function getRecord(kind: DocKind, id: number): Promise<DocRecord | null> {
  const uid = currentUserId()
  if (!uid) return null
  return (await idbGet<DocRecord>('topics', recordId(uid, kind, id)).catch(() => undefined)) ?? null
}

const notesUrl = (kind: DocKind, id: number) => kind === 'library'
  ? `/api/student/library/books/${id}/notes`
  : `/api/student/itembank/${id}/notes`

/** Downloads the PDF (reporting progress) into the offline cache */
async function fetchFile(path: string, onProgress: (share: number) => void): Promise<number> {
  const url = absolute(path)
  const cache = await caches.open(ASSET_CACHE)
  const kept = await cache.match(url)
  if (kept) return (await kept.clone().blob()).size

  const response = await fetch(url, { credentials: 'same-origin' })
  if (!response.ok || /text\/html|application\/json/i.test(response.headers.get('content-type') || '')) {
    throw new Error('The file could not be downloaded')
  }
  const total = Number(response.headers.get('content-length')) || 0
  const reader = response.body?.getReader()
  let blob: Blob
  if (reader) {
    const chunks: Uint8Array[] = []
    let received = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      received += value.length
      if (total) onProgress(received / total)
    }
    blob = new Blob(chunks as BlobPart[], { type: response.headers.get('content-type') || 'application/pdf' })
  } else {
    blob = await response.blob()
  }
  await cache.put(url, new Response(blob, { headers: { 'Content-Type': blob.type || 'application/pdf', 'Content-Length': String(blob.size) } }))
  return blob.size
}

export async function downloadDoc(kind: DocKind, row: any) {
  const uid = currentUserId()
  const key = docKey(kind, Number(row.id))
  if (!uid || offline.docProgress[key] !== undefined || typeof caches === 'undefined') return
  if (!canSaveOffline(row)) throw new Error('This book cannot be saved')
  row = plain(row)
  offline.docProgress[key] = 0
  try {
    navigator.storage?.persist?.().catch(() => {})
    const bytes = await fetchFile(row.file_path, share => { offline.docProgress[key] = Math.min(0.95, share * 0.95) })

    const assets = [row.file_path]
    let coverBytes = 0
    if (row.cover_image && !/^(data:|blob:)/.test(row.cover_image)) {
      try {
        const cover = await fetch(absolute(row.cover_image), { credentials: 'same-origin' })
        if (cover.ok && /^image\//.test(cover.headers.get('content-type') || '')) {
          await (await caches.open(ASSET_CACHE)).put(absolute(row.cover_image), cover.clone())
          coverBytes = (await cover.blob()).size
          assets.push(row.cover_image)
        }
      } catch { /* shelf falls back to its drawn cover */ }
    }

    // The student's page notes on it
    try {
      const notes = await axios.get(notesUrl(kind, row.id), { offlineBypass: true } as any)
      await idbPut('kv', notes.data?.data?.notes ?? [], notesKey(uid, kind, row.id))
    } catch { /* notes still load page by page when online */ }

    const record: DocRecord = {
      id: recordId(uid, kind, row.id),
      key,
      kind,
      docId: Number(row.id),
      userId: uid,
      title: row.title,
      subject_name: row.subject_name,
      subject_code: row.subject_code,
      bytes: bytes + coverBytes,
      downloadedAt: Date.now(),
      expiresAt: Date.now() + DAYS_KEPT * DAY,
      filePath: row.file_path,
      version: versionOf(row),
      listRow: row,
      assets
    }
    const previous = await getRecord(kind, row.id)
    await idbPut('topics', record)
    if (previous) await dropUnusedAssets(previous.assets.filter(a => !assets.includes(a)))
    offline.docs[key] = metaOf(record)
  } finally {
    delete offline.docProgress[key]
  }
}

export async function removeDoc(kind: DocKind, id: number, known?: DocRecord) {
  const r = known ?? await getRecord(kind, id)
  if (!r) return
  await idbDelete('topics', r.id)
  await idbDelete('kv', notesKey(r.userId, kind, id)).catch(() => {})
  await dropUnusedAssets(r.assets)
  delete offline.docs[r.key]
}

/** The shelf's list while offline: only the saved items, covers from this device */
export async function offlineDocList(kind: DocKind): Promise<any[]> {
  const rows: any[] = []
  for (const meta of Object.values(offline.docs) as DocMeta[]) {
    if (meta.kind !== kind) continue
    const row = { ...meta.listRow }
    if (row.cover_image) row.cover_image = await blobUrl(row.cover_image)
    rows.push(row)
  }
  return rows
}

/** The shelf loaded online: renew, update or remove this student's saved copies */
export async function reconcileDocs(kind: DocKind, rows: any[]) {
  for (const meta of Object.values(offline.docs) as DocMeta[]) {
    if (meta.kind !== kind) continue
    const row = rows.find(r => Number(r.id) === meta.docId)
    if (!row || !canSaveOffline(row)) {
      // Unpublished, no longer on the student's shelf, or the teacher turned downloading off
      await removeDoc(kind, meta.docId)
    } else if (versionOf(row) !== meta.version) {
      await removeDoc(kind, meta.docId)
      downloadDoc(kind, row).catch(() => {})
    } else {
      const r = await getRecord(kind, meta.docId)
      if (!r) continue
      r.expiresAt = Date.now() + DAYS_KEPT * DAY
      r.listRow = plain(row)
      await idbPut('topics', r)
      offline.docs[r.key] = metaOf(r)
    }
  }
}

// ---- page notes -------------------------------------------------------------------------------

export const isDocSaved = (kind: DocKind, id: number) => !!offline.docs[docKey(kind, id)]

export async function localDocNotes(kind: DocKind, id: number): Promise<any[] | null> {
  const uid = currentUserId()
  if (!uid || !isDocSaved(kind, id)) return null
  return (await idbGet<any[]>('kv', notesKey(uid, kind, id))) ?? []
}

export async function storeDocNotes(kind: DocKind, id: number, notes: any[]) {
  const uid = currentUserId()
  if (uid && isDocSaved(kind, id)) await idbPut('kv', notes, notesKey(uid, kind, id))
}

export async function setLocalDocNote(kind: DocKind, id: number, page: number, content: string, color: string | null) {
  const notes = await localDocNotes(kind, id)
  if (!notes) return
  const others = notes.filter(n => Number(n.page_number) !== page)
  await storeDocNotes(kind, id, content ? [...others, { page_number: page, content, color }] : others)
}

// ---- reading ----------------------------------------------------------------------------------

/** The kept copy of a PDF, if this device has one */
export async function offlinePdfData(url: string): Promise<ArrayBuffer | null> {
  if (typeof caches === 'undefined' || !url) return null
  try {
    const response = await caches.match(new URL(url, location.origin).href, { cacheName: ASSET_CACHE })
    return response ? await response.arrayBuffer() : null
  } catch {
    return null
  }
}
