/**
 * eNotes TypeScript Interfaces
 * 
 * Type definitions for the professional eNotes module
 */

export interface ENoteTopic {
  id: number
  teacher_id: number
  class_id: number | null
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
  class_id: string
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
