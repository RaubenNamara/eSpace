<template>
  <div>
    <PageHeader
      title="Bulk subject enrolment"
      description="Enrol whole lists of students in a subject from a spreadsheet - one sheet per subject, with each student's name and stream."
      icon="users"
      accent="indigo"
    />

    <!-- 1. The file, the class and the year -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-[1fr_12rem_12rem] gap-3 items-end">
        <div>
          <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Spreadsheet (Excel or CSV)</label>
          <label class="flex items-center gap-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 px-4 py-3 cursor-pointer hover:border-indigo-400">
            <AppIcon name="upload" class="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
            <span class="text-sm text-gray-700 dark:text-gray-200 truncate">{{ fileName || 'Choose the file…' }}</span>
            <input type="file" accept=".xlsx,.xls,.csv" class="hidden" @change="onFile">
          </label>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Class</label>
          <select v-model="level" class="w-full py-2.5 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
            <option value="" disabled>Choose…</option>
            <option v-for="l in options?.levels || []" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Academic year</label>
          <select v-model.number="yearId" class="w-full py-2.5 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
            <option v-for="y in options?.academic_years || []" :key="y.id" :value="y.id">{{ y.name }}{{ y.is_current ? ' (current)' : '' }}</option>
          </select>
        </div>
      </div>
      <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Each sheet needs a NAME column and a STREAM column (A, B, … or East, West …). Titles, room labels and blank rows are skipped. Nothing is saved until you check the names and press Enrol.</p>
    </section>

    <!-- 2. The sheets -->
    <section v-if="sheets.length" class="mb-4">
      <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Sheets in the file</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        <article
          v-for="sh in sheets"
          :key="sh.name"
          class="rounded-2xl border bg-white dark:bg-gray-800 p-4"
          :class="active?.name === sh.name ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-gray-200 dark:border-gray-700'"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="font-bold text-gray-900 dark:text-white truncate">{{ sh.name }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ sh.rows.length }} student{{ sh.rows.length === 1 ? '' : 's' }}<template v-if="!sh.rows.length"> - no NAME column found</template></p>
            </div>
            <span v-if="sh.result" class="flex-shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">Done</span>
          </div>
          <div class="mt-3 space-y-1.5">
            <div v-for="(_d, i) in sh.departmentIds" :key="i" class="flex items-center gap-1.5">
              <select v-model.number="sh.departmentIds[i]" class="flex-1 min-w-0 py-1.5 pl-2.5 pr-7 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white" :aria-label="`Subject for ${sh.name}`">
                <option :value="0">Choose the subject…</option>
                <option v-for="dep in options?.departments || []" :key="dep.id" :value="dep.id">{{ dep.name }}</option>
              </select>
              <button v-if="sh.departmentIds.length > 1" type="button" class="p-1 rounded-md text-gray-400 hover:text-rose-600" aria-label="Remove this subject" @click="sh.departmentIds.splice(i, 1)">✕</button>
            </div>
            <button type="button" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="sh.departmentIds.push(0)">+ Another subject for this sheet</button>
          </div>
          <p v-if="sh.result" class="mt-2 text-xs text-gray-600 dark:text-gray-300">
            <template v-for="(r, i) in sh.result" :key="r.department_id">{{ i ? ' · ' : '' }}{{ r.department }}: {{ r.enrolled }} enrolled, {{ r.already }} already in</template>
          </p>
          <button
            type="button"
            class="mt-3 w-full btn-primary !py-2 !text-sm"
            :disabled="!sh.rows.length || !sh.departmentIds.some(Boolean) || !level || !yearId || checking"
            @click="check(sh)"
          >{{ checking && active?.name === sh.name ? 'Checking names…' : sh.result ? 'Check again' : 'Check the names' }}</button>
        </article>
      </div>
    </section>

    <!-- 3. The names, checked -->
    <section v-if="active && matched" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
      <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h2 class="text-base font-bold text-gray-900 dark:text-white">{{ active.name }} → {{ subjectNames(active) }}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ level }} · {{ yearName }} · {{ matched.class_size }} students in {{ level }}</p>
        </div>
        <button type="button" class="btn-primary" :disabled="!toEnrol.length || saving" @click="commit">
          {{ saving ? 'Enrolling…' : `Enrol ${toEnrol.length} student${toEnrol.length === 1 ? '' : 's'}` }}
        </button>
      </div>

      <StatStrip v-model="filter" :items="statItems" />

      <div class="mt-3 divide-y divide-gray-100 dark:divide-gray-700 border-t border-gray-100 dark:border-gray-700">
        <div v-for="r in shownRows" :key="r.idx" class="py-2 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
          <div class="sm:w-[40%] min-w-0 flex items-center gap-2">
            <span class="w-8 flex-shrink-0 text-[11px] text-gray-400 tabular-nums">{{ r.row }}</span>
            <span class="text-sm text-gray-900 dark:text-white truncate">{{ r.name }}</span>
            <span v-if="r.stream" class="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ r.stream }}</span>
          </div>
          <div class="flex-1 min-w-0 flex items-center gap-2">
            <span class="text-gray-300 hidden sm:inline">→</span>
            <!-- a confident match -->
            <template v-if="r.status === 'matched' || r.status === 'repeat'">
              <span class="text-sm text-gray-800 dark:text-gray-100 truncate">{{ niceName(r.student!.name) }}</span>
              <span class="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ r.student!.stream }} · {{ r.student!.admission_number }}</span>
            </template>
            <!-- not sure, or not found: the admin picks -->
            <select v-else v-model.number="picks[r.idx]" class="flex-1 min-w-0 py-1.5 pl-2.5 pr-7 rounded-lg border text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" :class="picks[r.idx] ? 'border-emerald-400' : 'border-amber-400'">
              <option :value="0">{{ r.candidates.length ? 'Choose the right student - or leave out' : 'No one like this in ' + level + ' - left out' }}</option>
              <option v-for="c in r.candidates" :key="c.id" :value="c.id">{{ niceName(c.name) }} · {{ c.stream }} · {{ c.admission_number }}</option>
            </select>
            <span class="ml-auto flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap" :class="STATUS[rowState(r)].cls">{{ STATUS[rowState(r)].label }}</span>
          </div>
        </div>
        <p v-if="!shownRows.length" class="py-6 text-sm text-center text-gray-500 dark:text-gray-400">Nothing here.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { parseRoster, type RosterRow } from '@/utils/sheetRoster'

