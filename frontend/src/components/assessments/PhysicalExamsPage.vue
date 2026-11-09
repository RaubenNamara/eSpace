<template>
  <!-- Physical exams (teacher, HOD and admin): tests sat on paper - their marks typed in here, and
       whether each counts on report cards. Opens on a class straight away, never blank. -->
  <div class="w-full">
    <!-- ===== The exams of a class and subject ===== -->
    <template v-if="!activeExam">
      <PageHeader title="Physical Exams" description="Tests sat on paper - type in the marks and choose whether each one counts on report cards." icon="pencil" accent="amber">
        <template #actions>
          <button v-if="canQuery" type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700" title="Physical and online marks together, or each learner's average" @click="openSheets">
            <AppIcon name="chart" class="w-4 h-4" />
            <span class="hidden sm:inline">Mark sheets</span><span class="sm:hidden">Sheets</span>
          </button>
          <button v-if="canQuery" type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-500/20" @click="openCreate">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            <span class="hidden sm:inline">New exam</span><span class="sm:hidden">New</span>
          </button>
        </template>
        <template #filters>
          <PickerDropdown v-if="termOptions.length" v-model="termId" label="Term" :options="termOptions" align="right" />
          <PickerDropdown v-if="classOptions.length" v-model="classId" label="Class" :options="classOptions" align="right" />
          <PickerDropdown v-if="subjectOptions.length" v-model="subjectId" label="Subject" :options="subjectOptions" align="right" />
        </template>
      </PageHeader>

      <div v-if="error" class="mb-4 flex items-start gap-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-3">
        <AppIcon name="warning" class="w-5 h-5 text-rose-500 flex-shrink-0" />
        <p class="flex-1 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>
      </div>

      <Skeleton v-if="booting || loading" variant="list" :count="3" />
      <EmptyState v-else-if="!canQuery" icon="pencil" tone="amber" title="Nothing to show yet" message="Physical exams appear for the classes and subjects you teach." />
      <EmptyState v-else-if="!exams.length" icon="pencil" tone="amber" title="No physical exams yet" message="Record a test the class sat on paper - a CAT, a mid-term, a practical - and type in everyone's marks.">
        <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700" @click="openCreate">Add the first exam</button>
      </EmptyState>

      <ul v-else class="space-y-3">
        <li v-for="exam in exams" :key="exam.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <!-- Date -->
          <div class="flex items-center gap-3 sm:w-auto min-w-0 flex-1">
            <div class="w-14 h-14 flex-shrink-0 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-200 flex flex-col items-center justify-center">
              <span class="text-[10px] font-bold uppercase">{{ monthOf(exam.exam_date) }}</span>
              <span class="text-xl font-extrabold leading-none">{{ dayOf(exam.exam_date) }}</span>
            </div>
            <div class="min-w-0">
              <p class="text-sm font-bold text-gray-900 dark:text-white truncate">
                {{ exam.title }}
                <span v-if="exam.assessment_category" class="ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold align-middle bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200" title="Counts towards UNEB continuous assessment">{{ exam.assessment_category === 'PROJECT' ? 'Project' : 'AOI' }}</span>
              </p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400">Out of {{ Number(exam.max_score) }}<template v-if="exam.avg_score !== null && exam.avg_score !== undefined"> · average {{ exam.avg_score }} ({{ Math.round(exam.avg_score / exam.max_score * 100) }}%)</template></p>
              <!-- Marking progress -->
              <div v-if="exam.class_size" class="mt-1.5 flex items-center gap-2 max-w-xs">
                <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full" :class="exam.marked_count === exam.class_size ? 'bg-emerald-500' : 'bg-amber-500'" :style="{ width: `${(exam.marked_count || 0) / exam.class_size * 100}%` }"></span></span>
                <span class="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ exam.marked_count || 0 }}/{{ exam.class_size }} marked</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 justify-between sm:justify-end">
            <!-- Counts on report cards -->
            <button type="button" role="switch" :aria-checked="exam.include_on_report" class="inline-flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300" :title="exam.include_on_report ? 'Counts on report cards - tap to leave it off' : 'Not on report cards - tap to include it'" @click="toggleIncludeOnReport(exam)">
              <span class="relative w-9 h-5 rounded-full transition-colors" :class="exam.include_on_report ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'">
                <span class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all" :class="exam.include_on_report ? 'left-[18px]' : 'left-0.5'"></span>
              </span>
              On report cards
            </button>
            <div class="flex items-center gap-1">
              <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold" :class="exam.marked_count === exam.class_size ? 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'" @click="openMarksheet(exam)">
                {{ exam.marked_count ? (exam.marked_count === exam.class_size ? 'Edit marks' : 'Continue marking') : 'Enter marks' }}
              </button>
              <ActionMenu :items="[{ label: 'Delete exam', icon: 'trash', danger: true, run: () => removeExam(exam) }]" :label="`More for ${exam.title}`" />
            </div>
          </div>
        </li>
      </ul>
    </template>

    <!-- ===== Typing in the marks ===== -->
    <template v-else>
      <div class="flex items-start gap-3 mb-4">
        <button type="button" class="mt-0.5 p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" aria-label="Back to exams" @click="closeMarksheet">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div class="min-w-0 flex-1">
          <h1 class="text-lg font-bold text-gray-900 dark:text-white truncate">{{ activeExam.title }}</h1>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ activeExam.subject_name }} · {{ activeExam.class_name }}{{ activeExam.stream_name ? `-${activeExam.stream_name}` : '' }} · out of {{ Number(activeExam.max_score) }}</p>
        </div>
      </div>

      <Skeleton v-if="marksheetLoading" variant="list" :count="6" />

      <template v-else>
        <StatStrip :items="markStats" class="mb-3" />
        <div class="mb-3 flex flex-wrap items-center gap-2">
          <input v-model="markSearch" type="search" placeholder="Find a learner" class="w-full sm:max-w-xs px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <span class="flex-1"></span>
          <!-- Marks typed offline: the class list as an Excel file, filled in and brought back -->
          <button type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" :disabled="!marksheetStudents.length" @click="downloadTemplate">
            <AppIcon name="download" class="w-4 h-4" /> Excel template
          </button>
          <button type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" :disabled="!marksheetStudents.length" @click="importInput?.click()">
            <AppIcon name="upload" class="w-4 h-4" /> Import marks
          </button>
          <input ref="importInput" type="file" accept=".xlsx,.xls,.csv" class="hidden" @change="importMarks">
        </div>
        <p v-if="importNote" class="mb-3 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 px-3 py-2 text-xs text-sky-800 dark:text-sky-200">{{ importNote }}</p>

        <EmptyState v-if="!marksheetStudents.length" compact icon="users" tone="gray" title="No students in this class" />
        <ul v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 mb-24">
          <li v-for="student in shownMarkRows" :key="student.student_id" class="px-3 sm:px-4 py-2 flex items-center gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(`${student.first_name} ${student.last_name}`) }}</p>
              <p class="text-[11px] text-gray-400">{{ student.admission_number }}</p>
            </div>
            <span v-if="scoreState(student.score) === 'over'" class="text-[11px] font-semibold text-rose-600 dark:text-rose-300">over {{ Number(activeExam.max_score) }}</span>
            <span v-else-if="student.score !== null && student.score !== undefined && (student.score as any) !== ''" class="text-[11px] tabular-nums w-10 text-right" :class="pctTone(student.score)">{{ Math.round(Number(student.score) / activeExam.max_score * 100) }}%</span>
            <!-- Enter or the down arrow moves to the next learner, the up arrow back, so a whole
                 class can be typed in one go -->
            <input
              :ref="(el) => setInputRef(student.student_id, el)"
              v-model.number="student.score"
              type="number"
              inputmode="decimal"
              min="0"
              :max="activeExam.max_score"
              step="0.5"
              placeholder="–"
              class="w-20 px-2 py-1.5 text-sm text-center font-semibold rounded-lg border bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500"
              :class="scoreState(student.score) === 'over' ? 'border-rose-400' : 'border-gray-300 dark:border-gray-600'"
              @input="dirty = true"
              @keydown.enter.prevent="focusNext(student.student_id)"
              @keydown.down.prevent="focusNext(student.student_id)"
              @keydown.up.prevent="focusPrev(student.student_id)"
            >
          </li>
        </ul>

        <!-- Save bar, always in reach -->
        <div class="fixed bottom-0 inset-x-0 z-30 lg:left-auto lg:right-6 lg:bottom-6 lg:inset-x-auto">
          <div class="mx-auto lg:mx-0 max-w-xl flex items-center gap-3 px-4 py-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-t lg:border border-gray-200 dark:border-gray-700 lg:rounded-2xl shadow-lg">
            <p class="flex-1 text-xs" :class="dirty ? 'text-amber-700 dark:text-amber-300 font-semibold' : 'text-gray-500 dark:text-gray-400'">
              {{ overCount ? `${overCount} mark${overCount === 1 ? ' is' : 's are'} over ${Number(activeExam.max_score)}` : dirty ? 'Unsaved changes' : 'All marks saved' }}
            </p>
            <button type="button" :disabled="savingMarks || !!overCount || !dirty" class="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" @click="saveMarksheet">
              {{ savingMarks ? 'Saving…' : 'Save marks' }}
            </button>
          </div>
        </div>
      </template>
    </template>

    <!-- Mark sheets: this class's physical exams and online assessments in the subject this term -->
    <div v-if="sheetsOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="sheetsOpen = false">
      <div class="w-full sm:max-w-xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl">
        <div class="px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-base font-bold text-gray-900 dark:text-white">Mark sheets</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ classLabel }} · {{ subjectLabel }} · {{ termLabel }} · tick what goes on the sheet</p>
        </div>
        <div class="flex-1 overflow-y-auto px-5 py-3">
          <Skeleton v-if="sheetsLoading" variant="list" :count="4" />
          <EmptyState v-else-if="!combined?.columns.length" compact icon="chart" tone="gray" title="No marks to put on a sheet yet" message="Physical exams and online assessments of this class in this subject and term show here." />
          <template v-else>
            <div class="mb-2 flex items-center gap-3 text-xs">
              <button type="button" class="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="pickAll(true)">Tick all</button>
              <button type="button" class="font-semibold text-gray-500 dark:text-gray-400 hover:underline" @click="pickAll(false)">Clear</button>
              <span class="flex-1"></span>
              <button type="button" class="font-semibold text-gray-600 dark:text-gray-300 hover:underline" @click="pickKind('physical')">Physical only</button>
              <button type="button" class="font-semibold text-gray-600 dark:text-gray-300 hover:underline" @click="pickKind('online')">Online only</button>
            </div>
            <ul class="divide-y divide-gray-100 dark:divide-gray-700 rounded-xl border border-gray-200 dark:border-gray-700">
              <li v-for="c in combined.columns" :key="c.key">
                <label class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40">
                  <input v-model="picked" type="checkbox" :value="c.key" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600">
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-bold" :class="c.kind === 'physical' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'">{{ c.kind === 'physical' ? 'Paper' : 'Online' }}</span>
                  <span class="flex-1 min-w-0 truncate text-sm text-gray-900 dark:text-white">{{ c.title }}</span>
                  <span class="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap tabular-nums">{{ shortDate(c.date) }} · /{{ fmtMarks(c.max) }} · {{ markedIn(c.key) }} marked</span>
                </label>
              </li>
            </ul>
            <p class="mt-2 text-[11px] text-gray-500 dark:text-gray-400">A learner's average is taken over the ticked assessments they have a mark in, each as a percentage, so a test out of 30 and one out of 100 weigh the same. Online marks count once the script is marked.</p>
          </template>
        </div>
        <div class="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex flex-wrap justify-end gap-2">
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="sheetsOpen = false">Close</button>
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" :disabled="!picked.length" @click="downloadSheet('average')">Average mark sheet</button>
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" :disabled="!picked.length" @click="downloadSheet('combined')">Combined mark sheet</button>
        </div>
      </div>
    </div>

    <!-- New exam -->
    <div v-if="showCreateForm" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="showCreateForm = false">
      <form class="w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl p-5" @submit.prevent="submitCreate">
        <h2 class="text-base font-bold text-gray-900 dark:text-white">New physical exam</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">{{ classLabel }} · {{ subjectLabel }} · {{ termLabel }}</p>
        <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Title</label>
        <input v-model="createForm.title" type="text" required placeholder="e.g. Mid-term CAT 1" class="w-full mb-3 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white">
        <div class="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Out of</label>
            <input v-model.number="createForm.max_score" type="number" min="1" step="0.5" required class="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Date sat</label>
            <input v-model="createForm.exam_date" type="date" required class="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white">
          </div>
        </div>
        <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">What kind of work is it?</label>
        <div class="grid grid-cols-3 gap-1.5 mb-1">
          <button v-for="k in KINDS" :key="k.value" type="button" class="px-2 py-2 rounded-xl text-xs font-semibold border transition-colors" :class="createForm.assessment_category === k.value ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'" @click="createForm.assessment_category = k.value">{{ k.label }}</button>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-3">{{ createForm.assessment_category ? "Counts towards each learner's UNEB continuous assessment." : 'A test or exam - it does not count towards UNEB continuous assessment.' }}</p>
        <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 mb-5 cursor-pointer">
          <input v-model="createForm.include_on_report" type="checkbox" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-500">
          Counts on report cards
        </label>
        <div class="flex justify-end gap-2">
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="showCreateForm = false">Cancel</button>
          <button type="submit" :disabled="creating" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">{{ creating ? 'Creating…' : 'Create and enter marks' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, type ComponentPublicInstance } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import PickerDropdown from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { fmtMarks } from '@/utils/marks'
