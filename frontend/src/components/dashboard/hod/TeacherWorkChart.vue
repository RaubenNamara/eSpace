<template>
  <!-- How much each of the department's teachers has done over the last 7 days, 30 days or 3 months:
       one column per teacher (most first, names along the bottom), split into eNotes, eLibrary, Item
       Bank, assessments set and scripts marked, with the total on top. Hover a column for its parts;
       Table shows the same numbers. -->
  <section class="dash-box">
    <h2 class="dash-bar">Teachers' work <RouterLink to="/hod/teachers" class="dash-bar-link">All teachers</RouterLink></h2>

    <div class="p-3 sm:p-4">
      <!-- the period and the view, in one row -->
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <div class="gp-switch" role="group" aria-label="Period">
          <button v-for="r in RANGES" :key="r.days" type="button" class="gp-switch-btn" :class="{ 'gp-switch-on': days === r.days }" :aria-pressed="days === r.days" @click="days = r.days">{{ r.label }}</button>
        </div>
        <div class="gp-switch ml-auto" role="group" aria-label="View">
          <button v-for="v in ['Chart', 'Table']" :key="v" type="button" class="gp-switch-btn" :class="{ 'gp-switch-on': view === v }" :aria-pressed="view === v" @click="view = v">{{ v }}</button>
        </div>
      </div>

      <div v-if="loading && !teachers.length" class="space-y-2">
        <div v-for="i in 5" :key="i" class="h-6 rounded-md bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
      </div>
      <p v-else-if="failed" class="text-sm text-gray-500 dark:text-gray-400">The teachers' work couldn't be loaded just now.</p>
      <p v-else-if="!teachers.length" class="text-sm text-gray-500 dark:text-gray-400">No teachers in the department yet.</p>

      <template v-else-if="view === 'Chart'">
        <!-- legend: what each colour is -->
        <ul class="flex flex-nowrap sm:flex-wrap justify-between sm:justify-start gap-x-2 sm:gap-x-3 gap-y-1 mb-3 text-[11px] sm:text-xs text-gray-600 dark:text-gray-300">
          <li v-for="k in KINDS" :key="k.key" class="inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap" :title="k.label"><span class="w-2.5 h-2.5 rounded-sm flex-shrink-0" :style="{ background: colorOf(k) }"></span><span class="sm:hidden">{{ k.short }}</span><span class="hidden sm:inline">{{ k.label }}</span></li>
        </ul>
        <!-- what the column under the pointer is made of -->
        <div v-if="max" class="min-h-[2.4rem] mb-2 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs" :class="hovered ? 'bg-gray-900 text-white' : 'bg-gray-50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400'" aria-live="polite">
          <template v-if="hovered">
            <p class="font-semibold">{{ hovered.name }} · {{ hovered.total }} in the {{ rangeLabel }} · {{ hovered.signins }} sign-ins</p>
            <p class="text-gray-200">{{ KINDS.map(k => `${k.label} ${hovered![k.key]}`).join(' · ') }}</p>
          </template>
          <p v-else class="leading-[1.9rem]">Point at (or tap) a column to see what it is made of.</p>
        </div>
        <p v-if="!max" class="py-4 text-center text-sm text-gray-500 dark:text-gray-400">Nothing done in the {{ rangeLabel }} yet.</p>
        <!-- one column per teacher, their names along the bottom; a light scale up the side -->
        <div v-else class="flex gap-2">
          <div class="relative w-7 h-44 sm:h-52 flex-shrink-0 text-[10px] tabular-nums text-gray-400 dark:text-gray-500 text-right" aria-hidden="true">
            <span class="absolute right-0 top-0 -translate-y-1/2">{{ scaleTop }}</span>
            <span class="absolute right-0 top-1/2 -translate-y-1/2">{{ Math.round(scaleTop / 2) }}</span>
            <span class="absolute right-0 bottom-0 translate-y-1/2">0</span>
          </div>
          <div class="relative flex-1 min-w-0 overflow-x-auto" @mouseleave="hover = null">
            <div class="relative" :style="{ minWidth: `${shownTeachers.length * 3.6}rem` }">
              <!-- the scale's lines -->
              <div class="absolute inset-x-0 top-0 h-44 sm:h-52 flex flex-col justify-between pointer-events-none" aria-hidden="true">
                <div class="border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                <div class="border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                <div class="border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <ul class="relative flex items-end gap-2 sm:gap-3 h-44 sm:h-52">
                <li v-for="(t, i) in shownTeachers" :key="t.id" class="relative flex-1 min-w-[2.75rem] h-full flex flex-col items-center justify-end" @mouseenter="hover = i">
                  <button type="button" class="w-full h-full flex flex-col items-center justify-end focus:outline-none" :aria-label="describe(t)" @focus="hover = i" @blur="hover = null" @click="hover = hover === i ? null : i">
                    <span class="mb-0.5 text-[11px] sm:text-xs font-medium tabular-nums text-gray-700 dark:text-gray-200">{{ t.total }}</span>
                    <span class="w-full max-w-[2.75rem] flex flex-col-reverse rounded-t-[4px] overflow-hidden" :style="{ height: `${(t.total / scaleTop) * 100}%` }">
                      <span v-for="k in KINDS" v-show="t[k.key]" :key="k.key" class="tw-col-seg w-full" :style="{ flexGrow: t[k.key], background: colorOf(k) }"></span>
                    </span>
                  </button>
                </li>
              </ul>
              <!-- names along the bottom (x axis) -->
              <div class="flex gap-2 sm:gap-3 mt-1.5">
                <span v-for="t in shownTeachers" :key="t.id" class="flex-1 min-w-[2.75rem] text-center text-[10px] sm:text-[11px] leading-tight text-gray-700 dark:text-gray-200 truncate" :title="t.name">{{ shortName(t.name) }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- the same numbers as a table -->
      <div v-else class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table class="w-full text-xs sm:text-sm">
          <thead class="bg-gray-50 dark:bg-gray-800 text-left text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <tr><th class="px-3 py-2">Teacher</th><th v-for="k in KINDS" :key="k.key" class="px-2 py-2 text-right">{{ k.short }}</th><th class="px-3 py-2 text-right">Total</th><th class="px-3 py-2 text-right">Sign-ins</th></tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="t in shownTeachers" :key="t.id" class="text-gray-800 dark:text-gray-100">
              <td class="px-3 py-1.5 max-w-[10rem] truncate" :title="t.name">{{ t.name }}</td>
              <td v-for="k in KINDS" :key="k.key" class="px-2 py-1.5 text-right tabular-nums">{{ t[k.key] }}</td>
              <td class="px-3 py-1.5 text-right tabular-nums font-semibold">{{ t.total }}</td>
              <td class="px-3 py-1.5 text-right tabular-nums text-gray-500 dark:text-gray-400">{{ t.signins }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <button v-if="teachers.length > LIMIT" type="button" class="dash-more" :aria-expanded="all" @click="all = !all">
      {{ all ? 'Show less' : `Show ${teachers.length - LIMIT} more` }}
      <svg class="w-4 h-4 transition-transform duration-300" :class="all ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { apiService } from '@/services/api'
import { useThemeStore } from '@/stores/theme'

type KindKey = 'enotes' | 'elibrary' | 'item_bank' | 'assessments' | 'marked'
interface TeacherWork { id: number; name: string; enotes: number; elibrary: number; item_bank: number; assessments: number; marked: number; signins: number; total: number }

// The five kinds of work, in a fixed order, each with its own colour (checked with the palette
// validator for colour-blind readers, light and dark)
const KINDS: { key: KindKey; label: string; short: string; light: string; dark: string }[] = [
  { key: 'enotes', label: 'eNotes', short: 'Notes', light: '#2a78d6', dark: '#3987e5' },
  { key: 'elibrary', label: 'eLibrary', short: 'eLib', light: '#eb6834', dark: '#d95926' },
  { key: 'item_bank', label: 'Item Bank', short: 'Items', light: '#1baf7a', dark: '#199e70' },
  { key: 'assessments', label: 'Assessments', short: 'Assess', light: '#eda100', dark: '#c98500' },
  { key: 'marked', label: 'Scripts marked', short: 'Marked', light: '#e87ba4', dark: '#d55181' },
]
const RANGES = [{ days: 7, label: '7 days' }, { days: 30, label: '30 days' }, { days: 90, label: '3 months' }] as const
const LIMIT = 8

const theme = useThemeStore()
const colorOf = (k: (typeof KINDS)[number]) => (theme.isDarkMode ? k.dark : k.light)

const days = ref<7 | 30 | 90>(30)
const view = ref<'Chart' | 'Table'>('Chart')
const teachers = ref<TeacherWork[]>([])
const loading = ref(false)
const failed = ref(false)
const all = ref(false)
const hover = ref<number | null>(null)

const load = async () => {
  loading.value = true
  failed.value = false
  try {
    const res = await apiService.get('/hod/teacher-performance', { days: days.value })
    teachers.value = res.data.data.teachers || []
  } catch {
    failed.value = true
  } finally {
    loading.value = false
  }
}
watch(days, () => { hover.value = null; load() })
onMounted(load)

const rangeLabel = computed(() => (days.value === 90 ? 'last 3 months' : `last ${days.value} days`))
const shownTeachers = computed(() => (all.value ? teachers.value : teachers.value.slice(0, LIMIT)))
const max = computed(() => Math.max(0, ...teachers.value.map(t => t.total)))
const hovered = computed(() => (hover.value === null ? null : shownTeachers.value[hover.value] ?? null))
// the top of the scale: the biggest column, rounded up to an even number so the middle line is a whole one
const scaleTop = computed(() => { const m = Math.max(1, ...shownTeachers.value.map(t => t.total)); return m < 4 ? 4 : Math.ceil(m / 2) * 2 })
// under a column: the first name and the first letter of the next ("Ahwera R."), the full name on hover
const shortName = (name: string) => { const [first, second] = name.split(/\s+/); return second ? `${first} ${second[0]}.` : first }
const describe = (t: TeacherWork) => `${t.name}: ${t.total} in the ${rangeLabel.value} - ${KINDS.map(k => `${k.label} ${t[k.key]}`).join(', ')}`
</script>

