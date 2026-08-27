<template>
  <div ref="rootEl" class="report-card relative bg-white dark:bg-gray-800 rounded-2xl shadow-md border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
    <!-- Accent bar -->
    <div class="h-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 print-color-exact"></div>

    <!-- Watermark -->
    <div v-if="report.school?.logo_path" class="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
      <img :src="resolveAssetUrl(report.school.logo_path)" alt="" class="w-2/3 max-w-sm opacity-[0.07] dark:opacity-[0.05]">
    </div>

    <div class="relative z-10 p-5 sm:p-8">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4 pb-5 mb-1 border-b-4 border-indigo-600 dark:border-indigo-500">
        <div class="flex items-center gap-4 min-w-0">
          <img v-if="report.school?.logo_path" :src="resolveAssetUrl(report.school.logo_path)" alt="School logo" class="w-20 h-20 object-contain flex-shrink-0 rounded-lg bg-white ring-2 ring-gray-200 dark:ring-gray-600 p-1">
          <div class="min-w-0 leading-normal">
            <h1 class="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wide" style="line-height: 1.35; padding-top: 2px; padding-bottom: 2px;">
              {{ report.school?.school_name || 'School' }}
            </h1>
            <p v-if="report.school?.address" class="text-xs sm:text-sm text-gray-500 dark:text-gray-400" style="line-height: 1.6;">{{ report.school.address }}</p>
          </div>
        </div>
        <div class="flex items-start gap-3 flex-shrink-0 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
          <div class="flex flex-col items-center flex-shrink-0">
            <div class="qr-frame">
              <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="Scan to visit the system online" class="block w-full h-full">
            </div>
          </div>
          <div class="text-right text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1 leading-relaxed">
            <p v-if="report.school?.box_number"><span class="font-semibold text-gray-500 dark:text-gray-500">Box:</span> {{ report.school.box_number }}</p>
            <p v-if="report.school?.website"><span class="font-semibold text-gray-500 dark:text-gray-500">Web:</span> {{ report.school.website }}</p>
            <p v-if="report.school?.email"><span class="font-semibold text-gray-500 dark:text-gray-500">Email:</span> {{ report.school.email }}</p>
            <p v-if="report.school?.phone"><span class="font-semibold text-gray-500 dark:text-gray-500">Tel:</span> {{ report.school.phone }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-5">
        <span class="inline-block px-4 py-1.5 rounded-full bg-indigo-600 text-white font-semibold text-xs sm:text-sm uppercase tracking-wide print-color-exact">
          {{ CATEGORY_TITLES[report.category] }} &middot; {{ report.term.name }}{{ report.term.academic_year ? ` - ${report.term.academic_year}` : '' }}
        </span>
      </div>

      <!-- Student info -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        <div class="sm:col-span-2 bg-gray-50 dark:bg-gray-900/40 border-2 border-gray-300 dark:border-gray-700 rounded-xl p-4 space-y-2 text-sm">
          <div class="flex flex-wrap gap-x-6 gap-y-1.5">
            <p><span class="block text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500">Admission No</span><span class="font-medium text-gray-900 dark:text-white">{{ report.student.admission_number }}</span></p>
            <p><span class="block text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500">Name</span><span class="font-semibold text-gray-900 dark:text-white">{{ report.student.first_name }} {{ report.student.last_name }}</span></p>
            <p><span class="block text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500">Class / Stream</span><span class="font-medium text-gray-900 dark:text-white">{{ report.student.class_name || '-' }}{{ report.student.stream_name ? ' / ' + report.student.stream_name : '' }}</span></p>
          </div>
        </div>
        <div class="border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden self-start bg-gray-50 dark:bg-gray-900/40">
          <div class="bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white print-color-exact">Report Type</div>
          <table class="w-full text-xs">
            <tbody>
              <tr>
                <td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Category</td>
                <td class="px-3 py-1.5 text-right font-medium text-gray-900 dark:text-white">{{ report.category }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="!report.available" class="mt-6 text-center py-12 bg-gray-50 dark:bg-gray-900/40 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
        <p class="font-semibold text-gray-600 dark:text-gray-300">Report not available yet</p>
        <p class="text-sm text-gray-400 mt-1">No completed {{ report.category }} assessments found for this student this term.</p>
      </div>

      <template v-else>
        <!-- Assessed Items -->
        <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-6 mb-1.5">
          Assessed Items &mdash; {{ report.category === 'EOC' ? 'Elements' : 'Topics' }} &amp; Descriptors
        </p>
        <div class="rounded-xl border-2 border-gray-400 dark:border-gray-700 overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr class="bg-indigo-600 text-white print-color-exact">
                  <th class="border border-indigo-700 px-3 py-2 text-left whitespace-nowrap">Subject</th>
                  <th class="border border-indigo-700 px-3 py-2 text-left whitespace-nowrap">{{ report.category === 'EOC' ? 'Element' : 'Topic' }}</th>
                  <th class="border border-indigo-700 px-3 py-2 text-left min-w-[260px]">Descriptor</th>
                  <th class="border border-indigo-700 px-2 py-2 text-center whitespace-nowrap">Score</th>
                  <th class="border border-indigo-700 px-2 py-2 text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in report.rows" :key="`${row.subject_id}-${row.topic_id}`" :class="idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
                  <td class="border border-gray-400 dark:border-gray-700 px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ row.subject_name }}</td>
                  <td class="border border-gray-400 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ row.topic_name }}</td>
                  <td class="border border-gray-400 dark:border-gray-700 px-3 py-2 text-gray-600 dark:text-gray-300">{{ row.descriptor_text }}</td>
                  <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center font-semibold text-gray-900 dark:text-white whitespace-nowrap">{{ row.percentage }}%</td>
                  <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center">
                    <span class="grade-badge font-bold text-white shadow-sm print-color-exact" :class="gradeColor(row.status)">
                      {{ row.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Totals bar -->
        <div class="totals-bar mt-4 print-color-exact text-white text-xs sm:text-sm rounded-xl px-5 py-3 flex flex-wrap items-center gap-x-8 gap-y-2 shadow-sm">
          <div><span class="block text-[10px] uppercase tracking-wide text-blue-200">Assessments</span><span class="font-bold text-base">{{ report.summary.assessment_count }}</span></div>
          <div class="border-l border-blue-300/40 pl-8"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Average Score</span><span class="font-bold text-base">{{ report.summary.percentage }}%</span></div>
          <div class="border-l border-blue-300/40 pl-8"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Grade / Status</span><span class="font-bold text-base">{{ report.summary.status }} &middot; {{ report.summary.performance_descriptor }}</span></div>
          <div class="border-l border-blue-300/40 pl-8"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Weight</span><span class="font-bold text-base">{{ report.summary.weight }} / {{ report.max_weight }}</span></div>
        </div>
      </template>

      <!-- Definitions & Result Key -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-[11px] sm:text-xs">
        <div class="border-2 border-gray-300 dark:border-gray-700 rounded-xl p-4 space-y-2 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40">
          <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-1">Definitions</p>
          <p><strong class="text-gray-800 dark:text-gray-200">{{ report.category }}:</strong> {{ CATEGORY_DEFINITIONS[report.category] }}</p>
          <p><strong class="text-gray-800 dark:text-gray-200">Weight:</strong> a 1-{{ report.max_weight }} competency rating derived from the average score{{ report.class_level ? ` (${report.class_level} scale)` : '' }}.</p>
        </div>
        <div class="border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden self-start">
          <table class="w-full text-[11px] sm:text-xs border-collapse">
            <thead>
              <tr class="bg-indigo-600 text-white print-color-exact">
                <th class="border border-indigo-700 px-2 py-1.5 text-left">Score Range</th>
                <th class="border border-indigo-700 px-2 py-1.5 text-left">Level</th>
                <th class="border border-indigo-700 px-2 py-1.5 text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in STATUS_KEY" :key="row.grade" :class="idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-gray-600 dark:text-gray-300">{{ row.range }}</td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-gray-600 dark:text-gray-300">{{ row.level }}</td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-center font-semibold text-gray-900 dark:text-white">{{ row.grade }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex flex-wrap items-center justify-between gap-2 mt-6 pt-3 border-t-2 border-dashed border-gray-300 dark:border-gray-600 text-[11px] text-gray-500 dark:text-gray-500">
        <span>Generated {{ formatDate(report.generated_at) }}</span>
        <span v-if="report.school?.motto" class="italic">Motto: '{{ report.school.motto }}'</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'
import type { CompetencyDetailReport } from '@/types/reportCard'
import { resolveAssetUrl } from '@/utils/url'

defineProps<{ report: CompetencyDetailReport }>()

const CATEGORY_TITLES: Record<string, string> = {
  LOA: 'Learning Outcome Assessment Report',
  AOI: 'Activity of Integration Report',
  EOC: 'Elements of Construct Report',
}

const CATEGORY_DEFINITIONS: Record<string, string> = {
  LOA: 'an assessment of specific learning outcomes the learner is expected to demonstrate for a topic.',
  AOI: 'an assessment of how well the learner integrates and applies what was learned to a competence.',
  EOC: 'an end-of-cycle assessment analysing the learner\'s strengths and weaknesses across topics.',
}

// Direct percentage bands (ReportCardGradingService::getPerformanceLevel), not the report card's
// weight-averaged scale - LOA/AOI/EOC grade from the raw average percentage.
const STATUS_KEY = [
  { range: '80-100%', level: 'Exceptional', grade: 'A' },
  { range: '70-79.99%', level: 'Outstanding', grade: 'B' },
  { range: '60-69.99%', level: 'Satisfactory', grade: 'C' },
  { range: '50-59.99%', level: 'Basic', grade: 'D' },
  { range: '0-49.99%', level: 'Elementary', grade: 'E' },
]

const gradeColor = (grade: string | null) => {
  const colors: Record<string, string> = {
    A: 'bg-emerald-600', B: 'bg-blue-600', C: 'bg-amber-500', D: 'bg-orange-500', E: 'bg-red-600',
  }
  return grade ? colors[grade] || 'bg-gray-400' : 'bg-gray-300'
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const rootEl = ref<HTMLElement | null>(null)
defineExpose({ rootEl })

const qrCodeDataUrl = ref<string | null>(null)

onMounted(async () => {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(window.location.origin, {
      width: 160,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#1e1b4b', light: '#ffffff' },
    })
  } catch (e) {
    qrCodeDataUrl.value = null
  }
})
</script>

<style scoped>
/* Same reasoning as ReportCard.vue: html2canvas can't reliably read the app's Google Fonts
   @font-face rules, so it silently substitutes a fallback whose metrics clip glyphs in the
   exported PDF. Pin to a font stack that's synchronously available on screen and in capture. */
.report-card {
  font-family: Arial, Helvetica, sans-serif;
}

.print-color-exact {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.totals-bar {
  background-color: #001f4d;
}

.qr-frame {
  width: 56px;
  height: 56px;
  padding: 4px;
  background-color: #ffffff;
  border: 2px solid #4338ca;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.grade-badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 9999px;
}

@media print {
  .report-card {
    box-shadow: none !important;
    border: none !important;
  }
}
</style>
