<template>
  <div>
    <!-- Academic year sits next to the title instead of its own filter card, so the classes
         row below starts higher up the page. -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Classes</h1>
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">Academic Year</label>
        <select
          v-model="selectedAcademicYear"
          @change="onAcademicYearChange"
          class="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option v-for="year in academicYears" :key="year.academic_year" :value="year.academic_year">
            {{ year.academic_year }}
          </option>
        </select>
      </div>
    </div>

    <!-- Classes - one horizontally-scrollable row. Clicking a class expands its streams below
         without this row disappearing, so you can jump between classes without losing your
         place (see toggleGroup). -->
    <div v-if="loadingClasses" class="text-center py-12 text-gray-500">Loading classes...</div>
    <div v-else-if="classGroups.length === 0" class="text-center py-12 text-gray-500">No classes found in your department</div>
    <div v-else class="flex gap-3 overflow-x-auto pb-1 mb-4 -mx-1 px-1">
      <button
        v-for="group in classGroups"
        :key="group.name + group.level"
        @click="toggleGroup(group)"
        class="flex-shrink-0 w-44 text-left card !p-4 transition-all duration-200 border-2 hover:opacity-100 hover:blur-0"
        :class="[
          selectedGroup === group ? 'border-indigo-500 dark:border-indigo-400' : 'border-transparent hover:border-indigo-200 dark:hover:border-indigo-800',
          { 'opacity-40 blur-[1px]': selectedGroup && selectedGroup !== group }
        ]"
      >
        <div class="flex items-center gap-2.5 mb-2">
          <div class="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-[18px] h-[18px] text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div class="min-w-0">
            <p class="font-semibold text-gray-900 dark:text-white truncate">{{ group.name }}</p>
          </div>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ group.streams.length }} stream{{ group.streams.length === 1 ? '' : 's' }} &middot; {{ group.totalStudents }} students
        </p>
      </button>
    </div>

    <!-- Streams for the selected class - also one row, nested visually with a left rule so it
         reads as "belonging to" the class above. Clicking a stream reveals students below,
         again without hiding this row (see toggleStream). -->
    <div v-if="selectedGroup" class="mb-4 pl-3 ml-1 border-l-2 border-indigo-200 dark:border-indigo-800">
      <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">{{ selectedGroup.name }} Streams</p>
      <div v-if="selectedGroup.streams.length === 0" class="text-sm text-gray-500 dark:text-gray-400 py-2">No streams found</div>
      <div v-else class="flex gap-3 overflow-x-auto pb-1">
        <button
          v-for="stream in selectedGroup.streams"
          :key="stream.id"
          @click="toggleStream(stream)"
          class="flex-shrink-0 w-40 text-left card !p-3.5 transition-all duration-200 border-2 hover:opacity-100 hover:blur-0"
          :class="[
            selectedClass === stream ? 'border-indigo-500 dark:border-indigo-400' : 'border-transparent hover:border-indigo-200 dark:hover:border-indigo-800',
            { 'opacity-40 blur-[1px]': selectedClass && selectedClass !== stream }
          ]"
        >
          <div class="flex items-center gap-2 mb-1.5">
            <div class="w-7 h-7 bg-indigo-100 dark:bg-indigo-900/20 rounded-md flex items-center justify-center flex-shrink-0">
              <svg class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <p class="font-medium text-sm text-gray-900 dark:text-white truncate">Stream {{ stream.stream_name || 'N/A' }}</p>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ stream.student_count }} students</p>
        </button>
      </div>
    </div>

    <!-- Students in the selected stream, nested one level further. -->
    <div v-if="selectedClass" class="card ml-1">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <h2 class="text-base font-bold text-gray-900 dark:text-white">{{ selectedClass.name }} - {{ selectedClass.stream_name || 'No Stream' }}</h2>

        <div class="flex items-center gap-3">
          <label class="flex items-center gap-1.5">
            <input
              type="checkbox"
              v-model="selectAll"
              class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            >
            <span class="text-sm text-gray-600 dark:text-gray-400">Select All</span>
          </label>

          <button
            v-if="selectedStudents.length > 0"
            @click="bulkDeEnroll"
            class="btn-danger !px-2.5 !py-1 text-xs"
          >
            De-enroll ({{ selectedStudents.length }})
          </button>
        </div>
      </div>

      <!-- Searches the currently-loaded students in this stream, client-side - no extra
           request needed since the whole stream's roster is already in memory. -->
      <div class="relative w-full sm:w-64 mb-3">
        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          v-model="studentSearch"
          type="text"
          placeholder="Search students..."
          class="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
      </div>

      <div v-if="loadingStudents" class="text-center py-12 text-gray-500">Loading students...</div>
      <div v-else-if="filteredStudents.length === 0" class="text-center py-12 text-gray-500">
        {{ studentSearch ? 'No students match your search' : 'No students enrolled in this class' }}
      </div>
      <!-- Class, Level, Stream and Academic Year columns were dropped - every row here shares
           the exact same values (you've already drilled into one specific class-stream-year),
           so they were just repeating the header for free horizontal scroll. The table itself
           now scrolls internally with a sticky header instead of growing the whole page for a
           big roster. -->
      <div v-else class="overflow-auto max-h-[28rem] border border-gray-100 dark:border-gray-700 rounded-lg">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                Select
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Student
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Admission No
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Gender
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Department
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="student in filteredStudents" :key="student.enrollment_id"
                class="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td class="px-6 py-3 whitespace-nowrap">
                <input
                  type="checkbox"
                  v-model="selectedStudents"
                  :value="student.enrollment_id"
                  class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                >
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ student.first_name }} {{ student.last_name }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ student.admission_number }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                {{ student.gender }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ student.department_name || 'N/A' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import apiService from '@/services/api'

const loadingClasses = ref(false)
const loadingStudents = ref(false)
const classes = ref<any[]>([])
const students = ref<any[]>([])
const selectedGroup = ref<any>(null)
const selectedClass = ref<any>(null)
const studentSearch = ref('')

// The backend returns one row per class+stream combination (e.g. "S.1" appears once per
// stream A, B, C...) rather than a single "S.1" entity - group them here so the UI can show
// streams nested inside their class instead of one flat card per stream.
const classGroups = computed(() => {
  const groups = new Map<string, { name: string; level: string; streams: any[]; totalStudents: number }>()
  for (const cls of classes.value) {
    const key = `${cls.name}|${cls.level}`
    if (!groups.has(key)) {
      groups.set(key, { name: cls.name, level: cls.level, streams: [], totalStudents: 0 })
    }
    const group = groups.get(key)!
    group.streams.push(cls)
    group.totalStudents += Number(cls.student_count) || 0
  }
  return Array.from(groups.values())
})

const selectedStudents = ref<number[]>([])
const academicYears = ref<any[]>([])
const selectedAcademicYear = ref('')

const filteredStudents = computed(() => {
  const q = studentSearch.value.trim().toLowerCase()
  if (!q) return students.value
  return students.value.filter(s =>
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(q) ||
    (s.admission_number || '').toLowerCase().includes(q)
  )
})

// A computed checkbox (rather than a plain ref + watch) so "select all" always reflects
// whichever students are currently visible under the search filter, not the full roster.
const selectAll = computed({
  get: () => filteredStudents.value.length > 0 && filteredStudents.value.every(s => selectedStudents.value.includes(s.enrollment_id)),
  set: (checked: boolean) => {
    const visibleIds = new Set(filteredStudents.value.map(s => s.enrollment_id))
    if (checked) {
      const merged = new Set(selectedStudents.value)
      visibleIds.forEach(id => merged.add(id))
      selectedStudents.value = Array.from(merged)
    } else {
      selectedStudents.value = selectedStudents.value.filter(id => !visibleIds.has(id))
    }
  }
})

const loadAcademicYears = async () => {
  try {
    const response = await apiService.get('/teacher/classes/academic-years')
    if (response.data?.success && response.data?.data) {
      academicYears.value = response.data.data
      // Set default to current year if available
      const currentYear = new Date().getFullYear().toString()
      if (academicYears.value.some((y: any) => y.academic_year === currentYear)) {
        selectedAcademicYear.value = currentYear
      } else if (academicYears.value.length > 0) {
        selectedAcademicYear.value = academicYears.value[0].academic_year
      }
    }
  } catch (error) {
    console.error('Failed to load academic years:', error)
  }
}

// Switching academic year replaces `classes.value`, which makes `classGroups` recompute into
// brand-new objects - any class/stream selected from the old list would otherwise become a
// stale reference: the streams/students panels would keep showing old-year data with no card
// left to visually match it as "active". Clear the drill-down first so that can't happen.
const onAcademicYearChange = () => {
  selectedGroup.value = null
  selectedClass.value = null
  students.value = []
  selectedStudents.value = []
  studentSearch.value = ''
  loadClasses()
}

const loadClasses = async () => {
  loadingClasses.value = true
  try {
    const params: any = {}
    if (selectedAcademicYear.value) {
      params.academic_year = selectedAcademicYear.value
    }
    const response = await apiService.get('/teacher/classes', { params })
    if (response.data?.success && response.data?.data) {
      classes.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load classes:', error)
  } finally {
    loadingClasses.value = false
  }
}

// Clicking a class toggles its streams open/closed in place - the classes row itself never
// disappears, and switching to a different class drops whatever stream/students were showing.
const toggleGroup = (group: any) => {
  if (selectedGroup.value === group) {
    selectedGroup.value = null
  } else {
    selectedGroup.value = group
  }
  selectedClass.value = null
  students.value = []
  selectedStudents.value = []
  studentSearch.value = ''
}

// Same idea one level down: toggling a stream reveals/hides its students without touching the
// streams row above it.
const toggleStream = async (stream: any) => {
  if (selectedClass.value === stream) {
    selectedClass.value = null
    students.value = []
    selectedStudents.value = []
    studentSearch.value = ''
    return
  }
  selectedClass.value = stream
  selectedStudents.value = []
  studentSearch.value = ''
  await loadStudents(stream.id)
}

const loadStudents = async (classId: number) => {
  loadingStudents.value = true
  try {
    const params: any = {}
    if (selectedAcademicYear.value) {
      params.academic_year = selectedAcademicYear.value
    }
    const response = await apiService.get(`/teacher/classes/${classId}/students`, { params })
    if (response.data?.success && response.data?.data) {
      students.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load students:', error)
  } finally {
    loadingStudents.value = false
  }
}

const bulkDeEnroll = async () => {
  if (selectedStudents.value.length === 0) {
    alert('Please select at least one student to de-enroll')
    return
  }

  if (!confirm(`De-enroll ${selectedStudents.value.length} student(s) from your account?\n\nThey'll lose access to your assignments, eNotes, and other content, but stay fully enrolled with every other teacher in the department.`)) {
    return
  }

  const reason = prompt('Reason (optional):') || undefined

  try {
    const promises = selectedStudents.value.map(id =>
      apiService.delete(`/teacher/students/${id}`, { data: { reason } })
    )

    await Promise.all(promises)

    // Refresh the students list
    await loadStudents(selectedClass.value.id)
    // Clear selection
    selectedStudents.value = []

    alert('Students de-enrolled successfully')
  } catch (error) {
    console.error('Failed to de-enroll students:', error)
    alert('Failed to de-enroll some students. Please try again.')
  }
}

onMounted(() => {
  loadAcademicYears()
  loadClasses()
})
</script>
