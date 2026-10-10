<template>
  <div>
    <PageHeader
      title="My Classes"
      :description="!loadingClasses && classes.length ? `Your classes and the subjects you take in each - ${classes.length} ${classes.length === 1 ? 'subject' : 'subjects'} in all. Open one to see your classmates.` : 'Your classes and the subjects you take in each.'"
      icon="users"
    />

    <!-- Classes List -->
    <template v-if="!selectedClass">
      <div v-if="loadingClasses" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="i in 6" :key="i" class="animate-pulse rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="space-y-2">
              <div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div class="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div class="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
        <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
      <div v-else-if="classes.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
        <svg class="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        <p class="text-gray-500 dark:text-gray-400">You're not enrolled in any classes yet</p>
      </div>
      <!-- One section per class (newest year first), its subjects as cards -->
      <div v-else class="space-y-8">
        <section v-for="g in classGroups" :key="g.key">
          <div class="flex items-baseline gap-2 mb-3">
            <h2 class="text-base font-bold text-gray-900 dark:text-white">{{ g.label }}</h2>
            <span class="text-xs text-gray-400">{{ g.level }}<template v-if="g.year"> · {{ g.year }}</template> · {{ g.items.length }} {{ g.items.length === 1 ? 'subject' : 'subjects' }}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              v-for="cls in g.items"
              :key="`${cls.id}-${cls.department_id}`"
              type="button"
              class="group text-left rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all p-4 flex items-center gap-3"
              @click="selectClass(cls)"
            >
              <span class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-extrabold tracking-wide shadow-sm" :style="{ background: tint(cls.department_name || '') }">{{ code(cls.department_name) }}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-base font-bold text-gray-900 dark:text-white truncate">{{ cls.department_name || 'Subject' }}</span>
                <span class="block text-xs text-gray-500 dark:text-gray-400">{{ cls.student_count }} classmate{{ cls.student_count === 1 ? '' : 's' }}</span>
              </span>
              <svg class="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </section>
      </div>
    </template>

    <!-- Classmates View -->
    <div v-else>
      <button @click="selectedClass = null" class="mb-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center text-sm">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Classes
      </button>

      <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-5 mb-5 flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white truncate">{{ selectedClass.name }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
            {{ selectedClass.level }} &middot; {{ selectedClass.stream_name || 'No Stream' }} &middot; {{ selectedClass.department_name || 'N/A' }}
          </p>
        </div>
      </div>

      <!-- Students -->
      <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div v-if="loadingStudents" class="text-center py-12">
          <div class="text-gray-500 dark:text-gray-400 text-sm">Loading classmates...</div>
        </div>
        <div v-else-if="students.length === 0" class="text-center py-12">
          <svg class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
          </svg>
          <p class="text-gray-500 dark:text-gray-400 text-sm">No other students enrolled in this class yet</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-950/40">
              <tr>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stream</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Academic Year</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr
                v-for="student in students"
                :key="student.enrollment_id"
                class="transition-colors"
                :class="student.student_id === ownStudentId ? 'bg-indigo-50/60 dark:bg-indigo-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/40'"
              >
                <td class="px-5 py-3 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0" :class="avatarPalette(student.student_id)">
                      {{ studentInitials(student) }}
                    </div>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ student.first_name }} {{ student.last_name }}
                      <span v-if="student.student_id === ownStudentId" class="ml-1 text-xs text-indigo-600 dark:text-indigo-400 font-normal">(You)</span>
                    </span>
                  </div>
                </td>
                <td class="px-5 py-3 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium capitalize"
                    :class="student.gender === 'female' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'"
                  >
                    {{ student.gender }}
                  </span>
                </td>
                <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ student.stream_name || 'N/A' }}</td>
                <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ student.academic_year || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import axios from 'axios'

const API_BASE = '/api'

interface StudentClass {
  id: number
  name: string
  level: string
  stream_name: string | null
  department_id: number
  department_name: string | null
  academic_year: string | null
  student_count: number
}

interface Classmate {
  enrollment_id: number
  student_id: number
  first_name: string
  last_name: string
  gender: string
  department_id: number
  academic_year: string | null
  class_id: number
  department_name: string | null
  class_name: string | null
  level: string | null
  stream_name: string | null
}

const loadingClasses = ref(false)
const loadingStudents = ref(false)
const error = ref('')
const classes = ref<StudentClass[]>([])
const students = ref<Classmate[]>([])
const selectedClass = ref<StudentClass | null>(null)
const ownStudentId = ref<number | null>(null)

const loadClasses = async () => {
  loadingClasses.value = true
  error.value = ''
  try {
    const response = await axios.get(`${API_BASE}/student/classes`)
    if (response.data.success) {
      classes.value = response.data.data || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load classes'
  } finally {
    loadingClasses.value = false
  }
}

const selectClass = async (cls: StudentClass) => {
  selectedClass.value = cls
  await loadStudents(cls)
}

const loadStudents = async (cls: StudentClass) => {
  loadingStudents.value = true
  try {
    const response = await axios.get(`${API_BASE}/student/classes/${cls.id}/students`, {
      params: { department_id: cls.department_id }
    })
    if (response.data.success) {
      students.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to load classmates:', error)
    students.value = []
  } finally {
    loadingStudents.value = false
  }
}

const cardPalettes = [
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-sky-600',
  'bg-violet-600'
]
// One colour per subject (the same subject keeps its colour everywhere on the page)
const TINTS = ['#4f46e5', '#0d9488', '#b45309', '#be123c', '#7c3aed', '#0369a1', '#4d7c0f', '#c2410c']
const tint = (name: string) => TINTS[[...name].reduce((h, c) => h + c.charCodeAt(0), 0) % TINTS.length]
const code = (name: string | null) => (name || '?').replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase()

// The subjects grouped by the class they're taken in, newest year first
const classGroups = computed(() => {
  const map = new Map<string, { key: string; label: string; level: string; year: string | null; items: StudentClass[] }>()
  for (const c of classes.value) {
    const key = `${c.name}|${c.stream_name || ''}|${c.academic_year || ''}`
    if (!map.has(key)) map.set(key, { key, label: [c.name, c.stream_name].filter(Boolean).join(' '), level: c.level, year: c.academic_year, items: [] })
    map.get(key)!.items.push(c)
  }
  const groups = [...map.values()]
  for (const g of groups) g.items.sort((a, b) => (a.department_name || '').localeCompare(b.department_name || ''))
  return groups.sort((a, b) => (b.year || '').localeCompare(a.year || '') || b.label.localeCompare(a.label, undefined, { numeric: true }))
})
const avatarPalette = (id: number) => cardPalettes[Math.abs(id) % cardPalettes.length]

const studentInitials = (student: Classmate) => {
  return `${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}`.toUpperCase() || '?'
}

const loadOwnProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE}/auth/me`)
    if (response.data.success) {
      ownStudentId.value = response.data.data?.id ?? null
    }
  } catch {
    // Non-critical: just skip the "(You)" label if this fails
  }
}

onMounted(() => {
  loadClasses()
  loadOwnProfile()
})
</script>
