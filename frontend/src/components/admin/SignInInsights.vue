<template>
  <!-- Sign-in insights: how much the school uses Tusome, when, where (departments, classes,
       streams) and on what. -->
  <section class="dash-box min-w-0">
    <h2 class="dash-bar">How Tusome is used <span class="font-normal opacity-75">· {{ periodTitle }}</span></h2>

    <div v-if="loading && !data" class="p-3 grid grid-cols-2 md:grid-cols-6 gap-2" aria-busy="true">
      <div v-for="i in 6" :key="i" class="h-16 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
    </div>
    <p v-else-if="error" class="p-3 text-sm text-red-600 dark:text-red-400">{{ error }}</p>

    <div v-else-if="data" class="p-3 space-y-4">
      <!-- headline numbers -->
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
        <div v-for="t in tiles" :key="t.label" class="rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 px-3 py-2">
          <p class="text-[11px] font-semibold text-gray-500 dark:text-gray-400">{{ t.label }}</p>
          <p class="text-xl font-extrabold text-gray-900 dark:text-white tabular-nums">{{ t.value }}</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ t.note }}</p>
        </div>
      </div>

      <!-- when: each chart in its own card, all on one line on every screen (3 for today, 4 for a week or a month) -->
      <div class="pt-4 border-t border-gray-100 dark:border-gray-700/60">
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">Sign-ins {{ days === 1 ? 'in each hour of today' : 'over the period' }} - hover or tap a bar for its number.</p>
        <div class="grid gap-1.5 sm:gap-3" :style="{ gridTemplateColumns: `repeat(${data.weekdays.length ? 4 : 3}, minmax(0, 1fr))` }">
          <div class="min-w-0 rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white/70 dark:bg-gray-900/30 p-2 sm:p-3">
            <h3 class="truncate text-[11px] sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">Students <span class="hidden lg:inline font-normal text-gray-500 dark:text-gray-400">· {{ days === 1 ? 'per hour' : 'per day' }}</span></h3>
            <ColumnChart :items="timeline('students')" :label="`Student sign-ins ${days === 1 ? 'per hour' : 'per day'}`" :axis-name="days === 1 ? 'Hour' : 'Day'" class="mt-1 sm:mt-2" />
          </div>
          <div class="min-w-0 rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white/70 dark:bg-gray-900/30 p-2 sm:p-3">
            <h3 class="truncate text-[11px] sm:text-sm font-bold text-gray-900 dark:text-white leading-tight" title="Teachers and HODs"><span class="sm:hidden">Staff</span><span class="hidden sm:inline">Teachers &amp; HODs</span> <span class="hidden lg:inline font-normal text-gray-500 dark:text-gray-400">· {{ days === 1 ? 'per hour' : 'per day' }}</span></h3>
            <ColumnChart :items="timeline('staff')" :label="`Staff sign-ins ${days === 1 ? 'per hour' : 'per day'}`" :axis-name="days === 1 ? 'Hour' : 'Day'" class="mt-1 sm:mt-2" />
          </div>
          <div class="min-w-0 rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white/70 dark:bg-gray-900/30 p-2 sm:p-3">
            <h3 class="truncate text-[11px] sm:text-sm font-bold text-gray-900 dark:text-white leading-tight"><span class="sm:hidden">Hours</span><span class="hidden sm:inline">Times of day</span> <span class="hidden lg:inline font-normal text-gray-500 dark:text-gray-400">· busiest hours</span></h3>
            <ColumnChart :items="hourItems" label="Sign-ins by hour of the day" axis-name="Hour" class="mt-1 sm:mt-2" />
          </div>
          <div v-if="data.weekdays.length" class="min-w-0 rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white/70 dark:bg-gray-900/30 p-2 sm:p-3">
            <h3 class="truncate text-[11px] sm:text-sm font-bold text-gray-900 dark:text-white leading-tight"><span class="sm:hidden">Days</span><span class="hidden sm:inline">Days of week</span> <span class="hidden lg:inline font-normal text-gray-500 dark:text-gray-400">· busiest days</span></h3>
            <ColumnChart :items="weekdayItems" label="Sign-ins by day of the week" axis-name="Day" class="mt-1 sm:mt-2" />
          </div>
        </div>
      </div>

      <!-- where: departments, and classes with their streams -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700/60">
        <div>
          <h3 class="text-sm font-bold text-gray-900 dark:text-white">Departments</h3>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">Share of each department's teachers and HODs who signed in.</p>
          <ul class="space-y-2">
            <li v-for="d in shownDepartments" :key="d.name">
              <ShareBar :name="d.name" :share="d.share" :detail="`${d.active} of ${d.staff} staff · ${d.signins.toLocaleString()} sign-ins`" />
            </li>
          </ul>
          <!-- departments where nobody signed in: named on one line instead of a column of empty bars -->
          <p v-if="!allDepartments && silentDepartments.length" class="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
            <b class="text-gray-900 dark:text-white">No sign-ins:</b> {{ silentDepartments.map(d => d.name).join(', ') }}
          </p>
          <button v-if="departments.length > shownDepartments.length || allDepartments" type="button" class="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline" @click="allDepartments = !allDepartments">
            {{ allDepartments ? 'Show fewer' : `Show all ${departments.length} departments` }}
          </button>
        </div>

        <div>
          <div class="flex items-baseline gap-2">
            <h3 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Classes and streams</h3>
            <button type="button" class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline" @click="toggleAllClasses">
              {{ openClasses.size === data.classes.length ? 'Close all' : 'Open all' }}
            </button>
          </div>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">Share of each class's students who signed in. Open a class to see its streams.</p>
          <p v-if="bestStream || worstStream" class="mb-2 text-[11px] text-gray-600 dark:text-gray-300">
            <template v-if="bestStream">Most active stream: <b class="text-gray-900 dark:text-white">{{ bestStream.name }}</b> ({{ bestStream.share }}%)</template>
            <template v-if="bestStream && worstStream"> · </template>
            <template v-if="worstStream">Least active: <b class="text-gray-900 dark:text-white">{{ worstStream.name }}</b> ({{ worstStream.share }}%)</template>
          </p>
          <ul class="space-y-1">
            <li v-for="c in data.classes" :key="c.name" class="rounded-lg" :class="openClasses.has(c.name) ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
              <button
                type="button"
                class="w-full flex items-center gap-2 text-left rounded-lg px-1.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-700/40"
                :aria-expanded="openClasses.has(c.name)"
                @click="toggleClass(c.name)"
              >
                <ShareBar class="flex-1" :name="c.name" :share="c.share" :detail="`${c.active.toLocaleString()} of ${c.students.toLocaleString()} students · ${c.signins.toLocaleString()} sign-ins · ${streamsOf(c.name).length} streams`" />
                <svg class="w-4 h-4 flex-shrink-0 text-gray-400 transition-transform" :class="openClasses.has(c.name) ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <!-- its streams, most active first -->
              <ul v-if="openClasses.has(c.name)" class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pl-5 pr-7 pb-2 pt-1">
                <li v-for="st in streamsOf(c.name)" :key="st.name">
                  <ShareBar
                    :name="st.stream && st.stream !== st.name ? `Stream ${st.stream}` : st.name"
                    :share="st.share"
                    :detail="`${st.active} of ${st.students} · ${st.signins.toLocaleString()} sign-ins${st.share === 0 ? ' · none signed in' : ''}`"
                  />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <!-- on what: one small card each, the share of sign-ins as one split bar with a legend -->
      <!-- always three side by side, compact on a phone -->
      <div class="grid grid-cols-3 gap-1.5 sm:gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/60">
        <div v-for="g in deviceGroups" :key="g.title" class="viz-dev min-w-0 rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white/70 dark:bg-gray-900/30 p-2 sm:p-3">
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 min-w-0">
            <h3 class="sm:flex-1 text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">{{ g.title }}</h3>
            <span class="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 tabular-nums">{{ g.total.toLocaleString() }} sign-ins</span>
          </div>
          <!-- the split bar: segments in a fixed order, 2px gaps, rounded ends -->
          <div class="mt-2 flex h-3 gap-[2px] rounded-[4px] overflow-hidden" role="img" :aria-label="`${g.title}: ${g.rows.map(r => `${r.name} ${r.share}%`).join(', ')}`">
            <span
              v-for="r in g.rows.filter(x => x.signins > 0)"
              :key="r.name"
              class="block h-full first:rounded-l-[4px] last:rounded-r-[4px]"
              :style="{ flexGrow: r.signins, flexBasis: 0, minWidth: '3px', background: `var(--${r.color})` }"
              :title="`${r.name}: ${r.share}% · ${r.signins.toLocaleString()} sign-ins`"
            ></span>
          </div>
          <!-- legend: colour, name, share and count (the colour is never the only cue) -->
          <ul class="mt-2 sm:mt-2.5 space-y-1">
            <li v-for="r in g.rows" :key="r.name" class="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs min-w-0" :title="`${r.name}: ${r.share}% · ${r.signins.toLocaleString()} sign-ins`">
              <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm flex-shrink-0" :style="{ background: `var(--${r.color})` }" aria-hidden="true"></span>
              <span class="flex-1 min-w-0 truncate text-gray-800 dark:text-gray-100">{{ r.name }}</span>
              <span class="font-bold text-gray-900 dark:text-white tabular-nums">{{ r.share }}%</span>
              <span class="hidden md:inline w-14 text-right text-gray-500 dark:text-gray-400 tabular-nums">{{ r.signins.toLocaleString() }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, h, defineComponent } from 'vue'
