<template>
  <!-- The department's term on one printable page, for the staff meeting: the headline figures,
       the streams of each class side by side (which one is behind), curriculum mastery, who needs
       attention, and what each teacher has done. Print hides the app around it. -->
  <div class="term-report w-full max-w-6xl">
    <PageHeader title="Term report" :description="data ? `${deptName} · ${data.term?.name || ''}${data.term?.year ? ` ${data.term.year}` : ''} - ready to print for the staff meeting.` : 'Loading…'" icon="document" accent="indigo" class="print:hidden">
      <template #actions>
        <select v-if="data?.terms.length" v-model.number="termId" class="py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Term">
          <option v-for="t in data.terms" :key="t.id" :value="t.id">{{ t.name }}{{ t.year ? ` · ${t.year}` : '' }}{{ t.is_current ? ' (current)' : '' }}</option>
        </select>
        <button type="button" class="btn-primary" :disabled="!data" @click="print">Print</button>
      </template>
    </PageHeader>

    <!-- What prints at the top instead of the app's header -->
    <div v-if="data" class="hidden print:block mb-4 pb-3 border-b-2 border-gray-900">
      <p class="text-xs uppercase tracking-widest text-gray-500">Department term report</p>
      <h1 class="text-2xl font-bold text-gray-900">{{ deptName }}</h1>
      <p class="text-sm text-gray-600">{{ data.term?.name }}{{ data.term?.year ? ` · ${data.term.year}` : '' }} · {{ fmt(data.term?.start_date) }} – {{ fmt(data.term?.end_date) }} · printed {{ fmt(today) }}</p>
    </div>

    <div v-if="loading && !data" class="space-y-3"><div v-for="i in 3" :key="i" class="h-40 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div></div>

    <template v-else-if="data && data.figures">
      <StatStrip class="mb-4" :items="figureItems" />

      <!-- Streams side by side -->
      <section class="report-card">
        <h2 class="report-title">Streams side by side</h2>
        <p class="report-sub">For each class: assessments set this term, how many scripts came in, the average on returned work, and eNote topics published. Streams behind the best-served stream of their class are marked.</p>
        <div v-for="lvl in levels" :key="lvl.level" class="mt-4 break-inside-avoid">
          <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{{ lvl.level }}</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm table-fixed min-w-[40rem]">
              <colgroup><col class="w-[16%]"><col class="w-[11%]"><col class="w-[13%]"><col class="w-[25%]"><col class="w-[25%]"><col class="w-[10%]"></colgroup>
              <thead>
                <tr class="text-left text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  <th class="py-1.5 pr-3 font-semibold">Stream</th>
                  <th class="py-1.5 px-3 font-semibold text-right">Learners</th>
                  <th class="py-1.5 px-3 font-semibold text-right">Assessments</th>
                  <th class="py-1.5 px-3 font-semibold">Handed in</th>
                  <th class="py-1.5 px-3 font-semibold">Average</th>
                  <th class="py-1.5 pl-3 font-semibold text-right">eNotes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-700/60">
                <tr v-for="s in lvl.streams" :key="s.class_id" :class="lvl.behind.has(s.class_id) ? 'bg-amber-50/70 dark:bg-amber-900/15' : ''">
                  <td class="py-1.5 pr-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {{ s.stream || '-' }}
                    <span v-if="lvl.behind.has(s.class_id)" class="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">behind</span>
                  </td>
                  <td class="py-1.5 px-3 text-right tabular-nums text-gray-600 dark:text-gray-300">{{ s.learners }}</td>
                  <td class="py-1.5 px-3 text-right tabular-nums" :class="s.assessments ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-300 dark:text-gray-600'">{{ s.assessments }}</td>
                  <td class="py-1.5 px-3 min-w-[9rem]">
                    <span v-if="s.expected" class="flex items-center gap-2">
                      <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full bg-sky-500" :style="{ width: `${rate(s)}%` }"></span></span>
                      <span class="text-xs tabular-nums text-gray-600 dark:text-gray-300 w-9 text-right">{{ rate(s) }}%</span>
                    </span>
                    <span v-else class="text-gray-300 dark:text-gray-600">-</span>
                  </td>
                  <td class="py-1.5 px-3 min-w-[9rem]">
                    <span v-if="s.average !== null" class="flex items-center gap-2">
                      <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full" :class="s.average >= 60 ? 'bg-emerald-500' : 'bg-amber-500'" :style="{ width: `${Math.min(100, s.average)}%` }"></span></span>
                      <span class="text-xs tabular-nums font-semibold text-gray-900 dark:text-white w-9 text-right">{{ Math.round(s.average) }}%</span>
                    </span>
                    <span v-else class="text-gray-300 dark:text-gray-600">-</span>
                  </td>
                  <td class="py-1.5 pl-3 text-right tabular-nums" :class="s.enotes ? 'text-gray-900 dark:text-white' : 'text-gray-300 dark:text-gray-600'">{{ s.enotes }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p v-if="!levels.length" class="mt-3 text-sm text-gray-500">No learners are enrolled in the department yet.</p>
      </section>

      <!-- Curriculum mastery -->
      <div class="break-inside-avoid">
        <MasteryOverviewCard endpoint="/api/hod/mastery-overview" />
      </div>

      <!-- Who needs attention -->
      <section v-if="warning" class="report-card break-inside-avoid">
        <h2 class="report-title">Learners who need attention</h2>
        <p class="report-sub">From the early-warning list right now.</p>
        <div class="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
          <div v-for="w in warningItems" :key="w.label" class="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-3 py-2">
            <p class="text-xl font-bold tabular-nums" :class="w.value ? w.tone : 'text-gray-300 dark:text-gray-600'">{{ w.value }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ w.label }}</p>
          </div>
        </div>
        <RouterLink to="/hod/early-warning" class="mt-2 inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline print:hidden">See the names →</RouterLink>
      </section>

      <!-- Teachers -->
      <section class="report-card break-inside-avoid">
        <h2 class="report-title">Teachers this term</h2>
        <div class="mt-2 overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <th class="py-1.5 pr-3 font-semibold">Teacher</th>
                <th class="py-1.5 px-3 font-semibold text-right">Assessments set</th>
                <th class="py-1.5 px-3 font-semibold text-right">eNotes published</th>
                <th class="py-1.5 px-3 font-semibold text-right">Scripts to mark</th>
                <th class="py-1.5 pl-3 font-semibold">Last signed in</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700/60">
              <tr v-for="t in data.teachers" :key="t.id">
                <td class="py-1.5 pr-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">{{ niceName(t.name) }}</td>
                <td class="py-1.5 px-3 text-right tabular-nums" :class="t.assessments ? 'text-gray-900 dark:text-white' : 'text-gray-300 dark:text-gray-600'">{{ t.assessments }}</td>
                <td class="py-1.5 px-3 text-right tabular-nums" :class="t.enotes ? 'text-gray-900 dark:text-white' : 'text-gray-300 dark:text-gray-600'">{{ t.enotes }}</td>
                <td class="py-1.5 px-3 text-right tabular-nums" :class="t.to_mark ? 'text-amber-700 dark:text-amber-300 font-semibold' : 'text-gray-300 dark:text-gray-600'">{{ t.to_mark }}</td>
                <td class="py-1.5 pl-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{{ t.last_login_at ? timeAgo(t.last_login_at) : 'Never' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { apiService } from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import MasteryOverviewCard from '@/components/dashboard/MasteryOverviewCard.vue'
