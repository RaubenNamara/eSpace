<template>
  <!-- Usage and sign-in report for the super admin: a day, the last 7 days, this month or this
       term - who signed in against the people on roll, sign-ins over time, what was done, and the
       staff who did not sign in. Laid out to print on A4 (the menus and buttons don't print). -->
  <div class="usage-report w-full max-w-5xl">
    <div class="print:hidden flex flex-wrap items-center gap-3 mb-5">
      <RouterLink to="/admin/logs" class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        System logs
      </RouterLink>
      <div class="ml-auto flex flex-wrap items-center gap-2">
        <div class="inline-flex p-1 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" role="tablist" aria-label="Period">
          <button
            v-for="p in PERIODS"
            :key="p.key"
            type="button"
            role="tab"
            :aria-selected="period === p.key"
            class="px-3.5 py-1.5 rounded-lg text-sm font-semibold"
            :class="period === p.key ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            @click="period = p.key"
          >{{ p.label }}</button>
        </div>
        <button type="button" class="btn-primary !py-2 inline-flex items-center gap-1.5" :disabled="!report" @click="print">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Print
        </button>
      </div>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="h-24 rounded-2xl bg-white dark:bg-gray-800 animate-pulse"></div>
    </div>
    <p v-else-if="error" class="rounded-xl bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>

    <article v-else-if="report" class="report-sheet bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-8">
      <header class="flex flex-wrap items-end gap-3 pb-4 border-b-2 border-indigo-800 dark:border-indigo-400">
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-700 dark:text-gold-300">Usage and sign-in report</p>
          <h1 class="font-heading text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-white">{{ report.label }}</h1>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400">Printed {{ printedAt }}</p>
      </header>

      <!-- Headline figures -->
      <dl class="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div v-for="t in tiles" :key="t.label" class="stat-card">
          <StatCrest :label="t.label" />
          <dt class="stat-label"><span class="stat-label-text">{{ t.label }}</span></dt>
          <dd class="stat-num">{{ t.value }}</dd>
          <dd v-if="t.hint" class="stat-note">{{ t.hint }}</dd>
        </div>
      </dl>

      <!-- Who signed in -->
      <section class="mt-7 avoid-break">
        <h2 class="font-heading text-lg font-bold text-gray-900 dark:text-white mb-2">Who signed in</h2>
        <div class="overflow-x-auto">
        <table class="data-table w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              <th class="text-left px-3 py-2 font-semibold">Group</th>
              <th class="num px-3 py-2 font-semibold">Signed in</th>
              <th class="num px-3 py-2 font-semibold">On roll</th>
              <th class="num px-3 py-2 font-semibold">Share</th>
              <th class="num px-3 py-2 font-semibold">Sign-ins</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in report.roles" :key="r.role">
              <td class="px-3 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white">{{ r.role }}</td>
              <td class="num px-3 py-2 border-b border-gray-100 dark:border-gray-700">{{ r.people.toLocaleString() }}</td>
              <td class="num px-3 py-2 border-b border-gray-100 dark:border-gray-700">{{ r.on_roll === null ? '–' : r.on_roll.toLocaleString() }}</td>
              <td class="num px-3 py-2 border-b border-gray-100 dark:border-gray-700">{{ r.percent === null ? '–' : `${r.percent}%` }}</td>
              <td class="num px-3 py-2 border-b border-gray-100 dark:border-gray-700">{{ r.logins.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </section>

      <!-- Sign-ins over time -->
      <section class="mt-7 avoid-break">
        <h2 class="font-heading text-lg font-bold text-gray-900 dark:text-white">Sign-ins {{ report.period === 'day' ? 'hour by hour' : 'day by day' }}</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Bars show sign-ins; the figure after each is how many different people signed in.</p>
        <p v-if="!report.series.length" class="text-sm text-gray-500 dark:text-gray-400">No one signed in during this period.</p>
        <ol v-else class="space-y-1">
          <li v-for="s in report.series" :key="s.slot" class="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 text-xs">
            <span class="text-gray-600 dark:text-gray-300 tabular-nums">{{ slotLabel(s.slot) }}</span>
            <span class="h-3 rounded-r bg-indigo-100 dark:bg-gray-700 overflow-hidden" :title="`${s.logins} sign-ins by ${s.people} people`">
              <span class="block h-full rounded-r bg-indigo-600 print-color-exact" :style="{ width: `${(s.logins / maxSlot) * 100}%` }"></span>
            </span>
            <span class="tabular-nums text-gray-700 dark:text-gray-200 w-24 text-right">{{ s.logins }} <span class="text-gray-400">· {{ s.people }} people</span></span>
          </li>
        </ol>
      </section>

      <!-- What was done -->
      <section class="mt-7 grid sm:grid-cols-2 gap-6 avoid-break">
        <div v-for="block in [{ title: 'Learning', rows: report.learning }, { title: 'Teaching', rows: report.teaching }]" :key="block.title">
          <h2 class="font-heading text-lg font-bold text-gray-900 dark:text-white mb-2">{{ block.title }}</h2>
          <div class="overflow-x-auto">
          <table class="data-table w-full text-sm border-separate border-spacing-0">
            <tbody>
              <tr v-for="row in block.rows" :key="row.label">
                <td class="px-3 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100">{{ row.label }}</td>
                <td class="num px-3 py-2 border-b border-gray-100 dark:border-gray-700 font-semibold text-gray-900 dark:text-white">{{ row.value.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </section>

      <!-- Staff to follow up -->
      <section class="mt-7">
        <h2 class="font-heading text-lg font-bold text-gray-900 dark:text-white">Staff who did not sign in</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ report.staff_not_signed_in.length }} teacher{{ report.staff_not_signed_in.length === 1 ? '' : 's' }} and heads of department, with when they last signed in.</p>
        <p v-if="!report.staff_not_signed_in.length" class="text-sm text-emerald-700 dark:text-emerald-300">Every member of staff signed in.</p>
        <ul v-else class="columns-1 sm:columns-2 lg:columns-3 gap-6 text-xs">
          <li v-for="p in report.staff_not_signed_in" :key="p.name + p.role" class="break-inside-avoid py-1 border-b border-gray-100 dark:border-gray-700 flex justify-between gap-2">
            <span class="text-gray-800 dark:text-gray-100 truncate">{{ niceName(p.name) }}<span v-if="p.role !== 'Teacher'" class="text-gray-400"> · HOD</span></span>
            <span class="text-gray-400 whitespace-nowrap">{{ p.last_seen ? shortDate(p.last_seen) : 'never' }}</span>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import StatCrest from '@/components/ui/StatCrest.vue'
import { computed, ref, watch } from 'vue'
import { apiService } from '../../services/api'
import { niceName } from '@/components/dashboard/teacher/time'

type Period = 'day' | 'week' | 'month' | 'term'
interface Report {
  period: Period
  label: string
  total_logins: number
  busiest: { slot: string; logins: number; people: number } | null
  roles: { role: string; people: number; on_roll: number | null; percent: number | null; logins: number }[]
  series: { slot: string; logins: number; people: number }[]
  learning: { label: string; value: number }[]
  teaching: { label: string; value: number }[]
  staff_not_signed_in: { name: string; role: string; last_seen: string | null }[]
}

const PERIODS: { key: Period; label: string }[] = [
  { key: 'day', label: 'Today' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'term', label: 'Term' }
]
const period = ref<Period>('week')
const report = ref<Report | null>(null)
const loading = ref(true)
const error = ref('')

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await apiService.get('/admin/logs/report', { period: period.value })
    report.value = res.data.data
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Could not load the report'
  } finally {
    loading.value = false
  }
}
watch(period, load, { immediate: true })

const toDate = (v: string) => new Date(v.replace(' ', 'T'))
const shortDate = (v: string) => toDate(v).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
const slotLabel = (slot: string) => (report.value?.period === 'day' ? slot : toDate(`${slot} 00:00:00`).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }))
const maxSlot = computed(() => Math.max(1, ...(report.value?.series.map(s => s.logins) || [1])))
const printedAt = computed(() => new Date().toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }))

const tiles = computed(() => {
  const r = report.value
  if (!r) return []
  const people = r.roles.reduce((n, x) => n + x.people, 0)
  const students = r.roles.find(x => x.role === 'Students')
  return [
    { label: 'Sign-ins', value: r.total_logins.toLocaleString(), hint: '' },
    { label: 'People signed in', value: people.toLocaleString(), hint: '' },
    { label: 'Learners signed in', value: students ? `${students.percent ?? 0}%` : '–', hint: students ? `${students.people.toLocaleString()} of ${(students.on_roll ?? 0).toLocaleString()}` : '' },
    { label: r.period === 'day' ? 'Busiest hour' : 'Busiest day', value: r.busiest ? slotLabel(r.busiest.slot) : '–', hint: r.busiest ? `${r.busiest.logins} sign-ins` : '' }
  ]
})

const print = () => window.print()
</script>

<style scoped>
@media print {
  .usage-report { max-width: none; }
  .report-sheet { border: 0; padding: 0; border-radius: 0; }
  .avoid-break { break-inside: avoid; }
  .print-color-exact { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
