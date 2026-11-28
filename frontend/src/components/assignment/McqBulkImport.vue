<template>
  <!-- Bulk import of multiple-choice questions: paste them (or open a Word / text file), check each
       one, pick its correct answer, then add them all to the assessment at once. Each one can still
       be opened and changed afterwards like any other question. -->
  <Teleport to="body">
    <div class="fixed inset-0 z-[70] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4" @click.self="$emit('close')">
      <div class="w-full sm:max-w-3xl max-h-[92dvh] flex flex-col rounded-t-2xl sm:rounded-2xl bg-white dark:bg-gray-900 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="mcq-import-title">
        <!-- head -->
        <div class="flex items-start gap-3 px-5 pt-4 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div class="min-w-0 flex-1">
            <h2 id="mcq-import-title" class="text-lg font-semibold text-gray-900 dark:text-white">Import multiple-choice questions</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {{ step === 'paste' ? 'Paste your questions or open a file. You will check each one and choose its answer next.' : `${items.length} ${items.length === 1 ? 'question' : 'questions'} found. Choose the correct answer for each, then add them.` }}
            </p>
          </div>
          <button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close" @click="$emit('close')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <!-- step 1: paste or open a file -->
        <div v-if="step === 'paste'" class="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <div class="flex flex-wrap items-center gap-2">
            <label class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0-12l-4 4m4-4l4 4" /></svg>
              Open a file (.docx or .txt)
              <input type="file" accept=".docx,.txt,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document" class="sr-only" @change="openFile">
            </label>
            <span v-if="fileName" class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ fileName }}</span>
            <button type="button" class="ml-auto text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline" @click="text = EXAMPLE">Fill in an example</button>
          </div>
          <textarea
            v-model="text"
            rows="12"
            class="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white font-mono leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            :placeholder="EXAMPLE"
            aria-label="Questions to import"
          ></textarea>
          <p v-if="fileError" class="text-sm text-rose-600 dark:text-rose-400">{{ fileError }}</p>
          <!-- how to write them -->
          <div class="rounded-xl bg-indigo-50/70 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900 px-3.5 py-3 text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <p class="font-semibold text-gray-900 dark:text-white">How to write them</p>
            <p>Number each question (1. or 1) or Q1.), then put its choices on their own lines starting A. B. C. D. (or a) b) c) d)).</p>
            <p>To give the answer, add a line like <span class="font-mono">Answer: B</span> or put a <span class="font-mono">*</span> before the right choice. If you leave it out, you can pick it on the next screen.</p>
            <p>A question with more than one right answer: <span class="font-mono">Answer: A, C</span>, or a <span class="font-mono">*</span> before each right choice. You can also tick "More than one correct answer" on the next screen.</p>
          </div>
        </div>

        <!-- step 2: check each question and choose its answer -->
        <div v-else class="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{{ items.length }} {{ items.length === 1 ? 'question' : 'questions' }} · {{ totalMarks }} {{ totalMarks === 1 ? 'mark' : 'marks' }}</span>
            <span v-if="missingAnswers" class="px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{{ missingAnswers }} still {{ missingAnswers === 1 ? 'needs' : 'need' }} a correct answer</span>
            <span v-else class="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">Every question has its answer</span>
            <label class="ml-auto inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              Marks each
              <input v-model.number="marksEach" type="number" min="1" class="w-16 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" @change="applyMarksEach">
            </label>
          </div>
          <p v-if="totalMarks > marksLeft" class="text-sm text-rose-600 dark:text-rose-400">These come to {{ totalMarks }} marks, but only {{ marksLeft }} are left out of the 100-mark total. Lower the marks or remove some questions.</p>

          <div v-for="(q, qi) in items" :key="q.key" class="rounded-xl border p-3 sm:p-4" :class="q.options.some(o => o.is_correct) ? 'border-gray-200 dark:border-gray-700' : 'border-amber-300 dark:border-amber-700 bg-amber-50/40 dark:bg-amber-900/10'">
            <div class="flex items-start gap-2">
              <span class="mt-2 w-6 flex-shrink-0 text-sm font-semibold text-gray-500 dark:text-gray-400 tabular-nums">{{ qi + 1 }}.</span>
              <textarea v-model="q.question_text" rows="2" class="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" :aria-label="`Question ${qi + 1}`"></textarea>
              <input v-model.number="q.marks" type="number" min="1" class="w-16 mt-0.5 px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" :aria-label="`Marks for question ${qi + 1}`" title="Marks">
              <button type="button" class="mt-0.5 p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20" :aria-label="`Remove question ${qi + 1}`" @click="items.splice(qi, 1)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12M9 7V5h6v2m-7 0l1 12h6l1-12" /></svg>
              </button>
            </div>
            <div class="mt-2 ml-8 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ q.multiple ? 'Tap the letter of every correct answer' : 'Tap the letter of the correct answer' }}</p>
              <label class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                <input type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" :checked="q.multiple" @change="setMultiple(q, ($event.target as HTMLInputElement).checked)">
                More than one correct answer
              </label>
            </div>
            <ul class="mt-1 ml-8 space-y-1.5">
              <li v-for="(o, oi) in q.options" :key="oi" class="flex items-center gap-2">
                <button
                  type="button"
                  class="w-7 h-7 flex-shrink-0 rounded-full text-xs font-semibold border transition-colors"
                  :class="o.is_correct ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-emerald-500'"
                  :aria-pressed="o.is_correct"
                  :aria-label="q.multiple ? `${LETTERS[oi]} is a correct answer to question ${qi + 1}` : `Make ${LETTERS[oi]} the correct answer to question ${qi + 1}`"
                  @click="choose(q, oi)"
                >{{ LETTERS[oi] }}</button>
                <input v-model="o.option_text" type="text" class="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" :class="o.is_correct ? 'border-emerald-400 dark:border-emerald-700' : 'border-gray-300 dark:border-gray-700'" :aria-label="`Choice ${LETTERS[oi]}`">
                <button v-if="q.options.length > 2" type="button" class="p-1 rounded text-gray-400 hover:text-rose-600" :aria-label="`Remove choice ${LETTERS[oi]}`" @click="q.options.splice(oi, 1)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </li>
            </ul>
            <button v-if="q.options.length < 6" type="button" class="mt-1.5 ml-8 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline" @click="q.options.push({ option_text: '', is_correct: false })">+ Add a choice</button>
            <p v-if="q.options.filter(o => o.option_text.trim()).length < 2" class="mt-1 ml-8 text-xs text-rose-600 dark:text-rose-400">A question needs at least two choices.</p>
          </div>
        </div>

        <!-- foot -->
        <div class="flex items-center gap-2 px-5 py-3 border-t border-gray-100 dark:border-gray-800">
          <template v-if="step === 'paste'">
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ preview.length ? `${preview.length} ${preview.length === 1 ? 'question' : 'questions'} found` : 'No questions found yet' }}</span>
            <button type="button" class="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" :disabled="!preview.length" @click="toCheck">Next: check answers</button>
          </template>
          <template v-else>
            <button type="button" class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" @click="step = 'paste'">Back</button>
            <span v-if="blocker" class="text-xs text-amber-700 dark:text-amber-300 truncate">{{ blocker }}</span>
            <button type="button" class="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" :disabled="!!blocker" @click="add">
              Add {{ items.length }} {{ items.length === 1 ? 'question' : 'questions' }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { parseMcqText, type ImportedMcq } from '@/utils/mcqImport'

const props = defineProps<{ marksLeft: number; defaultMarks?: number }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'add', questions: ImportedMcq[]): void }>()

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
const EXAMPLE = `1. What is the SI unit of length?
A. Kilogram
B. Metre
C. Second
D. Ampere
Answer: B

2. Which of these is a vector quantity?
A. Mass
*B. Velocity
C. Time
D. Temperature`

