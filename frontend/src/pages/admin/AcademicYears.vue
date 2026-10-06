<template>
  <div>
    <PageHeader title="Academic years & terms" description="The school calendar - each year with its terms on a timeline. Click a term to change its dates." icon="clock" accent="indigo">
      <template #actions>
        <button type="button" class="btn-secondary" @click="openTermModal()">Add term</button>
        <button type="button" class="btn-primary" @click="openAcademicYearModal()">Add year</button>
      </template>
    </PageHeader>
    <SchoolCalendar
      :years="academicYears"
      :terms="terms"
      :loading="fetching"
      :year-actions="true"
      @add-term="addTermTo"
      @edit-term="openTermModal"
      @delete-term="confirmDeleteTerm"
      @edit-year="openAcademicYearModal"
      @delete-year="confirmDeleteAcademicYear"
    />

    <!-- Academic Year Modal -->
    <div v-if="showAcademicYearModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ editingAcademicYear ? 'Edit Academic Year' : 'Add Academic Year' }}
        </h3>
        <form @submit.prevent="saveAcademicYear">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              v-model="academicYearForm.name"
              type="text"
              required
              placeholder="e.g., 2024-2025"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
            <input
              v-model="academicYearForm.start_date"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
            <input
              v-model="academicYearForm.end_date"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="mb-4">
            <label class="flex items-center">
              <input
                v-model="academicYearForm.is_current"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Set as current academic year</span>
            </label>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeAcademicYearModal"
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

    <!-- Term Modal -->
    <div v-if="showTermModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ editingTerm ? 'Edit Term' : 'Add Term' }}
        </h3>
        <form @submit.prevent="saveTerm">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Term Name</label>
            <select
              v-model="termForm.name"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Term</option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year</label>
            <select
              v-model="termForm.academic_year_id"
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
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
            <input
              v-model="termForm.start_date"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
            <input
              v-model="termForm.end_date"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="mb-4">
            <label class="flex items-center">
              <input
                v-model="termForm.is_current"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Set as current term</span>
            </label>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeTermModal"
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
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'
import type { AcademicYear, Term } from '@/types'
import { useToastStore } from '@/stores/toast'
import PageHeader from '@/components/ui/PageHeader.vue'
import SchoolCalendar from '@/components/admin/SchoolCalendar.vue'

const toast = useToastStore()

const academicYears = ref<AcademicYear[]>([])
const terms = ref<Term[]>([])
const loading = ref(false)
// First load only - `loading` is also the modals' saving flag
const fetching = ref(true)

// Academic Year Modal
const showAcademicYearModal = ref(false)
const editingAcademicYear = ref<AcademicYear | null>(null)
const academicYearForm = ref({
  name: '',
  start_date: '',
  end_date: '',
  is_current: false
})

