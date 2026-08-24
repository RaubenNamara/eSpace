export interface ReportCardConstruct {
  label: string
  score_obtained: number
  score_total: number
  weight: number
}

export interface ReportCardSubject {
  subject_id: number
  subject_name: string
  subject_code: string
  avg_weight: number
  grade: string | null
  descriptor_text: string | null
  teacher_initials: string | null
  assignments_included_count: number
  assignments_total_count: number
  constructs: ReportCardConstruct[]
}

export interface SchoolSettings {
  id: number
  school_name: string
  logo_path: string | null
  box_number: string | null
  website: string | null
  email: string | null
  phone: string | null
  motto: string | null
  address: string | null
}

export interface ReportCardAward {
  id: number
  badge_type: 'platinum' | 'gold' | 'silver' | 'bronze' | 'special'
  award_title: string
  category: string | null
  subject_name: string | null
  score: number | null
  average: number | null
}

export interface ReportCardVirtualLabResult {
  id: number
  experiment_title: string
  subject_name: string | null
  category: 'physics' | 'chemistry' | 'biology' | 'agriculture'
  score: number
  max_marks: number
  percentage: number
  teacher_comment: string | null
  completed_at: string
}

export interface ReportCard {
  id: number
  awards: ReportCardAward[]
  student: {
    id: number
    first_name: string
    last_name: string
    admission_number: string
  }
  term: {
    id: number
    name: string
    academic_year: string | null
  }
  class_name: string | null
  stream_name: string | null
  class_level: string | null
  max_weight: number
  total_points: number
  overall_avg_weight: number
  performance_level: string | null
  result_category: number | null
  class_teacher_comment: string | null
  head_teacher_comment: string | null
  generated_at: string
  login_count: number
  school: SchoolSettings | null
  subjects: ReportCardSubject[]
  virtual_lab: ReportCardVirtualLabResult[]
}

export interface ReportCardListEntry {
  id: number
  term_id: number
  term_name: string
  academic_year_name: string | null
  performance_level: string | null
  total_points: number | null
  generated_at: string
}

export interface ReportCardStudentEntry {
  id: number
  first_name: string
  last_name: string
  admission_number: string
  class_id?: number
  report_card_id: number | null
  performance_level: string | null
  total_points: number | null
}
