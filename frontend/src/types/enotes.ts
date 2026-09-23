/**
 * eNotes TypeScript Interfaces
 *
 * Type definitions for the professional eNotes module
 */
import type { ClassTarget } from '@/components/teacher/TeacherClassSelector.vue'

export interface ENoteTopic {
  id: number
  teacher_id: number
  content_group_id?: number | null
  class_id: number | null
  class_group_name?: string | null
  subject_id: number
  department_id: number
  title: string
  description: string | null
  learning_outcomes: string[]
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  archived_at: string | null
  total_pages: number
  estimated_reading_time: number | null
  narration_voice?: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  subject_name?: string
  subject_code?: string
  class_name?: string
  class_level?: string
  class_stream_name?: string
  department_name?: string
  teacher_first_name?: string
  teacher_last_name?: string
  pages?: ENotePage[]
  /** The assignment linked to this topic, shape depends on who's asking: the student-facing
   *  show() response includes due_date/submission_status and is gated to a published assignment
   *  currently visible to that student (powers the "Attempt Assessment" topic-completion
   *  quick-link); the teacher's own show() response includes status instead and returns any
   *  status, gating who can see it themselves via ownership (powers the "Create/Edit Assessment"
   *  button on the topic preview screen). Null if none in either case. */
  linked_assignment?: { id: number; title: string; due_date?: string | null; submission_status?: string; status?: string } | null
  /** The curriculum-bank topic (enote_curriculum_topics) this eNote topic has been one-time
   *  linked to by the teacher, if any - once set, every page's Learning Outcome Assessment
   *  quick-create can list this topic's own outcomes without re-picking Theme/Branch/Topic. */
  curriculum_topic_id?: number | null
}

export interface ENotePage {
  id: number
  topic_id: number
  order_number: number
  title: string
  content: string
  is_active: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  /** All cached (voice -> audio) narrations for this page - populated on the teacher/authoring show() response. */
  narrations?: ENotePageNarration[]
  /** The single currently-selected-voice narration URL - populated on student/preview show() responses. */
  narration_audio_path?: string | null
  /** The Learning Outcome Assessment attached to this specific page, if any. Teacher's own
   *  show() response includes `status` (any status, own authoring view); the student-facing
   *  show() response includes `submission_status`/`due_date` instead, gated to a published
   *  assignment currently visible to that student. Powers the per-page "Learning Outcome
   *  Assessment" button (teacher) and the "Ignore/Attempt" page-turn prompt (student). */
  linked_assignment?: {
    id: number
    title: string
    status?: string
    due_date?: string | null
    submission_status?: string
    learning_outcome_label?: string | null
  } | null
}

export interface ENotePageNarration {
  voice: string
  audio_path: string
  is_stale: boolean
  generated_at: string
}

/** One step of the AI Tutor's paragraph-by-paragraph walkthrough - explains and highlights one paragraph at a time. */
export interface ENoteTutorBlock {
  paragraph_index: number
  explanation_text: string
  audio_path: string
  generated_at: string
}

export interface ENoteTutorWalkthrough {
  voice: string
  cached: boolean
  blocks: ENoteTutorBlock[]
}

export const AI_VOICES = [
  { value: 'sarah', label: 'Sarah', gender: 'Female', description: 'Mature, reassuring' },
  { value: 'bella', label: 'Bella', gender: 'Female', description: 'Professional, bright' },
  { value: 'george', label: 'George', gender: 'Male', description: 'Warm, storyteller' },
  { value: 'daniel', label: 'Daniel', gender: 'Male', description: 'Steady, broadcaster' }
]

export interface ENoteDashboardStats {
  total: number
  draft: number
  published: number
  archived: number
  recently_updated: ENoteTopic[]
}

export interface ENoteAssignments {
  subjects: Array<{
    id: number
    name: string
    code: string
  }>
  classes: Array<{
    id: number
    name: string
    level: string
    stream_name?: string
    academic_year: string
  }>
  department_id: number
}

export interface ENoteTopicForm {
  title: string
  description: string
  learning_outcomes: string[]
  subject_id: string
  classTarget: ClassTarget
  status: 'draft' | 'published' | 'archived'
}

export interface ENotePageForm {
  title: string
  content: string
  is_active: boolean
}

export interface PageOrder {
  id: number
  order_number: number
}

export interface ENotePagination {
  page: number
  limit: number
  total: number
  pages: number
}

export interface ENoteListResponse {
  topics: ENoteTopic[]
  pagination: ENotePagination
}

export interface ENoteTopicResponse extends ENoteTopic {
  pages: ENotePage[]
}