import * as XLSX from 'xlsx'
import { useClassSubjectPicker } from '@/composables/useClassSubjectPicker'
import type { PhysicalExam, PhysicalExamMarksheetStudent } from '@/types/physicalExam'

// The list adds how far the marking has got (PhysicalAssessmentService::listForClassSubject)
type ExamRow = PhysicalExam & { marked_count?: number | null; avg_score?: number | null; class_size?: number | null }

const toast = useToastStore()
const confirmDialog = useConfirmStore()
const { roleBase, termId, classId, subjectId, termOptions, classOptions, subjectOptions, load: loadChoices, rememberChoice } = useClassSubjectPicker('physical-exams')

const canQuery = computed(() => !!(termId.value && classId.value && subjectId.value))
const labelOf = (opts: { value: number; label: string }[], id: number | null) => opts.find(o => o.value === id)?.label ?? ''
const classLabel = computed(() => labelOf(classOptions.value, classId.value))
const subjectLabel = computed(() => labelOf(subjectOptions.value, subjectId.value))
const termLabel = computed(() => labelOf(termOptions.value, termId.value))

const exams = ref<ExamRow[]>([])
const booting = ref(true)
const loading = ref(false)
const error = ref<string | null>(null)

const showCreateForm = ref(false)
const creating = ref(false)
const today = () => new Date().toISOString().slice(0, 10)
const KINDS = [
  { value: '', label: 'Test / exam' },
  { value: 'AOI', label: 'AOI (paper)' },
  { value: 'PROJECT', label: 'Project' }
]
const createForm = ref({ title: '', assessment_category: '', max_score: 100, exam_date: today(), include_on_report: true })

