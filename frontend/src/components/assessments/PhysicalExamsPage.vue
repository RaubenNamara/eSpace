<template>
  <!-- Physical exams (teacher, HOD and admin): tests sat on paper - their marks typed in here, and
       whether each counts on report cards. Opens on a class straight away, never blank. -->
  <div class="w-full">
    <!-- ===== The exams of a class and subject ===== -->
    <template v-if="!activeExam">
      <PageHeader title="Physical Exams" description="Tests sat on paper - type in the marks and choose whether each one counts on report cards." icon="pencil" accent="amber">
        <template #actions>
          <button v-if="canQuery" type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 shadow-sm shadow-amber-500/20" @click="openCreate">
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
        <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600" @click="openCreate">Add the first exam</button>
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
              <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ exam.title }}</p>
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
              <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold" :class="exam.marked_count === exam.class_size ? 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700' : 'bg-amber-500 text-white hover:bg-amber-600'" @click="openMarksheet(exam)">
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
        <input v-model="markSearch" type="search" placeholder="Find a learner" class="w-full sm:max-w-xs mb-3 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

        <EmptyState v-if="!marksheetStudents.length" compact icon="users" tone="gray" title="No students in this class" />
        <ul v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 mb-24">
          <li v-for="student in shownMarkRows" :key="student.student_id" class="px-3 sm:px-4 py-2 flex items-center gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(`${student.first_name} ${student.last_name}`) }}</p>
              <p class="text-[11px] text-gray-400">{{ student.admission_number }}</p>
            </div>
            <span v-if="scoreState(student.score) === 'over'" class="text-[11px] font-semibold text-rose-600 dark:text-rose-300">over {{ Number(activeExam.max_score) }}</span>
            <span v-else-if="student.score !== null && student.score !== undefined && (student.score as any) !== ''" class="text-[11px] tabular-nums w-10 text-right" :class="pctTone(student.score)">{{ Math.round(Number(student.score) / activeExam.max_score * 100) }}%</span>
            <!-- Enter moves to the next learner, so a whole class can be typed in one go -->
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
            >
          </li>
        </ul>

        <!-- Save bar, always in reach -->
        <div class="fixed bottom-0 inset-x-0 z-30 lg:left-auto lg:right-6 lg:bottom-6 lg:inset-x-auto">
          <div class="mx-auto lg:mx-0 max-w-xl flex items-center gap-3 px-4 py-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-t lg:border border-gray-200 dark:border-gray-700 lg:rounded-2xl shadow-lg">
            <p class="flex-1 text-xs" :class="dirty ? 'text-amber-700 dark:text-amber-300 font-semibold' : 'text-gray-500 dark:text-gray-400'">
              {{ overCount ? `${overCount} mark${overCount === 1 ? ' is' : 's are'} over ${Number(activeExam.max_score)}` : dirty ? 'Unsaved changes' : 'All marks saved' }}
            </p>
            <button type="button" :disabled="savingMarks || !!overCount || !dirty" class="px-5 py-2 rounded-xl text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50" @click="saveMarksheet">
              {{ savingMarks ? 'Saving…' : 'Save marks' }}
            </button>
          </div>
        </div>
      </template>
    </template>

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
        <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 mb-5 cursor-pointer">
          <input v-model="createForm.include_on_report" type="checkbox" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-500">
          Counts on report cards
        </label>
        <div class="flex justify-end gap-2">
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="showCreateForm = false">Cancel</button>
          <button type="submit" :disabled="creating" class="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50">{{ creating ? 'Creating…' : 'Create and enter marks' }}</button>
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
const createForm = ref({ title: '', max_score: 100, exam_date: today(), include_on_report: true })

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
  createForm.value = { title: '', max_score: 100, exam_date: today(), include_on_report: true }
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