interface Options {
  levels: string[]
  departments: { id: number; name: string; code: string }[]
  academic_years: { id: number; name: string; is_current: boolean }[]
}
interface Sheet { name: string; rows: RosterRow[]; departmentIds: number[]; result: { department_id: number; department: string; enrolled: number; already: number }[] | null }
interface Cand { id: number; name: string; admission_number: string; stream: string; score: number }
interface MatchRow {
  idx: number
  row: number
  name: string
  stream: string
  status: 'matched' | 'check' | 'not_found' | 'repeat'
  student: { id: number; name: string; admission_number: string; stream: string } | null
  candidates: Cand[]
}

const toast = useToastStore()
const confirmDialog = useConfirmStore()
const options = ref<Options | null>(null)
const level = ref('')
const yearId = ref(0)
const yearName = computed(() => options.value?.academic_years.find(y => y.id === yearId.value)?.name || '')

onMounted(async () => {
  try {
    const res = await axios.get('/api/admin/bulk-enrol/options')
    options.value = res.data.data
    yearId.value = options.value!.academic_years.find(y => y.is_current)?.id || options.value!.academic_years[0]?.id || 0
  } catch {
    toast.error('Could not load the classes and subjects')
  }
})

// ---------------------------------------------------------------- reading the file
const fileName = ref('')
const sheets = ref<Sheet[]>([])
const letters = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, '')
// "F.A" -> F/ART, "T.D" -> T.D, "LUG" -> LUG: the sheet name's letters starting a subject's name or code
function guessSubject(sheet: string): number {
  const key = letters(sheet)
  if (key.length < 2) return 0
  const deps = options.value?.departments || []
  const exact = deps.find(d => letters(d.name) === key || letters(d.code).replace(/\d+$/, '') === key)
  if (exact) return exact.id
  const prefix = deps.filter(d => letters(d.name).startsWith(key))
  return prefix.length === 1 ? prefix[0].id : 0
}
async function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  fileName.value = file.name
  active.value = null
  matched.value = null
  try {
    const XLSX = await import('xlsx')
    const wb = XLSX.read(await file.arrayBuffer(), { type: 'array' })
    sheets.value = wb.SheetNames.map(name => {
      const grid = XLSX.utils.sheet_to_json<unknown[]>(wb.Sheets[name], { header: 1, blankrows: false, defval: null })
      return { name, rows: parseRoster(grid).rows, departmentIds: [guessSubject(name)], result: null }
    })
    // "S.1 SITTING PLANS.xlsx" -> class S.1
    const m = /S\.?\s*(\d)/i.exec(file.name)
    const guess = m ? `S.${m[1]}` : ''
    if (guess && options.value?.levels.includes(guess)) level.value = guess
  } catch {
    toast.error('Could not read that file - is it an Excel or CSV file?')
    sheets.value = []
  }
}

// ---------------------------------------------------------------- checking a sheet
const active = ref<Sheet | null>(null)
const matched = ref<{ rows: MatchRow[]; enrolled: Record<string, number[]>; class_size: number } | null>(null)
const picks = ref<Record<number, number>>({})
const checking = ref(false)
const subjectIds = (sh: Sheet) => [...new Set(sh.departmentIds.filter(Boolean))]
const subjectNames = (sh: Sheet) => subjectIds(sh).map(id => options.value?.departments.find(d => d.id === id)?.name).join(' + ')

