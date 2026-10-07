// UNEB school-based assessment (GET /{role}/sba)

export interface SbaEvidence { id: number; url: string; kind: 'image' | 'pdf'; name: string | null; note: string | null; at: string | null; from: 'staff' | 'learner' }

export interface SbaItem {
  key: string
  kind: 'AOI' | 'PROJECT'
  source: 'online' | 'paper'
  id: number
  title: string
  date: string | null
  state: 'marked' | 'waiting' | 'missing' | 'upcoming'
  percent: number | null
  evidence: SbaEvidence[]
}

export interface SbaLearner {
  id: number
  name: string
  admission_number: string
  lin: string | null
  uneb_index_number: string | null
  gender: string | null
  class_id: number
  stream: string
  aoi_set: number
  aoi_upcoming: number
  aoi_marked: number
  missing: number
  waiting: number
  average: number | null
  ca_score: number | null
  project: number | null
  evidence_count: number
  ready: boolean
  issues: ('no_lin' | 'none_due' | 'no_scores' | 'missing' | 'waiting')[]
  items: SbaItem[]
  general_evidence: SbaEvidence[]
}

export interface SbaSettings { school_name: string; uneb_centre_number: string | null; sba_out_of: number; sba_deadline: string | null }

export interface SbaData {
  subject: { id: number; name: string; code: string }
  level: string
  settings: SbaSettings
  items: { key: string; kind: 'AOI' | 'PROJECT'; source: 'online' | 'paper'; title: string; date: string | null }[]
  learners: SbaLearner[]
  summary: {
    learners: number
    ready: number
    no_lin: number
    with_missing: number
    missing_total: number
    waiting_total: number
    no_scores: number
    aoi_items: number
    project_items: number
    with_evidence: number
  }
}
