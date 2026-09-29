import axios from 'axios'
import { idbDelete, idbGet, idbPut } from './db'
import { offline, currentUserId, onInitDownloads, fetchAssets, blobUrl, plain, DAY, DAYS_KEPT } from './enotes'

// Assessments saved to answer without internet. Saving one keeps the assessment as the answering
// page receives it (and the pictures in its questions); while offline the page reads it from here,
// typed and chosen answers are kept on the device, and the latest draft - or the submission - is
// sent when the device is back online (offline/adapter.ts). A submission the server refuses (e.g.
// it arrives after a deadline that doesn't allow late work) stays on the device with the reason,
// so the answers are never lost. Photo, drawing and PDF answers need a connection; timed
// assessments can't be saved (their timer can't be kept fairly offline).

export interface SavedAssessmentMeta {
  id: number
  userId: number
  title: string
  subject_name: string | null
  due_date: string | null
  savedAt: number
  expiresAt: number
  // 'saved': nothing waiting · 'draft': answers waiting to be sent · 'submitted': submission
  // waiting to be sent · 'sent': reached the server · 'failed': the server refused it
  state: 'saved' | 'draft' | 'submitted' | 'sent' | 'failed'
  message: string | null
  uploads: boolean
}

interface SavedAssessment extends SavedAssessmentMeta {
  data: any
  assets: string[]
}

const key = (uid: number, id: number) => `assess:${uid}:${id}`
const indexKey = (uid: number) => `assess-index:${uid}`
const UPLOAD_TYPES = ['canvas', 'pdf_annotation', 'file_upload', 'drawing']

const metaOf = (r: SavedAssessment): SavedAssessmentMeta => {
  const { data: _d, assets: _a, ...meta } = r
  return meta
}

async function index(uid: number): Promise<number[]> {
  return (await idbGet<number[]>('kv', indexKey(uid)).catch(() => undefined)) ?? []
}

onInitDownloads(async (uid) => {
  const out: Record<number, SavedAssessmentMeta> = {}
  if (uid) {
    for (const id of await index(uid)) {
      const r = await idbGet<SavedAssessment>('kv', key(uid, id)).catch(() => undefined)
      if (!r) continue
      if (r.expiresAt < Date.now() && r.state !== 'draft' && r.state !== 'submitted') {
        await removeAssessment(id)
        continue
      }
      out[id] = metaOf(r)
    }
  }
  offline.assessments = out
})

async function getRecord(id: number): Promise<SavedAssessment | null> {
  const uid = currentUserId()
  if (!uid) return null
  return (await idbGet<SavedAssessment>('kv', key(uid, id)).catch(() => undefined)) ?? null
}

async function putRecord(r: SavedAssessment) {
  await idbPut('kv', r, key(r.userId, r.id))
  const ids = await index(r.userId)
  if (!ids.includes(r.id)) await idbPut('kv', [...ids, r.id], indexKey(r.userId))
  offline.assessments[r.id] = metaOf(r)
}

/** Why an assessment can't be saved for offline answering, or null when it can */
export function offlineBlocker(data: any): string | null {
  const a = data?.assignment
  if (!a) return 'Not available'
  if (Number(a.duration_minutes) > 0) return 'Timed assessments need a connection'
  const status = data.submission_status
  if (status && status !== 'in_progress' && status !== 'new') return 'Already submitted'
  return null
}

export const isAssessmentSaved = (id: number) => !!offline.assessments[id]

/** Keeps an assessment on this device to answer offline; `data` is the answering page's copy */
export async function saveAssessment(id: number, data?: any) {
  const uid = currentUserId()
  if (!uid) return
  const fresh = data ?? (await axios.get(`/api/student/assignments/${id}`, { offlineBypass: true } as any)).data.data
  const blocker = offlineBlocker(fresh)
  if (blocker) throw new Error(blocker)
  const copy = plain(fresh)
  // Pictures in the questions
  const paths = new Set<string>()
  for (const m of JSON.stringify(copy).matchAll(/src=\\?"([^"\\]*\/uploads\/[^"\\]+)\\?"/g)) paths.add(m[1])
  for (const q of copy.questions || []) if (q.image_path) paths.add(q.image_path)
  const { kept } = await fetchAssets([...paths], () => {})
  const previous = await getRecord(id)
  await putRecord({
    id,
    userId: uid,
    title: copy.assignment?.title ?? 'Assessment',
    subject_name: copy.assignment?.subject_name ?? null,
    due_date: copy.assignment?.due_date ?? null,
    savedAt: Date.now(),
    expiresAt: Date.now() + DAYS_KEPT * DAY,
    state: previous?.state === 'draft' || previous?.state === 'submitted' ? previous.state : 'saved',
    message: null,
    uploads: (copy.questions || []).some((q: any) => UPLOAD_TYPES.includes(q.question_type)),
    data: copy,
    assets: kept
  })
  navigator.storage?.persist?.().catch(() => {})
}

export async function removeAssessment(id: number) {
  const uid = currentUserId()
  if (!uid) return
  await idbDelete('kv', key(uid, id)).catch(() => {})
  await idbPut('kv', (await index(uid)).filter(x => x !== id), indexKey(uid)).catch(() => {})
  delete offline.assessments[id]
}

/** The saved assessment as the answering page expects it, with the answers made offline */
export async function offlineAssessment(id: number): Promise<any | null> {
  const r = await getRecord(id)
  if (!r) return null
  const data = plain(r.data)
  let json = JSON.stringify(data)
  for (const path of r.assets) {
    const local = await blobUrl(path)
    if (local) json = json.split(path).join(local)
  }
  const out = JSON.parse(json)
  if (r.state === 'submitted' || r.state === 'sent') out.submission_status = 'submitted'
  return out
}

/** Answers saved or submitted while offline: kept in the copy, marked to send */
export async function keepAnswers(id: number, body: any, submitted: boolean) {
  const r = await getRecord(id)
  if (!r) return false
  r.data.answers = (body.answers || []).map((a: any) => ({ question_id: a.question_id, answer_text: a.answer_text }))
  if (!r.data.submission_status || r.data.submission_status === 'new') r.data.submission_status = 'in_progress'
  r.state = submitted ? 'submitted' : (r.state === 'submitted' ? 'submitted' : 'draft')
  r.message = null
  await putRecord(r)
  return true
}

/** The server answered a queued draft/submission */
export async function markSent(id: number, ok: boolean, message: string | null) {
  const r = await getRecord(id)
  if (!r) return
  if (ok) {
    const wasSubmitted = r.state === 'submitted'
    r.state = wasSubmitted ? 'sent' : 'saved'
    r.message = null
    if (wasSubmitted) r.data.submission_status = 'submitted'
  } else {
    r.state = 'failed'
    r.message = message
  }
  await putRecord(r)
}

/** The answering page loaded it online - keep the saved copy current */
export async function refreshSaved(id: number, data: any) {
  const r = await getRecord(id)
  if (!r || r.state === 'draft' || r.state === 'submitted') return
  r.data = plain(data)
  r.expiresAt = Date.now() + DAYS_KEPT * DAY
  if (data.submission_status && !['new', 'in_progress'].includes(data.submission_status)) r.state = 'sent'
  await putRecord(r)
}
