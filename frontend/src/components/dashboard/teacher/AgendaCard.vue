<template>
  <!-- The next seven days: live classes and assessment deadlines, day by day -->
  <section class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
    <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-3">Coming up <span class="font-medium text-gray-400">· next 7 days</span></h2>
    <EmptyState v-if="!items.length" :card="false" compact icon="clock" tone="sky" title="A quiet week" message="No live classes or deadlines in the next seven days.">
      <RouterLink to="/teacher/live-classes" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700">Schedule a class</RouterLink>
    </EmptyState>
    <div v-else class="space-y-3">
      <div v-for="day in days" :key="day.label">
        <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">{{ day.label }}</p>
        <ul class="space-y-1">
          <li v-for="item in day.items" :key="item.kind + item.id">
            <RouterLink :to="item.kind === 'live' ? '/teacher/live-classes' : `/teacher/assignments/${item.id}/submissions`" class="flex items-center gap-3 rounded-lg px-2 py-1.5 -mx-2 hover:bg-gray-50 dark:hover:bg-gray-700/40">
              <span class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="item.kind === 'live' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300'">
                <AppIcon :name="item.kind === 'live' ? 'video' : 'clipboard'" class="w-4 h-4" />
              </span>
              <span class="flex-1 min-w-0">
                <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(item.title) }}</span>
                <span class="block text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {{ item.kind === 'live' ? 'Live class' : `${item.category || 'Assessment'} closes` }} · {{ clock(item.at) }}<template v-if="item.class_name"> · {{ item.class_name }}</template><template v-if="item.kind === 'due'"> · {{ item.submitted }} submitted</template>
                </span>
              </span>
              <span v-if="item.status === 'started'" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse">LIVE</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { clock, dayLabel, niceName } from './time'

interface AgendaItem { kind: 'live' | 'due'; id: number; title: string; at: string; class_name: string | null; status?: string; category?: string | null; submitted?: number }
const props = defineProps<{ items: AgendaItem[] }>()

const days = computed(() => {
  const out: { label: string; items: AgendaItem[] }[] = []
  for (const item of props.items) {
    const label = dayLabel(item.at)
    const day = out.find(d => d.label === label)
    if (day) day.items.push(item)
    else out.push({ label, items: [item] })
  }
  return out
})
</script>
