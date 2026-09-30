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
        <div v-else ref="sheet" class="cr-sheet relative bg-white text-gray-900 sm:rounded-xl shadow-xl overflow-hidden flex flex-col sm:min-h-[1086px]">
          <!-- Colour band -->
          <div class="h-2 cr-exact" style="background: linear-gradient(90deg, #047857, #10b981 45%, #6366f1)"></div>

          <!-- Faint crest behind the page -->
          <img v-if="report.school?.logo_path" :src="resolveAssetUrl(report.school.logo_path)" alt="" class="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 max-w-sm opacity-[0.04]">

          <div class="relative flex-1 flex flex-col px-6 sm:px-10 pt-7 pb-7">
            <!-- School -->
            <div class="text-center">
              <img v-if="report.school?.logo_path" :src="resolveAssetUrl(report.school.logo_path)" alt="" class="mx-auto w-16 h-16 object-contain">
              <p class="mt-2 text-xl sm:text-2xl font-extrabold uppercase tracking-[0.12em] text-gray-900">{{ report.school?.school_name || 'School' }}</p>
              <p v-if="report.school?.motto" class="text-xs italic text-emerald-700 mt-0.5">"{{ report.school.motto }}"</p>
              <p class="text-[11px] text-gray-500 mt-1">{{ [report.school?.address, report.school?.box_number, report.school?.phone, report.school?.email].filter(Boolean).join('  ·  ') }}</p>
            </div>
            <div class="mt-4 flex items-center gap-3">
              <span class="flex-1 h-px bg-gray-300"></span>
              <span class="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700">Learning progress report</span>
              <span class="flex-1 h-px bg-gray-300"></span>
            </div>

            <!-- Title -->
            <div class="mt-3 text-center">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900" style="font-family: Georgia, 'Times New Roman', serif">What I can do</h2>
              <p class="text-xs text-gray-500 mt-1">{{ [report.term_name, report.year].filter(Boolean).join(' · ') }} · Printed {{ report.generated_at }}</p>
            </div>

            <!-- Learner -->
            <div class="mt-5 grid grid-cols-3 rounded-xl border border-gray-200 divide-x divide-gray-200 overflow-hidden">
              <div class="px-3 py-2.5 text-center">
                <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400">Learner</p>
                <p class="text-sm font-bold text-gray-900 leading-tight mt-0.5">{{ report.student.name }}</p>
              </div>
              <div class="px-3 py-2.5 text-center">
                <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400">Class</p>
                <p class="text-sm font-bold text-gray-900 mt-0.5">{{ report.student.class_name || '–' }}</p>
              </div>
              <div class="px-3 py-2.5 text-center">
                <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400">Admission no.</p>
                <p class="text-sm font-bold text-gray-900 mt-0.5">{{ report.student.admission_number || '–' }}</p>
              </div>
            </div>

            <!-- At a glance -->
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="card in glance" :key="card.label" class="rounded-xl p-3 flex items-center gap-3 cr-exact" :style="{ background: card.bg }">
                <svg class="w-14 h-14 flex-shrink-0 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#fff" stroke-width="4" />
                  <circle cx="18" cy="18" r="15.5" fill="none" :stroke="card.color" stroke-width="4" stroke-linecap="round" :stroke-dasharray="`${card.percent * 0.974} 97.4`" />
                </svg>
                <div class="min-w-0">
                  <p class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: card.color }">{{ card.label }}</p>
                  <p class="text-2xl font-extrabold text-gray-900 leading-none mt-1">{{ card.value }} <span class="text-xs font-medium text-gray-500">of {{ card.total }}</span></p>
                  <p class="text-[11px] text-gray-500 mt-0.5">{{ card.percent }}% {{ card.note }}</p>
                </div>
              </div>
            </div>

            <!-- Subjects with results -->
            <div class="mt-5 space-y-3">
              <div v-for="s in assessedSubjects" :key="s.name" class="relative rounded-xl border border-gray-200 pl-4 pr-4 py-3 break-inside-avoid overflow-hidden">
                <span class="absolute left-0 top-0 bottom-0 w-1.5 cr-exact" :style="{ background: subjectColor(s) }"></span>
                <div class="flex items-center gap-3">
                  <p class="text-base font-extrabold tracking-wide text-gray-900">{{ s.name }}</p>
                  <div class="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden"><div class="h-full rounded-full cr-exact" :style="{ width: `${s.assessed ? s.achieved / s.assessed * 100 : 0}%`, background: subjectColor(s) }"></div></div>
                  <p class="text-[11px] font-semibold text-gray-600 whitespace-nowrap">{{ s.achieved }}/{{ s.assessed }} outcomes achieved</p>
                </div>
                <div v-if="s.competencies.length" class="mt-2 flex flex-wrap gap-1.5">
                  <span v-for="c in s.competencies" :key="c.topic" class="inline-block pl-0.5 pr-2 py-0.5 rounded-full leading-4 text-[10px] font-semibold border text-gray-800 cr-exact" :style="{ borderColor: gradeColor(c.grade) + '55', background: gradeColor(c.grade) + '12' }">
                    <svg class="inline-block align-middle w-4 h-4" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" :fill="gradeColor(c.grade)" /><text x="8" y="11.2" text-anchor="middle" font-size="9" font-weight="700" fill="#fff" font-family="Inter, Arial, sans-serif">{{ c.grade }}</text></svg>
                    <span class="ml-1 align-middle">{{ titleCase(c.topic) }} · {{ c.level }}</span>
                  </span>
                </div>
                <div class="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 text-[11px] leading-snug">
                  <div v-if="s.can.length">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">I can…</p>
                    <ul class="space-y-1">
                      <li v-for="c in s.can" :key="c.text" class="flex gap-1.5">
                        <svg class="mt-px w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="#10b981" /><path d="M4.6 8.4l2.2 2.2 4.6-4.8" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" /></svg>
                        <span class="text-gray-800">{{ c.text }}</span>
                      </li>
                      <li v-if="s.can_more" class="pl-5 text-gray-500">and {{ s.can_more }} more</li>
                    </ul>
                  </div>
                  <div v-if="s.working_on.length">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1">I'm working on…</p>
                    <ul class="space-y-1">
                      <li v-for="w in s.working_on" :key="w.text" class="flex gap-1.5">
                        <svg class="mt-px w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.6" fill="none" stroke="#f59e0b" stroke-width="2.2" /></svg>
                        <span class="text-gray-800">{{ w.text }}</span>
                      </li>
                      <li v-if="s.working_more" class="pl-5 text-gray-500">and {{ s.working_more }} more</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p v-if="!assessedSubjects.length" class="text-sm text-gray-600 rounded-xl bg-gray-50 p-4 text-center">No assessments have been returned yet this year - this report fills in as teachers return Learning Outcome Assessments and Activities of Integration.</p>
              <p v-if="notYet.length" class="text-[11px] text-gray-500"><span class="font-semibold text-gray-600">Not assessed yet:</span> {{ notYet.join(', ') }}</p>
            </div>

            <!-- Key -->
            <div class="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-gray-500">
              <span v-for="g in GRADES" :key="g.grade" class="inline-block">
                <svg class="inline-block align-middle w-3.5 h-3.5" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" :fill="g.color" /><text x="8" y="11.2" text-anchor="middle" font-size="9" font-weight="700" fill="#fff" font-family="Inter, Arial, sans-serif">{{ g.grade }}</text></svg> <span class="align-middle">{{ g.label }}</span>
              </span>
              <span class="w-full text-center">An outcome is achieved from Satisfactory (60%). From returned assessments only.</span>
            </div>

            <!-- Sign-off -->
            <div class="mt-auto pt-8 grid grid-cols-2 gap-10 text-[11px] text-gray-600">
              <div>
                <div class="h-8 border-b border-gray-400"></div>
                <p class="mt-1 font-semibold">Class teacher</p>
                <p class="text-[10px] text-gray-400">Signature &amp; date</p>
              </div>
              <div>
                <div class="h-8 border-b border-gray-400"></div>
                <p class="mt-1 font-semibold">Parent / guardian</p>
                <p class="text-[10px] text-gray-400">Signature &amp; date</p>
              </div>
            </div>
          </div>
          <div class="h-1 cr-exact" style="background: linear-gradient(90deg, #6366f1, #10b981 55%, #047857)"></div>
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