const activeExam = ref<ExamRow | null>(null)
const marksheetStudents = ref<PhysicalExamMarksheetStudent[]>([])
const marksheetLoading = ref(false)
const savingMarks = ref(false)
const dirty = ref(false)
const markSearch = ref('')

const monthOf = (d: string) => new Date(d).toLocaleDateString(undefined, { month: 'short' })
const dayOf = (d: string) => new Date(d).getDate()

const loadExams = async () => {
  if (!canQuery.value) {
    exams.value = []
    return
  }
  rememberChoice()
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(`/api/${roleBase()}/physical-exams`, {
      params: { class_id: classId.value, subject_id: subjectId.value, term_id: termId.value },
    })
    exams.value = res.data.data.exams
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load physical exams'
    exams.value = []
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  createForm.value = { title: '', assessment_category: '', max_score: 100, exam_date: today(), include_on_report: true }
  showCreateForm.value = true
}

const submitCreate = async () => {
  if (!createForm.value.title.trim() || !createForm.value.max_score || !createForm.value.exam_date) {
    toast.error('Title, out of and date are all needed')
    return
  }
  creating.value = true
  try {
    const res = await axios.post(`/api/${roleBase()}/physical-exams`, {
      ...createForm.value,
      class_id: classId.value,
      subject_id: subjectId.value,
      term_id: termId.value,
    })
    showCreateForm.value = false
    await loadExams()
    // Straight on to typing the marks in
    const createdId = res.data?.data?.exam?.id ?? res.data?.data?.id
    const created = exams.value.find(e => e.id === createdId) ?? exams.value.find(e => e.title === createForm.value.title)
    toast.success('Exam created - now type in the marks')
    if (created) openMarksheet(created)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to create physical exam')
  } finally {
    creating.value = false
  }
}

