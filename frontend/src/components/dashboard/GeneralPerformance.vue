<template>
  <!-- General performance: every marked assessment's score as a point on a line, in the order the marks came
       back, with the trend (the average of the last three) as a second, dashed line - both in percent,
       on one axis. A subject and a range narrow it; a table shows the same numbers. Only marks a
       teacher has released are here (the assessments list gives no percentage before that).
       A page can add an "activity" view (slot): the switch then reads Performance / Activity / Table
       and only one of them shows at a time. -->
  <section class="dash-box flex flex-col">
    <h2 class="dash-bar">General performance <RouterLink to="/student/assignments" class="dash-bar-link">All results</RouterLink></h2>

    <!-- One switch for what the card shows, on the right (beside the filters when they show) -->
    <div v-if="hasActivity && !filtersShown" class="px-3 pt-3 flex items-center gap-2">
      <div v-if="view === 'Activity'" class="min-w-0 flex-1"><slot name="activity-head" /></div>
      <div class="gp-switch ml-auto" role="tablist" aria-label="What to show">
        <button v-for="v in VIEWS" :key="v" type="button" role="tab" class="gp-switch-btn" :title="v" :class="{ 'gp-switch-on': view === v }" :aria-selected="view === v" @click="view = v">
          <AppIcon :name="VIEW_ICON[v]" class="w-4 h-4 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-3.5 xl:h-3.5" /><span class="sr-only sm:not-sr-only lg:sr-only xl:not-sr-only">{{ v }}</span>
        </button>
      </div>
    </div>

    <div v-if="hasActivity && view === 'Activity'" class="gp-activity px-3 pb-3 pt-2">
      <slot name="activity" />
    </div>

    <div v-else-if="loading" class="p-3 space-y-2">
      <div class="h-10 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
      <div class="h-56 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
    </div>

    <div v-else-if="!marked.length" class="p-4 flex items-center gap-3">
      <span class="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center"><AppIcon name="chart" class="w-5 h-5" /></span>
      <p class="text-[0.95rem] text-gray-700 dark:text-gray-200">Your trend shows here once teachers return your marked work.</p>
    </div>

    <div v-else class="p-3 space-y-2.5">
      <!-- Filters, in one row -->
      <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <select v-model="subject" class="max-w-[7.5rem] sm:max-w-none lg:max-w-[8.5rem] xl:max-w-none px-2 sm:px-2.5 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" aria-label="Subject">
          <option value="">All subjects</option>
          <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
        </select>
        <div class="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden text-xs font-semibold" role="group" aria-label="How many">
          <button v-for="r in RANGES" :key="r.v" type="button" class="px-2.5 py-1.5" :class="range === r.v ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'" :aria-pressed="range === r.v" @click="range = r.v"><span v-if="r.short" class="sm:hidden lg:inline xl:hidden">{{ r.short }}</span><span :class="r.short ? 'hidden sm:inline lg:hidden xl:inline' : ''">{{ r.label }}</span></button>
        </div>
        <div v-if="hasActivity" class="ml-auto">
          <div class="gp-switch" role="tablist" aria-label="What to show">
            <button v-for="v in VIEWS" :key="v" type="button" role="tab" class="gp-switch-btn" :title="v" :class="{ 'gp-switch-on': view === v }" :aria-selected="view === v" @click="view = v">
              <AppIcon :name="VIEW_ICON[v]" class="w-4 h-4 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-3.5 xl:h-3.5" /><span class="sr-only sm:not-sr-only lg:sr-only xl:not-sr-only">{{ v }}</span>
            </button>
          </div>
        </div>
        <div v-else class="ml-auto inline-flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden text-xs font-semibold" role="group" aria-label="View">
          <button v-for="v in ['Chart', 'Table']" :key="v" type="button" class="px-2.5 py-1.5" :class="view === v ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'" :aria-pressed="view === v" @click="view = v">{{ v }}</button>
        </div>
      </div>

      <!-- The numbers that matter -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 ring-1 ring-gray-100 dark:ring-gray-700/60 px-2.5 py-1.5">
          <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Average</p>
          <p class="text-lg font-extrabold tabular-nums leading-tight text-gray-900 dark:text-white">{{ stats.average }}%</p>
        </div>
        <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 ring-1 ring-gray-100 dark:ring-gray-700/60 px-2.5 py-1.5">
          <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Latest</p>
          <p class="text-lg font-extrabold tabular-nums leading-tight text-gray-900 dark:text-white">{{ stats.latest }}%</p>
        </div>
        <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 ring-1 ring-gray-100 dark:ring-gray-700/60 px-2.5 py-1.5">
          <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Trend</p>
          <p class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1 mt-0.5">
            <span aria-hidden="true" :class="TREND[stats.trend].cls">{{ TREND[stats.trend].arrow }}</span>{{ TREND[stats.trend].label }}<span v-if="stats.delta" class="font-semibold text-gray-500 dark:text-gray-400 tabular-nums">{{ stats.delta > 0 ? '+' : '' }}{{ stats.delta }}</span>
          </p>
        </div>
        <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 ring-1 ring-gray-100 dark:ring-gray-700/60 px-2.5 py-1.5 min-w-0">
          <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ subject ? 'Best score' : 'Best subject' }}</p>
          <p class="text-sm font-bold text-gray-900 dark:text-white truncate mt-0.5" :title="stats.best">{{ stats.best }}</p>
        </div>
      </div>

      <!-- The trend -->
      <!-- the chart: compact, a glance at the direction -->
      <div v-show="view === 'Chart' || view === 'Performance'">
        <div class="relative h-40 sm:h-44">
          <canvas ref="canvasEl" role="img" :aria-label="`Scores of your last ${shownList.length} marked assessments, with the trend`"></canvas>
        </div>
        <p class="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">Dashed line: the trend, the average of your last three marks.</p>
      </div>
      <div v-if="view === 'Table'" class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table class="w-full text-sm">
          <thead class="sticky top-0 bg-gray-50 dark:bg-gray-800 text-left text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <tr><th class="px-3 py-2">Date</th><th class="px-3 py-2">Assessment</th><th class="px-3 py-2">Subject</th><th class="px-3 py-2 text-right">Score</th><th class="px-3 py-2 text-right">Trend</th></tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="(r, i) in tableRows" :key="r.id" class="text-gray-800 dark:text-gray-100">
              <td class="px-3 py-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">{{ r.dateLabel }}</td>
              <td class="px-3 py-1.5 max-w-[14rem] truncate" :title="r.title">{{ r.title }}</td>
              <td class="px-3 py-1.5 whitespace-nowrap">{{ r.subject }}</td>
              <td class="px-3 py-1.5 text-right tabular-nums font-semibold">{{ r.pct }}%</td>
              <td class="px-3 py-1.5 text-right tabular-nums text-gray-500 dark:text-gray-400">{{ trendLine[shownList.length - 1 - i] }}%</td>
            </tr>
          </tbody>
        </table>
        <!-- five rows, the rest a tap away -->
        <button v-if="shownList.length > TABLE_ROWS" type="button" class="dash-more" :aria-expanded="tableAll" @click="tableAll = !tableAll">
          {{ tableAll ? 'Show less' : `Show ${shownList.length - TABLE_ROWS} more` }}
          <svg class="w-4 h-4 transition-transform duration-300" :class="tableAll ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, useSlots, watch } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { useThemeStore } from '@/stores/theme'

