<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-2 mb-1">
      <div class="hidden sm:flex w-7 h-7 rounded-lg bg-emerald-600 items-center justify-center flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
        </svg>
      </div>
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">My Learning Map</h1>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-5">
      Every learning outcome for your class<template v-if="data?.year"> in {{ data.year }}</template>, and where you stand on each - it fills in as your teachers return your assessments.
    </p>

    <!-- Loading -->
    <div v-if="loading" class="space-y-4 animate-pulse">
      <div class="h-28 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
      <div class="flex gap-3">
        <div v-for="i in 4" :key="i" class="h-24 w-40 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div class="h-64 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5 text-sm text-red-800 dark:text-red-200">{{ error }}</div>

    <div v-else-if="!data || !data.subjects.length" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-lg font-medium text-gray-900 dark:text-white mb-1">Your map is on its way</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Your school hasn't set up this year's curriculum for your class yet.</p>
    </div>

    <template v-else>
      <!-- Overall -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 mb-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div class="flex items-center gap-4">
          <ProgressRing :percent="data.overall.percent" :size="84" :stroke="9" color="#059669">
            <span class="text-lg font-bold text-gray-900 dark:text-white"><CountUp :value="`${data.overall.percent}%`" /></span>
          </ProgressRing>
          <div>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">Outcomes achieved</p>
            <p class="text-xs text-gray-500 dark:text-gray-400"><CountUp :value="data.overall.achieved" /> of {{ data.overall.outcomes }} across {{ data.subjects.length }} {{ data.subjects.length === 1 ? 'subject' : 'subjects' }}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 sm:ml-auto">
          <span v-for="s in legend" :key="s.key" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" :class="s.chip">
            <span class="w-2 h-2 rounded-full" :class="s.dot"></span>{{ s.label }} <span class="font-bold">{{ data.overall[s.key] }}</span>
          </span>
        </div>
      </div>

      <!-- Subjects: when they don't all fit, they drift slowly to the right on their own, looping
           round (a second copy follows the first); resting a pointer or finger on them pauses the
           drift so a card is easy to pick -->
      <div
        ref="subjectsViewport"
        class="subjects-viewport mb-4 -mx-1"
        :class="drifting ? 'is-drifting' : 'overflow-x-auto'"
      >
        <div
          ref="subjectsTrack"
          class="subjects-track flex w-max py-1.5"
          :style="drifting ? { animationDuration: `${driftSeconds}s` } : undefined"
        >
          <div
            v-for="copy in (drifting ? 2 : 1)"
            :key="copy"
            class="flex gap-3 px-1.5"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <button
              v-for="subject in data.subjects"
              :key="`${copy}-${subject.id}`"
              type="button"
              :tabindex="copy === 2 ? -1 : undefined"
              class="flex-shrink-0 w-44 text-left bg-white dark:bg-gray-800 rounded-xl border p-3 transition-all hover:-translate-y-0.5"
              :class="subject.id === activeSubjectId ? 'border-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-900' : 'border-gray-200 dark:border-gray-700'"
              @click="selectSubject(subject.id)"
            >
              <div class="flex items-center gap-3">
                <ProgressRing :percent="subject.totals.percent" :size="46" :stroke="5" color="#059669">
                  <span class="text-[11px] font-bold text-gray-800 dark:text-gray-100">{{ subject.totals.percent }}%</span>
                </ProgressRing>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ subject.name }}</p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ subject.totals.achieved }}/{{ subject.totals.outcomes }} outcomes</p>
                  <p v-if="attentionCount(subject.totals)" class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-300">{{ attentionCount(subject.totals) }} to do</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Selected subject -->
      <div v-if="activeSubject" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <h2 class="text-base font-bold text-gray-900 dark:text-white mr-auto">{{ activeSubject.name }}</h2>
          <div class="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-900/50">
            <button
              v-for="term in termTabs"
              :key="term.key"
              type="button"
              class="px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
              :class="activeTerm === term.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'"
              @click="activeTerm = term.key"
            >
              {{ term.label }}<span v-if="term.current" class="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 align-middle" title="This term"></span>
            </button>
          </div>
          <label class="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none">
            <input v-model="onlyToDo" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500">
            Only what needs attention
          </label>
        </div>

        <div v-if="!shownTopics.length" class="text-center py-10 text-sm text-gray-500 dark:text-gray-400">
          {{ onlyToDo ? 'Nothing needs your attention here - well done.' : 'No topics for this term yet.' }}
        </div>

        <!-- The path: one stop per topic -->
        <ol v-else class="relative">
          <li v-for="(topic, i) in shownTopics" :key="topic.id" class="relative pl-12 sm:pl-14 pb-5 last:pb-0">
            <span v-if="i < shownTopics.length - 1" class="absolute left-[21px] sm:left-[25px] top-11 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
            <div class="absolute left-0 top-0">
              <ProgressRing :percent="topicPercent(topic)" :size="44" :stroke="5" :color="topicColor(topic)">
                <svg v-if="topicPercent(topic) === 100" class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                <span v-else class="text-[10px] font-bold text-gray-700 dark:text-gray-200">{{ topicPercent(topic) }}%</span>
              </ProgressRing>
            </div>

            <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/30">
              <button type="button" class="w-full text-left p-3 sm:p-4 flex items-start gap-3" @click="toggle(topic.id)">
                <div class="min-w-0 flex-1">
                  <p v-if="topic.theme" class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 truncate">{{ topic.theme }}<template v-if="activeTerm === 'all' && topic.term_name"> · {{ topic.term_name }}</template></p>
                  <p class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug">{{ topic.topic }}</p>
                  <!-- Outcomes at a glance -->
                  <div class="flex gap-1 mt-2" :title="`${topic.summary.achieved} of ${topic.summary.outcomes} outcomes achieved`">
                    <span v-for="o in topic.outcomes" :key="o.id" class="h-1.5 flex-1 max-w-[42px] rounded-full" :class="statusStyle(o.status).bar"></span>
                  </div>
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ topic.summary.achieved }}/{{ topic.summary.outcomes }} outcomes</span>
                    <span v-if="topic.aoi" class="px-1.5 py-0.5 rounded text-[10px] font-semibold" :class="statusStyle(topic.aoi.status).chip">
                      Activity of Integration: {{ topic.aoi.level ? `${topic.aoi.level} · ${topic.aoi.percentage}%` : statusStyle(topic.aoi.status).label }}
                    </span>
                    <span v-if="topic.eoc" class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">End of chapter: {{ topic.eoc.level }} · {{ topic.eoc.percentage }}%</span>
                    <span v-if="topic.enote" class="px-1.5 py-0.5 rounded text-[10px] font-semibold" :class="topic.enote.opened ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'">
                      {{ topic.enote.opened ? 'Notes read' : 'Notes available' }}
                    </span>
                  </div>
                </div>
                <svg class="w-4 h-4 mt-1 text-gray-400 flex-shrink-0 transition-transform" :class="{ 'rotate-180': open[topic.id] }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div v-if="open[topic.id]" class="px-3 sm:px-4 pb-3 sm:pb-4">
                <p v-if="topic.competence" class="text-xs text-gray-600 dark:text-gray-300 mb-3 p-2.5 rounded-lg bg-white/70 dark:bg-gray-800/60 border border-dashed border-gray-200 dark:border-gray-700">
                  <span class="font-semibold">Competency:</span> {{ topic.competence }}
                </p>
                <ul class="space-y-2">
                  <li v-for="o in topic.outcomes" :key="o.id" class="flex flex-wrap sm:flex-nowrap items-start gap-x-2.5 gap-y-1.5">
                    <span class="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" :class="statusStyle(o.status).icon">
                      <svg v-if="o.status === 'achieved'" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                      <svg v-else-if="o.status === 'awaiting'" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"></path></svg>
                      <span v-else-if="o.status !== 'not_assessed'" class="w-1.5 h-1.5 rounded-full bg-current"></span>
                    </span>
                    <div class="min-w-0 flex-1 basis-[calc(100%-30px)] sm:basis-auto">
                      <p class="text-sm text-gray-800 dark:text-gray-100 leading-snug">{{ o.text }}</p>
                      <p class="text-[11px] mt-0.5" :class="statusStyle(o.status).text">
                        {{ o.level ? `${o.level} · ${o.percentage}%` : statusStyle(o.status).label }}
                      </p>
                    </div>
                    <template v-for="action in [outcomeAction(o)]" :key="'a' + o.id">
                      <RouterLink
                        v-if="action"
                        :to="action.to"
                        class="flex-shrink-0 ml-[30px] sm:ml-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors"
                        :class="action.primary ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'"
                      >{{ action.label }}</RouterLink>
                    </template>
                  </li>
                </ul>
                <div v-if="topic.enote || (topic.aoi && topicAction(topic))" class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <RouterLink v-if="topic.enote" :to="`/student/enotes/${topic.enote.id}`" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700">
                    {{ topic.enote.opened ? 'Read the notes again' : 'Read the notes' }}
                  </RouterLink>
                  <RouterLink v-if="topic.aoi && topicAction(topic)" :to="topicAction(topic)!.to" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
                    {{ topicAction(topic)!.label }} the Activity of Integration
                  </RouterLink>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch, h, defineComponent } from 'vue'