import apiService from '@/services/api'
import ColumnChart, { type ColumnItem } from './ColumnChart.vue'
import { PERIODS, periodPhrase } from './signInParts'

interface RoleTotal { signins: number; people: number; accounts: number }
interface ShareRow { name: string; active: number; signins: number; share: number }
interface Insights {
  days: number
  totals: { student: RoleTotal; teacher: RoleTotal; hod: RoleTotal; all_signins: number; admin_signins: number }
  timeline: { label: string; key: string; students: number; staff: number }[]
  hours: { hour: number; signins: number }[]
  weekdays: { day: string; signins: number }[]
  departments: (ShareRow & { code: string; staff: number })[]
  classes: (ShareRow & { students: number })[]
  streams: (ShareRow & { students: number; class: string; stream: string })[]
  devices: { types: { name: string; signins: number }[]; os: { name: string; signins: number }[]; browsers: { name: string; signins: number }[] }
}

/** the period is chosen on the dashboard, for this and the activity panels together */
const props = defineProps<{ days: number }>()
const days = computed(() => props.days)
const data = ref<Insights | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const periodTitle = computed(() => PERIODS.find(p => p.days === days.value)?.label ?? '')
const periodLabel = computed(() => periodPhrase(days.value))

const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0)
const tiles = computed(() => {
  const t = data.value!.totals
  const phones = data.value!.devices.types.filter(x => x.name === 'phone' || x.name === 'tablet').reduce((n, x) => n + x.signins, 0)
  const known = data.value!.devices.types.filter(x => x.name !== 'unknown').reduce((n, x) => n + x.signins, 0)
  return [
    { label: 'Sign-ins', value: (t.student.signins + t.teacher.signins + t.hod.signins).toLocaleString(), note: `students and staff, ${periodLabel.value}` },
    { label: 'Students', value: t.student.people.toLocaleString(), note: `${pct(t.student.people, t.student.accounts)}% of ${t.student.accounts.toLocaleString()} signed in` },
    { label: 'Teachers', value: t.teacher.people.toLocaleString(), note: `${pct(t.teacher.people, t.teacher.accounts)}% of ${t.teacher.accounts} signed in` },
    { label: 'HODs', value: t.hod.people.toLocaleString(), note: `${pct(t.hod.people, t.hod.accounts)}% of ${t.hod.accounts} signed in` },
    { label: 'Visits per student', value: t.student.people ? (t.student.signins / t.student.people).toFixed(1) : '0', note: 'sign-ins per student who came' },
    { label: 'On phones', value: `${pct(phones, known)}%`, note: 'of sign-ins on a phone or tablet' },
  ]
})

