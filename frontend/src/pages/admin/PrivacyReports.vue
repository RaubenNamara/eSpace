<template>
  <!-- Privacy and safety concerns reported on the Privacy page (super admins only) - open ones
       first. Each moves from New to Looking into it to Closed, with a note for the other super admins. -->
  <div class="w-full">
    <PageHeader title="Privacy reports" description="Concerns sent from the Privacy page on the website - look into each one, keep a note, then close it." icon="warning" accent="rose">
      <StatStrip v-if="reports.length" v-model="statusFilter" :items="statItems" />
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="4" />
    <EmptyState v-else-if="!reports.length" icon="check-circle" tone="emerald" title="No privacy reports" message="When someone uses Report a concern on the Privacy page, it shows up here - and you are told at once." />

    <ul v-else class="space-y-3">
      <li v-for="r in shown" :key="r.id" class="rounded-2xl border bg-white dark:bg-gray-800 p-4 sm:p-5" :class="r.status === 'new' ? 'border-rose-300 dark:border-rose-700 ring-1 ring-rose-100 dark:ring-rose-900/40' : 'border-gray-200 dark:border-gray-700'">
        <div class="flex flex-col sm:flex-row sm:items-start gap-3">
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-base font-bold text-gray-900 dark:text-white">{{ r.category_label }}</h3>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="STATUS[r.status].chip">{{ STATUS[r.status].label }}</span>
              <span v-if="r.category === 'child_safety'" class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-600 text-white">Urgent</span>
            </div>
            <p class="mt-2 text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">{{ r.message }}</p>
            <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
              <span>{{ r.contact_name || 'No name given' }}</span>
              <a v-if="r.contact && r.contact.includes('@')" :href="`mailto:${r.contact}`" class="text-indigo-600 dark:text-indigo-300 hover:underline">{{ r.contact }}</a>
              <a v-else-if="r.contact" :href="`tel:${r.contact}`" class="text-indigo-600 dark:text-indigo-300 hover:underline">{{ r.contact }}</a>
              <span v-else class="text-gray-400">No way to reach them</span>
              <span v-if="r.reporter_role" class="text-gray-500">Signed in as a {{ ROLE[r.reporter_role] || r.reporter_role }} (account {{ r.reporter_user_id }})</span>
            </p>
            <p class="mt-2 text-[11px] text-gray-400">Received {{ when(r.created_at) }}</p>
            <div class="mt-3">
              <textarea v-model="notes[r.id]" rows="2" maxlength="1000" placeholder="Note for the other super admins - what was done" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>
          </div>
          <div class="flex sm:flex-col gap-1.5 flex-shrink-0">
            <button
              v-for="s in NEXT"
              v-show="s !== r.status || (notes[r.id] ?? '') !== (r.note ?? '')"
              :key="s"
              type="button"
              :disabled="busyId === r.id"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold border disabled:opacity-50"
              :class="s === 'looking' ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'"
              @click="setStatus(r, s)"
            >{{ s === r.status ? 'Save note' : STATUS[s].action }}</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { useToastStore } from '@/stores/toast'

type Status = 'new' | 'looking' | 'closed'
interface PrivacyReport {
  id: number
  category: string
  category_label: string
  message: string
  contact_name: string | null
  contact: string | null
  reporter_user_id: number | null
  reporter_role: string | null
  status: Status
  note: string | null
  created_at: string
}

const STATUS: Record<Status, { label: string; action: string; chip: string }> = {
  new: { label: 'New', action: 'Mark as new', chip: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200' },
  looking: { label: 'Looking into it', action: 'Looking into it', chip: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200' },
  closed: { label: 'Closed', action: 'Close', chip: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' }
}
const NEXT: Status[] = ['looking', 'closed', 'new']
const ROLE: Record<string, string> = { student: 'student', teacher: 'teacher', hod: 'head of department', admin: 'school admin', super_admin: 'super admin' }

const toast = useToastStore()
const reports = ref<PrivacyReport[]>([])
const notes = ref<Record<number, string>>({})
const loading = ref(true)
const busyId = ref<number | null>(null)
const statusFilter = ref<string | null>(null)

const statItems = computed<StatItem[]>(() => (['new', 'looking', 'closed'] as Status[]).map(s => ({
  label: STATUS[s].label, value: reports.value.filter(r => r.status === s).length, key: s, tone: s === 'new' ? 'rose' : s === 'looking' ? 'sky' : 'gray'
})))
const shown = computed(() => reports.value.filter(r => !statusFilter.value || r.status === statusFilter.value))
const when = (v: string) => new Date(v.replace(' ', 'T')).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/admin/privacy-reports')
    reports.value = res.data.data.reports || []
    notes.value = Object.fromEntries(reports.value.map(r => [r.id, r.note ?? '']))
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load privacy reports')
  } finally {
    loading.value = false
  }
}

const setStatus = async (r: PrivacyReport, status: Status) => {
  busyId.value = r.id
  try {
    await axios.put(`/api/admin/privacy-reports/${r.id}`, { status, note: notes.value[r.id] ?? '' })
    r.status = status
    r.note = (notes.value[r.id] ?? '').trim() || null
    toast.success(`Report ${STATUS[status].label.toLowerCase()}`)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not update')
  } finally {
    busyId.value = null
  }
}

onMounted(load)
</script>
