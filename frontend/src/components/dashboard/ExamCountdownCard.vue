<template>
  <!-- Student dashboard: days to the next exam, linking to the revision plan. Hidden with no exam. -->
  <RouterLink v-if="exam" to="/student/exam-plan" class="mb-6 flex items-center gap-3 rounded-2xl bg-slate-900 text-white p-4 hover:bg-slate-800 transition">
    <span class="w-14 flex-shrink-0 text-center">
      <span class="block text-3xl font-extrabold tabular-nums leading-none">{{ exam.days_left }}</span>
      <span class="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">{{ exam.days_left === 1 ? 'day' : 'days' }}</span>
    </span>
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-bold truncate">{{ exam.title }}</span>
      <span class="block text-xs text-slate-300">{{ planned ? `Revision plan: ${planned} topics, weakest first` : 'See your revision plan' }}</span>
    </span>
    <svg class="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
  </RouterLink>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

const exam = ref<{ title: string; days_left: number } | null>(null)
const planned = ref(0)

onMounted(async () => {
  try {
    const res = await axios.get('/api/student/exam-plan')
    exam.value = res.data.data.exam
    planned.value = res.data.data.planned || 0
  } catch { /* no card */ }
})
</script>