const dayFmt = (k: string, style: 'short' | 'long') => new Date(`${k}T00:00:00`).toLocaleDateString([], style === 'short' ? { day: 'numeric', month: 'short' } : { weekday: 'long', day: 'numeric', month: 'long' })
const timeline = (series: 'students' | 'staff'): ColumnItem[] => (data.value?.timeline ?? []).map(b => ({
  key: b.key,
  label: b.label,
  value: b[series],
  title: days.value === 1 ? `${b.label}-${b.label.slice(0, 2)}:59` : dayFmt(b.key, 'long'),
  short: days.value === 1 ? b.label : dayFmt(b.key, 'short'),
}))
const hourItems = computed<ColumnItem[]>(() => (data.value?.hours ?? []).map(x => ({
  key: String(x.hour), label: `${String(x.hour).padStart(2, '0')}:00`, value: x.signins,
  title: `${String(x.hour).padStart(2, '0')}:00-${String(x.hour).padStart(2, '0')}:59`,
})))
const weekdayItems = computed<ColumnItem[]>(() => (data.value?.weekdays ?? []).map(x => ({ key: x.day, label: x.day, value: x.signins })))

// departments ranked by the share of their staff who signed in (then by sign-ins)
const departments = computed(() => [...(data.value?.departments ?? [])].sort((a, b) => b.share - a.share || b.signins - a.signins))
const DEPT_LIMIT = 6
const allDepartments = ref(false)
const activeDepartments = computed(() => departments.value.filter(d => d.signins > 0))
const silentDepartments = computed(() => departments.value.filter(d => d.signins === 0))
const shownDepartments = computed(() => (allDepartments.value ? departments.value : activeDepartments.value.slice(0, DEPT_LIMIT)))
// classes and their streams
const openClasses = ref(new Set<string>())
const streamsOf = (cls: string) => (data.value?.streams ?? []).filter(st => st.class === cls)
const toggleClass = (cls: string) => {
  const next = new Set(openClasses.value)
  if (next.has(cls)) next.delete(cls); else next.add(cls)
  openClasses.value = next
}
const toggleAllClasses = () => {
  const all = (data.value?.classes ?? []).map(c => c.name)
  openClasses.value = openClasses.value.size === all.length ? new Set() : new Set(all)
}
// streams of a fair size, so one keen pupil in a stream of three does not top the list
const sizable = computed(() => (data.value?.streams ?? []).filter(st => st.students >= 10))
const bestStream = computed(() => sizable.value.find(st => st.share > 0) ?? null)
const worstStream = computed(() => (sizable.value.length > 1 ? [...sizable.value].sort((a, b) => a.share - b.share || a.signins - b.signins || b.students - a.students)[0] : null))
// each device, system and browser keeps its own colour whatever its rank or the period (the
// colour follows the thing, not its place); "not known" and "other" are grey, not a colour
const SLOTS: Record<string, Record<string, number>> = {
  types: { Computer: 1, Phone: 2, Tablet: 3 },
  os: { Windows: 1, Android: 2, macOS: 3, iOS: 4, iPadOS: 5, Linux: 6, ChromeOS: 7 },
  browsers: { Chrome: 1, Edge: 2, Safari: 3, Firefox: 4, 'Samsung Internet': 5, Opera: 6, Brave: 7, 'UC Browser': 8 },
}
const GREY = new Set(['Not known', 'Unknown', 'Other', 'Script / API tool', 'Chromium'])
const deviceGroups = computed(() => {
  const d = data.value!.devices
  const typeName: Record<string, string> = { computer: 'Computer', phone: 'Phone', tablet: 'Tablet', unknown: 'Not known' }
  const build = (key: keyof typeof SLOTS, title: string, rows: { name: string; signins: number }[]) => {
    const total = rows.reduce((n, r) => n + r.signins, 0)
    const named = rows.map(r => {
      const name = key === 'types' ? (typeName[r.name] ?? r.name) : r.name
      const slot = GREY.has(name) ? 0 : SLOTS[key][name] ?? 8
      return { name, signins: r.signins, share: pct(r.signins, total), slot, color: slot ? `dev-${slot}` : 'dev-grey' }
    })
    // a fixed order (by colour slot, grey last) so the same colours always sit side by side
    named.sort((a, b) => (a.slot || 99) - (b.slot || 99) || b.signins - a.signins)
    return { title, total, rows: named }
  }
  return [build('types', 'Kind of device', d.types), build('os', 'Operating system', d.os), build('browsers', 'Browser', d.browsers)]
})