import axios from 'axios'
import CountUp from '@/components/common/CountUp.vue'

type Status = 'achieved' | 'developing' | 'needs_support' | 'awaiting' | 'available' | 'not_assessed'
interface Assessment { id: number; title: string; category: string | null; state: 'marked' | 'awaiting' | 'started' | 'available'; percentage: number | null; submission_id: number | null }
interface Standing { status: Status; percentage: number | null; level: string | null; grade: string | null; assessments: Assessment[] }
interface Outcome extends Standing { id: number; text: string }
interface Totals { outcomes: number; achieved: number; developing: number; needs_support: number; awaiting: number; available: number; not_assessed: number; percent?: number }
interface Topic {
  id: number
  term_id: number | null
  term_name: string | null
  theme: string | null
  topic: string
  competence: string | null
  outcomes: Outcome[]
  summary: Totals
  aoi: Standing | null
  eoc: { percentage: number; level: string; grade: string } | null
  enote: { id: number; title: string; opened: boolean; pages_read: number; total_pages: number } | null
}
interface Subject { id: number; name: string; code: string | null; topics: Topic[]; totals: Totals & { percent: number } }
interface MasteryData { year: string | null; current_term_id: number | null; subjects: Subject[]; overall: Totals & { percent: number } }

// A ring that fills to `percent`, with whatever's inside it in the middle
const ProgressRing = defineComponent({
  props: { percent: { type: Number, required: true }, size: { type: Number, default: 48 }, stroke: { type: Number, default: 5 }, color: { type: String, default: '#059669' } },
  setup(props, { slots }) {
    return () => {
      const r = (props.size - props.stroke) / 2
      const c = 2 * Math.PI * r
      const filled = Math.max(0, Math.min(100, props.percent)) / 100 * c
      return h('div', { class: 'relative flex items-center justify-center flex-shrink-0', style: { width: `${props.size}px`, height: `${props.size}px` } }, [
        h('svg', { width: props.size, height: props.size, class: '-rotate-90 absolute inset-0' }, [
          h('circle', { cx: props.size / 2, cy: props.size / 2, r, fill: 'none', 'stroke-width': props.stroke, class: 'stroke-gray-200 dark:stroke-gray-700' }),
          h('circle', { cx: props.size / 2, cy: props.size / 2, r, fill: 'none', stroke: props.color, 'stroke-width': props.stroke, 'stroke-linecap': 'round', 'stroke-dasharray': `${filled} ${c}`, style: { transition: 'stroke-dasharray 1s ease' } })
        ]),
        h('div', { class: 'relative flex items-center justify-center' }, slots.default?.())
      ])
    }
  }
})

