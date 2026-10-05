<template>
  <!-- Students enrolled in the department: find anyone by name, admission number or class, add a
       photo, or de-enrol them from the department. -->
  <div class="w-full">
    <PageHeader title="Students" description="Everyone enrolled in your department - by class, with photos." icon="users" accent="indigo" :active-filters="classLabel ? 1 : 0">
      <StatStrip v-if="!loading && students.length" v-model="filter" :items="statItems" />
      <template #filters>
        <select v-model="classLabel" class="w-full sm:w-52 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Class">
          <option value="">All classes</option>
          <option v-for="c in classOptions" :key="c" :value="c">{{ c }}</option>
        </select>
      </template>
    </PageHeader>

    <div v-if="error" class="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-800 dark:text-rose-200">{{ error }}</div>

    <DataTable
      v-else
      :columns="columns"
      :rows="shown"
      :loading="loading"
      :search-keys="['name', 'admission_number', 'username', 'class_label']"
      search-placeholder="Search name or admission no."
      :page-size="30"
      :initial-sort="{ key: 'name', dir: 'asc' }"
      empty-title="No students here"
      empty-message="Students enrolled in your department show up here."
    >
      <template #cell-name="{ row }">
        <div class="flex items-center gap-3 min-w-0">
          <img v-if="row.profile_photo" :src="resolveAssetUrl(row.profile_photo)" alt="" class="w-9 h-9 rounded-full object-cover flex-shrink-0">
          <span v-else class="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200">{{ initials(row.name) }}</span>
          <span class="min-w-0">
            <span class="block font-semibold text-gray-900 dark:text-white truncate">{{ row.name }}</span>
            <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">@{{ row.username }}</span>
          </span>
        </div>
      </template>
      <template #cell-gender="{ row }">
        <span class="capitalize text-gray-600 dark:text-gray-300">{{ row.gender || '-' }}</span>
      </template>
      <template #cell-status="{ row }">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="row.is_active ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'">{{ row.is_active ? 'Active' : 'Suspended' }}</span>
      </template>
      <template #actions="{ row }">
        <ActionMenu :items="[
          { label: row.profile_photo ? 'Change photo' : 'Add photo', icon: 'camera', run: () => (photoTarget = row) },
          { label: 'De-enrol from department', icon: 'trash', danger: true, divider: true, run: () => deenrol(row) }
        ]" />
      </template>
    </DataTable>

    <StudentPhotoModal
      v-if="photoTarget"
      :student-id="photoTarget.id"
      :student-name="photoTarget.name"
      :current-photo="photoTarget.profile_photo"
      :upload-url="`/hod/students/${photoTarget.id}/photo`"
      @close="photoTarget = null"
      @uploaded="onPhotoUploaded"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiService } from '@/services/api'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { resolveAssetUrl } from '@/utils/url'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import StudentPhotoModal from '@/components/students/StudentPhotoModal.vue'
import { initials, niceName } from '@/components/dashboard/teacher/time'
import { usePersistedRef } from '@/composables/usePersistedRef'

interface Student {
  id: number
  username: string
  admission_number: string
  first_name: string
  last_name: string
  gender: string
  is_active: number
  class_name: string | null
  stream_name: string | null
  profile_photo: string | null
}
type Row = Student & { name: string; class_label: string }

const toast = useToastStore()
const confirmDialog = useConfirmStore()

const columns: Column[] = [
  { key: 'name', label: 'Student', sortable: true, mobile: 'title' },
  { key: 'admission_number', label: 'Admission no.', sortable: true, mobile: 'subtitle' },
  { key: 'class_label', label: 'Class', sortable: true },
  { key: 'gender', label: 'Gender', sortable: true },
  { key: 'status', label: 'Status', value: (r: Row) => (r.is_active ? 1 : 0) }
]

const students = ref<Row[]>([])
const loading = ref(true)
const error = ref('')
const filter = ref<string | null>(null)
const classLabel = usePersistedRef('hod-students:class', '')
const photoTarget = ref<Row | null>(null)

const classOptions = computed(() => [...new Set(students.value.map(s => s.class_label).filter(Boolean))].sort())
const inClass = computed(() => students.value.filter(s => !classLabel.value || s.class_label === classLabel.value))
const statItems = computed<StatItem[]>(() => [
  { label: classLabel.value ? classLabel.value : 'Students', value: inClass.value.length, key: 'all', tone: 'indigo' },
  { label: 'Girls', value: inClass.value.filter(s => s.gender?.toLowerCase() === 'female').length, key: 'female', tone: 'violet' },
  { label: 'Boys', value: inClass.value.filter(s => s.gender?.toLowerCase() === 'male').length, key: 'male', tone: 'sky' },
  { label: 'No photo', value: inClass.value.filter(s => !s.profile_photo).length, key: 'nophoto', tone: 'gray' }
])
const shown = computed(() => inClass.value.filter(s => {
  if (filter.value === 'female' || filter.value === 'male') return s.gender?.toLowerCase() === filter.value
  if (filter.value === 'nophoto') return !s.profile_photo
  return true
}))

const load = async () => {
  try {
    const response = await apiService.get('/hod/students', { limit: 5000 })
    students.value = (response.data.data.students || []).map((s: Student) => ({
      ...s,
      name: niceName(`${s.first_name} ${s.last_name}`),
      class_label: s.class_name ? `${s.class_name}${s.stream_name ? '-' + s.stream_name : ''}` : ''
    }))
    if (classLabel.value && !students.value.some(s => s.class_label === classLabel.value)) classLabel.value = ''
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not load the students'
  } finally {
    loading.value = false
  }
}

const onPhotoUploaded = (newPath: string) => {
  if (photoTarget.value) photoTarget.value.profile_photo = newPath
  photoTarget.value = null
}

const deenrol = async (s: Row) => {
  if (!await confirmDialog.open({
    title: 'De-enrol student',
    message: `De-enrol ${s.name} from your department?\n\nThis removes them from every teacher in the department. Their account and past records (submissions, marks, attendance) are kept.`,
    confirmLabel: 'De-enrol',
    danger: true
  })) return
  try {
    const response = await apiService.post('/hod/students/deenroll', { student_ids: [s.id] })
    if (response.data.success) {
      students.value = students.value.filter(x => x.id !== s.id)
      toast.success(`${s.name} de-enrolled`)
    } else {
      toast.error(response.data.message || 'Could not de-enrol')
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not de-enrol')
  }
}

onMounted(load)
</script>
