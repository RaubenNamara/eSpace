<template>
  <div class="marking-panel">
    <div class="marking-panel__release-header">
      <span class="marking-panel__eyebrow">Release feedback</span>
      <span
        class="marking-panel__visibility-badge"
        :class="status === 'returned' ? 'marking-panel__visibility-badge--visible' : 'marking-panel__visibility-badge--hidden'"
      >
        {{ status === 'returned' ? 'Visible to learner' : 'Not yet visible' }}
      </span>
    </div>

    <h3 class="marking-panel__title">{{ allPractical ? 'Scores' : 'Score and comment' }}</h3>

    <div class="marking-panel__questions">
      <div v-for="(question, index) in questions" :key="question.id" class="marking-panel__question">
        <p v-if="curriculumLabel(question)" class="marking-panel__curriculum-label">{{ curriculumLabel(question) }}</p>
        <!-- An ICT practical is scored beside the work (Open and mark); here it only shows -->
        <template v-if="isPractical(question)">
          <div class="marking-panel__question-header">
            <span>Q{{ index + 1 }} <span class="marking-panel__max">/ {{ fmtMarks(questionMax(question)) }}</span></span>
            <strong class="marking-panel__practical-score">{{ practicalScore(question) === null ? '-' : fmtMarks(practicalScore(question)!) }}</strong>
          </div>
          <p v-if="feedbackInput[question.id]" class="marking-panel__practical-comment">{{ feedbackInput[question.id] }}</p>
          <p class="marking-panel__practical-note">{{ practicalScore(question) === null ? 'Not scored yet - use Open and mark on the work.' : 'Scored in Open and mark.' }}</p>
        </template>
        <template v-else>
        <div class="marking-panel__question-header">
          <span>Q{{ index + 1 }} <span class="marking-panel__max">/ {{ fmtMarks(questionMax(question)) }}</span></span>
          <input
            type="number"
            min="0"
            :max="questionMax(question)"
            step="0.5"
            :value="marksInput[question.id]"
            :disabled="locked"
            class="marking-panel__marks-input"
            @input="onMarksInput(question.id, ($event.target as HTMLInputElement).value)"
          >
        </div>
        <textarea
          v-model="feedbackInput[question.id]"
          :disabled="locked"
          class="marking-panel__question-feedback"
          rows="2"
          placeholder="Feedback for this question..."
          @input="onQuestionFeedbackInput(question.id)"
        ></textarea>
        <CommentChips v-if="!locked" :current="feedbackInput[question.id] || ''" @insert="t => addComment(question.id, t)" />
        </template>
      </div>
    </div>

    <div class="marking-panel__summary">
      <div><span>Total</span><strong>{{ fmtMarks(summary.marks_awarded) }} / {{ fmtMarks(summary.total_marks) }}</strong></div>
      <div><span>Percentage</span><strong>{{ summary.percentage }}%</strong></div>
      <div><span>Grade</span><strong>{{ summary.grade }}</strong></div>
    </div>

    <h3 class="marking-panel__title">General Feedback</h3>
    <textarea
      v-model="generalFeedback"
      :disabled="locked"
      class="marking-panel__general-feedback"
      rows="2"
      placeholder="Overall feedback for the student..."
      @input="onGeneralFeedbackInput"
    ></textarea>
    <CommentChips v-if="!locked" :current="generalFeedback" :show="2" @insert="addGeneralComment" />
    <div v-if="saveStatus" class="marking-panel__status">{{ saveStatus }}</div>

    <div class="marking-panel__actions">
      <span class="marking-panel__status-badge" :class="`marking-panel__status-badge--${status}`">{{ formatStatus(status) }}</span>

      <button
        v-if="status !== 'returned'"
        class="marking-panel__btn marking-panel__btn--success"
        :disabled="finishing"
        @click="finishAndReturn"
      >
        {{ finishing ? 'Saving…' : 'Finish & return to student' }}
      </button>
      <button v-else class="marking-panel__btn marking-panel__btn--secondary" @click="reopen">
        Reopen Submission
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fmtMarks } from '@/utils/marks'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import type { AssignmentQuestion } from '@/types'
import { computeGradeSummary } from '@/utils/grading'
import { useToastStore } from '@/stores/toast'
import CommentChips from './CommentChips.vue'
import { QUESTION_MARKED, type QuestionMarked } from '@/components/practical/apps'
import { onBeforeUnmount } from 'vue'

