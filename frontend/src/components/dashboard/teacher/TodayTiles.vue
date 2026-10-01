<template>
  <!-- Today: what needs the teacher now - work to mark, live classes today, assessments closing
       this week, support groups - each a tap into the place to act on it -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <RouterLink
      v-for="t in tiles"
      :key="t.key"
      :to="t.to"
      class="group relative overflow-hidden rounded-2xl border p-3.5 sm:p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
      :class="t.value ? t.tone.active : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'"
    >
      <div class="flex items-start justify-between gap-2">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="t.value ? t.tone.icon : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400'">
          <AppIcon :name="t.icon" class="w-5 h-5" />
        </div>
        <svg class="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" :class="t.value ? t.tone.text : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </div>
      <p class="mt-3 text-2xl sm:text-3xl font-extrabold leading-none" :class="t.value ? t.tone.text : 'text-gray-300 dark:text-gray-600'"><CountUp :value="t.value" /></p>
      <p class="mt-1 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100">{{ t.label }}</p>
      <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ t.hint }}</p>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import CountUp from '@/components/common/CountUp.vue'
import { clock, timeAgo } from './time'

const props = defineProps<{
  today: { to_mark: number; live_today: number; due_week: number; support: { groups: number; members: number; revised: number } }
  liveToday: { id: number; title: string; at: string; status: string }[]
  markNext: { submission_id: number; assignment_id: number; submitted_at: string | null }[]
  agenda: { kind: 'live' | 'due'; at: string }[]
}>()

const TONES = {
  rose: { active: 'bg-rose-50/80 border-rose-200 dark:bg-rose-900/15 dark:border-rose-800', icon: 'bg-rose-600 text-white', text: 'text-rose-700 dark:text-rose-300' },
  red: { active: 'bg-red-50/80 border-red-200 dark:bg-red-900/15 dark:border-red-800', icon: 'bg-red-600 text-white', text: 'text-red-700 dark:text-red-300' },
  amber: { active: 'bg-amber-50/80 border-amber-200 dark:bg-amber-900/15 dark:border-amber-800', icon: 'bg-amber-500 text-white', text: 'text-amber-700 dark:text-amber-300' },
  violet: { active: 'bg-violet-50/80 border-violet-200 dark:bg-violet-900/15 dark:border-violet-800', icon: 'bg-violet-600 text-white', text: 'text-violet-700 dark:text-violet-300' }
}

const tiles = computed(() => {
  const t = props.today
  const oldest = props.markNext[0]
  const nextLive = props.liveToday.find(l => l.status === 'started') ?? props.liveToday[0]
  const nextDue = props.agenda.find(a => a.kind === 'due')
  return [
    {
      key: 'mark', label: 'To mark', icon: 'pencil', tone: TONES.rose, value: t.to_mark,
      hint: t.to_mark ? `Oldest waiting since ${timeAgo(oldest?.submitted_at)}` : 'All caught up',
      to: oldest ? `/teacher/assignments/${oldest.assignment_id}/submissions?submission=${oldest.submission_id}` : '/teacher/assignments'
    },
    {
      key: 'live', label: 'Live today', icon: 'video', tone: TONES.red, value: t.live_today,
      hint: nextLive ? (nextLive.status === 'started' ? 'Live now - tap to join' : `Next at ${clock(nextLive.at)}`) : 'No classes today',
      to: '/teacher/live-classes'
    },
    {
      key: 'due', label: 'Due this week', icon: 'clock', tone: TONES.amber, value: t.due_week,
      hint: nextDue ? `Next closes ${new Date(nextDue.at.replace(' ', 'T')).toLocaleDateString(undefined, { weekday: 'short' })}` : 'Nothing closing this week',
      to: '/teacher/assignments'
    },
    {
      key: 'support', label: 'Support groups', icon: 'users', tone: TONES.violet, value: t.support.groups,
      hint: t.support.groups ? `${t.support.revised} of ${t.support.members} students revised` : 'None open',
      to: '/teacher/class-map'
    }
  ]
})
</script>
