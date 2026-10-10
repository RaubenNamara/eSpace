<template>
  <!-- The school's subjects - which department each sits in and how much it is in use. -->
  <div class="w-full">
    <PageHeader title="Subjects" description="Every subject, its department, and how much it is in use - classes, teachers, eNotes and assessments." icon="book" accent="indigo" :active-filters="deptFilter ? 1 : 0">
      <template #actions>
        <button type="button" class="btn-primary" @click="showCreateModal = true">Add subject</button>
      </template>
      <StatStrip v-if="!loading && subjects.length" v-model="quick" :items="statItems" />
      <template #filters>
        <select v-model="deptFilter" class="w-full sm:w-60 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Department">
          <option value="">All departments</option>
          <option v-for="d in departments" :key="d.id" :value="String(d.id)">{{ d.name }}</option>
        </select>
      </template>
    </PageHeader>

    <transition name="toast">
      <div v-if="successMessage" class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-emerald-200 dark:border-emerald-800 p-4 flex items-center gap-3 min-w-[260px] max-w-[calc(100vw-3rem)]">
        <p class="flex-1 text-sm text-gray-700 dark:text-gray-200">{{ successMessage }}</p>
        <button class="text-gray-400 hover:text-gray-600" aria-label="Close" @click="successMessage = ''">✕</button>
      </div>
    </transition>

    <DataTable
      :columns="columns"
      :rows="shown"
      :loading="loading && !subjects.length"
      :search-keys="['name', 'code', 'department']"
      search-placeholder="Search subjects"
      :page-size="30"
      :initial-sort="{ key: 'name', dir: 'asc' }"
      empty-title="No subjects here"
      :empty-message="subjects.length ? 'Nothing matches this filter.' : 'Add your first subject - classes, teachers and eNotes all hang off it.'"
    >
      <template #cell-name="{ row }">
        <span class="block font-semibold text-gray-900 dark:text-white">{{ row.name }}</span>
        <span v-if="row.code" class="block text-[11px] text-gray-400">{{ row.code }}</span>
      </template>
      <template #cell-department="{ row }">
        <span v-if="row.department" class="text-gray-700 dark:text-gray-200">{{ row.department }}</span>
        <span v-else class="text-amber-600 dark:text-amber-400 text-xs font-semibold">No department</span>
      </template>
      <template v-for="k in COUNT_KEYS" :key="k" #[`cell-${k}`]="{ row }">
        <span class="tabular-nums" :class="row[k] ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-300 dark:text-gray-600'">{{ row[k] }}</span>
      </template>
      <template #actions="{ row }">
        <ActionMenu :label="`Actions for ${row.name}`" :items="[
          { label: 'Edit', icon: 'pencil', run: () => editSubject(row) },
          { label: 'Delete', icon: 'trash', danger: true, divider: true, run: () => deleteSubject(row) }
        ]" />
      </template>
    </DataTable>


    <!-- Create Subject Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Subject</h2>
          <form @submit.prevent="createSubject">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <select
                  v-model="formData.department_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Department</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                    {{ dept.name }} ({{ dept.code }})
                  </option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button
                type="button"
                @click="showCreateModal = false"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 btn-primary"
              >
                {{ loading ? 'Creating...' : 'Create Subject' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Subject Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Subject</h2>
          <form @submit.prevent="updateSubject">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  v-model="editFormData.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <select
                  v-model="editFormData.department_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Department</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                    {{ dept.name }} ({{ dept.code }})
                  </option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button
                type="button"
                @click="showEditModal = false"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 btn-primary"
              >
                {{ loading ? 'Updating...' : 'Update Subject' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiService } from '../../services/api'
import type { Subject, Department } from '../../types'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import { usePersistedRef } from '@/composables/usePersistedRef'

type SubjectRow = Subject & { code?: string; classes_count?: number; teachers_count?: number; enotes_count?: number; assessments_count?: number }
const COUNT_KEYS = ['classes_count', 'teachers_count', 'enotes_count', 'assessments_count'] as const

const toast = useToastStore()
const confirmDialog = useConfirmStore()

const subjects = ref<SubjectRow[]>([])
const quick = ref<string | null>(null)
const deptFilter = usePersistedRef<string>('admin-subjects-dept', '')

const columns: Column[] = [
  { key: 'name', label: 'Subject', sortable: true, mobile: 'title' },
  { key: 'department', label: 'Department', sortable: true, mobile: 'subtitle' },
  { key: 'classes_count', label: 'Classes', sortable: true, align: 'center' },
  { key: 'teachers_count', label: 'Teachers', sortable: true, align: 'center' },
  { key: 'enotes_count', label: 'eNotes', sortable: true, align: 'center' },
  { key: 'assessments_count', label: 'Assessments', sortable: true, align: 'center' }
]
const rows = computed(() => subjects.value.map(s => {
  const d = departments.value.find(x => x.id === s.department_id)
  return { ...s, department: d ? d.name : '' }
}))
const inDept = computed(() => rows.value.filter(s => !deptFilter.value || String(s.department_id) === deptFilter.value))
const statItems = computed<StatItem[]>(() => [
  { label: 'Subjects', value: inDept.value.length, key: 'all', tone: 'indigo' },
  { label: 'Not assigned to a class', value: inDept.value.filter(s => !s.classes_count).length, key: 'noclass', tone: 'amber', hint: 'set in Assign Teachers' },
  { label: 'No teacher assigned', value: inDept.value.filter(s => !s.teachers_count).length, key: 'noteacher', tone: 'rose', hint: 'set in Assign Teachers' },
  { label: 'No eNotes yet', value: inDept.value.filter(s => !s.enotes_count).length, key: 'noenotes', tone: 'gray' }
])
const shown = computed(() => inDept.value.filter(s => {
  switch (quick.value) {
    case 'noclass': return !s.classes_count
    case 'noteacher': return !s.teachers_count
    case 'noenotes': return !s.enotes_count
    default: return true
  }
}))
const departments = ref<Department[]>([])
const loading = ref(false)
const successMessage = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)

const formData = ref({
  name: '',
  department_id: ''
})

const editFormData = ref({
  id: 0,
  name: '',
  department_id: ''
})

const fetchDepartments = async () => {
  try {
    const response = await apiService.get('/admin/departments')

    if (response.data.success) {
      departments.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  }
}

const fetchSubjects = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/subjects')

    if (response.data.success) {
      subjects.value = response.data.data || []
    } else {
      console.error('API returned error:', response.data)
    }
  } catch (error) {
    console.error('Failed to fetch subjects:', error)
  } finally {
    loading.value = false
  }
}


const createSubject = async () => {
  loading.value = true
  try {
    const response = await apiService.post('/admin/subjects', formData.value)

    if (response.data.success) {
      const createdName = formData.value.name
      showCreateModal.value = false
      formData.value = { name: '', department_id: '' }
      successMessage.value = `Subject "${createdName}" created successfully!`
      await fetchSubjects()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      toast.error(response.data.message || 'Failed to create subject')
    }
  } catch (error: any) {
    console.error('Failed to create subject:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to create subject'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}

const editSubject = (subject: Subject) => {
  editFormData.value = {
    id: subject.id,
    name: subject.name,
    department_id: subject.department_id?.toString() || ''
  }
  showEditModal.value = true
}

const updateSubject = async () => {
  loading.value = true
  try {
    const response = await apiService.put(`/admin/subjects/${editFormData.value.id}`, {
      name: editFormData.value.name,
      department_id: editFormData.value.department_id ? parseInt(editFormData.value.department_id) : null
    })

    if (response.data.success) {
      showEditModal.value = false
      successMessage.value = `Subject "${editFormData.value.name}" updated successfully!`
      await fetchSubjects()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      toast.error(response.data.message || 'Failed to update subject')
    }
  } catch (error: any) {
    console.error('Failed to update subject:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update subject'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}

const deleteSubject = async (subject: Subject) => {
  if (!await confirmDialog.open({ title: 'Delete subject', message: `Are you sure you want to delete subject "${subject.name}"? This action cannot be undone.`, confirmLabel: 'Delete', danger: true })) return

  loading.value = true
  try {
    const response = await apiService.delete(`/admin/subjects/${subject.id}`)

    if (response.data.success) {
      successMessage.value = `Subject "${subject.name}" deleted successfully!`
      await fetchSubjects()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      toast.error(response.data.message || 'Failed to delete subject')
    }
  } catch (error: any) {
    console.error('Failed to delete subject:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to delete subject'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  fetchDepartments()
  fetchSubjects()
})
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
