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
          Learner's Summative Assessment Report &middot; {{ report.term.name }}{{ report.term.academic_year ? ` - ${report.term.academic_year}` : '' }}
        </span>
      </div>

      <!-- Student info -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        <div class="sm:col-span-2 bg-gray-50 dark:bg-gray-900/40 border-2 border-gray-300 dark:border-gray-700 rounded-xl p-4 space-y-2 text-sm">
          <div class="flex flex-wrap gap-x-6 gap-y-1.5">
            <p><span class="block text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500">Admission No</span><span class="font-medium text-gray-900 dark:text-white">{{ report.student.admission_number }}</span></p>
            <p><span class="block text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500">Name</span><span class="font-semibold text-gray-900 dark:text-white">{{ report.student.first_name }} {{ report.student.last_name }}</span></p>
            <p><span class="block text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500">Class / Stream</span><span class="font-medium text-gray-900 dark:text-white">{{ report.class_name || '-' }}{{ report.stream_name ? ' / ' + report.stream_name : '' }}</span></p>
          </div>
        </div>
        <div class="border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden self-start bg-gray-50 dark:bg-gray-900/40">
          <div class="bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white print-color-exact">Activity</div>
          <table class="w-full text-xs">
            <tbody>
              <tr>
                <td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Logins This Term</td>
                <td class="px-3 py-1.5 text-right font-medium text-gray-900 dark:text-white">{{ report.login_count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Subjects table -->
      <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-6 mb-1.5">
        Assessed Items &mdash; Score / Weight per Construct (C1, C2, ...)
      </p>
      <div class="rounded-xl border-2 border-gray-400 dark:border-gray-700 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr class="bg-indigo-600 text-white print-color-exact">
                <th class="border border-indigo-700 px-3 py-2 text-left whitespace-nowrap">Subject</th>
                <th v-for="n in maxConstructs" :key="n" class="border border-indigo-700 px-2 py-2 text-center font-semibold">C{{ n }}</th>
                <th class="border border-indigo-700 px-2 py-2 text-center whitespace-nowrap">Av. Weight (/{{ report.max_weight }})</th>
                <th class="border border-indigo-700 px-2 py-2 text-center">Grade</th>
                <th class="border border-indigo-700 px-3 py-2 text-left min-w-[220px]">Descriptor / Remark</th>
                <th class="border border-indigo-700 px-2 py-2 text-center">Tr</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(subject, idx) in report.subjects" :key="subject.subject_id" :class="idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
                <td class="border border-gray-400 dark:border-gray-700 px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {{ subject.subject_name }}
                </td>
                <td v-for="n in maxConstructs" :key="n" class="border border-gray-400 dark:border-gray-700 px-1 py-2 text-center text-gray-700 dark:text-gray-300">
                  <template v-if="subject.constructs[n - 1]">
                    {{ subject.constructs[n - 1].score_obtained }}/{{ subject.constructs[n - 1].score_total }}
                    <div class="text-[10px] text-gray-500 dark:text-gray-500">w{{ subject.constructs[n - 1].weight }}</div>
                  </template>
                  <template v-else>-</template>
                </td>
                <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center font-semibold text-gray-900 dark:text-white">
                  {{ subject.avg_weight }}
                </td>
                <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center">
                  <span class="grade-badge font-bold text-white shadow-sm print-color-exact" :class="gradeColor(subject.grade)">
                    {{ subject.grade || '-' }}
                  </span>
                </td>
                <td class="border border-gray-400 dark:border-gray-700 px-3 py-2 text-gray-600 dark:text-gray-300">
                  {{ subject.descriptor_text || (subject.assignments_included_count ? 'Descriptor pending - try regenerating.' : '-') }}
                </td>
                <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center text-gray-500 dark:text-gray-400">
                  {{ subject.teacher_initials || '-' }}
                </td>
              </tr>
              <tr v-if="report.subjects.length === 0">
                <td :colspan="maxConstructs + 5" class="border border-gray-400 dark:border-gray-700 px-3 py-8 text-center text-gray-400">
                  No graded subjects yet for this term.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Totals bar -->
      <div class="totals-bar mt-4 print-color-exact text-white text-xs sm:text-sm rounded-xl px-5 py-3 flex flex-wrap items-center gap-x-8 gap-y-2 shadow-sm">
        <div v-if="report.class_level !== 'O Level'"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Total Points</span><span class="font-bold text-base">{{ report.total_points }}</span></div>
        <div :class="{ 'border-l border-blue-300/40 pl-8': report.class_level !== 'O Level' }"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Overall Av. Weight</span><span class="font-bold text-base">{{ report.overall_avg_weight }} / {{ report.max_weight }}</span></div>
        <div class="border-l border-blue-300/40 pl-8"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Performance Level</span><span class="font-bold text-base">{{ report.performance_level || '-' }}</span></div>
        <div class="border-l border-blue-300/40 pl-8"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Result</span><span class="font-bold text-base">{{ report.result_category ?? '-' }}</span></div>
      </div>

      <!-- Awards & Achievements -->
      <div v-if="report.awards && report.awards.length > 0" class="mt-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Awards &amp; Achievements</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="award in report.awards"
            :key="award.id"
            class="award-pill px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r print-color-exact"
            :class="awardColor(award.badge_type)"
          >
            <span class="award-pill-icon">{{ award.badge_type === 'special' ? '⭐' : { platinum: '💎', gold: '🥇', silver: '🥈', bronze: '🥉' }[award.badge_type] }}</span>
            <span>{{ award.award_title }}</span>
            <span v-if="award.average !== null" class="opacity-80">&middot; {{ award.average }}%</span>
            <span v-else-if="award.score !== null" class="opacity-80">&middot; {{ award.score }}%</span>
            <span v-if="award.subject_name" class="opacity-80">&middot; {{ award.subject_name }}</span>
          </span>
        </div>
      </div>

      <!-- Virtual Lab Performance -->
      <div v-if="report.virtual_lab && report.virtual_lab.length > 0" class="mt-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Virtual Lab Performance</p>
        <div class="rounded-xl border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
          <table class="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr class="bg-indigo-600 text-white print-color-exact">
                <th class="border border-indigo-700 px-3 py-2 text-left">Practical</th>
                <th class="border border-indigo-700 px-2 py-2 text-center">Score</th>
                <th class="border border-indigo-700 px-2 py-2 text-center">Status</th>
                <th class="border border-indigo-700 px-3 py-2 text-left">Teacher Comment</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lab in report.virtual_lab" :key="lab.id" class="odd:bg-gray-50 dark:odd:bg-gray-900/30">
                <td class="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-800 dark:text-gray-200">
                  <span>{{ { physics: '⚡', chemistry: '🧪', biology: '🧬', agriculture: '🌾' }[lab.category] }}</span>
                  {{ lab.subject_name ? lab.subject_name + ' Practical: ' : '' }}{{ lab.experiment_title }}
                </td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-2 text-center font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  {{ lab.score }}/{{ lab.max_marks }}
                </td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-2 text-center text-gray-600 dark:text-gray-300">Completed</td>
                <td class="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-600 dark:text-gray-300 italic">{{ lab.teacher_comment || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Definitions & Result Key -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-[11px] sm:text-xs">
        <div class="border-2 border-gray-300 dark:border-gray-700 rounded-xl p-4 space-y-2 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40">
          <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-1">Definitions</p>
          <p><strong class="text-gray-800 dark:text-gray-200">Construct:</strong> an assessed item (assignment) contributing to a subject's grade.</p>
          <p><strong class="text-gray-800 dark:text-gray-200">Weight:</strong> a 1-{{ report.max_weight }} competency rating derived from the score on that item{{ report.class_level ? ` (${report.class_level} scale)` : '' }}.</p>
          <p><strong class="text-gray-800 dark:text-gray-200">Av. Weight:</strong> the average of a subject's construct weights.</p>
        </div>
        <div class="border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden self-start">
          <table class="w-full text-[11px] sm:text-xs border-collapse">
            <thead>
              <tr class="bg-indigo-600 text-white print-color-exact">
                <th class="border border-indigo-700 px-2 py-1.5 text-left">Weight Range</th>
                <th class="border border-indigo-700 px-2 py-1.5 text-left">Level</th>
                <th class="border border-indigo-700 px-2 py-1.5 text-center">Grade</th>
                <th v-if="report.class_level !== 'O Level'" class="border border-indigo-700 px-2 py-1.5 text-center">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in resultKey" :key="row.grade" :class="idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-gray-600 dark:text-gray-300">{{ row.range }}</td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-gray-600 dark:text-gray-300">{{ row.level }}</td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-center font-semibold text-gray-900 dark:text-white">{{ row.grade }}</td>
                <td v-if="report.class_level !== 'O Level'" class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-center text-gray-600 dark:text-gray-300">{{ row.points }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Comments -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <div class="border-2 border-indigo-300 dark:border-indigo-800/60 bg-indigo-50/60 dark:bg-indigo-900/20 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="initials-badge bg-indigo-600 text-white text-[10px] font-bold flex-shrink-0 print-color-exact">CT</span>
            <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">Class Teacher's Comment</p>
          </div>
          <textarea
            v-if="editableClassTeacherComment"
            v-model="classTeacherCommentDraft"
            rows="3"
            class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 dark:bg-gray-700 dark:text-white"
          ></textarea>
          <p v-else class="text-sm italic text-gray-700 dark:text-gray-300">{{ report.class_teacher_comment || 'No comment yet.' }}</p>
          <button
            v-if="editableClassTeacherComment"
            @click="$emit('save-class-teacher-comment', classTeacherCommentDraft)"
            class="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Save Comment
          </button>
        </div>
        <div class="border-2 border-amber-300 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-900/20 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="initials-badge bg-amber-600 text-white text-[10px] font-bold flex-shrink-0 print-color-exact">HT</span>
            <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">Head Teacher's Comment</p>
          </div>
          <textarea
            v-if="editableHeadTeacherComment"
            v-model="headTeacherCommentDraft"
            rows="3"
            class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 dark:bg-gray-700 dark:text-white"
          ></textarea>
          <p v-else class="text-sm italic text-gray-700 dark:text-gray-300">{{ report.head_teacher_comment || 'No comment yet.' }}</p>
          <button
            v-if="editableHeadTeacherComment"
            @click="$emit('save-head-teacher-comment', headTeacherCommentDraft)"
            class="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Save Comment
          </button>
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
import { computed, ref, watch, onMounted } from 'vue'
import QRCode from 'qrcode'
import type { ReportCard } from '@/types/reportCard'
import { resolveAssetUrl } from '@/utils/url'

const props = defineProps<{
  report: ReportCard
  editableClassTeacherComment?: boolean
  editableHeadTeacherComment?: boolean
}>()

defineEmits<{
  'save-class-teacher-comment': [string]
  'save-head-teacher-comment': [string]
}>()

const rootEl = ref<HTMLElement | null>(null)
defineExpose({ rootEl })

// Encodes the app's own origin, not any per-report data, so it's generated once on mount rather
// than re-derived per report - scanning it just takes whoever printed/holds this report to the
// system online (matches wherever this build is actually being served from, dev or production).
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

const maxConstructs = computed(() => {
  const max = Math.max(0, ...props.report.subjects.map(s => s.constructs.length))
  return Math.max(max, 1)
})

// Mirrors ReportCardGradingService::GRADE_BANDS exactly - the A-Level (5) table is the reference
// bands as-is; the O-Level (3) table is that same service's proportional 3/5 scaling of them.
const RESULT_KEYS: Record<number, { range: string; level: string; grade: string; points: number }[]> = {
  5: [
    { range: '4.6-5.0', level: 'Exceptional', grade: 'A', points: 5 },
    { range: '3.7-4.5', level: 'Outstanding', grade: 'B', points: 4 },
    { range: '2.8-3.6', level: 'Satisfactory', grade: 'C', points: 3 },
    { range: '1.9-2.7', level: 'Basic', grade: 'D', points: 2 },
    { range: '1.0-1.8', level: 'Elementary', grade: 'E', points: 1 },
  ],
  3: [
    { range: '2.8-3.0', level: 'Exceptional', grade: 'A', points: 3 },
    { range: '2.2-2.7', level: 'Outstanding', grade: 'B', points: 2 },
    { range: '1.7-2.1', level: 'Satisfactory', grade: 'C', points: 2 },
    { range: '1.1-1.6', level: 'Basic', grade: 'D', points: 1 },
    { range: '0.0-1.0', level: 'Elementary', grade: 'E', points: 1 },
  ],
}

const resultKey = computed(() => RESULT_KEYS[props.report.max_weight] || RESULT_KEYS[5])

const gradeColor = (grade: string | null) => {
  const colors: Record<string, string> = {
    A: 'bg-emerald-600', B: 'bg-blue-600', C: 'bg-amber-500', D: 'bg-orange-500', E: 'bg-red-600',
  }
  return grade ? colors[grade] || 'bg-gray-400' : 'bg-gray-300'
}

const awardColor = (badgeType: string) => {
  const colors: Record<string, string> = {
    platinum: 'from-cyan-400 to-blue-500',
    gold: 'from-amber-400 to-yellow-500',
    silver: 'from-gray-400 to-gray-500',
    bronze: 'from-orange-400 to-orange-600',
    special: 'from-purple-400 to-indigo-500',
  }
  return colors[badgeType] || 'from-gray-400 to-gray-500'
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const classTeacherCommentDraft = ref(props.report.class_teacher_comment || '')
const headTeacherCommentDraft = ref(props.report.head_teacher_comment || '')

watch(() => props.report, (r) => {
  classTeacherCommentDraft.value = r.class_teacher_comment || ''
  headTeacherCommentDraft.value = r.head_teacher_comment || ''
})
</script>

<style scoped>
/*
 * html2canvas can't reliably read @font-face rules from the cross-origin Google Fonts
 * stylesheet used app-wide (Inter/Poppins), so it silently substitutes a fallback font whose
 * metrics don't match the ones Tailwind's classes were tuned for - this clips glyph tops/bottoms
 * in the exported PDF. Pin the report card to a font stack that's always synchronously
 * available, on screen and in the capture alike, so what's exported matches what's shown.
 */
.report-card {
  font-family: Arial, Helvetica, sans-serif;
}

.print-color-exact {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Pure navy, not a gray/black gradient - kept as one flat color in both light and dark mode. */
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

/*
 * html2canvas doesn't reliably resolve flexbox vertical centering (items-center/justify-center)
 * on these small badges - the captured PDF shows the letter/initials sitting off-center, poking
 * past the circle's edge instead of sitting in the middle. Line-height-based centering (no flex
 * involved at all) renders identically on screen and is what html2canvas actually gets right.
 */
.grade-badge,
.initials-badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 9999px;
}

.award-pill {
  display: inline-block;
  line-height: 1.6;
  vertical-align: middle;
  white-space: nowrap;
}

.award-pill > span {
  display: inline;
  vertical-align: middle;
}

.award-pill > span + span {
  margin-left: 4px;
}

@media print {
  .report-card {
    box-shadow: none !important;
    border: none !important;
  }
}
</style>
