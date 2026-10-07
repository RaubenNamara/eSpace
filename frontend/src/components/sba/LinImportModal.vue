<template>
  <!-- Bring in learners' LINs and UNEB index numbers from a spreadsheet (CSV or Excel): the columns
       are found by their headings, matched to learners by admission number, previewed, then saved. -->
  <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="emit('close')">
    <div class="w-full sm:max-w-xl bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 max-h-[90vh] overflow-y-auto">
      <h2 class="text-base font-bold text-gray-900 dark:text-white">Import LINs and index numbers</h2>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
        A CSV or Excel sheet with an <b>admission number</b> column and a <b>LIN</b> and/or <b>index number</b> column - the export from SMIS or the UNEB registration list works.
      </p>

      <label class="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 py-6 cursor-pointer hover:border-indigo-400 transition-colors">
        <AppIcon name="upload" class="w-6 h-6 text-indigo-500" />
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ fileName || 'Choose a file' }}</span>
        <span class="text-[11px] text-gray-400">.csv, .xlsx or .xls</span>
        <input type="file" accept=".csv,.xlsx,.xls" class="sr-only" @change="read">
      </label>

      <p v-if="problem" class="mt-3 text-xs font-semibold text-rose-600 dark:text-rose-300">{{ problem }}</p>

      <template v-if="rows.length">
        <p class="mt-4 text-xs text-gray-600 dark:text-gray-300">
          <b>{{ rows.length }}</b> rows · columns found: admission number <b>{{ cols.adm }}</b><template v-if="cols.lin">, LIN <b>{{ cols.lin }}</b></template><template v-if="cols.index">, index number <b>{{ cols.index }}</b></template>
        </p>
        <div class="mt-2 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table class="w-full text-xs">
            <thead class="bg-gray-50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400">
              <tr><th class="text-left px-3 py-1.5">Admission no.</th><th class="text-left px-3 py-1.5">LIN</th><th class="text-left px-3 py-1.5">Index no.</th></tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700 text-gray-800 dark:text-gray-100">
              <tr v-for="(r, i) in rows.slice(0, 6)" :key="i"><td class="px-3 py-1.5">{{ r.admission_number }}</td><td class="px-3 py-1.5">{{ r.lin || '–' }}</td><td class="px-3 py-1.5">{{ r.uneb_index_number || '–' }}</td></tr>
            </tbody>
          </table>
        </div>
        <p v-if="rows.length > 6" class="mt-1 text-[11px] text-gray-400">and {{ rows.length - 6 }} more</p>
      </template>

      <p v-if="result" class="mt-3 text-xs rounded-xl px-3 py-2" :class="result.unknown_count ? 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'">
        {{ result.saved }} learners updated.<template v-if="result.unknown_count"> {{ result.unknown_count }} admission numbers weren't found{{ role === 'hod' ? ' in your department' : '' }}: {{ result.unknown.slice(0, 8).join(', ') }}{{ result.unknown_count > 8 ? '…' : '' }}</template>
      </p>

      <div class="mt-5 flex justify-end gap-2">
        <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="emit('close')">{{ result ? 'Done' : 'Cancel' }}</button>
        <button type="button" :disabled="!rows.length || saving" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" @click="save">{{ saving ? 'Saving…' : `Save ${rows.length || ''}` }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
import AppIcon from '@/components/common/AppIcon.vue'

const props = defineProps<{ role: string }>()
const emit = defineEmits<{ close: []; saved: [] }>()

interface Row { admission_number: string; lin?: string; uneb_index_number?: string }
const fileName = ref('')
const rows = ref<Row[]>([])
const cols = ref<{ adm: string; lin: string; index: string }>({ adm: '', lin: '', index: '' })
const problem = ref('')
const saving = ref(false)
const result = ref<{ saved: number; unknown: string[]; unknown_count: number } | null>(null)

// The heading that best matches, ignoring case and punctuation
const find = (headers: string[], tests: RegExp[]) => headers.find(h => tests.some(t => t.test(h.toLowerCase().replace(/[^a-z0-9]/g, '')))) || ''

const read = async (ev: Event) => {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  problem.value = ''
  result.value = null
  rows.value = []
  if (!file) return
  fileName.value = file.name
  try {
    const book = XLSX.read(await file.arrayBuffer(), { type: 'array' })
    const sheet = book.Sheets[book.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '', raw: false })
    if (!data.length) {
      problem.value = 'The sheet is empty.'
      return
    }
    const headers = Object.keys(data[0])
    const adm = find(headers, [/^adm/, /admission/, /^studentno/, /^regno/])
    const lin = find(headers, [/^lin$/, /learneridentification/, /^linno/, /^linnumber/])
    const index = find(headers, [/index/, /^indexno/, /^unebno/])
    if (!adm) {
      problem.value = `No admission-number column found. The headings were: ${headers.join(', ')}`
      return
    }
    if (!lin && !index) {
      problem.value = 'No LIN or index-number column found.'
      return
    }
    cols.value = { adm, lin, index }
    rows.value = data
      // Only the columns the sheet has, so the other number is left as it is
      .map(r => ({
        admission_number: String(r[adm] ?? '').trim(),
        ...(lin ? { lin: String(r[lin] ?? '').trim() } : {}),
        ...(index ? { uneb_index_number: String(r[index] ?? '').trim() } : {})
      }))
      .filter(r => r.admission_number && (r.lin || r.uneb_index_number))
    if (!rows.value.length) problem.value = 'No rows had both an admission number and a LIN or index number.'
  } catch {
    problem.value = 'That file could not be read. Save it as .xlsx or .csv and try again.'
  }
}

const save = async () => {
  saving.value = true
  try {
    const res = await axios.put(`/api/${props.role}/sba/learner-ids`, { rows: rows.value })
    result.value = res.data.data
    emit('saved')
  } catch (e: any) {
    problem.value = e?.response?.data?.message || 'Saving failed.'
  } finally {
    saving.value = false
  }
}
</script>
