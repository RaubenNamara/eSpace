<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Import Teachers</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-6">
        <!-- Step: Upload -->
        <div v-if="step === 'upload'" class="space-y-5">
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-300">
            <p class="font-medium mb-1">How it works</p>
            <ol class="list-decimal list-inside space-y-1">
              <li>Download the template and fill in one row per teacher.</li>
              <li>Only <strong>first_name</strong>, <strong>last_name</strong> and <strong>department</strong> are required — everything else is optional.</li>
              <li>Department must match an existing department name (case-insensitive).</li>
              <li>Username, password and employee number are generated automatically.</li>
            </ol>
          </div>

          <div>
            <button
              @click="downloadTemplate"
              class="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors inline-flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download Excel Template
            </button>
          </div>

          <div
            class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
            @dragover.prevent
            @drop.prevent="onDrop"
          >
            <svg class="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Drag and drop your filled .xlsx or .xls file here, or</p>
            <label class="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
              Choose File
              <input type="file" accept=".xlsx,.xls" class="hidden" @change="onFileChange">
            </label>
            <p v-if="fileName" class="mt-3 text-sm text-gray-700 dark:text-gray-300">Selected: {{ fileName }}</p>
          </div>

          <p v-if="parseError" class="text-sm text-red-600 dark:text-red-400">{{ parseError }}</p>

          <div v-if="parsing" class="text-center text-sm text-gray-500 dark:text-gray-400">
            <div class="inline-block animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent align-middle mr-2"></div>
            Reading file...
          </div>
        </div>

        <!-- Step: Preview -->
        <div v-else-if="step === 'preview'" class="space-y-4">
          <div class="flex items-center gap-4 text-sm">
            <span class="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-medium">
              {{ validCount }} valid
            </span>
            <span class="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 font-medium">
              {{ invalidCount }} with errors
            </span>
            <span class="text-gray-500 dark:text-gray-400">{{ previewResults.length }} rows total</span>
          </div>

          <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden overflow-x-auto max-h-96 overflow-y-auto">
            <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              <thead class="bg-gray-50 dark:bg-gray-900 sticky top-0">
                <tr>
                  <th class="px-4 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Row</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Name</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Department</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Username</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Status / Error</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                <tr v-for="r in previewResults" :key="r.row">
                  <td class="px-4 py-2 text-gray-500 dark:text-gray-400">{{ r.row }}</td>
                  <td class="px-4 py-2 text-gray-900 dark:text-white">{{ r.first_name }} {{ r.last_name }}</td>
                  <td class="px-4 py-2 text-gray-600 dark:text-gray-300">{{ r.department }}</td>
                  <td class="px-4 py-2 text-gray-600 dark:text-gray-300">{{ r.username || '-' }}</td>
                  <td class="px-4 py-2">
                    <span v-if="r.status === 'valid'" class="text-green-700 dark:text-green-400">Ready to import</span>
                    <span v-else class="text-red-600 dark:text-red-400">{{ (r.errors || []).join('; ') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p v-if="validCount === 0" class="text-sm text-red-600 dark:text-red-400">
            No valid rows to import. Fix the errors above and re-upload.
          </p>
        </div>

        <!-- Step: Results -->
        <div v-else-if="step === 'results'" class="space-y-4">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Import Complete</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ summary?.success || 0 }} teachers imported successfully
              <span v-if="summary?.failed"> · {{ summary.failed }} teachers failed</span>
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <button
              v-if="credentials.length"
              @click="downloadCredentials"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Download Credentials
            </button>
            <button
              v-if="failedResults.length"
              @click="downloadErrorReport"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Download Error Report
            </button>
          </div>

          <div v-if="failedResults.length" class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden overflow-x-auto max-h-72 overflow-y-auto">
            <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              <thead class="bg-gray-50 dark:bg-gray-900 sticky top-0">
                <tr>
                  <th class="px-4 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Row</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Name</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Department</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Error</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                <tr v-for="r in failedResults" :key="r.row">
                  <td class="px-4 py-2 text-gray-500 dark:text-gray-400">{{ r.row }}</td>
                  <td class="px-4 py-2 text-gray-900 dark:text-white">{{ r.first_name }} {{ r.last_name }}</td>
                  <td class="px-4 py-2 text-gray-600 dark:text-gray-300">{{ r.department }}</td>
                  <td class="px-4 py-2 text-red-600 dark:text-red-400">{{ (r.errors || []).join('; ') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
        <button
          v-if="step === 'upload'"
          type="button"
          @click="close"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>

        <template v-if="step === 'preview'">
          <button
            type="button"
            @click="step = 'upload'; resetFile()"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Back
          </button>
          <button
            type="button"
            :disabled="validCount === 0 || importing"
            @click="confirmImport"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {{ importing ? 'Importing...' : `Confirm Import (${validCount})` }}
          </button>
        </template>

        <button
          v-if="step === 'results'"
          type="button"
          @click="close"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'
import apiService from '@/services/api'

const emit = defineEmits<{ close: []; imported: [] }>()

const TEMPLATE_HEADERS = [
  'first_name', 'last_name', 'department', 'email', 'phone', 'gender',
  'date_of_birth', 'qualification', 'specialization', 'hire_date', 'address'
]

type ImportRow = Record<string, string> & { _row: number }
type RowResult = {
  row: number
  first_name: string
  last_name: string
  department: string
  username?: string
  temporary_password?: string
  status: 'valid' | 'failed' | 'success'
  errors?: string[]
  id?: number
}

const step = ref<'upload' | 'preview' | 'results'>('upload')
const fileName = ref('')
const parsing = ref(false)
const importing = ref(false)
const parseError = ref('')

const parsedRows = ref<ImportRow[]>([])
const previewResults = ref<RowResult[]>([])
const summary = ref<{ total: number; success: number; failed: number } | null>(null)
const finalResults = ref<RowResult[]>([])
const credentials = ref<any[]>([])

const validCount = computed(() => previewResults.value.filter(r => r.status === 'valid').length)
const invalidCount = computed(() => previewResults.value.filter(r => r.status === 'failed').length)
const failedResults = computed(() => finalResults.value.filter(r => r.status === 'failed'))

const close = () => emit('close')

const resetFile = () => {
  fileName.value = ''
  parsedRows.value = []
  previewResults.value = []
  parseError.value = ''
}

const downloadTemplate = () => {
  const wsData = [
    TEMPLATE_HEADERS,
    ['Rauben', 'Namara', 'ICT', 'rauben.namara@example.com', '0700000000', 'male', '1990-05-14', 'BSc Computer Science', 'Networking', '2024-01-15', 'Kampala, Uganda'],
    ['John', 'Doe', 'Mathematics', '', '', '', '', '', '', '', '']
  ]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Teachers')
  XLSX.writeFile(wb, 'teacher_import_template.xlsx')
}

const normalizeKey = (key: string) => key.toString().trim().toLowerCase().replace(/[\s-]+/g, '_')

const onDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files?.[0]
  if (file) processFile(file)
}

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) processFile(file)
}

