export interface PhysicalExam {
  id: number
  subject_id: number
  subject_name: string
  class_id: number
  class_name: string
  stream_name: string | null
  term_id: number
  title: string
  max_score: number
  exam_date: string
  include_on_report: boolean
  created_by: number
  created_by_role: 'teacher' | 'hod' | 'admin'
}

export interface PhysicalExamMarksheetStudent {
  student_id: number
  first_name: string
  last_name: string
  admission_number: string
  profile_photo: string | null
  score: number | null
}

export interface PhysicalExamMarksheet {
  exam: PhysicalExam
  students: PhysicalExamMarksheetStudent[]
}
