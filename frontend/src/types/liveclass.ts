/**
 * Live Classes (BigBlueButton) TypeScript Interfaces
 */
import type { ClassTarget } from '@/components/teacher/TeacherClassSelector.vue'

export type LiveClassStatus = 'scheduled' | 'started' | 'ended' | 'cancelled'

export interface LiveClass {
  id: number
  subject_id: number | null
  class_id: number | null
  class_group_name?: string | null
  department_id?: number | null
  department_name?: string
  title: string
  description: string | null
  scheduled_start: string
  scheduled_end: string
  actual_start: string | null
  actual_end: string | null
  is_recorded: boolean | number
  recording_url: string | null
  status: LiveClassStatus
  created_at: string
  updated_at?: string
  subject_name?: string
  subject_code?: string
  class_name?: string
  class_level?: string
  class_stream_name?: string
  teacher_first_name?: string
  teacher_last_name?: string
  already_joined?: boolean | number
}

export interface LiveClassForm {
  title: string
  description: string
  subject_id: string
  classTarget: ClassTarget
  scheduled_start: string
  scheduled_end: string
  is_recorded: boolean
}

export interface LiveClassRecording {
  id?: number
  record_id?: string
  start_time: string
  end_time: string
  playback_url: string | null
  is_published?: boolean | number
}

export interface LiveClassAttendanceRow {
  student_id: number
  first_name: string
  last_name: string
  admission_number?: string
  join_time: string | null
  leave_time: string | null
  duration_minutes: number | null
  attendance_status: 'present' | 'left_early'
}

export interface LiveClassSummary {
  live_now: number
  upcoming_today: number
  completed_today: number
  students_online: number
  recorded_sessions: number
  overdue_lessons?: Array<{
    id: number
    title: string
    scheduled_start: string
    teacher_first_name?: string
    teacher_last_name?: string
  }>
}

export interface BBBServerStatus {
  configured: boolean
  reachable: boolean
  message: string
}