// Term Modal
const showTermModal = ref(false)
const editingTerm = ref<Term | null>(null)
const termForm = ref({
  name: '',
  academic_year_id: '',
  start_date: '',
  end_date: '',
  is_current: false
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

const fetchTerms = async () => {
  loading.value = true
  try {
    console.log('Fetching terms...')
    const response = await apiService.get('/admin/terms')
    console.log('Terms response:', response.data)
    if (response.data.success) {
      terms.value = response.data.data
      console.log('Terms loaded:', terms.value)
    } else {
      console.error('Failed to fetch terms:', response.data.message)
    }
  } catch (error: any) {
    console.error('Failed to fetch terms:', error)
    toast.error('Failed to fetch terms')
  } finally {
    fetching.value = false
    loading.value = false
  }
}

const openAcademicYearModal = (academicYear?: AcademicYear) => {
  editingAcademicYear.value = academicYear || null
  if (academicYear) {
    academicYearForm.value = {
      name: academicYear.name,
      start_date: academicYear.start_date.split(' ')[0],
      end_date: academicYear.end_date.split(' ')[0],
      is_current: academicYear.is_current === 1
    }
  } else {
    academicYearForm.value = {
      name: '',
      start_date: '',
      end_date: '',
      is_current: false
    }
  }
  showAcademicYearModal.value = true
}

const closeAcademicYearModal = () => {
  showAcademicYearModal.value = false
  editingAcademicYear.value = null
  academicYearForm.value = {
    name: '',
    start_date: '',
    end_date: '',
    is_current: false
  }
}

const saveAcademicYear = async () => {
  loading.value = true
  try {
    const data = {
      name: academicYearForm.value.name,
      start_date: academicYearForm.value.start_date,
      end_date: academicYearForm.value.end_date,
      is_current: academicYearForm.value.is_current ? 1 : 0
    }

    let response
    if (editingAcademicYear.value) {
      response = await apiService.put(`/admin/academic-years/${editingAcademicYear.value.id}`, data)
    } else {
      response = await apiService.post('/admin/academic-years', data)
    }

    if (response.data.success) {
      closeAcademicYearModal()
      await fetchAcademicYears()
      await fetchTerms()
      toast.success('Academic year saved')
    } else {
      toast.error(response.data.message || 'Failed to save academic year')
    }
  } catch (error: any) {
    console.error('Failed to save academic year:', error)
    toast.error('Failed to save academic year')
  } finally {
    loading.value = false
  }
}

// "+ Term" on a year: a new term with that year already chosen
const addTermTo = (year: AcademicYear) => {
  openTermModal()
  termForm.value.academic_year_id = String(year.id)
}

const openTermModal = (term?: Term) => {
  editingTerm.value = term || null
  if (term) {
    termForm.value = {
      name: term.name,
      academic_year_id: term.academic_year_id.toString(),
      start_date: term.start_date.split(' ')[0],
      end_date: term.end_date.split(' ')[0],
      is_current: term.is_current === 1
    }
  } else {
    termForm.value = {
      name: '',
      academic_year_id: '',
      start_date: '',
      end_date: '',
      is_current: false
    }
  }
  showTermModal.value = true
}

const closeTermModal = () => {
  showTermModal.value = false
  editingTerm.value = null
  termForm.value = {
    name: '',
    academic_year_id: '',
    start_date: '',
    end_date: '',
    is_current: false
  }
}

const saveTerm = async () => {
  loading.value = true
  try {
    const data = {
      name: termForm.value.name,
      academic_year_id: parseInt(termForm.value.academic_year_id),
      start_date: termForm.value.start_date,
      end_date: termForm.value.end_date,
      is_current: termForm.value.is_current ? 1 : 0
    }

    let response
    if (editingTerm.value) {
      response = await apiService.put(`/admin/terms/${editingTerm.value.id}`, data)
    } else {
      response = await apiService.post('/admin/terms', data)
    }

    if (response.data.success) {
      closeTermModal()
      await fetchTerms()
      await fetchAcademicYears()
      toast.success('Term saved')
    } else {
      toast.error(response.data.message || 'Failed to save term')
    }
  } catch (error: any) {
    console.error('Failed to save term:', error)
    toast.error('Failed to save term')
  } finally {
    loading.value = false
  }
}

const confirmDeleteAcademicYear = (academicYear: AcademicYear) => {
  deleteTargetType.value = 'academic year'
  deleteTargetId.value = academicYear.id
  showDeleteModal.value = true
}

const confirmDeleteTerm = (term: Term) => {
  deleteTargetType.value = 'term'
  deleteTargetId.value = term.id
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
    let response
    if (deleteTargetType.value === 'academic year') {
      response = await apiService.delete(`/admin/academic-years/${deleteTargetId.value}`)
    } else {
      response = await apiService.delete(`/admin/terms/${deleteTargetId.value}`)
    }

    if (response.data.success) {
      closeDeleteModal()
      await fetchAcademicYears()
      await fetchTerms()
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
  fetchTerms()

})
</script>
