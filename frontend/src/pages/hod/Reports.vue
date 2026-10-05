<template>
  <!-- Report cards for the department's learners, by term: who has one, their level, and the
       report itself (view, print, download as PDF). -->
  <div class="w-full">
    <PageHeader title="Report cards" description="Your department's learners for a term - who has a report card yet, and each one to view, print or download." icon="document" accent="indigo">
      <StatStrip v-if="!loading && students.length" v-model="filter" :items="statItems" />
      <template #filters>
        <select v-model="termId" class="w-full sm:w-64 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Term">
          <option v-for="t in terms" :key="t.id" :value="t.id">{{ t.name }}{{ t.academic_year ? ` · ${t.academic_year}` : '' }}{{ t.is_current ? ' (current)' : '' }}</option>
        </select>
      </template>
    </PageHeader>

    <div v-if="error" class="mb-4 rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-800 dark:text-rose-200">{{ error }}</div>

    <EmptyState v-if="!loading && !terms.length" icon="document" tone="gray" title="No terms set up yet" message="Report cards appear once the school's terms are set up." />
    <DataTable
      v-else
      :columns="columns"
      :rows="shown"
      :loading="loading"
      :search-keys="['name', 'admission_number']"
      search-placeholder="Search learners"
      :page-size="30"
      :initial-sort="{ key: 'name', dir: 'asc' }"
      empty-title="No learners for this term"
      empty-message="Learners enrolled in your department for this term show up here."
    >
      <template #cell-status="{ row }">
        <span v-if="row.report_card_id" class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Ready{{ row.performance_level ? ` · ${row.performance_level}` : '' }}</span>
        <span v-else class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">Not generated</span>
      </template>
      <template #actions="{ row }">
        <button v-if="row.report_card_id" type="button" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700" @click="view(row.id)">View</button>
      </template>
    </DataTable>

    <!-- The report -->
    <div v-if="active" class="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto" @click.self="active = null">
      <div class="max-w-5xl w-full my-6">
        <div class="flex justify-end mb-2 gap-2">
          <button :disabled="downloading" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" @click="download">{{ downloading ? 'Preparing PDF…' : 'Download PDF' }}</button>
          <button class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600" @click="print">Print</button>
          <button class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600" @click="active = null">Close</button>
        </div>
        <ReportCard ref="reportCardRef" :report="active" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ReportCard from '@/components/reportcard/ReportCard.vue'
import { downloadElementAsPdf, sanitizeFilename } from '@/utils/reportCardPdf'
import { niceName } from '@/components/dashboard/teacher/time'
import type { ReportCard as ReportCardType, ReportCardStudentEntry } from '@/types/reportCard'

interface Term { id: number; name: string; academic_year: string | null; is_current: number | boolean }
type Row = ReportCardStudentEntry & { name: string }

const columns: Column[] = [
  { key: 'name', label: 'Learner', sortable: true, mobile: 'title' },
  { key: 'admission_number', label: 'Admission no.', sortable: true, mobile: 'subtitle' },
  { key: 'status', label: 'Report card', sortable: true, value: (r: Row) => (r.report_card_id ? 1 : 0) }
]

const terms = ref<Term[]>([])
const termId = ref<number | null>(null)
const students = ref<Row[]>([])
const loading = ref(true)
const error = ref('')
const filter = ref<string | null>(null)
const active = ref<ReportCardType | null>(null)
const reportCardRef = ref<InstanceType<typeof ReportCard> | null>(null)
const downloading = ref(false)

const statItems = computed<StatItem[]>(() => [
  { label: 'Learners', value: students.value.length, key: 'all', tone: 'indigo' },
  { label: 'Ready', value: students.value.filter(s => s.report_card_id).length, key: 'ready', tone: 'emerald' },
  { label: 'Not generated', value: students.value.filter(s => !s.report_card_id).length, key: 'missing', tone: 'amber', hint: 'class teachers generate them' }
])
const shown = computed(() => students.value.filter(s => filter.value === 'ready' ? !!s.report_card_id : filter.value === 'missing' ? !s.report_card_id : true))

const loadStudents = async () => {
  if (!termId.value) { students.value = []; loading.value = false; return }
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get('/api/hod/report-cards/students', { params: { term_id: termId.value } })
    students.value = (res.data.data.students || []).map((s: ReportCardStudentEntry) => ({ ...s, name: niceName(`${s.first_name} ${s.last_name}`) }))
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not load the learners'
    students.value = []
  } finally {
    loading.value = false
  }
}

const view = async (studentId: number) => {
  try {
    const res = await axios.get(`/api/hod/report-cards/${studentId}/${termId.value}`)
    active.value = res.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not open the report card'
  }
}
const print = () => window.print()
const download = async () => {
  if (!reportCardRef.value?.rootEl || !active.value) return
  downloading.value = true
  try {
    const name = `${active.value.student.first_name}_${active.value.student.last_name}_${active.value.term.name}`
    await downloadElementAsPdf(reportCardRef.value.rootEl, `${sanitizeFilename(name)}_ReportCard.pdf`)
  } catch {
    error.value = 'Could not make the PDF'
  } finally {
    downloading.value = false
  }
}

watch(termId, loadStudents)
onMounted(async () => {
  try {
    const res = await axios.get('/api/hod/report-cards/terms')
    terms.value = res.data.data.terms || []
    termId.value = terms.value.find(t => t.is_current)?.id ?? terms.value[0]?.id ?? null
    if (!termId.value) loading.value = false
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not load the terms'
    loading.value = false
  }
})
</script>
