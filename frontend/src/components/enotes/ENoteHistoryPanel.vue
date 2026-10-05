<template>
  <!-- Everything that happened to this topic's pages - every saved version (drafts included),
       pages added, copied, moved and deleted - with what changed, and a way back to any of it. -->
  <Teleport to="body">
    <Transition name="eh-fade">
      <div v-if="open" class="fixed inset-0 z-[60] bg-black/40" @click="emit('close')"></div>
    </Transition>
    <Transition name="eh-slide">
      <aside
        v-if="open"
        class="fixed inset-y-0 right-0 z-[61] w-full sm:w-[30rem] bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Page history"
      >
        <!-- Header -->
        <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <button v-if="viewing" type="button" class="p-1.5 -ml-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the list" @click="viewing = null">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div class="min-w-0 flex-1">
            <h2 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ viewing ? versionHeading(viewing.version) : 'History' }}</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              {{ viewing ? fullDate(viewing.version.at) : 'Every save, drafts included - and anything deleted, ready to bring back.' }}
            </p>
          </div>
          <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close" @click="emit('close')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- One version -->
        <template v-if="viewing">
          <div class="px-4 pt-3 flex flex-wrap items-center gap-2">
            <div class="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5 text-xs font-semibold">
              <button type="button" class="px-3 py-1.5 rounded-md" :class="viewMode === 'changes' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'" :disabled="!viewing.previous" @click="viewMode = 'changes'">What changed</button>
              <button type="button" class="px-3 py-1.5 rounded-md" :class="viewMode === 'page' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'" @click="viewMode = 'page'">The page</button>
            </div>
            <span v-if="diff && viewMode === 'changes'" class="text-xs text-gray-500 dark:text-gray-400">
              <b class="text-emerald-600 dark:text-emerald-400">+{{ diff.added }}</b> / <b class="text-rose-600 dark:text-rose-400">−{{ diff.removed }}</b> words<template v-if="diff.imagesAfter !== diff.imagesBefore"> · images {{ diff.imagesBefore }} → {{ diff.imagesAfter }}</template>
            </span>
          </div>
          <p v-if="viewMode === 'changes' && viewing.previous" class="px-4 pt-2 text-[11px] text-gray-400">Compared with the version from {{ fullDate(viewing.previous.at) }}</p>

          <div class="flex-1 overflow-y-auto px-4 py-3">
            <div v-if="viewMode === 'changes' && diff" class="text-sm leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words">
              <p v-if="viewing.previous && viewing.previous.title !== viewing.version.title" class="mb-3 text-xs">
                Title: <del class="eh-del">{{ viewing.previous.title }}</del> <ins class="eh-add">{{ viewing.version.title }}</ins>
              </p>
              <template v-for="(part, i) in condensed" :key="i">
                <ins v-if="part.type === 'add'" class="eh-add">{{ part.text }}</ins>
                <del v-else-if="part.type === 'del'" class="eh-del">{{ part.text }}</del>
                <span v-else class="text-gray-500 dark:text-gray-400">{{ part.text }}</span>
              </template>
              <p v-if="!diff.added && !diff.removed && diff.imagesAfter === diff.imagesBefore" class="text-gray-400 italic">Only formatting changed.</p>
            </div>
            <div v-else class="eh-page prose prose-sm dark:prose-invert max-w-none rounded-xl border border-gray-200 dark:border-gray-700 p-4" v-html="pageHtml"></div>
          </div>

          <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-2">
            <p class="flex-1 min-w-[10rem] text-[11px] text-gray-500 dark:text-gray-400">
              {{ restoreHint }}
            </p>
            <button
              v-if="viewing.version.content !== null"
              type="button"
              class="px-3 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              :disabled="restoring"
              @click="restore"
            >
              {{ restoring ? 'Restoring…' : isDeletedPage(viewing.version.page_id) ? 'Bring back as a page' : 'Restore this version' }}
            </button>
          </div>
        </template>

        <!-- The list -->
        <template v-else>
          <div class="px-4 pt-3">
            <div class="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5 text-xs font-semibold">
              <button v-for="t in tabs" :key="t.key" type="button" class="px-3 py-1.5 rounded-md whitespace-nowrap" :class="tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'" @click="tab = t.key">
                {{ t.label }}<span v-if="t.count" class="ml-1 text-[10px] text-gray-400">{{ t.count }}</span>
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto px-4 py-3">
            <div v-if="loading" class="space-y-2">
              <div v-for="i in 6" :key="i" class="h-14 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
            </div>
            <p v-else-if="error" class="text-sm text-rose-600 dark:text-rose-400">{{ error }} <button type="button" class="underline" @click="load">Try again</button></p>

            <!-- Deleted pages -->
            <template v-else-if="tab === 'deleted'">
              <p v-if="!deleted.length" class="py-10 text-center text-sm text-gray-500 dark:text-gray-400">No deleted pages - nothing has gone missing from this topic.</p>
              <ul v-else class="space-y-2">
                <li v-for="d in deleted" :key="d.history_id" class="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5">
                  <span class="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 flex items-center justify-center flex-shrink-0"><AppIcon name="trash" class="w-4 h-4" /></span>
                  <button type="button" class="flex-1 min-w-0 text-left" @click="openVersion(d.history_id)">
                    <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ pageLabel(d.title) }}</span>
                    <span class="block text-xs text-gray-500 dark:text-gray-400">Was page {{ d.page_number }} · {{ d.word_count }} words<template v-if="d.image_count"> · {{ d.image_count }} image{{ d.image_count === 1 ? '' : 's' }}</template> · deleted {{ timeAgo(d.deleted_at) }}</span>
                  </button>
                  <button type="button" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100" @click="openVersion(d.history_id)">View</button>
                </li>
              </ul>
            </template>

            <!-- Timeline -->
            <template v-else>
              <p v-if="!shownEntries.length" class="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                {{ tab === 'page' ? 'No saved versions of this page yet - they appear here as you edit.' : 'Nothing recorded yet - every save from now on appears here.' }}
              </p>
              <div v-for="group in grouped" :key="group.day" class="mb-4">
                <p class="sticky top-0 z-10 -mx-4 px-4 py-1 bg-white/95 dark:bg-gray-900/95 text-[11px] font-bold uppercase tracking-wide text-gray-400">{{ group.day }}</p>
                <ol class="relative ml-3 border-l border-gray-200 dark:border-gray-700">
                  <li v-for="e in group.items" :key="e.id" class="relative pl-5 py-1.5">
                    <span class="absolute -left-[9px] top-3 w-4 h-4 rounded-full ring-4 ring-white dark:ring-gray-900 flex items-center justify-center" :class="ACTION[e.action].dot">
                      <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </span>
                    <button
                      type="button"
                      class="w-full text-left rounded-xl px-3 py-2 transition-colors"
                      :class="e.has_content ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : 'cursor-default'"
                      :disabled="!e.has_content"
                      @click="e.has_content && openVersion(e.id)"
                    >
                      <span class="flex items-baseline justify-between gap-2">
                        <span class="text-sm text-gray-900 dark:text-white min-w-0">
                          <b class="font-semibold">{{ ACTION[e.action].verb }}</b>
                          <template v-if="e.page_id">{{ ' ' + pageLabel(e.title) }}</template>
                        </span>
                        <span class="text-[11px] text-gray-400 whitespace-nowrap flex-shrink-0">{{ timeRange(e) }}</span>
                      </span>
                      <span class="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                        <span v-if="e.page_id && whereNow(e)">{{ whereNow(e) }}</span>
                        <span v-if="e.detail">{{ e.detail.replace(/ #\d+$/, '') }}</span>
                        <span v-if="e.has_content">{{ e.word_count }} words</span>
                        <span v-if="delta(e) !== null" :class="delta(e)! > 0 ? 'text-emerald-600 dark:text-emerald-400' : delta(e)! < 0 ? 'text-rose-600 dark:text-rose-400' : ''">{{ delta(e)! > 0 ? '+' : '' }}{{ delta(e) }}</span>
                        <span v-if="e.page_deleted && e.action !== 'delete'" class="px-1.5 rounded bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 text-[10px] font-semibold">page since deleted</span>
                      </span>
                    </button>
                  </li>
                </ol>
              </div>
            </template>
          </div>
        </template>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { timeAgo } from '@/components/dashboard/teacher/time'
import { condense, diffHtml } from '@/utils/textDiff'
import { resolveContentAssetUrls } from '@/utils/richContent'

type Action = 'snapshot' | 'create' | 'edit' | 'duplicate' | 'move' | 'delete' | 'restore'
interface Entry {
  id: number
  page_id: number | null
  action: Action
  title: string | null
  word_count: number
  image_count: number
  page_number: number | null
  current_page_number: number | null
  page_deleted: boolean
  detail: string | null
  has_content: boolean
  started_at: string
  at: string
}
interface Deleted { history_id: number; page_id: number; title: string | null; word_count: number; image_count: number; page_number: number | null; deleted_at: string }
export interface HistoryVersion { id: number; page_id: number | null; action: Action; title: string | null; content: string | null; page_number: number | null; detail: string | null; started_at: string; at: string }
interface Viewing { version: HistoryVersion; previous: { id: number; title: string | null; content: string | null; at: string } | null }

const props = defineProps<{ open: boolean; topicId: number | string; currentPageId?: number | null }>()
const emit = defineEmits<{
  close: []
  // The parent writes the version back to its page (or re-creates a deleted page); resolves true when done
  restore: [version: HistoryVersion, pageDeleted: boolean, done: (ok: boolean) => void]
}>()

const ACTION: Record<Action, { verb: string; dot: string }> = {
  snapshot: { verb: 'Before tracking began:', dot: 'bg-gray-400' },
  create: { verb: 'Added', dot: 'bg-sky-500' },
  edit: { verb: 'Edited', dot: 'bg-indigo-500' },
  duplicate: { verb: 'Copied a page as', dot: 'bg-violet-500' },
  move: { verb: 'Moved pages', dot: 'bg-amber-500' },
  delete: { verb: 'Deleted', dot: 'bg-rose-500' },
  restore: { verb: 'Brought back', dot: 'bg-emerald-500' }
}

const loading = ref(false)
const error = ref('')
const entries = ref<Entry[]>([])
const deleted = ref<Deleted[]>([])
const tab = ref<'all' | 'page' | 'deleted'>('all')
const viewing = ref<Viewing | null>(null)
const viewMode = ref<'changes' | 'page'>('changes')
const restoring = ref(false)

const tabs = computed(() => [
  { key: 'all' as const, label: 'All changes', count: 0 },
  { key: 'page' as const, label: 'This page', count: 0 },
  { key: 'deleted' as const, label: 'Deleted pages', count: deleted.value.length }
])

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/teacher/enotes/topics/${props.topicId}/history`)
    entries.value = res.data.data.entries || []
    deleted.value = res.data.data.deleted || []
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not load the history.'
  } finally {
    loading.value = false
  }
}

watch(() => props.open, isOpen => {
  if (isOpen) {
    viewing.value = null
    load()
  }
})

const shownEntries = computed(() => tab.value === 'page' ? entries.value.filter(e => e.page_id === props.currentPageId) : entries.value)

const dayLabel = (iso: string) => {
  const d = new Date(iso.replace(' ', 'T'))
  const today = new Date()
  const yesterday = new Date(Date.now() - 86400000)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short', year: d.getFullYear() === today.getFullYear() ? undefined : 'numeric' })
}
const grouped = computed(() => {
  const out: { day: string; items: Entry[] }[] = []
  for (const e of shownEntries.value) {
    const day = dayLabel(e.at)
    const last = out[out.length - 1]
    if (last && last.day === day) last.items.push(e)
    else out.push({ day, items: [e] })
  }
  return out
})

const clock = (iso: string) => new Date(iso.replace(' ', 'T')).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
const fullDate = (iso: string) => new Date(iso.replace(' ', 'T')).toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
// An editing session shows when it started and when it ended
const timeRange = (e: Entry) => (e.action === 'edit' && clock(e.started_at) !== clock(e.at) ? `${clock(e.started_at)} – ${clock(e.at)}` : clock(e.at))

const GENERIC = ['page', 'new page', '']
const pageLabel = (title: string | null) => (title && !GENERIC.includes(title.trim().toLowerCase()) ? `“${title}”` : 'a page')
const whereNow = (e: Entry) => {
  if (e.page_deleted) return e.page_number ? `was page ${e.page_number}` : ''
  if (e.current_page_number) return `page ${e.current_page_number}`
  return ''
}
const isDeletedPage = (pageId: number | null) => pageId !== null && entries.value.some(e => e.page_id === pageId && e.page_deleted)

// Words gained or lost against the same page's version before it
const delta = (e: Entry): number | null => {
  if (!e.has_content || !e.page_id || e.action === 'delete') return null
  const idx = entries.value.indexOf(e)
  const older = entries.value.slice(idx + 1).find(o => o.page_id === e.page_id && o.has_content)
  if (!older) return null
  const d = e.word_count - older.word_count
  return d === 0 ? null : d
}

const versionHeading = (v: HistoryVersion) => `${ACTION[v.action].verb} ${v.page_id ? pageLabel(v.title) : ''}`.trim()

const openVersion = async (id: number) => {
  try {
    const res = await axios.get(`/api/teacher/enotes/history/${id}`)
    viewing.value = res.data.data
    viewMode.value = viewing.value?.previous && viewing.value.version.action === 'edit' ? 'changes' : 'page'
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not open that version.'
  }
}

const diff = computed(() => (viewing.value?.previous ? diffHtml(viewing.value.previous.content || '', viewing.value.version.content || '') : null))
const condensed = computed(() => (diff.value ? condense(diff.value.parts) : []))
const pageHtml = computed(() => resolveContentAssetUrls(viewing.value?.version.content || '') || '<p class="text-gray-400">This version is empty.</p>')

const restoreHint = computed(() => {
  const v = viewing.value?.version
  if (!v || v.content === null) return ''
  if (isDeletedPage(v.page_id)) return 'Adds this page back at the end of the topic. You can move it after.'
  return 'Puts the page back to exactly this. What it says now stays in the history, so you can always undo.'
})

const restore = () => {
  if (!viewing.value) return
  restoring.value = true
  emit('restore', viewing.value.version, isDeletedPage(viewing.value.version.page_id), ok => {
    restoring.value = false
    if (ok) {
      viewing.value = null
      load()
    }
  })
}
</script>

<style scoped>
.eh-add { @apply no-underline bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100 rounded px-0.5; }
.eh-del { @apply bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-200 rounded px-0.5; }
.eh-page :deep(img) { max-width: 100%; height: auto; }
.eh-fade-enter-active, .eh-fade-leave-active { transition: opacity 0.2s; }
.eh-fade-enter-from, .eh-fade-leave-to { opacity: 0; }
.eh-slide-enter-active, .eh-slide-leave-active { transition: transform 0.25s ease; }
.eh-slide-enter-from, .eh-slide-leave-to { transform: translateX(100%); }
</style>