// The Learning Map's levels and colours
const GRADES = [
  { grade: 'A', label: 'Exceptional', color: '#059669' },
  { grade: 'B', label: 'Outstanding', color: '#0d9488' },
  { grade: 'C', label: 'Satisfactory', color: '#2563eb' },
  { grade: 'D', label: 'Basic', color: '#d97706' },
  { grade: 'E', label: 'Elementary', color: '#e11d48' }
]
const gradeColor = (g: string) => GRADES.find(x => x.grade === g)?.color ?? '#6b7280'
// Green when most assessed outcomes are achieved, amber part-way, rose when few
const subjectColor = (s: SubjectReport) => {
  const share = s.assessed ? s.achieved / s.assessed : 0
  return share >= 0.6 ? '#10b981' : share >= 0.4 ? '#f59e0b' : '#f43f5e'
}
const pct = (n: number, of: number) => (of ? Math.round(n / of * 100) : 0)
const glance = computed(() => {
  const o = report.value?.overall
  const c = report.value?.competencies
  return [
    { label: 'Learning outcomes achieved', value: o?.achieved ?? 0, total: o?.outcomes ?? 0, percent: pct(o?.achieved ?? 0, o?.outcomes ?? 0), note: "of this year's outcomes", color: '#047857', bg: '#ecfdf5' },
    { label: 'Topic competencies achieved', value: c?.achieved ?? 0, total: c?.competencies ?? 0, percent: pct(c?.achieved ?? 0, c?.competencies ?? 0), note: 'of topic competencies', color: '#6d28d9', bg: '#f5f3ff' }
  ]
})

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
