<template>
  <div class="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
    <div class="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-500/10 dark:from-indigo-400/5 dark:to-purple-500/5"></div>

    <div class="relative flex items-center justify-between mb-4">
      <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <span class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm print-color-exact">🧪</span>
        Virtual Lab
      </h3>
      <router-link to="/student/virtual-lab" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Open Lab &rarr;</router-link>
    </div>

    <div v-if="loading" class="py-6 flex items-center justify-center gap-2 text-xs text-gray-400">
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div> Loading...
    </div>

    <template v-else>
      <div class="relative grid grid-cols-2 gap-3 mb-3">
        <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3.5 text-center">
          <p class="text-2xl font-extrabold text-gray-900 dark:text-white">{{ summary?.experiments_completed ?? 0 }}</p>
          <p class="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">Completed</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3.5 text-center">
          <p class="text-2xl font-extrabold text-gray-900 dark:text-white">{{ summary?.average_percentage !== null && summary?.average_percentage !== undefined ? summary.average_percentage + '%' : '-' }}</p>
          <p class="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">Average</p>
        </div>
      </div>

      <div v-if="pendingCount > 0" class="text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-3.5 py-2.5 flex items-center gap-2">
        <span>⏳</span> {{ pendingCount }} experiment{{ pendingCount > 1 ? 's' : '' }} waiting for you.
      </div>
      <div v-else-if="!summary?.experiments_completed" class="text-xs text-gray-400 dark:text-gray-500 px-0.5">
        No experiments completed yet &mdash; step into the lab to get started.
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import type { LabSummary, StudentAssignment } from '@/types/virtualLab'

const summary = ref<LabSummary | null>(null)
const assignments = ref<StudentAssignment[]>([])
const loading = ref(true)

const pendingCount = computed(() => assignments.value.filter(a => a.attempt_status === 'not_started' || a.attempt_status === 'in_progress').length)

onMounted(async () => {
  try {
    const [resultsRes, assignmentsRes] = await Promise.all([
      axios.get('/api/student/virtual-lab/results'),
      axios.get('/api/student/virtual-lab/assignments'),
    ])
    summary.value = resultsRes.data.data.summary
    assignments.value = assignmentsRes.data.data.assignments
  } finally {
    loading.value = false
  }
})
</script>
