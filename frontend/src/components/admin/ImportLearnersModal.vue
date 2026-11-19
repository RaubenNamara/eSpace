<template>
  <!-- Import a whole register of learners from a spreadsheet: choose the file, check the
       preview (nothing is saved until then), then print each class's login slips. -->
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="close">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[92vh] flex flex-col" role="dialog" aria-modal="true" aria-labelledby="import-learners-title">
      <div class="px-5 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <div class="min-w-0 flex-1">
          <h2 id="import-learners-title" class="text-lg font-semibold text-gray-900 dark:text-white">Import learners</h2>
          <ol class="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-gray-500 dark:text-gray-400">
            <li v-for="(s, i) in steps" :key="s.key" class="flex items-center gap-2">
              <span v-if="i" aria-hidden="true">›</span>
              <span :class="s.key === step ? 'text-indigo-600 dark:text-indigo-300 font-semibold' : ''">{{ i + 1 }}. {{ s.label }}</span>
            </li>
          </ol>
        </div>
        <button type="button" class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Close" @click="close">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
        <!-- 1. The file and what every learner takes -->
        <template v-if="step === 'upload'">
          <div class="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-4 text-sm text-indigo-900 dark:text-indigo-200">
            <p class="font-semibold">One row per learner. Only the name and the class are needed.</p>
            <ul class="mt-2 space-y-1 list-disc list-inside text-indigo-800 dark:text-indigo-300">
              <li><b class="font-semibold">Name</b>: surname first, as in a register (<i>OKELLO James Peter</i>), or separate <i>Surname</i> and <i>Other names</i> columns.</li>
              <li><b class="font-semibold">Class</b>: S.1 to S.6, with the stream in its own column or in the class (<i>S.1 A</i>, <i>S2 East</i>).</li>
              <li>Optional: <i>Sex</i> (M/F), <i>Admission number</i>, <i>LIN</i>, <i>Subjects</i> (codes or names, separated by commas).</li>
              <li>A learner without an admission number gets one. Their username and first password are their admission number.</li>
            </ul>
            <button type="button" class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:underline" @click="downloadTemplate">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download a template
            </button>
          </div>

          <label
            class="block rounded-xl border-2 border-dashed p-7 text-center cursor-pointer transition-colors"
            :class="dragging ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'"
            @dragover.prevent="dragging = true"
            @dragleave.prevent="dragging = false"
            @drop.prevent="onDrop"
          >
            <input type="file" accept=".xlsx,.xls,.csv" class="sr-only" @change="onFileChange">
            <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <p class="mt-2 text-sm text-gray-700 dark:text-gray-200"><span class="font-semibold text-indigo-600 dark:text-indigo-300">Choose the register</span> or drop it here</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Excel (.xlsx, .xls) or CSV - the first sheet is read</p>
            <p v-if="fileName" class="mt-2 text-xs text-gray-600 dark:text-gray-300">{{ fileName }}</p>
          </label>
          <p v-if="parseError" class="text-sm text-red-600 dark:text-red-400" role="alert">{{ parseError }}</p>

          <section>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Subjects every learner takes</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Each learner is enrolled in these for {{ options?.academic_year || 'this year' }}, plus any in their row's Subjects column.
              Enrolled learners see their subjects' notes and work, and appear on their class's login slips.
            </p>
            <div v-if="!options" class="mt-3 text-sm text-gray-500">Loading subjects…</div>
            <div v-else-if="!options.subjects.length" class="mt-3 text-sm text-amber-700 dark:text-amber-300">This school has no subjects yet - add the departments first, or import now and enrol later.</div>
            <div v-else class="mt-3 grid sm:grid-cols-2 gap-3">
              <div v-for="lv in levels" :key="lv" class="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ lv }} <span class="font-normal text-gray-500 dark:text-gray-400">({{ lv === 'O Level' ? 'S.1-S.4' : 'S.5-S.6' }})</span></p>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ picked[lv].length }} ticked</span>
                </div>
                <div class="mt-2 max-h-40 overflow-y-auto pr-1 grid grid-cols-1 gap-1">
                  <label v-for="s in options.subjects" :key="s.id" class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                    <input v-model="picked[lv]" type="checkbox" :value="s.id" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500">
                    <span class="truncate">{{ s.name }}</span>
                    <span v-if="s.code !== s.name" class="text-xs text-gray-400">{{ s.code }}</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <label class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
            <input v-model="createClasses" type="checkbox" class="mt-0.5 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500">
            <span>Create classes and streams that are not in Tusome yet <span class="text-gray-500 dark:text-gray-400">(S.1 to S.6 only)</span></span>
          </label>
        </template>

        <!-- 2. What will happen, row by row -->
        <template v-else-if="step === 'preview' && preview">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 p-3">
              <p class="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 tabular-nums">{{ preview.summary.valid }}</p>
              <p class="text-xs text-indigo-800 dark:text-indigo-300">ready to import</p>
            </div>
            <button type="button" class="text-left rounded-xl p-3 transition-colors" :class="preview.summary.failed ? 'bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50' : 'bg-gray-50 dark:bg-gray-900/40'" :disabled="!preview.summary.failed" @click="onlyProblems = !onlyProblems">
              <p class="text-2xl font-semibold tabular-nums" :class="preview.summary.failed ? 'text-red-700 dark:text-red-300' : 'text-gray-400'">{{ preview.summary.failed }}</p>
              <p class="text-xs" :class="preview.summary.failed ? 'text-red-800 dark:text-red-300' : 'text-gray-500'">{{ preview.summary.failed ? (onlyProblems ? 'showing only these' : 'need fixing - show') : 'problems' }}</p>
            </button>
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3">
              <p class="text-2xl font-semibold text-gray-800 dark:text-gray-100 tabular-nums">{{ preview.summary.new_classes.length }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">new class{{ preview.summary.new_classes.length === 1 ? '' : 'es' }}</p>
            </div>
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3">
              <p class="text-2xl font-semibold text-gray-800 dark:text-gray-100 tabular-nums">{{ preview.summary.numbers_made }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">admission numbers made</p>
            </div>
          </div>

          <p v-if="preview.summary.new_classes.length" class="text-sm text-gray-700 dark:text-gray-200">
            New classes to create: <b class="font-semibold">{{ preview.summary.new_classes.join(', ') }}</b>
          </p>
          <p v-if="preview.summary.genders_guessed" class="text-sm text-gray-600 dark:text-gray-300">
            {{ preview.summary.genders_guessed }} learner{{ preview.summary.genders_guessed === 1 ? ' has' : 's have' }} no sex in the file - guessed from the first name (marked *). Check them on the Students page afterwards.
          </p>
          <p v-if="preview.summary.failed" class="text-sm text-gray-600 dark:text-gray-300">
            Rows in red are left out. Import the rest now and fix those later, or correct the file and choose it again.
          </p>

          <div class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-auto max-h-[46vh]">
            <table class="min-w-full text-sm">
              <thead class="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10 text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <tr>
                  <th class="px-3 py-2 font-semibold">Row</th>
                  <th class="px-3 py-2 font-semibold">Learner</th>
                  <th class="px-3 py-2 font-semibold">Class</th>
                  <th class="px-3 py-2 font-semibold">Sex</th>
                  <th class="px-3 py-2 font-semibold">Admission no. / login</th>
                  <th class="px-3 py-2 font-semibold">Check</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                <tr v-for="r in shownRows" :key="r.row" :class="r.status === 'failed' ? 'bg-red-50/70 dark:bg-red-900/20' : ''">
                  <td class="px-3 py-1.5 text-gray-400 tabular-nums">{{ r.row }}</td>
                  <td class="px-3 py-1.5 text-gray-900 dark:text-white">{{ r.name || '-' }}</td>
                  <td class="px-3 py-1.5 text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    {{ r.class || '-' }}
                    <span v-if="r.new_class && r.status === 'valid'" class="ml-1 text-[10px] font-semibold uppercase rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-1.5 py-0.5">new</span>
                  </td>
                  <td class="px-3 py-1.5 text-gray-700 dark:text-gray-200">{{ r.gender === 'female' ? 'F' : r.gender === 'male' ? 'M' : '-' }}<span v-if="r.gender_guessed" class="text-amber-600" title="Guessed from the first name">*</span></td>
                  <td class="px-3 py-1.5 text-gray-700 dark:text-gray-200 tabular-nums">
                    {{ r.admission_number || '-' }}
                    <span v-if="r.number_made" class="text-xs text-gray-400">(made)</span>
                  </td>
                  <td class="px-3 py-1.5">
                    <span v-if="r.status === 'valid'" class="text-gray-500 dark:text-gray-400">OK</span>
                    <span v-else class="text-red-700 dark:text-red-300">{{ (r.errors || []).join('; ') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- 3. Done: hand out the logins -->
        <template v-else-if="step === 'done' && done">
          <div class="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
            <p class="text-base font-semibold text-green-800 dark:text-green-300">{{ done.summary.imported }} learners imported</p>
            <p class="text-sm text-green-800/90 dark:text-green-300/90 mt-0.5">
              {{ done.summary.enrolments }} subject enrolments made<span v-if="done.summary.new_classes.length">, {{ done.summary.new_classes.length }} new class{{ done.summary.new_classes.length === 1 ? '' : 'es' }} created</span><span v-if="done.summary.failed">; {{ done.summary.failed }} row{{ done.summary.failed === 1 ? '' : 's' }} left out</span>.
            </p>
          </div>

          <section>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Next: give each class its logins</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Print a class's slips, cut them out and hand them round. A learner's first password is their admission number.</p>
            <ul class="mt-3 divide-y divide-gray-100 dark:divide-gray-700 rounded-xl border border-gray-200 dark:border-gray-700">
              <li v-for="c in done.classes" :key="c.class_id" class="flex items-center gap-3 px-3 py-2">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ c.class }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ c.learners }} new learner{{ c.learners === 1 ? '' : 's' }}
                    <span v-if="c.without_subjects" class="text-amber-700 dark:text-amber-300"> · {{ c.without_subjects }} without subjects (not on the slips until enrolled)</span>
                  </p>
                </div>
                <a :href="`/slips?class_id=${c.class_id}`" target="_blank" rel="noopener" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-semibold border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">Print slips</a>
              </li>
            </ul>
          </section>
        </template>
      </div>

      <div class="px-5 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-end gap-2">
        <template v-if="step === 'upload'">
          <button type="button" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="close">Cancel</button>
          <button type="button" class="btn-primary" :disabled="!rows.length || busy" @click="runPreview">{{ busy ? 'Checking…' : rows.length ? `Check ${rows.length} learners` : 'Choose a file first' }}</button>
        </template>
        <template v-else-if="step === 'preview'">
          <button type="button" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" :disabled="busy" @click="step = 'upload'">Back</button>
          <button type="button" class="btn-primary" :disabled="!preview?.summary.valid || busy" @click="confirmImport">{{ busy ? 'Importing…' : `Import ${preview?.summary.valid || 0} learners` }}</button>
        </template>
        <button v-else type="button" class="btn-primary" @click="close">Done</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import * as XLSX from 'xlsx'
import apiService from '@/services/api'
import { useToastStore } from '@/stores/toast'

const emit = defineEmits<{ close: []; imported: [] }>()
const toast = useToastStore()

type Level = 'O Level' | 'A Level'
const levels: Level[] = ['O Level', 'A Level']
const steps = [
  { key: 'upload', label: 'Choose the file' },
  { key: 'preview', label: 'Check' },
  { key: 'done', label: 'Print logins' },
] as const

interface Options {
  subjects: { id: number; code: string; name: string }[]
  defaults: Record<Level, number[]>
  academic_year: string | null
}
interface RowResult {
  row: number
  name: string
  class: string
  new_class: boolean
  gender: string
  gender_guessed: boolean
  admission_number: string
  number_made?: boolean
  status: 'valid' | 'failed'
  errors?: string[]
}
interface Summary {
  total: number; valid: number; failed: number; new_classes: string[]; numbers_made: number; genders_guessed: number
  imported?: number; enrolments?: number
}

const step = ref<'upload' | 'preview' | 'done'>('upload')
const options = ref<Options | null>(null)
const picked = reactive<Record<Level, number[]>>({ 'O Level': [], 'A Level': [] })
const createClasses = ref(true)
const rows = ref<Record<string, unknown>[]>([])
const fileName = ref('')
const parseError = ref('')
const dragging = ref(false)
const busy = ref(false)
const preview = ref<{ summary: Summary; results: RowResult[] } | null>(null)
const done = ref<{ summary: Required<Summary>; classes: { class_id: number; class: string; learners: number; without_subjects: number }[] } | null>(null)
const onlyProblems = ref(false)

const shownRows = computed(() => {
  const all = preview.value?.results ?? []
  return onlyProblems.value ? all.filter(r => r.status === 'failed') : all
})

const close = () => { if (!busy.value) emit('close') }

onMounted(async () => {
  try {
    const res = await apiService.get('/admin/students/import/options')
    options.value = res.data.data
    picked['O Level'] = [...(options.value?.defaults['O Level'] ?? [])]
    picked['A Level'] = [...(options.value?.defaults['A Level'] ?? [])]
  } catch {
    options.value = { subjects: [], defaults: { 'O Level': [], 'A Level': [] }, academic_year: null }
  }
})

const downloadTemplate = () => {
  const ws = XLSX.utils.aoa_to_sheet([
    ['Name', 'Class', 'Stream', 'Sex', 'Admission number', 'LIN', 'Subjects'],
    ['OKELLO James Peter', 'S.1', 'A', 'M', '', '', ''],
    ['NAMUGGA Sarah', 'S.1', 'B', 'F', 'SM/2026/014', '', ''],
    ['MUKASA Brian', 'S.5', 'A', 'M', '', '', 'ECON, ENT'],
  ])
  ws['!cols'] = [{ wch: 26 }, { wch: 8 }, { wch: 8 }, { wch: 5 }, { wch: 18 }, { wch: 14 }, { wch: 22 }]
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Learners')
  XLSX.writeFile(wb, 'learners_template.xlsx')
}

// "Admission No." -> admission_no, "Other Names" -> other_names, "S/N" etc. are ignored by the server
const normalizeKey = (k: string) => k.toString().trim().toLowerCase().replace(/[.#]/g, '').replace(/[\s\-/]+/g, '_').replace(/_+$/, '')
const ALIASES: Record<string, string> = {
  admission: 'admission_number', admission_no: 'admission_number', adm: 'admission_number', adm_number: 'admission_number',
  reg_number: 'reg_no', registration_number: 'reg_no', registration_no: 'reg_no',
  names: 'name', student: 'name', learner_name: 'name', learners_name: 'name', students_name: 'name',
  gender: 'sex', other_name: 'other_names', othernames: 'other_names', first_names: 'other_names',
  last_name: 'surname', class_stream: 'class', subject: 'subjects', subject_combination: 'subjects', combination: 'subjects',
}

const onDrop = (e: DragEvent) => {
  dragging.value = false
  const f = e.dataTransfer?.files?.[0]
  if (f) readFile(f)
}
const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const f = input.files?.[0]
  if (f) readFile(f)
  input.value = ''
}

async function readFile(file: File) {
  parseError.value = ''
  rows.value = []
  fileName.value = file.name
  if (!/\.(xlsx|xls|csv)$/i.test(file.name)) {
    parseError.value = 'Choose an Excel (.xlsx, .xls) or CSV file.'
    return
  }
  try {
    const wb = XLSX.read(await file.arrayBuffer(), { type: 'array' })
    const sheet = wb.Sheets[wb.SheetNames[0]]
    const grid = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: '', raw: false, blankrows: false })
    // the header is the first row that names a learner column (registers often start with a title)
    const isHeader = (r: unknown[]) => r.some(c => ['name', 'names', 'surname', 'class', 'student', 'learner', 'learner_name', 'students_name', 'other_names'].includes(normalizeKey(String(c))))
    const h = grid.findIndex(isHeader)
    if (h < 0) {
      parseError.value = 'No header row found - the sheet needs a Name (or Surname) column and a Class column. Download the template to see one.'
      return
    }
    const keys = (grid[h] as unknown[]).map(c => { const k = normalizeKey(String(c)); return ALIASES[k] ?? k })
    const out: Record<string, unknown>[] = []
    grid.slice(h + 1).forEach((r, i) => {
      const o: Record<string, unknown> = { _row: h + i + 2 }
      let any = false
      keys.forEach((k, j) => {
        if (!k) return
        const v = String((r as unknown[])[j] ?? '').trim()
        if (v !== '') { o[k] = v; any = true }
      })
      if (any && (o.name || o.surname || o.other_names || o.first_name)) out.push(o)
    })
    if (!out.length) {
      parseError.value = 'The sheet has a header but no learners under it.'
      return
    }
    rows.value = out
  } catch {
    parseError.value = 'This file could not be read. Save it again as .xlsx and try once more.'
  }
}

const payload = (confirm: boolean) => ({
  rows: rows.value,
  confirm,
  create_classes: createClasses.value,
  subjects: { 'O Level': picked['O Level'], 'A Level': picked['A Level'] },
})

async function runPreview() {
  busy.value = true
  parseError.value = ''
  try {
    const res = await apiService.post('/admin/students/import', payload(false))
    preview.value = res.data.data
    onlyProblems.value = false
    step.value = 'preview'
  } catch (e: any) {
    parseError.value = e?.response?.data?.message || 'The file could not be checked.'
  } finally {
    busy.value = false
  }
}

async function confirmImport() {
  busy.value = true
  try {
    const res = await apiService.post('/admin/students/import', payload(true))
    done.value = res.data.data
    step.value = 'done'
    emit('imported')
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'The import failed - nothing was saved.')
  } finally {
    busy.value = false
  }
}
</script>
