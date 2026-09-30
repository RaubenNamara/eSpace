<template>
  <!-- The class growth board: who in the student's class stream is improving most (recent results
       against earlier ones) and who achieved the most learning outcomes this term - growth, not
       rank, so anyone can be on it (Student\GrowthController) -->
  <div v-if="data && data.class_name" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 mb-6">
    <div class="flex items-center gap-2 mb-1">
      <div class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="text-sm font-bold text-gray-900 dark:text-white">{{ data.class_name }} growth board</h3>
        <p class="text-[11px] text-gray-500 dark:text-gray-400">Who's improving most - not who scores highest. Anyone can be here.</p>
      </div>
    </div>

    <!-- Where the student stands -->
    <div v-if="data.me" class="mt-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-800 p-3 text-sm text-emerald-900 dark:text-emerald-100">
      <template v-if="data.me.improvement !== null">
        <span class="font-semibold">You: {{ data.me.improvement > 0 ? '+' : '' }}{{ data.me.improvement }}%</span>
        <span class="text-xs"> - your recent results average {{ data.me.recent }}%, up from {{ data.me.before }}%<template v-if="data.me.improvement <= 0"> (not up yet - your next assessments can change that)</template>.</span>
        <span v-if="data.me.improved_rank" class="text-xs font-semibold"> #{{ data.me.improved_rank }} most improved.</span>
      </template>
      <span v-else class="text-xs">Once two of your assessments are returned, you'll see how much you're improving here.</span>
      <span v-if="data.me.outcomes_term" class="block text-xs mt-0.5">{{ data.me.outcomes_term }} learning outcome{{ data.me.outcomes_term === 1 ? '' : 's' }} achieved this term.</span>
    </div>

    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="board in boards" :key="board.key">
        <p class="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">{{ board.title }}</p>
        <p v-if="!board.rows.length" class="text-xs text-gray-400 dark:text-gray-500 py-2">{{ board.empty }}</p>
        <ol v-else class="space-y-1">
          <li v-for="(r, i) in board.rows" :key="r.student_id" class="flex items-center gap-2 rounded-lg px-2 py-1.5" :class="r.is_me ? 'bg-indigo-50 dark:bg-indigo-900/25 ring-1 ring-indigo-200 dark:ring-indigo-800' : ''">
            <span class="w-5 text-xs font-bold text-right" :class="i < 3 ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-400'">{{ i + 1 }}</span>
            <span class="flex-1 min-w-0 truncate text-sm text-gray-900 dark:text-white">{{ r.name }}<span v-if="r.is_me" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300"> (you)</span></span>
            <span class="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex-shrink-0">{{ board.value(r) }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

interface Row { student_id: number; name: string; is_me: boolean; recent: number | null; before: number | null; improvement: number | null; results: number; outcomes_term: number }
interface Growth {
  class_name: string | null
  student_count: number
  improved: Row[]
  climbers: Row[]
  me: (Row & { improved_rank: number | null; climb_rank: number | null }) | null
}

const data = ref<Growth | null>(null)

const boards = computed(() => [
  { key: 'improved', title: 'Most improved', rows: data.value?.improved ?? [], empty: 'No one has improved on their earlier results yet.', value: (r: Row) => `+${r.improvement}%` },
  { key: 'climbers', title: 'Outcomes achieved this term', rows: data.value?.climbers ?? [], empty: 'No learning outcomes achieved this term yet.', value: (r: Row) => `${r.outcomes_term}` }
])

onMounted(async () => {
  try {
    const response = await axios.get('/api/student/growth')
    data.value = response.data.data
  } catch {
    // the board simply doesn't show
  }
})
</script>
