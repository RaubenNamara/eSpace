import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import type { PickerOption } from '@/components/common/PickerDropdown.vue'

interface Term { id: number; name: string; academic_year: string | null; is_current: number | boolean }
interface ClassOption { id: number; name: string; stream_name?: string | null }
interface SubjectOption { id: number; name: string }

/**
 * The Term / Class / Subject choice shared by pages used by teachers, HODs and admins (Marksheets,
 * Physical Exams). Loads each role's lists, puts a teacher's own streams first, and opens on the
 * current term and the last class and subject used on that page (else the first) - never a blank
 * "Select…". `key` keeps each page's memory separate; it's per role too.
 */
export function useClassSubjectPicker(key: string) {
  const authStore = useAuthStore()
  const roleBase = () => (authStore.userRole === 'teacher' ? 'teacher' : authStore.userRole === 'hod' ? 'hod' : 'admin')
  const remember = (what: string) => `${key}:${roleBase()}:${what}`

  const terms = ref<Term[]>([])
  const classes = ref<ClassOption[]>([])
  const subjects = ref<SubjectOption[]>([])
  const mine = ref<Set<number>>(new Set())

  const termId = ref<number | null>(null)
  const classId = ref<number | null>(null)
  const subjectId = ref<number | null>(null)

  const termOptions = computed<PickerOption<number>[]>(() => terms.value.map(t => ({
    value: t.id, label: `${t.name}${t.academic_year ? ` ${t.academic_year}` : ''}`, hint: t.is_current ? 'current' : undefined
  })))
  const classOptions = computed<PickerOption<number>[]>(() => [...classes.value]
    .sort((a, b) => Number(mine.value.has(b.id)) - Number(mine.value.has(a.id)) || a.name.localeCompare(b.name, undefined, { numeric: true }) || String(a.stream_name).localeCompare(String(b.stream_name)))
    .map(c => ({ value: c.id, label: `${c.name}${c.stream_name ? `-${c.stream_name}` : ''}`, hint: mine.value.has(c.id) ? 'yours' : undefined, hintClass: 'text-emerald-600 dark:text-emerald-300' })))
  const subjectOptions = computed<PickerOption<number>[]>(() => subjects.value.map(s => ({ value: s.id, label: s.name })))

  const load = async () => {
    const base = roleBase()
    const [termsRes, classRes, overview, subjectRes] = await Promise.all([
      axios.get(`/api/${base}/report-cards/terms`),
      axios.get(base === 'hod' ? '/api/hod/performance/classes' : `/api/${base}/classes`),
      base === 'teacher' ? axios.get('/api/teacher/classes/overview').catch(() => null) : Promise.resolve(null),
      axios.get(base === 'admin' ? '/api/admin/subjects' : `/api/${base}/performance/subjects`)
    ])
    terms.value = termsRes.data.data.terms
    classes.value = base === 'hod' ? classRes.data.data.classes : classRes.data.data
    const streams: { id: number; mine?: boolean }[] = overview?.data?.data?.streams ?? []
    mine.value = new Set(streams.filter(st => st.mine).map(st => st.id))
    subjects.value = base === 'admin' ? subjectRes.data.data : subjectRes.data.data.subjects

    const read = (what: string) => { try { return Number(localStorage.getItem(remember(what))) || null } catch { return null } }
    const lastClass = read('class')
    const lastSubject = read('subject')
    termId.value = terms.value.find(t => t.is_current)?.id ?? terms.value[0]?.id ?? null
    classId.value = classOptions.value.find(o => o.value === lastClass)?.value ?? classOptions.value[0]?.value ?? null
    subjectId.value = subjectOptions.value.find(o => o.value === lastSubject)?.value ?? subjectOptions.value[0]?.value ?? null
  }

  // Called once a choice has been used, so the page reopens on it
  const rememberChoice = () => {
    try {
      if (classId.value) localStorage.setItem(remember('class'), String(classId.value))
      if (subjectId.value) localStorage.setItem(remember('subject'), String(subjectId.value))
    } catch { /* private mode */ }
  }

  return { roleBase, terms, classes, subjects, termId, classId, subjectId, termOptions, classOptions, subjectOptions, load, rememberChoice }
}
