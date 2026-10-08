// A teacher content page (Videos, Item Bank) used by a teacher, a HOD or an admin: which API to
// call, and - for a HOD or admin - the departments, their subjects and the classes an item can be
// aimed at (GET /{role}/{module}/options), plus the department filter on the page.
import { computed, ref, type Ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { usePersistedRef } from '@/composables/usePersistedRef'
import type { PickerOption } from '@/components/common/PickerDropdown.vue'
import type { AudienceLevel } from '@/components/library/DepartmentAudiencePicker.vue'

export type ContentRole = 'teacher' | 'hod' | 'admin'

/** The signed-in user's side of a content page (callable before the page's form exists) */
export function currentContentRole(): ContentRole {
  const r = useAuthStore().userRole
  return r === 'hod' ? 'hod' : r === 'teacher' ? 'teacher' : 'admin'
}

interface ContentOptions {
  departments: { id: number; name: string; code: string; subjects: { id: number; name: string; code: string }[]; levels: AudienceLevel[] }[]
  all_levels?: string[]
}

export function useContentRole(
  module: 'videos' | 'itembank',
  form: Ref<{ department_id?: string }>,
  teacherSubjects: () => { id: number; name: string }[]
) {
  const role = currentContentRole()
  const api = `/api/${role}/${module}`
  const options = ref<ContentOptions | null>(null)
  const optionsError = ref<string | null>(null)
  const departmentFilter = usePersistedRef<string>(`${role}-${module}:department`, '')

  const loadOptions = async () => {
    try {
      const response = await axios.get(`${api}/options`)
      options.value = response.data.data
    } catch {
      optionsError.value = 'Could not load departments and classes'
    }
  }

  const departmentOptions = computed<PickerOption<string>[]>(() => [
    { value: '', label: 'All departments' },
    ...(options.value?.departments ?? []).map(d => ({ value: String(d.id), label: d.name }))
  ])

  // The upload form's department: a HOD's own, or the one an admin picked
  const formDepartment = computed(() => {
    const deps = options.value?.departments ?? []
    return role === 'hod' ? deps[0] || null : deps.find(d => String(d.id) === form.value.department_id) || null
  })
  const subjectChoices = computed(() => (role === 'teacher' ? teacherSubjects() : formDepartment.value?.subjects ?? []))
  // Class levels the school has that this department has no learners in (so they can't be chosen)
  const missingLevels = computed(() => {
    const have = new Set((formDepartment.value?.levels ?? []).map(l => l.name))
    return (options.value?.all_levels ?? []).filter(n => !have.has(n))
  })

  return { role, api, options, optionsError, loadOptions, departmentFilter, departmentOptions, formDepartment, subjectChoices, missingLevels }
}
