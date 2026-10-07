<template>
  <!-- UNEB school-based assessment: for a subject and class, how ready every learner's continuous
       assessment is - their AOIs (online and on paper), the evidence kept, their LIN - and the
       export to take to UNEB. Teachers, HODs and the admin share it; each sees their own subjects. -->
  <div class="w-full">
    <PageHeader title="UNEB assessment" description="Every learner's Activities of Integration, evidence and continuous-assessment score, ready before the UNEB deadline." icon="clipboard" :active-filters="stream ? 1 : 0">
      <template #actions>
        <button v-if="options?.can_edit_ids" type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="showImport = true">
          <AppIcon name="upload" class="w-4 h-4" />Import LINs
        </button>
        <button v-if="options?.can_edit_settings" type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="openSettings">
          <AppIcon name="wrench" class="w-4 h-4" />Settings
        </button>
        <button type="button" :disabled="!data || !data.learners.length || exporting" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" @click="exportCsv">
          <AppIcon name="download" class="w-4 h-4" />{{ exporting ? 'Preparing…' : 'Export' }}
        </button>
      </template>
      <template #filters>
        <select v-model.number="subjectId" class="px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white">
          <option :value="0" disabled>Subject</option>
          <option v-for="s in options?.subjects || []" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
        <select v-model="level" class="px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white">
          <option v-for="l in options?.levels || []" :key="l.name" :value="l.name">{{ l.name }}</option>
        </select>
        <select v-model.number="stream" class="px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white">
          <option :value="0">All streams</option>
          <option v-for="s in streams" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </template>
    </PageHeader>

    <EmptyState v-if="options && !options.subjects.length" card icon="clipboard" tone="gray" title="No subjects to show" message="Subjects in your department appear here." />
    <EmptyState v-else-if="!subjectId" card icon="clipboard" tone="indigo" title="Choose a subject" message="Pick a subject and class above to see how ready each learner's continuous assessment is." />

    <template v-else>
      <div v-if="loading && !data" class="space-y-4">
        <div class="h-40 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div class="h-72 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>

      <template v-else-if="data">
        <!-- Readiness -->
        <section class="mb-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
          <div class="flex flex-col md:flex-row md:items-center gap-5">
            <div class="flex items-center gap-4">
              <div class="relative w-24 h-24 flex-shrink-0">
                <svg class="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" class="stroke-indigo-50 dark:stroke-gray-700" />
                  <circle v-if="readyPercent > 0" cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" stroke-linecap="round" class="stroke-indigo-600 dark:stroke-indigo-400" :stroke-dasharray="`${readyPercent * 0.974} 97.4`" />
                </svg>
                <span class="absolute inset-0 flex flex-col items-center justify-center leading-none">
                  <span class="text-xl font-extrabold tabular-nums text-gray-900 dark:text-white">{{ readyPercent }}%</span>
                  <span class="text-[9px] font-semibold uppercase tracking-wide text-gray-400 mt-0.5">ready</span>
                </span>
              </div>
              <div class="min-w-0">
                <h2 class="text-base font-bold text-gray-900 dark:text-white">{{ data.subject.name }} · {{ data.level }}{{ streamName ? ` ${streamName.replace(data.level, '').trim()}` : '' }}</h2>
                <p class="text-sm text-gray-600 dark:text-gray-300"><b class="text-gray-900 dark:text-white">{{ data.summary.ready }}</b> of {{ data.summary.learners }} learners ready to submit</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {{ data.summary.aoi_items }} {{ data.summary.aoi_items === 1 ? 'AOI' : 'AOIs' }}<template v-if="data.summary.project_items"> and {{ data.summary.project_items }} project{{ data.summary.project_items === 1 ? '' : 's' }}</template> set so far · CA out of {{ outOf }}
                </p>
                <p v-if="deadline" class="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold" :class="deadline.days < 0 ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' : deadline.days <= 14 ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200' : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200'">
                  <AppIcon name="clock" class="w-3.5 h-3.5" />{{ deadline.label }}
                </p>
              </div>
            </div>
            <div class="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button v-for="c in checks" :key="c.key" type="button" class="text-left rounded-xl border px-3 py-2.5 transition-colors" :class="show === c.key ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-600' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'" @click="show = show === c.key ? 'all' : c.key">
                <p class="text-xl font-extrabold tabular-nums" :class="c.value ? c.tone : 'text-emerald-600 dark:text-emerald-400'">{{ c.value }}</p>
                <p class="text-[11px] font-semibold text-gray-600 dark:text-gray-300 leading-tight">{{ c.label }}</p>
              </button>
            </div>
          </div>
          <p v-if="!data.summary.aoi_items" class="mt-4 text-xs rounded-xl px-3 py-2 bg-amber-50 text-amber-800 dark:bg-amber-900/25 dark:text-amber-200">
            No AOI has been set in {{ data.subject.name }} for this class yet. Tag an assessment as <b>AOI</b> when you create it, or record a paper AOI under
            <RouterLink :to="`/${role}/physical-exams`" class="font-bold underline">Physical Exams</RouterLink>.
          </p>
        </section>

        <!-- The learners -->
        <DataTable
          :columns="columns"
          :rows="shown"
          row-key="id"
          :search-keys="['name', 'admission_number', 'lin']"
          search-placeholder="Search a learner, admission number or LIN"
          :page-size="50"
          row-clickable
          :loading="loading"
          empty-title="No learners here"
          :empty-message="show === 'all' ? 'No learners are enrolled in this class for the subject.' : 'Nobody matches this check - good news.'"
          @row-click="open"
        >
          <template #toolbar>
            <span v-if="show !== 'all'" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200">
              {{ checks.find(c => c.key === show)?.label }}
              <button type="button" class="text-indigo-400 hover:text-indigo-700" @click="show = 'all'">×</button>
            </span>
          </template>
          <template #cell-name="{ row }">
            <span class="block font-semibold text-gray-900 dark:text-white">{{ niceName(row.name) }}</span>
            <span class="block text-[11px] text-gray-500 dark:text-gray-400">{{ row.stream }} · {{ row.admission_number }}</span>
          </template>
          <template #cell-lin="{ row }">
            <input
              v-if="options?.can_edit_ids"
              :value="row.lin || ''"
              type="text"
              placeholder="Add LIN"
              class="w-32 px-2 py-1 text-xs font-mono rounded-lg border bg-white dark:bg-gray-800 dark:text-white"
              :class="row.lin ? 'border-gray-200 dark:border-gray-600' : 'border-rose-300 dark:border-rose-700 placeholder:text-rose-400'"
              @click.stop
              @change="saveLin(row, ($event.target as HTMLInputElement).value)"
            >
            <span v-else-if="row.lin" class="font-mono text-xs">{{ row.lin }}</span>
            <span v-else class="text-xs font-semibold text-rose-600 dark:text-rose-300">None yet</span>
          </template>
          <template #cell-aois="{ row }">
            <span class="flex items-center gap-1" :title="`${row.aoi_marked} of ${row.aoi_set} due AOIs scored`">
              <span v-for="it in row.items" :key="it.key" class="w-2.5 h-2.5 flex-shrink-0" :class="[DOT[it.state], it.kind === 'PROJECT' ? 'rounded-sm' : 'rounded-full']"></span>
              <span class="ml-1 text-xs tabular-nums text-gray-600 dark:text-gray-300">{{ row.aoi_marked }}/{{ row.aoi_set }}</span>
            </span>
          </template>
          <template #cell-average="{ row }">
            <span class="tabular-nums">{{ row.average !== null ? `${row.average}%` : '–' }}</span>
          </template>
          <template #cell-ca_score="{ row }">
            <span class="font-bold tabular-nums" :class="row.ca_score !== null ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-300 dark:text-gray-600'">{{ row.ca_score ?? '–' }}</span>
          </template>
          <template #cell-project="{ row }">
            <span class="tabular-nums">{{ row.project !== null ? `${row.project}%` : '–' }}</span>
          </template>
          <template #cell-evidence_count="{ row }">
            <span class="inline-flex items-center gap-1 text-xs" :class="row.evidence_count ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400'"><AppIcon name="camera" class="w-3.5 h-3.5" />{{ row.evidence_count }}</span>
          </template>
          <template #cell-status="{ row }">
            <span v-if="row.ready" class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">Ready</span>
            <span v-else class="flex flex-wrap gap-1">
              <span v-for="i in row.issues" :key="i" class="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap" :class="ISSUE[i].cls">{{ ISSUE[i].label(row) }}</span>
            </span>
          </template>
        </DataTable>

        <p class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500 dark:text-gray-400">
          <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>scored</span>
          <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>to mark</span>
          <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>not done / no score</span>
          <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>not due yet</span>
          <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-gray-400"></span>project</span>
        </p>
        <p class="mt-2 text-[11px] text-gray-400 dark:text-gray-500 max-w-3xl">
          The CA score is the average of the learner's AOI scores, scaled to {{ outOf }}. Check the figures and the export columns against UNEB's current guidance before you submit.
        </p>
      </template>
    </template>

    <LearnerDrawer v-if="openLearner && data" :learner="openLearner" :subject-id="subjectId" :role="role" :out-of="outOf" @close="openId = null" @changed="load(true)" />
    <LinImportModal v-if="showImport" :role="role" @close="showImport = false" @saved="load(true)" />

    <!-- Settings (admin) -->
    <div v-if="showSettings" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="showSettings = false">
      <form class="w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl p-5" @submit.prevent="saveSettings">
        <h2 class="text-base font-bold text-gray-900 dark:text-white mb-4">UNEB assessment settings</h2>
        <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">UNEB centre number</label>
        <input v-model="settingsForm.uneb_centre_number" type="text" placeholder="e.g. U0123" class="w-full mb-3 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white">
        <div class="grid grid-cols-2 gap-3 mb-1">
          <div>
            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">CA score out of</label>
            <input v-model.number="settingsForm.sba_out_of" type="number" min="1" max="100" step="0.5" required class="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Ready by</label>
            <input v-model="settingsForm.sba_deadline" type="date" class="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white">
          </div>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-5">Set these to match UNEB's current instructions. "Ready by" is the school's own date, shown to every teacher on this page.</p>
        <div class="flex justify-end gap-2">
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="showSettings = false">Cancel</button>
          <button type="submit" :disabled="savingSettings" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">{{ savingSettings ? 'Saving…' : 'Save' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import LearnerDrawer from '@/components/sba/LearnerDrawer.vue'
