<template>
  <div class="w-full">
    <!-- Every class and stream: its size, subjects and class teacher -->
    <PageHeader title="Classes" description="Every class and stream - how many learners, how many subjects, and who the class teacher is." icon="users" accent="indigo" :active-filters="levelFilter ? 1 : 0">
      <template #actions>
        <button type="button" class="btn-primary" @click="openClassModal()">Add class</button>
      </template>
      <StatStrip v-if="classes.length" v-model="quick" :items="statItems" />
      <template #filters>
        <select v-model="levelFilter" class="w-full sm:w-44 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Level">
          <option value="">O and A Level</option>
          <option value="O Level">O Level</option>
          <option value="A Level">A Level</option>
        </select>
      </template>
    </PageHeader>

    <DataTable
      :columns="columns"
      :rows="shown"
      :loading="fetching"
      :search-keys="['name', 'stream_name', 'class_teacher_name']"
      search-placeholder="Search classes"
      :page-size="40"
      :initial-sort="{ key: 'name', dir: 'asc' }"
      empty-title="No classes here"
      :empty-message="classes.length ? 'Nothing matches this filter.' : 'Add your first class - students and subjects are attached to classes.'"
    >
      <template #cell-name="{ row }">
        <span class="block font-semibold text-gray-900 dark:text-white">{{ row.name }}<span v-if="row.stream_name" class="font-normal text-gray-400"> · {{ row.stream_name }}</span></span>
      </template>
      <template #cell-level="{ row }">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="row.level === 'A Level' ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' : 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'">{{ row.level }}</span>
      </template>
      <template #cell-class_teacher_name="{ row }">
        <span v-if="row.class_teacher_name" class="text-gray-700 dark:text-gray-200">{{ niceName(row.class_teacher_name) }}</span>
        <span v-else class="text-amber-600 dark:text-amber-400 text-xs font-semibold">None yet</span>
      </template>
      <template #cell-students_count="{ row }">
        <span class="tabular-nums" :class="row.students_count ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-300 dark:text-gray-600'">{{ row.students_count }}</span>
      </template>
      <template #cell-subjects_count="{ row }">
        <span class="tabular-nums" :class="row.subjects_count ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-300 dark:text-gray-600'">{{ row.subjects_count }}</span>
      </template>
      <template #actions="{ row }">
        <ActionMenu :label="`Actions for ${row.name}`" :items="[
          { label: 'Edit', icon: 'pencil', run: () => openClassModal(row) },
          { label: 'Delete', icon: 'trash', danger: true, divider: true, run: () => confirmDeleteClass(row) }
        ]" />
      </template>
    </DataTable>

    <!-- Class Modal -->
    <div v-if="showClassModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ editingClass ? 'Edit Class' : 'Add Class' }}
        </h3>
        <form @submit.prevent="saveClass">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class Name</label>
            <input
              v-model="classForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
            <select
              v-model="classForm.level"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Level</option>
              <option value="A Level">A Level</option>
              <option value="O Level">O Level</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year</label>
            <select
              v-model="classForm.academic_year_id"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Academic Year</option>
              <option v-for="academicYear in academicYears" :key="academicYear.id" :value="academicYear.id">
                {{ academicYear.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stream Name</label>
            <input
              v-model="classForm.stream_name"
              type="text"
              required
              placeholder="e.g., Science, Arts, Commerce"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeClassModal"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary"
            >
              {{ loading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>


    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete this {{ deleteTargetType }}? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="executeDelete"
            :disabled="loading"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {{ loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import apiService from '@/services/api'
import type { Class, AcademicYear } from '@/types'
import { useToastStore } from '@/stores/toast'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { niceName } from '@/components/dashboard/teacher/time'

type ClassRow = Class & { students_count?: number; subjects_count?: number; class_teacher_name?: string | null }

const toast = useToastStore()

const classes = ref<ClassRow[]>([])
const fetching = ref(true)
const quick = ref<string | null>(null)
const levelFilter = usePersistedRef<string>('admin-classes-level', '')

const columns: Column[] = [
  { key: 'name', label: 'Class', sortable: true, mobile: 'title', value: (r: ClassRow) => `${r.name} ${r.stream_name || ''}` },
  { key: 'level', label: 'Level', sortable: true },
  { key: 'class_teacher_name', label: 'Class teacher', sortable: true, mobile: 'subtitle', value: (r: ClassRow) => r.class_teacher_name || '' },
  { key: 'students_count', label: 'Learners', sortable: true, align: 'center' },
  { key: 'subjects_count', label: 'Subjects', sortable: true, align: 'center' }
]
const inLevel = computed(() => classes.value.filter(c => !levelFilter.value || c.level === levelFilter.value))
const statItems = computed<StatItem[]>(() => [
  { label: 'Classes', value: inLevel.value.length, key: 'all', tone: 'indigo' },
  { label: 'Learners', value: inLevel.value.reduce((n, c) => n + (c.students_count || 0), 0).toLocaleString(), tone: 'sky' },
  { label: 'No class teacher', value: inLevel.value.filter(c => !c.class_teacher_name).length, key: 'noteacher', tone: 'amber' },
  { label: 'No subjects assigned', value: inLevel.value.filter(c => !c.subjects_count).length, key: 'nosubjects', tone: 'rose', hint: 'set in Assign Teachers' },
  { label: 'Empty', value: inLevel.value.filter(c => !c.students_count).length, key: 'empty', tone: 'gray', hint: 'no learners' }
])
const shown = computed(() => inLevel.value.filter(c => {
  switch (quick.value) {
    case 'noteacher': return !c.class_teacher_name
    case 'nosubjects': return !c.subjects_count
    case 'empty': return !c.students_count
    default: return true
  }
}))
const academicYears = ref<AcademicYear[]>([])
const loading = ref(false)

// Class Modal
const showClassModal = ref(false)
const editingClass = ref<Class | null>(null)
const classForm = ref({
  name: '',
  level: '',
  academic_year_id: '',
  stream_name: ''
})

// Delete Modal
const showDeleteModal = ref(false)
const deleteTargetType = ref('')
const deleteTargetId = ref<number | null>(null)

const fetchAcademicYears = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/academic-years')
    if (response.data.success) {
      academicYears.value = response.data.data
    }
  } catch (error: any) {
    console.error('Failed to fetch academic years:', error)
    toast.error('Failed to fetch academic years')
  } finally {
    loading.value = false
  }
}

const fetchClasses = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/classes')
    if (response.data.success) {
      classes.value = response.data.data
    }
  } catch (error: any) {
    console.error('Failed to fetch classes:', error)
    toast.error('Failed to fetch classes')
  } finally {
    loading.value = false
    fetching.value = false
  }
}


const openClassModal = (classItem?: Class) => {
  editingClass.value = classItem || null
  if (classItem) {
    classForm.value = {
      name: classItem.name,
      level: classItem.level,
      academic_year_id: classItem.academic_year_id.toString(),
      stream_name: classItem.stream_name || ''
    }
  } else {
    classForm.value = {
      name: '',
      level: '',
      academic_year_id: '',
      stream_name: ''
    }
  }
  showClassModal.value = true
}

const closeClassModal = () => {
  showClassModal.value = false
  editingClass.value = null
  classForm.value = {
    name: '',
    level: '',
    academic_year_id: '',
    stream_name: ''
  }
}

const saveClass = async () => {
  loading.value = true
  try {
    const data = {
      name: classForm.value.name,
      level: classForm.value.level,
      academic_year_id: parseInt(classForm.value.academic_year_id.toString()),
      stream_name: classForm.value.stream_name
    }

    console.log('Saving class with data:', data)

    let response
    if (editingClass.value) {
      response = await apiService.put(`/admin/classes/${editingClass.value.id}`, data)
    } else {
      response = await apiService.post('/admin/classes', data)
    }

    console.log('Save class response:', response.data)

    if (response.data.success) {
      closeClassModal()
      await fetchClasses()
      toast.success('Class saved')
    } else {
      console.error('Backend error:', response.data)
      toast.error(response.data.message || 'Failed to save class')
    }
  } catch (error: any) {
    console.error('Failed to save class:', error)
    if (error.response?.data) {
      console.error('Error response:', error.response.data)
      toast.error(error.response.data.message || error.response.data.error || 'Failed to save class')
    } else {
      toast.error('Failed to save class')
    }
  } finally {
    loading.value = false
  }
}

const confirmDeleteClass = (classItem: Class) => {
  deleteTargetType.value = 'class'
  deleteTargetId.value = classItem.id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteTargetType.value = ''
  deleteTargetId.value = null
}

const executeDelete = async () => {
  loading.value = true
  try {
    const response = await apiService.delete(`/admin/classes/${deleteTargetId.value}`)

    if (response.data.success) {
      closeDeleteModal()
      await fetchClasses()
      toast.success('Deleted')
    } else {
      toast.error(response.data.message || 'Failed to delete')
    }
  } catch (error: any) {
    console.error('Failed to delete:', error)
    toast.error('Failed to delete')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAcademicYears()
  fetchClasses()
})
</script>
