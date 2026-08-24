<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
      <div class="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h2 class="text-lg font-bold text-white">{{ studentName }}</h2>
          <p class="text-xs text-indigo-100">{{ activeSubjectId ? (subjectDetail?.subject_name || 'Subject') + ' Performance' : 'Overall Performance Report' }}</p>
        </div>
        <button @click="$emit('close')" class="text-white/80 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="p-6 overflow-y-auto flex-1">
        <div v-if="loading" class="flex justify-center py-16">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>

        <template v-else-if="!activeSubjectId">
          <!-- General overview -->
          <div class="grid grid-cols-3 gap-3 mb-6">
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3 text-center">
              <p class="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Overall Avg</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">{{ general?.overall_avg_percentage ?? '-' }}<span v-if="general?.overall_avg_percentage !== null">%</span></p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3 text-center">
              <p class="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Grade</p>
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white text-sm mt-1" :class="gradeColor(general?.overall_grade)">
                {{ general?.overall_grade || '-' }}
              </span>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3 text-center">
              <p class="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Assignments</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">{{ general?.total_assignments ?? 0 }}</p>
            </div>
          </div>

          <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">Performance by Subject</p>

          <div v-if="!general?.subjects.length" class="text-center py-8 text-sm text-gray-400 dark:text-gray-500">
            No graded assignments yet.
          </div>
          <button
            v-for="s in general?.subjects"
            :key="s.subject_id"
            @click="openSubject(s.subject_id)"
            class="w-full flex items-center justify-between gap-3 px-4 py-3 mb-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors text-left"
          >
            <div class="min-w-0">
              <p class="font-medium text-gray-900 dark:text-white">{{ s.subject_name }}</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">{{ s.assignments_count }} assignment{{ s.assignments_count === 1 ? '' : 's' }}</p>
            </div>
            <div class="flex items-center gap-3 flex-shrink-0">
              <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ s.avg_percentage }}%</span>
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-white text-xs" :class="gradeColor(s.grade)">{{ s.grade }}</span>
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
        </template>

        <template v-else>
          <!-- Subject detail -->
          <button @click="activeSubjectId = null" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline mb-4">
            &larr; Back to overview
          </button>

          <div class="grid grid-cols-3 gap-3 mb-5">
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3 text-center">
              <p class="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Average</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ subjectDetail?.avg_percentage ?? '-' }}%</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3 text-center">
              <p class="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Highest</p>
              <p class="text-lg font-bold text-emerald-600 dark:text-emerald-400">{{ subjectDetail?.highest_percentage ?? '-' }}%</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3 text-center">
              <p class="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Lowest</p>
              <p class="text-lg font-bold text-orange-500 dark:text-orange-400">{{ subjectDetail?.lowest_percentage ?? '-' }}%</p>
            </div>
          </div>

          <div v-if="!subjectDetail?.assignments.length" class="text-center py-8 text-sm text-gray-400 dark:text-gray-500">
            No graded assignments in this subject yet.
          </div>
          <div v-else class="space-y-3">
            <div v-for="a in subjectDetail?.assignments" :key="a.assignment_id" class="border border-gray-200 dark:border-gray-700 rounded-xl p-3">
              <div class="flex items-center justify-between mb-1.5">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ a.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{{ a.score }}/{{ a.total_marks }} ({{ a.percentage }}%)</p>
              </div>
              <div class="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full rounded-full" :class="barColor(a.percentage)" :style="{ width: a.percentage + '%' }"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import type { StudentGeneralPerformance, StudentSubjectPerformance } from '@/types/performance'

const props = defineProps<{
  studentId: number
  studentName: string
  termId?: number | null
}>()

defineEmits<{ close: [] }>()

const authStore = useAuthStore()
const roleBase = () => (authStore.userRole === 'teacher' ? 'teacher' : authStore.userRole === 'hod' ? 'hod' : 'admin')

const loading = ref(false)
const general = ref<StudentGeneralPerformance | null>(null)
const activeSubjectId = ref<number | null>(null)
const subjectDetail = ref<StudentSubjectPerformance | null>(null)

const gradeColor = (grade: string | null | undefined) => {
  const colors: Record<string, string> = {
    A: 'bg-emerald-600', B: 'bg-blue-600', C: 'bg-amber-500', D: 'bg-orange-500', E: 'bg-red-600', F: 'bg-red-600',
  }
  return grade ? colors[grade] || 'bg-gray-400' : 'bg-gray-300'
}

const barColor = (percentage: number) => {
  if (percentage >= 80) return 'bg-emerald-500'
  if (percentage >= 60) return 'bg-blue-500'
  if (percentage >= 40) return 'bg-amber-500'
  return 'bg-red-500'
}

const loadGeneral = async () => {
  loading.value = true
  try {
    const params: Record<string, number> = {}
    if (props.termId) params.term_id = props.termId
    const res = await axios.get(`/api/${roleBase()}/performance/students/${props.studentId}`, { params })
    general.value = res.data.data
  } catch (err) {
    general.value = null
  } finally {
    loading.value = false
  }
}

const openSubject = async (subjectId: number) => {
  activeSubjectId.value = subjectId
  loading.value = true
  try {
    const params: Record<string, number> = {}
    if (props.termId) params.term_id = props.termId
    const res = await axios.get(`/api/${roleBase()}/performance/students/${props.studentId}/subjects/${subjectId}`, { params })
    subjectDetail.value = res.data.data
  } catch (err) {
    subjectDetail.value = null
  } finally {
    loading.value = false
  }
}

onMounted(loadGeneral)
</script>
