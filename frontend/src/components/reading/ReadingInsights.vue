<template>
  <!-- A student's own reading, worked out from what they've opened: totals, each subject (how far,
       how long, how it's going), the topics that need them, where to improve, then every topic. -->
  <section class="space-y-4">
    <!-- Totals -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div v-for="t in totals" :key="t.label" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 min-w-0">
        <p class="text-[11px] font-semibold text-gray-500 dark:text-gray-400">{{ t.label }}</p>
        <p class="mt-1 text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tabular-nums truncate">{{ t.value }}</p>
        <p v-if="t.hint" class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ t.hint }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
      <!-- Each subject -->
      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-w-0">
        <h3 class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white">Reading progress by subject</h3>
        <ul class="divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="s in subjects" :key="s.name" class="px-4 py-3">
            <div class="flex items-center gap-2 min-w-0">
              <p class="flex-1 min-w-0 text-sm font-semibold text-gray-900 dark:text-white truncate">{{ s.name }}</p>
              <span class="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold" :class="VERDICT[s.verdict].chip">
                <AppIcon :name="VERDICT[s.verdict].icon" class="w-3 h-3" />{{ VERDICT[s.verdict].label }}
              </span>
            </div>
            <div class="mt-1.5 flex items-center gap-2">
              <span class="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full" :class="VERDICT[s.verdict].bar" :style="{ width: `${s.percent}%` }"></span></span>
              <span class="w-10 text-right text-xs font-bold tabular-nums text-gray-700 dark:text-gray-200">{{ s.percent }}%</span>
            </div>
            <p class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
              {{ s.done }} of {{ s.total }} {{ plural(s.total) }} finished · {{ duration(s.minutes) }} reading<template v-if="s.lastAt"> · last read {{ ago(s.lastAt) }}</template>
            </p>
          </li>
        </ul>
      </div>

      <div class="space-y-4 min-w-0">
        <!-- What needs reading next -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white">Needs your attention</h3>
          <p v-if="!attention.length" class="px-4 py-6 text-sm text-center text-gray-500 dark:text-gray-400">Nothing is falling behind. Well done.</p>
          <ul v-else class="divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="a in attention" :key="a.item.id" class="px-4 py-2.5 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full flex-shrink-0" :class="a.urgent ? 'bg-rose-500' : 'bg-amber-500'"></span>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ a.item.title }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ a.item.subject }} · {{ a.reason }}</p>
              </div>
              <button type="button" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700" @click="$emit('open', a.item)">{{ a.item.state === 'new' ? 'Start' : 'Continue' }}</button>
            </li>
          </ul>
        </div>

        <!-- Where to improve -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white">Where to improve</h3>
          <ul class="px-4 py-3 space-y-2">
            <li v-for="(tip, i) in tips" :key="i" class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
              <AppIcon name="sparkles" class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" />
              <span><b v-if="tip.subject" class="font-semibold text-gray-900 dark:text-white">{{ tip.subject }}: </b>{{ tip.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Every topic: how far, how long, when -->
    <div>
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Your {{ plural(2) }}</h3>
      <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        <li v-for="item in sortedItems" :key="item.id" class="p-3 sm:p-4 flex items-center gap-3">
          <span class="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center" :class="item.state === 'done' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : item.state === 'reading' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'">
            <AppIcon :name="item.state === 'done' ? 'check-circle' : 'book'" class="w-5 h-5" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ item.title }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
              {{ item.subject }}<template v-if="item.detail"> · {{ item.detail }}</template> ·
              <template v-if="item.state === 'new'">not opened yet<template v-if="item.sharedAt">, shared {{ ago(item.sharedAt) }}</template></template>
              <template v-else>{{ duration(item.minutes) }} reading<template v-if="item.firstAt"> over {{ span(item.firstAt, item.lastAt) }}</template><template v-if="item.lastAt"> · last read {{ ago(item.lastAt) }}</template></template>
            </p>
            <div v-if="item.state !== 'new'" class="mt-1 flex items-center gap-2 max-w-sm">
              <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full" :class="item.state === 'done' ? 'bg-emerald-500' : 'bg-indigo-500'" :style="{ width: `${item.percent ?? 0}%` }"></span></span>
              <span class="text-[11px] tabular-nums text-gray-500 dark:text-gray-400">{{ item.state === 'done' ? 'Finished' : item.percent === null ? 'Opened' : `${item.percent}%` }}</span>
            </div>
          </div>
          <button type="button" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold" :class="item.state === 'reading' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'" @click="$emit('open', item)">
            {{ item.state === 'reading' ? 'Continue' : item.state === 'done' ? 'Read again' : 'Start' }}
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'

export interface ReadingItem {
  id: number
  title: string
  subject: string
  // pages, author...
  detail?: string
  // how far, 0-100; null when it was opened but how far isn't known
  percent: number | null
  state: 'done' | 'reading' | 'new'
  minutes: number
  firstAt?: string | null
  lastAt?: string | null
  sharedAt?: string | null
}

const props = defineProps<{ items: ReadingItem[]; noun: 'topic' | 'book' }>()
defineEmits<{ open: [item: ReadingItem] }>()

type Verdict = 'well' | 'track' | 'behind' | 'none'
const VERDICT: Record<Verdict, { label: string; icon: string; chip: string; bar: string }> = {
  well: { label: 'Doing well', icon: 'check-circle', chip: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200', bar: 'bg-emerald-500' },
  track: { label: 'On track', icon: 'clock', chip: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200', bar: 'bg-sky-500' },
  behind: { label: 'Behind', icon: 'warning', chip: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200', bar: 'bg-amber-500' },
  none: { label: 'Not started', icon: 'warning', chip: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200', bar: 'bg-rose-500' }
}

const plural = (n: number) => (n === 1 ? props.noun : `${props.noun}s`)
const DAY = 86400000
const at = (v?: string | null) => (v ? new Date(v.replace(' ', 'T')).getTime() : NaN)
const daysSince = (v?: string | null) => { const t = at(v); return isNaN(t) ? Infinity : Math.floor((Date.now() - t) / DAY) }
const ago = (v?: string | null) => {
  const d = daysSince(v)
  if (d === Infinity) return ''
  if (d <= 0) return 'today'
  if (d === 1) return 'yesterday'
  if (d < 14) return `${d} days ago`
  if (d < 60) return `${Math.round(d / 7)} weeks ago`
  return `${Math.round(d / 30)} months ago`
}
// "3 days" between the first and the last time it was opened
const span = (from?: string | null, to?: string | null) => {
  const d = Math.max(0, Math.round(((at(to) || Date.now()) - at(from)) / DAY))
  return isNaN(d) || d < 1 ? '1 day' : `${d + 1} days`
}
const duration = (min: number) => {
  if (!min) return 'no time'
  if (min < 1) return 'under a minute'
  const m = Math.round(min)
  return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ''}`
}
const pct = (i: ReadingItem) => (i.state === 'done' ? 100 : i.percent ?? (i.state === 'reading' ? 10 : 0))

const read = computed(() => props.items.filter(i => i.state !== 'new'))
const totals = computed(() => {
  const minutes = props.items.reduce((n, i) => n + i.minutes, 0)
  const firsts = read.value.map(i => at(i.firstAt || i.lastAt)).filter(t => !isNaN(t))
  const lasts = read.value.map(i => at(i.lastAt)).filter(t => !isNaN(t))
  const first = firsts.length ? new Date(Math.min(...firsts)) : null
  const last = lasts.length ? new Date(Math.max(...lasts)).toISOString() : null
  const done = props.items.filter(i => i.state === 'done').length
  const avg = props.items.length ? Math.round(props.items.reduce((n, i) => n + pct(i), 0) / props.items.length) : 0
  return [
    { label: 'Time spent reading', value: duration(minutes), hint: first ? `since ${first.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}, over ${span(first.toISOString(), last)}` : 'nothing read yet' },
    { label: 'Overall progress', value: `${avg}%`, hint: `of all ${props.items.length} ${plural(props.items.length)}` },
    { label: 'Finished', value: `${done} / ${props.items.length}`, hint: `${read.value.length - done} in progress, ${props.items.length - read.value.length} not started` },
    { label: 'Last read', value: last ? ago(last) : 'never', hint: last ? new Date(last).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }) : 'open one to begin' }
  ]
})

const subjects = computed(() => {
  const map = new Map<string, ReadingItem[]>()
  props.items.forEach(i => map.set(i.subject, [...(map.get(i.subject) || []), i]))
  const rank: Record<Verdict, number> = { none: 0, behind: 1, track: 2, well: 3 }
  return [...map.entries()].map(([name, list]) => {
    const percent = Math.round(list.reduce((n, i) => n + pct(i), 0) / list.length)
    const opened = list.filter(i => i.state !== 'new')
    const lastAt = opened.map(i => i.lastAt).filter(Boolean).sort().pop() || null
    const idle = daysSince(lastAt)
    const done = list.filter(i => i.state === 'done').length
    const verdict: Verdict = !opened.length ? 'none'
      : percent >= 75 ? 'well'
      : percent >= 40 && idle <= 7 ? 'track'
      : 'behind'
    return { name, list, percent, done, total: list.length, minutes: list.reduce((n, i) => n + i.minutes, 0), lastAt, idle, verdict }
  }).sort((a, b) => rank[a.verdict] - rank[b.verdict] || a.percent - b.percent)
})

// Started and left for a week, or shared a week ago and never opened; the longest-waiting first
const attention = computed(() => props.items
  .filter(i => i.state !== 'done')
  .map(i => {
    if (i.state === 'reading') {
      const idle = daysSince(i.lastAt)
      if (idle >= 7) return { item: i, wait: idle, urgent: idle >= 14, reason: `stopped at ${i.percent ?? 0}%, last read ${ago(i.lastAt)}` }
      if ((i.percent ?? 0) < 50) return { item: i, wait: idle / 2, urgent: false, reason: `only ${i.percent ?? 0}% read so far` }
      return null
    }
    const waiting = daysSince(i.sharedAt)
    return waiting >= 3 ? { item: i, wait: waiting, urgent: waiting >= 14, reason: `not opened, shared ${ago(i.sharedAt)}` } : null
  })
  .filter((a): a is NonNullable<typeof a> => !!a)
  .sort((a, b) => b.wait - a.wait)
  .slice(0, 5))

const tips = computed(() => {
  const out: { subject?: string; text: string }[] = []
  const weak = subjects.value.filter(s => s.verdict === 'none' || s.verdict === 'behind')
  for (const s of weak.slice(0, 3)) {
    const fresh = s.list.filter(i => i.state === 'new')
    const stuck = s.list.filter(i => i.state === 'reading').sort((a, b) => (b.percent ?? 0) - (a.percent ?? 0))[0]
    if (s.verdict === 'none') out.push({ subject: s.name, text: `you haven't opened any of its ${s.total} ${plural(s.total)}. Start with "${s.list[0].title}".` })
    else if (s.idle > 7 && stuck) out.push({ subject: s.name, text: `no reading for ${s.idle} days. Pick up "${stuck.title}" where you stopped (${stuck.percent ?? 0}%).` })
    else if (fresh.length) out.push({ subject: s.name, text: `${fresh.length} of ${s.total} ${plural(s.total)} not started yet. Read "${fresh[0].title}" next.` })
    else if (stuck) out.push({ subject: s.name, text: `finish "${stuck.title}": you're ${stuck.percent ?? 0}% through.` })
  }
  // The subject with the least time against the rest
  const timed = subjects.value.filter(s => s.verdict !== 'none')
  if (timed.length > 1) {
    const least = [...timed].sort((a, b) => a.minutes - b.minutes)[0]
    const most = [...timed].sort((a, b) => b.minutes - a.minutes)[0]
    if (most.minutes > 0 && least.minutes < most.minutes / 3 && !weak.some(w => w.name === least.name)) {
      out.push({ subject: least.name, text: `only ${duration(least.minutes)} of reading, far less than ${most.name} (${duration(most.minutes)}). Give it a little time each day.` })
    }
  }
  if (!out.length) out.push({ text: read.value.length ? 'You are keeping up with your reading. Keep a little reading each day to stay ahead.' : `Open your first ${props.noun} to see how your reading is going.` })
  return out
})

// Being read first, then not started, then finished; most recent first within each
const sortedItems = computed(() => {
  const rank = { reading: 0, new: 1, done: 2 }
  return [...props.items].sort((a, b) => rank[a.state] - rank[b.state] || (at(b.lastAt) || 0) - (at(a.lastAt) || 0))
})
</script>
