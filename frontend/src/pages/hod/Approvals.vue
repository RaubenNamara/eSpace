<template>
  <!-- The HOD's approvals: teachers' eNotes, library books, Item Bank papers and videos waiting
       before students can see them, grouped by class. Approve publishes it (and tells the class);
       Return sends it back to the teacher as a draft with a note. See backend Services/ContentApproval. -->
  <div>
    <PageHeader title="Approvals" description="Work your teachers want to publish - by class. Students only see it once you approve it." icon="check" accent="indigo" />

    <!-- what is waiting, by kind -->
    <div class="mb-3 flex flex-wrap items-center gap-1.5">
      <button v-for="t in TYPES" :key="t.key" type="button" class="px-3 py-1.5 rounded-xl text-sm font-semibold border transition-colors" :class="kind === t.key ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-indigo-300'" @click="kind = t.key">
        {{ t.label }} <span class="ml-0.5 text-xs opacity-75">{{ countOf(t.key) }}</span>
      </button>
      <input v-model="q" type="search" placeholder="Search title or teacher" class="ml-auto w-full sm:w-60 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-sm">
    </div>

    <div v-if="loading" class="space-y-3"><div v-for="i in 3" :key="i" class="h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div></div>
    <p v-else-if="error" class="rounded-xl bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200 px-4 py-3 text-sm">{{ error }}</p>

    <div v-else-if="!groups.length" class="dash-box">
      <div class="p-6 flex items-center gap-4">
        <span class="w-12 h-12 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center"><AppIcon name="check" class="w-6 h-6" /></span>
        <div>
          <p class="text-base font-bold text-gray-900 dark:text-white">{{ items.length ? 'Nothing matches' : 'Nothing waiting - you\'re all caught up' }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">When a teacher publishes an eNote, a library book, an Item Bank paper or a video, it waits here for you before students see it.</p>
        </div>
      </div>
    </div>

    <!-- one box per class -->
    <div v-else class="space-y-4">
      <section v-for="g in groups" :key="g.key" class="dash-box">
        <h2 class="dash-bar">
          <span>{{ g.label }}</span>
          <span class="px-2 py-0.5 rounded-full bg-amber-400 text-gray-900 text-xs font-extrabold">{{ g.items.length }}</span>
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">waiting</span>
        </h2>
        <ul class="divide-y divide-gray-100 dark:divide-gray-700/60">
          <li v-for="a in g.items" :id="`item-${a.type}-${a.id}`" :key="`${a.type}-${a.id}`" class="p-3 sm:p-4 transition-colors" :class="focused === `${a.type}-${a.id}` ? 'bg-amber-50 dark:bg-amber-900/20' : ''">
            <div class="flex flex-wrap sm:flex-nowrap items-start gap-3">
              <span class="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-white text-xs font-bold" :class="BADGE[a.type].cls">{{ BADGE[a.type].short }}</span>
              <div class="min-w-0 flex-1">
                <p class="text-[15px] font-bold text-gray-900 dark:text-white leading-snug">{{ a.title }}</p>
                <p class="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                  <span class="font-semibold">{{ a.type_label }}</span>
                  <template v-if="a.subject_name"> · {{ a.subject_name }}</template>
                  <template v-if="a.type === 'enote' && a.pages"> · {{ a.pages }} page{{ Number(a.pages) === 1 ? '' : 's' }}</template>
                  · by <span class="font-semibold">{{ niceName(a.teacher_name || 'a teacher') }}</span>
                  <template v-if="a.submitted_at"> · sent {{ timeAgo(a.submitted_at) }}</template>
                </p>
              </div>
              <div class="w-full sm:w-auto flex flex-wrap items-center gap-1.5 sm:justify-end">
                <RouterLink v-if="a.type === 'enote'" :to="`/hod/enotes/${a.id}`" class="btn-secondary !py-1.5 !text-sm">Read it</RouterLink>
                <a v-else-if="a.file_url" :href="resolveAssetUrl(a.file_url)" target="_blank" rel="noopener" class="btn-secondary !py-1.5 !text-sm">Open</a>
                <button type="button" class="px-3 py-1.5 rounded-xl text-sm font-semibold border-2 border-rose-300 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30" :disabled="busy === key(a)" @click="startReturn(a)">Return</button>
                <button type="button" class="px-3 py-1.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60" :disabled="busy === key(a)" @click="approve(a)">{{ busy === key(a) ? 'Saving...' : 'Approve' }}</button>
              </div>
            </div>

            <!-- returning it: say what to change -->
            <div v-if="returning === key(a)" class="mt-3 rounded-xl border-2 border-rose-200 dark:border-rose-800 p-3">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">What should {{ niceName((a.teacher_name || 'the teacher').split(' ')[0]) }} change?</p>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <button v-for="r in REASONS" :key="r" type="button" class="px-2 py-1 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600 hover:border-rose-400" @click="note = note ? `${note} ${r}` : r">{{ r }}</button>
              </div>
              <textarea v-model="note" rows="2" maxlength="500" class="mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm" placeholder="Your note to the teacher"></textarea>
              <div class="mt-2 flex justify-end gap-2">
                <button type="button" class="btn-secondary !py-1.5 !text-sm" @click="returning = null">Cancel</button>
                <button type="button" class="px-3 py-1.5 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-60" :disabled="!note.trim() || busy === key(a)" @click="sendBack(a)">Send back to the teacher</button>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
      <b>How it works:</b> a teacher's work waits here when they publish it. <b>Approve</b> publishes it and tells the class it is there.
      <b>Return</b> sends it back to the teacher as a draft with your note; they fix it and publish again. Work you approve once does not come back if they re-publish it.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { apiService } from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useToastStore } from '@/stores/toast'