interface Row { id: number; title: string; subject: string; pct: number; at: number; dateLabel: string }

// Checked with the dataviz palette validator: bars and trend line, light and dark
const COLORS = { light: { score: '#22a45d', line: '#126c3d', grid: '#e5e7eb', ink: '#4b5563' }, dark: { score: '#22a45d', line: '#9a7cf2', grid: '#374151', ink: '#9ca3af' } }
const RANGES = [{ v: 10, label: 'Last 10', short: '10' }, { v: 20, label: 'Last 20', short: '20' }, { v: 0, label: 'All', short: '' }]
const TREND = {
  up: { arrow: '▲', label: 'Improving', cls: 'text-emerald-600 dark:text-emerald-400' },
  down: { arrow: '▼', label: 'Dropping', cls: 'text-rose-600 dark:text-rose-400' },
  flat: { arrow: '▶', label: 'Steady', cls: 'text-gray-500 dark:text-gray-400' },
  new: { arrow: '•', label: 'Too early to tell', cls: 'text-gray-400' }
} as const

const theme = useThemeStore()
const loading = ref(true)
const marked = ref<Row[]>([])
const subject = ref('')
const range = ref(10)
const hasActivity = !!useSlots().activity
const VIEWS = ['Activity', 'Performance', 'Table'] as const
const VIEW_ICON: Record<string, string> = { Performance: 'trend', Activity: 'chart', Table: 'clipboard' }
// Activity (the week) always opens first; Performance and Table are a tap away
const view = ref<string>(hasActivity ? 'Activity' : 'Chart')
// the table shows the newest five until "Show more"
const TABLE_ROWS = 5
const tableAll = ref(false)
const tableRows = computed(() => { const rows = shownList.value.slice().reverse(); return tableAll.value ? rows : rows.slice(0, TABLE_ROWS) })
const filtersShown = computed(() => !loading.value && marked.value.length > 0 && view.value !== 'Activity')

