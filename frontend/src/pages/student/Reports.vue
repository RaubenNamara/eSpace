<template>
  <div class="w-full">
    <PageHeader v-if="!activeReport" title="My Report Cards" description="Your end-of-term reports - your results on every learning outcome, competency and construct, ready to print." icon="document" accent="indigo" />

    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="!activeReport">
      <EmptyState v-if="reportList.length === 0" icon="document" tone="indigo" title="No report cards yet" message="Your report card appears here once your class teacher generates it at the end of term. Until then, your Learning Map shows how you're doing.">
        <RouterLink to="/student/learning-map" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">Open my Learning Map</RouterLink>
      </EmptyState>
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
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
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
