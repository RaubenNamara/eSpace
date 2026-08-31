<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Engagement</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Reading, watching and attendance across the whole department
        </p>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="error" class="card bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
      {{ error }}
    </div>

    <div v-else-if="students.length === 0" class="card text-center text-gray-500 dark:text-gray-400 py-12">
      No students enrolled in this department yet.
    </div>

    <template v-else>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div v-for="mod in moduleList" :key="mod.key" class="card">
          <p class="text-gray-500 dark:text-gray-400 text-sm">{{ mod.label }}</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ modules[mod.key]?.percentage !== null && modules[mod.key]?.percentage !== undefined ? modules[mod.key].percentage + '%' : '—' }}
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500">
            {{ modules[mod.key]?.engaged ?? 0 }} / {{ modules[mod.key]?.total ?? 0 }} {{ mod.unit }}
          </p>
        </div>
      </div>

      <div class="card overflow-x-auto">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">By Student</h3>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Student</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Class</th>
              <th v-for="mod in moduleList" :key="mod.key" class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{{ mod.label }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="s in students" :key="s.student_id">
              <td class="px-4 py-3">
                <p class="font-medium text-gray-900 dark:text-white">{{ s.first_name }} {{ s.last_name }}</p>
                <p class="text-xs text-gray-400">{{ s.admission_number }}</p>
              </td>
              <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ s.class_name || '-' }}</td>
              <td v-for="mod in moduleList" :key="mod.key" class="px-4 py-3">
                <div class="w-28">
                  <div class="flex items-center justify-between text-xs mb-1">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">
                      {{ s[mod.key].percentage === null ? '—' : s[mod.key].percentage + '%' }}
                    </span>
                    <span class="text-gray-400">{{ s[mod.key].engaged }}/{{ s[mod.key].total }}</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div class="h-full rounded-full" :class="barColor(s[mod.key].percentage)" :style="{ width: (s[mod.key].percentage ?? 0) + '%' }"></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'

interface ModuleStat { engaged: number; total: number; percentage: number | null }
interface StudentRow {
  student_id: number
  first_name: string
  last_name: string
  admission_number: string
  class_name: string | null
  enotes: ModuleStat
  library: ModuleStat
  itembank: ModuleStat
  videos: ModuleStat
  live_classes: ModuleStat
  [key: string]: any
}

const moduleList = [
  { key: 'enotes', label: 'eNotes', unit: 'read' },
  { key: 'library', label: 'eLibrary', unit: 'read' },
  { key: 'itembank', label: 'Item Bank', unit: 'opened' },
  { key: 'videos', label: 'Videos', unit: 'watched' },
  { key: 'live_classes', label: 'Live Classes', unit: 'attended' },
] as const

const loading = ref(true)
const error = ref<string | null>(null)
const modules = ref<Record<string, ModuleStat>>({})
const students = ref<StudentRow[]>([])

function barColor(pct: number | null): string {
  if (pct === null) return 'bg-gray-300 dark:bg-gray-600'
  if (pct >= 75) return 'bg-emerald-500'
  if (pct >= 40) return 'bg-amber-500'
  return 'bg-red-500'
}

async function load() {
  loading.value = true
  error.value = null
  try {
    const response = await apiService.get('/hod/analytics/engagement')
    if (response.data.success) {
      modules.value = response.data.data.modules || {}
      students.value = response.data.data.students || []
    } else {
      error.value = response.data.message || 'Failed to load engagement analytics'
    }
  } catch (err: any) {
    console.error('Failed to load engagement analytics:', err)
    error.value = err.response?.data?.message || 'Failed to load engagement analytics'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
