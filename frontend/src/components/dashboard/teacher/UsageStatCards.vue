<template>
  <!-- How Tusome is being used, as a row of cards: a teacher's own use, or (for a HOD) the
       department's teachers. Each card has this period's figure and the change from the period
       before (the same number of days). -->
  <section :class="part === 'heading' ? '' : 'mb-4'" :aria-label="part === 'heading' ? undefined : title">
    <div v-if="part !== 'cards'" class="flex items-center gap-2" :class="part === 'heading' ? '' : 'mb-2'">
      <h2 class="sky-text font-heading text-sm sm:text-[0.95rem] font-bold text-[#061a55] dark:text-white">{{ title }}</h2>
      <span class="sky-sub text-xs text-gray-600 dark:text-gray-300 hidden sm:inline">· change from the {{ days }} days before</span>
      <span class="ml-auto inline-flex rounded-lg bg-white dark:bg-gray-800 p-0.5 ring-1 ring-gray-200 dark:ring-gray-700">
        <button
          v-for="d in [7, 30]"
          :key="d"
          type="button"
          class="px-2.5 py-0.5 rounded-md text-xs font-semibold transition"
          :class="days === d ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'"
          :aria-pressed="days === d"
          @click="days = d"
        >{{ d }} days</button>
      </span>
    </div>

    <template v-if="part !== 'heading'">
    <div v-if="!data && loading" class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      <div v-for="i in 4" :key="i" class="h-[5.25rem] rounded-2xl bg-white/70 dark:bg-gray-800 animate-pulse"></div>
    </div>
    <p v-else-if="!data" class="text-sm text-gray-500 dark:text-gray-400">These figures couldn't be loaded just now.</p>

    <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      <!-- each card: what it is and the change, the figure, and its line across the period
           (green when it rose against the period before, red when it fell) -->
      <div v-for="c in cards" :key="c.label" class="usage-card">
        <div class="flex items-center gap-1.5 min-w-0">
          <span class="usage-card-icon" :class="c.tone"><AppIcon :name="c.icon" class="w-3.5 h-3.5" /></span>
          <p class="flex-1 min-w-0 text-xs sm:text-[0.8rem] font-bold text-[#061a55] dark:text-gray-100 truncate">{{ c.label }}</p>
          <span v-if="c.change" class="usage-chip usage-num" :class="c.change.up ? 'usage-chip-up' : c.change.down ? 'usage-chip-down' : 'usage-chip-flat'">
            <span aria-hidden="true">{{ c.change.up ? '▲' : c.change.down ? '▼' : '' }}</span>{{ c.change.text }}
          </span>
        </div>
        <!-- lined up under the card name (past the icon, which phones do not show) -->
        <p class="mt-1 sm:pl-[1.775rem] min-w-0" :class="c.parts.length > 2 ? 'grid grid-cols-2 gap-x-3 gap-y-0.5' : 'flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5'">
          <!-- each figure the same size and font, with its few words after it ("118 eNotes · 0 eLibrary") -->
          <template v-for="(part, i) in c.parts" :key="i">
            <span v-if="i && c.parts.length <= 2" class="self-center w-px h-3.5 bg-gray-300 dark:bg-gray-600 mx-0.5" aria-hidden="true"></span>
            <span class="inline-flex items-baseline gap-1 whitespace-nowrap"><span class="usage-num usage-num-plain text-xs sm:text-[0.8rem] leading-none" :class="part.alert ? 'text-amber-600 dark:text-amber-400' : 'text-[#061a55] dark:text-white'">{{ part.value }}</span>
            <span class="text-xs sm:text-[0.8rem] font-normal whitespace-nowrap" :class="part.alert ? 'text-amber-600 dark:text-amber-400' : 'text-[#061a55] dark:text-gray-100'"><span v-if="part.short" class="sm:hidden" :title="part.label">{{ part.short }}</span><span :class="part.short ? 'hidden sm:inline' : ''"><template v-for="(bit, j) in withNumbers(part.label)" :key="j"><span v-if="bit.num" class="usage-num usage-num-plain">{{ bit.text }}</span><template v-else>{{ bit.text }}</template></template></span></span></span>
          </template>
        </p>
        <svg class="usage-spark" viewBox="0 0 100 32" preserveAspectRatio="none" role="img" :aria-label="`${c.label}, day by day over the last ${data.days} days`">
          <defs>
            <linearGradient :id="`spark-${c.key}`" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" :stop-color="c.color" stop-opacity="0.28" />
              <stop offset="1" :stop-color="c.color" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path :d="c.spark.area" :fill="`url(#spark-${c.key})`" />
          <path :d="c.spark.line" fill="none" :stroke="c.color" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
        </svg>
        <span class="usage-spark-dot" :style="{ background: c.color, top: `calc(100% - 0.5rem - ${(32 - c.spark.lastY) / 32 * 1.5}rem)` }" aria-hidden="true"></span>
      </div>
    </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { apiService } from '@/services/api'
import AppIcon from '@/components/common/AppIcon.vue'

interface Period { signins: number; actions: number; marked: number; content: number; enotes: number; item_bank: number; elibrary: number; assessments: number; learning: number; active_days: number; active_teachers: number }
interface Day { date: string; signins: number; actions: number; marked: number; learning: number; active: number }
interface Summary { days: number; teachers: number; series: Day[]; unmarked: number; current: Period; previous: Period }
// parts: the figures on the card, each with its few words ("118" "eNotes")
// short: the label on a phone ("Notes", "Items", "of 30d"), so the cards stay neat
interface Part { value: string; label: string; short?: string; alert?: boolean }
interface CardIn { key: string; label: string; icon: string; tone: string; parts: Part[]; change: ReturnType<typeof change>; values: number[] }