const toast = useToastStore()

// ICT practicals (Word, Excel, PowerPoint, Access) are scored in their viewer, not here
const isPractical = (q: any) => !!q?.practical_app
const practicalScore = (q: any): number | null => {
  const v = marksInput.value[q.id]
  return v === null || v === undefined || Number.isNaN(Number(v)) ? null : Number(v)
}
const allPractical = computed(() => props.questions.length > 0 && props.questions.every(isPractical))

interface MarkableQuestion extends AssignmentQuestion {
  question_mark?: { marks_awarded: number | null; feedback?: string } | null
  // Read-only curriculum context (see Teacher\MarkingController::getSubmissionForMarking()) -
  // absent for any question not linked to LOA/AOI/EOC curriculum data.
  curriculum_theme_branch?: string | null
  curriculum_topic_name?: string | null
  curriculum_learning_outcome_text?: string | null
}

interface Props {
  questions: MarkableQuestion[]
  assignmentId: number
  submissionId: number
  status: string
  totalMarks: number
  initialFeedback?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialFeedback: '',
})

const emit = defineEmits<{
  (e: 'status-changed', status: string): void
}>()

const API_BASE = '/api'

const marksInput = ref<Record<number, number | null>>({})
const feedbackInput = ref<Record<number, string>>({})
const generalFeedback = ref(props.initialFeedback)
const saveStatus = ref('')

const locked = computed(() => props.status === 'returned')

props.questions.forEach(q => {
  const awarded = q.question_mark?.marks_awarded
  marksInput.value[q.id] = awarded === null || awarded === undefined ? null : Number(awarded)
  feedbackInput.value[q.id] = q.question_mark?.feedback || ''
})

// a practical marked in its viewer (TeacherMarkingCanvas)
const onPracticalMarked = (e: Event) => {
  const d = (e as CustomEvent<QuestionMarked>).detail
  if (d.submissionId !== Number(props.submissionId)) return
  marksInput.value[d.questionId] = d.marks
  feedbackInput.value[d.questionId] = d.feedback
}
window.addEventListener(QUESTION_MARKED, onPracticalMarked)
onBeforeUnmount(() => window.removeEventListener(QUESTION_MARKED, onPracticalMarked))

// Purely informational, never read by the grading/marking logic itself (section 24: labels only).
function curriculumLabel(question: MarkableQuestion): string {
  const parts: string[] = []
  if (question.curriculum_theme_branch) parts.push(`Theme: ${question.curriculum_theme_branch}`)
  if (question.curriculum_topic_name) parts.push(`Topic: ${question.curriculum_topic_name}`)
  if (question.curriculum_learning_outcome_text) parts.push(`LO: ${question.curriculum_learning_outcome_text}`)
  return parts.join(' · ')
}

function questionMax(question: MarkableQuestion): number {
  if (question.question_type === 'scenario' && (question as any).sub_questions?.length) {
    return (question as any).sub_questions.reduce((sum: number, sq: any) => sum + Number(sq.marks || 0), 0)
  }
  return question.marks
}

const summary = computed(() => {
  const awarded = Object.values(marksInput.value).reduce((sum: number, m) => sum + (Number(m) || 0), 0)
  return computeGradeSummary(awarded, props.totalMarks)
})

function formatStatus(status: string): string {
  const map: Record<string, string> = {
    submitted: 'Submitted',
    marking: 'Marking',
    graded: 'Marked',
    returned: 'Returned'
  }
  return map[status] || status
}

let marksTimeout: number | null = null

function onMarksInput(questionId: number, value: string) {
  marksInput.value[questionId] = value === '' ? null : Number(value)
  scheduleMarksSave(questionId)
}

