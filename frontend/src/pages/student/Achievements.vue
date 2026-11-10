<template>
  <div class="w-full">
    <PageHeader title="My Achievements" description="Badges you've earned and how much you're improving - growth counts here, not just top marks." icon="trophy" accent="amber" />

    <GrowthBoard />

    <!-- Badge totals -->
    <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2.5">My badges</h2>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
      <div
        v-for="type in (['platinum', 'gold', 'silver', 'bronze'] as BadgeType[])"
        :key="type"
        class="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-3 shadow-sm"
      >
        <span class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm" :class="BADGE_COLORS[type]">
          <BadgeIcon :type="type" plain class="w-5 h-5" />
        </span>
        <div class="min-w-0">
          <p class="text-xl font-extrabold leading-none text-gray-900 dark:text-white tabular-nums">{{ summary?.[type] ?? 0 }}</p>
          <p class="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">{{ BADGE_LABELS[type] }}</p>
        </div>
      </div>
    </div>

    <!-- Active badges, or every badge ever given -->
    <div class="inline-flex p-1 mb-4 rounded-xl bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200/70 dark:ring-gray-700" role="tablist" aria-label="Which badges">
      <button
        v-for="opt in [{ v: false, l: 'Active' }, { v: true, l: 'Full history' }]"
        :key="opt.l"
        type="button"
        role="tab"
        :aria-selected="showRevoked === opt.v"
        class="px-4 py-1.5 rounded-lg text-sm font-semibold transition"
        :class="showRevoked === opt.v ? 'bg-white text-indigo-700 shadow-sm dark:bg-gray-700 dark:text-white' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'"
        @click="showRevoked = opt.v"
      >{{ opt.l }}</button>
    </div>

    <div v-if="loading" class="flex justify-center py-16">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>

    <EmptyState v-else-if="filteredAwards.length === 0" compact icon="trophy" tone="amber" title="No badges yet" message="Badges are awarded automatically - for strong results, steady improvement and keeping a learning streak going." />

    <div v-else class="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <article
        v-for="a in filteredAwards"
        :key="a.id"
        class="relative overflow-hidden rounded-2xl p-4 text-white shadow-md"
        :class="[BADGE_COLORS[a.badge_type], a.status === 'revoked' ? 'opacity-50 grayscale' : '']"
      >
        <!-- a soft light from the top corner -->
        <span class="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15" aria-hidden="true"></span>
        <div class="relative flex items-start justify-between gap-2">
          <span class="w-10 h-10 rounded-xl bg-white/20 ring-1 ring-white/30 flex items-center justify-center"><BadgeIcon :type="a.badge_type" plain class="w-5 h-5" /></span>
          <span class="text-[10px] uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded-full">{{ a.status === 'revoked' ? 'Revoked' : BADGE_LABELS[a.badge_type] }}</span>
        </div>
        <p class="relative mt-3 font-bold text-[15px] leading-snug">{{ a.award_title }}</p>
        <p v-if="a.average !== null" class="relative text-sm text-white/90">Average {{ a.average }}%</p>
        <p v-else-if="a.score !== null" class="relative text-sm text-white/90">Score {{ a.score }}%</p>
        <div class="relative mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between gap-2 text-[11px] text-white/80">
          <span class="truncate">{{ a.subject_name ? a.subject_name + ' · ' : '' }}{{ a.term_name }}{{ a.academic_year ? ', ' + a.academic_year : '' }}</span>
          <span class="flex-shrink-0">{{ formatDate(a.awarded_at) }}</span>
        </div>
      </article>
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