const processFile = async (file: File) => {
  parseError.value = ''
  if (!/\.(xlsx|xls)$/i.test(file.name)) {
    parseError.value = 'Please upload a .xlsx or .xls file'
    return
  }

  fileName.value = file.name
  parsing.value = true
  try {
    const buffer = await file.arrayBuffer()
    const wb = XLSX.read(buffer, { type: 'array', cellDates: true })
    const sheet = wb.Sheets[wb.SheetNames[0]]
    const raw = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: '', raw: false, dateNF: 'yyyy-mm-dd' })

    const rows: ImportRow[] = raw.map((r, idx) => {
      const norm: any = { _row: idx + 2 }
      for (const key of Object.keys(r)) {
        const value = r[key]
        norm[normalizeKey(key)] = typeof value === 'string' ? value.trim() : value
      }
      return norm
    }).filter(r => (r.first_name || r.last_name || r.department))

    if (rows.length === 0) {
      parseError.value = 'No teacher rows found in this file. Make sure it uses the template columns.'
      parsing.value = false
      return
    }

    parsedRows.value = rows
    await runPreview()
  } catch (err: any) {
    console.error('Failed to parse Excel file:', err)
    parseError.value = 'Could not read this file. Please make sure it is a valid Excel file.'
  } finally {
    parsing.value = false
  }
}

const runPreview = async () => {
  try {
    const response = await apiService.post('/admin/teachers/import', { rows: parsedRows.value, confirm: false })
    if (response.data.success) {
      previewResults.value = response.data.data.results
      step.value = 'preview'
    } else {
      parseError.value = response.data.message || 'Failed to validate rows'
    }
  } catch (error: any) {
    console.error('Failed to preview import:', error)
    parseError.value = error.response?.data?.message || 'Failed to validate rows'
  }
}

const confirmImport = async () => {
  importing.value = true
  try {
    const response = await apiService.post('/admin/teachers/import', { rows: parsedRows.value, confirm: true })
    if (response.data.success) {
      summary.value = response.data.data.summary
      finalResults.value = response.data.data.results
      credentials.value = response.data.data.credentials
      step.value = 'results'
      emit('imported')
    } else {
      alert(response.data.message || 'Import failed')
    }
  } catch (error: any) {
    console.error('Failed to import teachers:', error)
    alert(error.response?.data?.message || 'Import failed')
  } finally {
    importing.value = false
  }
}

const downloadWorkbook = (headers: string[], rows: any[][], filename: string, sheetName: string) => {
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  XLSX.writeFile(wb, filename)
}

const downloadCredentials = () => {
  const headers = ['employee_number', 'first_name', 'last_name', 'department', 'username', 'temporary_password', 'email']
  const rows = credentials.value.map(c => headers.map(h => c[h] ?? ''))
  downloadWorkbook(headers, rows, `teacher_credentials_${Date.now()}.xlsx`, 'Credentials')
}

const downloadErrorReport = () => {
  const headers = ['row', 'first_name', 'last_name', 'department', 'error']
  const rows = failedResults.value.map(r => [r.row, r.first_name, r.last_name, r.department, (r.errors || []).join('; ')])
  downloadWorkbook(headers, rows, `teacher_import_errors_${Date.now()}.xlsx`, 'Errors')
}
</script>