function onQuestionFeedbackInput(questionId: number) {
  scheduleMarksSave(questionId)
}

// A comment from the bank goes on the end of what's already written
const joinComment = (current: string, text: string) => (current.trim() ? `${current.trim()} ${text}` : text)
function addComment(questionId: number, text: string) {
  feedbackInput.value[questionId] = joinComment(feedbackInput.value[questionId] || '', text)
  scheduleMarksSave(questionId)
}
function addGeneralComment(text: string) {
  generalFeedback.value = joinComment(generalFeedback.value, text)
  onGeneralFeedbackInput()
}

const pendingMarks = new Set<number>()

/** save every question with unsaved marks or feedback */
async function saveMarksNow(): Promise<boolean> {
  if (marksTimeout) { clearTimeout(marksTimeout); marksTimeout = null }
  const ids = [...pendingMarks]
  pendingMarks.clear()
  if (!ids.length) return true
  saveStatus.value = 'Saving…'
  try {
    for (const questionId of ids) {
      await axios.put(`${API_BASE}/teacher/assignments/${props.assignmentId}/submissions/${props.submissionId}/marks`, {
        question_id: questionId,
        marks_awarded: marksInput.value[questionId],
        feedback: feedbackInput.value[questionId]
      })
    }
    saveStatus.value = 'Saved'
    return true
  } catch {
    ids.forEach(id => pendingMarks.add(id))
    saveStatus.value = 'Save failed'
    return false
  }
}

function scheduleMarksSave(questionId: number) {
  saveStatus.value = 'Unsaved changes'
  pendingMarks.add(questionId)
  if (marksTimeout) clearTimeout(marksTimeout)
  marksTimeout = window.setTimeout(() => { saveMarksNow() }, 1500)
}

let feedbackTimeout: number | null = null

let feedbackPending = false

async function saveGeneralFeedbackNow(): Promise<boolean> {
  if (feedbackTimeout) { clearTimeout(feedbackTimeout); feedbackTimeout = null }
  if (!feedbackPending) return true
  feedbackPending = false
  saveStatus.value = 'Saving…'
  try {
    await axios.put(`${API_BASE}/teacher/assignments/${props.assignmentId}/submissions/${props.submissionId}/general-feedback`, {
      feedback: generalFeedback.value
    })
    saveStatus.value = 'Saved'
    return true
  } catch {
    feedbackPending = true
    saveStatus.value = 'Save failed'
    return false
  }
}

function onGeneralFeedbackInput() {
  saveStatus.value = 'Unsaved changes'
  feedbackPending = true
  if (feedbackTimeout) clearTimeout(feedbackTimeout)
  feedbackTimeout = window.setTimeout(() => { saveGeneralFeedbackNow() }, 1500)
}

/**
 * The one button: save anything still waiting, complete the marking, and give the script back
 * to the learner (what "Complete Marking" then "Return to Student" used to do).
 */
const finishing = ref(false)
async function finishAndReturn() {
  if (finishing.value) return
  finishing.value = true
  try {
    if (!(await saveMarksNow()) || !(await saveGeneralFeedbackNow())) {
      toast.error('Some marks could not be saved. Check your connection and try again.')
      return
    }
    if (props.status !== 'graded') {
      await axios.post(`${API_BASE}/teacher/assignments/${props.assignmentId}/submissions/${props.submissionId}/complete-marking`)
      emit('status-changed', 'graded')
    }
    await axios.post(`${API_BASE}/teacher/assignments/${props.assignmentId}/submissions/${props.submissionId}/return`)
    emit('status-changed', 'returned')
    toast.success('Marking finished - the learner can now see their script')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not finish the marking')
  } finally {
    finishing.value = false
  }
}

async function reopen() {
  try {
    await axios.post(`${API_BASE}/teacher/assignments/${props.assignmentId}/submissions/${props.submissionId}/reopen`)
    emit('status-changed', 'submitted')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to reopen submission')
  }
}

watch(() => props.initialFeedback, (val) => {
  generalFeedback.value = val
})
</script>