const subjects = computed(() => [...new Set(marked.value.map(r => r.subject))].sort())
const filtered = computed(() => marked.value.filter(r => !subject.value || r.subject === subject.value))
const shownList = computed(() => (range.value ? filtered.value.slice(-range.value) : filtered.value))
// the trend: each point is the average of that score and the two before it (in the whole filtered
// list, so the first point shown still has its history behind it)
const trendLine = computed(() => {
  const all = filtered.value
  const offset = all.length - shownList.value.length
  return shownList.value.map((_, i) => {
    const k = offset + i
    const win = all.slice(Math.max(0, k - 2), k + 1)
    return Math.round(win.reduce((a, r) => a + r.pct, 0) / win.length)
  })
})
const avg = (rows: Row[]) => (rows.length ? Math.round(rows.reduce((a, r) => a + r.pct, 0) / rows.length) : 0)
const stats = computed(() => {
  const rows = shownList.value
  const all = filtered.value
  let trend: keyof typeof TREND = 'new'
  let delta = 0
  if (all.length >= 4) {
    // the last three against the three before them
    delta = avg(all.slice(-3)) - avg(all.slice(-6, -3))
    trend = delta >= 3 ? 'up' : delta <= -3 ? 'down' : 'flat'
  }
  let best = '-'
  if (subject.value) {
    const top = rows.reduce<Row | null>((m, r) => (!m || r.pct > m.pct ? r : m), null)
    best = top ? `${top.pct}% · ${top.title}` : '-'
  } else {
    const bySubject = new Map<string, Row[]>()
    rows.forEach(r => bySubject.set(r.subject, [...(bySubject.get(r.subject) || []), r]))
    const ranked = [...bySubject.entries()].map(([s, list]) => ({ s, a: avg(list) })).sort((a, b) => b.a - a.a)
    best = ranked[0] ? `${ranked[0].s} · ${ranked[0].a}%` : '-'
  }
  return { average: avg(rows), latest: rows[rows.length - 1]?.pct ?? 0, trend, delta: trend === 'new' ? 0 : delta, best }
})

