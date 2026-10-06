<template>
  <!-- The school's years, newest first, each with its terms laid out on a timeline across the
       year - so where the school is right now, gaps between terms and missing terms are plain to
       see. Used by both the Academic Years and the Terms pages. -->
  <div class="space-y-4">
    <EmptyState v-if="!loading && !years.length" icon="clock" tone="indigo" title="No academic years yet" message="Add the school year first, then its terms - report cards, exam dates and promotion all follow the terms." />

    <template v-else-if="loading">
      <div v-for="i in 2" :key="i" class="h-44 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
    </template>

    <article
      v-for="y in sortedYears"
      :key="y.id"
      class="rounded-2xl border bg-white dark:bg-gray-800 p-4 sm:p-5"
      :class="isCurrent(y) ? 'border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-100 dark:ring-indigo-900/40' : 'border-gray-200 dark:border-gray-700'"
    >
      <header class="flex flex-wrap items-start gap-x-3 gap-y-1">
        <div class="min-w-0 flex-1">
          <h3 class="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
            {{ y.name }}
            <span v-if="isCurrent(y)" class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-indigo-600 text-white">Current</span>
            <span v-else-if="isPast(y)" class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">Past</span>
            <span v-else class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">Upcoming</span>
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ fmt(y.start_date) }} – {{ fmt(y.end_date) }} · {{ termsOf(y).length }} term{{ termsOf(y).length === 1 ? '' : 's' }}</p>
        </div>
        <button type="button" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50" @click="emit('add-term', y)">+ Term</button>
        <ActionMenu v-if="yearActions" :label="`Actions for ${y.name}`" :items="[
          { label: 'Edit year', icon: 'pencil', run: () => emit('edit-year', y) },
          { label: 'Delete year', icon: 'trash', danger: true, divider: true, run: () => emit('delete-year', y) }
        ]" />
      </header>

      <!-- The timeline: the year as a track, each term a block at its real position -->
      <div class="mt-4">
        <div class="relative h-11 rounded-xl bg-gray-100 dark:bg-gray-900/60 overflow-hidden">
          <button
            v-for="t in termsOf(y)"
            :key="t.id"
            type="button"
            class="absolute top-1 bottom-1 rounded-lg px-2 text-left overflow-hidden transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            :class="termTone(t)"
            :style="placeTerm(y, t)"
            :title="`${t.name}: ${fmt(t.start_date)} – ${fmt(t.end_date)}`"
            @click="emit('edit-term', t)"
          >
            <span class="block text-[11px] font-bold leading-tight truncate">{{ t.name }}</span>
            <span class="block text-[10px] opacity-80 leading-tight truncate">{{ weeks(t) }} weeks</span>
          </button>
          <!-- Today -->
          <div v-if="todayPos(y) !== null" class="absolute top-0 bottom-0 w-0.5 bg-rose-500" :style="{ left: `${todayPos(y)}%` }" title="Today">
            <span class="absolute -top-0 left-1 text-[9px] font-bold text-rose-600 dark:text-rose-400 uppercase">Today</span>
          </div>
        </div>
        <div class="mt-1 flex justify-between text-[10px] text-gray-400">
          <span v-for="m in monthTicks(y)" :key="m">{{ m }}</span>
        </div>
      </div>

      <!-- The term marked current isn't the one today falls in - report cards, exam dates and
           the dashboards all go by the marked one -->
      <div v-if="currentMismatch(y)" class="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 text-xs text-amber-900 dark:text-amber-100">
        <span class="flex-1 min-w-[12rem]"><b>{{ currentMismatch(y)!.marked?.name || 'No term' }}</b> is marked as the current term, but today falls in <b>{{ currentMismatch(y)!.today.name }}</b>. Report cards and dashboards use the marked one.</span>
        <button type="button" class="px-2.5 py-1 rounded-lg font-semibold bg-amber-600 text-white hover:bg-amber-700" @click="emit('edit-term', currentMismatch(y)!.today)">Make {{ currentMismatch(y)!.today.name }} current</button>
      </div>

      <!-- The terms as a list, for exact dates and actions -->
      <ul v-if="termsOf(y).length" class="mt-3 divide-y divide-gray-100 dark:divide-gray-700/60">
        <li v-for="t in termsOf(y)" :key="t.id" class="flex items-center gap-3 py-2">
          <span class="w-2 h-2 rounded-full flex-shrink-0" :class="termDot(t)"></span>
          <span class="flex-1 min-w-0">
            <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ t.name }}
              <span v-if="t.is_current === 1" class="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">Current</span>
            </span>
            <span class="block text-xs text-gray-500 dark:text-gray-400">{{ fmt(t.start_date) }} – {{ fmt(t.end_date) }} · {{ weeks(t) }} weeks<template v-if="status(t) === 'now'"> · {{ daysLeft(t) }} days left</template></span>
          </span>
          <ActionMenu :label="`Actions for ${t.name}`" :items="[
            { label: 'Edit term', icon: 'pencil', run: () => emit('edit-term', t) },
            { label: 'Delete term', icon: 'trash', danger: true, divider: true, run: () => emit('delete-term', t) }
          ]" />
        </li>
      </ul>
      <p v-else class="mt-3 text-xs text-amber-700 dark:text-amber-300">No terms in this year yet - add them so report cards and exam dates have somewhere to go.</p>
    </article>

    <!-- Terms whose year is missing (deleted or never set) -->
    <article v-if="orphanTerms.length" class="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
      <h3 class="text-sm font-bold text-amber-900 dark:text-amber-100">Terms without a year</h3>
      <ul class="mt-2 space-y-1">
        <li v-for="t in orphanTerms" :key="t.id" class="flex items-center gap-2 text-sm text-amber-900 dark:text-amber-100">
          <span class="flex-1">{{ t.name }} · {{ fmt(t.start_date) }} – {{ fmt(t.end_date) }}</span>
          <button type="button" class="text-xs font-semibold underline" @click="emit('edit-term', t)">Fix</button>
        </li>
      </ul>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import type { AcademicYear, Term } from '@/types'

