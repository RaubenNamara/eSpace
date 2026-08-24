<template>
  <div class="p-6">
    <div v-if="!activeReport" class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6">
      <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
      <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
      <div class="relative flex items-center gap-3">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white/20">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">My Report Cards</h1>
          <p class="text-xs sm:text-sm text-indigo-100">View your summative assessment reports by term</p>
        </div>
      </div>
    </div>

    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="!activeReport">
      <div v-if="reportList.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500 dark:text-gray-400">
        No report cards have been generated for you yet. Check back once your teacher publishes one.
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          v-for="entry in reportList"
          :key="entry.id"
          @click="viewReport(entry.term_id)"
          class="text-left bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
        >
          <p class="font-semibold text-gray-900 dark:text-white">{{ entry.term_name }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ entry.academic_year_name || '' }}</p>
          <div class="flex items-center justify-between text-sm">
            <span class="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
              {{ entry.performance_level || '-' }}
            </span>
            <span class="text-gray-500 dark:text-gray-400">{{ entry.total_points ?? '-' }} pts</span>
          </div>
        </button>
      </div>
    </div>

    <div v-else>
      <div class="flex items-center justify-between mb-4">
        <button @click="activeReport = null" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
          &larr; Back to list
        </button>
        <div class="flex gap-2">
          <button @click="printReport" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
            Print
          </button>
          <button
            :disabled="downloading"
            @click="downloadPdf"
            class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {{ downloading ? 'Preparing PDF...' : 'Download PDF' }}
          </button>
        </div>
      </div>
      <ReportCard ref="reportCardRef" :report="activeReport" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ReportCard from '@/components/reportcard/ReportCard.vue'
import { downloadElementAsPdf, sanitizeFilename } from '@/utils/reportCardPdf'
import type { ReportCard as ReportCardType, ReportCardListEntry } from '@/types/reportCard'

const API_BASE = '/api/student'

const reportList = ref<ReportCardListEntry[]>([])
const activeReport = ref<ReportCardType | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const downloading = ref(false)
const reportCardRef = ref<InstanceType<typeof ReportCard> | null>(null)

const loadReports = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(`${API_BASE}/report-cards`)
    reportList.value = res.data.data.report_cards
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load report cards'
  } finally {
    loading.value = false
  }
}

const viewReport = async (termId: number) => {
  error.value = null
  try {
    const res = await axios.get(`${API_BASE}/report-cards/${termId}`)
    activeReport.value = res.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load report'
  }
}

const printReport = () => {
  window.print()
}

const downloadPdf = async () => {
  if (!reportCardRef.value?.rootEl || !activeReport.value) return
  downloading.value = true
  try {
    const name = `${activeReport.value.student.first_name}_${activeReport.value.student.last_name}_${activeReport.value.term.name}`
    await downloadElementAsPdf(reportCardRef.value.rootEl, `${sanitizeFilename(name)}_ReportCard.pdf`)
  } catch (err: any) {
    error.value = 'Failed to generate PDF'
  } finally {
    downloading.value = false
  }
}

onMounted(loadReports)
</script>