import { niceName, timeAgo } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'

interface Stream { class_id: number; level: string; stream: string; learners: number; assessments: number; handed_in: number; expected: number; returned: number; average: number | null; enotes: number }
interface Payload {
  department: { name: string; code: string; description: string | null } | null
  terms: { id: number; name: string; year: string | null; is_current: boolean }[]
  term: { id: number; name: string; year: string | null; start_date: string; end_date: string } | null
  streams: Stream[]
  teachers: { id: number; name: string; assessments: number; enotes: number; to_mark: number; last_login_at: string | null }[]
  figures: { learners: number; teachers: number; assessments: number; handed_in: number; returned: number; average: number | null; to_mark: number; enotes: number } | null
}

const toast = useToastStore()
const data = ref<Payload | null>(null)
const loading = ref(true)
const termId = ref<number>(0)
const warning = ref<Record<string, number> | null>(null)
const today = new Date().toISOString().slice(0, 10)

const deptName = computed(() => data.value?.department ? (data.value.department.description || data.value.department.name) : '')
const fmt = (d?: string | null) => (d ? new Date(`${d}T00:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '')
const rate = (s: Stream) => (s.expected ? Math.min(100, Math.round((s.handed_in / s.expected) * 100)) : 0)

const figureItems = computed<StatItem[]>(() => {
  const f = data.value!.figures!
  return [
    { label: 'Learners', value: f.learners.toLocaleString(), tone: 'indigo' },
    { label: 'Assessments set', value: f.assessments, tone: 'violet' },
    { label: 'Scripts handed in', value: f.handed_in, tone: 'sky', hint: `${f.returned} returned` },
    { label: 'Average (returned)', value: f.average !== null ? `${Math.round(f.average)}%` : '-', tone: 'emerald' },
    { label: 'Still to mark', value: f.to_mark, tone: 'amber' }
  ]
})

// Streams grouped by class level. A stream is "behind" when it has had fewer assessments than the
// class's best-served stream, or hands in markedly less (25 points under the best rate)
const levels = computed(() => {
  const by = new Map<string, Stream[]>()
  for (const s of data.value?.streams || []) {
    if (!by.has(s.level)) by.set(s.level, [])
    by.get(s.level)!.push(s)
  }
  return [...by.entries()].map(([level, streams]) => {
    const behind = new Set<number>()
    if (streams.length > 1) {
      const most = Math.max(...streams.map(s => s.assessments))
      const bestRate = Math.max(...streams.map(rate))
      for (const s of streams) {
        if (most > 0 && (s.assessments < most || rate(s) < bestRate - 25)) behind.add(s.class_id)
      }
    }
    return { level, streams, behind }
  })
})

const warningItems = computed(() => {
  const w = warning.value || {}
  return [
    { label: 'Low results', value: w.low || 0, tone: 'text-rose-600 dark:text-rose-400' },
    { label: 'Falling', value: w.falling || 0, tone: 'text-amber-600 dark:text-amber-400' },
    { label: 'Missing work', value: w.missed || 0, tone: 'text-amber-600 dark:text-amber-400' },
    { label: 'Gone quiet', value: w.quiet || 0, tone: 'text-sky-600 dark:text-sky-400' },
    { label: 'Never signed in', value: w.never || 0, tone: 'text-gray-600 dark:text-gray-300' }
  ]
})

const load = async () => {
  loading.value = true
  try {
    const res = await apiService.get('/hod/term-report', termId.value ? { term_id: termId.value } : {})
    data.value = res.data.data
    if (data.value?.term && termId.value !== data.value.term.id) termId.value = data.value.term.id
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not build the report')
  } finally {
    loading.value = false
  }
}

const print = () => window.print()

watch(termId, (id, old) => { if (old && id !== old) load() })
onMounted(async () => {
  await load()
  try {
    const res = await apiService.get('/hod/early-warning')
    warning.value = res.data.data.summary || null
  } catch {
    warning.value = null
  }
})
</script>

<style scoped>
.report-card { @apply rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 mb-4; }
.report-title { @apply text-base font-bold text-gray-900 dark:text-white; }
.report-sub { @apply text-xs text-gray-500 dark:text-gray-400 mt-0.5; }
@media print {
  .term-report { max-width: none; }
  .report-card { border-color: #d1d5db; box-shadow: none; }
}
</style>
