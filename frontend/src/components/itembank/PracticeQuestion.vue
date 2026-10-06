<template>
  <!-- One question from a written Item Bank paper: the question, the way to answer it (choices,
       true/false, a short answer, or a written answer to compare with the model), and the check.
       Used by the paper reader and wherever a question is placed on an eNote page. With `preview`
       (the teacher) nothing is recorded and the answer key shows straight away. -->
  <div class="practice-question">
    <div class="prose prose-sm dark:prose-invert max-w-none text-gray-900 dark:text-gray-100" v-html="html"></div>

    <!-- Choices -->
    <div v-if="question.answer_type === 'single' || question.answer_type === 'multiple'" class="mt-3 space-y-1.5" role="group" :aria-label="question.answer_type === 'multiple' ? 'Choose all that are right' : 'Choose one'">
      <p v-if="question.answer_type === 'multiple'" class="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Choose all that are right</p>
      <button
        v-for="(opt, i) in question.options"
        :key="i"
        type="button"
        class="w-full flex items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-colors"
        :class="choiceClass(i)"
        :disabled="checked"
        @click="pick(i)"
      >
        <span class="w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center text-[11px] font-bold" :class="isPicked(i) ? 'border-current' : 'border-gray-300 dark:border-gray-600 text-gray-400'">{{ letters[i] }}</span>
        <span class="flex-1">{{ opt }}</span>
        <span v-if="checked && isCorrectOption(i)" class="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
      </button>
    </div>

    <!-- True / false -->
    <div v-else-if="question.answer_type === 'true_false'" class="mt-3 grid grid-cols-2 gap-2">
      <button v-for="v in [true, false]" :key="String(v)" type="button" class="rounded-xl border px-3 py-2.5 text-sm font-semibold" :class="tfClass(v)" :disabled="checked" @click="tf = v">{{ v ? 'True' : 'False' }}</button>
    </div>

    <!-- Short answer -->
    <div v-else-if="question.answer_type === 'short'" class="mt-3">
      <input v-model="text" type="text" maxlength="200" :disabled="checked" placeholder="Your answer" class="w-full px-3 py-2 rounded-xl border text-sm bg-white dark:bg-gray-900 dark:text-white" :class="checked ? (result?.right ? 'border-emerald-400' : 'border-rose-400') : 'border-gray-300 dark:border-gray-600'" @keydown.enter.prevent="check">
    </div>

    <!-- Written -->
    <div v-else-if="question.answer_type === 'written'" class="mt-3">
      <TypedAnswerEditor v-model="text" :readonly="checked" placeholder="Write your answer, then compare it with the model answer" />
    </div>

    <!-- Check / result -->
    <div v-if="question.answer_type !== 'none'" class="mt-3">
      <div v-if="!checked" class="flex items-center gap-2">
        <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" :disabled="!ready || busy" @click="check">
          {{ busy ? 'Checking…' : question.answer_type === 'written' ? 'Show the model answer' : 'Check my answer' }}
        </button>
        <span v-if="question.marks" class="text-xs text-gray-400">{{ question.marks }} mark{{ question.marks === 1 ? '' : 's' }}</span>
      </div>
      <div v-else class="rounded-xl px-3 py-2.5 text-sm" :class="result?.right === true ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-900/25 dark:text-emerald-100' : result?.right === false ? 'bg-rose-50 text-rose-900 dark:bg-rose-900/25 dark:text-rose-100' : 'bg-indigo-50 text-indigo-900 dark:bg-indigo-900/25 dark:text-indigo-100'">
        <p class="font-semibold">{{ result?.right === true ? 'Right!' : result?.right === false ? 'Not quite.' : 'Compare your answer:' }}</p>
        <p v-if="result?.right === false && answerText" class="mt-0.5">The answer: <b>{{ answerText }}</b></p>
        <div v-if="result?.model_answer" class="mt-1 prose prose-sm dark:prose-invert max-w-none" v-html="result.model_answer"></div>
        <button v-if="!preview" type="button" class="mt-1.5 text-xs font-semibold underline" @click="reset">Try again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import { resolveContentAssetUrls } from '@/utils/richContent'
import TypedAnswerEditor from '@/components/assignment/TypedAnswerEditor.vue'

