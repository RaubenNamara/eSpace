import type { LibraryBook } from '@/types/library'

/** One publication (PublicationController::fetch) */
export interface Publication {
  id: number
  title: string
  description: string | null
  author_student_id: number
  author_name: string
  author_class: string | null
  author_photo: string | null
  teacher_id: number
  teacher_first_name: string | null
  teacher_last_name: string | null
  file_path: string
  file_size: number | null
  file_type: 'pdf'
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
}

/**
 * A publication in the shape the eLibrary's page-turning reader opens. The reader's "By ..." line
 * shows the teacher's name for a book; for a publication it is the student who wrote it.
 */
export const asBook = (p: Publication): LibraryBook => ({
  id: p.id,
  title: p.title,
  description: p.description,
  subject_id: null,
  class_id: null,
  file_path: p.file_path,
  file_type: 'pdf',
  file_size: p.file_size,
  total_pages: null,
  allow_download: false,
  status: p.status,
  published_at: p.published_at,
  created_at: p.created_at,
  subject_name: 'Publication',
  teacher_first_name: p.author_name,
  teacher_last_name: ''
} as LibraryBook)
