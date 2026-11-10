<template>
  <!-- The student's own growth: how much their recent results improved on their earlier ones, the
       learning outcomes they achieved this term, and where that places them in their stream.
       Only their own figures - no classmate is named or shown (Student\GrowthController). -->
  <section v-if="data && data.class_name" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-6">
    <header class="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-gray-100 dark:border-gray-700">
      <span class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
      </span>
      <div class="min-w-0 flex-1">
        <h3 class="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">My growth</h3>
        <p class="text-[11px] sm:text-xs leading-snug text-gray-500 dark:text-gray-400">How much you're improving this term - only you can see this.</p>
      </div>
      <span class="hidden sm:inline-flex flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ data.class_name }}</span>
    </header>

    <div class="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-700">
      <!-- Improvement -->
      <div class="min-w-0 px-3 sm:px-5 py-3.5 sm:py-4">
        <p class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide sm:tracking-wider text-gray-400 dark:text-gray-500 leading-tight">Improvement</p>
        <template v-if="me && me.improvement !== null">
          <p class="mt-1 text-xl sm:text-2xl font-extrabold tabular-nums" :class="me.improvement > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'">
            {{ me.improvement > 0 ? '+' : '' }}{{ me.improvement }}%
          </p>
          <p class="text-[11px] sm:text-xs leading-snug text-gray-500 dark:text-gray-400">{{ me.improvement > 0 ? 'on your earlier results' : 'not up yet - your next assessments can change that' }}</p>
        </template>
        <template v-else>
          <p class="mt-1 text-xl sm:text-2xl font-extrabold text-gray-300 dark:text-gray-600">-</p>
          <p class="text-[11px] sm:text-xs leading-snug text-gray-500 dark:text-gray-400">Shows once two of your assessments are returned</p>
        </template>
      </div>

      <!-- Recent against earlier -->
      <div class="min-w-0 px-3 sm:px-5 py-3.5 sm:py-4">
        <p class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide sm:tracking-wider text-gray-400 dark:text-gray-500 leading-tight">Recent average</p>
        <template v-if="me && me.recent !== null">
          <p class="mt-1 text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tabular-nums">{{ me.recent }}%</p>
          <div v-if="me.before !== null" class="mt-1.5">
            <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
              <span class="absolute inset-y-0 left-0 rounded-full bg-gray-300 dark:bg-gray-500" :style="{ width: `${clamp(me.before)}%` }"></span>
              <span class="absolute inset-y-0 left-0 rounded-full bg-emerald-500/80" :style="{ width: `${clamp(me.recent)}%` }"></span>
            </div>
            <p class="mt-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">earlier {{ me.before }}%</p>
          </div>
        </template>
        <template v-else>
          <p class="mt-1 text-xl sm:text-2xl font-extrabold text-gray-300 dark:text-gray-600">-</p>
          <p class="text-[11px] sm:text-xs leading-snug text-gray-500 dark:text-gray-400">No returned results yet</p>
        </template>
      </div>

      <!-- Outcomes -->
      <div class="min-w-0 px-3 sm:px-5 py-3.5 sm:py-4">
        <p class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide sm:tracking-wider text-gray-400 dark:text-gray-500 leading-tight">Outcomes</p>
        <p class="mt-1 text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tabular-nums">{{ me?.outcomes_term ?? 0 }}</p>
        <p class="text-[11px] sm:text-xs leading-snug text-gray-500 dark:text-gray-400">learning outcome{{ (me?.outcomes_term ?? 0) === 1 ? '' : 's' }} this term</p>
      </div>
    </div>

    <!-- Where that places them, without naming anyone else -->
    <div v-if="me && (me.improved_rank || me.climb_rank)" class="flex flex-wrap gap-2 px-4 sm:px-5 py-3 border-t border-gray-100 dark:border-gray-700 bg-emerald-50/50 dark:bg-emerald-900/10">
      <span v-if="me.improved_rank" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-emerald-800 ring-1 ring-emerald-200 dark:bg-gray-800 dark:text-emerald-300 dark:ring-emerald-800">
        #{{ me.improved_rank }} most improved in {{ data.class_name }}
      </span>
      <span v-if="me.climb_rank" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-emerald-800 ring-1 ring-emerald-200 dark:bg-gray-800 dark:text-emerald-300 dark:ring-emerald-800">
        #{{ me.climb_rank }} for outcomes achieved
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

interface Me { recent: number | null; before: number | null; improvement: number | null; results: number; outcomes_term: number; improved_rank: number | null; climb_rank: number | null }
interface Growth { class_name: string | null; student_count: number; me: Me | null }

const data = ref<Growth | null>(null)
const me = computed(() => data.value?.me ?? null)
const clamp = (n: number) => Math.max(0, Math.min(100, n))

onMounted(async () => {
  try {
    const response = await axios.get('/api/student/growth')
    data.value = response.data.data
  } catch {
    // the card simply doesn't show
  }
})
</script>
