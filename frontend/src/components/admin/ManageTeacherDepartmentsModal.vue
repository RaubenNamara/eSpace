<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Manage Departments</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ teacherName }}</p>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          A teacher can belong to more than one department. Check every department this teacher belongs to,
          then pick which one is their <strong>primary / active</strong> department &mdash; that's the one used
          for their dashboard and everything else that expects a single department.
        </p>

        <div v-if="loading" class="text-center py-8 text-gray-500 dark:text-gray-400">
          <div class="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
        </div>

        <div v-else class="space-y-1 max-h-72 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-100 dark:divide-gray-700">
          <label
            v-for="dept in allDepartments"
            :key="dept.id"
            class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/60 cursor-pointer"
          >
            <span class="flex items-center gap-3">
              <input
                type="checkbox"
                :value="dept.id"
                v-model="selectedIds"
                class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              >
              <span class="text-sm text-gray-900 dark:text-white">{{ dept.name }}</span>
            </span>
            <button
              v-if="selectedIds.includes(dept.id)"
              type="button"
              @click="primaryId = dept.id"
              class="text-xs font-medium px-2 py-1 rounded-full transition-colors"
              :class="primaryId === dept.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'"
            >
              {{ primaryId === dept.id ? 'Primary' : 'Set as primary' }}
            </button>
          </label>
        </div>

        <p v-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      </div>

      <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
        <button
          type="button"
          @click="close"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="button"
          :disabled="saving || loading || selectedIds.length === 0"
          @click="save"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'

const props = defineProps<{
  teacherId: number
  teacherName: string
  allDepartments: { id: number; name: string }[]
}>()

const emit = defineEmits<{ close: []; saved: [] }>()

const loading = ref(true)
const saving = ref(false)
const error = ref('')
const selectedIds = ref<number[]>([])
const primaryId = ref<number | null>(null)

const close = () => emit('close')

const load = async () => {
  loading.value = true
  try {
    const response = await apiService.get(`/admin/teachers/${props.teacherId}`)
    if (response.data.success) {
      const depts = response.data.data.departments || []
      selectedIds.value = depts.map((d: any) => d.id)
      const primary = depts.find((d: any) => d.is_primary)
      primaryId.value = primary ? primary.id : (depts[0]?.id ?? null)
    }
  } catch (err) {
    console.error('Failed to load teacher departments:', err)
    error.value = 'Failed to load current departments'
  } finally {
    loading.value = false
  }
}

const save = async () => {
  error.value = ''

  if (selectedIds.value.length === 0) {
    error.value = 'Select at least one department'
    return
  }

  if (!primaryId.value || !selectedIds.value.includes(primaryId.value)) {
    primaryId.value = selectedIds.value[0]
  }

  saving.value = true
  try {
    const response = await apiService.put(`/admin/teachers/${props.teacherId}/departments`, {
      department_ids: selectedIds.value,
      primary_department_id: primaryId.value
    })
    if (response.data.success) {
      emit('saved')
      close()
    } else {
      error.value = response.data.message || 'Failed to update departments'
    }
  } catch (err: any) {
    console.error('Failed to update departments:', err)
    error.value = err.response?.data?.message || 'Failed to update departments'
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
