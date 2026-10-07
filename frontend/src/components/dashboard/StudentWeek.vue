<template>
  <!-- The student's week, Monday to Sunday: work due and live classes on their day, overdue work
       first in its own column. Phones get the days with something on as a short list. -->
  <div>
    <div class="flex items-center justify-between mb-2">
      <p class="text-xs font-bold text-gray-700 dark:text-gray-200">This week</p>
      <RouterLink to="/student/assignments" class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">All work →</RouterLink>
    </div>

    <!-- Phone: a list -->
    <ul class="sm:hidden space-y-1.5">
      <li v-if="!listDays.length" class="text-xs text-gray-500 dark:text-gray-400">Nothing due and no live classes this week - a good time to read ahead.</li>
      <li v-for="d in listDays" :key="d.key" class="flex items-start gap-3">
        <span class="w-16 flex-shrink-0 pt-1.5 text-[11px] font-bold" :class="d.overdue ? 'text-rose-600 dark:text-rose-300' : d.today ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'">{{ d.label }}</span>
        <span class="flex-1 min-w-0 space-y-1">
          <RouterLink v-for="it in d.items" :key="it.key" :to="it.to" class="block rounded-lg border px-2.5 py-1.5 text-xs truncate" :class="tone(it).chip">
            <b :class="tone(it).strong">{{ it.kind === 'live' ? `Live ${it.time}` : it.overdue ? it.subject : `Due ${it.time}` }}</b>{{ ' ' + it.title }}
          </RouterLink>
        </span>
      </li>
    </ul>

    <!-- Wider: the week as columns -->
    <div class="hidden sm:grid gap-1.5" :style="{ gridTemplateColumns: overdue.length ? '1.25fr repeat(7, minmax(0, 1fr))' : 'repeat(7, minmax(0, 1fr))' }">
      <div v-if="overdue.length" class="rounded-xl bg-rose-50/70 dark:bg-rose-900/15 border border-rose-100 dark:border-rose-900/40 p-1.5 min-w-0">
        <p class="text-center text-[10px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-300 mb-1">Overdue</p>
        <RouterLink v-for="it in overdue" :key="it.key" :to="it.to" class="block mb-1 rounded-md border px-1.5 py-1 text-[10px] leading-tight" :class="tone(it).chip" :title="it.title">
          <span class="block truncate font-semibold">{{ it.title }}</span>
          <span class="block truncate opacity-75">{{ it.subject }}</span>
        </RouterLink>
      </div>
      <div
        v-for="d in days"
        :key="d.key"
        class="rounded-xl p-1.5 min-w-0 min-h-[5.5rem] border"
        :class="d.today ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/25 dark:border-indigo-800' : d.past ? 'border-transparent opacity-60' : 'border-dashed border-gray-200 dark:border-gray-700'"
      >
        <p class="text-center leading-tight mb-1">
          <span class="text-[10px] font-semibold uppercase" :class="d.today ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-400'">{{ d.name }}</span>
          <span class="ml-1 text-sm font-bold" :class="d.today ? 'text-indigo-700 dark:text-indigo-200' : 'text-gray-700 dark:text-gray-200'">{{ d.date }}</span>
        </p>
        <RouterLink v-for="it in d.items.slice(0, 3)" :key="it.key" :to="it.to" class="block mb-1 rounded-md border px-1.5 py-1 text-[10px] leading-tight hover:shadow-sm" :class="tone(it).chip" :title="`${it.title} · ${it.subject}`">
          <span class="block truncate font-semibold">{{ it.kind === 'live' ? 'Live' : 'Due' }} {{ it.time }}</span>
          <span class="block truncate opacity-80">{{ it.title }}</span>
        </RouterLink>
        <p v-if="d.items.length > 3" class="text-center text-[10px] font-semibold text-gray-400">+{{ d.items.length - 3 }} more</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Work { id: number; title: string; subject_name: string; due_date: string }
interface Live { id: number; title: string; subject_name: string; scheduled_start: string }
const props = defineProps<{ work: Work[]; live: Live[] }>()

interface Item { key: string; kind: 'work' | 'live'; t: Date; title: string; subject: string; time: string; to: string; overdue: boolean }
const toDate = (s: string) => new Date(s.replace(' ', 'T'))
const timeOf = (d: Date) => d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

const items = computed<Item[]>(() => {
  const now = new Date()
  return [
    ...props.work.map(a => {
      const t = toDate(a.due_date)
      return { key: `a${a.id}`, kind: 'work' as const, t, title: a.title, subject: a.subject_name, time: timeOf(t), to: `/student/assignments/${a.id}/answer`, overdue: t < now }
    }),
    ...props.live.map(l => {
      const t = toDate(l.scheduled_start)
      return { key: `l${l.id}`, kind: 'live' as const, t, title: l.title, subject: l.subject_name, time: timeOf(t), to: '/student/live-classes', overdue: false }
    })
  ].sort((p, q) => p.t.getTime() - q.t.getTime())
})

const overdue = computed(() => items.value.filter(i => i.overdue))

const days = computed(() => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  const todayKey = new Date().toDateString()
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = d.toDateString()
    return {
      key,
      name: d.toLocaleDateString(undefined, { weekday: 'short' }),
      date: d.getDate(),
      today: key === todayKey,
      past: d < todayStart,
      items: items.value.filter(it => !it.overdue && it.t.toDateString() === key)
    }
  })
})

// The phone list: overdue first, then the days from today on that have something
const listDays = computed(() => {
  const out: { key: string; label: string; today: boolean; overdue: boolean; items: Item[] }[] = []
  if (overdue.value.length) out.push({ key: 'overdue', label: 'Overdue', today: false, overdue: true, items: overdue.value })
  for (const d of days.value) {
    if (d.past || !d.items.length) continue
    out.push({ key: d.key, label: d.today ? 'Today' : `${d.name} ${d.date}`, today: d.today, overdue: false, items: d.items })
  }
  return out
})

const tone = (i: Item) => i.overdue
  ? { chip: 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/25 dark:border-rose-800/60 dark:text-rose-200', strong: 'text-rose-800 dark:text-rose-100' }
  : i.kind === 'live'
    ? { chip: 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800/60 dark:text-indigo-200', strong: 'text-indigo-800 dark:text-indigo-100' }
    : { chip: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/25 dark:border-amber-800/60 dark:text-amber-200', strong: 'text-amber-800 dark:text-amber-100' }
</script>