import LinImportModal from '@/components/sba/LinImportModal.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import type { SbaData, SbaLearner, SbaSettings } from '@/components/sba/types'

const authStore = useAuthStore()
const toast = useToastStore()
const role = authStore.userRole === 'teacher' ? 'teacher' : authStore.userRole === 'hod' ? 'hod' : 'admin'

interface Options {
  subjects: { id: number; name: string; code: string }[]
  levels: { name: string; streams: { id: number; name: string }[] }[]
  settings: SbaSettings
  can_edit_ids: boolean
  can_edit_settings: boolean
}
const options = ref<Options | null>(null)
const subjectId = usePersistedRef<number>(`sba:${role}:subject`, 0)
const level = usePersistedRef<string>(`sba:${role}:level`, 'S.4')
const stream = ref(0)
const data = ref<SbaData | null>(null)
const loading = ref(false)
const show = ref<'all' | 'not_ready' | 'no_lin' | 'missing' | 'waiting'>('all')
const openId = ref<number | null>(null)
const showImport = ref(false)

const streams = computed(() => options.value?.levels.find(l => l.name === level.value)?.streams || [])
const streamName = computed(() => streams.value.find(s => s.id === stream.value)?.name || '')
const outOf = computed(() => data.value?.settings.sba_out_of ?? options.value?.settings.sba_out_of ?? 20)
const readyPercent = computed(() => (data.value?.summary.learners ? Math.round((data.value.summary.ready / data.value.summary.learners) * 100) : 0))
const openLearner = computed<SbaLearner | null>(() => data.value?.learners.find(l => l.id === openId.value) || null)

