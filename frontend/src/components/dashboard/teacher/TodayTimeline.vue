<template>
  <!-- Today on a line: live classes and deadlines placed at their time, with a marker for now.
       Phones get the same items as a short list. With nothing today, what comes up next. -->
  <div>
    <div class="flex items-center justify-between mb-2">
      <p class="text-xs font-bold text-gray-700 dark:text-gray-200">{{ todays.length ? 'Today' : 'Coming up' }}</p>
      <p class="text-[11px] text-gray-400 dark:text-gray-500">Now {{ nowLabel }}</p>
    </div>

    <p v-if="!todays.length && !upcoming.length" class="text-xs text-gray-500 dark:text-gray-400 py-1">
      Nothing scheduled for the next seven days.
      <RouterLink to="/teacher/live-classes" class="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Schedule a class</RouterLink>
    </p>

    <!-- Nothing today: the next few, as a list -->
    <ul v-else-if="!todays.length" class="space-y-1.5">
      <li v-for="it in upcoming" :key="it.kind + it.id">
        <RouterLink :to="link(it)" class="flex items-center gap-3 group">
          <span class="w-24 flex-shrink-0 text-[11px] font-bold text-gray-500 dark:text-gray-400 truncate">{{ dayLabel(it.at) }}</span>
          <span class="flex-1 min-w-0 rounded-lg border px-2.5 py-1.5 text-xs truncate group-hover:brightness-95" :class="tone(it).chip">
            <b :class="tone(it).strong">{{ clock(it.at) }} · {{ it.kind === 'live' ? 'Live' : 'Due' }}<template v-if="it.class_name"> · {{ it.class_name }}</template></b>
            {{ ' ' + niceName(it.title) }}
          </span>
        </RouterLink>
      </li>
    </ul>

    <template v-else>
      <!-- Phone: a list -->
      <ul class="sm:hidden space-y-1.5">
        <li v-for="it in todays" :key="it.kind + it.id">
          <RouterLink :to="link(it)" class="flex items-center gap-3">
            <span class="w-[4.5rem] flex-shrink-0 whitespace-nowrap text-[11px] font-bold text-gray-500 dark:text-gray-400">{{ clock(it.at) }}</span>
            <span class="flex-1 min-w-0 rounded-lg border px-2.5 py-1.5 text-xs truncate" :class="tone(it).chip">
              <b :class="tone(it).strong">{{ it.kind === 'live' ? (it.status === 'started' ? 'Live now' : 'Live') : 'Due' }}<template v-if="it.class_name"> · {{ it.class_name }}</template></b>
              {{ ' ' + niceName(it.title) }}
            </span>
          </RouterLink>
        </li>
      </ul>

      <!-- Wider: a timeline -->
      <div class="hidden sm:block relative" :style="{ height: `${28 + lanes * 42}px` }">
        <div class="absolute inset-x-0 top-0 flex justify-between pointer-events-none">
          <span v-for="h in hourMarks" :key="h" class="text-[10px] text-gray-400 dark:text-gray-500 tabular-nums">{{ h }}:00</span>
        </div>
        <div class="absolute inset-x-0 top-[22px] h-px bg-gray-200 dark:bg-gray-700"></div>
        <div v-if="nowPos !== null" class="absolute top-4 bottom-0 w-0.5 bg-rose-500 z-10 pointer-events-none" :style="{ left: `${nowPos}%` }">
          <span class="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-rose-500"></span>
        </div>
        <RouterLink
          v-for="p in placed"
          :key="p.item.kind + p.item.id"
          :to="link(p.item)"
          class="absolute h-9 rounded-lg border px-2 py-1 overflow-hidden hover:shadow-md transition-shadow"
          :class="tone(p.item).chip"
          :style="{ left: `${p.left}%`, width: `${WIDTH}%`, top: `${26 + p.lane * 42}px` }"
          :title="`${clock(p.item.at)} ${niceName(p.item.title)}`"
        >
          <p class="text-[10px] font-bold leading-tight truncate" :class="tone(p.item).strong">
            {{ clock(p.item.at) }} {{ p.item.kind === 'live' ? (p.item.status === 'started' ? 'Live now' : 'Live') : 'Due' }}<template v-if="p.item.class_name"> · {{ p.item.class_name }}</template>
          </p>
          <p class="text-[10px] truncate opacity-80">{{ niceName(p.item.title) }}</p>
        </RouterLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { clock, dayLabel, niceName } from './time'

export interface AgendaItem { kind: 'live' | 'due'; id: number; title: string; at: string; class_name: string | null; status?: string; category?: string | null; submitted?: number }
const props = defineProps<{ items: AgendaItem[] }>()

const WIDTH = 15 // each block, as a share of the line
const toDate = (s: string) => new Date(s.replace(' ', 'T'))

const now = ref(new Date())
const timer = window.setInterval(() => { now.value = new Date() }, 60000)
onBeforeUnmount(() => window.clearInterval(timer))
const nowLabel = computed(() => now.value.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }))

const todays = computed(() => props.items.filter(i => toDate(i.at).toDateString() === now.value.toDateString() || i.status === 'started'))
const upcoming = computed(() => props.items.filter(i => toDate(i.at) > now.value).slice(0, 3))

// The day runs 8:00 to 18:00, stretched to take in anything earlier or later
const range = computed(() => {
  let start = 8
  let end = 18
  for (const i of todays.value) {
    const h = toDate(i.at).getHours()
    start = Math.min(start, h)
    end = Math.max(end, h + 2)
  }
  start -= start % 2
  end += end % 2
  return { start, end: Math.min(24, end) }
})
const hourMarks = computed(() => {
  const out: number[] = []
  for (let h = range.value.start; h <= range.value.end; h += 2) out.push(h)
  return out
})
const pos = (d: Date) => {
  const { start, end } = range.value
  const hours = d.getHours() + d.getMinutes() / 60
  return ((hours - start) / (end - start)) * 100
}
const nowPos = computed(() => {
  const p = pos(now.value)
  return p >= 0 && p <= 100 ? p : null
})

// Blocks that would overlap go on a lower row
const placed = computed(() => {
  const laneEnds: number[] = []
  return [...todays.value]
    .sort((a, b) => a.at.localeCompare(b.at))
    .map(item => {
      const left = Math.min(100 - WIDTH, Math.max(0, pos(toDate(item.at))))
      let lane = laneEnds.findIndex(e => e <= left)
      if (lane < 0) { lane = laneEnds.length; laneEnds.push(0) }
      laneEnds[lane] = left + WIDTH + 0.5
      return { item, left, lane }
    })
})
const lanes = computed(() => Math.max(1, ...placed.value.map(p => p.lane + 1)))

const tone = (i: AgendaItem) => i.kind === 'due'
  ? { chip: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/25 dark:border-amber-800/60 dark:text-amber-200', strong: 'text-amber-800 dark:text-amber-100' }
  : i.status === 'started'
    ? { chip: 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/25 dark:border-rose-800/60 dark:text-rose-200', strong: 'text-rose-800 dark:text-rose-100' }
    : { chip: 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800/60 dark:text-indigo-200', strong: 'text-indigo-800 dark:text-indigo-100' }
const link = (i: AgendaItem) => i.kind === 'live' ? '/teacher/live-classes' : `/teacher/assignments/${i.id}/submissions`
</script>
