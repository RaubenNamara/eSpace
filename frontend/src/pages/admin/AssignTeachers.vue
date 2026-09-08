<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl 2xl:max-w-[100rem] mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Assign Teachers to Classes</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1 max-w-3xl">
          Pick a teacher and a subject, then check every class stream they should teach it in.
          A teacher can only be assigned a subject that belongs to their own department.
        </p>
      </div>

      <!-- Toast Notification -->
      <transition name="toast">
        <div
          v-if="successMessage"
          class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-green-200 dark:border-green-800 p-4 flex items-center gap-4 min-w-[280px] max-w-[calc(100vw-3rem)]"
        >
          <div class="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-900 dark:text-white">Success!</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ successMessage }}</p>
          </div>
          <button @click="successMessage = ''" class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </transition>

      <!-- Loading -->
      <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-12 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">Loading teachers, subjects and classes...</p>
      </div>

      <!-- On very large screens, once a teacher is picked, the form and the current-
           assignments summary sit side by side instead of stacking with a lot of empty
           margin either side. Before that there's nothing to show in a second column. -->
      <div v-else :class="selectedTeacher ? '2xl:grid 2xl:grid-cols-[1.4fr_1fr] 2xl:gap-8 2xl:items-start' : ''">

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 space-y-6">
        <!-- Step 1: Teacher -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">1. Teacher</label>
          <select
            v-model="selectedTeacherId"
            @change="onTeacherChange"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a teacher...</option>
            <option v-for="t in teachers" :key="t.id" :value="t.id">
              {{ t.first_name }} {{ t.last_name }} ({{ t.employee_number }})
            </option>
          </select>

          <div v-if="selectedTeacher" class="mt-2 flex flex-wrap items-center gap-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">Department:</span>
            <span
              v-for="d in selectedTeacher.departments"
              :key="d.id"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300"
            >
              {{ d.name }}<span v-if="d.is_primary" class="ml-1 opacity-70">(primary)</span>
            </span>
            <span v-if="!selectedTeacher.departments?.length" class="text-sm text-red-600 dark:text-red-400">
              No department assigned - assign one first under Teachers.
            </span>
          </div>
        </div>

        <!-- Step 2: Subject -->
        <div v-if="selectedTeacher">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">2. Subject</label>
          <select
            v-model="selectedSubjectId"
            @change="onSubjectChange"
            :disabled="!eligibleSubjects.length"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
          >
            <option value="">Select a subject...</option>
            <option v-for="s in eligibleSubjects" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
          <p v-if="!eligibleSubjects.length" class="text-sm text-amber-600 dark:text-amber-400 mt-1">
            None of this teacher's departments have a subject set up yet. Add one under Admin &rarr; Subjects.
          </p>
        </div>

        <!-- Step 3: Classes -->
        <div v-if="selectedSubjectId">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            3. Class streams ({{ selectedClassIds.length }} selected)
          </label>
          <div v-if="!groupedClasses.length" class="text-sm text-gray-500 dark:text-gray-400">No classes found.</div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 max-h-96 overflow-y-auto pr-1">
            <div v-for="group in groupedClasses" :key="group.key">
              <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                {{ group.name }} &middot; {{ group.level }}
              </p>
              <div class="flex flex-wrap gap-2">
                <label
                  v-for="cls in group.classes"
                  :key="cls.id"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer text-sm transition-colors"
                  :class="selectedClassIds.includes(cls.id)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <input type="checkbox" :value="cls.id" v-model="selectedClassIds" class="rounded text-blue-600 focus:ring-blue-500" />
                  {{ cls.stream_name || cls.name }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Error -->
        <p v-if="errorMessage" class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>

        <div class="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button
            @click="saveAssignment"
            :disabled="!canSave || saving"
            class="btn-primary"
          >
            {{ saving ? 'Saving...' : 'Save Teaching Assignment' }}
          </button>
        </div>
      </div>

      <!-- Current assignments -->
      <div v-if="selectedTeacher && !loading" class="mt-8 2xl:mt-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">
            Current teaching assignments for {{ selectedTeacher.first_name }} {{ selectedTeacher.last_name }}
          </h2>
        </div>
        <div v-if="!currentAssignments.length" class="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
          No teaching assignments yet.
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-950">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Class</th>
                <th class="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="a in currentAssignments" :key="a.id">
                <td class="px-6 py-3 text-sm text-gray-900 dark:text-white">{{ a.subject_name }}</td>
                <td class="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">{{ a.class_name }} {{ a.stream_name }} ({{ a.level }})</td>
                <td class="px-6 py-3 text-right">
                  <button
                    @click="removeAssignment(a)"
                    :disabled="removingId === a.id"
                    class="text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ removingId === a.id ? 'Removing...' : 'De-assign' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiService } from '../../services/api'

interface TeacherDepartment {
  id: number
  name: string
  code: string
  is_primary: boolean
}

interface TeacherRow {
  id: number
  first_name: string
  last_name: string
  employee_number: string
  department_id: number | null
  departments?: TeacherDepartment[]
}

interface SubjectRow {
  id: number
  name: string
  code: string
  department_id: number | null
}

interface ClassRow {
  id: number
  name: string
  level: string
  stream_name: string
}

interface TermRow {
  id: number
  name: string
  is_current: number
}

interface AssignmentRow {
  id: number
  class_id: number
  subject_id: number
  term_id: number
  class_name: string
  stream_name: string
  level: string
  subject_name: string
}

const teachers = ref<TeacherRow[]>([])
const subjects = ref<SubjectRow[]>([])
const classes = ref<ClassRow[]>([])
const terms = ref<TermRow[]>([])
const currentAssignments = ref<AssignmentRow[]>([])

const selectedTeacherId = ref<number | ''>('')
const selectedSubjectId = ref<number | ''>('')
const selectedClassIds = ref<number[]>([])

const loading = ref(false)
const saving = ref(false)
const removingId = ref<number | null>(null)
const successMessage = ref('')
const errorMessage = ref('')

const selectedTeacher = computed(() => teachers.value.find(t => t.id === selectedTeacherId.value) || null)

const eligibleSubjects = computed(() => {
  if (!selectedTeacher.value) return []
  const deptIds = new Set((selectedTeacher.value.departments || []).map(d => d.id))
  if (deptIds.size === 0 && selectedTeacher.value.department_id) {
    deptIds.add(selectedTeacher.value.department_id)
  }
  return subjects.value.filter(s => s.department_id != null && deptIds.has(s.department_id))
})

const groupedClasses = computed(() => {
  const groups = new Map<string, { key: string; name: string; level: string; classes: ClassRow[] }>()
  for (const cls of classes.value) {
    const key = `${cls.name}__${cls.level}`
    if (!groups.has(key)) {
      groups.set(key, { key, name: cls.name, level: cls.level, classes: [] })
    }
    groups.get(key)!.classes.push(cls)
  }
  return Array.from(groups.values()).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
})

const canSave = computed(() => !!selectedTeacherId.value && !!selectedSubjectId.value)

// Terms aren't shown in this UI at all - assignments are always kept on the current term
// behind the scenes (the backend defaults to it), so admins never have to think about terms.
const currentTermId = computed(() => terms.value.find(t => t.is_current)?.id ?? null)

async function fetchInitialData() {
  loading.value = true
  errorMessage.value = ''
  try {
    const [teachersRes, subjectsRes, classesRes, termsRes] = await Promise.all([
      apiService.get('/admin/teachers', { params: { limit: 500 } }),
      apiService.get('/admin/subjects'),
      apiService.get('/admin/classes'),
      apiService.get('/admin/terms')
    ])

    teachers.value = teachersRes.data.data?.teachers || []
    subjects.value = subjectsRes.data.data || []
    classes.value = classesRes.data.data || []
    terms.value = termsRes.data.data || []
  } catch (error) {
    console.error('Failed to load assignment data:', error)
    errorMessage.value = 'Failed to load teachers, subjects, classes or terms.'
  } finally {
    loading.value = false
  }
}

async function fetchTeacherAssignments() {
  if (!selectedTeacherId.value) return
  try {
    const response = await apiService.get(`/admin/teachers/${selectedTeacherId.value}/teaching-assignments`)
    currentAssignments.value = response.data.data?.assignments || []
  } catch (error) {
    console.error('Failed to load teaching assignments:', error)
  }
}

async function onTeacherChange() {
  selectedSubjectId.value = ''
  selectedClassIds.value = []
  currentAssignments.value = []
  errorMessage.value = ''
  if (selectedTeacherId.value) {
    await fetchTeacherAssignments()
  }
}

function onSubjectChange() {
  if (!selectedSubjectId.value) {
    selectedClassIds.value = []
    return
  }
  selectedClassIds.value = currentAssignments.value
    .filter(a => a.subject_id === selectedSubjectId.value && a.term_id === currentTermId.value)
    .map(a => a.class_id)
}

async function saveAssignment() {
  if (!canSave.value) return

  saving.value = true
  errorMessage.value = ''
  try {
    const response = await apiService.put(`/admin/teachers/${selectedTeacherId.value}/teaching-assignments`, {
      subject_id: selectedSubjectId.value,
      class_ids: selectedClassIds.value,
      term_id: currentTermId.value
    })

    if (response.data.success) {
      successMessage.value = 'Teaching assignment saved successfully!'
      await fetchTeacherAssignments()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      errorMessage.value = response.data.message || 'Failed to save assignment.'
    }
  } catch (error: any) {
    console.error('Failed to save teaching assignment:', error)
    const errors = error.response?.data?.errors
    errorMessage.value = (errors && Object.values(errors)[0] as string) || error.response?.data?.message || 'Failed to save assignment.'
  } finally {
    saving.value = false
  }
}

async function removeAssignment(assignment: AssignmentRow) {
  if (!selectedTeacherId.value) return
  if (!confirm(`Remove ${assignment.subject_name} in ${assignment.class_name} ${assignment.stream_name} from this teacher?`)) {
    return
  }

  removingId.value = assignment.id
  errorMessage.value = ''
  try {
    const response = await apiService.delete(`/admin/teachers/${selectedTeacherId.value}/teaching-assignments/${assignment.id}`)

    if (response.data.success) {
      successMessage.value = 'Teacher de-assigned from that class successfully!'
      await fetchTeacherAssignments()
      onSubjectChange()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      errorMessage.value = response.data.message || 'Failed to de-assign teacher.'
    }
  } catch (error: any) {
    console.error('Failed to de-assign teacher:', error)
    errorMessage.value = error.response?.data?.message || 'Failed to de-assign teacher.'
  } finally {
    removingId.value = null
  }
}

onMounted(fetchInitialData)
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}
</style>
