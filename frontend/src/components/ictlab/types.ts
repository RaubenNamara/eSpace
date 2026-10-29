// Shapes returned by /api/{student,teacher}/ict-lab

export interface IctLink {
  activity_key: string
  step_key: string
  enote_topic_id: number
  enote_page_id: number | null
  topic_title: string
  page_number: number | null
  page_title: string | null
}

export interface IctProgress {
  activity_key: string
  level: 'simple' | 'intermediate' | 'advanced'
  best: number
  attempts: number
  last_at: string | null
  /** Typing lessons only: the fastest words a minute */
  best_wpm?: number | null
}

/** How a learner stands on one practical: best score, and parts done for one in parts */
export interface IctStanding {
  best: number | null
  parts: number
  done: boolean
  last_at: string | null
}

/** A practical a teacher set a class (ict_lab_tasks) */
export interface IctTask {
  id: number
  practical: string
  title: string
  level: 'simple' | 'intermediate' | 'advanced'
  has_levels: boolean
  due_at: string | null
  note: string | null
  created_at: string
  teacher_name: string | null
  /** the student's own standing (student view) */
  standing: IctStanding
}

/** The same, as the teacher sees it for a class */
export interface IctClassTask extends Omit<IctTask, 'standing'> {
  mine: boolean
  done: number
  total: number
  by_student: Record<string, IctStanding>
}

// Which part of the app the lab was opened from - the first segment of the route
export type LabRole = 'student' | 'teacher' | 'hod' | 'admin'
export const labRoleOf = (path: string): LabRole => {
  const seg = path.split('/')[1]
  return seg === 'student' || seg === 'teacher' || seg === 'hod' ? seg : 'admin'
}
