<template>
  <!-- Super admin: sync students with SMIS. The switch runs a sync and turns itself off when it ends. -->
  <section class="relative mb-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
    <div class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
      <span class="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-600/30" aria-hidden="true">
        <svg class="w-5 h-5" :class="on ? 'animate-spin [animation-duration:1.4s]' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
      </span>

      <div class="min-w-0 flex-1">
        <h2 class="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight">SMIS student sync</h2>
        <p class="mt-0.5 text-xs truncate" :class="statusTone">{{ statusLine }}</p>
      </div>

      <label class="flex-shrink-0 flex items-center gap-2.5 cursor-pointer select-none" :class="on || loading ? 'cursor-not-allowed' : ''">
        <span class="hidden sm:inline text-xs font-bold uppercase tracking-wide" :class="on ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-200'">{{ on ? 'Syncing' : 'Sync now' }}</span>
        <button
          type="button"
          role="switch"
          :aria-checked="on"
          aria-label="Sync students from SMIS"
          :disabled="on || loading"
          class="relative inline-flex h-8 w-14 items-center rounded-full ring-1 ring-inset transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 disabled:cursor-not-allowed"
          :class="on ? 'bg-indigo-600 ring-indigo-600' : 'bg-slate-400 ring-slate-500/40 hover:bg-slate-500 dark:bg-gray-600 dark:ring-gray-500 dark:hover:bg-gray-500'"
          @click="start"
        >
          <span class="inline-block h-6 w-6 rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200" :class="on ? 'translate-x-7' : 'translate-x-1'"></span>
        </button>
      </label>
    </div>

    <!-- the last run's numbers -->
    <dl v-if="last && last.status === 'success' && !on" class="grid grid-cols-4 border-t border-gray-100 dark:border-gray-700 divide-x divide-gray-100 dark:divide-gray-700 text-center">
      <div v-for="m in metrics" :key="m.label" class="py-2">
        <dt class="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400">{{ m.label }}</dt>
        <dd class="text-base sm:text-lg font-extrabold tabular-nums leading-tight" :class="m.value ? m.tone : 'text-gray-300 dark:text-gray-600'">{{ m.value.toLocaleString() }}</dd>
      </div>
    </dl>

    <!-- running: a thin moving bar along the bottom -->
    <div v-if="on" class="absolute inset-x-0 bottom-0 h-1 bg-indigo-100 dark:bg-indigo-900/40 overflow-hidden" role="status" aria-label="Syncing">
      <span class="smis-bar block h-full w-1/3 rounded-full bg-indigo-600"></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

interface Run {
  id: number
  started_at: string
  finished_at: string | null
  status: 'running' | 'success' | 'failed'
  fetched: number
  created: number
  enrolled: number
  moved: number
  suspended: number
  reactivated: number
  message: string | null
  started_by_name?: string
}

const emit = defineEmits<{ synced: [] }>()
const toast = useToastStore()
const confirmDialog = useConfirmStore()
const on = ref(false)
const loading = ref(true)
const runs = ref<Run[]>([])
const last = computed(() => runs.value[0] || null)
const statusLine = computed(() => {
  if (on.value) return 'Syncing with SMIS... the switch turns off when done'
  if (loading.value) return 'Loading...'
  const r = last.value
  if (!r) return 'Not synced yet. Turn on to sync'
  if (r.status === 'failed') return `Last sync failed ${when(r.finished_at || r.started_at)}: ${r.message || ''}`
  return `Last synced ${when(r.finished_at || r.started_at)} · ${r.fetched.toLocaleString()} in SMIS`
})
const statusTone = computed(() => (last.value?.status === 'failed' && !on.value ? 'text-rose-600 dark:text-rose-400' : 'text-gray-500 dark:text-gray-400'))
const metrics = computed(() => {
  const r = last.value
  if (!r) return []
  return [
    { label: 'Added', value: Number(r.created), tone: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Moved', value: Number(r.moved), tone: 'text-sky-600 dark:text-sky-400' },
    { label: 'Suspended', value: Number(r.suspended), tone: 'text-amber-600 dark:text-amber-400' },
    { label: 'Back', value: Number(r.reactivated), tone: 'text-blue-600 dark:text-blue-400' }
  ]
})

const when = (s: string) => new Date(s.replace(' ', 'T')).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

let poll: ReturnType<typeof setTimeout> | null = null
const loadStatus = async () => {
  try {
    const res = await axios.get('/api/admin/students/smis-sync')
    runs.value = res.data.data.runs || []
    on.value = !!res.data.data.running
    // a run started elsewhere (another tab): follow it until it ends
    if (on.value) poll = setTimeout(loadStatus, 4000)
  } catch {
    /* the card simply shows no history */
  } finally {
    loading.value = false
  }
}

const start = async () => {
  if (on.value) return
  if (!await confirmDialog.open({
    title: 'Sync students from SMIS',
    message: 'Adds new SMIS students, moves class/stream changes, and suspends students no longer in SMIS. Logins of existing students are kept.',
    confirmLabel: 'Start sync'
  })) return
  on.value = true
  try {
    const res = await axios.post('/api/admin/students/smis-sync', {}, { timeout: 300000 })
    toast.success(res.data.message, 9000)
    emit('synced')
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'The sync failed. Nothing was changed.', 9000)
  } finally {
    on.value = false
    await loadStatus()
  }
}

onMounted(loadStatus)
onBeforeUnmount(() => { if (poll) clearTimeout(poll) })
</script>

<style scoped>
.smis-bar { animation: smis-slide 1.2s ease-in-out infinite; }
@keyframes smis-slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
@media (prefers-reduced-motion: reduce) { .smis-bar { animation: none; width: 100%; opacity: .6; } }
</style>
