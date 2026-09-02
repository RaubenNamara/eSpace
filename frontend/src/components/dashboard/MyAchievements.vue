<template>
  <router-link
    to="/student/achievements"
    class="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all p-6"
  >
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">🏆 My Achievements</h2>
        <p class="text-xs text-gray-400 dark:text-gray-500">Automatically awarded based on your performance</p>
      </div>
      <span class="text-xs font-medium text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
        View All &rarr;
      </span>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <template v-else>
      <!-- Summary strip -->
      <div class="flex flex-wrap gap-2 mb-5">
        <span
          v-for="type in (['platinum', 'gold', 'silver', 'bronze'] as BadgeType[])"
          :key="type"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r text-white"
          :class="BADGE_COLORS[type]"
        >
          {{ BADGE_ICONS[type] }} {{ BADGE_LABELS[type] }}: {{ summary?.[type] ?? 0 }}
        </span>
      </div>

      <div v-if="awards.length === 0" class="text-center py-8 text-sm text-gray-400 dark:text-gray-500">
        No badges yet - keep up the great work and they'll appear here automatically!
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="a in awards.slice(0, 4)"
          :key="a.id"
          class="rounded-xl p-4 text-white bg-gradient-to-br shadow-sm"
          :class="BADGE_COLORS[a.badge_type]"
        >
          <div class="flex items-start justify-between gap-2">
            <span class="text-2xl">{{ a.badge_type === 'special' ? '⭐' : BADGE_ICONS[a.badge_type] }}</span>
            <span class="text-[10px] uppercase tracking-wide font-semibold bg-white/20 px-2 py-0.5 rounded-full">{{ BADGE_LABELS[a.badge_type] }}</span>
          </div>
          <p class="font-bold mt-2 leading-tight">{{ a.award_title }}</p>
          <p v-if="a.average !== null" class="text-sm opacity-90">Average: {{ a.average }}%</p>
          <p v-else-if="a.score !== null" class="text-sm opacity-90">Score: {{ a.score }}%</p>
          <p class="text-xs opacity-75 mt-1">
            {{ a.subject_name ? a.subject_name + ' · ' : '' }}{{ a.term_name }}{{ a.academic_year ? ', ' + a.academic_year : '' }}
          </p>
        </div>
      </div>
    </template>
  </router-link>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { BADGE_ICONS, BADGE_LABELS, BADGE_COLORS } from '@/types/reward'
import type { StudentAward, AwardSummary, BadgeType } from '@/types/reward'

const awards = ref<StudentAward[]>([])
const summary = ref<AwardSummary | null>(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const [summaryRes, awardsRes] = await Promise.all([
      axios.get('/api/student/awards/summary'),
      axios.get('/api/student/awards'),
    ])
    summary.value = summaryRes.data.data
    awards.value = awardsRes.data.data.awards
  } catch (err) {
    // Best-effort - widget just shows the empty state.
  } finally {
    loading.value = false
  }
})
</script>
