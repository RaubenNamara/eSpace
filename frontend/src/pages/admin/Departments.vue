<template>
  <!-- The school's departments - each one's head, teachers and subjects at a glance. -->
  <div class="w-full">
    <PageHeader title="Departments" description="The school's departments - each one's head, teachers and subjects at a glance." icon="kit" accent="indigo">
      <template #actions>
        <button type="button" class="btn-primary" @click="showCreateModal = true">Add department</button>
      </template>
      <StatStrip v-if="!loading && departments.length" v-model="quick" :items="statItems" />
    </PageHeader>

    <!-- Toast Notification -->
    <transition name="toast">
      <div
        v-if="successMessage"
        class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-emerald-200 dark:border-emerald-800 p-4 flex items-center gap-4 min-w-[280px] max-w-[calc(100vw-3rem)]"
      >
        <div class="flex-shrink-0 w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <div class="flex-1">
          <p class="font-semibold text-gray-900 dark:text-white">Done</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ successMessage }}</p>
        </div>
        <button class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Close" @click="successMessage = ''">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </transition>

    <DataTable
      :columns="columns"
      :rows="shown"
      :loading="loading && !departments.length"
      :search-keys="['name', 'code', 'description', 'hod_name']"
      search-placeholder="Search departments"
      :page-size="30"
      :initial-sort="{ key: 'name', dir: 'asc' }"
      empty-title="No departments here"
      :empty-message="departments.length ? 'Nothing matches this filter.' : 'Add your first department - subjects and teachers hang off it.'"
    >
      <template #cell-name="{ row }">
        <span class="block font-semibold text-gray-900 dark:text-white">{{ row.description || row.name }}</span>
        <span class="block text-[11px] text-gray-400">{{ row.name }} · {{ row.code }}</span>
      </template>
      <template #cell-hod_name="{ row }">
        <span v-if="row.hod_name" class="text-gray-700 dark:text-gray-200">{{ niceName(row.hod_name) }}</span>
        <span v-else class="text-amber-600 dark:text-amber-400 text-xs font-semibold">No head</span>
      </template>
      <template #cell-teachers_count="{ row }">
        <span class="tabular-nums" :class="row.teachers_count ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-300 dark:text-gray-600'">{{ row.teachers_count }}</span>
      </template>
      <template #cell-subjects_count="{ row }">
        <span class="tabular-nums" :class="row.subjects_count ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-300 dark:text-gray-600'">{{ row.subjects_count }}</span>
      </template>
      <template #actions="{ row }">
        <ActionMenu :label="`Actions for ${row.name}`" :items="[
          { label: 'Edit', icon: 'pencil', run: () => editDepartment(row) },
          { label: 'Delete', icon: 'trash', danger: true, divider: true, run: () => deleteDepartment(row) }
        ]" />
      </template>
    </DataTable>

    <!-- Create Department Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Department</h2>
          <form @submit.prevent="createDepartment">
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
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Code</label>
                <input
                  v-model="formData.code"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  v-model="formData.description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
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
                {{ loading ? 'Creating...' : 'Create Department' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Department Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Department</h2>
          <form @submit.prevent="updateDepartment">
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
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Code</label>
                <input
                  v-model="editFormData.code"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  v-model="editFormData.description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
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
                {{ loading ? 'Updating...' : 'Update Department' }}
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
import type { Department } from '../../types'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import { niceName } from '@/components/dashboard/teacher/time'

type DepartmentRow = Department & { teachers_count?: number; subjects_count?: number; hod_name?: string | null }

const toast = useToastStore()
const confirmDialog = useConfirmStore()

const departments = ref<DepartmentRow[]>([])
const quick = ref<string | null>(null)

const columns: Column[] = [
  { key: 'name', label: 'Department', sortable: true, mobile: 'title', value: (r: DepartmentRow) => r.description || r.name },
  { key: 'hod_name', label: 'Head', sortable: true, mobile: 'subtitle', value: (r: DepartmentRow) => r.hod_name || '' },
  { key: 'teachers_count', label: 'Teachers', sortable: true, align: 'center' },
  { key: 'subjects_count', label: 'Subjects', sortable: true, align: 'center' }
]
const statItems = computed<StatItem[]>(() => [
  { label: 'Departments', value: departments.value.length, key: 'all', tone: 'indigo' },
  { label: 'No head', value: departments.value.filter(d => !d.hod_name).length, key: 'nohead', tone: 'amber' },
  { label: 'No teachers', value: departments.value.filter(d => !d.teachers_count).length, key: 'noteachers', tone: 'rose' },
  { label: 'No subjects', value: departments.value.filter(d => !d.subjects_count).length, key: 'nosubjects', tone: 'gray' }
])
const shown = computed(() => departments.value.filter(d => {
  switch (quick.value) {
    case 'nohead': return !d.hod_name
    case 'noteachers': return !d.teachers_count
    case 'nosubjects': return !d.subjects_count
    default: return true
  }
}))
const loading = ref(false)
const successMessage = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)

const formData = ref({
  name: '',
  code: '',
  description: ''
})

const editFormData = ref({
  id: 0,
  name: '',
  code: '',
  description: ''
})

const fetchDepartments = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/departments')

    if (response.data.success) {
      departments.value = response.data.data || []
    } else {
      console.error('API returned error:', response.data)
    }
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  } finally {
    loading.value = false
  }
}

const createDepartment = async () => {
  loading.value = true
  try {
    const response = await apiService.post('/admin/departments', formData.value)

    if (response.data.success) {
      const createdName = formData.value.name
      showCreateModal.value = false
      formData.value = { name: '', code: '', description: '' }
      successMessage.value = `Department "${createdName}" created successfully!`
      await fetchDepartments()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      console.error('API returned error:', response.data)
      toast.error(response.data.message || 'Failed to create department')
    }
  } catch (error: any) {
    console.error('Failed to create department:', error)
    console.error('Error response:', error.response?.data)
    console.error('Error status:', error.response?.status)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to create department'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}

const editDepartment = (department: Department) => {
  editFormData.value = {
    id: department.id,
    name: department.name,
    code: department.code,
    description: department.description || ''
  }
  showEditModal.value = true
}

const updateDepartment = async () => {
  loading.value = true
  try {
    const response = await apiService.put(`/admin/departments/${editFormData.value.id}`, {
      name: editFormData.value.name,
      code: editFormData.value.code,
      description: editFormData.value.description
    })

    if (response.data.success) {
      showEditModal.value = false
      successMessage.value = `Department "${editFormData.value.name}" updated successfully!`
      await fetchDepartments()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      toast.error(response.data.message || 'Failed to update department')
    }
  } catch (error: any) {
    console.error('Failed to update department:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update department'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}

const deleteDepartment = async (department: Department) => {
  if (!await confirmDialog.open({ title: 'Delete department', message: `Are you sure you want to delete department "${department.name}"? This action cannot be undone.`, confirmLabel: 'Delete', danger: true })) return

  loading.value = true
  try {
    const response = await apiService.delete(`/admin/departments/${department.id}`)

    if (response.data.success) {
      successMessage.value = `Department "${department.name}" deleted successfully!`
      await fetchDepartments()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      toast.error(response.data.message || 'Failed to delete department')
    }
  } catch (error: any) {
    console.error('Failed to delete department:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to delete department'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  fetchDepartments()
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
