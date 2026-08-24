<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">Virtual Lab</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Oversee every experiment across all teachers, manage the 3D equipment catalog, and monitor practical performance system-wide.</p>
    </div>

    <div class="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" class="px-4 py-2 text-sm font-medium border-b-2 -mb-px capitalize" :class="activeTab === tab ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400'">
        {{ tab }}
      </button>
    </div>

    <!-- ===================== ANALYTICS TAB ===================== -->
    <div v-if="activeTab === 'analytics'">
      <div v-if="analytics" class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"><p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.total_experiments }}</p><p class="text-xs text-gray-400">Experiments</p></div>
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"><p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.total_assignments }}</p><p class="text-xs text-gray-400">Published</p></div>
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"><p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.total_attempts }}</p><p class="text-xs text-gray-400">Attempts</p></div>
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"><p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.average_percentage ?? '-' }}%</p><p class="text-xs text-gray-400">Average Score</p></div>
      </div>

      <div v-if="analytics" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-700"><tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Experiments</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Attempts</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Average</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="c in analytics.by_category" :key="c.category">
              <td class="px-4 py-2 text-gray-800 dark:text-gray-200">{{ CATEGORY_ICONS[c.category] }} {{ CATEGORY_LABELS[c.category] }}</td>
              <td class="px-4 py-2 text-gray-500">{{ c.experiment_count }}</td>
              <td class="px-4 py-2 text-gray-500">{{ c.attempt_count }}</td>
              <td class="px-4 py-2 text-gray-500">{{ c.average_percentage !== null ? c.average_percentage + '%' : '-' }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>

    <!-- ===================== EXPERIMENTS TAB ===================== -->
    <div v-else-if="activeTab === 'experiments'">
      <div class="flex flex-wrap gap-3 mb-4">
        <input v-model="expFilters.search" placeholder="Search title/topic" class="input-field text-sm">
        <select v-model="expFilters.category" class="input-field text-sm"><option value="">All categories</option><option value="physics">Physics</option><option value="chemistry">Chemistry</option><option value="biology">Biology</option><option value="agriculture">Agriculture</option></select>
        <select v-model="expFilters.status" class="input-field text-sm"><option value="">All statuses</option><option value="draft">Draft</option><option value="published">Published</option><option value="disabled">Disabled</option></select>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-700"><tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Creator</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="e in filteredExperiments" :key="e.id">
              <td class="px-4 py-2 font-medium text-gray-900 dark:text-white">{{ CATEGORY_ICONS[e.category] }} {{ e.title }}{{ e.is_template ? ' (template)' : '' }}</td>
              <td class="px-4 py-2 text-gray-500">{{ e.creator_name || 'System' }}</td>
              <td class="px-4 py-2 text-gray-500">{{ e.assignment_count }} classes &middot; {{ e.attempt_count }} attempts</td>
              <td class="px-4 py-2"><span class="px-2 py-0.5 text-xs rounded-full" :class="e.status === 'published' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : e.status === 'disabled' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'">{{ e.status }}</span></td>
              <td class="px-4 py-2 text-right whitespace-nowrap">
                <button v-if="e.status !== 'disabled'" @click="setStatus(e, 'disabled')" class="text-xs font-medium text-red-600 dark:text-red-400 hover:underline">Disable</button>
                <button v-else @click="setStatus(e, 'published')" class="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline">Enable</button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>

    <!-- ===================== OBJECTS TAB ===================== -->
    <div v-else>
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-700"><tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Object</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Supported Actions</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="o in objects" :key="o.id">
              <td class="px-4 py-2 font-medium text-gray-900 dark:text-white">{{ o.icon }} {{ o.display_name }}</td>
              <td class="px-4 py-2 text-gray-500 capitalize">{{ o.category }}</td>
              <td class="px-4 py-2 text-gray-500">{{ o.supported_actions.join(', ') }}</td>
              <td class="px-4 py-2">
                <button @click="toggleObjectActive(o)" class="px-2 py-0.5 text-xs font-medium rounded-full" :class="o.is_active ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'">
                  {{ o.is_active ? 'Active' : 'Disabled' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/types/virtualLab'
import type { ExperimentSummary, LabObjectDef, LabCategory } from '@/types/virtualLab'

const API_BASE = '/api/admin'
const tabs = ['analytics', 'experiments', 'objects'] as const
const activeTab = ref<typeof tabs[number]>('analytics')

interface Analytics {
  total_experiments: number
  published_experiments: number
  total_assignments: number
  total_attempts: number
  graded_attempts: number
  average_percentage: number | null
  by_category: { category: LabCategory; experiment_count: number; attempt_count: number; average_percentage: number | null }[]
}

const analytics = ref<Analytics | null>(null)
const objects = ref<LabObjectDef[]>([])
const experiments = ref<ExperimentSummary[]>([])
const expFilters = ref({ search: '', category: '', status: '' })

const filteredExperiments = computed(() => experiments.value)

const loadAnalytics = async () => {
  const res = await axios.get(`${API_BASE}/virtual-lab/analytics`)
  analytics.value = res.data.data
}

const loadObjects = async () => {
  const res = await axios.get(`${API_BASE}/virtual-lab/objects`)
  objects.value = res.data.data.objects
}

const loadExperiments = async () => {
  const params: Record<string, string> = {}
  if (expFilters.value.search) params.search = expFilters.value.search
  if (expFilters.value.category) params.category = expFilters.value.category
  if (expFilters.value.status) params.status = expFilters.value.status
  const res = await axios.get(`${API_BASE}/virtual-lab/experiments`, { params })
  experiments.value = res.data.data.experiments
}

const setStatus = async (e: ExperimentSummary, status: string) => {
  await axios.put(`${API_BASE}/virtual-lab/experiments/${e.id}/status`, { status })
  await loadExperiments()
}

const toggleObjectActive = async (o: LabObjectDef) => {
  await axios.put(`${API_BASE}/virtual-lab/objects/${o.id}`, { is_active: !o.is_active })
  await loadObjects()
}

watch(expFilters, () => loadExperiments(), { deep: true })
watch(activeTab, (tab) => {
  if (tab === 'experiments' && experiments.value.length === 0) loadExperiments()
  if (tab === 'objects' && objects.value.length === 0) loadObjects()
})

onMounted(loadAnalytics)
</script>
