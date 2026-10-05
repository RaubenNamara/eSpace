<template>
  <div class="w-full">
    <PageHeader title="Downloads" :description="`eNotes and books saved on this device read without internet - kept ${DAYS_KEPT} days and renewed whenever you're online.`" icon="download" accent="indigo" />

    <!-- Space on this device -->
    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
      <div class="flex items-center justify-between gap-3 text-xs">
        <p class="font-semibold text-gray-900 dark:text-white">{{ items.length }} {{ items.length === 1 ? 'item' : 'items' }} saved · {{ formatBytes(totalBytes) }}</p>
        <p v-if="quota" class="text-gray-500 dark:text-gray-400">{{ formatBytes(quota - usage) }} free for eSpace</p>
      </div>
      <div v-if="quota" class="mt-2 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <div class="h-full bg-indigo-600" :style="{ width: `${Math.min(100, Math.max(1, usage / quota * 100))}%` }"></div>
      </div>
      <p v-if="offline.pending > 0" class="mt-2 text-[11px] text-indigo-700 dark:text-indigo-300">
        {{ offline.pending }} {{ offline.pending === 1 ? 'change' : 'changes' }} made offline waiting to be sent{{ offline.online ? '…' : ' when you reconnect' }}
      </p>
    </div>

    <div v-if="!offline.ready" class="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>

    <EmptyState v-else-if="items.length === 0" icon="download" tone="indigo" title="Nothing saved yet" message="Open a book on a shelf and choose Save for offline - it then opens here even with no internet. Notes and highlights you make offline are sent when you reconnect.">
      <div class="flex flex-wrap justify-center gap-2">
        <router-link v-for="shelf in SHELVES" :key="shelf.to" :to="shelf.to" class="inline-flex px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">{{ shelf.label }}</router-link>
      </div>
    </EmptyState>

    <ul v-else class="space-y-2">
      <li v-for="item in items" :key="item.key" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex items-center gap-3">
        <div class="w-10 h-12 rounded-md flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold" :style="{ background: item.color }">
          {{ subjectTag(item.subject_name, item.subject_code, 4) || 'PDF' }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ item.title }}</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
            <span class="font-semibold">{{ KIND_LABEL[item.kind] }}</span><template v-if="item.subject_name"> · {{ item.subject_name }}</template><template v-if="item.pages"> · {{ item.pages }} {{ item.pages === 1 ? 'page' : 'pages' }}</template><template v-if="item.bytes"> · {{ formatBytes(item.bytes) }}</template>
            <template v-if="item.audio"> · with audio</template>
          </p>
          <p class="text-[11px]" :class="expiringSoon(item) ? 'text-amber-700 dark:text-amber-300 font-semibold' : 'text-gray-400 dark:text-gray-500'">
            <template v-if="item.progress !== undefined">Updating… {{ Math.round(item.progress * 100) }}%</template>
            <template v-else-if="item.note"><span :class="item.noteClass">{{ item.note }}</span></template>
            <template v-else>Saved {{ new Date(item.downloadedAt).toLocaleDateString() }} · expires {{ daysLeft(item.expiresAt) }}<template v-if="expiringSoon(item)"> - go online to renew</template></template>
          </p>
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <router-link :to="item.readTo" class="px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">{{ item.kind === 'assessment' ? 'Open' : 'Read' }}</router-link>
          <button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" title="Remove from this device" @click="remove(item)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { offline, removeTopic, DAYS_KEPT, type DownloadMeta } from '@/utils/offline/enotes'
import { removeDoc, type DocMeta } from '@/utils/offline/docs'
import { removeAssessment, type SavedAssessmentMeta } from '@/utils/offline/assessments'
import { formatBytes, daysLeft } from '@/utils/offline/format'
import { parseCoverDesign } from '@/utils/enoteCover'
import { subjectTag } from '@/utils/subjectTag'
import { useConfirmStore } from '@/stores/confirm'

const confirm = useConfirmStore()

