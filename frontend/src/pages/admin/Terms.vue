<template>
  <div>
    <PageHeader title="Terms" description="Each year's terms on a timeline - where the school is now, and what comes next. Click a term to change its dates." icon="clock" accent="indigo">
      <template #actions>
        <RouterLink to="/admin/academic-years" class="btn-secondary">Academic years</RouterLink>
        <button type="button" class="btn-primary" @click="openTermModal()">Add term</button>
      </template>
    </PageHeader>
    <SchoolCalendar
      :years="academicYears"
      :terms="terms"
      :loading="fetching"
      :year-actions="false"
      @add-term="addTermTo"
      @edit-term="openTermModal"
      @delete-term="confirmDeleteTerm"
    />

    <!-- Term Modal -->
    <div v-if="showTermModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
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
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete this term? This action cannot be undone.
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
import type { Term, AcademicYear } from '@/types'
import { useToastStore } from '@/stores/toast'
import PageHeader from '@/components/ui/PageHeader.vue'
import SchoolCalendar from '@/components/admin/SchoolCalendar.vue'

const toast = useToastStore()

const terms = ref<Term[]>([])
const academicYears = ref<AcademicYear[]>([])
const loading = ref(false)
// First load only - `loading` is also the modals' saving flag
const fetching = ref(true)

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
    const response = await apiService.get('/admin/terms')
    if (response.data.success) {
      terms.value = response.data.data
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

const confirmDeleteTerm = (term: Term) => {
  deleteTargetId.value = term.id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteTargetId.value = null
}

const executeDelete = async () => {
  loading.value = true
  try {
    const response = await apiService.delete(`/admin/terms/${deleteTargetId.value}`)

    if (response.data.success) {
      closeDeleteModal()
      await fetchTerms()
      toast.success('Term deleted')
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
