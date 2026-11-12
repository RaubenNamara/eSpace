<template>
  <!-- "Tusome at your school": one month of learning on Tusome for the head teacher and the board,
       against the month before. Prints on A4 (menus and buttons don't print). Online only. -->
  <div class="impact w-full max-w-5xl">
    <div class="print:hidden flex flex-wrap items-center gap-3 mb-5">
      <div>
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">School impact report</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">A month of learning on Tusome, for the head teacher and the board. Print it or save it as a PDF.</p>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <select v-if="data" v-model="month" class="py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Month">
          <option v-for="m in data.months" :key="m" :value="m">{{ monthName(m) }}{{ m === thisMonth ? ' (so far)' : '' }}</option>
        </select>
        <button type="button" class="btn-primary" :disabled="!data" @click="print">Print / save PDF</button>
      </div>
    </div>

    <div v-if="loading && !data" class="h-[40rem] rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
    <p v-else-if="error" class="rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 text-sm p-4">{{ error }}</p>

    <article v-else-if="data" class="sheet">
      <!-- Masthead -->
      <header class="mast print-color-exact">
        <div class="flex items-center gap-4 min-w-0">
          <img v-if="data.school.logo_path && !logoFailed" :src="resolveAssetUrl(data.school.logo_path)" alt="" class="w-14 h-14 rounded-lg bg-white object-contain p-1 flex-shrink-0" @error="logoFailed = true">
          <div class="min-w-0">
            <p class="mast-kicker">Tusome at your school &middot; monthly impact report</p>
            <h2 class="mast-school">{{ data.school.school_name || 'Our school' }}</h2>
            <p class="mast-month">{{ data.label }}<span v-if="data.is_current"> (so far)</span> <span class="opacity-70">&middot; compared with {{ data.previous_label }}</span></p>
          </div>
        </div>
      </header>

      <!-- The month in three sentences -->
      <section class="block">
        <h3 class="block-title">The month in brief</h3>
        <ul class="story">
          <li v-for="(line, i) in story" :key="i">{{ line }}</li>
        </ul>
      </section>

      <!-- Headline figures -->
      <section class="block">
        <div class="figs">
          <div v-for="f in figures" :key="f.label" class="fig">
            <span class="fig-num">{{ f.value }}</span>
            <span class="fig-label">{{ f.label }}</span>
            <span class="fig-note">{{ f.note }}</span>
            <span v-if="f.change" class="fig-change" :class="f.change.up ? 'up' : 'down'">{{ f.change.text }}</span>
          </div>
        </div>
      </section>

      <!-- Week by week -->
      <section class="block">
        <h3 class="block-title">Week by week</h3>
        <table class="tbl">
          <thead><tr><th class="text-left">Week</th><th>Learners active</th><th>Topics read</th><th>Work handed in</th></tr></thead>
          <tbody>
            <tr v-for="w in data.weeks" :key="w.from">
              <td class="text-left whitespace-nowrap">{{ w.from === w.to ? shortDate(w.from) : `${shortDate(w.from)} – ${shortDate(w.to)}` }}</td>
              <td><span class="cellbar"><i :style="{ width: `${pct(w.active_learners, maxWeek.active)}%` }"></i></span>{{ w.active_learners }}</td>
              <td>{{ w.topics_read }}</td>
              <td>{{ w.handed_in }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Classes -->
      <section class="block">
        <h3 class="block-title">Class by class</h3>
        <p class="block-sub">Learners who signed in this month, out of the class, then reading, work handed in and the average on marked work. The most active classes first.</p>
        <table class="tbl">
          <thead><tr><th class="text-left">Class</th><th>Learners</th><th class="w-[32%]">Active this month</th><th>Topics read</th><th>Handed in</th><th>Average</th></tr></thead>
          <tbody>
            <tr v-for="c in classRows" :key="c.label">
              <td class="text-left font-semibold whitespace-nowrap">{{ c.label }}</td>
              <td>{{ c.learners }}</td>
              <td>
                <span class="flex items-center gap-2">
                  <span class="meter flex-1"><i :style="{ width: `${pct(c.active, c.learners)}%` }"></i></span>
                  <span class="w-16 text-right tabular-nums">{{ c.active }} &middot; {{ pct(c.active, c.learners) }}%</span>
                </span>
              </td>
              <td>{{ c.topics_read || '-' }}</td>
              <td>{{ c.handed_in || '-' }}</td>
              <td :class="c.average !== null && c.average < data.pass_from ? 'weak' : ''">{{ c.average !== null ? `${c.average}%` : '-' }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="quietClasses" class="block-sub mt-2">{{ quietClasses }} other class{{ quietClasses === 1 ? '' : 'es' }} had no learner sign in this month.</p>
      </section>

      <!-- Teachers -->
      <section class="block">
        <h3 class="block-title">Teachers on Tusome</h3>
        <p class="block-sub">What teachers put on Tusome this month: assessments set, eNote topics published, scripts marked and returned, live classes held.</p>
        <table v-if="data.teachers.length" class="tbl">
          <thead><tr><th class="text-left">Teacher</th><th>Assessments</th><th>eNote topics</th><th>Marked</th><th>Live classes</th></tr></thead>
          <tbody>
            <tr v-for="t in data.teachers" :key="t.name">
              <td class="text-left font-semibold">{{ t.name }}</td>
              <td>{{ t.assessments || '-' }}</td>
              <td>{{ t.enotes || '-' }}</td>
              <td>{{ t.marked || '-' }}</td>
              <td>{{ t.live || '-' }}</td>
            </tr>
          </tbody>
        </table>
        <p class="block-sub mt-2">{{ data.quiet_teachers }} of {{ data.roll.teachers }} teachers did not post or mark work on Tusome this month.</p>
      </section>

      <footer class="foot">
        <span>Printed {{ printedAt }}</span>
        <span>Prepared on <b class="brand">Tusome<span>.</span></b> &middot; Online learning platform</span>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { apiService } from '@/services/api'
import { resolveAssetUrl } from '@/utils/url'

interface Month {
  active_learners: number; sign_ins: number; active_teachers: number; topics_published: number; topics_read: number
  topics_finished: number; readers: number; assessments_set: number; handed_in: number; marked: number
  average: number | null; passed: number; live_classes: number; live_attendances: number; revision_days: number
  outcome_results?: number; outcomes_achieved?: number
}
interface Payload {
  month: string; label: string; previous_label: string; is_current: boolean; months: string[]
  school: { school_name?: string; logo_path?: string | null }
  roll: { learners: number; teachers: number }
  now: Month; before: Month
  classes: { label: string; learners: number; active: number; handed_in: number; average: number | null; topics_read: number }[]
  teachers: { name: string; assessments: number; enotes: number; marked: number; live: number }[]
  quiet_teachers: number
  weeks: { from: string; to: string; active_learners: number; handed_in: number; topics_read: number }[]
  pass_from: number
}

const data = ref<Payload | null>(null)
const loading = ref(true)
const error = ref('')
const logoFailed = ref(false)
const thisMonth = new Date().toISOString().slice(0, 7)
const month = ref(thisMonth)

const monthName = (m: string) => new Date(`${m}-15T12:00:00`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
const shortDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0)
// a share that rounds to 0% but isn't nothing reads as "under 1%"
const share = (a: number, b: number) => (a > 0 && pct(a, b) === 0 ? 'under 1%' : `${pct(a, b)}%`)
const n = (v: number) => v.toLocaleString()
const printedAt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const change = (now: number, before: number, unit = '') => {
  if (now === before) return { up: true, text: `same as ${data.value!.previous_label.split(' ')[0]}` }
  const d = now - before
  return { up: d > 0, text: `${d > 0 ? 'up' : 'down'} ${n(Math.abs(d))}${unit} on ${data.value!.previous_label.split(' ')[0]}` }
}

const passRate = (m: Month) => (m.marked ? pct(m.passed, m.marked) : null)

const figures = computed(() => {
  const d = data.value!
  const a = d.now
  const b = d.before
  const outcomes = a.outcome_results ? pct(a.outcomes_achieved || 0, a.outcome_results) : null
  return [
    { label: 'Learners active', value: n(a.active_learners), note: `${share(a.active_learners, d.roll.learners)} of ${n(d.roll.learners)} on roll`, change: change(a.active_learners, b.active_learners) },
    { label: 'Sign-ins', value: n(a.sign_ins), note: a.active_learners ? `${(a.sign_ins / a.active_learners).toFixed(1)} per active learner` : 'by learners', change: change(a.sign_ins, b.sign_ins) },
    { label: 'Topics read', value: n(a.topics_read), note: `${n(a.topics_finished)} finished, by ${n(a.readers)} learners`, change: change(a.topics_read, b.topics_read) },
    { label: 'Work handed in', value: n(a.handed_in), note: `${n(a.assessments_set)} assessments set`, change: change(a.handed_in, b.handed_in) },
    { label: 'Marked & returned', value: n(a.marked), note: a.average !== null ? `average ${a.average}%` : 'no marked work yet', change: change(a.marked, b.marked) },
    { label: 'Pass rate', value: passRate(a) !== null ? `${passRate(a)}%` : '-', note: `${d.pass_from}% or more on marked work`, change: passRate(a) !== null && passRate(b) !== null ? change(passRate(a)!, passRate(b)!, ' pts') : null },
    { label: 'Outcomes achieved', value: outcomes !== null ? `${outcomes}%` : '-', note: a.outcome_results ? `${n(a.outcomes_achieved || 0)} of ${n(a.outcome_results)} results at 60%+` : 'none assessed this month', change: null },
    { label: 'Teachers active', value: n(a.active_teachers), note: `of ${n(d.roll.teachers)} signed in`, change: change(a.active_teachers, b.active_teachers) },
    { label: 'Live classes', value: n(a.live_classes), note: `${n(a.live_attendances)} learner attendances`, change: change(a.live_classes, b.live_classes) },
    { label: 'eNote topics published', value: n(a.topics_published), note: 'new notes for learners', change: change(a.topics_published, b.topics_published) },
    { label: 'Days of revision', value: n(a.revision_days), note: 'learner-days of Daily Revision', change: change(a.revision_days, b.revision_days) }
  ]
})

// Three plain sentences a board member reads first
const story = computed(() => {
  const d = data.value!
  const a = d.now
  const b = d.before
  const lines: string[] = []
  lines.push(`${n(a.active_learners)} learners (${share(a.active_learners, d.roll.learners)} of the school) used Tusome in ${d.label}${b.active_learners ? `, ${a.active_learners >= b.active_learners ? 'up' : 'down'} from ${n(b.active_learners)} in ${d.previous_label}` : ''}.`)
  lines.push(a.topics_read ? `They read ${n(a.topics_read)} eNote topics and finished ${n(a.topics_finished)}; ${n(a.handed_in)} pieces of work were handed in.` : `No eNote reading was recorded; ${n(a.handed_in)} pieces of work were handed in.`)
  if (a.marked) lines.push(`Teachers marked and returned ${n(a.marked)} scripts with an average of ${a.average}%, and ${passRate(a)}% passed.`)
  else lines.push('No marked work was returned to learners this month.')
  const top = classRows.value[0]
  if (top && top.active) lines.push(`Most active class: ${top.label}, with ${pct(top.active, top.learners)}% of its learners signing in.`)
  return lines
})

const classRows = computed(() => [...(data.value?.classes ?? [])]
  .filter(c => c.active || c.handed_in || c.topics_read)
  .sort((x, y) => pct(y.active, y.learners) - pct(x.active, x.learners) || y.active - x.active))
const quietClasses = computed(() => (data.value?.classes.length ?? 0) - classRows.value.length)
const maxWeek = computed(() => ({ active: Math.max(1, ...(data.value?.weeks ?? []).map(w => w.active_learners)) }))

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await apiService.get('/admin/impact-report', { month: month.value })
    data.value = res.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not build the report'
  } finally {
    loading.value = false
  }
}
const print = () => window.print()

watch(month, () => load())
onMounted(load)
</script>

<style scoped>
.sheet { @apply bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden; }
.mast { background-color: #001f4d; color: #fff; padding: 20px 24px; border-bottom: 4px solid #d9a520; }
.mast-kicker { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #edc95a; font-weight: 600; }
.mast-school { font-family: 'Source Serif 4', Georgia, serif; font-size: 26px; font-weight: 600; line-height: 1.2; text-transform: capitalize; }
.mast-month { font-size: 14px; color: #dce4f8; }
.block { @apply px-5 sm:px-6 pt-5; }
.block-title { @apply text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white; border-bottom: 2px solid #d9a520; display: inline-block; padding-bottom: 2px; margin-bottom: 8px; }
.block-sub { @apply text-xs text-gray-500 dark:text-gray-400 mb-2; }
.story { @apply space-y-1.5 text-[15px] text-gray-800 dark:text-gray-100; }
.story li { padding-left: 14px; position: relative; }
.story li::before { content: ''; position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 999px; background: #1b3fa0; }
.figs { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
.fig { @apply rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 px-3 py-2.5; display: block; break-inside: avoid; }
.fig > span { display: block; }
.fig-num { font-family: 'Source Serif 4', Georgia, serif; font-size: 24px; font-weight: 600; line-height: 1.15; @apply text-gray-900 dark:text-white; }
.fig-label { @apply text-[11px] font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300; }
.fig-note { @apply text-[11px] text-gray-500 dark:text-gray-400; }
.fig-change { @apply text-[11px] font-semibold mt-0.5; }
.fig-change.up { color: #1b3fa0; }
.fig-change.down { color: #b45309; }
.dark .fig-change.up { color: #a5b4fc; }
.tbl { @apply w-full text-sm; border-collapse: collapse; }
.tbl th { @apply text-[11px] uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400 py-1.5 px-2 text-center; border-bottom: 2px solid #e5e7eb; }
.tbl td { @apply py-1.5 px-2 text-center tabular-nums text-gray-800 dark:text-gray-200; border-bottom: 1px solid #f1f5f9; }
.dark .tbl td { border-bottom-color: rgb(55 65 81 / 0.6); }
.tbl tr { break-inside: avoid; }
.tbl .text-left { text-align: left; }
.weak { color: #be123c; font-weight: 600; }
.meter, .cellbar { display: inline-block; height: 6px; border-radius: 999px; background: #e5e7eb; overflow: hidden; vertical-align: middle; }
.cellbar { width: 60px; margin-right: 8px; }
.meter i, .cellbar i { display: block; height: 100%; background: #1b3fa0; border-radius: 999px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.foot { @apply flex flex-wrap justify-between gap-2 px-5 sm:px-6 py-4 mt-5 text-[11px] text-gray-500 dark:text-gray-400; border-top: 1px dashed #d1d5db; }
.brand { font-family: Georgia, serif; color: #1b3fa0; }
.brand span { color: #d9a520; }
.print-color-exact { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
@media print {
  @page { size: A4; margin: 12mm; }
  .impact { max-width: none; }
  .sheet { border: none; border-radius: 0; }
  .block { break-inside: auto; }
  .block-title { break-after: avoid; }
}
</style>
