<template>
  <!-- HOD moderation of what the department's teachers upload - eLibrary books, Item Bank papers
       or videos (one component, three kinds): publish, draft, archive, delete, preview, and the
       same in bulk. -->
  <div class="w-full">
    <PageHeader :title="cfg.title" :description="cfg.description" :icon="cfg.icon" accent="indigo">
      <StatStrip v-if="!loading && items.length" v-model="status" :items="statItems" />
      <template #filters>
        <div class="relative w-full sm:w-72">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" :placeholder="`Search ${cfg.plural}`" class="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
        </div>
      </template>
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="4" />
    <EmptyState v-else-if="!items.length" :icon="cfg.icon" tone="indigo" :title="`No ${cfg.plural} yet`" :message="`When teachers in your department upload ${cfg.plural}, you can publish, archive or remove them here.`" />
    <EmptyState v-else-if="!shown.length" compact :icon="cfg.icon" title="Nothing matches" message="Try another word or status." />

    <template v-else>
      <div class="mb-2 flex items-center gap-3">
        <label class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input type="checkbox" :checked="bulk.allSelected(shownIds)" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500" @change="bulk.toggleAll(shownIds)">
          Select all {{ shown.length }}
        </label>
      </div>

      <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
        <button v-for="s in STATUSES" :key="s.key" type="button" class="px-2.5 py-1 min-h-[32px] text-xs font-semibold rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="bulkStatus(s.key)">{{ s.action }}</button>
        <button type="button" class="px-2.5 py-1 min-h-[32px] text-xs font-semibold rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="bulkExport">Export CSV</button>
        <button type="button" class="px-2.5 py-1 min-h-[32px] text-xs font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-700" @click="bulkDelete">Delete</button>
      </BulkActionBar>

      <ul class="space-y-2">
        <li v-for="it in shown" :key="it.id" class="rounded-2xl border bg-white dark:bg-gray-800 p-3 sm:p-4 flex items-center gap-3" :class="bulk.isSelected(it.id) ? 'border-indigo-400 ring-1 ring-indigo-200 dark:ring-indigo-800' : 'border-gray-200 dark:border-gray-700'">
          <input type="checkbox" :checked="bulk.isSelected(it.id)" class="flex-shrink-0 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500" :aria-label="`Select ${it.title}`" @change="bulk.toggle(it.id)">
          <button type="button" class="flex-shrink-0 rounded-xl overflow-hidden" :class="kind === 'videos' ? 'w-24 sm:w-32' : ''" :aria-label="`Preview ${it.title}`" @click="preview = it">
            <VideoCover v-if="kind === 'videos'" :video="full(it)" />
            <span v-else class="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300"><AppIcon :name="cfg.icon" class="w-5 h-5" /></span>
          </button>
          <button type="button" class="min-w-0 flex-1 text-left" @click="preview = it">
            <span class="block font-semibold text-gray-900 dark:text-white truncate">{{ it.title }}</span>
            <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ [teacherName(it), it.subject_name, classLabel(it), size(it.file_size)].filter(Boolean).join(' · ') }}</span>
          </button>
          <span class="hidden sm:inline px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize flex-shrink-0" :class="CHIP[it.status] || CHIP.archived">{{ it.status }}</span>
          <ActionMenu :items="menu(it)" />
        </li>
      </ul>
    </template>

    <!-- Preview -->
    <LibraryDocumentViewer v-if="preview && kind === 'library'" :book="full(preview)" @close="preview = null" />
    <ItemBankPdfViewer v-if="preview && kind === 'itembank'" :resource="full(preview)" @close="preview = null" />
    <div v-if="preview && kind === 'videos'" class="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4" @click.self="preview = null">
      <div class="w-full max-w-3xl">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white font-semibold truncate">{{ preview.title }}</h3>
          <button type="button" class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white flex-shrink-0" aria-label="Close" @click="preview = null">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <video :src="resolveAssetUrl(preview.file_path)" controls autoplay class="w-full rounded-xl max-h-[75vh] bg-black"></video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiService } from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import ActionMenu, { type ActionItem } from '@/components/ui/ActionMenu.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import LibraryDocumentViewer from '@/components/library/LibraryDocumentViewer.vue'
import ItemBankPdfViewer from '@/components/itembank/ItemBankPdfViewer.vue'
import VideoCover from '@/components/video/VideoCover.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'
import { resolveAssetUrl } from '@/utils/url'
import { niceName } from '@/components/dashboard/teacher/time'

type Kind = 'library' | 'itembank' | 'videos'
type Status = 'draft' | 'published' | 'archived'
// The three kinds share every field this page uses
interface Item {
  id: number
  title: string
  status: Status
  file_path?: string
  file_size?: number | null
  subject_name?: string | null
  class_name?: string | null
  class_stream_name?: string | null
  teacher_first_name?: string | null
  teacher_last_name?: string | null
  [key: string]: any
}

const props = defineProps<{ kind: Kind }>()