export interface PaperQuestion {
  id: number
  page_number: number
  content: string
  answer_type: 'none' | 'single' | 'multiple' | 'true_false' | 'short' | 'written'
  options: string[]
  marks: number | null
  correct?: unknown
  model_answer?: string | null
}

const props = withDefaults(defineProps<{ question: PaperQuestion; itemId: number; enotePageId?: number | null; preview?: boolean }>(), { enotePageId: null, preview: false })
const emit = defineEmits<{ answered: [right: boolean | null] }>()

const letters = 'ABCDEFGHIJ'
const html = computed(() => resolveContentAssetUrls(props.question.content || '<p class="text-gray-400">(No question written yet)</p>'))
const picked = ref<number[]>([])
const tf = ref<boolean | null>(null)
const text = ref('')
const busy = ref(false)
const checked = ref(false)
const result = ref<{ right: boolean | null; correct: unknown; model_answer: string | null } | null>(null)

watch(() => props.question.id, () => reset())

const isPicked = (i: number) => picked.value.includes(i)
const pick = (i: number) => {
  if (props.question.answer_type === 'single') picked.value = [i]
  else picked.value = isPicked(i) ? picked.value.filter(x => x !== i) : [...picked.value, i]
}
const ready = computed(() => {
  switch (props.question.answer_type) {
    case 'single': case 'multiple': return picked.value.length > 0
    case 'true_false': return tf.value !== null
    case 'written': return text.value.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').trim().length > 0
    default: return text.value.trim().length > 0
  }
})

const correctIndexes = computed<number[]>(() => {
  const c = result.value?.correct
  if (typeof c === 'number') return [c]
  if (Array.isArray(c) && c.every(x => typeof x === 'number')) return c as number[]
  return []
})
const isCorrectOption = (i: number) => correctIndexes.value.includes(i)
const choiceClass = (i: number) => {
  if (!checked.value) return isPicked(i) ? 'border-indigo-400 bg-indigo-50 text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-800 dark:text-gray-100'
  if (isCorrectOption(i)) return 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/25 dark:text-emerald-100'
  if (isPicked(i)) return 'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-900/25 dark:text-rose-100'
  return 'border-gray-200 dark:border-gray-700 text-gray-500'
}
const tfClass = (v: boolean) => {
  if (!checked.value) return tf.value === v ? 'border-indigo-400 bg-indigo-50 text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100' : 'border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
  const right = result.value?.correct === v
  if (right) return 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/25 dark:text-emerald-100'
  if (tf.value === v) return 'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-900/25 dark:text-rose-100'
  return 'border-gray-200 dark:border-gray-700 text-gray-500'
}
const answerText = computed(() => {
  const c = result.value?.correct
  if (props.question.answer_type === 'short' && Array.isArray(c)) return (c as string[])[0] || ''
  if (props.question.answer_type === 'true_false') return c === true ? 'True' : c === false ? 'False' : ''
  return ''
})

const answerValue = () => {
  switch (props.question.answer_type) {
    case 'single': return picked.value[0]
    case 'multiple': return picked.value
    case 'true_false': return tf.value
    default: return text.value
  }
}

const check = async () => {
  if (!ready.value || busy.value) return
  if (props.preview) {
    // The teacher sees how it behaves, against their own answer key, with nothing recorded
    result.value = { right: localCheck(), correct: props.question.correct, model_answer: props.question.model_answer || null }
    checked.value = true
    return
  }
  busy.value = true
  try {
    const res = await axios.post(`/api/student/itembank/${props.itemId}/pages/${props.question.page_number}/answer`, { answer: answerValue(), enote_page_id: props.enotePageId })
    result.value = res.data.data
    checked.value = true
    emit('answered', result.value?.right ?? null)
  } catch {
    result.value = null
  } finally {
    busy.value = false
  }
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/\.+$/, '')
const localCheck = (): boolean | null => {
  const c = props.question.correct
  switch (props.question.answer_type) {
    case 'single': return typeof c === 'number' ? picked.value[0] === c : null
    case 'multiple': return Array.isArray(c) ? [...picked.value].sort().join() === [...(c as number[])].sort().join() : null
    case 'true_false': return typeof c === 'boolean' ? tf.value === c : null
    case 'short': return Array.isArray(c) && c.length ? (c as string[]).map(norm).includes(norm(text.value)) : null
    default: return null
  }
}

function reset() {
  picked.value = []
  tf.value = null
  text.value = ''
  checked.value = false
  result.value = null
}
</script>
