<template>
  <!-- Every student in the school: find anyone fast, filter by class, fix details, reset a
       password - one at a time or in bulk. -->
  <div class="w-full">
    <PageHeader title="Students" description="Every student in the school - find anyone, change their class, reset a password, or work on many at once." icon="users" accent="indigo" :active-filters="classFilter ? 1 : 0">
      <template #actions>
        <button type="button" class="btn-primary" @click="showCreateModal = true">Add student</button>
      </template>
      <StatStrip v-if="!loading && students.length" v-model="quick" :items="statItems" />
      <template #filters>
        <select v-model="classFilter" class="w-full sm:w-60 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Class">
          <option value="">All classes</option>
          <option v-for="cls in classes" :key="cls.id" :value="String(cls.id)">{{ classLabel(cls) }}</option>
        </select>
      </template>
    </PageHeader>

    <!-- Toast Notification -->
    <transition name="toast">
      <div
        v-if="successMessage"
        class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-emerald-200 dark:border-emerald-800 p-4 flex items-center gap-4 min-w-[280px] max-w-[calc(100vw-3rem)]"
      >
        <div class="flex-shrink-0 w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-semibold text-gray-900 dark:text-white">Done</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ successMessage }}</p>
        </div>
        <button class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" aria-label="Close" @click="successMessage = ''">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </transition>

    <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
      <select v-model="bulkAssignClassId" class="px-2.5 py-1 min-h-[32px] text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white">
        <option value="">Move to class…</option>
        <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ classLabel(cls) }}</option>
      </select>
      <button :disabled="!bulkAssignClassId" class="bulk-btn disabled:opacity-50" @click="bulkAssignClass">Apply</button>
      <button class="bulk-btn" @click="bulkSetActive(true)">Activate</button>
      <button class="bulk-btn" @click="bulkSetActive(false)">Deactivate</button>
      <button class="bulk-btn" @click="bulkExport">Export CSV</button>
      <button class="px-2.5 py-1 min-h-[32px] text-xs font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-700" @click="bulkDeleteSelected">Delete</button>
    </BulkActionBar>

    <DataTable
      :columns="columns"
      :rows="shown"
      :loading="loading && !students.length"
      :search-keys="['name', 'admission_number', 'username', 'email']"
      search-placeholder="Search name, reg no, username or email"
      :page-size="30"
      :initial-sort="{ key: 'name', dir: 'asc' }"
      empty-title="No students here"
      :empty-message="students.length ? 'Nothing matches this filter.' : 'Add your first student, or import a list from Admin tools.'"
    >
      <template #toolbar>
        <label class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input type="checkbox" :checked="bulk.allSelected(visibleIds)" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500" @change="bulk.toggleAll(visibleIds)">
          Select all {{ shown.length.toLocaleString() }}
        </label>
      </template>
      <template #cell-name="{ row }">
        <span class="flex items-center gap-2.5 min-w-0">
          <input type="checkbox" :checked="bulk.isSelected(row.id)" class="flex-shrink-0 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500" :aria-label="`Select ${row.name}`" @click.stop @change="bulk.toggle(row.id)">
          <img v-if="row.profile_photo" :src="resolveAssetUrl(row.profile_photo)" alt="" class="w-8 h-8 rounded-full object-cover flex-shrink-0" loading="lazy">
          <span v-else class="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-[11px] font-bold flex items-center justify-center flex-shrink-0">{{ initials(row.name) }}</span>
          <span class="min-w-0">
            <span class="block font-semibold text-gray-900 dark:text-white truncate">{{ row.name }}</span>
            <span v-if="row.username" class="block text-[11px] text-gray-400 truncate">@{{ row.username }}</span>
          </span>
        </span>
      </template>
      <template #cell-class="{ row }">
        <span v-if="row.class" class="text-gray-700 dark:text-gray-200">{{ row.class }}</span>
        <span v-else class="text-amber-600 dark:text-amber-400 text-xs font-semibold">No class</span>
      </template>
      <template #cell-gender="{ row }">
        <span class="capitalize text-gray-600 dark:text-gray-300">{{ row.gender || '-' }}</span>
      </template>
      <template #cell-is_active="{ row }">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="row.is_active ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'">{{ row.is_active ? 'Active' : 'Inactive' }}</span>
      </template>
      <template #actions="{ row }">
        <ActionMenu :label="`Actions for ${row.name}`" :items="[
          { label: 'Edit details', icon: 'pencil', run: () => editStudent(row) },
          { label: 'New password', icon: 'key', run: () => regeneratePassword(row) },
          { label: 'Delete', icon: 'trash', danger: true, divider: true, run: () => deleteStudent(row) }
        ]" />
      </template>
    </DataTable>

    <!-- Create Student Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Student</h2>
          <form @submit.prevent="createStudent">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name *</label>
                <input
                  v-model="formData.first_name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name *</label>
                <input
                  v-model="formData.last_name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reg No *</label>
                <input
                  v-model="formData.admission_number"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                <select
                  v-model="formData.gender"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
                <select
                  v-model="formData.class_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Class</option>
                  <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                    {{ cls.name }} ({{ cls.level }}) {{ cls.stream_name ? '- ' + cls.stream_name : '' }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button
                type="button"
                @click="showCreateModal = false"
                class="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="btn-primary flex-1"
              >
                {{ loading ? 'Creating...' : 'Add Student' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Student Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Student</h2>

          <div class="flex items-center gap-3 mb-5">
            <img v-if="editFormData.profile_photo" :src="resolveAssetUrl(editFormData.profile_photo)" alt="" class="w-14 h-14 rounded-lg object-cover ring-2 ring-gray-200 dark:ring-gray-600">
            <div v-else class="w-14 h-14 rounded-lg flex items-center justify-center bg-indigo-600 text-white font-bold">
              {{ (editFormData.first_name[0] || '') + (editFormData.last_name[0] || '') }}
            </div>
            <button type="button" @click="showPhotoModal = true" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Change photo
            </button>
          </div>

          <form @submit.prevent="updateStudent">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name *</label>
                <input
                  v-model="editFormData.first_name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name *</label>
                <input
                  v-model="editFormData.last_name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reg No *</label>
                <input
                  v-model="editFormData.admission_number"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                <select
                  v-model="editFormData.gender"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
                <select
                  v-model="editFormData.class_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Class</option>
                  <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                    {{ cls.name }} ({{ cls.level }}) {{ cls.stream_name ? '- ' + cls.stream_name : '' }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  v-model="editFormData.is_active"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option :value="1">Active</option>
                  <option :value="0">Inactive</option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button
                type="button"
                @click="showEditModal = false"
                class="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="btn-primary flex-1"
              >
                {{ loading ? 'Updating...' : 'Update Student' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <StudentPhotoModal
      v-if="showPhotoModal"
      :student-id="editFormData.id"
      :student-name="`${editFormData.first_name} ${editFormData.last_name}`"
      :current-photo="editFormData.profile_photo"
      :upload-url="`/admin/students/${editFormData.id}/photo`"
      @close="showPhotoModal = false"
      @uploaded="onPhotoUploaded"
    />

    <!-- Password Display Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
            </div>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Password Regenerated</h2>
          <p class="text-gray-600 dark:text-gray-400 text-center mb-6">The student's password has been reset to their admission number.</p>

          <div class="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 mb-6">
            <div class="mb-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <div class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white rounded px-3 py-2 font-mono text-sm">
                {{ regeneratedPassword.username }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
              <div class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 font-mono text-sm font-bold text-green-600 dark:text-green-400">
                {{ regeneratedPassword.password }}
              </div>
            </div>
          </div>

          <button
            @click="showPasswordModal = false"
            class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiService } from '../../services/api'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'
import { resolveAssetUrl } from '@/utils/url'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import { niceName, initials } from '@/components/dashboard/teacher/time'
import StudentPhotoModal from '@/components/students/StudentPhotoModal.vue'

const toast = useToastStore()
const confirmDialog = useConfirmStore()
const bulk = useBulkSelection<number>()
const bulkAssignClassId = ref('')

interface Student {
  id: number
  admission_number: string
  first_name: string
  last_name: string
  is_active: number
  created_at: string
  class_id?: number
  class_name?: string
  class_level?: string
  gender?: string
  stream_name?: string
  stream_id?: number
  profile_photo?: string | null
  username?: string
  email?: string
}

interface Class {
  id: number
  name: string
  level: string
  stream_name?: string
}

const students = ref<Student[]>([])
const classes = ref<Class[]>([])
const stats = ref({ total: 0, male: 0, female: 0, other: 0 })
const pagination = ref({ page: 1, limit: 20, total: 0, pages: 0 })
const loading = ref(false)
const successMessage = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showPhotoModal = ref(false)
const showPasswordModal = ref(false)
const classFilter = usePersistedRef('admin-students-class-filter', '')
const regeneratedPassword = ref({
  username: '',
  password: ''
})

const formData = ref({
  first_name: '',
  last_name: '',
  admission_number: '',
  gender: '',
  class_id: ''
})

const editFormData = ref({
  id: 0,
  first_name: '',
  last_name: '',
  admission_number: '',
  gender: '',
  class_id: '',
  is_active: 1,
  profile_photo: null as string | null
})

const fetchClasses = async () => {
  try {
    const response = await apiService.get('/admin/classes')
    if (response.data.success) {
      classes.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch classes:', error)
  }
}

// Fetches the whole school at once - search, class filter and paging all happen in the table.
// `page` is kept so the existing callers still read naturally.
const fetchStudents = async (_page = 1) => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/students', { page: 1, limit: 10000 })
    if (response.data.success) {
      students.value = response.data.data.students || []
      stats.value = response.data.data.stats
      pagination.value = response.data.data.pagination
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Could not load the students')
  } finally {
    loading.value = false
  }
}

const columns: Column[] = [
  { key: 'name', label: 'Student', sortable: true, mobile: 'title' },
  { key: 'admission_number', label: 'Reg no.', sortable: true, mobile: 'subtitle' },
  { key: 'class', label: 'Class', sortable: true, value: (r: any) => r.class || '' },
  { key: 'gender', label: 'Gender', sortable: true },
  { key: 'is_active', label: 'Status', sortable: true, value: (r: any) => (r.is_active ? 1 : 0) }
]
const classLabel = (c: Class) => `${c.name}${c.stream_name ? ` - ${c.stream_name}` : ''}`
const quick = ref<string | null>(null)
const rows = computed(() => students.value.map(s => ({
  ...s,
  name: niceName(`${s.first_name} ${s.last_name}`),
  class: s.class_name ? (s.stream_name ? `${s.class_name}-${s.stream_name}` : s.class_name) : ''
})))
const inClass = computed(() => rows.value.filter(s => !classFilter.value || String(s.class_id) === String(classFilter.value)))
const statItems = computed<StatItem[]>(() => [
  { label: 'Students', value: inClass.value.length.toLocaleString(), key: 'all', tone: 'indigo' },
  { label: 'Girls', value: inClass.value.filter(s => s.gender === 'female').length.toLocaleString(), key: 'female', tone: 'violet' },
  { label: 'Boys', value: inClass.value.filter(s => s.gender === 'male').length.toLocaleString(), key: 'male', tone: 'sky' },
  { label: 'Inactive', value: inClass.value.filter(s => !s.is_active).length.toLocaleString(), key: 'inactive', tone: 'gray' },
  { label: 'No class', value: inClass.value.filter(s => !s.class_id).length.toLocaleString(), key: 'noclass', tone: 'amber', hint: 'need placing' }
])
const shown = computed(() => inClass.value.filter(s => {
  switch (quick.value) {
    case 'female': return s.gender === 'female'
    case 'male': return s.gender === 'male'
    case 'inactive': return !s.is_active
    case 'noclass': return !s.class_id
    default: return true
  }
}))

const visibleIds = computed(() => shown.value.map(s => s.id))

const bulkAssignClass = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0 || !bulkAssignClassId.value) return
  try {
    await apiService.post('/admin/students/bulk-update', { ids, class_id: parseInt(bulkAssignClassId.value) })
    toast.success(`${ids.length} student(s) assigned`)
    bulk.clear()
    bulkAssignClassId.value = ''
    await fetchStudents(pagination.value.page)
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to assign class')
  }
}

const bulkSetActive = async (isActive: boolean) => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  try {
    await apiService.post('/admin/students/bulk-update', { ids, is_active: isActive ? 1 : 0 })
    toast.success(`${ids.length} student(s) updated`)
    bulk.clear()
    await fetchStudents(pagination.value.page)
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update students')
  }
}

const bulkDeleteSelected = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  if (!await confirmDialog.open({ title: 'Delete students', message: `Are you sure you want to delete ${ids.length} student(s)? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await apiService.post('/admin/students/bulk-delete', { ids })
    toast.success(`${ids.length} student(s) deleted`)
    bulk.clear()
    await fetchStudents(pagination.value.page)
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete students')
  }
}

const bulkExport = async () => {
  const ids = bulk.selectedArray()
  try {
    const response = await apiService.post('/admin/students/bulk-export', { ids }, { responseType: 'blob' })
    downloadBlob(response.data as unknown as Blob, 'students.csv')
  } catch (error) {
    toast.error('Failed to export students')
  }
}

const createStudent = async () => {
  loading.value = true
  try {
    const payload: any = {
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      admission_number: formData.value.admission_number
    }
    
    if (formData.value.gender) payload.gender = formData.value.gender
    if (formData.value.class_id) payload.class_id = parseInt(formData.value.class_id)
    
    const response = await apiService.post('/admin/students', payload)
    
    if (response.data.success) {
      const createdName = formData.value.first_name + ' ' + formData.value.last_name
      showCreateModal.value = false
      resetFormData()
      successMessage.value = `Student "${createdName}" created successfully!`
      await fetchStudents()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      toast.error(response.data.message || 'Failed to create student')
    }
  } catch (error: any) {
    console.error('Failed to create student:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to create student'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}

const editStudent = (student: Student) => {
  editFormData.value = {
    id: student.id,
    first_name: student.first_name,
    last_name: student.last_name,
    admission_number: student.admission_number,
    gender: student.gender || '',
    class_id: student.class_id?.toString() || '',
    is_active: student.is_active,
    profile_photo: student.profile_photo || null
  }
  showEditModal.value = true
}

const onPhotoUploaded = (newPath: string) => {
  editFormData.value.profile_photo = newPath
  const student = students.value.find(s => s.id === editFormData.value.id)
  if (student) student.profile_photo = newPath
  showPhotoModal.value = false
}

const updateStudent = async () => {
  loading.value = true
  try {
    const payload: any = {
      first_name: editFormData.value.first_name,
      last_name: editFormData.value.last_name,
      admission_number: editFormData.value.admission_number,
      is_active: editFormData.value.is_active
    }
    
    if (editFormData.value.gender) payload.gender = editFormData.value.gender
    if (editFormData.value.class_id) payload.class_id = parseInt(editFormData.value.class_id)
    
    const response = await apiService.put(`/admin/students/${editFormData.value.id}`, payload)
    
    if (response.data.success) {
      showEditModal.value = false
      successMessage.value = `Student "${editFormData.value.first_name} ${editFormData.value.last_name}" updated successfully!`
      await fetchStudents()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      toast.error(response.data.message || 'Failed to update student')
    }
  } catch (error: any) {
    console.error('Failed to update student:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update student'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}

const deleteStudent = async (student: Student) => {
  if (!await confirmDialog.open({ title: 'Delete student', message: `Are you sure you want to delete student "${student.first_name} ${student.last_name}"? This action cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  
  loading.value = true
  try {
    const response = await apiService.delete(`/admin/students/${student.id}`)
    
    if (response.data.success) {
      successMessage.value = `Student "${student.first_name} ${student.last_name}" deleted successfully!`
      await fetchStudents()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      toast.error(response.data.message || 'Failed to delete student')
    }
  } catch (error: any) {
    console.error('Failed to delete student:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to delete student'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}

const resetFormData = () => {
  formData.value = {
    first_name: '',
    last_name: '',
    admission_number: '',
    gender: '',
    class_id: ''
  }
}

const regeneratePassword = async (student: Student) => {
  if (!await confirmDialog.open({ title: 'Regenerate password', message: `Are you sure you want to regenerate the password for ${student.first_name} ${student.last_name}?`, confirmLabel: 'Regenerate' })) return
  
  loading.value = true
  try {
    const response = await apiService.post(`/admin/students/${student.id}/regenerate-password`, {})
    
    if (response.data.success) {
      regeneratedPassword.value = {
        username: response.data.data.username,
        password: response.data.data.new_password
      }
      showPasswordModal.value = true
    } else {
      toast.error(response.data.message || 'Failed to regenerate password')
    }
  } catch (error: any) {
    console.error('Failed to regenerate password:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to regenerate password'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchClasses()
  fetchStudents()
})
</script>

<style scoped>
.bulk-btn { @apply px-2.5 py-1 min-h-[32px] text-xs font-semibold rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700; }
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
