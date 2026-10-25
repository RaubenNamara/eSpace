<template>
  <!-- The teacher follow-up report for a term, ready to print for the head teacher or a staff
       meeting: who missed the marking deadline, who is still marking, who set nothing, whose
       learners are not handing in, which classes had nothing set or published, and who has not
       signed in. From Supervision (Print report). Print hides the app around it. -->
  <div class="teacher-report w-full max-w-6xl">
    <PageHeader title="Teacher follow-up report" description="Marking, work set, hand-in and inactive classes for a term - ready to print." icon="document" accent="indigo" class="print:hidden">
      <template #actions>
        <RouterLink to="/admin/supervision" class="btn-secondary">Supervision</RouterLink>
        <button type="button" class="btn-primary" :disabled="!data" @click="print">Print</button>
      </template>
      <template #filters>
        <select v-model.number="termId" aria-label="Term" class="w-full sm:w-auto py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option v-for="t in terms" :key="t.id" :value="t.id">{{ t.name }}</option>
        </select>
        <select v-model.number="departmentId" aria-label="Department" class="w-full sm:w-56 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option :value="0">All departments</option>
          <option v-for="d in departments" :key="d.id" :value="d.id">{{ d.name }}</option>
        </select>
      </template>
    </PageHeader>

    <div v-if="loading && !data" class="space-y-3"><div v-for="i in 3" :key="i" class="h-32 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div></div>

    <template v-else-if="data">
      <!-- the letterhead -->
      <header class="dash-box mb-4 flex items-center gap-4 p-4 sm:p-5 border-t-4 !border-t-indigo-600">
        <img v-if="data.school?.logo_path && !logoFailed" :src="resolveAssetUrl(data.school.logo_path)" alt="" class="w-16 h-16 object-contain flex-shrink-0" @error="logoFailed = true">
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">{{ data.school?.school_name || 'School' }}</p>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">Teacher follow-up report</h1>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ data.term.name }} · {{ fmt(data.term.start_date) }} – {{ fmt(data.term.end_date) }}{{ data.department ? ` · ${data.department} department` : ' · whole school' }} · printed {{ fmt(data.generated_at) }}
          </p>
        </div>
      </header>

      <!-- the figures -->
      <div class="dash-box mb-4">
        <h2 class="dash-bar">At a glance<span class="dash-bar-link !no-underline">{{ data.teachers_total }} teachers</span></h2>
        <div class="p-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <a v-for="f in figures" :key="f.id" :href="`#${f.id}`" class="dash-chip !flex-col !items-start !gap-0 px-3 py-2" :class="f.n && f.alert ? 'dash-chip-alert' : ''">
          <p class="text-2xl font-bold tabular-nums" :class="f.n ? f.tone : 'text-gray-400'">{{ f.n }}</p>
          <p class="text-xs text-gray-600 dark:text-gray-300 leading-snug">{{ f.label }}</p>
        </a>
        </div>
      </div>

      <!-- 1. missed the marking deadline -->
      <section id="r-late" class="dash-box mb-4 break-inside-avoid-page">
        <h2 class="dash-bar">1. Missed the marking deadline<span class="ml-auto px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums" :class="data.late_marking.length ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'">{{ data.late_marking.length }}</span></h2>
        <div class="px-4 py-3">
        <p class="report-sub !mt-0">Scripts handed in more than {{ data.marking_days }} days ago and still not marked.</p>
        <p v-if="!data.late_marking.length" class="report-none">None - every script is marked within {{ data.marking_days }} days.</p>
        <table v-else class="report-table">
          <thead><tr><th>Teacher</th><th>Department</th><th class="text-right">Overdue scripts</th><th class="text-right">Oldest</th><th>Waiting on</th></tr></thead>
          <tbody>
            <tr v-for="t in data.late_marking" :key="t.id">
              <td class="font-semibold">{{ t.name }}</td>
              <td>{{ t.departments || '-' }}</td>
              <td class="text-right tabular-nums font-semibold text-rose-700 dark:text-rose-300">{{ t.overdue }}</td>
              <td class="text-right tabular-nums">{{ t.oldest_days }} days</td>
              <td class="text-xs"><span v-for="(a, i) in t.assessments" :key="i" class="block">{{ a.title }} · {{ a.class }} · {{ a.waiting }} waiting{{ a.days !== null ? `, ${a.days} days` : '' }}</span></td>
            </tr>
          </tbody>
        </table>
        </div>
      </section>

      <!-- 2. still marking -->
      <section id="r-marking" class="dash-box mb-4 break-inside-avoid-page">
        <h2 class="dash-bar">2. Not marked yet<span class="ml-auto px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums" :class="data.still_marking.length ? 'bg-amber-400 text-gray-900' : 'bg-indigo-600 text-white'">{{ data.still_marking.length }}</span></h2>
        <div class="px-4 py-3">
        <p class="report-sub !mt-0">Scripts handed in within the last {{ data.marking_days }} days, still waiting to be marked.</p>
        <p v-if="!data.still_marking.length" class="report-none">None waiting.</p>
        <table v-else class="report-table">
          <thead><tr><th>Teacher</th><th>Department</th><th class="text-right">Scripts waiting</th><th>Waiting on</th></tr></thead>
          <tbody>
            <tr v-for="t in data.still_marking" :key="t.id">
              <td class="font-semibold">{{ t.name }}</td>
              <td>{{ t.departments || '-' }}</td>
              <td class="text-right tabular-nums font-semibold">{{ t.waiting }}</td>
              <td class="text-xs"><span v-for="(a, i) in t.assessments" :key="i" class="block">{{ a.title }} · {{ a.class }} · {{ a.waiting }} waiting</span></td>
            </tr>
          </tbody>
        </table>
        </div>
      </section>

      <!-- 3. nothing set -->
      <section id="r-none" class="dash-box mb-4 break-inside-avoid-page">
        <h2 class="dash-bar">3. Nothing set this term<span class="ml-auto px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums" :class="data.none_set.length ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'">{{ data.none_set.length }}</span></h2>
        <div class="px-4 py-3">
        <p class="report-sub !mt-0">Teachers with no assessment published this term.</p>
        <p v-if="!data.none_set.length" class="report-none">None - every teacher has set work.</p>
        <table v-else class="report-table">
          <thead><tr><th>Teacher</th><th>Department</th><th class="text-right">eNotes published</th><th class="text-right">Drafts not published</th><th>Last signed in</th></tr></thead>
          <tbody>
            <tr v-for="t in data.none_set" :key="t.id">
              <td class="font-semibold">{{ t.name }}</td>
              <td>{{ t.departments || '-' }}</td>
              <td class="text-right tabular-nums">{{ t.enotes }}</td>
              <td class="text-right tabular-nums">{{ t.drafts }}</td>
              <td>{{ t.last_seen ? fmt(t.last_seen) : 'Never' }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </section>

      <!-- 4. learners not handing in -->
      <section id="r-handin" class="dash-box mb-4 break-inside-avoid-page">
        <h2 class="dash-bar">4. Learners not handing in<span class="ml-auto px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums" :class="data.low_hand_in.length ? 'bg-amber-400 text-gray-900' : 'bg-indigo-600 text-white'">{{ data.low_hand_in.length }}</span></h2>
        <div class="px-4 py-3">
        <p class="report-sub !mt-0">Teachers whose closed assessments had fewer than half of their learners hand in.</p>
        <p v-if="!data.low_hand_in.length" class="report-none">None.</p>
        <table v-else class="report-table">
          <thead><tr><th>Teacher</th><th>Department</th><th class="text-right">Assessments set</th><th class="text-right">Handed in</th><th class="text-right">Learners who missed</th></tr></thead>
          <tbody>
            <tr v-for="t in data.low_hand_in" :key="t.id">
              <td class="font-semibold">{{ t.name }}</td>
              <td>{{ t.departments || '-' }}</td>
              <td class="text-right tabular-nums">{{ t.set }}</td>
              <td class="text-right tabular-nums font-semibold text-amber-700 dark:text-amber-300">{{ t.hand_in_rate }}%</td>
              <td class="text-right tabular-nums">{{ t.missing }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </section>

      <!-- 5. classes not active -->
      <section id="r-classes" class="dash-box mb-4 break-inside-avoid-page">
        <h2 class="dash-bar">5. Classes not active<span class="ml-auto px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums" :class="data.inactive_classes.length ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'">{{ data.inactive_classes.length }}</span></h2>
        <div class="px-4 py-3">
        <p class="report-sub !mt-0">Class streams with learners in a department, but no assessment set and no eNote published for them this term. In brackets: the learners; then the teacher, where one is known.</p>
        <p v-if="!data.inactive_classes.length" class="report-none">None - every class has had work this term.</p>
        <div v-else class="mt-2 divide-y divide-gray-100 dark:divide-gray-700">
          <div v-for="g in classGroups" :key="g.department" class="py-1.5 grid grid-cols-[6rem_minmax(0,1fr)] gap-3 text-sm break-inside-avoid">
            <p class="font-semibold text-gray-900 dark:text-white">{{ g.department }} <span class="font-normal text-gray-500">({{ g.classes.length }})</span></p>
            <p class="text-gray-700 dark:text-gray-200">
              <span v-for="(c, i) in g.classes" :key="c.class_id">{{ c.class }} ({{ c.learners }}{{ c.teachers.length ? ` · ${c.teachers.join(', ')}` : '' }}){{ i < g.classes.length - 1 ? ', ' : '' }}</span>
            </p>
          </div>
        </div>
        </div>
      </section>

      <!-- 6. not signed in -->
      <section id="r-quiet" class="dash-box mb-4 break-inside-avoid-page">
        <h2 class="dash-bar">6. Not signed in for {{ data.quiet_days }} days or more<span class="ml-auto px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums" :class="data.quiet.length ? 'bg-gray-600 text-white' : 'bg-indigo-600 text-white'">{{ data.quiet.length }}</span></h2>
        <div class="px-4 py-3">
        <p v-if="!data.quiet.length" class="report-none">None - every teacher has signed in lately.</p>
        <p v-else class="mt-2 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
          <span v-for="(t, i) in data.quiet" :key="t.id"><b class="font-semibold">{{ t.name }}</b> ({{ t.last_seen ? `last ${fmt(t.last_seen)}` : 'never' }}){{ i < data.quiet.length - 1 ? ', ' : '' }}</span>
        </p>
        </div>
      </section>

      <!-- signatures, on paper only -->
      <div class="hidden print:grid grid-cols-2 gap-10 mt-10 text-sm text-gray-700">
        <p class="border-t border-gray-500 pt-1">Director of Studies - signature and date</p>
        <p class="border-t border-gray-500 pt-1">Head teacher - signature and date</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiService } from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import { resolveAssetUrl } from '@/utils/url'
import { useToastStore } from '@/stores/toast'

interface Row { id: number; name: string; departments: string; last_seen: string | null; set: number; drafts: number; enotes: number; waiting: number; overdue: number; oldest_days: number | null; hand_in_rate: number | null; missing: number; assessments?: { title: string; subject: string; class: string; waiting: number; days: number | null }[] }
interface ClassRow { class_id: number; department_id: number; class: string; department: string; learners: number; teachers: string[] }
interface Report {
  school: { school_name: string; logo_path: string | null } | null
  term: { id: number; name: string; start_date: string; end_date: string }
  department: string | null
  marking_days: number
  quiet_days: number
  generated_at: string
  late_marking: Row[]
  still_marking: Row[]
  none_set: Row[]
  low_hand_in: Row[]
  quiet: Row[]
  inactive_classes: ClassRow[]
  teachers_total: number
}

const route = useRoute()
const router = useRouter()
const toast = useToastStore()
const terms = ref<{ id: number; name: string }[]>([])
const departments = ref<{ id: number; name: string }[]>([])
const termId = ref<number>(Number(route.query.term_id) || 0)
const departmentId = ref<number>(Number(route.query.department_id) || 0)
const data = ref<Report | null>(null)
const loading = ref(false)
const logoFailed = ref(false)

const fmt = (d?: string | null) => (d ? new Date(d.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '')

const figures = computed(() => {
  const d = data.value
  if (!d) return []
  return [
    { id: 'r-late', label: 'missed the marking deadline', n: d.late_marking.length, tone: 'text-rose-700 dark:text-rose-300', alert: true },
    { id: 'r-marking', label: 'still marking', n: d.still_marking.length, tone: 'text-amber-700 dark:text-amber-300', alert: false },
    { id: 'r-none', label: 'set nothing this term', n: d.none_set.length, tone: 'text-rose-700 dark:text-rose-300', alert: true },
    { id: 'r-handin', label: 'learners not handing in', n: d.low_hand_in.length, tone: 'text-amber-700 dark:text-amber-300', alert: false },
    { id: 'r-classes', label: 'classes not active', n: d.inactive_classes.length, tone: 'text-rose-700 dark:text-rose-300', alert: true },
    { id: 'r-quiet', label: `not signed in for ${d.quiet_days}+ days`, n: d.quiet.length, tone: 'text-gray-700 dark:text-gray-200', alert: false }
  ]
})

const classGroups = computed(() => {
  const groups: { department: string; classes: ClassRow[] }[] = []
  for (const c of data.value?.inactive_classes || []) {
    const g = groups.find(x => x.department === c.department)
    if (g) g.classes.push(c)
    else groups.push({ department: c.department, classes: [c] })
  }
  return groups
})

const load = async () => {
  loading.value = true
  try {
    const params: Record<string, number> = {}
    if (termId.value) params.term_id = termId.value
    if (departmentId.value) params.department_id = departmentId.value
    const res = await apiService.get('/admin/supervision/report', params)
    data.value = res.data.data
    if (data.value && !termId.value) termId.value = data.value.term.id
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not build the report')
  } finally {
    loading.value = false
  }
}

const print = () => window.print()

watch([termId, departmentId], () => {
  router.replace({ query: { ...(termId.value ? { term_id: String(termId.value) } : {}), ...(departmentId.value ? { department_id: String(departmentId.value) } : {}) } })
  load()
})

onMounted(async () => {
  // terms and departments for the filters
  try {
    const res = await apiService.get('/admin/supervision', termId.value ? { term_id: termId.value } : {})
    terms.value = res.data.data.terms || []
    departments.value = (res.data.data.departments || []).map((d: { id: number; name: string }) => ({ id: d.id, name: d.name }))
  } catch { /* the report still loads */ }
  await load()
})
</script>

<style scoped>
.report-sub { @apply text-xs text-gray-500 dark:text-gray-400 mt-0.5; }
.report-none { @apply mt-2 text-sm text-emerald-700 dark:text-emerald-300; }
.report-table { @apply mt-2 w-full text-sm; }
.report-table th { @apply text-[11px] uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400 py-1.5 pr-3 border-b border-gray-200 dark:border-gray-700; }
.report-table td { @apply py-2 pr-3 align-top text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700/60; }
.report-table th { text-align: left; }
.report-table th.text-right { text-align: right; }
.report-table tr { break-inside: avoid; }
@media print {
  .teacher-report { max-width: none; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .dash-box { box-shadow: none; }
  section { break-inside: auto; }
  /* on paper: a teacher to a line */
  .report-table { font-size: 11px; }
  .report-table td { padding-top: 2px; padding-bottom: 2px; }
  .report-table th { padding-top: 3px; padding-bottom: 3px; }
}
</style>
