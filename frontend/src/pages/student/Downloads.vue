<template>
  <div class="max-w-3xl mx-auto">
    <div class="flex items-center gap-2 mb-1">
      <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
      </div>
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Downloads</h1>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
      eNotes and books saved on this device read without internet. Each copy is kept {{ DAYS_KEPT }} days and renewed whenever you're online; your notes and highlights made offline are sent when you reconnect.
    </p>

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

    <div v-else-if="items.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Nothing saved yet</p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Open a book on a shelf and choose <span class="font-semibold">Save for offline</span>.</p>
      <div class="flex flex-wrap justify-center gap-2">
        <router-link v-for="shelf in SHELVES" :key="shelf.to" :to="shelf.to" class="inline-flex px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">{{ shelf.label }}</router-link>
      </div>
    </div>

    <ul v-else class="space-y-2">
      <li v-for="item in items" :key="item.key" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex items-center gap-3">
        <div class="w-10 h-12 rounded-md flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold" :style="{ background: item.color }">
          {{ subjectTag(item.subject_name, item.subject_code, 4) || 'PDF' }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ item.title }}</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
            <span class="font-semibold">{{ KIND_LABEL[item.kind] }}</span><template v-if="item.subject_name"> · {{ item.subject_name }}</template><template v-if="item.pages"> · {{ item.pages }} {{ item.pages === 1 ? 'page' : 'pages' }}</template> · {{ formatBytes(item.bytes) }}
            <template v-if="item.audio"> · 🔊 audio</template>
          </p>
          <p class="text-[11px]" :class="expiringSoon(item) ? 'text-amber-700 dark:text-amber-300 font-semibold' : 'text-gray-400 dark:text-gray-500'">
            <template v-if="item.progress !== undefined">Updating… {{ Math.round(item.progress * 100) }}%</template>
            <template v-else>Saved {{ new Date(item.downloadedAt).toLocaleDateString() }} · expires {{ daysLeft(item.expiresAt) }}<template v-if="expiringSoon(item)"> - go online to renew</template></template>
          </p>
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <router-link :to="item.readTo" class="px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">Read</router-link>
          <button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" title="Remove from this device" @click="remove(item)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { offline, removeTopic, DAYS_KEPT, type DownloadMeta } from '@/utils/offline/enotes'
import { removeDoc, type DocMeta } from '@/utils/offline/docs'
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
const KIND_LABEL: Record<string, string> = { enote: 'eNotes', library: 'eLibrary', itembank: 'Item Bank' }

interface Item {
  key: string
  kind: 'enote' | 'library' | 'itembank'
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
  else await removeDoc(item.kind, item.id)
}
</script>