const step = ref<'paste' | 'check'>('paste')
const text = ref('')
const fileName = ref('')
const fileError = ref('')
const marksEach = ref(Math.max(1, props.defaultMarks || 1))
type Item = ImportedMcq & { key: number }
const items = ref<Item[]>([])

const preview = computed(() => parseMcqText(text.value))

// a Word file is read as plain text in the browser; a text file as it is
const openFile = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  fileError.value = ''
  fileName.value = file.name
  try {
    if (/\.docx$/i.test(file.name)) {
      const mammoth = await import('mammoth')
      const { value } = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
      text.value = value
    } else {
      text.value = await file.text()
    }
    if (!parseMcqText(text.value).length) fileError.value = 'No questions were found in that file. Check that each question is numbered and its choices start A. B. C. D.'
  } catch {
    fileError.value = 'That file could not be read. Try saving it as .docx or .txt, or paste the questions instead.'
  }
}

const toCheck = () => {
  items.value = preview.value.map((q, i) => ({ ...q, marks: marksEach.value, key: Date.now() + i }))
  step.value = 'check'
}
const applyMarksEach = () => { items.value.forEach(q => { q.marks = Math.max(1, marksEach.value || 1) }) }
// one correct answer: tapping a letter picks it; several: tapping a letter turns it on or off
const choose = (q: Item, oi: number) => {
  if (q.multiple) q.options[oi].is_correct = !q.options[oi].is_correct
  else q.options.forEach((o, i) => { o.is_correct = i === oi })
}
const setMultiple = (q: Item, on: boolean) => {
  q.multiple = on
  if (!on) {
    // back to one: keep the first one marked
    let kept = false
    q.options.forEach(o => { if (o.is_correct) { if (kept) o.is_correct = false; kept = true } })
  }
}

const totalMarks = computed(() => items.value.reduce((n, q) => n + (Number(q.marks) || 0), 0))
const missingAnswers = computed(() => items.value.filter(q => !q.options.some(o => o.is_correct && o.option_text.trim())).length)
// what still stops them being added
const blocker = computed(() => {
  if (!items.value.length) return 'No questions to add.'
  if (items.value.some(q => !q.question_text.trim())) return 'A question has no text.'
  if (items.value.some(q => q.options.filter(o => o.option_text.trim()).length < 2)) return 'A question needs at least two choices.'
  if (missingAnswers.value) return `Choose the correct answer for ${missingAnswers.value} more ${missingAnswers.value === 1 ? 'question' : 'questions'}.`
  if (items.value.some(q => !q.marks || q.marks < 1)) return 'Every question needs at least 1 mark.'
  if (totalMarks.value > props.marksLeft) return `Only ${props.marksLeft} marks are left out of 100.`
  return ''
})

const add = () => {
  if (blocker.value) return
  emit('add', items.value.map(({ key: _key, ...q }) => ({ ...q, options: q.options.filter(o => o.option_text.trim()) })))
}
</script>