/** a ranked bar: the name, the share drawn and written, and what it is made of */
const ShareBar = defineComponent({
  props: { name: { type: String, required: true }, share: { type: Number, required: true }, detail: { type: String, required: true } },
  setup(p) {
    return () => h('div', { class: 'min-w-0', title: `${p.name}: ${p.share}% · ${p.detail}` }, [
      h('div', { class: 'flex items-baseline gap-2 text-xs' }, [
        h('span', { class: 'font-semibold text-gray-800 dark:text-gray-100 truncate' }, p.name),
        h('span', { class: 'ml-auto font-bold text-gray-900 dark:text-white tabular-nums' }, `${p.share}%`),
      ]),
      h('div', { class: 'mt-0.5 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden', role: 'img', 'aria-label': `${p.name} ${p.share}%` }, [
        h('div', { class: 'h-full rounded-full bg-indigo-600 dark:bg-indigo-500', style: { width: p.share ? `max(4px, ${p.share}%)` : '0' } }),
      ]),
      h('p', { class: 'mt-0.5 text-[10px] text-gray-500 dark:text-gray-400 truncate' }, p.detail),
    ])
  },
})

async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await apiService.get('/admin/sign-in-insights', { params: { days: days.value } })
    data.value = res.data.data
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Could not load the sign-in insights.'
  } finally {
    loading.value = false
  }
}
watch(days, () => load())
onMounted(load)
</script>

<style>
/* the device cards' colours (.viz-dev is only used here) */
.viz-dev {
  --dev-1: #2a78d6; --dev-2: #eb6834; --dev-3: #1baf7a; --dev-4: #eda100;
  --dev-5: #e87ba4; --dev-6: #008300; --dev-7: #6250d6; --dev-8: #e34948;
  --dev-grey: #a3a3a3;
}
html.dark .viz-dev {
  --dev-1: #3987e5; --dev-2: #d95926; --dev-3: #199e70; --dev-4: #c98500;
  --dev-5: #d55181; --dev-6: #008300; --dev-7: #9085e9; --dev-8: #e66767;
  --dev-grey: #6b7280;
}
</style>