async function check(sh: Sheet) {
  checking.value = true
  active.value = sh
  matched.value = null
  picks.value = {}
  filter.value = null
  try {
    const res = await axios.post('/api/admin/bulk-enrol/match', { level: level.value, academic_year_id: yearId.value, department_ids: subjectIds(sh), rows: sh.rows })
    const data = res.data.data
    matched.value = { ...data, rows: data.rows.map((r: Omit<MatchRow, 'idx'>, idx: number) => ({ ...r, idx })) }
    // rows to choose for start on "choose / leave out"
    picks.value = Object.fromEntries(matched.value!.rows.filter(r => r.status === 'check' || r.status === 'not_found').map(r => [r.idx, 0]))
  } catch (e: any) {
    const errors = e.response?.data?.errors
    toast.error((errors && Object.values(errors)[0]) || e.response?.data?.message || 'Could not check the names')
    active.value = null
  } finally {
    checking.value = false
  }
}

// Who each row ends up as, and whether they still need the subject(s)
const studentOf = (r: MatchRow) => (r.status === 'matched' ? r.student!.id : r.status === 'repeat' ? 0 : picks.value[r.idx] || 0)
const alreadyIn = (id: number) => {
  const have = matched.value?.enrolled[String(id)] || []
  return active.value ? subjectIds(active.value).every(d => have.includes(d)) : false
}
type State = 'enrol' | 'already' | 'choose' | 'missing' | 'repeat' | 'twice'
const rowState = (r: MatchRow): State => {
  if (r.status === 'repeat') return 'repeat'
  const id = studentOf(r)
  if (!id) return r.candidates.length ? 'choose' : 'missing'
  if (pickedTwice.value.has(r.idx)) return 'twice'
  return alreadyIn(id) ? 'already' : 'enrol'
}
// A student picked for a row who is also another row's match: only counted once
const pickedTwice = computed(() => {
  const seen = new Map<number, number>()
  const twice = new Set<number>()
  for (const r of matched.value?.rows || []) {
    const id = r.status === 'matched' ? r.student!.id : r.status === 'repeat' ? 0 : picks.value[r.idx] || 0
    if (!id) continue
    if (seen.has(id)) twice.add(r.idx)
    else seen.set(id, r.idx)
  }
  return twice
})
const STATUS: Record<State, { label: string; cls: string }> = {
  enrol: { label: 'Will enrol', cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' },
  already: { label: 'Already in', cls: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
  choose: { label: 'Check name', cls: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200' },
  missing: { label: 'Not found', cls: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' },
  repeat: { label: 'Twice on sheet', cls: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400' },
  twice: { label: 'Already picked', cls: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400' }
}

const filter = ref<string | null>(null)
const counts = computed(() => {
  const c: Record<State, number> = { enrol: 0, already: 0, choose: 0, missing: 0, repeat: 0, twice: 0 }
  for (const r of matched.value?.rows || []) c[rowState(r)]++
  return c
})
const statItems = computed<StatItem[]>(() => [
  { key: 'enrol', label: 'will be enrolled', value: counts.value.enrol, tone: 'emerald' },
  { key: 'already', label: 'already in the subject', value: counts.value.already, tone: 'gray' },
  { key: 'choose', label: 'names to check', value: counts.value.choose, tone: 'amber' },
  { key: 'missing', label: 'not found', value: counts.value.missing, tone: 'rose' },
  { key: 'repeat', label: 'listed twice', value: counts.value.repeat + counts.value.twice, tone: 'gray' }
])
const shownRows = computed(() => {
  const rows = matched.value?.rows || []
  const f = filter.value
  if (!f) {
    // names needing a look first
    const order: Record<State, number> = { choose: 0, missing: 1, enrol: 2, already: 3, repeat: 4, twice: 5 }
    return [...rows].sort((a, b) => order[rowState(a)] - order[rowState(b)] || a.idx - b.idx)
  }
  return rows.filter(r => (f === 'repeat' ? ['repeat', 'twice'].includes(rowState(r)) : rowState(r) === f))
})
const toEnrol = computed(() => (matched.value?.rows || []).filter(r => rowState(r) === 'enrol').map(studentOf))

// ---------------------------------------------------------------- enrolling
const saving = ref(false)
async function commit() {
  const sh = active.value
  if (!sh || !toEnrol.value.length) return
  const unresolved = counts.value.choose
  if (unresolved && !(await confirmDialog.open({
    title: 'Some names are not checked',
    message: `${unresolved} name${unresolved === 1 ? ' still needs' : 's still need'} you to choose the right student. Enrol the ${toEnrol.value.length} you have now, and leave ${unresolved === 1 ? 'that one' : 'those'} out?`,
    confirmLabel: 'Enrol them'
  }))) return
  saving.value = true
  try {
    const res = await axios.post('/api/admin/bulk-enrol/commit', { academic_year_id: yearId.value, department_ids: subjectIds(sh), student_ids: toEnrol.value })
    sh.result = res.data.data.results
    const added = sh.result!.reduce((n, r) => n + r.enrolled, 0)
    toast.success(`${added} enrolment${added === 1 ? '' : 's'} added to ${subjectNames(sh)}`)
    await check(sh)
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not enrol the students')
  } finally {
    saving.value = false
  }
}
</script>
