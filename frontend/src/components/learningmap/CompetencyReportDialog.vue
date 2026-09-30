<template>
  <!-- A learner's one-page "what I can do" report from their Learning Map (LearningReportService):
       overall progress, and per subject the outcomes achieved, topic competency levels, what they
       can do and what they're working on. Downloads as a one-page PDF or prints. -->
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-start justify-center bg-black/60 overflow-y-auto p-0 sm:p-6 cr-overlay" @click.self="$emit('close')">
      <div class="w-full max-w-3xl">
        <!-- Actions -->
        <div class="flex items-center justify-end gap-2 p-3 sm:px-0 sticky top-0 z-10 bg-black/40 sm:bg-transparent cr-actions">
          <button type="button" class="px-3 py-2 rounded-lg bg-white text-gray-800 text-sm font-semibold hover:bg-gray-100 disabled:opacity-50" :disabled="!report" @click="print">Print</button>
          <button type="button" class="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50" :disabled="!report || downloading" @click="download">{{ downloading ? 'Preparing…' : 'Download PDF' }}</button>
          <button type="button" class="p-2 rounded-lg bg-white/90 text-gray-700 hover:bg-white" aria-label="Close" @click="$emit('close')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div v-if="loading" class="bg-white rounded-xl p-10 text-center text-sm text-gray-500">Preparing the report…</div>
        <div v-else-if="!report" class="bg-white rounded-xl p-10 text-center text-sm text-gray-500">Couldn't load the report.</div>

        <!-- The sheet (always light, A4 proportions) -->
        <div v-else ref="sheet" class="cr-sheet bg-white text-gray-900 sm:rounded-xl shadow-xl">
          <div class="h-2 bg-emerald-600 cr-exact"></div>
          <div class="p-5 sm:p-8">
            <!-- School -->
            <div class="flex items-center gap-3 pb-3 border-b-2 border-emerald-600">
              <img v-if="report.school?.logo_path" :src="resolveAssetUrl(report.school.logo_path)" alt="" class="w-14 h-14 object-contain flex-shrink-0">
              <div class="min-w-0 flex-1">
                <p class="text-base sm:text-lg font-bold uppercase tracking-wide leading-tight">{{ report.school?.school_name || 'School' }}</p>
                <p v-if="report.school?.motto" class="text-[11px] italic text-gray-600">{{ report.school.motto }}</p>
                <p class="text-[11px] text-gray-500">{{ [report.school?.address, report.school?.box_number, report.school?.phone].filter(Boolean).join(' · ') }}</p>
              </div>
            </div>

            <div class="mt-3 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Learning progress report</p>
                <h2 class="text-xl font-bold leading-tight">What I can do</h2>
              </div>
              <p class="text-[11px] text-gray-600 text-right">{{ [report.term_name, report.year].filter(Boolean).join(' · ') }}<br>Printed {{ report.generated_at }}</p>
            </div>

            <!-- Learner -->
            <div class="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div class="rounded-md bg-gray-50 px-2.5 py-1.5"><span class="block text-[10px] uppercase text-gray-500">Learner</span><span class="font-semibold">{{ report.student.name }}</span></div>
              <div class="rounded-md bg-gray-50 px-2.5 py-1.5"><span class="block text-[10px] uppercase text-gray-500">Class</span><span class="font-semibold">{{ report.student.class_name || '–' }}</span></div>
              <div class="rounded-md bg-gray-50 px-2.5 py-1.5"><span class="block text-[10px] uppercase text-gray-500">Admission no.</span><span class="font-semibold">{{ report.student.admission_number || '–' }}</span></div>
            </div>

            <!-- Overall -->
            <div class="mt-3 grid grid-cols-2 gap-2">
              <div class="rounded-lg border border-emerald-200 bg-emerald-50/60 p-2.5">
                <p class="text-[10px] uppercase font-bold text-emerald-800">Learning outcomes achieved</p>
                <p class="text-lg font-bold">{{ report.overall?.achieved ?? 0 }} <span class="text-xs font-medium text-gray-600">of {{ report.overall?.outcomes ?? 0 }} this year</span></p>
              </div>
              <div class="rounded-lg border border-violet-200 bg-violet-50/60 p-2.5">
                <p class="text-[10px] uppercase font-bold text-violet-800">Topic competencies achieved</p>
                <p class="text-lg font-bold">{{ report.competencies?.achieved ?? 0 }} <span class="text-xs font-medium text-gray-600">of {{ report.competencies?.competencies ?? 0 }}</span></p>
              </div>
            </div>

            <!-- Subjects with results -->
            <div class="mt-4 space-y-3">
              <div v-for="s in assessedSubjects" :key="s.name" class="rounded-lg border border-gray-200 p-3 break-inside-avoid">
                <div class="flex items-center gap-2">
                  <p class="flex-1 text-sm font-bold">{{ s.name }}</p>
                  <p class="text-[11px] text-gray-600">{{ s.achieved }} of {{ s.assessed }} assessed outcome{{ s.assessed === 1 ? '' : 's' }} achieved</p>
                </div>
                <div class="mt-1.5 h-1.5 rounded-full bg-gray-100 overflow-hidden"><div class="h-full bg-emerald-500 cr-exact" :style="{ width: `${s.assessed ? s.achieved / s.assessed * 100 : 0}%` }"></div></div>
                <div v-if="s.competencies.length" class="mt-2 flex flex-wrap gap-1">
                  <span v-for="c in s.competencies" :key="c.topic" class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-violet-50 text-violet-800 border border-violet-200">{{ titleCase(c.topic) }}: {{ c.grade }} · {{ c.level }}</span>
                </div>
                <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] leading-snug">
                  <div v-if="s.can.length">
                    <p class="font-bold text-emerald-800 mb-0.5">I can…</p>
                    <ul class="space-y-0.5">
                      <li v-for="c in s.can" :key="c.text" class="flex gap-1"><span class="text-emerald-600">✓</span><span>{{ c.text }}</span></li>
                      <li v-if="s.can_more" class="text-gray-500">and {{ s.can_more }} more</li>
                    </ul>
                  </div>
                  <div v-if="s.working_on.length">
                    <p class="font-bold text-amber-800 mb-0.5">I'm working on…</p>
                    <ul class="space-y-0.5">
                      <li v-for="w in s.working_on" :key="w.text" class="flex gap-1"><span class="text-amber-600">›</span><span>{{ w.text }}</span></li>
                      <li v-if="s.working_more" class="text-gray-500">and {{ s.working_more }} more</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p v-if="!assessedSubjects.length" class="text-sm text-gray-600 rounded-lg bg-gray-50 p-3">No assessments have been returned yet this year - this report fills in as teachers return Learning Outcome Assessments and Activities of Integration.</p>
              <p v-if="notYet.length" class="text-[11px] text-gray-500">Not assessed yet: {{ notYet.join(', ') }}</p>
            </div>

            <!-- Key and sign-off -->
            <p class="mt-4 text-[10px] text-gray-500">Levels: A Exceptional · B Outstanding · C Satisfactory · D Basic · E Elementary. An outcome is achieved from Satisfactory (60%). From returned assessments only.</p>
            <div class="mt-5 grid grid-cols-2 gap-6 text-[11px] text-gray-600">
              <div class="border-t border-gray-400 pt-1">Class teacher</div>
              <div class="border-t border-gray-400 pt-1">Parent / guardian</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { resolveAssetUrl } from '@/utils/url'
