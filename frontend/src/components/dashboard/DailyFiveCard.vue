<template>
  <!-- Student dashboard: today's Daily Revision (with the streak) and a way into a Live Quiz -->
  <section class="mb-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
    <div class="flex items-center gap-3">
      <span class="w-10 h-10 flex-shrink-0 rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-900/30 flex items-center justify-center"><AppIcon name="flame" class="w-5 h-5" /></span>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-bold text-gray-900 dark:text-white">Daily Revision</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ line }}</p>
      </div>
      <span v-if="data && data.streak" class="px-2 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 tabular-nums" :title="`${data.streak}-day streak`">{{ data.streak }} day{{ data.streak === 1 ? '' : 's' }}</span>
    </div>
    <div class="mt-3 grid grid-cols-2 gap-2">
      <RouterLink to="/student/revision" class="text-center px-3 py-2 rounded-xl text-sm font-semibold" :class="data && !data.done_today && data.cards.length ? 'text-white bg-indigo-600 hover:bg-indigo-700' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'">
        {{ data && data.done_today ? 'Practise more' : 'Start today\'s 5' }}
      </RouterLink>
      <RouterLink to="/student/live-quiz" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
        <AppIcon name="bolt" class="w-4 h-4 text-indigo-500" />Live Quiz
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'

const data = ref<{ cards: unknown[]; streak: number; done_today: boolean; pool: number } | null>(null)

const line = computed(() => {
  const d = data.value
  if (!d) return 'Five quick questions a day'
  if (!d.pool) return 'Starts once your choice assessments are marked'
  if (d.done_today) return 'Done for today - see you tomorrow'
  return `${d.cards.length} ${d.cards.length === 1 ? 'question' : 'questions'} ready for today`
})

onMounted(async () => {
  try {
    const res = await axios.get('/api/student/revision')
    data.value = res.data.data
  } catch { /* the card still links to both */ }
})
</script>