// teacher: their own use; hod: the department's teachers. part: 'heading' (title and the 7/30 days
// switch, for the banner), 'cards', or both; v-model:days keeps the two parts on the same period.
const props = withDefaults(defineProps<{ mode: 'teacher' | 'hod'; part?: 'all' | 'heading' | 'cards' }>(), { part: 'all' })
const days = defineModel<7 | 30>('days', { default: 30 })
const title = computed(() => (props.mode === 'hod' ? 'How your teachers are using Tusome' : 'How you are using Tusome'))

const data = ref<Summary | null>(null)
const loading = ref(false)
const load = async () => {
  if (props.part === 'heading') return
  loading.value = true
  try {
    const res = await apiService.get(props.mode === 'hod' ? '/hod/teacher-usage' : '/teacher/usage/summary', { days: days.value })
    data.value = res.data.data
  } catch {
    data.value = null
  } finally {
    loading.value = false
  }
}
watch(days, load)
onMounted(load)

// the change from the period before: a percentage, or "new" when there was nothing before
const change = (now: number, before: number) => {
  if (!now && !before) return null
  if (!before) return { text: 'new', up: true, down: false }
  const pct = Math.round(((now - before) / before) * 100)
  return { text: `${pct > 0 ? '+' : ''}${pct}%`, up: pct > 0, down: pct < 0 }
}
// The small line graph, like a currency chart: the day-by-day values (a 30-day line is eased over
// three days so it reads as a trend), scaled to the card, with a soft fill under it. Returns the
// line, the filled area and where the last point sits (for the dot on today).
const sparkline = (values: number[]) => {
  const v = values.length > 10 ? values.map((_, i) => { const w = values.slice(Math.max(0, i - 1), i + 2); return w.reduce((a, b) => a + b, 0) / w.length }) : values
  const max = Math.max(...v), min = Math.min(...v)
  const span = max - min || 1
  const pts = v.map((y, i) => [v.length > 1 ? (i / (v.length - 1)) * 100 : 50, max === min ? 18 : 29 - ((y - min) / span) * 25])
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')
  return { line, area: `${line} L100 32 L0 32 Z`, lastY: pts[pts.length - 1][1] }
}
// A note split so its numbers ("3 unmarked", "2.0 a day") can wear the same font as the big figure
const withNumbers = (text: string) => text.split(/(\d[\d,.]*)/).filter(Boolean).map(t => ({ text: t, num: /^\d/.test(t) }))
// green when the figure rose against the period before, red when it fell, blue-grey otherwise
const colorFor = (ch: ReturnType<typeof change>) => (ch?.up ? '#16a34a' : ch?.down ? '#e11d48' : '#64748b')
const cards = computed(() => {
  const d = data.value!
  const c = d.current
  const p = d.previous
  const s = d.series || []
  // a teacher's active days build up through the period; a department's are how many were active each day
  let running = 0
  const activeLine = props.mode === 'hod' ? s.map(x => x.active) : s.map(x => (running += x.active ? 1 : 0))
  const first = props.mode === 'hod'
    ? { key: 'active', label: 'Teachers active', icon: 'users', tone: 'usage-blue', parts: [{ value: String(c.active_teachers), label: `of ${d.teachers} teachers`, short: `of ${d.teachers} tchrs` }], change: change(c.active_teachers, p.active_teachers), values: activeLine }
    : { key: 'active', label: 'Active days', icon: 'clock', tone: 'usage-blue', parts: [{ value: String(c.active_days), label: `of ${d.days} days`, short: `of ${d.days}d` }], change: change(c.active_days, p.active_days), values: activeLine }
  const list: CardIn[] = [
    first,
    { key: 'signins', label: 'Sign-ins', icon: 'key', tone: 'usage-violet', parts: [{ value: c.signins.toLocaleString(), label: `${c.signins === 1 ? 'sign-in' : 'sign-ins'} in ${d.days} days`, short: `${c.signins === 1 ? 'sign-in' : 'sign-ins'} · ${d.days}d` }], change: change(c.signins, p.signins), values: s.map(x => x.signins) },
    // only eNotes (written, published, edited), eLibrary books, Item Bank questions and assessments set, each on its own
    { key: 'learning', label: 'Things done', icon: 'bolt', tone: 'usage-mint', parts: [{ value: (c.enotes ?? 0).toLocaleString(), label: 'eNotes', short: 'Notes' }, { value: (c.elibrary ?? 0).toLocaleString(), label: 'eLibrary', short: 'eLib' }, { value: (c.item_bank ?? 0).toLocaleString(), label: 'Item Bank', short: 'Items' }, { value: (c.assessments ?? 0).toLocaleString(), label: 'Assess' }], change: change(c.learning ?? 0, p.learning ?? 0), values: s.map(x => x.learning ?? 0) },
    // marked in the period, and what is still waiting to be marked now
    { key: 'marked', label: 'Scripts marked', icon: 'check-circle', tone: 'usage-peach', parts: [{ value: c.marked.toLocaleString(), label: 'marked' }, { value: (d.unmarked ?? 0).toLocaleString(), label: 'unmarked', alert: !!d.unmarked }], change: change(c.marked, p.marked), values: s.map(x => x.marked) },
  ]
  return list.map(card => ({ ...card, color: colorFor(card.change), spark: sparkline(card.values.length ? card.values : [0, 0]) }))
})
</script>