import { resolveAssetUrl } from '@/utils/url'
import { niceName, timeAgo } from '@/components/dashboard/teacher/time'

interface Item {
  id: number
  type: 'enote' | 'library' | 'itembank' | 'video'
  type_label: string
  title: string
  class_id: number | null
  class_name: string | null
  stream_name?: string | null
  class_group_name: string | null
  subject_name: string | null
  teacher_name: string | null
  submitted_at: string | null
  file_url?: string | null
  pages?: number | string
}

const TYPES = [
  { key: 'all', label: 'All' },
  { key: 'enote', label: 'eNotes' },
  { key: 'library', label: 'Library books' },
  { key: 'itembank', label: 'Item Bank' },
  { key: 'video', label: 'Videos' }
] as const
const BADGE: Record<Item['type'], { short: string; cls: string }> = {
  enote: { short: 'eN', cls: 'bg-indigo-700' },
  library: { short: 'BK', cls: 'bg-amber-600' },
  itembank: { short: 'IB', cls: 'bg-slate-700' },
  video: { short: 'VD', cls: 'bg-rose-600' }
}
const REASONS = ['Please check the spelling.', 'Add more examples.', 'Some content is not in the syllabus.', 'It is for the wrong class.', 'The file does not open.']

const route = useRoute()
const toast = useToastStore()
const items = ref<Item[]>([])
const loading = ref(true)
const error = ref('')
const kind = ref<string>('all')
const q = ref('')
const busy = ref<string | null>(null)
const returning = ref<string | null>(null)
const note = ref('')
const focused = ref<string | null>(null)
const key = (a: Item) => `${a.type}-${a.id}`
const countOf = (k: string) => (k === 'all' ? items.value.length : items.value.filter(a => a.type === k).length)

// one group per class (and stream), in class order
const groups = computed(() => {
  const text = q.value.trim().toLowerCase()
  const list = items.value.filter(a => (kind.value === 'all' || a.type === kind.value)
    && (!text || a.title.toLowerCase().includes(text) || String(a.teacher_name || '').toLowerCase().includes(text)))
  const map = new Map<string, { key: string; label: string; order: string; items: Item[] }>()
  for (const a of list) {
    const label = a.class_name ? `${a.class_name}${a.stream_name ? ' ' + a.stream_name : ''}` : a.class_group_name ? `${a.class_group_name} - all streams` : 'Whole department'
    const g = map.get(label) || { key: label, label, order: a.class_name || a.class_group_name || 'zzz', items: [] }
    g.items.push(a)
    map.set(label, g)
  }
  return [...map.values()].sort((x, y) => x.order.localeCompare(y.order, undefined, { numeric: true }) || x.label.localeCompare(y.label))
})

async function load() {
  loading.value = true
  error.value = ''
  try {
    const r = await apiService.get('/hod/approvals')
    items.value = r.data?.data?.items || []
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Could not load the approvals'
  } finally {
    loading.value = false
  }
}

async function approve(a: Item) {
  busy.value = key(a)
  try {
    await apiService.post(`/hod/approvals/${a.type}/${a.id}/approve`, {})
    items.value = items.value.filter(x => key(x) !== key(a))
    toast.success(`"${a.title}" approved - ${a.class_name ? a.class_name + ' students' : 'students'} can see it now`)
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'Could not approve it')
    await load()
  } finally {
    busy.value = null
  }
}
function startReturn(a: Item) {
  returning.value = key(a)
  note.value = ''
}
async function sendBack(a: Item) {
  busy.value = key(a)
  try {
    await apiService.post(`/hod/approvals/${a.type}/${a.id}/return`, { note: note.value.trim() })
    items.value = items.value.filter(x => key(x) !== key(a))
    returning.value = null
    toast.success(`Returned to ${niceName(a.teacher_name || 'the teacher')} with your note`)
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'Could not return it')
  } finally {
    busy.value = null
  }
}

onMounted(async () => {
  await load()
  // opened from the dashboard on one item: bring it into view
  const open = String(route.query.open || '')
  if (open) {
    focused.value = open
    await nextTick()
    document.getElementById(`item-${open}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
})
</script>