const toggleIncludeOnReport = async (exam: ExamRow) => {
  const next = !exam.include_on_report
  try {
    await axios.put(`/api/${roleBase()}/physical-exams/${exam.id}`, { include_on_report: next })
    exam.include_on_report = next
    toast.success(next ? 'Counts on report cards now' : 'Left off report cards')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to update exam')
  }
}

const removeExam = async (exam: ExamRow) => {
  if (!await confirmDialog.open({ title: 'Delete exam', message: `Delete "${exam.title}"? Its marks are removed and it drops off any report card.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.delete(`/api/${roleBase()}/physical-exams/${exam.id}`)
    toast.success('Physical exam deleted')
    await loadExams()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to delete exam')
  }
}

// ---- Typing in the marks ----
const inputRefs = new Map<number, HTMLInputElement>()
const setInputRef = (id: number, el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLInputElement) inputRefs.set(id, el)
  else inputRefs.delete(id)
}
const shownMarkRows = computed(() => {
  const q = markSearch.value.trim().toLowerCase()
  return marksheetStudents.value.filter(s => !q || `${s.first_name} ${s.last_name} ${s.admission_number}`.toLowerCase().includes(q))
})
const focusPrev = (id: number) => {
  const rows = shownMarkRows.value
  const prev = rows[rows.findIndex(r => r.student_id === id) - 1]
  if (prev) {
    const el = inputRefs.get(prev.student_id)
    el?.focus()
    el?.select()
  }
}
const focusNext = (id: number) => {
  const rows = shownMarkRows.value
  const i = rows.findIndex(r => r.student_id === id)
  const next = rows[i + 1]
  if (next) {
    const el = inputRefs.get(next.student_id)
    el?.focus()
    el?.select()
  }
}
const hasScore = (v: unknown) => v !== null && v !== undefined && v !== ''
const scoreState = (v: unknown) => (hasScore(v) && activeExam.value && Number(v) > Number(activeExam.value.max_score) ? 'over' : 'ok')
const overCount = computed(() => marksheetStudents.value.filter(s => scoreState(s.score) === 'over').length)
const pctTone = (v: unknown) => {
  const pct = activeExam.value ? Number(v) / Number(activeExam.value.max_score) * 100 : 0
  return pct >= 70 ? 'text-emerald-600 dark:text-emerald-300' : pct >= 50 ? 'text-amber-600 dark:text-amber-300' : 'text-rose-600 dark:text-rose-300'
}
const markStats = computed<StatItem[]>(() => {
  const scored = marksheetStudents.value.filter(s => hasScore(s.score)).map(s => Number(s.score))
  const max = Number(activeExam.value?.max_score || 0)
  const avg = scored.length ? scored.reduce((a, b) => a + b, 0) / scored.length : null
  return [
    { label: 'Marked', value: `${scored.length}/${marksheetStudents.value.length}`, tone: 'amber' },
    { label: 'Average', value: avg === null ? '–' : `${Math.round(avg * 10) / 10}`, tone: 'sky', hint: avg === null || !max ? undefined : `${Math.round(avg / max * 100)}%` },
    { label: 'Highest', value: scored.length ? Math.max(...scored) : '–', tone: 'emerald' },
    { label: 'Lowest', value: scored.length ? Math.min(...scored) : '–', tone: 'rose' }
  ]
})

const openMarksheet = async (exam: ExamRow) => {
  activeExam.value = exam
  markSearch.value = ''
  importNote.value = ''
  dirty.value = false
  marksheetLoading.value = true
  try {
    const res = await axios.get(`/api/${roleBase()}/physical-exams/${exam.id}/marksheet`)
    marksheetStudents.value = res.data.data.students
    await nextTick()
    // Start where the marking left off: the first learner without a mark
    const first = marksheetStudents.value.find(s => !hasScore(s.score))
    if (first && window.matchMedia('(pointer: fine)').matches) inputRefs.get(first.student_id)?.focus()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to load marksheet')
    activeExam.value = null
  } finally {
    marksheetLoading.value = false
  }
}

const closeMarksheet = async () => {
  if (dirty.value && !await confirmDialog.open({ title: 'Leave without saving?', message: 'Your unsaved marks will be lost.', confirmLabel: 'Leave', danger: true })) return
  activeExam.value = null
  marksheetStudents.value = []
  dirty.value = false
  await loadExams()
}

const saveMarksheet = async () => {
  if (!activeExam.value || overCount.value) return
  savingMarks.value = true
  try {
    await axios.put(`/api/${roleBase()}/physical-exams/${activeExam.value.id}/marksheet`, {
      scores: marksheetStudents.value.map(s => ({ student_id: s.student_id, score: hasScore(s.score) ? s.score : null })),
    })
    dirty.value = false
    toast.success('Marks saved')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to save marks')
  } finally {
    savingMarks.value = false
  }
}

// ---- Marks in Excel: a template of the class, filled in offline and imported back ----
const safeName = (t: string) => t.replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80)
const importInput = ref<HTMLInputElement | null>(null)
const importNote = ref('')
const TEMPLATE_HEADER = ['No.', 'Student number', 'Learner', 'Mark', 'Ref']

const downloadTemplate = () => {
  const exam = activeExam.value
  if (!exam) return
  const max = Number(exam.max_score)
  const header = [...TEMPLATE_HEADER]
  header[3] = `Mark (/${fmtMarks(max)})`
  const ws = XLSX.utils.aoa_to_sheet([
    [exam.title],
    [`${exam.subject_name} · ${exam.class_name}${exam.stream_name ? ` ${exam.stream_name}` : ''} · out of ${fmtMarks(max)}`],
    ['Type each mark in the Mark column, leave it empty for a learner who did not sit, then import this file back. Do not change the Student number or Ref columns.'],
    [],
    header,
    ...marksheetStudents.value.map((st, i) => [i + 1, st.admission_number || '', niceName(`${st.first_name} ${st.last_name}`), hasScore(st.score) ? Number(st.score) : '', st.student_id])
  ])
  ws['!cols'] = [{ wch: 6 }, { wch: 16 }, { wch: 30 }, { wch: 12 }, { wch: 8 }]
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Marks')
  XLSX.writeFile(wb, `Marks template - ${safeName(`${exam.title} ${exam.class_name}${exam.stream_name ? ` ${exam.stream_name}` : ''}`)}.xlsx`)
}

const norm = (v: unknown) => String(v ?? '').trim().toLowerCase().replace(/\s+/g, ' ')
const importMarks = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !activeExam.value) return
  try {
    const wb = XLSX.read(await file.arrayBuffer(), { type: 'array' })
    const rows = XLSX.utils.sheet_to_json<unknown[]>(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: '' })
    // the header row: the one with a "Mark" column
    const h = rows.findIndex(r => r.some(c => /^mark/i.test(String(c).trim())))
    if (h < 0) {
      toast.error('No "Mark" column in that file. Download the Excel template, fill it in and import it.')
      return
    }
    const head = rows[h].map(c => norm(c))
    const col = (test: (c: string) => boolean) => head.findIndex(test)
    const markCol = col(c => c.startsWith('mark'))
    const refCol = col(c => c === 'ref')
    const numCol = col(c => c.includes('student number') || c.includes('admission') || c === 'reg no' || c === 'reg. no')
    const nameCol = col(c => c === 'learner' || c === 'name' || c.includes('student name'))

    const byId = new Map(marksheetStudents.value.map(st => [st.student_id, st]))
    const byNumber = new Map(marksheetStudents.value.filter(st => st.admission_number).map(st => [norm(st.admission_number), st]))
    const byName = new Map(marksheetStudents.value.map(st => [norm(niceName(`${st.first_name} ${st.last_name}`)), st]))
    let filled = 0, cleared = 0, unmatched = 0, bad = 0
    const max = Number(activeExam.value.max_score)
    for (const r of rows.slice(h + 1)) {
      if (!r.some(c => String(c).trim() !== '')) continue
      const st = (refCol >= 0 && byId.get(Number(r[refCol]))) || (numCol >= 0 && byNumber.get(norm(r[numCol]))) || (nameCol >= 0 && byName.get(norm(r[nameCol]))) || null
      if (!st) { unmatched++; continue }
      const raw = String(r[markCol] ?? '').trim()
      if (raw === '') {
        if (hasScore(st.score)) { st.score = null; cleared++ }
        continue
      }
      const v = Number(raw)
      if (!Number.isFinite(v) || v < 0) { bad++; continue }
      st.score = v
      filled++
      if (v > max) bad++
    }
    dirty.value = filled + cleared > 0
    importNote.value = [
      `${filled} mark${filled === 1 ? '' : 's'} brought in from ${file.name}`,
      cleared ? `${cleared} cleared` : '',
      unmatched ? `${unmatched} row${unmatched === 1 ? '' : 's'} matched no learner in this class` : '',
      bad ? `${bad} need a look (not a number or over ${fmtMarks(max)})` : ''
    ].filter(Boolean).join(' · ') + (filled + cleared ? '. Check them, then Save marks.' : '.')
  } catch {
    toast.error('That file could not be read. Use the Excel template.')
  }
}

// ---- Mark sheets: physical and online together, or each learner's average ----
interface CombinedColumn { key: string; kind: 'physical' | 'online'; title: string; date: string; max: number }
interface Combined { class_label: string; subject_name: string; columns: CombinedColumn[]; students: { student_id: number; name: string; admission_number: string | null; marks: Record<string, number> }[] }
const sheetsOpen = ref(false)
const sheetsLoading = ref(false)
const combined = ref<Combined | null>(null)
const picked = ref<string[]>([])
const shortDate = (d: string) => (d ? new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : '')
const markedIn = (key: string) => (combined.value?.students || []).filter(st => st.marks[key] !== undefined).length
const pickAll = (on: boolean) => { picked.value = on ? (combined.value?.columns || []).map(c => c.key) : [] }
const pickKind = (kind: CombinedColumn['kind']) => { picked.value = (combined.value?.columns || []).filter(c => c.kind === kind).map(c => c.key) }

const openSheets = async () => {
  sheetsOpen.value = true
  sheetsLoading.value = true
  try {
    const res = await axios.get(`/api/${roleBase()}/physical-exams/combined`, { params: { class_id: classId.value, subject_id: subjectId.value, term_id: termId.value } })
    combined.value = res.data.data
    pickAll(true)
  } catch (err: any) {
    combined.value = null
    toast.error(err.response?.data?.message || 'Could not load the marks')
  } finally {
    sheetsLoading.value = false
  }
}

const downloadSheet = (kind: 'combined' | 'average') => {
  const data = combined.value
  if (!data) return
  const cols = data.columns.filter(c => picked.value.includes(c.key))
  const people = data.students.map(st => {
    const pcts = cols.filter(c => st.marks[c.key] !== undefined && c.max > 0).map(c => (st.marks[c.key] / c.max) * 100)
    return { ...st, name: niceName(st.name), counted: pcts.length, avg: pcts.length ? Math.round((pcts.reduce((a, b) => a + b, 0) / pcts.length) * 10) / 10 : null }
  })
  // Position by average (ties share a place); learners with no marks have none
  const ranked = people.filter(x => x.avg !== null).sort((a, b) => b.avg! - a.avg!)
  const position = new Map<number, number>()
  ranked.forEach((x, i) => position.set(x.student_id, i > 0 && ranked[i - 1].avg === x.avg ? position.get(ranked[i - 1].student_id)! : i + 1))
  const avgs = ranked.map(x => x.avg!)
  const classAvg = avgs.length ? Math.round((avgs.reduce((a, b) => a + b, 0) / avgs.length) * 10) / 10 : null
  const title = kind === 'combined' ? 'Combined mark sheet' : 'Average mark sheet'
  const meta = [
    [`${title} - ${data.subject_name} · ${data.class_label} · ${termLabel.value}`],
    [`${cols.length} assessment${cols.length === 1 ? '' : 's'} (${cols.filter(c => c.kind === 'physical').length} on paper, ${cols.filter(c => c.kind === 'online').length} online) · ${people.length} learners · class average ${classAvg === null ? '-' : `${classAvg}%`}`],
    []
  ]
  let header: string[]
  let body: (string | number)[][]
  if (kind === 'combined') {
    header = ['No.', 'Learner', 'Student number', ...cols.map(c => `${c.title} (${c.kind === 'physical' ? 'paper' : 'online'}, ${shortDate(c.date)}) /${fmtMarks(c.max)}`), 'Average %', 'Position']
    body = people.map((x, i) => [i + 1, x.name, x.admission_number || '', ...cols.map(c => (x.marks[c.key] === undefined ? '' : x.marks[c.key])), x.avg === null ? '' : x.avg, position.get(x.student_id) ?? ''])
  } else {
    header = ['No.', 'Learner', 'Student number', 'Assessments with a mark', 'Average %', 'Position']
    body = people.map((x, i) => [i + 1, x.name, x.admission_number || '', `${x.counted} of ${cols.length}`, x.avg === null ? '' : x.avg, position.get(x.student_id) ?? ''])
  }
  const ws = XLSX.utils.aoa_to_sheet([...meta, header, ...body])
  ws['!cols'] = header.map((h, i) => ({ wch: i === 0 ? 6 : i === 1 ? 30 : i === 2 ? 16 : Math.min(28, Math.max(10, Math.ceil(h.length / 2))) }))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, kind === 'combined' ? 'Combined' : 'Average')
  XLSX.writeFile(wb, `${title} - ${safeName(`${data.subject_name} ${data.class_label} ${termLabel.value}`)}.xlsx`)
}

watch([classId, subjectId, termId], loadExams)

onMounted(async () => {
  try {
    await loadChoices()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load classes and subjects'
  } finally {
    booting.value = false
  }
})
</script>