import { downloadElementAsPdf, sanitizeFilename, withLightMode } from '@/utils/reportCardPdf'
import { useToastStore } from '@/stores/toast'

interface Statement { text: string; percentage: number | null }
interface SubjectReport {
  name: string
  outcomes: number
  assessed: number
  achieved: number
  percent: number
  competencies: { topic: string; grade: string; level: string }[]
  can: Statement[]
  can_more: number
  working_on: Statement[]
  working_more: number
}
interface Report {
  school: Record<string, string | null>
  student: { name: string; admission_number: string | null; class_name: string | null }
  year: string | null
  term_name: string | null
  generated_at: string
  overall: { outcomes: number; achieved: number } | null
  competencies: { competencies: number; achieved: number } | null
  subjects: SubjectReport[]
}

// url: /api/student/competency-report, or /api/teacher/students/{id}/competency-report
const props = defineProps<{ url: string }>()
defineEmits<{ close: [] }>()
const toast = useToastStore()

const report = ref<Report | null>(null)
const loading = ref(true)
const downloading = ref(false)
const sheet = ref<HTMLElement | null>(null)

const assessedSubjects = computed(() => (report.value?.subjects ?? []).filter(s => s.assessed > 0))
const notYet = computed(() => (report.value?.subjects ?? []).filter(s => s.assessed === 0).map(s => s.name))

const titleCase = (t: string) => (t === t.toUpperCase() ? t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : t)

const download = async () => {
  if (!sheet.value || !report.value) return
  downloading.value = true
  try {
    await withLightMode(() => downloadElementAsPdf(sheet.value!, sanitizeFilename(`${report.value!.student.name}_What_I_can_do`) + '.pdf'))
  } catch {
    toast.error('Could not create the PDF')
  } finally {
    downloading.value = false
  }
}
const print = () => window.print()

onMounted(async () => {
  try {
    const response = await axios.get(props.url)
    report.value = response.data.data
  } catch {
    report.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.cr-exact {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
</style>

<style>
/* Printing: only the sheet, on white */
@media print {
  body > *:not(.cr-overlay) { display: none !important; }
  .cr-overlay { position: static !important; background: none !important; padding: 0 !important; overflow: visible !important; }
  .cr-actions { display: none !important; }
  .cr-sheet { box-shadow: none !important; border-radius: 0 !important; }
}
</style>