const CONFIG: Record<Kind, { title: string; description: string; icon: string; api: string; key: string; one: string; plural: string }> = {
  library: { title: 'eLibrary', description: 'Books and slides your department\'s teachers upload - publish, archive or remove them.', icon: 'book', api: '/hod/library', key: 'books', one: 'book', plural: 'books' },
  itembank: { title: 'Item Bank', description: 'Past papers and practice packs your teachers upload - publish, archive or remove them.', icon: 'clipboard', api: '/hod/itembank', key: 'resources', one: 'paper', plural: 'papers' },
  videos: { title: 'Videos', description: 'Video lessons your teachers upload - watch, publish, archive or remove them.', icon: 'video', api: '/hod/videos', key: 'videos', one: 'video', plural: 'videos' }
}
const STATUSES: { key: Status; label: string; action: string }[] = [
  { key: 'published', label: 'Published', action: 'Publish' },
  { key: 'draft', label: 'Drafts', action: 'Set to draft' },
  { key: 'archived', label: 'Archived', action: 'Archive' }
]
const CHIP: Record<string, string> = {
  published: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  draft: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  archived: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
}

const cfg = computed(() => CONFIG[props.kind])
// A row is the API's full record for its kind; the viewers take that full type
const full = (i: Item) => i as any
const toast = useToastStore()
const confirmDialog = useConfirmStore()
const bulk = useBulkSelection<number>()

const items = ref<Item[]>([])
const loading = ref(true)
const search = ref('')
const status = usePersistedRef<string | null>(`hod-${props.kind}:status`, null)
const preview = ref<Item | null>(null)

const statItems = computed<StatItem[]>(() => [
  ...STATUSES.map(s => ({ label: s.label, value: items.value.filter(i => i.status === s.key).length, key: s.key, tone: (s.key === 'published' ? 'emerald' : s.key === 'draft' ? 'amber' : 'gray') as StatItem['tone'] })),
  { label: `All ${cfg.value.plural}`, value: items.value.length, key: 'all', tone: 'indigo' }
])
const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  return items.value.filter(i =>
    (!status.value || status.value === 'all' || i.status === status.value) &&
    (!q || [i.title, teacherName(i), i.subject_name, classLabel(i)].join(' ').toLowerCase().includes(q)))
})
const shownIds = computed(() => shown.value.map(i => i.id))

const teacherName = (i: Item) => (i.teacher_first_name ? niceName(`${i.teacher_first_name} ${i.teacher_last_name || ''}`) : '')
const classLabel = (i: Item) => (i.class_name ? `${i.class_name}${i.class_stream_name ? '-' + i.class_stream_name : ''}` : '')
const size = (bytes?: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const menu = (it: Item): ActionItem[] => [
  { label: props.kind === 'videos' ? 'Watch' : 'Preview', icon: props.kind === 'videos' ? 'video' : 'document', run: () => (preview.value = it) },
  ...STATUSES.filter(s => s.key !== it.status).map((s, i) => ({ label: s.action, icon: s.key === 'published' ? 'check-circle' : s.key === 'draft' ? 'pencil' : 'download', divider: i === 0, run: () => setStatus(it, s.key) })),
  { label: 'Delete', icon: 'trash', danger: true, divider: true, run: () => remove(it) }
]

const load = async () => {
  try {
    const response = await apiService.get(cfg.value.api)
    items.value = response.data.data[cfg.value.key] || []
  } catch (err: any) {
    toast.error(err.response?.data?.message || `Could not load the ${cfg.value.plural}`)
  } finally {
    loading.value = false
  }
}

const setStatus = async (it: Item, s: Status) => {
  try {
    await apiService.put(`${cfg.value.api}/${it.id}`, { status: s })
    it.status = s
    toast.success(`${it.title}: ${s}`)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not change the status')
  }
}
const remove = async (it: Item) => {
  if (!await confirmDialog.open({ title: `Delete ${cfg.value.one}`, message: `Delete "${it.title}"? This can't be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await apiService.delete(`${cfg.value.api}/${it.id}`)
    items.value = items.value.filter(x => x.id !== it.id)
    toast.success('Deleted')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not delete it')
  }
}
const bulkStatus = async (s: Status) => {
  const ids = bulk.selectedArray()
  if (!ids.length) return
  try {
    await apiService.post(`${cfg.value.api}/bulk-status`, { ids, status: s })
    items.value.forEach(i => { if (ids.includes(i.id)) i.status = s })
    toast.success(`${ids.length} updated`)
    bulk.clear()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not update them')
  }
}
const bulkDelete = async () => {
  const ids = bulk.selectedArray()
  if (!ids.length) return
  if (!await confirmDialog.open({ title: `Delete ${cfg.value.plural}`, message: `Delete ${ids.length} ${ids.length === 1 ? cfg.value.one : cfg.value.plural}? This can't be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await apiService.post(`${cfg.value.api}/bulk-delete`, { ids })
    items.value = items.value.filter(i => !ids.includes(i.id))
    toast.success(`${ids.length} deleted`)
    bulk.clear()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not delete them')
  }
}
const bulkExport = async () => {
  try {
    const response = await apiService.post(`${cfg.value.api}/bulk-export`, { ids: bulk.selectedArray() }, { responseType: 'blob' })
    downloadBlob(response.data as unknown as Blob, `${props.kind}.csv`)
  } catch {
    toast.error('Could not export them')
  }
}

onMounted(load)
</script>
