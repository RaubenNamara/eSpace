export interface SubjectPerformance {
  subject_id: number
  subject_name: string | null
  subject_code: string | null
  assignments_count: number
  avg_percentage: number
  grade: string
}

export interface StudentGeneralPerformance {
  student_id: number
  total_assignments: number
  overall_avg_percentage: number | null
  overall_grade: string | null
  subjects: SubjectPerformance[]
}

export interface AssignmentPerformance {
  assignment_id: number
  title: string
  due_date: string
  total_marks: number
  score: number
  percentage: number
  released_at: string | null
}

export interface StudentSubjectPerformance {
  student_id: number
  subject_id: number
  subject_name: string | null
  subject_code: string | null
  avg_percentage: number | null
  grade: string | null
  highest_percentage: number | null
  lowest_percentage: number | null
  assignments: AssignmentPerformance[]
}

export interface MarksheetCell {
  assignment_id: number
  score: number | null
  percentage: number | null
}

export interface MarksheetRow {
  student_id: number
  first_name: string
  last_name: string
  admission_number: string
  cells: MarksheetCell[]
  avg_percentage: number | null
  grade: string | null
}

export interface MarksheetAssignment {
  id: number
  title: string
  total_marks: number
}

export interface Marksheet {
  class_id: number
  subject_id: number
  assignments: MarksheetAssignment[]
  rows: MarksheetRow[]
}
