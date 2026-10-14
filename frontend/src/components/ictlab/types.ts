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
}

// Which part of the app the lab was opened from - the first segment of the route
export type LabRole = 'student' | 'teacher' | 'hod' | 'admin'
export const labRoleOf = (path: string): LabRole => {
  const seg = path.split('/')[1]
  return seg === 'student' || seg === 'teacher' || seg === 'hod' ? seg : 'admin'
}