const STATUS: Record<Status, { label: string; chip: string; dot: string; bar: string; icon: string; text: string }> = {
  achieved: { label: 'Achieved', chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', dot: 'bg-emerald-500', bar: 'bg-emerald-500', icon: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300', text: 'text-emerald-700 dark:text-emerald-300 font-semibold' },
  developing: { label: 'Developing', chip: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', dot: 'bg-amber-500', bar: 'bg-amber-400', icon: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300', text: 'text-amber-700 dark:text-amber-300 font-semibold' },
  needs_support: { label: 'Needs support', chip: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300', dot: 'bg-rose-500', bar: 'bg-rose-400', icon: 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300', text: 'text-rose-700 dark:text-rose-300 font-semibold' },
  awaiting: { label: 'Awaiting marking', chip: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300', dot: 'bg-sky-500', bar: 'bg-sky-300', icon: 'bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300', text: 'text-sky-700 dark:text-sky-300' },
  available: { label: 'Assessment ready to attempt', chip: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300', dot: 'bg-indigo-500', bar: 'bg-indigo-300', icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300', text: 'text-indigo-700 dark:text-indigo-300' },
  not_assessed: { label: 'Not yet assessed', chip: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', dot: 'bg-gray-400', bar: 'bg-gray-200 dark:bg-gray-700', icon: 'border-2 border-gray-300 dark:border-gray-600', text: 'text-gray-500 dark:text-gray-400' }
}
const statusStyle = (s: Status) => STATUS[s] ?? STATUS.not_assessed
const legendOrder: Status[] = ['achieved', 'developing', 'needs_support', 'awaiting', 'available']
const legend = computed(() => legendOrder.map(key => ({ key, ...STATUS[key] })).filter(s => (data.value?.overall[s.key] ?? 0) > 0))

const data = ref<MasteryData | null>(null)
const loading = ref(true)
const error = ref('')
const activeSubjectId = ref<number | null>(null)
const activeTerm = ref<'all' | number>('all')
const onlyToDo = ref(false)
const open = ref<Record<number, boolean>>({})

const activeSubject = computed(() => data.value?.subjects.find(s => s.id === activeSubjectId.value) ?? null)

const termTabs = computed(() => {
  const seen = new Map<number, string>()
  activeSubject.value?.topics.forEach(t => { if (t.term_id !== null && !seen.has(t.term_id)) seen.set(t.term_id, t.term_name || `Term ${t.term_id}`) })
  const tabs: { key: 'all' | number; label: string; current: boolean }[] = [{ key: 'all', label: 'All', current: false }]
  Array.from(seen.entries()).sort((a, b) => a[0] - b[0]).forEach(([id, name]) => tabs.push({ key: id, label: name, current: id === data.value?.current_term_id }))
  return tabs
})

const needsAttention = (t: Topic) => t.outcomes.some(o => ['available', 'developing', 'needs_support'].includes(o.status)) || (t.aoi && ['available', 'developing', 'needs_support'].includes(t.aoi.status))

const shownTopics = computed(() => (activeSubject.value?.topics ?? [])
  .filter(t => activeTerm.value === 'all' || t.term_id === activeTerm.value)
  .filter(t => !onlyToDo.value || needsAttention(t)))

const attentionCount = (t: Totals) => t.available + t.developing + t.needs_support

const topicPercent = (t: Topic) => t.summary.outcomes ? Math.round(t.summary.achieved / t.summary.outcomes * 100) : 0
const topicColor = (t: Topic) => {
  if (t.summary.needs_support) return '#e11d48'
  if (t.summary.developing) return '#d97706'
  return '#059669'
}

function actionFor(a: Assessment | undefined) {
  if (!a) return null
  if (a.state === 'available') return { label: 'Attempt', to: `/student/assignments/${a.id}/answer`, primary: true }
  if (a.state === 'started') return { label: 'Continue', to: `/student/assignments/${a.id}/answer`, primary: true }
  if (a.state === 'marked' && a.submission_id) return { label: 'View results', to: `/student/assignments/${a.id}/result/${a.submission_id}`, primary: false }
  return null
}
// The most useful thing to do next for an outcome: finish/attempt an assessment, else see results
const outcomeAction = (o: Outcome) =>
  actionFor(o.assessments.find(a => a.state === 'started') ?? o.assessments.find(a => a.state === 'available') ?? o.assessments.find(a => a.state === 'marked'))
const topicAction = (t: Topic) => (t.aoi ? actionFor(t.aoi.assessments.find(a => a.state === 'started') ?? t.aoi.assessments.find(a => a.state === 'available')) : null)

const toggle = (id: number) => { open.value = { ...open.value, [id]: !open.value[id] } }

// ---- Drifting subject cards ----
// Only when the cards don't all fit across; speed is fixed in pixels per second so a long row of
// subjects drifts at the same gentle pace as a short one
const DRIFT_SPEED = 26
const reducedMotion = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const subjectsViewport = ref<HTMLElement | null>(null)
const subjectsTrack = ref<HTMLElement | null>(null)
const drifting = ref(false)
const driftSeconds = ref(40)
let viewportObserver: ResizeObserver | null = null

async function checkDrift() {
  if (reducedMotion) return
  // Measure a single copy of the row
  drifting.value = false
  await nextTick()
  const viewport = subjectsViewport.value
  const oneCopy = subjectsTrack.value?.firstElementChild as HTMLElement | null
  if (!viewport || !oneCopy) return
  const width = oneCopy.scrollWidth
  if (width > viewport.clientWidth + 4) {
    driftSeconds.value = Math.max(20, Math.round(width / DRIFT_SPEED))
    drifting.value = true
  }
}

watch(() => data.value?.subjects.length, () => checkDrift())

onMounted(() => {
  viewportObserver = new ResizeObserver(() => {
    const viewport = subjectsViewport.value
    const oneCopy = subjectsTrack.value?.firstElementChild as HTMLElement | null
    if (!viewport || !oneCopy) return
    const fits = oneCopy.scrollWidth <= viewport.clientWidth + 4
    if (fits === drifting.value) checkDrift()
  })
})

watch(subjectsViewport, (el) => {
  viewportObserver?.disconnect()
  if (el) viewportObserver?.observe(el)
})

onBeforeUnmount(() => viewportObserver?.disconnect())

function selectSubject(id: number) {
  activeSubjectId.value = id
  const subject = data.value?.subjects.find(s => s.id === id)
  // Start on this term when the subject has topics in it
  const current = data.value?.current_term_id
  activeTerm.value = current && subject?.topics.some(t => t.term_id === current) ? current : 'all'
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/student/mastery')
    if (response.data.success) {
      data.value = response.data.data
      const subjects = data.value?.subjects ?? []
      // Open on the subject with the most to do (else the first)
      const first = [...subjects].sort((a, b) => attentionCount(b.totals) - attentionCount(a.totals))[0]
      if (first) selectSubject(first.id)
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not load your learning map'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Subject cards drifting to the right: two copies of the row side by side, the pair sliding by one
   copy's width and looping, with the edges softly faded so cards glide in and out */
.subjects-viewport.is-drifting {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}

.is-drifting .subjects-track {
  animation-name: subjects-drift;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

/* Resting on the row (pointer, finger or keyboard focus) holds it still */
.is-drifting:hover .subjects-track,
.is-drifting:active .subjects-track,
.is-drifting:focus-within .subjects-track {
  animation-play-state: paused;
}

@keyframes subjects-drift {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
