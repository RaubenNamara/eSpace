<template>
  <!-- Download class lists: one page per stream, for the whole school, whole classes or chosen streams -->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="emit('close')">
    <div class="w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
      <div class="flex items-start justify-between gap-3 p-5 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Download class lists</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">A PDF with each stream on its own page: reg number, name and sex, in alphabetical order.</p>
        </div>
        <button type="button" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none" aria-label="Close" @click="emit('close')">&times;</button>
      </div>

      <div class="p-5 overflow-y-auto space-y-3">
        <label class="flex items-center gap-2.5 rounded-xl border p-3 cursor-pointer" :class="wholeSchool ? 'border-indigo-400 bg-indigo-50/70 dark:bg-indigo-900/20 dark:border-indigo-700' : 'border-gray-200 dark:border-gray-700'">
          <input type="checkbox" :checked="wholeSchool" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" @change="toggleWholeSchool">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">Whole school</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ streams.length }} streams · {{ totalLearners }} learners</span>
        </label>

        <div v-for="g in groups" :key="g.name" class="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" :checked="groupAllOn(g)" :indeterminate.prop="groupSomeOn(g)" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" @change="toggleGroup(g)">
            <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ g.name }} - all streams</span>
            <span class="text-xs text-gray-400">{{ g.streams.reduce((n, s) => n + countOf(s.id), 0) }} learners</span>
          </label>
          <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 pl-6">
            <label v-for="s in g.streams" :key="s.id" class="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
              <input type="checkbox" :checked="selected.has(s.id)" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" @change="toggleStream(s.id)">
              {{ s.stream_name || s.name }} <span class="text-xs text-gray-400">({{ countOf(s.id) }})</span>
            </label>
          </div>
        </div>
        <p v-if="loading" class="text-sm text-gray-500">Loading learners...</p>
      </div>

      <div class="flex items-center justify-between gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ selected.size }} {{ selected.size === 1 ? 'page' : 'pages' }} · {{ selectedLearners }} learners</p>
        <div class="flex gap-2">
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="emit('close')">Cancel</button>
          <button type="button" class="btn-primary disabled:opacity-50" :disabled="!selected.size || loading || building" @click="download">
            {{ building ? 'Preparing...' : 'Download PDF' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { apiService } from '../../services/api'
import { useToastStore } from '@/stores/toast'
import { buildClassListPdf, type ClassListStudent } from '@/utils/classListPdf'

interface Stream { id: number; name: string; level: string; stream_name?: string }
interface Learner extends ClassListStudent { class_id: number | null }

const props = defineProps<{ classes: Stream[]; preselectId?: string }>()
const emit = defineEmits<{ close: [] }>()
const toast = useToastStore()

const learners = ref<Learner[]>([])
const school = ref<string | null>(null)
const loading = ref(true)
const building = ref(false)
const selected = reactive(new Set<number>())

const counts = computed(() => {
  const m = new Map<number, number>()
  learners.value.forEach(l => { if (l.class_id) m.set(l.class_id, (m.get(l.class_id) ?? 0) + 1) })
  return m
})
const countOf = (id: number) => counts.value.get(id) ?? 0

// Streams in class order (S.1 A, S.1 B, ... S.6 SB2); empty streams left out
const streams = computed(() => [...props.classes]
  .filter(c => countOf(c.id) > 0)
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }) || (a.stream_name ?? '').localeCompare(b.stream_name ?? '', undefined, { numeric: true })))
const groups = computed(() => {
  const m = new Map<string, Stream[]>()
  streams.value.forEach(s => { if (!m.has(s.name)) m.set(s.name, []); m.get(s.name)!.push(s) })
  return [...m.entries()].map(([name, list]) => ({ name, streams: list }))
})
const totalLearners = computed(() => streams.value.reduce((n, s) => n + countOf(s.id), 0))
const selectedLearners = computed(() => [...selected].reduce((n, id) => n + countOf(id), 0))
const wholeSchool = computed(() => streams.value.length > 0 && streams.value.every(s => selected.has(s.id)))

const groupAllOn = (g: { streams: Stream[] }) => g.streams.every(s => selected.has(s.id))
const groupSomeOn = (g: { streams: Stream[] }) => !groupAllOn(g) && g.streams.some(s => selected.has(s.id))
const toggleStream = (id: number) => { selected.has(id) ? selected.delete(id) : selected.add(id) }
const toggleGroup = (g: { streams: Stream[] }) => {
  const on = !groupAllOn(g)
  g.streams.forEach(s => on ? selected.add(s.id) : selected.delete(s.id))
}
const toggleWholeSchool = () => {
  const on = !wholeSchool.value
  selected.clear()
  if (on) streams.value.forEach(s => selected.add(s.id))
}

const titleOf = (s: Stream) => `${s.name}${s.stream_name ? ` ${s.stream_name}` : ''}`

function scopeLabel(chosen: Stream[]) {
  if (wholeSchool.value) return 'Whole school'
  const full = groups.value.filter(g => groupAllOn(g)).map(g => g.name)
  if (full.length && chosen.every(s => full.includes(s.name))) return full.join(', ')
  return chosen.length === 1 ? titleOf(chosen[0]) : `${chosen.length} streams`
}

function fileName(chosen: Stream[]) {
  const label = wholeSchool.value ? 'whole-school' : chosen.length === 1 ? titleOf(chosen[0]) : scopeLabel(chosen)
  return `class-lists-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.pdf`
}

async function download() {
  building.value = true
  try {
    const chosen = streams.value.filter(s => selected.has(s.id))
    const pages = chosen.map(s => ({ title: titleOf(s), students: learners.value.filter(l => l.class_id === s.id) }))
    buildClassListPdf(pages, school.value, scopeLabel(chosen)).save(fileName(chosen))
  } catch (e) {
    console.error(e)
    toast.error('Could not make the class lists')
  } finally {
    building.value = false
  }
}

onMounted(async () => {
  try {
    const [list, settings] = await Promise.all([
      apiService.get('/admin/students', { page: 1, limit: 10000 }),
      apiService.get('/admin/settings').catch(() => null),
    ])
    learners.value = list.data?.data?.students ?? []
    school.value = settings?.data?.data?.school_name ?? null
    // Start with the class picked in the Students filter, if any
    const pre = Number(props.preselectId)
    if (pre && countOf(pre)) selected.add(pre)
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not load the learners')
  } finally {
    loading.value = false
  }
})
</script>
