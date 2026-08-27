/**
 * eLibrary TypeScript Interfaces
 *
 * Type definitions for the PDF library module.
 */
import type { ClassTarget } from '@/components/teacher/TeacherClassSelector.vue'

export interface LibraryBook {
  id: number
  title: string
  description: string | null
  subject_id: number | null
  class_id: number | null
  class_group_name?: string | null
  department_id?: number | null
  file_path: string
  file_type: string
  file_size: number | null
  allow_download?: boolean | number
  total_pages: number | null
  uploaded_by?: number
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

export interface LibraryBookForm {
  title: string
  description: string
  subject_id: string
  classTarget: ClassTarget
  status: 'draft' | 'published' | 'archived'
  allow_download: boolean
  file: File | null
}
