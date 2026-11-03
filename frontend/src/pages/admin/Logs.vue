<template>
  <div class="w-full">
    <div>
      <PageHeader title="System logs" description="Who signed in each day and how many times - tap the count for each sign-in and the time between them." icon="document" accent="indigo">
      </PageHeader>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[12rem]">
            <input
              v-model="search"
              type="text"
              placeholder="Search by username, name, or IP address..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              @input="debouncedSearch"
            >
          </div>
          <select
            v-model="roleFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            @change="fetchLogs(1)"
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="hod">HOD</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          <label class="flex items-center gap-2">
            <span class="sr-only">Day</span>
            <input
              v-model="dateFilter"
              type="date"
              :max="today"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              @change="fetchLogs(1)"
            >
            <button v-if="dateFilter" type="button" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="dateFilter = ''; fetchLogs(1)">All days</button>
          </label>
        </div>
      </div>

      <!-- Logins, one row per person per day -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
          <p class="mt-4 text-gray-500 dark:text-gray-400">Loading logs...</p>
        </div>

        <div v-else-if="days.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No login activity found</h3>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Logins will appear here as users sign in.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <p class="px-6 pt-4 text-xs text-gray-500 dark:text-gray-400">
            {{ totalLogins }} sign-in{{ totalLogins === 1 ? '' : 's' }} by {{ pagination.total }} person-day{{ pagination.total === 1 ? '' : 's' }}{{ dateFilter ? ` on ${formatDay(dateFilter)}` : '' }}
          </p>
          <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-950">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">User</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Day</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Logins</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">First - last</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              <template v-for="d in days" :key="keyOf(d)">
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors duration-150">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ d.full_name || d.username }}</div>
                    <div v-if="d.full_name" class="text-xs text-gray-500 dark:text-gray-400">{{ d.username }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 capitalize">
                      {{ d.role.replace('_', ' ') }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ formatDay(d.day) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold tabular-nums border transition-colors"
                      :class="openKey === keyOf(d) ? 'border-indigo-400 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200' : 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-300'"
                      :aria-expanded="openKey === keyOf(d)"
                      :title="'See each sign-in'"
                      @click="toggle(d)"
                    >
                      {{ d.logins }} {{ d.logins === 1 ? 'time' : 'times' }}
                      <svg class="w-3.5 h-3.5 transition-transform" :class="openKey === keyOf(d) ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 tabular-nums">
                    {{ formatTime(d.first_at) }}<template v-if="d.logins > 1"> - {{ formatTime(d.last_at) }}</template>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {{ d.last_ip || '—' }}
                    <span v-if="d.ips > 1" class="ml-1 font-sans text-xs text-amber-600 dark:text-amber-400">+{{ d.ips - 1 }} other{{ d.ips > 2 ? 's' : '' }}</span>
                  </td>
                </tr>

                <!-- Each sign-in that day, with the time since the one before -->
                <tr v-if="openKey === keyOf(d)">
                  <td colspan="6" class="px-6 pb-4 pt-0 bg-gray-50/60 dark:bg-gray-900/30">
                    <p v-if="timesLoading" class="py-3 text-sm text-gray-500 dark:text-gray-400">Loading…</p>
                    <p v-else-if="timesError" class="py-3 text-sm text-rose-600">{{ timesError }}</p>
                    <ol v-else class="relative ml-2 mt-3 border-l-2 border-indigo-100 dark:border-indigo-900/60">
                      <li v-for="(t, i) in times" :key="t.id" class="relative pl-5 pb-3 last:pb-0">
                        <span class="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-gray-800"></span>
                        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                          <span class="text-sm font-semibold tabular-nums text-gray-900 dark:text-white">{{ formatTime(t.logged_in_at) }}</span>
                          <span class="text-xs font-semibold" :class="i === 0 ? 'text-gray-400' : 'text-indigo-600 dark:text-indigo-300'">{{ i === 0 ? 'first sign-in' : `${gap(times[i - 1].logged_in_at, t.logged_in_at)} after the last` }}</span>
                          <span class="text-xs text-gray-500 dark:text-gray-400">{{ device(t) }}</span>
                          <span class="text-xs font-mono text-gray-400">{{ t.ip_address || '' }}</span>
                        </div>
                      </li>
                    </ol>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Page {{ pagination.page }} of {{ pagination.pages }} ({{ pagination.total }} total)
          </p>
          <div class="flex gap-2">
            <button
              :disabled="pagination.page <= 1"
              @click="fetchLogs(pagination.page - 1)"
              class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              :disabled="pagination.page >= pagination.pages"
              @click="fetchLogs(pagination.page + 1)"
              class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue'
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api'

// One person's sign-ins on one day
interface LoginDay {
  user_id: number
  role: string
  day: string
  username: string
  full_name: string | null
  logins: number
  first_at: string
  last_at: string
  last_ip: string | null
  ips: number
}
interface LoginTime {
  id: number
  logged_in_at: string
  ip_address: string | null
  browser: string | null
  os: string | null
  device_type: string | null
  device_model: string | null
}

const days = ref<LoginDay[]>([])
const totalLogins = ref(0)
const loading = ref(false)
const search = ref('')
const roleFilter = ref('')
const dateFilter = ref('')
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const pagination = ref({ page: 1, limit: 25, total: 0, pages: 0 })
const pad = (n: number) => String(n).padStart(2, '0')
const now = new Date()
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`

const fetchLogs = async (page = 1) => {
  loading.value = true
  openKey.value = null
  try {
    const params: any = { page, limit: pagination.value.limit }
    if (search.value) params.search = search.value
    if (roleFilter.value) params.role = roleFilter.value
    if (dateFilter.value) params.date = dateFilter.value

    const response = await apiService.get('/admin/logs', params)

    if (response.data.success) {
      days.value = response.data.data.days || []
      totalLogins.value = response.data.data.total_logins || 0
      pagination.value = response.data.data.pagination
    }
  } catch (error) {
    console.error('Failed to fetch logs:', error)
  } finally {
    loading.value = false
  }
}

// The count opens that day's sign-ins, one row at a time
const keyOf = (d: LoginDay) => `${d.role}-${d.user_id}-${d.day}`
const openKey = ref<string | null>(null)
const times = ref<LoginTime[]>([])
const timesLoading = ref(false)
const timesError = ref('')
const toggle = async (d: LoginDay) => {
  if (openKey.value === keyOf(d)) { openKey.value = null; return }
  openKey.value = keyOf(d)
  times.value = []
  timesError.value = ''
  timesLoading.value = true
  try {
    const response = await apiService.get('/admin/logs/times', { user_id: d.user_id, role: d.role, date: d.day })
    if (openKey.value === keyOf(d)) times.value = response.data.data.times || []
  } catch {
    timesError.value = 'Could not load the sign-in times'
  } finally {
    timesLoading.value = false
  }
}

const debouncedSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    fetchLogs(1)
  }, 500)
}

const toDate = (value: string) => new Date(value.replace(' ', 'T'))
const formatTime = (value: string) => toDate(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const formatDay = (day: string) => {
  if (day === today) return 'Today'
  return new Date(`${day}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}
// "2 h 15 min", "40 min", "under a minute"
const gap = (from: string, to: string) => {
  const mins = Math.round((toDate(to).getTime() - toDate(from).getTime()) / 60000)
  if (mins < 1) return 'under a minute'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h ? `${h} h${m ? ` ${m} min` : ''}` : `${m} min`
}
const device = (t: LoginTime) => [t.device_model || t.device_type, t.browser, t.os].filter(Boolean).join(' · ')

onMounted(() => {
  fetchLogs()
})
</script>