<style scoped>
.marking-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: white;
  border-left: 1px solid #e5e7eb;
  height: 100%;
  overflow-y: auto;
}

.dark .marking-panel {
  background-color: #1f2937;
  border-color: #374151;
}

@media (max-width: 1023px) {
  .marking-panel {
    border-left: none;
    border-top: 1px solid #e5e7eb;
    height: auto;
  }

  .dark .marking-panel {
    border-color: #374151;
  }
}

.marking-panel__release-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.marking-panel__eyebrow {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6366f1;
}

.dark .marking-panel__eyebrow {
  color: #a5b4fc;
}

.marking-panel__visibility-badge {
  padding: 2px 10px;
  font-size: 11px;
  font-weight: 500;
  border-radius: 999px;
  white-space: nowrap;
}

.marking-panel__visibility-badge--visible {
  background-color: #d1fae5;
  color: #065f46;
}

.marking-panel__visibility-badge--hidden {
  background-color: #f3f4f6;
  color: #6b7280;
}

.dark .marking-panel__visibility-badge--hidden {
  background-color: #374151;
  color: #9ca3af;
}

.marking-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.dark .marking-panel__title {
  color: #f3f4f6;
}

.marking-panel__questions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.marking-panel__question {
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.dark .marking-panel__question {
  border-color: #374151;
}

.marking-panel__curriculum-label {
  font-size: 11px;
  font-weight: 600;
  color: #6366f1;
  margin: 0 0 4px;
}

.dark .marking-panel__curriculum-label {
  color: #a5b4fc;
}

.marking-panel__question-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #374151;
  margin-bottom: 6px;
}

.dark .marking-panel__question-header {
  color: #d1d5db;
}

.marking-panel__max {
  color: #9ca3af;
}

/* an ICT practical: its score shown, given in Open and mark */
.marking-panel__practical-score {
  min-width: 64px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}
.dark .marking-panel__practical-score {
  color: #f9fafb;
}
.marking-panel__practical-comment {
  margin-top: 4px;
  font-size: 13px;
  color: #374151;
  white-space: pre-line;
  word-break: break-word;
}
.dark .marking-panel__practical-comment {
  color: #d1d5db;
}
.marking-panel__practical-note {
  margin-top: 4px;
  font-size: 11px;
  color: #6b7280;
}

.marking-panel__marks-input {
  width: 64px;
  min-height: 36px;
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  text-align: right;
}

.marking-panel__question-feedback,
.marking-panel__general-feedback {
  width: 100%;
  padding: 6px 8px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  resize: vertical;
}

.marking-panel__summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 10px;
  background-color: #f9fafb;
  border-radius: 8px;
  font-size: 12px;
  text-align: center;
}

.dark .marking-panel__summary {
  background-color: #111827;
}

.marking-panel__summary strong {
  display: block;
  font-size: 15px;
  margin-top: 2px;
}

.marking-panel__status {
  font-size: 12px;
  color: #6b7280;
}

.marking-panel__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.dark .marking-panel__actions {
  border-color: #374151;
}

.marking-panel__status-badge {
  align-self: flex-start;
  padding: 2px 10px;
  font-size: 12px;
  border-radius: 999px;
  background-color: #e5e7eb;
  color: #374151;
}

.marking-panel__status-badge--marking {
  background-color: #fef3c7;
  color: #92400e;
}

.marking-panel__status-badge--graded {
  background-color: #dbeafe;
  color: #1e40af;
}

.marking-panel__status-badge--returned {
  background-color: #d1fae5;
  color: #065f46;
}

.marking-panel__btn {
  width: 100%;
  min-height: 44px;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}

.marking-panel__btn--primary {
  background-color: #6366f1;
  color: white;
  border-color: #6366f1;
}

.marking-panel__btn--success {
  background-color: #16a34a;
  color: white;
  border-color: #16a34a;
}

.marking-panel__btn--success:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.marking-panel__btn--secondary {
  background-color: white;
  color: #374151;
}
</style>
