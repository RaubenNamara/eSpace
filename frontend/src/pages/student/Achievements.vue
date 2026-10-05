<template>
  <div class="w-full">
    <PageHeader title="My Achievements" description="Badges you've earned and how much you're improving - growth counts here, not just top marks." icon="trophy" accent="amber" />

    <GrowthBoard />

    <div class="flex flex-wrap gap-2 mb-6">
      <span
        v-for="type in (['platinum', 'gold', 'silver', 'bronze'] as BadgeType[])"
        :key="type"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
        :class="BADGE_COLORS[type]"
      >
        <BadgeIcon :type="type" plain class="w-4 h-4 inline-block align-[-3px]" /> {{ BADGE_LABELS[type] }}: {{ summary?.[type] ?? 0 }}
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

    <EmptyState v-else-if="filteredAwards.length === 0" compact icon="trophy" tone="amber" title="No badges yet" message="Badges are awarded automatically - for strong results, steady improvement and keeping a learning streak going." />

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="a in filteredAwards"
        :key="a.id"
        class="rounded-xl p-4 text-white shadow-sm relative"
        :class="[BADGE_COLORS[a.badge_type], a.status === 'revoked' ? 'opacity-50 grayscale' : '']"
      >
        <span v-if="a.status === 'revoked'" class="absolute top-2 right-2 text-[10px] font-semibold bg-black/40 px-2 py-0.5 rounded-full">Revoked</span>
        <div class="flex items-start justify-between gap-2">
          <BadgeIcon :type="a.badge_type" class="w-8 h-8" />
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
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import BadgeIcon from '@/components/common/BadgeIcon.vue'
import GrowthBoard from '@/components/dashboard/GrowthBoard.vue'
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { BADGE_LABELS, BADGE_COLORS } from '@/types/reward'
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
