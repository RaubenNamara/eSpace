export interface ReportCardConstruct {
  label: string
  score_obtained: number
  score_total: number
  weight: number
}

export interface ReportCardCompetency {
  category: 'LOA' | 'AOI' | 'EOC'
  percentage: number
  status: string
  performance_descriptor: string
  weight: number
  descriptor_text: string
  source_count: number
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
  competencies: ReportCardCompetency[]
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

// --- Class-wide LOA/AOI/EOC summary (Phase F) ------------------------------------------------

export type CompetencyCategoryState = 'assessed' | 'awaiting_marking' | 'awaiting_submission' | 'not_assessed'
export type ClassSummaryReportStatus = 'published' | 'ready' | 'awaiting_marking' | 'awaiting_submission' | 'not_assessed'

export interface ClassSummaryCategoryResult {
  state: CompetencyCategoryState
  percentage: number | null
  status: string | null
  performance_descriptor: string | null
  weight: number | null
  assessment_count: number
}

export interface ClassSummaryStudent {
  student_id: number
  first_name: string
  last_name: string
  admission_number: string
  categories: {
    LOA: ClassSummaryCategoryResult
    AOI: ClassSummaryCategoryResult
    EOC: ClassSummaryCategoryResult
  }
  report_status: ClassSummaryReportStatus
}

export interface ClassSummarySubjectOption {
  id: number
  name: string
}

// --- Admin cross-subject LOA/AOI/EOC reports ------------------------------------------------

export type CompetencyCategory = 'LOA' | 'AOI' | 'EOC'

export interface CompetencyListCategoryFlag {
  available: boolean
  percentage: number | null
  status: string | null
}

export interface CompetencyListStudent {
  student_id: number
  first_name: string
  last_name: string
  admission_number: string
  categories: Record<CompetencyCategory, CompetencyListCategoryFlag>
}

export interface CompetencyOverviewCategory {
  available: boolean
  assessment_count: number
  percentage: number | null
  status: string | null
  performance_descriptor: string | null
  weight: number | null
  total_marks_sum: number
  total_score_sum: number
}

export interface CompetencyStudentInfo {
  id: number
  first_name: string
  last_name: string
  admission_number: string
  class_name: string | null
  stream_name: string | null
}

export interface CompetencyTermInfo {
  id: number
  name: string
  academic_year: string | null
}

export interface CompetencyOverview {
  student: CompetencyStudentInfo
  term: CompetencyTermInfo
  max_weight: number
  categories: Record<CompetencyCategory, CompetencyOverviewCategory>
}

export interface CompetencyDetailRow {
  subject_id: number
  subject_name: string
  topic_id: number
  topic_name: string
  detail_text?: string
  learning_outcomes?: string[]
  percentage: number
  status: string
  descriptor: string
  descriptor_text: string
}

export interface CompetencyDetailReport {
  student: CompetencyStudentInfo
  term: CompetencyTermInfo
  category: CompetencyCategory
  class_level: string | null
  max_weight: number
  available: boolean
  summary: CompetencyOverviewCategory
  rows: CompetencyDetailRow[]
  school: SchoolSettings | null
  generated_at: string
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