const deadline = computed(() => {
  const d = data.value?.settings.sba_deadline
  if (!d) return null
  const days = Math.ceil((new Date(`${d}T23:59:59`).getTime() - Date.now()) / 86400000)
  const when = new Date(`${d}T00:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
  return { days, label: days < 0 ? `Was due ${when}` : days === 0 ? `Due today` : `Ready by ${when} · ${days} day${days === 1 ? '' : 's'} left` }
})

const checks = computed(() => {
  const s = data.value?.summary
  return [
    { key: 'not_ready' as const, label: 'not ready yet', value: s ? s.learners - s.ready : 0, tone: 'text-gray-900 dark:text-white' },
    { key: 'no_lin' as const, label: 'without a LIN', value: s?.no_lin ?? 0, tone: 'text-rose-600 dark:text-rose-400' },
    { key: 'missing' as const, label: 'missed work', value: s?.with_missing ?? 0, tone: 'text-rose-600 dark:text-rose-400' },
    { key: 'waiting' as const, label: 'AOIs to mark', value: s?.waiting_total ?? 0, tone: 'text-amber-600 dark:text-amber-400' }
  ]
})
const shown = computed(() => {
  const all = data.value?.learners || []
  if (show.value === 'not_ready') return all.filter(l => !l.ready)
  if (show.value === 'no_lin') return all.filter(l => !l.lin)
  if (show.value === 'missing') return all.filter(l => l.missing > 0)
  if (show.value === 'waiting') return all.filter(l => l.waiting > 0)
  return all
})

const columns: Column[] = [
  { key: 'name', label: 'Learner', sortable: true, mobile: 'title' },
  { key: 'lin', label: 'LIN', sortable: true, mobile: 'field' },
  { key: 'aois', label: 'AOIs', mobile: 'field', value: (r: SbaLearner) => r.aoi_marked },
  { key: 'average', label: 'Average', sortable: true, align: 'right', mobile: 'hidden' },
  { key: 'ca_score', label: 'CA', sortable: true, align: 'right', mobile: 'field' },
  { key: 'project', label: 'Project', sortable: true, align: 'right', mobile: 'hidden' },
  { key: 'evidence_count', label: 'Evidence', sortable: true, align: 'center', mobile: 'hidden' },
  { key: 'status', label: 'Status', mobile: 'subtitle', value: (r: SbaLearner) => (r.ready ? 0 : r.issues.length) }
]

const DOT: Record<string, string> = {
  marked: 'bg-emerald-500',
  waiting: 'bg-amber-400',
  missing: 'bg-rose-500',
  upcoming: 'bg-gray-300 dark:bg-gray-600'
}
const ISSUE: Record<string, { label: (l: SbaLearner) => string; cls: string }> = {
  no_lin: { label: () => 'No LIN', cls: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' },
  none_due: { label: () => 'No AOI due yet', cls: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300' },
  no_scores: { label: () => 'No AOI scores', cls: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
  missing: { label: (l) => `${l.missing} missed`, cls: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' },
  waiting: { label: (l) => `${l.waiting} to mark`, cls: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200' }
}

const loadOptions = async () => {
  try {
    const res = await axios.get(`/api/${role}/sba/options`)
    options.value = res.data.data
    const o = options.value!
    if (!o.subjects.some(s => s.id === subjectId.value)) subjectId.value = o.subjects.length === 1 ? o.subjects[0].id : 0
    if (!o.levels.some(l => l.name === level.value)) level.value = o.levels[o.levels.length - 1]?.name || ''
  } catch {
    toast.error('The UNEB assessment page could not load')
  }
}

let seq = 0
const load = async (quiet = false) => {
  if (!subjectId.value || !level.value) {
    data.value = null
    return
  }
  const mine = ++seq
  if (!quiet) loading.value = true
  try {
    const res = await axios.get(`/api/${role}/sba`, { params: { subject_id: subjectId.value, level: level.value, class_id: stream.value || undefined } })
    if (mine === seq) data.value = res.data.data
  } catch (e: any) {
    if (mine === seq) {
      data.value = null
      toast.error(e?.response?.data?.message || 'Could not load the learners')
    }
  } finally {
    if (mine === seq) loading.value = false
  }
}

watch([subjectId, level], () => { stream.value = 0; show.value = 'all'; load() })
watch(stream, () => load())

const open = (row: SbaLearner) => { openId.value = row.id }

const saveLin = async (row: SbaLearner, value: string) => {
  const lin = value.trim().toUpperCase().replace(/\s+/g, '')
  if (lin === (row.lin || '')) return
  try {
    await axios.put(`/api/${role}/sba/learner-ids`, { rows: [{ student_id: row.id, lin }] })
    row.lin = lin || null
    toast.success(lin ? `LIN saved for ${niceName(row.name).split(' ')[0]}` : 'LIN removed')
    load(true)
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'The LIN could not be saved')
  }
}

const exporting = ref(false)
const exportCsv = async () => {
  exporting.value = true
  try {
    const res = await axios.get(`/api/${role}/sba/export`, { params: { subject_id: subjectId.value, level: level.value, class_id: stream.value || undefined }, responseType: 'blob' })
    const name = /filename="([^"]+)"/.exec(res.headers['content-disposition'] || '')?.[1] || 'UNEB-CA.csv'
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  } catch {
    toast.error('The export could not be prepared')
  } finally {
    exporting.value = false
  }
}

// Settings (admin)
const showSettings = ref(false)
const savingSettings = ref(false)
const settingsForm = ref({ uneb_centre_number: '', sba_out_of: 20, sba_deadline: '' })
const openSettings = () => {
  const s = data.value?.settings || options.value?.settings
  settingsForm.value = { uneb_centre_number: s?.uneb_centre_number || '', sba_out_of: s?.sba_out_of || 20, sba_deadline: s?.sba_deadline || '' }
  showSettings.value = true
}
const saveSettings = async () => {
  savingSettings.value = true
  try {
    const res = await axios.put(`/api/${role}/sba/settings`, settingsForm.value)
    if (options.value) options.value.settings = res.data.data
    showSettings.value = false
    toast.success('Settings saved')
    load(true)
  } catch (e: any) {
    toast.error(e?.response?.data?.errors?.sba_out_of || e?.response?.data?.message || 'Settings could not be saved')
  } finally {
    savingSettings.value = false
  }
}

onMounted(async () => {
  await loadOptions()
  load()
})
</script>