const SHELVES = [
  { to: '/student/enotes', label: 'eNotes' },
  { to: '/student/library', label: 'eLibrary' },
  { to: '/student/itembank', label: 'Item Bank' }
]
const KIND_LABEL: Record<string, string> = { enote: 'eNotes', library: 'eLibrary', itembank: 'Item Bank', assessment: 'Assessment' }
// Where an assessment answered offline stands
const ASSESSMENT_STATE: Record<string, { note: string; cls: string } | null> = {
  saved: null,
  draft: { note: "Answers waiting to be sent when you're online", cls: 'text-amber-700 dark:text-amber-300 font-semibold' },
  submitted: { note: 'Submitted on this device - waiting to be sent', cls: 'text-amber-700 dark:text-amber-300 font-semibold' },
  sent: { note: 'Sent to your teacher', cls: 'text-emerald-700 dark:text-emerald-300 font-semibold' },
  failed: { note: "Couldn't be sent - open it to see why", cls: 'text-red-600 dark:text-red-400 font-semibold' }
}

interface Item {
  key: string
  kind: 'enote' | 'library' | 'itembank' | 'assessment'
  note?: string
  noteClass?: string
  id: number
  title: string
  subject_name?: string
  subject_code?: string
  pages: number
  bytes: number
  audio: boolean
  downloadedAt: number
  expiresAt: number
  color: string
  readTo: string
  progress?: number
}

// Saved eNotes and PDFs in one list, newest first
const items = computed<Item[]>(() => [
  ...Object.values(offline.downloads).map((d: DownloadMeta): Item => ({
    key: `enote:${d.id}`,
    kind: 'enote',
    id: d.id,
    title: d.title,
    subject_name: d.subject_name,
    subject_code: d.subject_code,
    pages: d.total_pages,
    bytes: d.bytes,
    audio: d.audio,
    downloadedAt: d.downloadedAt,
    expiresAt: d.expiresAt,
    color: parseCoverDesign(d.listRow?.cover_design)?.color || '#4f46e5',
    readTo: `/student/enotes/${d.id}${d.listRow?.resume_page_id ? `?resumePage=${d.listRow.resume_page_id}` : ''}`,
    progress: offline.progress[d.id]
  })),
  ...(Object.values(offline.docs) as DocMeta[]).map((d): Item => ({
    key: d.key,
    kind: d.kind,
    id: d.docId,
    title: d.title,
    subject_name: d.subject_name,
    subject_code: d.subject_code,
    pages: Number(d.listRow?.total_pages) || 0,
    bytes: d.bytes,
    audio: false,
    downloadedAt: d.downloadedAt,
    expiresAt: d.expiresAt,
    color: d.kind === 'library' ? '#7c3aed' : '#0f766e',
    readTo: `/student/${d.kind}?open=${d.docId}`,
    progress: offline.docProgress[d.key]
  })),
  ...(Object.values(offline.assessments) as SavedAssessmentMeta[]).map((a): Item => ({
    key: `assessment:${a.id}`,
    kind: 'assessment',
    id: a.id,
    title: a.title,
    subject_name: a.subject_name ?? undefined,
    pages: 0,
    bytes: 0,
    audio: false,
    downloadedAt: a.savedAt,
    expiresAt: a.expiresAt,
    color: '#0369a1',
    readTo: `/student/assignments/${a.id}/answer`,
    note: ASSESSMENT_STATE[a.state]?.note,
    noteClass: ASSESSMENT_STATE[a.state]?.cls
  }))
].sort((a, b) => b.downloadedAt - a.downloadedAt))
const totalBytes = computed(() => items.value.reduce((sum, i) => sum + i.bytes, 0))

const usage = ref(0)
const quota = ref(0)
const measure = async () => {
  try {
    const estimate = await navigator.storage?.estimate?.()
    usage.value = estimate?.usage ?? 0
    quota.value = estimate?.quota ?? 0
  } catch { /* not supported */ }
}
onMounted(measure)
watch(totalBytes, measure)

const expiringSoon = (item: Item) => item.expiresAt - Date.now() < 5 * 24 * 60 * 60 * 1000

const remove = async (item: Item) => {
  const ok = await confirm.open({
    title: 'Remove from this device?',
    message: 'You can save it again any time you are online. Notes already sent stay in your account.',
    confirmLabel: 'Remove',
    danger: true
  })
  if (!ok) return
  if (item.kind === 'enote') await removeTopic(item.id)
  else if (item.kind === 'assessment') await removeAssessment(item.id)
  else await removeDoc(item.kind, item.id)
}
</script>
