/**
 * eNotes Curriculum Setup - admin-authored reference data (theme/branch, topic, competence,
 * ordered learning outcomes) scoped to subject + academic year + class-stream + term, that a
 * teacher picks from when creating an eNote topic instead of typing this metadata by hand.
 */

export interface CurriculumDepartmentOption {
  id: number
  name: string
}

export interface CurriculumSubjectOption {
  id: number
  name: string
  department_id: number
}

export interface CurriculumAcademicYearOption {
  id: number
  name: string
}

export interface CurriculumClassStreamOption {
  id: number
  name: string
  level: string
  stream_name: string
  display_name: string
}

export interface CurriculumTermOption {
  id: number
  name: string
  academic_year_id: number
}

export interface CurriculumMeta {
  departments: CurriculumDepartmentOption[]
  subjects: CurriculumSubjectOption[]
  academic_years: CurriculumAcademicYearOption[]
  class_streams: CurriculumClassStreamOption[]
  terms: CurriculumTermOption[]
}

export interface CurriculumTopic {
  id: number
  subject_id: number
  academic_year_id: number
  class_id: number
  term_id: number
  theme_branch: string
  topic: string
  competence: string
  learning_outcomes: string[]
  subject_name?: string
  department_name?: string
  academic_year_name?: string
  term_name?: string
  class_stream_name?: string
  created_at: string
  updated_at: string
}

export interface CurriculumTopicForm {
  subject_id: number | ''
  academic_year_id: number | ''
  class_id: number | ''
  term_id: number | ''
  theme_branch: string
  topic: string
  competence: string
  learning_outcomes: string[]
}
