/**
 * Item Bank TypeScript Interfaces
 *
 * Type definitions for the PDF item bank module - identical in shape to the eLibrary types.
 */

export interface ItemBankResource {
  id: number
  title: string
  description: string | null
  subject_id: number | null
  class_id: number | null
  department_id?: number | null
  file_path: string
  file_type: string
  file_size: number | null
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  created_at: string
  updated_at?: string
  subject_name?: string
  subject_code?: string
  class_name?: string
  class_level?: string
  class_stream_name?: string
  department_name?: string
  teacher_first_name?: string
  teacher_last_name?: string
}

export interface ItemBankResourceForm {
  title: string
  description: string
  subject_id: string
  class_id: string
  status: 'draft' | 'published' | 'archived'
  file: File | null
}
