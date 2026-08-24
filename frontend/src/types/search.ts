export type SearchResultType = 'enote' | 'library' | 'assignment' | 'item_bank' | 'video' | 'lesson' | 'subject'

export interface SearchResult {
  type: SearchResultType
  id: number
  title: string
  description: string | null
  subject_id: number | null
  subject_name: string | null
  class_id: number | null
  class_name: string | null
  published_at: string | null
  url: string
  is_file: boolean
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
  counts: Partial<Record<SearchResultType, number>>
  page: number
  per_page: number
}

export interface SearchSuggestion {
  id: number
  type: SearchResultType
  title: string
  subject_name: string | null
  url: string
  is_file: boolean
}

export const SEARCH_TYPE_LABELS: Record<string, string> = {
  all: 'All',
  enote: 'eNotes',
  library: 'eLibrary',
  assignment: 'Assignments',
  item_bank: 'Item Bank',
  video: 'Videos',
  lesson: 'Lessons',
}
