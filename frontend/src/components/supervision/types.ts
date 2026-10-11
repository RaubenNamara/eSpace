// Shapes returned by /api/admin/supervision

export type SupFlag = 'none_set' | 'marking' | 'low_hand_in' | 'quiet'

export interface SupTeacher {
  id: number
  name: string
  department_ids: number[]
  last_seen: string | null
  set: number
  drafts: number
  expected: number
  handed_in: number
  missing: number
  hand_in_rate: number | null
  waiting: number
  overdue: number
  oldest_days: number | null
  marked: number
  marked_rate: number | null
  enotes: number
  flags: SupFlag[]
}

export interface SupDepartment {
  id: number
  name: string
  code: string
  teachers: number
  follow_up: number
  none_set: number
  overdue: number
  set: number
  waiting: number
  missing: number
  oldest_days: number | null
  hand_in_rate: number | null
}

export interface SupAssessment {
  id: number
  title: string
  category: 'LOA' | 'AOI' | 'EOC' | null
  subject: string
  class: string
  deadline: string | null
  closed: boolean
  expected: number
  handed_in: number
  missing: number
  not_yet: number
  started: number
  waiting: number
  marked: number
  waiting_days: number | null
}

export interface SupLearner {
  id: number
  name: string
  admission_number: string
  class: string
  started: boolean
}

export const FLAG: Record<SupFlag, { label: string; cls: string }> = {
  none_set: { label: 'Nothing set this term', cls: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' },
  marking: { label: 'Marking overdue', cls: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200' },
  low_hand_in: { label: 'Low hand-in', cls: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200' },
  quiet: { label: 'Not signed in lately', cls: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' }
}
