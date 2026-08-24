<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">🏆 My Achievements</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Your full badge history, automatically awarded based on performance.</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-6">
      <span
        v-for="type in (['platinum', 'gold', 'silver', 'bronze'] as BadgeType[])"
        :key="type"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r text-white"
        :class="BADGE_COLORS[type]"
      >
        {{ BADGE_ICONS[type] }} {{ BADGE_LABELS[type] }}: {{ summary?.[type] ?? 0 }}
      </span>
    </div>

    <div class="flex items-center gap-2 mb-5">
      <button
        @click="showRevoked = false"
        class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        :class="!showRevoked ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'"
      >
        Active
      </button>
      <button
        @click="showRevoked = true"
        class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        :class="showRevoked ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'"
      >
        Full History
      </button>
    </div>

    <div v-if="loading" class="flex justify-center py-16">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="filteredAwards.length === 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-400 dark:text-gray-500">
      No badges to show yet.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="a in filteredAwards"
        :key="a.id"
        class="rounded-xl p-4 text-white bg-gradient-to-br shadow-sm relative"
        :class="[BADGE_COLORS[a.badge_type], a.status === 'revoked' ? 'opacity-50 grayscale' : '']"
      >
        <span v-if="a.status === 'revoked'" class="absolute top-2 right-2 text-[10px] font-semibold bg-black/40 px-2 py-0.5 rounded-full">Revoked</span>
        <div class="flex items-start justify-between gap-2">
          <span class="text-3xl">{{ BADGE_ICONS[a.badge_type] }}</span>
          <span class="text-[10px] uppercase tracking-wide font-semibold bg-white/20 px-2 py-0.5 rounded-full">{{ BADGE_LABELS[a.badge_type] }}</span>
        </div>
        <p class="font-bold mt-2 leading-tight">{{ a.award_title }}</p>
        <p v-if="a.average !== null" class="text-sm opacity-90">Average: {{ a.average }}%</p>
        <p v-else-if="a.score !== null" class="text-sm opacity-90">Score: {{ a.score }}%</p>
        <p class="text-xs opacity-75 mt-1">
          {{ a.subject_name ? a.subject_name + ' · ' : '' }}{{ a.term_name }}{{ a.academic_year ? ', ' + a.academic_year : '' }}
        </p>
        <p class="text-[11px] opacity-60 mt-2">Awarded {{ formatDate(a.awarded_at) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { BADGE_ICONS, BADGE_LABELS, BADGE_COLORS } from '@/types/reward'
import type { StudentAward, AwardSummary, BadgeType } from '@/types/reward'

const awards = ref<StudentAward[]>([])
const summary = ref<AwardSummary | null>(null)
const loading = ref(false)
const showRevoked = ref(false)

const filteredAwards = computed(() => awards.value)

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const load = async () => {
  loading.value = true
  try {
    const [summaryRes, awardsRes] = await Promise.all([
      axios.get('/api/student/awards/summary'),
      axios.get('/api/student/awards', { params: showRevoked.value ? { all: 1 } : {} }),
    ])
    summary.value = summaryRes.data.data
    awards.value = awardsRes.data.data.awards
  } catch (err) {
    awards.value = []
  } finally {
    loading.value = false
  }
}

watch(showRevoked, load)
onMounted(load)
</script>
