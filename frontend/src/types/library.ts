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
  author?: string | null
  // Root-relative cover picture ('/uploads/library/covers/...'): the PDF's first page captured
  // automatically ('auto_' files) or an image the teacher uploaded. Null = printed jacket design.
  cover_image?: string | null
  // A cover designed in eSpace (JSON: template, colour, picture, words) - shown instead of the picture
  cover_design?: string | null
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
  department_code?: string
  // Who added it: a teacher's name, the HOD's, or 'School admin'
  uploader_name?: string | null
  uploader_role?: 'teacher' | 'hod' | 'admin'
  teacher_first_name?: string
  teacher_last_name?: string
  // Teacher list only: who it's aimed at and how far they've got
  audience?: number
  readers?: number
  finished?: number
  avg_read?: number | string | null
}

export interface LibraryBookForm {
  title: string
  description: string
  subject_id: string
  // Admin only: which department the book is for
  department_id?: string
  classTarget: ClassTarget
  status: 'draft' | 'published' | 'archived'
  allow_download: boolean
  author: string
  file: File | null
}