// ---- the chart ----
const canvasEl = ref<HTMLCanvasElement | null>(null)
const chart = shallowRef<any>(null)
const draw = async () => {
  await nextTick()
  if (!canvasEl.value || !shownList.value.length) return
  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)
  const c = theme.isDarkMode ? COLORS.dark : COLORS.light
  const rows = shownList.value
  // each point named by its assessment (short) over its date - several marks often come back the same day
  const seen: Record<string, number> = {}
  const labels = rows.map(r => {
    const short = r.title.length > 16 ? `${r.title.slice(0, 15).trim()}…` : r.title
    seen[short] = (seen[short] || 0) + 1
    return [seen[short] > 1 ? `${short} (${seen[short]})` : short, r.dateLabel]
  })
  // a soft fill under the scores, fading down to the axis
  const fill = (ctx: any) => {
    const area = ctx.chart.chartArea
    if (!area) return 'transparent'
    const g = ctx.chart.ctx.createLinearGradient(0, area.top, 0, area.bottom)
    g.addColorStop(0, `${c.score}40`)
    g.addColorStop(1, `${c.score}00`)
    return g
  }
  // the latest score written beside its point
  const latestLabel = {
    id: 'latestLabel',
    afterDatasetsDraw: (ch: any) => {
      const meta = ch.getDatasetMeta(0)
      const pt = meta?.data?.[meta.data.length - 1]
      if (!pt || meta.hidden) return
      const { ctx } = ch
      ctx.save()
      ctx.font = '700 12px Inter, system-ui, sans-serif'
      ctx.fillStyle = theme.isDarkMode ? '#f9fafb' : '#111827'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'bottom'
      ctx.fillText(`${rows[rows.length - 1].pct}%`, pt.x - 8, pt.y - 8)
      ctx.restore()
    }
  }
  const data = {
    labels,
    datasets: [
      { type: 'line' as const, label: 'Score', data: rows.map(r => r.pct), borderColor: c.score, backgroundColor: fill, fill: 'origin', borderWidth: 2.5, pointRadius: 4, pointHoverRadius: 6, pointBackgroundColor: c.score, pointBorderColor: theme.isDarkMode ? '#1f2937' : '#ffffff', pointBorderWidth: 2, tension: 0.3, clip: false, order: 0 },
      { type: 'line' as const, label: 'Trend (average of last 3)', data: trendLine.value, borderColor: c.line, backgroundColor: c.line, borderWidth: 2, borderDash: [6, 4], pointRadius: 3, pointHoverRadius: 5, pointBackgroundColor: c.line, pointBorderColor: theme.isDarkMode ? '#1f2937' : '#ffffff', pointBorderWidth: 2, tension: 0.3, clip: false, order: 1 }
    ]
  }
  const options: any = {
    responsive: true, maintainAspectRatio: false, animation: { duration: 400 },
    // room above 100% and at the ends, so a top mark's point isn't cut off
    layout: { padding: { top: 12, right: 10, left: 2 } },
    interaction: { mode: 'index', intersect: false },
    scales: {
      y: { min: 0, max: 100, ticks: { stepSize: 50, color: c.ink, font: { size: 10 }, callback: (v: number) => `${v}%` }, grid: { color: c.grid }, border: { display: false } },
      x: { offset: rows.length < 4, ticks: { color: c.ink, maxRotation: 0, autoSkip: true, autoSkipPadding: 12, font: { size: 10 } }, grid: { display: false }, border: { color: c.grid } }
    },
    plugins: {
      legend: { position: 'top', align: 'start', labels: { color: c.ink, boxWidth: 8, boxHeight: 8, usePointStyle: true, padding: 10, font: { size: 11 } } },
      tooltip: {
        callbacks: {
          title: (items: any[]) => rows[items[0].dataIndex]?.title || '',
          afterTitle: (items: any[]) => { const r = rows[items[0].dataIndex]; return r ? `${r.subject} · ${r.dateLabel}` : '' },
          label: (item: any) => ` ${item.dataset.label}: ${item.parsed.y}%`
        }
      }
    }
  }
  // built afresh each time, so the latest-score label reads the rows being shown
  chart.value?.destroy()
  chart.value = new Chart(canvasEl.value, { data, options, plugins: [latestLabel] } as any)
}
watch([shownList, () => theme.isDarkMode], draw)
// the canvas is rebuilt whenever the graph comes back into view (the Activity view removes it)
watch(view, v => { if (v === 'Chart' || v === 'Performance') draw() })

onMounted(async () => {
  try {
    const res = await axios.get('/api/student/assignments')
    const list: any[] = res.data?.data || []
    marked.value = list
      .filter(a => a.status === 'marked' && a.submission && a.submission.percentage !== null && a.submission.percentage !== undefined)
      .map(a => {
        const when = a.submission.released_at || a.submission.submitted_at || a.set_at || a.due_date
        const at = when ? new Date(String(when).replace(' ', 'T')).getTime() : 0
        return { id: a.id, title: a.title, subject: a.subject_name || 'Other', pct: Math.round(Number(a.submission.percentage)), at, dateLabel: at ? new Date(at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : '-' }
      })
      .sort((a, b) => a.at - b.at)
  } catch {
    marked.value = []
  } finally {
    loading.value = false
  }
  draw()
})
onBeforeUnmount(() => chart.value?.destroy())
</script>
