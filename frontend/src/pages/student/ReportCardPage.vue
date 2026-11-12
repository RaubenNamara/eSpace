<template>
  <!-- The learner's own report card, term by term - only when the school has opened report cards
       to students (ReportCardView). Every subject shows, marked or not yet assessed. -->
  <div class="w-full max-w-5xl">
    <PageHeader title="Report card" description="Your report for each term: grades, remarks and how you used Tusome. It fills in as your marked work comes back." icon="document" accent="indigo" class="print:hidden">
      <template #actions>
        <select v-if="terms.length" v-model.number="termId" class="py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Term">
          <option v-for="t in terms" :key="t.id" :value="t.id">{{ t.name }}{{ t.academic_year ? ` · ${t.academic_year}` : '' }}{{ t.is_current ? ' (current)' : '' }}</option>
        </select>
        <button type="button" class="btn-primary" :disabled="!report || downloading" @click="download">{{ downloading ? 'Preparing…' : 'Download PDF' }}</button>
      </template>
    </PageHeader>

    <div v-if="closed" class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center">
      <p class="font-semibold text-gray-900 dark:text-white">Report cards aren't open yet</p>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Your school will open them when they are ready.</p>
    </div>
    <div v-else-if="loading" class="h-[32rem] rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
    <p v-else-if="error" class="rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 text-sm p-4">{{ error }}</p>
    <ReportCard v-else-if="report" ref="cardRef" :report="report" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import ReportCard from '@/components/reportcard/ReportCard.vue'
import type { ReportCard as ReportCardType } from '@/types/reportCard'
import { downloadElementAsPdf, sanitizeFilename } from '@/utils/reportCardPdf'

const terms = ref<{ id: number; name: string; academic_year: string | null; is_current: boolean }[]>([])
const termId = ref(0)
const report = ref<ReportCardType | null>(null)
const loading = ref(true)
const closed = ref(false)
const error = ref('')
const downloading = ref(false)
const cardRef = ref<InstanceType<typeof ReportCard> | null>(null)

const load = async () => {
  if (!termId.value) return
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/student/report-cards/${termId.value}`)
    report.value = res.data.data
  } catch (err: any) {
    report.value = null
    error.value = err.response?.data?.message || 'Could not open the report card'
  } finally {
    loading.value = false
  }
}

const download = async () => {
  if (!cardRef.value?.rootEl || !report.value) return
  downloading.value = true
  try {
    const r = report.value
    await downloadElementAsPdf(cardRef.value.rootEl, `${sanitizeFilename(`${r.student.first_name}_${r.student.last_name}_${r.term.name}`)}_ReportCard.pdf`)
  } finally {
    downloading.value = false
  }
}

watch(termId, (_id, old) => { if (old) load() })
onMounted(async () => {
  try {
    const res = await axios.get('/api/student/report-cards')
    terms.value = res.data.data.terms
    termId.value = terms.value.find(t => t.is_current)?.id ?? terms.value[0]?.id ?? 0
    if (termId.value) await load()
    else loading.value = false
  } catch (err: any) {
    loading.value = false
    if (err.response?.status === 403) closed.value = true
    else error.value = err.response?.data?.message || 'Could not open your report cards'
  }
})
</script>
