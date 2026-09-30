<template>
  <!-- "What should I do next?" - the student's most useful next steps, in order: finish what's
       started, what's due soon, revision their teacher sent them, notes to read before an
       assessment, where they stopped reading, and outcomes to strengthen
       (see Student\NextStepsController) -->
  <div v-if="loaded" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 mb-6">
    <div class="flex items-center gap-2 mb-3">
      <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="text-sm font-bold text-gray-900 dark:text-white">What to do next</h3>
        <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ steps.length ? 'Picked for you from your assessments, notes and Learning Map' : 'You\'re all caught up' }}</p>
      </div>
      <!-- Learning streak: consecutive days of reading or answering -->
      <div
        v-if="streak"
        class="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold"
        :class="streak.days > 0 ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'"
        :title="streakHint"
      >
        <AppIcon name="flame" class="w-4 h-4" />
        <span v-if="streak.days > 0">{{ streak.days }}-day streak<span v-if="!streak.today" class="font-medium"> · keep it today</span></span>
        <span v-else>Start a streak today</span>
      </div>
    </div>

    <p v-if="!steps.length" class="text-sm text-gray-600 dark:text-gray-300 py-2">
      Nothing waiting right now. <RouterLink to="/student/learning-map" class="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Look at your Learning Map</RouterLink> to see how you're doing.
    </p>

    <ol v-else class="space-y-2">
      <li v-for="(step, i) in steps" :key="step.action.to + i">
        <RouterLink
          :to="step.action.to"
          class="group flex items-center gap-3 rounded-lg p-2.5 -mx-1 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
          :class="{ 'ring-1 ring-rose-200 bg-rose-50/40 dark:ring-rose-900/60 dark:bg-rose-900/10': step.kind === 'support' }"
          @click="markOpened(step)"
        >
          <span class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" :class="KIND[step.kind].badge">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="KIND[step.kind].icon"></path></svg>
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-sm font-semibold text-gray-900 dark:text-white leading-snug">{{ step.title }}</span>
            <span class="block text-[11px] leading-snug" :class="step.overdue ? 'text-rose-600 dark:text-rose-300 font-semibold' : 'text-gray-500 dark:text-gray-400'">{{ step.detail }}</span>
            <span v-if="step.note" class="block text-[11px] leading-snug italic text-gray-600 dark:text-gray-300 mt-0.5">"{{ step.note }}"</span>
          </span>
          <span class="flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors" :class="i === 0 ? 'bg-indigo-600 text-white group-hover:bg-indigo-700' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 group-hover:bg-gray-200'">
            {{ step.action.label }}
          </span>
        </RouterLink>
      </li>
    </ol>
    <p v-if="total > steps.length" class="text-[11px] text-gray-500 dark:text-gray-400 mt-2">
      +{{ total - steps.length }} more · <RouterLink to="/student/assignments" class="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">All assessments</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { useLiveRefresh } from '@/composables/useLiveRefresh'

type Kind = 'finish' | 'assessment' | 'read_first' | 'continue_reading' | 'strengthen' | 'support'
// support: revision the teacher sent (a support group); opening it counts as revising (action.mark)
interface Step { kind: Kind; title: string; detail: string; note?: string | null; overdue: boolean; action: { label: string; to: string; mark?: string } }

const KIND: Record<Kind, { badge: string; icon: string }> = {
  finish: { badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  assessment: { badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  read_first: { badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  continue_reading: { badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  strengthen: { badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  support: { badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' }
}

// Tells the server the student opened the revision their teacher sent (fire and forget - the
// page opens either way)
const markOpened = (step: Step) => {
  if (step.action.mark) axios.post(step.action.mark).catch(() => {})
}

const steps = ref<Step[]>([])
const total = ref(0)
const streak = ref<{ days: number; today: boolean } | null>(null)
const streakHint = computed(() => !streak.value || streak.value.days === 0
  ? 'Read notes or answer an assessment to start a streak'
  : streak.value.today ? 'You learned something today - keep it going tomorrow' : 'Learn something today to keep your streak')
const loaded = ref(false)

const load = async () => {
  try {
    const response = await axios.get('/api/student/next-steps')
    if (response.data.success) {
      steps.value = response.data.data.steps
      total.value = response.data.data.total
      streak.value = response.data.data.streak ?? null
      loaded.value = true
    }
  } catch {
    // the card simply doesn't show
  }
}
onMounted(load)
useLiveRefresh(load)
</script>
