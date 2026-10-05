<template>
  <!-- Schools that asked for a demo on the eSpace website - newest and unanswered first. Each one
       moves from New to Contacted to Closed as it's followed up. -->
  <div class="w-full">
    <PageHeader title="Demo requests" description="Schools that asked for a demo on the eSpace website - follow each one up, then mark it." icon="users" accent="violet">
      <StatStrip v-if="requests.length" v-model="statusFilter" :items="statItems" />
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="4" />
    <EmptyState v-else-if="!requests.length" icon="users" tone="violet" title="No demo requests yet" message="When a school fills in Request a demo on the website, it shows up here." />

    <ul v-else class="space-y-3">
      <li v-for="r in shown" :key="r.id" class="rounded-2xl border bg-white dark:bg-gray-800 p-4 sm:p-5" :class="r.status === 'new' ? 'border-violet-300 dark:border-violet-700 ring-1 ring-violet-100 dark:ring-violet-900/40' : 'border-gray-200 dark:border-gray-700'">
        <div class="flex flex-col sm:flex-row sm:items-start gap-3">
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-base font-bold text-gray-900 dark:text-white">{{ r.school_name }}</h3>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="STATUS[r.status].chip">{{ STATUS[r.status].label }}</span>
              <span v-if="r.students" class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ r.students }} students</span>
            </div>
            <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">{{ r.contact_name }}<template v-if="r.role"> · {{ r.role }}</template></p>
            <p class="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a v-if="r.email" :href="`mailto:${r.email}`" class="text-indigo-600 dark:text-indigo-300 hover:underline">{{ r.email }}</a>
              <a v-if="r.phone" :href="`tel:${r.phone}`" class="text-indigo-600 dark:text-indigo-300 hover:underline">{{ r.phone }}</a>
            </p>
            <p v-if="r.message" class="mt-2 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ r.message }}</p>
            <p class="mt-2 text-[11px] text-gray-400">Received {{ when(r.created_at) }}</p>
          </div>
          <div class="flex sm:flex-col gap-1.5 flex-shrink-0">
            <button
              v-for="s in NEXT"
              v-show="s !== r.status"
              :key="s"
              type="button"
              :disabled="busyId === r.id"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold border disabled:opacity-50"
              :class="s === 'contacted' ? 'bg-violet-600 border-violet-600 text-white hover:bg-violet-700' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'"
              @click="setStatus(r, s)"
            >{{ STATUS[s].action }}</button>
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

type Status = 'new' | 'contacted' | 'closed'
interface DemoRequest {
  id: number
  school_name: string
  contact_name: string
  role: string | null
  email: string | null
  phone: string | null
  students: string | null
  message: string | null
  status: Status
  created_at: string
}

const STATUS: Record<Status, { label: string; action: string; chip: string }> = {
  new: { label: 'New', action: 'Mark as new', chip: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200' },
  contacted: { label: 'Contacted', action: 'Mark contacted', chip: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200' },
  closed: { label: 'Closed', action: 'Close', chip: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' }
}
const NEXT: Status[] = ['contacted', 'closed', 'new']

const toast = useToastStore()
const requests = ref<DemoRequest[]>([])
const loading = ref(true)
const busyId = ref<number | null>(null)
const statusFilter = ref<string | null>(null)

const statItems = computed<StatItem[]>(() => (['new', 'contacted', 'closed'] as Status[]).map(s => ({
  label: STATUS[s].label, value: requests.value.filter(r => r.status === s).length, key: s, tone: s === 'new' ? 'violet' : s === 'contacted' ? 'sky' : 'gray'
})))
const shown = computed(() => requests.value.filter(r => !statusFilter.value || r.status === statusFilter.value))
const when = (v: string) => new Date(v.replace(' ', 'T')).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/admin/demo-requests')
    requests.value = res.data.data.requests || []
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load demo requests')
  } finally {
    loading.value = false
  }
}

const setStatus = async (r: DemoRequest, status: Status) => {
  busyId.value = r.id
  try {
    await axios.put(`/api/admin/demo-requests/${r.id}`, { status })
    r.status = status
    toast.success(`${r.school_name}: ${STATUS[status].label.toLowerCase()}`)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not update')
  } finally {
    busyId.value = null
  }
}

onMounted(load)
</script>
