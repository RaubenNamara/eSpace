<template>
  <!-- The student's Learning Map at a glance: share of learning outcomes achieved this year and
       what's waiting to be done, linking through to the full map -->
  <RouterLink
    v-if="summary && summary.outcomes > 0"
    to="/student/learning-map"
    class="group mb-6 flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
  >
    <div class="relative w-16 h-16 flex-shrink-0">
      <svg class="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="27" fill="none" stroke-width="7" class="stroke-gray-200 dark:stroke-gray-700" />
        <circle cx="32" cy="32" r="27" fill="none" stroke-width="7" stroke-linecap="round" stroke="#059669" :stroke-dasharray="`${ringFill} 170`" style="transition: stroke-dasharray 1.2s ease" />
      </svg>
      <span class="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white"><CountUp :value="`${summary.percent}%`" /></span>
    </div>
    <div class="min-w-0 flex-1">
      <p class="text-sm font-bold text-gray-900 dark:text-white">My Learning Map</p>
      <p class="text-xs text-gray-600 dark:text-gray-300">
        <CountUp :value="summary.achieved" /> of {{ summary.outcomes }} learning outcomes achieved this year
      </p>
      <p v-if="toDo" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 mt-0.5">{{ toDo }} {{ toDo === 1 ? 'outcome needs' : 'outcomes need' }} your attention</p>
      <p v-else-if="summary.awaiting" class="text-xs text-sky-600 dark:text-sky-300 mt-0.5">{{ summary.awaiting }} awaiting marking</p>
    </div>
    <span class="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white group-hover:bg-emerald-700 transition-colors">
      Open map
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import CountUp from '@/components/common/CountUp.vue'

interface Summary { outcomes: number; achieved: number; developing: number; needs_support: number; awaiting: number; available: number; percent: number }

const summary = ref<Summary | null>(null)
const ringFill = computed(() => ((summary.value?.percent ?? 0) / 100) * 2 * Math.PI * 27)
const toDo = computed(() => (summary.value ? summary.value.available + summary.value.developing + summary.value.needs_support : 0))

onMounted(async () => {
  try {
    const response = await axios.get('/api/student/mastery')
    if (response.data.success) summary.value = response.data.data.overall
  } catch {
    // the card simply doesn't show
  }
})
</script>
