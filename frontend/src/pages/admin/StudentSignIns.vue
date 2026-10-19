<template>
  <!-- Every student who signed in during the period: the dashboard shows the latest 12 and links here -->
  <div class="w-full">
    <header class="mb-4 flex flex-wrap items-end gap-3">
      <div class="min-w-0 flex-1">
        <RouterLink to="/admin/dashboard" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">← Dashboard</RouterLink>
        <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Student sign-ins</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Who signed in {{ periodLabel }}, when they were last seen and on what device.</p>
      </div>
      <div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800" role="radiogroup" aria-label="Period">
        <button
          v-for="p in PERIODS"
          :key="p.days"
          type="button"
          role="radio"
          :aria-checked="days === p.days"
          class="px-3 py-1.5 text-sm font-semibold"
          :class="days === p.days ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'"
          @click="setDays(p.days)"
        >{{ p.label }}</button>
      </div>
    </header>

    <section class="dash-box">
      <div class="p-3 space-y-3">
        <div class="flex flex-wrap items-center gap-2">
          <input
            v-model="search"
            type="search"
            placeholder="Find a student (name or admission number)"
            class="flex-1 min-w-[12rem] px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
            aria-label="Find a student"
          >
          <select v-model="klass" class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white" aria-label="Class">
            <option value="">All classes</option>
            <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
          </select>
          <select v-model="device" class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white" aria-label="Device">
            <option value="">All devices</option>
            <option value="computer">Computers</option>
            <option value="phone">Phones and tablets</option>
          </select>
        </div>
        <p v-if="data" class="text-xs text-gray-500 dark:text-gray-400">
          <b class="text-gray-900 dark:text-white">{{ data.students_total }}</b> students signed in ·
          <b class="text-emerald-600">{{ online }}</b> online now<template v-if="phoneShare !== null"> ·
          <b class="text-gray-900 dark:text-white">{{ phoneShare }}%</b> on phones or tablets</template>
          <template v-if="filtered.length !== data.students.length"> · showing <b class="text-gray-900 dark:text-white">{{ filtered.length }}</b> that match</template>
        </p>

        <div v-if="loading && !data" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2" aria-busy="true">
          <div v-for="i in 9" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
        </div>
        <p v-else-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
        <p v-else-if="data && !filtered.length" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
          {{ search || klass || device ? 'No student matches.' : `No student signed in ${periodLabel}.` }}
        </p>
        <ul v-else-if="data" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4">
          <StudentRow v-for="st in filtered.slice(0, shown)" :key="st.id" :person="st" />
        </ul>
        <button v-if="filtered.length > shown" type="button" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline" @click="shown += PAGE">
          Show more ({{ filtered.length - shown }} left)
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiService from '@/services/api'
import { PERIODS, periodPhrase, tickNow, StudentRow, type SignInPerson } from '@/components/admin/signInParts'

interface StudentSignInData { days: number; since: string; online_minutes: number; students: SignInPerson[]; students_total: number }

const PAGE = 60
const route = useRoute()
const router = useRouter()
const days = ref(PERIODS.some(p => String(p.days) === route.query.days) ? Number(route.query.days) : 7)
const data = ref<StudentSignInData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const search = ref('')
const klass = ref('')
const device = ref('')
const shown = ref(PAGE)

const periodLabel = computed(() => periodPhrase(days.value))
const classes = computed(() => [...new Set((data.value?.students ?? []).map(st => st.department).filter((c): c is string => !!c))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })))
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return (data.value?.students ?? []).filter(st =>
    (!klass.value || st.department === klass.value)
    && (!device.value || (device.value === 'phone' ? st.device_type === 'phone' || st.device_type === 'tablet' : st.device_type === device.value))
    && (!q || `${st.name} ${st.username} ${st.admission_number ?? ''}`.toLowerCase().includes(q)))
})
const online = computed(() => (data.value?.students ?? []).filter(st => st.online).length)
const phoneShare = computed(() => {
  const known = (data.value?.students ?? []).filter(st => st.device_type)
  if (!known.length) return null
  return Math.round((known.filter(st => st.device_type === 'phone' || st.device_type === 'tablet').length / known.length) * 100)
})
watch([search, klass, device], () => { shown.value = PAGE })

async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await apiService.get('/admin/student-sign-ins', { params: { days: days.value } })
    data.value = res.data.data
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Could not load student sign-ins.'
  } finally {
    loading.value = false
  }
}
function setDays(d: number) {
  days.value = d
  shown.value = PAGE
  router.replace({ query: { ...route.query, days: String(d) } })
  load()
}

let timer: number | undefined
onMounted(() => {
  load()
  timer = window.setInterval(() => { tickNow(); load() }, 60_000)
})
onBeforeUnmount(() => window.clearInterval(timer))
</script>