const props = withDefaults(defineProps<{ years: AcademicYear[]; terms: Term[]; loading?: boolean; yearActions?: boolean }>(), { loading: false, yearActions: true })
const emit = defineEmits<{
  'edit-year': [year: AcademicYear]
  'delete-year': [year: AcademicYear]
  'add-term': [year: AcademicYear]
  'edit-term': [term: Term]
  'delete-term': [term: Term]
}>()

const day = (s: string) => new Date(`${s.split(' ')[0]}T00:00:00`).getTime()
const now = Date.now()

const sortedYears = computed(() => [...props.years].sort((a, b) => day(b.start_date) - day(a.start_date)))
const termsOf = (y: AcademicYear) => props.terms
  .filter(t => Number(t.academic_year_id) === Number(y.id))
  .sort((a, b) => day(a.start_date) - day(b.start_date))
const orphanTerms = computed(() => props.terms.filter(t => !props.years.some(y => Number(y.id) === Number(t.academic_year_id))))

const isCurrent = (y: AcademicYear) => Number(y.is_current) === 1 || (day(y.start_date) <= now && now <= day(y.end_date) + 86400000)
const isPast = (y: AcademicYear) => day(y.end_date) + 86400000 < now
const status = (t: Term): 'past' | 'now' | 'next' => (day(t.end_date) + 86400000 < now ? 'past' : day(t.start_date) <= now ? 'now' : 'next')

const span = (y: AcademicYear) => Math.max(day(y.end_date) - day(y.start_date), 86400000)
const clamp = (v: number) => Math.min(100, Math.max(0, v))
const placeTerm = (y: AcademicYear, t: Term) => {
  const left = clamp(((day(t.start_date) - day(y.start_date)) / span(y)) * 100)
  const right = clamp(((day(t.end_date) + 86400000 - day(y.start_date)) / span(y)) * 100)
  return { left: `${left}%`, width: `${Math.max(right - left, 3)}%` }
}
const todayPos = (y: AcademicYear) => {
  const p = ((now - day(y.start_date)) / span(y)) * 100
  return p >= 0 && p <= 100 ? p : null
}
const weeks = (t: Term) => Math.max(1, Math.round((day(t.end_date) - day(t.start_date) + 86400000) / (7 * 86400000)))
// The term today falls in, when it isn't the one marked current
const currentMismatch = (y: AcademicYear) => {
  const list = termsOf(y)
  const today = list.find(t => status(t) === 'now')
  if (!today || Number(today.is_current) === 1) return null
  return { today, marked: props.terms.find(t => Number(t.is_current) === 1) || null }
}
const daysLeft = (t: Term) => Math.max(0, Math.ceil((day(t.end_date) + 86400000 - now) / 86400000))

const termTone = (t: Term) => ({
  past: 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  now: 'bg-indigo-600 text-white',
  next: 'bg-sky-200 text-sky-900 dark:bg-sky-900/60 dark:text-sky-100'
}[status(t)])
const termDot = (t: Term) => ({ past: 'bg-gray-400', now: 'bg-indigo-600', next: 'bg-sky-400' }[status(t)])

// Month initials along the bottom of a year's track - roughly every other month on a full year
const monthTicks = (y: AcademicYear) => {
  const out: string[] = []
  const start = new Date(day(y.start_date))
  const end = new Date(day(y.end_date))
  const d = new Date(start.getFullYear(), start.getMonth(), 1)
  const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1
  const step = months > 8 ? 2 : 1
  for (let i = 0; i < months; i += step) {
    out.push(new Date(d.getFullYear(), d.getMonth() + i, 1).toLocaleDateString(undefined, { month: 'short' }))
  }
  return out
}

const fmt = (s: string) => (s ? new Date(day(s)).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '-')
</script>
